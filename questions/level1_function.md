# Level 1 - 函数（8道题）

---

## 题号：033

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：函数调用与返回值
- **知识标签**：函数调用、返回值、错误码
- **嵌入式场景**：设备初始化函数，错误处理
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define SUCCESS  0
 5 | #define ERR_PARAM_INVALID  -1
 6 | #define ERR_DEVICE_BUSY    -2
 7 |
 8 | int32_t uart_init(uint32_t baud_rate, uint8_t data_bits)
 9 | {
10 |     if (baud_rate == 0) {
11 |         return ERR_PARAM_INVALID;
12 |     }
13 |     if (data_bits < 5 || data_bits > 8) {
14 |         return ERR_PARAM_INVALID;
15 |     }
16 |     printf("UART init: baud=%lu, bits=%u\n", baud_rate, data_bits);
17 |     return SUCCESS;
18 | }
19 |
20 | int main(void)
21 | {
22 |     int32_t ret = uart_init(115200, 8);
23 |     if (ret != SUCCESS) {
24 |         printf("Init failed: %d\n", ret);
25 |         return -1;
26 |     }
27 |     printf("Init success\n");
28 |     return 0;
29 | }
```

### 提示
函数返回0表示成功，负数表示错误。调用后必须检查返回值。

### 内存图
```
函数调用流程:
  main() → uart_init(115200, 8)
  
  uart_init内部:
    baud_rate = 115200 (非零，通过)
    data_bits = 8 (5-8范围内，通过)
    打印 "UART init: baud=115200, bits=8"
    return SUCCESS (0)
  
  main继续:
    ret = 0
    ret == SUCCESS
    打印 "Init success"
```

### 逐行解析
- 第4-6行：宏定义返回码
- 第8行：函数返回int32_t，可返回负数错误码
- 第10-12行：参数检查，波特率不能为0
- 第13-15行：数据位范围检查
- 第16行：打印初始化参数
- 第17行：返回成功
- 🔥 第22行：调用函数并保存返回值
- 🔥 第23行：检查返回值

### 嵌入式Linux实战说明
**工作场景**：驱动初始化函数的标准写法。参数检查+执行操作+返回状态。

**返回值规范**：
- 0：成功
- 负数：错误码
- 正数：有时表示实际数量

**面试问法**：为什么要检查函数返回值？不检查会怎样？

### 易错点+变体题
**易错点**：
- 忘记检查返回值
- 错误码定义混乱
- 参数检查不完整

**变体题**：把uart_init(115200, 8)改成uart_init(0, 8)，输出是什么？

---

## 题号：034

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：参数传值不会修改原变量
- **知识标签**：传值、形参实参、函数参数
- **嵌入式场景**：理解函数参数传递机制
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | void try_modify(uint8_t value)
 5 | {
 6 |     printf("Inside: value=%u\n", value);
 7 |     value = 100;
 8 |     printf("Inside after: value=%u\n", value);
 9 | }
10 |
11 | int main(void)
12 | {
13 |     uint8_t counter = 10;
14 |
15 |     printf("Before: counter=%u\n", counter);
16 |     try_modify(counter);
17 |     printf("After: counter=%u\n", counter);
18 |
19 |     return 0;
20 | }
```

### 提示
C语言函数参数是值传递，函数内修改不影响原变量。

### 内存图
```
传值过程:
  main中: counter = 10
  
  调用try_modify(counter):
    创建形参value，复制counter的值
    value = 10 (counter的副本)
  
  函数内修改:
    value = 100 (只修改了副本)
  
  函数返回:
    value被销毁
    counter仍然是10
```

### 逐行解析
- 第4行：函数接收uint8_t值
- 第6行：打印传入的值10
- 第7行：修改形参value为100
- 第8行：打印修改后的值100
- 第13行：main中counter=10
- 第15行：打印"Before: counter=10"
- 🔥 第16行：调用函数，传入counter的副本
- 第17行：打印"After: counter=10"（没变！）

### 嵌入式Linux实战说明
**工作场景**：理解传值机制避免bug。要修改原变量必须传指针。

**传值 vs 传指针**：
```c
void modify_value(uint8_t val);      // 传值，不能修改原变量
void modify_value(uint8_t *ptr);     // 传指针，可以修改原变量
```

