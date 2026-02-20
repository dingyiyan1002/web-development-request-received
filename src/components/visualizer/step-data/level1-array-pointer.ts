// level1-array-pointer.ts - 数组与指针可视化
import { VisualizationData } from '../types';

export const level1ArrayPointerData: VisualizationData = {
  id: 'level1-array-pointer',
  title: '数组与指针',
  filename: 'arr-ptr.c',
  badge: '📍 数组指针',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    int arr[3] = {10, 20, 30};',
    '    int *p = arr;',
    '    printf("*p=%d\\n", *p);',
    '    printf("*(p+1)=%d\\n", *(p+1));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '数组指针', content: '数组名=首元素地址', color: 'blue' } }] },
    { line: 2, description: 'arr[3]', frames: [{ name: 'main', vars: [{ type: 'int[3]', name: 'arr', value: '[10,20,30]', state: 'changed' }] }], vizBlocks: [] },
    { line: 3, description: 'p=arr', frames: [{ name: 'main', vars: [{ type: 'int*', name: 'p', value: '→arr[0]', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: '*p=10', frames: [{ name: 'main', vars: [{ type: 'int*', name: 'p', value: '→10', state: 'reading' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: '*p=10' } }] },
    { line: 5, description: '*(p+1)=20', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '*(p+1)=20' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '数组指针', points: ['arr=&arr[0]', '*(p+i)=arr[i]', '指针运算按类型大小'] } }] },
  ],
};

export default level1ArrayPointerData;
