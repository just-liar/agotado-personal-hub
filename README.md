<div align="center">

# Agotado's Personal Hub

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73C92?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

一个极简、优雅的个人导航主页，采用 Apple 风格设计语言与 Bento Grid 布局。
基于现代前端技术栈构建，专注于提供极致的视觉体验与交互流畅度。

[查看在线演示](https://agotado.xyz)

</div>

## ✨ 特性 Features

- **🎨 极致 UI 设计**：深度复刻 Apple 设计美学，采用毛玻璃 (Glassmorphism) 效果与细腻的呼吸动画。
- **📱 响应式布局**：基于 Bento Grid 的自适应网格系统，在移动端与桌面端均有完美表现。
- **⚡️ 现代技术栈**：使用 Vite + React + TypeScript 构建，秒级启动，类型安全。
- **🚀 自动化部署**：集成 GitHub Actions，代码提交自动构建并部署至服务器。
- **⏱️ 实时状态**：内置系统运行时间 (Runtime) 计数器与动态背景光效。

## 🛠️ 技术栈 Tech Stack

- **核心框架**: [React 18](https://react.dev/)
- **构建工具**: [Vite 5](https://vitejs.dev/)
- **开发语言**: [TypeScript](https://www.typescriptlang.org/)
- **样式方案**: [Tailwind CSS 3](https://tailwindcss.com/)
- **图标库**: [FontAwesome](https://fontawesome.com/)

## 🚀 快速开始 Getting Started

### 环境要求

- Node.js >= 18.0.0
- npm 或 yarn

### 本地开发

1. **克隆仓库**
   ```bash
   git clone https://github.com/just-liar/agotado-personal-hub.git
   cd agotado-personal-hub
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```
   访问 http://localhost:5173 即可预览。

4. **构建生产版本**
   ```bash
   npm run build
   ```

## 📦 部署 Deployment

本项目配置了完整的 GitHub Actions CI/CD 流程。

### 自动化部署流程
每次向 `main` 分支推送代码时，Workflow 会自动执行以下步骤：
1. 检出代码并安装依赖。
2. 执行 `npm run build` 打包生成静态资源。
3. 通过 SCP 将 `dist` 目录产物传输至目标服务器。

### 配置说明
需要在 GitHub 仓库的 `Settings -> Secrets` 中配置以下变量：
- `SERVER_IP`: 服务器 IP 地址
- `SSH_USERNAME`: SSH 用户名 (如 root)
- `SSH_KEY`: SSH 私钥内容

## 📂 目录结构

```text
src/
├── components/        # UI 组件 (NavCard, BackgroundAnimation)
├── styles/            # 全局样式与 Tailwind 配置
├── types/             # TypeScript 类型定义
├── constants.tsx      # 导航数据配置
├── App.tsx            # 根组件
└── main.tsx           # 应用入口
```

## 📄 License

[MIT](LICENSE) © 2024 Agotado
