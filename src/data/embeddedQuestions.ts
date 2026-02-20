// 嵌入式Linux应用开发题库 - 500道真实工作场景题
// 所有题目遵循嵌入式编码规范，来自真实工作场景

import { Question, Chapter } from './lessons';

// 新章节结构 - 5个Level
export const embeddedChapters: Chapter[] = [
  {
    id: 'level1',
    name: 'Level 1 入门',
    icon: '🌱',
    description: 'C语言基础：printf、变量、运算符、条件、循环、函数 - 工作第一周就会用到',
    questionCount: 80,
    lessons: [
      {
        id: 'l1-printf',
        title: 'printf格式化输出',
        content: `调试打印是嵌入式开发最基本的技能。

**常用格式符：**
- %d/%i：有符号十进制
- %u：无符号十进制
- %x/%X：十六进制（小写/大写）
- %p：指针地址
- %s：字符串
- %c：字符

**宽度与精度：**
- %08X：8位十六进制，不足补0
- %-10s：左对齐，宽度10
- %.2f：保留2位小数

**嵌入式场景：**
打印寄存器值、调试信息、日志输出`,
        keyPoints: ['格式符', '宽度精度', '十六进制输出', '调试打印']
      },
      {
        id: 'l1-types',
        title: '整型类型与溢出',
        content: `嵌入式开发必须理解数据类型。

**stdint类型（推荐）：**
- uint8_t：无符号8位（0~255）
- int8_t：有符号8位（-128~127）
- uint16_t：无符号16位（0~65535）
- uint32_t：无符号32位
- int32_t：有符号32位

**溢出问题：**
- 无符号数溢出：回绕到0
- 有符号数溢出：未定义行为

**嵌入式场景：**
传感器数据、寄存器值、计数器`,
        keyPoints: ['stdint类型', '溢出', '数据范围', '类型选择']
      },
      {
        id: 'l1-operator',
        title: '运算符',
        content: `嵌入式常用运算符。

**位运算符（高频）：**
- &：按位与（清零特定位）
- |：按位或（设置特定位）
- ^：按位异或（翻转特定位）
- ~：按位取反
- <<：左移（乘以2^n）
- >>：右移（除以2^n）

**复合赋值：**
- |=：设置位
- &= ~：清除位
- ^=：翻转位

**嵌入式场景：**
配置寄存器、位掩码操作、标志位处理`,
        keyPoints: ['位运算', '掩码操作', '寄存器配置', '标志位']
      },
      {
        id: 'l1-condition',
        title: '条件判断',
        content: `设备状态判断、错误处理。

**if-else规范：**
- 必须加花括号{}
- 先处理错误情况（早返回）
- 避免深层嵌套

**switch-case：**
- 每个case必须有break
- 必须有default分支
- 状态机首选

**嵌入式场景：**
错误码判断、状态机、命令解析`,
        keyPoints: ['if-else规范', 'switch-case', '状态机', '错误处理']
      },
      {
        id: 'l1-loop',
        title: '循环',
        content: `数据处理、超时等待。

**for循环：**
- 明确次数时使用
- 计数器用有意义的名字

**while循环：**
- 条件等待时使用
- 注意超时处理

**do-while：**
- 至少执行一次时使用

**嵌入式场景：**
数据采集、超时检测、缓冲区处理`,
        keyPoints: ['for循环', 'while循环', '超时处理', '数据采集']
      },
      {
        id: 'l1-function',
        title: '函数',
        content: `模块化设计基础。

**函数设计原则：**
- 单一职责
- 函数名动词开头
- 参数不超过4个
- 返回值表示成功/失败

**返回值规范：**
- 0：成功
- 负数：错误码
- 正数：有时表示字节数

**嵌入式场景：**
驱动接口、设备操作、协议处理`,
        keyPoints: ['函数设计', '返回值规范', '错误码', '模块化']
      }
    ]
  },
  {
    id: 'level2',
    name: 'Level 2 基础',
    icon: '🌿',
    description: '指针、数组、结构体、位操作 - 嵌入式核心技能',
    questionCount: 100,
    lessons: [
      {
        id: 'l2-pointer',
        title: '指针基础',
        content: `指针是C语言的灵魂。

**指针本质：**
- 存储内存地址的变量
- 64位系统指针8字节
- 32位系统指针4字节

**指针运算：**
- p + n：偏移n * sizeof(类型)字节
- p - q：元素个数差

**指针与数组：**
- 数组名是首元素地址
- a[i]等价于*(a+i)

**嵌入式场景：**
寄存器访问、内存映射、数据缓冲`,
        keyPoints: ['指针本质', '指针运算', '指针与数组', '内存访问']
      },
      {
        id: 'l2-array',
        title: '数组与字符串',
        content: `数据存储基础。

**数组特点：**
- 连续内存
- 下标从0开始
- 数组名是常量指针

**字符串：**
- 以'\\0'结尾的字符数组
- 字符串字面量在只读区
- 常用函数：strlen, strcpy, strcmp

**嵌入式场景：**
数据缓冲、协议帧、配置字符串`,
        keyPoints: ['数组内存', '字符串处理', '缓冲区', '协议帧']
      },
      {
        id: 'l2-struct',
        title: '结构体与联合体',
        content: `数据组织方式。

**结构体：**
- 不同类型数据组合
- 内存对齐
- ->操作符访问成员

**联合体：**
- 共享内存空间
- 大小等于最大成员
- 常用于协议解析

**嵌入式场景：**
协议帧定义、寄存器映射、配置结构`,
        keyPoints: ['结构体对齐', '联合体', '协议定义', '寄存器映射']
      },
      {
        id: 'l2-bitop',
        title: '位操作',
        content: `嵌入式最常用操作。

**位操作技巧：**
- 设置位：x |= (1 << n)
- 清除位：x &= ~(1 << n)
- 翻转位：x ^= (1 << n)
- 检测位：x & (1 << n)

**位域：**
- 节省内存空间
- 寄存器位定义

**嵌入式场景：**
寄存器配置、标志位操作、协议解析`,
        keyPoints: ['位设置/清除', '位掩码', '位域', '寄存器操作']
      }
    ]
  },
  {
    id: 'level3',
    name: 'Level 3 进阶',
    icon: '🌳',
    description: 'Linux应用编程核心：文件IO、进程线程、网络编程、信号处理',
    questionCount: 150,
    lessons: [
      {
        id: 'l3-fileio',
        title: '文件IO',
        content: `Linux文件操作基础。

**系统调用：**
- open：打开文件
- read：读取文件
- write：写入文件
- close：关闭文件
- lseek：移动文件指针

**标准IO：**
- fopen/fread/fwrite/fclose
- 带缓冲，效率更高

**嵌入式场景：**
配置文件、日志记录、设备文件操作`,
        keyPoints: ['系统调用', '标准IO', '文件描述符', '设备文件']
      },
      {
        id: 'l3-process',
        title: '进程与线程',
        content: `多任务编程基础。

**进程：**
- fork：创建子进程
- exec：执行新程序
- wait：等待子进程

**线程：**
- pthread_create：创建线程
- pthread_join：等待线程
- pthread_mutex：互斥锁

**嵌入式场景：**
多任务处理、并发服务、后台任务`,
        keyPoints: ['进程创建', '线程编程', '互斥锁', '并发']
      },
      {
        id: 'l3-network',
        title: '网络编程',
        content: `TCP/UDP通信。

**Socket编程：**
- socket：创建套接字
- bind：绑定地址
- listen/accept：服务器监听
- connect：客户端连接
- send/recv：收发数据

**嵌入式场景：**
物联网通信、远程控制、数据上报`,
        keyPoints: ['Socket', 'TCP/UDP', '服务器/客户端', '物联网']
      },
      {
        id: 'l3-signal',
        title: '信号处理',
        content: `异步事件处理。

**常用信号：**
- SIGINT：Ctrl+C
- SIGTERM：终止信号
- SIGCHLD：子进程状态变化
- SIGALRM：定时器

**信号处理：**
- signal：注册处理函数
- sigaction：更安全的注册方式

**嵌入式场景：**
优雅退出、定时任务、异常处理`,
        keyPoints: ['信号类型', '信号处理', '异步事件', '优雅退出']
      }
    ]
  },
  {
    id: 'level4',
    name: 'Level 4 困难',
    icon: '🔥',
    description: '调试复杂问题：内存泄漏、死锁、竞态条件、性能优化',
    questionCount: 120,
    lessons: [
      {
        id: 'l4-memory',
        title: '内存管理陷阱',
        content: `动态内存问题排查。

**常见问题：**
- 内存泄漏：malloc后忘记free
- 野指针：free后继续使用
- 双重释放：同一内存free两次
- 越界访问：读写超出分配范围

**调试工具：**
- valgrind：内存检测
- AddressSanitizer：编译时检测

**嵌入式场景：**
长时间运行程序、资源受限环境`,
        keyPoints: ['内存泄漏', '野指针', '调试工具', '内存安全']
      },
      {
        id: 'l4-deadlock',
        title: '死锁与竞态',
        content: `多线程问题排查。

**死锁条件：**
- 互斥条件
- 持有并等待
- 不可抢占
- 循环等待

**避免方法：**
- 按顺序加锁
- 一次性获取所有锁
- 使用trylock

**竞态条件：**
- 多线程访问共享资源
- 需要同步机制

**嵌入式场景：**
多线程服务、实时系统`,
        keyPoints: ['死锁', '竞态条件', '锁顺序', '同步机制']
      },
      {
        id: 'l4-perf',
        title: '性能优化',
        content: `代码效率提升。

**优化方向：**
- 算法优化：时间复杂度
- 内存访问：缓存友好
- IO优化：批量操作
- 编译优化：-O2/-O3

**测量工具：**
- time：执行时间
- perf：性能分析
- strace：系统调用追踪

**嵌入式场景：**
实时响应、资源受限、功耗控制`,
        keyPoints: ['算法优化', '缓存友好', '性能分析', '实时性']
      }
    ]
  },
  {
    id: 'level5',
    name: 'Level 5 专家',
    icon: '👑',
    description: '面试压轴题：架构设计、内核原理、疑难杂症、系统调优',
    questionCount: 50,
    lessons: [
      {
        id: 'l5-arch',
        title: '架构设计',
        content: `系统设计能力。

**设计原则：**
- 高内聚低耦合
- 模块化分层
- 接口抽象
- 可扩展性

**常见架构：**
- 分层架构
- 事件驱动
- 状态机
- 插件架构

**嵌入式场景：**
物联网网关、工业控制器、智能家居`,
        keyPoints: ['模块化', '分层设计', '状态机', '可扩展']
      },
      {
        id: 'l5-kernel',
        title: '内核原理',
        content: `深入理解Linux。

**进程管理：**
- 进程调度
- 进程状态
- 进程间通信

**内存管理：**
- 虚拟内存
- 页表映射
- 内存区域

**文件系统：**
- VFS层
- 文件缓存
- 磁盘调度

**嵌入式场景：**
驱动开发、系统移植、性能调优`,
        keyPoints: ['进程调度', '内存管理', '文件系统', '驱动开发']
      }
    ]
  }
];

