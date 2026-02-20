# Level 1 - 整型类型和溢出（8道题）

---

## 题号：009

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：uint8_t计数器溢出
- **知识标签**：uint8_t、溢出、回绕
- **嵌入式场景**：串口接收计数器，数据包序号循环
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MAX_RETRY  3
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t rx_count = 0;
 9 |     uint8_t packet_seq = 254;
10 |
11 |     for (uint8_t i = 0; i < MAX_RETRY; i++) {
12 |         rx_count++;
13 |         packet_seq++;
14 |     }
15 |
16 |     printf("rx_count: %u\n", rx_count);
17 |     printf("packet_seq: %u\n", packet_seq);
18 |
19 |     return 0;
20 | }
```

### 提示
uint8_t的范围是0~255，超出范围会怎样？

### 内存图
```
uint8_t (1字节，无符号):
  范围: 0 ~ 255
  溢出行为: 255 + 1 = 0 (回绕)

rx_count变化:
  0 → 1 → 2 → 3

packet_seq变化:
  254 → 255 → 0 → 1
```

### 逐行解析
- 第4行：宏定义最大重试次数
- 第8行：接收计数器，初始0
- 第9行：包序号，初始254（接近uint8_t最大值）
- 🔥 第11-14行：循环3次，每次两个变量都+1
- 第12行：rx_count: 0→1→2→3，正常
- 🔥 第13行：packet_seq: 254→255→0→1，255+1溢出回绕到0
- 第16行：打印rx_count=3
- 第17行：打印packet_seq=1

### 嵌入式Linux实战说明
**工作场景**：协议包序号通常用uint8_t，范围0-255循环。接收端用序号判断丢包、乱序。计算差值时要考虑回绕。

**面试问法**：uint8_t加法溢出后值是多少？如何检测溢出？

### 易错点+变体题
**易错点**：
- 忘记uint8_t会溢出回绕
- 用uint8_t做循环计数器可能死循环
- 序号比较时没考虑回绕

**变体题**：把packet_seq初始值改成255，循环4次后packet_seq是多少？

---

## 题号：010

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：int8_t温度值溢出
- **知识标签**：int8_t、有符号溢出、未定义行为
- **嵌入式场景**：温度传感器数据存储，极端温度处理
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define TEMP_OFFSET  10
 5 |
 6 | int main(void)
 7 | {
 8 |     int8_t temperature = 125;
 9 |     int8_t calibrated = temperature + TEMP_OFFSET;
10 |
11 |     printf("Raw temp: %d\n", temperature);
12 |     printf("Calibrated: %d\n", calibrated);
13 |
14 |     return 0;
15 | }
```

### 提示
int8_t的范围是-128~127，超出会怎样？

### 内存图
```
int8_t (1字节，有符号):
  范围: -128 ~ 127
  存储: 补码形式
  溢出: 未定义行为（但通常回绕）

计算过程:
  temperature = 125
  calibrated = 125 + 10 = 135
  但int8_t最大127，135超出范围
  135的二进制: 10000111
  作为int8_t解释: -121 (补码)
```

### 逐行解析
- 第4行：温度校准偏移量
- 第8行：原始温度值，接近int8_t上限
- 🔥 第9行：125+10=135，超出int8_t范围（-128~127）
- 第9行：有符号整数溢出是**未定义行为**，但大多数系统会回绕
- 🔥 第9行：135的二进制10000111，作为int8_t补码解释为-121
- 第11行：打印原始温度125
- 第12行：打印校准后温度-121（错误结果）

### 嵌入式Linux实战说明
**工作场景**：传感器数据校准时，必须检查是否会溢出。温度范围要选对类型，极端环境用int16_t更安全。

**面试问法**：有符号整数溢出和无符号整数溢出有什么区别？

### 易错点+变体题
**易错点**：
- 有符号溢出是未定义行为，结果不可预测
- 忘记检查计算结果是否超出类型范围
- 用int8_t存储可能超出-128~127的值

**变体题**：把temperature改成-120，TEMP_OFFSET改成-20，calibrated是多少？

---

