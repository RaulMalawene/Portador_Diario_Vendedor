import type { InventoryItem, StockMovement } from '../types/inventory.types'

export const inventoryItems: InventoryItem[] = [
  {
    name: 'Farinha de Milho Especial 1kg',
    sku: 'MZ-FL-001',
    categoria: 'Alimentação',
    stock: 450,
    unitPrice: 85.5,
  },
  {
    name: 'Óleo Vegetal Refinado 1L',
    sku: 'MZ-OL-042',
    categoria: 'Alimentação',
    stock: 4,
    unitPrice: 145.0,
  },
  {
    name: 'Arroz agulha Extra 5kg',
    sku: 'MZ-AR-109',
    categoria: 'Alimentação',
    stock: 0,
    unitPrice: 320.0,
  },
  {
    name: 'Água Mineral Natural 500ml',
    sku: 'MZ-AG-500',
    categoria: 'Bebidas',
    stock: 1200,
    unitPrice: 25.0,
  },
  {
    name: 'Detergente em Pó 1.5kg',
    sku: 'MZ-DB-015',
    categoria: 'Limpeza',
    stock: 45,
    unitPrice: 215.75,
  },
  {
    name: 'Sabonete Líquido Antibacteriano',
    sku: 'MZ-SP-005',
    categoria: 'Higiene',
    stock: 320,
    unitPrice: 110.0,
  },
]

export const initialMovements: Record<string, StockMovement[]> = Object.fromEntries(
  inventoryItems.map((item) => [
    item.sku,
    [
      {
        type: 'in',
        quantity: item.stock,
        stockAfter: item.stock,
        note: 'Contagem inicial de stock',
        date: '01/10/2026 08:00',
      },
    ] satisfies StockMovement[],
  ]),
)
