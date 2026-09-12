<script setup lang="ts">
import { AlertCircle, PackageSearch, RefreshCw } from '@lucide/vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { formatMoney } from '@/features/orders/utils/orders'
import { orderStatusMeta } from '../utils/clientOrders'
import type { ClientOrder } from '../types/client.types'

defineProps<{
  orders: ClientOrder[]
  isLoading: boolean
  error: string | null
}>()

const emit = defineEmits<{ refresh: [] }>()

function formatDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-PT')
}
</script>

<template>
  <section class="orders-panel">
    <div class="orders-panel__head">
      <h2 class="orders-panel__title">As Minhas Encomendas</h2>
      <button
        class="orders-panel__refresh"
        type="button"
        :disabled="isLoading"
        @click="emit('refresh')"
      >
        <RefreshCw :size="15" :class="{ 'is-spinning': isLoading }" />
        {{ isLoading ? 'A actualizar...' : 'Actualizar' }}
      </button>
    </div>

    <p v-if="error" class="orders-panel__error"><AlertCircle :size="15" /> {{ error }}</p>

    <ul v-if="orders.length" class="orders-list">
      <li v-for="order in orders" :key="order.id" class="orders-list__item">
        <div class="orders-list__main">
          <span class="orders-list__number">#{{ order.number }}</span>
          <span class="orders-list__date">{{ formatDate(order.createdAt) }}</span>
        </div>
        <span class="orders-list__total">{{ formatMoney(order.total) }}</span>
        <StatusBadge :variant="orderStatusMeta(order.status).variant">
          {{ orderStatusMeta(order.status).label }}
        </StatusBadge>
      </li>
    </ul>

    <div v-else-if="!error" class="orders-panel__empty">
      <PackageSearch :size="28" />
      <p>Ainda não tem encomendas.</p>
    </div>
  </section>
</template>

<style scoped>
.orders-panel {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.orders-panel__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.orders-panel__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
}

.orders-panel__refresh {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-body);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.orders-panel__refresh:hover:not(:disabled) {
  background: var(--color-surface-soft);
}

.orders-panel__refresh:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.orders-panel__refresh .is-spinning {
  animation: orders-panel-spin 0.8s linear infinite;
}

.orders-panel__error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-danger);
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.orders-list__item {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.orders-list__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
  min-width: 120px;
}

.orders-list__number {
  font-size: 13px;
  font-weight: 700;
  color: var(--color-ink);
}

.orders-list__date {
  font-size: 12px;
  color: var(--color-muted);
}

.orders-list__total {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.orders-panel__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 20px;
  color: var(--color-muted);
  text-align: center;
}

.orders-panel__empty p {
  margin: 0;
  font-size: 13px;
}

@keyframes orders-panel-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
