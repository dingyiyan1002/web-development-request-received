// level1-bitwise-and-or.ts - 位与/位或可视化
import { VisualizationData } from '../types';

export const level1BitwiseAndOrData: VisualizationData = {
  id: 'level1-bitwise-and-or',
  title: '位与/位或',
  filename: 'bit-and-or.c',
  badge: '🔗 位运算',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    printf("5 & 3 = %d\\n", 5 & 3);',
    '    printf("5 | 3 = %d\\n", 5 | 3);',
    '    printf("5 ^ 3 = %d\\n", 5 ^ 3);',
    '    printf("~5    = %d\\n", ~5);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '位运算', content: '&位与 |位或 ^异或 ~取反', color: 'blue' } }] },
    { line: 2, description: '5&3=1', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '5 & 3 = 1' } }] },
    { line: 3, description: '5|3=7', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '5 | 3 = 7' } }] },
    { line: 4, description: '5^3=6', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '5 ^ 3 = 6' } }] },
    { line: 5, description: '~5=-6', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: '~5    = -6' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '位运算', points: ['&: 1&1=1,其他=0', '|: 0|0=0,其他=1', '^: 相同=0,不同=1'] } }] },
  ],
};

export default level1BitwiseAndOrData;
