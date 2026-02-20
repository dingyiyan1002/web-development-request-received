// level1-nested-loop.ts - 嵌套循环可视化
import { VisualizationData } from '../types';

export const level1NestedLoopData: VisualizationData = {
  id: 'level1-nested-loop',
  title: '嵌套循环',
  filename: 'nested.c',
  badge: '🔄 嵌套',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    for (uint8_t i = 0; i < 2; i++) {',
    '        for (uint8_t j = 0; j < 2; j++) {',
    '            printf("(%u,%u)\\n", i, j);',
    '        }',
    '    }',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '嵌套循环', content: '外层循环一次，内层循环全部', color: 'blue' } }] },
    { line: 5, description: 'i=0, 外层', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '0', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 6, description: 'j=0', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'i', value: '0', state: '' },
      { type: 'uint8_t', name: 'j', value: '0', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '(0,0)' } }] },
    { line: 6, description: 'j=1', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'i', value: '0', state: '' },
      { type: 'uint8_t', name: 'j', value: '1', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '(0,1)' } }] },
    { line: 5, description: 'i=1', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'i', value: '1', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 6, description: 'j=0', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'i', value: '1', state: '' },
      { type: 'uint8_t', name: 'j', value: '0', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '(1,0)' } }] },
    { line: 6, description: 'j=1', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'i', value: '1', state: '' },
      { type: 'uint8_t', name: 'j', value: '1', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '(1,1)' } }] },
    { line: 10, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '嵌套循环', points: ['外层控制行', '内层控制列', '2×2=4次'] } }] },
  ],
};

export default level1NestedLoopData;