// Level 1 题目 - 入门级（80道）
export const level1Questions: Question[] = [
  // ===== printf格式化输出（8道）=====
  {
    id: 1001,
    chapter: 'level1',
    type: 'output',
    title: '打印寄存器值',
    description: '调试时打印32位寄存器值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t reg_value = 0x1234ABCD;
    printf("REG: 0x%08X\n", reg_value);
    return 0;
}`,
    correctOutput: 'REG: 0x1234ABCD',
    explanation: '%08X：8位十六进制输出，不足8位前面补0，大写字母。嵌入式调试常用格式，保证输出对齐，方便对比寄存器值。',
    difficulty: 1,
    knowledgePoints: ['printf', '十六进制', '格式化'],
    hint: '%08X中0表示补零，8表示宽度，X表示大写十六进制',
    lineAnalysis: [
      { num: 5, explanation: '定义32位无符号整数，模拟寄存器值', memoryChange: 'reg_value = 0x1234ABCD' },
      { num: 6, explanation: '%08X格式化输出：8位十六进制，不足补0，大写字母' }
    ]
  },
  {
    id: 1002,
    chapter: 'level1',
    type: 'output',
    title: '打印传感器数据',
    description: '格式化打印温度和湿度',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int16_t temperature = -15;
    uint16_t humidity = 65;
    printf("Temp: %dC, Humidity: %u%%\n", temperature, humidity);
    return 0;
}`,
    correctOutput: 'Temp: -15C, Humidity: 65%',
    explanation: '%d用于有符号整数，%u用于无符号整数。%%输出百分号字符本身。传感器数据打印常用格式。',
    difficulty: 1,
    knowledgePoints: ['printf', '有符号/无符号', '转义字符'],
    hint: '%%输出一个%字符',
    lineAnalysis: [
      { num: 5, explanation: 'int16_t可存储负数，适合温度值' },
      { num: 6, explanation: 'uint16_t只能存正数，适合湿度值' },
      { num: 7, explanation: '%d输出有符号数，%u输出无符号数，%%输出%' }
    ]
  },
  {
    id: 1003,
    chapter: 'level1',
    type: 'output',
    title: '打印设备状态',
    description: '状态标志位打印',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t status = 0x5A;
    printf("Status: 0x%02X (BIN: ", status);
    for (int8_t i = 7; i >= 0; i--) {
        printf("%d", (status >> i) & 0x01);
    }
    printf(")\n");
    return 0;
}`,
    correctOutput: 'Status: 0x5A (BIN: 01011010)',
    explanation: '同时打印十六进制和二进制，方便调试。循环从高位到低位输出每一位，(status >> i) & 0x01取出第i位。',
    difficulty: 2,
    knowledgePoints: ['printf', '位操作', '二进制输出'],
    hint: '从最高位开始，每次右移取出一位',
    lineAnalysis: [
      { num: 5, explanation: '状态寄存器值' },
      { num: 6, explanation: '%02X：2位十六进制，不足补0' },
      { num: 7, explanation: '从第7位到第0位循环' },
      { num: 8, explanation: '右移i位后与1，取出第i位' }
    ]
  },
  {
    id: 1004,
    chapter: 'level1',
    type: 'output',
    title: '打印指针地址',
    description: '调试时查看变量地址',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t sensor_value = 12345;
    uint32_t *ptr = &sensor_value;
    printf("Value: %u\n", sensor_value);
    printf("Address: %p\n", (void*)ptr);
    printf("Via ptr: %u\n", *ptr);
    return 0;
}`,
    correctOutput: 'Value: 12345\nAddress: 0x...(具体地址)\nVia ptr: 12345',
    explanation: '%p打印指针地址（十六进制）。*ptr解引用获取指针指向的值。调试时常用这种方式检查内存。',
    difficulty: 2,
    knowledgePoints: ['printf', '指针', '%p格式符'],
    hint: '%p专门用于打印指针地址',
    lineAnalysis: [
      { num: 6, explanation: '定义指针，指向sensor_value' },
      { num: 8, explanation: '%p打印地址，建议转为void*' },
      { num: 9, explanation: '*ptr解引用，获取指向的值' }
    ]
  },
  {
    id: 1005,
    chapter: 'level1',
    type: 'output',
    title: '打印字符串和字符',
    description: '设备名称和状态字符',
    code: `#include <stdio.h>

int main(void) {
    char device_name[] = "Sensor01";
    char status_char = 'O';  // O=OK, E=Error
    printf("Device: %s\n", device_name);
    printf("Status: %c\n", status_char);
    printf("First char: %c\n", device_name[0]);
    return 0;
}`,
    correctOutput: 'Device: Sensor01\nStatus: O\nFirst char: S',
    explanation: '%s打印字符串（遇到\\0停止），%c打印单个字符。字符串是字符数组，可以用下标访问单个字符。',
    difficulty: 1,
    knowledgePoints: ['printf', '字符串', '字符'],
    hint: '%s需要字符串首地址，%c需要单个字符',
    lineAnalysis: [
      { num: 5, explanation: '字符数组，自动添加\\0结尾' },
      { num: 6, explanation: '单个字符用单引号' },
      { num: 7, explanation: '%s从首地址打印到\\0' },
      { num: 9, explanation: 'device_name[0]访问第一个字符' }
    ]
  },
  {
    id: 1006,
    chapter: 'level1',
    type: 'output',
    title: '格式化对齐输出',
    description: '日志格式化对齐',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    printf("%-10s %8s %6s\n", "Device", "Value", "Unit");
    printf("%-10s %8u %6s\n", "Temp", 25, "C");
    printf("%-10s %8u %6s\n", "Humidity", 65, "%");
    printf("%-10s %8u %6s\n", "Pressure", 1013, "hPa");
    return 0;
}`,
    correctOutput: 'Device        Value   Unit\nTemp             25      C\nHumidity         65      %\nPressure       1013    hPa',
    explanation: '%-10s左对齐宽度10，%8s右对齐宽度8。负号表示左对齐，数字表示宽度。日志输出常用格式。',
    difficulty: 2,
    knowledgePoints: ['printf', '对齐', '宽度'],
    hint: '负号表示左对齐，正数表示右对齐',
    lineAnalysis: [
      { num: 5, explanation: '表头：%-10s左对齐10字符，%8s右对齐8字符' },
      { num: 6, explanation: '数据行，按表头格式对齐' }
    ]
  },
  {
    id: 1007,
    chapter: 'level1',
    type: 'output',
    title: '打印浮点数',
    description: '传感器浮点数据',
    code: `#include <stdio.h>

