// level1-type-cast.ts - 类型转换可视化
import { VisualizationData } from '../types';

export const level1TypeCastData: VisualizationData = {
  id: 'level1-type-cast',
  title: '类型转换',
  filename: 'cast.c',
  badge: '🔄 转换',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    int a = 5 / 2;',
    '    double b = 5 / 2;',
    '    double c = (double)5 / 2;',
    '    printf("a=%d, b=%f, c=%f\\n", a, b, c);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '类型转换', content: '自动转换vs强制转换', color: 'blue' } }] },
    { line: 2, description: 'a=5/2=2', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '2', state: 'changed' }] }], vizBlocks: [] },
    { line: 3, description: 'b=2.0', frames: [{ name: 'main', vars: [{ type: 'double', name: 'b', value: '2.0', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 'c=2.5', frames: [{ name: 'main', vars: [{ type: 'double', name: 'c', value: '2.5', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a=2, b=2.000000, c=2.500000' } }] },
    { line: 6, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '类型转换', points: ['int/int=int', 'int/double=double', '(double)强制转换'] } }] },
  ],
};

export default level1TypeCastData;
