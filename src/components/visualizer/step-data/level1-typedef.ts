// level1-typedef.ts - typedef类型定义可视化
import { VisualizationData } from '../types';

export const level1TypedefData: VisualizationData = {
  id: 'level1-typedef',
  title: 'typedef类型定义',
  filename: 'typedef.c',
  badge: '📝 typedef',
  code: [
    '#include <stdio.h>',
    'typedef unsigned char u8;',
    'typedef unsigned int u32;',
    'int main() {',
    '    u8 a = 100;',
    '    u32 b = 1000;',
    '    printf("a=%u, b=%u\\n", a, b);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'typedef', content: '为类型起别名', color: 'blue' } }] },
    { line: 4, description: 'a=100', frames: [{ name: 'main', vars: [{ type: 'u8', name: 'a', value: '100', state: 'changed' }] }], vizBlocks: [] },
    { line: 5, description: 'b=1000', frames: [{ name: 'main', vars: [{ type: 'u8', name: 'a', value: '100', state: '' }, { type: 'u32', name: 'b', value: '1000', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a=100, b=1000' } }] },
    { line: 8, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'typedef', points: ['为类型起别名', '代码更易读', 'u8=unsigned char'] } }] },
  ],
};

export default level1TypedefData;
