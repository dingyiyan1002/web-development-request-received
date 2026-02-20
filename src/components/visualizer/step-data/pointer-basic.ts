// pointer-basic.ts - 指针基础可视化步骤数据
import { VisualizationData } from '../types';

export const pointerBasicData: VisualizationData = {
  id: 'pointer-basic',
  title: '指针基础 - 声明与初始化',
  filename: 'pointer_basic.c',
  badge: '🎯 指针入门',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    uint8_t value = 100;',
    '    uint8_t *ptr = &value;',
    '    ',
    '    printf("value = %u\\n", value);',
    '    printf("*ptr = %u\\n", *ptr);',
    '    printf("&value = %p\\n", (void*)&value);',
    '    printf("ptr = %p\\n", (void*)ptr);',
    '    ',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行',
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
            title: '指针核心概念',
            content: '指针也是变量，存储的是内存地址',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 声明 value
    {
      line: 5,
      description: '声明 value = 100',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 内存布局',
            expression: 'value = 100',
            variables: [
              { address: '0x1000', name: 'value', value: '100', size: 1, highlight: true },
            ],
            note: 'value 是一个变量，存储值 100',
          },
        },
      ],
    },
    // Step 2: 声明指针 ptr
    {
      line: 6,
      description: '声明指针 ptr = &value',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: '' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 内存布局',
            expression: 'ptr = &value',
            variables: [
              { address: '0x1000', name: 'value', value: '100', size: 1 },
              { address: '0x1001', name: 'ptr', value: '0x1000', size: 8, highlight: true },
            ],
            note: 'ptr 存储 value 的地址 (0x1000)',
          },
        },
        {
          type: 'operation',
          data: {
            expression: '&value',
            arrows: [
              { label: '&value', value: '0x1000', highlight: true },
            ],
            note: '& 是取地址运算符',
          },
        },
      ],
    },
    // Step 3: 打印 value
    {
      line: 8,
      description: 'printf("value = %u\\n", value)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: 'reading' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'value = 100',
          },
        },
      ],
    },
    // Step 4: 打印 *ptr
    {
      line: 9,
      description: 'printf("*ptr = %u\\n", *ptr)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: '' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: '*ptr',
            arrows: [
              { label: 'ptr', value: '0x1000', highlight: true },
              { label: '*ptr', value: '100', highlight: true },
            ],
            note: '* 是解引用，通过地址获取值',
          },
        },
        {
          type: 'stdout',
          data: {
            content: '*ptr = 100',
          },
        },
      ],
    },
    // Step 5: 打印 &value
    {
      line: 10,
      description: 'printf("&value = %p\\n", &value)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: 'reading' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: '&value = 0x1000',
          },
        },
      ],
    },
    // Step 6: 打印 ptr
    {
      line: 11,
      description: 'printf("ptr = %p\\n", ptr)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: '' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'ptr = 0x1000',
          },
        },
        {
          type: 'rule',
          data: {
            title: '重要发现',
            content: '&value 和 ptr 的值相同！都指向 value 的地址',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 7: 总结
    {
      line: 14,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'value', value: 100, state: '' },
            { type: 'uint8_t *', name: 'ptr', value: '0x1000', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '指针基础总结',
            points: [
              'uint8_t *ptr - 声明一个指向 uint8_t 的指针',
              '&value - 获取 value 的内存地址',
              'ptr = &value - 让 ptr 指向 value',
              '*ptr - 解引用，通过地址访问值',
              'value 和 *ptr 等价，都表示值 100',
            ],
          },
        },
      ],
    },
  ],
};

export default pointerBasicData;
