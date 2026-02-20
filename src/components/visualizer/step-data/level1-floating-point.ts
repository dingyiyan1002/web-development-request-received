// level1-floating-point.ts - 浮点数可视化
import { VisualizationData } from '../types';

export const level1FloatingPointData: VisualizationData = {
  id: 'level1-floating-point',
  title: '浮点数',
  filename: 'float.c',
  badge: '🔵 浮点',
  code: ['#include <stdio.h>', 'int main() { float f = 3.14; printf("%f\\n", f); return 0; }'],
  steps: [
    { line: 0, description: '开始', frames: [], vizBlocks: [{ type: 'rule', data: { title: '浮点数', content: 'float 4字节, double 8字节', color: 'blue' } }] },
    { line: 1, description: 'f=3.14', frames: [{ name: 'main', vars: [{ type: 'float', name: 'f', value: '3.14', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: '3.140000' } }] },
    { line: 1, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '浮点数', points: ['float: 4字节', 'double: 8字节', '可能有精度误差'] } }] },
  ],
};

export default level1FloatingPointData;
