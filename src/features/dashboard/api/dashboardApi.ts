import { apiRequest } from '@/services/apiClient'

interface PaginatedMeta {
  current_page: number
  last_page: number
  total: number
}

interface Paginated<T> {
  data: T[]
  meta: PaginatedMeta
}

interface Collection<T> {
  data: T[]
}

export interface CountOutcome {
  ok: boolean
  count: number
}

/** Contagem de produtos que correspondem a um estado, sem carregar a lista toda. */
export async function fetchProductCount(
  token: string,
  status: 'active' | 'low_stock' | 'out_of_stock',
): Promise<CountOutcome> {
  const result = await apiRequest<Paginated<unknown>>('/products', {
    token,
    query: { status, page: 1 },
  })
  return result.ok && result.data ? { ok: true, count: result.data.meta.total } : { ok: false, count: 0 }
}

export async function fetchCustomerCount(token: string): Promise<CountOutcome> {
  const result = await apiRequest<Collection<unknown>>('/customers', { token })
  return result.ok && result.data
    ? { ok: true, count: result.data.data.length }
    : { ok: false, count: 0 }
}
