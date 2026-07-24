### Task 1: Create Vite entry files (index.html + main.jsx + vite.config.js)

**Files:**
- Create: `web/index.html`
- Create: `web/src/main.jsx`
- Create: `web/vite.config.js`

- [ ] **Step 1: Create `web/index.html`**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>open-admin-example</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 2: Create `web/src/main.jsx`**

```jsx
import React from 'react';
import {createRoot} from 'react-dom/client';
import routes from 'virtual:open-admin/routes';
import {registerRoutes, PageLoading} from '@jiangood/open-admin';
import Layouts from './layouts';

registerRoutes(routes);
createRoot(document.getElementById('root')).render(
    <React.Suspense fallback={<PageLoading/>}>
        <Layouts/>
    </React.Suspense>
);
```

- [ ] **Step 3: Create `web/vite.config.js`**

```js
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import openAdmin from '@jiangood/open-admin/vite-plugin';

export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const servletContext = env.VITE_SERVLET_CONTEXT || '/example';
    const serverPort = env.SERVER_PORT || '8080';

    return {
        plugins: [react(), openAdmin()],
        base: command === 'build' ? './' : '/',
        optimizeDeps: {exclude: ['@jiangood/open-admin']},
        server: {
            port: env.PORT ? Number(env.PORT) : 8090,
            proxy: {
                [servletContext]: {
                    target: `http://127.0.0.1:${serverPort}`,
                    changeOrigin: true,
                    ws: true,
                },
            },
        },
    };
});
```