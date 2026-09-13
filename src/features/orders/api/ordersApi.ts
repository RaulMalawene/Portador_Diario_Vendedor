import { apiRequest } from '@/services/apiClient'
import type { StockConflict } from '../types/orders.types'

interface PaginatedMeta {
  current_page: number
  last_page: number
  total: number
}

interface Paginated<T> {
  data: T[]
  meta: PaginatedMeta
}

interface Resource<T> {
  data: T
}

export interface OrderCustomerDto {
  id: number
  name: string
  email: string | null
  phone: string | null
}

export interface OrderItemDto {
  id: number
  product_id: number
  product_name: string
  sku: string | null
  quantity: number
  unit_price: string
  subtotal: string
}

export interface OrderStatusHistoryDto {
  from: string | null
  from_label: string | null
  to: string
  to_label: string
  note: string | null
  created_at: string
}

export interface OrderDto {
  id: number
  number: string
  status: string
  status_label: string
  next_status: string | null
  next_status_label: string | null
  total: string
  placed_at: string
  items_count?: number
  customer?: OrderCustomerDto
  items?: OrderItemDto[]
  status_history?: OrderStatusHistoryDto[]
  created_at: string
}

export interface OrderFilters {
  search?: string
  status?: string
  page?: number
}

export function fetchOrdersRequest(token: string, filters: OrderFilters = {}) {
  return apiRequest<Paginated<OrderDto>>('/orders', {
    token,
    query: { search: filters.search, status: filters.status, page: filters.page },
  })
}

export function fetchOrderRequest(token: string, id: number) {
  return apiRequest<Resource<OrderDto>>(`/orders/${id}`, { token })
}

export function updateOrderStatusRequest(token: string, id: number, status: string) {
  return apiRequest<Resource<OrderDto>>(`/orders/${id}/status`, {
    method: 'PATCH',
    token,
    body: { status },
  })
}

/** Extrai o corpo de InsufficientStockException (422) quando presente. */
export function extractStockConflict(errorPayload: unknown): StockConflict | null {
  if (!errorPayload || typeof errorPayload !== 'object') return null
  const { available, requested, product } = errorPayload as Record<string, unknown>
  if (typeof available !== 'number' || typeof requested !== 'number') return null
  return { product: typeof product === 'string' ? product : null, available, requested }
}

export interface OrdersOutcome {
  ok: boolean
  orders: OrderDto[]
}

// Limite de segurança ao percorrer todas as páginas de encomendas.
const MAX_ORDER_PAGES = 20

/** Vai buscar todas as encomendas (percorrendo as páginas), para agregados
 * honestos (receita, distribuição por estado) que a paginação não dá. */
export async function fetchAllOrders(token: string): Promise<OrdersOutcome> {
  const first = await fetchOrdersRequest(token, { page: 1 })
  if (!first.ok || !first.data) return { ok: false, orders: [] }

  const all = [...first.data.data]
  const lastPage = Math.min(first.data.meta.last_page, MAX_ORDER_PAGES)
  let ok = true

  if (lastPage > 1) {
    const pages = Array.from({ length: lastPage - 1 }, (_, index) => index + 2)
    const results = await Promise.all(pages.map((page) => fetchOrdersRequest(token, { page })))
    for (const result of results) {
      if (result.ok && result.data) all.push(...result.data.data)
      else ok = false
    }
  }

  return { ok, orders: all }
}
