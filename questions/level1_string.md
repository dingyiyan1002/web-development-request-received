# Level 1 - 字符串基础（8道题）

---

## 题号：065

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：strlen字符串长度
- **知识标签**：strlen、字符串长度、\0结尾
- **嵌入式场景**：协议数据长度，命令解析
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | #define MAX_CMD_LEN  32
 6 |
 7 | int main(void)
 8 | {
 9 |     char command[MAX_CMD_LEN] = "AT+RESET";
10 |
11 |     size_t cmd_len = strlen(command);
12 |     size_t buf_size = sizeof(command);
13 |
14 |     printf("Command: %s\n", command);
15 |     printf("Length: %zu\n", cmd_len);
16 |     printf("Buffer size: %zu\n", buf_size);
17 |
18 |     return 0;
19 | }
```

### 提示
strlen返回字符串长度（不含\0），sizeof返回数组大小。

### 内存图
```
字符串内存:
  command = "AT+RESET\0"
  
  内存布局:
    [A][T][+][R][E][S][E][T][\0][未使用...]
  
  strlen = 8 (不含\0)
  sizeof = 32 (整个数组)
```

### 逐行解析
- 第5行：命令缓冲区大小
- 第9行：字符串初始化，自动添加\0
- 🔥 第11行：strlen返回字符串长度8
- 🔥 第12行：sizeof返回数组大小32
- 第14-16行：打印结果

### 嵌入式Linux实战说明
**工作场景**：AT指令处理、协议解析、命令长度检查。

**strlen vs sizeof**：
- strlen：字符串长度，不含\0
- sizeof：数组大小，包含\0

**面试问法**：strlen和sizeof有什么区别？

### 易错点+变体题
**易错点**：
- 混淆strlen和sizeof
- 字符串没有\0结尾
- 缓冲区溢出

**变体题**：把"AT+RESET"改成"AT"，strlen和sizeof分别是多少？

---

## 题号：066

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：strcpy字符串拷贝
- **知识标签**：strcpy、字符串拷贝、缓冲区
- **嵌入式场景**：命令拷贝，数据复制
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | #define BUF_SIZE  16
 6 |
 7 | int main(void)
 8 | {
 9 |     char src[] = "Hello";
10 |     char dest[BUF_SIZE];
11 |
12 |     strcpy(dest, src);
13 |
14 |     printf("Source: %s\n", src);
15 |     printf("Dest: %s\n", dest);
16 |     printf("Dest len: %zu\n", strlen(dest));
17 |
18 |     return 0;
19 | }
```

### 提示
strcpy拷贝字符串，包括\0。目标缓冲区必须足够大。

### 内存图
```
字符串拷贝:
  src = "Hello\0"
  
  strcpy后:
    dest = "Hello\0"
  
  拷贝过程:
    dest[0] = 'H'
    dest[1] = 'e'
    dest[2] = 'l'
    dest[3] = 'l'
    dest[4] = 'o'
    dest[5] = '\0'
```

### 逐行解析
- 第5行：目标缓冲区大小
- 第9行：源字符串
- 第10行：目标缓冲区
- 🔥 第12行：strcpy拷贝字符串，包括\0
- 第14-16行：打印结果

### 嵌入式Linux实战说明
**工作场景**：命令拷贝、日志复制、数据备份。

**strcpy安全使用**：
- 确保目标缓冲区足够大
- 或使用strncpy指定长度
- 或使用snprintf更安全

**面试问法**：strcpy有什么安全隐患？如何避免？

### 易错点+变体题
**易错点**：
- 目标缓冲区太小
- 源字符串没有\0
- 内存重叠

**变体题**：把src改成"Hello World!!!!!"（超过16字符），会发生什么？

---

