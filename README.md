# C语言代码思维训练器

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=flat&logo=react" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.9-blue?style=flat&logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-7-green?style=flat&logo=vite" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind-4-purple?style=flat&logo=tailwind-css" alt="Tailwind CSS">
</p>

## 项目简介

C语言代码思维训练器是一个面向 C 语言学习者和面试者的在线编程学习平台。通过交互式练习、可视化教学和智能题库，帮助用户掌握 C 语言核心概念，提升面试应试能力。

### 核心特性

- **200+ 精选真题**：涵盖 C 语言基础、指针、结构体、内存管理等核心知识点
- **交互式学习**：选择题、排序题等多种题型
- **代码可视化**：动态展示代码执行过程、内存布局、指针操作
- **互动实验室**：指针沙盒、结构体打包、位运算练习
- **学习进度跟踪**：本地存储学习进度，统计正确率
- **暗黑/亮色主题**：支持深色/浅色模式切换

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | React 19.2.3 |
| 语言 | TypeScript 5.9.3 |
| 构建工具 | Vite 7.2.4 |
| 样式方案 | Tailwind CSS 4.1.17 |
| 工具库 | clsx, tailwind-merge |
| 图标 | Lucide React 0.563.0 |
| 后端 | Node.js + Express (端口 3001) |

---

## 项目结构详解

```
web-development-request-received/
├── src/
│   ├── App.tsx                      # 主应用入口 (~2750行)
│   │   ├── Header                    # 导航栏组件
│   │   ├── LessonView               # 课程内容展示
│   │   ├── QuestionView             # 选择题答题界面
│   │   ├── OrderQuestion            # 排序题组件
│   │   ├── TrainingView             # 训练主界面
│   │   ├── ReviewView               # 错题复习
│   │   ├── BookmarkedView           # 收藏列表
│   │   ├── LabView                  # 互动实验室
│   │   ├── StatsView                # 学习统计
│   │   ├── ProjectsListView         # 项目展示
│   │   └── HTMLVisualizationModal   # HTML 可视化模态框
│   │
│   ├── components/
│   │   ├── CodeTypingPractice.tsx   # 代码跟打练习
│   │   │   ├── PRESET_CODES         # 预设代码片段
│   │   │   ├── 打字区域             # 显示待输入代码
│   │   │   ├── 输入区域             # 用户输入
│   │   │   ├── 统计面板             # WPM、准确率统计
│   │   │   └── 代码难度分级         # 入门/基础/中级/高级
│   │   │
│   │   ├── CodeRunner.tsx           # 代码在线运行器
│   │   │   ├── 代码输入区
│   │   │   ├── 运行按钮
│   │   │   └── 输出展示区
│   │   │
│   │   ├── CodeAnalyzer.tsx         # 代码静态分析
│   │   │
│   │   ├── PointerSandbox.tsx       # 指针沙盒实验室
│   │   │   ├── 变量创建             # 创建不同类型变量
│   │   │   ├── 指针操作             # 取地址、解引用
│   │   │   └── 指针运算             # 指针加减、类型转换
│   │   │
│   │   ├── StructPackerGame.tsx     # 结构体内存打包游戏
│   │   │   ├── 对齐规则教学
│   │   │   ├── 成员排列实验
│   │   │   └── 大小计算验证
│   │   │
│   │   ├── BitSwitchGame.tsx        # 位运算练习游戏
│   │   │   ├── 位操作符练习
│   │   │   ├── 进制转换
│   │   │   └── 位掩码应用
│   │   │
│   │   ├── EnhancedMemoryViz.tsx    # 增强内存可视化
│   │   ├── PointerMemoryViz.tsx    # 指针内存可视化
│   │   ├── StackFrameViz.tsx       # 栈帧可视化
│   │   ├── COWMemoryViz.tsx        # 写时复制内存可视化
│   │   ├── DeepUnderstandingPanel.tsx  # 深度理解面板
│   │   ├── VisualizationFactory.tsx    # 可视化工厂
│   │   ├── EnhancedVisualization.tsx   # 增强可视化
│   │   ├── Visualizations.tsx      # 可视化集合
│   │   ├── AnimatedComponents.tsx  # 动画组件
│   │   ├── SyntaxHighlighter.tsx   # 语法高亮
│   │   ├── DashboardLayout.tsx     # 仪表板布局
│   │   ├── DashboardExample.tsx    # 仪表板示例
│   │   ├── ProjectView.tsx         # 项目视图
│   │   ├── ReferenceSidebar.tsx     # 参考侧边栏
│   │   └── StatsAndAchievements.tsx # 成就系统
│   │
│   ├── data/
│   │   ├── lessons.ts              # 课程章节定义
│   │   │   ├── Chapter 接口         # 章节数据结构
│   │   │   ├── Lesson 接口          # 课时数据结构
│   │   │   ├── Question 接口        # 题目数据结构
│   │   │   ├── chapters 数组        # 基础入门章节
│   │   │   └── getQuestionsByChapter()  # 按章节获取题目
│   │   │
│   │   ├── level1Questions.ts     # Level 1 真题 (80题)
│   │   │   ├── level1Chapters      # Level 1 章节定义
│   │   │   └── level1Questions     # 真题数组
│   │   │
│   │   ├── embeddedQuestions.ts    # 嵌入式面试题
│   │   │
│   │   ├── projects.ts             # 项目数据
│   │   │
│   │   ├── vocabulary.ts           # 词汇表
│   │   │
│   │   ├── vizData.ts              # 可视化数据
│   │   │
│   │   └── questionEnhancer.ts     # 题目增强器
│   │
│   ├── services/
│   │   └── progressApi.ts           # 进度管理服务
│   │       ├── Progress 接口        # 进度数据结构
│   │       ├── loadProgress()      # 加载进度
│   │       ├── saveProgress()      # 保存进度
│   │       ├── clearProgress()     # 清除进度
│   │       └── API优先+localStorage降级
│   │
│   ├── hooks/
│   │   └── useInteractions.ts      # 交互逻辑 Hook
│   │
│   ├── utils/
│   │   └── cn.ts                    # 工具函数
│   │
│   ├── main.tsx                    # React 入口
│   └── index.css                   # 全局样式
│
├── server/                         # Node.js 后端
│   ├── server.js                   # Express 服务器
│   ├── package.json
│   └── ...
│
├── package.json                    # 项目配置
├── tsconfig.json                   # TypeScript 配置
├── vite.config.ts                  # Vite 配置
├── index.html                      # HTML 入口
├── README.md                       # 项目文档
└── 需求1.0.md                      # 需求文档
```

