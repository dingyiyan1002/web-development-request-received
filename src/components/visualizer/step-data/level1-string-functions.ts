// level1-string-functions.ts - 字符串函数可视化
import { VisualizationData } from '../types';

export const level1StringFunctionsData: VisualizationData = {
  id: 'level1-string-functions',
  title: '字符串函数',
  filename: 'str-func.c',
  badge: '📝 字符串',
  code: [
    '#include <stdio.h>',
    '#include <string.h>',
    'int main() {',
    '    char s1[20] = "Hello";',
    '    char s2[20] = "World";',
    '    strcat(s1, s2);',
    '    printf("%s\\n", s1);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '字符串函数', content: 'strcpy/strcat/strcmp', color: 'blue' } }] },
    { line: 3, description: 's1="Hello"', frames: [{ name: 'main', vars: [{ type: 'char[20]', name: 's1', value: '"Hello"', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 's2="World"', frames: [{ name: 'main', vars: [{ type: 'char[20]', name: 's1', value: '"Hello"', state: '' }, { type: 'char[20]', name: 's2', value: '"World"', state: 'changed' }] }], vizBlocks: [] },
    { line: 5, description: 'strcat连接', frames: [{ name: 'main', vars: [{ type: 'char[20]', name: 's1', value: '"HelloWorld"', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'HelloWorld' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '字符串函数', points: ['strcpy: 复制', 'strcat: 连接', 'strcmp: 比较'] } }] },
  ],
};

export default level1StringFunctionsData;
