// level1-enum-const.ts - 枚举类型可视化
import { VisualizationData } from '../types';

export const level1EnumConstData: VisualizationData = {
  id: 'level1-enum-const',
  title: '枚举类型',
  filename: 'enum.c',
  badge: '📋 枚举',
  code: [
    '#include <stdio.h>',
    'enum Color { RED=1, GREEN, BLUE };',
    'int main() {',
    '    enum Color c = GREEN;',
    '    printf("c = %d\\n", c);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '枚举', content: '常量整数值,默认0开始', color: 'blue' } }] },
    { line: 2, description: 'RED=1,GREEN=2,BLUE=3', frames: [], vizBlocks: [] },
    { line: 4, description: 'c=GREEN=2', frames: [{ name: 'main', vars: [{ type: 'enum Color', name: 'c', value: '2', state: 'changed' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'c = 2' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '枚举', points: ['自动从0/指定递增', '本质是int常量', 'GREEN=2'] } }] },
  ],
};

export default level1EnumConstData;
