// level1-global-local-var.ts - 全局与局部变量可视化
import { VisualizationData } from '../types';

export const level1GlobalLocalVarData: VisualizationData = {
  id: 'level1-global-local-var',
  title: '全局与局部变量',
  filename: 'global.c',
  badge: '🌍 作用域',
  code: [
    'int global = 10;',
    'void func() {',
    '    int local = 20;',
    '    global = 30;',
    '    local = 40;',
    '}',
    'int main() {',
    '    func();',
    '    return 0;',
    '}',
  ],
  steps: [
    { line: 0, description: '全局变量', frames: [{ name: 'global', vars: [{ type: 'int', name: 'global', value: '10', state: 'changed' }] }],
      vizBlocks: [{ type: 'rule', data: { title: '作用域', content: '全局:整个文件, 局部:函数内', color: 'blue' } }] },
    { line: 5, description: 'main调用func', frames: [{ name: 'main', vars: [] }],
      vizBlocks: [] },
    { line: 2, description: 'local=20', frames: [{ name: 'func', vars: [{ type: 'int', name: 'local', value: '20', state: 'changed' }] }], vizBlocks: [] },
    { line: 3, description: 'global=30', frames: [{ name: 'global', vars: [{ type: 'int', name: 'global', value: '30', state: 'changed' }] }], vizBlocks: [] },
    { line: 4, description: 'local=40', frames: [{ name: 'func', vars: [{ type: 'int', name: 'local', value: '40', state: 'changed' }] }], vizBlocks: [] },
    { line: 8, description: '程序结束', frames: [],
      vizBlocks: [{ type: 'summary', data: { title: '全局vs局部', points: ['全局:程序结束时释放', '局部:函数结束释放', '可同名,局部优先'] } }] },
  ],
};

export default level1GlobalLocalVarData;
