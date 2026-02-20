# Level 1 - printf格式化输出（8道题）

---

## 题号：001

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：打印寄存器值（十六进制对齐）
- **知识标签**：printf、%02X、十六进制
- **嵌入式场景**：调试时打印硬件寄存器值，需要固定宽度方便对比
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define REG_BASE_ADDR  0x40000000
 5 |
 6 | int main(void)
 7 | {
 8 |     uint32_t gpio_reg = 0x1234ABCD;
 9 |     uint32_t uart_reg = 0x0056;
10 |     uint32_t spi_reg  = 0xFF;
11 |
12 |     printf("GPIO: 0x%08X\n", gpio_reg);
13 |     printf("UART: 0x%08X\n", uart_reg);
14 |     printf("SPI:  0x%08X\n", spi_reg);
15 |
16 |     return 0;
17 | }
```

### 提示
%08X中的0、8、X分别代表什么意思？

### 内存图
```
gpio_reg (4字节): 0x1234ABCD
uart_reg (4字节): 0x00000056
spi_reg  (4字节): 0x000000FF

输出格式：0x + 8位十六进制大写字母
```

### 逐行解析
- 第4行：宏定义寄存器基地址，实际项目中常用
- 第8行：GPIO寄存器值，32位完整数据
- 第9行：UART寄存器值，只有低16位有效
- 第10行：SPI寄存器值，只有低8位有效
- 🔥 第12行：%08X → 0表示补零，8表示宽度8位，X表示大写十六进制
- 第13行：0x0056补零后变成0x00000056
- 第14行：0xFF补零后变成0x000000FF

### 嵌入式Linux实战说明
**工作场景**：调试硬件驱动时，需要打印寄存器值对比数据手册。用%08X保证输出对齐，方便肉眼对比。

**面试问法**：printf("0x%02X", 0x5)输出什么？%02X和%2X有什么区别？

### 易错点+变体题
**易错点**：
- %x和%X的区别（小写ab vs 大写AB）
- %08X和%8X的区别（补0 vs 补空格）

**变体题**：把%08X改成%04X，三行输出分别是什么？

---

## 题号：002

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：打印有符号和无符号整数
- **知识标签**：printf、%d、%u、有符号无符号
- **嵌入式场景**：传感器数据打印，温度可能为负，计数器始终为正
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     int16_t  temperature = -15;
 7 |     uint16_t humidity    = 85;
 8 |     uint32_t counter     = 100000;
 9 |
10 |     printf("Temperature: %d C\n", temperature);
11 |     printf("Humidity:    %u %%\n", humidity);
12 |     printf("Counter:     %u\n", counter);
13 |
14 |     return 0;
15 | }
```

### 提示
%%在printf中是什么意思？

### 内存图
```
temperature (2字节, 有符号): -15 (0xFFF1 补码)
humidity    (2字节, 无符号): 85  (0x0055)
counter     (4字节, 无符号): 100000 (0x000186A0)
```

### 逐行解析
- 第6行：int16_t可存储负数，范围-32768~32767，适合温度值
- 第7行：uint16_t只能存正数，范围0~65535，适合湿度值
- 第8行：uint32_t范围更大，0~4294967295，适合计数器
- 🔥 第10行：%d打印有符号十进制整数
- 第11行：%u打印无符号十进制整数，%%输出一个%字符
- 第12行：%u打印无符号，counter值100000

### 嵌入式Linux实战说明
**工作场景**：传感器数据采集后需要打印日志。温度用有符号类型（可能零下），湿度、计数器用无符号类型。

**面试问法**：int16_t和short有什么区别？为什么要用stdint类型？

### 易错点+变体题
**易错点**：
- 用%d打印无符号数（可能显示负值）
- 用%u打印有符号数（负值变成大正数）
- 忘记%%转义，直接写%导致问题

**变体题**：把temperature改成-32768，再改成-32769，输出分别是什么？

---

