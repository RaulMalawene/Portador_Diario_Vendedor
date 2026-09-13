import type { CategoryIconKey } from '../utils/categoryIcons'
import type { CategoryTheme } from '../utils/categoryTheme'

// O backend só guarda o nome da categoria — ícone e cor são calculados no
// frontend a partir do nome (ver utils/categoryIcons e utils/categoryTheme),
// só para os cartões ficarem visualmente distintos; não são dados reais.
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
