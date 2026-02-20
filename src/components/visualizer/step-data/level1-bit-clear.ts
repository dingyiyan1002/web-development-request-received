// level1-bit-clear.ts - 清除寄存器位可视化
import { VisualizationData } from '../types';

export const level1BitClearData: VisualizationData = {
  id: 'level1-bit-clear',
  title: '清除寄存器位',
  filename: 'bit-clear.c',
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
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '&=~ 清除位', content: '保留其他位，清除指定位', color: 'blue' } }] },
    { line: 5, description: 'status = 0x0F', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'status', value: '0x0F', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: '输出Before: 0x0F', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'status', value: '0x0F', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Before: 0x0F' } }] },
    { line: 9, description: '&=~FLAG_MASK', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'status', value: '0x0B', state: 'changed' }] }],
      vizBlocks: [{ type: 'binary-display', data: { value: 11, bits: 8, label: 'status = 0x0B', highlight: [2] } }] },
    { line: 10, description: '输出After: 0x0B', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'status', value: '0x0B', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'After:  0x0B' } }] },
    { line: 12, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '位与运算', points: ['&=~ 清除特定位', 'FLAG_MASK=0x04', '0x0F&0xFB=0x0B'] } }] },
  ],
};

export default level1BitClearData;