## 题号：003

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：打印指针地址
- **知识标签**：printf、%p、指针、地址
- **嵌入式场景**：调试时查看变量内存地址，检查指针是否有效
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint32_t sensor_value = 12345;
 7 |     uint32_t *ptr = &sensor_value;
 8 |
 9 |     printf("Value:   %u\n", sensor_value);
10 |     printf("Address: %p\n", (void *)ptr);
11 |     printf("Via ptr: %u\n", *ptr);
12 |
13 |     return 0;
14 | }
```

### 提示
%p专门用于打印指针地址，建议转为void *再传。

### 内存图
```
栈内存布局（假设）：

sensor_value:
  地址: 0x7fff1234
  值:   12345 (0x00003039)

ptr:
  地址: 0x7fff1238
  值:   0x7fff1234 (指向sensor_value)
```

### 逐行解析
- 第6行：定义传感器值变量
- 第7行：定义指针，指向sensor_value的地址
- 第9行：%u打印变量的值
- 🔥 第10行：%p打印指针存储的地址，(void *)是规范写法
- 第11行：*ptr解引用，获取指针指向的值

### 嵌入式Linux实战说明
**工作场景**：调试指针相关问题时，需要打印地址确认指针指向是否正确。检查空指针、野指针时常用。

**面试问法**：64位系统上指针大小是多少？为什么%p打印的地址有时前面有很多0？

### 易错点+变体题
**易错点**：
- 用%d打印地址（地址可能很大，显示不正确）
- 忘记解引用，直接打印指针值
- 传%p时没有转void *（虽然大多时候没问题）

**变体题**：把printf("Via ptr: %u\n", *ptr)改成printf("Via ptr: %u\n", ptr)，输出是什么？

---

## 题号：004

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：打印字符和字符串
- **知识标签**：printf、%c、%s、字符数组
- **嵌入式场景**：打印设备名称、状态字符、错误信息
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DEVICE_NAME  "Sensor_01"
 5 |
 6 | int main(void)
 7 | {
 8 |     char device_name[] = "Sensor_01";
 9 |     char status_char   = 'O';
10 |     uint8_t status_code = 0x4F;
11 |
12 |     printf("Device: %s\n", device_name);
13 |     printf("Status: %c\n", status_char);
14 |     printf("Code:   %c (0x%02X)\n", status_code, status_code);
15 |
16 |     return 0;
17 | }
```

### 提示
ASCII码0x4F对应哪个字符？

### 内存图
```
device_name (字符数组):
  地址: 0x1000
  值:   'S''e''n''s''o''r''_''0''1''\0'

status_char (1字节):
  值: 'O' (ASCII 0x4F)

status_code (1字节):
  值: 0x4F (十进制79，ASCII字符'O')
```

### 逐行解析
- 第4行：宏定义设备名称，方便统一修改
- 第8行：字符数组存储字符串，自动添加\0结尾
- 第9行：单个字符用单引号
- 第10行：状态码用uint8_t存储
- 🔥 第12行：%s打印字符串，从首地址到\0
- 第13行：%c打印单个字符
- 第14行：同一个值，用%c打印字符，用%02X打印十六进制

### 嵌入式Linux实战说明
**工作场景**：设备状态上报时，常用字符表示状态（O=OK, E=Error, W=Warning）。协议解析时需要理解ASCII码。

**面试问法**：'0'和0有什么区别？字符数组char[]和字符指针char*有什么区别？

### 易错点+变体题
**易错点**：
- 单引号和双引号混淆
- %s需要地址，%c需要字符值
- 忘记字符串以\0结尾

**变体题**：把status_code改成0x30，输出是什么？

---

## 题号：005

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：printf连续输出拼接
- **知识标签**：printf、输出拼接、缓冲区
- **嵌入式场景**：日志输出、调试信息分步打印
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint8_t frame_header = 0xAA;
 7 |     uint8_t frame_len    = 0x05;
 8 |     uint8_t frame_data[] = {0x01, 0x02, 0x03, 0x04, 0x05};
 9 |
