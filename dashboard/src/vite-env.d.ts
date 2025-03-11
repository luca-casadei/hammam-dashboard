/// <reference types="vite/client" />

export interface ImportMetaEnv {
    readonly VITE_PORT: number
}

export interface ImportMeta {
    readonly env: ImportMetaEnv
}