// level1-const-pointer.ts - const指针可视化
import { VisualizationData } from '../types';

export const level1ConstPointerData: VisualizationData = {
  id: 'level1-const-pointer',
  title: 'const指针',
  filename: 'const-ptr.c',
  badge: '🔒 const',
  code: [
    'int main() {',
    '    int a = 10, b = 20;',
    '    const int *p1 = &a;',
    '    int *const p2 = &b;',
    '    const int *const p3 = &a;',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: 'const指针', content: 'const位置决定限制内容', color: 'blue' } }] },
    { line: 2, description: 'a=10,b=20', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'a', value: '10', state: 'changed' },
      { type: 'int', name: 'b', value: '20', state: 'changed' }
    ] }], vizBlocks: [] },
    { line: 3, description: 'p1:指向常量', frames: [{ name: 'main', vars: [
      { type: 'int', name: 'a', value: '10', state: '' },
      { type: 'int', name: 'b', value: '20', state: '' },
      { type: 'const int*', name: 'p1', value: '→10', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'rule', data: { title: 'const int*', content: '指针指向常量,不可改值', color: 'yellow' } }] },
    { line: 4, description: 'p2:常量指针', frames: [{ name: 'main', vars: [
      { type: 'int* const', name: 'p2', value: '→20', state: 'changed' }
    ] }],
      vizBlocks: [{ type: 'rule', data: { title: 'int* const', content: '指针本身常量,不可改指向', color: 'yellow' } }] },
    { line: 6, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'const指针', points: ['const int*: 指向常量', 'int* const: 常量指针', 'const int* const: 都不能改'] } }] },
  ],
};

export default level1ConstPointerData;
