// level1-sizeof-type.ts - sizeof类型大小可视化
import { VisualizationData } from '../types';

export const level1SizeofTypeData: VisualizationData = {
  id: 'level1-sizeof-type',
  title: 'sizeof类型大小',
  filename: 'sizeof.c',
  badge: '📏 大小',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    printf("char      = %zu\\n", sizeof(char));',
    '    printf("int       = %zu\\n", sizeof(int));',
    '    printf("uint8_t   = %zu\\n", sizeof(uint8_t));',
    '    printf("uint16_t  = %zu\\n", sizeof(uint16_t));',
    '    printf("uint32_t  = %zu\\n", sizeof(uint32_t));',
    '    printf("uint64_t  = %zu\\n", sizeof(uint64_t));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'sizeof', content: '返回类型/变量的字节大小', color: 'blue' } }] },
    { line: 5, description: 'char=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'char      = 1' } }] },
    { line: 6, description: 'int=4', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'int       = 4' } }] },
    { line: 7, description: 'uint8_t=1', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'uint8_t   = 1' } }] },
    { line: 8, description: 'uint16_t=2', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'uint16_t  = 2' } }] },
    { line: 9, description: 'uint32_t=4', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'uint32_t  = 4' } }] },
    { line: 10, description: 'uint64_t=8', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'uint64_t  = 8' } }] },
    { line: 13, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '类型大小', points: ['char/uint8_t: 1字节', 'uint16_t: 2字节', 'int/uint32_t: 4字节', 'uint64_t: 8字节'] } }] },
  ],
};

export default level1SizeofTypeData;
