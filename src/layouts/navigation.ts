import { LayoutGrid, Package, Boxes, ShoppingCart } from '@lucide/vue'
import type { NavItem } from './layout.types'

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/home' },
  { label: 'Produtos', icon: Package, to: '/produtos' },
  { label: 'Inventário', icon: Boxes, to: '/inventario' },
  { label: 'Encomendas', icon: ShoppingCart, to: '/encomendas' },
]
