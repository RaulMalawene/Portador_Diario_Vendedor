<script setup lang="ts">
import { computed } from 'vue'
import type { OrderItem } from '../types/orders.types'
import { formatMoney } from '../utils/orders'

const props = defineProps<{ items: OrderItem[]; total: number }>()

const total = computed(() => props.total)
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Ref</th>
        <th>Produto</th>
        <th>Quantidade</th>
        <th>Unitário</th>
        <th>Subtotal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td class="td-mono td-muted">{{ item.sku ?? '—' }}</td>
        <td class="td-strong">{{ item.name }}</td>
        <td class="td-mono">{{ item.quantity }}</td>
        <td class="td-mono td-muted">{{ formatMoney(item.unitPrice) }}</td>
        <td class="td-mono td-strong">{{ formatMoney(item.subtotal) }}</td>
      </tr>
    </tbody>
  </table>

  <div class="total-row">
    <span>Total da Encomenda</span>
    <strong>{{ formatMoney(total) }}</strong>
  </div>
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

.table td {
  padding: 12px 16px;
  border-bottom: 1px solid var(--color-surface-soft);
  font-size: 14px;
}

.table tbody tr:last-child td {
  border-bottom: 0;
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

.total-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid var(--color-border);
}

.total-row span {
  font-size: 14px;
  color: var(--color-body);
}

.total-row strong {
  font-size: 20px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--brand-primary);
}
</style>
