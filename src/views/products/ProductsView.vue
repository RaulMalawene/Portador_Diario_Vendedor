<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { AlertCircle, FileDown, FileSpreadsheet, Plus } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import ProductsToolbar from '@/features/products/components/ProductsToolbar.vue'
import ProductsTable from '@/features/products/components/ProductsTable.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import ProductFormModal from '@/features/products/components/ProductFormModal.vue'
import { useProducts } from '@/features/products/composables/useProducts'
import { useProductForm } from '@/features/products/composables/useProductForm'
import { exportProductsToPdf } from '@/features/products/utils/exportProductsPdf'
import type { Product, ProductStatusFilter } from '@/features/products/types/products.types'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const {
  products,
  categoryOptions,
  isLoading,
  loadError,
  meta,
  load,
  loadCategoryOptions,
  fetchAllForExport,
  upsert,
  remove,
  toggleActive,
} = useProducts()
const { isOpen, isEditing, editingId, form, formError, openCreate, openEdit, close } =
  useProductForm()

const search = ref('')
const statusFilter = ref<ProductStatusFilter>('all')
const isExporting = ref(false)
const exportError = ref('')

function currentFilters(page = 1) {
  return {
    search: search.value.trim() || undefined,
    status: statusFilter.value === 'all' ? undefined : statusFilter.value,
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

function handleEdit(product: Product) {
  openEdit(product)
}

async function handleSubmit() {
  const result = await upsert(form, editingId.value)
  if (result.ok) {
    close()
    return
  }
  formError.value = result.error
}

function handleOpenCreate() {
  openCreate()
  if (!categoryOptions.value.length) loadCategoryOptions()
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
    exportError.value = 'Não há produtos para exportar.'
    return
  }

  exportProductsToPdf(all, authStore.user?.name ?? '')
}

async function handleToggleActive(product: Product) {
  await toggleActive(product)
}

async function handleRemove(id: number) {
  await remove(id)
}

onMounted(() => {
  load(currentFilters())
  loadCategoryOptions()
})
</script>

<template>
  <AppShell
    title="Produtos"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Produtos</h1>
        <p class="page-sub">Gerencie o seu catálogo de produtos, preços e níveis de stock.</p>
      </div>
      <div class="page-actions">
        <button
          class="btn btn--ghost"
          type="button"
          :disabled="isExporting"
          @click="handleExportPdf"
        >
          <FileDown :size="16" /><span>{{ isExporting ? 'A gerar PDF...' : 'Exportar PDF' }}</span>
        </button>
        <button class="btn btn--ghost" type="button">
          <FileSpreadsheet :size="16" /><span>Excel</span>
        </button>
        <button class="btn" type="button" @click="handleOpenCreate">
          <Plus :size="16" /><span>Adicionar Produto</span>
        </button>
      </div>
    </div>

    <ProductsToolbar v-model:search="search" v-model:status="statusFilter" />

    <p v-if="loadError" class="page-error"><AlertCircle :size="15" /> {{ loadError }}</p>
    <p v-else-if="exportError" class="page-error"><AlertCircle :size="15" /> {{ exportError }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar produtos...</p>

    <section class="card card--table">
      <ProductsTable
        :products="products"
        @edit="handleEdit"
        @toggle-active="handleToggleActive"
        @remove="handleRemove"
      />

      <PaginationBar
        :shown="products.length"
        :total="meta.total"
        :current-page="meta.currentPage"
        :last-page="meta.lastPage"
        items-label="produtos"
        @change="goToPage"
      />
    </section>

    <ProductFormModal
      v-model="isOpen"
      v-model:form="form"
      :is-editing="isEditing"
      :category-options="categoryOptions"
      :error-message="formError"
      @submit="handleSubmit"
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

@media (max-width: 720px) {
  .page-head {
    flex-direction: column;
  }
}
</style>
