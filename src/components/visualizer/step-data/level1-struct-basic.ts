// level1-struct-basic.ts - 结构体基础可视化
import { VisualizationData } from '../types';

export const level1StructBasicData: VisualizationData = {
  id: 'level1-struct-basic',
  title: '结构体基础',
  filename: 'struct.c',
  badge: '🏗️ 结构体',
  code: [
    'struct Point { int x; int y; };',
    'int main() {',
    '    struct Point p = {10, 20};',
    '    p.x = 30;',
    '    return p.x + p.y;',
    '}',
  ],
  steps: [
    { line: 0, description: '定义结构体', frames: [{ name: 'Point', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '结构体', content: '不同类型数据的集合', color: 'blue' } }] },
    { line: 2, description: 'p={10,20}', frames: [{ name: 'main', vars: [{ type: 'struct Point', name: 'p', value: '{x:10,y:20}', state: 'changed' }] }], vizBlocks: [] },
    { line: 3, description: 'p.x=30', frames: [{ name: 'main', vars: [{ type: 'struct Point', name: 'p', value: '{x:30,y:20}', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: '返回50', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '结构体', points: ['用.访问成员', 'x=30,y=20', '30+20=50'] } }] },
  ],
};

export default level1StructBasicData;
