// pthread-create.ts - 创建线程可视化步骤数据
import { VisualizationData } from '../types';

export const pthreadCreateData: VisualizationData = {
  id: 'pthread-create',
  title: '创建线程 - pthread_create',
  filename: 'pthread_create.c',
  badge: '🧵 多线程',
  code: [
    '#include <stdio.h>',
    '#include <stdint.h>',
    '#include <pthread.h>',
    '',
    'void *thread_func(void *arg)',
    '{',
    '    uint8_t *value = (uint8_t*)arg;',
    '    printf("Thread received: %u\\n", *value);',
    '    return NULL;',
    '}',
    '',
    'int main(void)',
    '{',
    '    pthread_t thread;',
    '    uint8_t data = 42;',
    '',
    '    pthread_create(&thread, NULL, thread_func, &data);',
    '    pthread_join(thread, NULL);',
    '',
    '    printf("Thread completed\\n");',
    '    return 0;',
    '}',
  ],
  steps: [
    // Step 0: 程序开始
    {
      line: 0,
      description: '多线程程序开始执行',
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
            title: '多线程基础',
            content: 'pthread_create 创建新线程，pthread_join 等待线程结束',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 1: 声明 thread 和 data
    {
      line: 14,
      description: 'pthread_t thread; uint8_t data = 42;',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '?', state: 'changed' },
            { type: 'uint8_t', name: 'data', value: 42, state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 主线程栈帧',
            expression: 'main()',
            variables: [
              { address: '0xFF00', name: 'thread', value: '未初始化', size: 4 },
              { address: '0xFF04', name: 'data', value: '42', size: 1, highlight: true },
            ],
          },
        },
      ],
    },
    // Step 2: pthread_create 调用前
    {
      line: 17,
      description: '准备调用 pthread_create',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '?', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: 'pthread_create 参数',
            content: 'pthread_create(&thread, NULL, thread_func, &data)\n• 1. &thread: 存储新线程ID\n• 2. NULL: 默认属性\n• 3. thread_func: 新线程执行的函数\n• 4. &data: 传递给线程的参数',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 3: pthread_create 创建线程
    {
      line: 17,
      description: '创建新线程，执行 thread_func',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: 'changed' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '🧵 线程结构',
            expression: '新线程已创建',
            variables: [
              { address: '0xFF00', name: 'main:thread', value: '0xABE0', size: 4 },
              { address: '0xFF04', name: 'main:data', value: '42', size: 1 },
              { address: '0xABE0', name: 'thread_func', value: '运行中', size: 0, highlight: true },
            ],
            note: '新线程与主线程同时运行',
          },
        },
        {
          type: 'operation',
          data: {
            expression: 'pthread_create()',
            arrows: [
              { label: '主线程', value: '继续执行', highlight: true },
              { label: '新线程', value: '开始执行', highlight: true },
            ],
            note: '线程并发执行',
          },
        },
      ],
    },
    // Step 4: 新线程开始执行
    {
      line: 9,
      description: '新线程: 接收参数 arg',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
        {
          name: 'thread_func',
          vars: [
            { type: 'void *', name: 'arg', value: '0xFF04', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: 'thread_func(void *arg)',
            arrows: [
              { label: 'arg', value: '0xFF04 (data的地址)', highlight: true },
            ],
            note: 'arg 指向 main 函数的 data 变量',
          },
        },
      ],
    },
    // Step 5: 新线程获取参数值
    {
      line: 10,
      description: '新线程: uint8_t *value = (uint8_t*)arg',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
        {
          name: 'thread_func',
          vars: [
            { type: 'void *', name: 'arg', value: '0xFF04', state: '' },
            { type: 'uint8_t *', name: 'value', value: '42', state: 'changed' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'memory-layout',
          data: {
            title: '📍 内存共享',
            expression: '线程间共享主线程栈上的变量',
            variables: [
              { address: '0xFF04', name: 'main:data', value: '42', size: 1, highlight: true },
              { address: '0xABE0', name: 'thread:value', value: '42', size: 1 },
            ],
            note: '新线程通过地址访问主线程的 data',
          },
        },
      ],
    },
    // Step 6: 新线程打印
    {
      line: 11,
      description: '新线程: printf("Thread received: %u\\n", *value)',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: 'reading' },
          ],
        },
        {
          name: 'thread_func',
          vars: [
            { type: 'uint8_t *', name: 'value', value: '42', state: 'reading' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Thread received: 42',
          },
        },
      ],
    },
    // Step 7: 新线程返回
    {
      line: 12,
      description: '新线程: return NULL; 线程结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
        {
          name: 'thread_func',
          vars: [
            { type: 'uint8_t *', name: 'value', value: '42', state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'rule',
          data: {
            title: '线程结束',
            content: 'thread_func 执行完毕，返回 NULL',
            color: 'yellow',
          },
        },
      ],
    },
    // Step 8: pthread_join 等待
    {
      line: 18,
      description: '主线程: pthread_join 等待子线程结束',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: 'waiting' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'operation',
          data: {
            expression: 'pthread_join(thread, NULL)',
            arrows: [
              { label: '主线程', value: '等待中...', highlight: true },
              { label: '子线程', value: '已结束', highlight: true },
            ],
            note: '主线程阻塞，直到子线程结束',
          },
        },
      ],
    },
    // Step 9: 打印完成
    {
      line: 20,
      description: 'printf("Thread completed\\n");',
      frames: [
        {
          name: 'main',
          vars: [
            { type: 'pthread_t', name: 'thread', value: '0xABE0', state: '' },
            { type: 'uint8_t', name: 'data', value: 42, state: '' },
          ],
        },
      ],
      vizBlocks: [
        {
          type: 'stdout',
          data: {
            content: 'Thread completed',
          },
        },
      ],
    },
    // Step 10: 总结
    {
      line: 22,
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
            title: '多线程总结',
            points: [
              'pthread_create: 创建新线程并发执行',
              'pthread_join: 主线程等待子线程结束',
              '线程共享主进程的地址空间',
              '线程栈是独立的',
              '不调用 pthread_join 会导致资源泄漏',
            ],
          },
        },
      ],
    },
  ],
};

export default pthreadCreateData;
