<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AlertCircle, FileDown, ShoppingCart, Clock, PackageSearch, Wallet } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import OrdersToolbar from '@/features/orders/components/OrdersToolbar.vue'
import OrdersTable from '@/features/orders/components/OrdersTable.vue'
import OrderKpiCard from '@/features/orders/components/OrderKpiCard.vue'
import { useOrders } from '@/features/orders/composables/useOrders'
import { formatMoney } from '@/features/orders/utils/orders'
import { exportOrdersToPdf } from '@/features/orders/utils/exportOrdersPdf'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { orders, isLoading, loadError, meta, kpis, load, loadKpis, fetchAllForExport } = useOrders()

const search = ref('')
const statusFilter = ref('all')
const isExporting = ref(false)
const exportError = ref('')

function currentFilters(page = 1) {
  return {
    search: search.value.trim() || undefined,
    status: statusFilter.value === 'all' ? undefined : statusFilter.value,
    page,
  }
}

async function handleExportPdf() {
  if (isExporting.value) return

  isExporting.value = true
  exportError.value = ''

  const all = await fetchAllForExport({
    search: search.value.trim() || undefined,
    status: statusFilter.value === 'all' ? undefined : statusFilter.value,
  })

  isExporting.value = false

  if (!all) {
    exportError.value = 'Não foi possível gerar o PDF. Tente novamente.'
    return
  }

  if (all.length === 0) {
    exportError.value = 'Não há encomendas para exportar.'
    return
  }

  exportOrdersToPdf(all, authStore.user?.name ?? '')
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

onMounted(() => {
  load(currentFilters())
  loadKpis()
})
</script>

<template>
  <AppShell
    title="Encomendas"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Encomendas</h1>
        <p class="page-sub">
          Acompanhe e faça a gestão do ciclo de vida das encomendas dos seus clientes.
        </p>
      </div>
      <div class="page-actions">
        <button
          class="btn btn--ghost"
          type="button"
          :disabled="isExporting"
          @click="handleExportPdf"
        >
          <FileDown :size="16" /><span>{{ isExporting ? 'A gerar PDF...' : 'Exportar Dados' }}</span>
        </button>
      </div>
    </div>

    <section class="kpis">
      <OrderKpiCard
        label="Total de Encomendas"
        :value="kpis.total"
        note="no total"
        :icon="ShoppingCart"
      />
      <OrderKpiCard
        label="Pendentes"
        :value="kpis.pending"
        note="aguardam confirmação"
        :icon="Clock"
        tone="warning"
      />
      <OrderKpiCard
        label="Em Curso"
        :value="kpis.inProgress"
        note="confirmadas, em processo ou enviadas"
        :icon="PackageSearch"
      />
      <OrderKpiCard
        label="Receita das Encomendas"
        :value="formatMoney(kpis.revenue)"
        note="valor acumulado"
        :icon="Wallet"
        compact
      />
    </section>

    <OrdersToolbar v-model:search="search" v-model:status="statusFilter" />

    <p v-if="loadError" class="page-error"><AlertCircle :size="15" /> {{ loadError }}</p>
    <p v-else-if="exportError" class="page-error"><AlertCircle :size="15" /> {{ exportError }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar encomendas...</p>

    <section class="card card--table">
      <OrdersTable :orders="orders" />

      <PaginationBar
        :shown="orders.length"
        :total="meta.total"
        :current-page="meta.currentPage"
        :last-page="meta.lastPage"
        items-label="encomendas"
        @change="goToPage"
      />
    </section>
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

.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
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
