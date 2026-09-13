import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  adjustStockRequest,
  extractStockConflict,
  fetchAllInventory,
  fetchInventoryRequest,
  fetchStockMovementsRequest,
  type InventoryFilters,
  type InventoryProductDto,
  type StockMovementDto,
} from '../api/inventoryApi'
import type {
  InventoryItem,
  MovementType,
  StockConflict,
  StockMovement,
  StockStatus,
} from '../types/inventory.types'

type Outcome = { ok: true } | { ok: false; error: string; conflict?: StockConflict }

function toItem(dto: InventoryProductDto): InventoryItem {
  return {
    id: dto.id,
    name: dto.name,
    sku: dto.sku,
    category: dto.category?.name ?? null,
    stock: dto.stock,
    unitPrice: Number(dto.price),
    stockStatus: dto.stock_status as StockStatus,
  }
}

function toMovement(dto: StockMovementDto): StockMovement {
  return {
    id: dto.id,
    type: dto.type,
    typeLabel: dto.type_label,
    quantity: dto.quantity,
    stockAfter: dto.stock_after,
    note: dto.note,
    date: dto.created_at,
  }
}

export interface InventoryKpis {
  total: number
  low: number
  out: number
  totalValue: number
}

export function useInventory() {
  const authStore = useAuthStore()

  const items = ref<InventoryItem[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const meta = ref({ total: 0, currentPage: 1, lastPage: 1 })

  const kpis = ref<InventoryKpis>({ total: 0, low: 0, out: 0, totalValue: 0 })
  const isLoadingKpis = ref(false)

  async function load(filters: InventoryFilters = {}) {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    loadError.value = null

    const result = await fetchInventoryRequest(token, filters)
    isLoading.value = false

    if (!result.ok || !result.data) {
      loadError.value = result.error ?? 'Não foi possível carregar o inventário.'
      return
    }

    items.value = result.data.data.map(toItem)
    meta.value = {
      total: result.data.meta.total,
      currentPage: result.data.meta.current_page,
      lastPage: result.data.meta.last_page,
    }
  }

  async function loadKpis() {
    const token = authStore.token
    if (!token) return

    isLoadingKpis.value = true
    const result = await fetchAllInventory(token)
    isLoadingKpis.value = false

    if (!result.ok) return

    const all = result.items
    kpis.value = {
      total: all.length,
      low: all.filter((item) => item.stock_status === 'low_stock').length,
      out: all.filter((item) => item.stock_status === 'out_of_stock').length,
      totalValue: all.reduce((sum, item) => sum + item.stock * Number(item.price), 0),
    }
  }

  async function movementsFor(productId: number): Promise<StockMovement[]> {
    const token = authStore.token
    if (!token) return []

    const result = await fetchStockMovementsRequest(token, productId)
    return result.ok && result.data ? result.data.data.map(toMovement) : []
  }

  async function adjustStock(
    productId: number,
    type: MovementType,
    quantity: number,
    note: string,
  ): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const result = await adjustStockRequest(token, productId, type, quantity, note.trim())

    if (!result.ok || !result.data) {
      const conflict = extractStockConflict(result.errorPayload) ?? undefined
      return { ok: false, error: result.error ?? 'Não foi possível ajustar o stock.', conflict }
    }

    const saved = toItem(result.data.data)
    const index = items.value.findIndex((item) => item.id === saved.id)
    if (index !== -1) items.value.splice(index, 1, saved)

    return { ok: true }
  }

  return {
    items,
    isLoading,
    loadError,
    meta,
    kpis,
    isLoadingKpis,
    load,
    loadKpis,
    movementsFor,
    adjustStock,
  }
}
