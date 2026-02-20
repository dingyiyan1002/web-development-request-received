// array-sum-loop.ts - for 循环数组求和可视化
import { VisualizationData } from '../types';

export const arraySumLoopData: VisualizationData = {
  id: 'array-sum-loop',
  title: 'for 循环数组求和',
  filename: 'array_sum.c',
  badge: '📊 数组遍历',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define SAMPLE_COUNT  5',
    '',
    'int main(void)',
    '{',
    '    uint16_t samples[SAMPLE_COUNT] = {100, 200, 150, 180, 220};',
    '    uint32_t sum = 0;',
    '    uint8_t count = sizeof(samples) / sizeof(samples[0]);',
    '',
    '    for (uint8_t i = 0; i < count; i++) {',
    '        sum += samples[i];',
    '    }',
    '',
    '    printf("Sum: %lu\\n", sum);',
    '    printf("Average: %lu\\n", sum / count);',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '数组求和',
            content: '遍历数组，累加所有元素',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化数组
    {
      line: 8,
      description: 'samples = {100, 200, 150, 180, 220}',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 初始化 sum = 0
    {
      line: 9,
      description: 'sum = 0',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 0, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 3: 计算 count
    {
      line: 10,
      description: 'count = 5',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 0, state: '' },
            { type: 'uint8_t', name: 'count', value: 5, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 循环 i=0
    {
      line: 12,
      description: 'i = 0, sum += samples[0] (100)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 100, state: 'changed' },
            { type: 'uint8_t', name: 'i', value: 0, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 5: 循环 i=1
    {
      line: 12,
      description: 'i = 1, sum += samples[1] (200)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 300, state: 'changed' },
            { type: 'uint8_t', name: 'i', value: 1, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 6: 循环 i=2
    {
      line: 12,
      description: 'i = 2, sum += samples[2] (150)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 450, state: 'changed' },
            { type: 'uint8_t', name: 'i', value: 2, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 7: 循环 i=3
    {
      line: 12,
      description: 'i = 3, sum += samples[3] (180)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 630, state: 'changed' },
            { type: 'uint8_t', name: 'i', value: 3, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 8: 循环 i=4
    {
      line: 12,
      description: 'i = 4, sum += samples[4] (220)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 850, state: 'changed' },
            { type: 'uint8_t', name: 'i', value: 4, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 9: 循环结束
    {
      line: 12,
      description: 'i = 5, 循环结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 850, state: '' },
            { type: 'uint8_t', name: 'i', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 10: 打印 Sum
    {
      line: 15,
      description: '输出: Sum: 850',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 850, state: 'reading' },
            { type: 'uint8_t', name: 'count', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Sum: 850',
          },
        },
      ],
    },
    // Step 11: 打印 Average
    {
      line: 16,
      description: '输出: Average: 170',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 850, state: 'reading' },
            { type: 'uint8_t', name: 'count', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Average: 170',
          },
        },
      ],
    },
    // Step 12: 总结
    {
      line: 17,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint16_t[]', name: 'samples', value: '[5]', state: '' },
            { type: 'uint32_t', name: 'sum', value: 850, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '数组求和总结',
            points: [
              'samples = {100, 200, 150, 180, 220}',
              '遍历 5 次累加',
              'Sum = 850',
              'Average = 850 / 5 = 170',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default arraySumLoopData;
