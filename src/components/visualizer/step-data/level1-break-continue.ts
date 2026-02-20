// level1-break-continue.ts - break和continue可视化
import { VisualizationData } from '../types';

export const level1BreakContinueData: VisualizationData = {
  id: 'level1-break-continue',
  title: 'break与continue',
  filename: 'break-continue.c',
  badge: '⏭️ 跳转',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    for (uint8_t i = 0; i < 5; i++) {',
    '        if (i == 2) continue;',
    '        if (i == 4) break;',
    '        printf("i = %u\\n", i);',
    '    }',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'break/continue', content: 'break跳出, continue跳过本次', color: 'blue' } }] },
    { line: 5, description: 'i=0', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '0', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 0' } }] },
    { line: 5, description: 'i=1', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '1', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 1' } }] },
    { line: 5, description: 'i=2, continue跳过', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '2', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 5, description: 'i=3', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '3', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 3' } }] },
    { line: 5, description: 'i=4, break跳出', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '4', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 9, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: 'break/continue', points: ['continue跳过本次循环', 'break跳出整个循环', '输出0,1,3'] } }] },
  ],
};

export default level1BreakContinueData;
