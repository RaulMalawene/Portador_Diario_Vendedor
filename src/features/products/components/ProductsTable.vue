<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpDown, Image as ImageIcon } from '@lucide/vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import ProductRowMenu from './ProductRowMenu.vue'
import type { Product } from '../types/products.types'
import { productBadgeLabel, productBadgeVariant } from '../utils/products'

const props = defineProps<{ products: Product[] }>()

const emit = defineEmits<{
  edit: [Product]
  toggleActive: [string]
  remove: [string]
}>()

const sortAscending = ref(true)

const sortedProducts = computed(() =>
  [...props.products].sort((a, b) =>
    sortAscending.value ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  ),
)

function toggleSort() {
  sortAscending.value = !sortAscending.value
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Imagem</th>
        <th>
          <button type="button" class="th-sort" @click="toggleSort">
            Produto <ArrowUpDown :size="14" />
          </button>
        </th>
        <th>SKU</th>
        <th>Categoria</th>
        <th class="ta-right">Preço (MZN)</th>
        <th class="ta-right">Stock</th>
        <th>Estado</th>
        <th class="ta-right">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="sortedProducts.length === 0">
        <td class="table__empty" colspan="8">Nenhum produto encontrado.</td>
      </tr>
      <tr
        v-for="product in sortedProducts"
        :key="product.sku"
        :class="{ 'is-inactive': !product.active }"
      >
        <td>
          <span class="thumb"><ImageIcon :size="18" /></span>
        </td>
        <td class="td-strong">{{ product.name }}</td>
        <td class="td-mono">{{ product.sku }}</td>
        <td class="td-muted">{{ product.categoria }}</td>
        <td class="ta-right td-mono">{{ product.preco }} MT</td>
        <td class="ta-right td-mono" :class="{ 'td-zero': product.stock === 0 }">
          {{ product.stock }}
        </td>
        <td>
          <StatusBadge :variant="productBadgeVariant(product)">{{
            productBadgeLabel(product)
          }}</StatusBadge>
        </td>
        <td class="ta-right">
          <ProductRowMenu
            :product="product"
            @edit="emit('edit', product)"
            @toggle-active="emit('toggleActive', product.sku)"
            @remove="emit('remove', product.sku)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  padding: 14px 16px;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-muted);
  text-align: left;
}

.th-sort {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  font-weight: 600;
  color: inherit;
  cursor: pointer;
}

.table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-surface-soft);
  font-size: 14px;
  vertical-align: middle;
}

.table tbody tr:last-child td {
  border-bottom: 0;
}

.table tbody tr.is-inactive {
  opacity: 0.55;
}

.table__empty {
  padding: 40px 16px;
  color: var(--color-muted);
  text-align: center;
}

.td-strong {
  font-weight: 600;
  color: var(--color-ink);
}

.td-mono {
  font-variant-numeric: tabular-nums;
}

.td-muted {
  color: var(--color-body);
}

.td-zero {
  font-weight: 700;
  color: var(--color-danger);
}

.ta-right {
  text-align: right;
}

.thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-sm);
  background: var(--color-surface-soft);
  color: var(--color-muted);
}
</style>
