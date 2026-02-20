# Level 1 - 循环（8道题）

---

## 题号：025

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：for循环遍历数组求和
- **知识标签**：for循环、数组遍历、sizeof
- **嵌入式场景**：传感器数据平均计算，数组统计
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define SAMPLE_COUNT  5
 5 |
 6 | int main(void)
 7 | {
 8 |     uint16_t samples[SAMPLE_COUNT] = {100, 200, 150, 180, 220};
 9 |     uint32_t sum = 0;
10 |     uint8_t count = sizeof(samples) / sizeof(samples[0]);
11 |
12 |     for (uint8_t i = 0; i < count; i++) {
13 |         sum += samples[i];
14 |     }
15 |
16 |     printf("Sum: %lu\n", sum);
17 |     printf("Average: %lu\n", sum / count);
18 |     return 0;
19 | }
```

### 提示
sizeof(数组)/sizeof(元素)计算数组长度。注意%lu用于unsigned long。

### 内存图
```
数组内存布局:
  samples[0]: 100  (地址 0x1000)
  samples[1]: 200  (地址 0x1002)
  samples[2]: 150  (地址 0x1004)
  samples[3]: 180  (地址 0x1006)
  samples[4]: 220  (地址 0x1008)

计算过程:
  count = 10 / 2 = 5
  sum = 100+200+150+180+220 = 850
  average = 850 / 5 = 170
```

### 逐行解析
- 第4行：宏定义采样数量
- 第8行：传感器采样数据数组
- 第9行：累加和用uint32_t防止溢出
- 🔥 第10行：sizeof(数组)/sizeof(元素)计算长度
- 第12-14行：for循环遍历累加
- 第16行：%lu打印unsigned long（sizeof返回size_t）
- 第17行：计算平均值170

### 嵌入式Linux实战说明
**工作场景**：传感器数据处理常用操作。采样、滤波、统计都需要遍历数组。

**sizeof陷阱**：
- 只能用于数组，不能用于指针
- 函数参数中的数组退化为指针
- 建议用宏定义记录数组长度

**面试问法**：sizeof(samples)在函数内部和外部有什么区别？

### 易错点+变体题
**易错点**：
- sizeof用于指针得到指针大小
- 累加和可能溢出
- 整数除法丢失精度

**变体题**：把sum改成uint16_t，结果会怎样？

---

## 题号：026

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：while超时等待
- **知识标签**：while循环、超时处理、状态检测
- **嵌入式场景**：设备就绪等待，超时检测
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MAX_RETRY  5
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t device_ready = 0;
 9 |     uint8_t retry_count = 0;
10 |
11 |     while ((device_ready == 0) && (retry_count < MAX_RETRY)) {
12 |         printf("Waiting... retry %u\n", retry_count + 1);
13 |         retry_count++;
14 |         if (retry_count == 3) {
15 |             device_ready = 1;
16 |         }
17 |     }
18 |
19 |     if (device_ready) {
20 |         printf("Device ready after %u retries\n", retry_count);
21 |     } else {
22 |         printf("Timeout after %u retries\n", retry_count);
23 |     }
24 |     return 0;
25 | }
```

### 提示
while条件包含两个退出条件：设备就绪或超时。

### 内存图
```
循环执行过程:
  初始: device_ready=0, retry_count=0
  
  第1次: 0==0 && 0<5 → true
    打印 "Waiting... retry 1"
    retry_count=1, device_ready=0
  
  第2次: 0==0 && 1<5 → true
    打印 "Waiting... retry 2"
    retry_count=2, device_ready=0
  
  第3次: 0==0 && 2<5 → true
    打印 "Waiting... retry 3"
    retry_count=3, device_ready=1
  
  第4次: 1==0 → false，退出循环
  
  打印 "Device ready after 3 retries"
```

### 逐行解析
- 第4行：最大重试次数
- 第8行：设备就绪标志
- 第9行：重试计数器
- 🔥 第11行：while条件，两个退出条件
- 第12行：打印等待信息
- 第13行：计数器递增
- 第14-16行：模拟第3次后设备就绪
- 第19-23行：判断最终结果

### 嵌入式Linux实战说明
**工作场景**：等待设备初始化、网络连接、数据就绪。必须设置超时，避免无限等待。

**超时等待模式**：
```c
while (!ready && timeout-- > 0) {
    delay_ms(100);
}
```

**面试问法**：为什么要设置超时？不设置会怎样？

### 易错点+变体题
**易错点**：
- 忘记超时条件导致死循环
- 条件顺序错误
- 计数器更新位置错误

