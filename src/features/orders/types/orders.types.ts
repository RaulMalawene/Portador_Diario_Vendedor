export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'

export type StatusBadgeVariant = 'neutral' | 'info' | 'warning' | 'teal' | 'success'

export interface OrderStatusMeta {
  label: string
  badge: StatusBadgeVariant
}

export interface OrderItem {
  id: number
  sku: string | null
  name: string
  quantity: number
  unitPrice: number
  subtotal: number
}

export interface OrderCustomer {
  id: number
  name: string
  email: string | null
  phone: string | null
}

export interface OrderHistoryEntry {
  from: OrderStatus | null
  fromLabel: string | null
  to: OrderStatus
  toLabel: string
  note: string | null
  date: string
}

export interface Order {
  id: number
  number: string
  status: OrderStatus
  statusLabel: string
  nextStatus: OrderStatus | null
  nextStatusLabel: string | null
  placedAt: string
  total: number
  itemsCount: number
  customer: OrderCustomer
  items: OrderItem[]
  history: OrderHistoryEntry[]
}

export interface StockConflict {
  product: string | null
  available: number
  requested: number
}

export type AdvanceResult =
  | { ok: true; order: Order }
  | { ok: false; error: string; conflict?: StockConflict }
