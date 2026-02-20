// level1-hex-dec-conversion.ts - 进制转换可视化
import { VisualizationData } from '../types';

export const level1HexDecConversionData: VisualizationData = {
  id: 'level1-hex-dec-conversion',
  title: '进制转换',
  filename: 'hex-dec.c',
  badge: '🔢 进制',
  code: [
    '#include <stdio.h>',
    'int main() {',
    '    int dec = 255;',
    '    printf("dec=%d, hex=0x%X\\n", dec, dec);',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '开始', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '进制', content: '十进制转十六进制', color: 'blue' } }] },
    { line: 2, description: 'dec=255', frames: [{ name: 'main', vars: [{ type: 'int', name: 'dec', value: '255', state: 'changed' }] }],
      vizBlocks: [] },
    { line: 3, description: '255转十六进制', frames: [{ name: 'main', vars: [{ type: 'int', name: 'dec', value: '255', state: '' }] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'dec=255, hex=0xFF' } }] },
    { line: 5, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '进制转换', points: ['255十进制=0xFF十六进制', '十进制转十六进制', '0x前缀表示十六进制'] } }] },
  ],
};

export default level1HexDecConversionData;
