import type { Product } from '../types/products.types'
import { productBadgeLabel } from './products'

const DELIMITER = ';'

function escapeCsvField(value: string): string {
  if (/["\n;]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function toCsvNumber(value: number): string {
  return value.toFixed(2).replace('.', ',')
}

export function buildProductsCsv(products: Product[]): string {
  const header = ['Produto', 'SKU', 'Categoria', 'Preço (MZN)', 'Stock', 'Estado']

  const rows = products.map((product) => [
    product.name,
    product.sku,
    product.category?.name ?? 'Sem categoria',
    toCsvNumber(Number(product.price)),
    String(product.stock),
    productBadgeLabel(product),
  ])

  return [header, ...rows]
    .map((row) => row.map((field) => escapeCsvField(field)).join(DELIMITER))
    .join('\r\n')
}

export function exportProductsToCsv(products: Product[]): void {
  const csvBody = buildProductsCsv(products)

  // BOM no início para o Excel reconhecer o ficheiro como UTF-8 e mostrar
  // acentos correctamente.
  const blob = new Blob(['﻿' + csvBody], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `produtos-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
