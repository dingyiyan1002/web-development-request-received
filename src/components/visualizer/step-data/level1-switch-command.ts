// level1-switch-command.ts - switch-case命令分发可视化
import { VisualizationData } from '../types';

export const level1SwitchCommandData: VisualizationData = {
  id: 'level1-switch-command',
  title: 'switch-case命令分发',
  filename: 'switch.c',
  badge: '🔀 命令分发',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define CMD_READ   0x01',
    '#define CMD_WRITE  0x02',
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
    '        default:',
    '            response = 0xFF;',
    '            printf("UNKNOWN\\n");',
    '    }',
    '    printf("Response: 0x%02X\\n", response);',
    '    return 0;',
    '}',
  ],
  steps: [
    {
      line: 0,
      description: '程序开始',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: 'switch规则',
            content: '每个case需break，default必填',
            color: 'blue',
          },
        },
      ],
    },
    {
      line: 9,
      description: 'command = CMD_WRITE = 0x02',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: '0x02', state: 'changed' },
            { type: 'uint8_t', name: 'response', value: '0', state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 11,
      description: '进入switch: command=0x02',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: '0x02', state: 'reading' },
            { type: 'uint8_t', name: 'response', value: '0', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'compare',
          data: {
            left: 'command (0x02)',
            right: 'CMD_WRITE (0x02)',
            result: true,
          },
        },
      ],
    },
    {
      line: 17,
      description: '匹配CMD_WRITE分支',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: '0x02', state: '' },
            { type: 'uint8_t', name: 'response', value: '0x81', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: { content: 'WRITE' },
        },
      ],
    },
    {
      line: 20,
      description: 'break跳出switch',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: '0x02', state: '' },
            { type: 'uint8_t', name: 'response', value: '0x81', state: '' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 25,
      description: '输出Response',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'command', value: '0x02', state: '' },
            { type: 'uint8_t', name: 'response', value: '0x81', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: { content: 'Response: 0x81' },
        },
      ],
    },
    {
      line: 27,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '知识点',
            points: [
              'switch匹配常量表达式',
              'case必须加break',
              'default处理未知情况',
            ],
          },
        },
      ],
    },
  ],
};

export default level1SwitchCommandData;