**变体题**：把retry_count == 3改成retry_count == 6，输出是什么？

---

## 题号：027

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：do-while输入验证
- **知识标签**：do-while、至少执行一次、输入验证
- **嵌入式场景**：配置参数验证，命令输入检查
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MODE_MIN  1
 5 | #define MODE_MAX  4
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t mode = 0;
10 |     uint8_t attempts = 0;
11 |
12 |     do {
13 |         attempts++;
14 |         if (attempts == 1) {
15 |             mode = 5;
16 |         } else if (attempts == 2) {
17 |             mode = 0;
18 |         } else {
19 |             mode = 2;
20 |         }
21 |         printf("Attempt %u: mode=%u\n", attempts, mode);
22 |     } while (mode < MODE_MIN || mode > MODE_MAX);
23 |
24 |     printf("Valid mode: %u\n", mode);
25 |     return 0;
26 | }
```

### 提示
do-while先执行后判断，至少执行一次。

### 内存图
```
执行过程:
  第1次循环:
    attempts=1, mode=5
    打印 "Attempt 1: mode=5"
    5<1 || 5>4 → true，继续
  
  第2次循环:
    attempts=2, mode=0
    打印 "Attempt 2: mode=0"
    0<1 || 0>4 → true，继续
  
  第3次循环:
    attempts=3, mode=2
    打印 "Attempt 3: mode=2"
    2<1 || 2>4 → false，退出
  
  打印 "Valid mode: 2"
```

### 逐行解析
- 第4-5行：模式范围定义
- 第9行：模式变量
- 第10行：尝试次数
- 🔥 第12行：do-while先执行后判断
- 第14-20行：模拟不同的输入值
- 第21行：打印每次尝试
- 🔥 第22行：条件在循环后判断
- 第24行：打印有效模式

### 嵌入式Linux实战说明
**工作场景**：配置参数验证、用户输入检查。需要至少执行一次检查的场景。

**do-while vs while**：
- do-while：至少执行一次
- while：可能一次都不执行

**适用场景**：
- 输入验证
- 菜单选择
- 初始化重试

**面试问法**：do-while和while有什么区别？什么场景用do-while？

### 易错点+变体题
**易错点**：
- 条件判断位置错误
- 忘记分号
- 死循环风险

**变体题**：把MODE_MAX改成1，会循环几次？

---

## 题号：028

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：break和continue
- **知识标签**：break、continue、循环控制
- **嵌入式场景**：数据过滤，提前退出
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DATA_LEN  8
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t data[DATA_LEN] = {10, 0, 20, 0, 30, 0, 0, 40};
 9 |     uint8_t valid_count = 0;
10 |     uint8_t sum = 0;
11 |
12 |     printf("Valid data: ");
13 |     for (uint8_t i = 0; i < DATA_LEN; i++) {
14 |         if (data[i] == 0) {
15 |             continue;
16 |         }
17 |         if (data[i] == 40) {
18 |             break;
19 |         }
20 |         printf("%u ", data[i]);
21 |         valid_count++;
22 |         sum += data[i];
23 |     }
24 |     printf("\n");
25 |
26 |     printf("Valid count: %u, Sum: %u\n", valid_count, sum);
27 |     return 0;
28 | }
```

### 提示
continue跳过本次循环，break跳出整个循环。

### 内存图
```
循环执行过程:
  i=0: data[0]=10, 有效, 打印10, count=1, sum=10
  i=1: data[1]=0, continue跳过
  i=2: data[2]=20, 有效, 打印20, count=2, sum=30
  i=3: data[3]=0, continue跳过
  i=4: data[4]=30, 有效, 打印30, count=3, sum=60
  i=5: data[5]=0, continue跳过
  i=6: data[6]=0, continue跳过
  i=7: data[7]=40, break退出

输出: "Valid data: 10 20 30 "
结果: valid_count=3, sum=60
```

### 逐行解析
- 第4行：数据长度
- 第8行：数据数组，包含无效值0
- 第13行：for循环遍历
- 🔥 第14-16行：continue跳过无效数据
- 🔥 第17-19行：break遇到40提前退出
- 第20行：打印有效数据
- 第21-22行：统计有效数量和总和

### 嵌入式Linux实战说明
**工作场景**：数据过滤、错误处理、提前退出。处理传感器数据时跳过无效值。

**break vs continue**：
- break：跳出整个循环
- continue：跳过本次，继续下一次

**面试问法**：break和continue有什么区别？分别用在什么场景？

### 易错点+变体题
**易错点**：
- 混淆break和continue
- break只跳出一层循环
- continue位置错误

