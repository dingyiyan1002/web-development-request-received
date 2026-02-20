// level1-null-pointer.ts - 空指针可视化
import { VisualizationData } from '../types';

export const level1NullPointerData: VisualizationData = {
  id: 'level1-null-pointer',
  title: '空指针',
  filename: 'null.c',
  badge: '❌ 空',
  code: ['#include <stdio.h>', 'int main() { int *p = NULL; if (p == NULL) printf("NULL\\n"); return 0; }'],
  steps: [
    { line: 0, description: '空指针', frames: [], vizBlocks: [{ type: 'rule', data: { title: 'NULL', content: '空指针,不指向任何地址', color: 'blue' } }] },
    { line: 1, description: 'p=NULL', frames: [{ name: 'main', vars: [{ type: 'int*', name: 'p', value: 'NULL', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'NULL' } }] },
    { line: 1, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '空指针', points: ['NULL=0', '使用前检查', '避免解引用空指针'] } }] },
  ],
};

export default level1NullPointerData;
