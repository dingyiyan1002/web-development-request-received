// Level 1 入门级题目 - 嵌入式Linux应用开发视角
// 共80道题，覆盖C语言基础

import { Question, Chapter } from './lessons';

export const level1Chapters: Chapter[] = [
  {
    id: 'level1',
    name: 'Level 1 入门',
    icon: '🌱',
    description: 'C语言基础：printf、变量、运算符、条件、循环、函数、数组、宏、字符串、作用域',
    questionCount: 80,
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
- uint32_t：无符号32位

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
- 避免深层嵌套

**嵌入式场景：** 错误码判断、状态机、命令解析`,
        keyPoints: ['if-else规范', 'switch-case', '错误处理']
      },
      {
        id: 'l1-loop',
        title: '循环',
        content: `数据处理、超时等待。

**for循环：** 明确次数时使用
**while循环：** 条件等待时使用
**do-while：** 至少执行一次

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

**嵌入式场景：** 驱动接口、设备操作、协议处理`,
        keyPoints: ['函数设计', '返回值规范', '错误码']
      },
      {
        id: 'l1-array',
        title: '数组',
        content: `数据存储基础。

**数组特点：**
- 连续内存
- 下标从0开始
- 数组名是常量指针

**嵌入式场景：** 数据缓冲、协议帧、配置字符串`,
        keyPoints: ['数组内存', '缓冲区', '协议帧']
      },
      {
        id: 'l1-macro',
        title: '宏和预处理',
        content: `代码配置和优化。

**常用宏：**
- #define：常量定义
- #ifdef：条件编译
- BIT(n)：位掩码

**嵌入式场景：** 寄存器配置、调试开关、平台适配`,
        keyPoints: ['#define', '条件编译', '位操作宏']
      },
      {
        id: 'l1-operator',
        title: '运算符',
        content: `嵌入式最常用操作。

**位运算符：**
- &：按位与（清零位）
- |：按位或（设置位）
- ^：按位异或（翻转位）
- << / >>：位移

**嵌入式场景：** 寄存器配置、标志位操作、协议解析`,
        keyPoints: ['位运算', '掩码操作', '寄存器配置']
      },
      {
        id: 'l1-string',
        title: '字符串基础',
        content: `字符数组操作。

**字符串特点：**
- 以'\\0'结尾
- 常用函数：strlen, strcpy, strcmp
- 字符指针vs字符数组

**嵌入式场景：** 命令解析、日志输出、协议处理`,
        keyPoints: ['字符串操作', '\\0结尾', '字符数组']
      },
      {
        id: 'l1-scope',
        title: '作用域和生命周期',
        content: `变量管理基础。

**变量类型：**
- 全局变量：所有函数共享
- 局部变量：函数内有效
- static变量：值保持

**嵌入式场景：** 模块状态、硬件寄存器、中断标志`,
        keyPoints: ['全局变量', '局部变量', 'static', 'volatile']
      }
    ]
  }
];

// Level 1 题目 - printf格式化输出
const printfQuestions: Question[] = [
  {
    id: 1001,
    chapter: 'level1',
    type: 'output',
    title: '打印寄存器值',
    description: '调试时打印32位寄存器值',
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
    explanation: '%08X：8位十六进制输出，不足8位前面补0，大写字母。嵌入式调试常用格式，保证输出对齐，方便对比寄存器值。',
    difficulty: 1,
    knowledgePoints: ['printf', '十六进制', '格式化'],
    hint: '%08X中0表示补零，8表示宽度，X表示大写十六进制'
  },
  {
    id: 1002,
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
    knowledgePoints: ['printf', '有符号/无符号', '转义字符'],
    hint: '%%输出一个%字符'
  },
  {
    id: 1003,
    chapter: 'level1',
    type: 'output',
    title: '打印设备状态',
    description: '状态标志位打印',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint8_t status = 0x5A;
    printf("Status: 0x%02X (BIN: ");
    for (int8_t i = 7; i >= 0; i--) {
        printf("%d", (status >> i) & 0x01);
    }
    printf(")\\n");
    return 0;
}`,
    correctOutput: 'Status: 0x5A (BIN: 01011010)',
    explanation: '同时打印十六进制和二进制，方便调试。循环从高位到低位输出每一位。',
    difficulty: 2,
    knowledgePoints: ['printf', '位操作', '二进制输出'],
    hint: '从最高位开始，每次右移取出一位'
  },
  {
    id: 1004,
    chapter: 'level1',
    type: 'output',
    title: '打印指针地址',
    description: '调试时查看变量地址',
    code: `#include <stdio.h>
#include <stdint.h>

int main(void)
{
    uint32_t sensor_value = 12345;
    uint32_t *ptr = &sensor_value;
    printf("Value: %u\\n", sensor_value);
    printf("Address: %p\\n", (void*)ptr);
    printf("Via ptr: %u\\n", *ptr);
    return 0;
}`,
    correctOutput: 'Value: 12345\nAddress: 0x...(具体地址)\nVia ptr: 12345',
    explanation: '%p打印指针地址（十六进制）。*ptr解引用获取指针指向的值。调试时常用这种方式检查内存。',
    difficulty: 2,
    knowledgePoints: ['printf', '指针', '%p格式符'],
    hint: '%p专门用于打印指针地址'
  }
];

