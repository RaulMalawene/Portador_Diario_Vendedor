export interface ClientCustomer {
  id: string
  name: string
  email: string
}

export interface ClientSession {
  token: string
  customer: ClientCustomer
}

export interface ClientCartItem {
  sku: string
  name: string
  unitPrice: number
  quantity: number
}

export interface ClientOrder {
  id: string
  number: string
  status: string
  total: number
  createdAt: string
  items: ClientCartItem[]
}

/** Resultado da última acção (enviar encomenda, etc.), para mostrar no ecrã. */
export interface RequestFeedback {
  ok: boolean
  message: string
}
