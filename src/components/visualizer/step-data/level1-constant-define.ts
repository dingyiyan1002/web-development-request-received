// level1-constant-define.ts - 常量定义可视化
import { VisualizationData } from '../types';

export const level1ConstantDefineData: VisualizationData = {
  id: 'level1-constant-define',
  title: '常量定义',
  filename: 'define.c',
  badge: '📌 常量',
  code: [
    '#include <stdio.h>',
    '#define PI 3.14',
    '#define MAX(a, b) ((a) > (b) ? (a) : (b))',
    '',
    'int main(void)',
    '{',
    '    printf("PI = %f\\n", PI);',
    '    printf("MAX(3,5) = %d\\n", MAX(3, 5));',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '程序开始', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'rule', data: { title: '#define', content: '宏定义，编译时替换', color: 'blue' } }] },
    { line: 5, description: 'PI替换为3.14', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'PI = 3.140000' } }] },
    { line: 6, description: 'MAX(3,5)=5', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'stdout', data: { content: 'MAX(3,5) = 5' } }] },
    { line: 8, description: '程序结束', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [{ type: 'summary', data: { title: '宏定义', points: ['#define定义常量', '宏函数带参数', 'PI→3.14, MAX(3,5)→5'] } }] },
  ],
};

export default level1ConstantDefineData;
