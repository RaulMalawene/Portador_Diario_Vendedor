import { describe, expect, it } from 'vitest'
import { exportOrdersToPdf } from '../exportOrdersPdf'
import type { Order } from '../../types/orders.types'

const orders: Order[] = [
  {
    id: 1,
    number: 'ORD-2026-00001',
    status: 'pending',
    statusLabel: 'Pendente',
    nextStatus: 'confirmed',
    nextStatusLabel: 'Confirmada',
    placedAt: '2026-01-05T10:00:00Z',
    total: 470.5,
    itemsCount: 3,
    customer: { id: 1, name: 'Cliente Teste 1', email: null, phone: '84 000 0001' },
    items: [],
    history: [],
  },
]

describe('exportOrdersToPdf', () => {
  // jsdom não implementa download real; o que importa é confirmar que o
  // jsPDF + autoTable montam o documento sem lançar excepção.
  it('gera o PDF sem lançar erro com encomendas', () => {
    expect(() => exportOrdersToPdf(orders, 'Vendedor Demo')).not.toThrow()
  })

  it('gera o PDF sem lançar erro com lista vazia', () => {
    expect(() => exportOrdersToPdf([], 'Vendedor Demo')).not.toThrow()
  })
})
