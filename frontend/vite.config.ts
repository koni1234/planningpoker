import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        host: true,
        port: 8080,
        watch: {
            usePolling: true,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "./src/scss/variables.scss";`,
            },
        },
    },
});
