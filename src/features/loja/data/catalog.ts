// Catálogo de demonstração para a Área do Cliente: reaproveita os produtos
// do fornecedor (mock) só para preencher o selector de "Nova Encomenda" — o
// que importa aqui é testar o pedido ao backend, não o catálogo em si.
import { products } from '@/features/products/data/products.mock'

export interface CatalogItem {
  sku: string
  name: string
  unitPrice: number
}

function parsePrice(preco: string): number {
  const normalized = preco.replace(/\./g, '').replace(',', '.')
  return Number(normalized) || 0
}

export const catalog: CatalogItem[] = products
  .filter((product) => product.active && product.estado !== 'Esgotado')
  .map((product) => ({
    sku: product.sku,
    name: product.name,
    unitPrice: parsePrice(product.preco),
  }))
