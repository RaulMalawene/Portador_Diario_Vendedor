import type { Component } from 'vue'
import type { OrderStatus } from '@/features/orders/types/orders.types'

export interface KpiMetric {
  label: string
  value: string
  icon: Component
  hint?: string
}

export interface SalesPoint {
  label: string
  value: number
}

export interface OrderStatusSummary {
  status: OrderStatus
  count: number
  percentage: number
}

/** Encomenda tal como vem da API (subconjunto do OrderResource do backend). */
export interface DashboardOrder {
  id: number
  number: string
  status: OrderStatus
  statusLabel: string
  total: string
  placedAt: string
  customerName: string
}

export interface StockAlerts {
  lowStock: number
  outOfStock: number
}
