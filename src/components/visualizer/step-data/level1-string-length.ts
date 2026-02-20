// level1-string-length.ts - 字符串长度计算可视化
import { VisualizationData } from '../types';

export const level1StringLengthData: VisualizationData = {
  id: 'level1-string-length',
  title: '字符串处理',
  filename: 'string.c',
  badge: '📝 字符串',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    char str[] = "Hello";',
    '    uint8_t len = 0;',
    '    while (str[len] != "\\0") {',
    '        len++;',
    '    }',
    '    printf("Length: %u\\n", len);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '字符串', content: '以\\0结尾的字符数组', color: 'blue' } }] },
    { line: 5, description: 'str = "Hello"', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: 'len = 0', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '0', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'H非\\0, len=1', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '1', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'e非\\0, len=2', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '2', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'l非\\0, len=3', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '3', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'l非\\0, len=4', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '4', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'o非\\0, len=5', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '5', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: '\\0, 退出循环', frames: [{ name: 'main', vars: [{ type: 'char[6]', name: 'str', value: '"Hello\\0"', state: '' }, { type: 'uint8_t', name: 'len', value: '5', state: '' }] }], vizBlocks: [] },
    { line: 10, description: '输出Length: 5', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'len', value: '5', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Length: 5' } }] },
    { line: 12, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '字符串长度', points: ['\\0是结束符', '逐字符计数', 'Hello长度=5'] } }] },
  ],
};

export default level1StringLengthData;