---

## 核心模块详解

### 1. App.tsx 主应用架构

主应用文件约 2750 行，包含以下核心组件和状态：

#### 主状态 (Main App Level)
```typescript
const [view, setView] = useState('home');      // 当前视图
const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
const [progress, setProgress] = useState<Progress>(defaultProgress);
const [isDarkMode, setIsDarkMode] = useState(() => {
  // 从 localStorage 读取主题偏好
});
const [modeFilter, setModeFilter] = useState<'all' | 'real' | 'practice'>('all');
```

#### 视图类型 (view 可选值)
- `'home'` - 首页/章节选择
- `'training'` - 训练界面 (章节练习)
- `'review'` - 错题复习
- `'bookmarked'` - 收藏列表
- `'stats'` - 学习统计
- `'lab'` - 互动实验室
- `'typing'` - 跟打练习
- `'projects'` - 项目展示

### 2. TrainingView 训练界面

训练界面是核心功能模块，管理章节练习流程：

```typescript
// 训练界面状态
const [showLesson, setShowLesson] = useState(true);    // 显示课程/答题
const [lessonIndex, setLessonIndex] = useState(0);     // 当前课时
const [questionIndex, setQuestionIndex] = useState(0); // 当前题目
const [showResult, setShowResult] = useState(false);   // 显示结果
const [isCorrect, setIsCorrect] = useState(false);     // 答题是否正确
const [userAnswers, setUserAnswers] = useState<string[]>([]); // 用户答案
```

