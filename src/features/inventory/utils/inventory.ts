import type { StockStatus } from '../types/inventory.types'

// O estado de stock já vem calculado pelo backend (Product::stockStatus(),
// limiar de 5 unidades) — não é recalculado aqui, para nunca desalinhar.
const STATUS_LABEL: Record<StockStatus, string> = {
  in_stock: 'Em Stock',
  low_stock: 'Stock Baixo',
  out_of_stock: 'Sem Stock',
}

const STATUS_VARIANT: Record<StockStatus, 'success' | 'warning' | 'danger'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
}

export function stockStatusLabel(status: StockStatus): string {
  return STATUS_LABEL[status]
}

export function stockStatusVariant(status: StockStatus) {
  return STATUS_VARIANT[status]
}

export function formatCurrency(value: number): string {
  return `${new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} MZN`
}
