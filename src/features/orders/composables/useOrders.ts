import { computed, ref } from 'vue'
import { orders as initialOrders } from '../data/orders.mock'
import type { AdvanceResult, Order } from '../types/orders.types'
import { STATUS_META, canCancel, nextStatus, orderTotal } from '../utils/orders'

// Module-level state: shared by the orders list and the order detail view so a
// status change made on one screen is reflected on the other.
const orders = ref<Order[]>(structuredClone(initialOrders))

export function useOrders() {
  const kpis = computed(() => ({
    total: orders.value.length,
    pending: orders.value.filter((order) => order.status === 'pending').length,
    inProgress: orders.value.filter((order) =>
      ['confirmed', 'processing', 'shipped'].includes(order.status),
    ).length,
    revenue: orders.value.reduce((sum, order) => sum + orderTotal(order.items), 0),
  }))

  function findById(id: string): Order | null {
    return orders.value.find((order) => order.id === id) ?? null
  }

  function advance(id: string, actor = 'João Maputo'): AdvanceResult {
    const order = findById(id)
    const next = order ? nextStatus(order.status) : null
    if (!order || !next) return { ok: false, conflict: { product: '', available: 0, requested: 0 } }

    const shortage = order.items.find((item) => item.quantity > item.available)
    if (shortage) {
      return {
        ok: false,
        conflict: {
          product: shortage.name,
          available: shortage.available,
          requested: shortage.quantity,
        },
      }
    }

    order.status = next
    order.history.unshift({
      to: next,
      note: `Estado alterado para "${STATUS_META[next].label}"`,
      by: actor,
      date: 'Agora mesmo',
    })
    return { ok: true }
  }

  function cancel(id: string, actor = 'João Maputo'): boolean {
    const order = findById(id)
    if (!order || !canCancel(order.status)) return false

    order.status = 'cancelled'
    order.history.unshift({
      to: 'cancelled',
      note: 'Encomenda cancelada',
      by: actor,
      date: 'Agora mesmo',
    })
    return true
  }

  return { orders, kpis, findById, advance, cancel }
}
