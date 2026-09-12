import type { StatusBadgeVariant } from '@/features/orders/types/orders.types'

// O rótulo já vem do backend (`status_label`); aqui só escolhemos a cor do
// badge a partir da chave do estado. Um estado desconhecido cai no neutro.
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