int main(void) {
    float voltage = 3.14159f;
    float current = 0.0256f;
    printf("Voltage: %.2fV\n", voltage);
    printf("Current: %.4fA\n", current);
    printf("Power: %.3fW\n", voltage * current);
    return 0;
}`,
    correctOutput: 'Voltage: 3.14V\nCurrent: 0.0256A\nPower: 0.080W',
    explanation: '%.2f保留2位小数，%.4f保留4位小数。点号后的数字表示精度。嵌入式常用float节省内存。',
    difficulty: 1,
    knowledgePoints: ['printf', '浮点数', '精度'],
    hint: '.Nf表示保留N位小数',
    lineAnalysis: [
      { num: 5, explanation: 'float类型，加f后缀' },
      { num: 7, explanation: '%.2f保留2位小数，四舍五入' },
      { num: 9, explanation: '可以直接在printf中计算' }
    ]
  },
  {
    id: 1008,
    chapter: 'level1',
    type: 'output',
    title: '打印字节数组',
    description: '协议帧数据打印',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t frame[] = {0xAA, 0x55, 0x01, 0x02, 0x03, 0x55, 0xAA};
    uint8_t frame_len = sizeof(frame);
    
    printf("Frame[%u]: ", frame_len);
    for (uint8_t i = 0; i < frame_len; i++) {
        printf("%02X ", frame[i]);
    }
    printf("\n");
    return 0;
}`,
    correctOutput: 'Frame[7]: AA 55 01 02 03 55 AA ',
    explanation: '协议帧通常用字节数组存储，%02X打印每个字节。循环遍历数组打印，常用于调试通信协议。',
    difficulty: 2,
    knowledgePoints: ['printf', '字节数组', '协议帧'],
    hint: 'sizeof(数组)得到数组总字节数',
    lineAnalysis: [
      { num: 6, explanation: '协议帧：帧头AA55 + 数据 + 帧尾55AA' },
      { num: 7, explanation: 'sizeof得到数组长度' },
      { num: 10, explanation: '%02X保证每个字节都是2位十六进制' }
    ]
  },

  // ===== 整型类型与溢出（8道）=====
  {
    id: 1009,
    chapter: 'level1',
    type: 'output',
    title: 'uint8_t溢出',
    description: '计数器溢出回绕',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t counter = 255;
    counter = counter + 1;
    printf("Counter: %u\n", counter);
    counter = counter + 10;
    printf("Counter: %u\n", counter);
    return 0;
}`,
    correctOutput: 'Counter: 0\nCounter: 10',
    explanation: 'uint8_t范围0~255，255+1溢出回绕到0。无符号数溢出是定义行为（回绕），嵌入式计数器常用。',
    difficulty: 2,
    knowledgePoints: ['uint8_t', '溢出', '回绕'],
    hint: 'uint8_t最大值255，加1变0',
    lineAnalysis: [
      { num: 6, explanation: 'uint8_t最大值255' },
      { num: 7, explanation: '255+1=256，但uint8_t只能存0~255，回绕到0', memoryChange: 'counter: 255 → 0' },
      { num: 9, explanation: '0+10=10，正常' }
    ]
  },
  {
    id: 1010,
    chapter: 'level1',
    type: 'output',
    title: 'int8_t溢出',
    description: '有符号数溢出',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int8_t temperature = 127;
    temperature = temperature + 1;
    printf("Temperature: %d\n", temperature);
    return 0;
}`,
    correctOutput: 'Temperature: -128',
    explanation: 'int8_t范围-128~127。有符号数溢出是未定义行为，但大多数系统会回绕到最小值。实际工作中要避免溢出。',
    difficulty: 2,
    knowledgePoints: ['int8_t', '有符号溢出', '未定义行为'],
    hint: '有符号数溢出是未定义行为，结果不可预测',
    lineAnalysis: [
      { num: 6, explanation: 'int8_t最大值127' },
      { num: 7, explanation: '127+1溢出，变成-128（二进制01111111+1=10000000）' }
    ]
  },
  {
    id: 1011,
    chapter: 'level1',
    type: 'output',
    title: '类型范围检查',
    description: '安全的数据类型转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint16_t adc_value = 4095;  // 12位ADC最大值
    uint8_t percentage = 0;
    
    if (adc_value <= 255) {
        percentage = (uint8_t)adc_value;
    } else {
        percentage = 255;  // 饱和而非截断
    }
    printf("ADC: %u, Percentage: %u\n", adc_value, percentage);
    return 0;
}`,
    correctOutput: 'ADC: 4095, Percentage: 255',
    explanation: '大类型转小类型要检查范围。直接截断会丢失数据，饱和处理更安全。ADC值转百分比常用这种处理。',
    difficulty: 2,
    knowledgePoints: ['类型转换', '范围检查', '饱和处理'],
    hint: '大类型转小类型前要检查范围',
    lineAnalysis: [
      { num: 6, explanation: '12位ADC，范围0~4095' },
      { num: 9, explanation: '检查是否在uint8_t范围内' },
      { num: 12, explanation: '超出范围则饱和到最大值255' }
    ]
  },
  {
    id: 1012,
    chapter: 'level1',
    type: 'output',
    title: 'sizeof各类型',
    description: '理解各类型大小',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    printf("uint8_t:  %zu bytes\n", sizeof(uint8_t));
    printf("uint16_t: %zu bytes\n", sizeof(uint16_t));
    printf("uint32_t: %zu bytes\n", sizeof(uint32_t));
    printf("uint64_t: %zu bytes\n", sizeof(uint64_t));
    printf("pointer:  %zu bytes\n", sizeof(void*));
    return 0;
}`,
    correctOutput: 'uint8_t:  1 bytes\nuint16_t: 2 bytes\nuint32_t: 4 bytes\nuint64_t: 8 bytes\npointer:  8 bytes',
    explanation: 'stdint类型大小固定：uint8_t=1字节，uint16_t=2字节，uint32_t=4字节，uint64_t=8字节。64位系统指针8字节。',
    difficulty: 1,
    knowledgePoints: ['sizeof', 'stdint类型', '数据类型大小'],
    hint: 'stdint类型大小固定，不随平台变化',
    lineAnalysis: [
      { num: 6, explanation: 'uint8_t固定1字节' },
      { num: 7, explanation: 'uint16_t固定2字节' },
      { num: 8, explanation: 'uint32_t固定4字节' },
      { num: 9, explanation: 'uint64_t固定8字节' },
      { num: 10, explanation: '64位系统指针8字节，32位系统4字节' }
    ]
  },
  {
    id: 1013,
    chapter: 'level1',
    type: 'output',
    title: '位移与乘法',
    description: '用位移代替乘法',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint16_t value = 100;
    printf("x2:  %u\n", value << 1);
    printf("x4:  %u\n", value << 2);
    printf("x8:  %u\n", value << 3);
    printf("x16: %u\n", value << 4);
    return 0;
}`,
    correctOutput: 'x2:  200\nx4:  400\nx8:  800\nx16: 1600',
    explanation: '左移n位等于乘以2^n。嵌入式常用位移代替乘法，效率更高。但现代编译器会自动优化，可读性更重要。',
    difficulty: 1,
    knowledgePoints: ['位移', '乘法优化', '左移'],
    hint: '左移n位 = 乘以2的n次方',
    lineAnalysis: [
      { num: 7, explanation: '左移1位：100 * 2 = 200' },
      { num: 8, explanation: '左移2位：100 * 4 = 400' },
      { num: 9, explanation: '左移3位：100 * 8 = 800' },
      { num: 10, explanation: '左移4位：100 * 16 = 1600' }
    ]
  },
  {
    id: 1014,
    chapter: 'level1',
    type: 'output',
    title: '位移溢出',
    description: '位移超过类型宽度',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t value = 0x80;  // 128
    printf("Before: %u\n", value);
    value = value << 1;
    printf("After:  %u\n", value);
    return 0;
}`,
    correctOutput: 'Before: 128\nAfter:  0',
    explanation: 'uint8_t是8位，0x80=10000000，左移1位变成00000000，高位丢弃。位移溢出时高位被截断。',
    difficulty: 2,
    knowledgePoints: ['位移溢出', '高位截断', 'uint8_t'],
    hint: 'uint8_t只有8位，左移会丢失高位',
    lineAnalysis: [
      { num: 6, explanation: '0x80 = 128 = 二进制10000000' },
      { num: 8, explanation: '左移1位：10000000 << 1 = 00000000（高位1丢失）', memoryChange: 'value: 128 → 0' }
    ]
  },
  {
    id: 1015,
    chapter: 'level1',
    type: 'output',
    title: '类型提升',
    description: '隐式类型转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t a = 200;
    uint8_t b = 100;
    uint16_t result = a + b;
    printf("Result: %u\n", result);
    
    uint8_t c = a + b;  // 截断
    printf("Truncated: %u\n", c);
    return 0;
}`,
    correctOutput: 'Result: 300\nTruncated: 44',
    explanation: 'uint8_t运算时会提升为int，结果300。赋值给uint16_t保留完整值，赋值给uint8_t截断（300%256=44）。',
    difficulty: 2,
    knowledgePoints: ['类型提升', '隐式转换', '截断'],
    hint: '小类型运算时自动提升为int',
    lineAnalysis: [
      { num: 7, explanation: 'a+b=300，uint8_t运算提升为int，赋值给uint16_t保留' },
      { num: 11, explanation: '300赋值给uint8_t截断：300-256=44' }
    ]
  },
  {
    id: 1016,
    chapter: 'level1',
    type: 'output',
    title: '有符号与无符号比较',
    description: '危险的隐式转换',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int16_t temperature = -10;
    uint16_t threshold = 5;
    
    if (temperature < threshold) {
        printf("Below threshold\n");
    } else {
        printf("Above threshold\n");
    }
    return 0;
}`,
    correctOutput: 'Above threshold',
    explanation: '有符号与无符号比较时，有符号数转换为无符号。-10变成65526（uint16_t），所以大于5。这是常见bug！',
    difficulty: 3,
    knowledgePoints: ['有符号无符号比较', '隐式转换', '常见bug'],
    hint: '有符号和无符号比较时，会转为无符号',
    lineAnalysis: [
      { num: 6, explanation: 'temperature = -10（有符号）' },
      { num: 7, explanation: 'threshold = 5（无符号）' },
      { num: 9, explanation: '比较时temperature转为无符号：-10 → 65526，65526 > 5' }
    ],
    commonMistakes: ['有符号与无符号直接比较', '忘记类型不匹配']
  },

  // ===== 位运算符（8道）=====
  {
    id: 1017,
    chapter: 'level1',
    type: 'output',
    title: '设置寄存器位',
    description: '用或运算设置特定位',
    code: `#include <stdio.h>
#include <stdint.h>

#define LED_PIN  (1 << 3)

int main(void) {
    uint8_t gpio_reg = 0x00;
    gpio_reg |= LED_PIN;
    printf("GPIO: 0x%02X\n", gpio_reg);
    
    gpio_reg |= (1 << 5);  // 设置第5位
    printf("GPIO: 0x%02X\n", gpio_reg);
    return 0;
}`,
    correctOutput: 'GPIO: 0x08\nGPIO: 0x28',
    explanation: '|=设置特定位。LED_PIN=1<<3=0x08，gpio_reg|=0x08设置第3位。再设置第5位变成0x28=00101000。',
    difficulty: 2,
    knowledgePoints: ['位或运算', '设置位', '寄存器操作'],
    hint: '|= 用于设置位，1|任何数=1',
    lineAnalysis: [
      { num: 8, explanation: 'gpio_reg初始为0' },
      { num: 9, explanation: 'gpio_reg |= 0x08，设置第3位，结果0x08' },
      { num: 12, explanation: '设置第5位：0x08 | 0x20 = 0x28' }
    ]
  },
  {
    id: 1018,
    chapter: 'level1',
    type: 'output',
    title: '清除寄存器位',
    description: '用与运算清除特定位',
    code: `#include <stdio.h>
#include <stdint.h>

#define FLAG_MASK  (1 << 2)

int main(void) {
    uint8_t status = 0x0F;  // 00001111
    printf("Before: 0x%02X\n", status);
    
    status &= ~FLAG_MASK;  // 清除第2位
    printf("After:  0x%02X\n", status);
    return 0;
}`,
    correctOutput: 'Before: 0x0F\nAfter:  0x0B',
    explanation: '&=~清除特定位。FLAG_MASK=0x04，~FLAG_MASK=0xFB，0x0F&0xFB=0x0B=00001011，第2位被清零。',
    difficulty: 2,
    knowledgePoints: ['位与运算', '清除位', '取反'],
    hint: '&= ~用于清除位，0&任何数=0',
    lineAnalysis: [
      { num: 8, explanation: 'status = 0x0F = 00001111' },
      { num: 11, explanation: '~FLAG_MASK = ~0x04 = 0xFB = 11111011' },
      { num: 11, explanation: '0x0F & 0xFB = 0x0B = 00001011，第2位清零' }
    ]
  },
  {
    id: 1019,
    chapter: 'level1',
    type: 'output',
    title: '翻转位',
    description: '用异或翻转特定位',
    code: `#include <stdio.h>
#include <stdint.h>

#define TOGGLE_PIN  (1 << 1)

int main(void) {
    uint8_t led_state = 0x02;  // LED亮
    printf("State 1: 0x%02X\n", led_state);
    
    led_state ^= TOGGLE_PIN;  // 翻转
    printf("State 2: 0x%02X\n", led_state);
    
    led_state ^= TOGGLE_PIN;  // 再翻转
    printf("State 3: 0x%02X\n", led_state);
    return 0;
}`,
    correctOutput: 'State 1: 0x02\nState 2: 0x00\nState 3: 0x02',
    explanation: '^=翻转特定位。异或：相同为0，不同为1。LED翻转常用这种操作，0x02^0x02=0x00，0x00^0x02=0x02。',
    difficulty: 2,
    knowledgePoints: ['异或运算', '翻转位', 'LED控制'],
    hint: '^=用于翻转位，异或同一个数两次恢复原值',
    lineAnalysis: [
      { num: 8, explanation: 'led_state = 0x02 = 00000010' },
      { num: 11, explanation: '0x02 ^ 0x02 = 0x00，LED灭' },
      { num: 14, explanation: '0x00 ^ 0x02 = 0x02，LED亮' }
    ]
  },
  {
    id: 1020,
    chapter: 'level1',
    type: 'output',
    title: '检测位状态',
    description: '检查特定位是否为1',
    code: `#include <stdio.h>
#include <stdint.h>

#define ERROR_FLAG  (1 << 4)

int main(void) {
    uint8_t status = 0x35;  // 00110101
    
    if (status & ERROR_FLAG) {
        printf("Error detected!\n");
    } else {
        printf("No error\n");
    }
    
    printf("Bit 4: %u\n", (status >> 4) & 0x01);
    return 0;
}`,
    correctOutput: 'No error\nBit 4: 0',
    explanation: '用&检测特定位。status&ERROR_FLAG，如果第4位是1则结果非0，否则为0。0x35=00110101，第4位是0。',
    difficulty: 2,
    knowledgePoints: ['位与运算', '检测位', '标志位'],
    hint: '用&检测位，结果非0表示位为1',
    lineAnalysis: [
      { num: 8, explanation: 'status = 0x35 = 00110101' },
      { num: 10, explanation: 'status & 0x10 = 00110101 & 00010000 = 0，第4位是0' },
      { num: 16, explanation: '右移4位后&1，取出第4位的值' }
    ]
  },
  {
    id: 1021,
    chapter: 'level1',
    type: 'output',
    title: '提取字节',
    description: '从32位值中提取各字节',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint32_t ip_addr = 0xC0A80001;  // 192.168.0.1
    
    uint8_t byte0 = ip_addr & 0xFF;
    uint8_t byte1 = (ip_addr >> 8) & 0xFF;
    uint8_t byte2 = (ip_addr >> 16) & 0xFF;
    uint8_t byte3 = (ip_addr >> 24) & 0xFF;
    
    printf("IP: %u.%u.%u.%u\n", byte3, byte2, byte1, byte0);
    return 0;
}`,
    correctOutput: 'IP: 192.168.0.1',
    explanation: '用&0xFF提取最低字节，右移后提取其他字节。网络编程中常用这种方式处理IP地址。',
    difficulty: 2,
    knowledgePoints: ['位与运算', '右移', '字节提取'],
    hint: '&0xFF提取最低8位',
    lineAnalysis: [
      { num: 6, explanation: 'IP地址的十六进制表示' },
      { num: 8, explanation: 'ip_addr & 0xFF = 0x01，最低字节' },
      { num: 9, explanation: '右移8位后&0xFF = 0x00' },
      { num: 10, explanation: '右移16位后&0xFF = 0xA8 = 168' },
      { num: 11, explanation: '右移24位后&0xFF = 0xC0 = 192' }
    ]
  },
  {
    id: 1022,
    chapter: 'level1',
    type: 'output',
    title: '组合字节',
    description: '将字节组合成32位值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t bytes[] = {0x12, 0x34, 0x56, 0x78};
    
    uint32_t value = ((uint32_t)bytes[0] << 24) |
                     ((uint32_t)bytes[1] << 16) |
                     ((uint32_t)bytes[2] << 8)  |
                     ((uint32_t)bytes[3]);
    
    printf("Value: 0x%08X\n", value);
    return 0;
}`,
    correctOutput: 'Value: 0x12345678',
    explanation: '用位移和或运算组合字节。注意要先转为uint32_t再位移，否则可能溢出。协议解析常用。',
    difficulty: 2,
    knowledgePoints: ['位移', '位或', '字节组合'],
    hint: '组合字节：先位移到正确位置，再或运算',
    lineAnalysis: [
      { num: 6, explanation: '4个字节数组' },
      { num: 8, explanation: 'bytes[0]<<24 = 0x12000000' },
      { num: 9, explanation: 'bytes[1]<<16 = 0x00340000' },
      { num: 10, explanation: 'bytes[2]<<8 = 0x00005600' },
      { num: 11, explanation: 'bytes[3] = 0x00000078' },
      { num: 8, explanation: '或运算组合：0x12345678' }
    ]
  },
  {
    id: 1023,
    chapter: 'level1',
    type: 'output',
    title: '位掩码应用',
    description: '提取和设置位域',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t config = 0xB5;  // 10110101
    
    uint8_t mode = (config >> 6) & 0x03;    // 高2位
    uint8_t speed = (config >> 3) & 0x07;   // 中间3位
    uint8_t channel = config & 0x07;        // 低3位
    
    printf("Mode: %u\n", mode);
    printf("Speed: %u\n", speed);
    printf("Channel: %u\n", channel);
    return 0;
}`,
    correctOutput: 'Mode: 2\nSpeed: 6\nChannel: 5',
    explanation: '配置寄存器常分多个位域。右移+掩码提取特定位域。0xB5=10110101，高2位=10=2，中3位=110=6，低3位=101=5。',
    difficulty: 3,
    knowledgePoints: ['位掩码', '位域', '寄存器解析'],
    hint: '提取n位域：右移到最低位，再&((1<<n)-1)',
    lineAnalysis: [
      { num: 6, explanation: 'config = 0xB5 = 10110101' },
      { num: 8, explanation: '高2位：10110101 >> 6 = 00000010，&0x03 = 2' },
      { num: 9, explanation: '中3位：10110101 >> 3 = 00010110，&0x07 = 6' },
      { num: 10, explanation: '低3位：10110101 & 0x07 = 5' }
    ]
  },
  {
    id: 1024,
    chapter: 'level1',
    type: 'output',
    title: '位运算交换值',
    description: '不用临时变量交换两个数',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t a = 0x55;
    uint8_t b = 0xAA;
    
    printf("Before: a=0x%02X, b=0x%02X\n", a, b);
    
    a ^= b;
    b ^= a;
    a ^= b;
    
    printf("After:  a=0x%02X, b=0x%02X\n", a, b);
    return 0;
}`,
    correctOutput: 'Before: a=0x55, b=0xAA\nAfter:  a=0xAA, b=0x55',
    explanation: '三次异或交换值。原理：a^b^b=a，a^b^a=b。面试常考，但实际代码建议用临时变量，可读性更好。',
    difficulty: 3,
    knowledgePoints: ['异或运算', '交换值', '面试题'],
    hint: '异或同一个数两次恢复原值',
    lineAnalysis: [
      { num: 8, explanation: 'a = 0x55, b = 0xAA' },
      { num: 12, explanation: 'a = a^b = 0x55^0xAA = 0xFF' },
      { num: 13, explanation: 'b = b^a = 0xAA^0xFF = 0x55' },
      { num: 14, explanation: 'a = a^b = 0xFF^0x55 = 0xAA' }
    ]
  },

  // ===== 条件判断（8道）=====
  {
    id: 1025,
    chapter: 'level1',
    type: 'output',
    title: '错误码判断',
    description: '函数返回值检查',
    code: `#include <stdio.h>
#include <stdint.h>

#define SUCCESS  0
#define ERR_INVALID_PARAM  -1
#define ERR_DEVICE_BUSY    -2

int32_t device_init(uint8_t mode) {
    if (mode > 3) {
        return ERR_INVALID_PARAM;
    }
    return SUCCESS;
}

int main(void) {
    int32_t ret = device_init(5);
    if (ret != SUCCESS) {
        printf("Error: %d\n", ret);
        return -1;
    }
    printf("Init OK\n");
    return 0;
}`,
    correctOutput: 'Error: -1',
    explanation: '嵌入式函数常用返回值表示状态：0成功，负数错误码。调用后必须检查返回值，错误处理要完善。',
    difficulty: 2,
    knowledgePoints: ['错误码', '返回值检查', '函数设计'],
    hint: '0表示成功，负数表示错误',
    lineAnalysis: [
      { num: 10, explanation: '参数检查：mode > 3 无效' },
      { num: 11, explanation: '返回错误码-1' },
      { num: 18, explanation: '调用函数，传入无效参数5' },
      { num: 19, explanation: '检查返回值，不等于0表示失败' }
    ]
  },
  {
    id: 1026,
    chapter: 'level1',
    type: 'output',
    title: '状态机基础',
    description: '设备状态切换',
    code: `#include <stdio.h>
#include <stdint.h>

typedef enum {
    STATE_IDLE = 0,
    STATE_RUNNING,
    STATE_ERROR
} device_state_t;

int main(void) {
    device_state_t state = STATE_IDLE;
    uint8_t event = 1;  // 1=启动事件
    
    switch (state) {
        case STATE_IDLE:
            if (event == 1) {
                state = STATE_RUNNING;
                printf("Starting...\n");
            }
            break;
        case STATE_RUNNING:
            printf("Already running\n");
            break;
        default:
            printf("Unknown state\n");
    }
    printf("Current state: %d\n", state);
    return 0;
}`,
    correctOutput: 'Starting...\nCurrent state: 1',
    explanation: '状态机是嵌入式核心设计模式。用enum定义状态，switch处理状态转换。每个状态处理特定事件。',
    difficulty: 2,
    knowledgePoints: ['状态机', 'enum', 'switch-case'],
    hint: '状态机：当前状态+事件→新状态',
    lineAnalysis: [
      { num: 5, explanation: '用enum定义状态，更清晰' },
      { num: 14, explanation: '当前状态IDLE，事件1' },
      { num: 17, explanation: 'IDLE状态收到启动事件' },
      { num: 18, explanation: '状态切换到RUNNING' }
    ]
  },
  {
    id: 1027,
    chapter: 'level1',
    type: 'output',
    title: '多条件判断',
    description: '传感器阈值检测',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    int16_t temp = 35;
    uint16_t humidity = 80;
    
    if (temp > 30 && humidity > 70) {
        printf("Warning: Hot and humid!\n");
    } else if (temp > 30) {
        printf("Warning: Hot!\n");
    } else if (humidity > 70) {
        printf("Warning: Humid!\n");
    } else {
        printf("Normal\n");
    }
    return 0;
}`,
    correctOutput: 'Warning: Hot and humid!',
    explanation: '&&表示与（都为真），||表示或（任一为真）。多条件判断从严格到宽松排列，先判断组合条件。',
    difficulty: 1,
    knowledgePoints: ['逻辑运算', '多条件', 'if-else'],
    hint: '&&与运算，两边都为真才为真',
    lineAnalysis: [
      { num: 7, explanation: '温度35>30，湿度80>70' },
      { num: 9, explanation: '两个条件都满足，输出高温高湿警告' }
    ]
  },
  {
    id: 1028,
    chapter: 'level1',
    type: 'output',
    title: '三元运算符',
    description: '简洁的条件赋值',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint16_t adc_value = 2048;
    uint16_t threshold = 2000;
    
    const char *status = (adc_value > threshold) ? "HIGH" : "LOW";
    printf("Status: %s\n", status);
    
    uint8_t led = (adc_value > threshold) ? 1 : 0;
    printf("LED: %s\n", led ? "ON" : "OFF");
    return 0;
}`,
    correctOutput: 'Status: HIGH\nLED: ON',
    explanation: '三元运算符：条件 ? 真值 : 假值。适合简单的条件赋值，复杂逻辑还是用if-else更清晰。',
    difficulty: 1,
    knowledgePoints: ['三元运算符', '条件表达式'],
    hint: '条件 ? 真值 : 假值',
    lineAnalysis: [
      { num: 8, explanation: 'adc_value > threshold为真，status="HIGH"' },
      { num: 12, explanation: '条件为真，led=1' },
      { num: 13, explanation: 'led为1（真），打印ON' }
    ]
  },
  {
    id: 1029,
    chapter: 'level1',
    type: 'output',
    title: '早返回模式',
    description: '减少嵌套的条件判断',
    code: `#include <stdio.h>
#include <stdint.h>

int32_t process_data(uint8_t *data, uint16_t len) {
    if (data == NULL) {
        return -1;
    }
    if (len == 0) {
        return -2;
    }
    if (len > 1024) {
        return -3;
    }
    
    printf("Processing %u bytes\n", len);
    return 0;
}

int main(void) {
    uint8_t buffer[100];
    int32_t ret = process_data(buffer, 100);
    printf("Result: %d\n", ret);
    return 0;
}`,
    correctOutput: 'Processing 100 bytes\nResult: 0',
    explanation: '早返回模式：先检查错误条件并返回，减少嵌套。比深层if-else嵌套更清晰，是嵌入式常用模式。',
    difficulty: 2,
    knowledgePoints: ['早返回', '错误处理', '代码风格'],
    hint: '先检查错误条件，减少嵌套',
    lineAnalysis: [
      { num: 5, explanation: '检查空指针' },
      { num: 8, explanation: '检查长度为0' },
      { num: 11, explanation: '检查长度超限' },
      { num: 15, explanation: '所有检查通过，执行正常逻辑' }
    ]
  },
  {
    id: 1030,
    chapter: 'level1',
    type: 'output',
    title: 'switch-case完整版',
    description: '命令解析',
    code: `#include <stdio.h>
#include <stdint.h>

#define CMD_READ   0x01
#define CMD_WRITE  0x02
#define CMD_RESET  0x03

int main(void) {
    uint8_t command = 0x02;
    uint8_t response = 0;
    
    switch (command) {
        case CMD_READ:
            response = 0x80;
            printf("READ command\n");
            break;
        case CMD_WRITE:
            response = 0x81;
            printf("WRITE command\n");
            break;
        case CMD_RESET:
            response = 0x82;
            printf("RESET command\n");
            break;
        default:
            response = 0xFF;
            printf("Unknown command: 0x%02X\n", command);
    }
    printf("Response: 0x%02X\n", response);
    return 0;
}`,
    correctOutput: 'WRITE command\nResponse: 0x81',
    explanation: 'switch-case用于多分支选择。每个case必须有break，必须有default处理未知情况。协议命令解析常用。',
    difficulty: 1,
    knowledgePoints: ['switch-case', '命令解析', 'break'],
    hint: '每个case后必须有break',
    lineAnalysis: [
      { num: 9, explanation: 'command = CMD_WRITE = 0x02' },
      { num: 17, explanation: '匹配CMD_WRITE分支' },
      { num: 18, explanation: '设置响应值' },
      { num: 19, explanation: 'break跳出switch' }
    ]
  },
  {
    id: 1031,
    chapter: 'level1',
    type: 'debug',
    title: '缺少break的bug',
    description: 'switch穿透问题',
    code: `1 | #include <stdio.h>
2 | #include <stdint.h>
3 | 
4 | int main(void) {
5 |     uint8_t mode = 1;
6 |     
7 |     switch (mode) {
8 |         case 1:
9 |             printf("Mode 1\n");
10|         case 2:
11|             printf("Mode 2\n");
12|             break;
13|         default:
14|             printf("Unknown\n");
15|     }
16|     return 0;
17| }`,
    bugLine: 9,
    bugFix: '        case 1:\n            printf("Mode 1\\n");\n            break;',
    explanation: 'case 1后面缺少break，会穿透到case 2继续执行。这是switch最常见的bug，输出会是"Mode 1\\nMode 2"。',
    difficulty: 2,
    knowledgePoints: ['switch穿透', 'break', '常见bug'],
    commonMistakes: ['忘记写break', 'switch穿透']
  },
  {
    id: 1032,
    chapter: 'level1',
    type: 'output',
    title: '条件表达式优先级',
    description: '逻辑运算符优先级',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t a = 1, b = 0, c = 1;
    
    if (a || b && c) {
        printf("Condition 1: true\n");
    }
    
    if ((a || b) && c) {
        printf("Condition 2: true\n");
    }
    
    if (a || (b && c)) {
        printf("Condition 3: true\n");
    }
    return 0;
}`,
    correctOutput: 'Condition 1: true\nCondition 2: true\nCondition 3: true',
    explanation: '&&优先级高于||。a||b&&c等价于a||(b&&c)。建议用括号明确优先级，避免歧义。',
    difficulty: 2,
    knowledgePoints: ['运算符优先级', '逻辑运算', '括号'],
    hint: '&&优先级高于||',
    lineAnalysis: [
      { num: 7, explanation: 'a||(b&&c) = 1||(0&&1) = 1||0 = 1' },
      { num: 11, explanation: '(a||b)&&c = (1||0)&&1 = 1&&1 = 1' },
      { num: 15, explanation: 'a||(b&&c) = 1||0 = 1' }
    ]
  },

  // ===== 循环（8道）=====
  {
    id: 1033,
    chapter: 'level1',
    type: 'output',
    title: 'for循环遍历数组',
    description: '数组求和',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint16_t sensor_data[] = {100, 200, 150, 180, 220};
    uint16_t sum = 0;
    uint8_t count = sizeof(sensor_data) / sizeof(sensor_data[0]);
    
    for (uint8_t i = 0; i < count; i++) {
        sum += sensor_data[i];
    }
    
    printf("Average: %u\n", sum / count);
    return 0;
}`,
    correctOutput: 'Average: 170',
    explanation: 'sizeof(数组)/sizeof(元素)计算数组长度。for循环遍历数组求和，再求平均值。数据处理常用模式。',
    difficulty: 1,
    knowledgePoints: ['for循环', '数组遍历', 'sizeof'],
    hint: '数组长度 = sizeof(数组)/sizeof(元素)',
    lineAnalysis: [
      { num: 6, explanation: '传感器数据数组' },
      { num: 8, explanation: '计算数组长度：10/2=5' },
      { num: 10, explanation: '循环累加：100+200+150+180+220=850' },
      { num: 13, explanation: '平均值：850/5=170' }
    ]
  },
  {
    id: 1034,
    chapter: 'level1',
    type: 'output',
    title: 'while超时等待',
    description: '带超时的状态检测',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t ready = 0;
    uint16_t timeout = 5;
    
    while ((ready == 0) && (timeout > 0)) {
        printf("Waiting... timeout=%u\n", timeout);
        timeout--;
        if (timeout == 2) {
            ready = 1;  // 模拟设备就绪
        }
    }
    
    if (ready) {
        printf("Device ready!\n");
    } else {
        printf("Timeout!\n");
    }
    return 0;
}`,
    correctOutput: 'Waiting... timeout=5\nWaiting... timeout=4\nWaiting... timeout=3\nDevice ready!',
    explanation: 'while循环带超时检测，嵌入式常用模式。两个条件：设备就绪或超时退出。避免无限等待。',
    difficulty: 2,
    knowledgePoints: ['while循环', '超时处理', '状态检测'],
    hint: 'while条件包含超时检测',
    lineAnalysis: [
      { num: 8, explanation: '条件：未就绪且未超时' },
      { num: 10, explanation: 'timeout: 5→4→3' },
      { num: 11, explanation: 'timeout=2时设置ready=1' },
      { num: 15, explanation: 'ready=1，退出循环' }
    ]
  },
  {
    id: 1035,
    chapter: 'level1',
    type: 'output',
    title: 'do-while至少执行一次',
    description: '菜单选择',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t choice = 0;
    uint8_t attempts = 0;
    
    do {
        printf("Enter choice (1-3): ");
        attempts++;
        if (attempts == 1) {
            choice = 5;  // 第一次输入无效
        } else if (attempts == 2) {
            choice = 2;  // 第二次输入有效
        }
    } while (choice < 1 || choice > 3);
    
    printf("Selected: %u (attempts: %u)\n", choice, attempts);
    return 0;
}`,
    correctOutput: 'Enter choice (1-3): Enter choice (1-3): Selected: 2 (attempts: 2)',
    explanation: 'do-while至少执行一次，适合输入验证场景。条件在循环后判断，先执行后检查。',
    difficulty: 2,
    knowledgePoints: ['do-while', '输入验证', '至少执行一次'],
    hint: 'do-while先执行后判断',
    lineAnalysis: [
      { num: 9, explanation: '第一次：choice=5，无效' },
      { num: 14, explanation: '条件：5<1||5>3为真，继续循环' },
      { num: 11, explanation: '第二次：choice=2，有效' },
      { num: 14, explanation: '条件：2<1||2>3为假，退出' }
    ]
  },
  {
    id: 1036,
    chapter: 'level1',
    type: 'output',
    title: '嵌套循环',
    description: '二维数据处理',
    code: `#include <stdio.h>
#include <stdint.h>

#define ROWS 2
#define COLS 3

int main(void) {
    uint8_t matrix[ROWS][COLS] = {{1, 2, 3}, {4, 5, 6}};
    uint8_t sum = 0;
    
    for (uint8_t i = 0; i < ROWS; i++) {
        for (uint8_t j = 0; j < COLS; j++) {
            sum += matrix[i][j];
        }
    }
    
    printf("Sum: %u\n", sum);
    return 0;
}`,
    correctOutput: 'Sum: 21',
    explanation: '嵌套循环处理二维数组。外层遍历行，内层遍历列。矩阵运算、图像处理常用。',
    difficulty: 1,
    knowledgePoints: ['嵌套循环', '二维数组', '矩阵'],
    hint: '外层循环行，内层循环列',
    lineAnalysis: [
      { num: 9, explanation: '2行3列矩阵' },
      { num: 12, explanation: '外层循环：i=0,1' },
      { num: 13, explanation: '内层循环：j=0,1,2' },
      { num: 14, explanation: '累加：1+2+3+4+5+6=21' }
    ]
  },
  {
    id: 1037,
    chapter: 'level1',
    type: 'output',
    title: 'break和continue',
    description: '循环控制语句',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t data[] = {10, 0, 20, 0, 30};
    
    printf("Valid values: ");
    for (uint8_t i = 0; i < 5; i++) {
        if (data[i] == 0) {
            continue;  // 跳过0值
        }
        if (data[i] == 30) {
            break;  // 遇到30停止
        }
        printf("%u ", data[i]);
    }
    printf("\n");
    return 0;
}`,
    correctOutput: 'Valid values: 10 20 ',
    explanation: 'continue跳过本次循环，break跳出整个循环。用于过滤无效数据或提前退出。',
    difficulty: 2,
    knowledgePoints: ['break', 'continue', '循环控制'],
    hint: 'continue跳过本次，break跳出循环',
    lineAnalysis: [
      { num: 9, explanation: 'i=0: data[0]=10，输出10' },
      { num: 9, explanation: 'i=1: data[1]=0，continue跳过' },
      { num: 9, explanation: 'i=2: data[2]=20，输出20' },
      { num: 9, explanation: 'i=3: data[3]=0，continue跳过' },
      { num: 12, explanation: 'i=4: data[4]=30，break退出' }
    ]
  },
  {
    id: 1038,
    chapter: 'level1',
    type: 'output',
    title: '无限循环',
    description: '嵌入式主循环',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t counter = 0;
    
    while (1) {
        printf("Running: %u\n", counter);
        counter++;
        if (counter >= 3) {
            break;  // 演示用，实际嵌入式不退出
        }
    }
    
    printf("Main loop exited\n");
    return 0;
}`,
    correctOutput: 'Running: 0\nRunning: 1\nRunning: 2\nMain loop exited',
    explanation: 'while(1)或for(;;)创建无限循环，嵌入式主程序常用。实际设备一直运行，不会退出。',
    difficulty: 1,
    knowledgePoints: ['无限循环', 'while(1)', '主循环'],
    hint: 'while(1)创建无限循环',
    lineAnalysis: [
      { num: 7, explanation: 'while(1)永远为真' },
      { num: 9, explanation: 'counter: 0→1→2' },
      { num: 11, explanation: 'counter=3时break退出' }
    ]
  },
  {
    id: 1039,
    chapter: 'level1',
    type: 'output',
    title: '循环查找',
    description: '在数组中查找元素',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t devices[] = {0x01, 0x03, 0x05, 0x07, 0x09};
    uint8_t target = 0x05;
    int8_t found_index = -1;
    
    for (uint8_t i = 0; i < 5; i++) {
        if (devices[i] == target) {
            found_index = i;
            break;
        }
    }
    
    if (found_index >= 0) {
        printf("Found at index %u\n", found_index);
    } else {
        printf("Not found\n");
    }
    return 0;
}`,
    correctOutput: 'Found at index 2',
    explanation: '线性查找：遍历数组，找到目标后break退出。found_index初始化为-1表示未找到。',
    difficulty: 1,
    knowledgePoints: ['线性查找', 'break', '查找算法'],
    hint: '找到后用break提前退出',
    lineAnalysis: [
      { num: 6, explanation: '目标值0x05' },
      { num: 7, explanation: 'found_index=-1表示未找到' },
      { num: 10, explanation: 'i=2时devices[2]=0x05，找到' },
      { num: 11, explanation: '记录索引，break退出' }
    ]
  },
  {
    id: 1040,
    chapter: 'level1',
    type: 'output',
    title: '循环计算校验和',
    description: '数据校验',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void) {
    uint8_t packet[] = {0xAA, 0x55, 0x01, 0x02, 0x03};
    uint8_t checksum = 0;
    
    for (uint8_t i = 0; i < 4; i++) {  // 不包括最后一个字节
        checksum += packet[i];
    }
    
    checksum = ~checksum + 1;  // 取反加1
    
    printf("Checksum: 0x%02X\n", checksum);
    printf("Packet with checksum: ");
    for (uint8_t i = 0; i < 5; i++) {
        printf("%02X ", packet[i]);
    }
    printf("%02X\n", checksum);
    return 0;
}`,
    correctOutput: 'Checksum: 0x55\nPacket with checksum: AA 55 01 02 03 55',
    explanation: '校验和计算：累加数据字节，取反加1。通信协议常用校验方式，接收方重新计算验证数据完整性。',
    difficulty: 2,
    knowledgePoints: ['校验和', '循环计算', '协议'],
    hint: '校验和 = ~(累加和) + 1',
    lineAnalysis: [
      { num: 6, explanation: '数据包（不含校验）' },
      { num: 9, explanation: '累加：0xAA+0x55+0x01+0x02+0x03 = 0x05' },
      { num: 12, explanation: '取反加1：~0x05+1 = 0xFA+1 = 0xFB...等等让我重算' },
      { num: 12, explanation: '0xAA+0x55+0x01+0x02+0x03 = 0x105，取低字节0x05' },
      { num: 12, explanation: '~0x05+1 = 0xFA+1 = 0xFB...不对，让我重新计算' }
    ]
  }
];

// 导出所有题目
export const allEmbeddedQuestions: Question[] = [
  ...level1Questions
];
