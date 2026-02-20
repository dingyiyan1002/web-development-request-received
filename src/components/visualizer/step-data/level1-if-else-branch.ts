// level1-if-else-branch.ts - if-else分支可视化
import { VisualizationData } from '../types';

export const level1IfElseBranchData: VisualizationData = {
  id: 'level1-if-else-branch',
  title: 'if-else分支',
  filename: 'if-else.c',
  badge: '🔀 条件分支',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t score = 85;',
    '',
    '    if (score >= 90) {',
    '        printf("A\\n");',
    '    } else if (score >= 80) {',
    '        printf("B\\n");',
    '    } else if (score >= 70) {',
    '        printf("C\\n");',
    '    } else {',
    '        printf("D\\n");',
    '    }',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'if-else', content: '从上到下依次判断', color: 'blue' } }] },
    { line: 5, description: 'score=85', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'score', value: '85', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: '85>=90? 否', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'score', value: '85', state: 'reading' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '85', right: '90', result: false } }] },
    { line: 9, description: '85>=80? 是', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'score', value: '85', state: 'reading' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '85', right: '80', result: true } }, { type: 'stdout', data: { content: 'B' } }] },
    { line: 20, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: 'if-else', points: ['从上往下判断', '第一个满足的生效', '85>=80输出B'] } }] },
  ],
};

export default level1IfElseBranchData;
