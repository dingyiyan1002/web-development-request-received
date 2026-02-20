// constants.ts - 颜色常量定义

// 背景色
export const BG_COLORS = {
  outer: '#020617',      // slate-950
  panel: '#0a0f1e',      // 主面板
  subPanel: '#080d19',   // 子面板
  topBar: '#111827',     // gray-900
  border: '#1f2937',     // gray-800
};

// 语义色
export const SEMANTIC_COLORS = {
  currentLine: '#3b82f6',    // 蓝 - 当前执行行
  modified: '#4ade80',       // 绿 - 值被修改
  reading: '#3b82f6',        // 蓝 - 值被读取
  warning: '#f87171',        // 红 - 警告/signed/危险
  unsigned: '#fbbf24',       // 黄 - unsigned/转换
  correct: '#4ade80',        // 绿 - 正确结果
  error: '#f87171',          // 红 - 错误结果
  console: '#22c55e',        // 绿 - stdout
};

// 语法高亮色
export const TOKEN_COLORS: Record<string, string> = {
  keyword: '#c084fc',        // 紫 - if/else/return
  type: '#38bdf8',           // 天蓝 - int/void/uint8_t
  function: '#fbbf24',       // 金黄 - printf/main
  string: '#34d399',         // 绿 - "hello"
  number: '#fb923c',         // 橙 - 42
  preprocessor: '#f472b6',   // 粉 - #include
  comment: '#374151',        // 暗灰 - // 注释
  operator: '#94a3b8',       // 灰 - + - * /
  plain: '#e2e8f0',          // 白 - 普通文本
};

// 动画时间
export const ANIMATION = {
  popIn: '0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  valueBounce: '0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
  lineArrow: '1.2s ease-in-out infinite',
  progress: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transition: '0.35s cubic-bezier(0.4, 0, 0.2, 1)',
};

// 播放速度
export const PLAYBACK_SPEEDS = {
  slow: 2200,    // 0.5x
  normal: 1200,  // 1x
  fast: 600,     // 2x
};
