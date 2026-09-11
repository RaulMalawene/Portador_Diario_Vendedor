<script setup lang="ts">
import { computed, ref } from 'vue'
import { FileDown, FileSpreadsheet, Plus } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import ProductsToolbar from '@/features/products/components/ProductsToolbar.vue'
import ProductsTable from '@/features/products/components/ProductsTable.vue'
import PaginationBar from '@/components/ui/PaginationBar.vue'
import ProductFormModal from '@/features/products/components/ProductFormModal.vue'
import { useProducts } from '@/features/products/composables/useProducts'
import { useProductForm } from '@/features/products/composables/useProductForm'
import type { Product } from '@/features/products/types/products.types'

const { products, upsert, remove, toggleActive } = useProducts()
const { isOpen, isEditing, editingSku, form, openCreate, openEdit, close } = useProductForm()

const search = ref('')
const statusFilter = ref('all')

const filteredProducts = computed(() =>
  products.value.filter((product) => {
    const query = search.value.trim().toLowerCase()
    const matchesQuery =
      !query ||
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query)

    const matchesStatus =
      statusFilter.value === 'all' ||
      (statusFilter.value === 'active' && product.active) ||
      (statusFilter.value === 'inactive' && !product.active) ||
      product.estado === statusFilter.value

    return matchesQuery && matchesStatus
  }),
)

function handleEdit(product: Product) {
  openEdit(product)
}

function handleSubmit() {
  upsert(form, editingSku.value)
  close()
}
</script>

<template>
  <AppShell
    title="Produtos"
    user-name="João Maputo"
    user-role="Fornecedor Premium"
    user-initials="JM"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Produtos</h1>
        <p class="page-sub">Gerencie o seu catálogo de produtos, preços e níveis de stock.</p>
      </div>
      <div class="page-actions">
        <button class="btn btn--ghost" type="button">
          <FileDown :size="16" /><span>Exportar PDF</span>
        </button>
        <button class="btn btn--ghost" type="button">
          <FileSpreadsheet :size="16" /><span>Excel</span>
        </button>
        <button class="btn" type="button" @click="openCreate">
          <Plus :size="16" /><span>Adicionar Produto</span>
        </button>
      </div>
    </div>

    <ProductsToolbar v-model:search="search" v-model:status="statusFilter" />

    <section class="card card--table">
      <ProductsTable
        :products="filteredProducts"
        @edit="handleEdit"
        @toggle-active="toggleActive"
        @remove="remove"
      />

      <PaginationBar
        :shown="filteredProducts.length"
        :total="products.length"
        items-label="produtos"
      />
    </section>

    <ProductFormModal
      v-model="isOpen"
      v-model:form="form"
      :is-editing="isEditing"
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
