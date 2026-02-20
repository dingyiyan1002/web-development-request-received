// level1-shift-operator移.ts - 位运算可视化
import { VisualizationData } from '../types';

export const level1ShiftOperatorData: VisualizationData = {
  id: 'level1-shift-operator',
  title: '位移运算',
  filename: 'shift.c',
  badge: '⬅️➡️ 位移',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    printf("8 << 1 = %d\\n", 8 << 1);',
    '    printf("8 >> 1 = %d\\n", 8 >> 1);',
    '    printf("3 << 2 = %d\\n", 3 << 2);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '位移', content: '<<左移×2, >>右移÷2', color: 'blue' } }] },
    { line: 5, description: '8<<1=16', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '8 << 1 = 16' } }] },
    { line: 6, description: '8>>1=4', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '8 >> 1 = 4' } }] },
    { line: 7, description: '3<<2=12', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '3 << 2 = 12' } }] },
    { line: 9, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '位移运算', points: ['<<左移: ×2^n', '>>右移: ÷2^n', '8<<1=16, 8>>1=4'] } }] },
  ],
};

export default level1ShiftOperatorData;