#### 流程逻辑
1. 用户选择章节 → 进入 TrainingView
2. 显示 LessonView（课程内容）→ 点击"开始练习"
3. setShowLesson(false) → 显示 QuestionView（真题练习）
4. 答题 → 提交 → 显示结果 → 更新进度
5. 下一题或完成

### 3. QuestionView 答题界面

支持三种题型：

```typescript
type QuestionType = 'single' | 'multiple' | 'order';
// 'single' - 单选题
// 'multiple' - 多选题
// 'order'   - 排序题
```

#### 题目数据结构
```typescript
interface Question {
  id: string;                    // 题目唯一ID
  type: QuestionType;            // 题目类型
  question: string;              // 问题描述
  code?: string;                 // 相关代码片段
  options: string[];             // 选项数组
  answer: number[];              // 正确答案索引
  explanation: string;           // 答案解析
  difficulty: 'easy' | 'medium' | 'hard';  // 难度等级
  tags: string[];                // 标签 (如: "指针", "数组")
}
```

### 4. 互动实验室 (LabView)

提供多个动手实践模块：

| 组件 | 功能描述 |
|------|----------|
| PointerSandbox | 指针操作沙盒，可视化指针变量和地址 |
| StructPackerGame | 结构体内存布局游戏，学习对齐规则 |
| BitSwitchGame | 位运算练习，交互式位操作 |
| EnhancedMemoryViz | 增强内存可视化 |
| StackFrameViz | 栈帧调用可视化 |

### 5. 进度管理系统

采用 API 优先 + localStorage 降级策略：

```typescript
interface Progress {
  completed: number[];    // 已完成题目ID
  correct: number[];      // 答对题目ID
  wrong: number[];        // 答错题目ID
  attempts: Record<number, number>;  // 题目尝试次数
  bookmarked: number[];   // 收藏题目ID
  analyzed: number[];     // 已分析题目ID
}
```

**存储策略：**
1. 优先尝试调用后端 API (`http://localhost:3001/api/progress`)
2. API 不可用时降级到 localStorage (`c-trainer-progress-v3`)

---

## 章节与题库结构

### 章节分类

#### 基础入门 (basics-test)
- 178 道练习题
- 包含：数据类型、运算符、流程控制、数组、函数等

#### Level 1 入门真题 (level1)
- 80 道面试真题
- 涵盖：printf、变量、运算符、条件、循环、函数、数组、宏、字符串、作用域

#### Level 2 进阶真题 (level2)
- 70 道进阶题
- 涵盖：指针基础、结构体、联合体、枚举、函数指针、多文件编程

#### Level 3 核心真题 (level3)
- 60 道核心题
- 涵盖：内存管理、文件操作、位操作进阶、预处理、复杂声明

---

## 运行项目

### 环境要求
- Node.js 18+
- npm 或 yarn

### 安装与启动

```bash
# 1. 安装依赖
npm install

# 2. 启动前端开发服务器 (端口 5173)
npm run dev

# 3. 启动后端服务器 (端口 3001)
npm run dev:server

# 4. 同时启动前后端
npm run dev:all

# 5. 构建生产版本
npm run build

# 6. 预览生产构建
npm run preview

# 7. 运行测试
npm test
```

### 开发服务器
- 前端：http://localhost:5173
- 后端：http://localhost:3001

---

## 代码规范

### TypeScript 类型定义

项目中的核心类型定义位于 `src/data/lessons.ts`：

```typescript
// 题目类型
type QuestionType = 'single' | 'multiple' | 'order';
type QuestionMode = 'real' | 'practice';
type Difficulty = 'easy' | 'medium' | 'hard';

// 章节结构
interface Chapter {
  id: string;
  name: string;
  icon: string;
  description: string;
  lessons: Lesson[];
  questionCount: number;
  mode?: QuestionMode;
}

// 课时结构
interface Lesson {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
}
```

### Tailwind CSS v4 特性

项目使用 Tailwind CSS v4，配置方式与 v3 不同：

