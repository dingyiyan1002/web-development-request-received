// level1-logical-operator.ts - 逻辑运算符可视化
import { VisualizationData } from '../types';

export const level1LogicalOperatorData: VisualizationData = {
  id: 'level1-logical-operator',
  title: '逻辑运算符',
  filename: 'logical.c',
  badge: '🔬 逻辑',
  code: [
    '#include <stdio.h>',
    '#include <stdbool.h>',
    '',
    'int main(void)',
    '{',
    '    printf("!0   = %d\\n", !0);',
    '    printf("!5   = %d\\n", !5);',
    '    printf("3&&5 = %d\\n", 3 && 5);',
    '    printf("0&&5 = %d\\n", 0 && 5);',
    '    printf("3||0 = %d\\n", 3 || 0);',
    '    printf("0||0 = %d\\n", 0 || 0);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '逻辑运算', content: '!非, &&与, ||或', color: 'blue' } }] },
    { line: 5, description: '!0=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '!0   = 1' } }] },
    { line: 6, description: '!5=0', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '!5   = 0' } }] },
    { line: 7, description: '3&&5=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '3&&5 = 1' } }] },
    { line: 8, description: '0&&5=0', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '0&&5 = 0' } }] },
    { line: 9, description: '3||0=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '3||0 = 1' } }] },
    { line: 10, description: '0||0=0', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '0||0 = 0' } }] },
    { line: 13, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '逻辑运算', points: ['!非: 0→1, 非0→0', '&&与: 全非0才为1', '||或: 有非0即为1'] } }] },
  ],
};

export default level1LogicalOperatorData;
