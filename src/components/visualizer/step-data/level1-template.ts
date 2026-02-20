// level1-template.ts - Level 1 可视化数据模板
//
// 使用步骤：
// 1. 复制此模板创建新文件
// 2. 填写代码和步骤
// 3. 在 index.ts 中注册（导入 + mapping + export）
// 4. 在 App.tsx 的 demoList 中添加条目（重要！）
//
// 模板说明：
// 1. id: 唯一标识符，使用 "level1-题目英文名" 格式
// 2. title: 中文标题
// 3. filename: C代码文件名
// 4. badge: 显示标签（emoji + 简短描述）
// 5. code: 代码数组，每行一个字符串
// 6. steps: 步骤数组，每个步骤包含：
//    - line: 代码行号（高亮用）
//    - description: 步骤描述（不超过12字）
//    - frames: 函数帧，每帧包含变量
//    - vizBlocks: 可视化块（可选）

import { VisualizationData } from '../types';

export const level1TemplateData: VisualizationData = {
  id: 'level1-template',           // 唯一ID
  title: '题目标题',               // 中文标题
  filename: 'example.c',          // 代码文件名
  badge: '📋 知识点标签',          // 显示标签
  code: [                          // 代码内容（每行一个字符串）
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    'int main(void)',
    '{',
    '    // 在这里写代码',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始',      // 不超过12字
      frames: [
        { name: 'main', vars: [] },
      ],
      vizBlocks: [
        {
          type: 'rule',             // 规则说明（蓝色卡片）
          data: {
            title: '规则标题',     // 不超过8字
            content: '规则内容',
            color: 'blue',          // blue/yellow/green/red/purple
          },
        },
      ],
    },
    // Step 1: 变量声明
    {
      line: 5,
      description: '声明变量',       // 不超过12字
      frames: [
        {
          name: 'main',
          vars: [
            // type: 类型, name: 变量名, value: 值, state: 状态
            { type: 'uint8_t', name: 'count', value: '0', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],               // 可选可视化块
    },
    // Step 2: 执行操作
    {
      line: 6,
      description: 'count++',       // 不超过12字
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'count', value: '1', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 3: 打印输出
    {
      line: 7,
      description: '打印结果',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'count', value: '1', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',          // 控制台输出
          data: {
            content: 'count: 1',
          },
        },
      ],
    },
    // Step N: 总结
    {
      line: 9,
      description: '程序结束',
      frames: [
        { name: 'main', vars: [] },
      ],
      vizBlocks: [
        {
          type: 'summary',         // 总结（最后一步）
          data: {
            title: '知识点总结',
            points: [
              '知识点1',
              '知识点2',
              '知识点3',
            ],
          },
        },
      ],
    },
  ],
};

export default level1TemplateData;
