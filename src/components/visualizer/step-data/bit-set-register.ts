// bit-set-register.ts - 位运算设置寄存器可视化
import { VisualizationData } from '../types';

export const bitSetRegisterData: VisualizationData = {
  id: 'bit-set-register',
  title: '设置寄存器位',
  filename: 'set_bit.c',
  badge: '🔧 位运算',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define LED_PIN  (1 << 3)',
    '',
    'int main(void)',
    '{',
    '    uint8_t gpio_reg = 0x00;',
    '    gpio_reg |= LED_PIN;',
    '    printf("GPIO: 0x%02X\\n", gpio_reg);',
    '    ',
    '    gpio_reg |= (1 << 5);',
    '    printf("GPIO: 0x%02X\\n", gpio_reg);',
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
            title: '位或运算',
            content: 'x | 1 = 1 (设置位为1)',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 初始化 gpio_reg = 0
    {
      line: 6,
      description: 'gpio_reg = 0x00',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 0, state: 'changed', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 0,
            bits: 8,
            label: 'gpio_reg = 0x00',
          },
        },
      ],
    },
    // Step 2: LED_PIN = 1 << 3
    {
      line: 7,
      description: 'gpio_reg |= 0x08 (设置第3位)',
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
    // Step 3: 打印结果
    {
      line: 8,
      description: '输出: GPIO: 0x08',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 8, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'GPIO: 0x08',
          },
        },
      ],
    },
    // Step 4: 设置第5位
    {
      line: 10,
      description: 'gpio_reg |= 0x20 (设置第5位)',
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
    // Step 5: 打印结果
    {
      line: 11,
      description: '输出: GPIO: 0x28',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'gpio_reg', value: 40, state: 'reading', showBinary: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'GPIO: 0x28',
          },
        },
      ],
    },
    // Step 6: 总结
    {
      line: 12,
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
            title: '位运算总结',
            points: [
              '|= 用于设置特定位为1',
              '0x08 | 0x20 = 0x28 (第3、5位为1)',
              '其他位保持不变',
              '常用于GPIO寄存器操作',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default bitSetRegisterData;
