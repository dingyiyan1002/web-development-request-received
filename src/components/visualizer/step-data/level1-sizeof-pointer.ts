// level1-sizeof-pointer.ts - 指针大小可视化
import { VisualizationData } from '../types';

export const level1SizeofPointerData: VisualizationData = {
  id: 'level1-sizeof-pointer',
  title: '指针大小',
  filename: 'ptr-size.c',
  badge: '📏 指针',
  code: ['#include <stdio.h>', 'int main() { int *p; char *pc; void *pv; printf("int*=%zu, char*=%zu, void*=%zu\\n", sizeof(p), sizeof(pc), sizeof(pv)); return 0; }'],
  steps: [
    { line: 0, description: '指针大小', frames: [], vizBlocks: [{ type: 'rule', data: { title: '指针', content: '32位=4字节, 64位=8字节', color: 'blue' } }] },
    { line: 1, description: '都是8字节(64位)', frames: [], vizBlocks: [{ type: 'stdout', data: { content: 'int*=8, char*=8, void*=8' } }] },
    { line: 1, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '指针大小', points: ['所有指针大小相同', '与类型无关', '64位系统=8字节'] } }] },
  ],
};

export default level1SizeofPointerData;
