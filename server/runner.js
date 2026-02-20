import fs from 'fs';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMP_DIR = path.join(__dirname, 'temp');
if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR, { recursive: true });
}

const TIMEOUT_MS = 3000;

function formatCompileError(error, tempDir) {
  if (!error || !tempDir) return error;
  return error.split(tempDir).join('').replace(/[/\\][^/\\]*\.c/g, '/main.c');
}

async function checkAsanAvailable() {
  return new Promise((resolve) => {
    const testCode = `
#include <stdio.h>
int main() { return 0; }
`;
    const testPath = path.join(TEMP_DIR, 'asan_test.c');
    const testExe = path.join(TEMP_DIR, 'asan_test.exe');
    
    fs.writeFileSync(testPath, testCode);
    
    const compile = spawn('gcc', [
      testPath,
      '-o', testExe,
      '-fsanitize=address'
    ], {
      shell: true,
      windowsHide: true
    });
    
    compile.on('close', (code) => {
      try {
        fs.unlinkSync(testPath);
        if (fs.existsSync(testExe)) fs.unlinkSync(testExe);
      } catch (e) {}
      resolve(code === 0);
    });
    
    compile.on('error', () => {
      try {
        fs.unlinkSync(testPath);
        if (fs.existsSync(testExe)) fs.unlinkSync(testExe);
      } catch (e) {}
      resolve(false);
    });
  });
}

let asanAvailable = null;

export async function runCode(codeSource, options = {}) {
  const { stdin: stdinInput } = options;
  
  if (asanAvailable === null) {
    asanAvailable = await checkAsanAvailable();
  }

  const timestamp = Date.now();
  const filename = `code_${timestamp}`;
  const srcPath = path.join(TEMP_DIR, `${filename}.c`);
  const exePath = path.join(TEMP_DIR, `${filename}.exe`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    const compileArgs = [
      srcPath,
      '-o', exePath,
      '-g'
    ];

    if (asanAvailable) {
      compileArgs.push('-fsanitize=address');
      compileArgs.push('-fno-omit-frame-pointer');
    }

    const compileResult = await new Promise((resolve) => {
      const compile = spawn('gcc', compileArgs, {
        shell: true,
        windowsHide: true
      });

      let compileError = '';
      compile.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compile.on('close', (code) => {
        resolve({ exitCode: code, error: compileError });
      });

      compile.on('error', (err) => {
        resolve({ exitCode: -1, error: err.message });
      });
    });

    if (compileResult.exitCode !== 0) {
      return { 
        success: false, 
        output: formatCompileError(compileResult.error, TEMP_DIR), 
        type: 'compile_error' 
      };
    }

    const runResult = await new Promise((resolve) => {
      const isWindows = process.platform === 'win32';
      
      const run = spawn(exePath, [], {
        shell: false,
        windowsHide: true,
        stdio: ['pipe', 'pipe', 'pipe'],
        cwd: path.dirname(exePath)
      });

      let stdout = '';
      let stderr = '';

      if (stdinInput && stdinInput.length > 0) {
        try {
          const inputData = stdinInput.endsWith('\n') ? stdinInput : stdinInput + '\n';
          run.stdin.write(inputData);
          run.stdin.end();
        } catch (e) {
          console.error('stdin write error:', e.message);
        }
      }

      const timer = setTimeout(() => {
        run.kill();
        resolve({ 
          exitCode: -1, 
          stdout, 
          stderr: '⏱ 运行超时 (3秒)\n\n可能的原因:\n  • 死循环 (while/for 条件永远为真)\n  • 等待输入 - 请在「标准输入」框中填入数据\n  • 递归没有终止条件',
          timedOut: true 
        });
      }, TIMEOUT_MS);

      run.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      run.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      run.on('close', (code) => {
        clearTimeout(timer);
        resolve({ exitCode: code, stdout, stderr, timedOut: false });
      });

      run.on('error', (err) => {
        clearTimeout(timer);
        resolve({ exitCode: -1, stdout, stderr: err.message, timedOut: false });
      });
    });

    try {
      fs.unlinkSync(srcPath);
      fs.unlinkSync(exePath);
    } catch (e) {}

    if (runResult.timedOut) {
      return { 
        success: false, 
        output: runResult.stderr, 
        type: 'timeout' 
      };
    }

    if (runResult.exitCode !== 0 || runResult.stderr) {
      let errorType = 'runtime_error';
      
      if (runResult.stderr.includes('AddressSanitizer') || 
          runResult.stderr.includes('ASan')) {
        errorType = 'memory_error';
      }

      return { 
        success: false, 
        output: runResult.stderr || `程序退出码: ${runResult.exitCode}`, 
        type: errorType 
      };
    }

    return { 
      success: true, 
      output: runResult.stdout || '(无输出)',
      type: 'success' 
    };

  } catch (error) {
    try {
      if (fs.existsSync(srcPath)) fs.unlinkSync(srcPath);
      if (fs.existsSync(exePath)) fs.unlinkSync(exePath);
    } catch (e) {}

    return { 
      success: false, 
      output: error.message, 
      type: 'system_error' 
    };
  }
}

