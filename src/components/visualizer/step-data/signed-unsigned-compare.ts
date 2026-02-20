// signed-unsigned-compare.ts - 有符号与无符号比较陷阱可视化
import { VisualizationData } from '../types';

export const signedUnsignedCompareData: VisualizationData = {
  id: 'signed-unsigned-compare',
  title: '有符号无符号比较陷阱',
  filename: 'compare_trap.c',
  badge: '⚠️ 类型隐式转换',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define TEMP_THRESHOLD  30',
    '',
    'int main(void)',
    '{',
    '    int16_t  temperature = -10;',
    '    uint16_t threshold = TEMP_THRESHOLD;',
    '',
    '    if (temperature < threshold) {',
    '        printf("Below threshold\\n");',
    '    } else {',
    '        printf("Above threshold\\n");',
    '    }',
    '',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '比较规则',
            content: '有符号与无符号比较时，有符号数会被转换为无符号数!',
            color: 'red',
          },
        },
      ],
    },
    // Step 1: 声明变量
    {
      line: 7,
      description: 'temperature = -10',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: 'changed', signed: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: 'changed', signed: false },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 比较前提示
    {
      line: 9,
      description: '开始比较: -10 < 30 ?',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: 'reading', signed: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: 'reading', signed: false },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'compare',
          data: {
            left: -10,
            right: 30,
            leftSigned: true,
            rightSigned: false,
            result: false,
          },
        },
      ],
    },
    // Step 3: 隐式转换
    {
      line: 9,
      description: '⚠️ -10 转换为无符号!',
      descriptionWarn: true,
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: 'changed', signed: true, warn: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: '', signed: false },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: -10,
            to: 65526,
            operation: '-10 (int16_t) → 65526 (uint16_t)',
            warning: true,
          },
        },
      ],
    },
    // Step 4: 比较结果
    {
      line: 9,
      description: '65526 > 30, 条件为假',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: 'warn', signed: true, warn: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: '', signed: false },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 5: 输出结果
    {
      line: 11,
      description: '输出: Above threshold',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: '', signed: true, warn: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: '', signed: false },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Above threshold',
          },
        },
      ],
    },
    // Step 6: 总结
    {
      line: 14,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: -10, state: '', signed: true, warn: true },
            { type: 'uint16_t', name: 'threshold', value: 30, state: '', signed: false },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '陷阱总结',
            points: [
              '有符号与无符号比较时发生隐式转换',
              '-10 转换为 uint16_t 后变成 65526',
              '65526 > 30，条件为假',
              '应该先强制转换类型再比较!',
            ],
            warning: true,
          },
        },
      ],
    },
  ],
};

export default signedUnsignedCompareData;
