// level1-sensor-data.ts - 打印传感器数据可视化数据
import { VisualizationData } from '../types';

export const level1SensorDataData: VisualizationData = {
  id: 'level1-sensor-data',
  title: '打印传感器数据',
  filename: 'sensor.c',
  badge: '📋 格式化输出',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    int16_t temperature = -15;',
    '    uint16_t humidity = 65;',
    '    printf("Temp: %dC, Humidity: %u%%\\n", temperature, humidity);',
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
            title: '格式符说明',
            content: '%d=有符号, %u=无符号, %%=百分号',
            color: 'blue',
          },
        },
      ],
    },
    {
      line: 4,
      description: 'temperature = -15',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: '-15', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 5,
      description: 'humidity = 65',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: '-15', state: '' },
            { type: 'uint16_t', name: 'humidity', value: '65', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    {
      line: 6,
      description: '打印传感器数据',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'int16_t', name: 'temperature', value: '-15', state: 'reading' },
            { type: 'uint16_t', name: 'humidity', value: '65', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Temp: -15C, Humidity: 65%',
          },
        },
      ],
    },
    {
      line: 7,
      description: '程序结束',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '知识点',
            points: ['%d = 有符号十进制', '%u = 无符号十进制', '%% = 输出百分号'],
          },
        },
      ],
    },
  ],
};

export default level1SensorDataData;
