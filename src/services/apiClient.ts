// Cliente HTTP fino e partilhado para falar com a API real em E:\Vendor-back
// (Laravel + Sanctum, tokens Bearer) — usado tanto pelo login do fornecedor
// (src/features/auth) como pela Área do Cliente de teste (src/features/loja).
//
// Não lança excepções: cada pedido devolve sempre um resultado tipado com o
// estado HTTP e a mensagem de erro (extraída do JSON de validação do
// Laravel quando existe).

const DEFAULT_BASE_URL = 'http://localhost:8000/api'

export const API_BASE_URL = (import.meta.env.VITE_API_URL || DEFAULT_BASE_URL).replace(/\/+$/, '')

export interface ApiResult<T> {
  ok: boolean
  status: number | null
  data: T | null
  error: string | null
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string | null
  query?: Record<string, string | number | undefined>
}

interface LaravelErrorPayload {
  message?: string
  errors?: Record<string, string[]>
}

function buildUrl(path: string, query?: RequestOptions['query']): string {
  const url = new URL(`${API_BASE_URL}${path}`)
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') url.searchParams.set(key, String(value))
    }
  }
  return url.toString()
}

/** O Laravel devolve `{ message, errors: { campo: [msgs] } }` em erros 422. */
function extractErrorMessage(payload: unknown, fallback: string): string {
  if (payload && typeof payload === 'object') {
    const { errors, message } = payload as LaravelErrorPayload
    const firstFieldError = errors && Object.values(errors)[0]?.[0]
    return firstFieldError ?? message ?? fallback
  }
  return fallback
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<ApiResult<T>> {
  const headers: Record<string, string> = { Accept: 'application/json' }
  if (options.body !== undefined) headers['Content-Type'] = 'application/json'
  if (options.token) headers.Authorization = `Bearer ${options.token}`

  try {
    const response = await fetch(buildUrl(path, options.query), {
      method: options.method ?? 'GET',
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    })

    const raw = await response.text()
    let payload: unknown = null
    if (raw) {
      try {
        payload = JSON.parse(raw)
      } catch {
        // Resposta não é JSON (ex.: página de erro do servidor).
        return {
          ok: false,
          status: response.status,
          data: null,
          error: raw.slice(0, 200) || `Erro ${response.status}`,
        }
      }
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        data: null,
        error: extractErrorMessage(payload, `Erro ${response.status}`),
      }
    }

    return { ok: true, status: response.status, data: payload as T, error: null }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Falha de ligação ao servidor.'
    return { ok: false, status: null, data: null, error: message }
  }
}
