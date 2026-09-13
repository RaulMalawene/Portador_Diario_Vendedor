<script setup lang="ts">
import type { KpiMetric } from '../types/dashboard.types'

defineProps<{ metric: KpiMetric }>()
</script>

<template>
  <article class="kpi">
    <div class="kpi__top">
      <span class="kpi__label">{{ metric.label }}</span>
      <component :is="metric.icon" class="kpi__icon" :size="20" />
    </div>
    <div class="kpi__value">{{ metric.value }}</div>
    <p v-if="metric.hint" class="kpi__hint">{{ metric.hint }}</p>
  </article>
</template>

<style scoped>
.kpi {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 20px;
  box-shadow: var(--shadow-sm);
}

.kpi__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.kpi__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-body);
}

.kpi__icon {
  color: var(--brand-primary);
}

.kpi__value {
  font-size: 26px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.kpi__hint {
  margin: 10px 0 0;
  font-size: 12px;
  color: var(--color-muted);
}
</style>
