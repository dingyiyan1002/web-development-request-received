# Level 1 - 数组（8道题）

---

## 题号：041

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：数组初始化与访问
- **知识标签**：数组初始化、下标访问、内存布局
- **嵌入式场景**：传感器数据缓冲，采样数组
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define SAMPLE_COUNT  4
 5 |
 6 | int main(void)
 7 | {
 8 |     uint16_t samples[SAMPLE_COUNT] = {100, 200, 300, 400};
 9 |
10 |     printf("samples[0] = %u\n", samples[0]);
11 |     printf("samples[3] = %u\n", samples[3]);
12 |     printf("Size: %zu bytes\n", sizeof(samples));
13 |
14 |     return 0;
15 | }
```

### 提示
数组下标从0开始，sizeof(数组)得到整个数组大小。

### 内存图
```
数组内存布局:
  samples[0]: 100  (地址 0x1000, 2字节)
  samples[1]: 200  (地址 0x1002, 2字节)
  samples[2]: 300  (地址 0x1004, 2字节)
  samples[3]: 400  (地址 0x1006, 2字节)

sizeof(samples) = 4 * 2 = 8 bytes
```

### 逐行解析
- 第4行：数组长度宏定义
- 第8行：定义并初始化数组
- 第10行：访问第一个元素，下标0
- 第11行：访问最后一个元素，下标3
- 🔥 第12行：sizeof得到整个数组大小8字节

### 嵌入式Linux实战说明
**工作场景**：传感器采样数据存储，固定大小的数据缓冲。

**数组要点**：
- 下标从0开始
- 内存连续存储
- sizeof得到整个数组大小

**面试问法**：数组下标越界会发生什么？

### 易错点+变体题
**易错点**：
- 下标从1开始算
- 越界访问
- sizeof用于指针

**变体题**：把SAMPLE_COUNT改成5，sizeof(samples)是多少？

---

## 题号：042

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：部分初始化
- **知识标签**：部分初始化、零初始化、数组初始化
- **嵌入式场景**：缓冲区初始化，默认值
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BUF_SIZE  5
 5 |
 6 | int main(void)
 7 | {
 8 |     uint16_t buffer[BUF_SIZE] = {100, 200};
 9 |
10 |     for (uint8_t i = 0; i < BUF_SIZE; i++) {
11 |         printf("buffer[%u] = %u\n", i, buffer[i]);
12 |     }
13 |
14 |     return 0;
15 | }
```

### 提示
部分初始化时，未指定的元素自动初始化为0。

### 内存图
```
数组初始化:
  buffer[0] = 100  (指定)
  buffer[1] = 200  (指定)
  buffer[2] = 0    (自动初始化)
  buffer[3] = 0    (自动初始化)
  buffer[4] = 0    (自动初始化)
```

### 逐行解析
- 第4行：缓冲区大小
- 第8行：只初始化前2个元素
- 🔥 第8行：剩余元素自动初始化为0
- 第10-12行：遍历打印所有元素

### 嵌入式Linux实战说明
**工作场景**：缓冲区初始化，部分数据预设，其余清零。

**初始化规则**：
- 完全不初始化：值不确定
- 部分初始化：剩余为0
- 全零初始化：{0}

**面试问法**：uint16_t buffer[5]; 和 uint16_t buffer[5] = {0}; 有什么区别？

### 易错点+变体题
**易错点**：
- 以为未初始化元素是随机值
- 忘记初始化
- 初始化列表过长

**变体题**：把{100, 200}改成{0}，输出是什么？

---

## 题号：043

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：数组求最大值
- **知识标签**：数组遍历、最值查找、算法
- **嵌入式场景**：传感器峰值检测，数据统计
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DATA_LEN  6
 5 |
 6 | int main(void)
 7 | {
 8 |     uint16_t data[DATA_LEN] = {150, 320, 80, 450, 200, 380};
 9 |     uint16_t max_value = data[0];
10 |     uint8_t max_index = 0;
11 |
12 |     for (uint8_t i = 1; i < DATA_LEN; i++) {
13 |         if (data[i] > max_value) {
14 |             max_value = data[i];
15 |             max_index = i;
16 |         }
17 |     }
18 |
19 |     printf("Max: %u at index %u\n", max_value, max_index);
20 |     return 0;
21 | }
```

### 提示
从第一个元素开始，逐个比较更新最大值。

### 内存图
```
查找过程:
  data = {150, 320, 80, 450, 200, 380}
  
  i=1: 320 > 150, max=320, index=1
  i=2: 80 < 320, 不更新
  i=3: 450 > 320, max=450, index=3
  i=4: 200 < 450, 不更新
  i=5: 380 < 450, 不更新