## 题号：067

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：strcmp字符串比较
- **知识标签**：strcmp、字符串比较、返回值
- **嵌入式场景**：命令匹配，设备ID比较
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | int main(void)
 6 | {
 7 |     char cmd1[] = "START";
 8 |     char cmd2[] = "START";
 9 |     char cmd3[] = "STOP";
10 |     char cmd4[] = "STATUS";
11 |
12 |     printf("cmd1 vs cmd2: %d\n", strcmp(cmd1, cmd2));
13 |     printf("cmd1 vs cmd3: %d\n", strcmp(cmd1, cmd3));
14 |     printf("cmd3 vs cmd1: %d\n", strcmp(cmd3, cmd1));
15 |     printf("cmd1 vs cmd4: %d\n", strcmp(cmd1, cmd4));
16 |
17 |     return 0;
18 | }
```

### 提示
strcmp返回0表示相等，负数表示小于，正数表示大于。

### 内存图
```
字符串比较:
  "START" vs "START": 完全相同 → 0
  "START" vs "STOP":  'T' < 'T', 'A' < 'O' → 负数
  "STOP" vs "START":  'O' > 'A' → 正数
  "START" vs "STATUS": 'T' < 'T', 'A' < 'T' → 负数

返回值:
  相等: 0
  小于: 负数
  大于: 正数
```

### 逐行解析
- 第7-10行：定义四个命令字符串
- 🔥 第12行：相同字符串比较，返回0
- 第13行：START < STOP，返回负数
- 第14行：STOP > START，返回正数
- 第15行：START < STATUS，返回负数

### 嵌入式Linux实战说明
**工作场景**：命令匹配、设备ID验证、协议版本检查。

**strcmp返回值**：
- 0：相等
- <0：第一个字符串小于第二个
- >0：第一个字符串大于第二个

**常用写法**：
```c
if (strcmp(cmd, "START") == 0) {
    // 匹配成功
}
```

**面试问法**：strcmp的返回值是什么意思？

### 易错点+变体题
**易错点**：
- 用==比较字符串（比较的是地址）
- 返回值含义混淆
- 大小写敏感

**变体题**：把cmd1改成"start"（小写），strcmp(cmd1, cmd2)返回什么？

---

## 题号：068

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：strcat字符串拼接
- **知识标签**：strcat、字符串拼接、缓冲区
- **嵌入式场景**：命令构造，日志拼接
- **面试频率**：中

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | #define BUF_SIZE  32
 6 |
 7 | int main(void)
 8 | {
 9 |     char log_msg[BUF_SIZE] = "Sensor: ";
10 |
11 |     strcat(log_msg, "Temp=");
12 |     printf("After strcat 1: %s\n", log_msg);
13 |
14 |     strcat(log_msg, "25C");
15 |     printf("After strcat 2: %s\n", log_msg);
16 |
17 |     return 0;
18 | }
```

### 提示
strcat在字符串末尾追加，目标缓冲区必须足够大。

### 内存图
```
字符串拼接:
  初始: log_msg = "Sensor: \0"
  
  strcat后:
    "Sensor: Temp=\0"
  
  再strcat:
    "Sensor: Temp=25C\0"

最终: "Sensor: Temp=25C"
```

### 逐行解析
- 第5行：缓冲区大小
- 第9行：初始字符串
- 🔥 第11行：追加"Temp="
- 第14行：追加"25C"
- 第12-15行：打印中间结果

### 嵌入式Linux实战说明
**工作场景**：日志构造、命令拼接、URL组装。

**strcat安全使用**：
- 确保目标缓冲区足够大
- 或使用strncat限制长度
- 或使用snprintf更安全

**面试问法**：strcat有什么安全隐患？

### 易错点+变体题
**易错点**：
- 缓冲区溢出
- 目标字符串没有初始化
- 多次拼接忘记空间

**变体题**：把BUF_SIZE改成16，会发生什么？

---

## 题号：069

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：字符数组vs字符指针
- **知识标签**：字符数组、字符指针、字符串常量
- **嵌入式场景**：字符串存储，配置参数
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 | #include <string.h>
 4 |
 5 | int main(void)
 6 | {
 7 |     char str1[] = "Hello";     // 字符数组
 8 |     const char *str2 = "Hello"; // 指向字符串常量
 9 |
10 |     str1[0] = 'h';  // OK，修改数组
11 |     printf("str1: %s\n", str1);
12 |
13 |     // str2[0] = 'h';  // 危险！可能崩溃
14 |     printf("str2: %s\n", str2);
15 |
16 |     printf("sizeof(str1): %zu\n", sizeof(str1));
17 |     printf("sizeof(str2): %zu\n", sizeof(str2));
18 |
19 |     return 0;
20 | }
```

### 提示
字符数组可修改，字符指针指向的字符串常量不可修改。

### 内存图
```
内存布局:
  str1 (栈上):
    ['H']['e']['l']['l']['o']['\0']
    可修改
  
  str2 (指向只读区):
    栈: str2 → 0x4000 (地址)
    只读区: "Hello\0" (不可修改)
  
  sizeof:
    str1: 6 (数组大小)
    str2: 8 (指针大小，64位系统)
