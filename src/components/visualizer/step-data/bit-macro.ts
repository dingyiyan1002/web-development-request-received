// bit-macro.ts - BIT 宏定义可视化
import { VisualizationData } from '../types';

export const bitMacroData: VisualizationData = {
  id: 'bit-macro',
  title: 'BIT 宏定义',
  filename: 'bit_macro.c',
  badge: '🔧 宏定义',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define BIT(n)     (1U << (n))',
    '#define SET_BIT(reg, n)    ((reg) |= BIT(n))',
    '#define READ_BIT(reg, n)   (((reg) >> (n)) & 1)',
    '',
    'int main(void)',
    '{',
    '    uint8_t gpio_reg = 0x00;',
    '',
    '    SET_BIT(gpio_reg, 3);',
    '    printf("After SET_BIT(3): 0x%02X\\n", gpio_reg);',
    '',
    '    SET_BIT(gpio_reg, 5);',
    '    printf("After SET_BIT(5): 0x%02X\\n", gpio_reg);',
    '',
    '    printf("BIT(3) = %u\\n", READ_BIT(gpio_reg, 3));',
    '    printf("BIT(5) = %u\\n", READ_BIT(gpio_reg, 5));',
    '',
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
            title: '位操作宏',
            content: 'BIT(n) = 1 << n',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化 gpio_reg = 0
    {
      line: 10,
      description: 'gpio_reg = 0x00',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 0, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: SET_BIT(gpio_reg, 3)
    {
      line: 12,
      description: 'SET_BIT(3): gpio_reg |= 0x08',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 8, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 0,
            to: 8,
            operation: '0x00 | 0x08 = 0x08',
          },
        },
        {
          type: 'binary-display',
          data: {
            value: 8,
            bits: 8,
            label: 'gpio_reg = 0x08',
            highlight: [3],
          },
        },
      ],
    },
    // Step 3: 打印 SET_BIT(3)
    {
      line: 13,
      description: '输出: After SET_BIT(3): 0x08',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 8, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'After SET_BIT(3): 0x08' } },
      ],
    },
    // Step 4: SET_BIT(gpio_reg, 5)
    {
      line: 15,
      description: 'SET_BIT(5): gpio_reg |= 0x20',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 8,
            to: 40,
            operation: '0x08 | 0x20 = 0x28',
          },
        },
        {
          type: 'binary-display',
          data: {
            value: 40,
            bits: 8,
            label: 'gpio_reg = 0x28',
            highlight: [5, 3],
          },
        },
      ],
    },
    // Step 5: 打印 SET_BIT(5)
    {
      line: 16,
      description: '输出: After SET_BIT(5): 0x28',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'After SET_BIT(5): 0x28' } },
      ],
    },
    // Step 6: READ_BIT(gpio_reg, 3)
    {
      line: 18,
      description: 'READ_BIT(3): (0x28 >> 3) & 1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'BIT(3) = 1' } },
      ],
    },
    // Step 7: READ_BIT(gpio_reg, 5)
    {
      line: 19,
      description: 'READ_BIT(5): (0x28 >> 5) & 1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'BIT(5) = 1' } },
      ],
    },
    // Step 8: 总结
    {
      line: 21,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: '', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '位操作宏总结',
            points: [
              'BIT(n) = 1 << n，生成位掩码',
              'SET_BIT(reg, n) 设置第 n 位',
              'READ_BIT(reg, n) 读取第 n 位',
              'gpio_reg = 0x28 (00101000)',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default bitMacroData;