结果: max=450, index=3
```

### 逐行解析
- 第8行：数据数组
- 第9行：初始最大值为第一个元素
- 第10行：记录最大值索引
- 🔥 第12-17行：遍历比较，更新最大值
- 第19行：打印结果

### 嵌入式Linux实战说明
**工作场景**：传感器峰值检测、数据统计、阈值判断。

**查找算法**：
- 初始值设为第一个元素
- 遍历比较更新
- 记录位置信息

**面试问法**：如何同时找到最大值和最小值？

### 易错点+变体题
**易错点**：
- 初始值设为0（如果所有元素都是负数就错了）
- 索引记录错误
- 边界处理

**变体题**：把450改成100，最大值是多少？索引是多少？

---

## 题号：044

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：字符数组与字符串
- **知识标签**：字符数组、字符串、\0结尾
- **嵌入式场景**：设备名称，命令字符串
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define NAME_LEN  10
 5 |
 6 | int main(void)
 7 | {
 8 |     char device_name[NAME_LEN] = "Sensor";
 9 |
10 |     printf("Name: %s\n", device_name);
11 |     printf("Length: %zu\n", sizeof(device_name));
12 |     printf("Strlen: %zu\n", strlen(device_name));
13 |
14 |     return 0;
15 | }
```

### 提示
字符串以\0结尾，sizeof得到数组大小，strlen得到字符串长度。

### 内存图
```
字符数组内存:
  device_name[0] = 'S'
  device_name[1] = 'e'
  device_name[2] = 'n'
  device_name[3] = 's'
  device_name[4] = 'o'
  device_name[5] = 'r'
  device_name[6] = '\0'  (字符串结尾)
  device_name[7] = '\0'  (未使用)
  device_name[8] = '\0'  (未使用)
  device_name[9] = '\0'  (未使用)

sizeof = 10 (数组大小)
strlen = 6 (字符串长度，不含\0)
```

### 逐行解析
- 第4行：数组长度
- 第8行：字符串初始化，自动添加\0
- 第10行：%s打印字符串
- 🔥 第11行：sizeof得到数组大小10
- 🔥 第12行：strlen得到字符串长度6

### 嵌入式Linux实战说明
**工作场景**：设备名称、命令字符串、日志信息。注意区分sizeof和strlen。

**字符串要点**：
- 以\0结尾
- sizeof包含\0
- strlen不包含\0

**面试问法**：sizeof和strlen有什么区别？

### 易错点+变体题
**易错点**：
- 混淆sizeof和strlen
- 忘记\0占用空间
- 数组大小不够

**变体题**：把"Sensor"改成"Sensor01"，strlen是多少？

---

## 题号：045

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：二维数组基础
- **知识标签**：二维数组、行优先、内存布局
- **嵌入式场景**：矩阵数据，图像像素
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define ROWS  2
 5 | #define COLS  3
 6 |
 7 | int main(void)
 8 | {
 9 |     uint8_t matrix[ROWS][COLS] = {
10 |         {1, 2, 3},
11 |         {4, 5, 6}
12 |     };
13 |
14 |     printf("matrix[0][0] = %u\n", matrix[0][0]);
15 |     printf("matrix[1][2] = %u\n", matrix[1][2]);
16 |     printf("Size: %zu bytes\n", sizeof(matrix));
17 |
18 |     return 0;
19 | }
```

### 提示
二维数组按行优先存储，matrix[i][j]访问第i行第j列。

### 内存图
```
二维数组内存布局（行优先）:
  matrix[0][0] = 1  (地址 0x1000)
  matrix[0][1] = 2  (地址 0x1001)
  matrix[0][2] = 3  (地址 0x1002)
  matrix[1][0] = 4  (地址 0x1003)
  matrix[1][1] = 5  (地址 0x1004)
  matrix[1][2] = 6  (地址 0x1005)

