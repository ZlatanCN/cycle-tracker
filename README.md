# Cycle Tracker 📅

一个现代化的健康周期追踪应用，帮助用户记录和分析生理周期数据。基于Expo构建，支持跨平台使用（iOS/Android/Web）。

## 技术栈

- [Expo](https://expo.dev) - 跨平台开发框架
- [React Native](https://reactnative.dev) - UI组件库
- [TypeScript](https://www.typescriptlang.org) - 类型安全
- [Tailwind CSS](https://tailwindcss.com) - 原子化CSS框架
- [Nativewind](https://www.nativewind.dev) - React Native样式方案
- [React Navigation](https://reactnavigation.org) - 导航系统

## 核心特性

✅ 交互式日历视图 | ✅ 健康数据可视化 | ✅ 多主题支持

## 目录结构

```
├── app/              # 主应用程序目录
│   ├── (tabs)/       # 底部标签页导航
│   └── _layout.tsx   # 根布局组件
├── components/       # 可复用UI组件
├── lib/              # 工具函数和业务逻辑
└── assets/           # 静态资源文件
```

## 开始使用

1. 安装依赖

```bash
pnpm install
```

2. 启动开发服务器

```bash
npx expo start
```

## 功能演示

*交互式日历界面支持手势操作和数据可视化*

## 贡献指南

欢迎提交PR和Issue！请遵循以下规范：

- 使用Prettier格式化代码
- 添加类型注解
- 保持组件单一职责

## 许可证

MIT License