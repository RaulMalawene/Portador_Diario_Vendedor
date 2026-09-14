import { describe, expect, it } from 'vitest'
import { exportProductsToPdf } from '../exportProductsPdf'
import type { Product } from '../../types/products.types'

const products: Product[] = [
  {
    id: 1,
    name: 'Arroz 5kg',
    sku: 'ARZ-5KG',
    price: '350.00',
    stock: 20,
    is_active: true,
    stock_status: 'in_stock',
    category: { id: 1, name: 'Mercearia' },
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: 2,
    name: 'Óleo 1L',
    sku: 'OLE-1L',
    price: '120.50',
    stock: 0,
    is_active: true,
    stock_status: 'out_of_stock',
    category: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
]

describe('exportProductsToPdf', () => {
  // jsdom não implementa download real de ficheiros; o que importa aqui é
  // confirmar que o jsPDF + autoTable montam o documento (cabeçalho, tabela
  // com os produtos) sem lançar excepção — o download em si (doc.save) é
  // comportamento padrão e testado do jsPDF em qualquer browser real.
  it('gera o PDF sem lançar erro com produtos', () => {
    expect(() => exportProductsToPdf(products, 'Vendedor Demo')).not.toThrow()
  })

  it('gera o PDF sem lançar erro com lista vazia', () => {
    expect(() => exportProductsToPdf([], 'Vendedor Demo')).not.toThrow()
  })
})
