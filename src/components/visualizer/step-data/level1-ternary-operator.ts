// level1-ternary-operator.ts - 三目运算符可视化
import { VisualizationData } from '../types';

export const level1TernaryOperatorData: VisualizationData = {
  id: 'level1-ternary-operator',
  title: '三目运算符',
  filename: 'ternary.c',
  badge: '❓ 三目',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    int a = 10, b = 20;',
    '    int max = (a > b) ? a : b;',
    '    printf("max = %d\\n", max);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '三目运算', content: '条件?真:假', color: 'blue' } }] },
    { line: 5, description: 'a=10,b=20', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'a', value: '10', state: 'changed' },
      { type: 'int', name: 'b', value: '20', state: 'changed' }
    ] }], vizBlocks: [] },
    { line: 6, description: '10>20?否,取b', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'a', value: '10', state: '' },
      { type: 'int', name: 'b', value: '20', state: '' },
      { type: 'int', name: 'max', value: '20', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'compare', data: { left: '10', right: '20', result: false } }] },
    { line: 7, description: '输出max=20', frames: [{ name: 'main', vars: [{ type: 'int', name: 'max', value: '20', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'max = 20' } }] },
    { line: 9, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '三目运算符', points: ['条件?真值:假值', '10>20为假', '取b=20'] } }] },
  ],
};

export default level1TernaryOperatorData;
