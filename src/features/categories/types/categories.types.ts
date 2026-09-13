import type { CategoryIconKey } from '../utils/categoryIcons'
import type { CategoryTheme } from '../utils/categoryTheme'

export interface Category {
  id: number
  name: string
  productsCount: number
  icon: CategoryIconKey
  theme: CategoryTheme
}

export interface CategoryFormState {
  name: string
}
