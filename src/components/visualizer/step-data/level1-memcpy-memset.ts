// level1-memcpy-memset.ts - 内存操作函数可视化
import { VisualizationData } from '../types';

export const level1MemcpyMemsetData: VisualizationData = {
  id: 'level1-memcpy-memset',
  title: '内存操作函数',
  filename: 'mem.c',
  badge: '💾 内存',
  code: [
    '#include <stdio.h>',
    '#include <string.h>',
    'int main() {',
    '    char buf[10];',
    '    memset(buf, 0xFF, 10);',
    '    memcpy(buf + 2, "ABC", 3);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '内存函数', content: 'memset/memcpy/memmove', color: 'blue' } }] },
    { line: 3, description: 'buf[10]', frames: [{ name: 'main', vars: [{ type: 'char[10]', name: 'buf', value: '[?,?,?,?,?,?,?,?,?,?]', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 'memset填0xFF', frames: [{ name: 'main', vars: [{ type: 'char[10]', name: 'buf', value: '[FF,FF,FF,FF,FF,FF,FF,FF,FF,FF]', state: 'changed' }] }], vizBlocks: [] },
    { line: 5, description: 'memcpy复制', frames: [{ name: 'main', vars: [{ type: 'char[10]', name: 'buf', value: '[FF,FF,41,42,43,FF,FF,FF,FF,FF]', state: 'changed' }] }], vizBlocks: [] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '内存函数', points: ['memset: 填充内存', 'memcpy: 复制内存', '不检查重叠'] } }] },
  ],
};

export default level1MemcpyMemsetData;