**面试问法**：如何让函数修改调用者的变量？

### 易错点+变体题
**易错点**：
- 以为函数内修改会影响原变量
- 混淆传值和传指针
- 忘记传指针

**变体题**：把参数改成uint8_t *value，调用改成try_modify(&counter)，输出是什么？

---

## 题号：035

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：函数嵌套调用
- **知识标签**：函数嵌套、调用栈、返回值传递
- **嵌入式场景**：模块化设计，函数分层
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint16_t adc_read(void)
 5 | {
 6 |     return 2048;
 7 | }
8 |
 9 | uint16_t adc_to_voltage(uint16_t adc_value)
10 | {
11 |     return (adc_value * 3300) / 4095;
12 | }
13 |
14 | int main(void)
15 | {
16 |     uint16_t voltage = adc_to_voltage(adc_read());
17 |     printf("Voltage: %u mV\n", voltage);
18 |     return 0;
19 | }
```

### 提示
函数可以嵌套调用，内层函数的返回值作为外层函数的参数。

### 内存图
```
调用过程:
  main() → adc_to_voltage(adc_read())
  
  先执行内层:
    adc_read() → return 2048
  
  再执行外层:
    adc_to_voltage(2048)
    return (2048 * 3300) / 4095
    = 6758400 / 4095
    = 1650
  
  main继续:
    voltage = 1650
    打印 "Voltage: 1650 mV"
```

### 逐行解析
- 第4-7行：ADC读取函数，返回模拟值
- 第9-12行：ADC值转电压，12位ADC满量程3300mV
- 🔥 第16行：嵌套调用，adc_read()的返回值传给adc_to_voltage
- 第16行：计算2048*3300/4095=1650
- 第17行：打印电压值

### 嵌入式Linux实战说明
**工作场景**：模块化设计，底层函数被上层函数调用。ADC读取→数据转换→业务处理。

**嵌套调用优点**：
- 代码简洁
- 模块化清晰
- 避免中间变量

**面试问法**：函数嵌套调用时，执行顺序是怎样的？

### 易错点+变体题
**易错点**：
- 执行顺序理解错误
- 返回值类型不匹配
- 中间结果溢出

**变体题**：把adc_read()的返回值改成4095，voltage是多少？

---

## 题号：036

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：全局变量与局部变量
- **知识标签**：全局变量、局部变量、作用域
- **嵌入式场景**：模块状态管理，全局配置
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint32_t g_device_status = 0;
 5 |
 6 | void set_status(uint32_t status)
 7 | {
 8 |     g_device_status = status;
 9 | }
10 |
11 | int main(void)
12 | {
13 |     uint32_t local_status = 100;
14 |
15 |     printf("Global: %lu\n", g_device_status);
16 |     set_status(50);
17 |     printf("Global after set: %lu\n", g_device_status);
18 |
19 |     {
20 |         uint32_t local_status = 200;
21 |         printf("Inner local: %lu\n", local_status);
22 |     }
23 |
24 |     printf("Outer local: %lu\n", local_status);
25 |     return 0;
26 | }
```

### 提示
全局变量所有函数共享，局部变量只在定义的作用域内有效。

### 内存图
```
变量存储:
  全局区: g_device_status = 0 → 50
  栈区(main): local_status = 100
  栈区(代码块): local_status = 200 (遮蔽外层)

执行过程:
  打印 g_device_status = 0
  set_status(50) → g_device_status = 50
  打印 g_device_status = 50
  代码块内 local_status = 200 (遮蔽)
  打印 local_status = 200
  代码块外 local_status = 100 (恢复)
```

### 逐行解析
- 第4行：全局变量，所有函数可访问
- 第6-9行：函数修改全局变量
- 第13行：main的局部变量
- 第15行：打印全局变量0
- 第16行：设置全局变量为50
- 第17行：打印全局变量50
- 🔥 第19-22行：代码块内定义同名变量，遮蔽外层
- 第21行：打印内层局部变量200
- 第24行：打印外层局部变量100

### 嵌入式Linux实战说明
**工作场景**：设备状态、配置参数常用全局变量。但要注意线程安全。

