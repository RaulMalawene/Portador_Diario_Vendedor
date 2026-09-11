<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowUpDown, ChevronRight } from '@lucide/vue'
import { ref, computed } from 'vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import type { Order } from '../types/orders.types'
import { formatMoney, itemsCount, orderTotal, statusBadge, statusLabel } from '../utils/orders'

const props = defineProps<{ orders: Order[] }>()

const router = useRouter()
const sortNewestFirst = ref(true)

const sortedOrders = computed(() =>
  [...props.orders].sort((a, b) =>
    sortNewestFirst.value ? b.number.localeCompare(a.number) : a.number.localeCompare(b.number),
  ),
)

function toggleSort() {
  sortNewestFirst.value = !sortNewestFirst.value
}

function openOrder(order: Order) {
  router.push(`/encomendas/${order.id}`)
}
</script>

<template>
  <table class="table">
    <colgroup>
      <col class="col-number" />
      <col class="col-customer" />
      <col class="col-date" />
      <col class="col-items" />
      <col class="col-total" />
      <col class="col-status" />
      <col class="col-actions" />
    </colgroup>
    <thead>
      <tr>
        <th>
          <button type="button" class="th-sort" @click="toggleSort">
            Encomenda <ArrowUpDown :size="14" />
          </button>
        </th>
        <th>Cliente</th>
        <th>Data</th>
        <th class="ta-right">Itens</th>
        <th class="ta-right">Total</th>
        <th>Estado</th>
        <th class="col-actions"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="sortedOrders.length === 0">
        <td class="table__empty" colspan="7">Nenhuma encomenda encontrada.</td>
      </tr>
      <tr
        v-for="order in sortedOrders"
        :key="order.id"
        class="table__row"
        tabindex="0"
        @click="openOrder(order)"
        @keydown.enter="openOrder(order)"
      >
        <td class="td-strong td-mono">{{ order.number }}</td>
        <td class="td-truncate">{{ order.customer.name }}</td>
        <td class="td-muted td-mono">{{ order.placedAt.split(' às')[0] }}</td>
        <td class="ta-right td-mono">{{ itemsCount(order) }}</td>
        <td class="ta-right td-mono td-strong">{{ formatMoney(orderTotal(order.items)) }}</td>
        <td>
          <StatusBadge :variant="statusBadge(order.status)">{{
            statusLabel(order.status)
          }}</StatusBadge>
        </td>
        <td class="ta-right">
          <span class="row-go"><ChevronRight :size="18" /></span>
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

.col-number {
  width: 16%;
}

.col-customer {
  width: 26%;
}

.col-date {
  width: 14%;
}

.col-items {
  width: 10%;
}

.col-total {
  width: 16%;
}

.col-status {
  width: 14%;
}

.col-actions {
  width: 44px;
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

.table__row {
  cursor: pointer;
  transition: background 0.12s;
}

.table__row:hover,
.table__row:focus-visible {
  background: var(--color-surface-soft);
  outline: none;
}

.table__row:hover .row-go,
.table__row:focus-visible .row-go {
  color: var(--brand-primary);
  transform: translateX(2px);
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

.ta-right {
  text-align: right;
}

.row-go {
  display: inline-flex;
  color: var(--color-muted);
  transition:
    color 0.12s,
    transform 0.12s;
}
</style>
