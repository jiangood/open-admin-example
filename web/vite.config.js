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
        resolve: {dedupe: ['react', 'react-dom']},
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