**变体题**：把break删掉，valid_count和sum是多少？

---

## 题号：029

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：嵌套循环处理二维数据
- **知识标签**：嵌套循环、二维数组、矩阵
- **嵌入式场景**：图像像素处理，矩阵运算
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define ROWS  3
 5 | #define COLS  4
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t matrix[ROWS][COLS] = {
10 |         {1, 2, 3, 4},
11 |         {5, 6, 7, 8},
12 |         {9, 10, 11, 12}
13 |     };
14 |     uint32_t sum = 0;
15 |
16 |     for (uint8_t i = 0; i < ROWS; i++) {
17 |         for (uint8_t j = 0; j < COLS; j++) {
18 |             sum += matrix[i][j];
19 |         }
20 |     }
21 |
22 |     printf("Matrix sum: %u\n", sum);
23 |     printf("Average: %u\n", sum / (ROWS * COLS));
24 |     return 0;
25 | }
```

### 提示
外层循环遍历行，内层循环遍历列。

### 内存图
```
矩阵内存布局（行优先）:
  [0][0]=1  [0][1]=2  [0][2]=3  [0][3]=4
  [1][0]=5  [1][1]=6  [1][2]=7  [1][3]=8
  [2][0]=9  [2][1]=10 [2][2]=11 [2][3]=12

计算过程:
  sum = 1+2+3+4+5+6+7+8+9+10+11+12 = 78
  average = 78 / 12 = 6
```

### 逐行解析
- 第4-5行：矩阵行列数
- 第9-13行：3x4矩阵初始化
- 第14行：累加和
- 🔥 第16行：外层循环遍历行
- 🔥 第17行：内层循环遍历列
- 第18行：累加每个元素
- 第22行：打印总和78
- 第23行：打印平均值6

### 嵌入式Linux实战说明
**工作场景**：图像处理、传感器阵列、查找表。二维数据处理是常见需求。

**嵌套循环要点**：
- 外层循环变量变化慢
- 内层循环变量变化快
- 注意循环变量命名

**面试问法**：如何遍历二维数组？内存中如何存储？

### 易错点+变体题
**易错点**：
- 行列索引混淆
- 循环边界错误
- 内存访问越界

**变体题**：把j < COLS改成j <= COLS，会发生什么？

---

## 题号：030

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：无限循环与退出条件
- **知识标签**：while(1)、无限循环、退出条件
- **嵌入式场景**：嵌入式主循环，事件循环
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define MAX_COUNT  5
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t counter = 0;
 9 |     uint8_t running = 1;
10 |
11 |     while (running) {
12 |         printf("Loop %u\n", counter);
13 |         counter++;
14 |
15 |         if (counter >= MAX_COUNT) {
16 |             printf("Exit condition met\n");
17 |             running = 0;
18 |         }
19 |     }
20 |
21 |     printf("Main loop exited\n");
22 |     return 0;
23 | }
```

### 提示
while(1)或while(running)创建无限循环，通过条件退出。

### 内存图
```
循环执行:
  counter=0: 打印"Loop 0", counter=1
  counter=1: 打印"Loop 1", counter=2
  counter=2: 打印"Loop 2", counter=3
  counter=3: 打印"Loop 3", counter=4
  counter=4: 打印"Loop 4", counter=5
    5>=5 → running=0
  while(0) → 退出循环

输出5次"Loop"，然后退出
```

### 逐行解析
- 第4行：最大循环次数
- 第9行：运行标志
- 🔥 第11行：while(running)控制循环
- 第12行：打印循环计数
- 第13行：计数器递增
- 第15-18行：满足条件时退出
- 第21行：打印退出信息

### 嵌入式Linux实战说明
**工作场景**：嵌入式主程序通常是一个无限循环，处理事件、采集数据、响应命令。

**无限循环模式**：
```c
while (1) {
    process_events();
    if (shutdown_requested) break;
}
```

**退出方式**：
- 条件变量
- break语句
- return语句

**面试问法**：嵌入式主程序为什么要用无限循环？如何优雅退出？

### 易错点+变体题
**易错点**：
- 忘记退出条件导致死循环
- 退出条件永远不满足
- 退出逻辑位置错误

**变体题**：把running = 0改成break，效果一样吗？

---