**全局变量特点**：
- 所有函数共享
- 程序启动时初始化
- 需要考虑并发访问

**面试问法**：全局变量和局部变量有什么区别？什么时候用全局变量？

### 易错点+变体题
**易错点**：
- 同名变量遮蔽
- 全局变量命名冲突
- 忘记初始化

**变体题**：把代码块内的local_status改名，外层打印的值是多少？

---

## 题号：037

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：static局部变量
- **知识标签**：static、状态保持、调用计数
- **嵌入式场景**：函数调用计数，状态保持
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | void log_message(const char *msg)
 5 | {
 6 |     static uint32_t call_count = 0;
 7 |     call_count++;
 8 |     printf("[%lu] %s\n", call_count, msg);
 9 | }
10 |
11 | int main(void)
12 | {
13 |     log_message("System init");
14 |     log_message("Device ready");
15 |     log_message("Start working");
16 |     return 0;
17 | }
```

### 提示
static局部变量只初始化一次，值在函数调用间保持。

### 内存图
```
static变量生命周期:
  程序启动时分配内存，初始化为0
  函数每次调用使用同一个变量
  
调用过程:
  第1次: call_count=0 → 1, 打印 "[1] System init"
  第2次: call_count=1 → 2, 打印 "[2] Device ready"
  第3次: call_count=2 → 3, 打印 "[3] Start working"
```

### 逐行解析
- 第4行：日志函数
- 🔥 第6行：static局部变量，只初始化一次
- 第7行：每次调用递增
- 第8行：打印调用次数和消息
- 第13-15行：调用3次
- 输出显示递增的计数

### 嵌入式Linux实战说明
**工作场景**：调用计数、状态保持、单例模式。避免全局变量的替代方案。

**static局部变量特点**：
- 只初始化一次
- 值在调用间保持
- 存储在全局区，不是栈

**面试问法**：static局部变量和普通局部变量有什么区别？

### 易错点+变体题
**易错点**：
- 以为每次调用都初始化
- 多线程访问不安全
- 滥用导致代码难懂

**变体题**：把static删掉，输出是什么？

---

## 题号：038

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：函数参数为数组
- **知识标签**：数组参数、指针传递、数组退化
- **嵌入式场景**：数据处理函数，缓冲区操作
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BUF_SIZE  5
 5 |
 6 | uint16_t calculate_sum(uint8_t data[], uint8_t len)
 7 | {
 8 |     uint16_t sum = 0;
 9 |     for (uint8_t i = 0; i < len; i++) {
10 |         sum += data[i];
11 |     }
12 |     return sum;
13 | }
14 |
15 | int main(void)
16 | {
17 |     uint8_t buffer[BUF_SIZE] = {10, 20, 30, 40, 50};
18 |     uint16_t total = calculate_sum(buffer, BUF_SIZE);
19 |     printf("Sum: %u\n", total);
20 |     return 0;
21 | }
```

### 提示
数组作为参数时退化为指针，必须额外传递长度。

### 内存图
```
函数调用:
  main: buffer = {10, 20, 30, 40, 50}
  
  calculate_sum(buffer, 5):
    data指向buffer首地址
    len = 5
    
    循环累加:
      data[0]=10, data[1]=20, ...
      sum = 10+20+30+40+50 = 150
    
    return 150
  
  main: total = 150
```

### 逐行解析
- 第4行：缓冲区大小
- 第6行：函数参数data[]等价于*data
- 第6行：必须传长度，因为数组退化为指针
- 第9-11行：循环累加
- 第12行：返回总和
- 第17行：定义数组
- 🔥 第18行：传递数组和长度
- 第19行：打印150

### 嵌入式Linux实战说明
**工作场景**：数据处理函数通常接收数组指针+长度。这是C语言的标准模式。

**数组参数规则**：
- 数组参数退化为指针
- sizeof在函数内不工作
- 必须额外传递长度

**面试问法**：为什么数组参数要传长度？sizeof(data)在函数内是多少？

### 易错点+变体题
**易错点**：
- 在函数内用sizeof求数组长度
- 忘记传长度参数
- 长度传错

**变体题**：把BUF_SIZE改成3，输出是什么？

---

