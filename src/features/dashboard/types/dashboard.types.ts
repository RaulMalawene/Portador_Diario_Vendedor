import type { Component } from 'vue'

export interface NavItem {
  label: string
  icon: Component
  to?: string
}

export type OrderStatus = 'Pendente' | 'Processando' | 'Enviado' | 'Entregue'

export interface Order {
  id: string
  cliente: string
  data: string
  valor: string
  estado: OrderStatus
}

export interface KpiMetric {
  label: string
  value: string
  icon: Component
  trend: 'up' | 'down'
  delta: string
  note: string
}

export interface SalesPoint {
  label: string
  value: number
}