## 题号：031

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：循环查找
- **知识标签**：线性查找、break、查找算法
- **嵌入式场景**：设备列表查找，数据检索
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DEVICE_COUNT  5
 5 | #define NOT_FOUND    -1
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t device_ids[DEVICE_COUNT] = {0x01, 0x03, 0x05, 0x07, 0x09};
10 |     uint8_t target_id = 0x05;
11 |     int8_t found_index = NOT_FOUND;
12 |
13 |     for (uint8_t i = 0; i < DEVICE_COUNT; i++) {
14 |         if (device_ids[i] == target_id) {
15 |             found_index = i;
16 |             break;
17 |         }
18 |     }
19 |
20 |     if (found_index != NOT_FOUND) {
21 |         printf("Found at index %d\n", found_index);
22 |     } else {
23 |         printf("Not found\n");
24 |     }
25 |     return 0;
26 | }
```

### 提示
线性查找：遍历数组，找到目标后break退出。

### 内存图
```
查找过程:
  device_ids: [0x01][0x03][0x05][0x07][0x09]
               i=0   i=1   i=2   i=3   i=4
  
  i=0: 0x01 != 0x05, 继续
  i=1: 0x03 != 0x05, 继续
  i=2: 0x05 == 0x05, 找到!
    found_index = 2
    break退出

结果: found_index = 2
```

### 逐行解析
- 第4行：设备数量
- 第5行：未找到标志
- 第9行：设备ID数组
- 第10行：目标设备ID
- 第11行：结果索引，初始-1
- 第13-18行：线性查找
- 🔥 第15-16行：找到后记录索引并break
- 第20-24行：判断是否找到

### 嵌入式Linux实战说明
**工作场景**：设备管理、命令表查找、配置检索。线性查找简单但效率低。

**查找优化**：
- 有序数组可用二分查找
- 频繁查找可用哈希表
- 小数组线性查找足够

**面试问法**：线性查找的时间复杂度是多少？如何优化？

### 易错点+变体题
**易错点**：
- 忘记break导致继续查找
- 找到后没有记录位置
- 返回值类型不匹配

**变体题**：把target_id改成0x06，输出是什么？

---

## 题号：032

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：循环计算校验和
- **知识标签**：校验和、循环计算、协议
- **嵌入式场景**：通信协议校验，数据完整性验证
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define FRAME_LEN  6
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t frame[FRAME_LEN] = {0xAA, 0x55, 0x01, 0x02, 0x03, 0x00};
 9 |     uint8_t checksum = 0;
10 |
11 |     for (uint8_t i = 0; i < FRAME_LEN - 1; i++) {
12 |         checksum += frame[i];
13 |     }
14 |
15 |     checksum = (~checksum) + 1;
16 |     frame[FRAME_LEN - 1] = checksum;
17 |
18 |     printf("Checksum: 0x%02X\n", checksum);
19 |     printf("Frame: ");
20 |     for (uint8_t i = 0; i < FRAME_LEN; i++) {
21 |         printf("%02X ", frame[i]);
22 |     }
23 |     printf("\n");
24 |     return 0;
25 | }
```

### 提示
校验和 = ~(累加和) + 1，这是补码校验。

### 内存图
```
校验和计算:
  frame: [0xAA][0x55][0x01][0x02][0x03][0x00]
  
  累加(前5字节):
    0xAA + 0x55 + 0x01 + 0x02 + 0x03
    = 170 + 85 + 1 + 2 + 3
    = 261
    = 0x105 (取低字节 0x05)
  
  补码:
    ~0x05 + 1 = 0xFA + 1 = 0xFB
  
  填入帧尾:
    frame[5] = 0xFB
```

### 逐行解析
- 第4行：帧长度
- 第8行：数据帧，最后一字节为校验位
- 第9行：校验和变量
- 🔥 第11-13行：累加前N-1字节
- 第11行：i < FRAME_LEN - 1，不包括校验位
- 🔥 第15行：取反加1得到补码
- 第16行：填入帧尾
- 第18-23行：打印结果

### 嵌入式Linux实战说明
**工作场景**：通信协议校验，确保数据传输正确。接收方重新计算校验和验证。

**常见校验方式**：
- 累加和校验
- 补码校验
- CRC校验

**面试问法**：为什么要用补码校验？和累加和校验有什么区别？

### 易错点+变体题
**易错点**：
- 校验范围错误
- 忘记取低字节
- 补码计算错误

**变体题**：把帧数据改成{0xAA, 0x55, 0x02, 0x03, 0x04, 0x00}，校验和是多少？

---

# 完成情况

**Level 1 循环 8道题已完成**

覆盖知识点：
- ✅ for/while/do-while
- ✅ break和continue
- ✅ 嵌套循环
- ✅ 循环遍历缓冲区数据
- ✅ 场景：轮询设备状态、遍历数据包、超时等待
