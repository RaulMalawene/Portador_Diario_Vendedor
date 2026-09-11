export type ProductStatus = 'Em Stock' | 'Esgotado' | 'Pendente'

export interface Product {
  name: string
  sku: string
  categoria: string
  preco: string
  stock: number
  estado: ProductStatus
  active: boolean
}

export interface ProductFormState {
  name: string
  sku: string
  category: string
  price: string
  stock: string
  isActive: boolean
}