sizeof = 2 * 3 * 1 = 6 bytes
```

### 逐行解析
- 第4-5行：行列数定义
- 第9-12行：二维数组初始化
- 第14行：访问第一行第一列，值1
- 第15行：访问第二行第三列，值6
- 🔥 第16行：sizeof得到整个数组大小6字节

### 嵌入式Linux实战说明
**工作场景**：图像像素矩阵、传感器阵列、查找表。

**二维数组要点**：
- 行优先存储
- 下标[row][col]
- 内存连续

**面试问法**：二维数组在内存中如何存储？

### 易错点+变体题
**易错点**：
- 行列索引混淆
- 越界访问
- 初始化格式错误

**变体题**：把matrix[1][2]改成matrix[2][1]，会发生什么？

---

## 题号：046

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：数组作为函数参数
- **知识标签**：数组参数、指针传递、长度传递
- **嵌入式场景**：数据处理函数，缓冲区操作
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BUF_SIZE  5
 5 |
 6 | void double_values(uint8_t arr[], uint8_t len)
 7 | {
 8 |     for (uint8_t i = 0; i < len; i++) {
 9 |         arr[i] *= 2;
10 |     }
11 | }
12 |
13 | int main(void)
14 | {
15 |     uint8_t data[BUF_SIZE] = {1, 2, 3, 4, 5};
16 |
17 |     printf("Before: ");
18 |     for (uint8_t i = 0; i < BUF_SIZE; i++) {
19 |         printf("%u ", data[i]);
20 |     }
21 |     printf("\n");
22 |
23 |     double_values(data, BUF_SIZE);
24 |
25 |     printf("After: ");
26 |     for (uint8_t i = 0; i < BUF_SIZE; i++) {
27 |         printf("%u ", data[i]);
28 |     }
29 |     printf("\n");
30 |
31 |     return 0;
32 | }
```

### 提示
数组传参时传递的是指针，函数内修改会影响原数组。

### 内存图
```
函数调用:
  main: data = {1, 2, 3, 4, 5}
  
  double_values(data, 5):
    arr指向data的首地址
    arr[0] *= 2 → data[0] = 2
    arr[1] *= 2 → data[1] = 4
    ...
  
  main: data = {2, 4, 6, 8, 10} (被修改了)
```

### 逐行解析
- 第6行：数组参数等价于指针
- 第8-10行：修改数组元素
- 第15行：定义数组
- 第17-21行：打印修改前的值
- 🔥 第23行：传递数组（实际传指针）
- 第25-29行：打印修改后的值

### 嵌入式Linux实战说明
**工作场景**：数据处理函数，通过数组参数修改数据。

**数组传参规则**：
- 数组退化为指针
- 函数内修改影响原数组
- 必须传递长度

**面试问法**：为什么数组参数会修改原数组？

### 易错点+变体题
**易错点**：
- 以为函数内修改不影响原数组
- 忘记传长度
- 在函数内用sizeof

**变体题**：把double_values中的arr[i] *= 2改成arr[i] += 1，输出是什么？

---

## 题号：047

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：数组元素交换
- **知识标签**：数组操作、交换、临时变量
- **嵌入式场景**：数据排序，缓冲区交换
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BUF_SIZE  5
 5 |
 6 | void swap_elements(uint8_t arr[], uint8_t i, uint8_t j)
 7 | {
 8 |     uint8_t temp = arr[i];
 9 |     arr[i] = arr[j];
10 |     arr[j] = temp;
11 | }
12 |
13 | int main(void)
14 | {
15 |     uint8_t data[BUF_SIZE] = {10, 20, 30, 40, 50};
16 |
17 |     printf("Before: ");
18 |     for (uint8_t i = 0; i < BUF_SIZE; i++) {
19 |         printf("%u ", data[i]);
20 |     }
21 |     printf("\n");
22:
23 |     swap_elements(data, 1, 3);
24:
25 |     printf("After: ");
26 |     for (uint8_t i = 0; i < BUF_SIZE; i++) {
27 |         printf("%u ", data[i]);
28 |     }
29 |     printf("\n");
30:
31 |     return 0;
32 | }
```

### 提示
交换两个元素需要临时变量，分三步完成。

### 内存图
```
交换过程:
  交换 data[1] 和 data[3]
  
  初始: data = {10, 20, 30, 40, 50}
  
  temp = data[1] = 20
  data[1] = data[3] = 40
  data[3] = temp = 20
  
  结果: data = {10, 40, 30, 20, 50}
