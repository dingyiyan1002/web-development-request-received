# Level 1 - 宏和预处理（8道题）

---

## 题号：049

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：#define常量定义
- **知识标签**：#define、常量、宏定义
- **嵌入式场景**：寄存器地址，配置参数
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define GPIO_BASE_ADDR   0x40020000
 5 | #define UART_BAUD_RATE   115200
 6 | #define BUFFER_SIZE      256
 7 |
 8 | int main(void)
 9 | {
10 |     uint32_t gpio_addr = GPIO_BASE_ADDR;
11 |     uint8_t rx_buffer[BUFFER_SIZE];
12 |
13 |     printf("GPIO Base: 0x%08X\n", gpio_addr);
14 |     printf("UART Baud: %u\n", UART_BAUD_RATE);
15 |     printf("Buffer Size: %u bytes\n", sizeof(rx_buffer));
16 |
17 |     return 0;
18 | }
```

### 提示
#define在预处理阶段进行文本替换，不占用内存。

### 内存图
```
预处理展开:
  GPIO_BASE_ADDR → 0x40020000
  UART_BAUD_RATE → 115200
  BUFFER_SIZE → 256

编译后:
  uint32_t gpio_addr = 0x40020000;
  uint8_t rx_buffer[256];
```

### 逐行解析
- 第4行：定义GPIO基地址
- 第5行：定义串口波特率
- 第6行：定义缓冲区大小
- 第10行：使用宏定义
- 第11行：宏用于数组大小
- 第13-15行：打印各值

### 嵌入式Linux实战说明
**工作场景**：寄存器地址、配置参数、数组大小都用宏定义，方便修改。

**宏定义优点**：
- 集中管理
- 方便修改
- 提高可读性

**面试问法**：#define和const有什么区别？

### 易错点+变体题
**易错点**：
- 宏定义末尾加分号
- 宏名冲突
- 作用域问题

**变体题**：把BUFFER_SIZE改成512，rx_buffer大小是多少？

---

## 题号：050

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：带参宏的陷阱
- **知识标签**：带参宏、副作用、括号
- **嵌入式场景**：常用宏函数，MIN/MAX
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define SQUARE(x)  ((x) * (x))
 5 | #define DOUBLE(x)  ((x) + (x))
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t a = 5;
10 |     printf("SQUARE(%u) = %u\n", a, SQUARE(a));
11 |
12 |     uint8_t b = 3;
13 |     printf("SQUARE(%u++) = %u\n", b, SQUARE(b++));
14 |     printf("b after = %u\n", b);
15 |
16 |     return 0;
17 | }
```

### 提示
宏是文本替换，SQUARE(b++)展开后b会自增几次？

### 内存图
```
宏展开:
  SQUARE(5) → ((5) * (5)) = 25
  
  SQUARE(b++) → ((b++) * (b++))
    第一个b++: b=3, 使用3, b变成4
    第二个b++: b=4, 使用4, b变成5
    结果: 3 * 4 = 12
    最终b = 5

注意: 这是未定义行为！
```

### 逐行解析
- 第4行：定义平方宏，参数加括号
- 第5行：定义加倍宏
- 第10行：SQUARE(5) = 25，正常
- 🔥 第13行：SQUARE(b++)展开为((b++)*(b++))
- 第13行：b++执行两次，结果是未定义行为
- 第14行：b最终值不确定

### 嵌入式Linux实战说明
**工作场景**：MIN、MAX、ABS等常用宏。必须注意副作用问题。

**宏定义规范**：
- 参数加括号
- 整体加括号
- 避免副作用参数

**正确写法**：
```c
#define SQUARE(x)  ((x) * (x))
// 使用时：
uint8_t temp = b++;
SQUARE(temp);  // 安全
```

**面试问法**：宏和函数有什么区别？宏有什么陷阱？

### 易错点+变体题
**易错点**：
- 参数有副作用
- 忘记加括号
- 优先级问题

**变体题**：把SQUARE(b++)改成SQUARE(++b)，结果是什么？

---

