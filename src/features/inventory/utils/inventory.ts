import type { MovementType, StockStatus } from '../types/inventory.types'

const LOW_STOCK_THRESHOLD = 5

export function stockStatus(stock: number): StockStatus {
  if (stock <= 0) return 'out_of_stock'
  if (stock <= LOW_STOCK_THRESHOLD) return 'low_stock'
  return 'in_stock'
}

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

export function stockStatusLabel(stock: number): string {
  return STATUS_LABEL[stockStatus(stock)]
}

export function stockStatusVariant(stock: number) {
  return STATUS_VARIANT[stockStatus(stock)]
}

const MOVEMENT_LABEL: Record<MovementType, string> = {
  in: 'Entrada',
  out: 'Saída',
  adjustment: 'Correção',
}

export function movementLabel(type: MovementType): string {
  return MOVEMENT_LABEL[type]
}

export function formatCurrency(value: number): string {
  return `${new Intl.NumberFormat('pt-PT', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)} MZN`
}
