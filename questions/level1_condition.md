# Level 1 - 条件判断（8道题）

---

## 题号：017

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：设备状态判断
- **知识标签**：if-else、状态判断、早返回
- **嵌入式场景**：设备初始化状态检查，错误处理
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DEVICE_OK       0
 5 | #define DEVICE_ERROR   -1
 6 | #define DEVICE_BUSY    -2
 7 |
 8 | int32_t device_init(uint8_t mode)
 9 | {
10 |     if (mode > 3) {
11 |         return DEVICE_ERROR;
12 |     }
13 |     if (mode == 0) {
14 |         return DEVICE_BUSY;
15 |     }
16 |     return DEVICE_OK;
17 | }
18 |
19 | int main(void)
20 | {
21 |     int32_t ret = device_init(5);
22 |     if (ret != DEVICE_OK) {
23 |         printf("Init failed: %d\n", ret);
24 |         return -1;
25 |     }
26 |     printf("Init OK\n");
27 |     return 0;
28 | }
```

### 提示
早返回模式：先检查错误条件并返回，减少嵌套。

### 内存图
```
函数调用流程:
  main() → device_init(5)
  
  device_init内部:
    mode = 5
    mode > 3 ? → true
    return DEVICE_ERROR (-1)
    
  main继续:
    ret = -1
    ret != DEVICE_OK ? → true
    打印 "Init failed: -1"
```

### 逐行解析
- 第4-6行：宏定义状态码，清晰易读
- 第8行：函数返回int32_t，可返回负数错误码
- 🔥 第10-12行：早返回模式，先检查错误条件
- 第13-15行：检查第二个错误条件
- 第16行：所有检查通过，返回成功
- 第21行：调用device_init(5)，mode=5>3
- 第22行：ret=-1，不等于DEVICE_OK
- 第23行：打印错误信息

### 嵌入式Linux实战说明
**工作场景**：设备驱动初始化函数的标准写法。先检查参数有效性，再执行初始化，最后返回状态。

**早返回优点**：
- 减少嵌套层级
- 错误处理集中
- 代码更清晰

**面试问法**：为什么要用早返回模式？有什么好处？

### 易错点+变体题
**易错点**：
- 嵌套太深难以阅读
- 忘记return导致继续执行
- 错误码定义混乱

**变体题**：把device_init(5)改成device_init(2)，输出是什么？

---

## 题号：018

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：switch-case命令分发
- **知识标签**：switch-case、命令解析、break
- **嵌入式场景**：协议命令处理，设备控制指令
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define CMD_READ   0x01
 5 | #define CMD_WRITE  0x02
 6 | #define CMD_RESET  0x03
 7 |
 8 | int main(void)
 9 | {
10 |     uint8_t command = CMD_WRITE;
11 |     uint8_t response = 0;
12 |
13 |     switch (command) {
14 |         case CMD_READ:
15 |             response = 0x80;
16 |             printf("READ\n");
17 |             break;
18 |         case CMD_WRITE:
19 |             response = 0x81;
20 |             printf("WRITE\n");
21 |             break;
22 |         case CMD_RESET:
23 |             response = 0x82;
24 |             printf("RESET\n");
25 |             break;
26 |         default:
27 |             response = 0xFF;
28 |             printf("UNKNOWN\n");
29 |     }
30 |     printf("Response: 0x%02X\n", response);
31 |     return 0;
32 | }
```

### 提示
switch-case匹配后，遇到break才退出。每个case必须有break！

### 内存图
```
switch执行流程:
  command = CMD_WRITE = 0x02
  
  匹配 case CMD_WRITE:
    response = 0x81
    printf("WRITE")
    break → 跳出switch
    
  继续执行:
    printf("Response: 0x81")
```

### 逐行解析
- 第4-6行：宏定义命令码，清晰易维护
- 第10行：当前命令是CMD_WRITE
- 🔥 第13行：switch根据command值跳转
- 第14-17行：CMD_READ分支，有break
- 🔥 第18-21行：匹配此分支，执行后break跳出
- 第22-25行：CMD_RESET分支
- 🔥 第26-28行：default处理未知命令，必须有
- 第30行：打印响应值0x81

### 嵌入式Linux实战说明
**工作场景**：协议解析、命令处理的标配写法。每个case处理一种命令，default处理异常情况。

**switch-case规范**：
- 每个case必须有break
- 必须有default分支
- case值用宏定义，不用魔数

**面试问法**：如果忘记写break会怎样？

### 易错点+变体题
**易错点**：
- 忘记break导致穿透
- 没有default分支
- case值重复

**变体题**：把第20行的break删掉，输出是什么？

---

