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

## 快速开始

### 环境要求
- Node.js 18+
- npm 或 yarn

### 一键启动
双击 `start.bat` 即可自动安装依赖并启动前后端服务。

### 手动启动

```bash
# 安装依赖
npm install

# 启动前端开发服务器 (端口 5173)
npm run dev

# 启动后端服务器 (端口 3001) - 新终端
cd server && npm install && node index.js
```

### 访问地址
- 前端：http://localhost:5173
- 后端：http://localhost:3001

---

## 项目结构

```
web-development-request-received/
├── src/                    # 前端源码
│   ├── App.tsx            # 主应用入口
│   ├── components/        # UI组件
│   │   ├── visualizer/    # 可视化组件
│   │   ├── CodeRunner.tsx # 代码运行器
│   │   ├── PointerSandbox.tsx # 指针沙盒
│   │   └── ...
│   ├── data/              # 数据文件
│   └── services/          # API服务
├── server/                # Node.js后端
├── public/                # 静态资源
├── docs/                  # 文档
├── questions/             # 题目Markdown
├── start.bat              # 一键启动脚本
└── README.md
```

---

## 许可证

MIT License
