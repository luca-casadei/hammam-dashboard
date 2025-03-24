/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly VITE_GATEWAY_PORT: number
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}