export type ProductStockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface ProductCategoryOption {
  id: number
  name: string
}

export interface Product {
  id: number
  name: string
  sku: string
  price: string
  stock: number
  is_active: boolean
  stock_status: ProductStockStatus
  category: ProductCategoryOption | null
  created_at: string
  updated_at: string
}

export interface ProductFormState {
  name: string
  sku: string
  categoryId: number | null
  price: string
  stock: string
  isActive: boolean
}

export type ProductStatusFilter = 'all' | 'active' | 'inactive' | 'low_stock' | 'out_of_stock'
