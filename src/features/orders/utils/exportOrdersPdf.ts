import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { Order } from '../types/orders.types'
import { formatMoney } from './orders'

const BRAND_COLOR: [number, number, number] = [155, 38, 124]

function formatDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('pt-PT')
}

export function exportOrdersToPdf(orders: Order[], vendorName: string): void {
  const doc = new jsPDF({ orientation: 'landscape' })

  const generatedAt = new Intl.DateTimeFormat('pt-PT', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date())

  const revenue = orders.reduce((sum, order) => sum + order.total, 0)

  doc.setFontSize(16)
  doc.setTextColor(20)
  doc.text('Relatório de Encomendas', 14, 18)

  doc.setFontSize(10)
  doc.setTextColor(100)
  doc.text(`Vendedor: ${vendorName || '-'}`, 14, 25)
  doc.text(`Gerado em: ${generatedAt}`, 14, 30)
  doc.text(`Total de encomendas: ${orders.length}  |  Receita: ${formatMoney(revenue)}`, 14, 35)

  autoTable(doc, {
    startY: 40,
    head: [['Número', 'Cliente', 'Data', 'Estado', 'Itens', 'Total (MZN)']],
    body: orders.map((order) => [
      order.number,
      order.customer.name,
      formatDate(order.placedAt),
      order.statusLabel,
      String(order.itemsCount),
      formatMoney(order.total),
    ]),
    styles: { fontSize: 9, cellPadding: 4 },
    headStyles: { fillColor: BRAND_COLOR, textColor: 255 },
    alternateRowStyles: { fillColor: [248, 248, 250] },
  })

  const fileDate = new Date().toISOString().slice(0, 10)
  doc.save(`encomendas-${fileDate}.pdf`)
}
