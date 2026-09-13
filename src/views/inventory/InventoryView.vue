<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AlertCircle, FileDown, Plus, Package, SlidersHorizontal, Boxes } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import InventoryToolbar from '@/features/inventory/components/InventoryToolbar.vue'
import InventoryTable from '@/features/inventory/components/InventoryTable.vue'
import InventoryKpiCard from '@/features/inventory/components/InventoryKpiCard.vue'
import StockAdjustModal from '@/features/inventory/components/StockAdjustModal.vue'
import StockHistoryModal from '@/features/inventory/components/StockHistoryModal.vue'
import { useInventory } from '@/features/inventory/composables/useInventory'
import { useStockAdjustForm } from '@/features/inventory/composables/useStockAdjustForm'
import { formatCurrency } from '@/features/inventory/utils/inventory'
import type { InventoryItem } from '@/features/inventory/types/inventory.types'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { items, isLoading, loadError, meta, kpis, load, loadKpis, movementsFor, adjustStock } =
  useInventory()
const {
  isOpen: isAdjustOpen,
  form: adjustForm,
  formError: adjustError,
  open: openAdjust,
  close: closeAdjust,
} = useStockAdjustForm()

const isSubmittingAdjust = ref(false)

const search = ref('')
const statusFilter = ref('all')

function currentFilters(page = 1) {
  return {
    search: search.value.trim() || undefined,
    status: statusFilter.value === 'all' ? undefined : (statusFilter.value as 'low_stock' | 'out_of_stock'),
    page,
  }
}

let searchDebounce: ReturnType<typeof setTimeout> | undefined

watch([search, statusFilter], () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => load(currentFilters()), 300)
})

onBeforeUnmount(() => clearTimeout(searchDebounce))

function goToPage(page: number) {
  load(currentFilters(page))
}

async function handleSubmitAdjust() {
  if (adjustForm.productId === null) return

  const quantity = Number(adjustForm.quantity) || 0
  isSubmittingAdjust.value = true
  const result = await adjustStock(adjustForm.productId, adjustForm.type, quantity, adjustForm.note)
  isSubmittingAdjust.value = false

  if (result.ok) {
    closeAdjust()
    loadKpis()
    return
  }

  adjustError.value = result.conflict
    ? `Stock insuficiente. Disponível: ${result.conflict.available}, pedido: ${result.conflict.requested}.`
    : result.error
}

const isHistoryOpen = ref(false)
const historyItem = ref<InventoryItem | null>(null)
const historyMovements = ref<Awaited<ReturnType<typeof movementsFor>>>([])
const isLoadingHistory = ref(false)

async function openHistory(item: InventoryItem) {
  historyItem.value = item
  isHistoryOpen.value = true
  isLoadingHistory.value = true
  historyMovements.value = await movementsFor(item.id)
  isLoadingHistory.value = false
}

onMounted(() => {
  load(currentFilters())
  loadKpis()
})
</script>

<template>
  <AppShell
    title="Inventário"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Inventário de Stock</h1>
        <p class="page-sub">Monitorize e controle os níveis de stock e evite rupturas.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn--ghost" type="button">
          <FileDown :size="16" /><span>Exportar Dados</span>
        </button>
        <button class="btn" type="button" @click="openAdjust()">
          <Plus :size="16" /><span>Novo Movimento</span>
        </button>
      </div>
    </div>

    <section class="kpis">
      <InventoryKpiCard
        label="Total de Itens"
        :value="kpis.total"
        note="produtos no catálogo"
        :icon="Package"
      />
      <InventoryKpiCard
        label="Stock Baixo"
        :value="kpis.low"
        note="requer reposição"
        :icon="SlidersHorizontal"
        tone="warning"
      />
      <InventoryKpiCard
        label="Ruptura de Stock"
        :value="kpis.out"
        note="produtos esgotados"
        :icon="Boxes"
        tone="danger"
      />
      <InventoryKpiCard
        label="Valor Total em Stock"
        :value="formatCurrency(kpis.totalValue)"
        note="ao preço de catálogo"
        :icon="Boxes"
        compact
      />
    </section>

    <InventoryToolbar v-model:search="search" v-model:status="statusFilter" />

    <p v-if="loadError" class="page-error"><AlertCircle :size="15" /> {{ loadError }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar inventário...</p>

    <section class="card card--table">
      <InventoryTable :items="items" @adjust="openAdjust" @history="openHistory" />

      <PaginationBar
        :shown="items.length"
        :total="meta.total"
        :current-page="meta.currentPage"
        :last-page="meta.lastPage"
        items-label="itens"
        @change="goToPage"
      />
    </section>

    <StockAdjustModal
      v-model="isAdjustOpen"
      v-model:form="adjustForm"
      :items="items"
      :is-submitting="isSubmittingAdjust"
      :error-message="adjustError"
      @submit="handleSubmitAdjust"
    />

    <StockHistoryModal
      v-model="isHistoryOpen"
      :item="historyItem"
      :movements="historyMovements"
      :is-loading="isLoadingHistory"
    />
  </AppShell>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.page-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.page-sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-body);
}

.page-actions {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover {
  background: var(--brand-primary-dark);
}

.btn--ghost {
  background: var(--color-surface);
  color: var(--color-body);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover {
  background: var(--color-surface-soft);
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 22px;
}

.page-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.page-loading {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-muted);
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

@media (max-width: 1100px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .kpis {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }
}
</style>
