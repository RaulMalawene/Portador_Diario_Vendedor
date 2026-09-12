// Tipos alinhados ao contrato real da API (E:\Vendor-back).
// Nota: o login é feito com uma conta de fornecedor (User) — a API não tem
// contas próprias para clientes finais. Esta tela simula um "cliente" ao
// criar encomendas em nome de um Customer escolhido, sob a conta autenticada.

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  company?: { id: number; name: string } | null
}

export interface ClientSession {
  token: string
  user: AuthenticatedUser
}

export interface Customer {
  id: number
  name: string
  email: string | null
  phone: string | null
}

export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export interface CatalogProduct {
  id: number
  name: string
  sku: string
  price: string
  stock: number
  is_active: boolean
  stock_status: StockStatus
}

export interface ClientCartItem {
  productId: number
  name: string
  unitPrice: number
  quantity: number
}

export interface OrderItemDto {
  id: number
  product_id: number
  product_name: string
  sku: string | null
  quantity: number
  unit_price: string
  subtotal: string
}

export interface ClientOrder {
  id: number
  number: string
  status: string
  status_label: string
  total: string
  placed_at: string
  created_at: string
  items_count?: number
  customer?: Customer
  items?: OrderItemDto[]
}

/** Resultado da última acção (enviar encomenda, etc.), para mostrar no ecrã. */
export interface RequestFeedback {
  ok: boolean
  message: string
}
