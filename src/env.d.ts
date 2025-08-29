/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TITLE?: string;
  readonly VITE_VERSION?: string;
  readonly VITE_CANVAS_WIDTH?: string;
  readonly VITE_CANVAS_HEIGHT?: string;
  readonly VITE_CANVAS_BG?: string;
  readonly VITE_API_BASE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

