export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type MovementType = 'in' | 'out' | 'adjustment'

export interface InventoryItem {
  name: string
  sku: string
  categoria: string
  stock: number
  unitPrice: number
}

export interface StockMovement {
  type: MovementType
  quantity: number
  stockAfter: number
  note: string
  date: string
}

export interface AdjustFormState {
  sku: string
  type: MovementType
  quantity: string
  note: string
}
