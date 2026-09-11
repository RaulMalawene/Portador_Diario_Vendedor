<script setup lang="ts">
import { TrendingUp, TrendingDown } from '@lucide/vue'
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
    <div class="kpi__trend" :class="metric.trend === 'up' ? 'is-up' : 'is-down'">
      <component :is="metric.trend === 'up' ? TrendingUp : TrendingDown" :size="14" />
      <span class="kpi__delta">{{ metric.delta }}</span>
      <span class="kpi__note">{{ metric.note }}</span>
    </div>
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

.kpi__trend {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  font-size: 12px;
  font-weight: 600;
}

.kpi__trend.is-up {
  color: var(--color-success);
}

.kpi__trend.is-down {
  color: var(--color-danger);
}

.kpi__note {
  margin-left: 2px;
  font-weight: 400;
  color: var(--color-muted);
}
</style>
