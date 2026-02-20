# Level 1 - 作用域和生命周期（8道题）

---

## 题号：073

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：局部变量作用域
- **知识标签**：局部变量、作用域、代码块
- **嵌入式场景**：函数内变量管理
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     uint8_t value = 10;
 7 |     printf("Outer: %u\n", value);
 8 |
 9 |     {
10 |         uint8_t value = 20;
11 |         printf("Inner: %u\n", value);
12 |     }
13 |
14 |     printf("Outer again: %u\n", value);
15 |
16 |     return 0;
17 | }
```

### 提示
内层代码块可以定义同名变量，遮蔽外层变量。

### 内存图
```
变量作用域:
  外层: value = 10
  
  进入内层代码块:
    创建新的 value = 20 (遮蔽外层)
    打印 20
  
  退出内层代码块:
    内层 value 被销毁
    恢复访问外层 value = 10
```

### 逐行解析
- 第6行：外层变量value=10
- 第7行：打印10
- 第9-12行：内层代码块
- 🔥 第10行：内层变量value=20，遮蔽外层
- 第11行：打印20
- 第14行：打印外层value=10

### 嵌入式Linux实战说明
**工作场景**：避免变量名冲突，但同名变量容易混淆，不建议使用。

**作用域规则**：
- 变量在定义的代码块内有效
- 内层可以遮蔽外层同名变量
- 退出代码块变量销毁

**面试问法**：什么是变量遮蔽？

### 易错点+变体题
**易错点**：
- 同名变量混淆
- 以为修改了外层变量
- 代码块结束后访问内层变量

**变体题**：把内层value改成value2，三个printf分别输出什么？

---

## 题号：074

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：全局变量与局部变量同名
- **知识标签**：全局变量、局部变量、遮蔽
- **嵌入式场景**：模块状态管理
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint8_t counter = 100;  // 全局变量
 5 |
 6 | void increment(void)
 7 | {
 8 |     counter++;
 9 | }
10 |
11 | int main(void)
12 | {
13 |     printf("Global: %u\n", counter);
14 |
15 |     increment();
16 |     printf("After increment: %u\n", counter);
17 |
18 |     uint8_t counter = 0;  // 局部变量遮蔽全局
19 |     printf("Local: %u\n", counter);
20:
21 |     increment();
22 |     printf("After local increment: %u\n", counter);  // 局部没变
23:
24 |     return 0;
25 | }
```

### 提示
局部变量遮蔽全局变量，函数内操作的是全局变量。

### 内存图
```
变量存储:
  全局区: counter = 100 → 101 → 102
  栈区(main): counter = 0 (局部)

执行过程:
  打印全局 counter = 100
  increment(): 全局 counter = 101
  打印全局 counter = 101
  定义局部 counter = 0 (遮蔽全局)
  打印局部 counter = 0
  increment(): 全局 counter = 102
  打印局部 counter = 0 (没变！)
```

### 逐行解析
- 第4行：全局变量counter=100
- 第6-9行：函数操作全局变量
- 第13行：打印全局100
- 第15-16行：全局变成101
- 🔥 第18行：局部变量遮蔽全局
- 第19行：打印局部0
- 第21行：全局变成102
- 第22行：打印局部0（没变！）

### 嵌入式Linux实战说明
**工作场景**：模块状态变量、配置参数。避免同名遮蔽，容易出bug。

**全局vs局部**：
- 全局：所有函数共享
- 局部：函数内有效
- 同名时局部遮蔽全局

**面试问法**：全局变量和局部变量同名时，函数操作哪个？

### 易错点+变体题
**易错点**：
- 以为操作的是全局变量
- 同名导致混淆
- 忘记局部变量遮蔽

**变体题**：把第18行的局部变量改名，第22行打印什么？

---

## 题号：075

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：static全局变量
- **知识标签**：static、文件作用域、内部链接
- **嵌入式场景**：模块私有变量
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | static uint8_t module_state = 0;  // 文件内可见
 5 |
 6 | void set_state(uint8_t state)
 7 | {
 8 |     module_state = state;
 9 | }
10 |
11 | uint8_t get_state(void)
12 | {
13 |     return module_state;
14 | }
15 |
16 | int main(void)
17 | {
18 |     printf("Initial: %u\n", get_state());
19 |
20 |     set_state(5);
21 |     printf("After set: %u\n", get_state());
22:
23 |     // module_state = 10;  // 外部无法直接访问
24:
25 |     return 0;
26 | }
```

### 提示
static全局变量只在当前文件可见，实现封装。

### 内存图
```
static全局变量:
  存储位置: 全局区
  作用域: 当前文件
  生命周期: 程序运行期间

访问控制:
  其他文件无法直接访问 module_state
  只能通过 set_state/get_state 访问
