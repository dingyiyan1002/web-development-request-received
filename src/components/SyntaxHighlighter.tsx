
export type TokenType =
  | "plain"
  | "keyword"
  | "type"
  | "number"
  | "string"
  | "comment"
  | "preproc"
  | "operator"
  | "punct"
  | "func"
  | "include"; // 头文件包含 <...>

export interface Token {
  type: TokenType;
  text: string;
}

const C_KEYWORDS = new Set([
  "if",
  "else",
  "for",
  "while",
  "do",
  "switch",
  "case",
  "default",
  "break",
  "continue",
  "return",
  "goto",
  "sizeof",
  "typedef",
  "struct",
  "union",
  "enum",
  "const",
  "static",
  "extern",
  "register",
  "volatile",
  "signed",
  "unsigned",
  "auto",
]);

const C_TYPES = new Set([
  "void",
  "char",
  "short",
  "int",
  "long",
  "float",
  "double",
  "_Bool",
  "bool",
  "size_t",
  "NULL",
]);

const COMMON_FUNCS = new Set([
  "printf",
  "scanf",
  "strlen",
  "strcpy",
  "strcmp",
  "strncpy",
  "malloc",
  "calloc",
  "realloc",
  "free",
]);

function isIdentifierStart(ch: string) {
  return /[A-Za-z_]/.test(ch);
}

function isIdentifierPart(ch: string) {
  return /[A-Za-z0-9_]/.test(ch);
}

function readWhile(input: string, i: number, pred: (c: string) => boolean) {
  let j = i;
  while (j < input.length && pred(input[j]!)) j++;
  return { text: input.slice(i, j), next: j };
}

/**
 * 非严格 C 词法：面向教学展示的轻量 tokenizer
 * - 支持单行注释：//
 * - 支持块注释：以 /* 开始，以 * / 结束（此处加空格仅为避免注释终止符冲突）
 * - 支持字符串/字符常量："..." 与 '...'
 * - 识别 #include 等预处理行
 */
export function tokenizeCLine(line: string): Token[] {
  // 预处理行：整体偏紫色，但仍在内部识别 <stdio.h>
  const trimmed = line.trimStart();
  const tokens: Token[] = [];

  // 快速路径：空行
  if (!line) return [{ type: "plain", text: "" }];

  // 单行注释
  const lineCommentIdx = line.indexOf("//");
  if (lineCommentIdx >= 0) {
    const before = line.slice(0, lineCommentIdx);
    const comment = line.slice(lineCommentIdx);
    if (before) tokens.push(...tokenizeCLine(before));
    tokens.push({ type: "comment", text: comment });
    return tokens;
  }

  // 预处理器行
  const isPreproc = trimmed.startsWith("#");

  let i = 0;
  while (i < line.length) {
    const ch = line[i]!;

    // 头文件包含 <...>
    if (ch === "<" && isPreproc) {
      // 检查是否是头文件包含
      let j = i + 1;
      while (j < line.length && line[j] !== ">" && line[j] !== " ") {
        j++;
      }
      if (j < line.length && line[j] === ">") {
        j++; // 包含 >
        tokens.push({ type: "include", text: line.slice(i, j) });
        i = j;
        continue;
      }
    }

    // 字符串/字符
    if (ch === '"' || ch === "'") {
      const quote = ch;
      let j = i + 1;
      while (j < line.length) {
        const c = line[j]!;
        if (c === "\\") {
          j += 2;
          continue;
        }
        if (c === quote) {
          j++;
          break;
        }
        j++;
      }
      tokens.push({ type: "string", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // 多行注释开始（本行内）
    if (ch === "/" && line[i + 1] === "*") {
      const end = line.indexOf("*/", i + 2);
      const j = end >= 0 ? end + 2 : line.length;
      tokens.push({ type: "comment", text: line.slice(i, j) });
      i = j;
      continue;
    }

    // 数字（十进制/浮点/16进制简单覆盖）
    if (/[0-9]/.test(ch)) {
      const { text, next } = readWhile(line, i, (c) => /[0-9A-Fa-fxX\.]/.test(c));
      tokens.push({ type: "number", text });
      i = next;
      continue;
    }

    // 标识符
    if (isIdentifierStart(ch)) {
      const { text, next } = readWhile(line, i, (c) => isIdentifierPart(c));
      const t =
        C_TYPES.has(text)
          ? "type"
          : C_KEYWORDS.has(text)
            ? "keyword"
            : COMMON_FUNCS.has(text)
              ? "func"
              : "plain";
      tokens.push({ type: t as TokenType, text });
      i = next;
      continue;
    }

    // 操作符（尽量合并）
    const two = line.slice(i, i + 2);
    const three = line.slice(i, i + 3);
    const ops = ["==", "!=", ">=", "<=", "++", "--", "->", "&&", "||", "+=", "-=", "*=", "/=", "%=", "<<", ">>"];
    if (ops.includes(three)) {
      tokens.push({ type: "operator", text: three });
      i += 3;
      continue;
    }
    if (ops.includes(two)) {
      tokens.push({ type: "operator", text: two });
      i += 2;
      continue;
    }

    // 单字符符号
    if (/[+\-*/%<>=!&|^~?:]/.test(ch)) {
      tokens.push({ type: "operator", text: ch });
      i++;
      continue;
    }

    if (/[(){}\[\],;.]/.test(ch)) {
      tokens.push({ type: "punct", text: ch });
      i++;
      continue;
    }

    // 其他（空格等）
    tokens.push({ type: isPreproc ? "preproc" : "plain", text: ch });
    i++;
  }

  // 给预处理行整体加“preproc”风格：把 plain token 标记为 preproc（但保留 string/comment 等）
  if (isPreproc) {
    return tokens.map((t) => {
      if (t.type === "plain") return { ...t, type: "preproc" };
      if (t.type === "keyword" || t.type === "type" || t.type === "func") return { ...t, type: "preproc" };
      return t;
    });
  }

  return tokens;
}

function classFor(type: TokenType): string {
  switch (type) {
    case "keyword":
      return "tok tok-keyword";
    case "type":
      return "tok tok-type";
    case "func":
      return "tok tok-func";
    case "number":
      return "tok tok-number";
    case "string":
      return "tok tok-string";
    case "comment":
      return "tok tok-comment";
    case "preproc":
      return "tok tok-preproc";
    case "include":
      return "tok tok-include"; // 头文件包含使用单独样式
    case "operator":
      return "tok tok-operator";
    case "punct":
      return "tok tok-punct";
    default:
      return "tok tok-plain";
  }
}

export function HighlightedLine({ line }: { line: string }) {
  const tokens = tokenizeCLine(line);
  return (
    <>
      {tokens.map((t, idx) => (
        <span key={idx} className={classFor(t.type)}>
          {t.text}
        </span>
      ))}
    </>
  );
}

export function HighlightedCode({ code }: { code: string }) {
  const lines = code.split("\n");
  return (
    <div className="code-wrapper">
      {lines.map((line, idx) => (
        <div key={idx} className="code-line-wrapper">
          <span className="code-line-number">{idx + 1}</span>
          <div className="code-line">
            <HighlightedLine line={line} />
          </div>
        </div>
      ))}
    </div>
  );
}

// 默认导出，用于ProjectView
export default function SyntaxHighlighter({ code }: { code: string }) {
  return <HighlightedCode code={code} />;
}