## 题号：011

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：有符号与无符号比较陷阱
- **知识标签**：有符号无符号比较、隐式转换
- **嵌入式场景**：传感器阈值判断，错误码检查
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define TEMP_THRESHOLD  30
 5 |
 6 | int main(void)
 7 | {
 8 |     int16_t  temperature = -10;
 9 |     uint16_t threshold = TEMP_THRESHOLD;
10 |
11 |     if (temperature < threshold) {
12 |         printf("Below threshold\n");
13 |     } else {
14 |         printf("Above threshold\n");
15 |     }
16 |
17 |     printf("temperature: %d\n", temperature);
18 |     printf("threshold: %u\n", threshold);
19 |
20 |     return 0;
21 | }
```

### 提示
当有符号和无符号数比较时，会发生什么隐式转换？

### 内存图
```
比较时的隐式转换:
  temperature (-10) 是 int16_t (有符号)
  threshold (30) 是 uint16_t (无符号)

  比较时: int16_t → uint16_t
  -10 的 uint16_t 表示: 65526 (0xFFF6)

  实际比较: 65526 < 30 ? → false
```

### 逐行解析
- 第4行：温度阈值宏定义
- 第8行：当前温度-10度（有符号）
- 第9行：阈值30度（无符号）
- 🔥 第11行：**陷阱！** 有符号和无符号比较时，有符号转为无符号
- 第11行：-10转为uint16_t变成65526
- 第11行：65526 < 30 为假，进入else分支
- 第14行：打印"Above threshold"（错误结果！）
- 第17-18行：打印原始值确认

### 嵌入式Linux实战说明
**工作场景**：这是极常见的bug！传感器阈值、超时判断、长度检查都可能遇到。编译器通常会警告，但不要忽略。

**正确写法**：
```c
if (temperature < (int16_t)threshold) { ... }
// 或统一用有符号类型
```

**面试问法**：这段代码有什么问题？如何修复？

### 易错点+变体题
**易错点**：
- 有符号和无符号比较会隐式转换
- 负数转为无符号变成很大的正数
- 编译器警告不要忽略

**变体题**：把temperature改成10，输出是什么？

---

## 题号：012

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：类型转换截断
- **知识标签**：类型转换、截断、数据丢失
- **嵌入式场景**：ADC值转百分比，大范围数据压缩
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define ADC_MAX_VALUE   4095
 5 | #define PERCENT_MAX     100
 6 |
 7 | int main(void)
 8 | {
 9 |     uint16_t adc_value = 2048;
10 |     uint8_t  percentage = 0;
11 |
12 |     percentage = (adc_value * PERCENT_MAX) / ADC_MAX_VALUE;
13 |
14 |     printf("ADC: %u\n", adc_value);
15 |     printf("Percentage: %u%%\n", percentage);
16 |
17 |     adc_value = 4095;
18 |     percentage = (adc_value * PERCENT_MAX) / ADC_MAX_VALUE;
19 |     printf("Max percentage: %u%%\n", percentage);
20 |
21 |     return 0;
22 | }
```

### 提示
2048 * 100 = 204800，会超出uint8_t吗？中间计算用什么类型？

### 内存图
```
计算过程分析:
  2048 * 100 = 204800
  204800 / 4095 = 50 (整数除法)

  4095 * 100 = 409500
  409500 / 4095 = 100

中间计算类型:
  uint16_t * int → int (类型提升)
  结果在int范围内，不会溢出

赋值给uint8_t:
  50 和 100 都在 0~255 范围内，安全
```

### 逐行解析
- 第4行：12位ADC最大值
- 第5行：百分比最大值
- 第9行：ADC采样值
- 第10行：百分比结果，uint8_t足够（0~100）
- 🔥 第12行：中间计算自动提升为int，不会溢出
- 第12行：2048*100/4095=50，安全赋值给uint8_t
- 第17行：ADC最大值
- 第18行：4095*100/4095=100，正好100%
- 第19行：打印最大百分比

### 嵌入式Linux实战说明
**工作场景**：ADC值转百分比是常见操作。注意中间计算可能溢出，必要时用更大类型或强制转换。

**潜在问题**：如果ADC是16位（65535），65535*100=6553500，仍安全。但如果是32位ADC，需要用uint64_t。

**面试问法**：如何安全地进行类型转换？什么时候需要检查范围？

### 易错点+变体题
**易错点**：
- 中间计算可能溢出
- 直接赋值可能截断
- 整数除法丢失小数

**变体题**：把PERCENT_MAX改成255，adc_value=4095时percentage是多少？

---

## 题号：013

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：sizeof各类型大小
- **知识标签**：sizeof、stdint类型、数据类型大小
- **嵌入式场景**：协议字段定义，结构体内存计算
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     printf("uint8_t:  %zu bytes\n", sizeof(uint8_t));
 7 |     printf("uint16_t: %zu bytes\n", sizeof(uint16_t));
 8 |     printf("uint32_t: %zu bytes\n", sizeof(uint32_t));
 9 |     printf("uint64_t: %zu bytes\n", sizeof(uint64_t));
