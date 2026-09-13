import { apiRequest } from '@/services/apiClient'

interface Collection<T> {
  data: T[]
}

interface Resource<T> {
  data: T
}

export interface CategoryApiItem {
  id: number
  name: string
  products_count?: number
  created_at: string
}

export function fetchCategoriesRequest(token: string) {
  return apiRequest<Collection<CategoryApiItem>>('/categories', { token })
}

export function createCategoryRequest(token: string, name: string) {
  return apiRequest<Resource<CategoryApiItem>>('/categories', {
    method: 'POST',
    token,
    body: { name },
  })
}

export function updateCategoryRequest(token: string, id: number, name: string) {
  return apiRequest<Resource<CategoryApiItem>>(`/categories/${id}`, {
    method: 'PUT',
    token,
    body: { name },
  })
}

export function deleteCategoryRequest(token: string, id: number) {
  return apiRequest<{ message: string }>(`/categories/${id}`, { method: 'DELETE', token })
}