```

### 逐行解析
- 第4行：static全局变量，文件内可见
- 第6-9行：设置状态
- 第11-14行：获取状态
- 第18行：打印初始值0
- 第20-21行：设置并打印5

### 嵌入式Linux实战说明
**工作场景**：模块私有变量、驱动状态、封装实现。

**static全局变量特点**：
- 文件内可见
- 其他文件无法访问
- 实现信息隐藏

**面试问法**：static全局变量和普通全局变量有什么区别？

### 易错点+变体题
**易错点**：
- 以为static全局变量只在函数内有效
- 混淆static全局和static局部
- 多文件访问问题

**变体题**：如果在另一个文件中声明extern uint8_t module_state，能访问吗？

---

## 题号：076

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：static局部变量生命周期
- **知识标签**：static局部、生命周期、状态保持
- **嵌入式场景**：函数调用计数，单例模式
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | void counter_func(void)
 5 | {
 6 |     static uint8_t call_count = 0;
 7 |     call_count++;
 8 |     printf("Call count: %u\n", call_count);
 9 | }
10 |
11 | int main(void)
12 | {
13 |     counter_func();
14 |     counter_func();
15 |     counter_func();
16 |     return 0;
17 | }
```

### 提示
static局部变量只初始化一次，值在函数调用间保持。

### 内存图
```
static局部变量:
  存储位置: 全局区（不是栈）
  初始化: 只在第一次调用时
  生命周期: 程序运行期间

调用过程:
  第1次: call_count=0 → 1, 打印1
  第2次: call_count=1 → 2, 打印2
  第3次: call_count=2 → 3, 打印3
```

### 逐行解析
- 第4-9行：计数函数
- 🔥 第6行：static局部变量，只初始化一次
- 第7行：每次调用递增
- 第13-15行：调用3次

### 嵌入式Linux实战说明
**工作场景**：调用计数、状态保持、延迟初始化。

**static局部变量特点**：
- 只初始化一次
- 值在调用间保持
- 存储在全局区

**面试问法**：static局部变量和普通局部变量有什么区别？

### 易错点+变体题
**易错点**：
- 以为每次调用都初始化
- 多线程访问不安全
- 忘记static的作用

**变体题**：把static删掉，三次调用分别打印什么？

---

## 题号：077

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：函数返回局部变量地址（错误）
- **知识标签**：悬空指针、栈帧、生命周期
- **嵌入式场景**：常见bug，内存安全
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint8_t* get_value(void)
 5 | {
 6 |     uint8_t value = 100;
 7 |     return &value;  // 警告：返回局部变量地址
 8 | }
 9 |
10 | int main(void)
11 | {
12 |     uint8_t *ptr = get_value();
13 |     printf("Value: %u\n", *ptr);  // 未定义行为
14 |
15 |     return 0;
16 | }
```

### 提示
返回局部变量的地址是严重错误，函数返回后栈帧销毁。

### 内存图
```
错误分析:
  get_value()调用:
    栈上分配 value = 100
    返回 &value
  
  函数返回后:
    栈帧被销毁
    value的内存可能被其他数据覆盖
    ptr成为悬空指针
  
  访问*ptr:
    未定义行为
    可能打印100，也可能打印垃圾值
```

### 逐行解析
- 第4-8行：错误函数
- 第6行：局部变量在栈上
- 🔥 第7行：返回局部变量地址，危险！
- 第12行：接收返回的地址
- 第13行：访问悬空指针

### 嵌入式Linux实战说明
**工作场景**：这是常见严重bug！必须避免。

**正确做法**：
```c
// 方法1：返回值而非地址
uint8_t get_value(void) {
    return 100;
}

// 方法2：使用static
uint8_t* get_value(void) {
    static uint8_t value = 100;
    return &value;
}

// 方法3：动态分配
uint8_t* get_value(void) {
    return malloc(sizeof(uint8_t));
}
```

**面试问法**：为什么不能返回局部变量的地址？

### 易错点+变体题
**易错点**：
- 返回局部变量地址
- 忘记栈帧生命周期
- 悬空指针

**变体题**：把value改成static，这段代码安全吗？

---

## 题号：078

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：变量初始化时机
- **知识标签**：初始化、未初始化、随机值
- **嵌入式场景**：变量初始化规范
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | uint8_t global_var;      // 自动初始化为0
 5 | static uint8_t static_var; // 自动初始化为0
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t local_var;   // 未初始化，值不确定
10 |
11 |     printf("Global: %u\n", global_var);
12 |     printf("Static: %u\n", static_var);
13 |     printf("Local: %u\n", local_var);  // 可能是任意值
14:
15 |     return 0;
16 | }
```

### 提示
全局变量和static变量自动初始化为0，局部变量不自动初始化。

### 内存图
```
变量初始化:
  全局区:
    global_var = 0 (自动初始化)
    static_var = 0 (自动初始化)
  
  栈区:
    local_var = ? (未初始化，值不确定)
    可能是0，也可能是栈上的残留数据
```

