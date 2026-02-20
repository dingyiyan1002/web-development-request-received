// level1-boolean-logic.ts - 布尔逻辑可视化
import { VisualizationData } from '../types';

export const level1BooleanLogicData: VisualizationData = {
  id: 'level1-boolean-logic',
  title: '布尔逻辑',
  filename: 'bool.c',
  badge: '🔬 布尔',
  code: [
    '#include <stdio.h>',
    '#include <stdbool.h>',
    'int main() {',
    '    bool a = true, b = false;',
    '    printf("!a=%d, a&&b=%d, a||b=%d\\n", !a, a && b, a || b);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '布尔', content: 'true=1, false=0', color: 'blue' } }] },
    { line: 2, description: 'a=true, b=false', frames: [], vizBlocks: [] },
    { line: 3, description: '逻辑运算', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '!a=0, a&&b=0, a||b=1' } }] },
    { line: 5, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '布尔', points: ['!非: true变false', '&&与: 全true才true', '||或: 有true就true'] } }] },
  ],
};

export default level1BooleanLogicData;
