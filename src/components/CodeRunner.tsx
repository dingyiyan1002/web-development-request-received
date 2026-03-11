import { memo, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Play, Loader2, AlertCircle, CheckCircle2, Terminal, X, Copy, Check, Maximize2, Minimize2, RotateCcw, Settings, ChevronDown, Keyboard } from 'lucide-react';
import { CodeTypingPractice } from './CodeTypingPractice';

interface RunResult {
  success: boolean;
  output: string;
  type: string;
}

interface CodeRunnerProps {
  initialCode?: string;
  onClose?: () => void;
  standalone?: boolean;
}

const C_KEYWORDS = new Set([
  'auto', 'break', 'case', 'const', 'continue', 'default', 'do', 'else',
  'enum', 'extern', 'for', 'goto', 'if', 'register', 'return', 'sizeof',
  'static', 'struct', 'switch', 'typedef', 'union', 'volatile', 'while',
  'inline', 'restrict', '_Bool', '_Complex', '_Imaginary'
]);

const C_TYPES = new Set([
  'int', 'char', 'float', 'double', 'void', 'short', 'long', 'unsigned',
  'signed', 'size_t', 'ssize_t', 'pid_t', 'FILE', 'ptrdiff_t', 'int8_t',
  'int16_t', 'int32_t', 'int64_t', 'uint8_t', 'uint16_t', 'uint32_t', 'uint64_t'
]);

const C_CONSTANTS = new Set([
  'NULL', 'EOF', 'true', 'false', 'TRUE', 'FALSE',
  'EXIT_SUCCESS', 'EXIT_FAILURE'
]);

interface Token {
  type: 'keyword' | 'type' | 'constant' | 'string' | 'char' | 'number' |
        'comment' | 'preprocessor' | 'function' | 'operator' | 'punctuation' |
        'identifier' | 'whitespace' | 'newline';
  value: string;
}

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    if (code[i] === '\n') {
      tokens.push({ type: 'newline', value: '\n' });
      i++;
      continue;
    }

    if (/[ \t\r]/.test(code[i])) {
      let ws = '';
      while (i < code.length && /[ \t\r]/.test(code[i])) {
        ws += code[i++];
      }
      tokens.push({ type: 'whitespace', value: ws });
      continue;
    }

    if (code[i] === '/' && code[i + 1] === '/') {
      let comment = '';
      while (i < code.length && code[i] !== '\n') {
        comment += code[i++];
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    if (code[i] === '/' && code[i + 1] === '*') {
      let comment = '/*';
      i += 2;
      while (i < code.length - 1 && !(code[i] === '*' && code[i + 1] === '/')) {
        comment += code[i++];
      }
      if (i < code.length - 1) {
        comment += '*/';
        i += 2;
      }
      tokens.push({ type: 'comment', value: comment });
      continue;
    }

    if (code[i] === '#') {
      let directive = '';
      while (i < code.length && code[i] !== '\n') {
        directive += code[i++];
      }
      tokens.push({ type: 'preprocessor', value: directive });
      continue;
    }

    if (code[i] === '"') {
      let str = '"';
      i++;
      while (i < code.length && code[i] !== '"') {
        if (code[i] === '\\' && i + 1 < code.length) {
          str += code[i++];
        }
        str += code[i++];
      }
      if (i < code.length) {
        str += '"';
        i++;
      }
      tokens.push({ type: 'string', value: str });
      continue;
    }

    if (code[i] === "'") {
      let ch = "'";
      i++;
      while (i < code.length && code[i] !== "'") {
        if (code[i] === '\\' && i + 1 < code.length) {
          ch += code[i++];
        }
        ch += code[i++];
      }
      if (i < code.length) {
        ch += "'";
        i++;
      }
      tokens.push({ type: 'char', value: ch });
      continue;
    }

    if (/[0-9]/.test(code[i]) || (code[i] === '.' && i + 1 < code.length && /[0-9]/.test(code[i + 1]))) {
      let num = '';
      if (code[i] === '0' && (code[i + 1] === 'x' || code[i + 1] === 'X')) {
        num = '0x';
        i += 2;
        while (i < code.length && /[0-9a-fA-F]/.test(code[i])) {
          num += code[i++];
        }
      } else if (code[i] === '0' && i + 1 < code.length && /[0-7]/.test(code[i + 1])) {
        while (i < code.length && /[0-7]/.test(code[i])) {
          num += code[i++];
        }
      } else {
        while (i < code.length && /[0-9.]/.test(code[i])) {
          num += code[i++];
        }
        if (i < code.length && (code[i] === 'e' || code[i] === 'E')) {
          num += code[i++];
          if (i < code.length && (code[i] === '+' || code[i] === '-')) {
            num += code[i++];
          }
          while (i < code.length && /[0-9]/.test(code[i])) {
            num += code[i++];
          }
        }
      }
      while (i < code.length && /[uUlLfF]/.test(code[i])) {
        num += code[i++];
      }
      tokens.push({ type: 'number', value: num });
      continue;
    }

    if (/[a-zA-Z_]/.test(code[i])) {
      let ident = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        ident += code[i++];
      }

      let j = i;
      while (j < code.length && /[ \t]/.test(code[j])) j++;
      const isFunction = j < code.length && code[j] === '(';

      if (C_KEYWORDS.has(ident)) {
        tokens.push({ type: 'keyword', value: ident });
      } else if (C_TYPES.has(ident)) {
        tokens.push({ type: 'type', value: ident });
      } else if (C_CONSTANTS.has(ident)) {
        tokens.push({ type: 'constant', value: ident });
      } else if (isFunction) {
        tokens.push({ type: 'function', value: ident });
      } else {
        tokens.push({ type: 'identifier', value: ident });
      }
      continue;
    }

    const ops2 = ['==', '!=', '<=', '>=', '&&', '||', '<<', '>>', '+=', '-=', '*=', '/=', '%=', '&=', '|=', '^=', '->', '++', '--'];
    let foundOp = false;
    for (const op of ops2) {
      if (code.substring(i, i + op.length) === op) {
        tokens.push({ type: 'operator', value: op });
        i += op.length;
        foundOp = true;
        break;
      }
    }
    if (foundOp) continue;

    if ('+-*/%=<>&|^!~?:'.includes(code[i])) {
      tokens.push({ type: 'operator', value: code[i] });
      i++;
      continue;
    }

    if ('(){}[];,.'.includes(code[i])) {
      tokens.push({ type: 'punctuation', value: code[i] });
      i++;
      continue;
    }

    tokens.push({ type: 'identifier', value: code[i] });
    i++;
  }

  return tokens;
}