## 题号：019

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：短路求值
- **知识标签**：&&、||、短路求值
- **嵌入式场景**：多条件判断，安全检查
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint8_t sensor_valid = 1;
 7 |     int16_t sensor_value = -10;
 8 |     uint8_t data_ready = 0;
 9 |
10 |     if (sensor_valid && sensor_value > 0) {
11 |         printf("Valid positive\n");
12 |     } else {
13 |         printf("Invalid or non-positive\n");
14 |     }
15 |
16 |     if (data_ready || sensor_valid) {
17 |         printf("Data available\n");
18 |     } else {
19 |         printf("No data\n");
20 |     }
21 |
22 |     return 0;
23 | }
```

### 提示
&&遇到假就停止，||遇到真就停止，后面的表达式不再执行。

### 内存图
```
短路求值过程:
  
  第一个if:
    sensor_valid = 1 (真)
    继续判断 sensor_value > 0
    sensor_value = -10
    -10 > 0 ? → false
    1 && 0 → false
    进入else分支
  
  第二个if:
    data_ready = 0 (假)
    继续判断 sensor_valid
    sensor_valid = 1 (真)
    0 || 1 → true
    进入if分支
```

### 逐行解析
- 第6行：传感器有效标志
- 第7行：传感器值（可能为负）
- 第8行：数据就绪标志
- 🔥 第10行：&&短路，sensor_valid为真才判断第二个条件
- 第10行：sensor_value=-10，不大于0，整体为假
- 第13行：打印"Invalid or non-positive"
- 🔥 第16行：||短路，data_ready为假才判断第二个条件
- 第16行：sensor_valid为真，整体为真
- 第17行：打印"Data available"

### 嵌入式Linux实战说明
**工作场景**：检查指针非空后再解引用，检查设备就绪后再读取。短路求值避免无效操作。

**短路求值应用**：
```c
if (ptr != NULL && *ptr > 0) { ... }  // 安全
if (data_ready && read_data() > 0) { ... }  // 避免无效读取
```

**面试问法**：什么是短路求值？有什么实际用途？

### 易错点+变体题
**易错点**：
- 以为所有条件都会判断
- 在短路表达式中放有副作用的操作
- 混淆&&和||的短路条件

**变体题**：把sensor_value改成10，第一个if输出什么？

---

## 题号：020

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：三元运算符
- **知识标签**：三元运算符、条件表达式
- **嵌入式场景**：简洁的状态判断，LED控制
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define LED_ON   1
 5 | #define LED_OFF  0
 6 |
 7 | int main(void)
 8 | {
 9 |     uint16_t adc_value = 2048;
10 |     uint16_t threshold = 2000;
11 |     uint8_t led_state = 0;
12 |
13 |     led_state = (adc_value > threshold) ? LED_ON : LED_OFF;
14 |     printf("LED: %s\n", led_state ? "ON" : "OFF");
15 |
16 |     adc_value = 1500;
17 |     led_state = (adc_value > threshold) ? LED_ON : LED_OFF;
18 |     printf("LED: %s\n", led_state ? "ON" : "OFF");
19 |
20 |     return 0;
21 | }
```

### 提示
条件 ? 真值 : 假值，简洁的条件赋值。

### 内存图
```
三元运算符执行:
  
  第一次:
    adc_value = 2048, threshold = 2000
    2048 > 2000 ? → true
    led_state = LED_ON = 1
    led_state ? → true
    打印 "LED: ON"
  
  第二次:
    adc_value = 1500, threshold = 2000
    1500 > 2000 ? → false
    led_state = LED_OFF = 0
    led_state ? → false
    打印 "LED: OFF"
```

### 逐行解析
- 第4-5行：宏定义LED状态
- 第9行：ADC采样值
- 第10行：阈值
- 🔥 第13行：三元运算符，条件为真取LED_ON
- 第14行：三元运算符嵌套在printf中
- 第16行：改变ADC值
- 第17行：条件为假，取LED_OFF
- 第18行：打印OFF

### 嵌入式Linux实战说明
**工作场景**：简单的状态判断、LED控制、阈值检测。比if-else更简洁，但复杂逻辑不要用。

**适用场景**：
- 简单的二选一
- printf中的条件输出
- 初始化时的条件赋值

**不适用场景**：
- 复杂的多层嵌套
- 有副作用的表达式
- 需要执行多条语句

**面试问法**：三元运算符和if-else有什么区别？

### 易错点+变体题
**易错点**：
- 嵌套太多难以阅读
- 在三元表达式中放复杂操作
- 优先级问题

**变体题**：把threshold改成2048，两次输出分别是什么？

---

