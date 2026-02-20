// bit-clear-register.ts - 位运算清除寄存器可视化
import { VisualizationData } from '../types';

export const bitClearRegisterData: VisualizationData = {
  id: 'bit-clear-register',
  title: '清除寄存器位',
  filename: 'clear_bit.c',
  badge: '🔧 位运算',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define FLAG_MASK  (1 << 2)',
    '',
    'int main(void)',
    '{',
    '    uint8_t status = 0x0F;',
    '    printf("Before: 0x%02X\\n", status);',
    '    ',
    '    status &= ~FLAG_MASK;',
    '    printf("After:  0x%02X\\n", status);',
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
            title: '位与运算',
            content: 'x & 0 = 0 (清除位)',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 初始化 status = 0x0F
    {
      line: 6,
      description: 'status = 0x0F (00001111)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 15, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 15,
            bits: 8,
            label: 'status = 0x0F',
          },
        },
      ],
    },
    // Step 2: 显示Before
    {
      line: 7,
      description: '输出: Before: 0x0F',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 15, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Before: 0x0F',
          },
        },
      ],
    },
    // Step 3: 计算 ~FLAG_MASK
    {
      line: 9,
      description: '计算 ~FLAG_MASK',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 15, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 4,
            to: 251,
            operation: '~0x04 = 0xFB (取反)',
          },
        },
      ],
    },
    // Step 4: 执行清除
    {
      line: 9,
      description: 'status &= ~0x04 (清除第2位)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 11, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 15,
            to: 11,
            operation: '0x0F & 0xFB = 0x0B',
          },
        },
        {
          type: 'binary-display',
          data: {
            value: 11,
            bits: 8,
            label: 'status = 0x0B',
            highlight: [2],
          },
        },
      ],
    },
    // Step 5: 输出After
    {
      line: 10,
      description: '输出: After: 0x0B',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 11, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'After:  0x0B',
          },
        },
      ],
    },
    // Step 6: 总结
    {
      line: 11,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'status', value: 11, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '位运算总结',
            points: [
              '&= ~ 用于清除特定位',
              '0x0F & 0xFB = 0x0B',
              '第2位从1变成0',
              '常用于清除状态标志位',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default bitClearRegisterData;
