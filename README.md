# Copy-Mate

一个简洁优雅的剪贴板历史记录工具，帮助你管理和快速访问剪贴板内容。

## 功能特点

- 🔄 自动记录剪贴板历史
- ⌨️ 快捷键支持
- 🎯 一键复制历史内容（点击即复制）
- 🗑️ 便捷删除不需要的记录
- 💡 简洁优雅的界面设计
- ✨ 复制成功视觉反馈

## 使用说明

### 基本操作

1. **启动应用**
   - 应用启动后会在系统托盘显示图标
   - 使用 `Command + I` (Mac) / `Ctrl + I` (Windows) 快捷键显示/隐藏主窗口

2. **剪贴板监控**
   - 应用会自动监控系统剪贴板的变化
   - 当你复制新的文本内容时，会自动保存到历史记录中

3. **历史记录使用**
   - 📋 **点击任意记录即可复制**：鼠标点击任何一条历史记录，内容会自动复制到剪贴板
   - ✨ 复制成功时会显示"已复制"提示
   - 🗑️ 点击记录右侧的删除图标可以移除该条记录
   - 💡 鼠标悬停在记录上会显示"点击复制"提示

### 快捷键

- `Command + I` (Mac) / `Ctrl + I` (Windows): 显示/隐藏主窗口

### 系统托盘

应用在系统托盘提供以下功能：
- 显示帮助
- 配置项
- 全部清除
- 发送反馈
- 退出应用

## 技术说明

本应用基于 Electron + React + TypeScript 开发，提供跨平台支持。

## 系统要求

- macOS 10.13 或更高版本
- Windows 10 或更高版本
- Linux (主流发行版)

## 反馈与支持

如果你在使用过程中遇到任何问题，或有功能建议，欢迎通过以下方式反馈：
- 在应用中使用"发送反馈"功能
- 联系我们

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```