10 |     printf("RX: ");
11 |     printf("%02X ", frame_header);
12 |     printf("%02X ", frame_len);
13 |
14 |     for (uint8_t i = 0; i < frame_len; i++) {
15 |         printf("%02X ", frame_data[i]);
16 |     }
17 |
18 |     printf("\n");
19 |     return 0;
20 | }
```

### 提示
多个printf连续调用，输出会拼接在一起，直到遇到\n才换行。

### 内存图
```
frame_header: 0xAA
frame_len:    0x05
frame_data:   [0x01][0x02][0x03][0x04][0x05]

输出拼接过程：
"RX: " + "AA " + "05 " + "01 " + "02 " + "03 " + "04 " + "05 " + "\n"
```

### 逐行解析
- 第6行：帧头标识
- 第7行：数据长度
- 第8行：数据域
- 🔥 第10行：打印前缀，没有\n，后续输出接在后面
- 第11-12行：打印帧头和长度，每个后面有空格
- 第14-16行：循环打印数据域
- 第18行：最后打印换行，整行输出完成

### 嵌入式Linux实战说明
**工作场景**：协议调试时，需要打印完整帧内容。分步打印方便加入条件判断，比如只在出错时打印详细信息。

**面试问法**：printf输出是立即显示还是先存缓冲区？什么时候会刷新缓冲区？

### 易错点+变体题
**易错点**：
- 忘记最后的\n，输出可能不显示（行缓冲）
- 多个printf之间变量值可能变化
- 循环中打印忘记分隔符

**变体题**：在第12行后面加一行printf("\n");，最终输出是什么样？

---

## 题号：006

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：printf返回值
- **知识标签**：printf返回值、字符计数
- **嵌入式场景**：检查日志是否完整写入、格式化字符串长度计算
- **面试频率**：低

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     int32_t ret1 = 0;
 7 |     int32_t ret2 = 0;
 8 |     int32_t ret3 = 0;
 9 |
10 |     ret1 = printf("Hello\n");
11 |     ret2 = printf("Count: %d\n", 12345);
12 |     ret3 = printf("Hex: 0x%02X\n", 0xAB);
13 |
14 |     printf("Return values: %d, %d, %d\n", ret1, ret2, ret3);
15 |
16 |     return 0;
17 | }
```

### 提示
printf返回成功打印的字符数（不包括结尾的\0），失败返回负值。

### 内存图
```
输出分析：
"Hello\n"        → 6个字符（H e l l o \n）
"Count: 12345\n" → 13个字符
"Hex: 0xAB\n"    → 11个字符（H e x :   0 x A B \n）
```

### 逐行解析
- 第6-8行：定义变量存储返回值
- 🔥 第10行：printf返回打印的字符数，"Hello\n"共6个字符
- 第11行："Count: 12345\n"共13个字符（空格也算）
- 第12行："Hex: 0xAB\n"共11个字符
- 第14行：打印三个返回值

### 嵌入式Linux实战说明
**工作场景**：写入日志文件时，可以用返回值检查是否写入成功。snprintf计算目标缓冲区需要的长度。

**面试问法**：printf的返回值是什么类型？什么情况下返回负值？

### 易错点+变体题
**易错点**：
- 忘记\n也算一个字符
- 混淆printf返回值和打印的内容
- 返回值类型是int不是size_t

**变体题**：把"Hello\n"改成"Hello"（去掉\n），ret1是多少？

---

## 题号：007

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：格式化宽度和对齐
- **知识标签**：printf、宽度、对齐、左对齐
- **嵌入式场景**：日志格式化输出，表格对齐显示
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     printf("%-10s %8s %6s\n", "Device", "Value", "Unit");
 7 |     printf("%-10s %8u %6s\n", "Temp", 25, "C");
 8 |     printf("%-10s %8u %6s\n", "Humidity", 65, "%");
 9 |     printf("%-10s %8u %6s\n", "Pressure", 1013, "hPa");
