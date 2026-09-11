<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import type { Order } from '../types/dashboard.types'
import { badgeVariant } from '../utils/orders'

defineProps<{ orders: Order[] }>()
</script>

<template>
  <div>
    <div class="orders__head">
      <div>
        <h2 class="orders__title">Encomendas Recentes</h2>
        <p class="orders__sub">As últimas {{ orders.length }} transações realizadas no portal.</p>
      </div>
      <a class="orders__link" href="#">Ver todas <ChevronRight :size="16" /></a>
    </div>

    <ul class="orders__list">
      <li v-for="order in orders" :key="order.id" class="orders__row">
        <div class="orders__row-main">
          <span class="orders__id">{{ order.id }}</span>
          <span class="orders__client">{{ order.cliente }}</span>
        </div>
        <div class="orders__row-meta">
          <span class="orders__date">{{ order.data }}</span>
          <span class="orders__value">{{ order.valor }}</span>
          <StatusBadge :variant="badgeVariant(order.estado)">{{ order.estado }}</StatusBadge>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.orders__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.orders__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.orders__sub {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--color-body);
}

.orders__link {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 2px;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: none;
  white-space: nowrap;
}

.orders__list {
  display: flex;
  flex-direction: column;
  max-height: 320px;
  margin: 0;
  padding: 0 4px 0 0;
  overflow-y: auto;
  list-style: none;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

.orders__list::-webkit-scrollbar {
  width: 6px;
}

.orders__list::-webkit-scrollbar-track {
  background: transparent;
}

.orders__list::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: var(--radius-full);
}

.orders__list::-webkit-scrollbar-thumb:hover {
  background: var(--color-muted);
}

.orders__row {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 6px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-surface-soft);
}

.orders__row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.orders__row-main {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.orders__id {
  font-size: 13px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}

.orders__client {
  font-size: 13px;
  color: var(--color-body);
}

.orders__row-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.orders__date {
  font-size: 12px;
  color: var(--color-muted);
}

.orders__value {
  font-size: 13px;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}
</style>