## 题号：021

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：赋值与比较陷阱
- **知识标签**：=和==、赋值表达式、常见bug
- **嵌入式场景**：条件判断中的经典错误
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MODE_A  1
 5 | #define MODE_B  2
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t mode = MODE_A;
10 |     uint8_t status = 0;
11 |
12 |     if (mode = MODE_B) {
13 |         status = 1;
14 |         printf("Mode B\n");
15 |     } else {
16 |         status = 0;
17 |         printf("Mode A\n");
18 |     }
19 |
20 |     printf("mode=%u, status=%u\n", mode, status);
21 |     return 0;
22 | }
```

### 提示
仔细看第12行，是=还是==？这是经典bug！

### 内存图
```
陷阱分析:
  
  if (mode = MODE_B)
      ↑
      这是赋值，不是比较！
  
  执行过程:
    mode = MODE_B  → mode变成2
    赋值表达式的值 = 2 (非零为真)
    if (2) → true
    进入if分支
  
  结果:
    mode = 2 (被修改了！)
    status = 1
    打印 "Mode B" (错误！)
```

### 逐行解析
- 第9行：mode初始值为MODE_A=1
- 🔥 第12行：**陷阱！** 这是赋值，不是比较
- 第12行：mode被赋值为MODE_B=2
- 第12行：赋值表达式值为2，非零为真
- 第13行：status=1
- 第14行：打印"Mode B"（但原本mode是MODE_A！）
- 第20行：确认mode被改成了2

### 嵌入式Linux实战说明
**工作场景**：这是C语言最常见的bug之一！编译器通常会警告，但不要忽略。

**正确写法**：
```c
if (mode == MODE_B) { ... }  // 比较
if (MODE_B == mode) { ... }  // 更安全，写错会编译报错
```

**防御性编程**：
```c
if (MODE_B == mode) { ... }  // 常量在前，写=会报错
```

**面试问法**：这段代码有什么问题？如何避免？

### 易错点+变体题
**易错点**：
- =和==混淆
- 忽略编译器警告
- 条件中修改变量

**变体题**：把第12行改成`if (mode == MODE_B)`，输出是什么？

---

## 题号：022

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：多条件阈值判断
- **知识标签**：if-else if-else、多条件、阈值
- **嵌入式场景**：传感器报警阈值，多级告警
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define TEMP_LOW      10
 5 | #define TEMP_NORMAL   25
 6 | #define TEMP_HIGH     35
 7 |
 8 | int main(void)
 9 | {
10 |     int16_t temperature = 38;
11 |     uint8_t alarm_level = 0;
12 |
13 |     if (temperature < TEMP_LOW) {
14 |         alarm_level = 1;
15 |         printf("Low temp warning\n");
16 |     } else if (temperature < TEMP_NORMAL) {
17 |         alarm_level = 2;
18 |         printf("Normal\n");
19 |     } else if (temperature < TEMP_HIGH) {
20 |         alarm_level = 3;
21 |         printf("Warm\n");
22 |     } else {
23 |         alarm_level = 4;
24 |         printf("High temp alarm!\n");
25 |     }
26 |
27 |     printf("Alarm level: %u\n", alarm_level);
28 |     return 0;
29 | }
```

### 提示
if-else if是互斥的，只会执行第一个匹配的分支。

### 内存图
```
条件判断流程:
  temperature = 38
  
  temperature < 10 ?  → false
  temperature < 25 ?  → false
  temperature < 35 ?  → false
  else → 执行
  
  alarm_level = 4
  打印 "High temp alarm!"
```

### 逐行解析
- 第4-6行：宏定义温度阈值
- 第10行：当前温度38度
- 第13-15行：低于10度，低温警告
- 第16-18行：10-25度，正常
- 第19-21行：25-35度，温暖
- 🔥 第22-25行：35度以上，高温报警
- 第10行：38度，所有条件都不满足
- 第23行：alarm_level=4
- 第24行：打印高温报警

### 嵌入式Linux实战说明
**工作场景**：设备温度监控、电池电量显示、信号强度指示。多级阈值判断是常见需求。

**条件顺序很重要**：
- 从严格到宽松排列
- 或者按范围顺序排列
- else if是互斥的

**面试问法**：如果temperature=20，输出是什么？

### 易错点+变体题
**易错点**：
- 条件顺序错误
- 范围重叠或遗漏
- 忘记else分支

**变体题**：把temperature改成30，输出是什么？

---

## 题号：023

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：状态机基础
- **知识标签**：switch-case、状态机、enum
- **嵌入式场景**：设备状态管理，协议状态转换
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | typedef enum {
 5 |     STATE_IDLE = 0,
 6 |     STATE_CONNECTING,
 7 |     STATE_CONNECTED,
 8 |     STATE_ERROR
 9 | } device_state_t;
