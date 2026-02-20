// level1-multi-dimensional-array.ts - 二维数组可视化
import { VisualizationData } from '../types';

export const level1MultiDimensionalArrayData: VisualizationData = {
  id: 'level1-multi-dimensional-array',
  title: '二维数组',
  filename: 'matrix.c',
  badge: '📊 矩阵',
  code: [
    '#include <stdio.h>',
    '',
    'int main(void)',
    '{',
    '    int matrix[2][3] = {{1,2,3}, {4,5,6}};',
    '    printf("matrix[0][0] = %d\\n", matrix[0][0]);',
    '    printf("matrix[1][2] = %d\\n", matrix[1][2]);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '二维数组', content: 'matrix[行][列]', color: 'blue' } }] },
    { line: 5, description: 'matrix={{1,2,3},{4,5,6}}', frames: [{ name: 'main', vars: [{ type: 'int[2][3]', name: 'matrix', value: '[[1,2,3],[4,5,6]]', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 6, description: 'matrix[0][0]=1', frames: [{ name: 'main', vars: [{ type: 'int[2][3]', name: 'matrix', value: '[[1,2,3],[4,5,6]]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'matrix[0][0] = 1' } }] },
    { line: 7, description: 'matrix[1][2]=6', frames: [{ name: 'main', vars: [{ type: 'int[2][3]', name: 'matrix', value: '[[1,2,3],[4,5,6]]', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'matrix[1][2] = 6' } }] },
    { line: 9, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '二维数组', points: ['[行][列]索引', 'matrix[0][0]=第1行第1列', 'matrix[1][2]=第2行第3列'] } }] },
  ],
};

export default level1MultiDimensionalArrayData;
