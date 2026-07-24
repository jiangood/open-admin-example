### Task 5: Update CLAUDE.md

**File:** Modify `CLAUDE.md`

- [ ] **Step 1: Update Tech Stack line 14**

Change `UmiJS 4` → `Vite 8（自研 hash 路由 + PageFrame）`:

Old: `- **Frontend**: React 19, Ant Design 6, UmiJS 4, TypeScript`
New: `- **Frontend**: React 19, Ant Design 6, Vite 8（自研 hash 路由 + PageFrame）, TypeScript`

- [ ] **Step 2: Update Project Structure section**

Change `(UmiJS 4)` → `(Vite 8)` and update file tree to reflect Vite layout:

```
├── web/                   # 前端项目 (Vite 8)
│   ├── package.json      # 依赖 @jiangood/open-admin + antd + vite
│   ├── vite.config.js    # Vite 配置 + 开发代理
│   ├── index.html        # Vite HTML 入口
│   ├── .env              # PORT=8090, VITE_SERVLET_CONTEXT=/example
│   └── src/
│       ├── main.jsx      # 应用入口
│       ├── layouts/      # 布局组件
│       └── pages/        # 业务页面
```

- [ ] **Step 3: Update "前端框架" section line 73**

Old: `- **配置**: UmiJS 插件 `@jiangood/open-admin/config/common-plugin``
New: `- **配置**: Vite 插件 `@jiangood/open-admin/vite-plugin``

- [ ] **Step 4: Update "Context-Path 配置" section lines 103-105**

Old:
```
| 前端环境变量 | `web/.env` | `SERVLET_CONTEXT` |
| 前端代理 | `web/config/config.js` | proxy 配置 + define 注入 |
```
New:
```
| 前端环境变量 | `web/.env` | `VITE_SERVLET_CONTEXT` |
| 前端代理 | `web/vite.config.js` | proxy 配置 |
```