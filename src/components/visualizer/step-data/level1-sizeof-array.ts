// level1-sizeof-array.ts - sizeof数组可视化
import { VisualizationData } from '../types';

export const level1SizeofArrayData: VisualizationData = {
  id: 'level1-sizeof-array',
  title: 'sizeof数组',
  filename: 'sizeof-arr.c',
  badge: '📏 数组大小',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    int arr[5] = {1,2,3,4,5};',
    '    printf("arr=%zu\\n", sizeof(arr));',
    '    printf("int=%zu\\n", sizeof(int));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: 'sizeof数组', content: '数组总字节=元素数×类型大小', color: 'blue' } }] },
    { line: 2, description: 'arr[5]', frames: [{ name: 'main', vars: [{ type: 'int[5]', name: 'arr', value: '[1,2,3,4,5]', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'arr=20' } }] },
    { line: 3, description: 'sizeof(int)=4', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: 'int=4' } }] },
    { line: 5, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'sizeof', points: ['5×4=20字节', 'sizeof(int)=4', '数组名不是指针'] } }] },
  ],
};

export default level1SizeofArrayData;
