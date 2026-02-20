// level1-modulo-operator.ts - 取模运算可视化
import { VisualizationData } from '../types';

export const level1ModuloOperatorData: VisualizationData = {
  id: 'level1-modulo-operator',
  title: '取模运算',
  filename: 'modulo.c',
  badge: '➗ 取模',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    printf("17 %% 5 = %d\\n", 17 % 5);',
    '    printf("10 %% 3 = %d\\n", 10 % 3);',
    '    printf("8 %% 2  = %d\\n", 8 % 2);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '取模', content: 'a % b = a除b的余数', color: 'blue' } }] },
    { line: 5, description: '17%5=2', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '17 % 5 = 2' } }] },
    { line: 6, description: '10%3=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '10 % 3 = 1' } }] },
    { line: 7, description: '8%2=0', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '8 % 2  = 0' } }] },
    { line: 9, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '取模运算', points: ['17÷5=3余2', '10÷3=3余1', '8÷2=4余0'] } }] },
  ],
};

export default level1ModuloOperatorData;
