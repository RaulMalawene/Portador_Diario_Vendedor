import type { StatusBadgeVariant } from '@/features/orders/types/orders.types'

const STATUS_VARIANT: Record<string, StatusBadgeVariant> = {
  pending: 'neutral',
  confirmed: 'info',
  processing: 'warning',
  shipped: 'teal',
  delivered: 'success',
}

export function orderStatusVariant(status: string): StatusBadgeVariant {
  return STATUS_VARIANT[status.toLowerCase()] ?? 'neutral'
}
