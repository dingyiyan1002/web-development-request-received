// device-status-check.ts - 设备状态判断可视化
import { VisualizationData } from '../types';

export const deviceStatusData: VisualizationData = {
  id: 'device-status-check',
  title: '设备状态判断',
  filename: 'device_status.c',
  badge: '🔧 早返回模式',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define DEVICE_OK       0',
    '#define DEVICE_ERROR   -1',
    '#define DEVICE_BUSY    -2',
    '',
    'int32_t device_init(uint8_t mode)',
    '{',
    '    if (mode > 3) {',
    '        return DEVICE_ERROR;',
    '    }',
    '    if (mode == 0) {',
    '        return DEVICE_BUSY;',
    '    }',
    '    return DEVICE_OK;',
    '}',
    '',
    'int main(void)',
    '{',
    '    int32_t ret = device_init(5);',
    '    printf("Result: %d\\n", ret);',
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
            title: '早返回模式',
            content: '提前返回，减少嵌套层级',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 调用 device_init
    {
      line: 18,
      description: '调用 device_init(5)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int32_t', name: 'ret', value: '?', state: 'changed' },
          ],
        },
        {
          name: 'device_init',
          vars: [
            { type: 'uint8_t', name: 'mode', value: 5, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 检查 mode > 3
    {
      line: 9,
      description: '检查: mode > 3? (5 > 3 = 真)',
      frames: [
        {
          name: 'device_init',
          vars: [
            { type: 'uint8_t', name: 'mode', value: 5, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'compare',
          data: {
            left: 5,
            right: 3,
            operation: '>',
            result: true,
          },
        },
      ],
    },
    // Step 3: 返回 DEVICE_ERROR
    {
      line: 10,
      description: '返回 DEVICE_ERROR (-1)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int32_t', name: 'ret', value: -1, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 打印结果
    {
      line: 19,
      description: '输出: Result: -1',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int32_t', name: 'ret', value: -1, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Result: -1',
          },
        },
      ],
    },
    // Step 5: 总结
    {
      line: 20,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int32_t', name: 'ret', value: -1, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '早返回模式总结',
            points: [
              'mode = 5 > 3，条件为真',
              '直接返回 DEVICE_ERROR (-1)',
              '避免不必要的嵌套',
              '代码更清晰易读',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default deviceStatusData;
