// level1-function-pointer.ts - 函数指针可视化
import { VisualizationData } from '../types';

export const level1FunctionPointerData: VisualizationData = {
  id: 'level1-function-pointer',
  title: '函数指针',
  filename: 'func-ptr.c',
  badge: '📍 函数指针',
  code: [
    '#include <stdio.h>',
    'int add(int a, int b) { return a + b; }',
    'int main() {',
    '    int (*fp)(int, int) = add;',
    '    int result = fp(3, 4);',
    '    printf("result = %d\\n", result);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '函数指针', content: '指向函数的指针', color: 'blue' } }] },
    { line: 3, description: 'fp=add', frames: [{ name: 'main', vars: [{ type: 'int(*)(int,int)', name: 'fp', value: '→add', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 'fp(3,4)=7', frames: [{ name: 'main', vars: [{ type: 'int', name: 'result', value: '7', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'result = 7' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '函数指针', points: ['返回值(*指针名)(参数)', 'fp指向add函数', 'fp(3,4)调用add'] } }] },
  ],
};

export default level1FunctionPointerData;
