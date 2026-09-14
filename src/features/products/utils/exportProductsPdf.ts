import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { formatMoney } from '@/features/orders/utils/orders'
import type { Product } from '../types/products.types'
import { productBadgeLabel } from './products'

const BRAND_COLOR: [number, number, number] = [155, 38, 124]

export function exportProductsToPdf(products: Product[], vendorName: string): void {
  const doc = new jsPDF({ orientation: 'landscape' })

  const generatedAt = new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())

  doc.setFontSize(16)
  doc.setTextColor(20)
  doc.text('Relatório de Produtos', 14, 18)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Vendedor: ${vendorName || '-'}`, 14, 25)
  doc.text(`Gerado em: ${generatedAt}`, 14, 30)
  doc.text(`Total de produtos: ${products.length}`, 14, 35)

  autoTable(doc, {
    startY: 40,
    head: [['Produto', 'SKU', 'Categoria', 'Preço (MZN)', 'Stock', 'Estado']],
    body: products.map((product) => [
      product.name,
      product.sku,
      product.category?.name ?? 'Sem categoria',
      formatMoney(Number(product.price)),
      String(product.stock),
      productBadgeLabel(product),
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: BRAND_COLOR, textColor: 255 },
    alternateRowStyles: { fillColor: [248, 248, 250] },
  })

  const fileDate = new Date().toISOString().slice(0, 10)
  doc.save(`produtos-${fileDate}.pdf`)
}
