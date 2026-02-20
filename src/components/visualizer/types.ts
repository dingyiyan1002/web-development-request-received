// types.ts - 可视化组件类型定义

export interface MemVar {
  type: string;
  name: string;
  value: string | number;
  state: 'changed' | 'reading' | 'warn' | '';
  showBinary?: boolean;
  signed?: boolean;
  pointsTo?: string;
}

export interface StackFrameData {
  name: string;
  vars: MemVar[];
}

export type VizBlockType =
  | 'rule'
  | 'conversion'
  | 'dual-read'
  | 'compare'
  | 'pointer-arrows'
  | 'data-flow'
  | 'stdout'
  | 'summary'
  | 'binary-display'
  | 'memory-layout'
  | 'operation';

export interface VizBlock {
  type: VizBlockType;
  data: Record<string, unknown>;
}

export interface ExecutionStep {
  line: number;
  description?: string;
  descriptionWarn?: boolean;
  frames: StackFrameData[];
  vizBlocks: VizBlock[];
  stdout?: string;
}

export interface VisualizationData {
  id: string;
  title: string;
  filename: string;
  badge?: string;
  code: string[];
  steps: ExecutionStep[];
}

// Token types for syntax highlighting
export type TokenType = 
  | 'keyword' 
  | 'type' 
  | 'function' 
  | 'string' 
  | 'number' 
  | 'preprocessor' 
  | 'comment' 
  | 'operator' 
  | 'plain';

export interface Token {
  text: string;
  type: TokenType;
}
