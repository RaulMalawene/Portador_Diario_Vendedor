import { products } from '@/features/products/data/products.mock'
import type { Category } from '../types/categories.types'

function countProducts(categoryName: string): number {
  return products.filter((product) => product.categoria === categoryName).length
}

export const categories: Category[] = [
  {
    id: 'alimentacao',
    name: 'Alimentação',
    description: 'Cereais, farinhas, arroz e mantimentos essenciais para o dia a dia.',
    icon: 'utensils',
    theme: 'warning',
    productsCount: countProducts('Alimentação'),
    active: true,
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    description: 'Águas, refrigerantes e bebidas para todas as ocasiões.',
    icon: 'drink',
    theme: 'info',
    productsCount: countProducts('Bebidas'),
    active: true,
  },
  {
    id: 'limpeza',
    name: 'Limpeza',
    description: 'Detergentes, desinfectantes e produtos de manutenção do lar.',
    icon: 'spray',
    theme: 'success',
    productsCount: countProducts('Limpeza'),
    active: true,
  },
  {
    id: 'higiene',
    name: 'Higiene',
    description: 'Cuidado pessoal, sabonetes e produtos de higiene diária.',
    icon: 'shower',
    theme: 'teal',
    productsCount: countProducts('Higiene'),
    active: true,
  },
  {
    id: 'diversos',
    name: 'Diversos',
    description: 'Artigos variados que não se encaixam nas restantes categorias.',
    icon: 'boxes',
    theme: 'primary',
    productsCount: countProducts('Diversos'),
    active: false,
  },
]
