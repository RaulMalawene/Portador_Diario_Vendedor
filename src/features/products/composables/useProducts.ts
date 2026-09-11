import { ref } from 'vue'
import type { Product, ProductFormState, ProductStatus } from '../types/products.types'
import { products as initialProducts } from '../data/products.mock'

function resolveStatus(previous: ProductStatus | undefined, stock: number): ProductStatus {
  if (stock <= 0) return 'Esgotado'
  if (previous === 'Esgotado') return 'Em Stock'
  return previous ?? 'Em Stock'
}

function formatPrice(rawPrice: string): string {
  const parsed = Number(rawPrice.replace(',', '.'))
  return Number.isFinite(parsed) ? parsed.toFixed(2).replace('.', ',') : rawPrice
}

export function useProducts() {
  const products = ref<Product[]>([...initialProducts])

  function upsert(form: ProductFormState, editingSku: string | null) {
    const stock = Number(form.stock)
    const existing = editingSku
      ? products.value.find((product) => product.sku === editingSku)
      : undefined

    const entry: Product = {
      name: form.name,
      sku: form.sku,
      categoria: form.category,
      preco: formatPrice(form.price),
      stock,
      estado: resolveStatus(existing?.estado, stock),
      active: form.isActive,
    }

    if (existing) {
      const index = products.value.indexOf(existing)
      products.value.splice(index, 1, entry)
    } else {
      products.value.unshift(entry)
    }
  }

  function remove(sku: string) {
    products.value = products.value.filter((product) => product.sku !== sku)
  }

  function toggleActive(sku: string) {
    const product = products.value.find((item) => item.sku === sku)
    if (product) product.active = !product.active
  }

  return { products, upsert, remove, toggleActive }
}
