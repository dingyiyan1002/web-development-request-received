// level1-string-array.ts - 字符数组可视化
import { VisualizationData } from '../types';

export const level1StringArrayData: VisualizationData = {
  id: 'level1-string-array',
  title: '字符数组',
  filename: 'char-array.c',
  badge: '🔤 字符',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    char str1[] = "Hi";',
    '    char str2[5] = "Hi";',
    '    printf("str1 size = %zu\\n", sizeof(str1));',
    '    printf("str2 size = %zu\\n", sizeof(str2));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '字符数组', content: '字符串以\\0结尾', color: 'blue' } }] },
    { line: 5, description: 'str1="Hi\\0"', frames: [{ name: 'main', vars: [{ type: 'char[3]', name: 'str1', value: '"Hi\\0"', state: 'changed' }] }], vizBlocks: [] },
    { line: 6, description: 'str2="Hi\\0\\0\\0"', frames: [{ name: 'main', vars: [{ type: 'char[5]', name: 'str2', value: '"Hi\\0\\0\\0"', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: 'sizeof(str1)=3', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'str1 size = 3' } }] },
    { line: 8, description: 'sizeof(str2)=5', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'str2 size = 5' } }] },
    { line: 10, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '字符数组', points: ['字符串自动加\\0', 'str1大小=字符数+1', 'str2固定5字节'] } }] },
  ],
};

export default level1StringArrayData;
