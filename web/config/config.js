import {defineConfig} from 'umi';

const host = '127.0.0.1:8080';
const SERVLET_CONTEXT = process.env.SERVLET_CONTEXT || '/example';

const proxyConfig = {
    [SERVLET_CONTEXT]: {
        target: `http://${host}`,
        changeOrigin: true,
    },
};

export default defineConfig({
    define: {
        SERVLET_CONTEXT: SERVLET_CONTEXT,
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    hash: true,
    history: { type: 'hash' },
    mfsu: false,
    esbuildMinifyIIFE: true,
    plugins: [
        '@jiangood/open-admin/config/common-plugin',
    ],
    proxy: proxyConfig,
});