import { computed, ref } from 'vue'
import type { InventoryItem, MovementType, StockMovement } from '../types/inventory.types'
import { inventoryItems as initialItems, initialMovements } from '../data/inventory.mock'
import { movementLabel, stockStatus } from '../utils/inventory'

export function useInventory() {
  const items = ref<InventoryItem[]>([...initialItems])
  const movementsBySku = ref<Record<string, StockMovement[]>>(structuredClone(initialMovements))

  const kpis = computed(() => ({
    total: items.value.length,
    low: items.value.filter((item) => stockStatus(item.stock) === 'low_stock').length,
    out: items.value.filter((item) => stockStatus(item.stock) === 'out_of_stock').length,
    totalValue: items.value.reduce((sum, item) => sum + item.stock * item.unitPrice, 0),
  }))

  function movementsFor(sku: string): StockMovement[] {
    return movementsBySku.value[sku] ?? []
  }

  function adjustStock(sku: string, type: MovementType, quantity: number, note: string) {
    const item = items.value.find((entry) => entry.sku === sku)
    if (!item) return false

    const previousStock = item.stock
    const stockAfter =
      type === 'in'
        ? previousStock + quantity
        : type === 'out'
          ? previousStock - quantity
          : quantity

    if (stockAfter < 0) return false

    item.stock = stockAfter

    const delta = type === 'out' ? -quantity : type === 'in' ? quantity : stockAfter - previousStock

    const movement: StockMovement = {
      type,
      quantity: delta,
      stockAfter,
      note: note.trim() || `${movementLabel(type)} manual`,
      date: new Date().toLocaleString('pt-PT'),
    }

    movementsBySku.value[sku] = [movement, ...movementsFor(sku)]
    return true
  }

  return { items, kpis, movementsFor, adjustStock }
}