## 题号：051

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：#ifdef条件编译
- **知识标签**：#ifdef、条件编译、调试开关
- **嵌入式场景**：调试开关，平台适配
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DEBUG_MODE  1
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t sensor_value = 100;
 9 |
10 | #ifdef DEBUG_MODE
11 |     printf("[DEBUG] sensor_value = %u\n", sensor_value);
12 | #endif
13 |
14 |     printf("Sensor: %u\n", sensor_value);
15 |
16 |     return 0;
17 | }
```

### 提示
#ifdef判断宏是否定义，用于条件编译。

### 内存图
```
预处理过程:
  DEBUG_MODE已定义
  
  #ifdef DEBUG_MODE 为真
    保留第11行代码
  
编译后代码:
  printf("[DEBUG] sensor_value = %u\n", sensor_value);
  printf("Sensor: %u\n", sensor_value);
```

### 逐行解析
- 第4行：定义调试模式宏
- 第8行：传感器值
- 🔥 第10-12行：条件编译，DEBUG_MODE定义时编译
- 第14行：正常输出

### 嵌入式Linux实战说明
**工作场景**：调试日志、平台适配、功能开关。发布版本关闭调试输出。

**条件编译用途**：
- 调试开关
- 平台适配
- 功能裁剪

**常用形式**：
```c
#ifdef DEBUG
#define LOG(...) printf(__VA_ARGS__)
#else
#define LOG(...)
#endif
```

**面试问法**：#ifdef和#if defined有什么区别？

### 易错点+变体题
**易错点**：
- 宏名拼写错误
- 忘记#endif
- 嵌套条件混乱

**变体题**：把#define DEBUG_MODE 1删掉，输出是什么？

---

## 题号：052

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：#ifndef头文件保护
- **知识标签**：#ifndef、头文件保护、重复包含
- **嵌入式场景**：头文件防重复包含
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #ifndef CONFIG_H
 5 | #define CONFIG_H
 6 |
 7 | #define DEVICE_ID    0x1234
 8 | #define FIRMWARE_VER "1.0.0"
 9 |
10 | #endif
11 |
12 | int main(void)
13 | {
14 |     printf("Device ID: 0x%04X\n", DEVICE_ID);
15 |     printf("Version: %s\n", FIRMWARE_VER);
16 |     return 0;
17 | }
```

### 提示
#ifndef判断宏是否未定义，用于头文件保护。

### 内存图
```
头文件保护机制:
  第一次包含:
    CONFIG_H未定义 → 定义CONFIG_H → 包含内容
  
  第二次包含:
    CONFIG_H已定义 → 跳过内容

防止重复定义
```

### 逐行解析
- 第4行：判断CONFIG_H是否未定义
- 第5行：定义CONFIG_H
- 第7-8行：配置定义
- 第10行：结束条件编译
- 第14-15行：使用定义的宏

### 嵌入式Linux实战说明
**工作场景**：头文件标准写法，防止重复包含导致编译错误。

**头文件保护格式**：
```c
#ifndef MODULE_NAME_H
#define MODULE_NAME_H

// 头文件内容

#endif
```

**现代写法**：
```c
#pragma once  // 更简洁
```

**面试问法**：为什么要用头文件保护？

### 易错点+变体题
**易错点**：
- 宏名冲突
- 忘记#endif
- 保护范围错误

**变体题**：把#ifndef改成#ifdef，会发生什么？

---

## 题号：053

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：#字符串化运算符
- **知识标签**：#运算符、字符串化、调试宏
- **嵌入式场景**：调试宏，日志输出
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define PRINT_VAR(var)  printf(#var " = %u\n", var)
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t sensor_value = 100;
 9 |     uint16_t adc_result = 2048;
10 |
11 |     PRINT_VAR(sensor_value);
12 |     PRINT_VAR(adc_result);
13 |
14 |     return 0;
15 | }
```

### 提示
#运算符将参数转换为字符串。

### 内存图
```
宏展开:
  PRINT_VAR(sensor_value)
  → printf("sensor_value" " = %u\n", sensor_value)
  → printf("sensor_value = %u\n", sensor_value)
  
  PRINT_VAR(adc_result)
  → printf("adc_result = %u\n", adc_result)
