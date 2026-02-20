// pointer-types.ts - 指针运算可视化步骤数据
import { VisualizationData } from '../types';

export const pointerTypesData: VisualizationData = {
  id: 'pointer-types',
  title: '指针运算 - 不同类型步长',
  filename: 'pointer_types.c',
  badge: '🎯 指针进阶',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t arr8[4] = {1, 2, 3, 4};',
    '    uint16_t arr16[4] = {100, 200, 300, 400};',
    '    uint32_t arr32[4] = {1000, 2000, 3000, 4000};',
    '',
    '    uint8_t *p8 = arr8;',
    '    uint16_t *p16 = arr16;',
    '    uint32_t *p32 = arr32;',
    '',
    '    printf("uint8_t: %u, %u\\n", *p8, *(p8+1));',
    '    printf("uint16_t: %u, %u\\n", *p16, *(p16+1));',
    '    printf("uint32_t: %u, %u\\n", *p32, *(p32+1));',
    '',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行 - 指针运算基础',
      frames: [
        {
          name: 'main',
          vars: [],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '指针运算核心',
            content: '指针 + 1 移动的字节数取决于指针类型',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 声明 arr8
    {
      line: 5,
      description: 'uint8_t arr8[4] = {1,2,3,4}',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t[4]', name: 'arr8', value: '[1,2,3,4]', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 arr8 内存布局 (uint8_t: 1字节)',
            expression: 'arr8[4] = {1, 2, 3, 4}',
            variables: [
              { address: '0x1000', name: 'arr8[0]', value: '1', size: 1 },
              { address: '0x1001', name: 'arr8[1]', value: '2', size: 1 },
              { address: '0x1002', name: 'arr8[2]', value: '3', size: 1 },
              { address: '0x1003', name: 'arr8[3]', value: '4', size: 1 },
            ],
            note: 'uint8_t 每个元素占 1 字节',
          },
        },
      ],
    },
    // Step 2: 声明 arr16
    {
      line: 6,
      description: 'uint16_t arr16[4] = {100,200,300,400}',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t[4]', name: 'arr8', value: '[1,2,3,4]', state: '' },
            { type: 'uint16_t[4]', name: 'arr16', value: '[100,200,300,400]', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 arr16 内存布局 (uint16_t: 2字节)',
            expression: 'arr16[4] = {100, 200, 300, 400}',
            variables: [
              { address: '0x1010', name: 'arr16[0]', value: '100', size: 2 },
              { address: '0x1012', name: 'arr16[1]', value: '200', size: 2 },
              { address: '0x1014', name: 'arr16[2]', value: '300', size: 2 },
              { address: '0x1016', name: 'arr16[3]', value: '400', size: 2 },
            ],
            note: 'uint16_t 每个元素占 2 字节',
          },
        },
      ],
    },
    // Step 3: 声明 arr32
    {
      line: 7,
      description: 'uint32_t arr32[4] = {1000,2000,3000,4000}',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t[4]', name: 'arr8', value: '[1,2,3,4]', state: '' },
            { type: 'uint16_t[4]', name: 'arr16', value: '[100,200,300,400]', state: '' },
            { type: 'uint32_t[4]', name: 'arr32', value: '[1000,2000,3000,4000]', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 arr32 内存布局 (uint32_t: 4字节)',
            expression: 'arr32[4] = {1000, 2000, 3000, 4000}',
            variables: [
              { address: '0x1020', name: 'arr32[0]', value: '1000', size: 4 },
              { address: '0x1024', name: 'arr32[1]', value: '2000', size: 4 },
              { address: '0x1028', name: 'arr32[2]', value: '3000', size: 4 },
              { address: '0x102C', name: 'arr32[3]', value: '4000', size: 4 },
            ],
            note: 'uint32_t 每个元素占 4 字节',
          },
        },
      ],
    },
    // Step 4: 声明指针
    {
      line: 9,
      description: '声明三个指针变量',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t[4]', name: 'arr8', value: '[1,2,3,4]', state: '' },
            { type: 'uint16_t[4]', name: 'arr16', value: '[100,200,300,400]', state: '' },
            { type: 'uint32_t[4]', name: 'arr32', value: '[1000,2000,3000,4000]', state: '' },
            { type: 'uint8_t *', name: 'p8', value: '0x1000', state: 'changed' },
            { type: 'uint16_t *', name: 'p16', value: '0x1010', state: 'changed' },
            { type: 'uint32_t *', name: 'p32', value: '0x1020', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '指针初始化',
            content: 'p8=arr8, p16=arr16, p32=arr32',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 5: uint8_t 指针运算
    {
      line: 11,
      description: 'printf uint8_t: *p8, *(p8+1)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t *', name: 'p8', value: '0x1000→1', state: 'reading' },
            { type: 'uint16_t *', name: 'p16', value: '0x1010', state: '' },
            { type: 'uint32_t *', name: 'p32', value: '0x1020', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: 'uint8_t *p8',
            arrows: [
              { label: 'p8', value: '0x1000', highlight: true },
              { label: 'p8+1', value: '0x1001', highlight: true },
            ],
            note: 'uint8_t* +1 移动 1 字节',
          },
        },
        {
          type: 'stdout',
          data: {
            content: 'uint8_t: 1, 2',
          },
        },
      ],
    },
    // Step 6: uint16_t 指针运算
    {
      line: 12,
      description: 'printf uint16_t: *p16, *(p16+1)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t *', name: 'p8', value: '0x1000', state: '' },
            { type: 'uint16_t *', name: 'p16', value: '0x1010→100', state: 'reading' },
            { type: 'uint32_t *', name: 'p32', value: '0x1020', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: 'uint16_t *p16',
            arrows: [
              { label: 'p16', value: '0x1010', highlight: true },
              { label: 'p16+1', value: '0x1012', highlight: true },
            ],
            note: 'uint16_t* +1 移动 2 字节',
          },
        },
        {
          type: 'stdout',
          data: {
            content: 'uint16_t: 100, 200',
          },
        },
      ],
    },
    // Step 7: uint32_t 指针运算
    {
      line: 13,
      description: 'printf uint32_t: *p32, *(p32+1)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t *', name: 'p8', value: '0x1000', state: '' },
            { type: 'uint16_t *', name: 'p16', value: '0x1010', state: '' },
            { type: 'uint32_t *', name: 'p32', value: '0x1020→1000', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: 'uint32_t *p32',
            arrows: [
              { label: 'p32', value: '0x1020', highlight: true },
              { label: 'p32+1', value: '0x1024', highlight: true },
            ],
            note: 'uint32_t* +1 移动 4 字节',
          },
        },
        {
          type: 'stdout',
          data: {
            content: 'uint32_t: 1000, 2000',
          },
        },
      ],
    },
    // Step 8: 总结
    {
      line: 16,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '指针运算总结',
            points: [
              '指针 + 1 移动的字节数 = 指针类型的大小',
              'uint8_t* + 1 → 地址 + 1',
              'uint16_t* + 1 → 地址 + 2',
              'uint32_t* + 1 → 地址 + 4',
              '这是数组下标访问 arr[i] 的底层原理',
            ],
          },
        },
      ],
    },
  ],
};

export default pointerTypesData;
