// level1-union-basic.ts - 联合体基础可视化
import { VisualizationData } from '../types';

export const level1UnionBasicData: VisualizationData = {
  id: 'level1-union-basic',
  title: '联合体基础',
  filename: 'union.c',
  badge: '🔗 联合体',
  code: [
    'union Data { int i; char c; };',
    'int main() {',
    '    union Data d;',
    '    d.i = 0x41;',
    '    printf("d.i=%d, d.c=%c\\n", d.i, d.c);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '定义联合体', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '联合体', content: '共享内存,取最大成员', color: 'blue' } }] },
    { line: 3, description: 'd.i=0x41', frames: [{ name: 'main', vars: [{ type: 'union Data', name: 'd', value: 'i:0x41', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'd.i=65, d.c=A' } }] },
    { line: 6, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '联合体', points: ['所有成员共享内存', '0x41=65=ASCII A', '改i会影响c'] } }] },
  ],
};

export default level1UnionBasicData;