```

### 逐行解析
- 第4行：#var将var转为字符串
- 第8-9行：定义变量
- 第11行：打印"sensor_value = 100"
- 第12行：打印"adc_result = 2048"

### 嵌入式Linux实战说明
**工作场景**：调试宏，自动打印变量名和值。

**#运算符用途**：
- 调试输出
- 错误信息
- 日志记录

**常用调试宏**：
```c
#define DEBUG_PRINT(var) printf(#var " = %d\n", (int)(var))
```

**面试问法**：#和##运算符有什么区别？

### 易错点+变体题
**易错点**：
- 忘记#的作用
- 字符串拼接问题
- 参数类型不匹配

**变体题**：把PRINT_VAR改成printf(#var " = %d\n", var)，sensor_value输出是什么？

---

## 题号：054

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：##连接运算符
- **知识标签**：##运算符、标识符连接、代码生成
- **嵌入式场景**：寄存器定义，函数生成
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define REG(name)  REG_##name
 5 | #define GPIO_REG  0x40020000
 6 | #define UART_REG  0x40011000
 7 |
 8 | #define FUNC(name)  void func_##name(void) { printf(#name "\n"); }
 9 |
10 | FUNC(init)
11 | FUNC(process)
12 |
13 | int main(void)
14 | {
15 |     printf("GPIO: 0x%08X\n", REG(GPIO));
16 |     printf("UART: 0x%08X\n", REG(UART));
17 |     func_init();
18 |     func_process();
19 |     return 0;
20 | }
```

### 提示
##运算符连接两个标识符。

### 内存图
```
宏展开:
  REG(GPIO) → REG_GPIO → 0x40020000
  REG(UART) → REG_UART → 0x40011000
  
  FUNC(init) → void func_init(void) { printf("init\n"); }
  FUNC(process) → void func_process(void) { printf("process\n"); }
```

### 逐行解析
- 第4行：##连接REG_和name
- 第5-6行：定义寄存器地址
- 第8行：##生成函数名，#生成字符串
- 第10-11行：生成两个函数
- 第15行：REG(GPIO)展开为REG_GPIO
- 第17-18行：调用生成的函数

### 嵌入式Linux实战说明
**工作场景**：寄存器定义、函数模板、代码自动生成。

**##运算符用途**：
- 标识符拼接
- 代码生成
- 模板宏

**常见用法**：
```c
#define PORT(name)  GPIO##name
PORT(A)  // GPIOA
PORT(B)  // GPIOB
```

**面试问法**：##运算符有什么用？

### 易错点+变体题
**易错点**：
- 连接结果不是有效标识符
- 宏展开顺序问题
- 过度使用导致代码难读

**变体题**：把FUNC(init)改成FUNC(start)，生成什么函数？

---

## 题号：055

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：BIT宏定义
- **知识标签**：BIT宏、位操作、寄存器
- **嵌入式场景**：寄存器位定义，位操作
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BIT(n)     (1U << (n))
 5 | #define SET_BIT(reg, n)    ((reg) |= BIT(n))
 6 | #define CLEAR_BIT(reg, n)  ((reg) &= ~BIT(n))
 7 | #define READ_BIT(reg, n)   (((reg) >> (n)) & 1)
 8 |
 9 | int main(void)
10 | {
11 |     uint8_t gpio_reg = 0x00;
12 |
13 |     SET_BIT(gpio_reg, 3);
14 |     printf("After SET_BIT(3): 0x%02X\n", gpio_reg);
15 |
16 |     SET_BIT(gpio_reg, 5);
17 |     printf("After SET_BIT(5): 0x%02X\n", gpio_reg);
18 |
19 |     printf("BIT(3) = %u\n", READ_BIT(gpio_reg, 3));
20 |     printf("BIT(5) = %u\n", READ_BIT(gpio_reg, 5));
21 |
22 |     return 0;
23 | }
```

### 提示
BIT(n)生成第n位的掩码，1U确保无符号。

### 内存图
```
位操作过程:
  gpio_reg = 0x00 = 00000000
  
  SET_BIT(gpio_reg, 3):
    BIT(3) = 1U << 3 = 0x08 = 00001000
    gpio_reg |= 0x08
    gpio_reg = 0x08 = 00001000
  
  SET_BIT(gpio_reg, 5):
    BIT(5) = 1U << 5 = 0x20 = 00100000
    gpio_reg |= 0x20
    gpio_reg = 0x28 = 00101000
  
  READ_BIT(gpio_reg, 3):
    (0x28 >> 3) & 1 = 0x05 & 1 = 1
  
  READ_BIT(gpio_reg, 5):
    (0x28 >> 5) & 1 = 0x01 & 1 = 1
