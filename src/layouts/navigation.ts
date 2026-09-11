import { LayoutGrid, Package, Boxes, ShoppingCart, User } from '@lucide/vue'
import type { NavItem } from './layout.types'

export const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutGrid, to: '/home' },
  { label: 'Produtos', icon: Package, to: '/produtos' },
  { label: 'Inventário', icon: Boxes },
  { label: 'Encomendas', icon: ShoppingCart },
  { label: 'Perfil', icon: User },
]
