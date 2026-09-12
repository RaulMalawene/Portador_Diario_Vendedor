// Cliente HTTP fino para a Área do Cliente (src/features/loja).
//
// Contrato assumido do backend (ajusta os endpoints em `clientApi.ts` quando
// tiveres a API real — o resto do ecrã não precisa de mudar):
//   POST {base}/auth/login   { email, password }        -> { token, customer }
//   POST {base}/orders       { items } (com Bearer token) -> encomenda criada
//   GET  {base}/orders       (com Bearer token)          -> { orders: [...] }
//
// Não lança excepções: cada pedido devolve sempre um resultado tipado com o
// estado HTTP e a duração, para que os ecrãs possam mostrar o que realmente
// aconteceu no servidor — importante ao testar pedidos simultâneos.

const DEFAULT_BASE_URL = 'http://localhost:3000/api'

export const API_BASE_URL = (import.meta.env.VITE_CLIENT_API_URL || DEFAULT_BASE_URL).replace(
  /\/+$/,
  '',
)

export interface RequestOutcome<T> {
  ok: boolean
  status: number | null
  data: T | null
  error: string | null
  durationMs: number
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string | null
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<RequestOutcome<T>> {
  const startedAt = performance.now()
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    })

    const durationMs = Math.round(performance.now() - startedAt)
    const raw = await response.text()
    let data: T | null = null

    if (raw) {
      try {
        data = JSON.parse(raw) as T
      } catch {
        // Resposta não é JSON (ex.: página de erro HTML de um servidor que
        // ainda não implementa a rota) — mostra o início do texto bruto.
        return {
          ok: false,
          status: response.status,
          data: null,
          error: raw.slice(0, 200) || `Erro ${response.status}`,
          durationMs,
        }
      }
    }

    if (!response.ok) {
      const message = (data as { message?: string } | null)?.message ?? `Erro ${response.status}`
      return { ok: false, status: response.status, data: null, error: message, durationMs }
    }

    return { ok: true, status: response.status, data, error: null, durationMs }
  } catch (err) {
    const durationMs = Math.round(performance.now() - startedAt)
    const message = err instanceof Error ? err.message : 'Falha de ligação ao servidor.'
    return { ok: false, status: null, data: null, error: message, durationMs }
  }
}
