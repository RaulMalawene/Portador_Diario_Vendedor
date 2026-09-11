import { LayoutGrid, Package, Boxes, ShoppingCart, User, ArrowUpRight } from '@lucide/vue'
import type { KpiMetric, NavItem, Order, SalesPoint } from '../types/dashboard.types'

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/home' },
  { label: 'Produtos', icon: Package },
  { label: 'Inventário', icon: Boxes },
  { label: 'Encomendas', icon: ShoppingCart },
  { label: 'Perfil', icon: User },
]

export const kpis: KpiMetric[] = [
  {
    label: 'Vendas Totais',
    value: '1.240.500 MZN',
    icon: ShoppingCart,
    trend: 'up',
    delta: '12.5%',
    note: 'vs. mês passado',
  },
  {
    label: 'Encomendas Activas',
    value: '42',
    icon: Package,
    trend: 'down',
    delta: '4.2%',
    note: 'vs. mês passado',
  },
  {
    label: 'Nível de Inventário',
    value: '88%',
    icon: Boxes,
    trend: 'up',
    delta: '2.1%',
    note: 'capacidade total',
  },
  {
    label: 'Satisfação do Cliente',
    value: '4.8',
    icon: ArrowUpRight,
    trend: 'up',
    delta: '0.5%',
    note: 'pontuação média',
  },
]

export const orders: Order[] = [
  {
    id: 'ORD-9281',
    cliente: 'Supermercados VIP',
    data: '12/10/2023',
    valor: '45.000 MZN',
    estado: 'Entregue',
  },
  {
    id: 'ORD-9282',
    cliente: 'Farmácia Central',
    data: '13/10/2023',
    valor: '12.500 MZN',
    estado: 'Processando',
  },
  {
    id: 'ORD-9283',
    cliente: 'Lojas Maputo',
    data: '14/10/2023',
    valor: '89.200 MZN',
    estado: 'Pendente',
  },
  {
    id: 'ORD-9284',
    cliente: 'Restaurante Zambi',
    data: '14/10/2023',
    valor: '32.000 MZN',
    estado: 'Enviado',
  },
  {
    id: 'ORD-9285',
    cliente: 'Hotel Polana',
    data: '15/10/2023',
    valor: '124.000 MZN',
    estado: 'Pendente',
  },
]

export const weeklySales: SalesPoint[] = [
  { label: 'Seg', value: 148000 },
  { label: 'Ter', value: 132000 },
  { label: 'Qua', value: 176500 },
  { label: 'Qui', value: 159000 },
  { label: 'Sex', value: 203400 },
  { label: 'Sáb', value: 221800 },
  { label: 'Dom', value: 118700 },
]
