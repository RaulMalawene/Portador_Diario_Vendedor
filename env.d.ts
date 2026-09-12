/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API Laravel (E:\Vendor-back) usada pela Área do Cliente
   * (src/features/loja), para testar pedidos reais (login, encomendas). */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
