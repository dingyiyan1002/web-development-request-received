// int8-temperature-overflow.ts - int8_t 温度值溢出可视化
import { VisualizationData } from '../types';

export const int8OverflowData: VisualizationData = {
  id: 'int8-overflow',
  title: 'int8_t 温度溢出',
  filename: 'temp_overflow.c',
  badge: '⚠️ 有符号溢出',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define TEMP_OFFSET  10',
    '',
    'int main(void)',
    '{',
    '    int8_t temperature = 125;',
    '    int8_t calibrated = temperature + TEMP_OFFSET;',
    '',
    '    printf("Raw temp: %d\\n", temperature);',
    '    printf("Calibrated: %d\\n", calibrated);',
    '',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行',
      frames: [
        { name: 'main', vars: [] },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: 'int8_t 范围',
            content: '-128 ~ 127 (8位有符号整数)',
            color: 'red',
          },
        },
      ],
    },
    // Step 1: 声明 temperature = 125
    {
      line: 7,
      description: 'temperature = 125',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: 'changed', showBinary: true, signed: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: 125,
            bits: 8,
            label: 'temperature = 125',
            signed: true,
          },
        },
      ],
    },
    // Step 2: 计算 calibrated
    {
      line: 8,
      description: 'calibrated = 125 + 10',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: 'reading', showBinary: true, signed: true },
            { type: 'int8_t', name: 'calibrated', value: 135, state: 'changed', showBinary: true, signed: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            from: 135,
            to: -121,
            operation: '135 超出 int8_t 范围!',
            warning: true,
            signed: true,
          },
        },
      ],
    },
    // Step 3: 溢出结果
    {
      line: 8,
      description: '⚠️ 溢出! 135 → -121',
      descriptionWarn: true,
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: '', showBinary: true, signed: true },
            { type: 'int8_t', name: 'calibrated', value: -121, state: 'changed', showBinary: true, signed: true, warn: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'binary-display',
          data: {
            value: -121,
            bits: 8,
            label: 'calibrated = -121',
            warning: true,
            signed: true,
          },
        },
      ],
    },
    // Step 4: 打印结果
    {
      line: 10,
      description: '输出 Raw temp: 125',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: 'reading', showBinary: true, signed: true },
            { type: 'int8_t', name: 'calibrated', value: -121, state: 'reading', showBinary: true, signed: true, warn: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Raw temp: 125',
          },
        },
      ],
    },
    // Step 5: 打印校准后温度
    {
      line: 11,
      description: '输出 Calibrated: -121',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: '', showBinary: true, signed: true },
            { type: 'int8_t', name: 'calibrated', value: -121, state: 'reading', showBinary: true, signed: true, warn: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Calibrated: -121',
          },
        },
      ],
    },
    // Step 6: 总结
    {
      line: 13,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int8_t', name: 'temperature', value: 125, state: '', showBinary: true, signed: true },
            { type: 'int8_t', name: 'calibrated', value: -121, state: '', showBinary: true, signed: true, warn: true },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '有符号溢出陷阱',
            points: [
              'int8_t 范围是 -128 ~ 127',
              '125 + 10 = 135 超出范围',
              '有符号溢出是未定义行为!',
              '结果变成 -121 (通常回绕)',
            ],
            warning: true,
          },
        },
      ],
    },
  ],
};

export default int8OverflowData;
