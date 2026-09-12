import type { CategoryIconKey } from '../utils/categoryIcons'
import type { CategoryTheme } from '../utils/categoryTheme'

export interface Category {
  id: string
  name: string
  description: string
  icon: CategoryIconKey
  theme: CategoryTheme
  productsCount: number
  active: boolean
}

export interface CategoryFormState {
  name: string
  description: string
  isActive: boolean
}
