// level1-goto-statement.ts - goto语句可视化
import { VisualizationData } from '../types';

export const level1GotoStatementData: VisualizationData = {
  id: 'level1-goto-statement',
  title: 'goto语句',
  filename: 'goto.c',
  badge: '⏩ goto',
  code: [
    'int main() {',
    '    int i = 0;',
    'loop:',
    '    i++;',
    '    if (i < 3) goto loop;',
    '    return i;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: 'goto', content: '跳转到标签处', color: 'blue' } }] },
    { line: 1, description: 'i=0', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '0', state: 'changed' }] }], vizBlocks: [] },
    { line: 3, description: 'i=1', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '1', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: '1<3?是,跳转', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '1', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '1', right: '3', result: true } }] },
    { line: 3, description: 'i=2', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '2', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: '2<3?是,跳转', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '2', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '2', right: '3', result: true } }] },
    { line: 3, description: 'i=3', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '3', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: '3<3?否,退出', frames: [{ name: 'main', vars: [{ type: 'int', name: 'i', value: '3', state: '' }] }],
      vizBlocks: [{ type: 'compare', data: { left: '3', right: '3', result: false } }] },
    { line: 5, description: '返回3', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: 'goto', points: ['跳转到标签', '可跳出循环', '但不宜多用'] } }] },
  ],
};

export default level1GotoStatementData;
