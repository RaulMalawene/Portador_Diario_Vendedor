import { apiRequest } from './httpClient'
import type { AuthenticatedUser, CatalogProduct, ClientOrder, Customer } from '../types/client.types'

interface Collection<T> {
  data: T[]
}

interface Resource<T> {
  data: T
}

export function loginRequest(email: string, password: string) {
  return apiRequest<{ user: AuthenticatedUser; token: string }>('/login', {
    method: 'POST',
    body: { email, password },
  })
}

export function logoutRequest(token: string) {
  return apiRequest<{ message: string }>('/logout', { method: 'POST', token })
}

export function fetchCustomersRequest(token: string) {
  return apiRequest<Collection<Customer>>('/customers', { token })
}

export function fetchProductsRequest(token: string) {
  // Só produtos activos: são os únicos que a API aceita numa encomenda.
  return apiRequest<Collection<CatalogProduct>>('/products', {
    token,
    query: { status: 'active' },
  })
}

export function createOrderRequest(
  token: string,
  customerId: number,
  items: { product_id: number; quantity: number }[],
) {
  return apiRequest<Resource<ClientOrder>>('/orders', {
    method: 'POST',
    token,
    body: { customer_id: customerId, items },
  })
}

export function fetchOrdersRequest(token: string) {
  return apiRequest<Collection<ClientOrder>>('/orders', { token })
}
