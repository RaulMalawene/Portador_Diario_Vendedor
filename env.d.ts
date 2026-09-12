/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API Laravel (E:\Vendor-back), partilhada pelo login do
   * fornecedor (src/features/auth) e pela Área do Cliente de teste
   * (src/features/loja). Ver src/services/apiClient.ts. */
  readonly VITE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
