// level1-while-timeout.ts - while超时等待可视化
import { VisualizationData } from '../types';

export const level1WhileTimeoutData: VisualizationData = {
  id: 'level1-while-timeout',
  title: 'while超时等待',
  filename: 'while.c',
  badge: '⏱️ 超时检测',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t device_ready = 0;',
    '    uint8_t retry_count = 0;',
    '',
    '    while ((device_ready == 0) && (retry_count < 5)) {',
    '        printf("Waiting... retry %u\\n", retry_count + 1);',
    '        retry_count++;',
    '        if (retry_count == 3) {',
    '            device_ready = 1;',
    '        }',
    '    }',
    '',
    '    if (device_ready) {',
    '        printf("Device ready\\n");',
    '    }',
    '    return 0;',
    '}',
  ],
  steps: [
    {
      line: 0,
      description: '程序开始',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: { title: 'while条件', content: '设备就绪 或 超时退出', color: 'blue' },
        },
      ],
    },
    {
      line: 4,
      description: '初始化变量',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '0', state: 'changed' },
            { type: 'uint8_t', name: 'retry_count', value: '0', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 6,
      description: '第1次循环: 0<5',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '0', state: '' },
            { type: 'uint8_t', name: 'retry_count', value: '1', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 1' } },
      ],
    },
    {
      line: 6,
      description: '第2次循环: 0<5',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '0', state: '' },
            { type: 'uint8_t', name: 'retry_count', value: '2', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 2' } },
      ],
    },
    {
      line: 6,
      description: '第3次循环: retry=2',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '0', state: '' },
            { type: 'uint8_t', name: 'retry_count', value: '3', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 3' } },
      ],
    },
    {
      line: 9,
      description: 'retry==3, 设备就绪',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '1', state: 'changed' },
            { type: 'uint8_t', name: 'retry_count', value: '3', state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 6,
      description: '第4次: device_ready=1退出',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '1', state: '' },
            { type: 'uint8_t', name: 'retry_count', value: '3', state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 14,
      description: 'device_ready=1输出',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: '1', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Device ready' } },
      ],
    },
    {
      line: 16,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '嵌入式超时模式',
            points: ['while(条件 && 超时)', 'retry_count计数', '3次后设备就绪'],
          },
        },
      ],
    },
  ],
};

export default level1WhileTimeoutData;
