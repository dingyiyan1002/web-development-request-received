// while-timeout-wait.ts - while 超时等待可视化
import { VisualizationData } from '../types';

export const whileTimeoutData: VisualizationData = {
  id: 'while-timeout-wait',
  title: 'while 超时等待',
  filename: 'while_timeout.c',
  badge: '⏱️ 超时检测',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define MAX_RETRY  5',
    '',
    'int main(void)',
    '{',
    '    uint8_t device_ready = 0;',
    '    uint8_t retry_count = 0;',
    '',
    '    while ((device_ready == 0) && (retry_count < MAX_RETRY)) {',
    '        printf("Waiting... retry %u\\n", retry_count + 1);',
    '        retry_count++;',
    '        if (retry_count == 3) {',
    '            device_ready = 1;',
    '        }',
    '    }',
    '',
    '    if (device_ready) {',
    '        printf("Device ready after %u retries\\n", retry_count);',
    '    } else {',
    '        printf("Timeout!\\n");',
    '    }',
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
            title: '超时等待',
            content: '带重试次数的轮询',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化变量
    {
      line: 8,
      description: 'device_ready = 0, retry_count = 0',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: 'changed' },
            { type: 'uint8_t', name: 'retry_count', value: 0, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 第1次循环
    {
      line: 11,
      description: '第1次: 0<5 && 0<5, 进入循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 1, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 1' } },
      ],
    },
    // Step 3: 检查 if
    {
      line: 14,
      description: 'retry_count == 3? (1 == 3 = 假)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 1, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 第2次循环
    {
      line: 11,
      description: '第2次: 0<5 && 1<5, 进入循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 2, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 2' } },
      ],
    },
    // Step 5: 检查 if
    {
      line: 14,
      description: 'retry_count == 3? (2 == 3 = 假)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 2, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 6: 第3次循环
    {
      line: 11,
      description: '第3次: 0<5 && 2<5, 进入循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 0, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Waiting... retry 3' } },
      ],
    },
    // Step 7: 设置 device_ready
    {
      line: 15,
      description: 'device_ready = 1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 1, state: 'changed' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 8: 第4次循环条件
    {
      line: 11,
      description: '第4次: 1<5 不成立, 退出循环',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 1, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 9: 判断成功
    {
      line: 18,
      description: 'device_ready = 1, 条件为真',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 1, state: 'reading' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 10: 打印成功消息
    {
      line: 19,
      description: '输出: Device ready after 3 retries',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 1, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: '' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'Device ready after 3 retries' } },
      ],
    },
    // Step 11: 总结
    {
      line: 23,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'device_ready', value: 1, state: '' },
            { type: 'uint8_t', name: 'retry_count', value: 3, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '超时等待总结',
            points: [
              '重试 3 次后设备就绪',
              '第 3 次设置 device_ready = 1',
              '第 4 次循环条件不满足退出',
              '避免了 MAX_RETRY 次轮询',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default whileTimeoutData;
