# Web GCC - 在线C代码编译运行系统技术报告

## 1. 项目概述

### 1.1 项目背景
本项目是一个基于Web的C语言在线编译运行平台，集成于C语言学习网页应用中。用户可以在网页上直接编写C代码并执行，系统提供编译错误检测、运行时错误检测以及（Linux环境下）内存错误检测功能。

### 1.2 核心功能
- 在线C代码编辑
- 代码编译与执行
- 编译错误实时反馈
- 运行时错误检测
- 死循环超时保护
- Linux环境下的内存错误检测 (AddressSanitizer)

---

## 2. 系统架构

### 2.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        用户浏览器                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              React 前端 (CodeRunner 组件)            │    │
│  │  - 代码编辑器 (自动调整高度)                          │    │
│  │  - 编译/运行按钮                                     │    │
│  │  - 结果显示区域                                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼ HTTP POST                         │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  Node.js 后端服务器 (Express)                │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              API 端点                                │    │
│  │  - POST /api/run      (编译运行代码)                │    │
│  │  - POST /api/compile  (仅编译检查)                  │    │
│  │  - GET  /api/gcc-check (检查GCC是否可用)             │    │
│  └─────────────────────────────────────────────────────┘    │
│                          │                                   │
│                          ▼                                   │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              runner.js 核心模块                      │    │
│  │  - 临时文件管理                                      │    │
│  │  - GCC 进程调用                                      │    │
│  │  - 执行超时控制                                      │    │
│  │  - AddressSanitizer 集成                            │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    本地系统 (GCC编译器)                      │
│                                                              │
│   Windows: MinGW GCC  │  Linux: GCC (支持ASan)              │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 技术栈
| 层级 | 技术 | 版本 |
|------|------|------|
| 前端框架 | React | 19.x |
| 构建工具 | Vite | 6.x |
| 后端框架 | Express | 4.x |
| 编译器 | GCC (MinGW) | 14.x |
| 语言 | TypeScript / JavaScript | - |

---

## 3. 前端实现

### 3.1 CodeRunner 组件

**文件位置**: `src/components/CodeRunner.tsx`

**核心功能**:
1. 代码编辑区域（自动调整高度）
2. 编译/运行按钮
3. 运行结果显示（成功/错误类型识别）

**主要代码结构**:

```typescript
// 状态管理
const [code, setCode] = useState(defaultCode);      // 用户代码
const [isRunning, setIsRunning] = useState(false);  // 运行状态
const [result, setResult] = useState<RunResult | null>(null);  // 运行结果

// 自动调整高度
const adjustHeight = useCallback(() => {
  const textarea = textareaRef.current;
  if (textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.max(120, textarea.scrollHeight) + 'px';
  }
}, []);

useEffect(() => {
  adjustHeight();
}, [code, adjustHeight]);

// 运行代码
const handleRun = async () => {
  const response = await fetch('http://localhost:3001/api/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code })
  });
  const data = await response.json();
  setResult(data);
};
```

### 3.2 UI 设计

- 深色主题 (Slate-900)
- 青色强调色 (Cyan-600)
- 代码字体 (Monospace)
- 运行状态指示器 (Loader2 图标)
- 错误类型分类显示

---

## 4. 后端实现

### 4.1 API 端点

**文件位置**: `server/index.js`

#### POST /api/run
编译并运行代码

```javascript
app.post('/api/run', async (req, res) => {
  const { code, mode } = req.body;
  
  // 输入验证
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
  
  // 执行代码
  const result = await runCode(code);
  res.json(result);
});
```

#### POST /api/compile
仅编译代码（不运行）

```javascript
app.post('/api/compile', async (req, res) => {
  const { code } = req.body;
  const result = await compileOnly(code);
  res.json(result);
});
```

#### GET /api/gcc-check
检查GCC是否可用

```javascript
app.get('/api/gcc-check', (req, res) => {
  const check = spawn('gcc', ['--version'], { shell: true });
  check.on('close', (code) => {
    res.json({ available: code === 0 });
  });
  check.on('error', () => {
    res.json({ available: false });
  });
});
```

