// level1-schar-sshort.ts - 有符号类型可视化
import { VisualizationData } from '../types';

export const level1ScharSshortData: VisualizationData = {
  id: 'level1-schar-sshort',
  title: '有符号类型',
  filename: 'schar.c',
  badge: '🔢 有符号',
  code: ['#include <stdio.h>', '#include <stdint.h>', 'int main() { int8_t a = -128; int16_t b = -32768; printf("%d, %d\\n", a, b); return 0; }'],
  steps: [
    { line: 0, description: '开始', frames: [], vizBlocks: [{ type: 'rule', data: { title: '有符号', content: 'int8_t: -128~127, int16_t: -32768~32767', color: 'blue' } }] },
    { line: 2, description: 'a=-128,b=-32768', frames: [], vizBlocks: [{ type: 'stdout', data: { content: '-128, -32768' } }] },
    { line: 2, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '有符号', points: ['int8_t: -128~127', 'int16_t: -32768~32767', '最高位为符号位'] } }] },
  ],
};

export default level1ScharSshortData;
