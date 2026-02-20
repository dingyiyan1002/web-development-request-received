// uint8-overflow.ts - uint8_t 溢出可视化步骤数据
import { VisualizationData } from '../types';

export const uint8OverflowData: VisualizationData = {
  id: 'uint8-overflow',
  title: 'uint8_t 溢出陷阱',
  filename: 'overflow.c',
  badge: '⚠️ 溢出陷阱',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t rx_count = 0;',
    '    uint8_t packet_seq = 254;',
    '',
    '    for (uint8_t i = 0; i < 3; i++) {',
    '        rx_count++;',
    '        packet_seq++;',
    '    }',
    '',
    '    printf("rx_count: %u\\n", rx_count);',
    '    printf("packet_seq: %u\\n", packet_seq);',
    '',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 初始状态
    {
      line: 0,
      description: '程序开始执行',
      frames: [
        {
          name: 'main',
          vars: [],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: 'uint8_t 范围',
            content: '0 ~ 255 (8位无符号整数)',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 声明变量
    {
      line: 5,
      description: '声明 rx_count = 0',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 0, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 0,
            bits: 8,
            label: 'rx_count',
          },
        },
      ],
    },
    // Step 2: 声明 packet_seq
    {
      line: 6,
      description: '声明 packet_seq = 254',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 0, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 254, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 254,
            bits: 8,
            label: 'packet_seq',
            highlight: [7], // 高亮最高位
          },
        },
      ],
    },
    // Step 3: 进入循环 i=0
    {
      line: 8,
      description: '进入循环 i=0',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 0, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 254, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 0, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 第1次 rx_count++
    {
      line: 9,
      description: 'rx_count++: 0→1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 1, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 254, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 0, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 1,
            bits: 8,
            label: 'rx_count = 1',
          },
        },
      ],
    },
    // Step 5: 第1次 packet_seq++
    {
      line: 10,
      description: 'packet_seq++: 254→255',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 1, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 255, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 0, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 255,
            bits: 8,
            label: 'packet_seq = 255 (最大值!)',
            allOnes: true,
          },
        },
      ],
    },
    // Step 6: i=1 第2轮
    {
      line: 8,
      description: 'i=1 第2轮循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 1, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 255, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 1, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 7: 第2次 rx_count++
    {
      line: 9,
      description: 'rx_count++: 1→2',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 2, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 255, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 1, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 2,
            bits: 8,
            label: 'rx_count = 2',
          },
        },
      ],
    },
    // Step 8: 第2次 packet_seq++ - 溢出！
    {
      line: 10,
      description: '⚠️ 溢出! 255→0',
      descriptionWarn: true,
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 2, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 0, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 1, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 255,
            to: 0,
            operation: '255 + 1 = 256 → 溢出 → 0',
            warning: true,
          },
        },
        {
          type: 'binary-display',
          data: {
            value: 0,
            bits: 8,
            label: 'packet_seq = 0 (回绕!)',
            warning: true,
          },
        },
      ],
    },
    // Step 9: i=2 第3轮
    {
      line: 8,
      description: 'i=2 第3轮循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 2, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 0, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 2, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 10: 第3次 rx_count++
    {
      line: 9,
      description: 'rx_count++: 2→3',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 0, state: '', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 2, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 3,
            bits: 8,
            label: 'rx_count = 3',
          },
        },
      ],
    },
    // Step 11: 第3次 packet_seq++
    {
      line: 10,
      description: 'packet_seq++: 0→1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 1, state: 'changed', showBinary: true },
            { type: 'uint8_t', name: 'i', value: 2, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 1,
            bits: 8,
            label: 'packet_seq = 1',
          },
        },
      ],
    },
    // Step 12: 循环结束
    {
      line: 11,
      description: '循环结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 1, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 13: 打印结果
    {
      line: 13,
      description: '输出 rx_count: 3',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: 'reading', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 1, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'rx_count: 3',
          },
        },
      ],
    },
    // Step 14: 打印 packet_seq
    {
      line: 14,
      description: '输出 packet_seq: 1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 1, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'packet_seq: 1',
          },
        },
      ],
    },
    // Step 15: 总结
    {
      line: 17,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'rx_count', value: 3, state: '', showBinary: true },
            { type: 'uint8_t', name: 'packet_seq', value: 1, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '陷阱总结',
            points: [
              'uint8_t 最大值是 255',
              '255 + 1 = 0 (溢出回绕)',
              'packet_seq 从 254 变成 1',
              '不是预期的 257!',
            ],
            warning: true,
          },
        },
      ],
    },
  ],
};

export default uint8OverflowData;
