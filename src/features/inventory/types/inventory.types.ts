export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type MovementType = 'in' | 'out' | 'adjustment'

export interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string | null
  stock: number
  unitPrice: number
  stockStatus: StockStatus
}

export interface StockMovement {
  id: number
  type: MovementType
  typeLabel: string
  quantity: number
  stockAfter: number
  note: string | null
  date: string
}

export interface AdjustFormState {
  productId: number | null
  type: MovementType
  quantity: string
  note: string
}

/** Corpo de InsufficientStockException (422) ao ajustar stock abaixo de zero. */
export interface StockConflict {
  available: number
  requested: number
}
