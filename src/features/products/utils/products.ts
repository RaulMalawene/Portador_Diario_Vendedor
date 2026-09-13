import type { Product, ProductStockStatus } from '../types/products.types'

const STOCK_LABELS: Record<ProductStockStatus, string> = {
  in_stock: 'Em Stock',
  low_stock: 'Stock Baixo',
  out_of_stock: 'Esgotado',
}

const STOCK_VARIANT: Record<ProductStockStatus, 'success' | 'warning' | 'danger'> = {
  in_stock: 'success',
  low_stock: 'warning',
  out_of_stock: 'danger',
}

export function productBadgeVariant(product: Product) {
  if (!product.is_active) return 'neutral'
  return STOCK_VARIANT[product.stock_status]
}

export function productBadgeLabel(product: Product): string {
  return product.is_active ? STOCK_LABELS[product.stock_status] : 'Inactivo'
}
