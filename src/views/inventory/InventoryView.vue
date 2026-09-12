<script setup lang="ts">
import { computed, ref } from 'vue'
import { FileDown, Plus, Package, SlidersHorizontal, Boxes } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import InventoryToolbar from '@/features/inventory/components/InventoryToolbar.vue'
import InventoryTable from '@/features/inventory/components/InventoryTable.vue'
import InventoryKpiCard from '@/features/inventory/components/InventoryKpiCard.vue'
import StockAdjustModal from '@/features/inventory/components/StockAdjustModal.vue'
import StockHistoryModal from '@/features/inventory/components/StockHistoryModal.vue'
import { useInventory } from '@/features/inventory/composables/useInventory'
import { useStockAdjustForm } from '@/features/inventory/composables/useStockAdjustForm'
import { formatCurrency, stockStatus } from '@/features/inventory/utils/inventory'
import type { InventoryItem } from '@/features/inventory/types/inventory.types'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { items, kpis, movementsFor, adjustStock } = useInventory()
const {
  isOpen: isAdjustOpen,
  form: adjustForm,
  open: openAdjust,
  close: closeAdjust,
} = useStockAdjustForm()

const search = ref('')
const statusFilter = ref('all')

const filteredItems = computed(() =>
  items.value.filter((item) => {
    const query = search.value.trim().toLowerCase()
    const matchesQuery =
      !query || item.name.toLowerCase().includes(query) || item.sku.toLowerCase().includes(query)
    const matchesStatus =
      statusFilter.value === 'all' || statusFilter.value === stockStatus(item.stock)
    return matchesQuery && matchesStatus
  }),
)

function handleSubmitAdjust() {
  const quantity = Number(adjustForm.quantity) || 0
  const saved = adjustStock(adjustForm.sku, adjustForm.type, quantity, adjustForm.note)
  if (saved) closeAdjust()
}

const isHistoryOpen = ref(false)
const historyItem = ref<InventoryItem | null>(null)
const historyMovements = computed(() =>
  historyItem.value ? movementsFor(historyItem.value.sku) : [],
)

function openHistory(item: InventoryItem) {
  historyItem.value = item
  isHistoryOpen.value = true
}
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

    <section class="card card--table">
      <InventoryTable :items="filteredItems" @adjust="openAdjust" @history="openHistory" />

      <PaginationBar :shown="filteredItems.length" :total="items.length" items-label="itens" />
    </section>

    <StockAdjustModal
      v-model="isAdjustOpen"
      v-model:form="adjustForm"
      :items="items"
      @submit="handleSubmitAdjust"
    />

    <StockHistoryModal v-model="isHistoryOpen" :item="historyItem" :movements="historyMovements" />
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