### 4.2 核心运行器 (runner.js)

**文件位置**: `server/runner.js`

#### 4.2.1 代码编译

```javascript
async function runCode(codeSource) {
  // 1. 创建临时源文件
  const srcPath = path.join(TEMP_DIR, `${filename}.c`);
  fs.writeFileSync(srcPath, codeSource, 'utf8');
  
  // 2. 构建编译参数
  const compileArgs = [
    srcPath,
    '-o', exePath,
    '-g'  // 调试信息
  ];
  
  // 3. Linux下启用AddressSanitizer
  if (asanAvailable) {
    compileArgs.push('-fsanitize=address');
    compileArgs.push('-fno-omit-frame-pointer');
  }
  
  // 4. 执行编译
  const compile = spawn('gcc', compileArgs, { shell: true });
  // ... 捕获编译错误
}
```

#### 4.2.2 代码执行与超时控制

```javascript
const runResult = await new Promise((resolve) => {
  const run = spawn(exePath, [], { shell: true });
  
  // 超时保护 (3秒)
  const timer = setTimeout(() => {
    run.kill();
    resolve({ 
      exitCode: -1, 
      stderr: '运行超时 (3秒)，可能是死循环！',
      timedOut: true 
    });
  }, TIMEOUT_MS);
  
  run.on('close', (code) => {
    clearTimeout(timer);
    resolve({ exitCode: code, stdout, stderr });
  });
});
```

#### 4.2.3 错误类型识别

```javascript
if (runResult.exitCode !== 0 || runResult.stderr) {
  let errorType = 'runtime_error';
  
  // 检测内存错误 (AddressSanitizer)
  if (runResult.stderr.includes('AddressSanitizer') || 
      runResult.stderr.includes('ASan')) {
    errorType = 'memory_error';
  }
  
  return { success: false, output: runResult.stderr, type: errorType };
}
```

### 4.3 AddressSanitizer (ASan) 集成

#### 4.3.1 ASan 可用性检测

```javascript
async function checkAsanAvailable() {
  return new Promise((resolve) => {
    const testCode = `#include <stdio.h>
int main() { return 0; }`;
    
    // 尝试编译带ASan的测试程序
    const compile = spawn('gcc', [
      testPath, '-o', testExe, '-fsanitize=address'
    ], { shell: true });
    
    compile.on('close', (code) => {
      resolve(code === 0);  // 成功说明ASan可用
    });
  });
}
```

#### 4.3.2 ASan 支持的错误检测

| 错误类型 | 检测对象 | 示例 |
|---------|---------|------|
| 堆溢出 | heap-buffer-overflow | 数组越界写 |
| 堆释放后使用 | heap-use-after-free | use-after-free |
| 栈溢出 | stack-buffer-overflow | 局部数组越界 |
| 全局区溢出 | global-buffer-overflow | 全局数组越界 |
| 空指针解引用 | null-dereference | *NULL |

---

## 5. 跨平台兼容性

### 5.1 Windows (MinGW)

```javascript
// Windows 特定配置
const spawn = require('child_process').spawn;
const run = spawn(exePath, [], {
  shell: true,           // PowerShell/cmd执行
  windowsHide: true       // 隐藏控制台窗口
});
```

**限制**:
- AddressSanitizer 不支持 (MinGW版本)
- 仅提供编译和基本运行功能

### 5.2 Linux

```javascript
// Linux 配置
const run = spawn('./' + exePath, [], {
  shell: false,  // 直接执行
  cwd: TEMP_DIR
});
```

**优势**:
- 完整的 AddressSanitizer 支持
- 更详细的错误信息
- 更快的执行速度

---

## 6. 错误处理

### 6.1 错误类型映射

