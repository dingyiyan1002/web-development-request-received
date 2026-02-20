// level1-uchar-ushort.ts - 无符号类型可视化
import { VisualizationData } from '../types';

export const level1UcharUshortData: VisualizationData = {
  id: 'level1-uchar-ushort',
  title: '无符号类型',
  filename: 'uchar.c',
  badge: '🔢 无符号',
  code: ['#include <stdio.h>', '#include <stdint.h>', 'int main() { uint8_t a = 255; uint16_t b = 65535; printf("%u, %u\\n", a, b); return 0; }'],
  steps: [
    { line: 0, description: '开始', frames: [], vizBlocks: [{ type: 'rule', data: { title: '无符号', content: 'uint8_t: 0-255, uint16_t: 0-65535', color: 'blue' } }] },
    { line: 2, description: 'a=255,b=65535', frames: [], vizBlocks: [{ type: 'stdout', data: { content: '255, 65535' } }] },
    { line: 2, description: '结束', frames: [], vizBlocks: [{ type: 'summary', data: { title: '无符号', points: ['uint8_t: 0-255', 'uint16_t: 0-65535', '不能存负数'] } }] },
  ],
};

export default level1UcharUshortData;
