import { apiRequest } from '@/services/apiClient'
import type { Product, ProductCategoryOption, ProductStatusFilter } from '../types/products.types'

interface Paginated<T> {
  data: T[]
  meta: { current_page: number; last_page: number; total: number }
}

interface Collection<T> {
  data: T[]
}

interface Resource<T> {
  data: T
}

export interface ProductFilters {
  search?: string
  status?: Exclude<ProductStatusFilter, 'all'>
  page?: number
}

export interface ProductPayload {
  name: string
  sku: string
  category_id: number | null
  price: number
  stock?: number
  is_active: boolean
}

export function fetchProductsRequest(token: string, filters: ProductFilters = {}) {
  return apiRequest<Paginated<Product>>('/products', {
    token,
    query: { search: filters.search, status: filters.status, page: filters.page },
  })
}

export function createProductRequest(token: string, payload: ProductPayload) {
  return apiRequest<Resource<Product>>('/products', { method: 'POST', token, body: payload })
}

export function updateProductRequest(
  token: string,
  id: number,
  payload: Partial<ProductPayload>,
) {
  return apiRequest<Resource<Product>>(`/products/${id}`, { method: 'PUT', token, body: payload })
}

export function deleteProductRequest(token: string, id: number) {
  return apiRequest<{ message: string }>(`/products/${id}`, { method: 'DELETE', token })
}

/** Lista de categorias do fornecedor, só para preencher o selector do formulário. */
export function fetchCategoryOptionsRequest(token: string) {
  return apiRequest<Collection<ProductCategoryOption>>('/categories', { token })
}
