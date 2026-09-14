import { describe, expect, it } from 'vitest'
import { exportInventoryToPdf } from '../exportInventoryPdf'
import type { InventoryItem } from '../../types/inventory.types'

const items: InventoryItem[] = [
  {
    id: 1,
    name: 'Arroz 5kg',
    sku: 'ARZ-5KG',
    category: 'Mercearia',
    stock: 20,
    unitPrice: 350,
    stockStatus: 'in_stock',
  },
  {
    id: 2,
    name: 'Óleo 1L',
    sku: 'OLE-1L',
    category: null,
    stock: 0,
    unitPrice: 120.5,
    stockStatus: 'out_of_stock',
  },
]

describe('exportInventoryToPdf', () => {
  // jsdom não implementa download real; o que importa é confirmar que o
  // jsPDF + autoTable montam o documento sem lançar excepção.
  it('gera o PDF sem lançar erro com itens', () => {
    expect(() => exportInventoryToPdf(items, 'Vendedor Demo')).not.toThrow()
  })

  it('gera o PDF sem lançar erro com lista vazia', () => {
    expect(() => exportInventoryToPdf([], 'Vendedor Demo')).not.toThrow()
  })
})
