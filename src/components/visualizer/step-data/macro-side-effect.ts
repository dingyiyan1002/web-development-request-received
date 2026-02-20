// macro-side-effect.ts - 宏的副作用可视化
import { VisualizationData } from '../types';

export const macroSideEffectData: VisualizationData = {
  id: 'macro-side-effect',
  title: '宏的副作用',
  filename: 'macro_trap.c',
  badge: '⚠️ 宏陷阱',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '',
    '#define SQUARE(x)  ((x) * (x))',
    '',
    'int main(void)',
    '{',
    '    uint8_t a = 5;',
    '    printf("SQUARE(%u) = %u\\n", a, SQUARE(a));',
    '',
    '    uint8_t b = 3;',
    '    printf("SQUARE(%u++) = %u\\n", b, SQUARE(b++));',
    '    printf("b after = %u\\n", b);',
    '',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '程序开始执行 - 理解宏的工作原理',
      frames: [{ name: 'main', vars: [] }],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '宏定义',
            content: '#define SQUARE(x)  ((x) * (x))\n\n宏是预处理阶段的文本替换，不是函数调用！',
            color: 'blue',
          },
        },
      ],
    },
    // Step 1: 初始化 a = 5
    {
      line: 7,
      description: '声明变量 a = 5',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'a', value: 5, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 2: 宏展开 SQUARE(a) - 正常情况
    {
      line: 8,
      description: '第一步：宏展开 - 将 SQUARE(a) 替换为 ((a) * (a))',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'a', value: 5, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'code-expand',
          data: {
            title: '宏展开过程',
            original: 'SQUARE(a)',
            expanded: '((a) * (a))',
            final: '((5) * (5))',
            note: '参数 a 只被使用一次，没有问题',
          },
        },
      ],
    },
    // Step 3: 计算结果
    {
      line: 8,
      description: '第二步：计算 ((5) * (5)) = 25',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'a', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'SQUARE(5) = 25 ✓' } },
      ],
    },
    // Step 4: 初始化 b = 3
    {
      line: 10,
      description: '声明变量 b = 3',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'a', value: 5, state: '' },
            { type: 'uint8_t', name: 'b', value: 3, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [],
    },
    // Step 5: 宏定义拆解 - 关键！
    {
      line: 11,
      description: '第一步：宏定义拆解（关键！）',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 3, state: 'warning' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '🔧 宏定义拆解过程',
            content: '#define SQUARE(x)  ((x) * (x))\n\n将 x 替换为 b++：',
            color: 'yellow',
          },
        },
        {
          type: 'code-expand',
          data: {
            title: '宏展开三步走',
            step1: 'SQUARE(b++)',
            step2: '((b++) * (b++))  ← x 被替换为 b++',
            step3: '⚠️ b++ 出现了两次！',
            warning: true,
            note: '每次出现 b++ 都会执行一次自增！',
          },
        },
      ],
    },
    // Step 6: 关键解释：为什么有两次 b++？
    {
      line: 11,
      description: '⚠️ 关键问题：为什么 b++ 要执行两次？',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 3, state: 'warning' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '🔍 为什么有两次 b++？',
            content: '宏展开后：((b++) * (b++))\n\n左边有一个 b++\n右边有一个 b++\n\n每个 b++ 都会完整执行一次！',
            color: 'red',
          },
        },
        {
          type: 'summary',
          data: {
            title: '对比：函数 vs 宏',
            points: [
              '如果是函数：b++ 只传一次参数',
              '但宏是文本替换：b++ 被复制到两个地方',
              '所以 b++ 被执行了两次！',
              '这就是宏的危险之处！',
            ],
            warning: true,
          },
        },
      ],
    },
    // Step 7: 第一次 b++ 执行 - 箭头流程
    {
      line: 11,
      description: '第1个 b++ 执行：先取值，后自增',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 3, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: '((b++) * (b++))',
            arrows: [
              { label: '第1个 b++', value: '取 3', highlight: true },
              { label: '第2个 b++', value: '?', highlight: false },
            ],
            note: '第1个 b++ 先执行，取当前值 3',
          },
        },
      ],
    },
    // Step 8: b 自增为 4 - 箭头流程
    {
      line: 11,
      description: '第1个 b++ 完成：b 从 3 变成 4',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 4, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            title: '第1个 b++ 完成',
            from: 'b = 3',
            to: 'b = 4',
            operation: '取值后自增',
          },
        },
        {
          type: 'operation',
          data: {
            expression: '((b++) * (b++))',
            arrows: [
              { label: '第1个 b++', value: '3 ✓', highlight: false },
              { label: '第2个 b++', value: '?', highlight: true },
            ],
            note: '第1个位置已确定是 3，等待第2个位置',
          },
        },
      ],
    },
    // Step 9: 第二次 b++ 执行 - 箭头流程 + 内存可视化
    {
      line: 11,
      description: '第2个 b++ 执行：b 已经是 4 了！',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 4, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '💾 内存状态',
            variables: [
              { name: 'b', address: '0x1000', value: 4, size: 1, highlight: true },
            ],
            note: '第1个 b++ 已经把内存中的 b 改成 4 了！',
          },
        },
        {
          type: 'operation',
          data: {
            expression: '((b++) * (b++))',
            arrows: [
              { label: '第1个 b++', value: '3 ✓', highlight: false },
              { label: '第2个 b++', value: '取 4', highlight: true },
            ],
            note: '⚠️ 关键！第2个 b++ 从内存取到的是 4（不是3！）',
          },
        },
      ],
    },
    // Step 10: b 自增为 5 - 箭头流程
    {
      line: 11,
      description: '第2个 b++ 完成：b 从 4 变成 5',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 5, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'conversion',
          data: {
            title: '第2个 b++ 完成',
            from: 'b = 4',
            to: 'b = 5',
            operation: '取值后自增',
          },
        },
        {
          type: 'operation',
          data: {
            expression: '((b++) * (b++))',
            arrows: [
              { label: '第1个 b++', value: '3 ✓', highlight: false },
              { label: '第2个 b++', value: '4 ✓', highlight: false },
            ],
            note: '两个位置都确定了：3 和 4',
          },
        },
      ],
    },
    // Step 11: 关键解释
    {
      line: 11,
      description: '完整回顾：为什么是 12？',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '📊 完整执行过程回顾',
            points: [
              '1. 宏展开：SQUARE(b++) → ((b++) * (b++))',
              '2. 第1个 b++（左边）：取 3，然后 b = 4',
              '3. 第2个 b++（右边）：取 4，然后 b = 5',
              '4. 乘法：3 * 4 = 12',
              '5. 最终：b = 5（被改了两次）',
            ],
            warning: true,
          },
        },
      ],
    },
    // Step 12: 输出结果
    {
      line: 11,
      description: '最终输出：SQUARE(3++) = 12',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'SQUARE(3++) = 12' } },
      ],
    },
    // Step 13: 打印 b 的最终值
    {
      line: 12,
      description: 'b 的最终值是 5（被递增了两次！）',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'b', value: 5, state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        { type: 'stdout', data: { content: 'b after = 5' } },
        {
          type: 'warning',
          data: {
            title: '⚠️ 严重问题',
            message: '同一个表达式中 b 被修改了两次，这是 C 语言的未定义行为！',
          },
        },
      ],
    },
    // Step 14: 总结
    {
      line: 14,
      description: '程序结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'uint8_t', name: 'a', value: 5, state: '' },
            { type: 'uint8_t', name: 'b', value: 5, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'summary',
          data: {
            title: '宏陷阱总结',
            points: [
              '1. 宏是文本替换，不是函数调用',
              '2. SQUARE(b++) 展开为 ((b++) * (b++))',
              '3. b++ 被执行了 2 次，b 从 3 变成 5',
              '4. 计算结果：3 * 4 = 12（不是 3 * 3 = 9）',
              '5. 更严重：这是未定义行为！',
              '6. 避免对宏参数使用 ++ 或 --',
            ],
            warning: true,
          },
        },
      ],
    },
  ],
};

export default macroSideEffectData;
