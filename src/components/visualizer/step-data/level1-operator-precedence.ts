// level1-operator-precedence.ts - 运算符优先级可视化
import { VisualizationData } from '../types';

export const level1OperatorPrecedenceData: VisualizationData = {
  id: 'level1-operator-precedence',
  title: '运算符优先级',
  filename: 'precedence.c',
  badge: '➕ 运算符',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t a = 2 + 3 * 4;',
    '    uint8_t b = (2 + 3) * 4;',
    '    uint8_t c = 10 - 3 - 2;',
    '    uint8_t d = 10 - (3 - 2);',
    '',
    '    printf("a = %u\\n", a);',
    '    printf("b = %u\\n", b);',
    '    printf("c = %u\\n", c);',
    '    printf("d = %u\\n", d);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '优先级', content: '先乘除后加减，左到右', color: 'blue' } }] },
    { line: 5, description: 'a=2+12=14', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'a', value: '14', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a = 14' } }] },
    { line: 6, description: 'b=5*4=20', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'b', value: '20', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'b = 20' } }] },
    { line: 7, description: 'c=7-2=5', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'c', value: '5', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'c = 5' } }] },
    { line: 8, description: 'd=10-1=9', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'd', value: '9', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'd = 9' } }] },
    { line: 14, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '优先级', points: ['*高于+', '()最高', '-左到右: 10-3-2≠10-(3-2)'] } }] },
  ],
};

export default level1OperatorPrecedenceData;
