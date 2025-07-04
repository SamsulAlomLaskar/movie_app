interface ImportMetaEnv {
  readonly VITE_TMDB_API_BASE_URL: string;
  readonly VITE_TMDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
