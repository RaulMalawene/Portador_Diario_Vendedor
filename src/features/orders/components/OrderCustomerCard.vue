<script setup lang="ts">
import { ref } from 'vue'
import { Mail, MapPin, Phone, Copy, Check } from '@lucide/vue'
import type { OrderCustomer } from '../types/orders.types'
import { customerInitials } from '../utils/orders'

const props = defineProps<{ customer: OrderCustomer }>()

const copied = ref(false)

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(props.customer.address)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    // clipboard unavailable — silently ignore
  }
}
</script>

<template>
  <div class="customer">
    <div class="customer__head">
      <span class="customer__avatar">{{ customerInitials(customer.name) }}</span>
      <div>
        <p class="customer__name">{{ customer.name }}</p>
        <p class="customer__tag">Cliente B2B</p>
      </div>
    </div>

    <ul class="customer__list">
      <li>
        <Mail :size="15" />
        <a :href="`mailto:${customer.email}`">{{ customer.email }}</a>
      </li>
      <li>
        <Phone :size="15" />
        <a :href="`tel:${customer.phone}`">{{ customer.phone }}</a>
      </li>
      <li>
        <MapPin :size="15" />
        <span>{{ customer.address }}</span>
        <button class="copy-btn" type="button" aria-label="Copiar morada" @click="copyAddress">
          <Check v-if="copied" :size="14" />
          <Copy v-else :size="14" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
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

.customer__tag {
  margin: 2px 0 0;
  font-size: 12px;
  color: var(--color-muted);
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

.copy-btn {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  margin-left: auto;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}

.copy-btn:hover {
  background: var(--color-surface-soft);
  color: var(--brand-primary);
}
</style>
