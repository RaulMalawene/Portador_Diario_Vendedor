<script setup lang="ts">
import { Mail, Phone } from '@lucide/vue'
import type { OrderCustomer } from '../types/orders.types'
import { customerInitials } from '../utils/orders'

defineProps<{ customer: OrderCustomer }>()
</script>

<template>
  <div class="customer">
    <div class="customer__head">
      <span class="customer__avatar">{{ customerInitials(customer.name) }}</span>
      <p class="customer__name">{{ customer.name }}</p>
    </div>

    <ul class="customer__list">
      <li v-if="customer.email">
        <Mail :size="15" />
        <a :href="`mailto:${customer.email}`">{{ customer.email }}</a>
      </li>
      <li v-if="customer.phone">
        <Phone :size="15" />
        <a :href="`tel:${customer.phone}`">{{ customer.phone }}</a>
      </li>
      <li v-if="!customer.email && !customer.phone" class="customer__empty">
        Sem contactos registados para este cliente.
      </li>
    </ul>
  </div>
</template>

<style scoped>
.customer {
  margin-top: 16px;
}

.customer__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.customer__avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
  font-size: 14px;
  font-weight: 700;
}

.customer__name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-ink);
}

.customer__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.customer__list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 13px;
  color: var(--color-body);
}

.customer__list :deep(svg) {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--brand-primary);
}

.customer__list a {
  color: var(--color-body);
  text-decoration: none;
  word-break: break-all;
}

.customer__list a:hover {
  color: var(--brand-primary);
  text-decoration: underline;
}

.customer__empty {
  color: var(--color-muted);
}
</style>
