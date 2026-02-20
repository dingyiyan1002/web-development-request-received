// level1-void-pointer.ts - void指针可视化
import { VisualizationData } from '../types';

export const level1VoidPointerData: VisualizationData = {
  id: 'level1-void-pointer',
  title: 'void指针',
  filename: 'void-ptr.c',
  badge: '📍 void',
  code: ['#include <stdio.h>', 'int main() { int a = 10; void *p = &a; printf("%d\\n", *(int*)p); return 0; }'],
  steps: [
    { line: 0, description: 'void指针', frames: [], vizBlocks: [{ type: 'rule', data: { title: 'void*', content: '通用指针,需强制转换', color: 'blue' } }] },
    { line: 1, description: 'p=&a', frames: [], vizBlocks: [] },
    { line: 1, description: '*(int*)p=10', frames: [], vizBlocks: [{ type: 'stdout', data: { content: '10' } }] },
    { line: 1, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: 'void指针', points: ['可指向任意类型', '使用需强制转换', '不能直接解引用'] } }] },
  ],
};

export default level1VoidPointerData;