10 |     printf("int8_t:   %zu bytes\n", sizeof(int8_t));
11 |     printf("int16_t:  %zu bytes\n", sizeof(int16_t));
12 |     printf("int32_t:  %zu bytes\n", sizeof(int32_t));
13 |     printf("int64_t:  %zu bytes\n", sizeof(int64_t));
14 |     printf("pointer:  %zu bytes\n", sizeof(void *));
15 |
16 |     return 0;
17 | }
```

### 提示
stdint类型的大小是固定的，不随平台变化。指针大小呢？

### 内存图
```
stdint类型大小（固定）:
  uint8_t  → 1 byte  (8 bits)
  uint16_t → 2 bytes (16 bits)
  uint32_t → 4 bytes (32 bits)
  uint64_t → 8 bytes (64 bits)
  int8_t   → 1 byte
  int16_t  → 2 bytes
  int32_t  → 4 bytes
  int64_t  → 8 bytes

指针大小（平台相关）:
  32位系统 → 4 bytes
  64位系统 → 8 bytes
```

### 逐行解析
- 🔥 第6行：uint8_t固定1字节，%zu打印size_t
- 第7行：uint16_t固定2字节
- 第8行：uint32_t固定4字节
- 第9行：uint64_t固定8字节
- 第10-13行：有符号版本大小相同
- 🔥 第14行：指针大小取决于系统位数，64位系统是8字节

### 嵌入式Linux实战说明
**工作场景**：定义协议结构体时，必须知道各类型大小。用stdint类型保证跨平台一致性。指针大小影响内存对齐。

**面试问法**：sizeof(char)是多少？sizeof(int)一定是4吗？为什么要用stdint类型？

### 易错点+变体题
**易错点**：
- 以为int一定是4字节（实际平台相关）
- 忘记指针大小与平台相关
- 用%zu打印size_t（不是%d）

**变体题**：在32位系统上，sizeof(void*)是多少？

---

## 题号：014

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：隐式类型提升
- **知识标签**：类型提升、隐式转换、整数提升
- **嵌入式场景**：混合类型运算，表达式计算
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint8_t  a = 200;
 7 |     uint8_t  b = 100;
 8 |     uint16_t result = 0;
 9 |
10 |     result = a + b;
11 |     printf("a + b = %u\n", result);
12 |
13 |     uint8_t c = a + b;
14 |     printf("c = %u\n", c);
15 |
16 |     return 0;
17 | }
```

### 提示
uint8_t运算时会提升为什么类型？300能存进uint8_t吗？

### 内存图
```
类型提升过程:
  a (uint8_t) + b (uint8_t)
  → 提升为 int 运算
  → 200 + 100 = 300 (int类型)

赋值给uint16_t:
  300 在 0~65535 范围内，安全
  result = 300

赋值给uint8_t:
  300 超出 0~255 范围
  300 = 0x012C
  截断低8位: 0x2C = 44
  c = 44
```

### 逐行解析
- 第6行：a = 200
- 第7行：b = 100
- 第8行：result用uint16_t，足够存储300
- 🔥 第10行：a+b运算时，uint8_t提升为int，结果300
- 第10行：300赋值给uint16_t，安全
- 第11行：打印300
- 🔥 第13行：300赋值给uint8_t，截断为44
- 第14行：打印44

### 嵌入式Linux实战说明
**工作场景**：两个小类型相加可能溢出。编译器会自动提升类型，但赋值时要小心截断。

**整数提升规则**：
1. 小于int的类型自动提升为int
2. 运算结果类型由较大操作数决定
3. 赋值时可能截断

**面试问法**：uint8_t相加会溢出吗？中间结果是什么类型？

### 易错点+变体题
**易错点**：
- 忘记运算时会类型提升
- 赋值时截断
- 以为uint8_t相加一定在范围内

**变体题**：把a改成255，b改成1，result和c分别是多少？

---

## 题号：015

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：协议字段类型选择
- **知识标签**：类型选择、范围分析、协议设计
- **嵌入式场景**：通信协议字段定义，数据范围分析
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define FRAME_HEADER  0xAA55
 5 | #define MAX_DATA_LEN  200
 6 |
 7 | int main(void)
 8 | {
 9 |     uint16_t frame_header = FRAME_HEADER;
10 |     uint8_t  data_len = MAX_DATA_LEN;
11 |     uint8_t  seq_num = 0;
12 |     uint16_t checksum = 0;
13 |
14 |     for (uint8_t i = 0; i < data_len; i++) {
15 |         checksum += (uint16_t)(i + 1);
16 |     }
17 |
18 |     printf("Header: 0x%04X\n", frame_header);
19 |     printf("Data len: %u\n", data_len);
20 |     printf("Checksum: %u\n", checksum);
21 |
22 |     return 0;
23 | }
```

### 提示
checksum累加200个数的和，会超出uint16_t范围吗？

### 内存图
```
协议帧结构:
  frame_header: 0xAA55 (2字节)
  data_len:     200    (1字节，范围0~255)
  seq_num:      0      (1字节，循环0~255)
  checksum:     ?      (2字节)

