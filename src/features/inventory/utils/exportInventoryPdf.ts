import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { InventoryItem } from '../types/inventory.types'
import { formatCurrency, stockStatusLabel } from './inventory'

const BRAND_COLOR: [number, number, number] = [155, 38, 124]

export function exportInventoryToPdf(items: InventoryItem[], vendorName: string): void {
  const doc = new jsPDF({ orientation: 'landscape' })

  const generatedAt = new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())

  const totalValue = items.reduce((sum, item) => sum + item.stock * item.unitPrice, 0)

  doc.setFontSize(16)
  doc.setTextColor(20)
  doc.text('Relatório de Inventário', 14, 18)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Vendedor: ${vendorName || '-'}`, 14, 25)
  doc.text(`Gerado em: ${generatedAt}`, 14, 30)
  doc.text(
    `Total de itens: ${items.length}  |  Valor total em stock: ${formatCurrency(totalValue)}`,
    14,
    35,
  )

  autoTable(doc, {
    startY: 40,
    head: [['Produto', 'SKU', 'Categoria', 'Stock', 'Preço Unitário', 'Valor em Stock', 'Estado']],
    body: items.map((item) => [
      item.name,
      item.sku,
      item.category ?? 'Sem categoria',
      String(item.stock),
      formatCurrency(item.unitPrice),
      formatCurrency(item.stock * item.unitPrice),
      stockStatusLabel(item.stockStatus),
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: BRAND_COLOR, textColor: 255 },
    alternateRowStyles: { fillColor: [248, 248, 250] },
  })

  const fileDate = new Date().toISOString().slice(0, 10)
  doc.save(`inventario-${fileDate}.pdf`)
}
