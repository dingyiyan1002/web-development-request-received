// level1-volatile-keyword.ts - volatile关键字可视化
import { VisualizationData } from '../types';

export const level1VolatileKeywordData: VisualizationData = {
  id: 'level1-volatile-keyword',
  title: 'volatile关键字',
  filename: 'volatile.c',
  badge: '🔄 volatile',
  code: [
    'volatile uint32_t *reg = (volatile uint32_t *)0x40021000;',
    'int main() {',
    '    *reg = 0xFF;',
    '    uint32_t val = *reg;',
    '    return val;',
    '}',
  ],
  steps: [
    { line: 0, description: '定义寄存器', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: 'volatile', content: '防止编译器优化,每次都从内存读取', color: 'blue' } }] },
    { line: 2, description: '写入寄存器', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [] },
    { line: 3, description: '读取寄存器', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: 'volatile', points: ['硬件寄存器需要', '防止编译器优化', '每次都从内存读'] } }] },
  ],
};

export default level1VolatileKeywordData;
