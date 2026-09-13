import { categoryNames } from '@/features/categories/data/categoryNames'

// Dados de demonstração usados apenas pelo ecrã de Categorias (ainda por
// ligar à API) para contar produtos por categoria — independentes do
// formato real de Product (já ligado ao backend em src/features/products).
interface MockProduct {
  name: string
  sku: string
  categoria: string
  preco: string
  stock: number
  estado: 'Em Stock' | 'Esgotado' | 'Pendente'
  active: boolean
}

// Reutiliza a mesma lista de nomes usada no ecrã de Categorias, para que
// os dois ecrãs fiquem sempre em concordância.
export const categories: string[] = [...categoryNames]

export const products: MockProduct[] = [
  {
    name: 'Farinha de Milho Especial 1kg',
    sku: 'MZ-FL-001',
    categoria: 'Alimentação',
    preco: '85,50',
    stock: 450,
    estado: 'Em Stock',
    active: true,
  },
  {
    name: 'Óleo Vegetal Refinado 1L',
    sku: 'MZ-OL-042',
    categoria: 'Alimentação',
    preco: '145,00',
    stock: 0,
    estado: 'Esgotado',
    active: true,
  },
  {
    name: 'Arroz agulha Extra 5kg',
    sku: 'MZ-AR-109',
    categoria: 'Alimentação',
    preco: '320,00',
    stock: 125,
    estado: 'Em Stock',
    active: true,
  },
  {
    name: 'Água Mineral Natural 500ml',
    sku: 'MZ-AG-500',
    categoria: 'Bebidas',
    preco: '25,00',
    stock: 1200,
    estado: 'Em Stock',
    active: true,
  },
  {
    name: 'Detergente em Pó 1.5kg',
    sku: 'MZ-DB-015',
    categoria: 'Limpeza',
    preco: '215,75',
    stock: 45,
    estado: 'Pendente',
    active: true,
  },
  {
    name: 'Sabonete Líquido Antibacteriano',
    sku: 'MZ-SP-005',
    categoria: 'Higiene',
    preco: '110,00',
    stock: 320,
    estado: 'Em Stock',
    active: true,
  },
]
