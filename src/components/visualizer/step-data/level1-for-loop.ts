// level1-for-loop.ts - for循环计数可视化
import { VisualizationData } from '../types';

export const level1ForLoopData: VisualizationData = {
  id: 'level1-for-loop',
  title: 'for循环计数',
  filename: 'for-loop.c',
  badge: '🔄 循环',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    for (uint8_t i = 1; i <= 5; i++) {',
    '        printf("i = %u\\n", i);',
    '    }',
    '    printf("Done!\\n");',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'for循环', content: '初始化; 条件; 更新', color: 'blue' } }] },
    { line: 5, description: 'i=1', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '1', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 1' } }] },
    { line: 5, description: 'i=2', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '2', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 2' } }] },
    { line: 5, description: 'i=3', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '3', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 3' } }] },
    { line: 5, description: 'i=4', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '4', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 4' } }] },
    { line: 5, description: 'i=5', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '5', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'i = 5' } }] },
    { line: 5, description: 'i=6, 退出', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Done!' } }] },
    { line: 8, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: 'for循环', points: ['i=1初始化', 'i<=5条件判断', 'i++更新'] } }] },
  ],
};

export default level1ForLoopData;
