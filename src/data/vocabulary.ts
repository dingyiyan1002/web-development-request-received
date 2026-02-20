export type VocabItem = { word: string; meaning: string; category?: string };

// 面向中国初学者：常见 C 关键字/函数/符号的中英对照（可持续扩充）
export const VOCAB_DICTIONARY: Record<string, VocabItem> = {
  // types
  int: { word: "int", meaning: "整数 (Integer)", category: "类型" },
  float: { word: "float", meaning: "浮点数/单精度小数 (Single Precision)", category: "类型" },
  double: { word: "double", meaning: "双精度小数 (Double Precision)", category: "类型" },
  char: { word: "char", meaning: "字符 (Character)", category: "类型" },
  void: { word: "void", meaning: "无返回值/空类型 (Void)", category: "类型" },
  long: { word: "long", meaning: "长整型 (Long)", category: "类型" },
  short: { word: "short", meaning: "短整型 (Short)", category: "类型" },
  unsigned: { word: "unsigned", meaning: "无符号 (Unsigned)", category: "修饰符" },
  signed: { word: "signed", meaning: "有符号 (Signed)", category: "修饰符" },
  const: { word: "const", meaning: "常量/只读 (Constant)", category: "修饰符" },
  static: { word: "static", meaning: "静态（生命周期更长/作用域受控）", category: "修饰符" },
  typedef: { word: "typedef", meaning: "类型别名 (Type Definition)", category: "关键字" },
  struct: { word: "struct", meaning: "结构体 (Structure)", category: "关键字" },
  enum: { word: "enum", meaning: "枚举 (Enumeration)", category: "关键字" },
  NULL: { word: "NULL", meaning: "空指针常量 (Null Pointer)", category: "概念" },
  size_t: { word: "size_t", meaning: "无符号大小类型（常用于 sizeof 返回值）", category: "类型" },

  // preprocessor
  "#include": { word: "#include", meaning: "预处理：引入头文件 (Include)", category: "预处理" },

  // flow
  if: { word: "if", meaning: "如果 (If)", category: "控制流" },
  else: { word: "else", meaning: "否则 (Else)", category: "控制流" },
  for: { word: "for", meaning: "for 循环 (For Loop)", category: "控制流" },
  while: { word: "while", meaning: "while 循环 (While Loop)", category: "控制流" },
  do: { word: "do", meaning: "do-while（至少执行一次）", category: "控制流" },
  switch: { word: "switch", meaning: "多分支选择 (Switch)", category: "控制流" },
  case: { word: "case", meaning: "分支标签 (Case)", category: "控制流" },
  default: { word: "default", meaning: "默认分支 (Default)", category: "控制流" },
  break: { word: "break", meaning: "跳出（循环/ switch）", category: "控制流" },
  continue: { word: "continue", meaning: "跳过本轮循环 (Continue)", category: "控制流" },
  return: { word: "return", meaning: "返回 (Return)", category: "控制流" },

  // functions
  main: { word: "main", meaning: "主函数/程序入口", category: "函数" },
  printf: { word: "printf", meaning: "格式化输出 (Print Formatted)", category: "函数" },
  scanf: { word: "scanf", meaning: "格式化输入 (Scan Formatted)", category: "函数" },
  strlen: { word: "strlen", meaning: "字符串长度（不含\\0）", category: "函数" },
  strcpy: { word: "strcpy", meaning: "字符串拷贝（不安全）", category: "函数" },
  strncpy: { word: "strncpy", meaning: "字符串拷贝（带长度限制）", category: "函数" },
  strcmp: { word: "strcmp", meaning: "字符串比较", category: "函数" },
  malloc: { word: "malloc", meaning: "动态分配内存 (Allocate)", category: "内存" },
  calloc: { word: "calloc", meaning: "分配并清零 (Allocate + Clear)", category: "内存" },
  realloc: { word: "realloc", meaning: "调整已分配内存大小", category: "内存" },
  free: { word: "free", meaning: "释放动态内存 (Free)", category: "内存" },

  // operators / symbols
  "=": { word: "=", meaning: "赋值（把右边给左边）", category: "运算符" },
  "==": { word: "==", meaning: "相等比较（判断是否相等）", category: "运算符" },
  "!=": { word: "!=", meaning: "不等于", category: "运算符" },
  ">=": { word: ">=", meaning: "大于等于", category: "运算符" },
  "<=": { word: "<=", meaning: "小于等于", category: "运算符" },
  ">": { word: ">", meaning: "大于", category: "运算符" },
  "<": { word: "<", meaning: "小于", category: "运算符" },
  "&&": { word: "&&", meaning: "逻辑与（两边都真才真）", category: "运算符" },
  "||": { word: "||", meaning: "逻辑或（有一个真就真）", category: "运算符" },
  "!": { word: "!", meaning: "逻辑非（取反）", category: "运算符" },
  "++": { word: "++", meaning: "自增（+1）", category: "运算符" },
  "--": { word: "--", meaning: "自减（-1）", category: "运算符" },
  "+=": { word: "+=", meaning: "加并赋值（a+=b 等价 a=a+b）", category: "运算符" },
  "&": { word: "&", meaning: "取地址 (Address-of) / 按位与（上下文决定）", category: "指针/运算符" },
  "*": { word: "*", meaning: "乘法 / 指针解引用（上下文决定）", category: "指针/运算符" },
  "->": { word: "->", meaning: "指针访问结构体成员", category: "结构体" },
  "%d": { word: "%d", meaning: "格式化：十进制整数 (int)", category: "格式化" },
  "%f": { word: "%f", meaning: "格式化：浮点数 (float/double)", category: "格式化" },
  "%c": { word: "%c", meaning: "格式化：字符 (char)", category: "格式化" },
  "%s": { word: "%s", meaning: "格式化：字符串 (char*)", category: "格式化" },
  "\\n": { word: "\\n", meaning: "换行符 (Newline)", category: "转义" },
  "\\t": { word: "\\t", meaning: "制表符/Tab", category: "转义" },
  "\\0": { word: "\\0", meaning: "字符串结束符 (Null Terminator)", category: "字符串" },
};

const TOKEN_REGEX = /(#include|\b[A-Za-z_][A-Za-z0-9_]*\b|==|!=|>=|<=|&&|\|\||\+\+|--|\+=|->|%[dfcs]|\\n|\\t|\\0|[=<>!&*])/g;

export function deriveVocabularyFromText(text: string, limit = 10): VocabItem[] {
  const hits = new Map<string, VocabItem>();
  const raw = text.match(TOKEN_REGEX) || [];

  for (const token of raw) {
    const key = token;
    const item = VOCAB_DICTIONARY[key] ?? VOCAB_DICTIONARY[key.toLowerCase()];
    if (item && !hits.has(item.word)) hits.set(item.word, item);
    if (hits.size >= limit) break;
  }

  return Array.from(hits.values());
}

export function mergeVocabulary(
  manual: { word: string; meaning: string }[] | undefined,
  derived: VocabItem[]
): { word: string; meaning: string; category?: string }[] {
  const map = new Map<string, { word: string; meaning: string; category?: string }>();

  for (const v of manual || []) {
    map.set(v.word, { word: v.word, meaning: v.meaning });
  }
  for (const v of derived) {
    if (!map.has(v.word)) map.set(v.word, v);
  }

  return Array.from(map.values());
}