10 |
11 |     return 0;
12 | }
```

### 提示
%-10s表示左对齐宽度10，%8s表示右对齐宽度8。

### 内存图
```
输出对齐示意：
Device        Value   Unit   ← 表头
Temp             25      C   ← 数据行
Humidity         65      %   ← 数据行
Pressure       1013    hPa   ← 数据行

列宽：10字符 + 8字符 + 6字符
```

### 逐行解析
- 🔥 第6行：表头，%-10s左对齐10字符宽度，%8s右对齐8字符宽度
- 第7行：Temp左对齐，25右对齐8位，C右对齐6位
- 第8行：Humidity左对齐（刚好10字符），65右对齐
- 第9行：Pressure左对齐，1013右对齐，hPa右对齐

### 嵌入式Linux实战说明
**工作场景**：设备状态日志、传感器数据表格输出。格式化对齐方便人眼阅读和后续解析。

**面试问法**：%-10.3f是什么意思？宽度10，精度3，左对齐。

### 易错点+变体题
**易错点**：
- 负号表示左对齐，正数（省略+号）表示右对齐
- 宽度不足时按实际宽度输出，不会截断
- 混淆宽度和精度

**变体题**：把%-10s改成%10s，输出有什么变化？

---

## 题号：008

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：打印long和size_t类型
- **知识标签**：printf、%ld、%zu、size_t
- **嵌入式场景**：文件大小、内存大小、系统调用返回值打印
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | #define BUF_SIZE  1024
 6 |
 7 | int main(void)
 8 | {
 9 |     int64_t  file_size   = 4294967296LL;
10 |     uint32_t buf_size    = BUF_SIZE;
11 |     size_t   str_len     = 0;
12 |
13 |     str_len = strlen("Hello World");
14 |
15 |     printf("File size: %ld bytes\n", file_size);
16 |     printf("Buffer:    %u bytes\n", buf_size);
17 |     printf("String length: %zu\n", str_len);
18 |
19 |     return 0;
20 | }
```

### 提示
%zu用于打印size_t类型，%ld用于打印long类型。注意64位整数的LL后缀。

### 内存图
```
file_size (8字节): 4294967296 = 0x100000000 = 4GB
buf_size  (4字节): 1024
str_len   (8字节，64位系统): 11

strlen计算结果：11个字符（不含\0）
```

### 逐行解析
- 第5行：宏定义缓冲区大小
- 第9行：int64_t存储大文件大小，LL后缀表示long long
- 第10行：uint32_t存储缓冲区大小
- 第11行：size_t是sizeof返回的类型，64位系统是8字节
- 第13行：strlen返回size_t类型
- 🔥 第15行：%ld打印long类型，注意这里file_size是int64_t，严格应该用%lld或PRId64
- 第17行：%zu专门用于size_t类型

### 嵌入式Linux实战说明
**工作场景**：文件操作、内存分配、字符串处理时，经常需要打印size_t类型。用错误的格式符会导致输出错误。

**面试问法**：size_t在32位和64位系统上大小一样吗？打印size_t应该用什么格式符？

### 易错点+变体题
**易错点**：
- 用%d打印size_t（64位系统上可能截断）
- int64_t应该用PRId64宏或%lld
- 忘记LL后缀导致整数常量溢出

**变体题**：把file_size改成2147483648（2GB），不加LL后缀会怎样？

---

# 完成情况

**Level 1 printf格式化输出 8道题已完成**

覆盖知识点：
- ✅ %d %u %x %02X %ld %s %c %p
- ✅ 多个printf连续输出拼接
- ✅ printf返回值
- ✅ 十六进制输出（嵌入式调试天天用）
- ✅ 场景：调试打印寄存器值、打印地址
- ✅ 宽度和对齐
- ✅ size_t类型打印