```

### 逐行解析
- 第7行：字符数组，存储在栈上，可修改
- 第8行：字符指针，指向字符串常量，不可修改
- 🔥 第10行：修改数组内容，OK
- 第13行：修改字符串常量，危险！
- 第16行：sizeof(str1)=6，数组大小
- 第17行：sizeof(str2)=8，指针大小

### 嵌入式Linux实战说明
**工作场景**：配置字符串、错误信息、命令表。常量字符串用const char*。

**数组 vs 指针**：
- 数组：可修改，sizeof得到大小
- 指针：指向常量不可修改，sizeof得到指针大小

**面试问法**：char[]和char*有什么区别？

### 易错点+变体题
**易错点**：
- 修改字符串常量导致崩溃
- sizeof混淆
- 忘记const

**变体题**：把str1改成char *str1 = "Hello"，str1[0] = 'h'会怎样？

---

## 题号：070

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：手动遍历字符串
- **知识标签**：字符串遍历、指针、\0检测
- **嵌入式场景**：协议解析，数据提取
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     char data[] = "ABC123";
 7 |     uint8_t letter_count = 0;
 8 |     uint8_t digit_count = 0;
 9 |
10 |     char *ptr = data;
11 |     while (*ptr != '\0') {
12 |         if (*ptr >= 'A' && *ptr <= 'Z') {
13 |             letter_count++;
14 |         } else if (*ptr >= '0' && *ptr <= '9') {
15 |             digit_count++;
16 |         }
17 |         ptr++;
18 |     }
19 |
20 |     printf("Letters: %u\n", letter_count);
21 |     printf("Digits: %u\n", digit_count);
22 |     return 0;
23 | }
```

### 提示
用指针遍历字符串，遇到\0结束。

### 内存图
```
字符串遍历:
  data = "ABC123\0"
  
  ptr遍历:
    ptr → 'A': 字母, letter_count=1
    ptr → 'B': 字母, letter_count=2
    ptr → 'C': 字母, letter_count=3
    ptr → '1': 数字, digit_count=1
    ptr → '2': 数字, digit_count=2
    ptr → '3': 数字, digit_count=3
    ptr → '\0': 退出循环

结果: letter_count=3, digit_count=3
```

### 逐行解析
- 第6行：数据字符串
- 第7-8行：计数器
- 第10行：指针指向字符串开头
- 🔥 第11行：循环直到\0
- 第12-13行：检测大写字母
- 第14-16行：检测数字
- 第17行：指针移动到下一个字符

### 嵌入式Linux实战说明
**工作场景**：协议解析、数据验证、命令处理。手动遍历更灵活。

**遍历方式**：
- 指针遍历（本例）
- 下标遍历 data[i]

**面试问法**：如何判断一个字符是数字还是字母？

### 易错点+变体题
**易错点**：
- 忘记检查\0
- 指针越界
- 字符范围判断错误

**变体题**：把data改成"ABC123XYZ"，letter_count是多少？

---

## 题号：071

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：ASCII码转换
- **知识标签**：ASCII、字符数字转换、'0'
- **嵌入式场景**：协议数据解析，数字提取
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | int main(void)
 5 | {
 6 |     char digit_char = '7';
 7 |     uint8_t digit_value = digit_char - '0';
 8 |
 9 |     printf("Char: %c\n", digit_char);
10 |     printf("Value: %u\n", digit_value);
11 |
12 |     uint8_t num = 5;
13 |     char num_char = num + '0';
14 |     printf("Num to char: %c\n", num_char);
15 |
16 |     printf("'A' = %d, 'a' = %d\n", 'A', 'a');
17 |     printf("'A' + 32 = %c\n", 'A' + 32);
18 |
19 |     return 0;
20 | }
```

### 提示
字符'0'-'9'的ASCII码是48-57，减'0'得到数字值。

### 内存图
```
ASCII码转换:
  '7' 的ASCII码 = 55
  '0' 的ASCII码 = 48
  '7' - '0' = 55 - 48 = 7
  
  5 + '0' = 5 + 48 = 53 = '5'
  
  'A' = 65
  'a' = 97
  'A' + 32 = 97 = 'a'
