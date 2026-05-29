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

首次启动会自动创建数据库表和初始数据。

### 4. 启动前端

```bash
cd web
npm install
npm run dev
```

### 5. 访问系统

浏览器打开 http://localhost:8090/example/

默认管理员账号：`admin` / 密码见 application.yml 中 `sys.default-password`

## 自定义指南

### 修改上下文路径

1. 修改 `application.yml` 中的 `server.servlet.context-path`
2. 修改 `web/.env` 中的 `SERVLET_CONTEXT` 为相同值
3. 修改 `web/config/config.js` 中 `proxyConfig` 的 key 和 `define` 中的 `SERVLET_CONTEXT`
4. 重新构建前端即可生效

### 添加业务模块

1. 在 `com.example` 包下创建 Entity、Repository、Service、Controller
2. 在 `web/src/pages/` 下创建对应的页面组件
3. 框架会自动扫描和注册路由

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