import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';
import openAdmin from '@jiangood/open-admin/vite-plugin';


export default defineConfig(({mode, command}) => {
    const env = loadEnv(mode, process.cwd(), '');
    const servletContext = env.VITE_SERVER_SERVLET_CONTEXT_PATH;
    const serverPort = env.SERVER_PORT ;
    const port = Number(env.PORT);
    console.log('前端端口' + port +',后端端口' + serverPort +',请求上下文' + servletContext)

    return {
        plugins: [react(), openAdmin()],
        base: command === 'build' ? './' : '/',
        optimizeDeps: {
            entries: [
                'index.html',
                './node_modules/@jiangood/open-admin/src/**/*.{ts,tsx,js,jsx}',
            ],
        },
        server: {
            port: port,
            // 精确匹配后端真实路径前缀，避免 context-path 为 "/" 时全量代理（会拦截前端静态资源）
            proxy: (() => {
                const proxy = {};
                for (const p of ['admin', 'file', 'ureport']) {
                    proxy[servletContext + '/' + p] = {
                        target: `http://127.0.0.1:${serverPort}`,
                        changeOrigin: true,
                        ws: true,
                    };
                }
                return proxy;
            })(),
        },
    };
});