```css
/* index.css */
@import "tailwindcss";

@theme {
  /* 自定义主题变量 */
  --color-primary: #10b981;
  --color-secondary: #06b6d4;
}
```

### 组件开发模式

```tsx
// 示例：创建新组件
import { useState } from 'react';

interface Props {
  title: string;
  onComplete?: () => void;
}

export function MyComponent({ title, onComplete }: Props) {
  const [state, setState] = useState(false);

  return (
    <div className="...">
      <h1>{title}</h1>
    </div>
  );
}
```

---

## 已知的潜在问题

### 🔴 高优先级问题

1. **App.tsx 文件过大**
   - 问题：单个文件约 2750 行，难以维护
   - 建议：拆分为多个模块组件

2. **进度数据无云端同步**
   - 问题：localStorage 只能本地存储，无法跨设备
   - 建议：完善后端 API，用户登录系统

3. **部分 UI 在亮色模式对比度不足**
   - 问题：如"全部"按钮在白天模式灰色字体看不清
   - 状态：已部分修复

### 🟡 中优先级问题

4. **缺少单元测试**
   - 问题：无测试覆盖
   - 建议：引入 Jest + React Testing Library

5. **大型数据文件影响加载速度**
   - 问题：题目数据集中在一个文件
   - 建议：按需加载或分块加载

6. **某些交互逻辑不够直观**
   - 问题：如"开始练习"按钮行为
   - 状态：已修复

### 🟢 低优先级问题

7. **无搜索功能**
8. **无学习计划/提醒**
9. **无错题本分类筛选**
10. **无用户登录与数据导出**

---

## 扩展开发指南

### 添加新章节

在 `src/data/lessons.ts` 中添加：

```typescript
{
  id: 'new-chapter',
  name: '新章节名称',
  icon: '📚',
  description: '章节描述',
  questionCount: 50,
  mode: 'real',
  lessons: [
    {
      id: 'lesson-1',
      title: '第一课',
      content: '课程内容 (支持 Markdown)',
      keyPoints: ['重点1', '重点2']
    }
  ]
}
```

### 添加新题目

在对应题库文件中添加：

```typescript
{
  id: 'q-001',
  type: 'single',
  question: '题目内容',
  code: '相关代码(可选)',
  options: ['选项A', '选项B', '选项C', '选项D'],
  answer: [0],  // 正确答案索引
  explanation: '答案解析',
  difficulty: 'medium',
  tags: ['指针', '内存']
}
```

### 创建新可视化组件

1. 在 `src/components/` 创建新文件
2. 导出函数组件
3. 在需要的地方引入

```tsx
// src/components/NewViz.tsx
import { useState } from 'react';

export function NewViz() {
  const [data, setData] = useState<number[]>([]);

  return (
    <div className="p-4 rounded-lg bg-slate-900">
      {/* 可视化内容 */}
    </div>
  );
}
```

---

## 目录结构速查

| 路径 | 说明 |
|------|------|
| `src/App.tsx` | 主应用，所有视图组件 |
| `src/components/CodeTypingPractice.tsx` | 跟打练习 |
| `src/components/PointerSandbox.tsx` | 指针沙盒 |
| `src/components/StructPackerGame.tsx` | 结构体游戏 |
| `src/data/lessons.ts` | 章节/题目定义 |
| `src/data/level1Questions.ts` | Level 1 真题 |
| `src/services/progressApi.ts` | 进度管理 |

---

## 贡献指南

1. Fork 本仓库
2. 创建分支：`git checkout -b feature/功能名`
3. 开发并测试
4. 提交：`git commit -m 'feat: 添加新功能'`
5. 推送：`git push origin feature/功能名`
6. 创建 Pull Request

---

## 更新日志

### [进行中]
- 优化 UI 对比度问题
- 修复跳转逻辑
- 添加 README 文档

### [1.0.0] - 初始版本
- 200+ 道 C 语言面试真题
- 互动实验室功能
- 代码可视化
- 进度跟踪系统

---

## 许可证

MIT License
