// level1-bit-set.ts - 设置寄存器位可视化
import { VisualizationData } from '../types';

export const level1BitSetData: VisualizationData = {
  id: 'level1-bit-set',
  title: '设置寄存器位',
  filename: 'bit-set.c',
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
    '',
    '    gpio_reg |= (1 << 5);',
    '    printf("GPIO: 0x%02X\\n", gpio_reg);',
    '    return 0;',
    '}',
  ],
  steps: [
    {
      line: 0,
      description: '程序开始',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        { type: 'rule', data: { title: '|= 设置位', content: '保留原值，设置指定位', color: 'blue' } },
      ],
    },
    {
      line: 5,
      description: 'gpio_reg = 0x00',
      frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x00', state: 'changed' }] }],
      vizBlocks: [],
    },
    {
      line: 6,
      description: '|= LED_PIN (0x08)',
      frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x08', state: 'changed' }] }],
      vizBlocks: [
        { type: 'binary-display', data: { value: 8, bits: 8, label: 'gpio_reg = 0x08', highlight: [3] } },
      ],
    },
    {
      line: 7,
      description: '输出: 0x08',
      frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x08', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'GPIO: 0x08' } }],
    },
    {
      line: 9,
      description: '|= (1<<5), 0x28',
      frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x28', state: 'changed' }] }],
      vizBlocks: [
        { type: 'binary-display', data: { value: 40, bits: 8, label: 'gpio_reg = 0x28', highlight: [3, 5] } },
      ],
    },
    {
      line: 10,
      description: '输出: 0x28',
      frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x28', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'GPIO: 0x28' } }],
    },
    {
      line: 12,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        { type: 'summary', data: { title: '位或运算', points: ['|= 设置特定位', '1<<n = 第n位为1', '0x08=第3位, 0x20=第5位'] } },
      ],
    },
  ],
};

export default level1BitSetData;
