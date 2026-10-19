# open-admin-example

基于 [open-admin](https://github.com/jiangood/open-admin) 框架的项目模板，快速交付后台管理系统。

[![Maven Central](https://img.shields.io/maven-central/v/io.github.jiangood/open-admin)](https://central.sonatype.com/artifact/io.github.jiangood/open-admin)

## Tech Stack

| 层 | 技术 | 版本 |
|---|---|---|
| 后端 | Java / Spring Boot / Spring Data JPA (Hibernate) / Spring Security / Quartz | 21 / 4.1.0 |
| 前端 | React / Ant Design / Vite（自研 hash 路由 + PageFrame） | 19 / 6 / 8 |
| 数据库 | H2 文件模式（内置，开箱即用）；可选 MySQL | H2 2.x / 8+ |
| 构建 | Maven / npm / Docker | / |

## Quick Start

零外部依赖：内置 H2 数据库（MySQL 兼容模式），首次启动自动建表并初始化数据。

```bash
# 终端 1：启动后端（默认管理员 admin / Open@1234）
mvn spring-boot:run

# 终端 2：启动前端
cd web
npm install        # 首次或依赖变更时
npm run dev        # → http://localhost:8090/example/
```

数据库文件默认在 `/data/db/open-admin-example`（本地开发可用 `-Ddb_path=./data/db/open-admin-example` 覆盖）。

## 一键部署（Docker）

镜像内置 H2 数据库，无需外部 MySQL，数据、日志、上传文件持久化在 `/data`：

```bash
# docker compose（首次自动构建镜像）
docker compose -f docker-compose/docker-compose.yml up -d --build

# 或手动构建 / 运行
docker build -t open-admin-example .
docker run -d --name open-admin-example -p 8080:8080 -v ./data:/data open-admin-example
```

访问 http://127.0.0.1:8080 ，账号 `admin`，密码 `Open@1234`（首次登录后请修改）。

### 切换到 MySQL（可选）

```bash
# 本地：按 application-mysql.yml 中的 db_* 配置连接信息后
mvn spring-boot:run -Dspring-boot.run.profiles=mysql

# 容器：prod 保证根路径访问，mysql 覆盖数据源（后者优先）
docker run -d -p 8080:8080 --spring.profiles.active=prod,mysql ...
```

## Project Structure

```
open-admin-example/
├── pom.xml                          # 仅依赖 open-admin + h2（可选 mysql-connector-j） + test + lombok
├── Dockerfile                       # 多阶段构建（内置 H2，一键部署）
├── docker-compose/docker-compose.yml # 一键启动（./data 挂载为 /data）
├── src/main/java/com/example/
│   ├── Application.java
│   └── product/                     # ── 业务模块示例 ──
│       ├── Product.java             #   Entity extends BaseEntity
│       ├── ProductRepository.java   #   extends BaseRepository<T, String>
│       ├── ProductService.java      #   extends BaseService<T>
│       └── ProductController.java   #   REST + @HasPermission
├── src/main/resources/
│   ├── application.yml              # 默认数据源：H2 文件模式
│   ├── application-mysql.yml        # 可选：切换 MySQL
│   ├── application-prod.yml         # 容器部署：根路径访问
│   └── application-menu-product.yml # 菜单定义（框架自动扫描 classpath*:application-menu*.yml）
├── web/                             # 前端 (Vite 8)
│   ├── package.json
│   ├── vite.config.js
│   ├── .env                         # PORT=8090, VITE_SERVLET_CONTEXT=/example
│   └── src/
│       ├── main.jsx                 # registerRoutes + Layouts
│       └── pages/                   # 文件即路由（vite-plugin 扫描）
│           ├── index.jsx
│           └── product/index.jsx    # ProTable CRUD 页面
└── data/                            # gitignored, 运行时数据

# 框架源码 (同级目录)
D:/ws/open-admin/
```

## Architecture

### Backend (四层)

```
Controller → Service → Repository (JPA) → Entity (H2 / MySQL)
```

- **Entity**: extends `BaseEntity` → UUIDv7 ID, createTime/user, updateTime/user
- **Repository**: extends `BaseRepository<T, String>` → CRUD, `Spec<T>` 动态查询(eq/like/in/between/or/groupBy), 分组统计, 批量操作
- **Service**: extends `BaseService<T>` → 通用 CRUD
- **Controller**: RESTful, 返回 `AjaxResult`, `@HasPermission` 权限控制
- **分页**: `PageExt<T>` extends `PageImpl`, 支持 summary 汇总行

### Frontend (组件体系)

| 组件 | 用途 |
|---|---|
| `ProTable` | 通用列表页（搜索/分页/工具栏） |
| `FormModal` | 弹出表单 |
| `FieldDictSelect` / `FieldRemoteSelect` / `FieldDate` / `FieldUploadFile` | 表单字段 |
| `ViewImage` / `ViewFile` / `ViewBoolean` / `ViewSwitch` | 展示组件 |
| `Page` / `PermActions` | 页面布局 / 权限包裹 |
| `HttpUtils` | axios 封装（自动拼 context-path） |
| `DictUtils` | 字典工具（`dictLabel(typeCode, value)`） |
| `GlobalData` | sessionStorage 封装 |

## Adding a Business Module

### 后端

**Entity** — 继承 `BaseEntity`，用 `@FieldNameConstants` 供 Spec 引用字段名：

```java
@Entity @Table(name = "your_table")
@Getter @Setter @FieldNameConstants
public class YourEntity extends BaseEntity {
    @NotNull @Column(nullable = false)
    private String name;
}
```

**Repository** — 零代码：

```java
public interface YourRepository extends BaseRepository<YourEntity, String> {}
```

**Service** — 零代码（需复杂业务逻辑时重写 BaseService 方法）：

```java
@Service
public class YourService extends BaseService<YourEntity> {}
```

**Controller** — RESTful + 权限注解：

```java
@RestController @RequestMapping("admin/your-resource")
@RequiredArgsConstructor
public class YourController {
    private final YourService service;

    @HasPermission("your:read")
    @RequestMapping("page")
    public AjaxResult page(String name, @PageableDefault(sort = "updateTime", direction = Sort.Direction.DESC) Pageable pageable) {
        return AjaxResult.ok().data(service.findAll(Spec.of().like("name", name), pageable));
    }

    @HasPermission("your:create") @PostMapping("create")
    public AjaxResult create(@RequestBody YourEntity input) {
        service.create(input);
        return AjaxResult.ok().msg("创建成功");
    }

    @HasPermission("your:update") @PostMapping("update")
    public AjaxResult update(@RequestBody YourEntity input, RequestBodyKeys updateFields) {
        service.update(input, updateFields);
        return AjaxResult.ok().msg("更新成功");
    }

    @HasPermission("your:delete") @PostMapping("delete")
    public AjaxResult delete(@Valid @RequestBody IdReq idRequest) {
        service.deleteById(idRequest.getId());
        return AjaxResult.ok().msg("删除成功");
    }
}
```

### 前端

在 `web/src/pages/your-page/index.jsx` 创建文件（路径即路由），ProTable + FormModal 快速 CRUD：

```jsx
import {PlusOutlined} from '@ant-design/icons'
import {Button, Form, Input, Popconfirm} from 'antd'
import {FormModal, HttpUtils, Page, PermActions, ProTable} from "@jiangood/open-admin";

export default class extends React.Component {
    modalRef = React.createRef()
    tableRef = React.createRef()

    columns = [
        {title: '名称', dataIndex: 'name'},
        {title: '操作', dataIndex: 'option',
            render: (_, r) => <PermActions>
                <Button perm='your:update' onClick={() => this.modalRef.current.open(r)}>编辑</Button>
                <Popconfirm perm='your:delete' title='确认删除' onConfirm={() =>
                    HttpUtils.post('admin/your-resource/delete', {id: r.id}).then(() => this.tableRef.current.reload())
                }><Button>删除</Button></Popconfirm>
            </PermActions>
        },
    ]

    render() {
        return <Page title="资源管理">
            <ProTable actionRef={this.tableRef}
                request={p => HttpUtils.get('admin/your-resource/page', p)}
                columns={this.columns}
                toolBarRender={() => <PermActions>
                    <Button perm='your:create' type='primary' icon={<PlusOutlined/>}
                        onClick={() => this.modalRef.current.open({})}>新增</Button>
                </PermActions>}
            />
            <FormModal ref={this.modalRef} title='资源' onFinish={v =>
                HttpUtils.post(v.id ? 'admin/your-resource/update' : 'admin/your-resource/create', v)
                    .then(() => this.tableRef.current.reload())
            }>
                <Form.Item label='名称' name='name' rules={[{required: true}]}><Input/></Form.Item>
            </FormModal>
        </Page>
    }
}
```

### 菜单

`src/main/resources/application-menu-xxx.yml`，框架自动扫描合并：

```yaml
menus:
  your-module:
    name: 模块名
    icon: SettingOutlined
  your-page:
    pid: your-module
    name: 页面名
    path: /your-page
    perms:
      - {name: 读取, code: your:read}
      - {name: 创建, code: your:create}
      - {name: 编辑, code: your:update}
      - {name: 删除, code: your:delete}
```

> 数据库无需手动 DDL —— JPA 根据 Entity 自动建表/更新。

## Built-in Modules

框架在 `io.github.jiangood.openadmin.modules.*` 中已实现：

| 模块 | 功能 |
|---|---|
| system | 用户/角色/菜单/组织/字典/文件/日志 |
| job | Quartz 定时任务管理 |
| logviewer | 运行日志在线查看 |

## Configuration

`spring.config.import: classpath:application-lib.yml` 引入框架默认配置。

| 配置 | 说明 | 默认 |
|---|---|---|
| `db_path` | H2 数据库文件路径（不含扩展名） | /data/db/open-admin-example |
| `sys.title` | 系统标题（必填） | 管理系统 |
| `sys.captcha-enable` | 登录验证码 | true |
| `sys.logo-url` | Logo 路径 | /admin/public/logo.svg |
| `sys.file.store-type` | 文件存储类型 (local/s3/custom) | local |

完整配置项见框架 `SystemProperties.java`。

## Context-Path

系统部署在子路径（如 `/example`）时，前后端需同步：

| 位置 | 文件 | 配置 |
|---|---|---|
| 后端 | `application.yml` | `server.servlet.context-path` |
| 前端环境变量 | `web/.env` | `VITE_SERVLET_CONTEXT` |
| 前端代理 | `web/vite.config.js` | proxy 目标自动根据 env 生成 |

## Framework

框架源码：`D:/ws/open-admin/`（同级目录，其 CLAUDE.md 含详细架构说明）

修改框架行为后需 `mvn install` 更新版本，再更新 example 的依赖版本。
