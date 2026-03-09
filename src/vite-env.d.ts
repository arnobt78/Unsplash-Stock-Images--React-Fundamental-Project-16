/// <reference types="vite/client" />

/** Env vars exposed to the client (must be prefixed with VITE_ in .env) */
interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
