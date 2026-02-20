// level1-array-init.ts - 数组初始化可视化
import { VisualizationData } from '../types';

export const level1ArrayInitData: VisualizationData = {
  id: 'level1-array-init',
  title: '数组初始化',
  filename: 'array.c',
  badge: '📦 数组',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t buf[5] = {1, 2, 3};',
    '    printf("buf[0] = %u\\n", buf[0]);',
    '    printf("buf[1] = %u\\n", buf[1]);',
    '    printf("buf[2] = %u\\n", buf[2]);',
    '    printf("buf[3] = %u\\n", buf[3]);',
    '    printf("buf[4] = %u\\n", buf[4]);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '数组', content: '部分初始化时，未填充满的自动为0', color: 'blue' } }] },
    { line: 5, description: 'buf={1,2,3}', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: 'buf[0]=1', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'buf[0] = 1' } }] },
    { line: 7, description: 'buf[1]=2', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'buf[1] = 2' } }] },
    { line: 8, description: 'buf[2]=3', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'buf[2] = 3' } }] },
    { line: 9, description: 'buf[3]=0', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'buf[3] = 0' } }] },
    { line: 10, description: 'buf[4]=0', frames: [{ name: 'main', vars: [{ type: 'uint8_t[5]', name: 'buf', value: '[1,2,3,0,0]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'buf[4] = 0' } }] },
    { line: 12, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '数组初始化', points: ['部分初始化自动填0', '索引从0开始', 'buf={1,2,3}→[1,2,3,0,0]'] } }] },
  ],
};

export default level1ArrayInitData;
