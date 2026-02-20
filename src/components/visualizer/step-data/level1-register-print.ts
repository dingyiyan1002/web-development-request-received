// level1-register-print.ts - 打印寄存器值可视化
import { VisualizationData } from '../types';

export const level1RegisterPrintData: VisualizationData = {
  id: 'level1-register-print',
  title: '打印寄存器值',
  filename: 'register.c',
  badge: '📋 格式化输出',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint32_t gpio_reg = 0x1234ABCD;',
    '    uint32_t uart_reg = 0x0056;',
    '    uint32_t spi_reg  = 0xFF;',
    '',
    '    printf("GPIO: 0x%08X\\n", gpio_reg);',
    '    printf("UART: 0x%08X\\n", uart_reg);',
    '    printf("SPI:  0x%08X\\n", spi_reg);',
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
            title: '%08X 格式符',
            content: '8位十六进制输出，不足8位前面补0，大写字母',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 声明 gpio_reg
    {
      line: 5,
      description: 'gpio_reg = 0x1234ABCD',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 声明 uart_reg
    {
      line: 6,
      description: 'uart_reg = 0x0056',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: '' },
            { type: 'uint32_t', name: 'uart_reg', value: '0x00000056', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 3: 声明 spi_reg
    {
      line: 7,
      description: 'spi_reg = 0xFF',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: '' },
            { type: 'uint32_t', name: 'uart_reg', value: '0x00000056', state: '' },
            { type: 'uint32_t', name: 'spi_reg', value: '0x000000FF', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 打印 gpio_reg
    {
      line: 9,
      description: '输出 GPIO: 0x1234ABCD',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: 'reading' },
            { type: 'uint32_t', name: 'uart_reg', value: '0x00000056', state: '' },
            { type: 'uint32_t', name: 'spi_reg', value: '0x000000FF', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'GPIO: 0x1234ABCD',
          },
        },
      ],
    },
    // Step 5: 打印 uart_reg
    {
      line: 10,
      description: '输出 UART: 0x00000056',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: '' },
            { type: 'uint32_t', name: 'uart_reg', value: '0x00000056', state: 'reading' },
            { type: 'uint32_t', name: 'spi_reg', value: '0x000000FF', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'UART: 0x00000056',
          },
        },
      ],
    },
    // Step 6: 打印 spi_reg
    {
      line: 11,
      description: '输出 SPI: 0x000000FF',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint32_t', name: 'gpio_reg', value: '0x1234ABCD', state: '' },
            { type: 'uint32_t', name: 'uart_reg', value: '0x00000056', state: '' },
            { type: 'uint32_t', name: 'spi_reg', value: '0x000000FF', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'SPI:  0x000000FF',
          },
        },
      ],
    },
    // Step 7: 程序结束
    {
      line: 14,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '知识点总结',
            points: [
              '%08X = 8位十六进制输出',
              '不足8位前面补0',
              'X = 大写字母输出',
              '嵌入式调试常用格式，保证输出对齐',
            ],
          },
        },
      ],
    },
  ],
};

export default level1RegisterPrintData;
