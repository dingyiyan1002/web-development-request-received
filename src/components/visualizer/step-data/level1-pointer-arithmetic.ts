// level1-pointer-arithmetic.ts - 指针运算可视化
import { VisualizationData } from '../types';

export const level1PointerArithmeticData: VisualizationData = {
  id: 'level1-pointer-arithmetic',
  title: '指针运算',
  filename: 'ptr-math.c',
  badge: '➕ 指针运算',
  code: ['#include <stdio.h>', 'int main() { int arr[3] = {10,20,30}; int *p = arr; printf("%d,%d,%d\\n", *p, *(p+1), *(p+2)); return 0; }'],
  steps: [
    { line: 0, description: '指针运算', frames: [], vizBlocks: [{ type: 'rule', data: { title: '指针运算', content: 'p+1指向下一个元素', color: 'blue' } }] },
    { line: 1, description: '*p=10,*(p+1)=20,*(p+2)=30', frames: [], vizBlocks: [{ type: 'stdout', data: { content: '10,20,30' } }] },
    { line: 1, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '指针运算', points: ['p+1按类型大小增加', '*(p+i)=arr[i]', '指针算术'] } }] },
  ],
};

export default level1PointerArithmeticData;
