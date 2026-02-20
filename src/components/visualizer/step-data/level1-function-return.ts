// level1-function-return.ts - 函数调用与返回值可视化
import { VisualizationData } from '../types';

export const level1FunctionReturnData: VisualizationData = {
  id: 'level1-function-return',
  title: '函数调用与返回值',
  filename: 'function.c',
  badge: '📞 函数调用',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define SUCCESS  0',
    '#define ERR_PARAM_INVALID  -1',
    '',
    'int32_t uart_init(uint32_t baud_rate, uint8_t data_bits)',
    '{',
    '    if (baud_rate == 0) {',
    '        return ERR_PARAM_INVALID;',
    '    }',
    '    if (data_bits < 5 || data_bits > 8) {',
    '        return ERR_PARAM_INVALID;',
    '    }',
    '    printf("UART init: baud=%lu, bits=%u\\n", baud_rate, data_bits);',
    '    return SUCCESS;',
    '}',
    '',
    'int main(void)',
    '{',
    '    int32_t ret = uart_init(115200, 8);',
    '    if (ret != SUCCESS) {',
    '        printf("Init failed: %d\\n", ret);',
    '        return -1;',
    '    }',
    '    printf("Init success\\n");',
    '    return 0;',
    '}',
  ],
  steps: [
    {
      line: 0,
      description: 'main函数开始',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '返回值规范',
            content: '0=成功, 负数=错误',
            color: 'blue',
          },
        },
      ],
    },
    {
      line: 19,
      description: '调用uart_init(115200, 8)',
      frames: [
        { name: 'main', vars: [] },
        { name: 'uart_init', vars: [
          { type: 'uint32_t', name: 'baud_rate', value: '115200', state: 'changed' },
          { type: 'uint8_t', name: 'data_bits', value: '8', state: 'changed' },
        ]},
      ],
      vizBlocks: [],
    },
    {
      line: 9,
      description: '检查baud_rate!=0, 通过',
      frames: [
        { name: 'uart_init', vars: [
          { type: 'uint32_t', name: 'baud_rate', value: '115200', state: 'reading' },
          { type: 'uint8_t', name: 'data_bits', value: '8', state: '' },
        ]},
      ],
      vizBlocks: [],
    },
    {
      line: 12,
      description: '检查data_bits范围, 通过',
      frames: [
        { name: 'uart_init', vars: [
          { type: 'uint32_t', name: 'baud_rate', value: '115200', state: '' },
          { type: 'uint8_t', name: 'data_bits', value: '8', state: 'reading' },
        ]},
      ],
      vizBlocks: [],
    },
    {
      line: 14,
      description: '打印初始化信息',
      frames: [
        { name: 'uart_init', vars: [
          { type: 'uint32_t', name: 'baud_rate', value: '115200', state: '' },
          { type: 'uint8_t', name: 'data_bits', value: '8', state: '' },
        ]},
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'UART init: baud=115200, bits=8' } },
      ],
    },
    {
      line: 15,
      description: '返回SUCCESS(0)',
      frames: [
        { name: 'uart_init', vars: [] },
      ],
      vizBlocks: [],
    },
    {
      line: 20,
      description: 'ret=0, 检查!=0为false',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int32_t', name: 'ret', value: '0', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 24,
      description: '打印Init success',
      frames: [
        { name: 'main', vars: [{ type: 'int32_t', name: 'ret', value: '0', state: '' }] },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Init success' } },
      ],
    },
    {
      line: 26,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '嵌入式驱动规范',
            points: ['0=成功', '负数=错误码', '调用后必检查返回值'],
          },
        },
      ],
    },
  ],
};

export default level1FunctionReturnData;
