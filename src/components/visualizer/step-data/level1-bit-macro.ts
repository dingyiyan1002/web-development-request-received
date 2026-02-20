// level1-bit-macro.ts - BIT宏定义可视化
import { VisualizationData } from '../types';

export const level1BitMacroData: VisualizationData = {
  id: 'level1-bit-macro',
  title: 'BIT宏定义',
  filename: 'bit-macro.c',
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
    '    SET_BIT(gpio_reg, 3);',
    '    printf("After SET_BIT(3): 0x%02X\\n", gpio_reg);',
    '    SET_BIT(gpio_reg, 5);',
    '    printf("After SET_BIT(5): 0x%02X\\n", gpio_reg);',
    '    printf("BIT(3) = %u\\n", READ_BIT(gpio_reg, 3));',
    '    printf("BIT(5) = %u\\n", READ_BIT(gpio_reg, 5));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'BIT(n)', content: '生成第n位的掩码', color: 'blue' } }] },
    { line: 9, description: 'gpio_reg = 0x00', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x00', state: 'changed' }] }], vizBlocks: [] },
    { line: 10, description: 'SET_BIT(gpio_reg,3)', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x08', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'After SET_BIT(3): 0x08' } }] },
    { line: 12, description: 'SET_BIT(gpio_reg,5)', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x28', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'After SET_BIT(5): 0x28' } }] },
    { line: 14, description: 'READ_BIT(gpio_reg,3)', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x28', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'BIT(3) = 1' } }] },
    { line: 15, description: 'READ_BIT(gpio_reg,5)', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'gpio_reg', value: '0x28', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'BIT(5) = 1' } }] },
    { line: 17, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '位操作宏', points: ['BIT(n)=1<<n', 'SET_BIT设置位', 'READ_BIT读取位'] } }] },
  ],
};

export default level1BitMacroData;