```

### 逐行解析
- 第6-11行：交换函数
- 第8行：保存第一个值
- 第9行：用第二个值覆盖第一个
- 第10行：用保存的值覆盖第二个
- 第15行：定义数组
- 🔥 第23行：交换索引1和3的元素
- 第25-29行：打印交换后的结果

### 嵌入式Linux实战说明
**工作场景**：排序算法、数据重排、缓冲区交换。

**交换三步骤**：
1. 保存第一个值
2. 用第二个值覆盖第一个
3. 用保存的值覆盖第二个

**面试问法**：如何不使用临时变量交换两个数？

### 易错点+变体题
**易错点**：
- 忘记临时变量
- 交换顺序错误
- 索引越界

**变体题**：把swap_elements(data, 1, 3)改成swap_elements(data, 0, 4)，输出是什么？

---

## 题号：048

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：数组元素查找与计数
- **知识标签**：查找、计数、遍历
- **嵌入式场景**：数据统计，特定值检测
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define DATA_LEN  8
 5 |
 6 | int main(void)
 7 | {
 8 |     uint8_t data[DATA_LEN] = {5, 3, 5, 8, 5, 2, 8, 5};
 9 |     uint8_t target = 5;
10 |     uint8_t count = 0;
11 |     int8_t first_index = -1;
12 |
13 |     for (uint8_t i = 0; i < DATA_LEN; i++) {
14 |         if (data[i] == target) {
15 |             if (first_index == -1) {
16 |                 first_index = i;
17 |             }
18 |             count++;
19 |         }
20 |     }
21 |
22 |     printf("Target %u appears %u times\n", target, count);
23 |     printf("First appearance at index %d\n", first_index);
24 |     return 0;
25 | }
```

### 提示
遍历数组，统计目标值出现次数，记录首次出现位置。

### 内存图
```
查找过程:
  data = {5, 3, 5, 8, 5, 2, 8, 5}
  target = 5
  
  i=0: data[0]=5 == 5, first_index=0, count=1
  i=1: data[1]=3 != 5
  i=2: data[2]=5 == 5, count=2
  i=3: data[3]=8 != 5
  i=4: data[4]=5 == 5, count=3
  i=5: data[5]=2 != 5
  i=6: data[6]=8 != 5
  i=7: data[7]=5 == 5, count=4

结果: count=4, first_index=0
```

### 逐行解析
- 第8行：数据数组
- 第9行：目标值
- 第10行：计数器
- 第11行：首次出现索引，-1表示未找到
- 第13-20行：遍历查找
- 🔥 第15-17行：记录首次出现位置
- 第18行：计数递增
- 第22-23行：打印结果

### 嵌入式Linux实战说明
**工作场景**：数据统计、异常检测、频率分析。

**查找统计要点**：
- 记录首次位置
- 统计出现次数
- 处理未找到情况

**面试问法**：如何找到最后一次出现的位置？

### 易错点+变体题
**易错点**：
- 忘记处理未找到情况
- 首次位置记录错误
- 计数器未初始化

**变体题**：把target改成8，count和first_index分别是多少？

---

# 完成情况

**Level 1 数组 8道题已完成**

覆盖知识点：
- ✅ 数组初始化和访问
- ✅ 部分初始化（剩余为0）
- ✅ 数组做函数参数
- ✅ 字符数组和字符串
- ✅ 数组遍历求和/求最大
- ✅ 二维数组基本
- ✅ 场景：数据缓冲区、采样数组、查找表