checksum计算:
  1 + 2 + 3 + ... + 200
  = 200 * 201 / 2
  = 20100

  20100 < 65535 (uint16_t最大值)
  安全！
```

### 逐行解析
- 第4行：帧头标识，16位
- 第5行：最大数据长度200
- 第9行：帧头用uint16_t，可存储0xAA55
- 第10行：数据长度用uint8_t，200在范围内
- 第11行：序号用uint8_t，循环使用
- 第12行：校验和用uint16_t
- 🔥 第14-16行：累加1到200的和
- 第15行：强制转为uint16_t避免溢出
- 第20行：打印校验和20100

### 嵌入式Linux实战说明
**工作场景**：设计协议时要选择合适的类型。数据长度一般用uint8_t（最多255字节），校验和用uint16_t防止溢出。

**类型选择原则**：
- 知道范围就用最小够用的类型
- 不确定就用大一点的类型
- 考虑边界情况和溢出

**面试问法**：为什么数据长度用uint8_t而不是uint16_t？

### 易错点+变体题
**易错点**：
- 类型选择过小导致溢出
- 类型选择过大浪费空间
- 累加和可能溢出

**变体题**：把MAX_DATA_LEN改成255，checksum是多少？会溢出吗？

---

## 题号：016

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：位移与类型范围
- **知识标签**：位移、溢出、类型范围
- **嵌入式场景**：寄存器配置，位掩码生成
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
  2 | #include <stdint.h>
  3 |
 4 | #define BIT_7  (1 << 7)
 5 | #define BIT_15 (1 << 15)
 6 | #define BIT_31 (1 << 31)
 7 |
 8 | int main(void)
 9 | {
10 |     uint8_t  val8  = BIT_7;
11 |     uint16_t val16 = BIT_15;
12 |     uint32_t val32 = BIT_31;
13 |
14 |     printf("BIT_7:  0x%02X\n", val8);
15 |     printf("BIT_15: 0x%04X\n", val16);
16 |     printf("BIT_31: 0x%08X\n", val32);
17 |
18 |     return 0;
19 | }
```

### 提示
1是int类型，1<<31会怎样？宏定义中的位移安全吗？

### 内存图
```
位移分析:
  1 << 7  = 128  = 0x80      (int范围内)
  1 << 15 = 32768 = 0x8000   (int范围内)
  1 << 31 = ?                (超出int范围!)

问题:
  int通常是32位有符号
  1 << 31 会溢出，变成负数
  应该用 1U << 31 (无符号)

正确写法:
  #define BIT_31 (1U << 31)
```

### 逐行解析
- 🔥 第4行：1<<7=128，安全
- 🔥 第5行：1<<15=32768，安全
- 🔥 第6行：**问题！** 1是int，1<<31溢出
- 第6行：有符号int位移溢出是未定义行为
- 第10行：赋值给uint8_t，取低8位=0x80
- 第11行：赋值给uint16_t，可能得到0x8000或错误值
- 第12行：赋值给uint32_t，结果不确定

### 嵌入式Linux实战说明
**工作场景**：定义位掩码时，必须用无符号常量。1U表示unsigned int，1ULL表示unsigned long long。

**正确写法**：
```c
#define BIT(n)  (1U << (n))
#define BIT_31  (1U << 31)
#define BIT_63  (1ULL << 63)
```

**面试问法**：1<<31的值是多少？为什么可能出问题？

### 易错点+变体题
**易错点**：
- 忘记位移操作数是有符号int
- 位移超过类型位数是未定义行为
- 宏定义中的位移陷阱

**变体题**：把第6行改成`#define BIT_31 (1U << 31)`，输出是什么？

---

# 完成情况

**Level 1 整型类型和溢出 8道题已完成**

覆盖知识点：
- ✅ uint8_t/uint16_t/uint32_t/int8_t范围
- ✅ 溢出行为（255+1=0）
- ✅ 有符号和无符号比较陷阱
- ✅ 类型转换截断
- ✅ 隐式类型提升
- ✅ sizeof各种类型
- ✅ 场景：传感器数据类型选择、协议字段解析