### 逐行解析
- 第4行：全局变量，自动初始化为0
- 第5行：static变量，自动初始化为0
- 第9行：局部变量，未初始化
- 第11行：打印0
- 第12行：打印0
- 🔥 第13行：打印不确定值

### 嵌入式Linux实战说明
**工作场景**：变量必须初始化，避免未定义行为。

**初始化规则**：
- 全局变量：自动初始化为0
- static变量：自动初始化为0
- 局部变量：不自动初始化

**最佳实践**：
```c
uint8_t local_var = 0;  // 总是显式初始化
```

**面试问法**：全局变量和局部变量的初始值分别是什么？

### 易错点+变体题
**易错点**：
- 以为局部变量自动初始化为0
- 使用未初始化的变量
- 调试时碰巧是0，发布时出问题

**变体题**：把local_var初始化为0，输出是什么？

---

## 题号：079

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：extern声明外部变量
- **知识标签**：extern、外部变量、多文件
- **嵌入式场景**：模块间共享变量
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | // 模拟另一个文件中定义的变量
 5 | uint8_t shared_config = 42;
 6 |
 7 | void print_config(void)
 8 | {
 9 |     // 声明使用外部变量
10 |     extern uint8_t shared_config;
11 |     printf("Config: %u\n", shared_config);
12 | }
13 |
14 | int main(void)
15 | {
16 |     printf("Main: %u\n", shared_config);
17 |     print_config();
18:
19 |     shared_config = 100;
20 |     print_config();
21:
22 |     return 0;
23 | }
```

### 提示
extern声明变量在其他地方定义，用于多文件共享。

### 内存图
```
extern使用:
  全局区: shared_config = 42 → 100
  
  main函数:
    直接访问 shared_config
  
  print_config函数:
    extern声明，访问同一个 shared_config
```

### 逐行解析
- 第5行：变量定义（模拟其他文件）
- 第10行：extern声明，表示变量在其他地方定义
- 第11行：访问共享变量
- 第16行：main中直接访问
- 第19行：修改共享变量
- 第20行：打印修改后的值

### 嵌入式Linux实战说明
**工作场景**：多文件共享配置、状态变量。

**extern使用规范**：
- 在头文件中声明extern
- 在一个源文件中定义
- 其他源文件包含头文件

**头文件示例**：
```c
// config.h
extern uint8_t shared_config;

// config.c
uint8_t shared_config = 42;
```

**面试问法**：extern有什么作用？

### 易错点+变体题
**易错点**：
- extern声明和定义混淆
- 多处定义导致链接错误
- 忘记包含头文件

**变体题**：把第5行删掉，会发生什么？

---

## 题号：080

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：volatile关键字
- **知识标签**：volatile、硬件寄存器、优化
- **嵌入式场景**：硬件寄存器访问，多线程共享
- **面试频率**：极高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | // 模拟硬件寄存器
 5 | volatile uint8_t *const GPIO_REG = (uint8_t *)0x40020000;
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t status = 0;
10 |
11 |     // 等待寄存器变化
12 |     while (*GPIO_REG == 0) {
13 |         // 等待硬件更新寄存器
14 |     }
15 |
16 |     status = *GPIO_REG;
17 |     printf("Status: %u\n", status);
18:
19 |     return 0;
20 | }
```

### 提示
volatile告诉编译器不要优化对变量的访问，每次都从内存读取。

### 内存图
```
volatile作用:
  不使用volatile:
    编译器可能优化为只读取一次
    while循环可能变成死循环
  
  使用volatile:
    每次循环都从内存读取
    能正确检测硬件寄存器变化

volatile适用场景:
  1. 硬件寄存器
  2. 多线程共享变量
  3. 中断服务程序修改的变量
```

### 逐行解析
- 第5行：volatile指针，指向硬件寄存器
- 第12行：每次都从地址读取
- 第16行：读取寄存器值

### 嵌入式Linux实战说明
**工作场景**：硬件寄存器、中断标志、多线程共享变量。

**volatile作用**：
- 禁止编译器优化
- 每次都从内存读取
- 确保访问顺序

**常见用法**：
```c
volatile uint8_t *reg = (volatile uint8_t *)0x40020000;
volatile uint8_t interrupt_flag = 0;
```

**面试问法**：volatile有什么作用？什么场景使用？

### 易错点+变体题
**易错点**：
- 忘记volatile导致优化问题
- 滥用volatile
- volatile不保证原子性

**变体题**：把volatile删掉，编译器可能如何优化while循环？

---

# 完成情况

**Level 1 作用域和生命周期 8道题已完成**

覆盖知识点：
- ✅ 局部变量作用域和遮蔽
- ✅ 全局变量vs局部变量
- ✅ static全局变量（文件作用域）
- ✅ static局部变量（生命周期延长）
- ✅ 悬空指针（返回局部变量地址）
- ✅ 变量初始化规则
- ✅ extern声明
- ✅ volatile关键字
- ✅ 场景：模块封装、硬件寄存器、状态管理
