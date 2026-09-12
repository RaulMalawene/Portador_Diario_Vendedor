import type { ClientOrder } from '../types/client.types'

// Dados de demonstração só para o ecrã ter um estado inicial realista.
// TODO: remover quando a lista passar a vir do backend (GET /orders).
export const mockClientOrders: ClientOrder[] = [
  {
    id: 'demo-1',
    number: '1042',
    status: 'delivered',
    total: 640,
    createdAt: '2026-09-08T10:15:00Z',
    items: [{ sku: 'MZ-AR-109', name: 'Arroz agulha Extra 5kg', unitPrice: 320, quantity: 2 }],
  },
  {
    id: 'demo-2',
    number: '1051',
    status: 'processing',
    total: 145,
    createdAt: '2026-09-10T14:40:00Z',
    items: [{ sku: 'MZ-OL-042', name: 'Óleo Vegetal Refinado 1L', unitPrice: 145, quantity: 1 }],
  },
]
