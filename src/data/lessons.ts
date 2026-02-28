// 课程和题目数据 - 硬核C语言代码思维训练器

export interface CodeLineAnalysis {
  num: number;
  explanation: string;
  memoryChange?: string;
  highlight?: boolean;
}

export interface MemoryVisualization {
  cells: Array<{
    name: string;
    address: string;
    value: string;
    beforeValue?: string;
    type: 'variable' | 'pointer' | 'array' | 'struct';
    pointsTo?: string;
    changed?: boolean;
  }>;
  layout?: 'stack' | 'heap' | 'both';
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface Question {
  id: number;
  chapter: string;
  type: 'fill' | 'output' | 'debug' | 'order' | 'multi-fill' | 'choice' | 'multi-choice';
  title: string;
  description?: string;
  code?: string;
  blanks?: { hint: string; answer: string | string[]; caseSensitive?: boolean }[];
  correctOutput?: string;
  bugLine?: number;
  bugFix?: string;
  codeLines?: string[];
  correctOrder?: number[];
  explanation: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  vocabulary?: { word: string; meaning: string }[];
  visualization?: {
    type: 'memory' | 'structure' | 'flow' | 'pointer' | 'array' | 'linkedlist' | 'execution' | 'html';
    data?: any;
    file?: string;
  };
  lineAnalysis?: CodeLineAnalysis[];
  memoryViz?: MemoryVisualization;
  knowledgePoints?: string[];
  hint?: string;
  commonMistakes?: string[];
  relatedConcepts?: string[];
  // 选择题专用字段
  options?: { id: string; text: string }[];
  correctAnswer?: string | string[];
  multiCorrect?: boolean;
}

export type QuestionMode = 'real' | 'practice';

export interface Chapter {
  id: string;
  name: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  questionCount: number;
  mode?: QuestionMode;
}

export const chapters: Chapter[] = [
  {
    id: 'basics-test',
    name: '基础入门',
    icon: '📖',
    description: 'C语言基础知识选择题 - 零基础入门，查漏补缺',
    questionCount: 178,
    mode: 'practice',
    lessons: [
      {
        id: 'bt-data-types',
        title: '数据类型',
        content: `C语言基础数据类型测试

\`\`\`c
// 常用数据类型示例
int     i = 10;        // 有符号整型 (通常4字节)
char    c = 'A';       // 字符 (1字节)
float   f = 3.14f;     // 单精度浮点
double  d = 3.14159;    // 双精度浮点

// 嵌入式常用定宽类型
#include <stdint.h>
uint8_t  u8 = 255;      // 无符号8位 (0~255)
uint16_t u16 = 65535;   // 无符号16位 (0~65535)
uint32_t u32 = 4294967295; // 无符号32位
int32_t  s32 = -1;      // 有符号32位

// 有符号 vs 无符号
signed   int   s_i = -1;    // 有符号 (最高位为符号位)
unsigned int   u_i = 4294967295; // 无符号 (全部是数值位)
\`\`\`

**测试范围：**
- 基本数据类型 (int, char, float, double)
- 整型修饰符 (short, long, signed, unsigned)
- stdint类型 (uint8_t, uint16_t, uint32_t, int32_t)

**学习目标：**
- 掌握各类型取值范围
- 理解有符号与无符号区别
- 熟悉嵌入式常用类型`,
        keyPoints: ['数据类型取值范围', '有符号无符号', 'stdint类型']
      },
      {
        id: 'bt-operators',
        title: '运算符',
        content: `C语言运算符测试

\`\`\`c
// 算术运算符
int a = 10, b = 3;
int sum    = a + b;   // 13 加
int diff   = a - b;   // 7  减
int prod   = a * b;   // 30 乘
int quot   = a / b;   // 3  整除
int rem    = a % b;   // 1  取余

// 关系运算符 (结果为 1真 或 0假)
int eq  = (a == b);  // 0
int neq = (a != b);  // 1
int lt  = (a < b);   // 0
int gt  = (a > b);   // 1

// 逻辑运算符
int and = (a > 5 && b < 5);  // 1 && 1 = 1
int or  = (a > 5 || b > 5);  // 1 || 0 = 1
int not = !0;                 // 1  取反

// 位运算符 (嵌入式常用)
uint8_t x = 0x0F;    // 00001111
uint8_t and_res = x & 0x0F;  // 0x0F 与
uint8_t or_res  = x | 0x30;  // 0x3F 或
uint8_t xor_res = x ^ 0x0F;  // 0x00 异或
uint8_t not_res = ~x;         // 0xF0 取反
uint8_t lsh = x << 2;         // 0x3C 左移2位
uint8_t rsh = x >> 2;        // 0x03 右移2位

// 赋值运算符
a += 5;   // a = a + 5
b -= 2;   // b = b - 2
x &= 0x0F; // x = x & 0x0F

// 条件运算符 (三元运算符)
int max = (a > b) ? a : b;  // 取较大值
\`\`\`

**测试范围：**
- 算术运算符 (+, -, *, /, %)
- 关系运算符 (==, !=, <, >, <=, >=)
- 逻辑运算符 (&&, ||, !)
- 位运算符 (&, |, ^, ~, <<, >>)
- 赋值运算符 (=, +=, -=, *=, /=)
- 条件运算符 (? : )

**学习目标：**
- 掌握运算符优先级
- 理解短路求值特性
- 熟练使用位运算`,
        keyPoints: ['运算符优先级', '短路求值', '位运算']
      },
      {
        id: 'bt-control',
        title: '控制流',
        content: `C语言控制流测试

\`\`\`c
// if-else 条件判断
int score = 85;
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else {
    grade = 'C';
}

// switch-case 多分支
int day = 3;
switch (day) {
    case 1: printf("周一"); break;
    case 2: printf("周二"); break;
    case 3: printf("周三"); break;
    default: printf("其他"); break;
}

// for 循环
for (int i = 0; i < 10; i++) {
    sum += i;
}

// while 循环
int count = 0;
while (count < 5) {
    count++;
}

// do-while 循环
int n = 0;
do {
    printf("%d ", n);
    n++;
} while (n < 3);

// break/continue
for (int i = 0; i < 10; i++) {
    if (i == 3) continue;  // 跳过本次
    if (i == 7) break;      // 跳出循环
}
\`\`\`

**测试范围：**
- if-else 条件判断
- switch-case 多分支
- while/do-while 循环
- for 循环
- break/continue/return

**学习目标：**
- 理解条件执行流程
- 掌握循环控制技巧
- 避免死循环`,
        keyPoints: ['条件分支', '循环结构', '跳转控制']
      },
      {
        id: 'bt-functions',
        title: '函数',
        content: `C语言函数基础测试

\`\`\`c
// 函数定义
int add(int a, int b) {
    return a + b;
}

// 函数声明 (头文件或源文件顶部)
int multiply(int x, int y);

// 值传递 vs 指针传递
void by_value(int n) {
    n = 100;  // 只修改局部副本
}

void by_pointer(int *p) {
    *p = 100;  // 修改原变量
}

// 调用
int n = 10;
by_value(n);      // n 仍然是 10
by_pointer(&n);  // n 变成 100

// 递归函数
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 内联函数 (编译时展开)
static inline int max(int a, int b) {
    return (a > b) ? a : b;
}
\`\`\`

**测试范围：**
- 函数定义与声明
- 参数传递 (值传递/指针传递)
- 返回值处理
- 递归函数
- 内联函数

**学习目标：**
- 理解函数调用机制
- 掌握参数传递方式
- 学会设计函数接口`,
        keyPoints: ['函数调用', '参数传递', '返回值']
      },
      {
        id: 'bt-arrays',
        title: '数组',
        content: `C语言数组测试

\`\`\`c
// 一维数组定义
int arr[10];       // 未初始化，内容不确定
int nums[5] = {1, 2, 3, 4, 5};  // 完全初始化
int data[] = {10, 20, 30};        // 自动推断大小

// 数组访问 (下标从0开始)
int first = nums[0];  // 1
int last = nums[4];   // 5

// 数组遍历
for (int i = 0; i < 5; i++) {
    printf("%d ", nums[i]);
}

// 数组作为函数参数 (退化为指针)
void print_array(int arr[], int len) {
    for (int i = 0; i < len; i++) {
        printf("%d ", arr[i]);
    }
}

// 二维数组
int matrix[3][4] = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};
int val = matrix[1][2];  // 7

// 字符数组与字符串
char str1[] = "Hello";     // 自动加\\0
char str2[10] = {'H', 'e', 'l', 'l', 'o', '\\0'};
\`\`\`

**测试范围：**
- 一维数组定义与使用
- 数组初始化
- 数组作为函数参数
- 二维数组
- 字符数组与字符串

**学习目标：**
- 掌握数组下标运算
- 理解数组内存布局
- 熟练处理字符串`,
        keyPoints: ['数组下标', '内存布局', '字符串']
      },
      {
        id: 'bt-pointers',
        title: '指针基础',
        content: `C语言指针基础测试

\`\`\`c
// 指针定义与初始化
int n = 10;
int *p = &n;    // & 取地址
int *ptr = NULL;  // NULL表示空指针

// 指针运算符
int value = *p;   // * 解引用，取值
*p = 20;          // 通过指针修改原变量

// 指针与数组
int arr[] = {1, 2, 3, 4, 5};
int *p = arr;     // 数组名就是首元素地址
int first = *p;       // 1
int second = *(p + 1); // 2
int third = p[2];      // 3 (等价于*(p+2))

// 指针运算
p++;      // 指向下一个元素
p--;      // 指向上一个元素
ptrdiff_t diff = p2 - p1;  // 元素间距

// 指针与字符串
char *str = "Hello";  // 字符串常量
char arr[] = "World";

// 指针数组 vs 数组指针
int *arr[10];     // 指针数组 (10个int指针)
int (*p)[10];     // 数组指针 (指向int[10])

// 函数指针
int (*func_ptr)(int, int) = &add;
int result = func_ptr(3, 4);
\`\`\`

**测试范围：**
- 指针定义与初始化
- 指针运算符 (*, &)
- 指针与数组关系
- 指针运算
- NULL指针处理

**学习目标：**
- 理解指针本质
- 掌握指针运算规则
- 避免野指针`,
        keyPoints: ['指针本质', '指针运算', 'NULL处理']
      }
    ]
  },
  {
    id: 'level1',
    name: 'Level 1 入门真题',
    icon: '🎯',
    description: 'C语言基础：printf、变量、运算符、条件、循环、函数、数组、宏、字符串、作用域 - 工作第一周就会用到',
    questionCount: 80,
    mode: 'real',
    lessons: [
      {
        id: 'l1-printf',
        title: 'printf格式化输出',
        content: `调试打印是嵌入式开发最基本的技能。

**常用格式符：**
- %d/%i：有符号十进制
- %u：无符号十进制
- %x/%X：十六进制
- %p：指针地址
- %s：字符串

**嵌入式场景：** 打印寄存器值、调试信息、日志输出`,
        keyPoints: ['格式符', '十六进制输出', '调试打印']
      },
      {
        id: 'l1-types',
        title: '整型类型与溢出',
        content: `stdint类型是嵌入式开发必备。

**常用类型：**
- uint8_t：无符号8位（0~255）
- int8_t：有符号8位（-128~127）
- uint16_t：无符号16位

**嵌入式场景：** 传感器数据、寄存器值、计数器`,
        keyPoints: ['stdint类型', '溢出', '数据范围']
      },
      {
        id: 'l1-condition',
        title: '条件判断',
        content: `设备状态判断、错误处理。

**if-else规范：**
- 必须加花括号{}
- 先处理错误情况

**嵌入式场景：** 错误码判断、状态机`,
        keyPoints: ['if-else规范', 'switch-case', '错误处理']
      },
      {
        id: 'l1-loop',
        title: '循环',
        content: `数据处理、超时等待。

**嵌入式场景：** 数据采集、超时检测、缓冲区处理`,
        keyPoints: ['for循环', 'while循环', '超时处理']
      },
      {
        id: 'l1-function',
        title: '函数',
        content: `模块化设计基础。

**返回值规范：**
- 0：成功
- 负数：错误码

**嵌入式场景：** 驱动接口、设备操作`,
        keyPoints: ['函数设计', '返回值规范', '错误码']
      },
      {
        id: 'l1-bit',
        title: '位运算',
        content: `嵌入式最常用操作。

**位运算符：**
- &：按位与（清零位）
- |：按位或（设置位）
- ^：按位异或（翻转位）

**嵌入式场景：** 寄存器配置、标志位操作`,
        keyPoints: ['位运算', '掩码操作', '寄存器配置']
      },
      {
        id: 'l1-macro',
        title: '宏和预处理',
        content: `代码配置和优化。

**常用宏：**
- #define：常量定义
- BIT(n)：位掩码

**嵌入式场景：** 寄存器配置、调试开关`,
        keyPoints: ['#define', '条件编译', '位操作宏']
      }
    ]
  },
  {
    id: 'level2',
    name: 'Level 2 进阶真题',
    icon: '🎯',
    description: '指针基础、结构体、联合体、枚举进阶、函数指针、多文件编程 - 工作第一个月必备',
    questionCount: 100,
    mode: 'real',
    lessons: [
      {
        id: 'l2-pointer-basic',
        title: '指针基础',
        content: `指针是C语言的核心。

**指针操作：**
- &取地址
- *解引用
- 指针运算

**嵌入式场景：** 寄存器访问、内存映射`,
        keyPoints: ['指针声明', '解引用', '指针运算']
      },
      {
        id: 'l2-pointer-array',
        title: '指针与数组',
        content: `数组名是指针。

**等价关系：**
- a[i] 等价于 *(a+i)
- &a[i] 等价于 a+i

**嵌入式场景：** 缓冲区操作`,
        keyPoints: ['数组名', '指针算术', '下标访问']
      },
      {
        id: 'l2-struct',
        title: '结构体',
        content: `结构体组合不同类型数据。

**结构体操作：**
- 成员访问：. 和 ->
- 内存对齐
- 结构体数组

**嵌入式场景：** 协议帧、设备配置`,
        keyPoints: ['结构体定义', '成员访问', '内存对齐']
      },
      {
        id: 'l2-union',
        title: '联合体',
        content: `联合体共享内存空间。

**联合体特点：**
- 所有成员共享同一内存
- 大小等于最大成员
- 同一时刻只有一个成员有效

**嵌入式场景：** 数据解析、寄存器访问`,
        keyPoints: ['联合体定义', '内存共享', '数据解析']
      },
      {
        id: 'l2-func-pointer',
        title: '函数指针',
        content: `函数指针实现回调机制。

**函数指针用法：**
- 声明：返回类型 (*指针名)(参数)
- 回调函数
- 函数指针数组

**嵌入式场景：** 驱动框架、状态机`,
        keyPoints: ['函数指针声明', '回调函数', '函数指针数组']
      },
      {
        id: 'l2-multi-file',
        title: '多文件编程',
        content: `模块化开发基础。

**多文件组织：**
- .h头文件：声明
- .c源文件：实现
- extern声明

**嵌入式场景：** 驱动模块、库开发`,
        keyPoints: ['头文件', 'extern', '模块化']
      }
    ]
  },
  {
    id: 'level3',
    name: 'Level 3 核心真题',
    icon: '🎯',
    description: '内存管理、文件操作、位操作进阶、预处理进阶、复杂声明 - 工作三个月核心技能',
    questionCount: 150,
    mode: 'real',
    lessons: [
      {
        id: 'l3-memory',
        title: '动态内存管理',
        content: `堆内存分配与释放。

**内存函数：**
- malloc：分配
- free：释放
- calloc：清零分配
- realloc：重新分配

**嵌入式场景：** 动态数据结构`,
        keyPoints: ['malloc', 'free', '内存泄漏']
      },
      {
        id: 'l3-file',
        title: '文件操作',
        content: `文件读写操作。

**文件函数：**
- fopen/fclose：打开关闭
- fread/fwrite：读写
- fseek/ftell：定位

**嵌入式场景：** 配置文件、日志`,
        keyPoints: ['fopen', 'fread', 'fwrite']
      },
      {
        id: 'l3-bit-advanced',
        title: '位操作进阶',
        content: `复杂位操作技巧。

**位操作技巧：**
- 位域提取
- 位域设置
- 位反转

**嵌入式场景：** 寄存器配置、协议解析`,
        keyPoints: ['位域提取', '位掩码', '位操作技巧']
      },
      {
        id: 'l3-preprocessor',
        title: '预处理进阶',
        content: `高级预处理技术。

**预处理技巧：**
- 宏展开
- 条件编译
- #和##运算符

**嵌入式场景：** 配置管理、调试开关`,
        keyPoints: ['宏展开', '##运算符', '条件编译']
      },
      {
        id: 'l3-complex-decl',
        title: '复杂声明解析',
        content: `理解复杂C声明。

**声明规则：**
- 右左法则
- 优先级：() > [] > *
- typedef简化

**嵌入式场景：** 理解库函数声明`,
        keyPoints: ['右左法则', '声明优先级', 'typedef']
      }
    ]
  },
  {
    id: 'level4',
    name: 'Level 4 高级真题',
    icon: '🎯',
    description: '多线程编程、进程通信、网络编程、信号处理、高级指针 - 工作半年进阶技能',
    questionCount: 120,
    mode: 'real',
    lessons: [
      {
        id: 'l4-thread',
        title: '多线程编程',
        content: `线程创建与同步。

**线程函数：**
- pthread_create：创建
- pthread_join：等待
- mutex：互斥锁

**嵌入式场景：** 并发处理`,
        keyPoints: ['pthread', 'mutex', '线程同步']
      },
      {
        id: 'l4-process',
        title: '进程通信',
        content: `进程间通信机制。

**IPC机制：**
- 管道
- 共享内存
- 消息队列
- 信号量

**嵌入式场景：** 多进程协作`,
        keyPoints: ['管道', '共享内存', '信号量']
      },
      {
        id: 'l4-network',
        title: '网络编程',
        content: `Socket编程基础。

**Socket函数：**
- socket：创建
- bind：绑定
- listen/accept：监听
- send/recv：收发

**嵌入式场景：** 设备联网`,
        keyPoints: ['socket', 'TCP/UDP', '网络通信']
      },
      {
        id: 'l4-signal',
        title: '信号处理',
        content: `信号机制与处理。

**信号函数：**
- signal：注册处理
- sigaction：高级处理
- kill：发送信号

**嵌入式场景：** 异步事件处理`,
        keyPoints: ['signal', 'sigaction', '信号处理']
      },
      {
        id: 'l4-advanced-ptr',
        title: '高级指针应用',
        content: `复杂指针应用场景。

**高级指针：**
- 多级指针
- 指针数组vs数组指针
- 函数指针数组

**嵌入式场景：** 复杂数据结构`,
        keyPoints: ['多级指针', '数组指针', '函数指针数组']
      }
    ]
  },
  {
    id: 'level5',
    name: 'Level 5 专家真题',
    icon: '🎯',
    description: '内核编程、驱动开发、性能优化、安全编程、架构设计 - 资深工程师必备',
    questionCount: 50,
    mode: 'real',
    lessons: [
      {
        id: 'l5-kernel',
        title: '内核编程基础',
        content: `Linux内核模块开发。

**内核编程：**
- 模块加载卸载
- 内核空间与用户空间
- 内核API

**嵌入式场景：** 驱动开发`,
        keyPoints: ['内核模块', '内核空间', '内核API']
      },
      {
        id: 'l5-driver',
        title: '驱动开发',
        content: `字符设备驱动开发。

**驱动框架：**
- file_operations
- 设备注册
- 中断处理

**嵌入式场景：** 硬件驱动`,
        keyPoints: ['file_operations', '设备注册', '中断处理']
      },
      {
        id: 'l5-perf',
        title: '性能优化',
        content: `代码性能优化技术。

**优化技术：**
- 算法优化
- 内存访问优化
- 编译器优化

**嵌入式场景：** 实时性要求`,
        keyPoints: ['算法优化', '内存优化', '编译优化']
      },
      {
        id: 'l5-security',
        title: '安全编程',
        content: `安全编码实践。

**安全问题：**
- 缓冲区溢出
- 整数溢出
- 内存安全

**嵌入式场景：** 安全关键系统`,
        keyPoints: ['缓冲区溢出', '整数溢出', '安全编码']
      },
      {
        id: 'l5-arch',
        title: '架构设计',
        content: `软件架构设计原则。

**设计原则：**
- 模块化
- 分层设计
- 接口设计

**嵌入式场景：** 系统架构`,
        keyPoints: ['模块化', '分层设计', '接口设计']
      }
    ]
  },
  {
    id: 'interview',
    name: '面试专题',
    icon: '💼',
    description: '面试常考的手写代码、系统设计、Bug修复、性能优化、概念深度题',
    questionCount: 30,
    mode: 'practice',
    lessons: [
      {
        id: 'interview-1',
        title: '手写代码题',
        content: `面试中常要求手写基础算法实现：

**必会算法：**
- 字符串操作：反转、拷贝、比较、求长度
- 内存操作：memcpy、memmove、memset
- 链表操作：反转、合并、检测环
- 查找排序：二分查找、快速排序

**面试要点：**
1. 考虑边界条件（空指针、空字符串）
2. 注意内存重叠（memcpy vs memmove）
3. 返回值设计（支持链式调用）
4. 代码简洁优雅`,
        keyPoints: ['字符串操作', '内存拷贝', '链表反转', '二分查找', '边界条件']
      },
      {
        id: 'interview-2',
        title: '系统设计题',
        content: `设计嵌入式常用数据结构：

**内存池(Memory Pool)**
- 预先分配固定大小内存块
- 用链表管理空闲块
- 避免频繁malloc/free的开销和碎片

**环形缓冲区(Ring Buffer)**
- 生产者-消费者模型
- head/tail指针，模运算实现环形
- 适用于串口通信、音频处理

**状态机(State Machine)**
- 函数指针数组实现跳转表
- 比switch-case更高效
- 适用于协议解析`,
        keyPoints: ['内存池设计', '环形缓冲区', '状态机实现', '对象池']
      },
      {
        id: 'interview-3',
        title: ' Bug修复题',
        content: `常见C语言陷阱和修复方法：

**内存问题**
- 野指针：返回局部变量地址
- 内存泄漏：malloc后没有free
- 重复释放：double free
- 越界访问：数组索引超出范围

**并发问题**
- 竞争条件：非原子操作被中断
- 临界区：需要保护的数据访问

**数值问题**
- 整数溢出：无符号数回绕
- 符号扩展：有符号/无符号混用`,
        keyPoints: ['野指针', '内存泄漏', '竞争条件', '整数溢出', '缓冲区溢出']
      },
      {
        id: 'interview-4',
        title: '性能优化题',
        content: `嵌入式性能优化技巧：

**代码层面**
- 循环展开：减少跳转开销
- 内联函数：消除调用开销
- 分支预测：likely/unlikely提示

**内存层面**
- 缓存友好：按行优先访问数组
- 对齐访问：避免非对齐内存访问
- 预取指令：提前加载数据到缓存

**算法层面**
- 时间复杂度优化
- 空间换时间
- 查表法替代计算`,
        keyPoints: ['循环展开', '缓存优化', '分支预测', '内联函数', '内存对齐']
      },
      {
        id: 'interview-5',
        title: '概念深度题',
        content: `深入理解C语言和系统原理：

**volatile关键字**
- 防止编译器优化
- 确保每次从内存读取
- 用于硬件寄存器、多线程标志

**内存屏障**
- 防止指令重排序
- 确保操作顺序
- 多核同步必备

**系统调用**
- 用户态到内核态切换
- 参数传递和上下文切换
- 开销较大，应减少调用

**链接方式**
- 静态链接：独立运行，体积大
- 动态链接：共享库，依赖环境`,
        keyPoints: ['volatile原理', '内存屏障', '系统调用', '静态/动态链接', 'MMU', 'DMA']
      }
    ]
  },
  {
    id: 'basics',
    name: '基础语法入门',
    icon: '🌱',
    description: '从Hello World开始，掌握C语言基本结构',
    questionCount: 16,
    mode: 'practice',
    lessons: [
      {
        id: 'basics-1',
        title: 'C语言程序结构',
        content: `每个C程序都有一个固定的基本结构：

\`\`\`c
#include <stdio.h>  // 引入头文件

int main() {        // 程序入口
    printf("Hello World");  // 执行语句
    return 0;       // 返回值
}
\`\`\`

**#include** 用于引入头文件，<stdio.h> 包含了输入输出函数。
**main()** 是程序的入口点，程序从这里开始执行。
**return 0** 表示程序正常结束。`,
        keyPoints: ['#include引入头文件', 'main是入口函数', '语句以分号结尾', 'return 0表示正常结束']
      },
      {
        id: 'basics-2',
        title: 'printf输出函数',
        content: `printf用于向屏幕输出内容：

\`\`\`c
printf("文本内容");      // 输出文本
printf("数字：%d", 10);  // 输出整数
printf("换行\\n");       // \\n表示换行
\`\`\`

**常用转义字符：**
- \\n - 换行
- \\t - 制表符（Tab）
- \\\\ - 输出反斜杠本身`,
        keyPoints: ['printf输出到屏幕', '%d是整数占位符', '\\n是换行符']
      }
    ]
  },
  {
    id: 'variables',
    name: '变量与数据类型',
    icon: '📦',
    description: '学会声明变量，理解不同数据类型',
    questionCount: 17,
    mode: 'practice',
    lessons: [
      {
        id: 'var-1',
        title: '变量声明与初始化',
        content: `变量是用来存储数据的"容器"：

\`\`\`c
int age = 20;       // 整型变量
float price = 9.9;  // 浮点型
char grade = 'A';   // 字符型
\`\`\`

**声明语法：** \`类型 变量名 = 初始值;\`

**命名规则：**
- 只能包含字母、数字、下划线
- 必须以字母或下划线开头
- 不能使用关键字（如int、if等）`,
        keyPoints: ['int存整数', 'float存小数', 'char存单个字符', '变量名不能数字开头']
      },
      {
        id: 'var-2',
        title: '格式化输入输出',
        content: `使用格式说明符进行输入输出：

\`\`\`c
int num;
scanf("%d", &num);     // 输入整数，注意&
printf("%d", num);     // 输出整数

// 常用格式说明符
%d - 整数    %f - 浮点数
%c - 字符    %s - 字符串
\`\`\`

**重要：scanf读取变量时需要加 & 取地址符！**`,
        keyPoints: ['scanf需要&取地址', '%d对应int', '%f对应float', '%c对应char']
      }
    ]
  },
  {
    id: 'operators',
    name: '运算符与表达式',
    icon: '➕',
    description: '掌握各类运算符，理解表达式求值',
    questionCount: 12,
    mode: 'practice',
    lessons: [
      {
        id: 'op-1',
        title: '算术与比较运算符',
        content: `**算术运算符：**
\`\`\`c
+ - * /   // 加减乘除
%         // 取余数：10 % 3 = 1
\`\`\`

**比较运算符：** 返回1(真)或0(假)
\`\`\`c
==  // 等于（注意不是=）
!=  // 不等于
>  <  >=  <=  // 大小比较
\`\`\`

**特别注意：** \`=\` 是赋值，\`==\` 是比较！`,
        keyPoints: ['%取余数', '==是比较不是=', '整数除法截断小数']
      },
      {
        id: 'op-2',
        title: '自增自减与逻辑运算',
        content: `**自增自减：**
\`\`\`c
a++  // 先用后加：b = a++; (b得旧值)
++a  // 先加后用：b = ++a; (b得新值)
\`\`\`

**逻辑运算符：**
\`\`\`c
&&  // 与：两边都真才真
||  // 或：一边真就真
!   // 非：取反
\`\`\``,
        keyPoints: ['a++先用后加', '++a先加后用', '&&两真才真', '||一真就真']
      }
    ]
  },
  {
    id: 'control',
    name: '控制流语句',
    icon: '🔀',
    description: '条件判断、循环控制，程序的核心逻辑',
    questionCount: 17,
    mode: 'practice',
    lessons: [
      {
        id: 'ctrl-1',
        title: 'if-else条件判断',
        content: `根据条件选择执行不同代码：

\`\`\`c
if (score >= 60) {
    printf("及格");
} else if (score >= 40) {
    printf("补考");
} else {
    printf("重修");
}
\`\`\`

**注意：** 条件表达式放在小括号()内，语句块用大括号{}包围。`,
        keyPoints: ['条件放在()内', '语句块用{}包围', 'else if处理多条件']
      },
      {
        id: 'ctrl-2',
        title: 'for循环',
        content: `for循环的三个部分：

\`\`\`c
for (初始化; 条件; 更新) {
    // 循环体
}

// 例：输出0到4
for (int i = 0; i < 5; i++) {
    printf("%d ", i);
}
// 输出：0 1 2 3 4
\`\`\`

**执行顺序：** 初始化 → 判断条件 → 执行循环体 → 更新 → 判断条件 → ...`,
        keyPoints: ['for(初始化;条件;更新)', 'i<5会循环5次(0到4)', 'break跳出循环', 'continue跳过本次']
      },
      {
        id: 'ctrl-3',
        title: 'while循环',
        content: `while先判断后执行：

\`\`\`c
int i = 0;
while (i < 5) {
    printf("%d ", i);
    i++;
}
\`\`\`

do-while先执行后判断（至少执行一次）：

\`\`\`c
do {
    printf("至少执行一次");
} while (条件);  // 注意分号
\`\`\``,
        keyPoints: ['while先判断后执行', 'do-while至少执行一次', 'while可能一次不执行']
      }
    ]
  },
  {
    id: 'functions',
    name: '函数',
    icon: '⚙️',
    description: '代码复用的核心，理解函数调用机制',
    questionCount: 11,
    mode: 'practice',
    lessons: [
      {
        id: 'func-1',
        title: '函数定义与调用',
        content: `函数的基本结构：

\`\`\`c
返回类型 函数名(参数列表) {
    // 函数体
    return 返回值;
}

// 例：计算两数之和
int add(int a, int b) {
    return a + b;
}

// 调用
int result = add(3, 5);  // result = 8
\`\`\``,
        keyPoints: ['返回类型写在函数名前', 'void表示无返回值', '参数用逗号分隔']
      },
      {
        id: 'func-2',
        title: '值传递',
        content: `C语言函数参数是**值传递**——复制一份：

\`\`\`c
void change(int x) {
    x = 100;  // 只修改副本
}

int a = 5;
change(a);
// a仍然是5！
\`\`\`

想要修改原变量，需要传递**指针**（后面学习）。`,
        keyPoints: ['参数是值的副本', '修改形参不影响实参', '要修改原值需用指针']
      }
    ]
  },
  {
    id: 'arrays',
    name: '数组',
    icon: '📊',
    description: '批量存储同类型数据，理解内存布局',
    questionCount: 11,
    mode: 'practice',
    lessons: [
      {
        id: 'arr-1',
        title: '一维数组',
        content: `数组存储多个同类型元素：

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};

// 访问元素（下标从0开始！）
arr[0] = 10;  // 第一个元素
arr[4] = 50;  // 第五个（最后）元素
// arr[5] 越界！错误！
\`\`\`

**重要：** 数组下标从0开始，最大下标是 长度-1`,
        keyPoints: ['下标从0开始', 'int arr[5]下标0-4', '越界访问是严重错误']
      },
      {
        id: 'arr-2',
        title: '字符串',
        content: `C语言字符串是字符数组，以\\0结尾：

\`\`\`c
char str[] = "Hello";
// 实际存储：H e l l o \\0 （6个字符）

strlen(str);  // 返回5（不含\\0）
sizeof(str);  // 返回6（含\\0）
\`\`\`

常用字符串函数（需要 #include <string.h>）：
- strlen: 长度
- strcpy: 复制
- strcmp: 比较`,
        keyPoints: ['字符串以\\0结尾', 'strlen不含\\0', '字符用单引号，字符串用双引号']
      }
    ]
  },
  {
    id: 'pointers',
    name: '指针陷阱',
    icon: '👆',
    description: '指针是C的灵魂，也是最大的坑',
    questionCount: 16,
    mode: 'practice',
    lessons: [
      {
        id: 'ptr-1',
        title: '指针基础',
        content: `指针存储变量的**内存地址**：

\`\`\`c
int a = 10;
int *p = &a;  // p存储a的地址

// & 取地址
// * 解引用（获取地址上的值）

printf("%d", *p);  // 输出10
*p = 20;           // 通过指针修改a
printf("%d", a);   // 输出20
\`\`\``,
        keyPoints: ['&取地址', '*解引用', '指针存的是地址', '通过指针可以修改原变量']
      },
      {
        id: 'ptr-2',
        title: '常见指针错误',
        content: `**野指针：** 未初始化就使用
\`\`\`c
int *p;      // p是垃圾值
*p = 10;     // 危险！写入随机地址
\`\`\`

**空指针解引用：**
\`\`\`c
int *p = NULL;
*p = 10;     // 程序崩溃！
\`\`\`

**悬空指针：** 指向已释放的内存
\`\`\`c
int *p = malloc(sizeof(int));
free(p);
*p = 10;     // 危险！内存已释放
\`\`\``,
        keyPoints: ['使用前必须初始化', '用前检查是否NULL', 'free后不要再使用']
      }
    ]
  },
  {
    id: 'memory',
    name: '内存安全',
    icon: '🛡️',
    description: '理解内存管理，避免内存泄漏和溢出',
    questionCount: 8,
    mode: 'practice',
    lessons: [
      {
        id: 'mem-1',
        title: '内存布局',
        content: `程序内存四区：

\`\`\`
┌─────────────┐ 高地址
│    栈区     │ ← 局部变量，自动释放，~8MB
├─────────────┤
│    堆区     │ ← malloc分配，手动管理，GB级
├─────────────┤
│   数据段    │ ← 全局/静态变量
├─────────────┤
│   代码段    │ ← 程序指令，只读
└─────────────┘ 低地址
\`\`\`

**核心区别**：栈自动管理但空间小，堆手动管理但空间大`,
        keyPoints: ['栈自动管理，空间有限', '堆手动管理，空间大']
      },
      {
        id: 'mem-2',
        title: '动态内存',
        content: `\`\`\`c
// malloc: 分配不初始化
int *p = malloc(10 * sizeof(int));

// calloc: 分配并初始化为0
int *q = calloc(10, sizeof(int));

// realloc: 调整大小
p = realloc(p, 20 * sizeof(int));

// 必须检查
if (p == NULL) return;

// 使用...

free(p);     // 释放
p = NULL;    // 置空防野指针
\`\`\`

**铁律**：malloc/free配对，free后置NULL`,
        keyPoints: ['malloc/free配对', '检查NULL', 'free后置NULL']
      },
      {
        id: 'mem-3',
        title: '内存泄漏',
        content: `**三大泄漏场景**：

\`\`\`c
// 1. 忘记释放
void leak1() {
    int *p = malloc(100);
    // 忘记free就返回
}

// 2. 异常路径
void leak2(int x) {
    int *p = malloc(100);
    if (x < 0) return;  // 泄漏！
    free(p);
}

// 3. 指针覆盖
void leak3() {
    int *p = malloc(100);
    p = malloc(200);  // 第一次的内存丢失！
    free(p);
}
\`\`\`

**检测**：gcc -fsanitize=address 或 valgrind`,
        keyPoints: ['malloc/free配对', '异常路径也要释放', '不要覆盖未释放指针']
      },
      {
        id: 'mem-4',
        title: '野指针',
        content: `**野指针**：未初始化
\`\`\`c
int *p;     // 野指针！
*p = 10;    // 崩溃或破坏数据
\`\`\`

**悬空指针**：指向已释放内存
\`\`\`c
int *p = malloc(4);
free(p);
*p = 10;    // 悬空指针！
\`\`\`

**经典错误：返回局部变量地址**
\`\`\`c
// ❌ 错误
int *bad() {
    int x = 10;   // 栈变量
    return &x;    // 返回后x销毁！
}

// ✅ 正确
int *good() {
    static int x = 10;  // 静态变量
    return &x;
}
\`\`\`

**防身术**：声明时初始化NULL，free后置NULL`,
        keyPoints: ['野指针：未初始化', '悬空指针：指向已释放内存', '不要返回局部变量地址', 'free后置NULL']
      },
      {
        id: 'mem-5',
        title: '缓冲区溢出',
        content: `**数组越界**：
\`\`\`c
int arr[5];
arr[5] = 1;   // ❌ 越界！索引0-4
\`\`\`

**字符串溢出**：
\`\`\`c
char buf[10];
strcpy(buf, "Hello World!");  // ❌ 12>10

// ✅ 安全
snprintf(buf, sizeof(buf), "%s", "Hello World!");
\`\`\`

**栈溢出**：
\`\`\`c
// ❌ 栈上分配大数组
void bad() { int big[10000000]; }

// ✅ 堆上分配
void good() { 
    int *big = malloc(10000000 * sizeof(int));
    free(big);
}
\`\`\`

**安全函数**：strcpy→snprintf, gets→fgets`,
        keyPoints: ['数组索引不能越界', '字符串用安全函数', '大数组用堆分配']
      },
      {
        id: 'mem-6',
        title: '双重释放',
        content: `**双重释放**：同一块内存释放两次
\`\`\`c
int *p = malloc(4);
free(p);
free(p);   // ❌ 崩溃！
\`\`\`

**解决**：free后置NULL
\`\`\`c
free(p);
p = NULL;  // ✅ 再free(NULL)安全
\`\`\`

**使用已释放内存**：
\`\`\`c
free(p);
printf("%d", *p);  // ❌ 未定义行为
\`\`\`

**检测工具**：
\`\`\`bash
gcc -fsanitize=address program.c
# 检测：内存泄漏、溢出、双重释放、使用已释放内存
\`\`\`

**黄金法则**：谁分配谁释放，free后置NULL`,
        keyPoints: ['不要双重释放', 'free后置NULL', '用AddressSanitizer检测']
      }
    ]
  },
  {
    id: 'linux',
    name: 'Linux系统编程',
    icon: '🐧',
    description: '深入理解Linux系统编程原理：进程管理、并发编程、IO模型、性能优化',
    questionCount: 30,
    mode: 'practice',
    lessons: [
      {
        id: 'linux-1',
        title: '文件IO与内核机制',
        content: `Linux文件IO系统调用：

**open/close**
- open(): 打开文件，返回文件描述符
- close(): 关闭文件描述符

**read/write系统调用开销**
- 用户态→内核态切换：约100-200ns
- 数据拷贝：用户缓冲区↔页缓存↔磁盘
- 上下文切换成本：保存/恢复寄存器

**零拷贝技术**
- mmap: 文件直接映射到进程地址空间
- sendfile: 内核直接传递数据，无需用户态参与
- splice: 管道零拷贝

**页缓存(Page Cache)**
- 文件数据缓存在内存中
- 延迟写回策略提升性能
- read可能不触发磁盘IO`,
        keyPoints: ['系统调用有开销', '零拷贝提升性能', '页缓存加速文件访问']
      },
      {
        id: 'linux-2',
        title: '进程管理深度',
        content: `进程创建和控制：

**fork()的Copy-on-Write**
- fork时并不复制整个地址空间
- 只复制页表，标记为只读
- 写入时才复制实际页面(COW)
- 这就是为什么fork比想象中快

**exec族**
- 替换当前进程映像
- 加载新程序，重置地址空间
- 文件描述符默认保持打开

**进程调度**
- CFS(完全公平调度器)
- vruntime决定调度顺序
- nice值影响权重`,
        keyPoints: ['fork使用COW机制', 'exec替换地址空间', 'CFS基于vruntime调度']
      },
      {
        id: 'linux-3',
        title: '线程与并发原理',
        content: `POSIX线程(pthread)：

**线程 vs 进程**
- 线程共享：代码段、数据段、堆、打开的文件
- 线程私有：栈、寄存器、线程局部存储
- 线程切换比进程切换快(无需切换页表)

**互斥锁实现**
- 用户态：自旋锁(短暂等待)
- 内核态：futex(快速用户态互斥)
- 避免频繁系统调用

**缓存一致性**
- MESI协议：Modified/Exclusive/Shared/Invalid
- 伪共享：同一缓存行的独立变量
- 内存屏障：防止指令重排序`,
        keyPoints: ['线程切换比进程快', 'futex实现高效锁', 'MESI保证缓存一致']
      },
      {
        id: 'linux-4',
        title: 'IO多路复用',
        content: `同时监视多个文件描述符：

**select的局限**
- fd_set大小限制(1024)
- 每次调用都要拷贝fd_set到内核
- 返回后需要遍历所有fd检查状态
- 时间复杂度O(n)

**poll的改进**
- 使用数组存储fd，无大小限制
- 但仍需遍历所有fd
- 数据拷贝开销仍然存在

**epoll的革命**
- epoll_create: 创建epoll实例
- epoll_ctl: 注册感兴趣的事件(一次)
- epoll_wait: 只返回就绪的fd
- 时间复杂度O(1)，无拷贝开销
- 使用红黑树存储fd，回调机制通知就绪`,
        keyPoints: ['select/poll需要遍历', 'epoll只返回就绪fd', 'epoll使用回调机制']
      },
      {
        id: 'linux-5',
        title: '进程间通信原理',
        content: `IPC机制对比：

**管道/命名管道**
- 基于内核缓冲区(通常4KB-64KB)
- 单向流式通信
- 数据拷贝：用户→内核→用户

**共享内存**
- 最快的IPC(无数据拷贝)
- 需要同步机制(mutex/信号量)
- shmget/shmat创建和映射

**Unix Domain Socket**
- 类似网络socket，但本地通信
- 可以传递文件描述符
- 支持流和数据报两种模式

**消息队列**
- 内核维护的消息链表
- 支持消息类型选择接收
- 有大小和数量限制`,
        keyPoints: ['共享内存最快', '管道有拷贝开销', 'UDS可传递fd']
      },
      {
        id: 'linux-6',
        title: '信号与异步编程',
        content: `信号处理机制：

**信号发送与处理**
- 内核检查目标进程的signal_pending
- 从内核态返回用户态时处理信号
- 信号处理函数在进程上下文中执行

**可重入函数**
- 信号处理中只能调用异步信号安全函数
- 不安全：malloc/free, printf, 操作全局链表
- 安全：write, _exit, 部分系统调用

**实时信号**
- 支持排队(普通信号不排队)
- 支持携带数据(sigqueue)
- 优先级高于普通信号`,
        keyPoints: ['信号在返回用户态时处理', '信号处理要异步安全', '实时信号支持排队']
      },
      {
        id: 'linux-7',
        title: '内存管理深度',
        content: `Linux内存管理：

**虚拟内存**
- 每个进程独立的地址空间
- MMU将虚拟地址转换为物理地址
- 页表实现地址映射

**内存分配**
- brk/mmap: 系统调用申请内存
- ptmalloc/tcmalloc: 用户态内存管理
- 内存碎片问题

**缺页中断**
- 访问未映射的页面触发
- 内核分配物理页并建立映射
- 按需调页(Demand Paging)

**内存映射文件**
- mmap将文件映射到内存
- 访问内存即访问文件
- 共享映射：多个进程共享数据`,
        keyPoints: ['MMU负责地址转换', '缺页中断按需分配', 'mmap直接访问文件']
      },
      {
        id: 'linux-8',
        title: '性能分析与优化',
        content: `系统性能优化：

**系统调用优化**
- 批量操作减少syscall次数
- 使用vread/vwrite批量IO
- 内存映射避免拷贝

**缓存优化**
- CPU缓存行对齐(通常64字节)
- 避免伪共享
- 预取指令优化访问模式

**锁优化**
- 减小临界区
- 读写锁分离读/写
- 无锁数据结构

**IO优化**
- 使用epoll替代select/poll
- 异步IO(aio/io_uring)
- 直接IO绕过页缓存`,
        keyPoints: ['批量操作减少syscall', '缓存行对齐避免伪共享', 'epoll替代select']
      }
    ]
  },
  {
    id: 'linux-cmds',
    name: 'Linux常用命令',
    icon: '⌨️',
    description: '掌握Linux开发必备命令：文件操作、进程管理、网络调试、文本处理',
    questionCount: 20,
    mode: 'practice',
    lessons: [
      {
        id: 'linux-cmds-1',
        title: '文件与目录操作',
        content: `Linux文件操作核心命令：

**ls - 列出目录内容**
- -l: 详细信息（权限、大小、时间）
- -a: 显示隐藏文件
- -h: 人类可读大小
- -R: 递归列出

**cd/pwd - 目录导航**
- cd -: 返回上一个目录
- pwd: 显示当前路径

**cp/mv/rm - 文件操作**
- cp -r: 递归复制目录
- mv: 移动或重命名
- rm -rf: 强制递归删除（慎用！）

**find - 查找文件**
- find /path -name "*.c": 按名称查找
- find /path -mtime -7: 7天内修改的文件`,
        keyPoints: ['ls -la查看详细信息', 'rm -rf慎用', 'find按条件查找']
      },
      {
        id: 'linux-cmds-2',
        title: '权限与用户管理',
        content: `Linux权限系统：

**chmod - 修改权限**
- 数字模式：chmod 755 file
- 符号模式：chmod +x file
- 递归：chmod -R 755 dir/

**chown - 修改所有者**
- chown user:group file
- chown -R user:group dir/

**权限含义**
- r(4): 读权限
- w(2): 写权限
- x(1): 执行权限
- 755 = rwxr-xr-x

**sudo/su**
- sudo: 以root执行命令
- su -: 切换到root用户`,
        keyPoints: ['chmod 755常用权限', 'chown修改所有者', 'sudo提权']
      },
      {
        id: 'linux-cmds-3',
        title: '进程管理',
        content: `Linux进程管理命令：

**ps - 查看进程**
- ps aux: 显示所有进程详情
- ps -ef: 完整格式显示
- ps aux | grep nginx: 查找特定进程

**top/htop - 动态监控**
- top: 实时进程监控
- htop: 增强版（需安装）
- 按P按CPU排序，按M按内存排序

**kill - 发送信号**
- kill PID: 默认SIGTERM
- kill -9 PID: SIGKILL强制终止
- kill -l: 列出所有信号

**后台运行**
- command &: 后台运行
- nohup command &: 忽略挂断信号
- jobs: 查看后台任务`,
        keyPoints: ['ps aux查看进程', 'kill -9强制终止', 'nohup后台运行']
      },
      {
        id: 'linux-cmds-4',
        title: '网络命令',
        content: `Linux网络调试命令：

**netstat - 网络状态**
- netstat -tlnp: 查看监听端口
- netstat -an: 所有连接
- netstat -s: 统计信息

**ss - 新版网络工具**
- ss -tlnp: 查看TCP监听
- ss -s: 连接统计摘要

**curl/wget - HTTP请求**
- curl -I URL: 只获取响应头
- curl -X POST -d "data" URL: POST请求
- wget URL: 下载文件

**ping/telnet/nc**
- ping: 测试网络连通性
- telnet host port: 测试端口
- nc -zv host port: 扫描端口`,
        keyPoints: ['netstat -tlnp查看端口', 'curl测试HTTP', 'nc扫描端口']
      },
      {
        id: 'linux-cmds-5',
        title: '文本处理三剑客',
        content: `Linux文本处理核心工具：

**grep - 文本搜索**
- grep "pattern" file: 搜索匹配行
- grep -r "pattern" dir/: 递归搜索
- grep -i: 忽略大小写
- grep -n: 显示行号
- grep -v: 反向匹配

**sed - 流编辑器**
- sed 's/old/new/g' file: 全局替换
- sed -i: 直接修改文件
- sed -n '10,20p' file: 打印10-20行

**awk - 文本分析**
- awk '{print $1}': 打印第一列
- awk -F: '{print $1}': 指定分隔符
- awk '{sum+=$1} END{print sum}': 求和

**管道组合**
- cat file | grep "error" | wc -l
- 统计error出现次数`,
        keyPoints: ['grep搜索文本', 'sed替换文本', 'awk分析列数据']
      }
    ]
  },
  {
    id: 'embedded',
    name: '嵌入式Linux应用',
    icon: '🔧',
    description: '嵌入式Linux应用开发：文件IO、进程线程、IPC通信、设备操作',
    questionCount: 25,
    mode: 'practice',
    lessons: [
      {
        id: 'embedded-1',
        title: '文件IO基础',
        content: `Linux文件IO系统调用：

**open - 打开文件**
- int fd = open(path, flags, mode)
- O_RDONLY/O_WRONLY/O_RDWR: 读写模式
- O_CREAT: 不存在则创建
- O_APPEND: 追加模式
- O_NONBLOCK: 非阻塞模式

**read/write - 读写文件**
- ssize_t read(fd, buf, count)
- ssize_t write(fd, buf, count)
- 返回实际读写字节数

**close - 关闭文件**
- close(fd): 关闭文件描述符
- 进程退出时自动关闭

**lseek - 移动文件指针**
- lseek(fd, offset, SEEK_SET/SEEK_CUR/SEEK_END)`,
        keyPoints: ['open返回文件描述符', 'read/write返回实际字节数', 'close释放fd']
      },
      {
        id: 'embedded-2',
        title: '进程控制',
        content: `Linux进程控制：

**fork - 创建子进程**
- 返回值：父进程得到子进程PID，子进程得到0
- 子进程复制父进程地址空间（COW）
- 父子进程执行顺序不确定

**exec族 - 执行新程序**
- execl/execv/execvp/execlp
- 成功不返回，失败返回-1
- 替换当前进程映像

**wait/waitpid - 等待子进程**
- wait(&status): 等待任意子进程
- waitpid(pid, &status, options): 等待指定子进程
- WIFEXITED/WEXITSTATUS宏解析状态

**exit - 进程退出**
- exit(status): 正常退出
- _exit(status): 直接退出（不刷新缓冲区）`,
        keyPoints: ['fork返回值区分父子进程', 'exec替换进程映像', 'wait回收子进程']
      },
      {
        id: 'embedded-3',
        title: '信号处理',
        content: `Linux信号机制：

**常见信号**
- SIGINT(2): Ctrl+C中断
- SIGKILL(9): 强制终止（不可捕获）
- SIGTERM(15): 正常终止
- SIGSEGV(11): 段错误
- SIGCHLD: 子进程状态改变

**signal/sigaction**
- signal(sig, handler): 简单注册
- sigaction(sig, &act, &oldact): 推荐使用
- SIG_IGN: 忽略信号
- SIG_DFL: 默认处理

**发送信号**
- kill(pid, sig): 发送信号给进程
- raise(sig): 发送信号给自己
- alarm(sec): 定时发送SIGALRM`,
        keyPoints: ['SIGKILL不可捕获', 'sigaction比signal更安全', 'kill发送信号']
      },
      {
        id: 'embedded-4',
        title: '进程间通信IPC',
        content: `Linux IPC机制：

**管道(pipe)**
- int pipe(int fd[2])
- fd[0]读端，fd[1]写端
- 单向通信，父子进程使用

**命名管道(FIFO)**
- mkfifo(path, mode)
- 无亲缘关系进程可通信
- 阻塞特性

**共享内存(shm)**
- shmget(): 创建共享内存
- shmat(): 映射到进程空间
- shmdt(): 分离
- 最快的IPC方式

**消息队列(msg)**
- msgget/msgsnd/msgrcv
- 按类型发送接收消息`,
        keyPoints: ['pipe单向通信', 'shm最快IPC', 'FIFO跨进程通信']
      },
      {
        id: 'embedded-5',
        title: '多线程编程',
        content: `POSIX线程(pthread)：

**线程创建与等待**
- pthread_create(&tid, NULL, func, arg)
- pthread_join(tid, &retval): 等待线程结束
- pthread_exit(retval): 线程退出

**互斥锁(mutex)**
- pthread_mutex_init/destroy
- pthread_mutex_lock/unlock
- 保护临界区

**条件变量(cond)**
- pthread_cond_init/destroy
- pthread_cond_wait(cond, mutex)
- pthread_cond_signal/broadcast
- 生产者-消费者模型

**线程安全**
- 避免竞争条件
- 使用锁保护共享资源
- 注意死锁问题`,
        keyPoints: ['pthread_create创建线程', 'mutex保护临界区', 'cond实现等待通知']
      },
      {
        id: 'embedded-6',
        title: '设备文件操作',
        content: `Linux设备文件：

**设备文件类型**
- 字符设备(c): 按字节访问（串口、键盘）
- 块设备(b): 按块访问（硬盘、U盘）
- 设备文件在/dev目录

**ioctl - 设备控制**
- int ioctl(int fd, unsigned long request, ...)
- 发送控制命令给设备驱动
- 如设置串口波特率

**串口编程**
- open("/dev/ttyUSB0", O_RDWR)
- tcgetattr/tcsetattr: 配置串口参数
- 设置波特率、数据位、停止位

**GPIO操作（嵌入式）**
- /sys/class/gpio/方式
- 或通过ioctl操作/dev/gpio`,
        keyPoints: ['字符设备按字节访问', 'ioctl控制设备', '串口编程配置参数']
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++基础入门',
    icon: '🔷',
    description: '从C到C++：引用、类与对象、继承多态、STL容器、智能指针、移动语义、模板',
    questionCount: 30,
    mode: 'practice',
    lessons: [
      {
        id: 'cpp-1',
        title: 'C++与C的区别',
        content: `C++在C基础上的增强：

**新增特性**
- 引用(&): 变量别名
- bool类型: true/false
- 命名空间(namespace)
- 函数重载: 同名不同参数
- 默认参数: 函数参数默认值

**类型安全**
- 更严格的类型检查
- const更强大
- 新式类型转换: static_cast等

**面向对象**
- 类(class): 封装数据和方法
- 继承: 代码复用
- 多态: 运行时绑定

**标准库**
- STL容器: vector, map, string
- 智能指针: unique_ptr, shared_ptr
- 算法: sort, find, transform`,
        keyPoints: ['引用是别名', '类封装数据和方法', 'STL提供现成容器']
      },
      {
        id: 'cpp-2',
        title: '引用 vs 指针',
        content: `引用和指针的区别：

**引用特性**
- 必须初始化
- 不能改变引用目标
- 没有空引用
- 语法更简洁

**指针特性**
- 可以不初始化
- 可以改变指向
- 可以是空指针
- 需要解引用(*)

**使用场景**
- 函数参数传递: 优先用引用
- 可能为空: 用指针
- 需要重新指向: 用指针
- 运算: 用指针

**const引用**
- const int& ref = 10; // 合法
- 可以绑定临时值
- 避免拷贝开销`,
        keyPoints: ['引用必须初始化', '引用不能改变目标', '参数传递优先用引用']
      },
      {
        id: 'cpp-3',
        title: '类与对象',
        content: `C++类的核心概念：

**类定义**
- class ClassName { ... };
- 成员变量(属性)
- 成员函数(方法)
- 访问控制: public/private/protected

**构造函数**
- 与类同名，无返回值
- 对象创建时自动调用
- 可以重载
- 初始化列表: ClassName(): member(val) {}

**析构函数**
- ~ClassName()
- 对象销毁时自动调用
- 用于释放资源

**this指针**
- 指向当前对象
- 成员函数隐含参数
- return *this; 支持链式调用`,
        keyPoints: ['构造函数初始化对象', '析构函数释放资源', 'this指向当前对象']
      },
      {
        id: 'cpp-4',
        title: '继承与多态',
        content: `C++面向对象核心：

**继承**
- class Derived : public Base
- 子类继承父类成员
- public/protected/private继承

**虚函数(virtual)**
- virtual void func();
- 子类可以重写(override)
- 实现运行时多态

**纯虚函数与抽象类**
- virtual void func() = 0;
- 含纯虚函数的类是抽象类
- 不能实例化

**多态条件**
1. 基类指针/引用
2. 虚函数
3. 子类重写

**虚析构函数**
- virtual ~Base();
- 确保正确调用子类析构
- 多态基类必须有`,
        keyPoints: ['virtual实现多态', '纯虚函数定义抽象类', '基类析构函数要virtual']
      },
      {
        id: 'cpp-5',
        title: 'STL容器基础',
        content: `C++标准模板库(STL)：

**序列容器**
- vector: 动态数组，尾部插入快
- deque: 双端队列
- list: 双向链表
- array: 固定大小数组

**关联容器**
- map: 键值对，有序
- set: 唯一键集合，有序
- unordered_map: 哈希表，O(1)查找

**常用操作**
- push_back()/pop_back(): 尾部操作
- insert()/erase(): 插入删除
- size()/empty(): 大小判断
- begin()/end(): 迭代器

**遍历方式**
- for(auto& item : container)
- for(auto it = v.begin(); it != v.end(); ++it)`,
        keyPoints: ['vector动态数组', 'map键值对', '范围for遍历']
      },
      {
        id: 'cpp-6',
        title: '智能指针',
        content: `C++11智能指针：

**unique_ptr**
- 独占所有权
- 不可拷贝，可移动
- 最轻量级
- auto p = std::make_unique<T>();

**shared_ptr**
- 共享所有权
- 引用计数
- 可拷贝
- auto p = std::make_shared<T>();

**weak_ptr**
- 弱引用，不增加计数
- 解决循环引用
- 需要lock()获取shared_ptr

**使用建议**
- 优先用unique_ptr
- 共享时用shared_ptr
- 避免裸指针管理资源
- 用make_unique/make_shared创建`,
        keyPoints: ['unique_ptr独占所有权', 'shared_ptr引用计数', 'weak_ptr解决循环引用']
      }
    ]
  }
];

export function getTotalQuestions(): number {
  return chapters.reduce((sum, ch) => sum + ch.questionCount, 0);
}

// 题库 - 输入式答题
const questionsData: Question[] = [
  // ===== 基础测试 - 数据类型 =====
  {
    id: 9001,
    chapter: 'basics-test',
    type: 'choice',
    title: 'uint8_t 类型表示什么？',
    description: '嵌入式开发中常用的数据类型',
    code: `uint8_t humidity = 65;`,
    options: [
      { id: 'A', text: '无符号8位整数，范围 0~255' },
      { id: 'B', text: '有符号8位整数，范围 -128~127' },
      { id: 'C', text: '无符号16位整数，范围 0~65535' },
      { id: 'D', text: '有符号16位整数，范围 -32768~32767' }
    ],
    correctAnswer: 'A',
    explanation: 'uint8_t 是 stdint.h 中定义的无符号8位整型，范围是 0~255。嵌入式开发中常用于存储字符、计数器、传感器数据等。',
    difficulty: 1,
    knowledgePoints: ['uint8_t', '无符号整型', '数据类型'],
    hint: 'u 表示 unsigned（无符号），8 表示 8 位',
    commonMistakes: ['混淆有符号和无符号的取值范围']
  },
  {
    id: 9002,
    chapter: 'basics-test',
    type: 'choice',
    title: 'int 类型在大多数系统上占多少字节？',
    description: 'C语言基础数据类型大小',
    options: [
      { id: 'A', text: '1 字节' },
      { id: 'B', text: '2 字节' },
      { id: 'C', text: '4 字节' },
      { id: 'D', text: '8 字节' }
    ],
    correctAnswer: 'C',
    explanation: '在现代大多数系统（32位和64位）上，int 类型通常是 4 字节。但在某些嵌入式系统上可能是 2 字节。',
    difficulty: 1,
    knowledgePoints: ['int', '数据类型大小', ' sizeof'],
    hint: '考虑常见的32位/64位系统'
  },
  {
    id: 9003,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个类型最适合存储汉字？',
    description: '中文字符存储类型选择',
    options: [
      { id: 'A', text: 'char' },
      { id: 'B', text: 'short' },
      { id: 'C', text: 'int' },
      { id: 'D', text: 'wchar_t' }
    ],
    correctAnswer: 'D',
    explanation: 'char 通常是 1 字节，只能存储 ASCII 字符。存储汉字需要宽字符类型 wchar_t，通常是 2 或 4 字节。在嵌入式系统中常用 UTF-8 编码的 char 数组。',
    difficulty: 2,
    knowledgePoints: ['char', 'wchar_t', '字符编码'],
    hint: '考虑汉字需要的存储空间'
  },
  {
    id: 9004,
    chapter: 'basics-test',
    type: 'choice',
    title: 'signed 和 unsigned 关键字的作用是？',
    description: '整型符号属性',
    options: [
      { id: 'A', text: '指定变量的大小' },
      { id: 'B', text: '指定变量是否有符号' },
      { id: 'C', text: '指定变量的存储位置' },
      { id: 'D', text: '指定变量的初始化方式' }
    ],
    correctAnswer: 'B',
    explanation: 'signed 关键字指定变量是有符号数，可以表示正负值；unsigned 指定变量是无符号数，只能表示非负值。',
    difficulty: 1,
    knowledgePoints: ['signed', 'unsigned', '有符号数'],
    commonMistakes: ['认为 signed/unsigned 影响大小']
  },
  {
    id: 9005,
    chapter: 'basics-test',
    type: 'choice',
    title: 'float 类型默认精度是多少位？',
    description: '浮点数精度问题',
    options: [
      { id: 'A', text: '16 位' },
      { id: 'B', text: '24 位' },
      { id: 'C', text: '32 位' },
      { id: 'D', text: '53 位' }
    ],
    correctAnswer: 'B',
    explanation: 'float 是 IEEE 754 单精度浮点数，24 位有效数字（约 7 位十进制）。double 是 53 位有效数字（约 15-16 位十进制）。',
    difficulty: 2,
    knowledgePoints: ['float', 'IEEE 754', '浮点数精度'],
    hint: '注意有效数字和位数的区别'
  },
  {
    id: 9006,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是合法的变量名？',
    description: 'C语言标识符规则',
    options: [
      { id: 'A', text: '1variable' },
      { id: 'B', text: 'my_var' },
      { id: 'C', text: 'int' },
      { id: 'D', text: 'my-var' }
    ],
    correctAnswer: 'B',
    explanation: '变量名必须以字母或下划线开头，后续字符可以是字母、数字、下划线。不能是C关键字（如int）。my_var是合法的。',
    difficulty: 1,
    knowledgePoints: ['标识符', '变量命名规则', '关键字'],
    hint: '注意关键字和特殊字符'
  },
  {
    id: 9007,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个类型用于存储布尔值最节省内存？',
    description: '布尔类型存储效率',
    options: [
      { id: 'A', text: 'int' },
      { id: 'B', text: 'char' },
      { id: 'C', text: '_Bool' },
      { id: 'D', text: 'unsigned char' }
    ],
    correctAnswer: 'C',
    explanation: 'C99 引入了 _Bool 类型（stdbool.h 中定义为 bool），专门用于存储布尔值，最节省内存。在一些编译器中可能占用 1 字节。',
    difficulty: 2,
    knowledgePoints: ['_Bool', 'bool', '布尔类型'],
    hint: 'C99 标准引入了专门的布尔类型'
  },
  {
    id: 9008,
    chapter: 'basics-test',
    type: 'choice',
    title: 'uint16_t 类型最大可以表示多少？',
    description: '无符号16位整型范围',
    options: [
      { id: 'A', text: '255' },
      { id: 'B', text: '32767' },
      { id: 'C', text: '65535' },
      { id: 'D', text: '2147483647' }
    ],
    correctAnswer: 'C',
    explanation: 'uint16_t 是 16 位无符号整数，范围是 0 到 2^16-1，即 0~65535。',
    difficulty: 1,
    knowledgePoints: ['uint16_t', '无符号整型范围'],
    hint: '2^16 = 65536，去掉0是65535'
  },
  // ===== 基础测试 - 运算符 =====
  {
    id: 9011,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 3 + 4 * 5 的结果是？',
    description: '运算符优先级',
    options: [
      { id: 'A', text: '35' },
      { id: 'B', text: '23' },
      { id: 'C', text: '20' },
      { id: 'D', text: '15' }
    ],
    correctAnswer: 'B',
    explanation: '* 优先级高于 +，所以先计算 4*5=20，再计算 3+20=23。',
    difficulty: 1,
    knowledgePoints: ['运算符优先级', '算术运算'],
    hint: '先乘除后加减',
    visualization: { type: 'html', file: 'visualizations-v2/operator-precedence.html' }
  },
  {
    id: 9012,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 10 / 3 的结果是？',
    description: '整数除法',
    options: [
      { id: 'A', text: '3.333...' },
      { id: 'B', text: '3' },
      { id: 'C', text: '1' },
      { id: 'D', text: '0' }
    ],
    correctAnswer: 'B',
    explanation: '当两个整数相除时，执行整数除法，结果会截断小数部分。10/3 = 3 余 1。',
    difficulty: 1,
    knowledgePoints: ['整数除法', '取余运算'],
    hint: '整数除法会丢失小数部分',
    visualization: { type: 'html', file: 'visualizations-v2/right-shift-division.html' }
  },
  {
    id: 9013,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 10 % 3 的结果是？',
    description: '取余运算',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '1' },
      { id: 'C', text: '0' },
      { id: 'D', text: '3.333...' }
    ],
    correctAnswer: 'B',
    explanation: '% 是取余（模运算），10 % 3 表示 10 除以 3 的余数，即 1。',
    difficulty: 1,
    knowledgePoints: ['取余运算', '模运算'],
    hint: '10 = 3*3 + ?',
    visualization: { type: 'html', file: 'visualizations-v2/modulo-operation.html' }
  },
  {
    id: 9014,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个运算符用于判断两个值是否相等？',
    description: '关系运算符',
    options: [
      { id: 'A', text: '=' },
      { id: 'B', text: '==' },
      { id: 'C', text: '!=' },
      { id: 'D', text: '<>' }
    ],
    correctAnswer: 'B',
    explanation: '== 是相等运算符，用于判断两个值是否相等。= 是赋值运算符，!= 是不等于，<> 不是C语言运算符。',
    difficulty: 1,
    knowledgePoints: ['相等运算符', '赋值运算符', '关系运算符'],
    commonMistakes: ['混淆 = 和 =='],
    hint: '判断相等用 ==',
    visualization: { type: 'html', file: 'visualizations-v2/assignment-vs-comparison.html' }
  },
  {
    id: 9015,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 5 > 3 && 2 < 1 的结果是？',
    description: '逻辑运算符与短路求值',
    options: [
      { id: 'A', text: 'true' },
      { id: 'B', text: 'false' },
      { id: 'C', text: '1' },
      { id: 'D', text: '0' }
    ],
    correctAnswer: 'B',
    explanation: '5>3 为真（1），2<1 为假（0）。&& 运算：1 && 0 = 0（假）。由于左操作数已确定整个表达式为假，右操作数不会被计算（短路求值）。',
    difficulty: 2,
    knowledgePoints: ['逻辑运算符', '短路求值'],
    hint: '&& 需要两边都为真才为真',
    visualization: { type: 'html', file: 'visualizations-v2/logical-operator-condition.html' }
  },
  {
    id: 9016,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 5 || 0 的结果是？',
    description: '逻辑或运算符',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: '5' },
      { id: 'D', text: '0或1' }
    ],
    correctAnswer: 'B',
    explanation: '|| 是逻辑或运算符。5（非零）为真，0 为假。逻辑或只要有一个为真就为真，结果为 1。在短路求值中，由于左操作数已确定结果为真，右操作数不会被计算。',
    difficulty: 2,
    knowledgePoints: ['逻辑或', '短路求值'],
    hint: '|| 一真即真',
    visualization: { type: 'html', file: 'visualizations-v2/logical-operator-condition.html' }
  },
  {
    id: 9017,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 3 << 2 的结果是？',
    description: '左移运算符',
    options: [
      { id: 'A', text: '6' },
      { id: 'B', text: '12' },
      { id: 'C', text: '9' },
      { id: 'D', text: '1' }
    ],
    correctAnswer: 'B',
    explanation: '<< 是左移运算符，相当于乘以 2 的 n 次方。3 << 2 = 3 * 2^2 = 3 * 4 = 12。',
    difficulty: 2,
    knowledgePoints: ['左移运算', '位运算'],
    hint: '左移 n 位相当于乘以 2^n',
    visualization: { type: 'html', file: 'visualizations-v2/left-shift-multiplication.html' }
  },
  {
    id: 9018,
    chapter: 'basics-test',
    type: 'choice',
    title: '表达式 8 >> 1 的结果是？',
    description: '右移运算符',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '16' },
      { id: 'C', text: '2' },
      { id: 'D', text: '1' }
    ],
    correctAnswer: 'A',
    explanation: '>> 是右移运算符。8 >> 1 = 8 / 2 = 4。对于无符号数，右移相当于除以 2 的 n 次方并取整。',
    difficulty: 2,
    knowledgePoints: ['右移运算', '位运算'],
    hint: '右移 n 位相当于除以 2^n'
  },
  // ===== 基础测试 - 控制流 =====
  {
    id: 9021,
    chapter: 'basics-test',
    type: 'choice',
    title: '以下哪个是 for 循环的正确语法？',
    description: 'for循环语法',
    options: [
      { id: 'A', text: 'for(i = 0; i < 10; i++)' },
      { id: 'B', text: 'for(i < 10; i++)' },
      { id: 'C', text: 'for(i = 0; i < 10)' },
      { id: 'D', text: 'for i = 0 to 10' }
    ],
    correctAnswer: 'A',
    explanation: 'for 循环的标准语法是：for(初始化; 条件; 更新) { 循环体 }。',
    difficulty: 1,
    knowledgePoints: ['for循环', '循环语法'],
    hint: '三个部分用分号分隔',
    visualization: { type: 'html', file: 'visualizations-v2/for-loop-array-sum.html' }
  },
  {
    id: 9022,
    chapter: 'basics-test',
    type: 'choice',
    title: 'while 循环和 do-while 循环的主要区别是？',
    description: '循环类型区别',
    options: [
      { id: 'A', text: 'while 循环执行次数更多' },
      { id: 'B', text: 'do-while 循环至少执行一次' },
      { id: 'C', text: 'while 循环不能用于计数' },
      { id: 'D', text: '两者没有区别' }
    ],
    correctAnswer: 'B',
    explanation: 'do-while 循环会先执行循环体，再判断条件，因此至少执行一次。while 循环先判断条件，可能一次都不执行。',
    difficulty: 1,
    knowledgePoints: ['while', 'do-while', '循环区别'],
    hint: '考虑条件判断的时机',
    visualization: { type: 'html', file: 'visualizations-v2/do-while-loop.html' }
  },
  {
    id: 9023,
    chapter: 'basics-test',
    type: 'choice',
    title: 'break 语句的作用是？',
    description: '跳转语句',
    options: [
      { id: 'A', text: '结束本次循环，继续下一次' },
      { id: 'B', text: '跳出当前循环或 switch' },
      { id: 'C', text: '跳过本次循环剩余语句' },
      { id: 'D', text: '返回函数' }
    ],
    correctAnswer: 'B',
    explanation: 'break 语句用于跳出当前循环（for、while、do-while）或 switch 语句。continue 是结束本次循环，return 是返回函数。',
    difficulty: 1,
    knowledgePoints: ['break', 'continue', '跳转语句'],
    hint: 'break 是跳出，continue 是继续',
    visualization: { type: 'html', file: 'visualizations-v2/break-continue-flow.html' }
  },
  {
    id: 9024,
    chapter: 'basics-test',
    type: 'choice',
    title: 'continue 语句的作用是？',
    description: '跳转语句',
    options: [
      { id: 'A', text: '跳出整个循环' },
      { id: 'B', text: '结束程序' },
      { id: 'C', text: '结束本次循环，进入下一次' },
      { id: 'D', text: '返回函数' }
    ],
    correctAnswer: 'C',
    explanation: 'continue 语句结束本次循环，跳过循环体剩余语句，直接进入下一次循环条件判断。',
    difficulty: 1,
    knowledgePoints: ['continue', '循环控制'],
    hint: '是continue不是coninue'
  },
  {
    id: 9025,
    chapter: 'basics-test',
    type: 'choice',
    title: 'switch 语句中 default 的作用是？',
    description: 'switch语句',
    options: [
      { id: 'A', text: '必须放在最后' },
      { id: 'B', text: '当所有 case 都不匹配时执行' },
      { id: 'C', text: '表示默认情况，可以省略' },
      { id: 'D', text: '用于跳出 switch' }
    ],
    correctAnswer: 'B',
    explanation: 'default 是 switch 语句的默认分支，当所有 case 都不匹配时执行。它可以放在 switch 的任意位置（通常放在最后）。',
    difficulty: 1,
    knowledgePoints: ['switch', 'default', '多分支'],
    hint: '考虑没有匹配case的情况'
  },
  {
    id: 9026,
    chapter: 'basics-test',
    type: 'choice',
    title: 'for 循环中 continue 会跳到哪里？',
    description: '循环控制流程',
    options: [
      { id: 'A', text: '跳出整个循环' },
      { id: 'B', text: '跳到循环开始，执行 i++' },
      { id: 'C', text: '程序结束' },
      { id: 'D', text: '报错' }
    ],
    correctAnswer: 'B',
    explanation: '在 for 循环中，continue 会跳转到更新部分（i++），然后再判断循环条件。',
    difficulty: 2,
    knowledgePoints: ['continue', 'for循环'],
    hint: '注意for循环的三个部分'
  },
  // ===== 基础测试 - 函数 =====
  {
    id: 9031,
    chapter: 'basics-test',
    type: 'choice',
    title: '函数声明和函数定义的区别是？',
    description: '函数基础概念',
    options: [
      { id: 'A', text: '声明和定义没有区别' },
      { id: 'B', text: '声明告诉编译器函数存在，定义是函数的具体实现' },
      { id: 'C', text: '定义告诉编译器函数存在，声明是函数的具体实现' },
      { id: 'D', text: '只有函数定义，没有函数声明' }
    ],
    correctAnswer: 'B',
    explanation: '函数声明（原型）告诉编译器函数的返回类型、名称和参数列表；函数定义是函数的实际代码实现。可以只有声明而没有定义（链接时会报错）。',
    difficulty: 1,
    knowledgePoints: ['函数声明', '函数定义', '函数原型'],
    hint: '声明是"打招呼"，定义是"做事"'
  },
  {
    id: 9032,
    chapter: 'basics-test',
    type: 'choice',
    title: '以下哪个是函数调用的正确方式？',
    description: '函数调用语法',
    options: [
      { id: 'A', text: 'result = my_function;' },
      { id: 'B', text: 'result = my_function();' },
      { id: 'C', text: 'call my_function();' },
      { id: 'D', text: 'my_function Call' }
    ],
    correctAnswer: 'B',
    explanation: '函数调用需要使用圆括号 ()。my_function() 表示调用函数并获取其返回值。',
    difficulty: 1,
    knowledgePoints: ['函数调用', '圆括号'],
    hint: '函数名后面要加()',
    visualization: { type: 'html', file: 'visualizations-v2/function-declaration.html' }
  },
  {
    id: 9033,
    chapter: 'basics-test',
    type: 'choice',
    title: '以下哪个是合法的函数参数传递方式？',
    description: '参数传递方式',
    options: [
      { id: 'A', text: 'void func(int a[]);' },
      { id: 'B', text: 'void func(int a[10]);' },
      { id: 'C', text: 'void func(int a[]); 和 void func(int *a); 等价' },
      { id: 'D', text: '数组参数必须指定大小' }
    ],
    correctAnswer: 'C',
    explanation: '数组作为函数参数时，会退化为指针。void func(int a[]) 和 void func(int *a) 在本质上是一样的，都接受一个指针。',
    difficulty: 2,
    knowledgePoints: ['数组参数', '指针退化', '函数参数'],
    hint: '数组参数实际上是指针',
    visualization: { type: 'html', file: 'visualizations-v2/array-param-decay.html' }
  },
  {
    id: 9034,
    chapter: 'basics-test',
    type: 'choice',
    title: 'return 语句的作用是？',
    description: '函数返回值',
    options: [
      { id: 'A', text: '结束函数的执行' },
      { id: 'B', text: '结束函数执行并返回一个值' },
      { id: 'C', text: '暂停函数执行' },
      { id: 'D', text: '声明函数返回值类型' }
    ],
    correctAnswer: 'B',
    explanation: 'return 语句有两个作用：1) 结束函数的执行 2) 将一个值返回给调用者。return 后面的值就是函数的返回值。',
    difficulty: 1,
    knowledgePoints: ['return', '函数返回值'],
    hint: 'return 既结束函数又返回值'
  },
  {
    id: 9035,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个说法正确？',
    description: '值传递 vs 指针传递',
    options: [
      { id: 'A', text: '值传递会修改原变量' },
      { id: 'B', text: '指针传递会修改原变量' },
      { id: 'C', text: '值传递和指针传递都会修改原变量' },
      { id: 'D', text: '值传递和指针传递都不会修改原变量' }
    ],
    correctAnswer: 'B',
    explanation: '值传递是传递变量的副本，修改副本不影响原变量。指针传递是传递变量的地址，通过解引用可以修改原变量。',
    difficulty: 2,
    knowledgePoints: ['值传递', '指针传递', '内存'],
    hint: '指针传递可以直接操作原始数据',
    visualization: { type: 'html', file: 'visualizations-v2/pass-by-value.html' }
  },
  {
    id: 9036,
    chapter: 'basics-test',
    type: 'choice',
    title: '函数返回类型为 void 表示？',
    description: 'void 返回类型',
    options: [
      { id: 'A', text: '函数没有返回值' },
      { id: 'B', text: '函数返回空指针' },
      { id: 'C', text: '函数可以返回任何类型' },
      { id: 'D', text: '函数不能有 return 语句' }
    ],
    correctAnswer: 'A',
    explanation: 'void 表示"无类型"，用于函数返回类型表示该函数没有返回值。void 类型的函数可以有 return; 语句（提前结束），但不能 return 一个值。',
    difficulty: 1,
    knowledgePoints: ['void', '无返回值'],
    hint: 'void = 没有'
  },
  {
    id: 9037,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是递归函数的特点？',
    description: '递归函数特性',
    options: [
      { id: 'A', text: '函数调用自身' },
      { id: 'B', text: '需要终止条件' },
      { id: 'C', text: '递归调用会占用大量栈空间' },
      { id: 'D', text: '递归函数必须有返回值' }
    ],
    correctAnswer: 'D',
    explanation: '递归函数可以有返回值（如阶乘），也可以没有返回值（如打印数字）。递归的关键是：1) 调用自身 2) 有终止条件 3) 每次调用使问题规模减小。',
    difficulty: 2,
    knowledgePoints: ['递归', '终止条件', '栈'],
    hint: '递归不一定有返回值'
  },
  {
    id: 9038,
    chapter: 'basics-test',
    type: 'choice',
    title: 'main 函数的正确返回类型是？',
    description: 'main函数',
    options: [
      { id: 'A', text: 'void' },
      { id: 'B', text: 'int' },
      { id: 'C', text: 'char' },
      { id: 'D', text: 'float' }
    ],
    correctAnswer: 'B',
    explanation: 'main 函数的正确返回类型是 int，表示程序退出状态。返回 0 表示正常退出，非零表示异常退出。void main() 不是标准写法。',
    difficulty: 1,
    knowledgePoints: ['main', '程序入口', '返回状态'],
    hint: 'main 返回 int 表示退出状态'
  },
  // ===== 基础测试 - 数组 =====
  {
    id: 9041,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是正确的数组定义？',
    description: '数组定义',
    options: [
      { id: 'A', text: 'int arr[3] = {1, 2, 3, 4};' },
      { id: 'B', text: 'int arr[] = {1, 2, 3};' },
      { id: 'C', text: 'int arr[3] = (1, 2, 3);' },
      { id: 'D', text: 'int arr = {1, 2, 3};' }
    ],
    correctAnswer: 'B',
    explanation: '数组定义使用方括号 []，初始化可以使用大括号 {}。int arr[] = {1, 2, 3} 会自动推断数组大小为3。',
    difficulty: 1,
    knowledgePoints: ['数组定义', '初始化', '大括号'],
    hint: '数组用[]，初始化用{}',
    visualization: { type: 'html', file: 'visualizations-v2/array-param-decay.html' }
  },
  {
    id: 9042,
    chapter: 'basics-test',
    type: 'choice',
    title: '数组 arr[5] 的有效下标范围是？',
    description: '数组下标',
    options: [
      { id: 'A', text: '0~5' },
      { id: 'B', text: '1~5' },
      { id: 'C', text: '0~4' },
      { id: 'D', text: '1~4' }
    ],
    correctAnswer: 'C',
    explanation: 'C语言数组下标从0开始，所以 arr[5] 有5个元素，下标范围是 0~4。arr[5] 是错误的访问。',
    difficulty: 1,
    knowledgePoints: ['数组下标', '从0开始'],
    hint: '数组下标从0开始',
    visualization: { type: 'html', file: 'visualizations-v2/array-out-of-bounds.html' }
  },
  {
    id: 9043,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是字符数组的正确初始化方式？',
    description: '字符数组',
    options: [
      { id: 'A', text: 'char str[5] = "hello";' },
      { id: 'B', text: 'char str[] = "hello";' },
      { id: 'C', text: 'char str = "hello";' },
      { id: 'D', text: 'char str(5) = "hello";' }
    ],
    correctAnswer: 'B',
    explanation: 'char str[] = "hello" 会创建一个包含6个元素的数组（5个字符 + 1个字符串结束符 \\0）。如果指定大小，必须至少为6。',
    difficulty: 1,
    knowledgePoints: ['字符数组', '字符串结束符', '\\0'],
    hint: '字符串以\\0结尾',
    visualization: { type: 'html', file: 'visualizations-v2/string-array-init.html' }
  },
  {
    id: 9044,
    chapter: 'basics-test',
    type: 'choice',
    title: 'sizeof(arr) 和 sizeof(arr[0]) 的关系是？',
    description: 'sizeof 运算符',
    options: [
      { id: 'A', text: '前者是后者的1倍' },
      { id: 'B', text: '前者是后者的 n 倍（n为数组长度）' },
      { id: 'C', text: '两者相等' },
      { id: 'D', text: '无法确定关系' }
    ],
    correctAnswer: 'B',
    explanation: 'sizeof(arr) 返回整个数组的字节数，sizeof(arr[0]) 返回第一个元素的字节数。数组长度 = sizeof(arr) / sizeof(arr[0])。',
    difficulty: 2,
    knowledgePoints: ['sizeof', '数组大小', '字节'],
    hint: '总大小 / 单个元素大小 = 元素个数'
  },
  {
    id: 9045,
    chapter: 'basics-test',
    type: 'choice',
    title: '二维数组 arr[3][4] 的第一维大小是？',
    description: '二维数组',
    options: [
      { id: 'A', text: '3' },
      { id: 'B', text: '4' },
      { id: 'C', text: '12' },
      { id: 'D', text: '7' }
    ],
    correctAnswer: 'A',
    explanation: 'arr[3][4] 表示3行4列的二维数组。第一维是行数（3），第二维是列数（4）。总元素个数 = 3 * 4 = 12。',
    difficulty: 1,
    knowledgePoints: ['二维数组', '行列', '维度'],
    hint: '第一维是行数'
  },
  {
    id: 9046,
    chapter: 'basics-test',
    type: 'choice',
    title: '数组名作为参数传递时，实际传递的是？',
    description: '数组参数传递',
    options: [
      { id: 'A', text: '整个数组的副本' },
      { id: 'B', text: '数组的首地址（指针）' },
      { id: 'C', text: '什么也不传递' },
      { id: 'D', text: '数组的长度信息' }
    ],
    correctAnswer: 'B',
    explanation: '数组名作为函数参数时，会退化为指向首元素的指针。函数内无法通过 sizeof 获取数组真实大小。',
    difficulty: 2,
    knowledgePoints: ['数组退化为指针', '函数参数', '指针'],
    hint: '数组名 = 指针',
    visualization: { type: 'html', file: 'pointer-array-relation.html' }
  },
  {
    id: 9047,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是访问二维数组的正确方式？',
    description: '二维数组访问',
    options: [
      { id: 'A', text: 'arr[3, 4]' },
      { id: 'B', text: 'arr[3][4]' },
      { id: 'C', text: 'arr(3, 4)' },
      { id: 'D', text: 'arr[3, 4]' }
    ],
    correctAnswer: 'B',
    explanation: '二维数组使用两个方括号访问，如 arr[2][1] 表示第3行第2列的元素。',
    difficulty: 1,
    knowledgePoints: ['二维数组访问', '行列下标'],
    hint: '需要两对[]'
  },
  {
    id: 9048,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是数组初始化的正确方式？',
    description: '数组初始化',
    options: [
      { id: 'A', text: 'int arr[5] = {1, 2, 3};' },
      { id: 'B', text: 'int arr[5] = {0};' },
      { id: 'C', text: 'int arr[] = {1, 2, 3, 4, 5};' },
      { id: 'D', text: 'int arr[5]; arr = {1, 2, 3, 4, 5};' }
    ],
    correctAnswer: 'D',
    explanation: '数组不能整体赋值。int arr[5]; arr = {1,2,3,4,5} 是错误的。必须逐个元素赋值或初始化。',
    difficulty: 2,
    knowledgePoints: ['数组初始化', '整体赋值'],
    hint: '数组不能整体赋值'
  },
  // ===== 基础测试 - 指针 =====
  {
    id: 9051,
    chapter: 'basics-test',
    type: 'choice',
    title: '指针变量用来存储什么？',
    description: '指针基础',
    options: [
      { id: 'A', text: '变量的值' },
      { id: 'B', text: '变量的地址' },
      { id: 'C', text: '变量的类型' },
      { id: 'D', text: '变量的大小' }
    ],
    correctAnswer: 'B',
    explanation: '指针是一种特殊变量，用来存储另一个变量的内存地址。通过 & 操作符可以获取变量地址，通过 * 操作符可以解引用获取地址处的值。',
    difficulty: 1,
    knowledgePoints: ['指针', '地址', '&和*'],
    hint: '指针存储的是地址',
    visualization: { type: 'html', file: 'visualizations-v2/pointer-basics.html' }
  },
  {
    id: 9052,
    chapter: 'basics-test',
    type: 'choice',
    title: 'int *p; 中的 * 的作用是？',
    description: '指针声明',
    options: [
      { id: 'A', text: '乘法运算符' },
      { id: 'B', text: '表示 p 是一个指针' },
      { id: 'C', text: '取地址运算符' },
      { id: 'D', text: '解引用运算符' }
    ],
    correctAnswer: 'B',
    explanation: '在变量声明中，* 表示该变量是一个指针。在使用时，* 是解引用运算符，& 是取地址运算符。',
    difficulty: 1,
    knowledgePoints: ['指针声明', '*符号意义'],
    hint: '声明时*表示指针类型'
  },
  {
    id: 9053,
    chapter: 'basics-test',
    type: 'choice',
    title: 'NULL 指针的特点是？',
    description: 'NULL指针',
    options: [
      { id: 'A', text: '指向内存地址0' },
      { id: 'B', text: '指向有效的内存地址' },
      { id: 'C', text: '是空悬指针' },
      { id: 'D', text: '不需要检查' }
    ],
    correctAnswer: 'A',
    explanation: 'NULL 是值为0的指针，表示"空地址"。解引用 NULL 指针会导致段错误。使用指针前应该检查是否为 NULL。',
    difficulty: 1,
    knowledgePoints: ['NULL', '空指针', '段错误'],
    hint: 'NULL = 地址0',
    visualization: { type: 'html', file: 'visualizations-v2/null-pointer-viz.html' }
  },
  {
    id: 9054,
    chapter: 'basics-test',
    type: 'choice',
    title: 'int arr[5]; 和 int *p; 的关系是？',
    description: '数组和指针',
    options: [
      { id: 'A', text: '两者没有任何关系' },
      { id: 'B', text: 'arr 和 &arr[0] 等价' },
      { id: 'C', text: 'arr 是常量指针，不能赋值' },
      { id: 'D', text: 'arr 和 p 类型完全相同' }
    ],
    correctAnswer: 'B',
    explanation: '数组名 arr 在大多数情况下会退化为指针，等价于 &arr[0]（首元素地址）。但 arr 是常量，不能赋值；p 是变量，可以重新赋值。',
    difficulty: 2,
    knowledgePoints: ['数组名退化', '常量指针', '&arr[0]'],
    hint: '数组名 = 首地址',
    visualization: { type: 'html', file: 'visualizations-v2/array-name-pointer.html' }
  },
  {
    id: 9055,
    chapter: 'basics-test',
    type: 'choice',
    title: 'p++ 使指针移动多少字节？',
    description: '指针运算',
    options: [
      { id: 'A', text: '1 字节' },
      { id: 'B', text: '4 字节' },
      { id: 'C', text: '指针所指向类型的大小' },
      { id: 'D', text: '不确定' }
    ],
    correctAnswer: 'C',
    explanation: '指针运算的单位是指向类型的大小。int *p，p++ 会移动 sizeof(int) 个字节（通常是4字节）。char *p，p++ 移动1字节。',
    difficulty: 2,
    knowledgePoints: ['指针运算', '步长', 'sizeof'],
    hint: '移动"一个元素"的大小',
    visualization: { type: 'html', file: 'visualizations-v2/pointer-arithmetic.html' }
  },
  {
    id: 9056,
    chapter: 'basics-test',
    type: 'choice',
    title: '野指针通常是指？',
    description: '野指针概念',
    options: [
      { id: 'A', text: '指向 NULL 的指针' },
      { id: 'B', text: '未初始化或已释放的指针' },
      { id: 'C', text: '指向常量的指针' },
      { id: 'D', text: '空指针' }
    ],
    correctAnswer: 'B',
    explanation: '野指针是未初始化或已释放（但仍访问）的指针，可能指向任意内存。使用野指针会导致未定义行为。避免野指针：初始化为NULL，释放后置NULL。',
    difficulty: 2,
    knowledgePoints: ['野指针', '内存管理', '悬空指针'],
    hint: '野 = 不确定/危险'
  },
  {
    id: 9057,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是取地址运算符？',
    description: '地址运算符',
    options: [
      { id: 'A', text: '*' },
      { id: 'B', text: '&' },
      { id: 'C', text: '#' },
      { id: 'D', text: '@' }
    ],
    correctAnswer: 'B',
    explanation: '& 是取地址运算符，获取变量的内存地址。* 是解引用运算符，通过地址访问对应内存的值。',
    difficulty: 1,
    knowledgePoints: ['&', '*', '地址'],
    hint: '& = 取地址，* = 取值'
  },
  {
    id: 9058,
    chapter: 'basics-test',
    type: 'choice',
    title: '指针 p 和指针 *p 的区别是？',
    description: '指针解引用',
    options: [
      { id: 'A', text: '两者没有区别' },
      { id: 'B', text: 'p 是地址，*p 是地址处的值' },
      { id: 'C', text: '*p 是地址，p 是地址处的值' },
      { id: 'D', text: 'p 是变量名，*p 是解引用' }
    ],
    correctAnswer: 'B',
    explanation: 'p 是指针变量，存储地址。*p 是对指针解引用，表示访问该地址处存储的值。',
    difficulty: 1,
    knowledgePoints: ['解引用', '指针值vs解引用值'],
    hint: '*p = 访问地址处的值'
  },
  // ===== 基础测试 - 字符串 =====
  {
    id: 9061,
    chapter: 'basics-test',
    type: 'choice',
    title: '字符串常量 "hello" 在内存中占多少字节？',
    description: '字符串存储',
    options: [
      { id: 'A', text: '5 字节' },
      { id: 'B', text: '6 字节' },
      { id: 'C', text: '7 字节' },
      { id: 'D', text: '不确定' }
    ],
    correctAnswer: 'B',
    explanation: '字符串常量 "hello" 包含5个字符，加上字符串结束符 \\0，共6字节。',
    difficulty: 1,
    knowledgePoints: ['字符串', '结束符', '\\0'],
    hint: '别忘了\\0',
    visualization: { type: 'html', file: 'string-memory-layout.html' }
  },
  {
    id: 9062,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个函数可以获取字符串长度？',
    description: '字符串函数',
    options: [
      { id: 'A', text: 'strlen()' },
      { id: 'B', text: 'strsize()' },
      { id: 'C', text: 'sizeof()' },
      { id: 'D', text: 'length()' }
    ],
    correctAnswer: 'A',
    explanation: 'strlen() 是C语言标准库函数，用于获取字符串长度（不包括结束符\\0）。',
    difficulty: 1,
    knowledgePoints: ['strlen', '字符串长度'],
    hint: '标准库函数',
    visualization: { type: 'html', file: 'visualizations-v2/strlen-vs-sizeof.html' }
  },
  {
    id: 9063,
    chapter: 'basics-test',
    type: 'choice',
    title: 'strcmp(s1, s2) 返回 0 表示？',
    description: '字符串比较',
    options: [
      { id: 'A', text: 's1 > s2' },
      { id: 'B', text: 's1 < s2' },
      { id: 'C', text: 's1 等于 s2' },
      { id: 'D', text: '比较出错' }
    ],
    correctAnswer: 'C',
    explanation: 'strcmp() 返回0表示两个字符串相等。正数表示 s1 > s2，负数表示 s1 < s2。',
    difficulty: 1,
    knowledgePoints: ['strcmp', '字符串比较'],
    hint: '0 = 相等',
    visualization: { type: 'html', file: 'visualizations-v2/strcmp-compare.html' }
  },
  {
    id: 9064,
    chapter: 'basics-test',
    type: 'choice',
    title: 'strcpy(dst, src) 的作用是？',
    description: '字符串复制',
    options: [
      { id: 'A', text: '比较两个字符串' },
      { id: 'B', text: '复制 src 到 dst' },
      { id: 'C', text: '连接两个字符串' },
      { id: 'D', text: '获取字符串长度' }
    ],
    correctAnswer: 'B',
    explanation: 'strcpy(dst, src) 将 src 字符串复制到 dst。注意：dst 必须有足够空间！',
    difficulty: 1,
    knowledgePoints: ['strcpy', '字符串复制'],
    hint: 'cpy = copy 复制',
    visualization: { type: 'html', file: 'visualizations-v2/strcpy-memory.html' }
  },
  {
    id: 9065,
    chapter: 'basics-test',
    type: 'choice',
    title: "下面哪个是字符 'A' 的 ASCII 值？",
    description: 'ASCII码',
    options: [
      { id: 'A', text: '64' },
      { id: 'B', text: '65' },
      { id: 'C', text: '66' },
      { id: 'D', text: '97' }
    ],
    correctAnswer: 'B',
    explanation: '大写字母 A 的 ASCII 值是 65。小写字母 a 的 ASCII 值是 97。',
    difficulty: 1,
    knowledgePoints: ['ASCII', '字符编码'],
    hint: 'A=65, a=97'
  },
  {
    id: 9066,
    chapter: 'basics-test',
    type: 'choice',
    title: 'gets() 函数的危险是？',
    description: '字符串安全',
    options: [
      { id: 'A', text: '速度太慢' },
      { id: 'B', text: '可能导致缓冲区溢出' },
      { id: 'C', text: '不能处理中文字符' },
      { id: 'D', text: '会导致内存泄漏' }
    ],
    correctAnswer: 'B',
    explanation: 'gets() 不检查缓冲区大小，可能导致缓冲区溢出攻击。C11 已移除 gets()。应使用 fgets() 替代。',
    difficulty: 2,
    knowledgePoints: ['gets', '缓冲区溢出', '安全'],
    hint: 'gets没有边界检查'
  },
  {
    id: 9067,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是字符数组和字符串的主要区别？',
    description: '字符数组 vs 字符串',
    options: [
      { id: 'A', text: '字符数组以 \\0 结尾，字符串不以 \\0 结尾' },
      { id: 'B', text: '字符数组不一定以 \\0 结尾，字符串以 \\0 结尾' },
      { id: 'C', text: '两者完全相同' },
      { id: 'D', text: '字符数组只能存字符，字符串可以存任何数据' }
    ],
    correctAnswer: 'B',
    explanation: "C语言中就是以，字符串本质 \\0 结尾的字符数组。但字符数组不一定以 \\0 结尾（如 char buf[3] = {'a', 'b', 'c'}）。",
    difficulty: 2,
    knowledgePoints: ['字符数组', '字符串', '\\0'],
    hint: '字符串 = 以\\0结尾的字符数组'
  },
  {
    id: 9068,
    chapter: 'basics-test',
    type: 'choice',
    title: 'sprintf() 和 printf() 的区别是？',
    description: 'sprintf函数',
    options: [
      { id: 'A', text: '两者没有区别' },
      { id: 'B', text: 'sprintf 输出到字符串，printf 输出到终端' },
      { id: 'C', text: 'printf 输出到字符串，sprintf 输出到终端' },
      { id: 'D', text: 'sprintf 不能格式化输出' }
    ],
    correctAnswer: 'B',
    explanation: 'sprintf() 将格式化内容输出到字符数组（字符串），而不是终端。常用于拼接字符串。',
    difficulty: 2,
    knowledgePoints: ['sprintf', '字符串格式化'],
    hint: 'sprintf = string + print'
  },
  // ===== 基础测试 - 结构体 =====
  {
    id: 9071,
    chapter: 'basics-test',
    type: 'choice',
    title: '结构体 struct 的主要作用是？',
    description: '结构体概念',
    options: [
      { id: 'A', text: '存储多个相同类型的数据' },
      { id: 'B', text: '存储多个不同类型的数据' },
      { id: 'C', text: '创建新的数据类型' },
      { id: 'D', text: '定义函数' }
    ],
    correctAnswer: 'B',
    explanation: '结构体是一种复合数据类型，可以将不同类型的数据组合成一个整体。数组是相同类型数据的集合。',
    difficulty: 1,
    knowledgePoints: ['结构体', '复合类型'],
    hint: '不同类型数据打包',
    visualization: { type: 'html', file: 'visualizations-v2/struct-basic.html' }
  },
  {
    id: 9072,
    chapter: 'basics-test',
    type: 'choice',
    title: '访问结构体成员使用哪个运算符？',
    description: '结构体成员访问',
    options: [
      { id: 'A', text: ". (点运算符)" },
      { id: 'B', text: "-> (箭头运算符)" },
      { id: 'C', text: "* (星号)" },
      { id: 'D', text: "& (取地址)" }
    ],
    correctAnswer: 'A',
    explanation: '结构体变量使用 . 访问成员（如 p.name），结构体指针使用 -> 访问成员（如 p->name）。',
    difficulty: 1,
    knowledgePoints: ['结构体成员', '.和->'],
    hint: '变量用.，指针用->',
    visualization: { type: 'html', file: 'visualizations-v2/struct-pointer.html' }
  },
  {
    id: 9073,
    chapter: 'basics-test',
    type: 'choice',
    title: '结构体指针访问成员应该用？',
    description: '指针访问结构体',
    options: [
      { id: 'A', text: "p.member" },
      { id: 'B', text: "p->member" },
      { id: 'C', text: "*p.member" },
      { id: 'D', text: "&p.member" }
    ],
    correctAnswer: 'B',
    explanation: '结构体指针使用 -> 运算符访问成员，等价于 (*p).member，但更简洁。',
    difficulty: 1,
    knowledgePoints: ['->运算符', '指针访问'],
    hint: '-> 是 (*p). 的简写'
  },
  {
    id: 9074,
    chapter: 'basics-test',
    type: 'choice',
    title: '结构体变量的大小等于各成员大小之和吗？',
    description: '结构体内存对齐',
    options: [
      { id: 'A', text: '总是等于' },
      { id: 'B', text: '通常大于（由于内存对齐）' },
      { id: 'C', text: '通常小于' },
      { id: 'D', text: '不确定' }
    ],
    correctAnswer: 'B',
    explanation: '由于内存对齐，结构体大小通常大于各成员大小之和。使用 #pragma pack 可以改变对齐方式。',
    difficulty: 2,
    knowledgePoints: ['内存对齐', '结构体大小'],
    hint: '存在对齐padding',
    visualization: { type: 'html', file: 'visualizations-v2/struct-alignment.html' }
  },
  {
    id: 9075,
    chapter: 'basics-test',
    type: 'choice',
    title: 'typedef 的作用是？',
    description: 'typedef用法',
    options: [
      { id: 'A', text: '定义新的结构体' },
      { id: 'B', text: '为现有类型创建别名' },
      { id: 'C', text: '声明结构体变量' },
      { id: 'D', text: '分配内存' }
    ],
    correctAnswer: 'B',
    explanation: 'typedef 用于为现有类型创建别名，使代码更简洁。如 typedef unsigned int uint;',
    difficulty: 1,
    knowledgePoints: ['typedef', '类型别名'],
    hint: '给类型起小名'
  },
  {
    id: 9076,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是结构体的合法定义方式？',
    description: '结构体定义',
    options: [
      { id: 'A', text: 'struct Point { int x; int y; };' },
      { id: 'B', text: 'typedef struct { int x; int y; } Point;' },
      { id: 'C', text: 'struct Point { int x; int y; } p1, p2;' },
      { id: 'D', text: 'struct Point { int x; int y; }; Point p1;' }
    ],
    correctAnswer: 'D',
    explanation: '定义了 struct Point 后，使用时必须写 struct Point，不能只写 Point（除非用了 typedef）。',
    difficulty: 2,
    knowledgePoints: ['struct定义', 'typedef'],
    hint: 'typedef可以简化'
  },
  // ===== 基础测试 - 预处理 =====
  {
    id: 9081,
    chapter: 'basics-test',
    type: 'choice',
    title: '#define 的作用是？',
    description: '宏定义',
    options: [
      { id: 'A', text: '声明常量' },
      { id: 'B', text: '定义宏（文本替换）' },
      { id: 'C', text: '定义函数' },
      { id: 'D', text: '包含头文件' }
    ],
    correctAnswer: 'B',
    explanation: '#define 用于定义宏，在预处理阶段进行文本替换。可以定义常量，也可以定义带参数的宏函数。',
    difficulty: 1,
    knowledgePoints: ['宏定义', '预处理', '文本替换'],
    hint: '预处理阶段替换',
    visualization: { type: 'html', file: 'visualizations-v2/macro-definition.html' }
  },
  {
    id: 9082,
    chapter: 'basics-test',
    type: 'choice',
    title: '#include <stdio.h> 和 #include "my.h" 的区别是？',
    description: '头文件包含',
    options: [
      { id: 'A', text: '两者没有区别' },
      { id: 'B', text: '<> 搜索系统目录，" " 搜索当前目录' },
      { id: 'C', text: '" " 搜索系统目录，<> 搜索当前目录' },
      { id: 'D', text: '<> 用于C++，" " 用于C' }
    ],
    correctAnswer: 'B',
    explanation: '<stdio.h> 用尖括号，编译器在系统头文件目录搜索。"my.h" 用双引号，先在当前目录搜索，找不到再搜索系统目录。',
    difficulty: 1,
    knowledgePoints: ['#include', '头文件搜索'],
    hint: '双引号先搜当前目录'
  },
  {
    id: 9083,
    chapter: 'basics-test',
    type: 'choice',
    title: '#ifdef 的作用是？',
    description: '条件编译',
    options: [
      { id: 'A', text: '定义一个函数' },
      { id: 'B', text: '如果定义了某个宏，则编译代码块' },
      { id: 'C', text: '取消定义宏' },
      { id: 'D', text: '包含头文件' }
    ],
    correctAnswer: 'B',
    explanation: '#ifdef 用于条件编译，如果定义了指定的宏，则编译后面的代码块。常用于防止重复包含头文件。',
    difficulty: 1,
    knowledgePoints: ['条件编译', '#ifdef'],
    hint: 'ifdef = if defined',
    visualization: { type: 'html', file: 'visualizations-v2/conditional-compilation.html' }
  },
  {
    id: 9084,
    chapter: 'basics-test',
    type: 'choice',
    title: '宏函数 #define MAX(a,b) ((a)>(b)?(a):(b)) 的问题是？',
    description: '宏副作用',
    options: [
      { id: 'A', text: '没有问题' },
      { id: 'B', text: '参数可能被多次求值' },
      { id: 'C', text: '不能比较大小' },
      { id: 'D', text: '返回值类型错误' }
    ],
    correctAnswer: 'B',
    explanation: '宏参数会被直接替换，可能导致副作用。如 MAX(i++, j++) 会使较大的值被递增两次。应使用内联函数替代。',
    difficulty: 2,
    knowledgePoints: ['宏副作用', '内联函数'],
    hint: '小心 ++/-- 在宏中'
  },
  {
    id: 9085,
    chapter: 'basics-test',
    type: 'choice',
    title: '#ifndef 的作用是？',
    description: '防止重复包含',
    options: [
      { id: 'A', text: '如果没定义某个宏，则编译代码' },
      { id: 'B', text: '定义一个宏' },
      { id: 'C', text: '结束条件编译' },
      { id: 'D', text: '取消宏定义' }
    ],
    correctAnswer: 'A',
    explanation: '#ifndef = if not defined，常用于防止头文件重复包含：#ifndef HEADER_H #define HEADER_H ... #endif',
    difficulty: 1,
    knowledgePoints: ['#ifndef', '防止重包含'],
    hint: '配合#ifndef防重'
  },
  // ===== 基础测试 - 内存管理 =====
  {
    id: 9091,
    chapter: 'basics-test',
    type: 'choice',
    title: 'malloc(100) 返回什么？',
    description: '动态内存分配',
    options: [
      { id: 'A', text: '100字节的数组' },
      { id: 'B', text: '指向100字节内存的指针' },
      { id: 'C', text: '整数值100' },
      { id: 'D', text: '指向int类型数组的指针' }
    ],
    correctAnswer: 'B',
    explanation: 'malloc(size) 分配指定字节的内存，返回 void* 类型的指针。使用前需要进行类型转换。',
    difficulty: 1,
    knowledgePoints: ['malloc', '动态内存'],
    hint: 'malloc返回指针',
    visualization: { type: 'html', file: 'visualizations-v2/stack-heap-memory.html' }
  },
  {
    id: 9092,
    chapter: 'basics-test',
    type: 'choice',
    title: 'malloc 分配内存失败时返回？',
    description: '内存分配失败',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: 'NULL' },
      { id: 'C', text: '-1' },
      { id: 'D', text: '随机地址' }
    ],
    correctAnswer: 'B',
    explanation: 'malloc 分配失败返回 NULL。分配内存后必须检查返回值是否为 NULL。',
    difficulty: 1,
    knowledgePoints: ['malloc', 'NULL检查'],
    hint: 'malloc可能失败'
  },
  {
    id: 9093,
    chapter: 'basics-test',
    type: 'choice',
    title: 'free(p) 后，指针 p 应该？',
    description: '内存释放',
    options: [
      { id: 'A', text: '保持不变' },
      { id: 'B', text: '置为 NULL' },
      { id: 'C', text: '指向随机地址' },
      { id: 'D', text: '自动释放' }
    ],
    correctAnswer: 'B',
    explanation: 'free 后指针仍指向原地址（悬空指针），应置为 NULL 避免误用。使用已释放的内存是未定义行为。',
    difficulty: 2,
    knowledgePoints: ['free', '悬空指针'],
    hint: 'free后要置NULL',
    visualization: { type: 'html', file: 'visualizations-v2/dangling-pointer.html' }
  },
  {
    id: 9094,
    chapter: 'basics-test',
    type: 'choice',
    title: 'calloc 和 malloc 的区别是？',
    description: 'calloc vs malloc',
    options: [
      { id: 'A', text: '没有区别' },
      { id: 'B', text: 'calloc 会初始化为0，malloc 不初始化' },
      { id: 'C', text: 'malloc 更快' },
      { id: 'D', text: 'calloc 不能分配大内存' }
    ],
    correctAnswer: 'B',
    explanation: 'calloc(num, size) 分配内存并初始化为0。malloc(size) 分配后内容是未定义的。',
    difficulty: 2,
    knowledgePoints: ['calloc', 'malloc', '初始化'],
    hint: 'calloc = clear + alloc'
  },
  {
    id: 9095,
    chapter: 'basics-test',
    type: 'choice',
    title: '内存泄漏是指？',
    description: '内存泄漏概念',
    options: [
      { id: 'A', text: '内存被病毒攻击' },
      { id: 'B', text: '分配的内存无法再访问但未释放' },
      { id: 'C', text: '内存访问越界' },
      { id: 'D', text: '内存不足' }
    ],
    correctAnswer: 'B',
    explanation: '内存泄漏是动态分配的内存不再使用时没有释放，导致程序占用内存越来越多。长期运行程序尤其要注意。',
    difficulty: 2,
    knowledgePoints: ['内存泄漏', '资源管理'],
    hint: '忘记free导致'
  },
  {
    id: 9096,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个会导致栈溢出？',
    description: '栈溢出',
    options: [
      { id: 'A', text: 'malloc 分配太大内存' },
      { id: 'B', text: '递归调用太深' },
      { id: 'C', text: 'free 太多' },
      { id: 'D', text: '全局变量太多' }
    ],
    correctAnswer: 'B',
    explanation: '递归调用太深会消耗大量栈空间，导致栈溢出。malloc 在堆上分配，不会导致栈溢出。',
    difficulty: 2,
    knowledgePoints: ['栈溢出', '递归'],
    hint: '递归太深用栈'
  },
  // ===== 基础测试 - 嵌入式基础 =====
  {
    id: 9101,
    chapter: 'basics-test',
    type: 'choice',
    title: '嵌入式开发中，uint8_t 类型通常用于？',
    description: '嵌入式数据类型',
    options: [
      { id: 'A', text: '存储大数值' },
      { id: 'B', text: '存储字符或计数器' },
      { id: 'C', text: '存储浮点数' },
      { id: 'D', text: '存储指针地址' }
    ],
    correctAnswer: 'B',
    explanation: 'uint8_t 是8位无符号整数，范围0-255。常用于存储字符、传感器数据、计数器等。嵌入式开发中为保证可移植性，使用stdint.h中的固定宽度类型。',
    difficulty: 1,
    knowledgePoints: ['uint8_t', '嵌入式类型', 'stdint'],
    hint: '8位 = 1字节',
    visualization: { type: 'html', file: 'uint8-type.html' }
  },
  {
    id: 9102,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个关键字用于防止编译器优化？',
    description: 'volatile关键字',
    options: [
      { id: 'A', text: 'static' },
      { id: 'B', text: 'volatile' },
      { id: 'C', text: 'const' },
      { id: 'D', text: 'extern' }
    ],
    correctAnswer: 'B',
    explanation: 'volatile 告诉编译器该变量可能被意外修改，不要优化。每次访问都要从内存读取，不能使用寄存器缓存的值。用于寄存器映射、外设变量、中断共享变量。',
    difficulty: 1,
    knowledgePoints: ['volatile', '编译器优化', '外设'],
    hint: 'volatile = 防止优化',
    visualization: { type: 'html', file: 'visualizations-v2/volatile-keyword.html' }
  },
  {
    id: 9103,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是STM32开发常用调试方式？',
    description: '嵌入式调试',
    options: [
      { id: 'A', text: 'printf 输出到串口' },
      { id: 'B', text: 'GDB 调试器' },
      { id: 'C', text: 'J-Link/ ST-Link 调试' },
      { id: 'D', text: 'printk 内核日志' }
    ],
    correctAnswer: 'D',
    explanation: 'printk 是Linux内核函数，用于驱动开发。STM32是裸机/RTOS开发，常用调试方式：串口printf、SWD/J-Link调试、LED闪烁、逻辑分析仪等。',
    difficulty: 2,
    knowledgePoints: ['STM32', '调试方式', '嵌入式'],
    hint: 'printk是Linux内核的'
  },
  {
    id: 9104,
    chapter: 'basics-test',
    type: 'choice',
    title: '位运算 (1 << 3) 的结果是？',
    description: '位运算',
    options: [
      { id: 'A', text: '1' },
      { id: 'B', text: '3' },
      { id: 'C', text: '8' },
      { id: 'D', text: '4' }
    ],
    correctAnswer: 'C',
    explanation: '<< 是左移运算符，将二进制位向左移动。1 << 3 表示将1向左移动3位，等于二进制1000，即十进制8。',
    difficulty: 1,
    knowledgePoints: ['左移运算', '位运算'],
    hint: '左移n位 = 乘以2^n',
    visualization: { type: 'html', file: 'visualizations-v2/left-shift-multiplication.html' }
  },
  {
    id: 9105,
    chapter: 'basics-test',
    type: 'choice',
    title: '要设置寄存器某一位为1，应该使用哪个运算符？',
    description: '位操作',
    options: [
      { id: 'A', text: '& (与)' },
      { id: 'B', text: '| (或)' },
      { id: 'C', text: '^ (异或)' },
      { id: 'D', text: '~ (取反)' }
    ],
    correctAnswer: 'B',
    explanation: '使用 OR(|) 运算可以设置某位为1。如 REG |= (1 << 3) 将第3位设置为1。使用 AND(&) 可以清除某位。',
    difficulty: 1,
    knowledgePoints: ['位或', '寄存器操作', '置位'],
    hint: '或运算置1'
  },
  {
    id: 9106,
    chapter: 'basics-test',
    type: 'choice',
    title: '要清除寄存器某一位为0，应该使用哪个运算符？',
    description: '位操作',
    options: [
      { id: 'A', text: '& (与)' },
      { id: 'B', text: '| (或)' },
      { id: 'C', text: '^ (异或)' },
      { id: 'D', text: '+ (加)' }
    ],
    correctAnswer: 'A',
    explanation: '使用 AND(&) 运算配合取反可以清除某位。如 REG &= ~(1 << 3) 将第3位清除为0。',
    difficulty: 1,
    knowledgePoints: ['位与', '寄存器操作', '清零'],
    hint: '与运算清0',
    visualization: { type: 'html', file: 'visualizations-v2/bit-clear-operation.html' }
  },
  {
    id: 9107,
    chapter: 'basics-test',
    type: 'choice',
    title: '#define LED_ON() do { GPIOA->ODR |= (1<<5); } while(0) 的好处是？',
    description: '宏定义技巧',
    options: [
      { id: 'A', text: '代码更简洁' },
      { id: 'B', text: '避免宏展开问题' },
      { id: 'C', text: '减少内存占用' },
      { id: 'D', text: '提高运行速度' }
    ],
    correctAnswer: 'B',
    explanation: 'do { } while(0) 确保宏像函数一样使用，避免分号和if/else配对问题。如 LED_ON(); 展开后是 do { ... } while(0); 正确执行。',
    difficulty: 2,
    knowledgePoints: ['do-while-0', '宏技巧', '嵌入式'],
    hint: '防止宏展开出错'
  },
  {
    id: 9108,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是合法的C语句结束符？',
    description: '语句结束',
    options: [
      { id: 'A', text: ';' },
      { id: 'B', text: '}' },
      { id: 'C', text: ':' },
      { id: 'D', text: '换行' }
    ],
    correctAnswer: 'C',
    explanation: 'C语言语句以分号 ; 结束。} 是语句块结束，: 是switch/case和标签使用的。',
    difficulty: 1,
    knowledgePoints: ['语句结束', '分号'],
    hint: '分号才是结束符'
  },
  {
    id: 9109,
    chapter: 'basics-test',
    type: 'choice',
    title: '数组 int arr[10]; 的大小是？',
    description: '数组大小',
    options: [
      { id: 'A', text: '10字节' },
      { id: 'B', text: '40字节' },
      { id: 'C', text: '不确定' },
      { id: 'D', text: '80字节' }
    ],
    correctAnswer: 'B',
    explanation: 'int 通常是4字节。int arr[10] 包含10个int元素，总大小 = 10 * 4 = 40字节。',
    difficulty: 1,
    knowledgePoints: ['数组大小', 'sizeof', 'int大小'],
    hint: 'int通常是4字节'
  },
  {
    id: 9110,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是错误的变量名？',
    description: '变量命名',
    options: [
      { id: 'A', text: 'temp' },
      { id: 'B', text: '_temp' },
      { id: 'C', text: '2temp' },
      { id: 'D', text: 'temp_2' }
    ],
    correctAnswer: 'C',
    explanation: '变量名必须以字母或下划线开头，不能以数字开头。2temp 是错误的。',
    difficulty: 1,
    knowledgePoints: ['变量命名', '标识符规则'],
    hint: '数字不能开头'
  },
  // ===== 基础测试 - 编译链接 =====
  {
    id: 9121,
    chapter: 'basics-test',
    type: 'choice',
    title: '预处理阶段会处理哪个指令？',
    description: '预处理',
    options: [
      { id: 'A', text: '#include' },
      { id: 'B', text: 'int main()' },
      { id: 'C', text: 'printf()' },
      { id: 'D', text: 'return' }
    ],
    correctAnswer: 'A',
    explanation: '预处理阶段处理 #include、#define、#ifdef 等指令。编译阶段处理语法和语义分析。链接阶段合并目标文件。',
    difficulty: 1,
    knowledgePoints: ['预处理', '编译过程', '#include'],
    hint: '#开头的是预处理指令'
  },
  {
    id: 9122,
    chapter: 'basics-test',
    type: 'choice',
    title: '编译器的任务是？',
    description: '编译过程',
    options: [
      { id: 'A', text: '将C代码转换为可执行文件' },
      { id: 'B', text: '将C代码转换为汇编或机器码' },
      { id: 'C', text: '执行程序' },
      { id: 'D', text: '调试程序' }
    ],
    correctAnswer: 'B',
    explanation: '编译器将C源代码翻译成目标代码（汇编或机器码）。链接器将目标文件合并成可执行文件。',
    difficulty: 1,
    knowledgePoints: ['编译器', '编译过程'],
    hint: '编译器负责翻译'
  },
  {
    id: 9123,
    chapter: 'basics-test',
    type: 'choice',
    title: '链接器的作用是？',
    description: '链接过程',
    options: [
      { id: 'A', text: '检查语法错误' },
      { id: 'B', text: '合并多个目标文件' },
      { id: 'C', text: '生成机器码' },
      { id: 'D', text: '优化代码' }
    ],
    correctAnswer: 'B',
    explanation: '链接器将多个目标文件(.o)和库文件合并，解析符号地址，生成可执行文件。',
    difficulty: 1,
    knowledgePoints: ['链接器', '链接过程'],
    hint: '链接合并文件'
  },
  {
    id: 9124,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是标准C库函数？',
    description: '标准库',
    options: [
      { id: 'A', text: 'malloc' },
      { id: 'B', text: 'HAL_Delay' },
      { id: 'C', text: 'GPIO_Write' },
      { id: 'D', text: 'USART_Send' }
    ],
    correctAnswer: 'A',
    explanation: 'malloc 是标准C库函数。HAL_Delay、GPIO_Write、USART_Send 是STM32 HAL库函数，不是标准C库。',
    difficulty: 1,
    knowledgePoints: ['标准库', 'C库函数'],
    hint: 'malloc是标准库函数'
  },
  {
    id: 9125,
    chapter: 'basics-test',
    type: 'choice',
    title: 'extern 关键字的作用是？',
    description: 'extern用法',
    options: [
      { id: 'A', text: '定义变量' },
      { id: 'B', text: '声明变量（表示在别处定义）' },
      { id: 'C', text: '创建常量' },
      { id: 'D', text: '声明函数为内联' }
    ],
    correctAnswer: 'B',
    explanation: 'extern 用于声明变量，表示该变量在别的文件中定义。如 extern int global_var; 告诉编译器该变量在其他文件中。',
    difficulty: 2,
    knowledgePoints: ['extern', '多文件', '变量声明'],
    hint: 'extern是声明不是定义'
  },
  // ===== 基础测试 - 错误排查 =====
  {
    id: 9131,
    chapter: 'basics-test',
    type: 'choice',
    title: '编译报错 "undefined reference to..." 可能是什么原因？',
    description: '链接错误',
    options: [
      { id: 'A', text: '语法错误' },
      { id: 'B', text: '未定义函数/变量（链接时找不到）' },
      { id: 'C', text: '头文件未找到' },
      { id: 'D', text: '内存不足' }
    ],
    correctAnswer: 'B',
    explanation: '"undefined reference" 是链接错误，表示函数或变量声明了但没有实现，或没有链接对应的目标文件/库。',
    difficulty: 2,
    knowledgePoints: ['链接错误', 'undefined reference'],
    hint: '链接时找不到定义'
  },
  {
    id: 9132,
    chapter: 'basics-test',
    type: 'choice',
    title: '编译报错 "implicit declaration of function..." 意思是？',
    description: '编译警告',
    options: [
      { id: 'A', text: '函数未定义' },
      { id: 'B', text: '函数隐式声明（未看到函数原型）' },
      { id: 'C', text: '函数参数错误' },
      { id: 'D', text: '函数重复定义' }
    ],
    correctAnswer: 'B',
    explanation: '隐式声明表示编译器没看到函数原型（头文件或函数声明）。C90默认会假设返回int，C99后不允许。应包含头文件或添加函数声明。',
    difficulty: 2,
    knowledgePoints: ['隐式声明', '函数原型', '头文件'],
    hint: '缺少头文件或声明'
  },
  {
    id: 9133,
    chapter: 'basics-test',
    type: 'choice',
    title: '运行程序时闪退最可能的原因是？',
    description: '程序运行',
    options: [
      { id: 'A', text: '程序正常结束' },
      { id: 'B', text: '段错误/崩溃' },
      { id: 'C', text: '内存泄漏' },
      { id: 'D', text: '编译错误' }
    ],
    correctAnswer: 'B',
    explanation: 'Windows控制台程序运行完后会关闭窗口，看起来像闪退。可能原因：程序崩溃、return 0、执行完毕。在VC++中可加getchar()或Ctrl+F5调试。',
    difficulty: 1,
    knowledgePoints: ['程序退出', '闪退', '调试'],
    hint: '可能是崩溃或正常退出'
  },
  {
    id: 9134,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不会导致缓冲区溢出？',
    description: '安全问题',
    options: [
      { id: 'A', text: 'gets()' },
      { id: 'B', text: 'strcpy()' },
      { id: 'C', text: 'fgets()' },
      { id: 'D', text: 'strcat()' }
    ],
    correctAnswer: 'C',
    explanation: 'fgets() 指定了缓冲区大小，不会溢出。gets()无边界检查，strcpy/strcat不检查目标缓冲区大小，都可能导致溢出。',
    difficulty: 2,
    knowledgePoints: ['缓冲区溢出', '安全', 'fgets'],
    hint: 'fgets有边界检查'
  },
  // ===== 基础测试 - 代码风格 =====
  {
    id: 9141,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是错误的注释方式？',
    description: '注释',
    options: [
      { id: 'A', text: '// 单行注释' },
      { id: 'B', text: '/* 多行注释 */' },
      { id: 'C', text: '# 预处理注释' },
      { id: 'D', text: '/** 文档注释 */' }
    ],
    correctAnswer: 'C',
    explanation: 'C语言注释使用 // 和 /* */。# 不是注释符，是预处理指令开头。',
    difficulty: 1,
    knowledgePoints: ['注释', 'C语法'],
    hint: '#不是注释符'
  },
  {
    id: 9142,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个变量名最符合嵌入式编码规范？',
    description: '编码规范',
    options: [
      { id: 'A', text: 'Temp' },
      { id: 'B', text: 'temp' },
      { id: 'C', text: 'temperature' },
      { id: 'D', text: 'g_temperature' }
    ],
    correctAnswer: 'D',
    explanation: '嵌入式编码规范通常用前缀表示类型或作用域。如 g_ 表示全局变量，u32 表示uint32_t，temp 表示临时变量。',
    difficulty: 2,
    knowledgePoints: ['编码规范', '命名规则', '嵌入式'],
    hint: '嵌入式常用前缀'
  },
  {
    id: 9143,
    chapter: 'basics-test',
    type: 'choice',
    title: 'const int *p 和 int *const p 的区别是？',
    description: 'const指针',
    options: [
      { id: 'A', text: '没有区别' },
      { id: 'B', text: '前者指针指向常量，后者指针本身是常量' },
      { id: 'C', text: '前者指针是常量，后者指向常量' },
      { id: 'D', text: '两者都指向常量' }
    ],
    correctAnswer: 'B',
    explanation: 'const int *p = 常量指针（指向内容不可变）；int *const p = 指针常量（指针本身不可变）。记忆技巧：const在*前指向内容不可变，const在*后指针本身不可变。',
    difficulty: 2,
    knowledgePoints: ['const', '指针常量', '常量指针'],
    hint: 'const在*前指向内容，在*后指针'
  },
  // ===== 基础测试 - 嵌入式外设 =====
  {
    id: 9151,
    chapter: 'basics-test',
    type: 'choice',
    title: 'STM32GPIO配置为输出模式需要设置哪个寄存器？',
    description: 'GPIO配置',
    options: [
      { id: 'A', text: 'IDR' },
      { id: 'B', text: 'ODR' },
      { id: 'C', text: 'MODER' },
      { id: 'D', text: 'PUPDR' }
    ],
    correctAnswer: 'C',
    explanation: 'MODER寄存器用于配置GPIO模式（输入/输出/复用/模拟）。IDR是输入数据寄存器，ODR是输出数据寄存器，PUPDR是上拉/下拉寄存器。',
    difficulty: 2,
    knowledgePoints: ['GPIO', 'MODER', 'STM32'],
    hint: 'MODER = Mode Register'
  },
  {
    id: 9152,
    chapter: 'basics-test',
    type: 'choice',
    title: '嵌入式系统中，哪种存储介质掉电后数据会丢失？',
    description: '存储类型',
    options: [
      { id: 'A', text: 'Flash' },
      { id: 'B', text: 'EEPROM' },
      { id: 'C', text: 'SRAM' },
      { id: 'D', text: 'ROM' }
    ],
    correctAnswer: 'C',
    explanation: 'SRAM是易失性存储，掉电后数据丢失。Flash、EEPROM、ROM都是非易失性存储，掉电后数据保留。',
    difficulty: 1,
    knowledgePoints: ['SRAM', 'Flash', '存储类型'],
    hint: 'SRAM需要电力维持数据'
  },
  {
    id: 9153,
    chapter: 'basics-test',
    type: 'choice',
    title: '要使能GPIOA的时钟，应该配置哪个寄存器？',
    description: '时钟使能',
    options: [
      { id: 'A', text: 'RCC->AHB1ENR' },
      { id: 'B', text: 'RCC->APB1ENR' },
      { id: 'C', text: 'RCC->APB2ENR' },
      { id: 'D', text: 'RCC->CSR' }
    ],
    correctAnswer: 'A',
    explanation: 'GPIOA挂在AHB1总线上，所以使能GPIOA时钟需要设置RCC->AHB1ENR的GPIOA位。',
    difficulty: 2,
    knowledgePoints: ['RCC', '时钟使能', 'AHB1'],
    hint: 'GPIO挂载在AHB1总线'
  },
  {
    id: 9154,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是STM32常用调试接口？',
    description: '调试接口',
    options: [
      { id: 'A', text: 'SWD' },
      { id: 'B', text: 'JTAG' },
      { id: 'C', text: 'SPI' },
      { id: 'D', text: 'UART' }
    ],
    correctAnswer: 'C',
    explanation: 'SWD和JTAG是常用的调试接口（SWD是SWDIO+SWCLK两线调试）。UART常用于串口打印调试。SPI不是调试接口。',
    difficulty: 2,
    knowledgePoints: ['SWD', 'JTAG', '调试接口'],
    hint: 'SPI是通信协议不是调试口'
  },
  // ===== 基础测试 - 字符串处理 =====
  {
    id: 9161,
    chapter: 'basics-test',
    type: 'choice',
    title: 'strlen("Hello") 的返回值是？',
    description: '字符串长度',
    options: [
      { id: 'A', text: '4' },
      { id: 'B', text: '5' },
      { id: 'C', text: '6' },
      { id: 'D', text: '不确定' }
    ],
    correctAnswer: 'B',
    explanation: 'strlen返回字符串长度，不包括结尾的\\0。"Hello"有5个字符，所以返回5。',
    difficulty: 1,
    knowledgePoints: ['strlen', '字符串长度'],
    hint: '不算结尾的\\0',
    visualization: { type: 'html', file: 'visualizations-v2/strlen-vs-sizeof.html' }
  },
  {
    id: 9162,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个函数可以安全地复制字符串？',
    description: '字符串复制',
    options: [
      { id: 'A', text: 'strcpy' },
      { id: 'B', text: 'strncpy' },
      { id: 'C', text: 'gets' },
      { id: 'D', text: 'sprintf' }
    ],
    correctAnswer: 'B',
    explanation: 'strncpy指定了复制长度，更安全。strcpy不检查长度可能溢出。gets已被废弃。sprintf用于格式化输出。',
    difficulty: 2,
    knowledgePoints: ['strncpy', '字符串安全'],
    hint: 'strncpy带n更安全'
  },
  {
    id: 9163,
    chapter: 'basics-test',
    type: 'choice',
    title: 'strcmp("abc", "abc") 的返回值是？',
    description: '字符串比较',
    options: [
      { id: 'A', text: '0' },
      { id: 'B', text: '1' },
      { id: 'C', text: '-1' },
      { id: 'D', text: 'true' }
    ],
    correctAnswer: 'A',
    explanation: 'strcmp相等时返回0。两个字符串"abc"相等，所以返回0。',
    difficulty: 1,
    knowledgePoints: ['strcmp', '字符串比较'],
    hint: '相等返回0'
  },
  // ===== 基础测试 - 结构体 =====
  {
    id: 9171,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是正确的数据结构选择？',
    description: '数据结构',
    options: [
      { id: 'A', text: '数组 - 存储多个同类型值' },
      { id: 'B', text: '结构体 - 存储多个不同类型值' },
      { id: 'C', text: '联合体 - 存储多个互斥值' },
      { id: 'D', text: '以上都是' }
    ],
    correctAnswer: 'D',
    explanation: '数组存储同类型值，结构体存储不同类型值，联合体存储互斥值。',
    difficulty: 1,
    knowledgePoints: ['数组', '结构体', '联合体'],
    hint: '各有用处'
  },
  {
    id: 9172,
    chapter: 'basics-test',
    type: 'choice',
    title: '结构体内存对齐的目的是？',
    description: '内存对齐',
    options: [
      { id: 'A', text: '节省内存' },
      { id: 'B', text: '提高访问速度' },
      { id: 'C', text: '防止溢出' },
      { id: 'D', text: '便于调试' }
    ],
    correctAnswer: 'B',
    explanation: '内存对齐是为了让CPU更高效地访问数据。未对齐的访问可能需要多次操作。',
    difficulty: 2,
    knowledgePoints: ['内存对齐', '结构体'],
    hint: '为了CPU访问效率',
    visualization: { type: 'html', file: 'visualizations-v2/struct-alignment.html' }
  },
  // ===== 基础测试 - 预处理 =====
  {
    id: 9181,
    chapter: 'basics-test',
    type: 'choice',
    title: '#ifdef DEBUG ... #endif 的作用是？',
    description: '条件编译',
    options: [
      { id: 'A', text: '调试时执行这段代码' },
      { id: 'B', text: '定义DEBUG宏' },
      { id: 'C', text: '报错' },
      { id: 'D', text: '包含头文件' }
    ],
    correctAnswer: 'A',
    explanation: '条件编译只在满足条件时编译代码。#ifdef DEBUG表示如果定义了DEBUG宏，就编译中间的代码。',
    difficulty: 1,
    knowledgePoints: ['条件编译', '#ifdef'],
    hint: '满足条件才编译',
    visualization: { type: 'html', file: 'visualizations-v2/conditional-compilation.html' }
  },
  {
    id: 9182,
    chapter: 'basics-test',
    type: 'choice',
    title: '#define SIZEOF(arr) (sizeof(arr)/sizeof(arr[0])) 的用途是？',
    description: '宏定义',
    options: [
      { id: 'A', text: '计算数组元素个数' },
      { id: 'B', text: '计算字节大小' },
      { id: 'C', text: '获取元素大小' },
      { id: 'D', text: '复制数组' }
    ],
    correctAnswer: 'A',
    explanation: '这个宏用总字节除以单个元素字节，得到元素个数。常用于数组遍历。',
    difficulty: 2,
    knowledgePoints: ['宏', 'sizeof', '数组'],
    hint: '总大小/单元素大小'
  },
  // ===== 基础测试 - 指针进阶 =====
  {
    id: 9191,
    chapter: 'basics-test',
    type: 'choice',
    title: 'int **p 表示什么？',
    description: '二级指针',
    options: [
      { id: 'A', text: '指向int的指针' },
      { id: 'B', text: '指向int指针的指针' },
      { id: 'C', text: 'int类型的指针数组' },
      { id: 'D', text: '错误定义' }
    ],
    correctAnswer: 'B',
    explanation: 'int **p是二级指针，指向int*类型的指针。常用于动态分配二维数组或函数返回指针。',
    difficulty: 2,
    knowledgePoints: ['二级指针', '指针类型'],
    hint: '指针的指针',
    visualization: { type: 'html', file: 'visualizations-v2/pointer-basics.html' }
  },
  {
    id: 9192,
    chapter: 'basics-test',
    type: 'choice',
    title: 'void *p 可以做什么操作？',
    description: 'void指针',
    options: [
      { id: 'A', text: '直接解引用' },
      { id: 'B', text: '存储任意类型指针' },
      { id: 'C', text: '进行指针运算' },
      { id: 'D', text: '以上都可以' }
    ],
    correctAnswer: 'B',
    explanation: 'void*是通用指针，可以存储任意类型指针，但不能直接解引用或运算，使用时需要类型转换。',
    difficulty: 2,
    knowledgePoints: ['void*', '通用指针'],
    hint: '可以存任何指针'
  },
  // ===== 基础测试 - 常见错误 =====
  {
    id: 9201,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个会导致死循环？',
    description: '死循环',
    options: [
      { id: 'A', text: 'for(i=0; i<10; i++)' },
      { id: 'B', text: 'while(1) { if(break) }' },
      { id: 'C', text: 'for(;;)' },
      { id: 'D', text: 'while(i<10) { i--; }' }
    ],
    correctAnswer: 'D',
    explanation: 'while(i<10){i--;}中i不断减小，永远不会>=10，会死循环。for(;;)是显式死循环。',
    difficulty: 2,
    knowledgePoints: ['死循环', 'while'],
    hint: 'i只减不加',
    visualization: { type: 'html', file: 'visualizations-v2/for-loop-array-sum.html' }
  },
  {
    id: 9202,
    chapter: 'basics-test',
    type: 'choice',
    title: '数组作为函数参数时会退化为？',
    description: '数组参数',
    options: [
      { id: 'A', text: '数组本身' },
      { id: 'B', text: '指针' },
      { id: 'C', text: '结构体' },
      { id: 'D', text: '引用' }
    ],
    correctAnswer: 'B',
    explanation: 'C语言中数组作为函数参数时会退化为指针，丢失长度信息。所以需要额外传长度参数。',
    difficulty: 2,
    knowledgePoints: ['数组参数', '指针退化'],
    hint: '退化为指针'
  },
  {
    id: 9203,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个是野指针？',
    description: '野指针',
    options: [
      { id: 'A', text: 'NULL指针' },
      { id: 'B', text: '未初始化的指针' },
      { id: 'C', text: '指向已释放内存的指针' },
      { id: 'D', text: 'B和C都是' }
    ],
    correctAnswer: 'D',
    explanation: '野指针指向无效内存，包括未初始化的指针和已释放的指针。NULL指针不是野指针。',
    difficulty: 2,
    knowledgePoints: ['野指针', '内存安全'],
    hint: '指向无效内存'
  },
  {
    id: 9204,
    chapter: 'basics-test',
    type: 'choice',
    title: 'i++ 和 ++i 的区别是？',
    description: '自增运算符',
    options: [
      { id: 'A', text: '没有区别' },
      { id: 'B', text: 'i++先返回后增加，++i先增加后返回' },
      { id: 'C', text: '++i更快' },
      { id: 'D', text: 'i++返回引用' }
    ],
    correctAnswer: 'B',
    explanation: 'i++后置自增返回原值再增加，++i前置自增先增加再返回值。在不使用返回值时效果相同。',
    difficulty: 1,
    knowledgePoints: ['自增', 'i++', '++i'],
    hint: '返回值时机不同'
  },
  // ===== 基础测试 - 硬件相关 =====
  {
    id: 9205,
    chapter: 'basics-test',
    type: 'choice',
    title: '位带操作(Bit-band)用于？',
    description: '位带操作',
    options: [
      { id: 'A', text: '节省内存' },
      { id: 'B', text: '原子操作单个位' },
      { id: 'C', text: '加密数据' },
      { id: 'D', text: '提高计算速度' }
    ],
    correctAnswer: 'B',
    explanation: '位带操作允许原子性地读写单个位，避免竞态条件。常用于操作GPIO等外设寄存器。',
    difficulty: 3,
    knowledgePoints: ['位带', '原子操作', 'CM3/CM4'],
    hint: '原子操作单个位'
  },
  {
    id: 9206,
    chapter: 'basics-test',
    type: 'choice',
    title: 'DMA的主要作用是？',
    description: 'DMA',
    options: [
      { id: 'A', text: '计算处理' },
      { id: 'B', text: '直接内存访问，减轻CPU负担' },
      { id: 'C', text: '存储数据' },
      { id: 'D', text: '显示输出' }
    ],
    correctAnswer: 'B',
    explanation: 'DMA(直接内存访问)让外设直接与内存交换数据，不需要CPU参与，减轻CPU负担。',
    difficulty: 2,
    knowledgePoints: ['DMA', '外设', '内存'],
    hint: '直接内存访问'
  },
  // ===== 基础测试 - 编程习惯 =====
  {
    id: 9207,
    chapter: 'basics-test',
    type: 'choice',
    title: '下面哪个不是良好的编码习惯？',
    description: '编码规范',
    options: [
      { id: 'A', text: '使用有意义的变量名' },
      { id: 'B', text: '添加必要的注释' },
      { id: 'C', text: '代码越简洁越好，可以不用缩进' },
      { id: 'D', text: '使用const保护不应修改的数据' }
    ],
    correctAnswer: 'C',
    explanation: '良好的编码习惯包括：命名清晰、适当注释、缩进对齐、使用const等。代码简洁不应牺牲可读性。',
    difficulty: 1,
    knowledgePoints: ['编码规范', '可读性'],
    hint: '可读性很重要'
  },
  // ===== 基础测试 - 实战应用 =====
  {
    id: 9211,
    chapter: 'basics-test',
    type: 'choice',
    title: '嵌入式读取传感器数据常用什么类型？',
    description: '传感器数据',
    options: [
      { id: 'A', text: 'float' },
      { id: 'B', text: 'uint16_t' },
      { id: 'C', text: 'double' },
      { id: 'D', text: 'long double' }
    ],
    correctAnswer: 'B',
    explanation: '传感器数据通常使用uint16_t等定宽整型，保证跨平台一致性。浮点运算在MCU上较慢。',
    difficulty: 1,
    knowledgePoints: ['传感器', '数据类型', '嵌入式'],
    hint: '考虑MCU性能',
    visualization: { type: 'html', file: 'visualizations-v2/uint8-type.html' }
  },
  {
    id: 9212,
    chapter: 'basics-test',
    type: 'choice',
    title: 'LED闪烁程序中，delay函数通常使用什么实现？',
    description: '延时实现',
    options: [
      { id: 'A', text: 'printf循环延时' },
      { id: 'B', text: '空循环计数器' },
      { id: 'C', text: '硬件定时器中断' },
      { id: 'D', text: 'sleep系统调用' }
    ],
    correctAnswer: 'B',
    explanation: '裸机程序常用空循环延时。精确延时则用硬件定时器。printf和sleep在裸机中不可用。',
    difficulty: 2,
    knowledgePoints: ['延时', 'LED', '裸机'],
    hint: '裸机常用空循环'
  },
  {
    id: 9213,
    chapter: 'basics-test',
    type: 'choice',
    title: '状态机编程适合什么场景？',
    description: '状态机',
    options: [
      { id: 'A', text: '简单顺序执行' },
      { id: 'B', text: '多状态/多分支逻辑' },
      { id: 'C', text: '数学计算' },
      { id: 'D', text: '文件操作' }
    ],
    correctAnswer: 'B',
    explanation: '状态机适合处理多状态、多分支的复杂逻辑，如按键处理、协议解析、菜单导航等。',
    difficulty: 2,
    knowledgePoints: ['状态机', '状态模式', '嵌入式'],
    hint: '多状态多分支'
  },
  // ===== 基础测试 - 通信协议 =====
  {
    id: 9221,
    chapter: 'basics-test',
    type: 'choice',
    title: 'UART通信最少需要几根线？',
    description: 'UART',
    options: [
      { id: 'A', text: '1根' },
      { id: 'B', text: '2根' },
      { id: 'C', text: '3根' },
      { id: 'D', text: '4根' }
    ],
    correctAnswer: 'B',
    explanation: 'UART最少需要TXD和RXD两根线（全双工）。如果只单向通信，1根也可以。',
    difficulty: 1,
    knowledgePoints: ['UART', '串口', '通信'],
    hint: 'TX+RX两根'
  },
  {
    id: 9222,
    chapter: 'basics-test',
    type: 'choice',
    title: 'I2C通信中，每个从设备有唯一什么？',
    description: 'I2C',
    options: [
      { id: 'A', text: 'IP地址' },
      { id: 'B', text: 'MAC地址' },
      { id: 'C', text: '7位或10位地址' },
      { id: 'D', text: '序列号' }
    ],
    correctAnswer: 'C',
    explanation: 'I2C每个从设备有唯一的7位或10位地址，主设备通过地址选择从设备进行通信。',
    difficulty: 2,
    knowledgePoints: ['I2C', '从设备地址', '通信'],
    hint: 'I2C地址唯一'
  },
  {
    id: 9223,
    chapter: 'basics-test',
    type: 'choice',
    title: 'SPI通信中，主设备输出时钟的引脚是？',
    description: 'SPI',
    options: [
      { id: 'A', text: 'MOSI' },
      { id: 'B', text: 'MISO' },
      { id: 'C', text: 'SCK' },
      { id: 'D', text: 'CS/SS' }
    ],
    correctAnswer: 'C',
    explanation: 'SCK是SPI时钟线，由主设备产生。MOSI是主出从入，MISO是主入从出，CS是片选。',
    difficulty: 2,
    knowledgePoints: ['SPI', 'SCK', '时钟'],
    hint: 'S Clock = 时钟'
  },
  {
    id: 9224,
    chapter: 'basics-test',
    type: 'choice',
    title: 'CRC校验用于检测什么？',
    description: 'CRC',
    options: [
      { id: 'A', text: '存储器损坏' },
      { id: 'B', text: '数据传输错误' },
      { id: 'C', text: '电源波动' },
      { id: 'D', text: '电磁干扰' }
    ],
    correctAnswer: 'B',
    explanation: 'CRC(循环冗余校验)用于检测数据传输或存储中的错误，通过多项式运算生成校验值。',
    difficulty: 2,
    knowledgePoints: ['CRC', '校验', '数据完整性'],
    hint: '检测传输错误'
  },
  // ===== 基础测试 - 中断机制 =====
  {
    id: 9231,
    chapter: 'basics-test',
    type: 'choice',
    title: '中断服务函数(ISR)应该遵循什么原则？',
    description: '中断',
    options: [
      { id: 'A', text: '执行时间越长越好' },
      { id: 'B', text: '应快速执行完成' },
      { id: 'C', text: '可以调用任意函数' },
      { id: 'D', text: '不需要保护现场' }
    ],
    correctAnswer: 'B',
    explanation: 'ISR应快速执行完成，避免影响其他中断响应。通常只做标志位设置或简单操作，复杂处理放在主循环。',
    difficulty: 2,
    knowledgePoints: ['中断', 'ISR', '实时性'],
    hint: '快进快出'
  },
  {
    id: 9232,
    chapter: 'basics-test',
    type: 'choice',
    title: '中断优先级的作用是？',
    description: '中断优先级',
    options: [
      { id: 'A', text: '决定哪个中断先响应' },
      { id: 'B', text: '决定CPU频率' },
      { id: 'C', text: '决定内存分配' },
      { id: 'D', text: '决定中断使能' }
    ],
    correctAnswer: 'A',
    explanation: '中断优先级决定多个中断同时发生时哪个先响应。高优先级可打断低优先级中断。',
    difficulty: 2,
    knowledgePoints: ['中断优先级', 'NVIC', '中断嵌套'],
    hint: '优先级高先响应'
  },
  // ===== 基础测试 - RTOS基础 =====
  {
    id: 9241,
    chapter: 'basics-test',
    type: 'choice',
    title: 'FreeRTOS中，vTaskDelay函数的作用是？',
    description: 'RTOS',
    options: [
      { id: 'A', text: '删除任务' },
      { id: 'B', text: '任务延时' },
      { id: 'C', text: '创建任务' },
      { id: 'D', text: '挂起任务' }
    ],
    correctAnswer: 'B',
    explanation: 'vTaskDelay使任务延时指定时间片，释放CPU给其他任务。是RTOS多任务调度的基础。',
    difficulty: 2,
    knowledgePoints: ['FreeRTOS', 'vTaskDelay', '任务调度'],
    hint: '任务延时函数'
  },
  {
    id: 9242,
    chapter: 'basics-test',
    type: 'choice',
    title: '临界区保护主要用于？',
    description: '临界区',
    options: [
      { id: 'A', text: '节省电量' },
      { id: 'B', text: '保护共享资源' },
      { id: 'C', text: '加速执行' },
      { id: 'D', text: '内存分配' }
    ],
    correctAnswer: 'B',
    explanation: '临界区是访问共享资源的代码段，需要保护防止竞态条件。通常用锁或禁用中断实现。',
    difficulty: 2,
    knowledgePoints: ['临界区', '互斥', '共享资源'],
    hint: '保护共享资源'
  },
  // ===== 基础测试 - C标准库 =====
  {
    id: 9251,
    chapter: 'basics-test',
    type: 'choice',
    title: 'malloc(0) 的行为是？',
    description: 'malloc',
    options: [
      { id: 'A', text: '返回NULL' },
      { id: 'B', text: '返回有效指针或NULL' },
      { id: 'C', text: '程序崩溃' },
      { id: 'D', text: '返回0' }
    ],
    correctAnswer: 'B',
    explanation: 'malloc(0)的行为是未定义的，可能返回NULL或有效指针。不应依赖特定行为。',
    difficulty: 2,
    knowledgePoints: ['malloc', '内存分配'],
    hint: '行为未定义'
  },
  {
    id: 9252,
    chapter: 'basics-test',
    type: 'choice',
    title: 'free(ptr)后，指针应该？',
    description: '内存管理',
    options: [
      { id: 'A', text: '保持不变' },
      { id: 'B', text: '设为NULL' },
      { id: 'C', text: '自动释放' },
      { id: 'D', text: '指向新内存' }
    ],
    correctAnswer: 'B',
    explanation: 'free后应将指针设为NULL，避免野指针。内存释放后不能再访问。',
    difficulty: 2,
    knowledgePoints: ['free', '野指针', '内存管理'],
    hint: '设为NULL防野指针'
  },
  {
    id: 9253,
    chapter: 'basics-test',
    type: 'choice',
    title: 'printf("%d\\n", 5/2) 输出什么？',
    description: '整数除法',
    options: [
      { id: 'A', text: '2.5' },
      { id: 'B', text: '2' },
      { id: 'C', text: '3' },
      { id: 'D', text: '2.0' }
    ],
    correctAnswer: 'B',
    explanation: '整数除法截断小数部分。5/2=2.5，但取整后是2。',
    difficulty: 1,
    knowledgePoints: ['整数除法', '截断'],
    hint: '整数除法截断'
  },
  // ===== 基础测试 - 代码规范 =====
  {
    id: 9261,
    chapter: 'basics-test',
    type: 'choice',
    title: '头文件#ifndef的作用是？',
    description: '头文件保护',
    options: [
      { id: 'A', text: '加快编译' },
      { id: 'B', text: '防止重复包含' },
      { id: 'C', text: '加密代码' },
      { id: 'D', text: '压缩体积' }
    ],
    correctAnswer: 'B',
    explanation: '#ifndef防止头文件被重复包含，避免编译错误和重复定义。通常配合#define使用。',
    difficulty: 1,
    knowledgePoints: ['头文件保护', '#ifndef', '#define'],
    hint: '防止重复包含',
    visualization: { type: 'html', file: 'visualizations-v2/conditional-compilation.html' }
  },
  {
    id: 9262,
    chapter: 'basics-test',
    type: 'choice',
    title: '函数原型声明的好处是？',
    description: '函数声明',
    options: [
      { id: 'A', text: '减少代码量' },
      { id: 'B', text: '编译器类型检查' },
      { id: 'C', text: '加快运行' },
      { id: 'D', text: '节省内存' }
    ],
    correctAnswer: 'B',
    explanation: '函数原型让编译器检查参数类型和个数是否匹配，减少运行时错误。',
    difficulty: 1,
    knowledgePoints: ['函数原型', '类型检查'],
    hint: '编译器检查'
  },
  // ===== 基础测试 - 调试技巧 =====
  {
    id: 9271,
    chapter: 'basics-test',
    type: 'choice',
    title: 'GDB调试中，bt命令的作用是？',
    description: 'GDB',
    options: [
      { id: 'A', text: '设置断点' },
      { id: 'B', text: '查看堆栈' },
      { id: 'C', text: '单步执行' },
      { id: 'D', text: '打印变量' }
    ],
    correctAnswer: 'B',
    explanation: 'bt(backtrace)显示函数调用堆栈，帮助定位崩溃位置。',
    difficulty: 2,
    knowledgePoints: ['GDB', 'backtrace', '调试'],
    hint: 'backtrace = 堆栈'
  },
  {
    id: 9272,
    chapter: 'basics-test',
    type: 'choice',
    title: 'assert()宏在调试时的作用是？',
    description: 'assert',
    options: [
      { id: 'A', text: '输出日志' },
      { id: 'B', text: '条件检查，失败则退出' },
      { id: 'C', text: '定义常量' },
      { id: 'D', text: '包含头文件' }
    ],
    correctAnswer: 'B',
    explanation: 'assert用于调试时检查条件，条件为假时输出错误信息并退出。可在发布版禁用。',
    difficulty: 2,
    knowledgePoints: ['assert', '断言', '调试'],
    hint: '条件检查'
  },
  // ===== 基础测试 - Makefile =====
  {
    id: 9281,
    chapter: 'basics-test',
    type: 'choice',
    title: 'Makefile中，clean目标通常用于？',
    description: 'Makefile',
    options: [
      { id: 'A', text: '编译代码' },
      { id: 'B', text: '清理生成的文件' },
      { id: 'C', text: '链接程序' },
      { id: 'D', text: '运行程序' }
    ],
    correctAnswer: 'B',
    explanation: 'clean目标用于清理编译生成的目标文件、可执行文件等，通常执行make clean。',
    difficulty: 1,
    knowledgePoints: ['Makefile', 'clean', '构建'],
    hint: '清理文件'
  },
  {
    id: 9282,
    chapter: 'basics-test',
    type: 'choice',
    title: 'Makefile中，$@ 和 $< 分别表示？',
    description: 'Makefile变量',
    options: [
      { id: 'A', text: '目标名和依赖文件' },
      { id: 'B', text: '依赖文件和目标名' },
      { id: 'C', text: '所有目标和依赖' },
      { id: 'D', text: '编译器和标志' }
    ],
    correctAnswer: 'A',
    explanation: '$@代表目标文件名，$<代表第一个依赖文件名。这些是Makefile的自动变量。',
    difficulty: 2,
    knowledgePoints: ['Makefile', '自动变量'],
    hint: '@目标 <依赖'
  },
  // ===== 基础测试 - 版本控制 =====
  {
    id: 9291,
    chapter: 'basics-test',
    type: 'choice',
    title: 'git add . 的作用是？',
    description: 'Git',
    options: [
      { id: 'A', text: '提交所有修改' },
      { id: 'B', text: '添加所有文件到暂存区' },
      { id: 'C', text: '创建新分支' },
      { id: 'D', text: '合并分支' }
    ],
    correctAnswer: 'B',
    explanation: 'git add . 将所有修改添加到暂存区，等待commit。',
    difficulty: 1,
    knowledgePoints: ['git', 'add', '暂存区'],
    hint: '添加到暂存区'
  },
  {
    id: 9292,
    chapter: 'basics-test',
    type: 'choice',
    title: 'git commit -m "msg" 的作用是？',
    description: 'Git',
    options: [
      { id: 'A', text: '拉取代码' },
      { id: 'B', text: '提交暂存区内容' },
      { id: 'C', text: '推送代码' },
      { id: 'D', text: '创建仓库' }
    ],
    correctAnswer: 'B',
    explanation: 'git commit将暂存区内容提交到本地仓库，形成版本记录。',
    difficulty: 1,
    knowledgePoints: ['git', 'commit', '版本'],
    hint: '提交到仓库'
  },
  // ===== 基础测试 - 网络基础 =====
  {
    id: 9301,
    chapter: 'basics-test',
    type: 'choice',
    title: 'socket编程中，TCP与UDP的主要区别是？',
    description: 'Socket',
    options: [
      { id: 'A', text: 'TCP更快' },
      { id: 'B', text: 'TCP面向连接，UDP无连接' },
      { id: 'C', text: 'TCP不支持广播' },
      { id: 'D', text: 'UDP可靠传输' }
    ],
    correctAnswer: 'B',
    explanation: 'TCP提供可靠连接（三次握手），UDP无连接但更快。TCP保证顺序和可靠性，UDP不保证。',
    difficulty: 2,
    knowledgePoints: ['TCP', 'UDP', 'socket'],
    hint: 'TCP面向连接'
  },
  {
    id: 9302,
    chapter: 'basics-test',
    type: 'choice',
    title: 'HTTP协议默认端口是？',
    description: 'HTTP',
    options: [
      { id: 'A', text: '21' },
      { id: 'B', text: '80' },
      { id: 'C', text: '443' },
      { id: 'D', text: '8080' }
    ],
    correctAnswer: 'B',
    explanation: 'HTTP默认端口80，HTTPS默认443，FTP默认21。',
    difficulty: 1,
    knowledgePoints: ['HTTP', '端口', '网络'],
    hint: 'HTTP=80'
  },
  // ===== 基础测试 - 硬件接口 =====
  {
    id: 9303,
    chapter: 'basics-test',
    type: 'choice',
    title: 'PWM常用于控制什么？',
    description: 'PWM',
    options: [
      { id: 'A', text: '存储数据' },
      { id: 'B', text: '电机速度/LED亮度' },
      { id: 'C', text: '读取传感器' },
      { id: 'D', text: '显示文字' }
    ],
    correctAnswer: 'B',
    explanation: 'PWM(脉宽调制)通过调节占空比控制电机速度、LED亮度等。',
    difficulty: 1,
    knowledgePoints: ['PWM', '电机', '占空比'],
    hint: '调速/调光'
  },
  {
    id: 9304,
    chapter: 'basics-test',
    type: 'choice',
    title: 'ADC的作用是？',
    description: 'ADC',
    options: [
      { id: 'A', text: '数字转模拟' },
      { id: 'B', text: '模拟转数字' },
      { id: 'C', text: '放大信号' },
      { id: 'D', text: '滤波' }
    ],
    correctAnswer: 'B',
    explanation: 'ADC(模数转换器)将模拟信号转换为数字量，用于读取传感器电压等。',
    difficulty: 1,
    knowledgePoints: ['ADC', '模数转换', '传感器'],
    hint: '模拟→数字'
  },
  {
    id: 9305,
    chapter: 'basics-test',
    type: 'choice',
    title: '看门狗定时器的作用是？',
    description: '看门狗',
    options: [
      { id: 'A', text: '计时显示' },
      { id: 'B', text: '系统复位' },
      { id: 'C', text: '降低功耗' },
      { id: 'D', text: '存储数据' }
    ],
    correctAnswer: 'B',
    explanation: '看门狗定时器在系统死机时自动复位。需要定期喂狗否则系统重启。',
    difficulty: 2,
    knowledgePoints: ['看门狗', '复位', '可靠性'],
    hint: '死机复位'
  },
  // ===== 基础测试 - 算法基础 =====
  {
    id: 9306,
    chapter: 'basics-test',
    type: 'choice',
    title: '二分查找的时间复杂度是？',
    description: '算法复杂度',
    options: [
      { id: 'A', text: 'O(n)' },
      { id: 'B', text: 'O(n²)' },
      { id: 'C', text: 'O(log n)' },
      { id: 'D', text: 'O(1)' }
    ],
    correctAnswer: 'C',
    explanation: '二分查找每次将搜索范围减半，时间复杂度是O(log n)。',
    difficulty: 2,
    knowledgePoints: ['二分查找', '时间复杂度'],
    hint: '减半查找'
  },
  {
    id: 9307,
    chapter: 'basics-test',
    type: 'choice',
    title: '冒泡排序的时间复杂度是？',
    description: '排序算法',
    options: [
      { id: 'A', text: 'O(n)' },
      { id: 'B', text: 'O(n log n)' },
      { id: 'C', text: 'O(n²)' },
      { id: 'D', text: 'O(1)' }
    ],
    correctAnswer: 'C',
    explanation: '冒泡排序是O(n²)算法，适合小数据量排序。',
    difficulty: 2,
    knowledgePoints: ['冒泡排序', '时间复杂度'],
    hint: '两两比较'
  },
  // ===== 基础测试 - 嵌入式案例 =====
  {
    id: 9308,
    chapter: 'basics-test',
    type: 'choice',
    title: '按键消抖常用什么方法？',
    description: '按键处理',
    options: [
      { id: 'A', text: '直接读取' },
      { id: 'B', text: '延时消抖' },
      { id: 'C', text: '不处理' },
      { id: 'D', text: '滤波电容' }
    ],
    correctAnswer: 'B',
    explanation: '机械按键抖动需要延时消抖，通常延时10-20ms后再次确认。',
    difficulty: 2,
    knowledgePoints: ['按键', '消抖', '嵌入式'],
    hint: '延时处理'
  },
  {
    id: 9309,
    chapter: 'basics-test',
    type: 'choice',
    title: '环形缓冲区适合什么场景？',
    description: '环形缓冲',
    options: [
      { id: 'A', text: '存储固定数据' },
      { id: 'B', text: '生产者-消费者模式' },
      { id: 'C', text: '排序' },
      { id: 'D', text: '查找' }
    ],
    correctAnswer: 'B',
    explanation: '环形缓冲区(FIFO)适合生产者-消费者模式，如串口数据接收。',
    difficulty: 2,
    knowledgePoints: ['环形缓冲', 'FIFO', '队列'],
    hint: '生产者-消费者'
  },
  // ===== 基础测试 - 外设进阶 =====
  {
    id: 9310,
    chapter: 'basics-test',
    type: 'choice',
    title: '定时器TIMER主要用于？',
    description: '定时器',
    options: [
      { id: 'A', text: '存储数据' },
      { id: 'B', text: '定时/计数/PWM' },
      { id: 'C', text: '通信' },
      { id: 'D', text: '显示' }
    ],
    correctAnswer: 'B',
    explanation: '定时器可用于定时、计数、输出PWM等多种功能，是嵌入式最常用外设之一。',
    difficulty: 1,
    knowledgePoints: ['定时器', 'TIMER', 'PWM'],
    hint: '定时/计数/PWM'
  },
  {
    id: 9311,
    chapter: 'basics-test',
    type: 'choice',
    title: 'DMA的主要作用是？',
    description: 'DMA',
    options: [
      { id: 'A', text: '执行程序' },
      { id: 'B', text: '直接内存访问，减轻CPU负担' },
      { id: 'C', text: '加密数据' },
      { id: 'D', text: '显示图形' }
    ],
    correctAnswer: 'B',
    explanation: 'DMA(直接内存访问)让外设直接与内存交换数据，无需CPU介入，适合大批量数据传输。',
    difficulty: 2,
    knowledgePoints: ['DMA', '直接内存访问', '数据传输'],
    hint: '减轻CPU负担'
  },
  {
    id: 9312,
    chapter: 'basics-test',
    type: 'choice',
    title: 'RTC时钟的主要用途是？',
    description: 'RTC',
    options: [
      { id: 'A', text: '高速计时' },
      { id: 'B', text: '实时时钟/日历' },
      { id: 'C', text: 'CPU频率' },
      { id: 'D', text: '跑马灯' }
    ],
    correctAnswer: 'B',
    explanation: 'RTC(实时时钟)提供年/月/日/时/分/秒功能，电池供电，即使断电也能保持时间。',
    difficulty: 1,
    knowledgePoints: ['RTC', '实时时钟', '日历'],
    hint: '记录实时时间'
  },
  // ===== 基础测试 - 内存管理 =====
  {
    id: 9321,
    chapter: 'basics-test',
    type: 'choice',
    title: '栈(Stack)的主要用途是？',
    description: '栈内存',
    options: [
      { id: 'A', text: '长期存储数据' },
      { id: 'B', text: '函数调用/局部变量' },
      { id: 'C', text: '动态分配' },
      { id: 'D', text: '永久保存程序' }
    ],
    correctAnswer: 'B',
    explanation: '栈用于保存函数调用时的返回地址、参数、局部变量等。是自动分配释放的。',
    difficulty: 2,
    knowledgePoints: ['栈', '函数调用', '局部变量'],
    hint: '函数调用专用',
    visualization: { type: 'html', file: 'stack-heap-memory.html' }
  },
  {
    id: 9322,
    chapter: 'basics-test',
    type: 'choice',
    title: '堆(Heap)的主要用途是？',
    description: '堆内存',
    options: [
      { id: 'A', text: '函数局部变量' },
      { id: 'B', text: '动态内存分配' },
      { id: 'C', text: '保存常量' },
      { id: 'D', text: '程序代码' }
    ],
    correctAnswer: 'B',
    explanation: '堆用于动态内存分配(malloc/free)，大小不固定，需要程序员手动管理。',
    difficulty: 2,
    knowledgePoints: ['堆', 'malloc', '动态内存'],
    hint: '动态分配',
    visualization: { type: 'html', file: 'stack-heap-memory.html' }
  },
  {
    id: 9323,
    chapter: 'basics-test',
    type: 'choice',
    title: '栈空间通常多大？',
    description: '栈大小',
    options: [
      { id: 'A', text: '1MB' },
      { id: 'B', text: '1KB-8KB' },
      { id: 'C', text: '512MB' },
      { id: 'D', text: '无限制' }
    ],
    correctAnswer: 'B',
    explanation: '嵌入式系统栈空间通常1KB-8KB，桌面程序一般1MB左右。栈溢出会导致系统崩溃。',
    difficulty: 2,
    knowledgePoints: ['栈大小', '嵌入式', '栈溢出'],
    hint: 'KB级别'
  },
  // ===== 基础测试 - 位运算 =====
  {
    id: 9331,
    chapter: 'basics-test',
    type: 'choice',
    title: '将第3位置1，应该使用？',
    description: '位操作',
    options: [
      { id: 'A', text: 'reg & (1<<3)' },
      { id: 'B', text: 'reg | (1<<3)' },
      { id: 'C', text: 'reg ^ (1<<3)' },
      { id: 'D', text: 'reg + (1<<3)' }
    ],
    correctAnswer: 'B',
    explanation: 'OR(|)操作可以将指定位置1。AND(&)用于清零，XOR(^)用于翻转。',
    difficulty: 2,
    knowledgePoints: ['位运算', 'OR', '置位'],
    hint: 'OR置1',
    visualization: { type: 'html', file: 'bit-set-operation.html' }
  },
  {
    id: 9332,
    chapter: 'basics-test',
    type: 'choice',
    title: '将第5位清0，应该使用？',
    description: '位操作',
    options: [
      { id: 'A', text: 'reg | (1<<5)' },
      { id: 'B', text: 'reg & ~(1<<5)' },
      { id: 'C', text: 'reg ^ (1<<5)' },
      { id: 'D', text: 'reg + (1<<5)' }
    ],
    correctAnswer: 'B',
    explanation: '先取反(~)再AND(&)可以清零指定位。',
    difficulty: 2,
    knowledgePoints: ['位运算', 'AND', '清零'],
    hint: 'AND(~(1<<n))清零',
    visualization: { type: 'html', file: 'bit-clear-operation.html' }
  },
  {
    id: 9333,
    chapter: 'basics-test',
    type: 'choice',
    title: '(char)0x80 >> 1 的结果是？',
    description: '右移运算',
    options: [
      { id: 'A', text: '0x40' },
      { id: 'B', text: '0xC0' },
      { id: 'C', text: '0x00' },
      { id: 'D', text: '0x10' }
    ],
    correctAnswer: 'B',
    explanation: 'char是有符号类型，0x80是-128，右移是算术右移保持符号，结果是0xC0(-64)。',
    difficulty: 3,
    knowledgePoints: ['算术右移', '符号扩展', 'char'],
    hint: '有符号右移补符号',
    visualization: { type: 'html', file: 'arithmetic-right-shift.html' }
  },
  // ===== 基础测试 - 编译链接 =====
  {
    id: 9341,
    chapter: 'basics-test',
    type: 'choice',
    title: '编译阶段主要做什么？',
    description: '编译过程',
    options: [
      { id: 'A', text: '生成可执行文件' },
      { id: 'B', text: '检查语法，生成目标文件' },
      { id: 'C', text: '链接库文件' },
      { id: 'D', text: '运行程序' }
    ],
    correctAnswer: 'B',
    explanation: '编译检查语法错误，将.c翻译成.o目标文件。链接将多个目标文件合并成可执行文件。',
    difficulty: 1,
    knowledgePoints: ['编译', '目标文件', '语法检查'],
    hint: '检查语法',
    visualization: { type: 'html', file: 'visualizations-v2/compilation-process.html' }
  },
  {
    id: 9342,
    chapter: 'basics-test',
    type: 'choice',
    title: '链接(link)阶段主要做什么？',
    description: '链接过程',
    options: [
      { id: 'A', text: '检查语法' },
      { id: 'B', text: '合并目标文件，解决符号引用' },
      { id: 'C', text: '生成汇编代码' },
      { id: 'D', text: '调试程序' }
    ],
    correctAnswer: 'B',
    explanation: '链接将多个目标文件(.o)合并，解析符号引用，生成最终的可执行文件或库。',
    difficulty: 2,
    knowledgePoints: ['链接', '符号解析', '可执行文件'],
    hint: '合并目标文件'
  },
  {
    id: 9343,
    chapter: 'basics-test',
    type: 'choice',
    title: '未定义引用(Undefined reference)错误发生在？',
    description: '链接错误',
    options: [
      { id: 'A', text: '编译阶段' },
      { id: 'B', text: '链接阶段' },
      { id: 'C', text: '运行阶段' },
      { id: 'D', text: '预处理阶段' }
    ],
    correctAnswer: 'B',
    explanation: '链接阶段找不到函数或变量的定义时会产生未定义引用错误。',
    difficulty: 2,
    knowledgePoints: ['链接错误', 'Undefined reference'],
    hint: '链接阶段'
  },
  // ===== 基础测试 - volatile关键字 =====
  {
    id: 9351,
    chapter: 'basics-test',
    type: 'choice',
    title: 'volatile关键字的作用是？',
    description: 'volatile',
    options: [
      { id: 'A', text: '加快执行速度' },
      { id: 'B', text: '防止编译器优化，每次从内存读取' },
      { id: 'C', text: '定义常量' },
      { id: 'D', text: '声明寄存器变量' }
    ],
    correctAnswer: 'B',
    explanation: 'volatile告诉编译器变量可能随时变化，不要优化。每次访问都从内存读取。用于外设寄存器、中断变量等。',
    difficulty: 2,
    knowledgePoints: ['volatile', '编译器优化', '外设'],
    hint: '防止优化'
  },
  {
    id: 9352,
    chapter: 'basics-test',
    type: 'choice',
    title: '以下哪个不需要volatile？',
    description: 'volatile',
    options: [
      { id: 'A', text: 'GPIO寄存器' },
      { id: 'B', text: '中断服务函数修改的变量' },
      { id: 'C', text: '普通局部变量' },
      { id: 'D', text: 'MMU映射的硬件寄存器' }
    ],
    correctAnswer: 'C',
    explanation: '普通局部变量不会意外改变，不需要volatile。外设寄存器、中断变量需要volatile。',
    difficulty: 2,
    knowledgePoints: ['volatile', '使用场景'],
    hint: '普通变量不需要'
  },
  // ===== 基础测试 - const关键字 =====
  {
    id: 9361,
    chapter: 'basics-test',
    type: 'choice',
    title: 'const int *p 和 int * const p 的区别是？',
    description: 'const',
    options: [
      { id: 'A', text: '没有区别' },
      { id: 'B', text: '前者指针指向常量，后者指针本身常量' },
      { id: 'C', text: '两者都指向常量' },
      { id: 'D', text: '两者都指针常量' }
    ],
    correctAnswer: 'B',
    explanation: 'const int *p: 指向常量整数的指针，不能通过p修改值但p可以指向其他地址。int * const p: 指向整数的常量指针，p不能指向其他地址但可以通过*p修改值。',
    difficulty: 3,
    knowledgePoints: ['const', '指针', '常量指针'],
    hint: '看const修饰谁'
  },
  {
    id: 9362,
    chapter: 'basics-test',
    type: 'choice',
    title: '#define 和 const 的区别是？',
    description: 'define vs const',
    options: [
      { id: 'A', text: '没有区别' },
      { id: 'B', text: 'define是宏替换，无类型；const是变量，有类型' },
      { id: 'C', text: 'const更占空间' },
      { id: 'D', text: 'define不能定义数组' }
    ],
    correctAnswer: 'B',
    explanation: 'define是预处理器替换，无类型不占存储空间。const是变量，有类型，占用内存。const更安全。',
    difficulty: 2,
    knowledgePoints: ['define', 'const', '宏'],
    hint: '宏替换vs变量'
  },
  // ===== 基础测试 - 数据结构 =====
  {
    id: 9371,
    chapter: 'basics-test',
    type: 'choice',
    title: '链表的主要优点是？',
    description: '链表',
    options: [
      { id: 'A', text: '随机访问快' },
      { id: 'B', text: '插入删除 O(1)' },
      { id: 'C', text: '存储密度高' },
      { id: 'D', text: '查询快' }
    ],
    correctAnswer: 'B',
    explanation: '链表插入删除只需要修改指针，时间复杂度O(1)。但不能随机访问，查询需要遍历O(n)。',
    difficulty: 2,
    knowledgePoints: ['链表', '插入删除', '时间复杂度'],
    hint: '插入删除快'
  },
  {
    id: 9372,
    chapter: 'basics-test',
    type: 'choice',
    title: '数组的主要优点是？',
    description: '数组',
    options: [
      { id: 'A', text: '插入删除快' },
      { id: 'B', text: '随机访问 O(1)' },
      { id: 'C', text: '大小灵活' },
      { id: 'D', text: '不需要内存' }
    ],
    correctAnswer: 'B',
    explanation: '数组可通过下标直接访问，时间复杂度O(1)。但插入删除需要移动元素，效率低。',
    difficulty: 1,
    knowledgePoints: ['数组', '随机访问', '时间复杂度'],
    hint: '下标访问快'
  },
  {
    id: 9373,
    chapter: 'basics-test',
    type: 'choice',
    title: '队列(queue)的特性是？',
    description: '队列',
    options: [
      { id: 'A', text: '后进先出' },
      { id: 'B', text: '先进先出' },
      { id: 'C', text: '可以随机访问' },
      { id: 'D', text: '没有限制' }
    ],
    correctAnswer: 'B',
    explanation: '队列是先进先出(FIFO)，一端入队一端出队。常用于缓冲、生产者-消费者等场景。',
    difficulty: 1,
    knowledgePoints: ['队列', 'FIFO', '数据结构'],
    hint: '先进先出'
  },
  {
    id: 9374,
    chapter: 'basics-test',
    type: 'choice',
    title: '栈(stack)的特性是？',
    description: '栈',
    options: [
      { id: 'A', text: '先进先出' },
      { id: 'B', text: '后进先出' },
      { id: 'C', text: '可以随机访问' },
      { id: 'D', text: '没有限制' }
    ],
    correctAnswer: 'B',
    explanation: '栈是后进先出(LIFO)，一端操作。函数调用、递归都用栈实现。',
    difficulty: 1,
    knowledgePoints: ['栈', 'LIFO', '数据结构'],
    hint: '后进先出'
  },
  // ===== 基础测试 - 电子基础 =====
  {
    id: 9381,
    chapter: 'basics-test',
    type: 'choice',
    title: '上拉电阻的作用是？',
    description: '上拉电阻',
    options: [
      { id: 'A', text: '降低电压' },
      { id: 'B', text: '确定默认电平，避免浮空' },
      { id: 'C', text: '增大电流' },
      { id: 'D', text: '保护IO' }
    ],
    correctAnswer: 'B',
    explanation: '上拉电阻将IO口默认拉高到高电平，避免浮空(不确定电平)。下拉电阻相反拉到低电平。',
    difficulty: 2,
    knowledgePoints: ['上拉电阻', 'GPIO', '浮空'],
    hint: '确定默认电平'
  },
  {
    id: 9382,
    chapter: 'basics-test',
    type: 'choice',
    title: '三极管的主要作用是？',
    description: '三极管',
    options: [
      { id: 'A', text: '存储电荷' },
      { id: 'B', text: '放大电流/开关控制' },
      { id: 'C', text: '产生时钟' },
      { id: 'D', text: '滤波' }
    ],
    correctAnswer: 'B',
    explanation: '三极管用作放大器或开关。通过小电流控制大电流，实现开关功能。',
    difficulty: 2,
    knowledgePoints: ['三极管', '放大', '开关'],
    hint: '放大/开关'
  },
  {
    id: 9383,
    chapter: 'basics-test',
    type: 'choice',
    title: '电容的作用包括？',
    description: '电容',
    options: [
      { id: 'A', text: '存储能量/滤波/耦合' },
      { id: 'B', text: '放大信号' },
      { id: 'C', text: '产生振荡' },
      { id: 'D', text: '稳压' }
    ],
    correctAnswer: 'A',
    explanation: '电容可存储电荷(储能)、滤波(去耦)、耦合(隔直流通交流)等。',
    difficulty: 2,
    knowledgePoints: ['电容', '储能', '滤波'],
    hint: '储能/滤波'
  },
  // ===== 基础测试 - 通信进阶 =====
  {
    id: 9391,
    chapter: 'basics-test',
    type: 'choice',
    title: 'USART和UART的区别是？',
    description: 'USART vs UART',
    options: [
      { id: 'A', text: '完全相同' },
      { id: 'B', text: 'USART支持同步和异步，UART只支持异步' },
      { id: 'C', text: 'UART更快' },
      { id: 'D', text: 'USART只支持同步' }
    ],
    correctAnswer: 'B',
    explanation: 'USART(通用同步/异步收发器)支持同步和异步模式。UART(通用异步收发器)只支持异步。',
    difficulty: 2,
    knowledgePoints: ['USART', 'UART', '同步/异步'],
    hint: 'USART=同步+异步'
  },
  {
    id: 9392,
    chapter: 'basics-test',
    type: 'choice',
    title: 'I2C的SDA和SCL线分别用于？',
    description: 'I2C引脚',
    options: [
      { id: 'A', text: '数据/时钟' },
      { id: 'B', text: '时钟/数据' },
      { id: 'C', text: '地址/数据' },
      { id: 'D', text: '电源/地' }
    ],
    correctAnswer: 'A',
    explanation: 'I2C有两根线：SDA(Serial Data)传输数据，SCL(Serial Clock)传输时钟。',
    difficulty: 1,
    knowledgePoints: ['I2C', 'SDA', 'SCL'],
    hint: 'Data+Clock'
  },
  {
    id: 9393,
    chapter: 'basics-test',
    type: 'choice',
    title: 'SPI的四种模式是由什么决定的？',
    description: 'SPI模式',
    options: [
      { id: 'A', text: '数据位宽' },
      { id: 'B', text: 'CPOL和CPHA的组合' },
      { id: 'C', text: '时钟频率' },
      { id: 'D', text: '数据方向' }
    ],
    correctAnswer: 'B',
    explanation: 'SPI有4种模式，由时钟极性(CPOL)和时钟相位(CPHA)的组合决定。需与从设备匹配。',
    difficulty: 3,
    knowledgePoints: ['SPI', 'CPOL', 'CPHA'],
    hint: '极性+相位'
  },
  // ===== 基础测试 - 操作系统概念 =====
  {
    id: 9401,
    chapter: 'basics-test',
    type: 'choice',
    title: '进程和线程的主要区别是？',
    description: '进程vs线程',
    options: [
      { id: 'A', text: '进程快，线程慢' },
      { id: 'B', text: '进程有独立地址空间，线程共享地址空间' },
      { id: 'C', text: '线程不能通信' },
      { id: 'D', text: '没有区别' }
    ],
    correctAnswer: 'B',
    explanation: '进程有独立地址空间，开销大。线程共享进程地址空间，开销小。线程间通信更方便。',
    difficulty: 2,
    knowledgePoints: ['进程', '线程', '地址空间'],
    hint: '独立地址空间'
  },
  {
    id: 9402,
    chapter: 'basics-test',
    type: 'choice',
    title: '死锁的必要条件包括？',
    description: '死锁',
    options: [
      { id: 'A', text: '只有互斥' },
      { id: 'B', text: '互斥+占有并等待+不抢占+循环等待' },
      { id: 'C', text: '只有同步' },
      { id: 'D', text: '只要加锁就会死锁' }
    ],
    correctAnswer: 'B',
    explanation: '死锁四个必要条件：互斥、占有并等待、不可抢占、循环等待。打破任一条件可防止死锁。',
    difficulty: 3,
    knowledgePoints: ['死锁', '必要条件', '操作系统'],
    hint: '四个必要条件'
  },
  {
    id: 9403,
    chapter: 'basics-test',
    type: 'choice',
    title: '信号量(Semaphore)主要用于？',
    description: '信号量',
    options: [
      { id: 'A', text: '存储数据' },
      { id: 'B', text: '进程/线程同步与互斥' },
      { id: 'C', text: '进程间通信' },
      { id: 'D', text: '内存分配' }
    ],
    correctAnswer: 'B',
    explanation: '信号量是进程/线程同步与互斥的常用机制，通过P/V操作控制访问。',
    difficulty: 2,
    knowledgePoints: ['信号量', '同步', '互斥'],
    hint: '同步互斥'
  },
  // ===== 基础测试 - 模块化编程 =====
  {
    id: 9404,
    chapter: 'basics-test',
    type: 'choice',
    title: '模块化编程的优点不包括？',
    description: '模块化',
    options: [
      { id: 'A', text: '代码复用' },
      { id: 'B', text: '降低复杂度' },
      { id: 'C', text: '编译更快' },
      { id: 'D', text: '便于调试维护' }
    ],
    correctAnswer: 'C',
    explanation: '模块化优点：代码复用、降低复杂度、便于调试维护。模块化可能增加编译时间（需要更多链接）。',
    difficulty: 2,
    knowledgePoints: ['模块化', '编程思想'],
    hint: '可能增加编译时间'
  },
  {
    id: 9405,
    chapter: 'basics-test',
    type: 'choice',
    title: '.h头文件通常包含？',
    description: '头文件内容',
    options: [
      { id: 'A', text: '函数实现' },
      { id: 'B', text: '函数声明、宏定义、结构体定义' },
      { id: 'C', text: '变量定义' },
      { id: 'D', text: '可执行代码' }
    ],
    correctAnswer: 'B',
    explanation: '头文件(.h)放声明：函数原型、宏定义、类型定义、结构体等。实现(.c)放具体代码。',
    difficulty: 1,
    knowledgePoints: ['头文件', '声明', '模块化'],
    hint: '放声明不放实现'
  },
  // ===== 基础测试 - 错误处理 =====
  {
    id: 9406,
    chapter: 'basics-test',
    type: 'choice',
    title: '函数返回-1通常表示？',
    description: '返回值',
    options: [
      { id: 'A', text: '成功' },
      { id: 'B', text: '错误/失败' },
      { id: 'C', text: '无效参数' },
      { id: 'D', text: '未知' }
    ],
    correctAnswer: 'B',
    explanation: '很多函数用-1表示错误或失败，用0表示成功。具体看函数文档。',
    difficulty: 1,
    knowledgePoints: ['返回值', '错误处理'],
    hint: '-1表示失败'
  },
  {
    id: 9407,
    chapter: 'basics-test',
    type: 'choice',
    title: 'NULL指针可以解引用吗？',
    description: 'NULL指针',
    options: [
      { id: 'A', text: '可以' },
      { id: 'B', text: '不可以，会崩溃' },
      { id: 'C', text: '取决于系统' },
      { id: 'D', text: '返回0' }
    ],
    correctAnswer: 'B',
    explanation: 'NULL表示空指针，解引用会导致段错误(segfault)或程序崩溃。使用前必须检查。',
    difficulty: 1,
    knowledgePoints: ['NULL', '指针', '段错误'],
    hint: '解引用会崩溃',
    visualization: { type: 'html', file: 'null-pointer-viz.html' }
  },
  // ===== 基础语法入门 =====
  {
    id: 1,
    chapter: 'basics',
    type: 'fill',
    title: '完成Hello World程序',
    description: '填写正确的关键字使程序能够输出"Hello World"',
    code: `#include <stdio.h>

___① main() {
    printf("Hello World");
    ___② 0;
}`,
    blanks: [
      { hint: '返回类型', answer: 'int' },
      { hint: '返回语句关键字', answer: 'return' }
    ],
    explanation: 'main函数的标准返回类型是int，使用return语句返回0表示程序正常结束。',
    difficulty: 1,
    vocabulary: [
      { word: 'int', meaning: '整数 (Integer)' },
      { word: 'main', meaning: '主要/入口' },
      { word: 'return', meaning: '返回' },
      { word: 'printf', meaning: '打印格式化 (Print Formatted)' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-001.html'
    }
  },
  {
    id: 2,
    chapter: 'basics',
    type: 'fill',
    title: '引入标准输入输出库',
    description: '填写正确的预处理指令和头文件',
    code: `___①<stdio.h>

int main() {
    printf("Hello");
    return 0;
}`,
    blanks: [
      { hint: '预处理指令', answer: ['#include ', '#include'] }
    ],
    explanation: '#include是C语言的预处理指令，用于将头文件内容包含到当前文件中。stdio.h包含了printf、scanf等函数。',
    difficulty: 1,
    vocabulary: [
      { word: 'include', meaning: '包含/引入' },
      { word: 'stdio', meaning: '标准输入输出 (Standard Input Output)' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-002.html'
    }
  },
  {
    id: 3,
    chapter: 'basics',
    type: 'output',
    title: '预测程序输出',
    description: '仔细分析代码，写出程序的输出结果',
    code: `#include <stdio.h>

int main() {
    printf("A");
    printf("B");
    printf("C");
    return 0;
}`,
    correctOutput: 'ABC',
    explanation: 'printf不会自动换行，三个printf依次输出A、B、C，最终输出"ABC"。如果想换行需要使用\\n。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-003.html'
    }
  },
  {
    id: 4,
    chapter: 'basics',
    type: 'output',
    title: '换行符的作用',
    description: '预测包含换行符的程序输出（用实际换行表示\\n的效果）',
    code: `#include <stdio.h>

int main() {
    printf("Line1\\nLine2");
    return 0;
}`,
    correctOutput: 'Line1\nLine2',
    explanation: '\\n是换行符，会使输出换到下一行。所以输出第一行是Line1，第二行是Line2。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-004.html'
    }
  },
  {
    id: 5,
    chapter: 'basics',
    type: 'fill',
    title: '语句结束符',
    description: '在C语言中，每条语句必须以特定符号结尾',
    code: `int main() {
    int x = 10___①
    printf("%d", x)___①
    return 0___①
}`,
    blanks: [
      { hint: '语句结束符', answer: ';' }
    ],
    explanation: 'C语言中每条语句必须以分号(;)结尾，这告诉编译器一条语句的结束位置。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-005.html'
    }
  },
  {
    id: 6,
    chapter: 'basics',
    type: 'debug',
    title: '找出语法错误',
    description: '这段代码有一个语法错误，找出错误所在的行号',
    code: `1 | #include <stdio.h>
2 | 
3 | int main() {
4 |     printf("Hello World")
5 |     return 0;
6 | }`,
    bugLine: 4,
    bugFix: '    printf("Hello World");',
    explanation: '第4行的printf语句末尾缺少分号。在C语言中，每条语句都必须以分号结尾。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-006.html'
    }
  },
  {
    id: 7,
    chapter: 'basics',
    type: 'fill',
    title: '注释的写法',
    description: '使用正确的单行注释语法',
    code: `#include <stdio.h>

int main() {
    ___① 这是一条注释
    printf("Hello");
    return 0;
}`,
    blanks: [
      { hint: '单行注释符号', answer: '//' }
    ],
    explanation: 'C语言支持两种注释：// 单行注释 和 /* 多行注释 */。注释内容不会被编译执行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-007.html'
    }
  },
  {
    id: 8,
    chapter: 'basics',
    type: 'output',
    title: '制表符的效果',
    description: '预测输出结果（\\t表示Tab制表符，用4个空格表示）',
    code: `printf("A\\tB\\tC");`,
    correctOutput: 'A\tB\tC',
    explanation: '\\t是制表符（Tab），会产生一定的空白间隔，通常用于对齐输出。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-008.html'
    }
  },
  {
    id: 9,
    chapter: 'basics',
    type: 'debug',
    title: '头文件错误',
    description: '程序无法编译，找出问题所在',
    code: `1 | include <stdio.h>
2 | 
3 | int main() {
4 |     printf("Hello");
5 |     return 0;
6 | }`,
    bugLine: 1,
    bugFix: '#include <stdio.h>',
    explanation: '预处理指令必须以#开头。#include告诉预处理器将指定头文件的内容包含进来。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-009.html'
    }
  },
  {
    id: 10,
    chapter: 'basics',
    type: 'fill',
    title: '转义字符',
    description: '使用正确的转义字符输出反斜杠本身',
    code: `printf("C:___①Windows___①System32");
// 期望输出: C:\\Windows\\System32`,
    blanks: [
      { hint: '输出反斜杠的转义字符', answer: '\\\\' }
    ],
    explanation: '反斜杠\\是转义字符的开始标志，要输出反斜杠本身，需要使用\\\\（两个反斜杠）。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-010.html'
    }
  },
  {
    id: 11,
    chapter: 'basics',
    type: 'output',
    title: '多个printf的输出',
    description: '分析代码执行顺序',
    code: `printf("1");
printf("2");
printf("3\\n");
printf("4");`,
    correctOutput: '123\n4',
    explanation: 'printf按顺序执行，前三个输出123，第三个末尾有\\n换行，所以4在新行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-011.html'
    }
  },
  {
    id: 12,
    chapter: 'basics',
    type: 'fill',
    title: '程序入口函数',
    description: 'C程序的执行从哪个函数开始？',
    code: `#include <stdio.h>

int ___①() {
    printf("程序开始");
    return 0;
}`,
    blanks: [
      { hint: '入口函数名', answer: 'main' }
    ],
    explanation: 'main是C程序的入口函数，每个C程序有且只有一个main函数，程序从这里开始执行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-012.html'
    }
  },
  {
    id: 13,
    chapter: 'basics',
    type: 'debug',
    title: '返回值类型错误',
    description: '这个程序能运行但有警告，找出问题',
    code: `1 | #include <stdio.h>
2 | 
3 | void main() {
4 |     printf("Hello");
5 |     return 0;
6 | }`,
    bugLine: 3,
    bugFix: 'int main() {',
    explanation: 'main函数的标准返回类型应该是int而不是void。虽然某些编译器允许void main()，但这不是标准写法，且与return 0矛盾。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-013.html'
    }
  },
  {
    id: 14,
    chapter: 'basics',
    type: 'output',
    title: '空printf',
    description: '预测这个printf的输出',
    code: `printf("");`,
    correctOutput: '',
    explanation: '空字符串""中没有任何字符，所以printf什么都不输出（输出空）。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-014.html'
    }
  },
  {
    id: 15,
    chapter: 'basics',
    type: 'fill',
    title: '头文件的括号',
    description: '系统头文件使用什么括号包围？',
    code: `#include ___①stdio.h___②

int main() {
    return 0;
}`,
    blanks: [
      { hint: '开始括号', answer: '<' },
      { hint: '结束括号', answer: '>' }
    ],
    explanation: '系统头文件使用尖括号<>，自定义头文件使用双引号""。<>告诉编译器在系统目录查找，""先在当前目录查找。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-015.html'
    }
  },
  {
    id: 16,
    chapter: 'basics',
    type: 'output',
    title: '多个printf的输出',
    description: '分析代码执行顺序',
    code: `printf("1");
printf("2");
printf("3\\n");
printf("4");`,
    correctOutput: '123\n4',
    explanation: 'printf按顺序执行，前三个输出123，第三个末尾有\\n换行，所以4在新行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-016.html'
    }
  },
  {
    id: 17,
    chapter: 'basics',
    type: 'fill',
    title: '程序入口函数',
    description: 'C程序的执行从哪个函数开始？',
    code: `#include <stdio.h>

int ___①() {
    printf("程序开始");
    return 0;
}`,
    blanks: [
      { hint: '入口函数名', answer: 'main' }
    ],
    explanation: 'main是C程序的入口函数，每个C程序有且只有一个main函数，程序从这里开始执行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-017.html'
    }
  },
  {
    id: 18,
    chapter: 'basics',
    type: 'debug',
    title: '返回值类型错误',
    description: '这个程序能运行但有警告，找出问题',
    code: `1 | #include <stdio.h>
2 | 
3 | void main() {
4 |     printf("Hello");
5 |     return 0;
6 | }`,
    bugLine: 3,
    bugFix: 'int main() {',
    explanation: 'main函数的标准返回类型应该是int而不是void。虽然某些编译器允许void main()，但这不是标准写法，且与return 0矛盾。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-018.html'
    }
  },
  {
    id: 19,
    chapter: 'basics',
    type: 'output',
    title: '空printf',
    description: '预测这个printf的输出',
    code: `printf("");`,
    correctOutput: '',
    explanation: '空字符串""中没有任何字符，所以printf什么都不输出（输出空）。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-019.html'
    }
  },
  {
    id: 20,
    chapter: 'basics',
    type: 'fill',
    title: '转义字符组合',
    description: '使用转义字符输出特殊内容',
    code: `printf("路径: C:\\\\Windows___①System32\\n文件.txt");`,
    blanks: [
      { hint: '路径分隔符', answer: '\\' }
    ],
    explanation: '在字符串中，单个\\表示转义字符的开始，要输出\\本身需要使用\\\\（两个反斜杠）。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-020.html'
    }
  },
  {
    id: 21,
    chapter: 'basics',
    type: 'output',
    title: '连续换行',
    description: '预测输出结果',
    code: `printf("A\\n\\nB");`,
    correctOutput: 'A\n\nB',
    explanation: '\\n是换行符，两个\\n会产生两个空行，A和B之间空两行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-021.html'
    }
  },
  {
    id: 22,
    chapter: 'basics',
    type: 'fill',
    title: '预处理指令',
    description: '完成预处理指令',
    code: `___① <stdio.h>
___① <stdlib.h>

int main() {
    return 0;
}`,
    blanks: [
      { hint: '预处理指令', answer: '#include' }
    ],
    explanation: '#include是预处理指令，用于引入头文件。可以引入多个头文件，每个单独一行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-022.html'
    }
  },
  {
    id: 23,
    chapter: 'basics',
    type: 'output',
    title: '制表符与空格',
    description: '预测输出',
    code: `printf("A\\tB\\tC");`,
    correctOutput: 'A\tB\tC',
    explanation: '\\t是制表符（Tab），会产生固定的空白间隔，用于对齐输出。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-023.html'
    }
  },
  {
    id: 24,
    chapter: 'basics',
    type: 'debug',
    title: '缺少头文件',
    description: '程序无法编译，找出问题',
    code: `1 | int main() {
2 |     printf("Hello");
3 |     return 0;
4 | }`,
    bugLine: 1,
    bugFix: '#include <stdio.h>\n\nint main() {',
    explanation: '使用了printf函数但没有引入stdio.h头文件。需要在使用前添加#include <stdio.h>。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-024.html'
    }
  },
  {
    id: 25,
    chapter: 'basics',
    type: 'fill',
    title: '双引号字符串',
    description: '字符串用什么包围？',
    code: `printf(___①Hello World___①);`,
    blanks: [
      { hint: '字符串界定符', answer: '"' }
    ],
    explanation: '字符串常量使用双引号""包围。单引号\'\'用于单个字符。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-025.html'
    }
  },
  {
    id: 26,
    chapter: 'basics',
    type: 'output',
    title: '字符输出',
    description: '预测输出',
    code: `printf("%c", 'A');`,
    correctOutput: 'A',
    explanation: '%c是字符格式说明符，输出单个字符。字符常量用单引号包围。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-026.html'
    }
  },
  {
    id: 27,
    chapter: 'basics',
    type: 'fill',
    title: 'main函数参数',
    description: '标准main函数的返回类型',
    code: `___① main() {
    printf("Hello");
    return 0;
}`,
    blanks: [
      { hint: '返回类型', answer: 'int' }
    ],
    explanation: 'main函数的标准返回类型是int，表示程序执行状态。return 0表示正常退出。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-027.html'
    }
  },
  {
    id: 28,
    chapter: 'basics',
    type: 'output',
    title: '混合输出',
    description: '预测输出',
    code: `printf("Num: %d, Char: %c", 10, 'A');`,
    correctOutput: 'Num: 10, Char: A',
    explanation: 'printf可以同时输出多个值，按顺序对应格式说明符。%d对应10，%c对应\'A\'。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-028.html'
    }
  },
  {
    id: 29,
    chapter: 'basics',
    type: 'debug',
    title: '字符串引号错误',
    description: '找出语法错误',
    code: `1 | int main() {
2 |     printf('Hello World');
3 |     return 0;
4 | }`,
    bugLine: 2,
    bugFix: '    printf("Hello World");',
    explanation: '字符串必须使用双引号""，单引号\'\'只用于单个字符。\'Hello World\'不是合法的字符。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-029.html'
    }
  },
  {
    id: 30,
    chapter: 'basics',
    type: 'fill',
    title: '注释符号',
    description: '使用正确的注释语法',
    code: `int x = 10; ___① 这是一个变量`,
    blanks: [
      { hint: '单行注释符号', answer: '//' }
    ],
    explanation: 'C语言支持两种注释：// 单行注释 和 /* 多行注释 */。注释内容不会被编译执行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-030.html'
    }
  },

  // ===== 变量与数据类型 =====
  {
    id: 31,
    chapter: 'variables',
    type: 'fill',
    title: '声明整型变量',
    description: '声明一个整型变量并初始化',
    code: `___① age = 20;`,
    blanks: [
      { hint: '整型关键字', answer: 'int' }
    ],
    explanation: 'int是C语言中最常用的整数类型，占用4字节（32位系统），可以存储约-21亿到+21亿的整数。',
    difficulty: 1,
    vocabulary: [
      { word: 'int', meaning: '整数 (Integer) - 用于存储整数' },
      { word: 'age', meaning: '年龄' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-031.html'
    }
  },
  {
    id: 32,
    chapter: 'variables',
    type: 'fill',
    title: '声明浮点数',
    description: '声明一个浮点数变量存储价格',
    code: `___① price = 9.99;`,
    blanks: [
      { hint: '浮点数类型（单精度）', answer: ['float', 'double'] }
    ],
    explanation: 'float是单精度浮点数（4字节），double是双精度浮点数（8字节）。存储小数都可以使用这两种类型。',
    difficulty: 1,
    vocabulary: [
      { word: 'float', meaning: '单精度浮点数 - 用于存储小数' },
      { word: 'double', meaning: '双精度浮点数 - 精度更高的小数' },
      { word: 'price', meaning: '价格' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-032.html'
    }
  },
  {
    id: 33,
    chapter: 'variables',
    type: 'fill',
    title: '声明字符变量',
    description: '声明一个字符变量存储字母',
    code: `___① grade = 'A';`,
    blanks: [
      { hint: '字符类型', answer: 'char' }
    ],
    explanation: 'char类型用于存储单个字符，占用1字节。字符常量使用单引号包围，如\'A\'、\'B\'。',
    difficulty: 1,
    vocabulary: [
      { word: 'char', meaning: '字符 (Character) - 存储单个字母/符号' },
      { word: 'grade', meaning: '等级/成绩' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-033.html'
    }
  },
  {
    id: 34,
    chapter: 'variables',
    type: 'output',
    title: '整数格式化输出',
    description: '预测printf的输出结果',
    code: `int x = 42;
printf("%d", x);`,
    correctOutput: '42',
    explanation: '%d是整数的格式说明符，printf会将变量x的值（42）替换%d的位置输出。',
    difficulty: 1,
    vocabulary: [
      { word: '%d', meaning: '十进制整数格式 (Decimal)' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-034.html'
    }
  },
  {
    id: 35,
    chapter: 'variables',
    type: 'fill',
    title: 'scanf读取输入',
    description: '正确使用scanf读取整数',
    code: `int num;
scanf("%d", ___①num);`,
    blanks: [
      { hint: '取地址符', answer: '&' }
    ],
    explanation: 'scanf需要知道变量的内存地址才能存入数据，所以必须使用&取地址符。这是初学者最常忘记的！',
    difficulty: 1,
    vocabulary: [
      { word: 'scanf', meaning: '扫描格式化输入 (Scan Formatted)' },
      { word: '&', meaning: '取地址符 (Address of)' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-035.html'
    }
  },
  {
    id: 36,
    chapter: 'variables',
    type: 'output',
    title: '整数除法',
    description: '注意：两个整数相除的结果',
    code: `int a = 10;
int b = 3;
printf("%d", a / b);`,
    correctOutput: '3',
    explanation: '两个int相除，结果也是int，小数部分被截断。10÷3=3余1，所以结果是3而不是3.33。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-036.html'
    }
  },
  {
    id: 37,
    chapter: 'variables',
    type: 'debug',
    title: 'scanf缺少取地址符',
    description: '这段代码可能导致程序崩溃，找出错误',
    code: `1 | int age;
2 | scanf("%d", age);
3 | printf("年龄: %d", age);`,
    bugLine: 2,
    bugFix: 'scanf("%d", &age);',
    explanation: 'scanf的第二个参数需要变量的地址（使用&），而不是变量本身。缺少&会导致程序行为未定义，可能崩溃。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-037.html'
    }
  },
  {
    id: 38,
    chapter: 'variables',
    type: 'output',
    title: 'ASCII码',
    description: '字符可以当作数字使用',
    code: `char c = 'A';
printf("%d", c);`,
    correctOutput: '65',
    explanation: '字符在内存中以ASCII码形式存储。\'A\'的ASCII码是65，用%d输出字符会显示其ASCII码值。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-038.html'
    }
  },
  {
    id: 39,
    chapter: 'variables',
    type: 'fill',
    title: '常量声明',
    description: '使用const声明一个常量',
    code: `___① int MAX = 100;
// MAX的值不能被修改`,
    blanks: [
      { hint: '常量修饰符', answer: 'const' }
    ],
    explanation: 'const修饰的变量是常量，初始化后不能被修改。常量名通常用大写字母，这是编程约定。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-039.html'
    }
  },
  {
    id: 40,
    chapter: 'variables',
    type: 'output',
    title: '浮点数输出',
    description: '默认浮点数输出格式',
    code: `float f = 3.5;
printf("%f", f);`,
    correctOutput: '3.500000',
    explanation: '%f默认输出6位小数。如果想控制小数位数，可以用%.2f（保留2位小数）。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-040.html'
    }
  },
  {
    id: 41,
    chapter: 'variables',
    type: 'debug',
    title: '类型不匹配',
    description: '格式说明符与变量类型不匹配',
    code: `1 | float price = 9.99;
2 | printf("%d", price);`,
    bugLine: 2,
    bugFix: 'printf("%f", price);',
    explanation: 'float类型应该使用%f格式说明符，使用%d会输出错误的值。类型匹配：int用%d，float用%f，char用%c。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-041.html'
    }
  },
  {
    id: 42,
    chapter: 'variables',
    type: 'output',
    title: '字符输出',
    description: '用%c输出数字会得到什么？',
    code: `printf("%c", 66);`,
    correctOutput: 'B',
    explanation: '%c将数字作为ASCII码解释并输出对应字符。66是\'B\'的ASCII码，所以输出B。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-042.html'
    }
  },
  {
    id: 43,
    chapter: 'variables',
    type: 'fill',
    title: '变量初始化',
    description: '在一行内声明并初始化多个变量',
    code: `int a = 1___① b = 2___① c = 3;`,
    blanks: [
      { hint: '变量分隔符', answer: ',' }
    ],
    explanation: '同类型的多个变量可以在一行内声明，用逗号分隔。如：int a = 1, b = 2, c = 3;',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-043.html'
    }
  },
  {
    id: 44,
    chapter: 'variables',
    type: 'output',
    title: '取模运算',
    description: '%运算符求余数',
    code: `printf("%d", 17 % 5);`,
    correctOutput: '2',
    explanation: '%是取模（取余数）运算符。17÷5=3余2，所以17%5=2。常用于判断奇偶：n%2==0则为偶数。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-044.html'
    }
  },
  {
    id: 45,
    chapter: 'variables',
    type: 'output',
    title: 'sizeof运算符',
    description: 'sizeof返回类型占用的字节数',
    code: `printf("%lu", sizeof(int));`,
    correctOutput: '4',
    explanation: '在大多数现代系统（32位和64位）上，int占用4字节（32位）。sizeof返回数据类型的字节大小。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-045.html'
    }
  },
  {
    id: 46,
    chapter: 'variables',
    type: 'fill',
    title: '多个变量声明',
    description: '声明多个不同类型的变量',
    code: `int num = 10;
___① price = 19.99;
___① grade = 'A';`,
    blanks: [
      { hint: '浮点类型', answer: 'float' },
      { hint: '字符类型', answer: 'char' }
    ],
    explanation: '不同类型的变量需要分别声明。int存整数，float存小数，char存字符。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-046.html'
    }
  },
  {
    id: 47,
    chapter: 'variables',
    type: 'output',
    title: '浮点数精度',
    description: 'float和double的区别',
    code: `float f = 1.0f / 3.0;
double d = 1.0 / 3.0;
printf("%.6f %.6f", f, d);`,
    correctOutput: '0.333333 0.333333',
    explanation: 'float和double的精度不同，但对于1/3这样的简单运算，输出相同。double有更高精度。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-047.html'
    }
  },
  {
    id: 48,
    chapter: 'variables',
    type: 'debug',
    title: '未初始化变量',
    description: '使用未初始化的变量',
    code: `1 | int x;
2 | printf("%d", x);`,
    bugLine: 2,
    bugFix: 'int x = 0;\nprintf("%d", x);',
    explanation: '变量x声明后没有初始化就使用，其值是未定义的（垃圾值）。应该在使用前初始化变量。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-048.html'
    }
  },
  {
    id: 49,
    chapter: 'variables',
    type: 'fill',
    title: 'short和long',
    description: '使用short和long修饰符',
    code: `___① int small = 100;
___① int large = 1000000;`,
    blanks: [
      { hint: '短整型', answer: 'short' },
      { hint: '长整型', answer: 'long' }
    ],
    explanation: 'short int占用2字节（-32768到32767），long int占用8字节（更大范围）。根据需要选择。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-049.html'
    }
  },
  {
    id: 50,
    chapter: 'variables',
    type: 'output',
    title: '字符与整数运算',
    description: '字符参与算术运算',
    code: `char c = 'A';
printf("%d %c", c + 1, c + 1);`,
    correctOutput: '66 B',
    explanation: '字符可以参与算术运算，使用其ASCII码值。\'A\'(65)+1=66，对应字符\'B\'。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-050.html'
    }
  },
  {
    id: 51,
    chapter: 'variables',
    type: 'fill',
    title: 'unsigned修饰符',
    description: '使用unsigned表示无符号数',
    code: `___① int count = 100;`,
    blanks: [
      { hint: '无符号修饰符', answer: 'unsigned' }
    ],
    explanation: 'unsigned表示无符号数，只能存储非负整数。unsigned int的范围是0到约42亿，比int大一倍。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-051.html'
    }
  },
  {
    id: 52,
    chapter: 'variables',
    type: 'output',
    title: '浮点数除法',
    description: '浮点数除法保留小数',
    code: `float a = 10;
float b = 3;
printf("%.2f", a / b);`,
    correctOutput: '3.33',
    explanation: '浮点数相除会保留小数部分。%.2f表示保留2位小数。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-052.html'
    }
  },
  {
    id: 53,
    chapter: 'variables',
    type: 'debug',
    title: 'scanf格式错误',
    description: '格式说明符与变量类型不匹配',
    code: `1 | int num;
2 | scanf("%f", &num);`,
    bugLine: 2,
    bugFix: 'scanf("%d", &num);',
    explanation: 'scanf的格式说明符必须与变量类型匹配。int用%d，float用%f，char用%c。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-053.html'
    }
  },
  {
    id: 54,
    chapter: 'variables',
    type: 'fill',
    title: '变量命名规则',
    description: '选择合法的变量名',
    code: `int ___① = 10;  // 合法变量名`,
    blanks: [
      { hint: '合法变量名', answer: ['myVar', 'my_var', 'MyVar', 'var1'] }
    ],
    explanation: '变量名只能包含字母、数字、下划线，必须以字母或下划线开头，不能使用关键字。myVar是合法的命名。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-054.html'
    }
  },
  {
    id: 55,
    chapter: 'variables',
    type: 'output',
    title: '自增输出',
    description: '理解++运算符',
    code: `int x = 5;
int a = x++;
int b = ++x;
printf("%d %d", a, b);`,
    correctOutput: '5 7',
    explanation: 'x++先返回5再自增（x变为6），++x先自增再返回7（x变为7）。分步执行避免未定义行为，是正确的编程习惯。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-055.html'
    }
  },
  {
    id: 56,
    chapter: 'variables',
    type: 'fill',
    title: '多变量赋值',
    description: '同时给多个变量赋相同值',
    code: `int a, b, c;
a = b = c = 10;`,
    blanks: [],
    explanation: '赋值运算符=是右结合的，从右向左执行。c=10，然后b=c，最后a=b。最终三个变量都是10。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-056.html'
    }
  },

  // ===== 运算符与表达式 =====
  {
    id: 57,
    chapter: 'operators',
    type: 'output',
    title: '运算符优先级',
    description: '先乘除后加减',
    code: `printf("%d", 2 + 3 * 4);`,
    correctOutput: '14',
    explanation: '乘法优先级高于加法，所以先算3*4=12，再算2+12=14。如果想先算加法需要用括号：(2+3)*4=20。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-057.html'
    }
  },
  {
    id: 58,
    chapter: 'operators',
    type: 'output',
    title: '自增运算符综合：前缀vs后缀',
    description: '嵌入式调试计数器场景，理解++i和i++的本质区别',
    code: `int i = 1, j = 1;
int a = i++ + ++i;
int b = ++j + j++;
printf("%d %d %d %d", i, j, a, b);`,
    correctOutput: '3 3 4 4',
    explanation: '这是一个★★★难度的综合题，考察前缀/后缀自增的求值时机和副作用顺序。\n\n**变量i的执行过程：**\n1. i初始值为1\n2. i++：先返回1，然后i变为2\n3. ++i：先i变为3，然后返回3\n4. a = 1 + 3 = 4\n5. 最终i = 3\n\n**变量j的执行过程：**\n1. j初始值为1\n2. ++j：先j变为2，然后返回2\n3. j++：先返回2，然后j变为3\n4. b = 2 + 2 = 4\n5. 最终j = 3\n\n**关键记忆口诀：**\n- 前缀++i：「先加后用」，表达式用新值\n- 后缀i++：「先用后加」，表达式用旧值\n\n**⚠️ 注意：** 同一变量在表达式中多次自增是未定义行为(UB)，实际面试/考试中不会出现，但本题i和j是独立变量，用于理解求值顺序。',
    difficulty: 3,
    knowledgePoints: ['自增运算符', '前缀vs后缀', '表达式求值', '副作用顺序', '未定义行为'],
    hint: '分开看每个变量：i++返回旧值，++i返回新值。注意自增的副作用(变量值改变)在序列点之前完成。',
    commonMistakes: [
      '认为i++ + ++i是未定义行为（实际是，但本题为教学目的分开说明）',
      '混淆前缀和后缀的返回值时机',
      '忽略自增对变量本身的副作用'
    ],
    lineAnalysis: [
      { num: 1, explanation: '声明i和j，初始值都为1', memoryChange: 'i=1, j=1' },
      { num: 2, explanation: 'i++返回1(旧值)，i变为2；然后++i使i变为3，返回3；a=1+3=4', memoryChange: 'i=3, a=4' },
      { num: 3, explanation: '++j使j变为2，返回2；然后j++返回2(旧值)，j变为3；b=2+2=4', memoryChange: 'j=3, b=4' },
      { num: 4, explanation: '输出i=3, j=3, a=4, b=4', memoryChange: '' }
    ],
    memoryViz: {
      cells: [
        { name: 'i', address: '0x1000', value: '3', type: 'variable', changed: true },
        { name: 'j', address: '0x1004', value: '3', type: 'variable', changed: true },
        { name: 'a', address: '0x1008', value: '4', type: 'variable' },
        { name: 'b', address: '0x100C', value: '4', type: 'variable' }
      ],
      layout: 'stack'
    },
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-058.html'
    }
  },
  {
    id: 59,
    chapter: 'operators',
    type: 'fill',
    title: '自增运算符实战：循环索引',
    description: '数组遍历场景，选择合适的前缀/后缀自增',
    code: `int arr[] = {10, 20, 30, 40, 50};
int i = 0;

// 场景1：先访问当前元素，再移动到下一个
printf("%d ", arr[___①___]);

// 场景2：先移动到下一个，再访问元素  
printf("%d ", arr[___②___]);

// 最终i的值是___③___`,
    blanks: [
      { hint: '先用当前值，再自增', answer: 'i++' },
      { hint: '先自增，再用新值', answer: '++i' },
      { hint: '最终i的值', answer: ['2', '2;'] }
    ],
    explanation: '★★★实战题：理解前缀/后缀自增在实际编程中的选择。\n\n**场景分析：**\n\n1. **arr[i++]** - 「先用后加」\n   - 先访问arr[0]的值10\n   - 然后i自增为1\n   - 适合：先处理当前元素，再准备下一个\n\n2. **arr[++i]** - 「先加后用」\n   - 先i自增为2\n   - 然后访问arr[2]的值30\n   - 适合：跳过当前，直接处理下一个\n\n**最终i = 2**\n\n**编程建议：**\n- 循环遍历通常用i++（标准写法）\n- 需要跳过第一个元素时用++i\n- 嵌入式中，++i可能更高效（避免临时变量）',
    difficulty: 3,
    knowledgePoints: ['自增运算符', '数组访问', '循环索引', '前缀vs后缀选择', '代码优化'],
    hint: 'i++返回旧值，++i返回新值。想想数组索引的变化顺序。',
    commonMistakes: [
      '混淆i++和++i的返回值',
      '忘记自增会改变变量本身的值',
      '在复杂表达式中混用导致越界'
    ],
    lineAnalysis: [
      { num: 1, explanation: '声明数组arr，包含5个元素', memoryChange: 'arr=[10,20,30,40,50]' },
      { num: 2, explanation: '声明索引i，初始为0', memoryChange: 'i=0' },
      { num: 5, explanation: 'i++返回0，访问arr[0]=10，然后i变为1', memoryChange: '输出10, i=1' },
      { num: 8, explanation: '++i使i变为2，返回2，访问arr[2]=30', memoryChange: '输出30, i=2' },
      { num: 10, explanation: '最终i的值为2', memoryChange: 'i=2' }
    ],
    memoryViz: {
      cells: [
        { name: 'arr[0]', address: '0x1000', value: '10', type: 'array' },
        { name: 'arr[1]', address: '0x1004', value: '20', type: 'array' },
        { name: 'arr[2]', address: '0x1008', value: '30', type: 'array' },
        { name: 'arr[3]', address: '0x100C', value: '40', type: 'array' },
        { name: 'arr[4]', address: '0x1010', value: '50', type: 'array' },
        { name: 'i', address: '0x2000', value: '2', type: 'variable', changed: true }
      ],
      layout: 'stack'
    },
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-059.html'
    }
  },
  {
    id: 60,
    chapter: 'operators',
    type: 'fill',
    title: '相等比较运算符',
    description: '判断两个值是否相等用什么符号？',
    code: `int a = 5;
if (a ___① 5) {
    printf("相等");
}`,
    blanks: [
      { hint: '相等比较运算符', answer: '==' }
    ],
    explanation: '==是比较运算符（判断是否相等），=是赋值运算符。这是C语言最容易混淆的点！if(a=5)是赋值，永远为真。',
    difficulty: 1,
    vocabulary: [
      { word: 'if', meaning: '如果 (条件判断)' },
      { word: '==', meaning: '等于 (比较运算)' },
      { word: '=', meaning: '赋值 (将右边的值给左边)' }
    ],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-060.html'
    }
  },
  {
    id: 61,
    chapter: 'operators',
    type: 'output',
    title: '逻辑与运算',
    description: '&&运算符的规则',
    code: `int result = (5 > 3) && (2 > 4);
printf("%d", result);`,
    correctOutput: '0',
    explanation: '&&要求两边都为真结果才为真。5>3为真(1)，2>4为假(0)，真&&假=假，所以结果是0。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-061.html'
    }
  },
  {
    id: 62,
    chapter: 'operators',
    type: 'output',
    title: '逻辑或运算',
    description: '||运算符的规则',
    code: `int result = (5 > 3) || (2 > 4);
printf("%d", result);`,
    correctOutput: '1',
    explanation: '||只要有一边为真结果就为真。5>3为真(1)，2>4为假(0)，真||假=真，所以结果是1。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-062.html'
    }
  },
  {
    id: 63,
    chapter: 'operators',
    type: 'output',
    title: '逻辑非运算',
    description: '!运算符取反',
    code: `printf("%d", !(5 > 3));`,
    correctOutput: '0',
    explanation: '5>3为真(1)，!取反后变成假(0)。!真=假，!假=真。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-063.html'
    }
  },
  {
    id: 64,
    chapter: 'operators',
    type: 'fill',
    title: '复合赋值运算符',
    description: 'a = a + 5 的简写形式',
    code: `int a = 10;
a ___① 5;  // 等价于 a = a + 5`,
    blanks: [
      { hint: '复合赋值运算符', answer: '+=' }
    ],
    explanation: '+=是复合赋值运算符，a += 5等价于a = a + 5。类似的还有-=、*=、/=、%=等。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-064.html'
    }
  },
  {
    id: 65,
    chapter: 'operators',
    type: 'output',
    title: '三目运算符',
    description: '条件 ? 值1 : 值2',
    code: `int a = 10, b = 20;
int max = (a > b) ? a : b;
printf("%d", max);`,
    correctOutput: '20',
    explanation: '三目运算符：条件为真返回?后的值，为假返回:后的值。10>20为假，所以返回b的值20。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-065.html'
    }
  },
  {
    id: 66,
    chapter: 'operators',
    type: 'debug',
    title: '赋值与比较混淆',
    description: '找出逻辑错误（程序能运行但结果不对）',
    code: `1 | int password = 1234;
2 | int input = 0000;
3 | if (password = input) {
4 |     printf("密码正确");
5 | }`,
    bugLine: 3,
    bugFix: 'if (password == input) {',
    explanation: '第3行使用了=（赋值）而不是==（比较）。password=input会把input的值赋给password，然后判断这个值。非0即真，所以条件可能意外成立。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-066.html'
    }
  },
  {
    id: 67,
    chapter: 'operators',
    type: 'output',
    title: '位移运算',
    description: '左移相当于乘以2的幂次',
    code: `printf("%d", 3 << 2);`,
    correctOutput: '12',
    explanation: '<<是左移运算符。3的二进制是11，左移2位变成1100（十进制12）。左移n位相当于乘以2^n，3*4=12。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-067.html'
    }
  },
  {
    id: 68,
    chapter: 'operators',
    type: 'output',
    title: '短路求值',
    description: '&&的短路特性',
    code: `int a = 0;
int b = (a != 0) && (10 / a > 1);
printf("%d", b);`,
    correctOutput: '0',
    explanation: '&&有短路特性：左边为假时，右边不会执行。a!=0为假，所以10/a不会执行（否则会除以0崩溃）。结果为0。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-068.html'
    }
  },
  {
    id: 69,
    chapter: 'operators',
    type: 'fill',
    title: '不等于运算符',
    description: '判断两个值是否不相等',
    code: `int a = 5, b = 10;
if (a ___① b) {
    printf("不相等");
}`,
    blanks: [
      { hint: '不等于运算符', answer: '!=' }
    ],
    explanation: '!=是不等于运算符，返回1(真)或0(假)。5!=10为真，5!=5为假。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-069.html'
    }
  },
  {
    id: 70,
    chapter: 'operators',
    type: 'output',
    title: '自减运算符',
    description: '理解--运算符',
    code: `int a = 5;
int b = a--;
printf("%d %d", a, b);`,
    correctOutput: '4 5',
    explanation: 'a--是后置自减：先返回原值（5赋给b），然后a自减变成4。后置=先用后减。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-070.html'
    }
  },
  {
    id: 71,
    chapter: 'operators',
    type: 'output',
    title: '取反运算符',
    description: '按位取反',
    code: `printf("%d", ~5);`,
    correctOutput: '-6',
    explanation: '~是按位取反运算符。5的二进制是00000101，取反后是11111010（有符号数的-6）。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-071.html'
    }
  },
  {
    id: 72,
    chapter: 'operators',
    type: 'fill',
    title: '模运算符',
    description: '取余数运算符',
    code: `printf("%d", 10 ___① 3);`,
    blanks: [
      { hint: '取模运算符', answer: '%' }
    ],
    explanation: '%是取模（取余数）运算符。10÷3=3余1，所以10%3=1。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-072.html'
    }
  },
  {
    id: 73,
    chapter: 'operators',
    type: 'output',
    title: '复合运算符组合',
    description: '理解多个运算符的优先级',
    code: `int a = 5;
a += a * 2 - 3;
printf("%d", a);`,
    correctOutput: '12',
    explanation: '先算a*2=10，再算10-3=7，最后a+=7，a变成5+7=12。*=和-=优先级相同，从右向左。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-073.html'
    }
  },
  {
    id: 74,
    chapter: 'operators',
    type: 'debug',
    title: '分号位置错误',
    description: '找出语法错误',
    code: `1 | int a = 5
2 | int b = 10;
3 | if (a > b)
4 |     printf("a更大");`,
    bugLine: 3,
    bugFix: 'if (a > b) {',
    explanation: 'if语句的条件后缺少大括号{，导致语法错误。if(条件){语句}，条件和语句块用大括号分隔。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-074.html'
    }
  },
  {
    id: 75,
    chapter: 'operators',
    type: 'fill',
    title: '大于等于',
    description: '大于等于运算符',
    code: `int score = 60;
if (score ___① 60) {
    printf("及格");
}`,
    blanks: [
      { hint: '大于等于运算符', answer: '>=' }
    ],
    explanation: '>=是大于等于运算符。60>=60为真，59>=60为假。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-075.html'
    }
  },
  {
    id: 76,
    chapter: 'operators',
    type: 'output',
    title: '前置自减',
    description: '理解--a',
    code: `int a = 5;
int b = --a;
printf("%d %d", a, b);`,
    correctOutput: '4 4',
    explanation: '--a是前置自减：先自增（a变成4），然后返回新值（4赋给b）。前置=先减后用。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-076.html'
    }
  },
  {
    id: 77,
    chapter: 'operators',
    type: 'output',
    title: '逻辑运算优先级',
    description: '&&、||、!的优先级',
    code: `int result = !0 || 0 && 1;
printf("%d", result);`,
    correctOutput: '1',
    explanation: '!优先级最高，先算!0=1。然后&&优先级高于||，算0&&1=0。最后1||0=1。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-077.html'
    }
  },
  {
    id: 78,
    chapter: 'operators',
    type: 'fill',
    title: '自乘运算符',
    description: 'a = a * b 的简写',
    code: `int a = 5;
a ___① 2;  // 等价于 a = a * 2`,
    blanks: [
      { hint: '自乘运算符', answer: '*=' }
    ],
    explanation: '*=是自乘运算符，a *= 2等价于a = a * 2。类似的还有/=（自除）、%=（自取模）。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-078.html'
    }
  },
  {
    id: 79,
    chapter: 'operators',
    type: 'output',
    title: '右移运算',
    description: '>>右移运算符',
    code: `printf("%d", 16 >> 2);`,
    correctOutput: '4',
    explanation: '>>是右移运算符。16的二进制是10000，右移2位变成100（十进制4）。右移n位相当于除以2^n，16/4=4。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-079.html'
    }
  },
  {
    id: 80,
    chapter: 'operators',
    type: 'debug',
    title: '括号不匹配',
    description: '找出语法错误',
    code: `1 | int a = (5 + 3 * 2;
2 | printf("%d", a);`,
    bugLine: 1,
    bugFix: 'int a = (5 + 3) * 2;',
    explanation: '乘法优先级高于加法，5+3*2=5+6=11。如果想要(5+3)*2=16，需要加括号明确优先级。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-080.html'
    }
  },

  // ===== 控制流语句 =====
  {
    id: 81,
    chapter: 'control',
    type: 'fill',
    title: 'if条件语句',
    description: '完成条件判断语句',
    code: `int score = 85;
___① (score >= 60) {
    printf("及格");
}`,
    blanks: [
      { hint: '条件判断关键字', answer: 'if' }
    ],
    explanation: 'if语句用于条件判断，条件为真时执行大括号内的代码。条件表达式必须放在小括号内。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-081.html'
    }
  },
  {
    id: 82,
    chapter: 'control',
    type: 'output',
    title: 'if-else执行',
    description: '分析条件分支',
    code: `int x = 3;
if (x > 5) {
    printf("A");
} else {
    printf("B");
}`,
    correctOutput: 'B',
    explanation: 'x=3，3>5为假，所以执行else分支，输出B。if-else是二选一结构。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-082.html'
    }
  },
  {
    id: 83,
    chapter: 'control',
    type: 'fill',
    title: 'for循环结构',
    description: '补全for循环',
    code: `___①(int i = 0; i < 5; i++) {
    printf("%d ", i);
}`,
    blanks: [
      { hint: '循环关键字', answer: 'for' }
    ],
    explanation: 'for循环的语法：for(初始化; 条件; 更新)。这个循环会执行5次，i从0到4。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-083.html'
    }
  },
  {
    id: 84,
    chapter: 'control',
    type: 'output',
    title: 'for循环输出',
    description: '预测循环的输出',
    code: `for (int i = 1; i <= 3; i++) {
    printf("%d", i);
}`,
    correctOutput: '123',
    explanation: 'i从1开始，i<=3为真时执行。循环过程：i=1输出1，i=2输出2，i=3输出3，i=4时4<=3为假，结束。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-084.html'
    }
  },
  {
    id: 85,
    chapter: 'control',
    type: 'output',
    title: 'while循环',
    description: '分析while循环的执行',
    code: `int i = 5;
while (i > 0) {
    printf("%d", i);
    i -= 2;
}`,
    correctOutput: '531',
    explanation: 'i=5: 输出5，i变3；i=3: 输出3，i变1；i=1: 输出1，i变-1；i=-1: 条件为假，结束。输出531。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-085.html'
    }
  },
  {
    id: 86,
    chapter: 'control',
    type: 'fill',
    title: 'break语句',
    description: '跳出循环',
    code: `for (int i = 0; i < 10; i++) {
    if (i == 5) {
        ___①;  // 当i等于5时退出循环
    }
    printf("%d", i);
}
// 输出: 01234`,
    blanks: [
      { hint: '跳出循环的关键字', answer: 'break' }
    ],
    explanation: 'break语句立即退出当前循环。当i=5时执行break，循环终止，所以只输出01234。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-086.html'
    }
  },
  {
    id: 87,
    chapter: 'control',
    type: 'output',
    title: 'continue语句',
    description: '跳过本次循环',
    code: `for (int i = 0; i < 5; i++) {
    if (i == 2) continue;
    printf("%d", i);
}`,
    correctOutput: '0134',
    explanation: 'continue跳过本次循环的剩余代码。当i=2时执行continue，跳过printf，直接进入i=3。所以输出0134（没有2）。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-087.html'
    }
  },
  {
    id: 88,
    chapter: 'control',
    type: 'debug',
    title: '无限循环',
    description: '这个循环为什么停不下来？',
    code: `1 | int i = 0;
2 | while (i < 10) {
3 |     printf("%d ", i);
4 | }`,
    bugLine: 3,
    bugFix: '    printf("%d ", i);\n    i++;',
    explanation: '循环体内没有修改i的值，i永远是0，0<10永远为真，造成无限循环。需要添加i++来更新循环变量。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-088.html'
    }
  },
  {
    id: 89,
    chapter: 'control',
    type: 'output',
    title: 'switch-case',
    description: 'switch语句的执行',
    code: `int day = 2;
switch (day) {
    case 1: printf("Mon"); break;
    case 2: printf("Tue"); break;
    case 3: printf("Wed"); break;
    default: printf("Other");
}`,
    correctOutput: 'Tue',
    explanation: 'day=2匹配case 2，输出Tue，然后break跳出switch。如果没有break会继续执行下一个case（穿透）。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-089.html'
    }
  },
  {
    id: 90,
    chapter: 'control',
    type: 'output',
    title: 'case穿透',
    description: '没有break的后果',
    code: `int x = 1;
switch (x) {
    case 1: printf("A");
    case 2: printf("B");
    case 3: printf("C"); break;
    default: printf("D");
}`,
    correctOutput: 'ABC',
    explanation: 'x=1匹配case 1，输出A。没有break，继续执行case 2输出B，case 3输出C，然后break跳出。这就是case穿透。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-090.html'
    }
  },
  {
    id: 91,
    chapter: 'control',
    type: 'output',
    title: '嵌套循环',
    description: '分析嵌套循环的执行次数',
    code: `int count = 0;
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 2; j++) {
        count++;
    }
}
printf("%d", count);`,
    correctOutput: '6',
    explanation: '外层循环3次，每次外层循环时内层循环2次。总计3×2=6次。嵌套循环的总次数=外层次数×内层次数。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-091.html'
    }
  },
  {
    id: 92,
    chapter: 'control',
    type: 'fill',
    title: 'do-while循环',
    description: '至少执行一次的循环',
    code: `int i = 0;
___① {
    printf("%d", i);
    i++;
} while (i < 3);`,
    blanks: [
      { hint: '循环关键字', answer: 'do' }
    ],
    explanation: 'do-while先执行循环体，再判断条件。所以循环体至少执行一次。即使条件一开始就为假也会执行一次。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-092.html'
    }
  },
  {
    id: 93,
    chapter: 'control',
    type: 'debug',
    title: 'else配对问题',
    description: 'else与哪个if配对？',
    code: `1 | if (a > 0)
2 |     if (b > 0)
3 |         printf("A");
4 | else
5 |     printf("B");`,
    bugLine: 4,
    bugFix: '} else',
    explanation: 'else与最近的未配对的if配对，即第2行的if。代码缩进具有误导性。若想让else配对第一个if，需要用大括号明确分隔。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-093.html'
    }
  },
  {
    id: 94,
    chapter: 'control',
    type: 'output',
    title: '条件运算符链',
    description: '嵌套的三目运算符',
    code: `int score = 75;
char grade = (score >= 90) ? 'A' : 
             (score >= 60) ? 'B' : 'C';
printf("%c", grade);`,
    correctOutput: 'B',
    explanation: 'score=75。75>=90为假，跳到第二个?:；75>=60为真，返回\'B\'。三目运算符可以嵌套实现多条件判断。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-094.html'
    }
  },
  {
    id: 95,
    chapter: 'control',
    type: 'output',
    title: '倒序循环',
    description: '从大到小的循环',
    code: `for (int i = 5; i > 0; i--) {
    printf("%d", i);
}`,
    correctOutput: '54321',
    explanation: 'i从5开始，每次减1，当i>0为假（i=0）时停止。输出54321。循环不一定要从小到大。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-095.html'
    }
  },
  {
    id: 96,
    chapter: 'control',
    type: 'fill',
    title: 'else if语句',
    description: '多条件判断',
    code: `int score = 75;
if (score >= 90) {
    printf("优秀");
} ___① (score >= 60) {
    printf("良好");
} else {
    printf("及格");
}`,
    blanks: [
      { hint: '否则如果关键字', answer: 'else if' }
    ],
    explanation: 'else if用于处理多条件判断。从上到下依次判断，第一个满足条件的分支会被执行。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-096.html'
    }
  },
  {
    id: 97,
    chapter: 'control',
    type: 'output',
    title: '逻辑运算在if中',
    description: '使用&&和||',
    code: `int a = 5, b = 10;
if (a > 0 && b < 20) {
    printf("条件满足");
}`,
    correctOutput: '条件满足',
    explanation: 'a>0为真(1)，b<20为真(1)，真&&真=真，所以条件满足，执行if内的代码。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-097.html'
    }
  },
  {
    id: 98,
    chapter: 'control',
    type: 'debug',
    title: '缺少大括号',
    description: 'if语句缺少大括号',
    code: `1 | if (x > 5)
2 |     printf("A");
3 |     printf("B");`,
    bugLine: 2,
    bugFix: 'if (x > 5) {\n    printf("A");\n}',
    explanation: 'if语句的条件后缺少大括号{}，导致只有第一条语句属于if，第二条语句无论如何都会执行。应该用{}包裹多条语句。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-098.html'
    }
  },
  {
    id: 99,
    chapter: 'control',
    type: 'fill',
    title: 'switch default',
    description: 'default分支',
    code: `int x = 5;
switch (x) {
    case 1: printf("One"); break;
    case 2: printf("Two"); break;
    ___①: printf("Other"); break;
}`,
    blanks: [
      { hint: '默认分支关键字', answer: 'default' }
    ],
    explanation: 'default是switch的默认分支，当所有case都不匹配时执行。相当于if-else中的else。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-099.html'
    }
  },
  {
    id: 100,
    chapter: 'control',
    type: 'output',
    title: '循环变量作用域',
    description: '循环内声明的变量',
    code: `for (int i = 0; i < 3; i++) {
    int temp = i * 2;
    printf("%d ", temp);
}
// i在这里不可访问`,
    correctOutput: '0 2 4',
    explanation: '在for循环的初始化部分声明的变量i，作用域只在循环内有效。循环结束后i不可访问。但循环内声明的temp每次循环都会重新创建。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-100.html'
    }
  },
  {
    id: 101,
    chapter: 'control',
    type: 'fill',
    title: '循环嵌套练习',
    description: '嵌套循环输出乘法表',
    code: `for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        printf("%d ", i * j);
    }
    ___①
}`,
    blanks: [
      { hint: '换行', answer: 'printf("\\n");' }
    ],
    explanation: '外层循环i=1,2,3，内层循环j=1,2,3。输出i*j的乘法表。每行结束后需要换行。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-101.html'
    }
  },
  {
    id: 102,
    chapter: 'control',
    type: 'output',
    title: '条件运算符优先级',
    description: '&&和||的优先级',
    code: `int a = 1, b = 0, c = 0;
int result = a || b && c;
printf("%d", result);`,
    correctOutput: '1',
    explanation: '&&优先级高于||。先算b&&c=0，再算a||0=1。如果想要先算||需要括号：(a||b)&&c=0。',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-102.html'
    }
  },
  {
    id: 103,
    chapter: 'control',
    type: 'debug',
    title: '分号多余',
    description: 'if语句后多余的分号',
    code: `1 | if (x > 5);
2 |     printf("A");
3 | else {
4 |     printf("B");
5 | };`,
    bugLine: 3,
    bugFix: 'if (x > 5) {\n    printf("A");\n}',
    explanation: 'if语句的条件后不应该有分号；。分号表示语句结束，会导致else无法正确配对。if(条件){语句}后面不要加分号。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-103.html'
    }
  },
  {
    id: 104,
    chapter: 'control',
    type: 'fill',
    title: 'for循环省略部分',
    description: '省略初始化或更新',
    code: `int i = 0;
for (___①; i < 5; ___①) {
    printf("%d ", i);
}`,
    blanks: [
      { hint: '留空', answer: ';' }
    ],
    explanation: 'for循环的三个部分都可以省略。for(;;)是无限循环，需要用break退出。for(;i<5;)省略初始化，for(;i<5;i++)省略更新。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-104.html'
    }
  },
  {
    id: 105,
    chapter: 'control',
    type: 'output',
    title: 'while vs do-while',
    description: '两种循环的区别',
    code: `int i = 5;
while (i < 3) printf("%d", i++);

do {
    printf("%d", i++);
} while (i < 3);`,
    correctOutput: '5',
    explanation: 'while先判断后执行：i=5<3为假，一次都不执行。do-while先执行后判断：先输出5，i变6，再判断6<3为假，结束。输出5。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-105.html'
    }
  },

  // ===== 函数 =====
  {
    id: 10013,
    chapter: 'functions',
    type: 'fill',
    title: '函数定义',
    description: '定义一个返回两数之和的函数',
    code: `___① add(int a, int b) {
    return a + b;
}`,
    blanks: [
      { hint: '返回类型', answer: 'int' }
    ],
    explanation: '函数返回整数，所以返回类型是int。函数定义格式：返回类型 函数名(参数列表) { 函数体 }',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-058.html'
    }
  },
  {
    id: 10014,
    chapter: 'functions',
    type: 'fill',
    title: '无返回值函数',
    description: '定义一个不返回值的函数',
    code: `___① sayHello() {
    printf("Hello!");
}`,
    blanks: [
      { hint: '无返回值的类型', answer: 'void' }
    ],
    explanation: 'void表示函数不返回任何值。void函数不需要return语句，或者只写return;',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-059.html'
    }
  },
  {
    id: 10015,
    chapter: 'functions',
    type: 'output',
    title: '函数调用',
    description: '分析函数的执行过程',
    code: `int square(int n) {
    return n * n;
}

int main() {
    int result = square(5);
    printf("%d", result);
    return 0;
}`,
    correctOutput: '25',
    explanation: '调用square(5)时，5传给参数n，函数返回n*n=25，这个值赋给result，然后输出25。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-060.html'
    }
  },
  {
    id: 10016,
    chapter: 'functions',
    type: 'output',
    title: '值传递',
    description: '函数参数是值的副本',
    code: `void addTen(int x) {
    x = x + 10;
}

int main() {
    int a = 5;
    addTen(a);
    printf("%d", a);
    return 0;
}`,
    correctOutput: '5',
    explanation: 'C语言函数参数是值传递——传入的是副本。函数内修改x不会影响原变量a，所以a仍然是5。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-061.html'
    }
  },
  {
    id: 10017,
    chapter: 'functions',
    type: 'fill',
    title: '返回语句',
    description: '从函数返回结果',
    code: `int max(int a, int b) {
    if (a > b) {
        ___① a;
    }
    return b;
}`,
    blanks: [
      { hint: '返回关键字', answer: 'return' }
    ],
    explanation: 'return语句用于从函数返回值。一旦执行return，函数立即结束并返回指定的值。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-062.html'
    }
  },
  {
    id: 10018,
    chapter: 'functions',
    type: 'output',
    title: '递归函数',
    description: '函数调用自身',
    code: `int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

printf("%d", factorial(4));`,
    correctOutput: '24',
    explanation: 'factorial(4) = 4 * factorial(3) = 4 * 3 * factorial(2) = 4 * 3 * 2 * factorial(1) = 4 * 3 * 2 * 1 = 24',
    difficulty: 3,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-063.html'
    }
  },
  {
    id: 10019,
    chapter: 'functions',
    type: 'output',
    title: 'static局部变量',
    description: 'static变量保持值',
    code: `void count() {
    static int n = 0;
    n++;
    printf("%d ", n);
}

int main() {
    count();
    count();
    count();
    return 0;
}`,
    correctOutput: '1 2 3 ',
    explanation: 'static局部变量只初始化一次，函数结束后值保留。三次调用中n依次变为1、2、3。如果没有static，每次都会重新初始化为0。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-064.html'
    }
  },
  {
    id: 10020,
    chapter: 'functions',
    type: 'debug',
    title: '函数声明缺失',
    description: '函数在调用之后定义',
    code: `1 | int main() {
2 |     int x = add(3, 5);
3 |     printf("%d", x);
4 |     return 0;
5 | }
6 | 
7 | int add(int a, int b) {
8 |     return a + b;
9 | }`,
    bugLine: 1,
    bugFix: 'int add(int a, int b);\n\nint main() {',
    explanation: '函数add在main之后定义，但在main中被调用。需要在main之前添加函数声明（原型）：int add(int a, int b);',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-065.html'
    }
  },
  {
    id: 10021,
    chapter: 'functions',
    type: 'output',
    title: '函数多次调用',
    description: '分析多次调用的结果',
    code: `int doubleIt(int x) {
    return x * 2;
}

printf("%d", doubleIt(doubleIt(3)));`,
    correctOutput: '12',
    explanation: '从内到外求值：doubleIt(3)=6，doubleIt(6)=12。函数的返回值可以直接作为另一个函数的参数。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-066.html'
    }
  },
  {
    id: 10022,
    chapter: 'functions',
    type: 'fill',
    title: '函数参数',
    description: '多个参数用什么分隔？',
    code: `int add(int a___① int b___① int c) {
    return a + b + c;
}`,
    blanks: [
      { hint: '参数分隔符', answer: ',' }
    ],
    explanation: '函数的多个参数之间用逗号分隔。每个参数都需要声明类型。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-func-067.html'
    }
  },

  // ===== 数组 =====
  {
    id: 10023,
    chapter: 'arrays',
    type: 'fill',
    title: '数组声明',
    description: '声明一个包含5个整数的数组',
    code: `int arr___①5___②;`,
    blanks: [
      { hint: '开始括号', answer: '[' },
      { hint: '结束括号', answer: ']' }
    ],
    explanation: '数组声明使用方括号[]指定大小：int arr[5]声明了一个可以存储5个整数的数组。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-068.html'
    }
  },
  {
    id: 10024,
    chapter: 'arrays',
    type: 'output',
    title: '数组下标',
    description: '数组下标从0开始',
    code: `int arr[5] = {10, 20, 30, 40, 50};
printf("%d", arr[0]);`,
    correctOutput: '10',
    explanation: '数组下标从0开始！arr[0]是第一个元素（10），arr[4]是最后一个元素（50），arr[5]越界！',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-069.html'
    }
  },
  {
    id: 10025,
    chapter: 'arrays',
    type: 'output',
    title: '数组遍历',
    description: '用循环遍历数组',
    code: `int arr[] = {1, 2, 3};
for (int i = 0; i < 3; i++) {
    printf("%d", arr[i]);
}`,
    correctOutput: '123',
    explanation: '循环变量i从0到2，依次访问arr[0]、arr[1]、arr[2]，输出123。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-070.html'
    }
  },
  {
    id: 10026,
    chapter: 'arrays',
    type: 'debug',
    title: '数组越界',
    description: '找出可能导致问题的代码',
    code: `1 | int arr[5] = {1, 2, 3, 4, 5};
2 | for (int i = 0; i <= 5; i++) {
3 |     printf("%d ", arr[i]);
4 | }`,
    bugLine: 2,
    bugFix: 'for (int i = 0; i < 5; i++) {',
    explanation: '条件i<=5时，i最大为5，但arr[5]越界（有效下标是0-4）。应该用i<5。数组越界是严重的错误！',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-071.html'
    }
  },
  {
    id: 10027,
    chapter: 'arrays',
    type: 'output',
    title: '字符串长度',
    description: 'strlen和sizeof的区别',
    code: `char str[] = "Hello";
printf("%lu %lu", strlen(str), sizeof(str));`,
    correctOutput: '5 6',
    explanation: 'strlen返回字符串长度（不含\\0）=5。sizeof返回数组大小（含\\0）=6。"Hello"实际存储为H e l l o \\0。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-072.html'
    }
  },
  {
    id: 10028,
    chapter: 'arrays',
    type: 'fill',
    title: '字符串初始化',
    description: '用字符串初始化字符数组',
    code: `char greeting[] = ___①Hello___②;`,
    blanks: [
      { hint: '开始引号', answer: '"' },
      { hint: '结束引号', answer: '"' }
    ],
    explanation: '字符串常量使用双引号""包围。单引号\'\'用于单个字符。char c = \'A\'; char s[] = "ABC";',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-073.html'
    }
  },
  {
    id: 10029,
    chapter: 'arrays',
    type: 'output',
    title: '二维数组',
    description: '二维数组的访问',
    code: `int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
printf("%d", matrix[1][2]);`,
    correctOutput: '6',
    explanation: 'matrix[1][2]表示第2行第3列（下标从0开始），即第二个子数组{4,5,6}的第三个元素6。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-074.html'
    }
  },
  {
    id: 10030,
    chapter: 'arrays',
    type: 'output',
    title: '数组元素修改',
    description: '修改数组中的元素',
    code: `int arr[] = {1, 2, 3};
arr[1] = 10;
printf("%d %d %d", arr[0], arr[1], arr[2]);`,
    correctOutput: '1 10 3',
    explanation: 'arr[1]=10将第二个元素（下标1）从2改为10。数组元素可以像普通变量一样被修改。',
    difficulty: 1,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-075.html'
    }
  },
  {
    id: 10031,
    chapter: 'arrays',
    type: 'fill',
    title: '数组作为参数',
    description: '数组传递给函数',
    code: `void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", ___①[i]);
    }
}`,
    blanks: [
      { hint: '数组名', answer: 'arr' }
    ],
    explanation: '在函数内使用数组参数和使用普通数组一样，用数组名加下标访问元素：arr[i]。',
    difficulty: 1
  },
  {
    id: 10032,
    chapter: 'arrays',
    type: 'output',
    title: 'strcmp比较',
    description: '字符串比较函数',
    code: `int result = strcmp("apple", "banana");
printf("%s", result < 0 ? "Less" : "NotLess");`,
    correctOutput: 'Less',
    explanation: 'strcmp按字典序比较字符串。\"apple\"<\"banana\"（a<b），所以返回负数。result<0为真，输出Less。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-077.html'
    }
  },

  // ===== 指针陷阱 =====
  {
    id: 10033,
    chapter: 'pointers',
    type: 'fill',
    title: '声明指针',
    description: '声明一个指向整数的指针',
    code: `int a = 10;
int ___①p = &a;`,
    blanks: [
      { hint: '指针声明符', answer: '*' }
    ],
    explanation: '声明指针使用*号：int *p表示p是一个指向int的指针。&a获取变量a的地址赋给p。',
    difficulty: 1
  },
  {
    id: 10034,
    chapter: 'pointers',
    type: 'fill',
    title: '取地址操作',
    description: '获取变量的地址',
    code: `int x = 100;
int *ptr = ___①x;  // ptr存储x的地址`,
    blanks: [
      { hint: '取地址符', answer: '&' }
    ],
    explanation: '&是取地址运算符，&x返回变量x的内存地址。这个地址可以存储在指针变量中。',
    difficulty: 1
  },
  {
    id: 10035,
    chapter: 'pointers',
    type: 'output',
    title: '解引用操作',
    description: '通过指针访问值',
    code: `int a = 42;
int *p = &a;
printf("%d", *p);`,
    correctOutput: '42',
    explanation: '*p是解引用操作，获取指针p指向地址上的值。p存储a的地址，*p就是a的值42。',
    difficulty: 1,
    hint: 'p存储a的地址，*p就是"p指向的值"，即a本身',
    knowledgePoints: ['指针解引用', '取地址&', '间接访问'],
    lineAnalysis: [
      { num: 1, explanation: '声明整型变量a，赋值42。a在内存中占用4字节。', memoryChange: 'a = 42' },
      { num: 2, explanation: '声明指针p，存储a的地址。p本身也占用内存，存储的是a的地址值。', memoryChange: 'p = &a' },
      { num: 3, explanation: '*p解引用：通过p存储的地址找到a，读取a的值42。' }
    ],
    memoryViz: {
      cells: [
        { name: 'a', address: '0x1000', value: '42', type: 'variable' },
        { name: 'p', address: '0x2000', value: '0x1000', type: 'pointer', pointsTo: 'a' }
      ]
    },
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-080.html'
    }
  },
  {
    id: 10036,
    chapter: 'pointers',
    type: 'output',
    title: '通过指针修改值',
    description: '指针的核心用途',
    code: `int a = 5;
int *p = &a;
*p = 20;
printf("%d", a);`,
    correctOutput: '20',
    explanation: '*p=20通过指针将a的值改为20。指针允许我们间接访问和修改变量，这是实现"引用传递"的基础。',
    difficulty: 2,
    hint: 'p指向a，*p就是a，修改*p就是修改a',
    knowledgePoints: ['指针写入', '间接修改', '引用传递原理'],
    lineAnalysis: [
      { num: 1, explanation: '声明a并初始化为5。', memoryChange: 'a = 5' },
      { num: 2, explanation: 'p存储a的地址，建立指向关系。', memoryChange: 'p = &a' },
      { num: 3, explanation: '*p = 20：通过p找到a，将a改为20。这是指针的核心用途——间接修改。', memoryChange: 'a: 5 → 20', highlight: true },
      { num: 4, explanation: '打印a，此时a已被修改为20。' }
    ],
    memoryViz: {
      cells: [
        { name: 'a', address: '0x1000', value: '20', beforeValue: '5', type: 'variable', changed: true },
        { name: 'p', address: '0x2000', value: '0x1000', type: 'pointer', pointsTo: 'a' }
      ]
    },
    commonMistakes: ['混淆*p和p：p是地址，*p是值', '忘记p需要指向有效内存'],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-081.html'
    }
  },
  {
    id: 10037,
    chapter: 'pointers',
    type: 'debug',
    title: '野指针',
    description: '未初始化的指针是危险的',
    code: `1 | int *p;
2 | *p = 10;
3 | printf("%d", *p);`,
    bugLine: 1,
    bugFix: 'int x;\nint *p = &x;',
    explanation: '指针p未初始化，包含垃圾值（随机地址）。对其解引用赋值会写入随机内存位置，可能导致程序崩溃或不可预测的行为。',
    difficulty: 2
  },
  {
    id: 10038,
    chapter: 'pointers',
    type: 'output',
    title: '指针与数组',
    description: '数组名是首元素地址',
    code: `int arr[] = {10, 20, 30};
int *p = arr;
printf("%d", *p);`,
    correctOutput: '10',
    explanation: '数组名arr等价于&arr[0]，即首元素的地址。p指向arr[0]，*p就是arr[0]的值10。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-083.html'
    }
  },
  {
    id: 10039,
    chapter: 'pointers',
    type: 'output',
    title: '指针算术',
    description: '指针加法的含义',
    code: `int arr[] = {10, 20, 30, 40};
int *p = arr;
p = p + 2;
printf("%d", *p);`,
    correctOutput: '30',
    explanation: '指针加2表示向后移动2个int的位置（不是2字节）。p最初指向arr[0]，加2后指向arr[2]，值为30。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-084.html'
    }
  },
  {
    id: 10040,
    chapter: 'pointers',
    type: 'output',
    title: '函数中的指针参数',
    description: '通过指针修改外部变量',
    code: `void addTen(int *x) {
    *x = *x + 10;
}

int main() {
    int a = 5;
    addTen(&a);
    printf("%d", a);
    return 0;
}`,
    correctOutput: '15',
    explanation: '传递&a（a的地址）给指针参数x。函数内*x=*x+10修改了a的值。这就是通过指针实现"引用传递"。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-085.html'
    }
  },
  {
    id: 10041,
    chapter: 'pointers',
    type: 'debug',
    title: '空指针解引用',
    description: '检查NULL很重要',
    code: `1 | int *p = NULL;
2 | printf("%d", *p);`,
    bugLine: 2,
    bugFix: 'if (p != NULL) {\n    printf("%d", *p);\n}',
    explanation: 'NULL指针不指向任何有效内存，解引用NULL会导致程序崩溃（段错误）。使用指针前应检查是否为NULL。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-086.html'
    }
  },
  {
    id: 10042,
    chapter: 'pointers',
    type: 'output',
    title: '指针与下标',
    description: '两种访问数组的方式',
    code: `int arr[] = {5, 10, 15};
int *p = arr;
printf("%d %d", arr[1], *(p + 1));`,
    correctOutput: '10 10',
    explanation: 'arr[1]和*(p+1)是等价的，都访问第二个元素。实际上arr[i]会被编译器转换为*(arr+i)。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-087.html'
    }
  },
  {
    id: 10043,
    chapter: 'pointers',
    type: 'fill',
    title: 'malloc分配内存',
    description: '动态分配内存',
    code: `int *arr = (int*)___①(5 * sizeof(int));
// 分配能存储5个int的内存空间`,
    blanks: [
      { hint: '内存分配函数', answer: 'malloc' }
    ],
    explanation: 'malloc函数动态分配指定字节数的内存，返回指向该内存的指针。5*sizeof(int)=20字节，可存5个int。',
    difficulty: 2
  },
  {
    id: 10044,
    chapter: 'pointers',
    type: 'fill',
    title: '释放内存',
    description: '动态分配的内存必须释放',
    code: `int *p = (int*)malloc(sizeof(int));
*p = 42;
printf("%d", *p);
___①(p);  // 释放内存`,
    blanks: [
      { hint: '释放内存的函数', answer: 'free' }
    ],
    explanation: 'free函数释放之前用malloc分配的内存。每个malloc都应该对应一个free，否则会造成内存泄漏。',
    difficulty: 2
  },
  {
    id: 10045,
    chapter: 'pointers',
    type: 'debug',
    title: '内存泄漏',
    description: '分配了但没释放',
    code: `1 | void leak() {
2 |     int *p = malloc(100);
3 |     // 使用p...
4 | }`,
    bugLine: 4,
    bugFix: '    free(p);\n}',
    explanation: '函数结束时p变量被销毁，但它指向的内存没有被释放，造成内存泄漏。应在函数返回前调用free(p)。',
    difficulty: 2
  },
  {
    id: 10046,
    chapter: 'pointers',
    type: 'output',
    title: '指针的指针',
    description: '二级指针',
    code: `int a = 10;
int *p = &a;
int **pp = &p;
printf("%d", **pp);`,
    correctOutput: '10',
    explanation: 'pp是指向指针的指针。*pp得到p的值（a的地址），**pp再解引用得到a的值10。',
    difficulty: 3,
    hint: 'pp → p → a，解引用两次才能到达a',
    knowledgePoints: ['二级指针', '多级解引用', '指针链'],
    lineAnalysis: [
      { num: 1, explanation: '声明整型变量a，值为10。', memoryChange: 'a = 10' },
      { num: 2, explanation: 'p是一级指针，存储a的地址。', memoryChange: 'p = &a' },
      { num: 3, explanation: 'pp是二级指针，存储p的地址。形成链式关系：pp → p → a', memoryChange: 'pp = &p' },
      { num: 4, explanation: '**pp = *(*pp) = *(p) = a = 10。先解引用得到p，再解引用得到a。' }
    ],
    memoryViz: {
      cells: [
        { name: 'a', address: '0x1000', value: '10', type: 'variable' },
        { name: 'p', address: '0x2000', value: '0x1000', type: 'pointer', pointsTo: 'a' },
        { name: 'pp', address: '0x3000', value: '0x2000', type: 'pointer', pointsTo: 'p' }
      ]
    },
    commonMistakes: ['混淆*pp和**pp', '忘记二级指针存储的是一级指针的地址'],
    relatedConcepts: ['函数参数修改指针本身', '动态内存分配返回'],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-091.html'
    }
  },
  {
    id: 10047,
    chapter: 'pointers',
    type: 'output',
    title: '字符串指针',
    description: '字符串字面量',
    code: `char *str = "Hello";
printf("%c", str[1]);`,
    correctOutput: 'e',
    explanation: '字符串字面量存储在只读内存区，str指向其首字符。str[1]等价于*(str+1)，是第二个字符\'e\'。',
    difficulty: 2,
    visualization: {
      type: 'html',
      file: 'visualizations-v2/question-092.html'
    }
  },

  // ===== 内存安全 =====
  {
    id: 10048,
    chapter: 'memory',
    type: 'debug',
    title: '悬空指针',
    description: '使用已释放的内存',
    code: `1 | int *p = malloc(sizeof(int));
2 | *p = 42;
3 | free(p);
4 | printf("%d", *p);`,
    bugLine: 4,
    bugFix: 'p = NULL;  // free后置空\n// 不要再使用p',
    explanation: 'free(p)后，p指向的内存已被释放，但p仍保存那个地址（悬空指针）。继续使用p是未定义行为。好习惯：free后将指针置NULL。',
    difficulty: 2
  },
  {
    id: 10049,
    chapter: 'memory',
    type: 'debug',
    title: '缓冲区溢出',
    description: '写入超过数组边界',
    code: `1 | char buffer[5];
2 | strcpy(buffer, "Hello World");`,
    bugLine: 2,
    bugFix: 'char buffer[20];\nstrcpy(buffer, "Hello World");',
    explanation: 'buffer只有5字节，但"Hello World"需要12字节（含\\0）。strcpy会写入超出边界，覆盖其他内存。这是严重的安全漏洞！',
    difficulty: 2
  },
  {
    id: 10050,
    chapter: 'memory',
    type: 'fill',
    title: 'malloc返回值检查',
    description: '分配可能失败',
    code: `int *p = malloc(sizeof(int) * 1000000);
if (p == ___①) {
    printf("内存分配失败");
    return -1;
}`,
    blanks: [
      { hint: '空指针值', answer: 'NULL' }
    ],
    explanation: 'malloc可能因内存不足而失败，失败时返回NULL。使用前必须检查是否为NULL，否则解引用NULL会导致崩溃。',
    difficulty: 2
  },
  {
    id: 10051,
    chapter: 'memory',
    type: 'output',
    title: 'calloc与malloc',
    description: 'calloc会初始化为0',
    code: `int *arr = calloc(3, sizeof(int));
printf("%d %d %d", arr[0], arr[1], arr[2]);
free(arr);`,
    correctOutput: '0 0 0',
    explanation: 'calloc分配内存并初始化为0。malloc分配的内存包含垃圾值。calloc(3, sizeof(int))分配3个int并清零。',
    difficulty: 2
  },
  {
    id: 10052,
    chapter: 'memory',
    type: 'debug',
    title: '重复释放',
    description: '不能free同一块内存两次',
    code: `1 | int *p = malloc(sizeof(int));
2 | free(p);
3 | free(p);`,
    bugLine: 3,
    bugFix: 'p = NULL;  // 第一次free后置空\n// 删除第二个free',
    explanation: '同一块内存不能释放两次（double free），这会导致未定义行为，可能崩溃或造成安全漏洞。free后将指针置NULL可防止此错误。',
    difficulty: 2
  },
  {
    id: 10053,
    chapter: 'memory',
    type: 'fill',
    title: 'realloc调整大小',
    description: '重新分配内存大小',
    code: `int *arr = malloc(5 * sizeof(int));
// 需要扩展到10个int
arr = ___①(arr, 10 * sizeof(int));`,
    blanks: [
      { hint: '重新分配函数', answer: 'realloc' }
    ],
    explanation: 'realloc调整已分配内存的大小。它可能在原位置扩展，也可能分配新内存并复制内容。如果失败返回NULL。',
    difficulty: 2
  },
  {
    id: 10054,
    chapter: 'memory',
    type: 'output',
    title: '栈与堆',
    description: '局部变量在栈上，malloc在堆上',
    code: `void test() {
    int local = 10;       // 栈
    int *heap = malloc(4); // 堆
    *heap = 20;
    printf("%d %d", local, *heap);
    free(heap);
}
test();`,
    correctOutput: '10 20',
    explanation: '局部变量local在栈上，函数结束自动释放。malloc分配的内存在堆上，需要手动free。两者存储位置不同。',
    difficulty: 2
  },
  {
    id: 10055,
    chapter: 'memory',
    type: 'fill',
    title: '安全的字符串复制',
    description: '使用strncpy限制复制长度',
    code: `char dest[10];
char *src = "Hello World!";
___①(dest, src, sizeof(dest) - 1);
dest[sizeof(dest) - 1] = '\\0';`,
    blanks: [
      { hint: '安全字符串复制函数', answer: 'strncpy' }
    ],
    explanation: 'strncpy限制最多复制n个字符，防止缓冲区溢出。比strcpy更安全。注意：strncpy可能不会自动添加\\0，需要手动确保。',
    difficulty: 2
  },

  // ===== 代码排序题 (新题型) =====
  {
    id: 10056,
    chapter: 'basics',
    type: 'order',
    title: '排列出完整的 Hello World 程序',
    description: '按正确顺序点击代码行，组成一个完整的C程序',
    codeLines: [
      '    return 0;',
      '}',
      '#include <stdio.h>',
      '    printf("Hello World");',
      'int main() {'
    ],
    correctOrder: [2, 4, 3, 0, 1],
    correctOutput: 'Hello World',
    explanation: '标准C程序结构：①#include引入头文件 → ②int main()定义入口 → ③printf执行语句 → ④return 0返回 → ⑤}结束',
    difficulty: 1,
    vocabulary: [
      { word: '#include', meaning: '引入/包含头文件' },
      { word: 'main', meaning: '主函数（程序入口）' },
      { word: 'return', meaning: '返回' }
    ]
  },
  {
    id: 10057,
    chapter: 'variables',
    type: 'order',
    title: '排列：声明变量并输出',
    description: '按正确顺序排列代码，实现声明变量并输出其值',
    codeLines: [
      '    printf("%d", age);',
      '#include <stdio.h>',
      '    int age = 18;',
      '    return 0;',
      'int main() {',
      '}'
    ],
    correctOrder: [1, 4, 2, 0, 3, 5],
    correctOutput: '18',
    explanation: '先引入头文件，定义main函数，在函数体内先声明变量，再使用printf输出，最后return。',
    difficulty: 1
  },
  {
    id: 10058,
    chapter: 'variables',
    type: 'order',
    title: '排列：读取用户输入并输出',
    description: '实现从键盘读取一个整数并显示（假设输入42）',
    codeLines: [
      '    scanf("%d", &num);',
      '    printf("你输入了: %d", num);',
      '    int num;',
      '#include <stdio.h>',
      'int main() {',
      '    return 0;',
      '}'
    ],
    correctOrder: [3, 4, 2, 0, 1, 5, 6],
    correctOutput: '你输入了: 42',
    explanation: '先声明变量num，再用scanf读取（注意&），最后用printf输出。变量必须在使用之前声明！',
    difficulty: 2
  },
  {
    id: 10059,
    chapter: 'control',
    type: 'order',
    title: '排列：for循环输出1到5',
    description: '排列代码实现循环输出 1 2 3 4 5',
    codeLines: [
      '    }',
      '    for (int i = 1; i <= 5; i++) {',
      '        printf("%d ", i);',
      'int main() {',
      '#include <stdio.h>',
      '    return 0;',
      '}'
    ],
    correctOrder: [4, 3, 1, 2, 0, 5, 6],
    correctOutput: '1 2 3 4 5 ',
    explanation: 'for循环结构：for(初始化; 条件; 更新) { 循环体 }。循环体在for的大括号内。',
    difficulty: 2
  },
  {
    id: 10060,
    chapter: 'control',
    type: 'order',
    title: '排列：if-else判断成绩',
    description: '排列代码实现判断成绩是否及格',
    codeLines: [
      '    } else {',
      '    if (score >= 60) {',
      '    int score = 75;',
      '        printf("通过");',
      '        printf("加油");',
      '    }',
      '#include <stdio.h>',
      'int main() {',
      '    return 0;',
      '}'
    ],
    correctOrder: [6, 7, 2, 1, 3, 0, 4, 5, 8, 9],
    correctOutput: '通过',
    explanation: 'if-else结构：if(条件){成立时执行} else {不成立时执行}。score=75>=60，会输出"通过"。',
    difficulty: 2
  },
  {
    id: 106,
    chapter: 'functions',
    type: 'order',
    title: '排列：定义并调用函数',
    description: '排列代码实现一个求平方的函数并调用它',
    codeLines: [
      '    return n * n;',
      'int square(int n) {',
      '    printf("%d", square(5));',
      '}',
      '#include <stdio.h>',
      'int main() {',
      '    return 0;',
      '}'
    ],
    correctOrder: [4, 1, 0, 3, 5, 2, 6, 7],
    correctOutput: '25',
    explanation: '函数定义必须在调用之前。定义格式：返回类型 函数名(参数) { return 表达式; }',
    difficulty: 2
  },
  {
    id: 107,
    chapter: 'arrays',
    type: 'order',
    title: '排列：遍历数组求和',
    description: '按正确顺序排列代码，实现数组元素求和',
    codeLines: [
      '    printf("sum: %d", sum);',
      '    for (int i = 0; i < 5; i++) {',
      '    int sum = 0;',
      '    int arr[] = {1, 2, 3, 4, 5};',
      '        sum += arr[i];',
      '    }',
      '#include <stdio.h>',
      'int main() {',
      '    return 0;',
      '}'
    ],
    correctOrder: [6, 7, 3, 2, 1, 4, 5, 0, 8, 9],
    correctOutput: 'sum: 15',
    explanation: '先声明数组和求和变量，用for循环遍历数组累加每个元素，最后输出总和。',
    difficulty: 2
  },
  {
    id: 108,
    chapter: 'pointers',
    type: 'order',
    title: '排列：通过指针交换两个变量',
    description: '排列函数体内的代码，实现经典的指针交换',
    codeLines: [
      '    int temp = *a;',
      'void swap(int *a, int *b) {',
      '    *a = *b;',
      '    *b = temp;',
      '}'
    ],
    correctOrder: [1, 0, 2, 3, 4],
    correctOutput: '(无输出，但成功交换了变量值)',
    explanation: '经典三步交换法：①保存*a到temp → ②把*b赋给*a → ③把temp赋给*b。通过指针修改原变量！',
    difficulty: 3
  },

  // ===== 嵌入式Linux专家级题目 =====
  // 内存管理与对齐
  {
    id: 109,
    chapter: 'memory',
    type: 'output',
    title: '结构体内存对齐（专家级）',
    description: '嵌入式开发必须掌握内存对齐',
    code: `struct {
    char a;
    int b;
    char c;
} s;
printf("%zu", sizeof(s));`,
    correctOutput: '12',
    explanation: '结构体内存对齐：char(1) + 填充(3) + int(4) + char(1) + 填充(3) = 12字节。嵌入式开发中，不对齐的内存访问可能导致硬件异常！',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/struct-memory-alignment.html'
    }
  },
  {
    id: 110,
    chapter: 'memory',
    type: 'fill',
    title: '内存对齐控制',
    description: 'GCC编译器指令控制对齐',
    code: `___① __attribute__((___①(1))) struct {
    char a;
    int b;
} s;
printf("%zu", sizeof(s));`,
    blanks: [
      { hint: 'GCC属性关键字', answer: '__attribute__' },
      { hint: '对齐属性', answer: 'packed' }
    ],
    explanation: '__attribute__((packed)) 告诉编译器不要填充，按紧凑方式存储。sizeof(s)=5（1+4）。这在嵌入式中用于匹配硬件寄存器布局。',
    difficulty: 4
  },
  {
    id: 111,
    chapter: 'memory',
    type: 'output',
    title: '内存对齐计算（进阶）',
    description: '计算对齐后的地址',
    code: `char buf[100];
void *p = buf + 1;
uint32_t *aligned = (uint32_t *)(((uintptr_t)p + 3) & ~3);
printf("%zu", (size_t)aligned - (size_t)buf);`,
    correctOutput: '4',
    explanation: '将地址向上对齐到4字节边界：(addr + 3) & ~3。buf+1=1，(1+3)&~3=4&~3=4。嵌入式DMA操作通常需要4字节对齐地址。',
    difficulty: 5,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/memory-alignment-calc.html'
    }
  },
  {
    id: 112,
    chapter: 'memory',
    type: 'debug',
    title: '内存泄漏检测',
    description: '嵌入式系统内存有限，泄漏是致命的',
    code: `1 | void process_data() {
2 |     char *buffer = malloc(1024);
3 |     read_sensor(buffer);
4 |     if (buffer[0] == 0) {
5 |         return;  // 错误退出
6 |     }
7 |     send_data(buffer);
8 |     free(buffer);
9 | }`,
    bugLine: 5,
    bugFix: '        free(buffer);\n        return;',
    explanation: '第5行提前return，没有free(buffer)，造成内存泄漏！嵌入式系统内存有限，每次调用都泄漏1KB，最终系统会崩溃。必须在每个退出路径都释放内存。',
    difficulty: 3
  },
  {
    id: 113,
    chapter: 'memory',
    type: 'output',
    title: '内存池分配模拟',
    description: '理解内存池的工作原理',
    code: `char pool[200];
char *alloc = pool;
char *p1 = alloc; alloc += 100;
char *p2 = alloc; alloc += 100;
alloc = p1;
char *p3 = alloc; alloc += 50;
printf("%d", p3 == p1);`,
    correctOutput: '1',
    explanation: '模拟内存池：p1从pool起始分配100字节，p2分配后100字节。重置alloc到p1位置后，p3从p1位置分配，所以p3==p1。嵌入式常用内存池避免碎片，分配地址可预测。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/memory-pool.html'
    }
  },

  // 指针高级应用
  {
    id: 114,
    chapter: 'pointers',
    type: 'output',
    title: '函数指针（专家级）',
    description: '回调函数机制',
    code: `int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int (*op)(int, int) = add;
printf("%d", op(5, 3));`,
    correctOutput: '8',
    explanation: '函数指针int (*op)(int, int)可以指向任何接受两个int返回int的函数。op指向add，所以op(5,3)=add(5,3)=8。嵌入式驱动中常用回调机制。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/function-pointer.html'
    }
  },
  {
    id: 115,
    chapter: 'pointers',
    type: 'fill',
    title: '函数指针数组',
    description: '实现状态机跳转表',
    code: `int (*ops[])(int, int) = {add, sub, mul, div};
printf("%d", ops[___①](10, 2));  // 调用除法`,
    blanks: [
      { hint: '除法对应的索引', answer: '3' }
    ],
    explanation: '函数指针数组实现跳转表。ops[0]=add, ops[1]=sub, ops[2]=mul, ops[3]=div。嵌入式状态机常用此技术替代switch-case，提高效率。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/function-pointer-array.html'
    }
  },
  {
    id: 116,
    chapter: 'pointers',
    type: 'output',
    title: '嵌入式多级指针与寄存器',
    description: '分析GPIO寄存器访问（高难度）',
    code: `uint32_t **reg_base = (uint32_t **)0x40000000;
uint32_t *gpio_ctrl = reg_base[0];
gpio_ctrl[2] = 0xFF;
printf("%d", gpio_ctrl[2]);`,
    correctOutput: '255',
    explanation: '二级指针模拟硬件寄存器访问：reg_base[0]获取GPIO控制器基址，gpio_ctrl[2]偏移8字节访问DR寄存器。0xFF的十进制值为255。工程注意：1)需volatile修饰防优化 2)需先开启外设时钟 3)地址应宏定义 4)需异常处理防HardFault。',
    difficulty: 5,
    hint: 'reg_base[0]解引用一次得到GPIO基地址，gpio_ctrl[2]偏移访问寄存器',
    knowledgePoints: ['嵌入式寄存器访问', '二级指针', '内存映射IO', 'GPIO编程'],
    lineAnalysis: [
      { num: 1, explanation: '将固定地址0x40000000强制转换为二级指针。这是MCU外设基地址的典型用法。', memoryChange: 'reg_base = 0x40000000' },
      { num: 2, explanation: 'reg_base[0] = *reg_base，解引用获取GPIO控制器基地址。假设为0x40020000。', memoryChange: 'gpio_ctrl = 0x40020000' },
      { num: 3, explanation: 'gpio_ctrl[2]偏移8字节（2*sizeof(uint32_t)），写入0xFF到DR寄存器。这是嵌入式控制外设的核心方式。', memoryChange: 'DR寄存器 = 0xFF', highlight: true },
      { num: 4, explanation: '读取DR寄存器值，0xFF = 255（十进制）。' }
    ],
    memoryViz: {
      cells: [
        { name: 'reg_base', address: '栈上', value: '0x40000000', type: 'pointer' },
        { name: '*reg_base', address: '0x40000000', value: '0x40020000', type: 'pointer', pointsTo: 'GPIO基址' },
        { name: 'gpio_ctrl', address: '栈上', value: '0x40020000', type: 'pointer' },
        { name: 'gpio_ctrl[0] CR', address: '0x40020000', value: '控制寄存器', type: 'struct' },
        { name: 'gpio_ctrl[1] SR', address: '0x40020004', value: '状态寄存器', type: 'struct' },
        { name: 'gpio_ctrl[2] DR', address: '0x40020008', value: '0xFF', beforeValue: '0x00', type: 'struct', changed: true }
      ]
    },
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/register-pointer.html'
    },
    commonMistakes: ['忘记volatile修饰导致编译器优化掉读写', '未开启外设时钟导致访问失败', '地址未对齐导致HardFault'],
    relatedConcepts: ['STM32寄存器映射', 'volatile关键字', '内存屏障', '位带操作']
  },
  {
    id: 117,
    chapter: 'pointers',
    type: 'debug',
    title: 'const指针与指针const',
    description: '区分const int*和int* const',
    code: `1 | int x = 10, y = 20;
2 | const int *p = &x;
3 | *p = 30;  // 修改指向的值
4 | p = &y;    // 修改指针本身`,
    bugLine: 3,
    bugFix: '// *p = 30;  // 错误！不能通过p修改值\n// p = &y;     // 这是允许的',
    explanation: 'const int *p：p指向的值不能修改（*p只读），但p本身可以指向别处。int * const p则相反。嵌入式中，硬件寄存器常用const修饰防止误写。',
    difficulty: 4
  },
  {
    id: 118,
    chapter: 'pointers',
    type: 'output',
    title: 'volatile指针',
    description: '防止编译器优化硬件寄存器访问',
    code: `volatile uint32_t *timer = (volatile uint32_t *)0x2000;
uint32_t start = *timer;
while (*timer - start < 1000);  // 等待
printf("Timeout");`,
    correctOutput: 'Timeout',
    explanation: 'volatile告诉编译器每次都要从内存读取，不要优化缓存。硬件寄存器值可能被外部改变，必须用volatile修饰。嵌入式中断、定时器访问必备。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/volatile-pointer.html'
    }
  },

  // 位操作与寄存器
  {
    id: 119,
    chapter: 'operators',
    type: 'fill',
    title: '寄存器位设置（嵌入式核心）',
    description: '设置特定位而不影响其他位',
    code: `uint32_t reg = 0x00;
reg ___① (1 << 3);  // 设置第3位
reg ___① ~(1 << 5); // 清除第5位`,
    blanks: [
      { hint: '位或操作', answer: '|=' },
      { hint: '位与取反操作', answer: '&=' }
    ],
    explanation: '|= (1<<n) 设置第n位，&= ~(1<<n) 清除第n位。嵌入式中每个位控制一个硬件功能，必须精确操作。这是驱动开发的基础技能。',
    difficulty: 3
  },
  {
    id: 120,
    chapter: 'operators',
    type: 'output',
    title: '位域提取',
    description: '从寄存器中提取特定字段',
    code: `uint32_t reg = 0xABCD1234;
uint32_t field = (reg >> 8) & 0xFF;
printf("0x%X", field);`,
    correctOutput: '0x12',
    explanation: '提取第8-15位：(reg >> 8)右移8位，& 0xFF取低8位。0xABCD1234 >> 8 = 0xABCD12，& 0xFF = 0x12。嵌入式解析硬件状态常用。',
    difficulty: 3
  },
  {
    id: 121,
    chapter: 'operators',
    type: 'fill',
    title: '位域结构体',
    description: '直接映射硬件寄存器位',
    code: `struct {
    unsigned int enable : ___①;
    unsigned int mode   : 3;
    unsigned int irq    : 1;
} ctrl;`,
    blanks: [
      { hint: 'enable字段占1位', answer: '1' }
    ],
    explanation: '位域结构体直接映射硬件寄存器位布局。:1表示占1位。嵌入式中用于直接操作控制寄存器，如enable位控制模块开关。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/bit-field-struct.html'
    }
  },
  {
    id: 122,
    chapter: 'operators',
    type: 'output',
    title: '原子位操作',
    description: '无中断的位操作（概念题）',
    code: `// 假设这是原子操作
uint32_t flags = 0;
flags |= (1 << 0);  // 设置位
flags |= (1 << 1);
printf("%d", flags);`,
    correctOutput: '3',
    explanation: 'flags=0，设置第0位后flags=1，设置第1位后flags=3。嵌入式中断处理中，位操作必须是原子的，否则可能被中断打断导致竞态条件。',
    difficulty: 3
  },
  {
    id: 123,
    chapter: 'operators',
    type: 'debug',
    title: '位操作优先级错误',
    description: '常见的运算符优先级陷阱',
    code: `1 | uint32_t reg = 0;
2 | if (reg & 1 << 0 == 0) {
3 |     printf("Bit not set");
4 | }`,
    bugLine: 2,
    bugFix: 'if ((reg & (1 << 0)) == 0) {',
    explanation: '==优先级高于&，所以实际执行reg & (1<<0 == 0) = reg & 0 = 0。必须用括号明确优先级：(reg & (1<<0)) == 0。嵌入式位操作常见错误！',
    difficulty: 3
  },

  // 预处理器与宏
  {
    id: 124,
    chapter: 'basics',
    type: 'fill',
    title: '条件编译（嵌入式必备）',
    description: '根据平台选择代码',
    code: `___① __x86_64__
    #define ARCH "x86_64"
___① __arm__
    #define ARCH "ARM"
#else
    #define ARCH "Unknown"
#endif`,
    blanks: [
      { hint: '如果定义了', answer: '#ifdef' },
      { hint: '否则如果', answer: '#elif defined' }
    ],
    explanation: '#ifdef检查宏是否定义，#elif defined添加额外条件。嵌入式中用于跨平台代码，如ARM和x86使用不同驱动实现。',
    difficulty: 3
  },
  {
    id: 125,
    chapter: 'basics',
    type: 'output',
    title: '宏定义计算',
    description: '宏的文本替换特性',
    code: `#define SQUARE(x) x * x
int result = SQUARE(3 + 2);
printf("%d", result);`,
    correctOutput: '11',
    explanation: '宏是文本替换！SQUARE(3+2)展开为3+2*3+2=3+6+2=11。正确写法：#define SQUARE(x) ((x)*(x))。嵌入式中宏定义硬件地址必须加括号。',
    difficulty: 3
  },
  {
    id: 126,
    chapter: 'basics',
    type: 'fill',
    title: '字符串化宏',
    description: '调试信息输出',
    code: `#define DEBUG(x) printf("%s = %d\\n", ___①(x), x)
DEBUG(count);`,
    blanks: [
      { hint: '字符串化操作符', answer: '#' }
    ],
    explanation: '#x将宏参数转换为字符串。DEBUG(count)展开为printf("%s = %d\n", "count", count)。嵌入式调试中用于输出变量名和值。',
    difficulty: 4
  },
  {
    id: 127,
    chapter: 'basics',
    type: 'output',
    title: '可变参数宏',
    description: '嵌入式日志系统',
    code: `#define LOG(fmt, ...) printf("[LOG] " fmt "\\n", ##__VA_ARGS__)
LOG("Value: %d", 42);`,
    correctOutput: '[LOG] Value: 42',
    explanation: '__VA_ARGS__表示可变参数，##用于消除最后一个逗号当无参数时。嵌入式中用于实现分级日志系统，可开关不同级别日志。',
    difficulty: 4
  },
  {
    id: 128,
    chapter: 'basics',
    type: 'fill',
    title: '头文件保护',
    description: '防止重复包含',
    code: `___① MY_DRIVER_H
#define MY_DRIVER_H

// 驱动代码

___①`,
    blanks: [
      { hint: '如果没有定义', answer: '#ifndef' },
      { hint: '结束条件编译', answer: '#endif' }
    ],
    explanation: '#ifndef检查宏未定义时才编译，防止头文件重复包含。嵌入式项目中每个头文件都必须有保护，否则会导致重复定义错误。',
    difficulty: 2
  },

  // 结构体高级应用
  {
    id: 129,
    chapter: 'arrays',
    type: 'output',
    title: '柔性数组（专家级）',
    description: '变长结构体，嵌入式网络包常用',
    code: `struct packet {
    uint32_t len;
    uint8_t data[];  // 柔性数组
};
printf("%zu", sizeof(struct packet));`,
    correctOutput: '4',
    explanation: '柔性数组data[]不占空间，sizeof只计算len(4字节)。实际使用时malloc(sizeof(struct packet) + data_len)。嵌入式网络协议栈常用此技术处理变长包。',
    difficulty: 5,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/flexible-array.html'
    }
  },
  {
    id: 130,
    chapter: 'arrays',
    type: 'fill',
    title: '结构体强制类型转换',
    description: '协议解析常用技巧',
    code: `uint8_t buf[] = {0x01, 0x00, 0x00, 0x00, 0xFF};
struct header *h = (struct header ___①)buf;
printf("%d", h->type);`,
    blanks: [
      { hint: '指针类型转换', answer: '*' }
    ],
    explanation: '(struct header *)将字节数组强制转换为结构体指针。嵌入式网络/存储协议解析常用此技巧，直接将原始数据映射到结构体。注意对齐要求！',
    difficulty: 4,
    visualization: {
      type: 'memory',
      data: {
        title: '内存映射可视化',
        description: '字节数组被强制转换为结构体指针后，内存布局如下：',
        memoryBlocks: [
          { address: 'buf[0]', value: '0x01', label: 'type = 1', color: 'blue' },
          { address: 'buf[1]', value: '0x00', label: 'padding/数据', color: 'gray' },
          { address: 'buf[2]', value: '0x00', label: 'padding/数据', color: 'gray' },
          { address: 'buf[3]', value: '0x00', label: 'padding/数据', color: 'gray' },
          { address: 'buf[4]', value: '0xFF', label: 'flags = 255', color: 'green' }
        ],
        pointerInfo: {
          from: 'h (struct header *)',
          to: 'buf[0]',
          description: '指针h指向buf的起始地址'
        },
        note: '结构体指针让我们可以用h->type的方式访问原始字节数据'
      }
    }
  },
  {
    id: 131,
    chapter: 'arrays',
    type: 'output',
    title: '联合体类型双关',
    description: '提取浮点数的二进制表示',
    code: `union {
    float f;
    uint32_t i;
} u;
u.f = 3.14f;
printf("0x%X", u.i);`,
    correctOutput: '0x4048F5C3',
    explanation: '联合体共享内存，u.f写入浮点数，u.i读取其二进制表示。嵌入式中用于浮点与整型转换、协议打包。注意：这是未定义行为，实际应使用memcpy。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/union-type-punning.html'
    }
  },
  {
    id: 132,
    chapter: 'arrays',
    type: 'debug',
    title: '数组越界访问硬件',
    description: '嵌入式中的致命错误',
    code: `1 | uint32_t regs[4];  // 4个寄存器
2 | void init_hardware() {
3 |     for (int i = 0; i <= 4; i++) {
4 |         regs[i] = 0;
5 |     }
6 | }`,
    bugLine: 3,
    bugFix: '    for (int i = 0; i < 4; i++) {',
    explanation: 'i <= 4导致访问regs[4]，越界！regs只有0-3。嵌入式中regs可能映射到硬件寄存器，写入越界地址可能损坏硬件或导致系统崩溃。',
    difficulty: 3,
    visualization: {
      type: 'array',
      data: {
        title: '数组越界可视化',
        description: 'regs[4]只有索引0-3，i<=4导致访问regs[4]越界',
        steps: [
          { array: ['regs[0]', 'regs[1]', 'regs[2]', 'regs[3]', '???'], i: 0, action: 'i=0: 访问regs[0] ✓' },
          { array: ['regs[0]', 'regs[1]', 'regs[2]', 'regs[3]', '???'], i: 1, action: 'i=1: 访问regs[1] ✓' },
          { array: ['regs[0]', 'regs[1]', 'regs[2]', 'regs[3]', '???'], i: 2, action: 'i=2: 访问regs[2] ✓' },
          { array: ['regs[0]', 'regs[1]', 'regs[2]', 'regs[3]', '???'], i: 3, action: 'i=3: 访问regs[3] ✓' },
          { array: ['regs[0]', 'regs[1]', 'regs[2]', 'regs[3]', '危险!'], i: 4, action: 'i=4: 访问regs[4] ✗ 越界！可能损坏硬件' }
        ],
        note: '数组索引从0开始，regs[4]的有效索引是0,1,2,3。i<=4会访问到regs[4]造成越界'
      }
    }
  },

  // 文件IO与系统调用
  {
    id: 133,
    chapter: 'basics',
    type: 'fill',
    title: '底层文件IO（Linux系统调用）',
    description: 'open/read/write/close',
    code: `int fd = open("data.bin", O_RDONLY);
char buf[256];
ssize_t n = ___①(fd, buf, 256);
close(fd);`,
    blanks: [
      { hint: '读取系统调用', answer: 'read' }
    ],
    explanation: 'read(fd, buf, count)从文件描述符读取数据。嵌入式Linux应用开发中，底层IO比标准库更高效，可直接操作设备文件如/dev/gpio。',
    difficulty: 3
  },
  {
    id: 134,
    chapter: 'basics',
    type: 'output',
    title: '内存映射数组',
    description: 'mmap模拟内存映射访问',
    code: `char data[] = "Hello";
char *p = data;
printf("%c", p[0]);`,
    correctOutput: 'H',
    explanation: '模拟mmap访问：data数组模拟映射的内存区域，p[0]访问第一个字节。mmap将文件映射到内存后，可以像数组一样访问。实际mmap用于高效访问大文件或共享内存。',
    difficulty: 2
  },
  {
    id: 135,
    chapter: 'basics',
    type: 'debug',
    title: '文件描述符泄漏',
    description: '嵌入式系统资源有限',
    code: `1 | void process_files() {
2 |     for (int i = 0; i < 1000; i++) {
3 |         int fd = open("config.txt", O_RDONLY);
4 |         read_config(fd);
5 |         // 忘记close
6 |     }
7 | }`,
    bugLine: 5,
    bugFix: '        close(fd);',
    explanation: '循环中打开文件1000次但从不关闭，导致文件描述符耗尽！嵌入式系统通常限制最多1024个fd。必须在每个open后对应close。',
    difficulty: 3
  },
  {
    id: 136,
    chapter: 'basics',
    type: 'fill',
    title: 'ioctl系统调用',
    description: '设备特殊控制',
    code: `int fd = open("/dev/gpio", O_RDWR);
int value = 1;
___①(fd, GPIO_SET_PIN, &value);`,
    blanks: [
      { hint: 'IO控制', answer: 'ioctl' }
    ],
    explanation: 'ioctl用于设备特殊操作，无法通过read/write完成。嵌入式Linux中，GPIO、SPI、I2C等驱动都通过ioctl提供控制接口。',
    difficulty: 4
  },
  {
    id: 137,
    chapter: 'basics',
    type: 'output',
    title: '二进制文件操作',
    description: '处理结构化数据',
    code: `struct sensor_data { int id; float value; };
struct sensor_data d = {1, 25.5f};
FILE *fp = fopen("data.bin", "wb");
fwrite(&d, sizeof(d), 1, fp);
fclose(fp);
printf("Written");`,
    correctOutput: 'Written',
    explanation: 'fwrite直接写入结构体二进制数据。嵌入式中用于存储传感器数据、配置参数等。注意字节序和对齐，不同平台可能需要转换。',
    difficulty: 3
  },

  // 调试与优化
  {
    id: 138,
    chapter: 'basics',
    type: 'fill',
    title: '断言宏（调试神器）',
    description: '运行时条件检查',
    code: `#include <assert.h>
int *p = malloc(100);
___①(p != NULL);  // 确保分配成功`,
    blanks: [
      { hint: '断言宏', answer: 'assert' }
    ],
    explanation: 'assert(condition)在condition为假时终止程序并输出错误。嵌入式开发中用于检查不可能发生的条件，如内存分配失败、非法参数等。发布版本通常禁用。',
    difficulty: 2
  },
  {
    id: 139,
    chapter: 'basics',
    type: 'output',
    title: '编译器优化屏障',
    description: '防止关键代码被优化',
    code: `volatile int flag = 0;
void wait() {
    while (flag == 0);
}
printf("Waiting...");`,
    correctOutput: 'Waiting...',
    explanation: 'flag用volatile修饰，防止编译器优化掉while循环。嵌入式中断处理中，flag可能被ISR修改，必须用volatile确保每次从内存读取。',
    difficulty: 3
  },
  {
    id: 140,
    chapter: 'basics',
    type: 'debug',
    title: '整数溢出（嵌入式安全）',
    description: '无符号数回绕',
    code: `1 | uint8_t counter = 250;
2 | void increment() {
3 |     counter += 10;
4 |     if (counter < 10) {
5 |         printf("Overflow detected");
6 |     }
7 | }`,
    bugLine: 4,
    bugFix: '    if (counter < 250) {  // 检查溢出\n        printf("Overflow detected");\n    }',
    explanation: 'uint8_t范围0-255，250+10=260→4（回绕）。counter<10永远为假。嵌入式安全关键代码必须检查溢出，可用counter > 250判断。',
    difficulty: 3
  },
  {
    id: 141,
    chapter: 'basics',
    type: 'fill',
    title: '内联函数',
    description: '替代宏的安全选择',
    code: `___① int max(int a, int b) {
    return (a > b) ? a : b;
}
int m = max(3 + 2, 4);`,
    blanks: [
      { hint: '内联关键字', answer: 'inline' }
    ],
    explanation: 'inline建议编译器将函数体直接插入调用处，避免函数调用开销。比宏安全（有类型检查）。嵌入式中用于时间关键的短小函数。',
    difficulty: 3
  },
  {
    id: 142,
    chapter: 'basics',
    type: 'output',
    title: '属性优化（GCC扩展）',
    description: '编译器优化提示',
    code: `int __attribute__((const)) square(int x) {
    return x * x;
}
printf("%d", square(5));`,
    correctOutput: '25',
    explanation: '__attribute__((const))告诉编译器函数只依赖参数，无副作用。编译器可优化重复调用。嵌入式中用于数学计算函数，帮助编译器生成高效代码。',
    difficulty: 4
  },

  // ===== 面试专题：手写代码题 =====
  {
    id: 143,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】字符串反转',
    description: '实现字符串原地反转',
    code: `void reverse(char *str) {
    int len = strlen(str);
    for (int i = 0; i < len / 2; i++) {
        char tmp = str[i];
        str[i] = str[___① - i - 1];
        str[len - i - 1] = tmp;
    }
}`,
    blanks: [
      { hint: '字符串长度变量', answer: 'len' }
    ],
    explanation: '原地反转字符串的经典算法：双指针交换。i从头向后，len-i-1从尾向前，相遇时停止。时间复杂度O(n)，空间复杂度O(1)。',
    difficulty: 3,
    vocabulary: [
      { word: 'reverse', meaning: '反转/颠倒' },
      { word: 'in-place', meaning: '原地（不使用额外空间）' }
    ],
    visualization: {
      type: 'array',
      data: {
        title: '双指针交换过程',
        description: 'i从前往后，j从后往前，两两交换直到相遇',
        steps: [
          { array: ['h','e','l','l','o'], i: 0, j: 4, action: '交换 str[0]和str[4]' },
          { array: ['o','e','l','l','h'], i: 1, j: 3, action: '交换 str[1]和str[3]' },
          { array: ['o','l','l','e','h'], i: 2, j: 2, action: 'i>=j，停止' }
        ],
        note: 'i和j向中间移动，每次交换两个字符'
      }
    }
  },
  {
    id: 144,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】memcpy实现',
    description: '实现内存拷贝函数',
    code: `void *my_memcpy(void *dest, const void *src, size_t n) {
    char *d = ___①;
    const char *s = src;
    while (n--) {
        *d++ = *s++;
    }
    return dest;
}`,
    blanks: [
      { hint: '目标地址转为char指针', answer: 'dest' }
    ],
    explanation: 'memcpy逐字节拷贝。关键点：①void*需要转为char*才能逐字节操作 ②const修饰src防止修改源数据 ③返回dest支持链式调用。注意：memcpy不处理内存重叠！',
    difficulty: 3,
    vocabulary: [
      { word: 'memcpy', meaning: '内存拷贝 (Memory Copy)' },
      { word: 'overlap', meaning: '重叠' }
    ],
    visualization: {
      type: 'memory',
      data: {
        title: 'memcpy内存拷贝过程',
        description: '将src指向的内存逐字节复制到dest',
        memoryBlocks: [
          { address: 'src[0]', value: 'A', label: '→ dest[0]', color: 'blue' },
          { address: 'src[1]', value: 'B', label: '→ dest[1]', color: 'blue' },
          { address: 'src[2]', value: 'C', label: '→ dest[2]', color: 'blue' },
          { address: 'src[3]', value: 'D', label: '→ dest[3]', color: 'blue' }
        ],
        pointerInfo: {
          from: 's (const char *)',
          to: 'src内存',
          description: '*d++ = *s++ 每次复制1字节，然后两个指针都后移'
        },
        note: '⚠️ memcpy不处理内存重叠！重叠时请用memmove'
      }
    }
  },
  {
    id: 145,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】memmove实现',
    description: '处理重叠内存的拷贝',
    code: `void *my_memmove(void *dest, const void *src, size_t n) {
    char *d = dest;
    const char *s = src;
    if (d < s) {
        while (n--) *d++ = *s++;
    } else {
        d += n; s += n;
        while (n--) *___① = *___①;
    }
    return dest;
}`,
    blanks: [
      { hint: '从后向前复制（先--再解引用）', answer: '--d' },
      { hint: '源地址同样操作', answer: '--s' }
    ],
    explanation: 'memmove处理内存重叠：如果dest<src，从前向后拷贝；否则从后向前拷贝。面试常考：memcpy vs memmove的区别。memmove更安全但稍慢。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/memmove-overlap.html'
    },
    vocabulary: [
      { word: 'memmove', meaning: '可重叠内存移动' }
    ]
  },
  {
    id: 146,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】strlen实现',
    description: '计算字符串长度',
    code: `size_t my_strlen(const char *str) {
    const char *p = str;
    while (___① != '\\0') {
        p++;
    }
    return p - str;
}`,
    blanks: [
      { hint: '当前字符', answer: '*p' }
    ],
    explanation: 'strlen遍历字符串直到遇到\\0终止符。使用指针相减(p-str)得到长度，这是C语言指针运算的特性。const修饰表示不修改字符串内容。',
    difficulty: 2,
    vocabulary: [
      { word: 'strlen', meaning: '字符串长度 (String Length)' }
    ]
  },
  {
    id: 147,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】strcpy实现',
    description: '字符串拷贝',
    code: `char *my_strcpy(char *dest, const char *src) {
    char *d = dest;
    while ((*d++ = *___①++));
    return dest;
}`,
    blanks: [
      { hint: '源字符串指针', answer: 'src' }
    ],
    explanation: 'strcpy的经典一行实现：while ((*d++ = *src++))。赋值表达式的值是赋的值，当复制\\0时值为0，循环结束。面试常考此写法。',
    difficulty: 3,
    vocabulary: [
      { word: 'strcpy', meaning: '字符串拷贝 (String Copy)' }
    ]
  },
  {
    id: 148,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】strcmp实现',
    description: '字符串比较',
    code: `int my_strcmp(const char *s1, const char *s2) {
    while (*s1 && *s1 == *s2) {
        s1++; s2++;
    }
    return ___① - ___①;
}`,
    blanks: [
      { hint: '第一个字符串当前字符', answer: ['*(unsigned char*)s1', '*s1'] },
      { hint: '第二个字符串当前字符', answer: ['*(unsigned char*)s2', '*s2'] }
    ],
    explanation: 'strcmp逐个字符比较，直到不同或遇到\\0。返回值是字符差(s1-s2)。注意：应该转为unsigned char比较，否则有符号字符可能导致错误结果。',
    difficulty: 3,
    vocabulary: [
      { word: 'strcmp', meaning: '字符串比较 (String Compare)' }
    ]
  },
  {
    id: 149,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】链表反转',
    description: '单链表原地反转',
    code: `struct Node {
    int data;
    struct Node *next;
};

struct Node* reverse_list(struct Node *head) {
    struct Node *prev = NULL, *curr = head, *next;
    while (curr) {
        next = curr->next;
        curr->next = ___①;
        prev = curr;
        curr = next;
    }
    return ___①;
}`,
    blanks: [
      { hint: '当前节点指向已反转部分', answer: 'prev' },
      { hint: '返回新的头节点', answer: 'prev' }
    ],
    explanation: '链表反转三指针法：prev(已反转), curr(当前), next(暂存)。每次将curr->next指向prev，然后三个指针后移。这是面试最高频的链表题！',
    difficulty: 4,
    vocabulary: [
      { word: 'linked list', meaning: '链表' },
      { word: 'reverse', meaning: '反转' }
    ],
    visualization: {
      type: 'pointer',
      data: {
        title: '链表反转三指针法',
        description: 'prev指向已反转部分，curr是当前处理的节点，next暂存下一个节点',
        steps: [
          { prev: 'NULL', curr: '1→2→3→4', next: '2→3→4', action: '初始状态' },
          { prev: '1→NULL', curr: '2→3→4', next: '3→4', action: '1的next指向NULL' },
          { prev: '2→1→NULL', curr: '3→4', next: '4', action: '2的next指向1' },
          { prev: '3→2→1→NULL', curr: '4', next: 'NULL', action: '3的next指向2' },
          { prev: '4→3→2→1→NULL', curr: 'NULL', next: 'NULL', action: '4的next指向3，完成' }
        ],
        note: 'curr->next = prev 是关键操作，将当前节点插入到已反转链表头部'
      }
    }
  },
  {
    id: 150,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】二分查找',
    description: '在有序数组中查找元素',
    code: `int binary_search(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = ___①;
        else right = ___①;
    }
    return -1;
}`,
    blanks: [
      { hint: '目标在右半部分', answer: 'mid + 1' },
      { hint: '目标在左半部分', answer: 'mid - 1' }
    ],
    explanation: '二分查找：每次将搜索范围减半。mid=left+(right-left)/2防止溢出。时间复杂度O(log n)。面试必会算法！',
    difficulty: 3,
    vocabulary: [
      { word: 'binary search', meaning: '二分查找' }
    ],
    visualization: {
      type: 'array',
      data: {
        title: '二分查找过程',
        description: '在有序数组中每次将搜索范围减半',
        steps: [
          { array: [1, 3, 5, 7, 9, 11, 13, 15], i: 0, j: 7, action: '初始: left=0, right=7, mid=3(值7)' },
          { array: [1, 3, 5, 7, 9, 11, 13, 15], i: 4, j: 7, action: '目标11>7: left=mid+1=4' },
          { array: [1, 3, 5, 7, 9, 11, 13, 15], i: 4, j: 7, action: 'mid=5(值11), 找到目标!' }
        ],
        note: '每次比较后，搜索范围减半，时间复杂度O(log n)'
      }
    }
  },

  // ===== 面试专题：系统设计题 =====
  {
    id: 151,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】内存池结构',
    description: '设计固定大小内存池',
    code: `typedef struct {
    uint8_t *pool;      // 内存池起始地址
    size_t block_size;  // 每块大小
    size_t block_count; // 块数量
    uint8_t *___①;     // 空闲块链表头
} MemPool;`,
    blanks: [
      { hint: '空闲列表', answer: 'free_list' }
    ],
    explanation: '内存池设计：预先分配一大块内存，分割成固定大小的小块，用链表管理空闲块。分配时从链表头取一块，释放时插回链表头。避免频繁malloc/free的碎片和开销。',
    difficulty: 4,
    vocabulary: [
      { word: 'memory pool', meaning: '内存池' },
      { word: 'free list', meaning: '空闲列表' }
    ]
  },
  {
    id: 152,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】环形缓冲区',
    description: '实现生产者-消费者队列',
    code: `typedef struct {
    uint8_t *buffer;
    size_t size;
    volatile size_t head;  // 写指针
    volatile size_t ___①; // 读指针
} RingBuffer;`,
    blanks: [
      { hint: '尾部/读取位置', answer: 'tail' }
    ],
    explanation: '环形缓冲区：head写，tail读，模运算实现环形。volatile防止编译器优化，确保多线程/中断可见性。嵌入式串口通信、音频处理常用。',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/ring-buffer.html'
    },
    vocabulary: [
      { word: 'ring buffer', meaning: '环形缓冲区' },
      { word: 'circular queue', meaning: '循环队列' }
    ]
  },
  {
    id: 153,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】状态机实现',
    description: '使用函数指针数组实现状态机',
    code: `typedef enum { STATE_IDLE, STATE_RUN, STATE_STOP } State;

typedef State (*StateFunc)(void);

State state_idle() { /* ... */ return STATE_RUN; }
State state_run()  { /* ... */ return STATE_STOP; }
State state_stop() { /* ... */ return STATE_IDLE; }

StateFunc state_table[] = {
    state_idle, state_run, state_stop
};

// 状态机主循环
State current = STATE_IDLE;
while (1) {
    current = ___①[current]();
}`,
    blanks: [
      { hint: '状态跳转表', answer: 'state_table' }
    ],
    explanation: '函数指针数组实现状态机（跳转表）：每个状态对应一个函数，函数返回下一个状态。比switch-case更高效，状态转移清晰。嵌入式协议解析常用。',
    difficulty: 5,
    vocabulary: [
      { word: 'state machine', meaning: '状态机' },
      { word: 'jump table', meaning: '跳转表' }
    ],
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/state-machine.html'
    }
  },
  {
    id: 154,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】对象池',
    description: '管理有限资源的对象池',
    code: `typedef struct {
    Connection conn;
    int in_use;  // 0=空闲, 1=使用中
} PoolItem;

PoolItem pool[POOL_SIZE];

Connection* pool_acquire() {
    for (int i = 0; i < POOL_SIZE; i++) {
        if (pool[i].in_use == 0) {
            pool[i].in_use = ___①;
            return &pool[i].conn;
        }
    }
    return NULL;  // 池已满
}`,
    blanks: [
      { hint: '标记为使用中', answer: '1' }
    ],
    explanation: '对象池管理有限资源（如数据库连接）。预先创建固定数量，标记使用状态。避免频繁创建销毁的开销，控制资源使用量。嵌入式网络连接管理常用。',
    difficulty: 3,
    vocabulary: [
      { word: 'object pool', meaning: '对象池' }
    ]
  },

  // ===== 面试专题：Bug修复题 =====
  {
    id: 155,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】野指针访问',
    description: '找出并修复野指针问题',
    code: `1 | int *get_value() {
2 |     int x = 10;
3 |     return &x;
4 | }
5 | 
6 | int main() {
7 |     int *p = get_value();
8 |     printf("%d", *p);
9 |     return 0;
10| }`,
    bugLine: 3,
    bugFix: '    static int x = 10;\n    return &x;',
    explanation: '返回局部变量地址！x在栈上，函数返回后栈帧销毁，p成为野指针。修复：①static修饰使x在数据段 ②动态分配malloc ③通过参数传出。',
    difficulty: 3,
    vocabulary: [
      { word: 'dangling pointer', meaning: '悬空指针/野指针' }
    ],
    visualization: {
      type: 'memory',
      data: {
        title: '野指针问题可视化',
        description: '函数返回后栈帧销毁，局部变量x不再有效',
        memoryBlocks: [
          { address: 'get_value栈帧', value: 'x = 10', label: '函数执行时存在', color: 'green' },
          { address: 'get_value返回后', value: '???', label: '栈帧销毁，x被覆盖', color: 'red' },
          { address: 'main中的p', value: '&x(无效)', label: '野指针！指向已销毁内存', color: 'red' }
        ],
        pointerInfo: {
          from: 'p',
          to: '无效地址',
          description: '函数返回后，x所在的栈内存已被释放'
        },
        note: '修复方法：①static int x ②malloc分配 ③通过参数传出'
      }
    }
  },
  {
    id: 156,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】内存泄漏链',
    description: '链表节点未释放',
    code: `1 | void clear_list(Node *head) {
2 |     while (head) {
3 |         head = head->next;
4 |     }
5 | }`,
    bugLine: 3,
    bugFix: '    Node *tmp = head;\n    head = head->next;\n    free(tmp);',
    explanation: '只移动指针，没有free节点，造成内存泄漏！正确做法：先保存当前节点，移动到下一个，然后释放保存的节点。链表操作必考！',
    difficulty: 3,
    vocabulary: [
      { word: 'memory leak', meaning: '内存泄漏' }
    ],
    visualization: {
      type: 'pointer',
      data: {
        title: '链表释放过程',
        description: '必须先保存当前节点，移动后再释放',
        steps: [
          { prev: 'NULL', curr: 'Node1→Node2→Node3', next: 'Node2→Node3', action: '初始状态' },
          { prev: 'NULL', curr: 'Node2→Node3', next: 'Node3', action: '错误：直接head=head->next，Node1丢失！' },
          { prev: 'NULL', curr: 'Node3', next: 'NULL', action: '错误：继续移动，Node2也丢失！' }
        ],
        note: '正确做法：tmp=head; head=head->next; free(tmp);'
      }
    }
  },
  {
    id: 157,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】越界访问',
    description: '数组越界导致未定义行为',
    code: `1 | int arr[5] = {1, 2, 3, 4, 5};
2 | for (int i = 0; i <= 5; i++) {
3 |     printf("%d ", arr[i]);
4 | }`,
    bugLine: 2,
    bugFix: 'for (int i = 0; i < 5; i++) {',
    explanation: 'i <= 5导致访问arr[5]，越界！有效索引是0-4。越界访问是C语言最常见的安全漏洞，可能导致崩溃或被恶意利用。',
    difficulty: 2,
    vocabulary: [
      { word: 'buffer overflow', meaning: '缓冲区溢出' }
    ]
  },
  {
    id: 158,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】整数溢出',
    description: '无符号整数回绕',
    code: `1 | unsigned int a = 0xFFFFFFFF;
2 | unsigned int b = 1;
3 | unsigned int c = a + b;
4 | if (c > a) {
5 |     printf("Normal");
6 | }`,
    bugLine: 4,
    bugFix: 'if (a > 0xFFFFFFFF - b) {\n    printf("Overflow");\n} else {\n    c = a + b;\n}',
    explanation: 'a+b溢出，c回绕为0。无符号溢出是定义行为（回绕），但逻辑错误。检查溢出：加法前判断a > MAX - b。安全关键代码必须检查！',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/integer-overflow.html'
    },
    vocabulary: [
      { word: 'integer overflow', meaning: '整数溢出' }
    ]
  },
  {
    id: 159,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】竞争条件',
    description: '非原子操作导致的数据竞争',
    code: `1 | // 中断处理程序
2 | void ISR() {
3 |     counter++;
4 | }
5 | 
6 | // 主程序
7 | void loop() {
8 |     if (counter > 0) {
9 |         counter--;
10|         process();
11|     }
12| }`,
    bugLine: 8,
    bugFix: '    disable_irq();\n    if (counter > 0) {\n        counter--;\n        enable_irq();\n        process();\n    } else {\n        enable_irq();\n    }',
    explanation: '读取-修改-写入不是原子操作！中断可能在if判断后和counter--前发生，导致counter为负。嵌入式中必须关中断保护临界区。',
    difficulty: 5,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/interrupt-critical-section.html'
    },
    vocabulary: [
      { word: 'race condition', meaning: '竞争条件' },
      { word: 'critical section', meaning: '临界区' }
    ]
  },

  // ===== 面试专题：性能优化题 =====
  {
    id: 160,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】循环展开',
    description: '减少循环开销',
    code: `// 原始代码
for (int i = 0; i < 100; i++) {
    sum += arr[i];
}

// 展开4次
for (int i = 0; i < 100; i += 4) {
    sum += arr[i] + arr[i+1] + arr[i+___①] + arr[i+___①];
}`,
    blanks: [
      { hint: '第三个元素', answer: '2' },
      { hint: '第四个元素', answer: '3' }
    ],
    explanation: '循环展开减少条件判断和跳转次数，提高指令级并行。但会增加代码体积。现代编译器通常自动展开，手动展开需谨慎。',
    difficulty: 3,
    vocabulary: [
      { word: 'loop unrolling', meaning: '循环展开' }
    ]
  },
  {
    id: 161,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】缓存友好访问',
    description: '按行优先访问二维数组',
    code: `int matrix[100][100];

// 缓存友好（行优先）
for (int i = 0; i < 100; i++) {
    for (int j = 0; j < 100; j++) {
        sum += matrix[___①][___①];
    }
}`,
    blanks: [
      { hint: '外层循环变量', answer: 'i' },
      { hint: '内层循环变量', answer: 'j' }
    ],
    explanation: 'C语言数组行优先存储。按行访问（matrix[i][j]）是连续的，缓存命中率高。按列访问（matrix[j][i]）跳跃式，缓存失效多。性能可能差10倍！',
    difficulty: 4,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/cache-friendly-access.html'
    },
    vocabulary: [
      { word: 'cache friendly', meaning: '缓存友好' },
      { word: 'row-major', meaning: '行优先' }
    ]
  },
  {
    id: 162,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】分支预测',
    description: ' likely/unlikely 提示',
    code: `// Linux内核风格
#define likely(x)   __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)

if (___①(error)) {
    handle_error();  // 很少发生
} else {
    normal_path();   // 经常发生
}`,
    blanks: [
      { hint: '不太可能发生的', answer: 'unlikely' }
    ],
    explanation: '__builtin_expect提示编译器分支概率，优化指令布局。unlikely表示条件很少为真，编译器将正常路径放在顺序执行位置，减少分支预测失败。嵌入式内核常用。',
    difficulty: 5,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/branch-prediction.html'
    },
    vocabulary: [
      { word: 'branch prediction', meaning: '分支预测' },
      { word: 'builtin_expect', meaning: 'GCC内置期望' }
    ]
  },
  {
    id: 163,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】内联小函数',
    description: '用inline减少调用开销',
    code: `___① int max(int a, int b) {
    return (a > b) ? a : b;
}

// 调用处
int m = max(x, y);  // 编译器可能直接展开为 (x > y) ? x : y`,
    blanks: [
      { hint: '内联关键字', answer: 'inline' }
    ],
    explanation: 'inline建议编译器在调用处展开函数体，消除调用开销（压栈、跳转、返回）。适合短小频繁调用的函数。现代编译器会自动内联，显式inline更多是代码意图表达。',
    difficulty: 3,
    vocabulary: [
      { word: 'inline', meaning: '内联' }
    ]
  },

  // ===== 面试专题：概念深度题 =====
  {
    id: 164,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】volatile原理',
    description: 'volatile的内存语义',
    code: `volatile int flag = 0;

void wait() {
    while (flag == 0) {
        // 等待中断修改flag
    }
}

// volatile确保：
// 1. 每次从___①读取flag
// 2. 禁止编译器___①`,
    blanks: [
      { hint: '读取位置', answer: '内存' },
      { hint: '编译器行为', answer: '优化' }
    ],
    explanation: 'volatile告诉编译器：①变量可能被外部改变（中断、硬件、其他线程）②每次必须真正读写内存，不能优化缓存到寄存器。嵌入式访问硬件寄存器、多线程标志位必须用volatile！',
    difficulty: 4,
    visualization: {
      'type': 'flow',
      'data': {
            'title': '系统调用开销',
            'description': '用户态→内核态切换成本',
            'steps': [
                  {
                        'from': '用户态',
                        'to': '保存上下文',
                        'action': '寄存器入栈'
                  },
                  {
                        'from': '软中断',
                        'to': '内核入口',
                        'action': 'CPU模式切换'
                  },
                  {
                        'from': '内核处理',
                        'to': '恢复上下文',
                        'action': '寄存器出栈'
                  },
                  {
                        'from': '返回用户态',
                        'to': '继续执行',
                        'action': '总开销~1000周期'
                  }
            ],
            'note': '减少系统调用次数可提高性能'
      }
},
    vocabulary: [
      { word: 'volatile', meaning: '易变的/易失的' }
    ]
  },
  {
    id: 165,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】内存屏障',
    description: '防止指令重排序',
    code: `int data = 0;
int ready = 0;

void writer() {
    data = 42;
    ___①;  // 内存屏障
    ready = 1;
}

void reader() {
    while (!ready);
    ___①;  // 内存屏障
    printf("%d", data);
}`,
    blanks: [
      { hint: '屏障指令', answer: ['__sync_synchronize()', 'memory_barrier'] }
    ],
    explanation: '内存屏障确保屏障前的操作在屏障后操作之前完成。防止编译器/CPU重排序导致reader看到ready=1但data还是0。多核嵌入式系统同步必备！',
    difficulty: 5,
    visualization: {
      type: 'html' as const,
      file: 'visualizations-v2/memory-barrier.html'
    },
    vocabulary: [
      { word: 'memory barrier', meaning: '内存屏障' },
      { word: 'reordering', meaning: '重排序' }
    ]
  },
  {
    id: 166,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】系统调用原理',
    description: '用户态到内核态切换',
    code: `// 用户程序调用open()
fd = open("file.txt", O_RDONLY);

// 内部流程：
// 1. 将参数放入___①
// 2. 触发软中断/特殊指令 (syscall)
// 3. CPU切换到___①态
// 4. 内核根据系统调用号分发`,
    blanks: [
      { hint: '参数传递位置', answer: '寄存器' },
      { hint: 'CPU运行状态', answer: '内核' }
    ],
    explanation: '系统调用是用户程序请求内核服务的接口。流程：设置参数→触发陷阱→切换到内核态→执行服务→返回用户态。涉及上下文切换，开销较大。嵌入式中应减少系统调用频率。',
    difficulty: 4,
    vocabulary: [
      { word: 'system call', meaning: '系统调用' },
      { word: 'kernel mode', meaning: '内核态' }
    ]
  },
  {
    id: 167,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】静态链接vs动态链接',
    description: '链接方式的区别',
    code: `// 静态链接
// 优点：无依赖，启动___①
// 缺点：体积大，多个程序___①内存

// 动态链接
// 优点：体积小，共享节省内存
// 缺点：有依赖，启动稍慢`,
    blanks: [
      { hint: '启动速度', answer: '快' },
      { hint: '内存使用', answer: '重复占用' }
    ],
    explanation: '静态链接将库代码复制到可执行文件，独立运行，适合嵌入式。动态链接运行时加载共享库，节省磁盘和内存，但需要目标系统有对应库。嵌入式通常用静态链接。',
    difficulty: 3,
    vocabulary: [
      { word: 'static linking', meaning: '静态链接' },
      { word: 'dynamic linking', meaning: '动态链接' }
    ]
  },
  {
    id: 168,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】栈溢出保护',
    description: '栈溢出检测机制',
    code: `// GCC启用栈保护
// gcc -fstack-protector-strong

// 原理：
// 1. 函数入口在栈上放置___①值
// 2. 函数出口检查该值是否改变
// 3. 如果被覆盖，说明发生___①`,
    blanks: [
      { hint: '特殊标记值', answer: '金丝雀' },
      { hint: '安全事件', answer: '栈溢出' }
    ],
    explanation: '栈金丝雀(Stack Canary)是栈保护技术：函数开始放一个随机值（金丝雀），返回前检查是否改变。如果被缓冲区溢出覆盖，说明发生攻击，程序终止。安全关键代码应启用。',
    difficulty: 4,
    visualization: {
      'type': 'flow',
      'data': {
            'title': '进程vs线程',
            'description': '资源隔离与共享',
            'steps': [
                  {
                        'from': '进程',
                        'to': '独立地址空间',
                        'action': '隔离性好'
                  },
                  {
                        'from': '线程',
                        'to': '共享地址空间',
                        'action': '通信高效'
                  }
            ],
            'note': '进程切换开销大于线程切换'
      }
},
    vocabulary: [
      { word: 'stack canary', meaning: '栈金丝雀' },
      { word: 'stack protector', meaning: '栈保护' }
    ]
  },
  {
    id: 169,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】零拷贝技术',
    description: '减少数据拷贝次数',
    code: `// 传统方式：磁盘 → 内核缓冲区 → 用户缓冲区 → socket
// 零拷贝：磁盘 → 内核缓冲区 → socket

// Linux实现：
sendfile(out_fd, in_fd, NULL, count);
// 数据在内核中直接从文件页缓存到___①`,
    blanks: [
      { hint: '网络发送位置', answer: '网卡' }
    ],
    explanation: '零拷贝避免数据在内核和用户空间之间来回拷贝。sendfile让DMA引擎直接将数据从文件缓存发送到网卡，CPU不参与数据搬运。高性能网络服务器、嵌入式流媒体常用。',
    difficulty: 5,
    visualization: {
      'type': 'flow',
      'data': {
            'title': '系统调用流程',
            'description': '用户态 → 内核态 → 用户态',
            'steps': [
                  {
                        'from': '用户程序',
                        'to': '寄存器传参',
                        'action': '参数放入寄存器'
                  },
                  {
                        'from': 'syscall指令',
                        'to': '内核入口',
                        'action': '触发软中断'
                  },
                  {
                        'from': '内核处理',
                        'to': '返回值',
                        'action': '执行系统调用'
                  },
                  {
                        'from': '返回用户态',
                        'to': '继续执行',
                        'action': '恢复上下文'
                  }
            ],
            'note': '用户态→内核态切换需要保存上下文，开销较大'
      }
},
    vocabulary: [
      { word: 'zero copy', meaning: '零拷贝' },
      { word: 'sendfile', meaning: '发送文件系统调用' }
    ]
  },
  {
    id: 170,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】MMU与虚拟内存',
    description: '内存管理单元的作用',
    code: `// 虚拟地址 → [MMU] → 物理地址

// MMU功能：
// 1. 地址___①（虚拟→物理）
// 2. 内存___①保护（页表权限）
// 3. 实现交换空间（虚拟内存）`,
    blanks: [
      { hint: '转换过程', answer: '映射' },
      { hint: '访问控制', answer: '访问' }
    ],
    explanation: 'MMU(Memory Management Unit)是CPU组件，负责虚拟地址到物理地址的转换。提供内存隔离（进程不能访问其他进程内存）、权限控制（代码段只读）、虚拟内存（使用磁盘扩展内存）。简单嵌入式可能不用MMU。',
    difficulty: 4,
    vocabulary: [
      { word: 'MMU', meaning: '内存管理单元' },
      { word: 'virtual memory', meaning: '虚拟内存' }
    ]
  },
  {
    id: 171,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】DMA直接内存访问',
    description: '不经过CPU的数据传输',
    code: `// DMA传输流程：
// 1. CPU配置DMA控制器（源地址、目标地址、___①）
// 2. DMA控制器接管___①
// 3. 数据传输完成后DMA发送中断
// 4. CPU处理传输完成事件

// 适用场景：大块数据传输（磁盘、网络、外设）`,
    blanks: [
      { hint: '传输参数', answer: '长度' },
      { hint: '总线控制权', answer: '总线' }
    ],
    explanation: 'DMA(Direct Memory Access)让外设直接与内存交换数据，不经过CPU。适合大块数据传输，释放CPU做其他工作。嵌入式中SPI、I2C、ADC常用DMA。注意：DMA期间CPU不能访问该内存（缓存一致性问题）。',
    difficulty: 4,
    visualization: {
      'type': 'memory',
      'data': {
            'title': '虚拟内存映射',
            'description': '每个进程独立的地址空间',
            'memoryBlocks': [
                  {
                        'address': '进程A',
                        'value': '0x400000',
                        'label': '虚拟地址',
                        'color': 'blue'
                  },
                  {
                        'address': '页表',
                        'value': '映射',
                        'label': 'MMU查找',
                        'color': 'purple'
                  },
                  {
                        'address': '物理内存',
                        'value': '0x1234000',
                        'label': '实际地址',
                        'color': 'green'
                  }
            ],
            'note': '虚拟内存实现进程隔离和内存保护'
      }
    },
    vocabulary: [
      { word: 'DMA', meaning: '直接内存访问' }
    ]
  },
  {
    id: 172,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】大小端字节序',
    description: '多字节数据的存储顺序',
    code: `uint32_t x = 0x12345678;

// 大端(Big-Endian)：低地址存___①字节
// 内存：0x12 0x34 0x56 0x78

// 小端(Little-Endian)：低地址存___①字节  
// 内存：0x78 0x56 0x34 0x12

// x86是小端，网络协议是大端`,
    blanks: [
      { hint: '大端存储', answer: '高' },
      { hint: '小端存储', answer: '低' }
    ],
    explanation: '大端：高位字节在低地址（人类阅读顺序）。小端：低位字节在低地址（数学计算方便）。网络传输用htonl/ntohl转换。嵌入式不同架构可能不同，通信时必须统一！',
    difficulty: 3,
    vocabulary: [
      { word: 'endianness', meaning: '字节序' },
      { word: 'big-endian', meaning: '大端' },
      { word: 'little-endian', meaning: '小端' }
    ]
  },

  // ===== 更多高难度面试题 =====
  {
    id: 173,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】快速排序',
    description: '实现快速排序算法',
    code: `void quick_sort(int arr[], int left, int right) {
    if (left >= right) return;
    
    int pivot = arr[right];  // 选最后一个作为基准
    int i = left - 1;
    
    for (int j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            // 交换arr[i]和arr[j]
            int tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
        }
    }
    
    // 将基准放到正确位置
    int tmp = arr[___①];
    arr[i + 1] = arr[___①];
    arr[right] = tmp;
    
    // 递归排序左右两部分
    quick_sort(arr, left, ___①);
    quick_sort(arr, i + 2, right);
}`,
    blanks: [
      { hint: '基准元素位置', answer: 'i + 1' },
      { hint: '右边界', answer: 'right' },
      { hint: '左半部分右边界', answer: 'i' }
    ],
    explanation: '快排核心：选基准→分区（小于放左，大于放右）→递归。平均时间复杂度O(n log n)，最坏O(n²)。空间复杂度O(log n)（递归栈）。不稳定排序。',
    difficulty: 5,
    visualization: {
      'type': 'memory',
      'data': {
            'title': 'MMU地址转换',
            'description': '虚拟地址 → 物理地址',
            'memoryBlocks': [
                  {
                        'address': '虚拟地址',
                        'value': '0x400000',
                        'label': '程序看到的地址',
                        'color': 'blue'
                  },
                  {
                        'address': '页表',
                        'value': '映射关系',
                        'label': 'MMU查找',
                        'color': 'purple'
                  },
                  {
                        'address': '物理地址',
                        'value': '0x1234000',
                        'label': '实际内存地址',
                        'color': 'green'
                  }
            ],
            'note': 'MMU实现：地址翻译、权限检查、缓存管理'
      }
},
    vocabulary: [
      { word: 'quick sort', meaning: '快速排序' },
      { word: 'pivot', meaning: '基准/枢轴' },
      { word: 'partition', meaning: '分区' }
    ]
  },
  {
    id: 174,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】哈希表',
    description: '实现简单的哈希表',
    code: `typedef struct Node {
    int key;
    int value;
    struct Node *next;
} Node;

#define HASH_SIZE 16

Node *hash_table[HASH_SIZE];

int hash(int key) {
    return key & (___① - 1);  // 取模运算
}

void hash_put(int key, int value) {
    int idx = hash(key);
    Node *node = malloc(sizeof(Node));
    node->key = key;
    node->value = value;
    // 头插法
    node->next = hash_table[idx];
    hash_table[___①] = node;
}`,
    blanks: [
      { hint: '哈希表大小', answer: 'HASH_SIZE' },
      { hint: '插入位置', answer: 'idx' }
    ],
    explanation: '哈希表：通过哈希函数将key映射到数组下标。冲突用链地址法解决（链表）。& (size-1)等价于% size，要求size是2的幂。平均查找O(1)，最坏O(n)。',
    difficulty: 4,
    vocabulary: [
      { word: 'hash table', meaning: '哈希表' },
      { word: 'collision', meaning: '冲突' },
      { word: 'chaining', meaning: '链地址法' }
    ]
  },
  {
    id: 175,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】读写锁',
    description: '实现读者写者锁',
    code: `// 读者优先的读写锁
typedef struct {
    pthread_mutex_t mutex;
    pthread_cond_t cond;
    int readers;      // 当前读者数
    int writer;       // 是否有写者
} RWLock;

void rwlock_read_lock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);
    while (lock->writer) {
        pthread_cond_wait(&lock->cond, &lock->mutex);
    }
    lock->readers++;
    pthread_mutex_unlock(&lock->mutex);
}

void rwlock_read_unlock(RWLock *lock) {
    pthread_mutex_lock(&lock->mutex);
    lock->readers--;
    if (lock->readers == 0) {
        pthread_cond___①(&lock->cond);  // 唤醒写者
    }
    pthread_mutex_unlock(&lock->mutex);
}`,
    blanks: [
      { hint: '唤醒等待的线程', answer: 'broadcast' }
    ],
    explanation: '读写锁：多个读者可同时读，写者独占。读者优先可能导致写者饥饿。写者优先实现更复杂（需要等待读者全部退出）。pthread_cond_broadcast唤醒所有等待线程。',
    difficulty: 5,
    visualization: {
      'type': 'linkedlist',
      'data': {
            'title': '哈希表链地址法',
            'description': '冲突时用链表连接',
            'nodes': [
                  {
                        'value': 'key1',
                        'next': 1
                  },
                  {
                        'value': 'key2',
                        'next': null
                  },
                  {
                        'value': 'key3',
                        'next': 3
                  },
                  {
                        'value': 'key4',
                        'next': null
                  }
            ],
            'note': '哈希函数：hash(key) % size → 桶索引'
      }
},
    vocabulary: [
      { word: 'read-write lock', meaning: '读写锁' },
      { word: 'starvation', meaning: '饥饿' },
      { word: 'broadcast', meaning: '广播唤醒' }
    ]
  },
  {
    id: 176,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】无锁队列',
    description: 'CAS实现无锁环形队列',
    code: `// 无锁环形队列（单生产者单消费者）
typedef struct {
    int *buffer;
    volatile int head;
    volatile int tail;
    int size;
} LockFreeQueue;

int queue_enqueue(LockFreeQueue *q, int data) {
    int next = (q->tail + 1) % q->size;
    if (next == q->head) return -1;  // 满
    
    q->buffer[q->tail] = data;
    // 内存屏障，确保数据写入后才更新tail
    __sync_synchronize();
    q->tail = next;
    return 0;
}

// CAS实现原子操作
int cas(int *ptr, int expected, int new_val) {
    return __sync_val_compare_and_swap(___①, ___①, ___①);
}`,
    blanks: [
      { hint: '要修改的地址', answer: 'ptr' },
      { hint: '期望值', answer: 'expected' },
      { hint: '新值', answer: 'new_val' }
    ],
    explanation: 'CAS(Compare-And-Swap)：原子比较并交换。如果*ptr==expected，则*ptr=new_val并返回旧值。无锁编程基础，但ABA问题需要注意。内存屏障保证执行顺序。',
    difficulty: 5,
    visualization: {
      'type': 'flow',
      'data': {
            'title': '死锁条件',
            'description': '四个必要条件',
            'steps': [
                  {
                        'from': '互斥',
                        'to': '资源独占',
                        'action': '条件1'
                  },
                  {
                        'from': '持有等待',
                        'to': '持有资源等另一个',
                        'action': '条件2'
                  },
                  {
                        'from': '不可抢占',
                        'to': '不能强制释放',
                        'action': '条件3'
                  },
                  {
                        'from': '循环等待',
                        'to': '环路等待',
                        'action': '条件4'
                  }
            ],
            'note': '破坏任一条件即可避免死锁'
      }
},
    vocabulary: [
      { word: 'CAS', meaning: '比较并交换' },
      { word: 'lock-free', meaning: '无锁' },
      { word: 'ABA problem', meaning: 'ABA问题' }
    ]
  },
  {
    id: 177,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】死锁',
    description: '找出死锁原因并修复',
    code: `1 | pthread_mutex_t lock_a = PTHREAD_MUTEX_INITIALIZER;
2 | pthread_mutex_t lock_b = PTHREAD_MUTEX_INITIALIZER;
3 |
4 | void thread1() {
5 |     pthread_mutex_lock(&lock_a);
6 |     pthread_mutex_lock(&lock_b);  // 等待lock_b
7 |     // 操作...
8 |     pthread_mutex_unlock(&lock_b);
9 |     pthread_mutex_unlock(&lock_a);
10| }
11|
12| void thread2() {
13|     pthread_mutex_lock(&lock_b);
14|     pthread_mutex_lock(&lock_a);  // 等待lock_a
15|     // 操作...
16|     pthread_mutex_unlock(&lock_a);
17|     pthread_mutex_unlock(&lock_b);
18| }`,
    bugLine: 14,
    bugFix: '    pthread_mutex_lock(&lock_a);\n    pthread_mutex_lock(&lock_b);',
    explanation: '死锁：thread1持有a等b，thread2持有b等a。修复：统一加锁顺序（都先a后b）。死锁四条件：互斥、持有等待、不可抢占、循环等待。破坏任一条件即可避免。',
    difficulty: 4,
    vocabulary: [
      { word: 'deadlock', meaning: '死锁' },
      { word: 'lock ordering', meaning: '加锁顺序' }
    ]
  },
  {
    id: 178,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】条件变量误用',
    description: '条件变量使用错误',
    code: `1 | // 生产者
2 | void produce() {
3 |     pthread_mutex_lock(&mutex);
4 |     while (count == BUFFER_SIZE) {
5 |         pthread_cond_wait(&cond, &mutex);
6 |     }
7 |     buffer[count++] = data;
8 |     pthread_cond_signal(&cond);
9 |     pthread_mutex_unlock(&mutex);
10| }
11|
12| // 消费者
13| void consume() {
14|     pthread_mutex_lock(&mutex);
15|     if (count == 0) {  // 错误！
16|         pthread_cond_wait(&cond, &mutex);
17|     }
18|     data = buffer[--count];
19|     pthread_mutex_unlock(&mutex);
20| }`,
    bugLine: 15,
    bugFix: '    while (count == 0) {',
    explanation: '条件变量必须用while而不是if！因为可能虚假唤醒(spurious wakeup)，或者多个线程被唤醒但只有一个能获得锁。while循环确保条件真正满足才继续。',
    difficulty: 4,
    vocabulary: [
      { word: 'spurious wakeup', meaning: '虚假唤醒' },
      { word: 'condition variable', meaning: '条件变量' }
    ]
  },
  {
    id: 179,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】CPU缓存行',
    description: '缓存行对齐避免伪共享',
    code: `// 错误：两个线程修改相邻变量，导致缓存行 bouncing
struct {
    int counter1;  // 线程1修改
    int counter2;  // 线程2修改
} counters;  // 可能在同一缓存行(64字节)

// 正确：填充到缓存行大小
struct {
    int counter;
    char padding[___①];  // 填充60字节
} __attribute__((aligned(64))) aligned_counter;

// 现在每个counter独占一个缓存行，避免伪共享`,
    blanks: [
      { hint: '填充字节数', answer: '60' }
    ],
    explanation: '伪共享(false sharing)：两个变量在同一缓存行，不同CPU修改会导致缓存行在CPU间来回传递。x86缓存行通常64字节。填充使变量独占缓存行，提升多线程性能。',
    difficulty: 5,
    visualization: {
      'type': 'flow',
      'data': {
            'title': '读写锁工作模式',
            'description': '多读者可同时，写者独占',
            'steps': [
                  {
                        'from': '读者1',
                        'to': '读取',
                        'action': '获取读锁'
                  },
                  {
                        'from': '读者2',
                        'to': '读取',
                        'action': '可同时读'
                  },
                  {
                        'from': '写者',
                        'to': '等待',
                        'action': '等待读者退出'
                  },
                  {
                        'from': '写者',
                        'to': '写入',
                        'action': '独占访问'
                  }
            ],
            'note': '读者优先可能导致写者饥饿'
      }
},
    vocabulary: [
      { word: 'cache line', meaning: '缓存行' },
      { word: 'false sharing', meaning: '伪共享' },
      { word: 'padding', meaning: '填充' }
    ]
  },
  {
    id: 180,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】虚拟内存页表',
    description: '页表实现虚拟地址转换',
    code: `// 虚拟地址结构（32位系统，4KB页）
// | 页目录索引(10位) | 页表索引(10位) | 页内偏移(12位) |

// 页表项结构
struct PageTableEntry {
    uint32_t present : 1;    // 是否在物理内存
    uint32_t rw : 1;         // 读写权限
    uint32_t user : 1;       // 用户/内核页
    uint32_t pfn : 20;       // 物理页框号
};

// 地址转换：虚拟地址 → 物理地址
// 1. 用页目录索引找到页表
// 2. 用页表索引找到页表项
// 3. 物理地址 = (pfn << 12) | ___①`,
    blanks: [
      { hint: '页内偏移', answer: '页内偏移' }
    ],
    explanation: '分页机制：虚拟地址分多级索引页表，最终得到物理页框号。页内偏移直接映射。TLB缓存常用页表项加速转换。缺页时触发page fault，由内核加载数据。',
    difficulty: 5,
    vocabulary: [
      { word: 'page table', meaning: '页表' },
      { word: 'TLB', meaning: '转译后备缓冲器' },
      { word: 'page fault', meaning: '缺页异常' }
    ]
  },
  {
    id: 181,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】LRU缓存',
    description: '实现LRU(最近最少使用)缓存',
    code: `// LRU缓存：哈希表 + 双向链表
// 访问O(1)，淘汰O(1)

typedef struct Node {
    int key;
    int value;
    struct Node *prev;
    struct Node *next;
} Node;

typedef struct {
    int capacity;
    int size;
    Node *head;  // 哑头节点
    Node *tail;  // 哑尾节点
    // 哈希表省略...
} LRUCache;

// 移动到头部（最近使用）
void move_to_head(LRUCache *cache, Node *node) {
    // 先删除
    node->prev->next = node->next;
    node->next->prev = node->prev;
    
    // 插入头部
    node->next = cache->head->next;
    node->prev = cache->head;
    cache->head->next->prev = node;
    cache->head->next = ___①;
}`,
    blanks: [
      { hint: '当前节点', answer: 'node' }
    ],
    explanation: 'LRU核心：哈希表O(1)查找，双向链表O(1)移动。最近使用的放头部，淘汰时删尾部。常用于页面置换、数据库缓存、Redis等。',
    difficulty: 4,
    vocabulary: [
      { word: 'LRU', meaning: '最近最少使用' },
      { word: 'cache eviction', meaning: '缓存淘汰' }
    ]
  },
  {
    id: 182,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】定时器实现',
    description: '基于最小堆的高精度定时器',
    code: `// 最小堆定时器：O(log n)插入，O(1)获取最近到期
typedef struct {
    uint64_t expire;   // 到期时间戳
    void (*callback)(void *);
    void *arg;
} Timer;

typedef struct {
    Timer **heap;      // 定时器数组
    int size;
    int capacity;
} TimerManager;

// 插入定时器
void timer_add(TimerManager *tm, Timer *timer) {
    // 扩容检查...
    
    // 插入堆尾
    int i = tm->size++;
    tm->heap[i] = timer;
    
    // 上浮：与父节点比较，保持最小堆性质
    while (i > 0 && tm->heap[i]->expire < tm->heap[___①]->expire) {
        // 交换
        Timer *tmp = tm->heap[i];
        tm->heap[i] = tm->heap[(i-1)/2];
        tm->heap[(i-1)/2] = tmp;
        i = (i-1)/2;
    }
}`,
    blanks: [
      { hint: '父节点索引', answer: '(i-1)/2' }
    ],
    explanation: '最小堆：父节点<=子节点。最近到期的定时器在堆顶。插入上浮O(log n)，删除堆顶后下沉O(log n)。比链表O(n)更高效，适合大量定时器场景。',
    difficulty: 4,
    vocabulary: [
      { word: 'min-heap', meaning: '最小堆' },
      { word: 'percolate up', meaning: '上浮' }
    ]
  },
  {
    id: 183,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】RCU机制',
    description: '读-复制-更新机制',
    code: `// RCU：读操作无锁，写操作复制更新
// 适用：读多写少场景

struct Data {
    int value;
};

struct Data *g_ptr = NULL;

// 读操作（无锁）
int read_data() {
    struct Data *ptr = g_ptr;
    if (ptr) {
        return ptr->value;  // 直接读，无需加锁
    }
    return 0;
}

// 写操作
void write_data(int new_val) {
    struct Data *new_ptr = malloc(sizeof(struct Data));
    new_ptr->value = new_val;
    
    // 原子更新指针
    struct Data *old_ptr = __sync_lock_test_and_set(&g_ptr, new_ptr);
    
    // 等待所有读者退出（宽限期）
    synchronize_rcu();
    
    // 安全释放旧数据
    ___①(old_ptr);
}`,
    blanks: [
      { hint: '释放内存', answer: 'free' }
    ],
    explanation: 'RCU核心：读无锁，写时复制，延迟释放。宽限期(quiescent state)确保所有读者完成。Linux内核大量使用RCU优化读多写少场景（如路由表）。',
    difficulty: 5,
    vocabulary: [
      { word: 'RCU', meaning: '读-复制-更新' },
      { word: 'quiescent state', meaning: '静默状态/宽限期' }
    ]
  },
  {
    id: 184,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】位图实现',
    description: '紧凑存储布尔数组',
    code: `// 位图：1字节存8个标志位
#define BITMAP_SIZE 1024  // 可存1024个标志

uint8_t bitmap[BITMAP_SIZE / 8];

// 设置第n位为1
void bitmap_set(int n) {
    bitmap[n / 8] |= (1 << (___①));
}

// 清除第n位
void bitmap_clear(int n) {
    bitmap[n / 8] &= ~(1 << (n % 8));
}

// 测试第n位
int bitmap_test(int n) {
    return bitmap[n / 8] & (1 << (n % 8));
}`,
    blanks: [
      { hint: '位偏移', answer: 'n % 8' }
    ],
    explanation: '位图：用1位表示一个标志，节省8倍空间。n/8定位字节，n%8定位位。常用于内存管理（页分配）、布隆过滤器、大规模去重等。',
    difficulty: 3,
    vocabulary: [
      { word: 'bitmap', meaning: '位图' },
      { word: 'bloom filter', meaning: '布隆过滤器' }
    ]
  },
  {
    id: 185,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】协程实现',
    description: '用户态轻量级线程',
    code: `// 协程：用户态调度，切换无需内核介入
typedef struct {
    void *stack;       // 协程栈
    void *context;     // 寄存器上下文
    enum { RUNNING, SUSPENDED, DONE } state;
} Coroutine;

// 协程切换（简化版）
void coroutine_switch(Coroutine *from, Coroutine *to) {
    // 保存当前寄存器到from->context
    // 恢复to->context到寄存器
    
    // x86_64汇编示例
    __asm__ volatile(
        "movq %%rsp, %0\n"  // 保存栈指针
        "movq %1, %%rsp\n"  // 恢复栈指针
        : "=m"(from->context)
        : "m"(to->context)
    );
}

// yield：让出CPU
void yield() {
    Coroutine *next = scheduler_get_next();
    coroutine_switch(___①, next);
}`,
    blanks: [
      { hint: '当前协程', answer: 'current' }
    ],
    explanation: '协程：用户态线程，切换只保存/恢复寄存器，开销<1μs（线程切换~1ms）。适合高并发IO密集型场景（如网络服务器）。Go goroutine、Python asyncio基于协程。',
    difficulty: 5,
    vocabulary: [
      { word: 'coroutine', meaning: '协程' },
      { word: 'context switch', meaning: '上下文切换' }
    ]
  },
  {
    id: 186,
    chapter: 'interview',
    type: 'debug',
    title: '【Bug修复】原子操作误用',
    description: '非原子操作导致的数据竞争',
    code: `1 | // 全局计数器
2 | int counter = 0;
3 |
4 | // 线程函数
5 | void* thread_func(void* arg) {
6 |     for (int i = 0; i < 100000; i++) {
7 |         counter++;  // 非原子！
8 |     }
9 |     return NULL;
10| }
11|
12| // 创建两个线程执行thread_func
13| // 预期结果：200000
14| // 实际结果：小于200000`,
    bugLine: 7,
    bugFix: '        __sync_fetch_and_add(&counter, 1);  // 原子加',
    explanation: 'counter++不是原子操作（读-改-写），多线程并发会丢失更新。GCC内置__sync_fetch_and_add实现原子加。C11可用atomic_fetch_add。x86 LOCK前缀保证原子性。',
    difficulty: 4,
    vocabulary: [
      { word: 'atomic operation', meaning: '原子操作' },
      { word: 'data race', meaning: '数据竞争' }
    ]
  },
  {
    id: 187,
    chapter: 'interview',
    type: 'fill',
    title: '【性能优化】尾递归优化',
    description: '编译器优化递归调用',
    code: `// 普通递归：O(n)栈深度
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);  // 还需要乘法，不是尾递归
}

// 尾递归：O(1)栈空间
int factorial_tail(int n, int acc) {
    if (n <= 1) return acc;
    return factorial_tail(n - 1, n * acc);  // 最后操作是递归调用
}

// 编译器优化后等价于循环
// gcc -O2 会自动优化尾递归

// 尾递归条件：递归调用是函数的___①操作`,
    blanks: [
      { hint: '最后', answer: '最后' }
    ],
    explanation: '尾递归：递归调用是最后操作，编译器可复用栈帧。普通递归n层栈深度，尾递归只需1层。函数式语言（Lisp、Erlang）依赖尾递归优化避免栈溢出。',
    difficulty: 4,
    vocabulary: [
      { word: 'tail recursion', meaning: '尾递归' },
      { word: 'tail call optimization', meaning: '尾调用优化' }
    ]
  },
  {
    id: 188,
    chapter: 'interview',
    type: 'fill',
    title: '【概念题】指令流水线',
    description: 'CPU流水线与冒险',
    code: `// 指令流水线阶段：取指→译码→执行→访存→写回
// 理想情况下每周期完成一条指令

// 数据冒险：后一条指令依赖前一条结果
ADD R1, R2, R3   // R1 = R2 + R3
SUB R4, R1, R5   // 需要R1，但ADD还没写回！

// 解决方法：
// 1. 插入气泡（停顿）
// 2. 数据前递（Forwarding）
// 3. ___①调度：编译器调整指令顺序`,
    blanks: [
      { hint: '指令', answer: '指令' }
    ],
    explanation: '流水线冒险：数据依赖导致停顿。Forwarding将ALU结果直接传给下一条指令，无需等待写回。编译器指令调度填充延迟槽。分支预测失败会清空流水线（代价10+周期）。',
    difficulty: 5,
    vocabulary: [
      { word: 'pipeline hazard', meaning: '流水线冒险' },
      { word: 'forwarding', meaning: '数据前递' },
      { word: 'branch prediction', meaning: '分支预测' }
    ]
  },
  {
    id: 189,
    chapter: 'interview',
    type: 'fill',
    title: '【手写代码】红黑树旋转',
    description: '自平衡二叉搜索树',
    code: `// 红黑树：保证最长路径不超过最短路径2倍
// 性质：根黑、叶黑、红节点的子必黑、黑高相同

// 左旋：右子节点上升为父节点
void rotate_left(Node **root, Node *x) {
    Node *y = x->right;
    x->right = y->left;
    if (y->left) y->left->parent = x;
    y->parent = x->parent;
    
    if (x->parent == NULL) *root = y;
    else if (x == x->parent->left) x->parent->left = y;
    else x->parent->right = y;
    
    y->left = ___①;
    x->parent = y;
}`,
    blanks: [
      { hint: '原父节点', answer: 'x' }
    ],
    explanation: '红黑树：插入删除后通过旋转和变色保持平衡。左旋/右旋调整树结构。查找/插入/删除都是O(log n)。Linux内核CFS调度器、C++ map/set用红黑树实现。',
    difficulty: 5,
    vocabulary: [
      { word: 'red-black tree', meaning: '红黑树' },
      { word: 'rotation', meaning: '旋转' },
      { word: 'self-balancing', meaning: '自平衡' }
    ]
  },
  {
    id: 190,
    chapter: 'interview',
    type: 'fill',
    title: '【系统设计】Netfilter钩子',
    description: 'Linux网络数据包过滤',
    code: `// Netfilter：Linux内核网络框架
// 5个钩子点：
// NF_IP_PRE_ROUTING   → 路由前
// NF_IP_LOCAL_IN      → 发往本机
// NF_IP_FORWARD       → 转发
// NF_IP_LOCAL_OUT     → 本机发出
// NF_IP_POST_ROUTING  → 路由后

// 钩子函数返回值
#define NF_ACCEPT   1   // 允许通过
#define NF_DROP     0   // 丢弃
#define NF_STOLEN   2   // 已处理，协议栈忽略
#define NF_QUEUE    3   // 排队到用户态
#define NF_REPEAT   4   // 重新处理

// iptables就是基于Netfilter实现
// 数据包匹配规则 → 执行___①动作`,
    blanks: [
      { hint: '目标', answer: '目标' }
    ],
    explanation: 'Netfilter：内核网络包处理框架。钩子函数可修改、过滤、重定向数据包。iptables是用户态配置工具，实现防火墙、NAT、流量控制。钩子函数在内核态执行，效率极高。',
    difficulty: 4,
    vocabulary: [
      { word: 'Netfilter', meaning: 'Linux网络过滤框架' },
      { word: 'hook', meaning: '钩子' },
      { word: 'iptables', meaning: '防火墙配置工具' }
    ]
  },

  // ===== Linux系统编程 =====
  {
    id: 191,
    chapter: 'linux',
    type: 'fill',
    title: '文件打开模式',
    description: '使用正确的标志打开文件',
    code: `int fd = open("data.txt", ___①);
if (fd < 0) {
    perror("open");
    return -1;
}`,
    blanks: [
      { hint: '只读模式标志', answer: 'O_RDONLY' }
    ],
    explanation: 'open()系统调用用于打开文件。常用标志：O_RDONLY(只读)、O_WRONLY(只写)、O_RDWR(读写)、O_CREAT(创建)、O_APPEND(追加)。返回文件描述符(fd)，失败返回-1。',
    difficulty: 2,
    vocabulary: [
      { word: 'open', meaning: '打开文件' },
      { word: 'O_RDONLY', meaning: '只读模式' },
      { word: 'file descriptor', meaning: '文件描述符' }
    ]
  },
  {
    id: 192,
    chapter: 'linux',
    type: 'output',
    title: 'fork返回值',
    description: '理解fork的返回值',
    code: `pid_t pid = fork();
if (pid == 0) {
    printf("Child\\n");
} else if (pid > 0) {
    printf("Parent\\n");
} else {
    printf("Error\\n");
}`,
    correctOutput: 'Parent\nChild\n',
    explanation: 'fork()创建子进程。在父进程中返回子进程PID(>0)，在子进程中返回0，失败返回-1。注意：父子进程执行顺序由调度器决定，实际输出可能是Parent\\nChild\\n或Child\\nParent\\n，但大多数系统父进程先运行。',
    difficulty: 3
  },
  {
    id: 193,
    chapter: 'linux',
    type: 'fill',
    title: '等待子进程',
    description: '父进程等待子进程结束',
    code: `pid_t pid = fork();
if (pid > 0) {
    int status;
    ___①(pid, &status, 0);
    printf("Child exited with %d\\n", WEXITSTATUS(status));
}`,
    blanks: [
      { hint: '等待子进程', answer: 'waitpid' }
    ],
    explanation: 'waitpid()等待指定子进程结束。参数：pid(子进程ID)、status(退出状态指针)、options(选项)。WEXITSTATUS宏提取子进程退出码。避免僵尸进程。',
    difficulty: 3,
    vocabulary: [
      { word: 'waitpid', meaning: '等待子进程' },
      { word: 'zombie process', meaning: '僵尸进程' },
      { word: 'WEXITSTATUS', meaning: '获取退出状态' }
    ]
  },
  {
    id: 194,
    chapter: 'linux',
    type: 'debug',
    title: '管道使用错误',
    description: '找出管道通信的问题',
    code: `1 | int pipefd[2];
2 | pipe(pipefd);
3 | write(pipefd[0], "hello", 5);
4 | char buf[10];
5 | read(pipefd[1], buf, 5);`,
    bugLine: 3,
    bugFix: 'write(pipefd[1], "hello", 5);',
    explanation: '管道pipefd[0]是读端，pipefd[1]是写端。第3行错误地向读端写入，第5行错误地从写端读取。应该向pipefd[1]写入，从pipefd[0]读取。',
    difficulty: 3
  },
  {
    id: 195,
    chapter: 'linux',
    type: 'fill',
    title: '创建线程',
    description: '使用pthread创建线程',
    code: `pthread_t tid;
int arg = 42;
___①(&tid, NULL, thread_func, &arg);`,
    blanks: [
      { hint: '创建线程函数', answer: 'pthread_create' }
    ],
    explanation: 'pthread_create()创建新线程。参数：线程ID指针、属性( NULL为默认)、线程函数、传递给函数的参数。线程函数签名：void* func(void* arg)。需要链接-lpthread。',
    difficulty: 3,
    vocabulary: [
      { word: 'pthread_create', meaning: '创建线程' },
      { word: 'pthread_t', meaning: '线程ID类型' },
      { word: 'thread function', meaning: '线程函数' }
    ]
  },
  {
    id: 196,
    chapter: 'linux',
    type: 'fill',
    title: '互斥锁保护',
    description: '使用mutex保护临界区',
    code: `pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void* thread_func(void* arg) {
    ___①(&mutex);   // 加锁
    // 临界区：访问共享资源
    counter++;
    ___②(&mutex);   // 解锁
    return NULL;
}`,
    blanks: [
      { hint: '加锁', answer: 'pthread_mutex_lock' },
      { hint: '解锁', answer: 'pthread_mutex_unlock' }
    ],
    explanation: 'pthread_mutex_lock()获取锁，pthread_mutex_unlock()释放锁。mutex保证同一时间只有一个线程进入临界区，避免数据竞争。锁的粒度要尽量小，只保护必要的代码。',
    difficulty: 3,
    vocabulary: [
      { word: 'mutex', meaning: '互斥锁' },
      { word: 'critical section', meaning: '临界区' },
      { word: 'data race', meaning: '数据竞争' }
    ]
  },
  {
    id: 197,
    chapter: 'linux',
    type: 'output',
    title: '信号处理',
    description: '理解信号处理机制',
    code: `signal(SIGINT, SIG_IGN);
printf("Running...\\n");
sleep(10);`,
    correctOutput: 'Running...\n',
    explanation: 'SIG_IGN表示忽略信号。程序忽略SIGINT(Ctrl+C)信号，所以按Ctrl+C不会终止程序。sleep(10)让程序暂停10秒。常用信号：SIGINT(2)、SIGTERM(15)、SIGKILL(9不可捕获)。',
    difficulty: 3
  },
  {
    id: 198,
    chapter: 'linux',
    type: 'fill',
    title: '创建Socket',
    description: '创建TCP套接字',
    code: `int sock = ___①(AF_INET, SOCK_STREAM, 0);
if (sock < 0) {
    perror("socket");
    return -1;
}`,
    blanks: [
      { hint: '创建套接字', answer: 'socket' }
    ],
    explanation: 'socket()创建套接字。参数：domain(协议族，AF_INET为IPv4)、type(类型，SOCK_STREAM为TCP)、protocol(协议，0为自动选择)。返回套接字描述符，失败返回-1。',
    difficulty: 3,
    vocabulary: [
      { word: 'socket', meaning: '套接字' },
      { word: 'AF_INET', meaning: 'IPv4地址族' },
      { word: 'SOCK_STREAM', meaning: 'TCP流式套接字' }
    ]
  },
  {
    id: 199,
    chapter: 'linux',
    type: 'fill',
    title: '内存映射',
    description: '使用mmap映射文件到内存',
    code: `int fd = open("file.txt", O_RDONLY);
void* ptr = ___①(NULL, 4096, PROT_READ, MAP_PRIVATE, fd, 0);
// 现在可以通过ptr访问文件内容
close(fd);`,
    blanks: [
      { hint: '内存映射', answer: 'mmap' }
    ],
    explanation: 'mmap()将文件映射到内存。参数：addr(建议地址，NULL让内核选择)、length(长度)、prot(保护模式)、flags(标志)、fd(文件描述符)、offset(偏移)。访问ptr就像访问文件内容，效率高于read/write。',
    difficulty: 4,
    vocabulary: [
      { word: 'mmap', meaning: '内存映射' },
      { word: 'PROT_READ', meaning: '可读' },
      { word: 'MAP_PRIVATE', meaning: '私有映射' }
    ]
  },
  {
    id: 200,
    chapter: 'linux',
    type: 'output',
    title: 'exec替换进程',
    description: 'exec系列函数替换当前进程',
    code: `printf("Before exec\\n");
execlp("echo", "echo", "Hello", NULL);
printf("After exec\\n");`,
    correctOutput: 'Before exec\nHello\n',
    explanation: 'execlp()用新程序替换当前进程映像。成功后不会返回，后面的代码不会执行。所以"After exec"不会输出。常用于子进程中执行新程序（fork+exec模式）。',
    difficulty: 4
  },
  {
    id: 201,
    chapter: 'linux',
    type: 'order',
    title: '组装完整的服务器程序',
    description: '按正确顺序排列代码，实现一个基本的TCP服务器',
    codeLines: [
      '    listen(sock, 5);',
      'int sock = socket(AF_INET, SOCK_STREAM, 0);',
      '    close(client);',
      '    int client = accept(sock, NULL, NULL);',
      '#include <sys/socket.h>',
      '    bind(sock, (struct sockaddr*)&addr, sizeof(addr));'
    ],
    correctOrder: [4, 1, 5, 0, 3, 2],
    correctOutput: '服务器启动',
    explanation: 'TCP服务器创建流程：①包含头文件 → ②创建socket → ③绑定地址 → ④监听连接 → ⑤接受客户端 → ⑥关闭连接。bind需要在listen之前，accept在listen之后。',
    difficulty: 4,
    vocabulary: [
      { word: 'socket', meaning: '创建套接字' },
      { word: 'bind', meaning: '绑定地址' },
      { word: 'listen', meaning: '监听连接' },
      { word: 'accept', meaning: '接受连接' }
    ]
  },
  {
    id: 202,
    chapter: 'linux',
    type: 'fill',
    title: '绑定服务器地址',
    description: '设置服务器监听端口',
    code: `struct sockaddr_in addr = {
    .sin_family = AF_INET,
    .sin_port = ___①(8080),
    .sin_addr.s_addr = INADDR_ANY
};`,
    blanks: [
      { hint: '主机字节序转网络字节序', answer: 'htons' }
    ],
    explanation: 'htons()将主机字节序(小端)转换为网络字节序(大端)。端口号需要用网络字节序。INADDR_ANY(0.0.0.0)表示监听所有网络接口。',
    difficulty: 3,
    vocabulary: [
      { word: 'htons', meaning: 'Host TO Network Short - 主机到网络字节序' },
      { word: 'INADDR_ANY', meaning: '监听所有地址' },
      { word: 'big-endian', meaning: '大端字节序' }
    ]
  },
  {
    id: 203,
    chapter: 'linux',
    type: 'debug',
    title: '僵尸进程问题',
    description: '找出导致僵尸进程的原因',
    code: `1 | pid_t pid = fork();
2 | if (pid > 0) {
3 |     printf("Parent\\n");
4 |     sleep(10);
5 | } else {
6 |     printf("Child\\n");
7 | }`,
    bugLine: 2,
    bugFix: 'if (pid > 0) {\n    wait(NULL);  // 等待子进程\n    printf("Parent\\n");',
    explanation: '父进程没有调用wait/waitpid等待子进程，子进程结束后会变成僵尸进程(defunct)。应该在父进程中调用wait(NULL)或waitpid来回收子进程资源。',
    difficulty: 3
  },
  {
    id: 204,
    chapter: 'linux',
    type: 'output',
    title: '线程共享内存',
    description: '理解线程共享进程地址空间',
    code: `int counter = 0;

void* thread_func(void* arg) {
    for (int i = 0; i < 1000; i++) {
        counter++;
    }
    return NULL;
}

int main() {
    pthread_t t1, t2;
    pthread_create(&t1, NULL, thread_func, NULL);
    pthread_create(&t2, NULL, thread_func, NULL);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);
    printf("%d", counter);
}`,
    correctOutput: '不确定',
    explanation: 'counter是全局变量，两个线程同时访问并修改它，没有同步机制（mutex）。这会导致数据竞争，最终结果不确定（可能小于2000）。需要使用pthread_mutex_lock保护counter++。',
    difficulty: 4
  },
  {
    id: 205,
    chapter: 'linux',
    type: 'fill',
    title: '获取文件状态',
    description: '使用stat获取文件信息',
    code: `struct stat st;
if (___①("file.txt", &st) == 0) {
    printf("Size: %ld bytes\\n", st.st_size);
    printf("Permissions: %o\\n", st.st_mode & 0777);
}`,
    blanks: [
      { hint: '获取文件状态', answer: 'stat' }
    ],
    explanation: 'stat()获取文件元数据。返回0表示成功，-1表示失败。st_size是文件大小，st_mode包含权限和文件类型。也可以用fstat(通过fd)或lstat(不跟随符号链接)。',
    difficulty: 3,
    vocabulary: [
      { word: 'stat', meaning: '获取文件状态' },
      { word: 'st_size', meaning: '文件大小' },
      { word: 'st_mode', meaning: '文件模式和权限' }
    ]
  },
  {
    id: 206,
    chapter: 'linux',
    type: 'fill',
    title: '设置文件权限',
    description: '使用chmod修改文件权限',
    code: `// 设置文件为所有者可读写，组和其他人只读
___①("file.txt", S_IRUSR | S_IWUSR | S_IRGRP | S_IROTH);`,
    blanks: [
      { hint: '修改文件权限', answer: 'chmod' }
    ],
    explanation: 'chmod()修改文件权限。权限标志：S_IRUSR(用户读)、S_IWUSR(用户写)、S_IXUSR(用户执行)，S_IRGRP(组读)等。也可以用八进制0644表示rw-r--r--。',
    difficulty: 3,
    vocabulary: [
      { word: 'chmod', meaning: '修改文件权限' },
      { word: 'S_IRUSR', meaning: '用户读权限' },
      { word: 'S_IWUSR', meaning: '用户写权限' }
    ]
  },
  {
    id: 207,
    chapter: 'linux',
    type: 'output',
    title: 'dup2重定向',
    description: '理解文件描述符重定向',
    code: `int fd = open("output.txt", O_WRONLY | O_CREAT, 0644);
dup2(fd, STDOUT_FILENO);
printf("Hello World\\n");
close(fd);`,
    correctOutput: '(文件output.txt内容为: Hello World)',
    explanation: 'dup2(fd, STDOUT_FILENO)将标准输出(1)重定向到fd。之后printf输出到output.txt而不是屏幕。常用于实现shell的重定向功能(>)。',
    difficulty: 4
  },
  {
    id: 208,
    chapter: 'linux',
    type: 'fill',
    title: '设置定时器',
    description: '使用alarm设置信号定时器',
    code: `signal(SIGALRM, timeout_handler);
___①(5);  // 5秒后发送SIGALRM信号`,
    blanks: [
      { hint: '设置定时器(秒)', answer: 'alarm' }
    ],
    explanation: 'alarm(seconds)设置定时器，指定秒数后向进程发送SIGALRM信号。用于实现超时控制。返回之前定时器的剩余时间，0表示没有设置定时器。',
    difficulty: 3,
    vocabulary: [
      { word: 'alarm', meaning: '设置定时器' },
      { word: 'SIGALRM', meaning: '定时器信号' },
      { word: 'timeout', meaning: '超时' }
    ]
  },
  {
    id: 209,
    chapter: 'linux',
    type: 'order',
    title: '组装fork+exec程序',
    description: '按正确顺序排列代码，实现子进程执行ls命令',
    codeLines: [
      '    execlp("ls", "ls", "-l", NULL);',
      'pid_t pid = fork();',
      '    waitpid(pid, NULL, 0);',
      'if (pid == 0) {',
      '} else {',
      '#include <unistd.h>'
    ],
    correctOrder: [5, 1, 3, 0, 4, 2],
    correctOutput: '子进程执行ls -l',
    explanation: 'fork+exec模式：①包含头文件 → ②fork创建子进程 → ③子进程中执行exec → ④父进程中等待子进程。exec成功后不会返回，所以waitpid在父进程中执行。',
    difficulty: 3,
    vocabulary: [
      { word: 'fork', meaning: '创建子进程' },
      { word: 'execlp', meaning: '执行程序' },
      { word: 'waitpid', meaning: '等待子进程' }
    ]
  },
  {
    id: 210,
    chapter: 'linux',
    type: 'debug',
    title: '线程参数传递错误',
    description: '找出线程参数传递的问题',
    code: `1 | void* thread_func(void* arg) {
2 |     int num = *(int*)arg;
3 |     printf("%d\\n", num);
4 |     return NULL;
5 | }
6 | 
7 | int main() {
8 |     for (int i = 0; i < 3; i++) {
9 |         pthread_create(&tid, NULL, thread_func, &i);
10|     }
11| }`,
    bugLine: 9,
    bugFix: 'int* arg = malloc(sizeof(int));\n*arg = i;\npthread_create(&tid, NULL, thread_func, arg);',
    explanation: '传递&i给线程，但i在循环中变化，线程可能读到错误的值。而且i在栈上，线程访问时可能已经被销毁。应该为每个线程动态分配内存存储参数。',
    difficulty: 4
  },

  // ===== 深度Linux题目：理解原理而非记忆API =====
  {
    id: 211,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】fork的Copy-on-Write机制',
    description: '理解fork为什么比想象中快',
    code: `// fork()后父子进程共享同一物理内存
// 直到某一方尝试___①，才会复制实际页面
// 
// 这就是Copy-on-Write(COW)机制：
// 1. fork时只复制页表，标记为只读
// 2. 写入时触发缺页中断
// 3. 内核复制该页，重新映射，恢复写权限

int main() {
    int data = 100;
    pid_t pid = fork();
    if (pid == 0) {
        data = 200;  // 触发COW，子进程获得独立副本
    }
    wait(NULL);
}`,
    blanks: [
      { hint: '什么操作会触发复制', answer: ['写入', '修改', '写操作'] }
    ],
    explanation: 'fork使用Copy-on-Write(COW)机制：fork时不复制整个地址空间，只复制页表并标记为只读。当任一进程尝试写入时，触发缺页中断，内核才复制该页。这大大提升了fork的效率，尤其在exec之前。',
    difficulty: 4,
    vocabulary: [
      { word: 'Copy-on-Write', meaning: '写时复制' },
      { word: 'page table', meaning: '页表' },
      { word: 'page fault', meaning: '缺页中断' }
    ]
  },
  {
    id: 212,
    chapter: 'linux',
    type: 'output',
    title: '【深度】系统调用开销分析',
    description: '理解用户态/内核态切换的成本',
    code: `// 系统调用开销主要来自：
// 1. 用户态→内核态上下文切换（保存/恢复寄存器）
// 2. 特权级切换（CPU模式切换）
// 3. 内核参数验证
// 4. TLB刷新（某些架构）

// 以下代码执行1000次write(1, "x", 1)
// 每次都要陷入内核，开销约___①纳秒

for (int i = 0; i < 1000; i++) {
    write(STDOUT_FILENO, "x", 1);  // 系统调用
}`,
    correctOutput: '1000次系统调用开销约100-200微秒',
    explanation: '系统调用开销约100-200ns（现代CPU）。虽然单次很快，但频繁syscall累积开销显著。优化方法：批量操作（如writev代替多次write）、使用缓冲（fwrite）、内存映射（mmap）。getpid()等简单syscall可能被vdso优化，无需陷入内核。',
    difficulty: 4,
    vocabulary: [
      { word: 'context switch', meaning: '上下文切换' },
      { word: 'privilege level', meaning: '特权级' },
      { word: 'vdso', meaning: '虚拟动态共享对象（用户态系统调用）' }
    ]
  },
  {
    id: 213,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】MESI缓存一致性协议',
    description: '理解多核CPU如何保证缓存一致',
    code: `// MESI协议：每个缓存行有4种状态
// M(Modified): 已修改，独占，与内存不同
// E(Exclusive): 独占，与内存一致
// S(Shared): 共享，多核都有，与内存一致
// I(Invalid): 无效，需要重新加载

// CPU0读取变量x：状态变为E
// CPU1也读取x：两者都变为___①
// CPU0修改x：CPU1的缓存行变为___②

volatile int x = 0;  // 两个CPU核心都缓存了x`,
    blanks: [
      { hint: '多核都有，一致', answer: 'S' },
      { hint: '失效状态', answer: 'I' }
    ],
    explanation: 'MESI协议保证多核缓存一致性：S(Shared)表示多核共享且一致；当一核修改时，其他核的缓存行标记为I(Invalid)，下次访问需重新从内存或修改者缓存加载。这是"缓存一致性"的硬件实现，程序员无需干预，但要警惕"伪共享"。',
    difficulty: 5,
    vocabulary: [
      { word: 'MESI', meaning: '缓存一致性协议' },
      { word: 'cache line', meaning: '缓存行' },
      { word: 'cache coherence', meaning: '缓存一致性' }
    ]
  },
  {
    id: 214,
    chapter: 'linux',
    type: 'debug',
    title: '【深度】伪共享(False Sharing)',
    description: '找出性能杀手',
    code: `1 | // 两个线程修改不同变量，但性能极差！
2 | struct {
3 |     int counter1;  // 线程1修改
4 |     int counter2;  // 线程2修改
5 | } data;  // 两个变量在同一缓存行(64字节)
6 |
7 | // 线程1: 频繁修改data.counter1
8 | // 线程2: 频繁修改data.counter2
9 | // 结果：缓存行在CPU间来回"乒乓"`,
    bugLine: 2,
    bugFix: 'struct __attribute__((aligned(64))) {\n    int counter1;\n    char pad[60];  // 填充\n};\nstruct __attribute__((aligned(64))) {\n    int counter2;\n    char pad[60];\n};',
    explanation: '伪共享：两个独立变量在同一缓存行(64字节)，不同CPU修改会导致缓存行来回传递(MESI协议)。虽然逻辑上无竞争，但性能极差。解决：用__attribute__((aligned(64)))或填充让每个变量独占缓存行。',
    difficulty: 5,
    vocabulary: [
      { word: 'false sharing', meaning: '伪共享' },
      { word: 'cache line bouncing', meaning: '缓存行乒乓' },
      { word: 'padding', meaning: '填充' }
    ]
  },
  {
    id: 215,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】epoll vs select原理对比',
    description: '为什么epoll能处理百万连接',
    code: `// select/poll的问题：
// 1. 每次调用都要拷贝fd_set到内核
// 2. 返回后要遍历所有fd检查状态
// 3. 时间复杂度O(n)

// epoll的改进：
// 1. epoll_ctl注册一次，后续epoll_wait无需拷贝
// 2. 使用___①数据结构存储fd
// 3. 回调机制：fd就绪时主动通知
// 4. epoll_wait只返回就绪的fd
// 5. 时间复杂度O(___②)

int epfd = epoll_create1(0);
struct epoll_event ev = {EPOLLIN, {&fd}};
epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &ev);`,
    blanks: [
      { hint: '存储fd的数据结构', answer: '红黑树' },
      { hint: 'epoll_wait复杂度', answer: '1' }
    ],
    explanation: 'epoll使用红黑树存储fd，支持O(log n)增删。fd就绪时通过回调机制加入就绪链表，epoll_wait直接返回就绪fd，O(1)复杂度。select/poll每次都要遍历所有fd，O(n)复杂度。这就是为什么epoll能轻松处理百万连接，而select只能处理几千。',
    difficulty: 4,
    vocabulary: [
      { word: 'epoll', meaning: 'Linux高效IO多路复用' },
      { word: 'red-black tree', meaning: '红黑树' },
      { word: 'callback', meaning: '回调机制' }
    ]
  },
  {
    id: 216,
    chapter: 'linux',
    type: 'output',
    title: '【深度】零拷贝技术：sendfile',
    description: '理解为什么sendfile比read+write快',
    code: `// 传统文件传输：4次拷贝，4次上下文切换
// read(): 磁盘→内核页缓存→用户缓冲区
// write(): 用户缓冲区→socket缓冲区→网卡

// sendfile()：2次拷贝，2次上下文切换
// 磁盘→内核页缓存→socket缓冲区→网卡
// 数据根本不经过___①空间！

// splice()更彻底：0拷贝（DMA直接传递）

sendfile(out_fd, in_fd, NULL, len);`,
    correctOutput: '零拷贝：数据不经过用户空间',
    explanation: '传统read+write需要4次数据拷贝和4次上下文切换。sendfile让内核直接将页缓存数据发送到socket，只有2次拷贝和2次切换，数据不经过用户空间。splice配合管道可实现真正的0拷贝（DMA直接传递）。Nginx、Kafka大量使用零拷贝提升性能。',
    difficulty: 4,
    vocabulary: [
      { word: 'zero-copy', meaning: '零拷贝' },
      { word: 'sendfile', meaning: '内核直接传输文件' },
      { word: 'DMA', meaning: '直接内存访问' }
    ]
  },
  {
    id: 217,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】互斥锁的futex实现',
    description: '理解pthread_mutex_lock为什么高效',
    code: `// futex(Fast Userspace muTEX)：
// 1. 用户态：先尝试CAS原子操作
// 2. 若成功，直接返回（无系统调用！）
// 3. 若失败（锁被占用），才调用futex系统调用进入内核等待
// 4. 解锁时，用futex唤醒等待线程

// 这就是"快速路径"和"慢速路径"分离：
// - 无竞争时：纯用户态，___①开销
// - 有竞争时：陷入内核，线程休眠

pthread_mutex_lock(&mutex);  // 大部分情况无系统调用`,
    blanks: [
      { hint: '无竞争时的开销级别', answer: '纳秒级' }
    ],
    explanation: 'futex实现高效锁：无竞争时纯用户态CAS操作，约10-20ns；有竞争时才陷入内核(约100ns+)让线程休眠。这比早期纯内核实现的锁快10倍以上。pthread_mutex_lock、C++ std::mutex底层都使用futex。',
    difficulty: 4,
    vocabulary: [
      { word: 'futex', meaning: '快速用户态互斥' },
      { word: 'CAS', meaning: '比较并交换（原子操作）' },
      { word: 'fast path', meaning: '快速路径' }
    ]
  },
  {
    id: 218,
    chapter: 'linux',
    type: 'debug',
    title: '【深度】信号处理的异步安全性',
    description: '信号处理函数中不能做什么',
    code: `1 | volatile int flag = 0;
2 |
3 | void handler(int sig) {
4 |     printf("Signal caught\\n");  // 危险！
5 |     flag = 1;
6 |     malloc(100);  // 绝对禁止！
7 |     free(ptr);    // 绝对禁止！
8 | }
9 |
10| int main() {
11|     signal(SIGINT, handler);
12|     while (!flag);
13| }`,
    bugLine: 4,
    bugFix: '// 信号处理中只能使用异步信号安全函数\n// write()是安全的，printf()不安全\nwrite(STDOUT_FILENO, "Signal\\n", 7);',
    explanation: '信号处理函数在进程上下文中异步执行，不能调用非可重入函数：malloc/free（可能破坏堆结构）、printf（使用全局缓冲区）、操作全局链表等。安全的函数：write、_exit、部分系统调用。应该设置volatile标志让主循环处理。',
    difficulty: 4,
    vocabulary: [
      { word: 'async-signal-safe', meaning: '异步信号安全' },
      { word: 'reentrant', meaning: '可重入' },
      { word: 'volatile', meaning: '易变的（防止编译器优化）' }
    ]
  },
  {
    id: 219,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】死锁的四个必要条件',
    description: '理解死锁产生的根本原因',
    code: `// 死锁产生的四个必要条件（Coffman条件）：
// 1. 互斥条件：资源一次只能被一个进程占用
// 2. 占有且等待：持有资源同时请求新资源
// 3. 不可抢占：已分配的资源不能被强制剥夺
// 4. ___①等待：形成循环等待链

// 预防死锁的方法：
// - 破坏条件2：一次性申请所有资源
// - 破坏条件4：按固定顺序申请锁

pthread_mutex_lock(&A);
pthread_mutex_lock(&B);  // 若另一线程先锁B再锁A → 死锁`,
    blanks: [
      { hint: '等待链的形状', answer: '循环' }
    ],
    explanation: '死锁四个必要条件：互斥、占有且等待、不可抢占、循环等待。破坏任一条件即可预防死锁。实际编程中最常用：按固定顺序获取锁（如总是先A后B），或使用try_lock超时机制。银行家算法用于避免死锁而非预防。',
    difficulty: 4,
    vocabulary: [
      { word: 'deadlock', meaning: '死锁' },
      { word: 'circular wait', meaning: '循环等待' },
      { word: 'banker\'s algorithm', meaning: '银行家算法' }
    ]
  },
  {
    id: 220,
    chapter: 'linux',
    type: 'output',
    title: '【深度】内存屏障与指令重排序',
    description: '理解为什么需要memory barrier',
    code: `// 编译器和CPU都可能重排序指令：
// 为了性能，不相关的指令可能乱序执行

// 但多线程下，重排序可能导致问题：
// 线程1:        线程2:
// x = 1;       if (ready)
// ready = 1;       print(x);
// 
// 重排序后ready可能先于x赋值！
// 线程2可能看到ready=1但x=0

// 解决：使用___①防止重排序
// - 编译器屏障：__asm__ volatile("" ::: "memory")
// - CPU屏障：__sync_synchronize() (mfence)

volatile int ready = 0;
int x = 0;`,
    correctOutput: '需要内存屏障防止指令重排序',
    explanation: '编译器和CPU为优化性能会重排序指令。多线程下，这种重排序可能破坏程序逻辑（如看到ready但x还未赋值）。内存屏障(memory barrier/fence)阻止重排序，确保屏障前的操作在屏障后操作之前完成。C11 atomic、pthread_mutex_lock都隐含内存屏障。',
    difficulty: 5,
    vocabulary: [
      { word: 'memory barrier', meaning: '内存屏障' },
      { word: 'instruction reordering', meaning: '指令重排序' },
      { word: 'memory fence', meaning: '内存栅栏' }
    ]
  },
  {
    id: 221,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】页缓存(Page Cache)机制',
    description: '为什么第二次读取文件更快',
    code: `// Linux文件IO的页缓存机制：
// 1. 首次read()：磁盘→页缓存→用户缓冲区（慢）
// 2. 再次read()：页缓存→用户缓冲区（快！）
// 
// 页缓存是内核管理的内存区域，缓存文件数据
// 延迟写回：write()先写页缓存，稍后刷盘

// 强制刷盘：
// - fsync(fd)：刷指定文件的页缓存到磁盘
// - sync()：刷所有页缓存

// 为什么数据库要调用___①确保数据落盘？
// 因为断电会丢失页缓存中的数据！`,
    blanks: [
      { hint: '强制刷盘的系统调用', answer: 'fsync' }
    ],
    explanation: '页缓存(Page Cache)加速文件访问：首次从磁盘读入缓存，后续从内存读取。write()也先写缓存，延迟刷盘提升性能。但断电会丢失缓存数据，所以数据库在事务提交时必须fsync确保落盘。echo 3 > /proc/sys/vm/drop_caches可清空页缓存。',
    difficulty: 4,
    vocabulary: [
      { word: 'page cache', meaning: '页缓存' },
      { word: 'fsync', meaning: '强制同步文件到磁盘' },
      { word: 'write-back', meaning: '延迟写回' }
    ]
  },
  {
    id: 222,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】线程切换 vs 进程切换',
    description: '为什么线程切换更快',
    code: `// 进程切换需要：
// 1. 保存/恢复寄存器上下文
// 2. 切换___①（页表、TLB刷新）
// 3. 切换内核栈
// 开销：约1-10微秒

// 线程切换只需：
// 1. 保存/恢复寄存器上下文
// 2. 切换内核栈
// 开销：约0.5-2微秒

// 协程切换只需：
// 1. 保存/恢复寄存器
// 开销：约10-100纳秒！`,
    blanks: [
      { hint: '进程特有的地址空间结构', answer: '地址空间' }
    ],
    explanation: '线程切换比进程切换快，因为线程共享地址空间，无需切换页表和刷新TLB。进程切换需要切换页表（CR3寄存器），导致TLB失效，后续访问需要重新地址转换。协程在用户态切换，连内核栈都不换，最快可达10ns级。',
    difficulty: 4,
    vocabulary: [
      { word: 'context switch', meaning: '上下文切换' },
      { word: 'page table', meaning: '页表' },
      { word: 'TLB', meaning: '转译后备缓冲器' }
    ]
  },
  {
    id: 223,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】缺页中断(Page Fault)',
    description: '理解虚拟内存的按需分配',
    code: `// 虚拟内存的按需调页(Demand Paging)：
// 1. malloc()只分配虚拟地址，不分配物理页
// 2. 首次访问该地址时，MMU发现无映射
// 3. 触发___①，进入内核
// 4. 内核分配物理页，建立映射
// 5. 返回用户态，重新执行访问指令

// 这就是为什么：
// - 大数组malloc()很快
// - 但首次遍历时变慢（大量缺页）
// - memset()或touch可"预热"页面

int *p = malloc(1024 * 1024 * 100);  // 100MB
// 此时还没有分配物理内存！
p[0] = 1;  // 触发缺页，分配第一页`,
    blanks: [
      { hint: '访问未映射页面触发的中断', answer: '缺页中断' }
    ],
    explanation: 'Linux使用按需调页：malloc只分配虚拟地址，首次访问才分配物理页（触发缺页中断）。这节省了物理内存，但首次访问有延迟。大量连续内存访问会产生大量缺页中断（minor page fault），可通过mlock预分配或顺序访问"预热"。',
    difficulty: 4,
    vocabulary: [
      { word: 'page fault', meaning: '缺页中断' },
      { word: 'demand paging', meaning: '按需调页' },
      { word: 'minor fault', meaning: '轻微缺页（只需分配页）' }
    ]
  },
  {
    id: 224,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】优先级反转与优先级继承',
    description: '实时系统中的经典问题',
    code: `// 优先级反转问题：
// 高优先级任务H等待低优先级任务L持有的锁
// 中优先级任务M抢占L，导致H被M间接阻塞
// 结果：高优先级任务被中优先级任务阻塞！

// 解决方案：___①协议
// - 当H等待L的锁时，临时将L的优先级提升到H
// - L释放锁后恢复原始优先级
// - 这样M无法抢占L，H能尽快获得锁

// Linux支持：
// pthread_mutexattr_setprotocol(&attr, PTHREAD_PRIO_INHERIT);`,
    blanks: [
      { hint: '解决优先级反转的协议', answer: '优先级继承' }
    ],
    explanation: '优先级反转：高优先级任务被低优先级任务阻塞，而中优先级任务又在运行。优先级继承协议：当高优先级任务等待锁时，临时提升锁持有者的优先级到等待者级别，防止被中优先级任务抢占。这是实时系统（如火星探路者bug）的关键技术。',
    difficulty: 5,
    vocabulary: [
      { word: 'priority inversion', meaning: '优先级反转' },
      { word: 'priority inheritance', meaning: '优先级继承' },
      { word: 'real-time', meaning: '实时系统' }
    ]
  },
  {
    id: 225,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】mmap vs read/write',
    description: '什么时候用mmap更好',
    code: `// mmap内存映射文件：
// 优点：
// 1. 零拷贝：直接访问页缓存，无需read/write拷贝
// 2. 按需加载：只加载访问的页，大文件友好
// 3. 进程间共享：多个进程映射同一文件，共享物理页
// 4. 简化代码：像访问内存一样访问文件

// 缺点：
// 1. 随机小IO性能差（缺页中断开销）
// 2. 需要处理___①（SIGBUS）
// 3. 不适合只读小文件（setup开销）

// 适用场景：
// - 大文件随机访问（数据库）
// - 进程间共享数据
// - 程序二进制加载`,
    blanks: [
      { hint: '文件被截断后访问会触发的信号', answer: 'SIGBUS' }
    ],
    explanation: 'mmap适合大文件随机访问和进程共享，避免拷贝开销。但小文件顺序读取反而不如read（mmap有setup开销）。文件被截断后访问映射区域会触发SIGBUS。数据库（如MongoDB）常用mmap管理数据文件，但现代趋势是直接IO+buffer pool更可控。',
    difficulty: 4,
    vocabulary: [
      { word: 'mmap', meaning: '内存映射文件' },
      { word: 'SIGBUS', meaning: '总线错误信号' },
      { word: 'page fault', meaning: '缺页中断' }
    ]
  },
  {
    id: 226,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】进程调度：CFS算法',
    description: 'Linux如何公平调度进程',
    code: `// CFS(Completely Fair Scheduler)核心思想：
// - 每个进程有虚拟运行时间vruntime
// - vruntime = 实际运行时间 / 权重
// - 权重由nice值决定（nice越低权重越高）
// - 调度器总是选择vruntime___①的进程

// 这样保证：
// - 所有进程获得公平的CPU时间
// - 高优先级(nice低)进程获得更多时间
// - 新进程/唤醒进程vruntime设为最小值（防止饿死）

// 查看vruntime：
// cat /proc/[pid]/sched | grep vruntime`,
    blanks: [
      { hint: 'CFS选择什么样的进程', answer: '最小' }
    ],
    explanation: 'CFS使用红黑树管理可运行进程，按vruntime排序。总是选择vruntime最小的进程运行，保证公平性。vruntime增长速度与权重成反比，nice -20的进程权重是nice 19的约10倍，获得更多CPU时间。IO密集型进程经常阻塞，vruntime小，会被优先调度（响应性好）。',
    difficulty: 4,
    vocabulary: [
      { word: 'CFS', meaning: '完全公平调度器' },
      { word: 'vruntime', meaning: '虚拟运行时间' },
      { word: 'nice', meaning: '进程优先级值' }
    ]
  },
  {
    id: 227,
    chapter: 'linux',
    type: 'output',
    title: '【深度】竞态条件(Race Condition)',
    description: '理解并发编程的核心问题',
    code: `// 竞态条件：多个线程访问共享数据，
// 且至少一个是写操作，结果依赖于执行时序

// counter++ 实际是三步骤：
// 1. 读取counter到寄存器
// 2. 寄存器加1
// 3. 写回counter

// 两个线程同时执行counter++：
// T1: 读(0)        T2: 读(0)
// T1: 加(1)        T2: 加(1)
// T1: 写(1)        T2: 写(1)
// 结果：counter=1（期望是2）

// 解决：使用___①保护临界区
// 或原子操作：__sync_fetch_and_add`,
    correctOutput: '需要互斥锁或原子操作保护',
    explanation: '竞态条件是并发编程的核心问题：非原子操作被多线程交错执行导致错误结果。counter++看似简单，实际是读-改-写三步。mutex通过互斥保证临界区串行执行，原子操作通过硬件锁保证操作不可分割。检测工具：ThreadSanitizer、helgrind。',
    difficulty: 4,
    vocabulary: [
      { word: 'race condition', meaning: '竞态条件' },
      { word: 'critical section', meaning: '临界区' },
      { word: 'atomic operation', meaning: '原子操作' }
    ]
  },
  {
    id: 228,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】文件描述符与打开文件表',
    description: '理解fork后文件描述符的行为',
    code: `// 内核中的文件数据结构：
// 1. 文件描述符表（每个进程私有）：fd → file结构
// 2. file结构（打开文件表）：引用计数、当前偏移、文件状态标志
// 3. inode结构：文件元数据、页缓存

// fork()后：
// - 子进程复制父进程的fd表
// - 但指向同一个file结构（共享偏移！）
// - 所以父子进程写同一文件会___①写入

// 解决：
// - O_CLOEXEC标志：exec后自动关闭
// - dup2：复制fd但指向不同file结构`,
    blanks: [
      { hint: '父子进程写同一文件的结果', answer: '交错' }
    ],
    explanation: 'fork后父子进程共享file结构（打开文件表项），包括当前文件偏移。所以同时写入会导致数据交错混乱。各自独立打开文件则有独立的file结构和偏移。这也是fork+exec时经常设置O_CLOEXEC的原因，防止子进程继承不必要的fd。',
    difficulty: 4,
    vocabulary: [
      { word: 'file descriptor', meaning: '文件描述符' },
      { word: 'file table', meaning: '打开文件表' },
      { word: 'O_CLOEXEC', meaning: '执行时关闭标志' }
    ]
  },
  {
    id: 229,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】自旋锁 vs 互斥锁',
    description: '什么时候该用自旋锁',
    code: `// 自旋锁(Spinlock)：
// - 获取锁失败时，忙等待（循环检测）
// - 不释放CPU，直到获得锁
// - 适用：临界区极短、多核CPU
// - 优点：无上下文切换开销
// - 缺点：浪费CPU周期

// 互斥锁(Mutex)：
// - 获取失败时，阻塞并让出CPU
// - 适用：临界区长、单核CPU
// - 优点：不浪费CPU
// - 缺点：两次上下文切换开销

// Linux内核中：
// - 多核且临界区短 → 用___①
// - 可能睡眠的操作 → 用mutex`,
    blanks: [
      { hint: '多核短临界区应该用什么锁', answer: '自旋锁' }
    ],
    explanation: '自旋锁适合多核CPU且临界区极短的场景（如只修改几个变量），避免了上下文切换开销。但如果临界区长或单核，自旋锁会浪费大量CPU。互斥锁适合可能阻塞的场景。Linux内核中：spinlock用于中断上下文和短临界区，mutex用于可能睡眠的长操作。',
    difficulty: 4,
    vocabulary: [
      { word: 'spinlock', meaning: '自旋锁' },
      { word: 'busy-wait', meaning: '忙等待' },
      { word: 'context switch', meaning: '上下文切换' }
    ]
  },
  {
    id: 230,
    chapter: 'linux',
    type: 'fill',
    title: '【深度】Unix Domain Socket vs TCP Socket',
    description: '本地通信为什么UDS更快',
    code: `// Unix Domain Socket(UDS) vs TCP Socket：

// 相同点：
// - 都使用socket API
// - 都支持流和数据报模式

// 不同点：
// 1. UDS不经过网络协议栈，无需___①（TCP握手、确认、重传）
// 2. UDS使用文件系统路径作为地址，无需IP和端口
// 3. UDS可以传递文件描述符（SCM_RIGHTS）
// 4. UDS性能高2倍以上

// 适用场景：
// - 同一机器进程间通信 → UDS
// - 跨机器通信 → TCP

int uds = socket(AF_UNIX, SOCK_STREAM, 0);`,
    blanks: [
      { hint: 'TCP特有的开销', answer: '网络协议栈' }
    ],
    explanation: 'Unix Domain Socket是本地进程间通信的最佳选择：不经过TCP/IP协议栈，无需三次握手、确认应答、拥塞控制等，直接通过内核内存拷贝数据。性能比localhost TCP高2倍以上。还支持传递文件描述符（如systemd socket激活）。Docker、Nginx都用UDS做本地通信。',
    difficulty: 3,
    vocabulary: [
      { word: 'UDS', meaning: 'Unix Domain Socket' },
      { word: 'SCM_RIGHTS', meaning: '传递文件描述符的机制' },
      { word: 'socket activation', meaning: '套接字激活' }
    ]
  },

  // ===== Linux常用命令 =====
  {
    id: 231,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'ls命令查看详细信息',
    description: '显示文件权限、大小、修改时间',
    code: `# 查看当前目录所有文件（包括隐藏）的详细信息
ls ___①`,
    blanks: [
      { hint: '显示所有+详细信息', answer: '-la' }
    ],
    explanation: 'ls -l 显示详细信息（权限、链接数、所有者、大小、时间），-a 显示隐藏文件（以.开头）。组合使用 ls -la 或 ll（别名）。',
    difficulty: 1
  },
  {
    id: 232,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'chmod修改权限',
    description: '设置脚本可执行权限',
    code: `# 给script.sh添加执行权限
chmod ___① script.sh`,
    blanks: [
      { hint: '添加执行权限', answer: ['+x', 'a+x', 'u+x'] }
    ],
    explanation: 'chmod +x 添加执行权限。数字方式：chmod 755 = rwxr-xr-x（所有者全权限，其他读执行）。常用：chmod 644 文件，chmod 755 目录/脚本。',
    difficulty: 1
  },
  {
    id: 233,
    chapter: 'linux-cmds',
    type: 'fill',
    title: '查找进程并终止',
    description: '组合命令杀掉nginx进程',
    code: `# 查找nginx进程并强制终止
ps aux | grep nginx | grep -v grep | awk '{print $2}' | xargs ___①`,
    blanks: [
      { hint: '强制终止进程', answer: 'kill -9' }
    ],
    explanation: 'kill -9 发送 SIGKILL 信号强制终止进程。kill 默认发送 SIGTERM(15)，进程可以捕获并做清理。kill -9 不可捕获，慎用！',
    difficulty: 2
  },
  {
    id: 234,
    chapter: 'linux-cmds',
    type: 'fill',
    title: '查看端口占用',
    description: '查看80端口被哪个进程占用',
    code: `# 查看80端口监听情况
___① -tlnp | grep :80`,
    blanks: [
      { hint: '网络状态命令', answer: ['netstat', 'ss'] }
    ],
    explanation: 'netstat -tlnp 显示TCP监听端口及进程信息。-t:TCP, -l:监听, -n:数字显示, -p:进程信息。新版Linux推荐用 ss -tlnp。',
    difficulty: 2
  },
  {
    id: 235,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'grep递归搜索',
    description: '在代码中搜索函数定义',
    code: `# 在src目录递归搜索"main"函数，显示行号
grep ___① "main" src/`,
    blanks: [
      { hint: '递归+行号', answer: '-rn' }
    ],
    explanation: 'grep -r 递归搜索目录，-n 显示行号。常用组合：grep -rn "pattern" dir/。grep -i 忽略大小写，grep -v 反向匹配。',
    difficulty: 1
  },
  {
    id: 236,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'find查找文件',
    description: '查找所有C源文件',
    code: `# 查找当前目录下所有.c文件
find . -name "___①"`,
    blanks: [
      { hint: 'C文件通配符', answer: '*.c' }
    ],
    explanation: 'find . -name "*.c" 查找当前目录及子目录下所有.c文件。-name 按文件名匹配，-type f 只查文件，-mtime -7 查7天内修改的文件。',
    difficulty: 1
  },
  {
    id: 237,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'sed替换文本',
    description: '批量替换文件中的字符串',
    code: `# 将file.txt中所有old替换为new（直接修改文件）
sed ___① 's/old/new/g' file.txt`,
    blanks: [
      { hint: '直接修改文件', answer: '-i' }
    ],
    explanation: 'sed -i 直接修改文件（不加则只输出到终端）。s/old/new/g 全局替换，不加g只替换每行第一个。sed -i "s/old/new/g" file 是常用替换命令。',
    difficulty: 2
  },
  {
    id: 238,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'awk提取列',
    description: '提取日志中的IP地址',
    code: `# access.log格式：IP 时间 请求 状态
# 192.168.1.1 [2024-01-01] GET /index.html 200
# 提取第一列IP地址
awk '{print ___①}' access.log`,
    blanks: [
      { hint: '第一列', answer: '$1' }
    ],
    explanation: 'awk 默认按空格分列，$1是第一列，$0是整行，$NF是最后一列。awk -F: 指定冒号分隔符。常用：awk "{print $1}" file 提取第一列。',
    difficulty: 2
  },
  {
    id: 239,
    chapter: 'linux-cmds',
    type: 'fill',
    title: '后台运行命令',
    description: '让程序在后台持续运行',
    code: `# 让server程序在后台运行，断开终端也不退出
___① ./server &`,
    blanks: [
      { hint: '忽略挂断信号', answer: 'nohup' }
    ],
    explanation: 'nohup 忽略 SIGHUP 信号，终端关闭后进程继续运行。输出默认重定向到 nohup.out。组合：nohup command & > log.txt 2>&1。',
    difficulty: 2
  },
  {
    id: 240,
    chapter: 'linux-cmds',
    type: 'fill',
    title: 'curl发送POST请求',
    description: '测试API接口',
    code: `# 发送POST请求，JSON数据
curl -X POST -H "Content-Type: application/json" ___① '{"name":"test"}' http://api.example.com/user`,
    blanks: [
      { hint: '发送数据', answer: '-d' }
    ],
    explanation: 'curl -d 发送POST数据。-H 添加请求头，-X 指定方法。常用：curl -X POST -d "key=value" URL 发送表单数据。',
    difficulty: 2
  },

  // ===== 嵌入式Linux应用 =====
  {
    id: 241,
    chapter: 'embedded',
    type: 'fill',
    title: 'open系统调用',
    description: '打开文件并检查错误',
    code: `int fd = open("/dev/ttyUSB0", O_RDWR | O_NOCTTY);
if (fd < ___①) {
    perror("open failed");
    return -1;
}`,
    blanks: [
      { hint: '错误返回值', answer: '0' }
    ],
    explanation: 'open 成功返回非负文件描述符（最小可用整数），失败返回 -1。O_RDWR 读写模式，O_NOCTTY 不成为控制终端（串口常用）。',
    difficulty: 2
  },
  {
    id: 242,
    chapter: 'embedded',
    type: 'output',
    title: 'read返回值',
    description: '理解read的实际读取字节数',
    code: `char buf[100];
int fd = open("test.txt", O_RDONLY);
int n = read(fd, buf, 50);
buf[n] = '\\0';
printf("read %d bytes", n);`,
    correctOutput: 'read 50 bytes',
    explanation: 'read 返回实际读取的字节数。如果文件只有30字节，read返回30。读取到文件末尾返回0，出错返回-1。注意：read可能返回少于请求的字节数！',
    difficulty: 2
  },
  {
    id: 243,
    chapter: 'embedded',
    type: 'fill',
    title: 'fork返回值',
    description: '区分父子进程',
    code: `pid_t pid = fork();
if (pid == ___①) {
    printf("子进程\\n");
} else if (pid > 0) {
    printf("父进程\\n");
} else {
    perror("fork failed");
}`,
    blanks: [
      { hint: '子进程中返回值', answer: '0' }
    ],
    explanation: 'fork 返回值：父进程得到子进程PID（>0），子进程得到0，失败返回-1。通过返回值区分父子进程执行不同代码。',
    difficulty: 2
  },
  {
    id: 244,
    chapter: 'embedded',
    type: 'fill',
    title: 'wait回收子进程',
    description: '防止僵尸进程',
    code: `pid_t pid = fork();
if (pid == 0) {
    exit(0);  // 子进程退出
}
// 父进程等待子进程结束
int status;
___①(&status);`,
    blanks: [
      { hint: '等待子进程', answer: 'wait' }
    ],
    explanation: 'wait() 阻塞等待任意子进程结束，返回子进程PID。不调用wait会导致子进程变成僵尸进程（Z状态）。waitpid 可以指定等待特定子进程。',
    difficulty: 2
  },
  {
    id: 245,
    chapter: 'embedded',
    type: 'fill',
    title: 'pipe管道通信',
    description: '父子进程通过管道通信',
    code: `int fd[2];
pipe(fd);  // fd[0]读端, fd[1]写端
if (fork() == 0) {
    close(fd[0]);  // 子进程关闭读端
    write(fd[1], "hello", 5);
} else {
    close(fd[1]);  // 父进程关闭写端
    char buf[10];
    read(fd[___①], buf, 5);
}`,
    blanks: [
      { hint: '读端', answer: '0' }
    ],
    explanation: 'pipe(fd) 创建管道，fd[0] 是读端，fd[1] 是写端。父子进程各关闭不用的端，实现单向通信。管道是内核缓冲区，有大小限制。',
    difficulty: 3
  },
  {
    id: 246,
    chapter: 'embedded',
    type: 'fill',
    title: 'signal信号处理',
    description: '捕获Ctrl+C信号',
    code: `void handler(int sig) {
    printf("Caught signal %d\\n", sig);
}

int main() {
    ___①(SIGINT, handler);  // 注册信号处理函数
    while(1) pause();
}`,
    blanks: [
      { hint: '注册信号处理', answer: 'signal' }
    ],
    explanation: 'signal(SIGINT, handler) 注册信号处理函数。SIGINT 是 Ctrl+C 产生的信号(2)。推荐用 sigaction() 替代 signal()，更可靠可移植。',
    difficulty: 2
  },
  {
    id: 247,
    chapter: 'embedded',
    type: 'fill',
    title: 'pthread创建线程',
    description: '创建并等待线程',
    code: `void* thread_func(void* arg) {
    printf("thread running\\n");
    return NULL;
}

pthread_t tid;
pthread_create(&tid, NULL, thread_func, NULL);
pthread___①(tid, NULL);  // 等待线程结束`,
    blanks: [
      { hint: '等待线程', answer: '_join' }
    ],
    explanation: 'pthread_create 创建线程，pthread_join 等待线程结束（类似 wait 回收子进程）。不 join 会导致线程资源不释放，类似僵尸进程。',
    difficulty: 2
  },
  {
    id: 248,
    chapter: 'embedded',
    type: 'fill',
    title: 'mutex互斥锁',
    description: '保护共享资源',
    code: `pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
int counter = 0;

void* thread_func(void* arg) {
    pthread_mutex___①(&mutex);
    counter++;
    pthread_mutex_unlock(&mutex);
    return NULL;
}`,
    blanks: [
      { hint: '加锁', answer: '_lock' }
    ],
    explanation: 'pthread_mutex_lock 加锁，pthread_mutex_unlock 解锁。保护临界区，防止竞争条件。忘记解锁会导致死锁！',
    difficulty: 2
  },
  {
    id: 249,
    chapter: 'embedded',
    type: 'fill',
    title: 'ioctl设备控制',
    description: '设置串口波特率',
    code: `int fd = open("/dev/ttyUSB0", O_RDWR);
struct termios options;
tcgetattr(fd, &options);
cfsetispeed(&options, B115200);  // 输入波特率
cfsetospeed(&options, B115200);  // 输出波特率
tcsetattr(fd, TCSANOW, &options);

// 另一种方式：通过ioctl发送命令
___①(fd, TCSETS, &options);`,
    blanks: [
      { hint: '设备控制命令', answer: 'ioctl' }
    ],
    explanation: 'ioctl 是设备控制的万能接口，用于发送设备特定命令。串口常用 tcgetattr/tcsetattr 封装，底层也是 ioctl。驱动开发中常用 ioctl 实现自定义命令。',
    difficulty: 3
  },
  {
    id: 250,
    chapter: 'embedded',
    type: 'fill',
    title: 'mmap内存映射',
    description: '映射文件到内存',
    code: `int fd = open("data.bin", O_RDWR);
void* addr = ___①(NULL, 4096, PROT_READ|PROT_WRITE, MAP_SHARED, fd, 0);
if (addr == MAP_FAILED) {
    perror("mmap failed");
}
// 像访问内存一样访问文件
int* data = (int*)addr;
data[0] = 123;  // 直接写入文件`,
    blanks: [
      { hint: '内存映射函数', answer: 'mmap' }
    ],
    explanation: 'mmap 将文件映射到进程地址空间，可以像访问内存一样访问文件。避免 read/write 系统调用，效率更高。MAP_SHARED 会同步到文件，MAP_PRIVATE 是写时复制。',
    difficulty: 3
  },

  // ===== C++基础 =====
  {
    id: 251,
    chapter: 'cpp',
    type: 'fill',
    title: '引用基本用法',
    description: '引用是变量的别名',
    code: `int a = 10;
int& ref = a;  // ref是a的引用
ref = 20;
printf("%d", a);  // 输出: ___①`,
    blanks: [
      { hint: 'a的值', answer: '20' }
    ],
    explanation: '引用是变量的别名，操作引用就是操作原变量。引用必须初始化，不能改变引用目标。C++中引用比指针更安全，常用于参数传递。',
    difficulty: 1
  },
  {
    id: 252,
    chapter: 'cpp',
    type: 'fill',
    title: '引用vs指针',
    description: '引用不能改变目标',
    code: `int a = 10, b = 20;
int* p = &a;
p = &b;  // 指针可以改变指向

int& ref = a;
ref = b;  // 这不是改变引用目标，而是___①`,
    blanks: [
      { hint: '实际操作', answer: ['把b的值赋给a', '修改a的值为20', 'a = b'] }
    ],
    explanation: '引用一旦初始化就不能改变引用目标。ref = b 不是让 ref 引用 b，而是把 b 的值赋给 ref 引用的变量（即 a）。这是引用和指针的重要区别。',
    difficulty: 2
  },
  {
    id: 253,
    chapter: 'cpp',
    type: 'fill',
    title: '类的基本定义',
    description: '定义一个简单的类',
    code: `___① Student {
public:
    string name;
    int age;
    void print() {
        cout << name << ":" << age << endl;
    }
};`,
    blanks: [
      { hint: '类关键字', answer: 'class' }
    ],
    explanation: 'class 定义类，包含成员变量和成员函数。public/private/protected 控制访问权限。C++中 struct 也可以定义类，默认权限是 public。',
    difficulty: 1
  },
  {
    id: 254,
    chapter: 'cpp',
    type: 'fill',
    title: '构造函数',
    description: '初始化对象成员',
    code: `class Student {
public:
    string name;
    int age;
    Student(string n, int a) : name(n), age(a) {}  // 初始化列表
};

Student s("Tom", 18);
printf("%s:%d", s.name.c_str(), s.age);  // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: 'Tom:18' }
    ],
    explanation: '构造函数在对象创建时自动调用，用于初始化。初始化列表 Student(string n, int a) : name(n), age(a) 比在函数体内赋值更高效。',
    difficulty: 2
  },
  {
    id: 255,
    chapter: 'cpp',
    type: 'fill',
    title: '虚函数实现多态',
    description: '基类指针调用子类方法',
    code: `class Base {
public:
    virtual void show() { cout << "Base"; }
};

class Derived : public Base {
public:
    void show() override { cout << "Derived"; }
};

Base* p = new Derived();
p->show();  // 输出: ___①`,
    blanks: [
      { hint: '调用哪个方法', answer: 'Derived' }
    ],
    explanation: 'virtual 声明虚函数，实现运行时多态。基类指针指向子类对象时，调用的是子类的方法。没有 virtual 则调用基类方法。override 关键字确保正确重写。',
    difficulty: 2
  },
  {
    id: 256,
    chapter: 'cpp',
    type: 'fill',
    title: '纯虚函数与抽象类',
    description: '定义接口',
    code: `class Shape {
public:
    virtual double area() ___① = 0;  // 纯虚函数
};

class Circle : public Shape {
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() override { return 3.14 * r * r; }
};`,
    blanks: [
      { hint: '纯虚函数语法', answer: '' }
    ],
    explanation: '纯虚函数 = 0 使类成为抽象类，不能实例化。子类必须实现所有纯虚函数才能实例化。这是定义接口的标准方式。',
    difficulty: 3
  },
  {
    id: 257,
    chapter: 'cpp',
    type: 'fill',
    title: 'vector动态数组',
    description: '使用STL vector',
    code: `#include <vector>
using namespace std;

vector<int> v;
v.push_back(1);
v.push_back(2);
v.push_back(3);
printf("%d %d", v[0], v.size());  // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: '1 3' }
    ],
    explanation: 'vector 是动态数组，push_back 尾部添加，size() 返回元素个数。支持随机访问 v[i]，时间复杂度 O(1)。尾部插入平均 O(1)，中间插入 O(n)。',
    difficulty: 1
  },
  {
    id: 258,
    chapter: 'cpp',
    type: 'fill',
    title: 'map键值对',
    description: '使用STL map',
    code: `#include <map>
using namespace std;

map<string, int> scores;
scores["Tom"] = 90;
scores["Jerry"] = 85;
printf("%d", scores["Tom"]);  // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: '90' }
    ],
    explanation: 'map 是有序键值对容器，按键排序。访问不存在的键会自动创建值为0的元素。用 count() 或 find() 检查键是否存在。unordered_map 是哈希实现，O(1)查找。',
    difficulty: 2
  },
  {
    id: 259,
    chapter: 'cpp',
    type: 'fill',
    title: 'unique_ptr智能指针',
    description: '独占所有权的智能指针',
    code: `#include <memory>

class Resource {
public:
    ~Resource() { cout << "destroyed"; }
};

auto p = std::make_unique<Resource>();
// p 离开作用域时自动销毁 Resource
// unique_ptr 不能拷贝，只能___①`,
    blanks: [
      { hint: '可以做什么操作', answer: ['移动', 'move', 'std::move'] }
    ],
    explanation: 'unique_ptr 独占所有权，不能拷贝，只能移动。离开作用域自动释放资源。make_unique 是推荐的创建方式。最轻量级的智能指针。',
    difficulty: 3
  },
  {
    id: 260,
    chapter: 'cpp',
    type: 'fill',
    title: 'shared_ptr引用计数',
    description: '共享所有权的智能指针',
    code: `#include <memory>

auto p1 = std::make_shared<int>(10);
auto p2 = p1;  // 共享所有权，引用计数 = ___①
printf("%d %d", *p1, p1.use_count());`,
    blanks: [
      { hint: '引用计数', answer: '2' }
    ],
    explanation: 'shared_ptr 使用引用计数，拷贝时计数+1，销毁时-1。计数为0时释放资源。use_count() 返回当前计数。注意循环引用问题，用 weak_ptr 解决。',
    difficulty: 3
  },

  // ===== C++进阶 =====
  {
    id: 261,
    chapter: 'cpp',
    type: 'fill',
    title: '函数重载',
    description: '同名函数不同参数',
    code: `void print(int a) { cout << "int: " << a; }
void print(double a) { cout << "double: " << a; }
void print(string a) { cout << "string: " << a; }

print(10);      // 调用第一个
print(3.14);    // 调用第二个
print("hello"); // 调用第___①个`,
    blanks: [
      { hint: '哪个函数', answer: '三' }
    ],
    explanation: '函数重载：同名函数但参数不同（类型、数量、顺序）。返回值不同不能重载。编译器根据参数类型选择最佳匹配。"hello"是const char*，会匹配string版本。',
    difficulty: 2
  },
  {
    id: 262,
    chapter: 'cpp',
    type: 'fill',
    title: '拷贝构造函数',
    description: '对象复制时的深拷贝',
    code: `class Buffer {
    int* data;
    int size;
public:
    Buffer(int s) : size(s), data(new int[s]) {}
    
    // 拷贝构造函数
    Buffer(const Buffer& other) : size(other.size) {
        data = new int[size];  // 深拷贝
        memcpy(data, other.data, size * sizeof(int));
    }
    
    ~Buffer() { delete[] data; }
};

Buffer b1(10);
Buffer b2 = b1;  // 调用___①构造函数`,
    blanks: [
      { hint: '什么构造函数', answer: '拷贝' }
    ],
    explanation: '拷贝构造函数在对象复制时调用：Buffer b2 = b1 或 func(b1) 传值。默认是浅拷贝（只复制指针值），需要深拷贝时必须自定义。三法则：如果需要析构函数，通常也需要拷贝构造和赋值运算符。',
    difficulty: 3
  },
  {
    id: 263,
    chapter: 'cpp',
    type: 'fill',
    title: '移动语义',
    description: '转移资源所有权',
    code: `class Buffer {
    int* data;
public:
    Buffer(int n) : data(new int[n]) {}
    
    // 移动构造函数
    Buffer(Buffer&& other) noexcept : data(other.data) {
        other.data = nullptr;  // 源对象置空
    }
};

Buffer b1(100);
Buffer b2 = std::move(b1);  // 调用___①构造函数`,
    blanks: [
      { hint: '什么构造函数', answer: '移动' }
    ],
    explanation: '移动构造函数转移资源所有权而不是复制。std::move 将左值转为右值引用。移动后源对象处于有效但未定义状态。比拷贝更高效，避免内存分配和数据复制。',
    difficulty: 3
  },
  {
    id: 264,
    chapter: 'cpp',
    type: 'fill',
    title: '右值引用',
    description: '区分左值和右值',
    code: `int x = 10;          // x是左值
int& lr = x;         // 左值引用
int&& rr = 10;       // 右值引用，绑定到___①

int&& rr2 = x + 5;   // 右值引用，x+5是右值
// int&& rr3 = x;     // 错误！右值引用不能绑定左值`,
    blanks: [
      { hint: '绑定到什么', answer: ['字面量', '临时值', '右值'] }
    ],
    explanation: '右值引用 (T&&) 只能绑定到右值（临时对象、字面量）。用于实现移动语义和完美转发。左值引用 (T&) 绑定到左值（有名字的对象）。std::move 将左值转为右值。',
    difficulty: 3
  },
  {
    id: 265,
    chapter: 'cpp',
    type: 'fill',
    title: 'lambda表达式',
    description: '匿名函数',
    code: `#include <algorithm>
#include <vector>

vector<int> v = {3, 1, 4, 1, 5};
int threshold = 2;

// 统计大于threshold的元素个数
int count = count_if(v.begin(), v.end(), 
    [threshold](int x) { return x > ___①; });`,
    blanks: [
      { hint: '比较变量', answer: 'threshold' }
    ],
    explanation: 'lambda语法：[捕获列表](参数) {函数体}。[threshold] 按值捕获，[&threshold] 按引用捕获，[=] 捕获所有外部变量按值，[&] 捕获所有按引用。常用于STL算法回调。',
    difficulty: 2
  },
  {
    id: 266,
    chapter: 'cpp',
    type: 'fill',
    title: '模板基础',
    description: '泛型编程',
    code: `template<typename T>
T max(T a, T b) {
    return a > b ? a : b;
}

int i = max(3, 5);       // T = int
double d = max(3.14, 2.71);  // T = ___①`,
    blanks: [
      { hint: 'T的类型', answer: 'double' }
    ],
    explanation: '模板让函数/类支持多种类型。编译器根据参数自动推导T的类型。也可以显式指定：max<int>(3, 5)。模板代码在头文件中实现，编译时实例化。',
    difficulty: 2
  },
  {
    id: 267,
    chapter: 'cpp',
    type: 'fill',
    title: '异常处理',
    description: 'try-catch捕获异常',
    code: `double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("Division by zero");
    }
    return a / b;
}

try {
    double result = divide(10, 0);
} catch (const runtime_error& e) {
    cout << "Error: " << e.___①();  // 获取错误信息
}`,
    blanks: [
      { hint: '获取信息的方法', answer: 'what' }
    ],
    explanation: 'throw 抛出异常，try-catch 捕获异常。catch 按类型匹配，const reference 避免拷贝。what() 返回异常描述信息。异常会沿调用栈向上传播直到被捕获。',
    difficulty: 2
  },
  {
    id: 268,
    chapter: 'cpp',
    type: 'fill',
    title: 'RAII资源管理',
    description: '资源获取即初始化',
    code: `class FileHandle {
    FILE* fp;
public:
    FileHandle(const char* path, const char* mode) {
        fp = fopen(path, mode);
    }
    ~FileHandle() {
        if (fp) fclose(fp);  // 析构时自动关闭
    }
    // 禁止拷贝
    FileHandle(const FileHandle&) = delete;
    FileHandle& operator=(const FileHandle&) = ___①;
};

void process() {
    FileHandle file("data.txt", "r");
    // 函数结束时自动关闭文件
}`,
    blanks: [
      { hint: '删除赋值运算符', answer: 'delete' }
    ],
    explanation: 'RAII：资源在构造函数中获取，在析构函数中释放。确保资源不会泄漏，即使发生异常。= delete 禁止拷贝，防止资源被多次释放。智能指针、文件句柄、锁都使用RAII。',
    difficulty: 3
  },
  {
    id: 269,
    chapter: 'cpp',
    type: 'fill',
    title: 'const正确性',
    description: 'const成员函数',
    code: `class String {
    string data;
public:
    // const成员函数：不修改对象状态
    size_t length() const { return data.length(); }
    
    // 非const成员函数：可以修改
    void append(const string& s) { data += s; }
};

const String s = "hello";
s.length();   // OK：const对象可以调用const成员函数
s.append("!"); // 错误：const对象不能调用___①成员函数`,
    blanks: [
      { hint: '什么成员函数', answer: '非const' }
    ],
    explanation: 'const成员函数承诺不修改对象状态。const对象只能调用const成员函数。const在函数声明末尾表示const成员函数。参数用const& 避免拷贝且防止修改。',
    difficulty: 2
  },
  {
    id: 270,
    chapter: 'cpp',
    type: 'fill',
    title: 'static关键字',
    description: '静态成员和静态局部变量',
    code: `class Counter {
    static int count;  // 静态成员变量
public:
    Counter() { count++; }
    static int getCount() { return count; }  // 静态成员函数
};

int Counter::count = 0;  // 静态成员初始化

Counter c1, c2, c3;
cout << Counter::getCount();  // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: '3' }
    ],
    explanation: 'static成员变量：所有对象共享一份，类外初始化。static成员函数：没有this指针，只能访问static成员。static局部变量：只初始化一次，值在函数调用间保持。',
    difficulty: 2
  },
  {
    id: 271,
    chapter: 'cpp',
    type: 'fill',
    title: '运算符重载',
    description: '自定义类型的运算符',
    code: `class Complex {
public:
    double real, imag;
    Complex(double r, double i) : real(r), imag(i) {}
    
    Complex operator+(const Complex& other) const {
        return Complex(real + other.real, imag + other.___①);
    }
};

Complex a(1, 2), b(3, 4);
Complex c = a + b;  // c = (4, 6)`,
    blanks: [
      { hint: '虚部相加', answer: 'imag' }
    ],
    explanation: '运算符重载让自定义类型支持运算符。operator+ 重载加号，operator= 重载赋值，operator== 重载比较。成员函数方式：左侧对象调用，右侧作为参数。友元函数方式：两个参数。',
    difficulty: 3
  },
  {
    id: 272,
    chapter: 'cpp',
    type: 'fill',
    title: '命名空间',
    description: '避免命名冲突',
    code: `namespace MyLib {
    int value = 10;
    void print() { cout << value; }
}

int value = 20;

cout << value;           // 输出: 20
cout << MyLib::value;    // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: '10' }
    ],
    explanation: 'namespace 防止命名冲突。用 :: 访问命名空间成员。using namespace std; 引入整个命名空间（不推荐在头文件中使用）。using MyLib::value; 引入特定成员。',
    difficulty: 1
  },
  {
    id: 273,
    chapter: 'cpp',
    type: 'fill',
    title: '类型转换',
    description: 'C++新式类型转换',
    code: `// C风格转换（不推荐）
int* p = (int*)malloc(100);

// C++风格转换
double d = 3.14;
int i = static_cast<int>(d);  // 编译时转换

Base* base = new Derived();
Derived* derived = dynamic_cast<Derived*>(base);  // 运行时转换

const int x = 10;
int* px = const_cast<int*>(&x);  // 去除___①`,
    blanks: [
      { hint: '去除什么', answer: 'const' }
    ],
    explanation: 'C++四种转换：static_cast（编译时）、dynamic_cast（运行时多态）、const_cast（去除const）、reinterpret_cast（底层重解释）。比C风格转换更安全、更明确意图。',
    difficulty: 3
  },
  {
    id: 274,
    chapter: 'cpp',
    type: 'fill',
    title: '友元函数',
    description: '允许外部函数访问私有成员',
    code: `class Vector {
    double x, y;
public:
    Vector(double x, double y) : x(x), y(y) {}
    
    // 友元函数：可以访问私有成员
    friend double dot(const Vector& a, const Vector& b) {
        return a.x * b.x + a.y * b.___①;
    }
};

Vector v1(1, 2), v2(3, 4);
cout << dot(v1, v2);  // 输出: 11`,
    blanks: [
      { hint: 'y分量', answer: 'y' }
    ],
    explanation: 'friend 声明的函数可以访问类的私有和保护成员。友元不是成员函数，没有this指针。常用于运算符重载（如 operator<< 输出自定义类型）。友元类：整个类可以访问。',
    difficulty: 3
  },
  {
    id: 275,
    chapter: 'cpp',
    type: 'output',
    title: '析构顺序',
    description: '对象销毁的顺序',
    code: `class A {
public:
    string name;
    A(string n) : name(n) { cout << name << " ctor\\n"; }
    ~A() { cout << name << " dtor\\n"; }
};

int main() {
    A a("a");
    {
        A b("b");
        A c("c");
    }
    cout << "end";
}`,
    correctOutput: 'a ctor\nb ctor\nc ctor\nc dtor\nb dtor\nend',
    explanation: '对象析构顺序与构造顺序相反。先构造的后析构（栈的LIFO特性）。b和c在内部作用域，离开作用域时立即析构（先c后b）。a在main结束时析构。',
    difficulty: 2
  },
  {
    id: 276,
    chapter: 'cpp',
    type: 'fill',
    title: 'auto类型推导',
    description: '自动推导变量类型',
    code: `auto x = 10;           // int
auto y = 3.14;         // double
auto s = "hello";      // const char*
auto v = vector<int>{1, 2, 3};  // vector<int>

for (auto& item : v) {  // 引用遍历
    item *= 2;
}

for (auto it = v.begin(); it != v.end(); ++it) {
    cout << *it << " ";  // 输出: ___①
}`,
    blanks: [
      { hint: '输出结果', answer: '2 4 6 ' }
    ],
    explanation: 'auto 让编译器自动推导类型。常用于迭代器、范围for循环。auto& 获取引用避免拷贝。auto&& 万能引用。不能用于函数参数（C++20前）。',
    difficulty: 2
  },
  {
    id: 277,
    chapter: 'cpp',
    type: 'fill',
    title: '初始化列表',
    description: '统一初始化语法',
    code: `// C++11统一初始化
int arr[] {1, 2, 3};
vector<int> v {4, 5, 6};
string s {"hello"};

class Point {
public:
    int x, y;
};

Point p {10, 20};
cout << p.x << "," << p.y;  // 输出: ___①`,
    blanks: [
      { hint: '输出结果', answer: '10,20' }
    ],
    explanation: 'C++11 统一使用花括号 {} 初始化。优点：防止窄化转换（如 int x{3.14} 会报错）。结构体/类可以用聚合初始化（无构造函数时）。vector<int> v{1,2,3} 更简洁。',
    difficulty: 2
  },
  {
    id: 278,
    chapter: 'cpp',
    type: 'fill',
    title: 'nullptr空指针',
    description: 'C++11空指针字面量',
    code: `int* p1 = NULL;     // C风格，可能有问题
int* p2 = nullptr;  // C++11推荐

void f(int);
void f(int*);

f(NULL);      // 调用 f(int) 还是 f(int*)？可能歧义
f(nullptr);   // 明确调用 f(___①)`,
    blanks: [
      { hint: '哪个函数', answer: 'int*' }
    ],
    explanation: 'nullptr 是空指针字面量，类型是 nullptr_t，可以隐式转换为任意指针类型。比 NULL 更安全，避免整数和指针的重载歧义。C++11后应使用 nullptr 替代 NULL。',
    difficulty: 2
  },
  {
    id: 279,
    chapter: 'cpp',
    type: 'fill',
    title: 'override关键字',
    description: '确保正确重写虚函数',
    code: `class Base {
public:
    virtual void foo(int x);
};

class Derived : public Base {
public:
    void foo(int x) ___①;  // 明确表示重写
    // void foo(double x) override;  // 错误！没有重写任何函数
};`,
    blanks: [
      { hint: '关键字', answer: 'override' }
    ],
    explanation: 'override 确保函数正确重写基类虚函数。如果签名不匹配（参数不同、基类无此虚函数），编译器报错。建议所有重写的虚函数都加 override，提高代码可读性和安全性。',
    difficulty: 2
  },
  {
    id: 280,
    chapter: 'cpp',
    type: 'fill',
    title: 'final关键字',
    description: '禁止继承或重写',
    code: `class Base final {  // 禁止继承此类
};

// class Derived : public Base {};  // 错误！

class Parent {
public:
    virtual void foo() final;  // 禁止重写此函数
};

class Child : public Parent {
    // void foo() ___①;  // 错误！不能重写final函数
};`,
    blanks: [
      { hint: '能重写吗', answer: ['不能', '不可以', 'no'] }
    ],
    explanation: 'final 用于类：禁止被继承。用于虚函数：禁止被子类重写。常用于设计不可变的类层次结构。final 和 override 可以同时使用（虽然没必要）。',
    difficulty: 2
  },

  // ===== 指针进阶 - 对应课程31-42课 =====
  {
    id: 281,
    chapter: 'pointers',
    type: 'output',
    title: '指针的大小',
    description: '理解指针变量本身占用的内存',
    code: `int a = 10;
int *p = &a;
char *pc = NULL;
double *pd = NULL;

printf("%zu %zu %zu", sizeof(p), sizeof(pc), sizeof(pd));`,
    correctOutput: '8 8 8',
    explanation: '指针存储的是内存地址，地址的大小取决于系统位数。64位系统上，所有指针都是8字节（64位），无论它指向什么类型。32位系统则是4字节。sizeof(指针)得到的是指针本身的大小，不是它指向的数据的大小。',
    difficulty: 2,
    knowledgePoints: ['指针大小', '64位系统', '地址宽度'],
    hint: '指针存储地址，地址大小与指向类型无关'
  },
  {
    id: 282,
    chapter: 'pointers',
    type: 'output',
    title: '指针加减运算',
    description: '理解指针运算的字节偏移',
    code: `int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;

printf("%d\\n", *p);
printf("%d\\n", *(p + 1));
printf("%d\\n", *(p + 2));

p++;
printf("%d\\n", *p);`,
    correctOutput: '10\n20\n30\n20',
    explanation: '指针加减运算按指向类型的大小偏移。p+1不是地址加1字节，而是加sizeof(int)=4字节。p++让p指向下一个int元素。指针运算的本质：新地址 = 原地址 + n * sizeof(指向类型)。',
    difficulty: 2,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针运算', '字节偏移', '数组遍历'],
    lineAnalysis: [
      { num: 1, explanation: '定义int数组，arr是首元素地址。', memoryChange: 'arr[0]=10, arr[1]=20, ...' },
      { num: 2, explanation: 'p指向arr[0]，即地址&arr[0]。', memoryChange: 'p = arr' },
      { num: 4, explanation: '*p解引用，得到arr[0]=10。' },
      { num: 5, explanation: 'p+1偏移4字节指向arr[1]，解引用得20。' },
      { num: 6, explanation: 'p+2偏移8字节指向arr[2]，解引用得30。' },
      { num: 8, explanation: 'p++让p自增，现在p指向arr[1]。', memoryChange: 'p: arr → arr+1' },
      { num: 9, explanation: '*p现在得到arr[1]=20。' }
    ]
  },
  {
    id: 283,
    chapter: 'pointers',
    type: 'output',
    title: '指针与数组名',
    description: '理解数组名与指针的区别',
    code: `int arr[3] = {1, 2, 3};
int *p = arr;

printf("%d\\n", arr[1]);
printf("%d\\n", p[1]);
printf("%d\\n", *(arr + 2));
printf("%d\\n", *(p + 2));

printf("%zu\\n", sizeof(arr));
printf("%zu\\n", sizeof(p));`,
    correctOutput: '2\n2\n3\n3\n12\n8',
    explanation: 'arr[i]等价于*(arr+i)，p[i]等价于*(p+i)。但arr和p有本质区别：arr是数组名（常量），代表整个数组，sizeof(arr)得到整个数组大小（3*4=12字节）；p是指针变量，sizeof(p)得到指针本身大小（8字节）。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组名vs指针', 'sizeof区别', '下标与指针等价']
  },
  {
    id: 284,
    chapter: 'pointers',
    type: 'output',
    title: '指针与字符串',
    description: '字符指针与字符数组的区别',
    code: `char str1[] = "Hello";
char *str2 = "World";

str1[0] = 'h';
// str2[0] = 'w';  // 危险！可能崩溃

printf("%s\\n", str1);
printf("%s\\n", str2);`,
    correctOutput: 'hello\nWorld',
    explanation: 'str1是字符数组，存储在栈上，可以修改。str2是指针，指向字符串字面量，存储在只读区（.rodata），修改会导致段错误。字符串字面量是const的，用指针指向时应该声明为const char *。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['字符数组', '字符串字面量', '只读内存', '段错误'],
    commonMistakes: ['修改字符串字面量', '混淆字符数组和字符指针']
  },
  {
    id: 285,
    chapter: 'pointers',
    type: 'fill',
    title: '函数指针声明',
    description: '声明指向函数的指针',
    code: `int add(int a, int b) {
    return a + b;
}

int (*pfunc)(int, int) = ___①;  // 指向add函数

printf("%d\\n", pfunc(3, 5));`,
    blanks: [
      { hint: '函数名就是函数地址', answer: 'add' }
    ],
    explanation: '函数指针声明：返回类型 (*指针名)(参数类型列表)。函数名就是函数的入口地址。pfunc(3,5)或(*pfunc)(3,5)都可以调用。函数指针常用于回调函数、策略模式。',
    difficulty: 3,
    knowledgePoints: ['函数指针', '回调函数', '函数地址']
  },
  {
    id: 286,
    chapter: 'pointers',
    type: 'output',
    title: '回调函数',
    description: '使用函数指针实现回调',
    code: `int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int calc(int x, int y, int (*op)(int, int)) {
    return op(x, y);
}

printf("%d\\n", calc(10, 3, add));
printf("%d\\n", calc(10, 3, sub));`,
    correctOutput: '13\n7',
    explanation: '回调函数：将函数作为参数传递。calc函数接收一个函数指针op，调用时传入不同的函数实现不同功能。这是策略模式的C语言实现，qsort的compare参数就是回调函数。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['回调函数', '函数指针参数', '策略模式']
  },
  {
    id: 287,
    chapter: 'pointers',
    type: 'fill',
    title: '指针函数',
    description: '返回指针的函数',
    code: `int* find_max(int *arr, int n) {
    int *max = arr;
    for (int i = 1; i < n; i++) {
        if (arr[i] > *max) {
            max = ___①;
        }
    }
    return max;  // 返回最大值的地址
}

int data[] = {3, 7, 2, 9, 1};
int *p = find_max(data, 5);
printf("%d\\n", *p);`,
    blanks: [
      { hint: '新最大值的地址', answer: '&arr[i]' }
    ],
    explanation: '指针函数是返回指针的函数。int* find_max(...) 返回int指针。注意：不能返回局部变量的地址！返回的指针必须指向有效的内存（如传入的数组元素）。',
    difficulty: 3,
    knowledgePoints: ['指针函数', '返回指针', '悬空指针风险']
  },
  {
    id: 288,
    chapter: 'pointers',
    type: 'output',
    title: '指针与二维数组',
    description: '理解二维数组的指针访问',
    code: `int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};

printf("%d\\n", arr[0][0]);
printf("%d\\n", *arr[0]);
printf("%d\\n", **arr);
printf("%d\\n", *(*(arr + 1) + 2));`,
    correctOutput: '1\n1\n1\n6',
    explanation: '二维数组arr[2][3]：arr是行指针，arr[0]是第一行首元素指针，*arr[0]是第一行第一个元素。arr[i][j]等价于*(*(arr+i)+j)。arr+1跳过一行（3个int），*(arr+1)是第二行首元素指针。',
    difficulty: 4,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二维数组', '行指针', '列指针', '指针解引用'],
    lineAnalysis: [
      { num: 1, explanation: '定义2行3列的二维数组。' },
      { num: 3, explanation: 'arr[0][0]直接访问，值为1。' },
      { num: 4, explanation: 'arr[0]是第一行首元素指针，*arr[0]解引用得1。' },
      { num: 5, explanation: 'arr是行指针，*arr得到第一行指针，**arr得到第一行第一个元素。' },
      { num: 6, explanation: 'arr+1指向第二行，*(arr+1)是第二行指针，+2偏移到第三个元素，解引用得6。' }
    ]
  },
  {
    id: 289,
    chapter: 'pointers',
    type: 'output',
    title: '二级指针',
    description: '指向指针的指针',
    code: `int a = 100;
int *p = &a;
int **pp = &p;

printf("%d\\n", a);
printf("%d\\n", *p);
printf("%d\\n", **pp);

printf("%p\\n", (void*)p);
printf("%p\\n", (void*)*pp);`,
    correctOutput: '100\n100\n100\n(地址1)\n(地址1)',
    explanation: '二级指针int **pp存储指针p的地址。*pp得到p（a的地址），**pp得到*p（a的值）。二级指针常用于：修改指针本身（如函数内分配内存）、指针数组、命令行参数argv。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二级指针', '指针的指针', '多重解引用'],
    memoryViz: {
      cells: [
        { name: 'a', address: '0x1000', value: '100', type: 'variable' },
        { name: 'p', address: '0x2000', value: '0x1000', type: 'pointer', pointsTo: 'a' },
        { name: 'pp', address: '0x3000', value: '0x2000', type: 'pointer', pointsTo: 'p' }
      ]
    }
  },
  {
    id: 290,
    chapter: 'pointers',
    type: 'fill',
    title: '函数内修改指针',
    description: '使用二级指针在函数内修改指针',
    code: `void allocate(int **pp, int size) {
    *pp = malloc(size * sizeof(int));
}

int *arr = NULL;
allocate(___①, 10);  // 传入arr的地址
arr[0] = 100;
printf("%d\\n", arr[0]);`,
    blanks: [
      { hint: '指针的地址', answer: '&arr' }
    ],
    explanation: '要在函数内修改指针本身（而非指向的值），需要传入指针的地址（二级指针）。*pp = malloc(...)修改的是main中的arr指针。如果只传int *p，函数内的修改不会影响main中的指针。',
    difficulty: 4,
    knowledgePoints: ['二级指针', '函数参数', '动态内存分配']
  },
  {
    id: 291,
    chapter: 'pointers',
    type: 'output',
    title: 'const与指针',
    description: '理解const修饰指针的不同位置',
    code: `int a = 10, b = 20;

const int *p1 = &a;   // 指向常量
int * const p2 = &a;  // 常量指针
const int * const p3 = &a;  // 都不能改

// *p1 = 30;  // 错误！不能修改指向的值
p1 = &b;      // OK，可以改指向

*p2 = 30;     // OK，可以修改指向的值
// p2 = &b;   // 错误！不能改指向

printf("%d %d\\n", *p1, *p2);`,
    correctOutput: '20 30',
    explanation: 'const int *p：不能通过p修改指向的值（指向常量），但p可以指向别处。int * const p：p本身是常量，不能改指向，但可以修改指向的值。记忆：const在*左边修饰值，在*右边修饰指针。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['const指针', '指向常量的指针', '常量指针']
  },
  {
    id: 292,
    chapter: 'pointers',
    type: 'output',
    title: 'void指针',
    description: '通用指针类型',
    code: `int a = 42;
double b = 3.14;

void *p;
p = &a;
printf("%d\\n", *(int*)p);

p = &b;
printf("%.2f\\n", *(double*)p);`,
    correctOutput: '42\n3.14',
    explanation: 'void *是通用指针，可以指向任何类型。但不能直接解引用，必须先转换为具体类型。常用于：malloc返回值、通用回调函数参数、qsort比较函数。void *的大小与其他指针相同。',
    difficulty: 2,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['void指针', '类型转换', '通用指针']
  },
  {
    id: 293,
    chapter: 'pointers',
    type: 'debug',
    title: '返回局部变量地址',
    description: '经典的悬空指针错误',
    code: `1 | int* create_value() {
2 |     int value = 100;
3 |     return &value;
4 | }
5 | 
6 | int main() {
7 |     int *p = create_value();
8 |     printf("%d\\n", *p);
9 | }`,
    bugLine: 3,
    bugFix: 'int* create_value() {\n    int *p = malloc(sizeof(int));\n    *p = 100;\n    return p;\n}',
    explanation: 'value是局部变量，存储在栈上，函数返回后栈帧销毁，value的地址变得无效。返回后p成为悬空指针，解引用是未定义行为。解决方案：使用malloc在堆上分配，或返回值而非地址。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。检查常见错误：缺少分号、括号不匹配、变量未初始化等。',
    knowledgePoints: ['悬空指针', '栈帧生命周期', '局部变量']
  },
  {
    id: 294,
    chapter: 'pointers',
    type: 'output',
    title: '指针数组',
    description: '存储指针的数组',
    code: `char *names[] = {"Alice", "Bob", "Charlie"};

printf("%s\\n", names[0]);
printf("%c\\n", names[1][0]);
printf("%s\\n", names[2] + 4);`,
    correctOutput: 'Alice\nB\nlie',
    explanation: 'char *names[]是指针数组，每个元素是一个char指针。names[0]指向"Alice"，names[1]指向"Bob"。names[2]+4跳过4个字符，指向"lie"。指针数组常用于字符串数组、命令行参数。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针数组', '字符串数组', '指针运算']
  },
  {
    id: 295,
    chapter: 'pointers',
    type: 'fill',
    title: '复杂指针声明解读',
    description: '理解复杂的C语言声明',
    code: `// 右左法则：从变量名开始，先右后左读
// int *p;        → p是int指针
// int *p[10];    → p是数组，元素是int指针
// int (*p)[10];  → p是指针，指向int[10]数组
// int *p();      → p是函数，返回int指针
// int (*p)();    → p是函数指针，返回int

int (*arr_ptr)[5];  // arr_ptr是指向___①的指针`,
    blanks: [
      { hint: '指向什么', answer: ['int[5]数组', '包含5个int的数组', '长度为5的int数组'] }
    ],
    explanation: '复杂声明解读技巧：1.找到变量名 2.先看右边（[]表示数组，()表示函数）3.再看左边（*表示指针）4.重复。int (*arr_ptr)[5]：arr_ptr是指针，指向int[5]数组。',
    difficulty: 4,
    knowledgePoints: ['复杂声明', '右左法则', '数组指针']
  },
  {
    id: 296,
    chapter: 'pointers',
    type: 'output',
    title: '指针与结构体',
    description: '通过指针访问结构体成员',
    code: `typedef struct {
    char name[20];
    int age;
} Person;

Person p = {"Tom", 25};
Person *ptr = &p;

printf("%s\\n", ptr->name);
printf("%d\\n", (*ptr).age);`,
    correctOutput: 'Tom\n25',
    explanation: 'ptr->name等价于(*ptr).name。->是结构体指针访问成员的简写。结构体指针常用于：链表节点、函数参数传递大结构体（避免拷贝）、动态分配的结构体。',
    difficulty: 2,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体指针', '->操作符', '链表基础']
  },
  {
    id: 297,
    chapter: 'pointers',
    type: 'output',
    title: '指针与自增运算',
    description: '理解*p++和(*p)++的区别',
    code: `int arr[] = {10, 20, 30};
int *p = arr;

int a = *p++;
int b = (*p)++;
int c = *p;

printf("%d %d %d\\n", a, b, c);`,
    correctOutput: '10 20 21',
    explanation: '*p++：后置++优先级高，先取*p（10），再p++。(*p)++：括号改变优先级，先*p取值（20），再对值++（变成21），p不变。*++p：先p++，再取新位置的值。++*p：先取值，再对值++。',
    difficulty: 4,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针自增', '运算符优先级', '后置自增']
  },
  {
    id: 298,
    chapter: 'pointers',
    type: 'output',
    title: '指针减法',
    description: '计算两个指针之间的元素个数',
    code: `int arr[] = {1, 2, 3, 4, 5};
int *p1 = arr;
int *p2 = arr + 4;

printf("%ld\\n", p2 - p1);
printf("%ld\\n", (char*)p2 - (char*)p1);`,
    correctOutput: '4\n16',
    explanation: '指针相减得到的是元素个数，不是字节数。p2-p1=4表示相差4个int元素。转换为char*后，按字节计算，4个int=16字节。指针相减只对同一数组内的指针有意义。',
    difficulty: 3,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针减法', '元素个数', '字节偏移']
  },
  {
    id: 299,
    chapter: 'pointers',
    type: 'debug',
    title: '指针越界访问',
    description: '数组越界的危险',
    code: `1 | int arr[3] = {1, 2, 3};
2 | int *p = arr;
3 | 
4 | for (int i = 0; i <= 3; i++) {
5 |     printf("%d ", p[i]);
6 | }`,
    bugLine: 4,
    bugFix: 'for (int i = 0; i < 3; i++) {',
    explanation: '数组arr只有3个元素（索引0-2），循环条件i<=3会访问arr[3]，这是越界访问。越界读取可能读到垃圾值或导致崩溃，越界写入更危险，可能破坏其他数据。C语言不检查数组边界，程序员必须自己保证。',
    difficulty: 2,
    hint: '注意指针存储的是地址，*是解引用。检查常见错误：缺少分号、括号不匹配、变量未初始化等。',
    knowledgePoints: ['数组越界', '指针安全', '缓冲区溢出']
  },
  {
    id: 300,
    chapter: 'pointers',
    type: 'output',
    title: 'NULL指针',
    description: '理解空指针',
    code: `int *p = NULL;

if (p == NULL) {
    printf("p is null\\n");
}

// *p = 10;  // 段错误！

int a = 100;
p = &a;
printf("%d\\n", *p);`,
    correctOutput: 'p is null\n100',
    explanation: 'NULL是空指针常量，值为0。解引用NULL指针会导致段错误（SIGSEGV）。使用指针前应该检查是否为NULL。malloc失败返回NULL，必须检查返回值。',
    difficulty: 2,
    hint: '注意指针存储的是地址，*是解引用。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['NULL指针', '段错误', '指针初始化']
  },

  // ===== Level 1 入门 - 嵌入式Linux应用开发视角 =====
  {
    id: 2001,
    chapter: 'level1',
    type: 'output',
    title: '打印寄存器值',
    description: '调试时打印32位寄存器值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint32_t gpio_reg = 0x1234ABCD;
    uint32_t uart_reg = 0x0056;
    uint32_t spi_reg  = 0xFF;

    printf("GPIO: 0x%08X\\n", gpio_reg);
    printf("UART: 0x%08X\\n", uart_reg);
    printf("SPI:  0x%08X\\n", spi_reg);

    return 0;
}`,
    correctOutput: 'GPIO: 0x1234ABCD\nUART: 0x00000056\nSPI:  0x000000FF',
    explanation: '%08X：8位十六进制输出，不足8位前面补0，大写字母。嵌入式调试常用格式，保证输出对齐，方便对比寄存器值。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '十六进制', '格式化'],
      },
  {
    id: 2002,
    chapter: 'level1',
    type: 'output',
    title: '打印传感器数据',
    description: '格式化打印温度和湿度',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int16_t temperature = -15;
    uint16_t humidity = 65;
    printf("Temp: %dC, Humidity: %u%%\\n", temperature, humidity);
    return 0;
}`,
    correctOutput: 'Temp: -15C, Humidity: 65%',
    explanation: '%d用于有符号整数，%u用于无符号整数。%%输出百分号字符本身。传感器数据打印常用格式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '有符号/无符号', '转义字符'],
      },
  {
    id: 2003,
    chapter: 'level1',
    type: 'output',
    title: 'uint8_t计数器溢出',
    description: '计数器溢出回绕',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t rx_count = 0;
    uint8_t packet_seq = 254;

    for (uint8_t i = 0; i < 3; i++) {
        rx_count++;
        packet_seq++;
    }

    printf("rx_count: %u\\n", rx_count);
    printf("packet_seq: %u\\n", packet_seq);

    return 0;
}`,
    correctOutput: 'rx_count: 3\npacket_seq: 1',
    explanation: 'uint8_t范围0~255，255+1溢出回绕到0。packet_seq: 254→255→0→1。协议包序号常用uint8_t循环。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['uint8_t', '溢出', '回绕'],
      },
  {
    id: 2004,
    chapter: 'level1',
    type: 'output',
    title: '有符号与无符号比较陷阱',
    description: '危险的隐式转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int16_t  temperature = -10;
    uint16_t threshold = 30;

    if (temperature < threshold) {
        printf("Below threshold\\n");
    } else {
        printf("Above threshold\\n");
    }

    return 0;
}`,
    correctOutput: 'Above threshold',
    explanation: '有符号与无符号比较时，有符号数转换为无符号。-10变成65526（uint16_t），所以大于30。这是常见bug！',
    difficulty: 3,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['有符号无符号比较', '隐式转换', '常见bug'],
    visualization: { type: 'html', file: 'visualizations-v2/signed-unsigned-compare.html' },
      },
  {
    id: 2005,
    chapter: 'level1',
    type: 'output',
    title: 'switch-case命令分发',
    description: '协议命令处理',
    code: `#include <stdio.h>
#include <stdint.h>

#define CMD_READ   0x01
#define CMD_WRITE  0x02

int main(void)
{
    uint8_t command = CMD_WRITE;
    uint8_t response = 0;

    switch (command) {
        case CMD_READ:
            response = 0x80;
            printf("READ\\n");
            break;
        case CMD_WRITE:
            response = 0x81;
            printf("WRITE\\n");
            break;
        default:
            response = 0xFF;
            printf("UNKNOWN\\n");
    }
    printf("Response: 0x%02X\\n", response);
    return 0;
}`,
    correctOutput: 'WRITE\nResponse: 0x81',
    explanation: 'switch-case用于多分支选择。每个case必须有break，必须有default处理未知情况。协议命令解析常用。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['switch-case', '命令解析', 'break'],
      },
  {
    id: 2006,
    chapter: 'level1',
    type: 'output',
    title: 'while超时等待',
    description: '带超时的状态检测',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t device_ready = 0;
    uint8_t retry_count = 0;

    while ((device_ready == 0) && (retry_count < 5)) {
        printf("Waiting... retry %u\\n", retry_count + 1);
        retry_count++;
        if (retry_count == 3) {
            device_ready = 1;
        }
    }

    if (device_ready) {
        printf("Device ready\\n");
    }
    return 0;
}`,
    correctOutput: 'Waiting... retry 1\nWaiting... retry 2\nWaiting... retry 3\nDevice ready',
    explanation: 'while循环带超时检测，嵌入式常用模式。两个条件：设备就绪或超时退出。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['while循环', '超时处理', '状态检测'],
      },
  {
    id: 2007,
    chapter: 'level1',
    type: 'output',
    title: '函数调用与返回值',
    description: '设备初始化函数',
    code: `#include <stdio.h>
#include <stdint.h>

#define SUCCESS  0
#define ERR_PARAM_INVALID  -1

int32_t uart_init(uint32_t baud_rate, uint8_t data_bits)
{
    if (baud_rate == 0) {
        return ERR_PARAM_INVALID;
    }
    if (data_bits < 5 || data_bits > 8) {
        return ERR_PARAM_INVALID;
    }
    printf("UART init: baud=%lu, bits=%u\\n", baud_rate, data_bits);
    return SUCCESS;
}

int main(void)
{
    int32_t ret = uart_init(115200, 8);
    if (ret != SUCCESS) {
        printf("Init failed: %d\\n", ret);
        return -1;
    }
    printf("Init success\\n");
    return 0;
}`,
    correctOutput: 'UART init: baud=115200, bits=8\nInit success',
    explanation: '函数返回0表示成功，负数表示错误。调用后必须检查返回值。这是嵌入式驱动初始化的标准写法。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数调用', '返回值', '错误码'],
    visualization: { type: 'html', file: 'visualizations-v2/function-call-return-value.html' },
  },
  {
    id: 2008,
    chapter: 'level1',
    type: 'output',
    title: '设置寄存器位',
    description: '用或运算设置特定位',
    code: `#include <stdio.h>
#include <stdint.h>

#define LED_PIN  (1 << 3)

int main(void)
{
    uint8_t gpio_reg = 0x00;
    gpio_reg |= LED_PIN;
    printf("GPIO: 0x%02X\\n", gpio_reg);
    
    gpio_reg |= (1 << 5);
    printf("GPIO: 0x%02X\\n", gpio_reg);
    return 0;
}`,
    correctOutput: 'GPIO: 0x08\nGPIO: 0x28',
    explanation: '|=设置特定位。LED_PIN=1<<3=0x08，gpio_reg|=0x08设置第3位。再设置第5位变成0x28=00101000。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位或运算', '设置位', '寄存器操作'],
    visualization: { type: 'html', file: 'visualizations-v2/bit-macro-definition.html' },
      },
  {
    id: 2009,
    chapter: 'level1',
    type: 'output',
    title: '清除寄存器位',
    description: '用与运算清除特定位',
    code: `#include <stdio.h>
#include <stdint.h>

#define FLAG_MASK  (1 << 2)

int main(void)
{
    uint8_t status = 0x0F;
    printf("Before: 0x%02X\\n", status);
    
    status &= ~FLAG_MASK;
    printf("After:  0x%02X\\n", status);
    return 0;
}`,
    correctOutput: 'Before: 0x0F\nAfter:  0x0B',
    explanation: '&=~清除特定位。FLAG_MASK=0x04，~FLAG_MASK=0xFB，0x0F&0xFB=0x0B=00001011，第2位被清零。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位与运算', '清除位', '取反'],
    visualization: { type: 'html', file: 'visualizations-v2/bitwise-and-mask.html' },
  },
  {
    id: 2010,
    chapter: 'level1',
    type: 'output',
    title: 'BIT宏定义',
    description: '位掩码生成',
    code: `#include <stdio.h>
#include <stdint.h>

#define BIT(n)     (1U << (n))
#define SET_BIT(reg, n)    ((reg) |= BIT(n))
#define READ_BIT(reg, n)   (((reg) >> (n)) & 1)

int main(void)
{
    uint8_t gpio_reg = 0x00;

    SET_BIT(gpio_reg, 3);
    printf("After SET_BIT(3): 0x%02X\\n", gpio_reg);

    SET_BIT(gpio_reg, 5);
    printf("After SET_BIT(5): 0x%02X\\n", gpio_reg);

    printf("BIT(3) = %u\\n", READ_BIT(gpio_reg, 3));
    printf("BIT(5) = %u\\n", READ_BIT(gpio_reg, 5));

    return 0;
}`,
    correctOutput: 'After SET_BIT(3): 0x08\nAfter SET_BIT(5): 0x28\nBIT(3) = 1\nBIT(5) = 1',
    explanation: 'BIT(n)生成第n位的掩码，1U确保无符号。这些宏在嵌入式项目中随处可见。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['BIT宏', '位操作', '寄存器'],
    visualization: { type: 'html', file: 'visualizations-v2/bit-macro-definition.html' },
  },
  {
    id: 2011,
    chapter: 'level1',
    type: 'output',
    title: '带参宏的陷阱',
    description: '宏的副作用',
    code: `#include <stdio.h>
#include <stdint.h>

#define SQUARE(x)  ((x) * (x))

int main(void)
{
    uint8_t a = 5;
    printf("SQUARE(%u) = %u\\n", a, SQUARE(a));

    uint8_t b = 3;
    printf("SQUARE(%u++) = %u\\n", b, SQUARE(b++));
    printf("b after = %u\\n", b);

    return 0;
}`,
    correctOutput: 'SQUARE(5) = 25\nSQUARE(3++) = 12\nb after = 5',
    explanation: 'SQUARE(b++)展开为((b++)*(b++))，b++执行两次，结果是未定义行为。宏是文本替换，参数有副作用时要小心。',
    difficulty: 3,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['带参宏', '副作用', '宏陷阱'],
    visualization: { type: 'html', file: 'visualizations-v2/macro-side-effect.html' },
  },
  {
    id: 2012,
    chapter: 'level1',
    type: 'output',
    title: '参数传值不会修改原变量',
    description: '理解值传递',
    code: `#include <stdio.h>
#include <stdint.h>

void try_modify(uint8_t value)
{
    printf("Inside: value=%u\\n", value);
    value = 100;
    printf("Inside after: value=%u\\n", value);
}

int main(void)
{
    uint8_t counter = 10;

    printf("Before: counter=%u\\n", counter);
    try_modify(counter);
    printf("After: counter=%u\\n", counter);

    return 0;
}`,
    correctOutput: 'Before: counter=10\nInside: value=10\nInside after: value=100\nAfter: counter=10',
    explanation: 'C语言函数参数是值传递，函数内修改不影响原变量。要修改原变量必须传指针。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['传值', '形参实参', '函数参数'],
    visualization: { type: 'html', file: 'visualizations-v2/pass-by-value.html' },
  },
  {
    id: 2013,
    chapter: 'level1',
    type: 'output',
    title: 'static局部变量',
    description: '状态保持',
    code: `#include <stdio.h>
#include <stdint.h>

void counter_func(void)
{
    static uint8_t call_count = 0;
    call_count++;
    printf("Call count: %u\\n", call_count);
}

int main(void)
{
    counter_func();
    counter_func();
    counter_func();
    return 0;
}`,
    correctOutput: 'Call count: 1\nCall count: 2\nCall count: 3',
    explanation: 'static局部变量只初始化一次，值在函数调用间保持。存储在全局区，不是栈。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['static局部变量', '生命周期', '状态保持'],
  },
  {
    id: 2014,
    chapter: 'level1',
    type: 'output',
    title: 'strlen字符串长度',
    description: '协议数据长度',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char command[32] = "AT+RESET";

    size_t cmd_len = strlen(command);
    size_t buf_size = sizeof(command);

    printf("Command: %s\\n", command);
    printf("Length: %zu\\n", cmd_len);
    printf("Buffer size: %zu\\n", buf_size);

    return 0;
}`,
    correctOutput: 'Command: AT+RESET\nLength: 8\nBuffer size: 32',
    explanation: 'strlen返回字符串长度（不含\\0），sizeof返回数组大小。AT指令处理常用。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strlen', 'sizeof', '字符串长度'],
    visualization: { type: 'html', file: 'visualizations-v2/strlen-vs-sizeof.html' },
  },
  {
    id: 2015,
    chapter: 'level1',
    type: 'output',
    title: '字符串比较',
    description: '命令匹配',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char cmd1[] = "START";
    char cmd2[] = "START";
    char cmd3[] = "STOP";

    printf("cmd1 vs cmd2: %d\\n", strcmp(cmd1, cmd2));
    printf("cmd1 vs cmd3: %d\\n", strcmp(cmd1, cmd3));
    printf("cmd3 vs cmd1: %d\\n", strcmp(cmd3, cmd1));

    return 0;
}`,
    correctOutput: 'cmd1 vs cmd2: 0\ncmd1 vs cmd3: -1\ncmd3 vs cmd1: 1',
    explanation: 'strcmp返回0表示相等，负数表示小于，正数表示大于。命令匹配常用。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strcmp', '字符串比较', '命令匹配'],
    visualization: { type: 'html', file: 'visualizations-v2/strcmp-compare.html' },
  },
  {
    id: 2016,
    chapter: 'level1',
    type: 'output',
    title: 'ASCII码转换',
    description: '字符数字转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char digit_char = '7';
    uint8_t digit_value = digit_char - '0';

    printf("Char: %c\\n", digit_char);
    printf("Value: %u\\n", digit_value);

    uint8_t num = 5;
    char num_char = num + '0';
    printf("Num to char: %c\\n", num_char);

    return 0;
}`,
    correctOutput: 'Char: 7\nValue: 7\nNum to char: 5',
    explanation: '字符\'0\'-\'9\'的ASCII码是48-57，减\'0\'得到数字值。协议解析常用。',
    difficulty: 1,
    hint: '字符数字 - \'0\' = 数值',
    visualization: { type: 'html', file: 'visualizations-v2/ascii-conversion.html' },
  },
  {
    id: 2017,
    chapter: 'level1',
    type: 'output',
    title: '全局变量vs局部变量',
    description: '变量遮蔽',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t counter = 100;

void increment(void)
{
    counter++;
}

int main(void)
{
    printf("Global: %u\\n", counter);

    increment();
    printf("After increment: %u\\n", counter);

    uint8_t counter = 0;
    printf("Local: %u\\n", counter);

    increment();
    printf("After local increment: %u\\n", counter);

    return 0;
}`,
    correctOutput: 'Global: 100\nAfter increment: 101\nLocal: 0\nAfter local increment: 0',
    explanation: '局部变量遮蔽全局变量，函数内操作的是全局变量。同名变量容易混淆，不建议使用。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['全局变量', '局部变量', '遮蔽'],
    visualization: { type: 'html', file: 'visualizations-v2/global-vs-local.html' },
  },
  {
    id: 2018,
    chapter: 'level1',
    type: 'output',
    title: '变量初始化规则',
    description: '初始值',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t global_var;
static uint8_t static_var;

int main(void)
{
    uint8_t local_var;

    printf("Global: %u\\n", global_var);
    printf("Static: %u\\n", static_var);
    printf("Local: %u\\n", local_var);

    return 0;
}`,
    correctOutput: 'Global: 0\nStatic: 0\nLocal: 0',
    explanation: '全局变量和static变量自动初始化为0，局部变量不自动初始化（可能打印0或垃圾值）。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['变量初始化', '全局变量', '局部变量'],
    visualization: { type: 'html', file: 'visualizations-v2/variable-initialization.html' },
  },
  {
    id: 2019,
    chapter: 'level1',
    type: 'output',
    title: 'for循环遍历数组',
    description: '数组求和',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint16_t samples[5] = {100, 200, 150, 180, 220};
    uint32_t sum = 0;
    uint8_t count = sizeof(samples) / sizeof(samples[0]);

    for (uint8_t i = 0; i < count; i++) {
        sum += samples[i];
    }

    printf("Sum: %lu\\n", sum);
    printf("Average: %lu\\n", sum / count);
    return 0;
}`,
    correctOutput: 'Sum: 850\nAverage: 170',
    explanation: 'sizeof(数组)/sizeof(元素)计算数组长度。for循环遍历数组求和，再求平均值。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['for循环', '数组遍历', 'sizeof'],
    visualization: { type: 'html', file: 'visualizations-v2/for-loop-array-sum.html' },
      },
  {
    id: 2020,
    chapter: 'level1',
    type: 'output',
    title: 'break和continue',
    description: '循环控制',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[8] = {10, 0, 20, 0, 30, 0, 0, 40};
    uint8_t valid_count = 0;
    uint8_t sum = 0;

    printf("Valid data: ");
    for (uint8_t i = 0; i < 8; i++) {
        if (data[i] == 0) {
            continue;
        }
        if (data[i] == 40) {
            break;
        }
        printf("%u ", data[i]);
        valid_count++;
        sum += data[i];
    }
    printf("\\n");

    printf("Valid count: %u, Sum: %u\\n", valid_count, sum);
    return 0;
}`,
    correctOutput: 'Valid data: 10 20 30 \nValid count: 3, Sum: 60',
    explanation: 'continue跳过本次循环，break跳出整个循环。用于过滤无效数据或提前退出。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['break', 'continue', '循环控制'],
    visualization: { type: 'html', file: 'visualizations-v2/break-continue-flow.html' },
  },
  {
    id: 2021,
    chapter: 'level1',
    type: 'output',
    title: '打印寄存器值（十六进制对齐）',
    description: '调试时打印硬件寄存器值',
    code: `#include <stdio.h>
#include <stdint.h>

#define REG_BASE_ADDR  0x40000000

int main(void)
{
    uint32_t gpio_reg = 0x1234ABCD;
    uint32_t uart_reg = 0x0056;
    uint32_t spi_reg  = 0xFF;

    printf("GPIO: 0x%08X\\n", gpio_reg);
    printf("UART: 0x%08X\\n", uart_reg);
    printf("SPI:  0x%08X\\n", spi_reg);

    return 0;
}`,
    correctOutput: 'GPIO: 0x1234ABCD\nUART: 0x00000056\nSPI:  0x000000FF',
    explanation: '%08X中：0表示补零，8表示宽度8位，X表示大写十六进制。用于调试时打印寄存器值对齐显示。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '%08X', '十六进制'],
    visualization: { type: 'html', file: 'visualizations-v2/hex-format-align.html' },
  },
  {
    id: 2022,
    chapter: 'level1',
    type: 'output',
    title: '打印有符号和无符号整数',
    description: '传感器数据打印',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int16_t  temperature = -15;
    uint16_t humidity    = 85;
    uint32_t counter     = 100000;

    printf("Temperature: %d C\\n", temperature);
    printf("Humidity:    %u %%\\n", humidity);
    printf("Counter:     %u\\n", counter);

    return 0;
}`,
    correctOutput: 'Temperature: -15 C\nHumidity:    85 %\nCounter:     100000',
    explanation: '%d打印有符号整数，%u打印无符号整数，%%输出一个%字符。温度用有符号类型，计数器用无符号类型。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '%d', '%u', '%%'],
    visualization: { type: 'html', file: 'visualizations-v2/print-signed-unsigned.html' },
  },
  {
    id: 2023,
    chapter: 'level1',
    type: 'output',
    title: '打印字符和字符串',
    description: '打印设备名称和状态',
    code: `#include <stdio.h>
#include <stdint.h>

#define DEVICE_NAME  "Sensor_01"

int main(void)
{
    char device_name[] = "Sensor_01";
    char status_char   = 'O';
    uint8_t status_code = 0x4F;

    printf("Device: %s\\n", device_name);
    printf("Status: %c\\n", status_char);
    printf("Code:   %c (0x%02X)\\n", status_code, status_code);

    return 0;
}`,
    correctOutput: 'Device: Sensor_01\nStatus: O\nCode:   O (0x4F)',
    explanation: '%s打印字符串，%c打印单个字符。ASCII码0x4F对应字符O。同一个值可以用不同格式符打印。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '%s', '%c', 'ASCII'],
    visualization: { type: 'html', file: 'visualizations-v2/char-string-print.html' },
  },
  {
    id: 2024,
    chapter: 'level1',
    type: 'output',
    title: 'printf连续输出拼接',
    description: '协议帧数据打印',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t frame_header = 0xAA;
    uint8_t frame_len    = 0x05;
    uint8_t frame_data[] = {0x01, 0x02, 0x03, 0x04, 0x05};

    printf("RX: ");
    printf("%02X ", frame_header);
    printf("%02X ", frame_len);

    for (uint8_t i = 0; i < frame_len; i++) {
        printf("%02X ", frame_data[i]);
    }

    printf("\\n");
    return 0;
}`,
    correctOutput: 'RX: AA 05 01 02 03 04 05 ',
    explanation: '多个printf连续调用，输出会拼接在一起。%02X表示2位十六进制补零。协议调试常用。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '输出拼接', '%02X'],
    visualization: { type: 'html', file: 'visualizations-v2/printf-frame-output.html' },
  },
  {
    id: 2025,
    chapter: 'level1',
    type: 'output',
    title: '格式化宽度和对齐',
    description: '日志表格对齐显示',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    printf("%-10s %8s %6s\\n", "Device", "Value", "Unit");
    printf("%-10s %8u %6s\\n", "Temp", 25, "C");
    printf("%-10s %8u %6s\\n", "Humidity", 65, "%%");

    return 0;
}`,
    correctOutput: 'Device        Value   Unit\nTemp             25      C\nHumidity         65      %',
    explanation: '%-10s左对齐宽度10，%8s右对齐宽度8。负号表示左对齐，省略表示右对齐。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['printf', '宽度', '对齐'],
    visualization: { type: 'html', file: 'visualizations-v2/printf-format-align.html' },
  },
  {
    id: 2026,
    chapter: 'level1',
    type: 'output',
    title: 'uint8_t计数器溢出',
    description: '串口接收计数器',
    code: `#include <stdio.h>
#include <stdint.h>

#define MAX_RETRY  3

int main(void)
{
    uint8_t rx_count = 0;
    uint8_t packet_seq = 254;

    for (uint8_t i = 0; i < MAX_RETRY; i++) {
        rx_count++;
        packet_seq++;
    }

    printf("rx_count: %u\\n", rx_count);
    printf("packet_seq: %u\\n", packet_seq);

    return 0;
}`,
    correctOutput: 'rx_count: 3\npacket_seq: 1',
    explanation: 'uint8_t范围0~255，超出会回绕。packet_seq: 254→255→0→1，255+1溢出回绕到0。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['uint8_t', '溢出', '回绕'],
    visualization: { type: 'html', file: 'visualizations-v2/uint8-overflow.html' },
      },
  {
    id: 2027,
    chapter: 'level1',
    type: 'output',
    title: 'int8_t温度值溢出',
    description: '温度传感器数据存储',
    code: `#include <stdio.h>
#include <stdint.h>

#define TEMP_OFFSET  10

int main(void)
{
    int8_t temperature = 125;
    int8_t calibrated = temperature + TEMP_OFFSET;

    printf("Raw temp: %d\\n", temperature);
    printf("Calibrated: %d\\n", calibrated);

    return 0;
}`,
    correctOutput: 'Raw temp: 125\nCalibrated: -121',
    explanation: 'int8_t范围-128~127，125+10=135超出范围。有符号溢出是未定义行为，通常回绕。135二进制10000111作为补码解释为-121。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['int8_t', '有符号溢出', '补码'],
    visualization: { type: 'html', file: 'visualizations-v2/int8-overflow.html' },
  },
  {
    id: 2028,
    chapter: 'level1',
    type: 'output',
    title: '有符号与无符号比较陷阱',
    description: '传感器阈值判断',
    code: `#include <stdio.h>
#include <stdint.h>

#define TEMP_THRESHOLD  30

int main(void)
{
    int16_t  temperature = -10;
    uint16_t threshold = TEMP_THRESHOLD;

    if (temperature < threshold) {
        printf("Below threshold\\n");
    } else {
        printf("Above threshold\\n");
    }

    printf("temperature: %d\\n", temperature);
    printf("threshold: %u\\n", threshold);

    return 0;
}`,
    correctOutput: 'Above threshold\ntemperature: -10\nthreshold: 30',
    explanation: '有符号和无符号比较时，有符号会转为无符号。-10转为uint16_t是65526，65526<30为false。这是经典陷阱！',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['有符号无符号比较', '隐式转换'],
    visualization: { type: 'html', file: 'visualizations-v2/signed-unsigned-compare.html' },
  },
  {
    id: 2029,
    chapter: 'level1',
    type: 'output',
    title: 'uint16_t乘法溢出',
    description: '缓冲区大小计算',
    code: `#include <stdio.h>
#include <stdint.h>

#define ITEM_SIZE  100

int main(void)
{
    uint16_t count = 700;
    uint16_t total_size = count * ITEM_SIZE;

    printf("Count: %u\\n", count);
    printf("Total size: %u\\n", total_size);

    return 0;
}`,
    correctOutput: 'Count: 700\nTotal size: 4464',
    explanation: '700*100=70000，但uint16_t最大65535。70000%65536=4464。计算缓冲区大小时要注意溢出！',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['uint16_t', '乘法溢出'],
    visualization: { type: 'html', file: 'visualizations-v2/uint16-multiply-overflow.html' },
  },
  {
    id: 2030,
    chapter: 'level1',
    type: 'output',
    title: '条件判断-错误码处理',
    description: '设备初始化错误处理',
    code: `#include <stdio.h>
#include <stdint.h>

#define ERR_TIMEOUT   (-1)
#define ERR_BUSY      (-2)
#define SUCCESS       0

int main(void)
{
    int8_t device_status = ERR_BUSY;

    if (device_status == SUCCESS) {
        printf("Device ready\\n");
    } else if (device_status == ERR_TIMEOUT) {
        printf("Error: Timeout\\n");
    } else if (device_status == ERR_BUSY) {
        printf("Error: Device busy\\n");
    } else {
        printf("Error: Unknown\\n");
    }

    return 0;
}`,
    correctOutput: 'Error: Device busy',
    explanation: '错误码处理是嵌入式开发基本功。用宏定义错误码，if-else判断状态。先处理错误情况是常见规范。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['if-else', '错误码', '宏定义'],
    visualization: { type: 'html', file: 'visualizations-v2/error-code-handling.html' },
  },
  {
    id: 2031,
    chapter: 'level1',
    type: 'output',
    title: '条件判断-逻辑运算符',
    description: '传感器数据有效性检查',
    code: `#include <stdio.h>
#include <stdint.h>

#define TEMP_MIN  (-40)
#define TEMP_MAX  85

int main(void)
{
    int16_t temp1 = 25;
    int16_t temp2 = -50;
    int16_t temp3 = 60;

    if (temp1 >= TEMP_MIN && temp1 <= TEMP_MAX) {
        printf("temp1 valid\\n");
    }
    if (temp2 >= TEMP_MIN && temp2 <= TEMP_MAX) {
        printf("temp2 valid\\n");
    }
    if (temp3 >= TEMP_MIN && temp3 <= TEMP_MAX) {
        printf("temp3 valid\\n");
    }

    return 0;
}`,
    correctOutput: 'temp1 valid\ntemp3 valid',
    explanation: '&&是逻辑与，两个条件都为真才为真。temp2=-50超出-40~85范围，所以不打印。数据有效性检查常用模式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['if', '&&', '范围检查'],
    visualization: { type: 'html', file: 'visualizations-v2/logical-operator-condition.html' },
  },
  {
    id: 2032,
    chapter: 'level1',
    type: 'output',
    title: 'switch-case状态机',
    description: '设备状态切换',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    STATE_IDLE = 0,
    STATE_RUNNING = 1,
    STATE_ERROR = 2
} DeviceState;

int main(void)
{
    DeviceState state = STATE_RUNNING;

    switch (state) {
        case STATE_IDLE:
            printf("Device idle\\n");
            break;
        case STATE_RUNNING:
            printf("Device running\\n");
            break;
        case STATE_ERROR:
            printf("Device error\\n");
            break;
        default:
            printf("Unknown state\\n");
            break;
    }

    return 0;
}`,
    correctOutput: 'Device running',
    explanation: 'switch-case用于状态机实现。每个case后要break，否则会继续执行下一个case。default处理未知状态。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['switch-case', '状态机', 'enum'],
    visualization: { type: 'html', file: 'visualizations-v2/switch-case-state-machine.html' },
  },
  {
    id: 2033,
    chapter: 'level1',
    type: 'output',
    title: 'for循环-数组遍历',
    description: '传感器数据采集',
    code: `#include <stdio.h>
#include <stdint.h>

#define SENSOR_COUNT  4

int main(void)
{
    uint16_t sensor_values[SENSOR_COUNT] = {100, 200, 150, 180};
    uint32_t sum = 0;

    for (uint8_t i = 0; i < SENSOR_COUNT; i++) {
        sum += sensor_values[i];
    }

    uint16_t average = sum / SENSOR_COUNT;
    printf("Sum: %u\\n", sum);
    printf("Average: %u\\n", average);

    return 0;
}`,
    correctOutput: 'Sum: 630\nAverage: 157',
    explanation: 'for循环遍历数组，i从0到SENSOR_COUNT-1。sum累加，最后计算平均值。注意整数除法会截断。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['for循环', '数组遍历', '整数除法'],
    visualization: { type: 'html', file: 'visualizations-v2/for-loop-array-sum.html' },
  },
  {
    id: 2034,
    chapter: 'level1',
    type: 'output',
    title: 'while循环-超时等待',
    description: '设备就绪等待',
    code: `#include <stdio.h>
#include <stdint.h>

#define MAX_WAIT  5

int main(void)
{
    uint8_t ready = 0;
    uint8_t timeout_count = 0;

    while (!ready && timeout_count < MAX_WAIT) {
        timeout_count++;
        if (timeout_count == 3) {
            ready = 1;
        }
    }

    if (ready) {
        printf("Device ready after %u checks\\n", timeout_count);
    } else {
        printf("Timeout\\n");
    }

    return 0;
}`,
    correctOutput: 'Device ready after 3 checks',
    explanation: 'while循环用于等待条件满足。!ready表示未就绪，timeout_count限制最大等待次数。模拟设备就绪等待。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['while循环', '超时处理', '条件等待'],
    visualization: { type: 'html', file: 'visualizations-v2/while-timeout-wait.html' },
  },
  {
    id: 2035,
    chapter: 'level1',
    type: 'output',
    title: '函数返回值-错误处理',
    description: '设备初始化函数',
    code: `#include <stdio.h>
#include <stdint.h>

#define ERR_NULL_PTR  (-1)
#define ERR_INVALID   (-2)
#define SUCCESS       0

int8_t device_init(uint8_t *config)
{
    if (config == NULL) {
        return ERR_NULL_PTR;
    }
    if (*config > 100) {
        return ERR_INVALID;
    }
    return SUCCESS;
}

int main(void)
{
    uint8_t config1 = 50;
    uint8_t config2 = 150;
    uint8_t *config3 = NULL;

    printf("Init1: %d\\n", device_init(&config1));
    printf("Init2: %d\\n", device_init(&config2));
    printf("Init3: %d\\n", device_init(config3));

    return 0;
}`,
    correctOutput: 'Init1: 0\nInit2: -2\nInit3: -1',
    explanation: '函数返回0表示成功，负数表示错误码。先检查空指针，再检查参数有效性。这是嵌入式函数设计规范。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数返回值', '错误处理', '空指针检查'],
    visualization: { type: 'html', file: 'visualizations-v2/device-init-error-handling.html' },
  },
  {
    id: 2036,
    chapter: 'level1',
    type: 'output',
    title: '函数参数-值传递',
    description: '传感器校准函数',
    code: `#include <stdio.h>
#include <stdint.h>

void calibrate_sensor(uint16_t value)
{
    value = value + 10;
    printf("Inside: %u\\n", value);
}

int main(void)
{
    uint16_t sensor_value = 100;

    calibrate_sensor(sensor_value);
    printf("Outside: %u\\n", sensor_value);

    return 0;
}`,
    correctOutput: 'Inside: 110\nOutside: 100',
    explanation: 'C语言函数参数是值传递，函数内修改不影响原变量。要修改原值需要传指针。这是常见面试题！',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数参数', '值传递'],
    visualization: { type: 'html', file: 'visualizations-v2/calibrate-sensor-pass-by-value.html' },
      },
  {
    id: 2037,
    chapter: 'level1',
    type: 'output',
    title: '函数参数-指针传递',
    description: '通过指针修改原值',
    code: `#include <stdio.h>
#include <stdint.h>

void calibrate_sensor(uint16_t *value)
{
    *value = *value + 10;
}

int main(void)
{
    uint16_t sensor_value = 100;

    calibrate_sensor(&sensor_value);
    printf("Calibrated: %u\\n", sensor_value);

    return 0;
}`,
    correctOutput: 'Calibrated: 110',
    explanation: '传指针可以在函数内修改原变量。*value解引用获取值，&sensor_value取地址。嵌入式常用模式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针参数', '解引用', '取地址'],
    visualization: { type: 'html', file: 'visualizations-v2/function-pass-by-pointer.html' },
      },
  {
    id: 2038,
    chapter: 'level1',
    type: 'output',
    title: '数组访问-越界危险',
    description: '缓冲区边界检查',
    code: `#include <stdio.h>
#include <stdint.h>

#define BUF_SIZE  4

int main(void)
{
    uint8_t buffer[BUF_SIZE] = {10, 20, 30, 40};
    uint8_t index = 2;

    printf("buffer[%u] = %u\\n", index, buffer[index]);
    index = 4;
    printf("buffer[%u] = %u\\n", index, buffer[index]);

    return 0;
}`,
    correctOutput: 'buffer[2] = 30\nbuffer[4] = ',
    explanation: 'buffer[4]越界访问！数组下标0~BUF_SIZE-1。越界访问是未定义行为，可能导致程序崩溃或数据损坏。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组', '越界访问', '未定义行为'],
    visualization: { type: 'html', file: 'visualizations-v2/array-out-of-bounds.html' },
      },
  {
    id: 2039,
    chapter: 'level1',
    type: 'output',
    title: '宏定义-常量替换',
    description: '配置参数宏',
    code: `#include <stdio.h>
#include <stdint.h>

#define BUFFER_SIZE   256
#define MAX_DEVICES   8
#define DEVICE_NAME   "Sensor"

int main(void)
{
    uint8_t devices[MAX_DEVICES];
    uint16_t buffer[BUFFER_SIZE];

    printf("Buffer size: %u\\n", BUFFER_SIZE);
    printf("Max devices: %u\\n", MAX_DEVICES);
    printf("Device: %s\\n", DEVICE_NAME);

    return 0;
}`,
    correctOutput: 'Buffer size: 256\nMax devices: 8\nDevice: Sensor',
    explanation: '#define定义常量，编译时替换。比const更早，可用于数组大小、条件编译。嵌入式常用方式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['#define', '宏定义', '常量'],
    visualization: { type: 'html', file: 'visualizations-v2/macro-definition.html' },
      },
  {
    id: 2040,
    chapter: 'level1',
    type: 'output',
    title: '宏函数-位操作',
    description: '寄存器位操作宏',
    code: `#include <stdio.h>
#include <stdint.h>

#define BIT(n)        (1U << (n))
#define SET_BIT(x, n)  ((x) |= BIT(n))
#define CLR_BIT(x, n)  ((x) &= ~BIT(n))

int main(void)
{
    uint8_t reg = 0x00;

    SET_BIT(reg, 2);
    SET_BIT(reg, 5);
    printf("After set: 0x%02X\\n", reg);

    CLR_BIT(reg, 2);
    printf("After clear: 0x%02X\\n", reg);

    return 0;
}`,
    correctOutput: 'After set: 0x24\nAfter clear: 0x20',
    explanation: 'BIT(2)=0x04, BIT(5)=0x20, 合计0x24。CLR_BIT清除第2位后剩0x20。位操作宏是嵌入式必备！',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['宏函数', '位操作', '寄存器'],
    visualization: { type: 'html', file: 'visualizations-v2/macro-bit-operation.html' },
      },
  {
    id: 2041,
    chapter: 'level1',
    type: 'output',
    title: '位运算-按位与清零',
    description: '寄存器位清除',
    code: `#include <stdio.h>
#include <stdint.h>

#define GPIO_PIN_MASK  0x0F

int main(void)
{
    uint8_t gpio_data = 0xAB;
    uint8_t result = gpio_data & GPIO_PIN_MASK;

    printf("Original: 0x%02X\\n", gpio_data);
    printf("After AND: 0x%02X\\n", result);

    return 0;
}`,
    correctOutput: 'Original: 0xAB\nAfter AND: 0x0B',
    explanation: '按位与&：两位都为1才为1。0xAB & 0x0F = 0x0B，清除高4位。用于读取寄存器特定位。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位运算', '按位与', '掩码'],
    visualization: { type: 'html', file: 'visualizations-v2/bitwise-and-mask.html' },
      },
  {
    id: 2042,
    chapter: 'level1',
    type: 'output',
    title: '位运算-按位或置位',
    description: '寄存器位置位',
    code: `#include <stdio.h>
#include <stdint.h>

#define ENABLE_BITS  0x30

int main(void)
{
    uint8_t config = 0x05;
    uint8_t result = config | ENABLE_BITS;

    printf("Before: 0x%02X\\n", config);
    printf("After OR: 0x%02X\\n", result);

    return 0;
}`,
    correctOutput: 'Before: 0x05\nAfter OR: 0x35',
    explanation: '按位或|：有一位为1就为1。0x05 | 0x30 = 0x35，设置第4、5位。用于配置寄存器位。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位运算', '按位或', '置位'],
    visualization: { type: 'html', file: 'visualizations-v2/bitwise-or-set.html' },
      },
  {
    id: 2043,
    chapter: 'level1',
    type: 'output',
    title: '位运算-按位异或翻转',
    description: '位翻转操作',
    code: `#include <stdio.h>
#include <stdint.h>

#define TOGGLE_BITS  0x0F

int main(void)
{
    uint8_t data = 0xAA;
    uint8_t result = data ^ TOGGLE_BITS;

    printf("Before: 0x%02X\\n", data);
    printf("After XOR: 0x%02X\\n", result);

    return 0;
}`,
    correctOutput: 'Before: 0xAA\nAfter XOR: 0xA5',
    explanation: '按位异或^：相同为0，不同为1。0xAA ^ 0x0F = 0xA5，翻转低4位。用于LED闪烁、状态切换。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位运算', '按位异或', '翻转'],
    visualization: { type: 'html', file: 'visualizations-v2/bitwise-xor-toggle.html' },
      },
  {
    id: 2044,
    chapter: 'level1',
    type: 'output',
    title: '位运算-左移乘法',
    description: '快速乘法',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t value = 5;

    printf("value << 1 = %u\\n", value << 1);
    printf("value << 2 = %u\\n", value << 2);
    printf("value << 3 = %u\\n", value << 3);

    return 0;
}`,
    correctOutput: 'value << 1 = 10\nvalue << 2 = 20\nvalue << 3 = 40',
    explanation: '左移n位相当于乘以2^n。5<<1=10, 5<<2=20, 5<<3=40。比乘法更快，嵌入式常用。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位运算', '左移', '乘法'],
    visualization: { type: 'html', file: 'visualizations-v2/left-shift-multiplication.html' },
      },
  {
    id: 2045,
    chapter: 'level1',
    type: 'output',
    title: '位运算-右移除法',
    description: '快速除法',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint16_t value = 100;

    printf("value >> 1 = %u\\n", value >> 1);
    printf("value >> 2 = %u\\n", value >> 2);
    printf("value >> 3 = %u\\n", value >> 3);

    return 0;
}`,
    correctOutput: 'value >> 1 = 50\nvalue >> 2 = 25\nvalue >> 3 = 12',
    explanation: '右移n位相当于除以2^n（向下取整）。100>>1=50, 100>>2=25, 100>>3=12。比除法更快。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位运算', '右移', '除法'],
    visualization: { type: 'html', file: 'visualizations-v2/right-shift-division.html' },
      },
  {
    id: 2046,
    chapter: 'level1',
    type: 'output',
    title: '字符串-strlen求长度',
    description: '字符串长度计算',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char device_name[] = "Sensor";
    char empty[] = "";

    printf("Device name len: %zu\\n", strlen(device_name));
    printf("Empty string len: %zu\\n", strlen(empty));

    return 0;
}`,
    correctOutput: 'Device name len: 6\nEmpty string len: 0',
    explanation: 'strlen返回字符串长度（不含\\0）。"Sensor"有6个字符，空字符串长度为0。注意sizeof包含\\0。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strlen', '字符串长度'],
    visualization: { type: 'html', file: 'visualizations-v2/strlen-demo.html' },
      },
  {
    id: 2047,
    chapter: 'level1',
    type: 'output',
    title: '字符串-字符数组初始化',
    description: '字符串存储方式',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char str1[] = "ABC";
    char str2[] = {'A', 'B', 'C', '\\0'};

    printf("str1: %s\\n", str1);
    printf("str2: %s\\n", str2);
    printf("str1 size: %zu\\n", sizeof(str1));
    printf("str2 size: %zu\\n", sizeof(str2));

    return 0;
}`,
    correctOutput: 'str1: ABC\nstr2: ABC\nstr1 size: 4\nstr2 size: 4',
    explanation: '"ABC"自动添加\\0，所以sizeof是4。手动初始化需要显式添加\\0。两种方式等效。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['字符数组', '字符串初始化', 'sizeof'],
    visualization: { type: 'html', file: 'visualizations-v2/string-array-init.html' },
      },
  {
    id: 2048,
    chapter: 'level1',
    type: 'output',
    title: '作用域-局部变量',
    description: '变量作用域基础',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t value = 10;

    {
        uint8_t value = 20;
        printf("Inner: %u\\n", value);
    }

    printf("Outer: %u\\n", value);

    return 0;
}`,
    correctOutput: 'Inner: 20\nOuter: 10',
    explanation: '内部代码块可以定义同名变量，遮蔽外部变量。离开内部代码块后，外部变量恢复。这是作用域规则。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['作用域', '局部变量', '遮蔽'],
    visualization: { type: 'html', file: 'visualizations-v2/scope-shadowing.html' },
      },
  {
    id: 2049,
    chapter: 'level1',
    type: 'output',
    title: '作用域-全局与局部',
    description: '全局变量和局部变量',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t counter = 100;

void increment(void)
{
    counter++;
}

int main(void)
{
    printf("Before: %u\\n", counter);
    increment();
    printf("After: %u\\n", counter);

    return 0;
}`,
    correctOutput: 'Before: 100\nAfter: 101',
    explanation: '全局变量在所有函数外定义，所有函数都可以访问和修改。increment函数修改了全局counter。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['全局变量', '作用域'],
    visualization: { type: 'html', file: 'visualizations-v2/global-vs-local.html' },
      },
  {
    id: 2050,
    chapter: 'level1',
    type: 'output',
    title: 'static局部变量',
    description: '静态局部变量生命周期',
    code: `#include <stdio.h>
#include <stdint.h>

void count_calls(void)
{
    static uint8_t calls = 0;
    calls++;
    printf("Calls: %u\\n", calls);
}

int main(void)
{
    count_calls();
    count_calls();
    count_calls();

    return 0;
}`,
    correctOutput: 'Calls: 1\nCalls: 2\nCalls: 3',
    explanation: 'static局部变量只初始化一次，值在函数调用间保持。每次调用count_calls，calls递增。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['static', '局部变量', '生命周期'],
    visualization: { type: 'html', file: 'visualizations-v2/static-local-var.html' },
      },
  {
    id: 2051,
    chapter: 'level1',
    type: 'output',
    title: '运算符优先级',
    description: '复杂表达式求值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 2, b = 3, c = 4;

    uint8_t result1 = a + b * c;
    uint8_t result2 = (a + b) * c;
    uint8_t result3 = a << 1 + b;

    printf("a + b * c = %u\\n", result1);
    printf("(a + b) * c = %u\\n", result2);
    printf("a << 1 + b = %u\\n", result3);

    return 0;
}`,
    correctOutput: 'a + b * c = 14\n(a + b) * c = 20\na << 1 + b = 16',
    explanation: '*优先级高于+，所以a+b*c=2+12=14。<<优先级低于+，所以a<<1+b=a<<4=32。建议用括号明确！',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['运算符优先级', '表达式求值'],
    visualization: { type: 'html', file: 'visualizations-v2/operator-precedence.html' },
      },
  {
    id: 2052,
    chapter: 'level1',
    type: 'output',
    title: '自增运算符前缀后缀',
    description: '++i和i++的区别',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t i = 5;
    uint8_t a, b;

    a = i++;
    printf("a = %u, i = %u\\n", a, i);

    i = 5;
    b = ++i;
    printf("b = %u, i = %u\\n", b, i);

    return 0;
}`,
    correctOutput: 'a = 5, i = 6\nb = 6, i = 6',
    explanation: 'i++先使用后自增，所以a=5然后i=6。++i先自增后使用，所以i=6然后b=6。面试必考！',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['自增运算符', '前缀', '后缀'],
    visualization: { type: 'html', file: 'visualizations-v2/increment-operator.html' },
      },
  {
    id: 2053,
    chapter: 'level1',
    type: 'output',
    title: '复合赋值运算符',
    description: '+= -= *=等运算符',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint16_t value = 100;

    value += 50;
    printf("After += : %u\\n", value);

    value -= 30;
    printf("After -= : %u\\n", value);

    value *= 2;
    printf("After *= : %u\\n", value);

    value /= 7;
    printf("After /= : %u\\n", value);

    return 0;
}`,
    correctOutput: 'After += : 150\nAfter -= : 120\nAfter *= : 240\nAfter /= : 34',
    explanation: '复合赋值运算符：a+=b等价于a=a+b。value: 100→150→120→240→34（整数除法截断）。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['复合赋值运算符', '+=', '-='],
    visualization: { type: 'html', file: 'visualizations-v2/compound-assignment.html' },
      },
  {
    id: 2054,
    chapter: 'level1',
    type: 'output',
    title: '三目运算符',
    description: '条件表达式',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int16_t temp = -5;
    const char *status = (temp < 0) ? "Cold" : "Warm";

    printf("Temperature: %d, Status: %s\\n", temp, status);

    uint8_t a = 10, b = 20;
    uint8_t max = (a > b) ? a : b;
    printf("Max: %u\\n", max);

    return 0;
}`,
    correctOutput: 'Temperature: -5, Status: Cold\nMax: 20',
    explanation: '三目运算符：条件 ? 真值 : 假值。temp<0为真，所以status="Cold"。max取a和b中较大值。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['三目运算符', '条件表达式'],
    visualization: { type: 'html', file: 'visualizations-v2/ternary-operator.html' },
      },
  {
    id: 2055,
    chapter: 'level1',
    type: 'output',
    title: '逗号运算符',
    description: '逗号表达式求值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 1, b = 2, c = 3;
    uint8_t result;

    result = (a++, b++, c++);
    printf("result: %u\\n", result);
    printf("a=%u, b=%u, c=%u\\n", a, b, c);

    return 0;
}`,
    correctOutput: 'result: 3\na=2, b=3, c=4',
    explanation: '逗号表达式从左到右求值，返回最后一个值。所以result=c++=3，然后a,b,c都自增变为2,3,4。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['逗号运算符', '表达式求值'],
    visualization: { type: 'html', file: 'visualizations-v2/comma-operator.html' },
      },
  {
    id: 2056,
    chapter: 'level1',
    type: 'output',
    title: 'sizeof运算符',
    description: '数据类型大小',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    printf("uint8_t:  %zu\\n", sizeof(uint8_t));
    printf("uint16_t: %zu\\n", sizeof(uint16_t));
    printf("uint32_t: %zu\\n", sizeof(uint32_t));
    printf("uint64_t: %zu\\n", sizeof(uint64_t));
    printf("char:     %zu\\n", sizeof(char));

    return 0;
}`,
    correctOutput: 'uint8_t:  1\nuint16_t: 2\nuint32_t: 4\nuint64_t: 8\nchar:     1',
    explanation: 'sizeof返回类型或变量的字节数。uint8_t=1字节，uint16_t=2字节，uint32_t=4字节，uint64_t=8字节。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['sizeof', '数据类型大小'],
    visualization: { type: 'html', file: 'visualizations-v2/sizeof-operator.html' },
      },
  {
    id: 2057,
    chapter: 'level1',
    type: 'output',
    title: 'sizeof数组',
    description: '数组大小计算',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[10] = {0};
    uint16_t values[5] = {1, 2, 3, 4, 5};

    printf("data size: %zu\\n", sizeof(data));
    printf("values size: %zu\\n", sizeof(values));
    printf("data count: %zu\\n", sizeof(data) / sizeof(data[0]));
    printf("values count: %zu\\n", sizeof(values) / sizeof(values[0]));

    return 0;
}`,
    correctOutput: 'data size: 10\nvalues size: 10\ndata count: 10\nvalues count: 5',
    explanation: 'sizeof(数组)返回总字节数。data[10]是10字节，values[5]是5*2=10字节。元素个数=总大小/元素大小。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['sizeof', '数组', '元素个数'],
    visualization: { type: 'html', file: 'visualizations-v2/sizeof-array.html' },
      },
  {
    id: 2058,
    chapter: 'level1',
    type: 'output',
    title: '条件编译#ifdef',
    description: '调试开关',
    code: `#include <stdio.h>
#include <stdint.h>

#define DEBUG 1

int main(void)
{
    uint8_t sensor_value = 42;

#ifdef DEBUG
    printf("[DEBUG] sensor_value = %u\\n", sensor_value);
#endif

    printf("Sensor: %u\\n", sensor_value);

    return 0;
}`,
    correctOutput: '[DEBUG] sensor_value = 42\nSensor: 42',
    explanation: '#ifdef DEBUG检查DEBUG是否定义。如果定义了，编译中间的代码；否则跳过。用于调试开关。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['#ifdef', '条件编译', 'DEBUG'],
    visualization: { type: 'html', file: 'visualizations-v2/conditional-compilation.html' },
      },
  {
    id: 2059,
    chapter: 'level1',
    type: 'output',
    title: '条件编译#ifndef',
    description: '头文件保护',
    code: `#include <stdio.h>
#include <stdint.h>

#ifndef MAX_SIZE
#define MAX_SIZE 100
#endif

int main(void)
{
    printf("MAX_SIZE = %d\\n", MAX_SIZE);

    return 0;
}`,
    correctOutput: 'MAX_SIZE = 100',
    explanation: '#ifndef检查宏是否未定义。如果未定义，则定义它。用于头文件保护和默认值设置。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['#ifndef', '条件编译', '宏定义'],
    visualization: { type: 'html', file: 'visualizations-v2/ifndef-directive.html' },
      },
  {
    id: 2060,
    chapter: 'level1',
    type: 'output',
    title: '枚举类型',
    description: '状态码定义',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    STATUS_OK = 0,
    STATUS_ERROR = -1,
    STATUS_BUSY = -2,
    STATUS_TIMEOUT = -3
} Status;

int main(void)
{
    Status result = STATUS_BUSY;

    printf("Status: %d\\n", result);
    printf("OK: %d, Error: %d\\n", STATUS_OK, STATUS_ERROR);

    return 0;
}`,
    correctOutput: 'Status: -2\nOK: 0, Error: -1',
    explanation: 'enum定义枚举类型，自动分配整数值（或显式指定）。STATUS_BUSY=-2。比宏定义更有类型安全性。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['enum', '枚举', '状态码'],
    visualization: { type: 'html', file: 'visualizations-v2/enum-type.html' },
      },
  {
    id: 2061,
    chapter: 'level1',
    type: 'output',
    title: '数组初始化-部分初始化',
    description: '数组部分元素初始化',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[5] = {1, 2};
    uint8_t zeros[5] = {0};

    printf("data: ");
    for (uint8_t i = 0; i < 5; i++) {
        printf("%u ", data[i]);
    }
    printf("\\n");

    printf("zeros: ");
    for (uint8_t i = 0; i < 5; i++) {
        printf("%u ", zeros[i]);
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: 'data: 1 2 0 0 0 \nzeros: 0 0 0 0 0 ',
    explanation: '数组部分初始化时，未指定的元素自动初始化为0。{1,2}后面三个元素为0，{0}全部为0。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组初始化', '部分初始化'],
    visualization: { type: 'html', file: 'visualizations-v2/array-partial-init.html' },
      },
  {
    id: 2062,
    chapter: 'level1',
    type: 'output',
    title: '数组作为函数参数',
    description: '数组传递给函数',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t get_sum(uint8_t arr[], uint8_t len)
{
    uint8_t sum = 0;
    for (uint8_t i = 0; i < len; i++) {
        sum += arr[i];
    }
    return sum;
}

int main(void)
{
    uint8_t data[4] = {10, 20, 30, 40};
    printf("Sum: %u\\n", get_sum(data, 4));
    return 0;
}`,
    correctOutput: 'Sum: 100',
    explanation: '数组作为函数参数时退化为指针，需要额外传递长度。函数内无法用sizeof获取数组大小。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组参数', '函数传递'],
    visualization: { type: 'html', file: 'visualizations-v2/array-as-parameter.html' },
      },
  {
    id: 2063,
    chapter: 'level1',
    type: 'output',
    title: '二维数组访问',
    description: '矩阵数据访问',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };

    printf("matrix[0][0] = %u\\n", matrix[0][0]);
    printf("matrix[1][2] = %u\\n", matrix[1][2]);
    printf("Row 0 sum: %u\\n", matrix[0][0] + matrix[0][1] + matrix[0][2]);

    return 0;
}`,
    correctOutput: 'matrix[0][0] = 1\nmatrix[1][2] = 6\nRow 0 sum: 6',
    explanation: '二维数组matrix[行][列]。matrix[0][0]是第一行第一列=1，matrix[1][2]是第二行第三列=6。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二维数组', '矩阵'],
    visualization: { type: 'html', file: 'visualizations-v2/2d-array-access.html' },
      },
  {
    id: 2064,
    chapter: 'level1',
    type: 'output',
    title: 'do-while循环',
    description: '至少执行一次的循环',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t count = 5;

    do {
        printf("Count: %u\\n", count);
        count--;
    } while (count > 3);

    return 0;
}`,
    correctOutput: 'Count: 5\nCount: 4',
    explanation: 'do-while先执行后判断，至少执行一次。count=5打印，然后4打印，然后count=3不满足>3，退出。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['do-while', '循环'],
    visualization: { type: 'html', file: 'visualizations-v2/do-while-loop.html' },
      },
  {
    id: 2065,
    chapter: 'level1',
    type: 'output',
    title: '嵌套循环',
    description: '多层循环嵌套',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    for (uint8_t i = 1; i <= 3; i++) {
        for (uint8_t j = 1; j <= 2; j++) {
            printf("(%u,%u) ", i, j);
        }
        printf("\\n");
    }
    return 0;
}`,
    correctOutput: '(1,1) (1,2) \n(2,1) (2,2) \n(3,1) (3,2) ',
    explanation: '外层循环i从1到3，内层循环j从1到2。每次外层循环执行完整的内层循环。常用于二维数据处理。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['嵌套循环', 'for循环'],
    visualization: { type: 'html', file: 'visualizations-v2/nested-loop.html' },
      },
  {
    id: 2066,
    chapter: 'level1',
    type: 'output',
    title: '函数声明和定义',
    description: '函数先声明后定义',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t double_value(uint8_t x);

int main(void)
{
    uint8_t result = double_value(5);
    printf("Result: %u\\n", result);
    return 0;
}

uint8_t double_value(uint8_t x)
{
    return x * 2;
}`,
    correctOutput: 'Result: 10',
    explanation: '函数可以先声明（告诉编译器存在），后定义（实现）。声明在main前，定义在main后。这是常见组织方式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数声明', '函数定义'],
    visualization: { type: 'html', file: 'visualizations-v2/function-declaration.html' },
      },
  {
    id: 2067,
    chapter: 'level1',
    type: 'output',
    title: '函数默认返回值',
    description: '省略返回类型的函数',
    code: `#include <stdio.h>
#include <stdint.h>

void print_hello(void)
{
    printf("Hello\\n");
}

int main(void)
{
    print_hello();
    print_hello();
    return 0;
}`,
    correctOutput: 'Hello\nHello',
    explanation: 'void表示函数无返回值。调用时不需要接收返回值。void参数表示无参数（C中可省略void）。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['void', '无返回值函数'],
    visualization: { type: 'html', file: 'visualizations-v2/void-function.html' },
      },
  {
    id: 2068,
    chapter: 'level1',
    type: 'output',
    title: '宏定义-带参数宏',
    description: '宏函数定义',
    code: `#include <stdio.h>
#include <stdint.h>

#define MAX(a, b)  ((a) > (b) ? (a) : (b))
#define SQUARE(x)  ((x) * (x))

int main(void)
{
    printf("MAX(3, 5) = %u\\n", MAX(3, 5));
    printf("SQUARE(4) = %u\\n", SQUARE(4));
    printf("MAX(10, 10) = %u\\n", MAX(10, 10));

    return 0;
}`,
    correctOutput: 'MAX(3, 5) = 5\nSQUARE(4) = 16\nMAX(10, 10) = 10',
    explanation: '带参数宏在编译时文本替换。MAX用三目运算符实现，SQUARE计算平方。注意括号防止优先级问题。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['宏函数', '#define', '参数宏'],
    visualization: { type: 'html', file: 'visualizations-v2/macro-with-params.html' },
      },
  {
    id: 2069,
    chapter: 'level1',
    type: 'output',
    title: '宏定义-多行宏',
    description: '多行宏定义',
    code: `#include <stdio.h>
#include <stdint.h>

#define SWAP(a, b, type)  do { \\
    type temp = a; \\
    a = b; \\
    b = temp; \\
} while(0)

int main(void)
{
    uint8_t x = 10, y = 20;
    printf("Before: x=%u, y=%u\\n", x, y);
    SWAP(x, y, uint8_t);
    printf("After: x=%u, y=%u\\n", x, y);
    return 0;
}`,
    correctOutput: 'Before: x=10, y=20\nAfter: x=20, y=10',
    explanation: '多行宏用反斜杠\\续行。do{...}while(0)确保宏作为单个语句使用。SWAP宏交换两个变量值。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['多行宏', 'do-while(0)', 'SWAP'],
    visualization: { type: 'html', file: 'visualizations-v2/macro-multi-line.html' },
      },
  {
    id: 2070,
    chapter: 'level1',
    type: 'output',
    title: '字符串-字符遍历',
    description: '遍历字符串字符',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char str[] = "ABC";
    uint8_t i = 0;

    while (str[i] != '\\0') {
        printf("char %u: %c\\n", i, str[i]);
        i++;
    }

    return 0;
}`,
    correctOutput: 'char 0: A\nchar 1: B\nchar 2: C',
    explanation: '字符串以\\0结尾。遍历时检查str[i]!=\\0。这是C语言处理字符串的基本方式。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['字符串', '遍历', '\\0'],
    visualization: { type: 'html', file: 'visualizations-v2/string-traversal.html' },
      },
  {
    id: 2071,
    chapter: 'level1',
    type: 'output',
    title: '字符串-ASCII值',
    description: '字符的ASCII码值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char ch = 'A';

    printf("Character: %c\\n", ch);
    printf("ASCII value: %d\\n", ch);
    printf("Next char: %c\\n", ch + 1);
    printf("'0' - '0' = %d\\n", '0' - '0');
    printf("'9' - '0' = %d\\n", '9' - '0');

    return 0;
}`,
    correctOutput: 'Character: A\nASCII value: 65\nNext char: B\n\'0\' - \'0\' = 0\n\'9\' - \'0\' = 9',
    explanation: '字符本质是整数（ASCII码）。A=65，A+1=B。数字字符减去\'0\'得到数字值，这是常用技巧。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['ASCII', '字符运算'],
    visualization: { type: 'html', file: 'visualizations-v2/ascii-value.html' },
      },
  {
    id: 2072,
    chapter: 'level1',
    type: 'output',
    title: '字符串-大小写转换',
    description: 'ASCII大小写转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char lower = 'a';
    char upper = 'Z';

    printf("lower to upper: %c\\n", lower - 32);
    printf("upper to lower: %c\\n", upper + 32);
    printf("'a' - 'A' = %d\\n", 'a' - 'A');

    return 0;
}`,
    correctOutput: 'lower to upper: A\nupper to lower: z\n\'a\' - \'A\' = 32',
    explanation: '大小写字母ASCII相差32。小写-32变大写，大写+32变小写。\'a\'-\'A\'=32验证这一点。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['ASCII', '大小写转换'],
    visualization: { type: 'html', file: 'visualizations-v2/case-conversion.html' },
      },
  {
    id: 2073,
    chapter: 'level1',
    type: 'output',
    title: '作用域-变量生命周期',
    description: '局部变量自动释放',
    code: `#include <stdio.h>
#include <stdint.h>

void test_func(void)
{
    uint8_t local = 100;
    printf("local in func: %u\\n", local);
}

int main(void)
{
    test_func();
    printf("After func call\\n");
    return 0;
}`,
    correctOutput: 'local in func: 100\nAfter func call',
    explanation: '局部变量在函数调用时创建，函数返回时销毁。离开函数后，local变量不再存在。这是栈内存管理。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['局部变量', '生命周期', '栈'],
    visualization: { type: 'html', file: 'visualizations-v2/variable-lifecycle.html' },
      },
  {
    id: 2074,
    chapter: 'level1',
    type: 'output',
    title: 'const修饰符',
    description: '常量变量',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    const uint8_t max_value = 100;

    printf("max_value = %u\\n", max_value);
    printf("max_value + 10 = %u\\n", max_value + 10);

    return 0;
}`,
    correctOutput: 'max_value = 100\nmax_value + 10 = 100',
    explanation: 'const修饰的变量不能修改。max_value是只读的。用于定义常量，比宏定义有类型检查。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['const', '常量'],
    visualization: { type: 'html', file: 'visualizations-v2/const-modifier.html' },
      },
  {
    id: 2075,
    chapter: 'level1',
    type: 'output',
    title: 'volatile关键字',
    description: '防止编译器优化',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    volatile uint8_t hw_reg = 0x55;

    printf("Register: 0x%02X\\n", hw_reg);
    hw_reg = 0xAA;
    printf("Updated: 0x%02X\\n", hw_reg);

    return 0;
}`,
    correctOutput: 'Register: 0x55\nUpdated: 0xAA',
    explanation: 'volatile告诉编译器不要优化该变量，每次都从内存读取。用于硬件寄存器、多线程共享变量。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['volatile', '编译器优化', '硬件寄存器'],
    visualization: { type: 'html', file: 'visualizations-v2/volatile-keyword.html' },
      },
  {
    id: 2076,
    chapter: 'level1',
    type: 'output',
    title: '类型转换-隐式转换',
    description: '自动类型转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 100;
    uint16_t b = 1000;
    uint32_t result = a + b;

    printf("a + b = %u\\n", result);
    printf("sizeof(a+b) = %zu\\n", sizeof(a + b));

    return 0;
}`,
    correctOutput: 'a + b = 1100\nsizeof(a+b) = 4',
    explanation: '不同类型运算时，小类型自动提升到大类型。uint8_t+uint16_t会提升到int（通常4字节）。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['类型转换', '隐式转换', '类型提升'],
    visualization: { type: 'html', file: 'visualizations-v2/implicit-cast.html' },
      },
  {
    id: 2077,
    chapter: 'level1',
    type: 'output',
    title: '类型转换-显式转换',
    description: '强制类型转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint16_t value = 300;
    uint8_t truncated = (uint8_t)value;

    printf("Original: %u\\n", value);
    printf("Truncated: %u\\n", truncated);
    printf("300 mod 256 = %u\\n", 300 % 256);

    return 0;
}`,
    correctOutput: 'Original: 300\nTruncated: 44\n300 mod 256 = 44',
    explanation: '强制类型转换可能丢失数据。uint16_t(300)转uint8_t截断为44（300%256=44）。要小心数据丢失！',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['类型转换', '强制转换', '截断'],
    visualization: { type: 'html', file: 'visualizations-v2/explicit-cast.html' },
      },
  {
    id: 2078,
    chapter: 'level1',
    type: 'output',
    title: '位域bit-field',
    description: '结构体位域',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t enable  : 1;
    uint8_t mode    : 2;
    uint8_t channel : 3;
    uint8_t reserved: 2;
} Config;

int main(void)
{
    Config cfg = {1, 2, 5, 0};

    printf("enable: %u\\n", cfg.enable);
    printf("mode: %u\\n", cfg.mode);
    printf("channel: %u\\n", cfg.channel);
    printf("Size: %zu\\n", sizeof(cfg));

    return 0;
}`,
    correctOutput: 'enable: 1\nmode: 2\nchannel: 5\nSize: 1',
    explanation: '位域指定成员占用的位数。enable占1位，mode占2位，channel占3位，reserved占2位，共8位=1字节。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位域', '结构体', '内存布局'],
    visualization: { type: 'html', file: 'visualizations-v2/bitfield.html' },
      },
  {
    id: 2079,
    chapter: 'level1',
    type: 'output',
    title: 'typedef类型别名',
    description: '定义类型别名',
    code: `#include <stdio.h>
#include <stdint.h>

typedef uint8_t byte_t;
typedef uint16_t word_t;
typedef uint32_t dword_t;

int main(void)
{
    byte_t data = 255;
    word_t count = 1000;
    dword_t address = 0x40000000;

    printf("data: %u\\n", data);
    printf("count: %u\\n", count);
    printf("address: 0x%08X\\n", address);

    return 0;
}`,
    correctOutput: 'data: 255\ncount: 1000\naddress: 0x40000000',
    explanation: 'typedef为类型创建别名。byte_t等价于uint8_t。提高代码可读性，方便跨平台移植。',
    difficulty: 1,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['typedef', '类型别名'],
    visualization: { type: 'html', file: 'visualizations-v2/typedef.html' },
      },
  {
    id: 2080,
    chapter: 'level1',
    type: 'output',
    title: '预处理-字符串化',
    description: '#运算符',
    code: `#include <stdio.h>
#include <stdint.h>

#define PRINT_VAR(var)  printf(#var " = %u\\n", var)

int main(void)
{
    uint8_t sensor_value = 42;
    uint8_t counter = 100;

    PRINT_VAR(sensor_value);
    PRINT_VAR(counter);

    return 0;
}`,
    correctOutput: 'sensor_value = 42\ncounter = 100',
    explanation: '#运算符将参数转为字符串。#var变成"sensor_value"。常用于调试打印变量名和值。',
    difficulty: 2,
    hint: '入门级题目，掌握基础语法。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['#运算符', '字符串化', '预处理'],
    visualization: { type: 'html', file: 'visualizations-v2/stringify-macro.html' },
      },
  {
    id: 3001,
    chapter: 'level2',
    type: 'output',
    title: '指针基础-声明与初始化',
    description: '指针变量声明',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t value = 100;
    uint8_t *ptr = &value;

    printf("value = %u\\n", value);
    printf("*ptr = %u\\n", *ptr);
    printf("&value = %p\\n", (void*)&value);
    printf("ptr = %p\\n", (void*)ptr);

    return 0;
}`,
    correctOutput: 'value = 100\n*ptr = 100\n&value = ',
    explanation: '指针存储变量的地址。&取地址，*解引用获取值。ptr和&value指向同一地址。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针声明', '&取地址', '*解引用'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-basic.html' },
      },
  {
    id: 3002,
    chapter: 'level2',
    type: 'output',
    title: '指针修改原变量',
    description: '通过指针修改变量值',
    code: `#include <stdio.h>
#include <stdint.h>

void modify_value(uint8_t *ptr)
{
    *ptr = 200;
}

int main(void)
{
    uint8_t data = 50;

    printf("Before: %u\\n", data);
    modify_value(&data);
    printf("After: %u\\n", data);

    return 0;
}`,
    correctOutput: 'Before: 50\nAfter: 200',
    explanation: '通过指针可以修改原变量的值。函数接收指针参数，解引用后修改。这是C语言传址的核心用法。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针参数', '解引用修改'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-modify.html' },
      },
  {
    id: 3003,
    chapter: 'level2',
    type: 'output',
    title: '空指针NULL',
    description: '空指针检查',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stddef.h>

int8_t safe_read(uint8_t *ptr)
{
    if (ptr == NULL) {
        return -1;
    }
    return (int8_t)*ptr;
}

int main(void)
{
    uint8_t value = 42;
    uint8_t *valid_ptr = &value;
    uint8_t *null_ptr = NULL;

    printf("Valid: %d\\n", safe_read(valid_ptr));
    printf("NULL: %d\\n", safe_read(null_ptr));

    return 0;
}`,
    correctOutput: 'Valid: 42\nNULL: -1',
    explanation: 'NULL表示空指针，不指向任何有效地址。使用指针前必须检查是否为NULL，防止段错误。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['NULL', '空指针检查', '安全编程'],
    visualization: { type: 'html', file: 'visualizations-v2/null-pointer.html' },
      },
  {
    id: 3004,
    chapter: 'level2',
    type: 'output',
    title: '指针运算-整数加减',
    description: '指针算术运算',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[4] = {10, 20, 30, 40};
    uint8_t *ptr = data;

    printf("*ptr = %u\\n", *ptr);
    printf("*(ptr+1) = %u\\n", *(ptr+1));
    printf("*(ptr+2) = %u\\n", *(ptr+2));
    printf("ptr[3] = %u\\n", ptr[3]);

    return 0;
}`,
    correctOutput: '*ptr = 10\n*(ptr+1) = 20\n*(ptr+2) = 30\nptr[3] = 40',
    explanation: '指针+1移动sizeof(类型)字节。uint8_t指针+1移动1字节。ptr[i]等价于*(ptr+i)。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针运算', '指针加减', '下标访问'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-arithmetic.html' },
      },
  {
    id: 3005,
    chapter: 'level2',
    type: 'output',
    title: '指针运算-不同类型',
    description: '不同类型指针运算',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t arr8[4] = {1, 2, 3, 4};
    uint16_t arr16[4] = {100, 200, 300, 400};
    uint32_t arr32[4] = {1000, 2000, 3000, 4000};

    uint8_t *p8 = arr8;
    uint16_t *p16 = arr16;
    uint32_t *p32 = arr32;

    printf("uint8_t: %u, %u\\n", *p8, *(p8+1));
    printf("uint16_t: %u, %u\\n", *p16, *(p16+1));
    printf("uint32_t: %u, %u\\n", *p32, *(p32+1));

    return 0;
}`,
    correctOutput: 'uint8_t: 1, 2\nuint16_t: 100, 200\nuint32_t: 1000, 2000',
    explanation: '指针+1移动的字节数取决于类型大小。uint8_t移动1字节，uint16_t移动2字节，uint32_t移动4字节。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针运算', '类型大小', '内存布局'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-types.html' },
      },
  {
    id: 3006,
    chapter: 'level2',
    type: 'output',
    title: '指针与数组-数组名',
    description: '数组名是指针',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[4] = {10, 20, 30, 40};

    printf("data[0] = %u\\n", data[0]);
    printf("*data = %u\\n", *data);
    printf("*(data+1) = %u\\n", *(data+1));
    printf("data[2] = %u\\n", data[2]);

    return 0;
}`,
    correctOutput: 'data[0] = 10\n*data = 10\n*(data+1) = 20\ndata[2] = 30',
    explanation: '数组名是首元素地址。data等价于&data[0]，*data等价于data[0]。这是指针和数组的核心关系。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组名', '首元素地址', '等价关系'],
    visualization: { type: 'html', file: 'visualizations-v2/array-name-pointer.html' },
      },
  {
    id: 3007,
    chapter: 'level2',
    type: 'output',
    title: '指针与数组-遍历',
    description: '用指针遍历数组',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[5] = {5, 10, 15, 20, 25};
    uint8_t *ptr = data;
    uint8_t sum = 0;

    for (uint8_t i = 0; i < 5; i++) {
        sum += *ptr;
        ptr++;
    }

    printf("Sum: %u\\n", sum);
    return 0;
}`,
    correctOutput: 'Sum: 75',
    explanation: 'ptr++移动指针到下一个元素。*ptr获取当前元素值。这是遍历数组的指针方式。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针遍历', '指针自增'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-traverse.html' },
      },
  {
    id: 3008,
    chapter: 'level2',
    type: 'output',
    title: '指针与数组-指针差值',
    description: '指针相减计算距离',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[10] = {0};
    uint8_t *start = data;
    uint8_t *end = data + 10;

    printf("Elements: %ld\\n", (long)(end - start));
    printf("Bytes: %ld\\n", (long)((char*)end - (char*)start));

    return 0;
}`,
    correctOutput: 'Elements: 10\nBytes: 10',
    explanation: '两个指针相减得到元素个数（不是字节数）。类型转换后相减得到字节数。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针相减', '元素个数'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-subtract.html' },
      },
  {
    id: 3009,
    chapter: 'level2',
    type: 'output',
    title: '结构体-定义与初始化',
    description: '结构体基本操作',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

typedef struct {
    uint8_t id;
    uint16_t value;
    char name[8];
} Device;

int main(void)
{
    Device dev = {1, 100, "Sensor"};

    printf("ID: %u\\n", dev.id);
    printf("Value: %u\\n", dev.value);
    printf("Name: %s\\n", dev.name);
    printf("Size: %zu\\n", sizeof(dev));

    return 0;
}`,
    correctOutput: 'ID: 1\nValue: 100\nName: Sensor\nSize: 12',
    explanation: '结构体组合不同类型数据。sizeof计算总大小（含对齐填充）。成员用.访问。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体定义', '成员访问', 'sizeof'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-basic.html' },
      },
  {
    id: 3010,
    chapter: 'level2',
    type: 'output',
    title: '结构体-指针访问',
    description: '通过指针访问结构体',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t id;
    uint16_t value;
} Sensor;

int main(void)
{
    Sensor dev = {5, 250};
    Sensor *ptr = &dev;

    printf("ID: %u\\n", ptr->id);
    printf("Value: %u\\n", (*ptr).value);
    printf("Address: %p\\n", (void*)ptr);

    return 0;
}`,
    correctOutput: 'ID: 5\nValue: 250\nAddress: ',
    explanation: '结构体指针用->访问成员。ptr->id等价于(*ptr).id。这是函数传结构体指针的基础。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体指针', '->运算符', '解引用'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-pointer.html' },
      },
  {
    id: 3011,
    chapter: 'level2',
    type: 'output',
    title: '结构体-内存对齐',
    description: '结构体内存对齐规则',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t a;
    uint32_t b;
    uint8_t c;
} PackedBad;

typedef struct {
    uint32_t b;
    uint8_t a;
    uint8_t c;
} PackedGood;

int main(void)
{
    printf("PackedBad: %zu\\n", sizeof(PackedBad));
    printf("PackedGood: %zu\\n", sizeof(PackedGood));

    return 0;
}`,
    correctOutput: 'PackedBad: 12\nPackedGood: 8',
    explanation: '结构体成员按对齐规则排列。uint32_t需要4字节对齐。合理安排成员顺序可以减少内存占用。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内存对齐', '结构体大小', '填充字节'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-alignment.html' },
      },
  {
    id: 3012,
    chapter: 'level2',
    type: 'output',
    title: '结构体-嵌套结构体',
    description: '结构体嵌套',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint16_t x;
    uint16_t y;
} Point;

typedef struct {
    Point start;
    Point end;
    uint8_t color;
} Line;

int main(void)
{
    Line line = {{0, 0}, {100, 50}, 255};

    printf("Start: (%u, %u)\\n", line.start.x, line.start.y);
    printf("End: (%u, %u)\\n", line.end.x, line.end.y);
    printf("Color: %u\\n", line.color);

    return 0;
}`,
    correctOutput: 'Start: (0, 0)\nEnd: (100, 50)\nColor: 255',
    explanation: '结构体可以嵌套。访问嵌套成员用点号链式访问：line.start.x。常用于复杂数据结构。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['嵌套结构体', '成员访问'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-nested.html' },
      },
  {
    id: 3013,
    chapter: 'level2',
    type: 'output',
    title: '结构体数组',
    description: '结构体数组操作',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t id;
    uint16_t value;
} Sensor;

#define SENSOR_COUNT  3

int main(void)
{
    Sensor sensors[SENSOR_COUNT] = {
        {1, 100},
        {2, 200},
        {3, 300}
    };

    uint32_t total = 0;
    for (uint8_t i = 0; i < SENSOR_COUNT; i++) {
        total += sensors[i].value;
    }

    printf("Total: %u\\n", total);
    printf("Sensor[1].id: %u\\n", sensors[1].id);

    return 0;
}`,
    correctOutput: 'Total: 600\nSensor[1].id: 2',
    explanation: '结构体数组是常见数据结构。用下标访问元素，用点号访问成员。常用于设备列表、配置表。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体数组', '数组访问'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-array.html' },
      },
  {
    id: 3014,
    chapter: 'level2',
    type: 'output',
    title: '联合体-基本用法',
    description: '联合体共享内存',
    code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    uint8_t bytes[4];
    uint16_t words[2];
    uint32_t dword;
} DataUnion;

int main(void)
{
    DataUnion data;
    data.dword = 0x12345678;

    printf("dword: 0x%08X\\n", data.dword);
    printf("bytes[0]: 0x%02X\\n", data.bytes[0]);
    printf("bytes[3]: 0x%02X\\n", data.bytes[3]);
    printf("words[0]: 0x%04X\\n", data.words[0]);

    return 0;
}`,
    correctOutput: 'dword: 0x12345678\nbytes[0]: 0x78\nbytes[3]: 0x12\nwords[0]: 0x5678',
    explanation: '联合体所有成员共享同一内存。小端存储：低字节在低地址。常用于数据解析、寄存器访问。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体', '内存共享', '小端存储'],
      },
  {
    id: 3015,
    chapter: 'level2',
    type: 'output',
    title: '联合体-大小计算',
    description: '联合体大小',
    code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    uint8_t byte;
    uint16_t word;
    uint32_t dword;
    uint64_t qword;
} BigUnion;

typedef union {
    uint8_t bytes[3];
    uint16_t word;
} SmallUnion;

int main(void)
{
    printf("BigUnion: %zu\\n", sizeof(BigUnion));
    printf("SmallUnion: %zu\\n", sizeof(SmallUnion));

    return 0;
}`,
    correctOutput: 'BigUnion: 8\nSmallUnion: 4',
    explanation: '联合体大小等于最大成员大小（考虑对齐）。BigUnion最大8字节，SmallUnion数组3字节但对齐到4字节。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体大小', '内存对齐'],
      },
  {
    id: 3016,
    chapter: 'level2',
    type: 'output',
    title: '联合体-寄存器访问',
    description: '用联合体访问寄存器位域',
    code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    struct {
        uint8_t enable  : 1;
        uint8_t mode    : 2;
        uint8_t speed   : 2;
        uint8_t reserved: 3;
    } bits;
    uint8_t value;
} RegConfig;

int main(void)
{
    RegConfig reg;
    reg.value = 0;

    reg.bits.enable = 1;
    reg.bits.mode = 2;
    reg.bits.speed = 3;

    printf("Reg value: 0x%02X\\n", reg.value);
    printf("Enable: %u\\n", reg.bits.enable);
    printf("Mode: %u\\n", reg.bits.mode);

    return 0;
}`,
    correctOutput: 'Reg value: 0x0D\nEnable: 1\nMode: 2',
    explanation: '联合体+位域实现寄存器访问。enable=1(bit0), mode=2(bits1-2)=2, speed=3(bits3-4)=12。合计0x0D。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体', '位域', '寄存器访问'],
      },
  {
    id: 3017,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-基本声明',
    description: '函数指针声明与调用',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t add(uint8_t a, uint8_t b)
{
    return a + b;
}

uint8_t multiply(uint8_t a, uint8_t b)
{
    return a * b;
}

int main(void)
{
    uint8_t (*operation)(uint8_t, uint8_t) = add;

    printf("Add: %u\\n", operation(5, 3));

    operation = multiply;
    printf("Multiply: %u\\n", operation(5, 3));

    return 0;
}`,
    correctOutput: 'Add: 8\nMultiply: 15',
    explanation: '函数指针存储函数地址。声明：返回类型 (*指针名)(参数类型)。可以指向不同函数实现多态。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针', '声明', '调用'],
      },
  {
    id: 3018,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-回调函数',
    description: '回调函数模式',
    code: `#include <stdio.h>
#include <stdint.h>

typedef uint8_t (*CompareFunc)(uint8_t, uint8_t);

uint8_t find_max(uint8_t a, uint8_t b)
{
    return (a > b) ? a : b;
}

uint8_t find_min(uint8_t a, uint8_t b)
{
    return (a < b) ? a : b;
}

uint8_t compare(uint8_t a, uint8_t b, CompareFunc func)
{
    return func(a, b);
}

int main(void)
{
    printf("Max: %u\\n", compare(10, 20, find_max));
    printf("Min: %u\\n", compare(10, 20, find_min));

    return 0;
}`,
    correctOutput: 'Max: 20\nMin: 10',
    explanation: '回调函数：把函数作为参数传递。compare函数接收函数指针，调用时决定行为。这是驱动框架的核心模式。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['回调函数', '函数指针参数', '多态'],
      },
  {
    id: 3019,
    chapter: 'level2',
    type: 'output',
    title: '函数指针数组',
    description: '函数指针数组实现状态机',
    code: `#include <stdio.h>
#include <stdint.h>

void state_idle(void) { printf("IDLE\\n"); }
void state_running(void) { printf("RUNNING\\n"); }
void state_error(void) { printf("ERROR\\n"); }

int main(void)
{
    void (*state_table[3])(void) = {
        state_idle,
        state_running,
        state_error
    };

    uint8_t current_state = 0;

    state_table[current_state]();
    current_state = 1;
    state_table[current_state]();
    current_state = 2;
    state_table[current_state]();

    return 0;
}`,
    correctOutput: 'IDLE\nRUNNING\nERROR',
    explanation: '函数指针数组实现状态机。state_table[state]调用对应状态处理函数。嵌入式常用模式。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针数组', '状态机', '查表法'],
      },
  {
    id: 3020,
    chapter: 'level2',
    type: 'output',
    title: '多文件-extern声明',
    description: '跨文件变量访问',
    code: `#include <stdio.h>
#include <stdint.h>

extern uint8_t global_counter;

void increment_counter(void);

int main(void)
{
    printf("Counter: %u\\n", global_counter);
    increment_counter();
    printf("After: %u\\n", global_counter);

    return 0;
}`,
    correctOutput: 'Counter: 0\nAfter: 1',
    explanation: 'extern声明外部变量，告诉编译器变量在其他文件定义。这是多文件编程的基础。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['extern', '外部变量', '多文件'],
      },
  {
    id: 3021,
    chapter: 'level2',
    type: 'output',
    title: '多文件-static全局变量',
    description: 'static限制变量作用域',
    code: `#include <stdio.h>
#include <stdint.h>

static uint8_t module_counter = 0;

void module_increment(void)
{
    module_counter++;
}

uint8_t module_get_counter(void)
{
    return module_counter;
}

int main(void)
{
    module_increment();
    module_increment();
    printf("Counter: %u\\n", module_get_counter());
    return 0;
}`,
    correctOutput: 'Counter: 2',
    explanation: 'static全局变量只在当前文件可见，其他文件无法访问。用于模块内部状态管理，实现封装。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['static', '文件作用域', '封装'],
      },
  {
    id: 3022,
    chapter: 'level2',
    type: 'output',
    title: '多文件-static函数',
    description: 'static限制函数作用域',
    code: `#include <stdio.h>
#include <stdint.h>

static uint8_t internal_helper(uint8_t x)
{
    return x * 2;
}

uint8_t public_api(uint8_t value)
{
    return internal_helper(value) + 1;
}

int main(void)
{
    printf("Result: %u\\n", public_api(5));
    return 0;
}`,
    correctOutput: 'Result: 11',
    explanation: 'static函数只在当前文件可见。用于内部辅助函数，不暴露给外部。这是模块化设计的重要手段。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['static函数', '内部函数', '封装'],
      },
  {
    id: 3023,
    chapter: 'level2',
    type: 'output',
    title: '指针与const',
    description: 'const指针的不同位置',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t value = 100;
    uint8_t other = 200;

    const uint8_t *ptr1 = &value;
    uint8_t * const ptr2 = &value;

    printf("ptr1: %u\\n", *ptr1);
    ptr1 = &other;
    printf("ptr1 after: %u\\n", *ptr1);

    *ptr2 = 150;
    printf("ptr2: %u\\n", *ptr2);

    return 0;
}`,
    correctOutput: 'ptr1: 100\nptr1 after: 200\nptr2: 150',
    explanation: 'const uint8_t *ptr：指向常量的指针，不能修改指向的值。uint8_t * const ptr：常量指针，不能修改指针本身。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['const指针', '指向常量的指针', '常量指针'],
      },
  {
    id: 3024,
    chapter: 'level2',
    type: 'output',
    title: '指针数组',
    description: '指针数组的应用',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 10, b = 20, c = 30;
    uint8_t *ptrs[3] = {&a, &b, &c};

    for (uint8_t i = 0; i < 3; i++) {
        printf("ptrs[%u] = %u\\n", i, *ptrs[i]);
    }

    *ptrs[1] = 25;
    printf("b after: %u\\n", b);

    return 0;
}`,
    correctOutput: 'ptrs[0] = 10\nptrs[1] = 20\nptrs[2] = 30\nb after: 25',
    explanation: '指针数组是元素为指针的数组。ptrs[1]是第2个指针，*ptrs[1]解引用获取值。常用于字符串数组。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针数组', '数组元素是指针'],
      },
  {
    id: 3025,
    chapter: 'level2',
    type: 'output',
    title: '数组指针',
    description: '指向数组的指针',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[3][2] = {{1,2}, {3,4}, {5,6}};
    uint8_t (*ptr)[2] = data;

    printf("ptr[0][0] = %u\\n", ptr[0][0]);
    printf("ptr[1][1] = %u\\n", ptr[1][1]);
    printf("*(ptr[2]+1) = %u\\n", *(ptr[2]+1));

    return 0;
}`,
    correctOutput: 'ptr[0][0] = 1\nptr[1][1] = 4\n*(ptr[2]+1) = 6',
    explanation: '数组指针是指向数组的指针。uint8_t (*ptr)[2]指向含2个uint8_t的数组。用于二维数组传参。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组指针', '指向数组的指针', '二维数组'],
      },
  {
    id: 3026,
    chapter: 'level2',
    type: 'output',
    title: '指针数组vs数组指针',
    description: '区分两种声明',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t arr[3] = {1, 2, 3};
    uint8_t *ptr_array[3];
    uint8_t (*array_ptr)[3] = &arr;

    ptr_array[0] = &arr[0];
    ptr_array[1] = &arr[1];
    ptr_array[2] = &arr[2];

    printf("ptr_array[1]: %u\\n", *ptr_array[1]);
    printf("(*array_ptr)[1]: %u\\n", (*array_ptr)[1]);

    return 0;
}`,
    correctOutput: 'ptr_array[1]: 2\n(*array_ptr)[1]: 2',
    explanation: '*ptr_array[3]是指针数组（3个指针）。(*array_ptr)[3]是数组指针（指向3元素数组）。注意括号位置！',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针数组', '数组指针', '声明解析'],
      },
  {
    id: 3027,
    chapter: 'level2',
    type: 'output',
    title: '多级指针',
    description: '二级指针的应用',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t value = 100;
    uint8_t *ptr = &value;
    uint8_t **pptr = &ptr;

    printf("value: %u\\n", value);
    printf("*ptr: %u\\n", *ptr);
    printf("**pptr: %u\\n", **pptr);

    **pptr = 200;
    printf("After: %u\\n", value);

    return 0;
}`,
    correctOutput: 'value: 100\n*ptr: 100\n**pptr: 100\nAfter: 200',
    explanation: '二级指针存储指针的地址。**pptr两次解引用获取原始值。常用于函数修改指针本身。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二级指针', '多级指针', '解引用'],
      },
  {
    id: 3028,
    chapter: 'level2',
    type: 'output',
    title: 'void指针',
    description: '通用指针类型',
    code: `#include <stdio.h>
#include <stdint.h>

void print_value(void *ptr, uint8_t type)
{
    if (type == 0) {
        printf("uint8_t: %u\\n", *(uint8_t*)ptr);
    } else if (type == 1) {
        printf("uint16_t: %u\\n", *(uint16_t*)ptr);
    } else {
        printf("uint32_t: %u\\n", *(uint32_t*)ptr);
    }
}

int main(void)
{
    uint8_t a = 100;
    uint16_t b = 1000;
    uint32_t c = 100000;

    print_value(&a, 0);
    print_value(&b, 1);
    print_value(&c, 2);

    return 0;
}`,
    correctOutput: 'uint8_t: 100\nuint16_t: 1000\nuint32_t: 100000',
    explanation: 'void*是通用指针，可以指向任何类型。使用前需要强制类型转换。常用于通用函数接口。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['void指针', '通用指针', '类型转换'],
      },
  {
    id: 3029,
    chapter: 'level2',
    type: 'output',
    title: '结构体-函数传参',
    description: '结构体作为函数参数',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint16_t x;
    uint16_t y;
} Point;

void print_point(Point p)
{
    printf("Point(%u, %u)\\n", p.x, p.y);
}

void move_point(Point *p, uint16_t dx, uint16_t dy)
{
    p->x += dx;
    p->y += dy;
}

int main(void)
{
    Point pt = {10, 20};

    print_point(pt);
    move_point(&pt, 5, 10);
    print_point(pt);

    return 0;
}`,
    correctOutput: 'Point(10, 20)\nPoint(15, 30)',
    explanation: '结构体传值会复制整个结构体。传指针避免复制，效率更高。大型结构体应该传指针。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体传参', '值传递', '指针传递'],
      },
  {
    id: 3030,
    chapter: 'level2',
    type: 'output',
    title: '结构体-返回值',
    description: '函数返回结构体',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint16_t x;
    uint16_t y;
} Point;

Point create_point(uint16_t x, uint16_t y)
{
    Point p = {x, y};
    return p;
}

Point add_points(Point a, Point b)
{
    Point result = {a.x + b.x, a.y + b.y};
    return result;
}

int main(void)
{
    Point p1 = create_point(10, 20);
    Point p2 = create_point(5, 15);
    Point sum = add_points(p1, p2);

    printf("Sum: (%u, %u)\\n", sum.x, sum.y);

    return 0;
}`,
    correctOutput: 'Sum: (15, 35)',
    explanation: '函数可以返回结构体。返回值会被复制到调用者。现代编译器会优化避免不必要的复制。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体返回值', '函数返回'],
      },
  {
    id: 4001,
    chapter: 'level3',
    type: 'output',
    title: 'malloc动态分配',
    description: '堆内存分配',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *buffer = (uint8_t*)malloc(10 * sizeof(uint8_t));

    if (buffer == NULL) {
        printf("Allocation failed\\n");
        return 1;
    }

    for (uint8_t i = 0; i < 10; i++) {
        buffer[i] = i * 10;
    }

    printf("buffer[5] = %u\\n", buffer[5]);
    printf("buffer[9] = %u\\n", buffer[9]);

    free(buffer);

    return 0;
}`,
    correctOutput: 'buffer[5] = 50\nbuffer[9] = 90',
    explanation: 'malloc在堆上分配内存，返回void*指针。必须检查返回值是否为NULL。使用后必须free释放。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['malloc', '动态内存', 'free'],
      },
  {
    id: 4002,
    chapter: 'level3',
    type: 'output',
    title: 'calloc清零分配',
    description: 'calloc初始化为零',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *data = (uint8_t*)calloc(5, sizeof(uint8_t));

    if (data == NULL) {
        return 1;
    }

    printf("data[0] = %u\\n", data[0]);
    printf("data[4] = %u\\n", data[4]);

    for (uint8_t i = 0; i < 5; i++) {
        data[i] = (i + 1) * 10;
    }

    printf("After: %u, %u\\n", data[0], data[4]);

    free(data);
    return 0;
}`,
    correctOutput: 'data[0] = 0\ndata[4] = 0\nAfter: 10, 50',
    explanation: 'calloc分配内存并初始化为零。参数是(元素个数, 元素大小)。适合需要清零的场景。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['calloc', '内存初始化', '清零'],
      },
  {
    id: 4003,
    chapter: 'level3',
    type: 'output',
    title: 'realloc重新分配',
    description: '调整内存大小',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *arr = (uint8_t*)malloc(5 * sizeof(uint8_t));

    for (uint8_t i = 0; i < 5; i++) {
        arr[i] = i;
    }

    arr = (uint8_t*)realloc(arr, 10 * sizeof(uint8_t));

    for (uint8_t i = 5; i < 10; i++) {
        arr[i] = i * 2;
    }

    printf("arr[4] = %u\\n", arr[4]);
    printf("arr[7] = %u\\n", arr[7]);

    free(arr);
    return 0;
}`,
    correctOutput: 'arr[4] = 4\narr[7] = 14',
    explanation: 'realloc调整已分配内存大小。原数据保留，新增部分未初始化。可能移动内存位置，返回新指针。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['realloc', '内存调整', '动态数组'],
      },
  {
    id: 4004,
    chapter: 'level3',
    type: 'output',
    title: '内存泄漏检测',
    description: '避免内存泄漏',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int8_t process_data(uint8_t size)
{
    uint8_t *buffer = (uint8_t*)malloc(size);

    if (buffer == NULL) {
        return -1;
    }

    if (size > 100) {
        free(buffer);
        return -2;
    }

    for (uint8_t i = 0; i < size; i++) {
        buffer[i] = i;
    }

    printf("Processed %u bytes\\n", size);
    free(buffer);
    return 0;
}

int main(void)
{
    printf("Result: %d\\n", process_data(50));
    printf("Result: %d\\n", process_data(150));

    return 0;
}`,
    correctOutput: 'Processed 50 bytes\nResult: 0\nResult: -2',
    explanation: '每个malloc必须有对应的free。提前返回时也要释放内存。内存泄漏是嵌入式系统的严重问题。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内存泄漏', 'free', '错误处理'],
      },
  {
    id: 4005,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-fopen/fclose',
    description: '文件打开与关闭',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    FILE *fp = fopen("test.txt", "w");

    if (fp == NULL) {
        printf("Open failed\\n");
        return 1;
    }

    fprintf(fp, "Hello\\n");
    fprintf(fp, "World\\n");

    fclose(fp);
    printf("File written\\n");

    return 0;
}`,
    correctOutput: 'File written',
    explanation: 'fopen打开文件，返回FILE指针。模式"w"写入，"r"读取，"a"追加。使用后必须fclose关闭。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fopen', 'fclose', '文件操作'],
      },
  {
    id: 4006,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-fread/fwrite',
    description: '二进制文件读写',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t data[4] = {0x12, 0x34, 0x56, 0x78};
    uint8_t read_buf[4];

    FILE *fp = fopen("data.bin", "wb");
    fwrite(data, sizeof(uint8_t), 4, fp);
    fclose(fp);

    fp = fopen("data.bin", "rb");
    fread(read_buf, sizeof(uint8_t), 4, fp);
    fclose(fp);

    printf("Read: %02X %02X %02X %02X\\n",
           read_buf[0], read_buf[1], read_buf[2], read_buf[3]);

    return 0;
}`,
    correctOutput: 'Read: 12 34 56 78',
    explanation: 'fwrite写入二进制数据，fread读取。参数：(指针, 元素大小, 元素个数, 文件指针)。返回实际读写的元素数。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fread', 'fwrite', '二进制文件'],
      },
  {
    id: 4007,
    chapter: 'level3',
    type: 'output',
    title: '位操作-提取位域',
    description: '提取寄存器位域',
    code: `#include <stdio.h>
#include <stdint.h>

#define EXTRACT_BITS(val, start, len)  (((val) >> (start)) & ((1U << (len)) - 1))

int main(void)
{
    uint32_t reg = 0x12345678;

    uint8_t bit0 = EXTRACT_BITS(reg, 0, 1);
    uint8_t low4 = EXTRACT_BITS(reg, 0, 4);
    uint8_t mid8 = EXTRACT_BITS(reg, 8, 8);

    printf("Bit 0: %u\\n", bit0);
    printf("Low 4 bits: 0x%X\\n", low4);
    printf("Bits 8-15: 0x%02X\\n", mid8);

    return 0;
}`,
    correctOutput: 'Bit 0: 0\nLow 4 bits: 0x8\nBits 8-15: 0x56',
    explanation: '提取位域：右移到最低位，然后用掩码提取。EXTRACT_BITS(reg, 8, 8)提取第8-15位。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位域提取', '右移', '掩码'],
      },
  {
    id: 4008,
    chapter: 'level3',
    type: 'output',
    title: '位操作-设置位域',
    description: '设置寄存器位域',
    code: `#include <stdio.h>
#include <stdint.h>

#define SET_BITS(val, start, len, new_val) \\
    (((val) & ~(((1U << (len)) - 1) << (start))) | ((new_val) << (start)))

int main(void)
{
    uint32_t reg = 0x00001234;

    reg = SET_BITS(reg, 0, 4, 0x8);
    printf("After set low 4: 0x%08X\\n", reg);

    reg = SET_BITS(reg, 8, 8, 0xAB);
    printf("After set bits 8-15: 0x%08X\\n", reg);

    return 0;
}`,
    correctOutput: 'After set low 4: 0x00001238\nAfter set bits 8-15: 0x0000AB38',
    explanation: '设置位域：先清除目标位域，再设置新值。清除用&~mask，设置用|new_val。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位域设置', '清除位', '设置位'],
      },
  {
    id: 4009,
    chapter: 'level3',
    type: 'output',
    title: '位操作-位反转',
    description: '反转整数的位',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t reverse_bits(uint8_t val)
{
    uint8_t result = 0;
    for (uint8_t i = 0; i < 8; i++) {
        result = (result << 1) | (val & 1);
        val >>= 1;
    }
    return result;
}

int main(void)
{
    uint8_t val = 0x0F;

    printf("Original: 0x%02X\\n", val);
    printf("Reversed: 0x%02X\\n", reverse_bits(val));

    return 0;
}`,
    correctOutput: 'Original: 0x0F\nReversed: 0xF0',
    explanation: '位反转：从低位到高位，依次取出并放到结果的另一端。0x0F(00001111)反转后为0xF0(11110000)。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位反转', '位操作技巧'],
      },
  {
    id: 4010,
    chapter: 'level3',
    type: 'output',
    title: '预处理-##运算符',
    description: '宏连接运算符',
    code: `#include <stdio.h>
#include <stdint.h>

#define GPIO(port, pin)  GPIO##port##_##pin

#define GPIOA_0   0
#define GPIOA_1   1
#define GPIOB_0   2

int main(void)
{
    printf("GPIOA_0 = %d\\n", GPIO(A, 0));
    printf("GPIOA_1 = %d\\n", GPIO(A, 1));
    printf("GPIOB_0 = %d\\n", GPIO(B, 0));

    return 0;
}`,
    correctOutput: 'GPIOA_0 = 0\nGPIOA_1 = 1\nGPIOB_0 = 2',
    explanation: '##运算符连接两个标记。GPIO(A, 0)展开为GPIOA_0。常用于生成变量名、函数名。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['##运算符', '宏连接', '标记粘贴'],
      },
  {
    id: 4011,
    chapter: 'level3',
    type: 'output',
    title: '预处理-可变参数宏',
    description: '__VA_ARGS__使用',
    code: `#include <stdio.h>
#include <stdint.h>

#define DEBUG_PRINT(fmt, ...) \\
    printf("[DEBUG] " fmt "\\n", ##__VA_ARGS__)

#define LOG(level, msg, ...) \\
    printf("[%s] " msg "\\n", level, ##__VA_ARGS__)

int main(void)
{
    DEBUG_PRINT("System started");
    DEBUG_PRINT("Value: %d", 42);
    LOG("INFO", "Device initialized");
    LOG("ERROR", "Failed at line %d", 100);

    return 0;
}`,
    correctOutput: '[DEBUG] System started\n[DEBUG] Value: 42\n[INFO] Device initialized\n[ERROR] Failed at line 100',
    explanation: '__VA_ARGS__代表可变参数。##__VA_ARGS__在没有参数时消除前面的逗号。用于日志系统。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['可变参数宏', '__VA_ARGS__', '日志系统'],
      },
  {
    id: 4012,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-右左法则',
    description: '解析复杂声明',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int arr[3] = {1, 2, 3};

    int *ptrs[3];
    ptrs[0] = &arr[0];
    ptrs[1] = &arr[1];
    ptrs[2] = &arr[2];

    int (*ptr_to_arr)[3] = &arr;

    int (*func_ptr)(int) = NULL;

    printf("ptrs[1]: %d\\n", *ptrs[1]);
    printf("(*ptr_to_arr)[2]: %d\\n", (*ptr_to_arr)[2]);

    return 0;
}`,
    correctOutput: 'ptrs[1]: 2\n(*ptr_to_arr)[2]: 3',
    explanation: '右左法则：从变量名开始，先右后左。*ptrs[3]：ptrs是数组，元素是指针。(*ptr_to_arr)[3]：ptr_to_arr是指向数组的指针。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['右左法则', '复杂声明', '声明解析'],
      },
  {
    id: 4013,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-函数指针数组',
    description: '声明解析练习',
    code: `#include <stdio.h>
#include <stdint.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void)
{
    int (*operations[3])(int, int) = {add, sub, mul};

    printf("add: %d\\n", operations[0](10, 5));
    printf("sub: %d\\n", operations[1](10, 5));
    printf("mul: %d\\n", operations[2](10, 5));

    return 0;
}`,
    correctOutput: 'add: 15\nsub: 5\nmul: 50',
    explanation: 'int (*operations[3])(int, int)：operations是数组，元素是函数指针，指向返回int、参数(int,int)的函数。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针数组', '复杂声明', '右左法则'],
      },
  {
    id: 4014,
    chapter: 'level3',
    type: 'output',
    title: 'typedef简化复杂声明',
    description: '用typedef简化',
    code: `#include <stdio.h>
#include <stdint.h>

typedef int (*OperationFunc)(int, int);
typedef OperationFunc OperationArray[3];

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int main(void)
{
    OperationArray ops = {add, sub, add};

    printf("ops[0]: %d\\n", ops[0](5, 3));
    printf("ops[1]: %d\\n", ops[1](5, 3));

    OperationFunc op = add;
    printf("op: %d\\n", op(10, 20));

    return 0;
}`,
    correctOutput: 'ops[0]: 8\nops[1]: 2\nop: 30',
    explanation: 'typedef可以简化复杂声明。OperationFunc是函数指针类型，OperationArray是函数指针数组类型。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['typedef', '简化声明', '类型别名'],
      },
  {
    id: 4015,
    chapter: 'level3',
    type: 'output',
    title: 'memcpy内存复制',
    description: '内存复制函数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    uint8_t src[5] = {10, 20, 30, 40, 50};
    uint8_t dst[5];

    memcpy(dst, src, 5);

    printf("dst: ");
    for (uint8_t i = 0; i < 5; i++) {
        printf("%u ", dst[i]);
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: 'dst: 10 20 30 40 50 ',
    explanation: 'memcpy复制内存块，不检查重叠。参数：(目标, 源, 字节数)。比循环复制更高效。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['memcpy', '内存复制'],
      },
  {
    id: 4016,
    chapter: 'level3',
    type: 'output',
    title: 'memmove内存移动',
    description: '处理重叠区域的复制',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    uint8_t data[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    printf("Before: ");
    for (uint8_t i = 0; i < 10; i++) printf("%u ", data[i]);
    printf("\\n");

    memmove(data + 2, data, 5);

    printf("After: ");
    for (uint8_t i = 0; i < 10; i++) printf("%u ", data[i]);
    printf("\\n");

    return 0;
}`,
    correctOutput: 'Before: 1 2 3 4 5 6 7 8 9 10 \nAfter: 1 2 1 2 3 4 5 8 9 10 ',
    explanation: 'memmove处理内存重叠情况。源和目标重叠时，memmove安全，memcpy可能出错。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['memmove', '内存重叠', '安全复制'],
      },
  {
    id: 4017,
    chapter: 'level3',
    type: 'output',
    title: 'memset内存设置',
    description: '填充内存',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    uint8_t buffer[10];

    memset(buffer, 0, sizeof(buffer));

    printf("After zero: ");
    for (uint8_t i = 0; i < 10; i++) printf("%u ", buffer[i]);
    printf("\\n");

    memset(buffer, 0xFF, 5);

    printf("After 0xFF: ");
    for (uint8_t i = 0; i < 10; i++) printf("%02X ", buffer[i]);
    printf("\\n");

    return 0;
}`,
    correctOutput: 'After zero: 0 0 0 0 0 0 0 0 0 0 \nAfter 0xFF: FF FF FF FF FF 00 00 00 00 00 ',
    explanation: 'memset用指定值填充内存。参数：(指针, 值, 字节数)。常用于清零缓冲区。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['memset', '内存填充', '清零'],
      },
  {
    id: 4018,
    chapter: 'level3',
    type: 'output',
    title: 'memcmp内存比较',
    description: '比较内存块',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    uint8_t data1[4] = {0x01, 0x02, 0x03, 0x04};
    uint8_t data2[4] = {0x01, 0x02, 0x03, 0x05};
    uint8_t data3[4] = {0x01, 0x02, 0x03, 0x04};

    printf("data1 vs data2: %d\\n", memcmp(data1, data2, 4));
    printf("data1 vs data3: %d\\n", memcmp(data1, data3, 4));
    printf("data2 vs data3: %d\\n", memcmp(data2, data3, 4));

    return 0;
}`,
    correctOutput: 'data1 vs data2: -1\ndata1 vs data3: 0\ndata2 vs data3: 1',
    explanation: 'memcmp比较内存块。返回0表示相等，负数表示第一个小于第二个，正数表示大于。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['memcmp', '内存比较'],
      },
  {
    id: 4019,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strcpy',
    description: '字符串复制',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char src[] = "Hello";
    char dst[10];

    strcpy(dst, src);

    printf("src: %s\\n", src);
    printf("dst: %s\\n", dst);
    printf("dst len: %zu\\n", strlen(dst));

    return 0;
}`,
    correctOutput: 'src: Hello\ndst: Hello\ndst len: 5',
    explanation: 'strcpy复制字符串，包括\\0结束符。目标缓冲区必须足够大，否则缓冲区溢出。建议用strncpy。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strcpy', '字符串复制', '缓冲区'],
      },
  {
    id: 4020,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strcat',
    description: '字符串连接',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char str[20] = "Hello";

    strcat(str, " ");
    strcat(str, "World");

    printf("Result: %s\\n", str);
    printf("Length: %zu\\n", strlen(str));

    return 0;
}`,
    correctOutput: 'Result: Hello World\nLength: 11',
    explanation: 'strcat连接字符串到目标末尾。目标缓冲区必须足够大。建议用strncat限制长度。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strcat', '字符串连接'],
      },
  {
    id: 5001,
    chapter: 'level4',
    type: 'output',
    title: '多线程-pthread创建',
    description: '创建线程',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>

void *thread_func(void *arg)
{
    uint8_t *value = (uint8_t*)arg;
    printf("Thread received: %u\\n", *value);
    return NULL;
}

int main(void)
{
    pthread_t thread;
    uint8_t data = 42;

    pthread_create(&thread, NULL, thread_func, &data);
    pthread_join(thread, NULL);

    printf("Thread completed\\n");
    return 0;
}`,
    correctOutput: 'Thread received: 42\nThread completed',
    explanation: 'pthread_create创建线程，参数：(线程ID, 属性, 函数, 参数)。pthread_join等待线程结束。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['pthread_create', 'pthread_join', '线程'],
    visualization: {
      type: 'html',
      file: 'visualizations-v2/pthread-create.html'
    }
  },
  {
    id: 5002,
    chapter: 'level4',
    type: 'output',
    title: '多线程-mutex互斥锁',
    description: '互斥锁保护共享资源',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>

static uint8_t counter = 0;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *increment(void *arg)
{
    for (uint8_t i = 0; i < 5; i++) {
        pthread_mutex_lock(&mutex);
        counter++;
        pthread_mutex_unlock(&mutex);
    }
    return NULL;
}

int main(void)
{
    pthread_t t1, t2;

    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Counter: %u\\n", counter);
    return 0;
}`,
    correctOutput: 'Counter: 10',
    explanation: 'mutex保护共享变量。lock/unlock确保同一时间只有一个线程访问。不加锁可能导致竞态条件。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['mutex', 'pthread_mutex_lock', '竞态条件'],
      },
  {
    id: 5003,
    chapter: 'level4',
    type: 'output',
    title: '进程-fork创建',
    description: '创建子进程',
    code: `#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void)
{
    pid_t pid = fork();

    if (pid == 0) {
        printf("Child process\\n");
    } else if (pid > 0) {
        wait(NULL);
        printf("Parent process\\n");
    } else {
        printf("Fork failed\\n");
    }

    return 0;
}`,
    correctOutput: 'Child process\nParent process',
    explanation: 'fork创建子进程。返回0表示子进程，返回正数表示父进程（子进程PID），返回-1表示失败。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fork', '进程创建', 'wait'],
      },
  {
    id: 5004,
    chapter: 'level4',
    type: 'output',
    title: '进程-pipe管道通信',
    description: '父子进程管道通信',
    code: `#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main(void)
{
    int fd[2];
    pipe(fd);

    pid_t pid = fork();

    if (pid == 0) {
        close(fd[0]);
        char msg[] = "Hello";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
    } else {
        close(fd[1]);
        char buf[20];
        read(fd[0], buf, sizeof(buf));
        printf("Received: %s\\n", buf);
        close(fd[0]);
        wait(NULL);
    }

    return 0;
}`,
    correctOutput: 'Received: Hello',
    explanation: 'pipe创建管道，fd[0]读端，fd[1]写端。父子进程通过管道通信。注意关闭不用的端。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['pipe', '进程通信', 'read/write'],
      },
  {
    id: 5005,
    chapter: 'level4',
    type: 'output',
    title: '信号-signal处理',
    description: '信号处理函数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <signal.h>
#include <unistd.h>

static volatile uint8_t signal_received = 0;

void signal_handler(int signum)
{
    signal_received = 1;
}

int main(void)
{
    signal(SIGUSR1, signal_handler);

    raise(SIGUSR1);

    if (signal_received) {
        printf("Signal received\\n");
    }

    return 0;
}`,
    correctOutput: 'Signal received',
    explanation: 'signal注册信号处理函数。raise发送信号给自己。SIGUSR1是用户自定义信号。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['signal', 'SIGUSR1', '信号处理'],
      },
  {
    id: 5006,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-指针数组应用',
    description: '字符串数组处理',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    const char *devices[] = {
        "Sensor",
        "Motor",
        "Display",
        NULL
    };

    uint8_t count = 0;
    for (const char **ptr = devices; *ptr != NULL; ptr++) {
        printf("Device: %s\\n", *ptr);
        count++;
    }

    printf("Total: %u\\n", count);
    return 0;
}`,
    correctOutput: 'Device: Sensor\nDevice: Motor\nDevice: Display\nTotal: 3',
    explanation: '指针数组存储字符串指针。NULL作为结束标记。用指针遍历指针数组是常见模式。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针数组', '字符串数组', 'NULL结束'],
      },
  {
    id: 5007,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-函数指针表',
    description: '命令处理函数表',
    code: `#include <stdio.h>
#include <stdint.h>

typedef void (*CmdHandler)(uint8_t);

void cmd_read(uint8_t addr)  { printf("Read addr: %u\\n", addr); }
void cmd_write(uint8_t addr) { printf("Write addr: %u\\n", addr); }
void cmd_reset(uint8_t arg)  { printf("Reset: %u\\n", arg); }

int main(void)
{
    CmdHandler handlers[3] = {cmd_read, cmd_write, cmd_reset};
    uint8_t commands[3] = {0, 1, 2};
    uint8_t args[3] = {10, 20, 0};

    for (uint8_t i = 0; i < 3; i++) {
        handlers[commands[i]](args[i]);
    }

    return 0;
}`,
    correctOutput: 'Read addr: 10\nWrite addr: 20\nReset: 0',
    explanation: '函数指针数组实现命令处理表。根据命令ID调用对应处理函数。嵌入式命令解析常用模式。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针数组', '命令处理', '查表法'],
      },
  {
    id: 5008,
    chapter: 'level4',
    type: 'output',
    title: '网络-socket创建',
    description: '创建套接字',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/socket.h>

int main(void)
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    if (sock < 0) {
        printf("Socket failed\\n");
        return 1;
    }

    printf("Socket created: %d\\n", sock);

    close(sock);
    printf("Socket closed\\n");

    return 0;
}`,
    correctOutput: 'Socket created: ',
    explanation: 'socket创建套接字。AF_INET是IPv4，SOCK_STREAM是TCP。返回文件描述符，失败返回-1。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['socket', 'AF_INET', 'SOCK_STREAM'],
      },
  {
    id: 5009,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-回调注册',
    description: '回调函数注册机制',
    code: `#include <stdio.h>
#include <stdint.h>

typedef void (*EventCallback)(uint8_t);

static EventCallback callbacks[4] = {NULL};
static uint8_t callback_count = 0;

void register_callback(EventCallback cb)
{
    if (callback_count < 4) {
        callbacks[callback_count++] = cb;
    }
}

void trigger_event(uint8_t event)
{
    for (uint8_t i = 0; i < callback_count; i++) {
        if (callbacks[i] != NULL) {
            callbacks[i](event);
        }
    }
}

void handler1(uint8_t e) { printf("Handler1: %u\\n", e); }
void handler2(uint8_t e) { printf("Handler2: %u\\n", e); }

int main(void)
{
    register_callback(handler1);
    register_callback(handler2);

    trigger_event(42);
    return 0;
}`,
    correctOutput: 'Handler1: 42\nHandler2: 42',
    explanation: '回调注册机制：注册函数指针到数组，事件发生时遍历调用。嵌入式事件驱动常用模式。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['回调注册', '事件驱动', '函数指针数组'],
      },
  {
    id: 5010,
    chapter: 'level4',
    type: 'output',
    title: '位操作-位图操作',
    description: '位图数据结构',
    code: `#include <stdio.h>
#include <stdint.h>

#define BITMAP_SIZE  32

void set_bit(uint32_t *bitmap, uint8_t bit)
{
    *bitmap |= (1U << bit);
}

void clear_bit(uint32_t *bitmap, uint8_t bit)
{
    *bitmap &= ~(1U << bit);
}

uint8_t test_bit(uint32_t bitmap, uint8_t bit)
{
    return (bitmap >> bit) & 1;
}

int main(void)
{
    uint32_t bitmap = 0;

    set_bit(&bitmap, 0);
    set_bit(&bitmap, 5);
    set_bit(&bitmap, 10);

    printf("Bitmap: 0x%08X\\n", bitmap);
    printf("Bit 5: %u\\n", test_bit(bitmap, 5));
    printf("Bit 6: %u\\n", test_bit(bitmap, 6));

    clear_bit(&bitmap, 5);
    printf("After clear: 0x%08X\\n", bitmap);

    return 0;
}`,
    correctOutput: 'Bitmap: 0x00000421\nBit 5: 1\nBit 6: 0\nAfter clear: 0x00000401',
    explanation: '位图用位表示状态。set_bit设置位，clear_bit清除位，test_bit测试位。资源管理常用。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位图', 'set_bit', 'clear_bit', 'test_bit'],
      },
  {
    id: 6001,
    chapter: 'level5',
    type: 'output',
    title: '内核模块-基本结构',
    description: '内核模块框架',
    code: `#include <linux/module.h>
#include <linux/kernel.h>
#include <linux/init.h>

static int __init mymodule_init(void)
{
    printk(KERN_INFO "Module loaded\\n");
    return 0;
}

static void __exit mymodule_exit(void)
{
    printk(KERN_INFO "Module unloaded\\n");
}

module_init(mymodule_init);
module_exit(mymodule_exit);

MODULE_LICENSE("GPL");
MODULE_AUTHOR("Developer");`,
    correctOutput: 'Module loaded',
    explanation: '内核模块用module_init和module_exit注册加载/卸载函数。printk是内核打印函数。这是驱动开发基础。',
    difficulty: 4,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内核模块', 'module_init', 'module_exit', 'printk'],
      },
  {
    id: 6002,
    chapter: 'level5',
    type: 'output',
    title: '驱动-file_operations',
    description: '字符设备操作',
    code: `#include <linux/module.h>
#include <linux/fs.h>
#include <linux/uaccess.h>

static int device_open(struct inode *inode, struct file *file)
{
    printk(KERN_INFO "Device opened\\n");
    return 0;
}

static int device_release(struct inode *inode, struct file *file)
{
    printk(KERN_INFO "Device closed\\n");
    return 0;
}

static struct file_operations fops = {
    .owner = THIS_MODULE,
    .open = device_open,
    .release = device_release,
};`,
    correctOutput: 'Device opened',
    explanation: 'file_operations定义设备操作函数。.open, .release, .read, .write等对应系统调用。驱动核心结构。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['file_operations', '字符设备', '驱动框架'],
      },
  {
    id: 6003,
    chapter: 'level5',
    type: 'output',
    title: '性能-缓存优化',
    description: '缓存行对齐',
    code: `#include <stdio.h>
#include <stdint.h>

#define CACHE_LINE_SIZE  64

typedef struct {
    uint8_t data;
    uint8_t padding[CACHE_LINE_SIZE - 1];
} __attribute__((aligned(CACHE_LINE_SIZE))) CacheAligned;

typedef struct {
    uint8_t data;
} NotAligned;

int main(void)
{
    printf("Aligned: %zu\\n", sizeof(CacheAligned));
    printf("Not aligned: %zu\\n", sizeof(NotAligned));

    return 0;
}`,
    correctOutput: 'Aligned: 64\nNot aligned: 1',
    explanation: '缓存行对齐避免伪共享。aligned属性指定对齐。多线程性能优化重要技术。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['缓存行对齐', 'aligned', '性能优化'],
      },
  {
    id: 6004,
    chapter: 'level5',
    type: 'output',
    title: '安全-缓冲区溢出防护',
    description: '安全的字符串操作',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define BUFFER_SIZE  16

int safe_copy(char *dst, size_t dst_size, const char *src)
{
    if (dst == NULL || src == NULL) {
        return -1;
    }

    size_t src_len = strlen(src);
    if (src_len >= dst_size) {
        return -2;
    }

    memcpy(dst, src, src_len + 1);
    return 0;
}

int main(void)
{
    char buffer[BUFFER_SIZE];

    if (safe_copy(buffer, BUFFER_SIZE, "Hello") == 0) {
        printf("Copied: %s\\n", buffer);
    }

    if (safe_copy(buffer, BUFFER_SIZE, "This is a very long string") != 0) {
        printf("Copy rejected\\n");
    }

    return 0;
}`,
    correctOutput: 'Copied: Hello\nCopy rejected',
    explanation: '安全函数检查缓冲区大小，拒绝溢出操作。嵌入式安全编程必须防止缓冲区溢出。',
    difficulty: 4,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['缓冲区溢出', '安全编程', '边界检查'],
      },
  {
    id: 6005,
    chapter: 'level5',
    type: 'output',
    title: '架构-分层设计',
    description: '硬件抽象层',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    int (*init)(void);
    int (*read)(uint8_t *data, uint8_t len);
    int (*write)(const uint8_t *data, uint8_t len);
} HalDriver;

static int gpio_init(void) { printf("GPIO init\\n"); return 0; }
static int gpio_read(uint8_t *data, uint8_t len) { printf("GPIO read\\n"); return len; }
static int gpio_write(const uint8_t *data, uint8_t len) { printf("GPIO write\\n"); return len; }

static HalDriver gpio_driver = {
    .init = gpio_init,
    .read = gpio_read,
    .write = gpio_write
};

int main(void)
{
    HalDriver *drv = &gpio_driver;

    drv->init();
    uint8_t data[4];
    drv->read(data, 4);
    drv->write(data, 4);

    return 0;
}`,
    correctOutput: 'GPIO init\nGPIO read\nGPIO write',
    explanation: 'HAL硬件抽象层：统一接口，底层实现可替换。函数指针实现多态。嵌入式架构核心模式。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['HAL', '硬件抽象层', '分层设计', '函数指针'],
      },
  {
    id: 3031,
    chapter: 'level2',
    type: 'output',
    title: '指针-野指针危险',
    description: '未初始化的指针',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *ptr = NULL;

    if (ptr != NULL) {
        printf("Value: %u\\n", *ptr);
    } else {
        printf("Pointer is NULL\\n");
    }

    ptr = (uint8_t*)malloc(sizeof(uint8_t));
    if (ptr != NULL) {
        *ptr = 100;
        printf("Allocated: %u\\n", *ptr);
        free(ptr);
        ptr = NULL;
    }

    return 0;
}`,
    correctOutput: 'Pointer is NULL\nAllocated: 100',
    explanation: '未初始化的指针是野指针，指向随机地址，访问会导致未定义行为。指针应初始化为NULL，释放后置NULL。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['野指针', 'NULL初始化', '悬空指针'],
    visualization: { type: 'html', file: 'visualizations-v2/wild-pointer.html' },
      },
  {
    id: 3032,
    chapter: 'level2',
    type: 'output',
    title: '指针-悬空指针',
    description: '释放后继续使用',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *ptr = (uint8_t*)malloc(sizeof(uint8_t));

    if (ptr != NULL) {
        *ptr = 50;
        printf("Before free: %u\\n", *ptr);

        free(ptr);
        ptr = NULL;
    }

    if (ptr == NULL) {
        printf("Pointer is NULL\\n");
    }

    return 0;
}`,
    correctOutput: 'Before free: 50\nPointer is NULL',
    explanation: 'free后指针变成悬空指针，指向已释放的内存。继续使用是未定义行为。free后应立即置NULL。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['悬空指针', 'free', '内存安全'],
    visualization: { type: 'html', file: 'visualizations-v2/dangling-pointer.html' },
      },
  {
    id: 3033,
    chapter: 'level2',
    type: 'output',
    title: '结构体-位域对齐',
    description: '位域内存布局',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t a : 3;
    uint8_t b : 5;
    uint8_t c : 2;
} BitFields1;

typedef struct {
    uint8_t a : 3;
    uint8_t   : 0;
    uint8_t c : 2;
} BitFields2;

int main(void)
{
    printf("BitFields1: %zu\\n", sizeof(BitFields1));
    printf("BitFields2: %zu\\n", sizeof(BitFields2));

    return 0;
}`,
    correctOutput: 'BitFields1: 2\nBitFields2: 2',
    explanation: '位域按存储单元对齐。BitFields1: a(3)+b(5)=8位, c(2)=2位，共10位对齐到2字节。:0强制对齐到下一单元。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位域', '内存对齐', '匿名位域'],
    visualization: { type: 'html', file: 'visualizations-v2/bitfield-alignment.html' },
      },
  {
    id: 3034,
    chapter: 'level2',
    type: 'output',
    title: '联合体-协议解析',
    description: '用联合体解析协议帧',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t header;
    uint8_t length;
    uint8_t data[4];
    uint8_t checksum;
} Frame;

typedef union {
    uint8_t bytes[7];
    Frame frame;
} FrameParser;

int main(void)
{
    FrameParser parser;
    uint8_t raw[] = {0xAA, 0x04, 0x01, 0x02, 0x03, 0x04, 0x0E};

    for (uint8_t i = 0; i < 7; i++) {
        parser.bytes[i] = raw[i];
    }

    printf("Header: 0x%02X\\n", parser.frame.header);
    printf("Length: %u\\n", parser.frame.length);
    printf("Data[0]: 0x%02X\\n", parser.frame.data[0]);

    return 0;
}`,
    correctOutput: 'Header: 0xAA\nLength: 4\nData[0]: 0x01',
    explanation: '联合体实现协议解析。可以按字节访问或按结构体访问同一内存。嵌入式协议处理常用技巧。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体', '内存共享', '协议解析'],
    visualization: { type: 'html', file: 'visualizations-v2/union-memory-share.html' },
      },
  {
    id: 3035,
    chapter: 'level2',
    type: 'output',
    title: '枚举-状态定义',
    description: '用枚举定义状态',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    DEV_STATE_INIT = 0,
    DEV_STATE_READY = 1,
    DEV_STATE_BUSY = 2,
    DEV_STATE_ERROR = 3
} DeviceState;

const char* state_to_string(DeviceState state)
{
    static const char* names[] = {
        "INIT", "READY", "BUSY", "ERROR"
    };
    return names[state];
}

int main(void)
{
    DeviceState current = DEV_STATE_READY;

    printf("State: %s (%d)\\n", state_to_string(current), current);

    current = DEV_STATE_BUSY;
    printf("State: %s (%d)\\n", state_to_string(current), current);

    return 0;
}`,
    correctOutput: 'State: READY (1)\nState: BUSY (2)',
    explanation: '枚举定义命名常量，提高代码可读性。配合字符串数组实现状态名打印。调试时非常有用。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['enum', '状态定义', '状态机'],
      },
  {
    id: 3036,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-策略模式',
    description: '运行时选择算法',
    code: `#include <stdio.h>
#include <stdint.h>

typedef uint16_t (*SortFunc)(uint16_t a, uint16_t b);

uint16_t ascending(uint16_t a, uint16_t b)
{
    return (a < b) ? a : b;
}

uint16_t descending(uint16_t a, uint16_t b)
{
    return (a > b) ? a : b;
}

uint16_t process(uint16_t x, uint16_t y, SortFunc strategy)
{
    return strategy(x, y);
}

int main(void)
{
    printf("Min: %u\\n", process(10, 20, ascending));
    printf("Max: %u\\n", process(10, 20, descending));

    return 0;
}`,
    correctOutput: 'Min: 10\nMax: 20',
    explanation: '函数指针实现策略模式。运行时选择不同算法。ascending返回较小值，descending返回较大值。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针', '策略模式', '回调'],
    visualization: { type: 'html', file: 'visualizations-v2/function-pointer-strategy.html' },
      },
  {
    id: 3037,
    chapter: 'level2',
    type: 'output',
    title: '多文件-头文件保护',
    description: '防止头文件重复包含',
    code: `#include <stdio.h>
#include <stdint.h>

#ifndef CONFIG_H
#define CONFIG_H

#define MAX_DEVICES  10
#define BUFFER_SIZE  256

typedef struct {
    uint8_t id;
    uint16_t value;
} DeviceConfig;

#endif

int main(void)
{
    DeviceConfig config = {1, 100};

    printf("ID: %u\\n", config.id);
    printf("Value: %u\\n", config.value);
    printf("Max: %d\\n", MAX_DEVICES);

    return 0;
}`,
    correctOutput: 'ID: 1\nValue: 100\nMax: 10',
    explanation: '#ifndef/#define/#endif防止头文件重复包含。这是C语言头文件的标准写法。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['头文件保护', '#ifndef', '重复包含'],
    visualization: { type: 'html', file: 'visualizations-v2/header-guard.html' },
      },
  {
    id: 3038,
    chapter: 'level2',
    type: 'output',
    title: '指针-数组传参退化',
    description: '数组作为参数退化为指针',
    code: `#include <stdio.h>
#include <stdint.h>

void print_size(uint8_t arr[])
{
    printf("In function: %zu\\n", sizeof(arr));
}

int main(void)
{
    uint8_t data[10] = {0};

    printf("In main: %zu\\n", sizeof(data));
    print_size(data);

    return 0;
}`,
    correctOutput: 'In main: 10\nIn function: 8',
    explanation: '数组作为函数参数时退化为指针。sizeof(arr)在函数内是指针大小（8字节），不是数组大小！',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组退化', 'sizeof', '函数参数'],
    visualization: { type: 'html', file: 'visualizations-v2/array-param-decay.html' },
      },
  {
    id: 3039,
    chapter: 'level2',
    type: 'output',
    title: '指针-字符串常量',
    description: '字符串指针与字符数组',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    char str1[] = "Hello";
    char *str2 = "World";

    str1[0] = 'h';
    printf("str1: %s\\n", str1);

    printf("str2: %s\\n", str2);

    printf("str1 addr: %p\\n", (void*)str1);
    printf("str2 addr: %p\\n", (void*)str2);

    return 0;
}`,
    correctOutput: 'str1: hello\nstr2: World',
    explanation: 'char[]在栈上，可修改。char*指向常量区，不可修改（修改会崩溃）。str1可改，str2只读。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['字符串常量', '字符数组', '只读内存'],
    visualization: { type: 'html', file: 'visualizations-v2/string-const-pointer.html' },
      },
  {
    id: 3040,
    chapter: 'level2',
    type: 'output',
    title: '结构体-柔性数组',
    description: '结构体末尾的可变长数组',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct {
    uint8_t length;
    uint8_t data[];
} FlexArray;

int main(void)
{
    FlexArray *arr = (FlexArray*)malloc(sizeof(FlexArray) + 5);

    arr->length = 5;
    for (uint8_t i = 0; i < 5; i++) {
        arr->data[i] = i * 10;
    }

    printf("Length: %u\\n", arr->length);
    printf("data[2]: %u\\n", arr->data[2]);

    free(arr);
    return 0;
}`,
    correctOutput: 'Length: 5\ndata[2]: 20',
    explanation: '柔性数组是结构体末尾的空数组。分配时额外申请空间。常用于变长数据包、动态缓冲区。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['柔性数组', '变长结构体', '动态分配'],
      },
  {
    id: 4021,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-fseek定位',
    description: '文件随机访问',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    FILE *fp = fopen("test.bin", "wb+");
    uint8_t data[4] = {0x11, 0x22, 0x33, 0x44};

    fwrite(data, 1, 4, fp);

    fseek(fp, 2, SEEK_SET);
    uint8_t byte;
    fread(&byte, 1, 1, fp);
    printf("Byte at 2: 0x%02X\\n", byte);

    fseek(fp, -1, SEEK_END);
    fread(&byte, 1, 1, fp);
    printf("Last byte: 0x%02X\\n", byte);

    fclose(fp);
    return 0;
}`,
    correctOutput: 'Byte at 2: 0x33\nLast byte: 0x44',
    explanation: 'fseek定位文件指针。SEEK_SET从头，SEEK_CUR当前位置，SEEK_END从尾。随机访问文件内容。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fseek', 'SEEK_SET', '随机访问'],
      },
  {
    id: 4022,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-ftell获取位置',
    description: '获取当前文件位置',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    FILE *fp = fopen("test.txt", "w+");
    fprintf(fp, "Hello World");

    long pos = ftell(fp);
    printf("Position: %ld\\n", pos);

    fseek(fp, 0, SEEK_SET);
    printf("After seek: %ld\\n", ftell(fp));

    char buf[6];
    fread(buf, 1, 5, buf);
    buf[5] = '\\0';
    printf("Read: %s\\n", buf);

    fclose(fp);
    return 0;
}`,
    correctOutput: 'Position: 11\nAfter seek: 0',
    explanation: 'ftell返回当前文件位置。写入"Hello World"后位置在11。fseek到开头后位置变为0。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['ftell', '文件位置', 'fseek'],
      },
  {
    id: 4023,
    chapter: 'level3',
    type: 'output',
    title: '位操作-计算置位个数',
    description: '统计1的个数',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t count_bits(uint32_t val)
{
    uint8_t count = 0;
    while (val) {
        count += val & 1;
        val >>= 1;
    }
    return count;
}

int main(void)
{
    printf("0xFF: %u bits\\n", count_bits(0xFF));
    printf("0x0F: %u bits\\n", count_bits(0x0F));
    printf("0x55: %u bits\\n", count_bits(0x55));

    return 0;
}`,
    correctOutput: '0xFF: 8 bits\n0x0F: 4 bits\n0x55: 4 bits',
    explanation: '统计二进制中1的个数。0xFF=11111111有8个1，0x0F=00001111有4个1，0x55=01010101有4个1。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位计数', 'popcount', '位操作'],
      },
  {
    id: 4024,
    chapter: 'level3',
    type: 'output',
    title: '位操作-判断2的幂',
    description: '判断是否是2的幂次',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t is_power_of_two(uint32_t val)
{
    return val != 0 && (val & (val - 1)) == 0;
}

int main(void)
{
    printf("1: %s\\n", is_power_of_two(1) ? "Yes" : "No");
    printf("2: %s\\n", is_power_of_two(2) ? "Yes" : "No");
    printf("4: %s\\n", is_power_of_two(4) ? "Yes" : "No");
    printf("6: %s\\n", is_power_of_two(6) ? "Yes" : "No");
    printf("0: %s\\n", is_power_of_two(0) ? "Yes" : "No");

    return 0;
}`,
    correctOutput: '1: Yes\n2: Yes\n4: Yes\n6: No\n0: No',
    explanation: '2的幂只有一个1。val & (val-1)清除最低位的1。如果结果为0，说明只有一个1，是2的幂。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['2的幂', '位运算技巧', 'val&(val-1)'],
      },
  {
    id: 4025,
    chapter: 'level3',
    type: 'output',
    title: '位操作-交换两数',
    description: '不用临时变量交换',
    code: `#include <stdio.h>
#include <stdint.h>

void swap_xor(uint8_t *a, uint8_t *b)
{
    if (a != b) {
        *a ^= *b;
        *b ^= *a;
        *a ^= *b;
    }
}

int main(void)
{
    uint8_t x = 10, y = 20;

    printf("Before: x=%u, y=%u\\n", x, y);
    swap_xor(&x, &y);
    printf("After: x=%u, y=%u\\n", x, y);

    return 0;
}`,
    correctOutput: 'Before: x=10, y=20\nAfter: x=20, y=10',
    explanation: '异或交换：a^=b, b^=a, a^=b。不需要临时变量。注意a和b不能指向同一地址！',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['异或交换', '位运算技巧'],
      },
  {
    id: 4026,
    chapter: 'level3',
    type: 'output',
    title: '预处理-条件编译调试',
    description: '调试开关控制',
    code: `#include <stdio.h>
#include <stdint.h>

#define DEBUG_LEVEL 2

#if DEBUG_LEVEL >= 3
#define DEBUG3(msg) printf("[DEBUG3] %s\\n", msg)
#else
#define DEBUG3(msg)
#endif

#if DEBUG_LEVEL >= 2
#define DEBUG2(msg) printf("[DEBUG2] %s\\n", msg)
#else
#define DEBUG2(msg)
#endif

#if DEBUG_LEVEL >= 1
#define DEBUG1(msg) printf("[DEBUG1] %s\\n", msg)
#else
#define DEBUG1(msg)
#endif

int main(void)
{
    DEBUG1("Level 1");
    DEBUG2("Level 2");
    DEBUG3("Level 3");

    return 0;
}`,
    correctOutput: '[DEBUG1] Level 1\n[DEBUG2] Level 2',
    explanation: '条件编译控制调试输出。DEBUG_LEVEL=2时，DEBUG1和DEBUG2生效，DEBUG3被编译掉。发布时改为0关闭所有调试。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['条件编译', '#if', '调试开关'],
      },
  {
    id: 4027,
    chapter: 'level3',
    type: 'output',
    title: '预处理-断言宏',
    description: '编译时断言',
    code: `#include <stdio.h>
#include <stdint.h>

#define STATIC_ASSERT(cond, msg) \\
    typedef char static_assert_##msg[(cond) ? 1 : -1]

#define BUFFER_SIZE 256

STATIC_ASSERT(BUFFER_SIZE >= 64, buffer_too_small);
STATIC_ASSERT(BUFFER_SIZE <= 1024, buffer_too_large);

int main(void)
{
    printf("Buffer size: %d\\n", BUFFER_SIZE);
    printf("Assertions passed\\n");

    return 0;
}`,
    correctOutput: 'Buffer size: 256\nAssertions passed',
    explanation: '编译时断言：条件为假时数组大小为-1，编译报错。用于检查编译时常量，比运行时断言更早发现问题。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['静态断言', '编译时检查', 'typedef技巧'],
      },
  {
    id: 4028,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-函数指针返回指针',
    description: '返回指针的函数指针',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

uint8_t* create_buffer(uint8_t size)
{
    return (uint8_t*)malloc(size);
}

int main(void)
{
    uint8_t* (*creator)(uint8_t) = create_buffer;

    uint8_t *buf = creator(10);
    if (buf != NULL) {
        buf[0] = 100;
        printf("buf[0] = %u\\n", buf[0]);
        free(buf);
    }

    return 0;
}`,
    correctOutput: 'buf[0] = 100',
    explanation: 'uint8_t* (*creator)(uint8_t)：creator是函数指针，指向返回uint8_t*、参数uint8_t的函数。返回指针的函数指针。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针', '返回指针', '复杂声明'],
      },
  {
    id: 4029,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-数组指针函数',
    description: '返回数组指针的函数',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t (*get_array(void))[4]
{
    static uint8_t arr[4] = {1, 2, 3, 4};
    return &arr;
}

int main(void)
{
    uint8_t (*ptr)[4] = get_array();

    printf("arr[0] = %u\\n", (*ptr)[0]);
    printf("arr[3] = %u\\n", (*ptr)[3]);

    return 0;
}`,
    correctOutput: 'arr[0] = 1\narr[3] = 4',
    explanation: 'uint8_t (*get_array(void))[4]：函数返回指向4元素uint8_t数组的指针。这是最复杂的C声明之一。',
    difficulty: 5,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['数组指针', '函数返回指针', '复杂声明'],
      },
  {
    id: 4030,
    chapter: 'level3',
    type: 'output',
    title: '内存对齐-alignof',
    description: '_Alignof查询对齐要求',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdalign.h>

int main(void)
{
    printf("uint8_t align: %zu\\n", alignof(uint8_t));
    printf("uint16_t align: %zu\\n", alignof(uint16_t));
    printf("uint32_t align: %zu\\n", alignof(uint32_t));
    printf("uint64_t align: %zu\\n", alignof(uint64_t));
    printf("double align: %zu\\n", alignof(double));

    return 0;
}`,
    correctOutput: 'uint8_t align: 1\nuint16_t align: 2\nuint32_t align: 4\nuint64_t align: 8\ndouble align: 8',
    explanation: 'alignof返回类型的对齐要求。uint8_t对齐1字节，uint16_t对齐2字节，uint32_t对齐4字节等。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['alignof', '内存对齐', 'C11'],
      },
  {
    id: 5011,
    chapter: 'level4',
    type: 'output',
    title: '进程-exec替换程序',
    description: 'exec函数族',
    code: `#include <stdio.h>
#include <stdint.h>
#include <unistd.h>

int main(void)
{
    printf("Before exec\\n");

    execl("/bin/echo", "echo", "Hello from exec", NULL);

    printf("This will not print if exec succeeds\\n");

    return 0;
}`,
    correctOutput: 'Before exec\nHello from exec',
    explanation: 'exec函数替换当前进程映像。成功后原代码不再执行。常用于创建新进程执行其他程序。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['exec', '进程替换', 'execl'],
      },
  {
    id: 5012,
    chapter: 'level4',
    type: 'output',
    title: '进程-共享内存',
    description: '共享内存IPC',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/shm.h>
#include <string.h>

int main(void)
{
    key_t key = 1234;
    int shmid = shmget(key, 1024, IPC_CREAT | 0666);

    if (shmid < 0) {
        printf("shmget failed\\n");
        return 1;
    }

    char *shm = (char*)shmat(shmid, NULL, 0);
    strcpy(shm, "Hello Shared Memory");

    printf("Written: %s\\n", shm);

    shmdt(shm);
    shmctl(shmid, IPC_RMID, NULL);

    return 0;
}`,
    correctOutput: 'Written: Hello Shared Memory',
    explanation: '共享内存是最快的IPC方式。shmget创建，shmat连接，shmdt断开，shmctl控制。多进程共享数据。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['共享内存', 'shmget', 'shmat', 'IPC'],
      },
  {
    id: 5013,
    chapter: 'level4',
    type: 'output',
    title: '进程-信号量',
    description: '信号量同步',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/sem.h>
#include <sys/ipc.h>

int main(void)
{
    key_t key = 5678;
    int semid = semget(key, 1, IPC_CREAT | 0666);

    semctl(semid, 0, SETVAL, 1);

    struct sembuf op;
    op.sem_num = 0;
    op.sem_op = -1;
    op.sem_flg = 0;

    semop(semid, &op, 1);
    printf("Critical section\\n");

    op.sem_op = 1;
    semop(semid, &op, 1);
    printf("Released\\n");

    semctl(semid, 0, IPC_RMID);
    return 0;
}`,
    correctOutput: 'Critical section\nReleased',
    explanation: '信号量用于进程同步。P操作(-1)获取资源，V操作(+1)释放资源。保护临界区。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['信号量', 'semget', 'semop', '同步'],
      },
  {
    id: 5014,
    chapter: 'level4',
    type: 'output',
    title: '网络-TCP客户端',
    description: 'TCP连接流程',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

int main(void)
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    struct sockaddr_in server;
    server.sin_family = AF_INET;
    server.sin_port = htons(8080);
    server.sin_addr.s_addr = inet_addr("127.0.0.1");

    if (connect(sock, (struct sockaddr*)&server, sizeof(server)) < 0) {
        printf("Connection failed (expected - no server)\\n");
    } else {
        printf("Connected\\n");
    }

    close(sock);
    return 0;
}`,
    correctOutput: 'Connection failed (expected - no server)',
    explanation: 'TCP客户端流程：socket创建套接字，connect连接服务器。本例无服务器所以连接失败。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['TCP客户端', 'socket', 'connect'],
      },
  {
    id: 5015,
    chapter: 'level4',
    type: 'output',
    title: '网络-TCP服务器',
    description: 'TCP服务器流程',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(void)
{
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);

    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr;
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9999);
    addr.sin_addr.s_addr = INADDR_ANY;

    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        printf("Bind failed\\n");
        return 1;
    }

    listen(server_fd, 5);
    printf("Server listening on port 9999\\n");

    close(server_fd);
    return 0;
}`,
    correctOutput: 'Server listening on port 9999',
    explanation: 'TCP服务器流程：socket->bind->listen->accept。SO_REUSEADDR允许地址重用。本例只演示到listen。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['TCP服务器', 'bind', 'listen'],
      },
  {
    id: 5016,
    chapter: 'level4',
    type: 'output',
    title: 'IO-select多路复用',
    description: 'select监控多文件描述符',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/select.h>
#include <unistd.h>

int main(void)
{
    fd_set readfds;
    struct timeval timeout;

    FD_ZERO(&readfds);
    FD_SET(STDIN_FILENO, &readfds);

    timeout.tv_sec = 0;
    timeout.tv_usec = 100000;

    int ret = select(STDIN_FILENO + 1, &readfds, NULL, NULL, &timeout);

    if (ret == 0) {
        printf("Timeout - no input\\n");
    } else if (ret < 0) {
        printf("Error\\n");
    } else {
        if (FD_ISSET(STDIN_FILENO, &readfds)) {
            printf("Input available\\n");
        }
    }

    return 0;
}`,
    correctOutput: 'Timeout - no input',
    explanation: 'select监控多个文件描述符。超时100ms无输入返回0。用于实现非阻塞IO、多客户端服务。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['select', 'IO多路复用', 'fd_set'],
      },
  {
    id: 5017,
    chapter: 'level4',
    type: 'output',
    title: 'IO-epoll高效IO',
    description: 'epoll事件驱动',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/epoll.h>
#include <unistd.h>

int main(void)
{
    int epfd = epoll_create1(0);

    struct epoll_event ev;
    ev.events = EPOLLIN;
    ev.data.fd = STDIN_FILENO;

    epoll_ctl(epfd, EPOLL_CTL_ADD, STDIN_FILENO, &ev);

    struct epoll_event events[10];
    int nfds = epoll_wait(epfd, events, 10, 100);

    if (nfds == 0) {
        printf("Timeout\\n");
    } else {
        printf("Events: %d\\n", nfds);
    }

    close(epfd);
    return 0;
}`,
    correctOutput: 'Timeout',
    explanation: 'epoll是Linux高效的IO多路复用机制。epoll_create创建实例，epoll_ctl添加监控，epoll_wait等待事件。',
    difficulty: 5,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['epoll', 'IO多路复用', '事件驱动'],
      },
  {
    id: 5018,
    chapter: 'level4',
    type: 'output',
    title: '线程-条件变量',
    description: '条件变量同步',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>

static uint8_t ready = 0;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
static pthread_cond_t cond = PTHREAD_COND_INITIALIZER;

void* waiter(void* arg)
{
    pthread_mutex_lock(&mutex);
    while (!ready) {
        pthread_cond_wait(&cond, &mutex);
    }
    printf("Condition met\\n");
    pthread_mutex_unlock(&mutex);
    return NULL;
}

int main(void)
{
    pthread_t thread;
    pthread_create(&thread, NULL, waiter, NULL);

    usleep(10000);

    pthread_mutex_lock(&mutex);
    ready = 1;
    pthread_cond_signal(&cond);
    pthread_mutex_unlock(&mutex);

    pthread_join(thread, NULL);
    return 0;
}`,
    correctOutput: 'Condition met',
    explanation: '条件变量用于线程间等待/通知。pthread_cond_wait等待条件，pthread_cond_signal通知。必须配合mutex使用。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['条件变量', 'pthread_cond', '线程同步'],
      },
  {
    id: 5019,
    chapter: 'level4',
    type: 'output',
    title: '线程-读写锁',
    description: '读写锁优化并发',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>

static uint32_t shared_data = 0;
static pthread_rwlock_t rwlock = PTHREAD_RWLOCK_INITIALIZER;

void* reader(void* arg)
{
    pthread_rwlock_rdlock(&rwlock);
    printf("Read: %u\\n", shared_data);
    pthread_rwlock_unlock(&rwlock);
    return NULL;
}

void* writer(void* arg)
{
    pthread_rwlock_wrlock(&rwlock);
    shared_data = 100;
    printf("Written\\n");
    pthread_rwlock_unlock(&rwlock);
    return NULL;
}

int main(void)
{
    pthread_t t1, t2;

    pthread_create(&t1, NULL, writer, NULL);
    pthread_join(t1, NULL);

    pthread_create(&t2, NULL, reader, NULL);
    pthread_join(t2, NULL);

    return 0;
}`,
    correctOutput: 'Written\nRead: 100',
    explanation: '读写锁允许多个读者同时读，写者独占。适合读多写少场景。rdlock共享，wrlock独占。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['读写锁', 'pthread_rwlock', '并发优化'],
      },
  {
    id: 5020,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-链表实现',
    description: '单链表操作',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct Node {
    uint8_t data;
    struct Node* next;
} Node;

Node* create_node(uint8_t data)
{
    Node* node = (Node*)malloc(sizeof(Node));
    node->data = data;
    node->next = NULL;
    return node;
}

int main(void)
{
    Node* head = create_node(1);
    head->next = create_node(2);
    head->next->next = create_node(3);

    Node* curr = head;
    while (curr != NULL) {
        printf("%u ", curr->data);
        curr = curr->next;
    }
    printf("\\n");

    while (head != NULL) {
        Node* tmp = head;
        head = head->next;
        free(tmp);
    }

    return 0;
}`,
    correctOutput: '1 2 3 ',
    explanation: '链表是嵌入式常用数据结构。节点包含数据和next指针。遍历用while循环，释放要逐个free。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['链表', '指针', '动态内存'],
      },
  {
    id: 6006,
    chapter: 'level5',
    type: 'output',
    title: '内核-内核定时器',
    description: '内核定时器使用',
    code: `#include <linux/module.h>
#include <linux/timer.h>

static struct timer_list my_timer;

static void timer_callback(struct timer_list *t)
{
    printk(KERN_INFO "Timer expired\\n");
}

static int __init my_init(void)
{
    timer_setup(&my_timer, timer_callback, 0);
    my_timer.expires = jiffies + msecs_to_jiffies(1000);
    add_timer(&my_timer);

    printk(KERN_INFO "Module loaded\\n");
    return 0;
}

static void __exit my_exit(void)
{
    del_timer(&my_timer);
    printk(KERN_INFO "Module unloaded\\n");
}

module_init(my_init);
module_exit(my_exit);`,
    correctOutput: 'Module loaded\nTimer expired',
    explanation: '内核定时器用于延迟执行。timer_setup初始化，add_timer添加，del_timer删除。jiffies是内核时钟。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内核定时器', 'timer_list', 'jiffies'],
      },
  {
    id: 6007,
    chapter: 'level5',
    type: 'output',
    title: '驱动-ioctl接口',
    description: '设备控制接口',
    code: `#include <linux/module.h>
#include <linux/fs.h>
#include <linux/uaccess.h>

#define CMD_GET_VALUE _IOR('M', 1, int)
#define CMD_SET_VALUE _IOW('M', 2, int)

static int device_value = 0;

static long device_ioctl(struct file *file, unsigned int cmd, unsigned long arg)
{
    switch (cmd) {
        case CMD_GET_VALUE:
            if (copy_to_user((int*)arg, &device_value, sizeof(int))) {
                return -EFAULT;
            }
            break;
        case CMD_SET_VALUE:
            if (copy_from_user(&device_value, (int*)arg, sizeof(int))) {
                return -EFAULT;
            }
            break;
        default:
            return -ENOTTY;
    }
    return 0;
}`,
    correctOutput: 'ioctl: 0',
    explanation: 'ioctl是设备控制接口。_IOR/_IOW定义命令码。copy_to_user/copy_from_user在内核和用户空间复制数据。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['ioctl', '_IOR', '_IOW', 'copy_to_user'],
      },
  {
    id: 6008,
    chapter: 'level5',
    type: 'output',
    title: '性能-内存池',
    description: '内存池实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

#define POOL_SIZE  1024
#define BLOCK_SIZE 32

typedef struct {
    uint8_t memory[POOL_SIZE];
    uint8_t used[POOL_SIZE / BLOCK_SIZE];
} MemoryPool;

void* pool_alloc(MemoryPool* pool)
{
    for (uint16_t i = 0; i < POOL_SIZE / BLOCK_SIZE; i++) {
        if (!pool->used[i]) {
            pool->used[i] = 1;
            return &pool->memory[i * BLOCK_SIZE];
        }
    }
    return NULL;
}

void pool_free(MemoryPool* pool, void* ptr)
{
    uint16_t index = ((uint8_t*)ptr - pool->memory) / BLOCK_SIZE;
    if (index < POOL_SIZE / BLOCK_SIZE) {
        pool->used[index] = 0;
    }
}

int main(void)
{
    MemoryPool pool = {0};

    void* block1 = pool_alloc(&pool);
    void* block2 = pool_alloc(&pool);

    printf("Allocated: %p, %p\\n", block1, block2);

    pool_free(&pool, block1);
    void* block3 = pool_alloc(&pool);

    printf("Reused: %p\\n", block3);

    return 0;
}`,
    correctOutput: 'Allocated: ',
    explanation: '内存池预分配大块内存，按需分配小块。避免频繁malloc/free，提高性能，减少内存碎片。嵌入式常用。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内存池', '性能优化', '内存管理'],
      },
  {
    id: 6009,
    chapter: 'level5',
    type: 'output',
    title: '安全-整数溢出检测',
    description: '安全的整数运算',
    code: `#include <stdio.h>
#include <stdint.h>
#include <limits.h>

int safe_add(uint32_t a, uint32_t b, uint32_t* result)
{
    if (a > UINT32_MAX - b) {
        return -1;
    }
    *result = a + b;
    return 0;
}

int safe_mul(uint32_t a, uint32_t b, uint32_t* result)
{
    if (a != 0 && b > UINT32_MAX / a) {
        return -1;
    }
    *result = a * b;
    return 0;
}

int main(void)
{
    uint32_t result;

    if (safe_add(100, 200, &result) == 0) {
        printf("Add: %u\\n", result);
    }

    if (safe_mul(1000000, 5000, &result) != 0) {
        printf("Multiplication overflow detected\\n");
    }

    return 0;
}`,
    correctOutput: 'Add: 300\nMultiplication overflow detected',
    explanation: '整数溢出是常见安全漏洞。运算前检查是否溢出。a + b溢出检查：a > MAX - b。乘法类似。',
    difficulty: 4,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['整数溢出', '安全编程', '边界检查'],
      },
  {
    id: 6010,
    chapter: 'level5',
    type: 'output',
    title: '架构-观察者模式',
    description: '事件订阅机制',
    code: `#include <stdio.h>
#include <stdint.h>

#define MAX_OBSERVERS  4

typedef void (*ObserverFunc)(uint8_t event);

static ObserverFunc observers[MAX_OBSERVERS];
static uint8_t observer_count = 0;

void subscribe(ObserverFunc func)
{
    if (observer_count < MAX_OBSERVERS) {
        observers[observer_count++] = func;
    }
}

void notify(uint8_t event)
{
    for (uint8_t i = 0; i < observer_count; i++) {
        observers[i](event);
    }
}

void logger(uint8_t e) { printf("Log: Event %u\\n", e); }
void handler(uint8_t e) { printf("Handle: Event %u\\n", e); }

int main(void)
{
    subscribe(logger);
    subscribe(handler);

    notify(1);
    notify(2);

    return 0;
}`,
    correctOutput: 'Log: Event 1\nHandle: Event 1\nLog: Event 2\nHandle: Event 2',
    explanation: '观察者模式：订阅者注册回调，发布者通知所有订阅者。实现松耦合的事件系统。嵌入式事件驱动架构核心。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['观察者模式', '事件驱动', '回调函数'],
      },
  {
    id: 3041,
    chapter: 'level2',
    type: 'output',
    title: '指针-const组合',
    description: 'const与指针的组合',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 10, b = 20;

    const uint8_t *p1 = &a;
    uint8_t * const p2 = &a;
    const uint8_t * const p3 = &a;

    p1 = &b;
    *p2 = 15;

    printf("a = %u\\n", a);
    printf("*p1 = %u\\n", *p1);
    printf("*p2 = %u\\n", *p2);

    return 0;
}`,
    correctOutput: 'a = 15\n*p1 = 20\n*p2 = 15',
    explanation: 'const uint8_t *p1：指向常量的指针，可改指针不可改值。uint8_t * const p2：常量指针，可改值不可改指针。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['const指针', '指针常量', '常量指针'],
    visualization: { type: 'html', file: 'visualizations-v2/const-pointer-combo.html' },
      },
  {
    id: 3042,
    chapter: 'level2',
    type: 'output',
    title: '结构体-自引用结构体',
    description: '结构体包含自身指针',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct Node {
    uint8_t value;
    struct Node *next;
} Node;

int main(void)
{
    Node n1 = {1, NULL};
    Node n2 = {2, NULL};
    Node n3 = {3, NULL};

    n1.next = &n2;
    n2.next = &n3;

    Node *current = &n1;
    while (current != NULL) {
        printf("%u ", current->value);
        current = current->next;
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '1 2 3 ',
    explanation: '结构体可以包含指向自身的指针（自引用）。这是链表、树等数据结构的基础。注意：不能包含自身实例。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['自引用结构体', '链表', '结构体指针'],
    visualization: { type: 'html', file: 'visualizations-v2/self-ref-struct.html' },
      },
  {
    id: 3043,
    chapter: 'level2',
    type: 'output',
    title: '联合体-大小端检测',
    description: '检测系统大小端',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    union {
        uint32_t value;
        uint8_t bytes[4];
    } test;

    test.value = 0x12345678;

    if (test.bytes[0] == 0x78) {
        printf("Little Endian\\n");
    } else {
        printf("Big Endian\\n");
    }

    printf("bytes[0] = 0x%02X\\n", test.bytes[0]);
    printf("bytes[3] = 0x%02X\\n", test.bytes[3]);

    return 0;
}`,
    correctOutput: 'Little Endian\nbytes[0] = 0x78\nbytes[3] = 0x12',
    explanation: '小端存储：低字节在低地址。0x78存储在bytes[0]。联合体是检测大小端的经典方法。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['大小端', '联合体', '字节序'],
    visualization: { type: 'html', file: 'visualizations-v2/endian-detection.html' },
      },
  {
    id: 3044,
    chapter: 'level2',
    type: 'output',
    title: '枚举-匿名枚举',
    description: '匿名枚举定义常量',
    code: `#include <stdio.h>
#include <stdint.h>

enum {
    COLOR_RED = 0,
    COLOR_GREEN,
    COLOR_BLUE,
    COLOR_MAX
};

enum {
    STATUS_OK = 0,
    STATUS_ERROR = -1
};

int main(void)
{
    printf("RED: %d\\n", COLOR_RED);
    printf("GREEN: %d\\n", COLOR_GREEN);
    printf("BLUE: %d\\n", COLOR_BLUE);
    printf("MAX: %d\\n", COLOR_MAX);

    return 0;
}`,
    correctOutput: 'RED: 0\nGREEN: 1\nBLUE: 2\nMAX: 3',
    explanation: '匿名枚举用于定义一组相关常量。自动递增：COLOR_RED=0, COLOR_GREEN=1, COLOR_BLUE=2。比#define更有类型信息。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['匿名枚举', '枚举常量', '自动递增'],
      },
  {
    id: 3045,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-返回函数指针',
    description: '返回函数指针的函数',
    code: `#include <stdio.h>
#include <stdint.h>

typedef uint8_t (*Operation)(uint8_t, uint8_t);

uint8_t add(uint8_t a, uint8_t b) { return a + b; }
uint8_t sub(uint8_t a, uint8_t b) { return a - b; }

Operation get_operation(uint8_t type)
{
    if (type == 0) return add;
    if (type == 1) return sub;
    return NULL;
}

int main(void)
{
    Operation op = get_operation(0);
    printf("Result: %u\\n", op(10, 5));

    op = get_operation(1);
    printf("Result: %u\\n", op(10, 5));

    return 0;
}`,
    correctOutput: 'Result: 15\nResult: 5',
    explanation: '函数可以返回函数指针。get_operation根据类型返回不同的操作函数。这是工厂模式的实现方式。',
    difficulty: 4,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['返回函数指针', '工厂模式', 'typedef'],
    visualization: { type: 'html', file: 'visualizations-v2/return-func-pointer.html' },
      },
  {
    id: 3046,
    chapter: 'level2',
    type: 'output',
    title: '多文件-头文件组织',
    description: '头文件正确组织方式',
    code: `#include <stdio.h>
#include <stdint.h>

#ifndef MYDEVICE_H
#define MYDEVICE_H

#define DEVICE_VERSION  "1.0"

typedef struct {
    uint8_t id;
    uint16_t value;
} Device;

int8_t device_init(Device *dev);
uint16_t device_read(Device *dev);

#endif

int8_t device_init(Device *dev)
{
    if (dev == NULL) return -1;
    dev->id = 1;
    dev->value = 0;
    return 0;
}

int main(void)
{
    Device dev;
    device_init(&dev);
    printf("Device ID: %u\\n", dev.id);
    printf("Version: %s\\n", DEVICE_VERSION);
    return 0;
}`,
    correctOutput: 'Device ID: 1\nVersion: 1.0',
    explanation: '头文件组织：#ifndef保护、宏定义、类型定义、函数声明。.c文件包含实现。这是模块化开发的标准方式。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['头文件', '#ifndef', '模块化'],
    visualization: { type: 'html', file: 'visualizations-v2/header-guard.html' },
      },
  {
    id: 3047,
    chapter: 'level2',
    type: 'output',
    title: '指针-指针数组遍历',
    description: '遍历指针数组',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t a = 10, b = 20, c = 30, d = 40;
    uint8_t *ptrs[] = {&a, &b, &c, &d, NULL};

    uint8_t **pp = ptrs;
    while (*pp != NULL) {
        printf("%u ", **pp);
        pp++;
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '10 20 30 40 ',
    explanation: '二级指针遍历指针数组。pp是指向指针的指针，*pp获取指针，**pp获取值。NULL作为结束标记。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二级指针', '指针数组', '遍历'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-array-traverse.html' },
      },
  {
    id: 3048,
    chapter: 'level2',
    type: 'output',
    title: '结构体-结构体复制',
    description: '结构体赋值复制',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

typedef struct {
    uint8_t id;
    char name[16];
} Device;

int main(void)
{
    Device dev1 = {1, "Sensor"};
    Device dev2;

    dev2 = dev1;
    dev2.id = 2;

    printf("dev1.id: %u, dev1.name: %s\\n", dev1.id, dev1.name);
    printf("dev2.id: %u, dev2.name: %s\\n", dev2.id, dev2.name);

    return 0;
}`,
    correctOutput: 'dev1.id: 1, dev1.name: Sensor\ndev2.id: 2, dev2.name: Sensor',
    explanation: '结构体赋值是深拷贝（复制所有成员）。修改dev2不影响dev1。这是结构体复制的标准方式。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['结构体复制', '深拷贝', '赋值'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-copy.html' },
      },
  {
    id: 3049,
    chapter: 'level2',
    type: 'output',
    title: '联合体-结构体组合',
    description: '联合体嵌套结构体',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t low;
    uint8_t high;
} Word;

typedef union {
    uint16_t value;
    Word bytes;
} DataConverter;

int main(void)
{
    DataConverter conv;
    conv.value = 0x1234;

    printf("Value: 0x%04X\\n", conv.value);
    printf("Low: 0x%02X\\n", conv.bytes.low);
    printf("High: 0x%02X\\n", conv.bytes.high);

    conv.bytes.low = 0x56;
    printf("New value: 0x%04X\\n", conv.value);

    return 0;
}`,
    correctOutput: 'Value: 0x1234\nLow: 0x34\nHigh: 0x12\nNew value: 0x1256',
    explanation: '联合体嵌套结构体可以按字节访问16位数据。低字节在前（小端）。常用于协议解析、寄存器访问。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体嵌套', '结构体', '字节访问'],
    visualization: { type: 'html', file: 'visualizations-v2/union-struct-combo.html' },
      },
  {
    id: 3050,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-排序回调',
    description: 'qsort比较函数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int compare_asc(const void *a, const void *b)
{
    return (*(uint8_t*)a - *(uint8_t*)b);
}

int compare_desc(const void *a, const void *b)
{
    return (*(uint8_t*)b - *(uint8_t*)a);
}

int main(void)
{
    uint8_t arr[] = {5, 2, 8, 1, 9};

    qsort(arr, 5, sizeof(uint8_t), compare_asc);
    printf("Asc: %u %u %u %u %u\\n", arr[0], arr[1], arr[2], arr[3], arr[4]);

    qsort(arr, 5, sizeof(uint8_t), compare_desc);
    printf("Desc: %u %u %u %u %u\\n", arr[0], arr[1], arr[2], arr[3], arr[4]);

    return 0;
}`,
    correctOutput: 'Asc: 1 2 5 8 9\nDesc: 9 8 5 2 1',
    explanation: 'qsort使用函数指针作为比较回调。返回负数表示a<b，0表示相等，正数表示a>b。这是标准库的回调模式。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['qsort', '比较函数', '回调'],
    visualization: { type: 'html', file: 'visualizations-v2/qsort-callback.html' },
      },
  {
    id: 4031,
    chapter: 'level3',
    type: 'output',
    title: '动态内存-内存对齐分配',
    description: 'aligned_alloc对齐分配',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    void *ptr = aligned_alloc(16, 64);

    if (ptr != NULL) {
        printf("Allocated at: %p\\n", ptr);

        if ((uintptr_t)ptr % 16 == 0) {
            printf("16-byte aligned: Yes\\n");
        }

        free(ptr);
    }

    return 0;
}`,
    correctOutput: 'Allocated at: \n16-byte aligned: Yes',
    explanation: 'aligned_alloc分配对齐内存。第一个参数是对齐值（必须是2的幂），第二个是大小（必须是对齐值的倍数）。SIMD指令需要对齐内存。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['aligned_alloc', '内存对齐', 'SIMD'],
      },
  {
    id: 4032,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-格式化读写',
    description: 'fprintf/fscanf格式化',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    FILE *fp = fopen("data.txt", "w+");

    fprintf(fp, "%d %s %u\\n", 1, "Sensor", 100);
    fprintf(fp, "%d %s %u\\n", 2, "Motor", 200);

    rewind(fp);

    int id;
    char name[20];
    uint16_t value;

    while (fscanf(fp, "%d %s %hu", &id, name, &value) == 3) {
        printf("ID:%d Name:%s Value:%u\\n", id, name, value);
    }

    fclose(fp);
    return 0;
}`,
    correctOutput: 'ID:1 Name:Sensor Value:100\nID:2 Name:Motor Value:200',
    explanation: 'fprintf格式化写入文件，fscanf格式化读取。rewind回到文件开头。适合处理结构化文本数据。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fprintf', 'fscanf', '格式化IO'],
      },
  {
    id: 4033,
    chapter: 'level3',
    type: 'output',
    title: '位操作-循环移位',
    description: '循环左移右移',
    code: `#include <stdio.h>
#include <stdint.h>

#define ROTL(x, n)  (((x) << (n)) | ((x) >> (8 - (n))))
#define ROTR(x, n)  (((x) >> (n)) | ((x) << (8 - (n))))

int main(void)
{
    uint8_t val = 0x85;

    printf("Original: 0x%02X\\n", val);
    printf("ROTL 1: 0x%02X\\n", ROTL(val, 1));
    printf("ROTL 2: 0x%02X\\n", ROTL(val, 2));
    printf("ROTR 1: 0x%02X\\n", ROTR(val, 1));

    return 0;
}`,
    correctOutput: 'Original: 0x85\nROTL 1: 0x0B\nROTL 2: 0x16\nROTR 1: 0xC2',
    explanation: '循环移位：移出的位从另一端进入。ROTL 0x85(10000101)左移1位=00001011=0x0B。加密算法常用。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['循环移位', 'ROTL', 'ROTR', '位操作'],
      },
  {
    id: 4034,
    chapter: 'level3',
    type: 'output',
    title: '位操作-位交换',
    description: '交换两个位',
    code: `#include <stdio.h>
#include <stdint.h>

uint8_t swap_bits(uint8_t val, uint8_t i, uint8_t j)
{
    uint8_t bit_i = (val >> i) & 1;
    uint8_t bit_j = (val >> j) & 1;

    if (bit_i != bit_j) {
        val ^= (1U << i) | (1U << j);
    }
    return val;
}

int main(void)
{
    uint8_t val = 0x85;

    printf("Original: 0x%02X\\n", val);
    printf("Swap 0,7: 0x%02X\\n", swap_bits(val, 0, 1));
    printf("Swap 2,3: 0x%02X\\n", swap_bits(val, 2, 3));

    return 0;
}`,
    correctOutput: 'Original: 0x85\nSwap 0,7: 0x86\nSwap 2,3: 0x85',
    explanation: '交换两位：如果不同则用异或翻转。0x85=10000101，交换bit0和bit1：10000110=0x86。bit2和bit3相同所以不变。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位交换', '异或', '位操作'],
      },
  {
    id: 4035,
    chapter: 'level3',
    type: 'output',
    title: '预处理-编译时断言',
    description: '_Static_assert',
    code: `#include <stdio.h>
#include <stdint.h>

#define BUFFER_SIZE 256

_Static_assert(BUFFER_SIZE >= 64, "Buffer too small");
_Static_assert(BUFFER_SIZE <= 1024, "Buffer too large");
_Static_assert(sizeof(uint32_t) == 4, "uint32_t must be 4 bytes");

int main(void)
{
    printf("Buffer size: %d\\n", BUFFER_SIZE);
    printf("Static assertions passed\\n");

    return 0;
}`,
    correctOutput: 'Buffer size: 256\nStatic assertions passed',
    explanation: '_Static_assert是C11的静态断言。编译时检查条件，失败则编译报错。比typedef技巧更清晰。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['_Static_assert', '编译时检查', 'C11'],
      },
  {
    id: 4036,
    chapter: 'level3',
    type: 'output',
    title: '预处理-泛型选择',
    description: '_Generic类型选择',
    code: `#include <stdio.h>
#include <stdint.h>

#define type_name(x) _Generic((x), \\
    uint8_t: "uint8_t", \\
    uint16_t: "uint16_t", \\
    uint32_t: "uint32_t", \\
    int: "int", \\
    default: "unknown")

int main(void)
{
    uint8_t a = 1;
    uint16_t b = 2;
    uint32_t c = 3;
    int d = 4;

    printf("a: %s\\n", type_name(a));
    printf("b: %s\\n", type_name(b));
    printf("c: %s\\n", type_name(c));
    printf("d: %s\\n", type_name(d));

    return 0;
}`,
    correctOutput: 'a: uint8_t\nb: uint16_t\nc: uint32_t\nd: int',
    explanation: '_Generic是C11的泛型选择。根据类型选择不同的表达式。用于实现泛型函数、类型安全的宏。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['_Generic', '泛型选择', 'C11'],
      },
  {
    id: 4037,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-解析练习',
    description: '解析复杂声明',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    int arr[3] = {1, 2, 3};

    int *p1[3];
    p1[0] = &arr[0];
    p1[1] = &arr[1];
    p1[2] = &arr[2];

    int (*p2)[3] = &arr;

    int (**p3)[3] = &p2;

    printf("p1[0]: %d\\n", *p1[0]);
    printf("(*p2)[1]: %d\\n", (*p2)[1]);
    printf("(**p3)[2]: %d\\n", (**p3)[2]);

    return 0;
}`,
    correctOutput: 'p1[0]: 1\n(*p2)[1]: 2\n(**p3)[2]: 3',
    explanation: 'p1是指针数组（3个int指针）。p2是数组指针（指向3元素数组）。p3是指向数组指针的指针。从内向外解析。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['复杂声明', '指针数组', '数组指针', '多级指针'],
      },
  {
    id: 4038,
    chapter: 'level3',
    type: 'output',
    title: '内存操作-bsearch二分查找',
    description: '二分查找函数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int compare(const void *a, const void *b)
{
    return (*(uint8_t*)a - *(uint8_t*)b);
}

int main(void)
{
    uint8_t arr[] = {1, 3, 5, 7, 9, 11, 13};
    uint8_t key = 7;

    uint8_t *result = (uint8_t*)bsearch(&key, arr, 7, sizeof(uint8_t), compare);

    if (result != NULL) {
        printf("Found %u at index %ld\\n", *result, result - arr);
    } else {
        printf("Not found\\n");
    }

    key = 6;
    result = (uint8_t*)bsearch(&key, arr, 7, sizeof(uint8_t), compare);
    printf("Search 6: %s\\n", result ? "Found" : "Not found");

    return 0;
}`,
    correctOutput: 'Found 7 at index 3\nSearch 6: Not found',
    explanation: 'bsearch在有序数组中二分查找。参数：键、数组、元素数、元素大小、比较函数。返回找到的元素指针或NULL。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['bsearch', '二分查找', '有序数组'],
      },
  {
    id: 4039,
    chapter: 'level3',
    type: 'output',
    title: '内存操作-环形缓冲区',
    description: '环形缓冲区实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define BUF_SIZE 8

typedef struct {
    uint8_t data[BUF_SIZE];
    uint8_t head;
    uint8_t tail;
} RingBuffer;

void ring_init(RingBuffer *rb)
{
    rb->head = rb->tail = 0;
}

uint8_t ring_write(RingBuffer *rb, uint8_t val)
{
    uint8_t next = (rb->head + 1) % BUF_SIZE;
    if (next == rb->tail) return 0;
    rb->data[rb->head] = val;
    rb->head = next;
    return 1;
}

uint8_t ring_read(RingBuffer *rb, uint8_t *val)
{
    if (rb->tail == rb->head) return 0;
    *val = rb->data[rb->tail];
    rb->tail = (rb->tail + 1) % BUF_SIZE;
    return 1;
}

int main(void)
{
    RingBuffer rb;
    ring_init(&rb);

    ring_write(&rb, 10);
    ring_write(&rb, 20);
    ring_write(&rb, 30);

    uint8_t val;
    while (ring_read(&rb, &val)) {
        printf("%u ", val);
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '10 20 30 ',
    explanation: '环形缓冲区用模运算实现循环。head指向写入位置，tail指向读取位置。嵌入式串口接收常用。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['环形缓冲区', 'FIFO', '模运算'],
      },
  {
    id: 4040,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strstr查找',
    description: '子字符串查找',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    const char *text = "Hello World, Welcome to C";

    char *pos = strstr(text, "World");
    if (pos != NULL) {
        printf("Found at: %s\\n", pos);
    }

    pos = strstr(text, "Python");
    if (pos == NULL) {
        printf("Python not found\\n");
    }

    pos = strstr(text, "Welcome");
    printf("Index: %ld\\n", pos - text);

    return 0;
}`,
    correctOutput: 'Found at: World, Welcome to C\nPython not found\nIndex: 13',
    explanation: 'strstr查找子字符串，返回首次出现的位置指针。未找到返回NULL。指针相减得到索引位置。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strstr', '子字符串', '指针运算'],
      },
  {
    id: 5021,
    chapter: 'level4',
    type: 'output',
    title: '线程-线程池基础',
    description: '简单线程池实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>
#include <unistd.h>

#define THREAD_COUNT 2

typedef struct {
    void (*func)(void*);
    void *arg;
} Task;

static Task tasks[10];
static uint8_t task_count = 0;
static pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void execute_task(void *arg)
{
    uint8_t *val = (uint8_t*)arg;
    printf("Task %u executed\\n", *val);
}

void* worker(void *arg)
{
    while (1) {
        pthread_mutex_lock(&mutex);
        if (task_count > 0) {
            Task t = tasks[--task_count];
            pthread_mutex_unlock(&mutex);
            t.func(t.arg);
        } else {
            pthread_mutex_unlock(&mutex);
            break;
        }
    }
    return NULL;
}

int main(void)
{
    pthread_t threads[THREAD_COUNT];
    uint8_t values[4] = {1, 2, 3, 4};

    for (uint8_t i = 0; i < 4; i++) {
        tasks[task_count].func = execute_task;
        tasks[task_count].arg = &values[i];
        task_count++;
    }

    for (uint8_t i = 0; i < THREAD_COUNT; i++) {
        pthread_create(&threads[i], NULL, worker, NULL);
    }

    for (uint8_t i = 0; i < THREAD_COUNT; i++) {
        pthread_join(threads[i], NULL);
    }

    return 0;
}`,
    correctOutput: 'Task 4 executed\nTask 3 executed\nTask 2 executed\nTask 1 executed',
    explanation: '线程池预先创建线程，任务队列分发任务。避免频繁创建销毁线程的开销。服务器程序常用。',
    difficulty: 5,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['线程池', '任务队列', '并发'],
      },
  {
    id: 5022,
    chapter: 'level4',
    type: 'output',
    title: '进程-daemon守护进程',
    description: '创建守护进程',
    code: `#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>

void create_daemon(void)
{
    pid_t pid = fork();

    if (pid < 0) return;
    if (pid > 0) return;

    setsid();

    chdir("/");

    umask(0);

    close(STDIN_FILENO);
    close(STDOUT_FILENO);
    close(STDERR_FILENO);
}

int main(void)
{
    printf("Before daemon\\n");

    create_daemon();

    return 0;
}`,
    correctOutput: 'Before daemon',
    explanation: '守护进程创建步骤：fork+setsid脱离终端、chdir到根目录、重设umask、关闭标准IO。后台服务程序必备。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['守护进程', 'daemon', 'setsid'],
      },
  {
    id: 5023,
    chapter: 'level4',
    type: 'output',
    title: '网络-UDP通信',
    description: 'UDP数据报通信',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>

int main(void)
{
    int sock = socket(AF_INET, SOCK_DGRAM, 0);

    struct sockaddr_in addr;
    memset(&addr, 0, sizeof(addr));
    addr.sin_family = AF_INET;
    addr.sin_port = htons(9999);
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);

    const char *msg = "Hello UDP";
    sendto(sock, msg, strlen(msg), 0,
           (struct sockaddr*)&addr, sizeof(addr));

    printf("UDP sent: %s\\n", msg);

    close(sock);
    return 0;
}`,
    correctOutput: 'UDP sent: Hello UDP',
    explanation: 'UDP是无连接协议。sendto发送数据报，不需要connect。适合实时音视频、DNS查询等场景。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['UDP', 'sendto', '无连接'],
      },
  {
    id: 5024,
    chapter: 'level4',
    type: 'output',
    title: '高级数据结构-双向链表',
    description: '双向链表实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct Node {
    uint8_t data;
    struct Node *prev;
    struct Node *next;
} Node;

Node* create_node(uint8_t data)
{
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = data;
    n->prev = n->next = NULL;
    return n;
}

void append(Node **head, uint8_t data)
{
    Node *n = create_node(data);
    if (*head == NULL) {
        *head = n;
        return;
    }
    Node *curr = *head;
    while (curr->next) curr = curr->next;
    curr->next = n;
    n->prev = curr;
}

int main(void)
{
    Node *head = NULL;
    append(&head, 1);
    append(&head, 2);
    append(&head, 3);

    Node *curr = head;
    while (curr) {
        printf("%u ", curr->data);
        curr = curr->next;
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '1 2 3 ',
    explanation: '双向链表每个节点有prev和next指针。可以双向遍历，插入删除更灵活。内核链表常用。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['双向链表', 'prev/next', '数据结构'],
      },
  {
    id: 5025,
    chapter: 'level4',
    type: 'output',
    title: '高级数据结构-栈',
    description: '栈实现',
    code: `#include <stdio.h>
#include <stdint.h>

#define STACK_SIZE 10

typedef struct {
    uint8_t data[STACK_SIZE];
    uint8_t top;
} Stack;

void stack_init(Stack *s) { s->top = 0; }

uint8_t stack_empty(Stack *s) { return s->top == 0; }

uint8_t stack_full(Stack *s) { return s->top == STACK_SIZE; }

void push(Stack *s, uint8_t val)
{
    if (!stack_full(s)) {
        s->data[s->top++] = val;
    }
}

uint8_t pop(Stack *s)
{
    if (!stack_empty(s)) {
        return s->data[--s->top];
    }
    return 0;
}

int main(void)
{
    Stack s;
    stack_init(&s);

    push(&s, 10);
    push(&s, 20);
    push(&s, 30);

    while (!stack_empty(&s)) {
        printf("%u ", pop(&s));
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '30 20 10 ',
    explanation: '栈是后进先出(LIFO)数据结构。push入栈，pop出栈。函数调用、表达式求值都用栈。',
    difficulty: 2,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['栈', 'LIFO', 'push/pop'],
      },
  {
    id: 5026,
    chapter: 'level4',
    type: 'output',
    title: '高级数据结构-队列',
    description: '队列实现',
    code: `#include <stdio.h>
#include <stdint.h>

#define QUEUE_SIZE 10

typedef struct {
    uint8_t data[QUEUE_SIZE];
    uint8_t front;
    uint8_t rear;
    uint8_t count;
} Queue;

void queue_init(Queue *q)
{
    q->front = q->rear = q->count = 0;
}

uint8_t queue_empty(Queue *q) { return q->count == 0; }

void enqueue(Queue *q, uint8_t val)
{
    if (q->count < QUEUE_SIZE) {
        q->data[q->rear] = val;
        q->rear = (q->rear + 1) % QUEUE_SIZE;
        q->count++;
    }
}

uint8_t dequeue(Queue *q)
{
    if (!queue_empty(q)) {
        uint8_t val = q->data[q->front];
        q->front = (q->front + 1) % QUEUE_SIZE;
        q->count--;
        return val;
    }
    return 0;
}

int main(void)
{
    Queue q;
    queue_init(&q);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);

    while (!queue_empty(&q)) {
        printf("%u ", dequeue(&q));
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: '10 20 30 ',
    explanation: '队列是先进先出(FIFO)数据结构。enqueue入队，dequeue出队。消息队列、任务调度都用队列。',
    difficulty: 2,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['队列', 'FIFO', 'enqueue/dequeue'],
      },
  {
    id: 5027,
    chapter: 'level4',
    type: 'output',
    title: '信号-sigaction高级处理',
    description: 'sigaction信号处理',
    code: `#include <stdio.h>
#include <stdint.h>
#include <signal.h>
#include <string.h>

static volatile uint8_t signal_count = 0;

void handler(int signum, siginfo_t *info, void *context)
{
    signal_count++;
}

int main(void)
{
    struct sigaction sa;
    memset(&sa, 0, sizeof(sa));
    sa.sa_sigaction = handler;
    sa.sa_flags = SA_SIGINFO;

    sigaction(SIGUSR1, &sa, NULL);

    raise(SIGUSR1);
    raise(SIGUSR1);

    printf("Signal count: %u\\n", signal_count);

    return 0;
}`,
    correctOutput: 'Signal count: 2',
    explanation: 'sigaction比signal更强大。SA_SIGINFO标志使用sa_sigaction处理函数，可获取发送者PID等信息。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['sigaction', 'SA_SIGINFO', '信号处理'],
      },
  {
    id: 5028,
    chapter: 'level4',
    type: 'output',
    title: '文件操作-mmap内存映射',
    description: '内存映射文件',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = open("test.txt", O_RDWR | O_CREAT, 0644);
    write(fd, "Hello World", 11);

    struct stat st;
    fstat(fd, &st);

    char *map = mmap(NULL, st.st_size, PROT_READ | PROT_WRITE, MAP_SHARED, fd, 0);

    if (map != MAP_FAILED) {
        printf("Mapped: %.*s\\n", (int)st.st_size, map);

        map[0] = 'h';
        printf("Modified: %.*s\\n", (int)st.st_size, map);

        munmap(map, st.st_size);
    }

    close(fd);
    return 0;
}`,
    correctOutput: 'Mapped: Hello World\nModified: hello World',
    explanation: 'mmap将文件映射到内存，像访问内存一样访问文件。修改会同步到文件。高效的大文件处理方式。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['mmap', '内存映射', '文件操作'],
      },
  {
    id: 5029,
    chapter: 'level4',
    type: 'output',
    title: 'IO-非阻塞IO',
    description: '设置非阻塞模式',
    code: `#include <stdio.h>
#include <stdint.h>
#include <fcntl.h>
#include <unistd.h>

int set_nonblocking(int fd)
{
    int flags = fcntl(fd, F_GETFL, 0);
    return fcntl(fd, F_SETFL, flags | O_NONBLOCK);
}

int main(void)
{
    int flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    printf("Original flags: %d\\n", flags);

    set_nonblocking(STDIN_FILENO);

    flags = fcntl(STDIN_FILENO, F_GETFL, 0);
    printf("Non-blocking: %s\\n", (flags & O_NONBLOCK) ? "Yes" : "No");

    char buf[10];
    ssize_t n = read(STDIN_FILENO, buf, sizeof(buf));
    printf("Read result: %ld\\n", (long)n);

    return 0;
}`,
    correctOutput: 'Original flags: 0\nNon-blocking: Yes\nRead result: -1',
    explanation: 'O_NONBLOCK设置非阻塞模式。read没有数据时立即返回-1（EAGAIN）。用于实现异步IO。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['非阻塞IO', 'O_NONBLOCK', 'fcntl'],
      },
  {
    id: 5030,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-函数表驱动',
    description: '命令解析器实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

typedef void (*CmdHandler)(const char *arg);

void cmd_help(const char *arg) { printf("Help: %s\\n", arg ? arg : "none"); }
void cmd_list(const char *arg) { printf("List: %s\\n", arg ? arg : "all"); }
void cmd_exit(const char *arg) { printf("Exit: %s\\n", arg ? arg : "now"); }

typedef struct {
    const char *name;
    CmdHandler handler;
} Command;

Command commands[] = {
    {"help", cmd_help},
    {"list", cmd_list},
    {"exit", cmd_exit},
    {NULL, NULL}
};

void execute_cmd(const char *name, const char *arg)
{
    for (Command *cmd = commands; cmd->name; cmd++) {
        if (strcmp(name, cmd->name) == 0) {
            cmd->handler(arg);
            return;
        }
    }
    printf("Unknown command\\n");
}

int main(void)
{
    execute_cmd("help", "usage");
    execute_cmd("list", NULL);
    execute_cmd("exit", "force");

    return 0;
}`,
    correctOutput: 'Help: usage\nList: all\nExit: force',
    explanation: '命令表+函数指针实现命令解析器。查表法比if-else更清晰，易于扩展。嵌入式命令行常用模式。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['命令表', '函数指针', '查表法'],
      },
  {
    id: 6011,
    chapter: 'level5',
    type: 'output',
    title: '驱动-中断处理',
    description: '中断处理框架',
    code: `#include <linux/module.h>
#include <linux/interrupt.h>
#include <linux/gpio.h>

#define GPIO_PIN 17

static irqreturn_t irq_handler(int irq, void *dev_id)
{
    printk(KERN_INFO "Interrupt triggered\\n");
    return IRQ_HANDLED;
}

static int irq_num;

static int __init my_init(void)
{
    int ret = request_irq(gpio_to_irq(GPIO_PIN), irq_handler,
                          IRQF_TRIGGER_RISING, "my_device", NULL);
    if (ret) {
        printk(KERN_ERR "Failed to request IRQ\\n");
        return ret;
    }

    printk(KERN_INFO "Module loaded, IRQ registered\\n");
    return 0;
}

static void __exit my_exit(void)
{
    free_irq(gpio_to_irq(GPIO_PIN), NULL);
    printk(KERN_INFO "Module unloaded\\n");
}

module_init(my_init);
module_exit(my_exit);`,
    correctOutput: 'Module loaded, IRQ registered',
    explanation: 'request_irq注册中断处理函数。IRQF_TRIGGER_RISING上升沿触发。中断处理要快速，不能睡眠。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['中断处理', 'request_irq', 'IRQF_TRIGGER'],
      },
  {
    id: 6012,
    chapter: 'level5',
    type: 'output',
    title: '性能-零拷贝技术',
    description: 'sendfile零拷贝',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/sendfile.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int src = open("source.txt", O_RDONLY);
    int dst = open("dest.txt", O_WRONLY | O_CREAT, 0644);

    if (src < 0 || dst < 0) {
        printf("File open failed\\n");
        return 1;
    }

    off_t offset = 0;
    ssize_t sent = sendfile(dst, src, &offset, 1024);

    printf("Bytes transferred: %ld\\n", (long)sent);

    close(src);
    close(dst);

    return 0;
}`,
    correctOutput: 'Bytes transferred: ',
    explanation: 'sendfile在内核空间直接传输文件数据，避免用户空间拷贝。高性能服务器文件传输必备。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['零拷贝', 'sendfile', '性能优化'],
      },
  {
    id: 6013,
    chapter: 'level5',
    type: 'output',
    title: '安全-输入验证',
    description: '安全的输入处理',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <ctype.h>

#define MAX_INPUT 32

int sanitize_input(const char *input, char *output, size_t out_size)
{
    if (input == NULL || output == NULL || out_size == 0) {
        return -1;
    }

    size_t len = strlen(input);
    if (len >= out_size) {
        return -2;
    }

    for (size_t i = 0; i < len; i++) {
        if (!isalnum(input[i]) && input[i] != '_' && input[i] != '-') {
            return -3;
        }
        output[i] = input[i];
    }
    output[len] = '\\0';

    return 0;
}

int main(void)
{
    char output[MAX_INPUT];

    if (sanitize_input("Device_01", output, MAX_INPUT) == 0) {
        printf("Valid: %s\\n", output);
    }

    if (sanitize_input("Invalid;Name", output, MAX_INPUT) != 0) {
        printf("Rejected invalid input\\n");
    }

    return 0;
}`,
    correctOutput: 'Valid: Device_01\nRejected invalid input',
    explanation: '输入验证：检查长度、过滤非法字符。防止注入攻击。安全编程的基本原则。',
    difficulty: 4,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['输入验证', '安全编程', '过滤'],
      },
  {
    id: 6014,
    chapter: 'level5',
    type: 'output',
    title: '架构-状态机框架',
    description: '通用状态机实现',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_PAUSED,
    STATE_ERROR
} State;

typedef enum {
    EVENT_START,
    EVENT_STOP,
    EVENT_PAUSE,
    EVENT_RESUME,
    EVENT_ERROR
} Event;

typedef struct {
    State current;
    void (*handlers[4][5])(void);
} StateMachine;

void on_idle_start(void) { printf("IDLE->RUNNING\\n"); }
void on_running_stop(void) { printf("RUNNING->IDLE\\n"); }
void on_running_pause(void) { printf("RUNNING->PAUSED\\n"); }
void on_paused_resume(void) { printf("PAUSED->RUNNING\\n"); }
void on_paused_stop(void) { printf("PAUSED->IDLE\\n"); }

void sm_init(StateMachine *sm)
{
    sm->current = STATE_IDLE;
    for (int i = 0; i < 4; i++)
        for (int j = 0; j < 5; j++)
            sm->handlers[i][j] = NULL;

    sm->handlers[STATE_IDLE][EVENT_START] = on_idle_start;
    sm->handlers[STATE_RUNNING][EVENT_STOP] = on_running_stop;
    sm->handlers[STATE_RUNNING][EVENT_PAUSE] = on_running_pause;
    sm->handlers[STATE_PAUSED][EVENT_RESUME] = on_paused_resume;
    sm->handlers[STATE_PAUSED][EVENT_STOP] = on_paused_stop;
}

void sm_process(StateMachine *sm, Event event)
{
    if (sm->handlers[sm->current][event]) {
        sm->handlers[sm->current][event]();
    }
}

int main(void)
{
    StateMachine sm;
    sm_init(&sm);

    sm_process(&sm, EVENT_START);
    sm_process(&sm, EVENT_PAUSE);
    sm_process(&sm, EVENT_RESUME);
    sm_process(&sm, EVENT_STOP);

    return 0;
}`,
    correctOutput: 'IDLE->RUNNING\nRUNNING->PAUSED\nPAUSED->RUNNING\nRUNNING->IDLE',
    explanation: '状态机用二维数组（状态×事件）存储处理函数。查表法实现状态转换。嵌入式控制核心模式。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['状态机', '查表法', '架构设计'],
      },
  {
    id: 6015,
    chapter: 'level5',
    type: 'output',
    title: '架构-发布订阅模式',
    description: '消息总线实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define MAX_TOPICS 4
#define MAX_SUBSCRIBERS 4

typedef void (*Subscriber)(const char *data);

typedef struct {
    char name[16];
    Subscriber subs[MAX_SUBSCRIBERS];
    uint8_t sub_count;
} Topic;

static Topic topics[MAX_TOPICS];
static uint8_t topic_count = 0;

uint8_t subscribe(const char *topic_name, Subscriber sub)
{
    for (uint8_t i = 0; i < topic_count; i++) {
        if (strcmp(topics[i].name, topic_name) == 0) {
            if (topics[i].sub_count < MAX_SUBSCRIBERS) {
                topics[i].subs[topics[i].sub_count++] = sub;
                return 1;
            }
        }
    }
    return 0;
}

void publish(const char *topic_name, const char *data)
{
    for (uint8_t i = 0; i < topic_count; i++) {
        if (strcmp(topics[i].name, topic_name) == 0) {
            for (uint8_t j = 0; j < topics[i].sub_count; j++) {
                topics[i].subs[j](data);
            }
        }
    }
}

void logger(const char *data) { printf("Log: %s\\n", data); }
void handler(const char *data) { printf("Handle: %s\\n", data); }

int main(void)
{
    strcpy(topics[0].name, "sensor");
    topics[0].sub_count = 0;
    topic_count = 1;

    subscribe("sensor", logger);
    subscribe("sensor", handler);

    publish("sensor", "Temperature: 25C");

    return 0;
}`,
    correctOutput: 'Log: Temperature: 25C\nHandle: Temperature: 25C',
    explanation: '发布订阅模式：发布者发送消息到主题，订阅者接收。解耦发布者和订阅者。消息系统核心模式。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['发布订阅', '消息总线', '解耦'],
      },
  {
    id: 3051,
    chapter: 'level2',
    type: 'output',
    title: '指针-函数指针数组排序',
    description: '用函数指针数组实现多种排序',
    code: `#include <stdio.h>
#include <stdint.h>

typedef void (*SortFunc)(uint8_t*, uint8_t);

void bubble(uint8_t *arr, uint8_t n)
{
    for (uint8_t i = 0; i < n-1; i++) {
        for (uint8_t j = 0; j < n-1-i; j++) {
            if (arr[j] > arr[j+1]) {
                uint8_t t = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = t;
            }
        }
    }
}

void selection(uint8_t *arr, uint8_t n)
{
    for (uint8_t i = 0; i < n-1; i++) {
        uint8_t min = i;
        for (uint8_t j = i+1; j < n; j++) {
            if (arr[j] < arr[min]) min = j;
        }
        uint8_t t = arr[i];
        arr[i] = arr[min];
        arr[min] = t;
    }
}

int main(void)
{
    SortFunc sorts[2] = {bubble, selection};
    uint8_t data[] = {3, 1, 4, 1, 5};

    sorts[0](data, 5);
    printf("Bubble: %u %u %u %u %u\\n", data[0], data[1], data[2], data[3], data[4]);

    uint8_t data2[] = {5, 2, 3, 1, 4};
    sorts[1](data2, 5);
    printf("Selection: %u %u %u %u %u\\n", data2[0], data2[1], data2[2], data2[3], data2[4]);

    return 0;
}`,
    correctOutput: 'Bubble: 1 1 3 4 5\nSelection: 1 2 3 4 5',
    explanation: '函数指针数组存储不同排序算法。通过索引选择算法。这是策略模式的C语言实现。',
    difficulty: 4,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针数组', '排序算法', '策略模式'],
    visualization: { type: 'html', file: 'visualizations-v2/func-pointer-array.html' },
      },
  {
    id: 3052,
    chapter: 'level2',
    type: 'output',
    title: '结构体-嵌套结构体数组',
    description: '复杂结构体操作',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint16_t x;
    uint16_t y;
} Point;

typedef struct {
    Point corners[4];
    uint8_t id;
} Rectangle;

int main(void)
{
    Rectangle rect = {
        .corners = {{0,0}, {10,0}, {10,5}, {0,5}},
        .id = 1
    };

    printf("Rect %u corners:\\n", rect.id);
    for (uint8_t i = 0; i < 4; i++) {
        printf("  (%u, %u)\\n", rect.corners[i].x, rect.corners[i].y);
    }

    return 0;
}`,
    correctOutput: 'Rect 1 corners:\n  (0, 0)\n  (10, 0)\n  (10, 5)\n  (0, 5)',
    explanation: '结构体可以包含结构体数组。用.和[]链式访问。常用于图形、协议等复杂数据结构。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['嵌套结构体', '结构体数组', '初始化'],
    visualization: { type: 'html', file: 'visualizations-v2/nested-struct-array.html' },
      },
  {
    id: 3053,
    chapter: 'level2',
    type: 'output',
    title: '联合体-浮点数解析',
    description: '解析浮点数内部表示',
    code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    float f;
    uint32_t u;
    uint8_t bytes[4];
} FloatParser;

int main(void)
{
    FloatParser fp;
    fp.f = 1.0f;

    printf("Float: %f\\n", fp.f);
    printf("Hex: 0x%08X\\n", fp.u);
    printf("Bytes: %02X %02X %02X %02X\\n",
           fp.bytes[0], fp.bytes[1], fp.bytes[2], fp.bytes[3]);

    return 0;
}`,
    correctOutput: 'Float: 1.000000\nHex: 0x3F800000\nBytes: 00 00 80 3F',
    explanation: '1.0f的IEEE754表示是0x3F800000。小端存储，字节顺序为00 00 80 3F。联合体可查看浮点数内部表示。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体', 'IEEE754', '浮点数'],
    visualization: { type: 'html', file: 'visualizations-v2/float-union-parse.html' },
      },
  {
    id: 3054,
    chapter: 'level2',
    type: 'output',
    title: '枚举-位标志组合',
    description: '枚举作为位标志',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    PERM_READ    = 1 << 0,
    PERM_WRITE   = 1 << 1,
    PERM_EXECUTE = 1 << 2,
    PERM_ALL     = PERM_READ | PERM_WRITE | PERM_EXECUTE
} Permission;

uint8_t has_permission(uint8_t perms, Permission p)
{
    return (perms & p) != 0;
}

int main(void)
{
    uint8_t user_perms = PERM_READ | PERM_WRITE;

    printf("Read: %s\\n", has_permission(user_perms, PERM_READ) ? "Yes" : "No");
    printf("Write: %s\\n", has_permission(user_perms, PERM_WRITE) ? "Yes" : "No");
    printf("Execute: %s\\n", has_permission(user_perms, PERM_EXECUTE) ? "Yes" : "No");

    return 0;
}`,
    correctOutput: 'Read: Yes\nWrite: Yes\nExecute: No',
    explanation: '枚举可以定义位标志。用位或组合权限，用位与检查权限。Linux文件权限就是这种模式。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['枚举', '位标志', '权限'],
    visualization: { type: 'html', file: 'visualizations-v2/enum-bitflags.html' },
      },
  {
    id: 3055,
    chapter: 'level2',
    type: 'output',
    title: '多文件-内联函数',
    description: 'static inline函数',
    code: `#include <stdio.h>
#include <stdint.h>

static inline uint8_t max(uint8_t a, uint8_t b)
{
    return (a > b) ? a : b;
}

static inline uint8_t min(uint8_t a, uint8_t b)
{
    return (a < b) ? a : b;
}

int main(void)
{
    printf("max(10, 20) = %u\\n", max(10, 20));
    printf("min(10, 20) = %u\\n", min(10, 20));
    printf("max(5, 5) = %u\\n", max(5, 5));

    return 0;
}`,
    correctOutput: 'max(10, 20) = 20\nmin(10, 20) = 10\nmax(5, 5) = 5',
    explanation: 'static inline函数在头文件中定义，每个包含它的文件有自己的副本。避免函数调用开销，适合小型工具函数。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['inline', 'static', '头文件函数'],
    visualization: { type: 'html', file: 'visualizations-v2/inline-function.html' },
      },
  {
    id: 3056,
    chapter: 'level2',
    type: 'output',
    title: '指针-指针算术边界',
    description: '指针越界问题',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t arr[5] = {10, 20, 30, 40, 50};
    uint8_t *p = arr;

    printf("p[0] = %u\\n", p[0]);
    printf("p[4] = %u\\n", p[4]);

    uint8_t *end = arr + 5;
    printf("Valid range: %ld elements\\n", (long)(end - arr));

    p = arr + 3;
    printf("p[-1] = %u\\n", p[-1]);

    return 0;
}`,
    correctOutput: 'p[0] = 10\np[4] = 50\nValid range: 5 elements\np[-1] = 30',
    explanation: '指针可以用负索引。p[-1]等价于*(p-1)。但访问越界是未定义行为。end指针指向数组末尾的下一个位置。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针算术', '边界', '负索引'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-arithmetic.html' },
      },
  {
    id: 3057,
    chapter: 'level2',
    type: 'output',
    title: '结构体-位域跨字节',
    description: '位域跨越字节边界',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint16_t a : 5;
    uint16_t b : 6;
    uint16_t c : 5;
} BitFields;

int main(void)
{
    BitFields bf = {0x1F, 0x3F, 0x1F};

    printf("a = 0x%X (%u bits)\\n", bf.a, 5);
    printf("b = 0x%X (%u bits)\\n", bf.b, 6);
    printf("c = 0x%X (%u bits)\\n", bf.c, 5);
    printf("Size: %zu bytes\\n", sizeof(BitFields));

    return 0;
}`,
    correctOutput: 'a = 0x1F (5 bits)\nb = 0x3F (6 bits)\nc = 0x1F (5 bits)\nSize: 2 bytes',
    explanation: '位域可以跨字节边界。5+6+5=16位=2字节。最大值：a=31, b=63, c=31。位域顺序依赖编译器。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位域', '跨字节', '内存布局'],
    visualization: { type: 'html', file: 'visualizations-v2/bitfield-alignment.html' },
      },
  {
    id: 3058,
    chapter: 'level2',
    type: 'output',
    title: '联合体-结构体对齐影响',
    description: '联合体中的结构体对齐',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t a;
    uint32_t b;
} StructA;

typedef struct {
    uint32_t b;
    uint8_t a;
} StructB;

typedef union {
    StructA sa;
    StructB sb;
    uint8_t bytes[16];
} UnionTest;

int main(void)
{
    printf("StructA: %zu\\n", sizeof(StructA));
    printf("StructB: %zu\\n", sizeof(StructB));
    printf("Union: %zu\\n", sizeof(UnionTest));

    return 0;
}`,
    correctOutput: 'StructA: 8\nStructB: 8\nUnion: 8',
    explanation: '联合体大小等于最大成员。StructA和StructB都是8字节（对齐后）。联合体取最大=8字节。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['联合体', '结构体对齐', '大小计算'],
    visualization: { type: 'html', file: 'visualizations-v2/union-struct-align.html' },
      },
  {
    id: 3059,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-比较函数',
    description: '自定义比较函数',
    code: `#include <stdio.h>
#include <stdint.h>

typedef int8_t (*CompareFunc)(int16_t, int16_t);

int8_t compare_abs(int16_t a, int16_t b)
{
    int16_t abs_a = a < 0 ? -a : a;
    int16_t abs_b = b < 0 ? -b : b;
    if (abs_a < abs_b) return -1;
    if (abs_a > abs_b) return 1;
    return 0;
}

int16_t find_max(int16_t *arr, uint8_t n, CompareFunc cmp)
{
    int16_t max = arr[0];
    for (uint8_t i = 1; i < n; i++) {
        if (cmp(arr[i], max) > 0) {
            max = arr[i];
        }
    }
    return max;
}

int main(void)
{
    int16_t data[] = {-5, 3, -10, 2, 8};

    printf("Max by abs: %d\\n", find_max(data, 5, compare_abs));

    return 0;
}`,
    correctOutput: 'Max by abs: -10',
    explanation: '自定义比较函数实现不同比较逻辑。compare_abs比较绝对值，-10的绝对值10最大。这是泛型编程的基础。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['比较函数', '函数指针', '泛型'],
    visualization: { type: 'html', file: 'visualizations-v2/custom-compare-func.html' },
      },
  {
    id: 3060,
    chapter: 'level2',
    type: 'output',
    title: '多文件-头文件只声明',
    description: '正确使用extern',
    code: `#include <stdio.h>
#include <stdint.h>

extern uint16_t global_counter;

void increment_global(void);

uint16_t global_counter = 0;

void increment_global(void)
{
    global_counter++;
}

int main(void)
{
    printf("Initial: %u\\n", global_counter);
    increment_global();
    increment_global();
    printf("After: %u\\n", global_counter);

    return 0;
}`,
    correctOutput: 'Initial: 0\nAfter: 2',
    explanation: 'extern声明变量在其他地方定义。一个文件定义，其他文件声明。避免重复定义错误。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['extern', '声明vs定义', '全局变量'],
    visualization: { type: 'html', file: 'visualizations-v2/extern-declaration.html' },
      },
  {
    id: 4041,
    chapter: 'level3',
    type: 'output',
    title: '动态内存-内存碎片',
    description: '内存碎片问题',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    void *ptrs[10];

    for (uint8_t i = 0; i < 10; i++) {
        ptrs[i] = malloc(100);
    }

    for (uint8_t i = 0; i < 10; i += 2) {
        free(ptrs[i]);
        ptrs[i] = NULL;
    }

    void *big = malloc(500);
    if (big != NULL) {
        printf("Allocated 500 bytes\\n");
        free(big);
    }

    for (uint8_t i = 1; i < 10; i += 2) {
        free(ptrs[i]);
    }

    printf("Done\\n");
    return 0;
}`,
    correctOutput: 'Allocated 500 bytes\nDone',
    explanation: '频繁malloc/free导致内存碎片。释放奇数位置后，内存不连续，但malloc(500)仍可能成功。内存池可避免碎片。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['内存碎片', 'malloc/free', '内存池'],
      },
  {
    id: 4042,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-二进制读写结构体',
    description: '结构体序列化',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t id;
    uint16_t value;
} Record;

int main(void)
{
    Record records[3] = {{1, 100}, {2, 200}, {3, 300}};

    FILE *fp = fopen("records.bin", "wb");
    fwrite(records, sizeof(Record), 3, fp);
    fclose(fp);

    Record loaded[3];
    fp = fopen("records.bin", "rb");
    fread(loaded, sizeof(Record), 3, fp);
    fclose(fp);

    for (uint8_t i = 0; i < 3; i++) {
        printf("Record %u: id=%u, value=%u\\n", i, loaded[i].id, loaded[i].value);
    }

    return 0;
}`,
    correctOutput: 'Record 0: id=1, value=100\nRecord 1: id=2, value=200\nRecord 2: id=3, value=300',
    explanation: 'fwrite/fread可以直接读写结构体数组。注意：跨平台时要考虑对齐和字节序问题。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['fwrite', 'fread', '结构体序列化'],
      },
  {
    id: 4043,
    chapter: 'level3',
    type: 'output',
    title: '位操作-位掩码生成',
    description: '动态生成位掩码',
    code: `#include <stdio.h>
#include <stdint.h>

uint32_t make_mask(uint8_t start, uint8_t len)
{
    if (start >= 32 || len == 0 || start + len > 32) {
        return 0;
    }
    return ((1U << len) - 1) << start;
}

int main(void)
{
    printf("Mask(0, 4): 0x%08X\\n", make_mask(0, 4));
    printf("Mask(4, 8): 0x%08X\\n", make_mask(4, 8));
    printf("Mask(16, 16): 0x%08X\\n", make_mask(16, 16));

    uint32_t val = 0x12345678;
    uint32_t mask = make_mask(8, 8);
    printf("Extract: 0x%02X\\n", (val & mask) >> 8);

    return 0;
}`,
    correctOutput: 'Mask(0, 4): 0x0000000F\nMask(4, 8): 0x00000FF0\nMask(16, 16): 0xFFFF0000\nExtract: 0x34',
    explanation: '动态生成位掩码：(1<<len)-1生成len个1，左移start位。用于灵活的位操作。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位掩码', '动态生成', '位操作'],
      },
  {
    id: 4044,
    chapter: 'level3',
    type: 'output',
    title: '预处理-宏的副作用',
    description: '宏参数多次求值',
    code: `#include <stdio.h>
#include <stdint.h>

#define SQUARE(x)  ((x) * (x))
#define SAFE_SQUARE(x) ({ \\
    __typeof__(x) _x = (x); \\
    _x * _x; \\
})

int main(void)
{
    uint8_t i = 5;

    printf("SQUARE(i++): %u, i=%u\\n", SQUARE(i++), i);

    i = 5;
    printf("SAFE_SQUARE(i++): %u, i=%u\\n", SAFE_SQUARE(i++), i);

    return 0;
}`,
    correctOutput: 'SQUARE(i++): 25, i=7\nSAFE_SQUARE(i++): 25, i=6',
    explanation: 'SQUARE(i++)展开为((i++)*(i++))，i自增两次！SAFE_SQUARE用语句表达式避免副作用。宏参数要小心！',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['宏副作用', '语句表达式', '多次求值'],
      },
  {
    id: 4045,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-信号处理函数',
    description: 'signal函数声明解析',
    code: `#include <stdio.h>
#include <stdint.h>
#include <signal.h>

void handler(int sig)
{
    printf("Signal %d\\n", sig);
}

int main(void)
{
    void (*prev)(int);

    prev = signal(SIGUSR1, handler);

    if (prev != SIG_ERR) {
        printf("Handler installed\\n");
    }

    raise(SIGUSR1);

    return 0;
}`,
    correctOutput: 'Handler installed\nSignal 10',
    explanation: 'signal返回之前的处理函数指针。void (*signal(int, void(*)(int)))(int)是最复杂的声明之一。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['signal', '函数指针', '复杂声明'],
      },
  {
    id: 4046,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strtok分割',
    description: '字符串分割',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char str[] = "192.168.1.100";
    const char *delim = ".";

    char *token = strtok(str, delim);
    while (token != NULL) {
        printf("%s\\n", token);
        token = strtok(NULL, delim);
    }

    return 0;
}`,
    correctOutput: '192\n168\n1\n100',
    explanation: 'strtok按分隔符分割字符串。第一次传字符串，后续传NULL。会修改原字符串！线程不安全，多线程用strtok_r。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strtok', '字符串分割', '线程安全'],
      },
  {
    id: 4047,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strncpy安全复制',
    description: '安全的字符串复制',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    char src[] = "Hello World";
    char dst1[6];
    char dst2[20];

    strncpy(dst1, src, 5);
    dst1[5] = '\\0';
    printf("dst1: %s\\n", dst1);

    strncpy(dst2, src, sizeof(dst2) - 1);
    dst2[sizeof(dst2) - 1] = '\\0';
    printf("dst2: %s\\n", dst2);

    return 0;
}`,
    correctOutput: 'dst1: Hello\ndst2: Hello World',
    explanation: 'strncpy指定最大复制长度，防止溢出。但不会自动添加\\0！需要手动添加。比strcpy更安全。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strncpy', '安全复制', '缓冲区'],
      },
  {
    id: 4048,
    chapter: 'level3',
    type: 'output',
    title: '内存操作-字节序转换',
    description: 'htonl/htons字节序',
    code: `#include <stdio.h>
#include <stdint.h>
#include <arpa/inet.h>

int main(void)
{
    uint32_t host_val = 0x12345678;
    uint32_t net_val = htonl(host_val);

    printf("Host: 0x%08X\\n", host_val);
    printf("Network: 0x%08X\\n", net_val);
    printf("Back: 0x%08X\\n", ntohl(net_val));

    uint16_t port = 8080;
    printf("Port host: %u\\n", port);
    printf("Port net: %u\\n", ntohs(htons(port)));

    return 0;
}`,
    correctOutput: 'Host: 0x12345678\nNetwork: 0x78563412\nBack: 0x12345678\nPort host: 8080\nPort net: 8080',
    explanation: 'htonl/htons主机序转网络序（大端）。ntohl/ntohs网络序转主机序。网络编程必备。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['htonl', '字节序', '网络编程'],
      },
  {
    id: 4049,
    chapter: 'level3',
    type: 'output',
    title: '内存操作-CRC校验',
    description: 'CRC8计算',
    code: `#include <stdio.h>
#include <stdint.h>

#define CRC8_POLY 0x07

uint8_t crc8(const uint8_t *data, uint8_t len)
{
    uint8_t crc = 0;

    for (uint8_t i = 0; i < len; i++) {
        crc ^= data[i];
        for (uint8_t j = 0; j < 8; j++) {
            if (crc & 0x80) {
                crc = (crc << 1) ^ CRC8_POLY;
            } else {
                crc <<= 1;
            }
        }
    }

    return crc;
}

int main(void)
{
    uint8_t data[] = {0x01, 0x02, 0x03, 0x04};
    uint8_t crc = crc8(data, 4);

    printf("CRC8: 0x%02X\\n", crc);

    return 0;
}`,
    correctOutput: 'CRC8: 0x',
    explanation: 'CRC用于数据校验。多项式0x07是CRC8常用值。通信协议中广泛使用，检测传输错误。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['CRC', '校验', '通信协议'],
      },
  {
    id: 4050,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-atoi转换',
    description: '字符串转整数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    const char *str1 = "12345";
    const char *str2 = "-100";
    const char *str3 = "42abc";
    const char *str4 = "abc123";

    printf("'%s' -> %d\\n", str1, atoi(str1));
    printf("'%s' -> %d\\n", str2, atoi(str2));
    printf("'%s' -> %d\\n", str3, atoi(str3));
    printf("'%s' -> %d\\n", str4, atoi(str4));

    return 0;
}`,
    correctOutput: '\'12345\' -> 12345\n\'-100\' -> -100\n\'42abc\' -> 42\n\'abc123\' -> 0',
    explanation: 'atoi字符串转整数。遇到非数字停止。无效字符串返回0。更安全用strtol，可检测错误。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['atoi', '字符串转换', 'strtol'],
      },
  {
    id: 5031,
    chapter: 'level4',
    type: 'output',
    title: '线程-线程安全计数器',
    description: '原子操作计数',
    code: `#include <stdio.h>
#include <stdint.h>
#include <pthread.h>
#include <stdatomic.h>

static atomic_uint counter = 0;

void* increment(void *arg)
{
    for (int i = 0; i < 1000; i++) {
        atomic_fetch_add(&counter, 1);
    }
    return NULL;
}

int main(void)
{
    pthread_t t1, t2;

    pthread_create(&t1, NULL, increment, NULL);
    pthread_create(&t2, NULL, increment, NULL);

    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    printf("Counter: %u\\n", counter);

    return 0;
}`,
    correctOutput: 'Counter: 2000',
    explanation: 'atomic_fetch_add是原子操作，线程安全。比mutex更高效。C11 stdatomic.h提供原子类型和操作。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['原子操作', 'stdatomic', '线程安全'],
      },
  {
    id: 5032,
    chapter: 'level4',
    type: 'output',
    title: '进程-环境变量',
    description: '获取和设置环境变量',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    const char *path = getenv("PATH");
    if (path != NULL) {
        printf("PATH length: %zu\\n", strlen(path));
    }

    setenv("MY_VAR", "hello", 1);

    const char *my_var = getenv("MY_VAR");
    printf("MY_VAR: %s\\n", my_var);

    unsetenv("MY_VAR");

    return 0;
}`,
    correctOutput: 'PATH length: \nMY_VAR: hello',
    explanation: 'getenv获取环境变量，setenv设置，unsetenv删除。配置程序行为常用。第三个参数1表示覆盖已有值。',
    difficulty: 2,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['getenv', 'setenv', '环境变量'],
      },
  {
    id: 5033,
    chapter: 'level4',
    type: 'output',
    title: '网络-域名解析',
    description: 'getaddrinfo域名解析',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netdb.h>

int main(void)
{
    struct addrinfo hints, *res;

    memset(&hints, 0, sizeof(hints));
    hints.ai_family = AF_INET;
    hints.ai_socktype = SOCK_STREAM;

    int status = getaddrinfo("localhost", "80", &hints, &res);

    if (status == 0) {
        struct sockaddr_in *ipv4 = (struct sockaddr_in*)res->ai_addr;
        printf("Resolved: %s\\n", inet_ntoa(ipv4->sin_addr));
        freeaddrinfo(res);
    } else {
        printf("Resolution failed\\n");
    }

    return 0;
}`,
    correctOutput: 'Resolved: 127.0.0.1',
    explanation: 'getaddrinfo解析域名到IP地址。支持IPv4/IPv6。比gethostbyname更现代。返回链表需要freeaddrinfo释放。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['getaddrinfo', '域名解析', 'DNS'],
      },
  {
    id: 5034,
    chapter: 'level4',
    type: 'output',
    title: '高级数据结构-哈希表',
    description: '简单哈希表实现',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

#define TABLE_SIZE 16

typedef struct {
    char key[16];
    uint8_t value;
    uint8_t used;
} Entry;

static Entry table[TABLE_SIZE];

uint8_t hash(const char *key)
{
    uint8_t h = 0;
    while (*key) {
        h = h * 31 + *key++;
    }
    return h % TABLE_SIZE;
}

void insert(const char *key, uint8_t value)
{
    uint8_t idx = hash(key);
    while (table[idx].used) {
        idx = (idx + 1) % TABLE_SIZE;
    }
    strcpy(table[idx].key, key);
    table[idx].value = value;
    table[idx].used = 1;
}

uint8_t get(const char *key)
{
    uint8_t idx = hash(key);
    while (table[idx].used) {
        if (strcmp(table[idx].key, key) == 0) {
            return table[idx].value;
        }
        idx = (idx + 1) % TABLE_SIZE;
    }
    return 0;
}

int main(void)
{
    insert("apple", 10);
    insert("banana", 20);

    printf("apple: %u\\n", get("apple"));
    printf("banana: %u\\n", get("banana"));

    return 0;
}`,
    correctOutput: 'apple: 10\nbanana: 20',
    explanation: '哈希表用哈希函数快速查找。线性探测解决冲突。O(1)平均查找时间。嵌入式配置表常用。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['哈希表', '哈希函数', '线性探测'],
      },
  {
    id: 5035,
    chapter: 'level4',
    type: 'output',
    title: 'IO-文件锁',
    description: 'flock文件锁',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/file.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = open("lock.txt", O_RDWR | O_CREAT, 0644);

    if (flock(fd, LOCK_EX) == 0) {
        printf("File locked\\n");

        write(fd, "Hello", 5);

        flock(fd, LOCK_UN);
        printf("File unlocked\\n");
    }

    close(fd);
    return 0;
}`,
    correctOutput: 'File locked\nFile unlocked',
    explanation: 'flock对文件加锁。LOCK_EX排他锁，LOCK_SH共享锁，LOCK_UN解锁。防止多进程同时写入冲突。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['flock', '文件锁', 'LOCK_EX'],
      },
  {
    id: 5036,
    chapter: 'level4',
    type: 'output',
    title: '高级指针-对象工厂',
    description: '工厂模式创建对象',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <string.h>

typedef struct {
    uint8_t id;
    char name[16];
    void (*print)(void*);
} Device;

void sensor_print(void *self)
{
    Device *d = (Device*)self;
    printf("Sensor[%u]: %s\\n", d->id, d->name);
}

void motor_print(void *self)
{
    Device *d = (Device*)self;
    printf("Motor[%u]: %s\\n", d->id, d->name);
}

Device* create_device(const char *type, uint8_t id)
{
    Device *d = (Device*)malloc(sizeof(Device));
    d->id = id;

    if (strcmp(type, "sensor") == 0) {
        strcpy(d->name, "Sensor");
        d->print = sensor_print;
    } else {
        strcpy(d->name, "Motor");
        d->print = motor_print;
    }

    return d;
}

int main(void)
{
    Device *s = create_device("sensor", 1);
    Device *m = create_device("motor", 2);

    s->print(s);
    m->print(m);

    free(s);
    free(m);

    return 0;
}`,
    correctOutput: 'Sensor[1]: Sensor\nMotor[2]: Motor',
    explanation: '工厂模式根据类型创建不同对象。函数指针实现多态。面向对象编程在C语言中的实现方式。',
    difficulty: 4,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['工厂模式', '函数指针', '多态'],
      },
  {
    id: 5037,
    chapter: 'level4',
    type: 'output',
    title: '信号-定时器信号',
    description: 'SIGALRM定时器',
    code: `#include <stdio.h>
#include <stdint.h>
#include <signal.h>
#include <unistd.h>

static volatile uint8_t alarm_count = 0;

void alarm_handler(int sig)
{
    alarm_count++;
}

int main(void)
{
    signal(SIGALRM, alarm_handler);

    alarm(1);

    printf("Waiting...\\n");
    pause();

    printf("Alarm count: %u\\n", alarm_count);

    return 0;
}`,
    correctOutput: 'Waiting...\nAlarm count: 1',
    explanation: 'alarm设置定时器，秒后发送SIGALRM。pause挂起等待信号。简单定时任务实现。精度较低。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['alarm', 'SIGALRM', '定时器'],
      },
  {
    id: 5038,
    chapter: 'level4',
    type: 'output',
    title: '网络-setsockopt选项',
    description: '设置socket选项',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/tcp.h>

int main(void)
{
    int sock = socket(AF_INET, SOCK_STREAM, 0);

    int opt = 1;
    setsockopt(sock, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    int keepalive = 1;
    setsockopt(sock, SOL_SOCKET, SO_KEEPALIVE, &keepalive, sizeof(keepalive));

    int nodelay = 1;
    setsockopt(sock, IPPROTO_TCP, TCP_NODELAY, &nodelay, sizeof(nodelay));

    printf("Options set\\n");

    close(sock);
    return 0;
}`,
    correctOutput: 'Options set',
    explanation: 'setsockopt设置socket选项。SO_REUSEADDR地址重用，SO_KEEPALIVE保持连接，TCP_NODELAY禁用Nagle算法。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['setsockopt', 'SO_REUSEADDR', 'TCP_NODELAY'],
      },
  {
    id: 5039,
    chapter: 'level4',
    type: 'output',
    title: '进程-孤儿进程',
    description: '孤儿进程被init收养',
    code: `#include <stdio.h>
#include <stdint.h>
#include <unistd.h>
#include <sys/types.h>

int main(void)
{
    pid_t pid = fork();

    if (pid == 0) {
        sleep(1);
        printf("Child PPID: %d\\n", getppid());
    } else {
        printf("Parent PID: %d\\n", getpid());
    }

    return 0;
}`,
    correctOutput: 'Parent PID: \nChild PPID: 1',
    explanation: '父进程先退出，子进程成为孤儿进程，被init(PID=1)收养。孤儿进程不影响系统，僵尸进程才会占用资源。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['孤儿进程', 'fork', 'getppid'],
      },
  {
    id: 5040,
    chapter: 'level4',
    type: 'output',
    title: '高级数据结构-二叉树',
    description: '二叉树遍历',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct Node {
    uint8_t data;
    struct Node *left;
    struct Node *right;
} Node;

Node* create_node(uint8_t data)
{
    Node *n = (Node*)malloc(sizeof(Node));
    n->data = data;
    n->left = n->right = NULL;
    return n;
}

void preorder(Node *root)
{
    if (root == NULL) return;
    printf("%u ", root->data);
    preorder(root->left);
    preorder(root->right);
}

void inorder(Node *root)
{
    if (root == NULL) return;
    inorder(root->left);
    printf("%u ", root->data);
    inorder(root->right);
}

int main(void)
{
    Node *root = create_node(2);
    root->left = create_node(1);
    root->right = create_node(3);

    printf("Preorder: ");
    preorder(root);
    printf("\\n");

    printf("Inorder: ");
    inorder(root);
    printf("\\n");

    return 0;
}`,
    correctOutput: 'Preorder: 2 1 3 \nInorder: 1 2 3 ',
    explanation: '二叉树：前序(根左右)，中序(左根右)，后序(左右根)。中序遍历BST得到有序序列。表达式树、决策树都用。',
    difficulty: 3,
    hint: '困难级题目，解决复杂问题。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['二叉树', '遍历', '递归'],
      },
  {
    id: 6016,
    chapter: 'level5',
    type: 'output',
    title: '驱动-等待队列',
    description: '内核等待队列',
    code: `#include <linux/module.h>
#include <linux/wait.h>
#include <linux/sched.h>

static DECLARE_WAIT_QUEUE_HEAD(wq);
static int condition = 0;

static int __init my_init(void)
{
    wait_event_interruptible(wq, condition);

    printk(KERN_INFO "Module loaded\\n");
    return 0;
}

static void __exit my_exit(void)
{
    condition = 1;
    wake_up(&wq);
    printk(KERN_INFO "Module unloaded\\n");
}

module_init(my_init);
module_exit(my_exit);`,
    correctOutput: 'Module loaded',
    explanation: 'wait_event让进程睡眠等待条件成立。wake_up唤醒等待的进程。驱动阻塞IO的核心机制。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['等待队列', 'wait_event', 'wake_up'],
      },
  {
    id: 6017,
    chapter: 'level5',
    type: 'output',
    title: '性能-CPU亲和性',
    description: '设置CPU亲和性',
    code: `#include <stdio.h>
#include <stdint.h>
#include <sched.h>

int main(void)
{
    cpu_set_t mask;

    CPU_ZERO(&mask);
    CPU_SET(0, &mask);

    if (sched_setaffinity(0, sizeof(mask), &mask) == 0) {
        printf("Set CPU affinity to CPU 0\\n");
    }

    CPU_ZERO(&mask);
    if (sched_getaffinity(0, sizeof(mask), &mask) == 0) {
        printf("Can run on CPUs:");
        for (int i = 0; i < CPU_SETSIZE; i++) {
            if (CPU_ISSET(i, &mask)) {
                printf(" %d", i);
            }
        }
        printf("\\n");
    }

    return 0;
}`,
    correctOutput: 'Set CPU affinity to CPU 0\nCan run on CPUs: 0',
    explanation: 'CPU亲和性绑定进程到特定CPU。减少缓存失效，提高性能。实时系统常用。CPU_SET操作位掩码。',
    difficulty: 4,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['CPU亲和性', 'sched_setaffinity', 'CPU_SET'],
      },
  {
    id: 6018,
    chapter: 'level5',
    type: 'output',
    title: '安全-安全随机数',
    description: '安全的随机数生成',
    code: `#include <stdio.h>
#include <stdint.h>
#include <fcntl.h>
#include <unistd.h>

int main(void)
{
    int fd = open("/dev/urandom", O_RDONLY);

    if (fd < 0) {
        printf("Failed to open urandom\\n");
        return 1;
    }

    uint32_t random_val;
    read(fd, &random_val, sizeof(random_val));

    printf("Random: 0x%08X\\n", random_val);

    close(fd);
    return 0;
}`,
    correctOutput: 'Random: 0x',
    explanation: '/dev/urandom提供加密安全的随机数。比rand()更安全。密码、密钥生成必须用安全随机源。',
    difficulty: 3,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['/dev/urandom', '安全随机数', '加密'],
      },
  {
    id: 6019,
    chapter: 'level5',
    type: 'output',
    title: '架构-插件系统',
    description: '动态加载插件',
    code: `#include <stdio.h>
#include <stdint.h>
#include <dlfcn.h>

typedef void (*PluginFunc)(void);

int main(void)
{
    void *handle = dlopen("./plugin.so", RTLD_LAZY);

    if (!handle) {
        printf("dlopen failed: %s\\n", dlerror());
        return 1;
    }

    PluginFunc func = (PluginFunc)dlsym(handle, "plugin_run");

    if (func) {
        func();
    } else {
        printf("dlsym failed\\n");
    }

    dlclose(handle);
    return 0;
}`,
    correctOutput: 'dlopen failed: ',
    explanation: 'dlopen动态加载共享库，dlsym获取符号地址，dlclose卸载。实现插件架构，运行时扩展功能。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['dlopen', 'dlsym', '插件系统'],
      },
  {
    id: 6020,
    chapter: 'level5',
    type: 'output',
    title: '架构-依赖注入',
    description: '依赖注入模式',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    void (*send)(const char *data);
} Logger;

void console_send(const char *data)
{
    printf("Console: %s\\n", data);
}

void file_send(const char *data)
{
    printf("File: %s\\n", data);
}

typedef struct {
    Logger *logger;
} Application;

void app_run(Application *app, const char *msg)
{
    app->logger->send(msg);
}

int main(void)
{
    Logger console = {console_send};
    Logger file = {file_send};

    Application app1 = {&console};
    Application app2 = {&file};

    app_run(&app1, "Hello");
    app_run(&app2, "World");

    return 0;
}`,
    correctOutput: 'Console: Hello\nFile: World',
    explanation: '依赖注入：外部创建依赖并注入。Application不关心Logger具体实现。解耦、易于测试、灵活切换实现。',
    difficulty: 5,
    hint: '专家级题目，深入理解系统原理。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['依赖注入', '解耦', '设计模式'],
      },
  {
    id: 3061,
    chapter: 'level2',
    type: 'output',
    title: '指针-restrict关键字',
    description: 'restrict优化提示',
    code: `#include <stdio.h>
#include <stdint.h>

void copy_data(uint8_t * restrict dst, const uint8_t * restrict src, uint8_t n)
{
    for (uint8_t i = 0; i < n; i++) {
        dst[i] = src[i];
    }
}

int main(void)
{
    uint8_t src[] = {1, 2, 3, 4, 5};
    uint8_t dst[5];

    copy_data(dst, src, 5);

    printf("Copied: ");
    for (uint8_t i = 0; i < 5; i++) {
        printf("%u ", dst[i]);
    }
    printf("\\n");

    return 0;
}`,
    correctOutput: 'Copied: 1 2 3 4 5 ',
    explanation: 'restrict告诉编译器指针不会重叠，允许优化。如果违反约定是未定义行为。memcpy等函数使用restrict。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['restrict', '指针优化', '编译器提示'],
    visualization: { type: 'html', file: 'visualizations-v2/restrict-keyword.html' },
      },
  {
    id: 3062,
    chapter: 'level2',
    type: 'output',
    title: '结构体-指定初始化器',
    description: 'C99指定成员初始化',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t id;
    uint16_t value;
    uint8_t status;
} Device;

int main(void)
{
    Device dev1 = {.id = 1, .status = 5};
    Device dev2 = {.value = 100, .id = 2};

    printf("dev1: id=%u, value=%u, status=%u\\n", dev1.id, dev1.value, dev1.status);
    printf("dev2: id=%u, value=%u, status=%u\\n", dev2.id, dev2.value, dev2.status);

    return 0;
}`,
    correctOutput: 'dev1: id=1, value=0, status=5\ndev2: id=2, value=100, status=0',
    explanation: 'C99指定初始化器可以按名称初始化成员，未指定的自动为0。比按顺序初始化更清晰，适合大结构体。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指定初始化器', 'C99', '结构体初始化'],
    visualization: { type: 'html', file: 'visualizations-v2/designated-initializer.html' },
      },
  {
    id: 3063,
    chapter: 'level2',
    type: 'output',
    title: '联合体-匿名联合体',
    description: '结构体内嵌联合体',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    uint8_t type;
    union {
        uint8_t u8_val;
        uint16_t u16_val;
        uint32_t u32_val;
    };
} DataValue;

int main(void)
{
    DataValue dv;

    dv.type = 0;
    dv.u8_val = 100;
    printf("Type 0: %u\\n", dv.u8_val);

    dv.type = 1;
    dv.u16_val = 1000;
    printf("Type 1: %u\\n", dv.u16_val);

    return 0;
}`,
    correctOutput: 'Type 0: 100\nType 1: 1000',
    explanation: '匿名联合体在结构体内可以直接访问成员，不需要联合体名。常用于变体数据类型。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['匿名联合体', '变体类型', '结构体嵌套'],
    visualization: { type: 'html', file: 'visualizations-v2/anonymous-union.html' },
      },
  {
    id: 3064,
    chapter: 'level2',
    type: 'output',
    title: '枚举-枚举值运算',
    description: '枚举作为整数',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    JAN = 1, FEB, MAR, APR, MAY, JUN,
    JUL, AUG, SEP, OCT, NOV, DEC
} Month;

int main(void)
{
    Month m = MAR;

    printf("March is month %d\\n", m);
    printf("Next month: %d\\n", m + 1);
    printf("Months until Dec: %d\\n", DEC - m);

    return 0;
}`,
    correctOutput: 'March is month 3\nNext month: 4\nMonths until Dec: 9',
    explanation: '枚举本质是整数，可以参与算术运算。MAR=3，自动递增。但要注意类型安全，最好显式转换。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['枚举运算', '自动递增', '整数类型'],
    visualization: { type: 'html', file: 'visualizations-v2/enum-arithmetic.html' },
      },
  {
    id: 3065,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-信号处理表',
    description: '信号处理函数表',
    code: `#include <stdio.h>
#include <stdint.h>

typedef void (*SignalHandler)(uint8_t);

void handle_idle(uint8_t sig) { printf("IDLE signal %u\\n", sig); }
void handle_run(uint8_t sig) { printf("RUN signal %u\\n", sig); }
void handle_err(uint8_t sig) { printf("ERROR signal %u\\n", sig); }

int main(void)
{
    SignalHandler handlers[3] = {handle_idle, handle_run, handle_err};

    uint8_t signals[] = {0, 1, 2, 1, 0};

    for (uint8_t i = 0; i < 5; i++) {
        if (signals[i] < 3) {
            handlers[signals[i]](i);
        }
    }

    return 0;
}`,
    correctOutput: 'IDLE signal 0\nRUN signal 1\nERROR signal 2\nRUN signal 3\nIDLE signal 4',
    explanation: '函数指针数组实现信号分发。根据信号类型调用对应处理函数。嵌入式事件处理常用模式。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['函数指针数组', '信号处理', '事件分发'],
    visualization: { type: 'html', file: 'visualizations-v2/signal-handler-table.html' },
      },
  {
    id: 3066,
    chapter: 'level2',
    type: 'output',
    title: '多文件-编译单元',
    description: '编译单元概念',
    code: `#include <stdio.h>
#include <stdint.h>

static uint8_t file_local = 10;
const uint8_t file_const = 20;

static void file_private(void)
{
    printf("Private: %u\\n", file_local);
}

int main(void)
{
    printf("Const: %u\\n", file_const);
    file_private();

    return 0;
}`,
    correctOutput: 'Const: 20\nPrivate: 10',
    explanation: 'static全局变量/函数只在当前编译单元可见。const变量只读。每个.c文件是一个编译单元。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['编译单元', 'static', 'const'],
    visualization: { type: 'html', file: 'visualizations-v2/compilation-unit.html' },
      },
  {
    id: 3067,
    chapter: 'level2',
    type: 'output',
    title: '指针-指针比较',
    description: '指针比较运算',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t arr[5] = {10, 20, 30, 40, 50};
    uint8_t *p1 = arr + 1;
    uint8_t *p2 = arr + 3;

    printf("p1 < p2: %s\\n", p1 < p2 ? "true" : "false");
    printf("p1 > p2: %s\\n", p1 > p2 ? "true" : "false");
    printf("p2 - p1: %ld\\n", (long)(p2 - p1));

    uint8_t *end = arr + 5;
    printf("p1 in range: %s\\n", (p1 >= arr && p1 < end) ? "yes" : "no");

    return 0;
}`,
    correctOutput: 'p1 < p2: true\np1 > p2: false\np2 - p1: 2\np1 in range: yes',
    explanation: '指向同一数组的指针可以比较大小。指针相减得到元素距离。检查指针是否在数组范围内是常见操作。',
    difficulty: 2,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['指针比较', '指针运算', '范围检查'],
    visualization: { type: 'html', file: 'visualizations-v2/pointer-compare.html' },
      },
  {
    id: 3068,
    chapter: 'level2',
    type: 'output',
    title: '结构体-结构体数组排序',
    description: 'qsort排序结构体',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

typedef struct {
    uint8_t id;
    uint16_t score;
} Player;

int compare_score(const void *a, const void *b)
{
    Player *pa = (Player*)a;
    Player *pb = (Player*)b;
    return pb->score - pa->score;
}

int main(void)
{
    Player players[4] = {{1, 100}, {2, 250}, {3, 180}, {4, 300}};

    qsort(players, 4, sizeof(Player), compare_score);

    printf("Rankings:\\n");
    for (uint8_t i = 0; i < 4; i++) {
        printf("%u. Player %u: %u\\n", i + 1, players[i].id, players[i].score);
    }

    return 0;
}`,
    correctOutput: 'Rankings:\n1. Player 4: 300\n2. Player 2: 250\n3. Player 3: 180\n4. Player 1: 100',
    explanation: 'qsort可以排序结构体数组。比较函数接收结构体指针，返回比较结果。降序用pb-pa，升序用pa-pb。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['qsort', '结构体排序', '比较函数'],
    visualization: { type: 'html', file: 'visualizations-v2/struct-qsort.html' },
      },
  {
    id: 3069,
    chapter: 'level2',
    type: 'output',
    title: '联合体-类型双关',
    description: '用联合体实现类型转换',
    code: `#include <stdio.h>
#include <stdint.h>

typedef union {
    float f;
    uint32_t u;
    int32_t i;
} TypePun;

int main(void)
{
    TypePun tp;

    tp.f = 1.5f;
    printf("Float: %f, Hex: 0x%08X\\n", tp.f, tp.u);

    tp.u = 0x40000000;
    printf("Hex: 0x%08X, Float: %f\\n", tp.u, tp.f);

    return 0;
}`,
    correctOutput: 'Float: 1.500000, Hex: 0x3FC00000\nHex: 0x40000000, Float: 2.000000',
    explanation: '联合体实现类型双关（type punning），直接访问同一内存的不同类型表示。注意可移植性问题。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['类型双关', 'union', '内存解释'],
    visualization: { type: 'html', file: 'visualizations-v2/type-punning.html' },
      },
  {
    id: 3070,
    chapter: 'level2',
    type: 'output',
    title: '函数指针-命令模式',
    description: '命令模式实现',
    code: `#include <stdio.h>
#include <stdint.h>

typedef struct {
    const char *name;
    void (*execute)(void);
} Command;

void cmd_start(void) { printf("Starting...\\n"); }
void cmd_stop(void) { printf("Stopping...\\n"); }
void cmd_status(void) { printf("Status: OK\\n"); }

Command commands[] = {
    {"start", cmd_start},
    {"stop", cmd_stop},
    {"status", cmd_status},
    {NULL, NULL}
};

void run_command(const char *name)
{
    for (Command *cmd = commands; cmd->name; cmd++) {
        if (strcmp(name, cmd->name) == 0) {
            cmd->execute();
            return;
        }
    }
    printf("Unknown command\\n");
}

int main(void)
{
    run_command("start");
    run_command("status");
    run_command("stop");

    return 0;
}`,
    correctOutput: 'Starting...\nStatus: OK\nStopping...',
    explanation: '命令模式：将请求封装为对象。Command结构体包含名称和执行函数。解耦调用者和执行者。',
    difficulty: 3,
    hint: '基础级题目，理解核心概念。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['命令模式', '函数指针', '设计模式'],
    visualization: { type: 'html', file: 'visualizations-v2/command-pattern.html' },
      },
  {
    id: 4051,
    chapter: 'level3',
    type: 'output',
    title: '动态内存-realloc失败处理',
    description: 'realloc失败时的处理',
    code: `#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>

int main(void)
{
    uint8_t *ptr = (uint8_t*)malloc(10);

    if (ptr == NULL) {
        printf("Initial alloc failed\\n");
        return 1;
    }

    for (uint8_t i = 0; i < 10; i++) {
        ptr[i] = i;
    }

    uint8_t *new_ptr = (uint8_t*)realloc(ptr, 20);

    if (new_ptr == NULL) {
        printf("Realloc failed, original still valid\\n");
        free(ptr);
        return 1;
    }

    ptr = new_ptr;

    for (uint8_t i = 10; i < 20; i++) {
        ptr[i] = i;
    }

    printf("Expanded: %u %u %u\\n", ptr[0], ptr[10], ptr[19]);

    free(ptr);
    return 0;
}`,
    correctOutput: 'Expanded: 0 10 19',
    explanation: 'realloc失败返回NULL，但原指针仍然有效！必须保存原指针。正确做法：用新变量接收，成功后再赋值。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['realloc', '内存管理', '失败处理'],
      },
  {
    id: 4052,
    chapter: 'level3',
    type: 'output',
    title: '文件操作-临时文件',
    description: 'tmpfile创建临时文件',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    FILE *tmp = tmpfile();

    if (tmp == NULL) {
        printf("Failed to create temp file\\n");
        return 1;
    }

    fprintf(tmp, "Temporary data");
    rewind(tmp);

    char buf[20];
    fgets(buf, sizeof(buf), tmp);
    printf("Read: %s\\n", buf);

    fclose(tmp);
    printf("Temp file auto-deleted\\n");

    return 0;
}`,
    correctOutput: 'Read: Temporary data\nTemp file auto-deleted',
    explanation: 'tmpfile创建临时文件，关闭时自动删除。比手动创建/删除更安全。适合中间数据处理。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['tmpfile', '临时文件', '自动删除'],
      },
  {
    id: 4053,
    chapter: 'level3',
    type: 'output',
    title: '位操作-位填充',
    description: '设置连续位',
    code: `#include <stdio.h>
#include <stdint.h>

uint32_t fill_bits(uint8_t start, uint8_t end)
{
    if (start > end || end >= 32) return 0;
    uint8_t len = end - start + 1;
    return ((1U << len) - 1) << start;
}

int main(void)
{
    printf("Fill 0-3: 0x%08X\\n", fill_bits(0, 3));
    printf("Fill 4-7: 0x%08X\\n", fill_bits(4, 7));
    printf("Fill 8-15: 0x%08X\\n", fill_bits(8, 15));

    return 0;
}`,
    correctOutput: 'Fill 0-3: 0x0000000F\nFill 4-7: 0x000000F0\nFill 8-15: 0x0000FF00',
    explanation: '填充连续位：生成start到end位全为1的掩码。len个1左移start位。寄存器配置常用。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['位填充', '掩码生成', '连续位'],
      },
  {
    id: 4054,
    chapter: 'level3',
    type: 'output',
    title: '预处理-字符串化拼接',
    description: '#和##组合使用',
    code: `#include <stdio.h>
#include <stdint.h>

#define STR(x) #x
#define XSTR(x) STR(x)
#define CONCAT(a, b) a##b
#define MAKE_VAR(n) var_##n
#define MAKE_FUNC(n) func_##n

#define VALUE 100

void func_test(void) { printf("func_test called\\n"); }

int main(void)
{
    printf("STR(123): %s\\n", STR(123));
    printf("XSTR(VALUE): %s\\n", XSTR(VALUE));

    int MAKE_VAR(1) = 10;
    printf("var_1 = %d\\n", var_1);

    MAKE_FUNC(test)();

    return 0;
}`,
    correctOutput: 'STR(123): 123\nXSTR(VALUE): 100\nvar_1 = 10\nfunc_test called',
    explanation: '#字符串化，##拼接。XSTR先展开VALUE再字符串化得到"100"。MAKE_VAR生成var_1变量名。',
    difficulty: 4,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['#', '##', '宏展开'],
      },
  {
    id: 4055,
    chapter: 'level3',
    type: 'output',
    title: '复杂声明-解析练习2',
    description: '函数指针数组指针',
    code: `#include <stdio.h>
#include <stdint.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

int main(void)
{
    int (*funcs[3])(int, int) = {add, sub, mul};
    int (*(*ptr)[3])(int, int) = &funcs;

    printf("add: %d\\n", (*ptr)[0](10, 5));
    printf("sub: %d\\n", (*ptr)[1](10, 5));
    printf("mul: %d\\n", (*ptr)[2](10, 5));

    return 0;
}`,
    correctOutput: 'add: 15\nsub: 5\nmul: 50',
    explanation: 'int (*(*ptr)[3])(int, int)：ptr是指向函数指针数组的指针。(*ptr)解引用得到数组，[i]访问元素。',
    difficulty: 5,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['复杂声明', '函数指针数组指针', '右左法则'],
      },
  {
    id: 4056,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strchr查找',
    description: '查找字符位置',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    const char *str = "Hello World";

    char *pos = strchr(str, 'o');
    if (pos != NULL) {
        printf("First 'o' at index: %ld\\n", pos - str);
    }

    pos = strrchr(str, 'o');
    if (pos != NULL) {
        printf("Last 'o' at index: %ld\\n", pos - str);
    }

    pos = strchr(str, 'z');
    printf("'z' found: %s\\n", pos ? "yes" : "no");

    return 0;
}`,
    correctOutput: 'First \'o\' at index: 4\nLast \'o\' at index: 7\n\'z\' found: no',
    explanation: 'strchr查找字符首次出现，strrchr查找最后一次。返回位置指针，未找到返回NULL。指针相减得索引。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strchr', 'strrchr', '字符查找'],
      },
  {
    id: 4057,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strncmp比较',
    description: '比较前n个字符',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    const char *str1 = "Hello World";
    const char *str2 = "Hello There";

    printf("Compare 5: %d\\n", strncmp(str1, str2, 5));
    printf("Compare 7: %d\\n", strncmp(str1, str2, 7));
    printf("Compare 11: %d\\n", strncmp(str1, str2, 11));

    return 0;
}`,
    correctOutput: 'Compare 5: 0\nCompare 7: 0\nCompare 11: -1',
    explanation: 'strncmp比较前n个字符。返回0表示相等，负数表示str1<str2，正数表示str1>str2。前7个字符相同，第8个不同。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strncmp', '字符串比较', '前n字符'],
      },
  {
    id: 4058,
    chapter: 'level3',
    type: 'output',
    title: '内存操作-memchr查找',
    description: '内存块中查找字节',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    uint8_t data[] = {0x01, 0x02, 0x03, 0x04, 0x05};

    uint8_t *pos = (uint8_t*)memchr(data, 0x03, 5);

    if (pos != NULL) {
        printf("Found 0x03 at index: %ld\\n", pos - data);
        printf("Remaining: ");
        while (pos < data + 5) {
            printf("0x%02X ", *pos++);
        }
        printf("\\n");
    }

    return 0;
}`,
    correctOutput: 'Found 0x03 at index: 2\nRemaining: 0x03 0x04 0x05 ',
    explanation: 'memchr在内存块中查找字节。可以用于非字符串数据。返回找到的位置指针或NULL。',
    difficulty: 2,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['memchr', '内存查找', '字节搜索'],
      },
  {
    id: 4059,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strpbrk查找',
    description: '查找任意字符',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    const char *str = "Hello World";
    const char *chars = "aeiou";

    char *pos = strpbrk(str, chars);
    while (pos != NULL) {
        printf("Found vowel '%c' at index %ld\\n", *pos, pos - str);
        pos = strpbrk(pos + 1, chars);
    }

    return 0;
}`,
    correctOutput: 'Found vowel \'e\' at index 1\nFound vowel \'o\' at index 4\nFound vowel \'o\' at index 7',
    explanation: 'strpbrk查找字符串中任意一个字符首次出现。循环调用可找到所有匹配。适合分隔符查找。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strpbrk', '字符集查找', '字符串搜索'],
      },
  {
    id: 4060,
    chapter: 'level3',
    type: 'output',
    title: '字符串操作-strspn跳过',
    description: '计算匹配前缀长度',
    code: `#include <stdio.h>
#include <stdint.h>
#include <string.h>

int main(void)
{
    const char *str = "   Hello World";
    const char *whitespace = " \\t\\n";

    size_t skip = strspn(str, whitespace);
    printf("Skip %zu whitespace chars\\n", skip);
    printf("Rest: %s\\n", str + skip);

    const char *digits = "12345";
    size_t num_len = strspn(digits, "0123456789");
    printf("Number length: %zu\\n", num_len);

    return 0;
}`,
    correctOutput: 'Skip 3 whitespace chars\nRest: Hello World\nNumber length: 5',
    explanation: 'strspn返回字符串开头匹配字符集的长度。strcspn相反，返回不匹配的长度。用于解析跳过空白。',
    difficulty: 3,
    hint: '进阶级题目，掌握Linux应用编程。像编译器一样执行代码，跟踪每个变量的值变化。',
    knowledgePoints: ['strspn', 'strcspn', '前缀匹配']
  },
  // ===== 动画演示栏目 =====
  {
    id: 10001,
    chapter: 'visualization',
    type: 'output',
    title: 'uint8_t 计数器溢出',
    description: '无符号8位整数溢出回绕演示',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) 
{ 
    uint8_t rx_count = 0; 
    uint8_t packet_seq = 254; 

    for (uint8_t i = 0; i < 3; i++) { 
        rx_count++; 
        packet_seq++; 
    } 

    printf("rx_count: %u\\n", rx_count); 
    printf("packet_seq: %u\\n", packet_seq); 

    return 0; 
}`,
    correctOutput: 'rx_count: 3\npacket_seq: 1',
    explanation: 'uint8_t 范围是 0~255，254+1=255，255+1 溢出变为 0',
    difficulty: 1,
    knowledgePoints: ['uint8_t', '溢出', '回绕'],
    hint: '254+1=255, 255+1=0（溢出）',
    visualization: { type: 'html' }
  },
  {
    id: 10002,
    chapter: 'visualization',
    type: 'output',
    title: 'int8_t 温度值溢出',
    description: '有符号8位整数溢出演示',
    code: `#include <stdio.h>
#include <stdint.h>

#define TEMP_OFFSET  10

int main(void)
{
    int8_t temperature = 125;
    int8_t calibrated = temperature + TEMP_OFFSET;

    printf("Raw temp: %d\\n", temperature);
    printf("Calibrated: %d\\n", calibrated);

    return 0;
}`,
    correctOutput: 'Raw temp: 125\nCalibrated: -121',
    explanation: 'int8_t 范围是 -128~127，125+10=135 超出范围发生溢出',
    difficulty: 2,
    knowledgePoints: ['int8_t', '有符号溢出', '补码'],
    hint: '125+10=135 超出 127',
    visualization: { type: 'html' }
  },
  {
    id: 10003,
    chapter: 'visualization',
    type: 'output',
    title: '有符号无符号比较陷阱',
    description: '隐式类型转换导致的比较错误',
    code: `#include <stdio.h>
#include <stdint.h>

#define TEMP_THRESHOLD  30

int main(void)
{
    int16_t  temperature = -10;
    uint16_t threshold = TEMP_THRESHOLD;

    if (temperature < threshold) {
        printf("Below threshold\\n");
    } else {
        printf("Above threshold\\n");
    }

    return 0;
}`,
    correctOutput: 'Above threshold',
    explanation: '有符号与无符号比较时，-10 被转换为 65526，结果 65526>30',
    difficulty: 2,
    knowledgePoints: ['类型转换', '隐式转换', '比较'],
    hint: '-10 转换为无符号后变成 65526',
    visualization: { type: 'html' }
  },
  {
    id: 10004,
    chapter: 'visualization',
    type: 'output',
    title: '设置寄存器位',
    description: '使用位或运算设置GPIO寄存器',
    code: `#include <stdio.h>
#include <stdint.h>

#define LED_PIN  (1 << 3)

int main(void)
{
    uint8_t gpio_reg = 0x00;
    gpio_reg |= LED_PIN;
    printf("GPIO: 0x%02X\\n", gpio_reg);
    
    gpio_reg |= (1 << 5);
    printf("GPIO: 0x%02X\\n", gpio_reg);
    return 0;
}`,
    correctOutput: 'GPIO: 0x08\nGPIO: 0x28',
    explanation: '|= 用于设置特定位为1，0x08|0x20=0x28',
    difficulty: 1,
    knowledgePoints: ['位运算', 'GPIO', '寄存器'],
    hint: '|= 设置位，1<<3=8',
    visualization: { type: 'html' }
  },
  {
    id: 10005,
    chapter: 'visualization',
    type: 'output',
    title: '清除寄存器位',
    description: '使用位与取反清除标志位',
    code: `#include <stdio.h>
#include <stdint.h>

#define FLAG_MASK  (1 << 2)

int main(void)
{
    uint8_t status = 0x0F;
    printf("Before: 0x%02X\\n", status);
    
    status &= ~FLAG_MASK;
    printf("After:  0x%02X\\n", status);
    return 0;
}`,
    correctOutput: 'Before: 0x0F\nAfter:  0x0B',
    explanation: '&= ~ 用于清除特定位，0x0F & 0xFB = 0x0B',
    difficulty: 1,
    knowledgePoints: ['位运算', '取反', '清除位'],
    hint: '~0x04 = 0xFB',
    visualization: { type: 'html' }
  },
  {
    id: 10006,
    chapter: 'visualization',
    type: 'output',
    title: '设备状态判断-早返回',
    description: '使用早返回模式简化代码',
    code: `#include <stdio.h>
#include <stdint.h>

#define DEVICE_OK       0
#define DEVICE_ERROR   -1
#define DEVICE_BUSY    -2

int32_t device_init(uint8_t mode)
{
    if (mode > 3) {
        return DEVICE_ERROR;
    }
    if (mode == 0) {
        return DEVICE_BUSY;
    }
    return DEVICE_OK;
}

int main(void)
{
    int32_t ret = device_init(5);
    printf("Result: %d\\n", ret);
    return 0;
}`,
    correctOutput: 'Result: -1',
    explanation: 'mode=5>3 直接返回 DEVICE_ERROR(-1)，早返回避免嵌套',
    difficulty: 1,
    knowledgePoints: ['早返回', '条件判断', '错误处理'],
    hint: 'mode>3 条件为真直接返回',
    visualization: { type: 'html' }
  },
  {
    id: 10007,
    chapter: 'visualization',
    type: 'output',
    title: 'switch-case 命令分发',
    description: '多路分支的典型应用',
    code: `#include <stdio.h>
#include <stdint.h>

#define CMD_READ   0x01
#define CMD_WRITE  0x02
#define CMD_RESET  0x03

int main(void)
{
    uint8_t command = CMD_WRITE;
    uint8_t response = 0;

    switch (command) {
        case CMD_READ:
            response = 0x80;
            printf("READ\\n");
            break;
        case CMD_WRITE:
            response = 0x81;
            printf("WRITE\\n");
            break;
        case CMD_RESET:
            response = 0xFF;
            printf("RESET\\n");
            break;
    }

    printf("Response: 0x%02X\\n", response);
    return 0;
}`,
    correctOutput: 'WRITE\nResponse: 0x81',
    explanation: 'command=0x02 匹配 case CMD_WRITE，设置 response=0x81',
    difficulty: 1,
    knowledgePoints: ['switch', '分支', '命令分发'],
    hint: 'CMD_WRITE=0x02 匹配',
    visualization: { type: 'html' }
  },
  {
    id: 10008,
    chapter: 'visualization',
    type: 'output',
    title: 'for循环数组求和',
    description: '数组遍历累加',
    code: `#include <stdio.h>
#include <stdint.h>

#define SAMPLE_COUNT  5

int main(void)
{
    uint16_t samples[SAMPLE_COUNT] = {100, 200, 150, 180, 220};
    uint32_t sum = 0;
    uint8_t count = sizeof(samples) / sizeof(samples[0]);

    for (uint8_t i = 0; i < count; i++) {
        sum += samples[i];
    }

    printf("Sum: %lu\\n", sum);
    printf("Average: %lu\\n", sum / count);
    return 0;
}`,
    correctOutput: 'Sum: 850\nAverage: 170',
    explanation: '遍历数组累加：100+200+150+180+220=850，平均=850/5=170',
    difficulty: 1,
    knowledgePoints: ['数组', 'for循环', '累加'],
    hint: '逐个累加 samples[i]',
    visualization: { type: 'html' }
  },
  {
    id: 10009,
    chapter: 'visualization',
    type: 'output',
    title: 'while超时等待',
    description: '带重试次数的轮询',
    code: `#include <stdio.h>
#include <stdint.h>

#define MAX_RETRY  5

int main(void)
{
    uint8_t device_ready = 0;
    uint8_t retry_count = 0;

    while ((device_ready == 0) && (retry_count < MAX_RETRY)) {
        printf("Waiting... retry %u\\n", retry_count + 1);
        retry_count++;
        if (retry_count == 3) {
            device_ready = 1;
        }
    }

    if (device_ready) {
        printf("Device ready after %u retries\\n", retry_count);
    } else {
        printf("Timeout!\\n");
    }
    return 0;
}`,
    correctOutput: 'Waiting... retry 1\nWaiting... retry 2\nWaiting... retry 3\nDevice ready after 3 retries',
    explanation: '第3次循环设置 device_ready=1，第4次循环条件不满足退出',
    difficulty: 1,
    knowledgePoints: ['while', '超时', '轮询'],
    hint: 'retry_count=3 时 device_ready 变为 1',
    visualization: { type: 'html' }
  },
  {
    id: 10010,
    chapter: 'visualization',
    type: 'output',
    title: '参数传值',
    description: '函数参数是值的拷贝',
    code: `#include <stdio.h>
#include <stdint.h>

void try_modify(uint8_t value)
{
    printf("Inside: value=%u\\n", value);
    value = 100;
    printf("Inside after: value=%u\\n", value);
}

int main(void)
{
    uint8_t counter = 10;

    printf("Before: counter=%u\\n", counter);
    try_modify(counter);
    printf("After: counter=%u\\n", counter);

    return 0;
}`,
    correctOutput: 'Before: counter=10\nInside: value=10\nInside after: value=100\nAfter: counter=10',
    explanation: '函数参数是实参的副本，修改不影响原变量',
    difficulty: 1,
    knowledgePoints: ['值传递', '函数参数', '副本'],
    hint: '函数内修改的是副本',
    visualization: { type: 'html' }
  },
  {
    id: 10011,
    chapter: 'visualization',
    type: 'output',
    title: 'BIT宏定义',
    description: '位操作常用宏',
    code: `#include <stdio.h>
#include <stdint.h>

#define BIT(n)     (1U << (n))
#define SET_BIT(reg, n)    ((reg) |= BIT(n))
#define READ_BIT(reg, n)   (((reg) >> (n)) & 1)

int main(void)
{
    uint8_t gpio_reg = 0x00;

    SET_BIT(gpio_reg, 3);
    printf("After SET_BIT(3): 0x%02X\\n", gpio_reg);

    SET_BIT(gpio_reg, 5);
    printf("After SET_BIT(5): 0x%02X\\n", gpio_reg);

    printf("BIT(3) = %u\\n", READ_BIT(gpio_reg, 3));
    printf("BIT(5) = %u\\n", READ_BIT(gpio_reg, 5));

    return 0;
}`,
    correctOutput: 'After SET_BIT(3): 0x08\nAfter SET_BIT(5): 0x28\nBIT(3) = 1\nBIT(5) = 1',
    explanation: 'BIT(n)=1<<n 生成位掩码，SET_BIT 设置位，READ_BIT 读取位',
    difficulty: 1,
    knowledgePoints: ['宏', '位掩码', '位操作'],
    hint: '1<<3=8, 1<<5=32',
    visualization: { type: 'html' }
  },
  {
    id: 10012,
    chapter: 'visualization',
    type: 'output',
    title: '宏的副作用',
    description: '宏参数避免使用++/--',
    code: `#include <stdio.h>
#include <stdint.h>

#define SQUARE(x)  ((x) * (x))

int main(void)
{
    uint8_t a = 5;
    printf("SQUARE(%u) = %u\\n", a, SQUARE(a));

    uint8_t b = 3;
    printf("SQUARE(%u++) = %u\\n", b, SQUARE(b++));
    printf("b after = %u\\n", b);

    return 0;
}`,
    correctOutput: 'SQUARE(5) = 25\nSQUARE(3++) = 12\nb after = 5',
    explanation: 'SQUARE(b++) 展开为 ((b++)*(b++))，b++ 执行2次，结果未定义',
    difficulty: 2,
    knowledgePoints: ['宏', '副作用', '未定义行为'],
    hint: '((b++)*(b++)) 中 b++ 执行2次',
    visualization: { type: 'html' }
  }
];

import { enhanceAllQuestions } from './questionEnhancer';

const enhancedQuestions = enhanceAllQuestions(questionsData);

export function getQuestionsByChapter(chapterId: string): Question[] {
  return enhancedQuestions.filter(q => q.chapter === chapterId);
}

export function getChapterById(chapterId: string): Chapter | undefined {
  return chapters.find(c => c.id === chapterId);
}

export { enhancedQuestions as questions };
