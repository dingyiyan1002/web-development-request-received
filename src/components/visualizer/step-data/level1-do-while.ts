// level1-do-while.ts - do-while循环可视化
import { VisualizationData } from '../types';

export const level1DoWhileData: VisualizationData = {
  id: 'level1-do-while',
  title: 'do-while循环',
  filename: 'do-while.c',
  badge: '🔄 循环',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t count = 0;',
    '    do {',
    '        printf("Count: %u\\n", count);',
    '        count++;',
    '    } while (count < 3);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'do-while', content: '先执行，后判断，至少执行一次', color: 'blue' } }] },
    { line: 5, description: 'count=0', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '0', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: '输出Count: 0', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '0', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Count: 0' } }] },
    { line: 8, description: 'count=1', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '1', state: 'changed' }] }], vizBlocks: [] },
    { line: 9, description: '1<3? 是, 继续', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '1', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '1', right: '3', result: true } }] },
    { line: 7, description: '输出Count: 1', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '1', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Count: 1' } }] },
    { line: 8, description: 'count=2', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '2', state: 'changed' }] }], vizBlocks: [] },
    { line: 9, description: '2<3? 是, 继续', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '2', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '2', right: '3', result: true } }] },
    { line: 7, description: '输出Count: 2', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '2', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'Count: 2' } }] },
    { line: 8, description: 'count=3', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '3', state: 'changed' }] }], vizBlocks: [] },
    { line: 9, description: '3<3? 否, 退出', frames: [{ name: 'main', vars: [{ type: 'uint8_t', name: 'count', value: '3', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '3', right: '3', result: false } }] },
    { line: 12, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: 'do-while', points: ['先执行，后判断', '至少执行一次', '0→1→2→3退出'] } }] },
  ],
};

export default level1DoWhileData;
