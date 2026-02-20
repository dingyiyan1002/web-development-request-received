// level1-comma-operator.ts - 逗号运算符可视化
import { VisualizationData } from '../types';

export const level1CommaOperatorData: VisualizationData = {
  id: 'level1-comma-operator',
  title: '逗号运算符',
  filename: 'comma.c',
  badge: '🔥 逗号',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    int a = (1, 2, 3);',
    '    int b;',
    '    b = (b=5, b+3);',
    '    printf("a=%d, b=%d\\n", a, b);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '逗号', content: '从左到右,取最后值', color: 'blue' } }] },
    { line: 2, description: 'a=(1,2,3)=3', frames: [{ name: 'main', vars: [{ type: 'int', name: 'a', value: '3', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 'b=(5,8)=8', frames: [{ name: 'main', vars: [{ type: 'int', name: 'b', value: '8', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'a=3, b=8' } }] },
    { line: 6, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '逗号运算', points: ['从左到右依次求值', '整个表达式取最右值', 'a=3, b=8'] } }] },
  ],
};

export default level1CommaOperatorData;
