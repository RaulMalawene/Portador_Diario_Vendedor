<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpDown } from '@lucide/vue'
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
    <colgroup>
      <col class="col-name" />
      <col class="col-sku" />
      <col class="col-category" />
      <col class="col-price" />
      <col class="col-stock" />
      <col class="col-status" />
      <col class="col-actions" />
    </colgroup>
    <thead>
      <tr>
        <th>
          <button type="button" class="th-sort" @click="toggleSort">
            Produto <ArrowUpDown :size="14" />
          </button>
        </th>
        <th>SKU</th>
        <th>Categoria</th>
        <th>Preço (MZN)</th>
        <th>Stock</th>
        <th>Estado</th>
        <th class="ta-right">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="sortedProducts.length === 0">
        <td class="table__empty" colspan="7">Nenhum produto encontrado.</td>
      </tr>
      <tr
        v-for="product in sortedProducts"
        :key="product.sku"
        :class="{ 'is-inactive': !product.active }"
      >
        <td class="td-strong td-truncate">{{ product.name }}</td>
        <td class="td-mono td-truncate">{{ product.sku }}</td>
        <td class="td-muted td-truncate">{{ product.categoria }}</td>
        <td class="td-mono">{{ product.preco }} MT</td>
        <td class="td-mono" :class="{ 'td-zero': product.stock === 0 }">
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
  table-layout: fixed;
  border-collapse: collapse;
}

.col-name {
  width: 30%;
}

.col-sku {
  width: 13%;
}

.col-category {
  width: 16%;
}

.col-price {
  width: 12%;
}

.col-stock {
  width: 9%;
}

.col-status {
  width: 13%;
}

.col-actions {
  width: 64px;
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

.td-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.td-zero {
  font-weight: 700;
  color: var(--color-danger);
}

.ta-right {
  text-align: right;
}
</style>
