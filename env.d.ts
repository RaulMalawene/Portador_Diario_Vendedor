/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API usada pela área do Cliente (src/features/loja), para
   * testar o backend com pedidos reais (login, criar encomenda, estado). */
  readonly VITE_CLIENT_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