10 |
11 | int main(void)
12 | {
13 |     device_state_t state = STATE_IDLE;
14 |     uint8_t event = 1;
15 |
16 |     switch (state) {
17 |         case STATE_IDLE:
18 |             if (event == 1) {
19 |                 state = STATE_CONNECTING;
20 |                 printf("Connecting...\n");
21 |             }
22 |             break;
23 |         case STATE_CONNECTING:
24 |             printf("Already connecting\n");
25 |             break;
26 |         default:
27 |             printf("Unknown state\n");
28 |     }
29 |
30 |     printf("Current state: %d\n", state);
31 |     return 0;
32 | }
```

### 提示
状态机：当前状态 + 事件 → 新状态。enum让状态更清晰。

### 内存图
```
状态机执行:
  state = STATE_IDLE = 0
  event = 1
  
  switch(STATE_IDLE):
    case STATE_IDLE:
      event == 1 ? → true
      state = STATE_CONNECTING = 1
      printf("Connecting...")
      break
  
  printf("Current state: 1")
```

### 逐行解析
- 第4-9行：enum定义状态，比数字更清晰
- 第13行：初始状态IDLE
- 第14行：事件1表示连接请求
- 🔥 第16-28行：switch实现状态机
- 第17-22行：IDLE状态收到事件1，转到CONNECTING
- 第23-25行：CONNECTING状态的处理
- 第26-28行：default处理未知状态
- 第30行：打印当前状态1（STATE_CONNECTING）

### 嵌入式Linux实战说明
**工作场景**：设备连接管理、协议解析、菜单系统。状态机是嵌入式核心设计模式。

**状态机要素**：
- 当前状态
- 输入事件
- 状态转换
- 输出动作

**面试问法**：什么是状态机？为什么要用状态机？

### 易错点+变体题
**易错点**：
- 忘记break
- 状态转换遗漏
- 没有处理所有状态

**变体题**：把state改成STATE_CONNECTING，输出是什么？

---

## 题号：024

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：逻辑运算符优先级
- **知识标签**：&&、||、优先级、括号
- **嵌入式场景**：复杂条件判断，安全检查
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint8_t a = 1, b = 0, c = 1, d = 0;
 7 |
 8 |     if (a || b && c) {
 9 |         printf("Condition 1: true\n");
10 |     } else {
11 |         printf("Condition 1: false\n");
12 |     }
13 |
14 |     if ((a || b) && c) {
15 |         printf("Condition 2: true\n");
16 |     } else {
17 |         printf("Condition 2: false\n");
18 |     }
19 |
20 |     if (a || b && c || d) {
21 |         printf("Condition 3: true\n");
22 |     } else {
23 |         printf("Condition 3: false\n");
24 |     }
25 |
26 |     return 0;
27 | }
```

### 提示
&&优先级高于||，但建议用括号明确意图。

### 内存图
```
优先级分析:
  a=1, b=0, c=1, d=0

  条件1: a || b && c
    &&优先级高: b && c = 0 && 1 = 0
    然后: a || 0 = 1 || 0 = 1
    结果: true

  条件2: (a || b) && c
    括号优先: a || b = 1 || 0 = 1
    然后: 1 && c = 1 && 1 = 1
    结果: true

  条件3: a || b && c || d
    &&优先: b && c = 0
    然后: a || 0 || d = 1 || 0 || 0 = 1
    结果: true
```

### 逐行解析
- 第6行：定义四个变量
- 🔥 第8行：&&优先级高于||，等价于a || (b && c)
- 第8行：1 || (0 && 1) = 1 || 0 = 1，为真
- 第9行：打印"Condition 1: true"
- 第14行：括号改变优先级，(1 || 0) && 1 = 1
- 第15行：打印"Condition 2: true"
- 第20行：1 || (0 && 1) || 0 = 1
- 第21行：打印"Condition 3: true"

### 嵌入式Linux实战说明
**工作场景**：复杂条件判断时，优先级容易出错。建议用括号明确意图，不要依赖记忆。

**优先级规则**：
- ! > 算术运算 > 关系运算 > && > ||
- 不确定就加括号

**最佳实践**：
```c
if ((a || b) && (c || d)) { ... }  // 清晰
if (a || b && c || d) { ... }       // 容易误解
```

**面试问法**：&&和||哪个优先级高？如何避免优先级问题？

### 易错点+变体题
**易错点**：
- 优先级记错
- 不加括号导致逻辑错误
- 复杂条件难以理解

**变体题**：把a改成0，三个条件分别输出什么？

---

# 完成情况

**Level 1 条件判断 8道题已完成**

覆盖知识点：
- ✅ if/else基本逻辑
- ✅ switch/case（协议命令分发常用）
- ✅ 短路求值（&&和||）
- ✅ 三目运算符
- ✅ 条件中的赋值陷阱（=和==）
- ✅ 场景：设备状态判断、错误码处理、阈值告警
