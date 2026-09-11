import type {
  Order,
  OrderItem,
  OrderStatus,
  OrderStatusMeta,
  StatusBadgeVariant,
} from '../types/orders.types'

export const STATUS_SEQUENCE: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
]

export const STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  pending: { label: 'Pendente', badge: 'neutral' },
  confirmed: { label: 'Confirmada', badge: 'info' },
  processing: { label: 'Em Processamento', badge: 'warning' },
  shipped: { label: 'Enviada', badge: 'teal' },
  delivered: { label: 'Entregue', badge: 'success' },
  cancelled: { label: 'Cancelada', badge: 'danger' },
}

const BADGE_COLOR_VAR: Record<StatusBadgeVariant, string> = {
  neutral: '--color-muted',
  info: '--color-info',
  warning: '--color-warning',
  teal: '--color-teal',
  success: '--color-success',
  danger: '--color-danger',
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

export function nextStatus(status: OrderStatus): OrderStatus | null {
  const index = STATUS_SEQUENCE.indexOf(status)
  if (index === -1 || index === STATUS_SEQUENCE.length - 1) return null
  return STATUS_SEQUENCE[index + 1] ?? null
}

export function canCancel(status: OrderStatus): boolean {
  return status === 'pending' || status === 'confirmed'
}

export function orderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
}

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
