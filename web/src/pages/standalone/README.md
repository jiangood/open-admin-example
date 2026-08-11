# pages/standalone/ — 独立页面

路由前缀 `/standalone/`，**需登录**但**无后台布局**（不渲染菜单/顶部栏）。

## 用途

- 强制修改密码页（框架内置 `/standalone/forceUpdatePwd`）
- 全屏操作、流程审批、外部跳转页等需要登录但不适合放进后台布局的页面

## 新建独立页面

在 `src/pages/standalone/` 下创建小写开头的文件即可，vite-plugin 自动注册路由：

```
src/pages/standalone/approve.jsx   →  路由 /standalone/approve
```

页面组件接收 `props.params`（路径参数）与 `props.location.query`（查询参数）。

## 注意

- 与公开页不同，`standalone` 页面会走登录校验（`layouts` 会在渲染前检查登录态），未登录自动跳转登录页。
- 页面无后台布局，需要返回入口时可自行提供入口按钮或链接。
