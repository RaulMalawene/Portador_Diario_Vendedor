<script setup lang="ts">
import type { Component } from 'vue'

withDefaults(
  defineProps<{
    label: string
    value: string | number
    note: string
    icon: Component
    tone?: 'brand' | 'warning' | 'danger'
    compact?: boolean
  }>(),
  {
    tone: 'brand',
    compact: false,
  },
)
</script>

<template>
  <article class="kpi">
    <div class="kpi__body">
      <span class="kpi__label">{{ label }}</span>
      <div class="kpi__value" :class="[`kpi__value--${tone}`, { 'kpi__value--compact': compact }]">
        {{ value }}
      </div>
      <span class="kpi__note">{{ note }}</span>
    </div>
    <span class="kpi__icon" :class="`kpi__icon--${tone}`">
      <component :is="icon" :size="20" />
    </span>
  </article>
</template>

<style scoped>
.kpi {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
}

.kpi__label {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.kpi__value {
  margin: 6px 0 2px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}

.kpi__value--compact {
  font-size: 22px;
  letter-spacing: -0.01em;
}

.kpi__value--warning {
  color: var(--color-warning);
}

.kpi__value--danger {
  color: var(--color-danger);
}

.kpi__note {
  font-size: 12px;
  color: var(--color-muted);
}

.kpi__icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
}

.kpi__icon--brand {
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
}

.kpi__icon--warning {
  background: var(--color-warning-tint);
  color: var(--color-warning);
}

.kpi__icon--danger {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}
</style>