```

### 逐行解析
- 第6行：字符'7'
- 🔥 第7行：字符转数字，'7'-'0'=7
- 第12行：数字5
- 🔥 第13行：数字转字符，5+'0'='5'
- 第16行：打印'A'和'a'的ASCII码
- 第17行：大写转小写，'A'+32='a'

### 嵌入式Linux实战说明
**工作场景**：协议解析、数据转换、配置读取。

**常用转换**：
- 字符数字 → 数值：ch - '0'
- 数值 → 字符数字：num + '0'
- 大写 → 小写：ch + 32 或 tolower()
- 小写 → 大写：ch - 32 或 toupper()

**面试问法**：如何将字符'5'转换成数字5？

### 易错点+变体题
**易错点**：
- 忘记减'0'
- 非数字字符转换
- 大小写转换差值

**变体题**：把digit_char改成'A'，digit_value是多少？

---

## 题号：072

### 题目信息
- **难度级别**：Level 1 入门
- **标题**：字符串结束符\0
- **知识标签**：\0、字符串结束、手动构造
- **嵌入式场景**：协议帧构造，数据包组装
- **面试频率**：高

### 代码
```c
 1 | #include <stdio.h>
 2 | #include <stdint.h>
 3 |
 4 | #define BUF_SIZE  10
 5 |
 6 | int main(void)
 7 | {
 8 |     char buffer[BUF_SIZE];
 9 |
10 |     buffer[0] = 'H';
11 |     buffer[1] = 'i';
12 |     buffer[2] = '\0';
13 |
14 |     printf("String: %s\n", buffer);
15 |     printf("Length: %zu\n", strlen(buffer));
16:
17 |     buffer[2] = '!';    // 覆盖\0
18 |     buffer[3] = '!';    // 没有添加\0
19 |     printf("After modify: %s\n", buffer);  // 可能输出异常
20:
21 |     return 0;
22 | }
```

### 提示
字符串必须以\0结尾，否则printf和strlen会越界。

### 内存图
```
字符串构造:
  初始:
    buffer = [?][?][?][?][?][?][?][?][?][?]
  
  手动构造:
    buffer = ['H']['i']['\0'][?][?][?][?][?][?][?]
    strlen = 2, printf正常
  
  覆盖\0后:
    buffer = ['H']['i']['!']['!'][?][?][?][?][?][?]
    没有\0结尾！
    strlen和printf会继续读取直到遇到\0
```

### 逐行解析
- 第8行：字符缓冲区
- 第10-12行：手动构造字符串，添加\0
- 第14-15行：正常打印
- 🔥 第17-18行：覆盖\0，没有添加新的\0
- 第19行：可能输出异常，因为没有\0结尾

### 嵌入式Linux实战说明
**工作场景**：协议帧构造、数据包组装。必须确保\0结尾。

**\0的重要性**：
- 标记字符串结束
- strlen依赖\0
- printf依赖\0

**常见错误**：
- 忘记添加\0
- 覆盖\0
- 缓冲区溢出破坏\0

**面试问法**：为什么字符串需要\0结尾？

### 易错点+变体题
**易错点**：
- 忘记\0
- 覆盖\0
- 缓冲区太小放不下\0

**变体题**：在第18行后添加buffer[4] = '\0'，输出是什么？

---

# 完成情况

**Level 1 字符串基础 8道题已完成**

覆盖知识点：
- ✅ strlen/strcpy/strcmp/strcat
- ✅ 字符串末尾'\0'
- ✅ 字符数组vs字符指针
- ✅ 手动遍历字符串
- ✅ ASCII码和字符转换
- ✅ 场景：AT指令处理、日志拼接、配置解析
