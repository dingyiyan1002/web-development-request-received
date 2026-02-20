// level1-preprocessor-conditional.ts - 条件编译可视化
import { VisualizationData } from '../types';

export const level1PreprocessorConditionalData: VisualizationData = {
  id: 'level1-preprocessor-conditional',
  title: '条件编译',
  filename: 'ifdef.c',
  badge: '🔨 预处理器',
  code: [
    '#define DEBUG 1',
    '#ifdef DEBUG',
    '    #define LOG(x) printf(x)',
    '#else',
    '    #define LOG(x)',
    '#endif',
    'int main() { LOG("Debug mode\\n"); return 0; }',
  ],
  steps: [
    { line: 0, description: '定义DEBUG', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '条件编译', content: '#ifdef/#ifndef/#if', color: 'blue' } }] },
    { line: 2, description: 'DEBUG已定义', frames: [],
      vizBlocks: [{ type: 'stdout', data: { content: 'Debug mode' } }] },
    { line: 7, description: '结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '条件编译', points: ['#ifdef: 如果已定义', '#ifndef: 如果未定义', '用于Debug/Release切换'] } }] },
  ],
};

export default level1PreprocessorConditionalData;
