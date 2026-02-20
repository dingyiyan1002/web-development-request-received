// level1-function-param-pass.ts - 函数参数传递可视化
import { VisualizationData } from '../types';

export const level1FunctionParamPassData: VisualizationData = {
  id: 'level1-function-param-pass',
  title: '函数参数传递',
  filename: 'param.c',
  badge: '📤 参数',
  code: [
    '#include <stdio.h>',
    'void func(int a, int *b) {',
    '    a = 10;',
    '    *b = 20;',
    '}',
    'int main(void)',
    '{',
    '    int x = 1, y = 2;',
    '    func(x, &y);',
    '    printf("x=%d, y=%d\\n", x, y);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: 'main开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '参数传递', content: '值传递vs指针传递', color: 'blue' } }] },
    { line: 9, description: 'x=1,y=2', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'x', value: '1', state: 'changed' },
      { type: 'int', name: 'y', value: '2', state: 'changed' }
    ] }], vizBlocks: [] },
    { line: 10, description: '调用func', frames: [
      { name: 'main', vars: [] },
      { name: 'func', vars: [
        { type: 'int', name: 'a', value: '1', state: 'changed' },
        { type: 'int*', name: 'b', value: '→y', state: 'changed' }
      ]}
    ], vizBlocks: [] },
    { line: 2, description: 'a=10(形参)', frames: [{ name: 'func', vars: [
      { type: 'int', name: 'a', value: '10', state: 'changed' },
      { type: 'int*', name: 'b', value: '→y', state: '' }
    ] }], vizBlocks: [] },
    { line: 3, description: '*b=20(修改y)', frames: [{ name: 'func', vars: [
      { type: 'int', name: 'a', value: '10', state: '' },
      { type: 'int*', name: 'b', value: '→y', state: 'reading' }
    ] },
      { name: 'main', vars: [{ type: 'int', name: 'y', value: '20', state: 'changed' }] }
    ], vizBlocks: [] },
    { line: 11, description: 'x=1,y=20', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'x', value: '1', state: '' },
      { type: 'int', name: 'y', value: '20', state: '' }
    ] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'x=1, y=20' } }] },
    { line: 13, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '参数传递', points: ['值传递: 形参改不影响实参', '指针传递: 间接修改实参', 'x不变,y被修改'] } }] },
  ],
};

export default level1FunctionParamPassData;
