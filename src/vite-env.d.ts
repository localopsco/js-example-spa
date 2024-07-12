/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_VERSION: string;

  // manually set variables
  readonly VITE_DISABLE_MSW: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
