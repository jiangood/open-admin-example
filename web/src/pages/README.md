# 前端页面目录约定

页面文件放在 `src/pages/` 下，文件扩展名 `.jsx` / `.tsx`，文件名首字母**小写**才注册为路由（大写开头视为普通组件），由 vite-plugin 自动扫描，无需手动配置路由。

## 目录类型

按所在目录自动识别页面类型：

| 目录 | 路由前缀 | 是否需要登录 | 是否需要 AdminLayout |
|------|---------|-------------|---------------------|
| `pages/` | `/` | ✅ 是 | ✅ 是 |
| `pages/public/` | `/public/` | ❌ 否 | ❌ 否 |
| `pages/standalone/` | `/standalone/` | ✅ 是 | ❌ 否 |

- **`pages/`** — 常规业务页面，带后台布局（菜单/顶部栏），需登录。如 `pages/product/index.jsx` → `/product`。
- **`pages/public/`** — 公开页面，免登录、无后台布局。详见 [public/README.md](public/README.md)。
- **`pages/standalone/`** — 需登录但无后台布局的独立页面。详见 [standalone/README.md](standalone/README.md)。

## 路由规则

- `pages/xxx/index.jsx` → 路由 `/xxx`
- `pages/xxx/$id.jsx` → 动态路由 `/xxx/:id`（`$` 对应 `:`）
- 业务页面与框架内置页面路由冲突时，**业务页面优先**（可覆盖框架页面）

## 新建页面

在对应目录创建小写开头的文件即可，例如公开页面：

```
src/pages/public/notice.jsx   →  路由 /public/notice
```

页面组件接收 `props.params`（路径参数）与 `props.location.query`（查询参数）。需要 `onShow()` 生命周期（多 Tab 切回时触发）可参考框架文档。