## 题号：039

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：递归函数基础
- **知识标签**：递归、基准条件、递归调用
- **嵌入式场景**：目录遍历，树形结构处理
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint32_t factorial(uint8_t n)
 5 | {
 6 |     if (n <= 1) {
 7 |         return 1;
 8 |     }
 9 |     return n * factorial(n - 1);
10 | }
11 |
12 | int main(void)
13 | {
14 |     uint32_t result = factorial(5);
15 | printf("5! = %lu\n", result);
16 |     return 0;
17 | }
```

### 提示
递归必须有基准条件（n<=1时返回1），否则无限递归。

### 内存图
```
递归调用栈:
  factorial(5) → 5 * factorial(4)
    factorial(4) → 4 * factorial(3)
      factorial(3) → 3 * factorial(2)
        factorial(2) → 2 * factorial(1)
          factorial(1) → return 1 (基准条件)
        return 2 * 1 = 2
      return 3 * 2 = 6
    return 4 * 6 = 24
  return 5 * 24 = 120

结果: 5! = 120
```

### 逐行解析
- 第4行：阶乘函数
- 🔥 第6-8行：基准条件，n<=1时返回1
- 🔥 第9行：递归调用，n * factorial(n-1)
- 第14行：计算5的阶乘
- 第15行：打印120

### 嵌入式Linux实战说明
**工作场景**：目录遍历、树形结构、分治算法。嵌入式用得较少，但要理解原理。

**递归要点**：
- 必须有基准条件
- 每次递归要向基准条件靠近
- 注意栈溢出风险

**面试问法**：递归和循环有什么区别？递归有什么风险？

### 易错点+变体题
**易错点**：
- 忘记基准条件导致无限递归
- 递归深度过大导致栈溢出
- 递归方向错误

**变体题**：把factorial(5)改成factorial(0)，输出是什么？

---

## 题号：040

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：函数指针基础
- **知识标签**：函数指针、回调、函数地址
- **嵌入式场景**：回调函数，驱动接口
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | typedef int32_t (*operation_func_t)(int32_t, int32_t);
 5 |
 6 | int32_t add(int32_t a, int32_t b)
 7 | {
 8 |     return a + b;
 9 | }
10 |
11 | int32_t subtract(int32_t a, int32_t b)
12 | {
13 |     return a - b;
14 | }
15 |
16 | int32_t calculate(int32_t x, int32_t y, operation_func_t op)
17 | {
18 |     return op(x, y);
19 | }
20 |
21 | int main(void)
22 | {
23 |     printf("Add: %d\n", calculate(10, 3, add));
24 |     printf("Sub: %d\n", calculate(10, 3, subtract));
25 |     return 0;
26 | }
```

### 提示
函数名就是函数的地址，可以作为参数传递。

### 内存图
```
函数指针调用:
  calculate(10, 3, add):
    op = add (函数地址)
    op(10, 3) = add(10, 3) = 13
  
  calculate(10, 3, subtract):
    op = subtract (函数地址)
    op(10, 3) = subtract(10, 3) = 7
```

### 逐行解析
- 第4行：typedef定义函数指针类型
- 第6-9行：加法函数
- 第11-14行：减法函数
- 第16-19行：接收函数指针作为参数
- 🔥 第18行：通过函数指针调用函数
- 第23行：传入add函数，结果13
- 第24行：传入subtract函数，结果7

### 嵌入式Linux实战说明
**工作场景**：回调函数、驱动接口、命令分发。函数指针实现多态。

**函数指针用途**：
- 回调函数
- 策略模式
- 驱动抽象层

**面试问法**：函数指针有什么用？什么场景使用？

### 易错点+变体题
**易错点**：
- 函数签名不匹配
- 忘记解引用
- 指针为空时调用

**变体题**：添加一个multiply函数，如何调用calculate计算10*3？

---

# 完成情况

**Level 1 函数 8道题已完成**

覆盖知识点：
- ✅ 函数调用和返回值
- ✅ 参数传值（不会改原变量）
- ✅ 函数嵌套调用
- ✅ 全局变量vs局部变量
- ✅ static局部变量（调用计数器）
- ✅ 场景：封装硬件操作函数、初始化函数
