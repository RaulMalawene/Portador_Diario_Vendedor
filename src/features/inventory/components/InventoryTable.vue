<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpDown } from '@lucide/vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import InventoryRowMenu from './InventoryRowMenu.vue'
import type { InventoryItem } from '../types/inventory.types'
import { stockStatusLabel, stockStatusVariant } from '../utils/inventory'

const props = defineProps<{ items: InventoryItem[] }>()

const emit = defineEmits<{
  adjust: [InventoryItem]
  history: [InventoryItem]
}>()

const sortAscending = ref(true)

const sortedItems = computed(() =>
  [...props.items].sort((a, b) =>
    sortAscending.value ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
  ),
)

function toggleSort() {
  sortAscending.value = !sortAscending.value
}
</script>

<template>
  <div class="table-scroll">
  <table class="table">
    <colgroup>
      <col class="col-name" />
      <col class="col-sku" />
      <col class="col-category" />
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
        <th>Stock Actual</th>
        <th>Estado</th>
        <th class="ta-right">Acções</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="sortedItems.length === 0">
        <td class="table__empty" colspan="6">Nenhum item encontrado.</td>
      </tr>
      <tr v-for="item in sortedItems" :key="item.id">
        <td class="td-strong td-truncate">{{ item.name }}</td>
        <td class="td-mono td-truncate">{{ item.sku }}</td>
        <td class="td-muted td-truncate">{{ item.category ?? 'Sem categoria' }}</td>
        <td class="td-mono" :class="{ 'td-zero': item.stock === 0 }">
          {{ item.stock }} <span class="td-unit">un</span>
        </td>
        <td>
          <StatusBadge :variant="stockStatusVariant(item.stockStatus)">{{
            stockStatusLabel(item.stockStatus)
          }}</StatusBadge>
        </td>
        <td class="ta-right">
          <InventoryRowMenu @adjust="emit('adjust', item)" @history="emit('history', item)" />
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<style scoped>
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
}

@media (max-width: 900px) {
  .table {
    min-width: 640px;
  }
}

.col-name {
  width: 30%;
}

.col-sku {
  width: 15%;
}

.col-category {
  width: 18%;
}

.col-stock {
  width: 15%;
}

.col-status {
  width: 14%;
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

.td-unit {
  font-size: 12px;
  color: var(--color-muted);
}

.ta-right {
  text-align: right;
}
</style>
