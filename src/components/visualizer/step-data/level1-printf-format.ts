// level1-printf-format.ts - printf格式符可视化
import { VisualizationData } from '../types';

export const level1PrintfFormatData: VisualizationData = {
  id: 'level1-printf-format',
  title: 'printf格式符',
  filename: 'printf.c',
  badge: '📋 格式化',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    int16_t  val_i = -123;',
    '    uint16_t val_u = 456;',
    '    double   val_f = 3.14159;',
    '    char     val_c = "A";',
    '',
    '    printf("%%d  = %d\\n", val_i);',
    '    printf("%%u  = %u\\n", val_u);',
    '    printf("%%f  = %f\\n", val_f);',
    '    printf("%%c  = %c\\n", val_c);',
    '    printf("%%s  = %s\\n", "hello");',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '格式符', content: 'd=u=int, f=float, c=char, s=string', color: 'blue' } }] },
    { line: 5, description: '声明变量', frames: [{ name: 'main', vars: [
      { type: 'int16_t', name: 'val_i', value: '-123', state: '' },
      { type: 'uint16_t', name: 'val_u', value: '456', state: '' },
    ] }], vizBlocks: [] },
    { line: 10, description: '%d输出-123', frames: [{ name: 'main', vars: [{ type: 'int16_t', name: 'val_i', value: '-123', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: '%d  = -123' } }] },
    { line: 11, description: '%u输出456', frames: [{ name: 'main', vars: [{ type: 'uint16_t', name: 'val_u', value: '456', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: '%u  = 456' } }] },
    { line: 12, description: '%f输出3.14', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '%f  = 3.141590' } }] },
    { line: 13, description: '%c输出A', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '%c  = A' } }] },
    { line: 14, description: '%s输出hello', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: '%s  = hello' } }] },
    { line: 17, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '格式符', points: ['%d=有符号十进制', '%u=无符号十进制', '%f=浮点数', '%c=字符', '%s=字符串'] } }] },
  ],
};

export default level1PrintfFormatData;
