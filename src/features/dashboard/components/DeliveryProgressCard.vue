<script setup lang="ts">
import { Clock } from '@lucide/vue'

defineProps<{
  current: number
  target: number
}>()
</script>

<template>
  <div>
    <h2 class="progress-card__title">Cumprimento de Prazos</h2>
    <p class="progress-card__sub">Percentagem de encomendas entregues dentro do tempo previsto.</p>

    <div class="progress-card__row">
      <span class="progress-card__label">Meta Mensal ({{ target }}%)</span>
      <span class="progress-card__value">{{ current }}%</span>
    </div>

    <div class="progress-card__track">
      <div class="progress-card__fill" :style="{ width: `${current}%` }"></div>
    </div>

    <p class="progress-card__foot"><Clock :size="14" /> Actualizado há 15 minutos</p>
  </div>
</template>

<style scoped>
.progress-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.progress-card__sub {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--color-body);
}

.progress-card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0 8px;
}

.progress-card__label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink);
}

.progress-card__value {
  font-size: 14px;
  font-weight: 700;
  color: var(--brand-primary);
}

.progress-card__track {
  height: 8px;
  border-radius: var(--radius-full);
  background: var(--color-surface-soft);
  overflow: hidden;
}

.progress-card__fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--brand-primary);
}

.progress-card__foot {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--color-muted);
}
</style>
