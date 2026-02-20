// level1-auto-register-static.ts - auto/register/static可视化
import { VisualizationData } from '../types';

export const level1AutoRegisterStaticData: VisualizationData = {
  id: 'level1-auto-register-static',
  title: '存储类别',
  filename: 'storage.c',
  badge: '📦 存储',
  code: [
    'auto int a;',
    'register int b;',
    'static int c;',
    'int main() { return 0; }',
  ],
  steps: [
    { line: 0, description: 'auto变量', frames: [],
      vizBlocks: [{ type: 'rule', data: { title: '存储类别', content: 'auto/register/static/extern', color: 'blue' } }] },
    { line: 2, description: 'static静态', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '存储类别', points: ['auto: 默认,栈上', 'register: 建议存寄存器', 'static: 静态存储期', 'extern: 外部链接'] } }] },
  ],
};

export default level1AutoRegisterStaticData;
