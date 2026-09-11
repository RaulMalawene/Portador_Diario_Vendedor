export type OrderStatus =
  'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export type StatusBadgeVariant = 'neutral' | 'info' | 'warning' | 'teal' | 'success' | 'danger'

export interface OrderStatusMeta {
  label: string
  badge: StatusBadgeVariant
}

export interface OrderItem {
  sku: string
  name: string
  quantity: number
  unitPrice: number
  available: number
}

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  address: string
}

export interface OrderHistoryEntry {
  to: OrderStatus
  note: string
  by: string
  date: string
}

export interface Order {
  id: string
  number: string
  status: OrderStatus
  placedAt: string
  expectedAt: string
  customer: OrderCustomer
  items: OrderItem[]
  history: OrderHistoryEntry[]
}

export interface StockConflict {
  product: string
  available: number
  requested: number
}

export type AdvanceResult = { ok: true } | { ok: false; conflict: StockConflict }
