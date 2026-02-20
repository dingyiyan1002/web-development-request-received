// level1-ascii-table.ts - ASCII表可视化
import { VisualizationData } from '../types';

export const level1AsciiTableData: VisualizationData = {
  id: 'level1-ascii-table',
  title: 'ASCII表',
  filename: 'ascii.c',
  badge: '🔤 ASCII',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    printf("A=%d, 65=%c\\n", "A"[0], 65);',
    '    printf("0=%d, 48=%c\\n", "0"[0], 48);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: 'ASCII', content: '字符对应数字编码', color: 'blue' } }] },
    { line: 2, description: 'A=65', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: 'A=65, 65=A' } }] },
    { line: 3, description: '0=48', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '0=48, 48=0' } }] },
    { line: 5, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'ASCII', points: ['A-Z: 65-90', 'a-z: 97-122', '0-9: 48-57'] } }] },
  ],
};

export default level1AsciiTableData;