export async function compileOnly(codeSource) {
  const timestamp = Date.now();
  const filename = `code_${timestamp}`;
  const srcPath = path.join(TEMP_DIR, `${filename}.c`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    const compileResult = await new Promise((resolve) => {
      const compile = spawn('gcc', [
        '-fsyntax-only',
        '-Wall',
        '-Wextra',
        srcPath
      ], {
        shell: true,
        windowsHide: true
      });

      let compileError = '';
      compile.stderr.on('data', (data) => {
        compileError += data.toString();
      });

      compile.on('close', (code) => {
        resolve({ exitCode: code, error: compileError });
      });

      compile.on('error', (err) => {
        resolve({ exitCode: -1, error: err.message });
      });
    });

    try {
      fs.unlinkSync(srcPath);
    } catch (e) {}

    if (compileResult.exitCode !== 0) {
      return {
        success: false,
        output: formatCompileError(compileResult.error, TEMP_DIR),
        type: 'syntax_error'
      };
    }

    return {
      success: true,
      output: '编译成功! (无语法错误)',
      type: 'success'
    };

  } catch (error) {
    return {
      success: false,
      output: error.message,
      type: 'system_error'
    };
  }
}

export async function getAssembly(codeSource, optimization = '0') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const srcPath = path.join(TEMP_DIR, `asm_${timestamp}_${random}.c`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    const args = [
      `-O${optimization}`,
      '-S',
      '-masm=intel',
      '-fno-asynchronous-unwind-tables',
      '-fno-dwarf2-cfi-asm',
      '-o', '-',
      srcPath
    ];

    const result = await new Promise((resolve) => {
      const proc = spawn('gcc', args, { shell: true, windowsHide: true });
      let stdout = '';
      let stderr = '';
      proc.stdout.on('data', (d) => stdout += d.toString());
      proc.stderr.on('data', (d) => stderr += d.toString());
      proc.on('close', (code) => resolve({ exitCode: code, stdout, stderr }));
      proc.on('error', (err) => resolve({ exitCode: -1, stdout: '', stderr: err.message }));
    });

    if (result.exitCode !== 0) {
      return {
        success: false,
        output: result.stderr.replace(new RegExp(path.basename(srcPath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 'main.c'),
        type: 'compile_error'
      };
    }

    const cleaned = result.stdout
      .split('\n')
      .filter(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('.cfi_')) return false;
        if (trimmed.startsWith('.type')) return false;
        if (trimmed.startsWith('.size')) return false;
        if (trimmed.startsWith('.ident')) return false;
        if (trimmed.startsWith('.file') && !trimmed.includes('.c')) return false;
        if (trimmed.startsWith('.section') && !trimmed.includes('.text') && !trimmed.includes('.rodata')) return false;
        if (trimmed.startsWith('.p2align')) return false;
        if (trimmed.startsWith('.def') || trimmed.startsWith('.scl') || trimmed.startsWith('.endef')) return false;
        return true;
      })
      .join('\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    return {
      success: true,
      output: cleaned,
      type: 'assembly',
      optimization: `O${optimization}`
    };

  } catch (error) {
    return { success: false, output: error.message, type: 'system_error' };
  } finally {
    try { fs.unlinkSync(srcPath); } catch {}
  }
}