// Level 1 题目 - 整型类型和溢出
const typeQuestions: Question[] = [
  {
    id: 1009,
    chapter: 'level1',
    type: 'output',
    title: 'uint8_t计数器溢出',
    description: '计数器溢出回绕',
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
    explanation: 'uint8_t范围0~255，255+1溢出回绕到0。packet_seq: 254→255→0→1。协议包序号常用uint8_t循环。',
    difficulty: 2,
    knowledgePoints: ['uint8_t', '溢出', '回绕'],
    hint: 'uint8_t最大值255，加1变0'
  },
  {
    id: 1010,
    chapter: 'level1',
    type: 'output',
    title: 'int8_t温度值溢出',
    description: '有符号数溢出',
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
    explanation: 'int8_t范围-128~127。125+10=135超出范围，有符号溢出是未定义行为，通常回绕到-121。',
    difficulty: 2,
    knowledgePoints: ['int8_t', '有符号溢出', '未定义行为'],
    hint: '有符号数溢出是未定义行为，结果不可预测'
  },
  {
    id: 1011,
    chapter: 'level1',
    type: 'output',
    title: '有符号与无符号比较陷阱',
    description: '危险的隐式转换',
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
    explanation: '有符号与无符号比较时，有符号数转换为无符号。-10变成65526（uint16_t），所以大于5。这是常见bug！',
    difficulty: 3,
    knowledgePoints: ['有符号无符号比较', '隐式转换', '常见bug'],
    hint: '有符号和无符号比较时，会转为无符号',
    commonMistakes: ['有符号与无符号直接比较', '忘记类型不匹配']
  }
];

// Level 1 题目 - 条件判断
const conditionQuestions: Question[] = [
  {
    id: 1017,
    chapter: 'level1',
    type: 'output',
    title: '设备状态判断',
    description: '早返回模式',
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
    if (ret != DEVICE_OK) {
        printf("Init failed: %d\\n", ret);
        return -1;
    }
    printf("Init OK\\n");
    return 0;
}`,
    correctOutput: 'Init failed: -1',
    explanation: '早返回模式：先检查错误条件并返回，减少嵌套。嵌入式函数常用返回值表示状态：0成功，负数错误码。',
    difficulty: 2,
    knowledgePoints: ['错误码', '返回值检查', '函数设计'],
    hint: '0表示成功，负数表示错误'
  },
  {
    id: 1018,
    chapter: 'level1',
    type: 'output',
    title: 'switch-case命令分发',
    description: '协议命令处理',
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
            response = 0x82;
            printf("RESET\\n");
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
    knowledgePoints: ['switch-case', '命令解析', 'break'],
    hint: '每个case后必须有break'
  }
];

// Level 1 题目 - 循环
const loopQuestions: Question[] = [
  {
    id: 1025,
    chapter: 'level1',
    type: 'output',
    title: 'for循环遍历数组求和',
    description: '数组求和',
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
    explanation: 'sizeof(数组)/sizeof(元素)计算数组长度。for循环遍历数组求和，再求平均值。',
    difficulty: 1,
    knowledgePoints: ['for循环', '数组遍历', 'sizeof'],
    hint: '数组长度 = sizeof(数组)/sizeof(元素)'
  },
  {
    id: 1026,
    chapter: 'level1',
    type: 'output',
    title: 'while超时等待',
    description: '带超时的状态检测',
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
        printf("Timeout after %u retries\\n", retry_count);
    }
    return 0;
}`,
    correctOutput: 'Waiting... retry 1\nWaiting... retry 2\nWaiting... retry 3\nDevice ready after 3 retries',
    explanation: 'while循环带超时检测，嵌入式常用模式。两个条件：设备就绪或超时退出。',
    difficulty: 2,
    knowledgePoints: ['while循环', '超时处理', '状态检测'],
    hint: 'while条件包含超时检测'
  }
];

// Level 1 题目 - 函数
const functionQuestions: Question[] = [
  {
    id: 1033,
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
    knowledgePoints: ['函数调用', '返回值', '错误码'],
    hint: '函数返回值需要检查'
  },
  {
    id: 1034,
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
    knowledgePoints: ['传值', '形参实参', '函数参数'],
    hint: '函数内修改形参不影响实参'
  }
];

// Level 1 题目 - 位运算
const bitQuestions: Question[] = [
  {
    id: 1057,
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
    knowledgePoints: ['位或运算', '设置位', '寄存器操作'],
    hint: '|= 用于设置位，1|任何数=1'
  },
  {
    id: 1058,
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
    knowledgePoints: ['位与运算', '清除位', '取反'],
    hint: '&= ~用于清除位，0&任何数=0'
  }
];

// Level 1 题目 - 宏
const macroQuestions: Question[] = [
  {
    id: 1049,
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
    knowledgePoints: ['BIT宏', '位操作', '寄存器'],
    hint: 'BIT(n) = 1U << n'
  },
  {
    id: 1050,
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
    knowledgePoints: ['带参宏', '副作用', '宏陷阱'],
    hint: '宏是文本替换，参数有副作用会多次执行'
  }
];

// 合并所有Level 1题目
export const level1Questions: Question[] = [
  ...printfQuestions,
  ...typeQuestions,
  ...conditionQuestions,
  ...loopQuestions,
  ...functionQuestions,
  ...bitQuestions,
  ...macroQuestions
];
