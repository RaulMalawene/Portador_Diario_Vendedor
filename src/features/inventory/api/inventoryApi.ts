import { apiRequest } from '@/services/apiClient'
import type { MovementType, StockConflict } from '../types/inventory.types'

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

export interface InventoryProductDto {
  id: number
  name: string
  sku: string
  price: string
  stock: number
  is_active: boolean
  stock_status: string
  category: { id: number; name: string } | null
}

export interface StockMovementDto {
  id: number
  type: MovementType
  type_label: string
  quantity: number
  stock_after: number
  note: string | null
  created_at: string
}

export interface InventoryFilters {
  search?: string
  status?: 'low_stock' | 'out_of_stock'
  page?: number
}

export function fetchInventoryRequest(token: string, filters: InventoryFilters = {}) {
  return apiRequest<Paginated<InventoryProductDto>>('/inventory', {
    token,
    query: { search: filters.search, status: filters.status, page: filters.page },
  })
}

export function adjustStockRequest(
  token: string,
  productId: number,
  type: MovementType,
  quantity: number,
  note?: string,
) {
  return apiRequest<Resource<InventoryProductDto>>(`/products/${productId}/stock`, {
    method: 'POST',
    token,
    body: { type, quantity, note: note || undefined },
  })
}

export function fetchStockMovementsRequest(token: string, productId: number) {
  return apiRequest<Paginated<StockMovementDto>>(`/products/${productId}/stock-movements`, {
    token,
  })
}

export function extractStockConflict(errorPayload: unknown): StockConflict | null {
  if (!errorPayload || typeof errorPayload !== 'object') return null
  const { available, requested } = errorPayload as Record<string, unknown>
  if (typeof available !== 'number' || typeof requested !== 'number') return null
  return { available, requested }
}

export interface InventoryOutcome {
  ok: boolean
  items: InventoryProductDto[]
}

const MAX_INVENTORY_PAGES = 20

export async function fetchAllInventory(token: string): Promise<InventoryOutcome> {
  const first = await fetchInventoryRequest(token, { page: 1 })
  if (!first.ok || !first.data) return { ok: false, items: [] }

  const all = [...first.data.data]
  const lastPage = Math.min(first.data.meta.last_page, MAX_INVENTORY_PAGES)
  let ok = true

  if (lastPage > 1) {
    const pages = Array.from({ length: lastPage - 1 }, (_, index) => index + 2)
    const results = await Promise.all(pages.map((page) => fetchInventoryRequest(token, { page })))
    for (const result of results) {
      if (result.ok && result.data) all.push(...result.data.data)
      else ok = false
    }
  }

  return { ok, items: all }
}
