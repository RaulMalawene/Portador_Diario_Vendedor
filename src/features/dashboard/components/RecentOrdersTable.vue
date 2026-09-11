<script setup lang="ts">
import { ChevronRight } from '@lucide/vue'
import type { Order } from '../types/dashboard.types'
import { badgeClass } from '../utils/orders'

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
          <span class="badge" :class="badgeClass(order.estado)">{{ order.estado }}</span>
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
  margin: 0;
  padding: 0;
  list-style: none;
}

.orders__row {
  display: flex;
  flex-direction: column;
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

.badge {
  display: inline-flex;
  flex-shrink: 0;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.badge--success {
  background: var(--color-success-tint);
  color: var(--color-success);
}

.badge--info {
  background: var(--color-info-tint);
  color: var(--color-info);
}

.badge--warning {
  background: var(--color-warning-tint);
  color: var(--color-warning);
}

.badge--teal {
  background: var(--color-teal-tint);
  color: var(--color-teal);
}

.badge--neutral {
  background: var(--color-surface-soft);
  color: var(--color-body);
}
</style>
