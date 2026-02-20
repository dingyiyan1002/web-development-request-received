// level1-pointer-basic.ts - 指针基础可视化
import { VisualizationData } from '../types';

export const level1PointerBasicData: VisualizationData = {
  id: 'level1-pointer-basic',
  title: '指针基础',
  filename: 'pointer.c',
  badge: '📍 指针',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t value = 42;',
    '    uint8_t *ptr = &value;',
    '',
    '    printf("value = %u\\n", value);',
    '    printf("&value = %p\\n", (void*)&value);',
    '    printf("ptr = %p\\n", (void*)ptr);',
    '    printf("*ptr = %u\\n", *ptr);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '指针', content: '&取地址, *解引用', color: 'blue' } }] },
    { line: 5, description: 'value=42', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'value', value: '42', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: 'ptr=&value', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'value', value: '42', state: '' },
      { type: 'uint8_t*', name: 'ptr', value: '→42', state: 'changed' }
    ] }], vizBlocks: [] },
    { line: 8, description: '输出value', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'value', value: '42', state: 'reading' },
      { type: 'uint8_t*', name: 'ptr', value: '→42', state: '' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'value = 42' } }] },
    { line: 9, description: '输出&value', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'value', value: '42', state: 'reading' },
      { type: 'uint8_t*', name: 'ptr', value: '→42', state: '' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '&value = 0x7fff...' } }] },
    { line: 10, description: '输出ptr', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'value', value: '42', state: '' },
      { type: 'uint8_t*', name: 'ptr', value: '→42', state: 'reading' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'ptr = 0x7fff...' } }] },
    { line: 11, description: '输出*ptr', frames: [{ name: 'main', vars: [
      { type: 'uint8_t', name: 'value', value: '42', state: '' },
      { type: 'uint8_t*', name: 'ptr', value: '→42', state: 'reading' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: '*ptr = 42' } }] },
    { line: 13, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '指针基础', points: ['&value 取地址', 'ptr 存地址', '*ptr 解引用取值'] } }] },
  ],
};

export default level1PointerBasicData;