```

### 逐行解析
- 第4行：BIT宏生成位掩码，1U保证无符号
- 第5行：设置位宏
- 第6行：清除位宏
- 第7行：读取位宏
- 第13行：设置第3位
- 第16行：设置第5位
- 第19-20行：读取位值

### 嵌入式Linux实战说明
**工作场景**：寄存器位操作是嵌入式开发的核心技能。这些宏在项目中随处可见。

**位操作宏规范**：
- 使用1U避免符号问题
- 参数加括号
- 整体加括号

**面试问法**：为什么要用1U而不是1？

### 易错点+变体题
**易错点**：
- 忘记U后缀
- 参数有副作用
- 位号超出范围

**变体题**：把SET_BIT(gpio_reg, 3)改成CLEAR_BIT(gpio_reg, 3)，gpio_reg是多少？

---

## 题号：056

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：MIN/MAX宏
- **知识标签**：MIN宏、MAX宏、三元运算符
- **嵌入式场景**：范围限制，数据比较
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MIN(a, b)  ((a) < (b) ? (a) : (b))
 5 | #define MAX(a, b)  ((a) > (b) ? (a) : (b))
 6 | #define CLAMP(x, min, max)  MIN(MAX(x, min), max)
 7 |
 8 | int main(void)
 9 | {
10 |     int16_t value = 150;
11 |     int16_t min_val = 0;
12 |     int16_t max_val = 100;
13 |
14 |     int16_t clamped = CLAMP(value, min_val, max_val);
15 |     printf("Original: %d\n", value);
16 |     printf("Clamped: %d\n", clamped);
17:
18 |     printf("MIN(10, 20) = %d\n", MIN(10, 20));
19 |     printf("MAX(10, 20) = %d\n", MAX(10, 20));
20:
21 |     return 0;
22 | }
```

### 提示
CLAMP宏将值限制在范围内：先取最大值，再取最小值。

### 内存图
```
宏展开:
  CLAMP(150, 0, 100)
  = MIN(MAX(150, 0), 100)
  = MIN(150, 100)
  = 100

  MIN(10, 20)
  = ((10) < (20) ? (10) : (20))
  = 10

  MAX(10, 20)
  = ((10) > (20) ? (10) : (20))
  = 20
```

### 逐行解析
- 第4行：MIN宏，返回较小值
- 第5行：MAX宏，返回较大值
- 第6行：CLAMP宏，限制范围
- 第10-12行：定义值和范围
- 第14行：150限制在0-100范围内，结果100
- 第18-19行：MIN和MAX示例

### 嵌入式Linux实战说明
**工作场景**：传感器数据范围限制、PWM占空比限制、数组索引边界检查。

**CLAMP用途**：
- 数据范围限制
- 防止溢出
- 边界保护

**面试问法**：CLAMP宏的原理是什么？

### 易错点+变体题
**易错点**：
- 参数有副作用
- 类型不匹配
- 范围min > max

**变体题**：把value改成50，clamped是多少？

---

# 完成情况

**Level 1 宏和预处理 8道题已完成**

覆盖知识点：
- ✅ #define常量和带参宏
- ✅ 宏的副作用（i++在宏中）
- ✅ #ifdef条件编译
- ✅ #ifndef头文件保护
- ✅ 字符串化#和连接##
- ✅ BIT(n)/MIN/MAX常用宏
- ✅ 场景：平台适配、调试开关、寄存器位定义
