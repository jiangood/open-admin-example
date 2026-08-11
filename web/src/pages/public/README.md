# pages/public/ — 公开页面

路由前缀 `/public/`，**免登录**、**无后台布局**（不渲染菜单/顶部栏）。

## 用途

- 登录页（框架内置 `/public/login`）
- 宣传页、活动页、对外分享页等任何无需登录即可访问的页面

## 新建公开页面

在 `src/pages/public/` 下创建小写开头的文件即可，vite-plugin 自动注册路由：

```
src/pages/public/notice.jsx   →  路由 /public/notice
```

页面组件接收 `props.params`（路径参数）与 `props.location.query`（查询参数）。

## 注意

- 公开页**不会加载登录态**，页面内数据请求不能依赖登录用户；需要调后端时，接口放在 `/admin/public/**` 下（SecurityConfig 已对该前缀免鉴权）。
- 登录成功后跳回业务页面即可（如 `history.push('/')`），参考框架内置登录页 `@jiangood/open-admin/src/pages/public/login.jsx`。
