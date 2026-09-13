import type { Order, OrderStatus, OrderStatusMeta, StatusBadgeVariant } from '../types/orders.types'

export const STATUS_SEQUENCE: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
]

// Rótulos alinhados exactamente com App\Enums\OrderStatus::label() no backend
// — usados aqui só para a legenda genérica do stepper e o filtro da toolbar.
// Para o estado de uma encomenda concreta, usa sempre `order.statusLabel`
// (vem da API), nunca `statusLabel(order.status)`.
export const STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  pending: { label: 'Pendente', badge: 'neutral' },
  confirmed: { label: 'Confirmada', badge: 'info' },
  processing: { label: 'Em processamento', badge: 'warning' },
  shipped: { label: 'Enviada', badge: 'teal' },
  delivered: { label: 'Entregue', badge: 'success' },
}

const BADGE_COLOR_VAR: Record<StatusBadgeVariant, string> = {
  neutral: '--color-muted',
  info: '--color-info',
  warning: '--color-warning',
  teal: '--color-teal',
  success: '--color-success',
}

export function statusLabel(status: OrderStatus): string {
  return STATUS_META[status].label
}

export function statusBadge(status: OrderStatus): StatusBadgeVariant {
  return STATUS_META[status].badge
}

export function statusColorVar(status: OrderStatus): string {
  return `var(${BADGE_COLOR_VAR[STATUS_META[status].badge]})`
}

/** Total de unidades pedidas (soma as quantidades de todas as linhas). */
export function itemsCount(order: Order): number {
  return order.items.reduce((sum, item) => sum + item.quantity, 0)
}

export function formatMoney(value: number): string {
  return `${new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} MZN`
}

export function customerInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}
