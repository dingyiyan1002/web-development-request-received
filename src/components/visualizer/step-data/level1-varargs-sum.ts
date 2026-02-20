// level1-varargs-sum.ts - 可变参数求和可视化
import { VisualizationData } from '../types';

export const level1VarargsSumData: VisualizationData = {
  id: 'level1-varargs-sum',
  title: '可变参数求和',
  filename: 'sum.c',
  badge: '➕ 求和',
  code: ['#include <stdio.h>', '#include <stdarg.h>', 'int sum(int n, ...) { va_list v; va_start(v, n); int s = 0; while(n--) s += va_arg(v, int); va_end(v); return s; }', 'int main() { return sum(4, 1, 2, 3, 4); }'],
  steps: [
    { line: 0, description: '可变参数求和', frames: [], vizBlocks: [{ type: 'rule', data: { title: 'va_list', content: '可变参数处理', color: 'blue' } }] },
    { line: 3, description: '1+2+3+4=10', frames: [], vizBlocks: [{ type: 'summary', data: { title: '求和', points: ['va_start初始化', 'va_arg取值', 'va_end结束', '1+2+3+4=10'] } }] },
  ],
};

export default level1VarargsSumData;
