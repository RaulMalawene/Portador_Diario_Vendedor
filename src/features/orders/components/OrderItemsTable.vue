<script setup lang="ts">
import { computed } from 'vue'
import { AlertTriangle } from '@lucide/vue'
import type { OrderItem } from '../types/orders.types'
import { formatMoney, orderTotal } from '../utils/orders'

const props = defineProps<{ items: OrderItem[] }>()

function subtotal(item: OrderItem) {
  return item.quantity * item.unitPrice
}

const total = computed(() => orderTotal(props.items))
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th>Ref</th>
        <th>Produto</th>
        <th class="ta-right">Quantidade</th>
        <th class="ta-right">Unitário</th>
        <th class="ta-right">Subtotal</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.sku">
        <td class="td-mono td-muted">{{ item.sku }}</td>
        <td class="td-strong">
          {{ item.name }}
          <span
            v-if="item.quantity > item.available"
            class="shortage"
            :title="`Stock disponível: ${item.available}`"
          >
            <AlertTriangle :size="13" /> stock insuficiente
          </span>
        </td>
        <td class="ta-right td-mono">{{ item.quantity }}</td>
        <td class="ta-right td-mono td-muted">{{ formatMoney(item.unitPrice) }}</td>
        <td class="ta-right td-mono td-strong">{{ formatMoney(subtotal(item)) }}</td>
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
  padding: 10px 12px;
  border-bottom: 1px solid var(--color-border);
  font-size: 12px;
  font-weight: 600;
  color: var(--color-muted);
  text-align: left;
}

.table td {
  padding: 14px 12px;
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

.ta-right {
  text-align: right;
}

.shortage {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
  padding: 2px 8px;
  border-radius: var(--radius-full);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  vertical-align: middle;
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
