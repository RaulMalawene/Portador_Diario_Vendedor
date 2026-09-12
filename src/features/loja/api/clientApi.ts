import { apiRequest } from './httpClient'
import type { ClientCartItem, ClientCustomer, ClientOrder } from '../types/client.types'

export function loginRequest(email: string, password: string) {
  return apiRequest<{ token: string; customer: ClientCustomer }>('/auth/login', {
    method: 'POST',
    body: { email, password },
  })
}

export function createOrderRequest(token: string, items: ClientCartItem[]) {
  return apiRequest<ClientOrder>('/orders', {
    method: 'POST',
    token,
    body: { items },
  })
}

export function fetchOrdersRequest(token: string) {
  return apiRequest<{ orders: ClientOrder[] }>('/orders', { token })
}
