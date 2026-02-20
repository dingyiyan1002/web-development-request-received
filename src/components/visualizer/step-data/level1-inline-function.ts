// level1-inline-function.ts - 内联函数可视化
import { VisualizationData } from '../types';

export const level1InlineFunctionData: VisualizationData = {
  id: 'level1-inline-function',
  title: '内联函数',
  filename: 'inline.c',
  badge: '⚡ 内联',
  code: [
    'inline int max(int a, int b) { return a > b ? a : b; }',
    'int main() { return max(3, 5); }',
  ],
  steps: [
    { line: 0, description: '内联函数', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: 'inline', content: '编译时展开,减少函数调用开销', color: 'blue' } }] },
    { line: 1, description: 'max(3,5)=5', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '内联函数', points: ['编译时展开', '减少调用开销', '适合小函数'] } }] },
  ],
};

export default level1InlineFunctionData;
