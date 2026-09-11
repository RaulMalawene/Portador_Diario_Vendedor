import type { Order, OrderStatus } from '../types/dashboard.types'

export const ORDER_STATUS_SEQUENCE: OrderStatus[] = [
  'Pendente',
  'Processando',
  'Enviado',
  'Entregue',
]

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  Pendente: '#d48fbe',
  Processando: '#c06aa0',
  Enviado: '#a8447f',
  Entregue: '#711c5a',
}

const BADGE_CLASS_BY_STATUS: Record<OrderStatus, string> = {
  Entregue: 'badge--success',
  Processando: 'badge--info',
  Pendente: 'badge--warning',
  Enviado: 'badge--teal',
}

export function badgeClass(estado: OrderStatus): string {
  return BADGE_CLASS_BY_STATUS[estado] ?? 'badge--neutral'
}

export interface OrderStatusSummary {
  status: OrderStatus
  count: number
  percentage: number
}

export function summarizeOrdersByStatus(orders: Order[]): OrderStatusSummary[] {
  const total = orders.length

  return ORDER_STATUS_SEQUENCE.map((status) => {
    const count = orders.filter((order) => order.estado === status).length
    return { status, count, percentage: total === 0 ? 0 : Math.round((count / total) * 100) }
  })
}
