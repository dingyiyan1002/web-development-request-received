// switch-case-command.ts - switch-case 命令分发可视化
import { VisualizationData } from '../types';

export const switchCaseData: VisualizationData = {
  id: 'switch-case-command',
  title: 'switch-case 命令分发',
  filename: 'switch_command.c',
  badge: '🔀 命令分发',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define CMD_READ   0x01',
    '#define CMD_WRITE  0x02',
    '#define CMD_RESET  0x03',
    '',
    'int main(void)',
    '{',
    '    uint8_t command = CMD_WRITE;',
    '    uint8_t response = 0;',
    '',
    '    switch (command) {',
    '        case CMD_READ:',
    '            response = 0x80;',
    '            printf("READ\\n");',
    '            break;',
    '        case CMD_WRITE:',
    '            response = 0x81;',
    '            printf("WRITE\\n");',
    '            break;',
    '        case CMD_RESET:',
    '            response = 0xFF;',
    '            printf("RESET\\n");',
    '            break;',
    '    }',
    '',
    '    printf("Response: 0x%02X\\n", response);',
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
            title: 'switch 语句',
            content: '多路分支判断',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化 command
    {
      line: 10,
      description: 'command = CMD_WRITE (0x02)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: 'changed' },
            { type: 'uint8_t', name: 'response', value: 0, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 进入 switch
    {
      line: 12,
      description: 'switch (command)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: 'reading' },
            { type: 'uint8_t', name: 'response', value: 0, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 3: 匹配 CMD_READ
    {
      line: 13,
      description: 'case CMD_READ (0x01): 不匹配',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 0, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 4: 匹配 CMD_WRITE
    {
      line: 16,
      description: 'case CMD_WRITE (0x02): 匹配!',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: 'reading' },
            { type: 'uint8_t', name: 'response', value: 129, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 5: 执行 case 内的代码
    {
      line: 17,
      description: 'response = 0x81',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 129, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 6: 打印 WRITE
    {
      line: 18,
      description: '输出: WRITE',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 129, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'WRITE',
          },
        },
      ],
    },
    // Step 7: break 跳出
    {
      line: 19,
      description: 'break 跳出 switch',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 129, state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 8: 打印响应
    {
      line: 27,
      description: '输出: Response: 0x81',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 129, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Response: 0x81',
          },
        },
      ],
    },
    // Step 9: 总结
    {
      line: 28,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: 2, state: '' },
            { type: 'uint8_t', name: 'response', value: 129, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: 'switch 语句总结',
            points: [
              'command = 0x02 (CMD_WRITE)',
              '匹配 case CMD_WRITE',
              '设置 response = 0x81',
              'break 跳出 switch',
            ],
            warning: false,
          },
        },
      ],
    },
  ],
};

export default switchCaseData;
