// level1-bit-field.ts - 位域可视化
import { VisualizationData } from '../types';

export const level1BitFieldData: VisualizationData = {
  id: 'level1-bit-field',
  title: '位域',
  filename: 'bitfield.c',
  badge: '📊 位域',
  code: [
    'struct Flags { unsigned a: 1; unsigned b: 2; unsigned c: 5; };',
    'int main() {',
    '    struct Flags f = {1, 2, 10};',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '定义位域', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '位域', content: '按位定义字段宽度', color: 'blue' } }] },
    { line: 2, description: 'a=1(1位)', frames: [{ name: 'main', vars: [{ type: 'struct Flags', name: 'f', value: '{a:1,b:2,c:10}', state: 'changed' }] }],
      vizBlocks: [{ type: 'summary', data: { title: '位域', points: ['a:1位,值0-1', 'b:2位,值0-3', 'c:5位,值0-31'] } }] },
  ],
};

export default level1BitFieldData;
