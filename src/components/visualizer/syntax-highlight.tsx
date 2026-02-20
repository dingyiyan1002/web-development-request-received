// syntax-highlight.tsx - 语法高亮组件
import React from 'react';
import { Token, TokenType } from './types';
import { TOKEN_COLORS } from './constants';

// C语言关键字
const KEYWORDS = new Set([
  'if', 'else', 'for', 'while', 'do', 'break', 'continue', 'return',
  'switch', 'case', 'default', 'goto', 'sizeof', 'typedef', 'struct',
  'union', 'enum', 'const', 'volatile', 'static', 'extern', 'inline'
]);

// C语言类型
const TYPES = new Set([
  'void', 'char', 'short', 'int', 'long', 'float', 'double',
  'signed', 'unsigned', 'auto', 'register',
  'int8_t', 'uint8_t', 'int16_t', 'uint16_t', 'int32_t', 'uint32_t',
  'int64_t', 'uint64_t', 'size_t', 'ssize_t'
]);

// 分词函数
export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < code.length) {
    const char = code[i];

    // 空白字符
    if (/\s/.test(char)) {
      let text = '';
      while (i < code.length && /\s/.test(code[i])) {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'plain' });
      continue;
    }

    // 预处理器指令
    if (char === '#' && (i === 0 || code[i - 1] === '\n')) {
      let text = '';
      while (i < code.length && code[i] !== '\n') {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'preprocessor' });
      continue;
    }

    // 字符串
    if (char === '"' || char === "'") {
      const quote = char;
      let text = quote;
      i++;
      while (i < code.length && code[i] !== quote) {
        if (code[i] === '\\' && i + 1 < code.length) {
          text += code[i] + code[i + 1];
          i += 2;
        } else {
          text += code[i];
          i++;
        }
      }
      if (i < code.length) {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'string' });
      continue;
    }

    // 注释
    if (char === '/' && code[i + 1] === '/') {
      let text = '';
      while (i < code.length && code[i] !== '\n') {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'comment' });
      continue;
    }

    // 数字
    if (/\d/.test(char)) {
      let text = '';
      while (i < code.length && (/\d/.test(code[i]) || code[i] === '.' || /[xXa-fA-F]/.test(code[i]))) {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'number' });
      continue;
    }

    // 标识符或关键字
    if (/[a-zA-Z_]/.test(char)) {
      let text = '';
      while (i < code.length && /[a-zA-Z0-9_]/.test(code[i])) {
        text += code[i];
        i++;
      }
      let type: TokenType = 'plain';
      if (KEYWORDS.has(text)) type = 'keyword';
      else if (TYPES.has(text)) type = 'type';
      else if (text === 'printf' || text === 'scanf' || text === 'main') type = 'function';
      tokens.push({ text, type });
      continue;
    }

    // 运算符
    if (/[+\-*/%=<>!&|^~]/.test(char)) {
      let text = char;
      i++;
      // 检查双字符运算符
      if (i < code.length && /[=+\-&|<>]/.test(code[i])) {
        text += code[i];
        i++;
      }
      tokens.push({ text, type: 'operator' });
      continue;
    }

    // 其他字符（括号、分号等）
    tokens.push({ text: char, type: 'plain' });
    i++;
  }

  return tokens;
}

// 语法高亮组件
interface SyntaxHighlightProps {
  code: string;
  className?: string;
}

export const SyntaxHighlight: React.FC<SyntaxHighlightProps> = ({ code, className = '' }) => {
  const tokens = tokenize(code);

  return (
    <span className={className}>
      {tokens.map((token, index) => (
        <span
          key={index}
          style={{
            color: TOKEN_COLORS[token.type] || TOKEN_COLORS.plain,
            whiteSpace: 'pre',
          }}
        >
          {token.text}
        </span>
      ))}
    </span>
  );
};

export default SyntaxHighlight;