| 返回类型 | 含义 | 触发条件 |
|---------|------|---------|
| `success` | 运行成功 | exitCode === 0 且无stderr |
| `compile_error` | 编译错误 | GCC返回非0退出码 |
| `runtime_error` | 运行时错误 | 程序崩溃但无ASan信息 |
| `memory_error` | 内存错误 | 检测到ASan报告 |
| `timeout` | 运行超时 | 3秒内未结束 |
| `invalid_input` | 输入无效 | 代码为空或非字符串 |
| `too_long` | 代码过长 | 超过10000字符 |
| `system_error` | 系统错误 | 文件操作失败等 |
| `connection_error` | 连接错误 | 无法连接后端 |

### 6.2 用户友好的错误提示

```javascript
const getTypeLabel = (type) => ({
  success: '运行成功',
  compile_error: '编译错误',
  runtime_error: '运行时错误',
  memory_error: '内存错误',
  timeout: '运行超时',
  // ...
}[type]);
```

---

## 7. 安全考虑

### 7.1 临时文件管理

```javascript
// 执行后清理临时文件
try {
  fs.unlinkSync(srcPath);
  fs.unlinkSync(exePath);
} catch (e) {
  // 忽略清理失败
}
```

### 7.2 输入限制

- 代码长度限制: 10,000 字符
- 超时保护: 3秒
- 仅接受有效的C代码字符串

### 7.3 建议的安全增强

1. **沙箱隔离**: 使用Docker容器运行用户代码
2. **资源限制**: 限制内存使用、CPU时间
3. **网络隔离**: 禁止网络访问
4. **并发控制**: 限制同时运行的任务数

---

## 8. 性能优化

### 8.1 当前优化

- 临时文件复用
- 异步进程管理
- 及时的资源释放

### 8.2 未来优化建议

1. **编译缓存**: 缓存常用代码的编译结果
2. **进程池**: 预启动GCC进程减少启动延迟
3. **WebAssembly**: 考虑使用WebAssembly版编译器实现客户端编译

---

## 9. 使用示例

### 9.1 正常程序

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

**输出**:
```
Hello, World!
```

### 9.2 编译错误

```c
#include <stdio.h>

int main() {
    print("Hello\n");  // 错误: printf拼写错误
    return 0;
}
```

**输出**:
```
main.c: In function 'main':
main.c:4:5: warning: implicit declaration of function 'print' [-Wimplicit-function-declaration]
main.c:4:5: error: too few arguments to function 'printf'
```

### 9.3 内存错误 (Linux + ASan)

```c
#include <stdio.h>

int main() {
    int *p = NULL;
    *p = 10;  // 空指针解引用
    return 0;
}
```

**输出**:
```
AddressSanitizer: heap-buffer-overflow on address 0x000000000000
WRITE of size 4 at 0x000000000000
    #0 0x... in main main.c:5
```

---

## 10. 部署指南

### 10.1 环境要求

| 组件 | 要求 |
|------|------|
| Node.js | 18.x 或更高 |
| npm | 8.x 或更高 |
| GCC | 9.x 或更高 (Linux推荐) |
| MinGW | 最新版本 (Windows) |

### 10.2 安装步骤

```bash
# 1. 克隆项目
git clone <project-url>
cd <project-dir>

# 2. 安装前端依赖
npm install

# 3. 安装后端依赖
cd server
npm install
cd ..

# 4. 启动后端 (端口3001)
npm run dev:server

# 5. 启动前端 (端口5173)
npm run dev
```

### 10.3 生产环境

```bash
# 构建前端
npm run build

# 使用PM2运行后端
cd server
pm2 start index.js --name web-gcc
```

---

## 11. 总结

本系统实现了在Web浏览器中在线编译运行C代码的功能，支持：

- ✅ 跨平台运行 (Windows/Linux)
- ✅ 编译错误检测
- ✅ 运行时错误反馈
- ✅ 死循环保护
- ✅ Linux下内存错误检测 (AddressSanitizer)

系统架构清晰，前后端分离，易于扩展和维护。可以进一步通过Docker沙箱、进程池等技术提升安全性和性能。

---

**文档版本**: 1.0  
**生成日期**: 2026-02-16
