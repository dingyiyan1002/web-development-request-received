// level1-recursion.ts - 递归函数可视化
import { VisualizationData } from '../types';

export const level1RecursionData: VisualizationData = {
  id: 'level1-recursion',
  title: '递归函数',
  filename: 'recursion.c',
  badge: '🔄 递归',
  code: [
    'int fact(int n) {',
    '    if (n <= 1) return 1;',
    '    return n * fact(n - 1);',
    '}',
    'int main() {',
    '    return fact(3);',
    '}',
  ],
  steps: [
    { line: 0, description: 'fact(3)', frames: [{ name: 'fact', vars: [{ type: 'int', name: 'n', value: '3', state: 'changed' }] }],
      vizBlocks: [{ type: 'rule', data: { title: '递归', content: '函数调用自身', color: 'blue' } }] },
    { line: 2, description: '3>1, 调用fact(2)', frames: [{ name: 'fact', vars: [{ type: 'int', name: 'n', value: '2', state: 'changed' }] }], vizBlocks: [] },
    { line: 2, description: '2>1, 调用fact(1)', frames: [{ name: 'fact', vars: [{ type: 'int', name: 'n', value: '1', state: 'changed' }] }], vizBlocks: [] },
    { line: 1, description: '1<=1, 返回1', frames: [], vizBlocks: [] },
    { line: 3, description: '返回2*1=2', frames: [], vizBlocks: [] },
    { line: 3, description: '返回3*2=6', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '递归', points: ['递归终止条件', 'fact(3)=3×2×1=6', '递归调用栈'] } }] },
  ],
};

export default level1RecursionData;
