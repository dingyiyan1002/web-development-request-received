// level1-variable-arguments.ts - 可变参数可视化
import { VisualizationData } from '../types';

export const level1VariableArgumentsData: VisualizationData = {
  id: 'level1-variable-arguments',
  title: '可变参数',
  filename: 'vararg.c',
  badge: '📊 可变参数',
  code: [
    '#include <stdio.h>',
    '#include <stdarg.h>',
    'int sum(int cnt, ...) {',
    '    va_list args;',
    '    va_start(args, cnt);',
    '    int total = 0;',
    '    for (int i = 0; i < cnt; i++) {',
    '        total += va_arg(args, int);',
    '    }',
    '    va_end(args);',
    '    return total;',
    '}',
    'int main() { return sum(3, 1, 2, 3); }',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '可变参数', content: 'va_start/va_arg/va_end', color: 'blue' } }] },
    { line: 9, description: 'cnt=3', frames: [{ name: 'sum', vars: [{ type: 'int', name: 'cnt', value: '3', state: 'changed' }] }], vizBlocks: [] },
    { line: 5, description: 'total=1+2+3=6', frames: [{ name: 'sum', vars: [{ type: 'int', name: 'total', value: '6', state: 'changed' }] }], vizBlocks: [] },
    { line: 13, description: '返回6', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '可变参数', points: ['va_list声明', 'va_start初始化', 'va_arg取值', 'va_end结束'] } }] },
  ],
};

export default level1VariableArgumentsData;
