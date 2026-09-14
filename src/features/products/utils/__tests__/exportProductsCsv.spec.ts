import { describe, expect, it, vi } from 'vitest'
import { buildProductsCsv, exportProductsToCsv } from '../exportProductsCsv'
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
    name: 'Produto "Especial"; Promo',
    sku: 'OLE-1L',
    price: '120.5',
    stock: 0,
    is_active: true,
    stock_status: 'out_of_stock',
    category: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
  },
]

describe('buildProductsCsv', () => {
  it('gera o cabeçalho e as linhas separados por ; com números em formato pt-PT', () => {
    const csv = buildProductsCsv(products)
    const lines = csv.split('\r\n')

    expect(lines[0]).toBe('Produto;SKU;Categoria;Preço (MZN);Stock;Estado')
    expect(lines[1]).toBe('Arroz 5kg;ARZ-5KG;Mercearia;350,00;20;Em Stock')
  })

  it('escapa campos com aspas, ; ou quebras de linha', () => {
    const csv = buildProductsCsv(products)
    const lines = csv.split('\r\n')

    expect(lines[2]).toBe('"Produto ""Especial""; Promo";OLE-1L;Sem categoria;120,50;0;Esgotado')
  })

  it('lida com lista vazia sem lançar erro', () => {
    expect(() => buildProductsCsv([])).not.toThrow()
    expect(buildProductsCsv([]).split('\r\n')).toHaveLength(1)
  })
})

describe('exportProductsToCsv', () => {
  it('dispara o download sem lançar erro', () => {
    const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})

    expect(() => exportProductsToCsv(products)).not.toThrow()

    clickSpy.mockRestore()
  })
})
