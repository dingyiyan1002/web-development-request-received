// level1-static-var.ts - static静态变量可视化
import { VisualizationData } from '../types';

export const level1StaticVarData: VisualizationData = {
  id: 'level1-static-var',
  title: 'static静态变量',
  filename: 'static.c',
  badge: '🔒 静态',
  code: [
    'void counter() {',
    '    static int count = 0;',
    '    count++;',
    '    printf("count = %d\\n", count);',
    '}',
    'int main() {',
    '    counter();',
    '    counter();',
    '    counter();',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: 'static初始化', frames: [{ name: 'counter', vars: [{ type: 'static int', name: 'count', value: '0', state: 'changed' }] }],
      vizBlocks: [{ type: 'rule', data: { title: 'static', content: '只初始化一次,保留值', color: 'blue' } }] },
    { line: 3, description: '第1次:count=1', frames: [{ name: 'counter', vars: [{ type: 'static int', name: 'count', value: '1', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'count = 1' } }] },
    { line: 3, description: '第2次:count=2', frames: [{ name: 'counter', vars: [{ type: 'static int', name: 'count', value: '2', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'count = 2' } }] },
    { line: 3, description: '第3次:count=3', frames: [{ name: 'counter', vars: [{ type: 'static int', name: 'count', value: '3', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'count = 3' } }] },
    { line: 10, description: '程序结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'static', points: ['只初始化一次', '函数调用间保留值', '1→2→3累积'] } }] },
  ],
};

export default level1StaticVarData;
