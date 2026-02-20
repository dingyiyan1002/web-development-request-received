// pass-by-value.ts - 参数传值可视化
import { VisualizationData } from '../types';

export const passByValueData: VisualizationData = {
  id: 'pass-by-value',
  title: '参数传值',
  filename: 'pass_by_value.c',
  badge: '📤 值传递',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'void try_modify(uint8_t value)',
    '{',
    '    printf("Inside: value=%u\\n", value);',
    '    value = 100;',
    '    printf("Inside after: value=%u\\n", value);',
    '}',
    '',
    'int main(void)',
    '{',
    '    uint8_t counter = 10;',
    '',
    '    printf("Before: counter=%u\\n", counter);',
    '    try_modify(counter);',
    '    printf("After: counter=%u\\n", counter);',
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
            title: '值传递',
            content: '函数参数是实参的副本',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化 counter = 10
    {
      line: 15,
      description: 'counter = 10',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 打印 Before
    {
      line: 16,
      description: '输出: Before: counter=10',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Before: counter=10' } },
      ],
    },
    // Step 3: 调用函数
    {
      line: 17,
      description: '调用 try_modify(counter)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: '' },
          ],
        },
        {
          name: 'try_modify',
          vars: [
            { type: 'uint8_t', name: 'value', value: 10, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Inside: value=10' } },
      ],
    },
    // Step 4: 修改 value = 100
    {
      line: 7,
      description: 'value = 100 (副本被修改)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: '' },
          ],
        },
        {
          name: 'try_modify',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Inside after: value=100' } },
      ],
    },
    // Step 5: 函数返回
    {
      line: 17,
      description: '函数返回，原变量不变',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 6: 打印 After
    {
      line: 18,
      description: '输出: After: counter=10',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'After: counter=10' } },
      ],
    },
    // Step 7: 总结
    {
      line: 20,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'counter', value: 10, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '值传递总结',
            points: [
              '函数参数是实参的副本',
              '在函数内修改的是副本',
              '原变量 counter 保持不变',
              '修改 value 不影响 counter',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default passByValueData;
