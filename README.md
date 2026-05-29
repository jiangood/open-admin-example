# open-admin-example

基于 [open-admin](https://github.com/jiangood/open-admin) 框架的示例/模板项目，演示业务项目如何快速接入 open-admin 获得完整的后台管理能力。

[![Maven Central](https://img.shields.io/maven-central/v/io.github.jiangood/open-admin)](https://central.sonatype.com/artifact/io.github.jiangood/open-admin)

## 环境要求

- Java 21+
- MySQL 8+
- Node.js 18+

## 快速开始

### 1. 创建数据库

```sql
CREATE DATABASE open_admin_example DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

### 2. 配置数据库连接

修改 `src/main/resources/application.yml` 中的数据库连接信息：

```yaml
db_ip: 127.0.0.1
db_port: 3306
db_database: open_admin_example
db_username: root
db_password: your_password
```

### 3. 启动后端

```bash
./mvnw spring-boot:run
```

首次启动会自动创建数据库表和初始数据（包括默认管理员账号）。

### 4. 安装框架前端依赖（首次或依赖变更时）

```bash
cd web
npm install
```

框架前端 `@jiangood/open-admin` 已配置为 npm 依赖，无需手动拷贝。

### 5. 启动前端

```bash
cd web
npm run dev
```

前端开发服务器运行在 8090 端口，自动代理 API 请求到后端 8080 端口。

### 6. 访问系统

浏览器打开 http://localhost:8090/example/

默认管理员账号：`admin` / 密码见 application.yml 中 `sys.default-password`

## 自定义指南

### 修改上下文路径

1. 修改 `application.yml` 中的 `server.servlet.context-path`
2. 修改 `web/.env` 中的 `SERVLET_CONTEXT` 为相同值
3. 修改 `web/config/config.js` 中 `proxyConfig` 的 key 和 `define` 中的 `SERVLET_CONTEXT`
4. 重新构建前端即可生效

### 添加业务模块

1. **后端**：在 `com.example` 包下创建 Entity（继承 `BaseEntity`）、Repository（继承 `BaseRepository`）、Service（继承 `BaseService`）、Controller（RESTful + `@HasPermission` 权限注解）
2. **前端**：在 `web/src/pages/` 下创建页面组件（使用框架的 ProTable、Field* 等组件快速搭建 CRUD）
3. **菜单**：在 `src/main/resources/data/` 下创建 `menu*.yml` 文件定义菜单项，框架自动扫描注册
4. **数据库**：JPA 根据 Entity 自动创建/更新表结构，无需手动编写 DDL

### 框架配置

`application.yml` 中通过 `spring.config.import: classpath:application-lib.yml` 引入框架默认配置，业务项目只需覆盖需要的配置项。

主要配置项：

| 配置 | 说明 | 默认值 |
|------|------|--------|
| `sys.title` | 系统标题（必填） | 管理系统 |
| `sys.captcha-enable` | 是否开启登录验证码 | true |
| `sys.logo-url` | Logo 图片路径 | /admin/public/logo.svg |
| `sys.default-password` | 默认密码 | open-admin@1234 |
| `server.servlet.context-path` | 上下文路径 | / |

完整配置项参考框架源码 `SystemProperties.java`