const TOKEN_COLORS: Record<Token['type'], string> = {
  keyword: 'text-purple-400 font-semibold',
  type: 'text-cyan-300',
  constant: 'text-orange-400 font-semibold',
  string: 'text-green-400',
  char: 'text-green-300',
  number: 'text-orange-300',
  comment: 'text-slate-500 italic',
  preprocessor: 'text-amber-400',
  function: 'text-blue-400',
  operator: 'text-sky-300',
  punctuation: 'text-slate-300',
  identifier: 'text-slate-200',
  whitespace: '',
  newline: '',
};

function HighlightedLine({ tokens }: { tokens: Token[] }) {
  return (
    <>
      {tokens.map((token, i) => {
        // 直接渲染字符，不使用 HTML 实体编码，确保宽度一致
        return (
          <span key={i} className={TOKEN_COLORS[token.type]}>
            {token.value}
          </span>
        );
      })}
    </>
  );
}

interface TypingAreaProps {
  code: string;
  userInput: string;
  onInput: (input: string) => void;
  onComplete: (input: string) => void;
  onBack: () => void;
}

function TypingArea({ code, userInput, onInput, onComplete, onBack }: TypingAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isStarted, setIsStarted] = useState(false);

  const isFinished = userInput.length >= code.length && code.length > 0;

  // 处理点击定位光标
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;

    // 聚焦容器
    containerRef.current.focus();

    const pre = containerRef.current.querySelector('pre');
    if (!pre) return;

    const rect = pre.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // 使用 pre 元素的字体设置来计算
    const computedStyle = window.getComputedStyle(pre);
    const fontSize = parseFloat(computedStyle.fontSize);
    const fontFamily = computedStyle.fontFamily;

    // 创建一个临时元素来测量字符宽度
    const tempSpan = document.createElement('span');
    tempSpan.style.font = computedStyle.font;
    tempSpan.style.visibility = 'hidden';
    tempSpan.style.position = 'absolute';
    tempSpan.textContent = 'M';
    pre.appendChild(tempSpan);
    const charWidth = tempSpan.offsetWidth;
    pre.removeChild(tempSpan);

    const lineHeight = fontSize * 1.6;

    const clickedLine = Math.floor(clickY / lineHeight);
    const clickedCol = Math.floor(clickX / charWidth);

    // 计算代码中的绝对位置
    let pos = 0;
    let line = 0;
    for (let i = 0; i < code.length; i++) {
      if (code[i] === '\n') {
        if (line === clickedLine) {
          pos = i;
          break;
        }
        line++;
        pos = i + 1;
      }
    }

    // 添加列偏移
    pos = Math.min(pos + clickedCol, code.length);

    console.log(`Click: x=${clickX}, y=${clickY}, line=${clickedLine}, col=${clickedCol}, pos=${pos}`);

    // 截断 userInput 到点击位置
    onInput(userInput.slice(0, pos));
  }, [code, userInput, onInput]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // 修饰键组合跳过处理
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    if (!isStarted) {
      setIsStarted(true);
      typingStartTimeGlobal = Date.now();
    }

    const cursorPos = userInput.length;

    // 方向键和导航键 - 允许移动光标（通过调整 userInput 长度）
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (cursorPos > 0) {
        onInput(userInput.slice(0, cursorPos - 1));
      }
      return;
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (cursorPos < code.length) {
        // 向右移动时，如果后面有已输入的字符，恢复它们
        onInput(userInput + code[cursorPos]);
      }
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      // 移动到上一行相同列位置
      let lineStart = 0;
      for (let i = 0; i < cursorPos; i++) {
        if (code[i] === '\n') lineStart = i + 1;
      }
      if (lineStart > 0) {
        // 找到上一行的行首
        let prevLineStart = 0;
        for (let i = 0; i < lineStart - 1; i++) {
          if (code[i] === '\n') prevLineStart = i + 1;
        }
        // 计算当前列
        const col = cursorPos - lineStart;
        const newPos = Math.min(prevLineStart + col, lineStart - 1);
        onInput(userInput.slice(0, newPos));
      }
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      // 移动到下一行相同列位置
      let nextLineStart = -1;
      for (let i = cursorPos; i < code.length; i++) {
        if (code[i] === '\n') {
          nextLineStart = i + 1;
          break;
        }
      }
      if (nextLineStart >= 0) {
        // 找到下下行的行首
        let nextNextLineStart = -1;
        for (let i = nextLineStart; i < code.length; i++) {
          if (code[i] === '\n') {
            nextNextLineStart = i + 1;
            break;
          }
        }
        // 计算当前列
        let lineStart = 0;
        for (let i = 0; i < cursorPos; i++) {
          if (code[i] === '\n') lineStart = i + 1;
        }
        const col = cursorPos - lineStart;
        const targetEnd = nextNextLineStart >= 0 ? nextNextLineStart - 1 : code.length;
        const newPos = Math.min(nextLineStart + col, targetEnd);
        onInput(userInput.slice(0, newPos));
      }
      return;
    }
    if (e.key === 'Home') {
      e.preventDefault();
      // 移动到行首
      let lineStart = 0;
      for (let i = 0; i < cursorPos; i++) {
        if (code[i] === '\n') lineStart = i + 1;
      }
      onInput(userInput.slice(0, lineStart));
      return;
    }
    if (e.key === 'End') {
      e.preventDefault();
      // 移动到行尾
      let lineEnd = cursorPos;
      for (let i = cursorPos; i < code.length; i++) {
        if (code[i] === '\n') {
          lineEnd = i;
          break;
        }
        lineEnd = i + 1;
      }
      onInput(userInput.slice(0, lineEnd));
      return;
    }
    if (e.key === 'PageUp' || e.key === 'PageDown' || e.key === 'Escape') {
      return;
    }

    // Backspace 处理 - 删除光标前的字符
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (cursorPos > 0) {
        onInput(userInput.slice(0, cursorPos - 1));
      }
      return;
    }

    // Tab 键处理 - 自动补全缩进
    if (e.key === 'Tab') {
      e.preventDefault();
      const remaining = code.substring(cursorPos);
      const spacesMatch = remaining.match(/^( {1,4})/);
      const spaces = spacesMatch ? spacesMatch[1] : '    ';
      onInput(userInput + spaces);
      return;
    }

    // Enter 键处理
    if (e.key === 'Enter') {
      e.preventDefault();
      onInput(userInput + '\n');
      return;
    }

    // 所有单个字符都允许输入（包括符号 < > & \ ; ) 等）
    if (e.key.length === 1) {
      e.preventDefault();
      onInput(userInput + e.key);
    }
  }, [code, userInput, onInput, isStarted]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.focus();
    }
  }, []);

  const renderCode = useMemo(() => {
    const elements: JSX.Element[] = [];
    const cursorPos = userInput.length; // 光标位置始终在已输入内容的末尾

    console.log(`[renderCode] code.length=${code.length}, userInput.length=${userInput.length}, cursorPos=${cursorPos}`);
    console.log(`[renderCode] userInput="${userInput}"`);

    for (let i = 0; i < code.length; i++) {
      const char = code[i];
      let className = 'text-slate-500';

      // 已输入的部分：检查是否正确
      if (i < cursorPos) {
        const userInputChar = userInput[i];
        console.log(`[renderCode] i=${i}, char="${char}", userInputChar="${userInputChar}", match=${userInputChar === char}`);
        className = userInputChar === char ? 'text-cyan-300' : 'text-red-400 bg-red-500/20';
      }

      // 如果当前位置是光标位置，在字符前添加光标
      if (i === cursorPos) {
        console.log(`[renderCode] Adding cursor BEFORE char at i=${i}, char="${char}"`);
        elements.push(<span key={`cursor-${i}`} className="bg-cyan-500/50 w-[2px] inline-block h-[1.2em] align-middle">&nbsp;</span>);
      }

      // 渲染字符
      if (char === '\n') {
        elements.push(
          <span key={i} className={className}>
            <span className="text-slate-600 select-none">↵</span>
            {'\n'}
          </span>
        );
      } else {
        elements.push(<span key={i} className={className}>{char}</span>);
      }
    }

    // 如果光标在最后，添加光标
    if (cursorPos === code.length) {
      console.log(`[renderCode] Adding cursor at END, cursorPos=${cursorPos}===code.length=${code.length}`);
      elements.push(<span key="cursor-end" className="bg-cyan-500/50 w-[2px] inline-block h-[1.2em] align-middle">&nbsp;</span>);
    }

    return elements;
  }, [code, userInput]);

  const stats = useMemo(() => {
    if (!isStarted || !typingStartTimeGlobal) return { cpm: 0, accuracy: 100 };
    const elapsed = (Date.now() - typingStartTimeGlobal) / 1000 / 60;
    const cpm = elapsed > 0 ? Math.round(userInput.length / elapsed) : 0;
    let correct = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (i < code.length && userInput[i] === code[i]) correct++;
    }
    const accuracy = userInput.length > 0 
      ? Math.round(correct / userInput.length * 100) 
      : 100;
    return { cpm, accuracy };
  }, [userInput, code, isStarted]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-shrink-0 flex items-center justify-between px-4 py-2 bg-slate-800/50 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <Keyboard className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-slate-300">跟打模式</span>
          <span className="text-xs text-slate-500">[{code.length}字符]</span>
          {isStarted && (
            <span className="text-xs text-slate-500">
              {userInput.length} / {code.length} 字符 · {stats.cpm} 字符/分 · {stats.accuracy}% 正确率
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isFinished ? (
            <button
              onClick={() => onComplete(userInput)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600 hover:bg-green-500 rounded-lg text-white text-xs font-medium"
            >
              Check 填入并运行
            </button>
          ) : (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 text-xs"
            >
              放弃返回
            </button>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        tabIndex={0}
        onClick={handleContainerClick}
        onKeyDown={handleKeyDown}
        className="flex-1 overflow-auto p-4 focus:outline-none cursor-text"
        style={{ caretColor: 'transparent' }}
      >
        {!isStarted && (
          <div className="text-center text-slate-500 text-sm mb-4 py-2 bg-slate-800/50 rounded-lg">
            Lightbulb 点击此区域，然后开始打字（请切换到英文输入法）
          </div>
        )}
        <pre className="font-mono leading-7 text-sm" style={{ tabSize: 4 }}>
          {renderCode}
        </pre>
      </div>
    </div>
  );
}

let typingStartTimeGlobal: number | null = null;

const CodeRunner = memo(function CodeRunner({ initialCode = '', onClose, standalone = false }: CodeRunnerProps) {
  const defaultCode = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;

  const [code, setCode] = useState(initialCode || defaultCode);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<RunResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [showSettings, setShowSettings] = useState(false);
  const [stdinInput, setStdinInput] = useState('');
  const [showStdin, setShowStdin] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [asmOptLevel, setAsmOptLevel] = useState('0');
  const [showTypeQuery, setShowTypeQuery] = useState(false);
  const [typeQueryInput, setTypeQueryInput] = useState('int');
  const [availableTools, setAvailableTools] = useState<Record<string, any>>({});
  const [typingMode, setTypingMode] = useState<'edit' | 'typing'>('edit');
  const [cursorPosition, setCursorPosition] = useState({ line: 0, col: 0 });

  useEffect(() => {
    fetch('http://localhost:3001/api/tools')
      .then(r => r.json())
      .then(data => setAvailableTools(data))
      .catch(() => {});
  }, []);

  // 更新光标位置
  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const pos = textarea.selectionStart;
      const codeUpToCursor = code.substring(0, pos);
      const lines = codeUpToCursor.split('\n');
      const line = lines.length - 1;
      const col = lines[lines.length - 1].length;
      setCursorPosition({ line, col });
    }
  }, [code, typingMode]);

  const [typingCode, setTypingCode] = useState('');
  const [userInput, setUserInput] = useState('');

  const [editorHeight, setEditorHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const runCodeRef = useRef<() => void>(() => {});
  const settingsRef = useRef<HTMLDivElement>(null);

  const tokenizedLines = useMemo(() => {
    const allTokens = tokenize(code);
    const lines: Token[][] = [[]];
    for (const token of allTokens) {
      if (token.type === 'newline') {
        lines.push([]);
      } else if (token.type === 'comment' && token.value.includes('\n')) {
        const parts = token.value.split('\n');
        parts.forEach((part, idx) => {
          lines[lines.length - 1].push({ type: 'comment', value: part });
          if (idx < parts.length - 1) {
            lines.push([]);
          }
        });
      } else {
        lines[lines.length - 1].push(token);
      }
    }
    return lines;
  }, [code]);

  const lineCount = tokenizedLines.length;

  const syncScroll = useCallback(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartHeight.current = editorHeight;
  }, [editorHeight]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientY - dragStartY.current;
      const newHeight = Math.max(150, Math.min(800, dragStartHeight.current + delta));
      setEditorHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (!showSettings) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target as Node)) {
        setShowSettings(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;

    // Tab 键处理
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (e.shiftKey) {
        const lineStart = code.lastIndexOf('\n', start - 1) + 1;
        const linePrefix = code.substring(lineStart, start);
        const spaces = linePrefix.match(/^( {1,4}|\t)/);
        if (spaces) {
          const newCode = code.substring(0, lineStart) + code.substring(lineStart + spaces[0].length);
          setCode(newCode);
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start - spaces[0].length;
          }, 0);
        }
      } else {
        const newCode = code.substring(0, start) + '    ' + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = start + 4;
        }, 0);
      }
      return;
    }

    // 括号自动补全 - 只处理成对符号
    const pairs: Record<string, string> = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
    if (pairs[e.key]) {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      if (start !== end) {
        // 选中内容时包裹括号
        const selected = code.substring(start, end);
        const newCode = code.substring(0, start) + e.key + selected + pairs[e.key] + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = end + 1;
        }, 0);
      } else {
        // 无选中时插入括号对，光标在中间
        const newCode = code.substring(0, start) + e.key + pairs[e.key] + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = start + 1;
          textarea.selectionEnd = start + 1;
        }, 0);
      }
      return;
    }

    // 检查是否有选中内容 - 此时应该允许默认行为（删除/替换选区）
    const hasSelection = textarea.selectionStart !== textarea.selectionEnd;
    if (hasSelection && e.key.length === 1) {
      // 选区存在时，让默认行为处理，onChange 会捕获新值
      return;
    }

    // Enter 键处理 - 自动缩进
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const lineStart = code.lastIndexOf('\n', start - 1) + 1;
      const currentLine = code.substring(lineStart, start);
      const indent = currentLine.match(/^(\s*)/)?.[0] || '';
      const prevChar = code[start - 1];
      const nextChar = code[start];

      let extraIndent = '';
      if (prevChar === '{') {
        extraIndent = '    ';
      }

      if (nextChar === '}') {
        // 在闭合括号前回车，添加额外的缩进
        const newIndent = indent + extraIndent;
        const newCode = code.substring(0, start) + '\n' + newIndent + '\n' + indent + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = start + 1 + newIndent.length;
          textarea.selectionEnd = start + 1 + newIndent.length;
        }, 0);
      } else {
        const newIndent = indent + extraIndent;
        const newCode = code.substring(0, start) + '\n' + newIndent + code.substring(end);
        setCode(newCode);
        setTimeout(() => {
          textarea.selectionStart = start + 1 + newIndent.length;
          textarea.selectionEnd = start + 1 + newIndent.length;
        }, 0);
      }
      return;
    }

    // Ctrl+Enter 运行代码
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      runCodeRef.current();
    }
  }, [code]);

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, stdin: stdinInput })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: `连接服务器失败: ${error instanceof Error ? error.message : '未知错误'}\n\n请确保后端服务器正在运行 (npm run dev:server)`,
        type: 'connection_error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, stdinInput]);

  const handleCompile = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:3001/api/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, mode: 'compile' })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: `连接服务器失败: ${error instanceof Error ? error.message : '未知错误'}`,
        type: 'connection_error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleAssembly = useCallback(async () => {
    const codeToUse = typingMode === 'typing' ? typingCode : code;
    if (!codeToUse.trim()) return;

    setIsRunning(true);
    setResult(null);
    setShowTools(false);

    try {
      const response = await fetch('http://localhost:3001/api/assembly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToUse, optimization: asmOptLevel })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: '连接服务器失败: ' + (error instanceof Error ? error.message : '未知错误'),
        type: 'connection_error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, typingMode, typingCode, asmOptLevel]);

  const handlePreprocess = useCallback(async () => {
    const codeToUse = typingMode === 'typing' ? typingCode : code;
    if (!codeToUse.trim()) return;

    setIsRunning(true);
    setResult(null);
    setShowTools(false);

    try {
      const response = await fetch('http://localhost:3001/api/preprocess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToUse })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: '连接服务器失败',
        type: 'connection_error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, typingMode, typingCode]);

  const handleMemcheck = useCallback(async () => {
    if (!availableTools.valgrind?.available && !availableTools.asan?.available) {
      setResult({
        success: false,
        output: 'AlertTriangle️ 内存检测在当前系统不可用\n\n' +
          'Windows (MinGW): 不支持 AddressSanitizer\n' +
          'Linux: sudo apt install valgrind\n\n' +
          '替代方案：\n' +
          '  • 普通运行也能检测段错误（空指针、数组越界等严重错误）\n' +
          '  • 在 WSL (Windows Subsystem for Linux) 中可以使用完整的内存检测\n' +
          '  • 安装 Visual Studio 可以使用 MSVC 的 ASan',
        type: 'not_available'
      });
      return;
    }

    const codeToUse = typingMode === 'typing' ? typingCode : code;
    if (!codeToUse.trim()) return;

    setIsRunning(true);
    setResult(null);
    setShowTools(false);

    try {
      const response = await fetch('http://localhost:3001/api/memcheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToUse, stdin: stdinInput })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({
        success: false,
        output: '连接服务器失败',
        type: 'connection_error'
      });
    } finally {
      setIsRunning(false);
    }
  }, [code, typingMode, typingCode, stdinInput, availableTools]);

  const handleTypeQuery = useCallback(async () => {
    if (!typeQueryInput.trim()) return;
    setIsRunning(true);
    setResult(null);
    setShowTypeQuery(false);

    try {
      const response = await fetch('http://localhost:3001/api/typeinfo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: typeQueryInput.trim() })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ success: false, output: '连接服务器失败', type: 'connection_error' });
    } finally {
      setIsRunning(false);
    }
  }, [typeQueryInput]);

  const handleFormat = useCallback(async () => {
    const codeToUse = typingMode === 'typing' ? typingCode : code;
    if (!codeToUse.trim()) return;

    setIsRunning(true);
    setResult(null);
    setShowTools(false);

    try {
      const response = await fetch('http://localhost:3001/api/format', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToUse })
      });
      const data = await response.json();
      if (data.success) {
        setCode(data.output);
        setResult({ ...data, output: `代码已格式化（使用 ${data.tool}）` });
      } else {
        setResult(data);
      }
    } catch (error) {
      setResult({ success: false, output: '连接服务器失败', type: 'connection_error' });
    } finally {
      setIsRunning(false);
    }
  }, [code, typingMode, typingCode]);

  useEffect(() => {
    runCodeRef.current = handleRun;
  }, [handleRun]);

  const copyCode = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const resetCode = useCallback(() => {
    setCode(initialCode || defaultCode);
    setResult(null);
  }, [initialCode, defaultCode]);

  const needsStdin = useMemo(() => {
    return /\bscanf\b|\bgets\b|\bfgets\b.*stdin|\bgetchar\b|\bfread\b.*stdin/.test(code);
  }, [code]);

  useEffect(() => {
    if (needsStdin && !showStdin) {
      setShowStdin(true);
    }
  }, [needsStdin]);

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      success: 'Check 运行成功',
      compile_error: 'X 编译错误',
      runtime_error: 'X 运行时错误',
      memory_error: 'X 内存错误 (ASan)',
      timeout: 'Timer 运行超时',
      syntax_error: 'X 语法错误',
      invalid_input: 'X 输入无效',
      too_long: 'X 代码过长',
      system_error: 'X 系统错误',
      connection_error: 'X 连接错误',
      assembly: 'Clipboard 汇编代码',
      preprocessed: 'File 预处理输出',
      formatted: 'Palette 代码格式化',
      not_available: 'AlertTriangle️ 不可用'
    };
    return labels[type] || type;
  };

  const getTypeColor = (type: string) => {
    if (type === 'success') return 'border-green-500/50 bg-green-500/5';
    if (type === 'timeout') return 'border-yellow-500/50 bg-yellow-500/5';
    if (type === 'connection_error') return 'border-blue-500/50 bg-blue-500/5';
    if (type === 'assembly') return 'border-cyan-500/50 bg-cyan-500/5';
    if (type === 'formatted') return 'border-green-500/50 bg-green-500/5';
    if (type === 'preprocessed') return 'border-purple-500/50 bg-purple-500/5';
    if (type === 'not_available') return 'border-yellow-500/50 bg-yellow-500/5';
    return 'border-red-500/50 bg-red-500/5';
  };

  const getTypeTextColor = (type: string) => {
    if (type === 'success') return 'text-green-400';
    if (type === 'timeout') return 'text-yellow-400';
    if (type === 'connection_error') return 'text-blue-400';
    if (type === 'assembly') return 'text-cyan-400';
    if (type === 'formatted') return 'text-green-400';
    if (type === 'preprocessed') return 'text-purple-400';
    return 'text-red-400';
  };

  const wrapperClass = isMaximized
    ? 'fixed inset-0 z-50 flex flex-col bg-slate-900'
    : `flex flex-col bg-slate-900 rounded-xl overflow-visible border border-slate-700/50 shadow-2xl ${standalone ? 'h-full' : ''}`;

  return (
    <div ref={containerRef} className={wrapperClass}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/80 border-b border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 cursor-pointer transition-colors" onClick={onClose} title="关闭" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 cursor-pointer transition-colors" onClick={() => setIsMaximized(!isMaximized)} title={isMaximized ? '还原' : '最大化'} />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 cursor-pointer transition-colors" onClick={handleRun} title="运行" />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-slate-300">C 代码运行器</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={copyCode} className="p-1.5 hover:bg-slate-700/50 rounded-md transition-colors" title="复制代码">
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
          </button>

          <button onClick={resetCode} className="p-1.5 hover:bg-slate-700/50 rounded-md transition-colors" title="重置代码">
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </button>

          <div className="relative">
            <button onClick={() => setShowSettings(!showSettings)} className="p-1.5 hover:bg-slate-700/50 rounded-md transition-colors" title="设置">
              <Settings className="w-4 h-4 text-slate-400" />
            </button>
            {showSettings && (
              <>
                <div className="absolute right-0 bottom-full mb-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-3 z-50 min-w-[200px]" ref={settingsRef} onClick={(e) => e.stopPropagation()}>
                <div className="text-xs text-slate-400 mb-2">字体大小</div>
                <div className="flex items-center gap-2">
                  <input 
                    type="range" 
                    min="10" 
                    max="20" 
                    value={fontSize} 
                    onChange={(e) => setFontSize(Number(e.target.value))} 
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                    style={{ accentColor: '#06b6d4' }}
                  />
                  <span className="text-xs text-slate-300 w-8 text-right">{fontSize}px</span>
                </div>
              </div>
              </>
            )}
          </div>

          <button onClick={() => setIsMaximized(!isMaximized)} className="p-1.5 hover:bg-slate-700/50 rounded-md transition-colors" title={isMaximized ? '还原窗口' : '最大化'}>
            {isMaximized ? <Minimize2 className="w-4 h-4 text-slate-400" /> : <Maximize2 className="w-4 h-4 text-slate-400" />}
          </button>

          {onClose && (
            <button onClick={onClose} className="p-1.5 hover:bg-red-500/20 rounded-md transition-colors" title="关闭">
              <X className="w-4 h-4 text-slate-400 hover:text-red-400" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {typingMode === 'typing' && typingCode && (
          <div className="text-xs bg-yellow-500 text-black p-1">跟打模式已激活 [{typingCode.length}字符]</div>
        )}
        {typingMode === 'typing' && typingCode && (
          <TypingArea
            key={typingCode}
            code={typingCode}
            userInput={userInput}
            onInput={setUserInput}
            onComplete={(typedCode) => {
              setCode(typedCode);
              setTypingMode('edit');
              setUserInput('');
              setTypingCode('');
            }}
            onBack={() => {
              setTypingMode('edit');
              setUserInput('');
              setTypingCode('');
            }}
          />
        )}
        {typingMode === 'edit' && (
        <div ref={editorRef} className="relative overflow-hidden" style={{ height: isMaximized ? '60%' : `${editorHeight}px` }}>
          <div className="absolute inset-0 flex overflow-hidden">
            <div className="flex-shrink-0 bg-slate-850 border-r border-slate-700/50 select-none overflow-hidden" style={{ width: `${Math.max(3, String(lineCount).length) * 10 + 24}px` }}>
              <div style={{ padding: `${fontSize * 1.5}px 0`, transform: `translateY(-${textareaRef.current?.scrollTop || 0}px)`, fontSize: `${fontSize}px`, lineHeight: `${fontSize * 1.6}px` }}>
                {Array.from({ length: lineCount }, (_, i) => (
                  <div key={i} className="text-right pr-3 text-slate-600 hover:text-slate-400 transition-colors" style={{ height: `${fontSize * 1.6}px` }}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <div ref={highlightRef} className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <pre className="whitespace-pre-wrap break-normal" style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: `${fontSize * 1.6}px`,
                  margin: 0,
                  padding: `${fontSize * 1.5}px ${fontSize}px`,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"calt" 0',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                }}>
                  {tokenizedLines.map((lineTokens, lineIdx) => (
                    <div key={lineIdx} style={{ minHeight: `${fontSize * 1.6}px` }}>
                      <HighlightedLine tokens={lineTokens} />
                      {lineTokens.length === 0 && <span>&nbsp;</span>}
                    </div>
                  ))}
                </pre>
              </div>

              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onSelect={() => {
                  // 更新光标位置显示
                  if (textareaRef.current) {
                    const pos = textareaRef.current.selectionStart;
                    const codeUpToCursor = code.substring(0, pos);
                    const lines = codeUpToCursor.split('\n');
                    setCursorPosition({ line: lines.length - 1, col: lines[lines.length - 1].length });
                  }
                }}
                onScroll={syncScroll}
                onKeyDown={handleKeyDown}
                className="whitespace-pre-wrap break-normal outline-none overflow-auto"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  resize: 'none',
                  backgroundColor: 'transparent',
                  padding: `${fontSize * 1.5}px ${fontSize}px`,
                  fontSize: `${fontSize}px`,
                  lineHeight: `${fontSize * 1.6}px`,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontVariantNumeric: 'tabular-nums',
                  fontFeatureSettings: '"calt" 0',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale',
                  color: 'rgba(255, 255, 255, 0.01)',
                  caretColor: '#22d3ee',
                  WebkitTextFillColor: 'rgba(255, 255, 255, 0.01)',
                  border: 'none',
                  boxSizing: 'border-box',
                }}
                spellCheck={false}
                autoCapitalize="off"
                autoCorrect="off"
                autoComplete="off"
              />
            </div>
          </div>
        </div>
        )}

        {!isMaximized && (
          <div className={`flex items-center justify-center h-2 cursor-row-resize group transition-colors ${isDragging ? 'bg-cyan-500/30' : 'hover:bg-slate-700/50'}`} onMouseDown={handleDragStart}>
            <div className={`w-12 h-0.5 rounded-full transition-colors ${isDragging ? 'bg-cyan-400' : 'bg-slate-600 group-hover:bg-slate-500'}`} />
          </div>
        )}

        {showStdin && (
          <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-slate-400">标准输入 (stdin)</span>
              {needsStdin && (
                <span className="text-xs text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">检测到 scanf/gets</span>
              )}
              <button onClick={() => setShowStdin(false)} className="ml-auto text-xs text-slate-500 hover:text-slate-300">隐藏</button>
            </div>
            <textarea
              value={stdinInput}
              onChange={(e) => setStdinInput(e.target.value)}
              placeholder="程序运行时的输入数据，每行一个输入..."
              className="w-full bg-slate-900/50 text-slate-200 font-mono text-xs p-2 rounded border border-slate-700/50 focus:border-cyan-500/50 focus:outline-none resize-none h-16"
              spellCheck={false}
            />
          </div>
        )}

        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/30 border-t border-slate-700/30">
          <button onClick={handleCompile} disabled={isRunning || !code.trim()} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-slate-300 text-xs font-medium transition-all">
            <CheckCircle2 className="w-3.5 h-3.5" />
            编译检查
          </button>

          <button onClick={handleRun} disabled={isRunning || !code.trim()} className="flex-1 flex items-center justify-center gap-2 px-4 py-1.5 bg-cyan-600/80 hover:bg-cyan-500/80 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-all shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/20">
            {isRunning ? <><Loader2 className="w-4 h-4 animate-spin" />编译运行中...</> : <><Play className="w-4 h-4" />运行 (Ctrl+Enter)</>}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowTools(!showTools)}
              disabled={isRunning}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-40 rounded-lg text-slate-300 text-xs font-medium transition-colors"
            >
              Settings 工具
              <ChevronDown className="w-3 h-3" />
            </button>

            {showTools && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowTools(false)} />
                <div className="absolute bottom-full right-0 mb-1 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl py-1.5 z-50 min-w-[220px]">
                  <div className="px-2 py-1">
                    <button
                      onClick={handleAssembly}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700/50 rounded-lg text-left transition-colors"
                    >
                      <span className="text-base">Clipboard</span>
                      <div>
                        <div className="text-sm text-slate-200">查看汇编代码</div>
                        <div className="text-xs text-slate-500">gcc -S -masm=intel</div>
                      </div>
                    </button>
                    <div className="flex gap-1 px-3 pb-1">
                      {['0', '1', '2', '3', 's'].map(level => (
                        <button
                          key={level}
                          onClick={() => setAsmOptLevel(level)}
                          className={`px-2 py-0.5 rounded text-xs transition-colors ${
                            asmOptLevel === level
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                              : 'bg-slate-700/50 text-slate-500 hover:text-slate-400'
                          }`}
                        >
                          -O{level}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-slate-700/50 my-1" />

                  <button
                    onClick={handlePreprocess}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700/50 rounded-lg text-left transition-colors"
                  >
                    <span className="text-base">File</span>
                    <div>
                      <div className="text-sm text-slate-200">预处理输出</div>
                      <div className="text-xs text-slate-500">gcc -E 宏展开</div>
                    </div>
                  </button>

                  <div className="border-t border-slate-700/50 my-1" />

                  <button
                    onClick={(availableTools.valgrind?.available || availableTools.asan?.available) ? handleMemcheck : undefined}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      (availableTools.valgrind?.available || availableTools.asan?.available)
                        ? 'hover:bg-slate-700/50 cursor-pointer'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-base">Search</span>
                    <div>
                      <div className="text-sm text-slate-200">内存检测</div>
                      <div className="text-xs text-slate-500">
                        {availableTools.valgrind?.available
                          ? 'Valgrind'
                          : availableTools.asan?.available
                            ? 'AddressSanitizer'
                            : 'AlertTriangle️ 仅 Linux 可用'}
                      </div>
                    </div>
                  </button>

                  <div className="border-t border-slate-700/50 my-1" />

                  <button
                    onClick={() => { setShowTypeQuery(true); setShowTools(false); }}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700/50 rounded-lg text-left transition-colors"
                  >
                    <span className="text-base">Ruler</span>
                    <div>
                      <div className="text-sm text-slate-200">类型信息查询</div>
                      <div className="text-xs text-slate-500">sizeof / 对齐 / 范围</div>
                    </div>
                  </button>

                  <div className="border-t border-slate-700/50 my-1" />

                  <button
                    onClick={handleFormat}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      availableTools.clangFormat?.available
                        ? 'hover:bg-slate-700/50'
                        : 'opacity-40 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-base">Palette</span>
                    <div>
                      <div className="text-sm text-slate-200">代码格式化</div>
                      <div className="text-xs text-slate-500">
                        {availableTools.clangFormat?.available ? 'clang-format' : 'clang-format 未安装'}
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>

          {showTypeQuery && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
              <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-2xl p-5 w-80">
                <h3 className="text-sm font-semibold text-slate-200 mb-3">Ruler 查询类型信息</h3>
                <input
                  value={typeQueryInput}
                  onChange={(e) => setTypeQueryInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleTypeQuery(); }}
                  placeholder="输入C类型名..."
                  className="w-full bg-slate-900 text-slate-200 font-mono text-sm p-2.5 rounded-lg border border-slate-700 focus:border-cyan-500 focus:outline-none mb-2"
                  autoFocus
                />
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {['int', 'char', 'long', 'double', 'int *', 'long long', 'size_t', 'float'].map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeQueryInput(t)}
                      className="px-2 py-0.5 bg-slate-700 hover:bg-slate-600 rounded text-xs text-slate-400"
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={handleTypeQuery} className="flex-1 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-white text-sm font-medium">
                    查询
                  </button>
                  <button onClick={() => setShowTypeQuery(false)} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-400 text-sm">
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {!showStdin && (
            <button onClick={() => setShowStdin(true)} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-slate-300 text-xs font-medium transition-all">
              <ChevronDown className="w-3.5 h-3.5" />
              输入
            </button>
          )}

          <div className="text-xs text-slate-500 ml-2">{lineCount} 行 · {code.length} 字符</div>
          <button
            onClick={() => {
              console.log('跟打按钮被点击', code.length);
              setTypingCode(code);
              setTypingMode('typing');
              setUserInput('');
            }}
            style={{ zIndex: 9999 }}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-white text-xs ml-2 font-bold border-2 border-blue-400"
          >
            跟打
          </button>
        </div>

        {result && (
          <div className={`border-t-2 ${getTypeColor(result.type)} transition-colors`}>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/50">
              <div className="flex items-center gap-2">
                {result.success ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : result.type === 'timeout' ? <AlertCircle className="w-4 h-4 text-yellow-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                <span className={`text-sm font-semibold ${getTypeTextColor(result.type)}`}>{getTypeLabel(result.type)}</span>
              </div>
              <button onClick={() => setResult(null)} className="p-1 hover:bg-slate-700/50 rounded transition-colors">
                <X className="w-3.5 h-3.5 text-slate-500" />
              </button>
            </div>
            <div className="px-4 py-3 max-h-64 overflow-auto">
              <pre className={`font-mono text-sm whitespace-pre-wrap leading-relaxed ${result.success ? 'text-green-300/90' : 'text-red-300/90'}`} style={{ fontSize: `${Math.max(12, fontSize - 1)}px` }}>
                {result.output || '(无输出)'}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CodeRunner;
