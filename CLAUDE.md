# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

open-admin-example 是一个基于 [open-admin](https://github.com/jiangood/open-admin) 框架的示例/模板项目，演示业务项目如何快速接入 open-admin 获得完整的后台管理能力。该项目的业务代码极少，核心能力由 open-admin 框架（`io.github.jiangood:open-admin:2.2.4`）提供。

框架源码在同级目录 `D:/ws/open-admin/` 中，调试和定制框架行为时需要同时参考两个项目。

## Tech Stack

- **Backend**: Java 21, Spring Boot 4.0.6, Spring Data JPA (Hibernate), Spring Security, Quartz, MySQL 8+
- **Frontend**: React 19, Ant Design 6, UmiJS 4, TypeScript
- **Build**: Maven (backend, via `./mvnw`), npm (frontend, in `web/`)

## Project Structure (open-admin-example)

```
open-admin-example/
├── pom.xml               # 仅依赖 open-admin + mysql-connector-j + spring-boot-starter-test
├── src/main/java/com/example/
│   └── Application.java  # 唯一启动类，@SpringBootApplication + @EntityScan
├── src/main/resources/
│   └── application.yml   # 数据库配置 + 系统标题等
├── web/                   # 前端项目 (UmiJS 4)
│   ├── package.json      # 依赖 @jiangood/open-admin + antd + umi
│   ├── .env              # PORT=8090, SERVLET_CONTEXT=/example
│   ├── config/config.js  # UmiJS 配置 + 开发代理
│   └── src/
│       └── app.js        # 应用入口
└── data/                  # gitignored, 运行产生的数据文件
```

## Architecture (framework at D:/ws/open-admin)

### 后端分层 (每层都有框架基类)

```
Controller → Service → Repository (JPA) → Entity (MySQL)
```

- **Entity**: 继承 `BaseEntity` (UUIDv7 ID, createTime/createUser, updateTime/updateUser)
- **Repository**: 继承 `BaseRepository<T, String>` 获取通用 CRUD、字段查询、`Spec` 动态查询、分组统计、批量操作
- **Service**: 继承 `BaseService<T>` 获取通用 CRUD
- **Controller**: RESTful, 返回 `AjaxResult`，使用 `@HasPermission` 控制权限
- **动态查询**: `Spec<T>` 链式构建 JPA Specification（支持 eq/like/in/between/or/groupBy 等）
- **分页**: `PageExt<T>` 扩展 `PageImpl`，支持额外数据（如 summary 汇总行）

### 内置系统模块

框架在包 `io.github.jiangood.openadmin.modules.*` 中已实现完整后台管理功能：

| 模块 | 说明 |
|------|------|
| system | 用户/角色/菜单/组织/字典/文件/日志管理 |
| job | Quartz 定时任务管理 |
| logviewer | 运行日志在线查看 |

### 菜单系统

- 通过 `src/main/resources/data/menu*.yml` YAML 文件定义菜单树
- 框架自动扫描 `classpath*:data/menu*.yml` 生成菜单（`MenuYamlLoader`）

### 前端框架 (web/src/framework → npm 包 @jiangood/open-admin)

- **ProTable**: 通用列表页组件（带搜索/分页/工具栏）
- **ProModal**: 通用弹窗表单组件
- **Field\***: 表单字段组件（FieldDictSelect, FieldRemoteSelect, FieldDate, FieldUploadFile 等）
- **View\***: 展示组件（ViewFile, ViewImage, ViewBoolean 等）
- **HttpUtils**: 封装 axios，自动拼接 context-path
- **SysUtils**: 系统信息（站点配置、登录用户、字典）
- **配置**: UmiJS 插件 `@jiangood/open-admin/config/common-plugin`

## Development Commands

```bash
# Backend - 启动开发服务器 (默认 8080 端口)
./mvnw spring-boot:run

# Backend - 编译
./mvnw clean compile

# Backend - 打包
./mvnw clean package

# Frontend - 安装依赖
cd web && npm install

# Frontend - 开发模式 (默认 8090 端口，代理到后端 8080)
cd web && npm run dev

# Frontend - 构建
cd web && npm run build
```

## Context-Path 配置

系统可通过 context-path 部署在子路径下（如 `/example`），前后端需同步配置：

| 位置 | 文件 | 说明 |
|------|------|------|
| 后端 | `application.yml` | `server.servlet.context-path` |
| 前端环境变量 | `web/.env` | `SERVLET_CONTEXT` |
| 前端代理 | `web/config/config.js` | proxy 配置 + define 注入 |

## Adding a Business Module

1. **后端**: 在 `com.example` 下创建 Entity（extends BaseEntity）、Repository（extends BaseRepository）、Service（extends BaseService）、Controller（REST + @HasPermission）
2. **前端**: 在 `web/src/pages/` 下创建页面（使用 ProTable/ProModal/Field* 组件快速搭建 CRUD）
3. **菜单**: 在 `src/main/resources/data/` 下添加 `menu*.yml` 文件定义菜单项
4. **数据库**: 无需手动建表，JPA 自动根据 Entity 创建/更新表结构

## Key Configuration (application.yml)

| 配置 | 说明 | 默认值 |
|------|------|--------|
| `sys.title` | 系统标题（必填） | 管理系统 |
| `sys.captcha-enable` | 登录验证码 | true |
| `sys.default-password` | 默认密码 | open-admin@1234 |
| `sys.logo-url` | Logo 路径 | /admin/public/logo.svg |
| `sys.file.store-type` | 文件存储类型 (local/minio) | local |

完整配置项见框架 `SystemProperties.java`。

## Framework Source Code

框架源码在 `D:/ws/open-admin/` 中，其 CLAUDE.md 包含更详细的架构说明。修改框架行为时，需在框架项目中编译安装后再更新 example 项目的依赖版本。
