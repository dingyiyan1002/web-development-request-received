import express from 'express';
import cors from 'cors';
import initSqlJs from 'sql.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { spawn } from 'child_process';
import { runCode, compileOnly, getAssembly, preprocess, memcheck, queryTypeInfo, formatCode } from './runner.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dataDir = join(__dirname, 'data');
if (!existsSync(dataDir)) {
  mkdirSync(dataDir, { recursive: true });
}
const dbPath = join(dataDir, 'progress.db');

let db;

async function initDb() {
  const SQL = await initSqlJs();
  
  if (existsSync(dbPath)) {
    const buffer = readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    db = new SQL.Database();
  }
  
  db.run(`
    CREATE TABLE IF NOT EXISTS progress (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT DEFAULT 'default',
      completed TEXT DEFAULT '[]',
      correct TEXT DEFAULT '[]',
      wrong TEXT DEFAULT '[]',
      attempts TEXT DEFAULT '{}',
      bookmarked TEXT DEFAULT '[]',
      analyzed TEXT DEFAULT '[]',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  saveDb();
  console.log('Database initialized');
}

function saveDb() {
  const data = db.export();
  const buffer = Buffer.from(data);
  writeFileSync(dbPath, buffer);
}

function getUserId(req) {
  return req.headers['x-user-id'] || 'default';
}

app.get('/api/progress', (req, res) => {
  try {
    const userId = getUserId(req);
    const result = db.exec('SELECT * FROM progress WHERE user_id = ?', [userId]);
    
    if (result.length > 0 && result[0].values.length > 0) {
      const row = result[0].values[0];
      res.json({
        success: true,
        data: {
          completed: JSON.parse(row[2] || '[]'),
          correct: JSON.parse(row[3] || '[]'),
          wrong: JSON.parse(row[4] || '[]'),
          attempts: JSON.parse(row[5] || '{}'),
          bookmarked: JSON.parse(row[6] || '[]'),
          analyzed: JSON.parse(row[7] || '[]')
        }
      });
    } else {
      res.json({
        success: true,
        data: {
          completed: [],
          correct: [],
          wrong: [],
          attempts: {},
          bookmarked: [],
          analyzed: []
        }
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/progress', (req, res) => {
  try {
    const userId = getUserId(req);
    const { completed, correct, wrong, attempts, bookmarked, analyzed } = req.body;
    
    const existing = db.exec('SELECT id FROM progress WHERE user_id = ?', [userId]);
    
    if (existing.length > 0 && existing[0].values.length > 0) {
      db.run(`
        UPDATE progress SET 
          completed = ?, correct = ?, wrong = ?, attempts = ?, bookmarked = ?, analyzed = ?,
          updated_at = datetime('now')
        WHERE user_id = ?
      `, [
        JSON.stringify(completed || []),
        JSON.stringify(correct || []),
        JSON.stringify(wrong || []),
        JSON.stringify(attempts || {}),
        JSON.stringify(bookmarked || []),
        JSON.stringify(analyzed || []),
        userId
      ]);
    } else {
      db.run(`
        INSERT INTO progress (user_id, completed, correct, wrong, attempts, bookmarked, analyzed)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `, [
        userId,
        JSON.stringify(completed || []),
        JSON.stringify(correct || []),
        JSON.stringify(wrong || []),
        JSON.stringify(attempts || {}),
        JSON.stringify(bookmarked || []),
        JSON.stringify(analyzed || [])
      ]);
    }
    
    saveDb();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.delete('/api/progress', (req, res) => {
  try {
    const userId = getUserId(req);
    db.run('DELETE FROM progress WHERE user_id = ?', [userId]);
    saveDb();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/run', async (req, res) => {
  try {
    const { code, mode, stdin } = req.body;
    
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ 
        success: false, 
        output: '请提供有效的C代码', 
        type: 'invalid_input' 
      });
    }

    if (code.length > 10000) {
      return res.status(400).json({ 
        success: false, 
        output: '代码过长，请控制在10000字符以内', 
        type: 'too_long' 
      });
    }

    let result;
    if (mode === 'compile') {
      result = await compileOnly(code);
    } else {
      result = await runCode(code, { stdin });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      output: error.message, 
      type: 'system_error' 
    });
  }
});

app.get('/api/gcc-check', (req, res) => {
  const check = spawn('gcc', ['--version'], { shell: true, windowsHide: true });
  
  check.on('close', (code) => {
    if (code === 0) {
      res.json({ available: true });
    } else {
      res.json({ available: false, message: 'GCC未安装' });
    }
  });
  
  check.on('error', () => {
    res.json({ available: false, message: '无法运行GCC命令' });
  });
});

app.post('/api/assembly', async (req, res) => {
  try {
    const { code, optimization } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ success: false, output: '请提供代码', type: 'invalid_input' });
    }
    const validOpts = ['0', '1', '2', '3', 's'];
    const opt = validOpts.includes(optimization) ? optimization : '0';
    const result = await getAssembly(code, opt);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, output: error.message, type: 'system_error' });
  }
});

app.post('/api/preprocess', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ success: false, output: '请提供代码', type: 'invalid_input' });
    }
    const result = await preprocess(code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, output: error.message, type: 'system_error' });
  }
});

app.post('/api/memcheck', async (req, res) => {
  try {
    const { code, stdin } = req.body;
    if (!code) return res.status(400).json({ success: false, output: '请提供代码' });
    const result = await memcheck(code, stdin || '');
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, output: error.message, type: 'system_error' });
  }
});

app.post('/api/typeinfo', async (req, res) => {
  try {
    const { type } = req.body;
    if (!type) return res.status(400).json({ success: false, output: '请提供类型名' });
    const result = await queryTypeInfo(type);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, output: error.message, type: 'system_error' });
  }
});

app.post('/api/format', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ success: false, output: '请提供代码' });
    const result = await formatCode(code);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, output: error.message, type: 'system_error' });
  }
});

app.get('/api/tools', async (req, res) => {
  const tools = {};
  const check = async (cmd, args) => {
    return new Promise((resolve) => {
      const p = spawn(cmd, args, { shell: true, windowsHide: true });
      let stdout = '';
      p.stdout.on('data', (d) => stdout += d.toString());
      p.on('close', (code) => resolve({ available: code === 0, version: stdout.trim().split('\n')[0] }));
      p.on('error', () => resolve({ available: false }));
      setTimeout(() => { try { p.kill(); } catch {} resolve({ available: false }); }, 3000);
    });
  };

  tools.gcc = await check('gcc', ['--version']);
  tools.gdb = await check('gdb', ['--version']);
  tools.valgrind = await check('valgrind', ['--version']);
  tools.clangFormat = await check('clang-format', ['--version']);
  
  const asanCheck = await check('gcc', ['-fsanitize=address', '-x', 'c', '-e', 'int main(){}', '-o', 'NUL']);
  tools.asan = { available: asanCheck.available && process.platform !== 'win32', reason: process.platform === 'win32' ? 'MinGW不支持' : '需要编译时加 -fsanitize=address' };
  
  tools.platform = process.platform;

  res.json(tools);
});

app.get('/api/heartbeat', (req, res) => {
  res.json({ alive: true });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`C Trainer API Server running on http://localhost:${PORT}`);
    console.log(`Database: ${dbPath}`);
  });
});