export async function queryTypeInfo(typeName) {
  if (!/^[a-zA-Z_][a-zA-Z0-9_ *]*$/.test(typeName) || typeName.length > 100) {
    return { success: false, output: '无效的类型名', type: 'invalid_input' };
  }

  const code = `#include <stdio.h>
#include <stddef.h>
#include <stdint.h>
#include <limits.h>
#include <float.h>
#include <string.h>

int main() {
    printf("========== 类型信息 ==========\\n");
    printf("类型: ${typeName}\\n");
    printf("sizeof: %zu 字节\\n", sizeof(${typeName}));
    printf("位数: %zu 位\\n", sizeof(${typeName}) * 8);

    struct _align_test { char c; ${typeName} x; };
    printf("对齐: %zu 字节\\n", offsetof(struct _align_test, x));
    printf("==============================\\n");
    return 0;
}`;

  return await runCode(code, '');
}

export async function formatCode(codeSource) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const srcPath = path.join(TEMP_DIR, `fmt_${timestamp}_${random}.c`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    const result = await new Promise((resolve) => {
      const p = spawn('clang-format', ['--style=Google', srcPath], { shell: true, windowsHide: true });
      let stdout = '';
      let stderr = '';
      p.stdout.on('data', (d) => stdout += d.toString());
      p.stderr.on('data', (d) => stderr += d.toString());
      p.on('close', (code) => resolve({ exitCode: code, stdout, stderr }));
      p.on('error', () => resolve({ exitCode: -1, stdout: '', stderr: 'clang-format 不可用' }));
    });

    if (result.exitCode === 0 && result.stdout) {
      return { success: true, output: result.stdout, type: 'formatted', tool: 'clang-format' };
    }

    const formatted = simpleFormat(codeSource);
    return { success: true, output: formatted, type: 'formatted', tool: 'built-in' };

  } catch (error) {
    return { success: false, output: error.message, type: 'system_error' };
  } finally {
    try { fs.unlinkSync(srcPath); } catch {}
  }
}

function simpleFormat(code) {
  const lines = code.split('\n');
  let indent = 0;
  const result = [];

  for (let line of lines) {
    let trimmed = line.trim();
    if (!trimmed) { result.push(''); continue; }

    if (trimmed.startsWith('}') || trimmed.startsWith(')')) {
      indent = Math.max(0, indent - 1);
    }

    result.push('    '.repeat(indent) + trimmed);

    const opens = (trimmed.match(/{/g) || []).length;
    const closes = (trimmed.match(/}/g) || []).length;
    indent += opens - closes;
    if (indent < 0) indent = 0;
  }

  return result.join('\n');
}

