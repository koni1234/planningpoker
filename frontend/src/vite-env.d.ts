/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
    export default component;
}

interface ImportMetaEnv {
    readonly VITE_GRAPHQL_HOST: string;
    readonly VITE_GRAPHQL_PORT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
