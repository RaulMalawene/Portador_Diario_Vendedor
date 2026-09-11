import type { Product, ProductStatus } from '../types/products.types'

const BADGE_VARIANT_BY_STATUS: Record<ProductStatus, 'success' | 'danger' | 'warning'> = {
  'Em Stock': 'success',
  Esgotado: 'danger',
  Pendente: 'warning',
}

export function productBadgeVariant(product: Product) {
  if (!product.active) return 'neutral'
  return BADGE_VARIANT_BY_STATUS[product.estado] ?? 'neutral'
}

export function productBadgeLabel(product: Product): string {
  return product.active ? product.estado : 'Inactivo'
}
