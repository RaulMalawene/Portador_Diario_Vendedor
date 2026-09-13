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

export interface OrderApiItem {
  id: number
  number: string
  status: string
  total: string
  placed_at: string
  customer?: { name: string } | null
}

// Limite de segurança ao percorrer todas as páginas de encomendas — evita
// pedidos descontrolados se a loja crescer muito.
const MAX_ORDER_PAGES = 20

export interface CountOutcome {
  ok: boolean
  count: number
}

export interface OrdersOutcome {
  ok: boolean
  orders: OrderApiItem[]
}

/** Vai buscar todas as encomendas do fornecedor (percorrendo as páginas),
 * para calcular receita e distribuição por estado com dados reais. */
export async function fetchAllOrders(token: string): Promise<OrdersOutcome> {
  const first = await apiRequest<Paginated<OrderApiItem>>('/orders', {
    token,
    query: { page: 1 },
  })
  if (!first.ok || !first.data) return { ok: false, orders: [] }

  const all = [...first.data.data]
  const lastPage = Math.min(first.data.meta.last_page, MAX_ORDER_PAGES)
  let ok = true

  if (lastPage > 1) {
    const pages = Array.from({ length: lastPage - 1 }, (_, index) => index + 2)
    const results = await Promise.all(
      pages.map((page) => apiRequest<Paginated<OrderApiItem>>('/orders', { token, query: { page } })),
    )
    for (const result of results) {
      if (result.ok && result.data) all.push(...result.data.data)
      else ok = false
    }
  }

  return { ok, orders: all }
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