export async function memcheck(codeSource, stdinInput = '') {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const srcPath = path.join(TEMP_DIR, `mem_${timestamp}_${random}.c`);
  const exePath = path.join(TEMP_DIR, `mem_${timestamp}_${random}${process.platform === 'win32' ? '.exe' : ''}`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    let hasValgrind = false;
    if (process.platform !== 'win32') {
      try {
        const vcheck = await new Promise((resolve) => {
          const p = spawn('valgrind', ['--version'], { shell: true });
          p.on('close', (code) => resolve(code === 0));
          p.on('error', () => resolve(false));
        });
        hasValgrind = vcheck;
      } catch { hasValgrind = false; }
    }

    if (hasValgrind) {
      const compile = await new Promise((resolve) => {
        const p = spawn('gcc', [srcPath, '-o', exePath, '-g', '-O0'], { shell: true, windowsHide: true });
        let stderr = '';
        p.stderr.on('data', (d) => stderr += d.toString());
        p.on('close', (code) => resolve({ exitCode: code, stderr }));
        p.on('error', (err) => resolve({ exitCode: -1, stderr: err.message }));
      });

      if (compile.exitCode !== 0) {
        return { success: false, output: compile.stderr, type: 'compile_error' };
      }

      const result = await new Promise((resolve) => {
        const p = spawn('valgrind', [
          '--leak-check=full',
          '--show-leak-kinds=all',
          '--track-origins=yes',
          '--error-exitcode=1',
          exePath
        ], { shell: true, windowsHide: true });

        let stdout = '';
        let stderr = '';
        
        if (stdinInput) { try { p.stdin.write(stdinInput); } catch {} }
        try { p.stdin.end(); } catch {}

        const timer = setTimeout(() => { try { p.kill(); } catch {} }, 10000);
        p.stdout.on('data', (d) => stdout += d.toString());
        p.stderr.on('data', (d) => stderr += d.toString());
        p.on('close', (code) => { clearTimeout(timer); resolve({ exitCode: code, stdout, stderr }); });
        p.on('error', (err) => { clearTimeout(timer); resolve({ exitCode: -1, stdout: '', stderr: err.message }); });
      });

      let report = '🔍 Valgrind 内存检测报告\n\n';
      const leakMatch = result.stderr.match(/definitely lost: ([\d,]+) bytes/);
      const possiblyMatch = result.stderr.match(/possibly lost: ([\d,]+) bytes/);
      const errorsMatch = result.stderr.match(/ERROR SUMMARY: (\d+) errors/);
      const invalidRead = (result.stderr.match(/Invalid read/g) || []).length;
      const invalidWrite = (result.stderr.match(/Invalid write/g) || []).length;
      const uninit = (result.stderr.match(/uninitialised/gi) || []).length;

      const hasIssues = (errorsMatch && parseInt(errorsMatch[1]) > 0) || (leakMatch && leakMatch[1] !== '0');

      if (invalidRead > 0) report += `❌ 无效读取: ${invalidRead} 次\n`;
      if (invalidWrite > 0) report += `❌ 无效写入: ${invalidWrite} 次\n`;
      if (uninit > 0) report += `⚠️ 使用未初始化的值: ${uninit} 次\n`;
      if (leakMatch && leakMatch[1] !== '0') report += `💧 确定泄漏: ${leakMatch[1]} 字节\n`;
      if (possiblyMatch && possiblyMatch[1] !== '0') report += `💧 可能泄漏: ${possiblyMatch[1]} 字节\n`;

      if (!hasIssues) {
        report += '✅ 未发现内存错误或泄漏！\n';
      }

      if (result.stdout) report += `\n程序输出:\n${result.stdout}\n`;
      report += `\n${'─'.repeat(40)}\n原始报告:\n${result.stderr}`;

      return { success: !hasIssues, output: report, type: hasIssues ? 'memory_error' : 'success' };

    } else {
      return {
        success: false,
        output: '⚠️ 内存检测工具不可用\n\nWindows: AddressSanitizer 在 MinGW 上不支持\nLinux: 请安装 Valgrind (sudo apt install valgrind)\n\n当前只能通过普通运行检测段错误等严重错误。',
        type: 'not_available'
      };
    }

  } catch (error) {
    return { success: false, output: error.message, type: 'system_error' };
  } finally {
    try { fs.unlinkSync(srcPath); } catch {}
    try { fs.unlinkSync(exePath); } catch {}
  }
}

export async function preprocess(codeSource) {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const srcPath = path.join(TEMP_DIR, `pp_${timestamp}_${random}.c`);

  try {
    fs.writeFileSync(srcPath, codeSource, 'utf8');

    const result = await new Promise((resolve) => {
      const proc = spawn('gcc', ['-E', '-P', srcPath], { shell: true, windowsHide: true });
      let stdout = '';
      let stderr = '';
      proc.stdout.on('data', (d) => stdout += d.toString());
      proc.stderr.on('data', (d) => stderr += d.toString());
      proc.on('close', (code) => resolve({ exitCode: code, stdout, stderr }));
      proc.on('error', (err) => resolve({ exitCode: -1, stdout: '', stderr: err.message }));
    });

    if (result.exitCode !== 0) {
      return {
        success: false,
        output: result.stderr.replace(new RegExp(path.basename(srcPath).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), 'main.c'),
        type: 'compile_error'
      };
    }

    const lines = result.stdout.split('\n');
    const totalLines = lines.length;
    const displayLines = lines.slice(Math.max(0, totalLines - 300));
    const truncated = totalLines > 300;

    let output = '';
    if (truncated) {
      output += `/* 预处理输出共 ${totalLines} 行，以下显示最后 ${displayLines.length} 行 */\n`;
      output += `/* （前面 ${totalLines - displayLines.length} 行是标准库头文件内容） */\n\n`;
    }
    output += displayLines.join('\n');

    return {
      success: true,
      output: output.trim(),
      type: 'preprocessed',
      totalLines
    };

  } catch (error) {
    return { success: false, output: error.message, type: 'system_error' };
  } finally {
    try { fs.unlinkSync(srcPath); } catch {}
  }
}
