import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  extractStockConflict,
  fetchAllOrders,
  fetchOrderRequest,
  fetchOrdersRequest,
  updateOrderStatusRequest,
  type OrderDto,
  type OrderFilters,
} from '../api/ordersApi'
import type { AdvanceResult, Order, OrderStatus } from '../types/orders.types'

function toOrder(dto: OrderDto): Order {
  return {
    id: dto.id,
    number: dto.number,
    status: dto.status as OrderStatus,
    statusLabel: dto.status_label,
    nextStatus: (dto.next_status as OrderStatus | null) ?? null,
    nextStatusLabel: dto.next_status_label,
    placedAt: dto.placed_at,
    total: Number(dto.total),
    itemsCount: dto.items_count ?? dto.items?.length ?? 0,
    customer: dto.customer
      ? {
          id: dto.customer.id,
          name: dto.customer.name,
          email: dto.customer.email,
          phone: dto.customer.phone,
        }
      : { id: 0, name: '—', email: null, phone: null },
    items: (dto.items ?? []).map((item) => ({
      id: item.id,
      sku: item.sku,
      name: item.product_name,
      quantity: item.quantity,
      unitPrice: Number(item.unit_price),
      subtotal: Number(item.subtotal),
    })),
    history: (dto.status_history ?? []).map((entry) => ({
      from: (entry.from as OrderStatus | null) ?? null,
      fromLabel: entry.from_label,
      to: entry.to as OrderStatus,
      toLabel: entry.to_label,
      note: entry.note,
      date: entry.created_at,
    })),
  }
}

export interface OrdersKpis {
  total: number
  pending: number
  inProgress: number
  revenue: number
}

const IN_PROGRESS_STATUSES: OrderStatus[] = ['confirmed', 'processing', 'shipped']

export function useOrders() {
  const authStore = useAuthStore()

  const orders = ref<Order[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const meta = ref({ total: 0, currentPage: 1, lastPage: 1 })

  const kpis = ref<OrdersKpis>({ total: 0, pending: 0, inProgress: 0, revenue: 0 })
  const isLoadingKpis = ref(false)

  async function load(filters: OrderFilters = {}) {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    loadError.value = null

    const result = await fetchOrdersRequest(token, filters)
    isLoading.value = false

    if (!result.ok || !result.data) {
      loadError.value = result.error ?? 'Não foi possível carregar as encomendas.'
      return
    }

    orders.value = result.data.data.map(toOrder)
    meta.value = {
      total: result.data.meta.total,
      currentPage: result.data.meta.current_page,
      lastPage: result.data.meta.last_page,
    }
  }

  async function loadKpis() {
    const token = authStore.token
    if (!token) return

    isLoadingKpis.value = true
    const result = await fetchAllOrders(token)
    isLoadingKpis.value = false

    if (!result.ok) return

    const all = result.orders
    kpis.value = {
      total: all.length,
      pending: all.filter((order) => order.status === 'pending').length,
      inProgress: all.filter((order) => IN_PROGRESS_STATUSES.includes(order.status as OrderStatus))
        .length,
      revenue: all.reduce((sum, order) => sum + Number(order.total), 0),
    }
  }

  async function fetchAllForExport(
    filters: Omit<OrderFilters, 'page'> = {},
  ): Promise<Order[] | null> {
    const token = authStore.token
    if (!token) return null

    const result = await fetchAllOrders(token, filters)
    return result.ok ? result.orders.map(toOrder) : null
  }

  async function fetchOrder(id: number): Promise<Order | null> {
    const token = authStore.token
    if (!token) return null

    const result = await fetchOrderRequest(token, id)
    return result.ok && result.data ? toOrder(result.data.data) : null
  }

  async function advance(order: Order): Promise<AdvanceResult> {
    const token = authStore.token
    if (!token || !order.nextStatus) {
      return { ok: false, error: 'Não há um próximo estado disponível.' }
    }

    const result = await updateOrderStatusRequest(token, order.id, order.nextStatus)

    if (!result.ok || !result.data) {
      const conflict = extractStockConflict(result.errorPayload) ?? undefined
      return { ok: false, error: result.error ?? 'Não foi possível avançar o estado.', conflict }
    }

    return { ok: true, order: toOrder(result.data.data) }
  }

  return {
    orders,
    isLoading,
    loadError,
    meta,
    kpis,
    isLoadingKpis,
    load,
    loadKpis,
    fetchAllForExport,
    fetchOrder,
    advance,
  }
}
