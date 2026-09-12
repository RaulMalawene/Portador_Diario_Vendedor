import type { StatusBadgeVariant } from '@/features/orders/types/orders.types'

// O backend real pode devolver estados diferentes dos deste mapa — qualquer
// estado desconhecido cai no rótulo neutro em baixo, em vez de rebentar.
const STATUS_META: Record<string, { label: string; variant: StatusBadgeVariant }> = {
  pending: { label: 'Pendente', variant: 'neutral' },
  confirmed: { label: 'Confirmada', variant: 'info' },
  processing: { label: 'Em Processamento', variant: 'warning' },
  shipped: { label: 'Enviada', variant: 'teal' },
  delivered: { label: 'Entregue', variant: 'success' },
  cancelled: { label: 'Cancelada', variant: 'danger' },
}

export function orderStatusMeta(status: string): { label: string; variant: StatusBadgeVariant } {
  return STATUS_META[status.toLowerCase()] ?? { label: status, variant: 'neutral' }
}
