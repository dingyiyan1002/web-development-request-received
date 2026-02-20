// level1-increment-decrement.ts - 递增递减可视化
import { VisualizationData } from '../types';

export const level1IncrementDecrementData: VisualizationData = {
  id: 'level1-increment-decrement',
  title: '递增递减运算',
  filename: 'inc-dec.c',
  badge: '➕➖ 增碱',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    int a = 5;',
    '    printf("a = %d\\n", a++);',
    '    printf("a = %d\\n", a);',
    '    printf("a = %d\\n", ++a);',
    '    printf("a = %d\\n", a);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '++/--', content: '前++先加后用, 后++先用后加', color: 'blue' } }] },
    { line: 5, description: 'a=5', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '5', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: 'a++输出5', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '6', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a = 5' } }] },
    { line: 7, description: 'a=6', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '6', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a = 6' } }] },
    { line: 8, description: '++a输出7', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '7', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a = 7' } }] },
    { line: 9, description: 'a=7', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '7', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a = 7' } }] },
    { line: 11, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '递增递减', points: ['a++: 先用后加', '++a: 先加后用', '5→6→7'] } }] },
  ],
};

export default level1IncrementDecrementData;
