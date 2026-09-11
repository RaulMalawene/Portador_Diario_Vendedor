<script setup lang="ts">
import { computed } from 'vue'
import type { SalesPoint } from '../types/dashboard.types'
import { formatCompactNumber, formatCurrency } from '../utils/format'

const props = defineProps<{ points: SalesPoint[] }>()

const CHART_HEIGHT = 180

const maxValue = computed(() => Math.max(...props.points.map((point) => point.value)))
const niceMax = computed(() => Math.ceil(maxValue.value / 50000) * 50000)

const peakLabel = computed(
  () => props.points.reduce((peak, point) => (point.value > peak.value ? point : peak)).label,
)

function barHeight(value: number): string {
  return `${Math.round((value / niceMax.value) * CHART_HEIGHT)}px`
}
</script>

<template>
  <div class="bar-chart">
    <div class="bar-chart__scale" :style="{ height: `${CHART_HEIGHT}px` }">
      <span>{{ formatCompactNumber(niceMax) }}</span>
      <span>{{ formatCompactNumber(niceMax / 2) }}</span>
      <span>0</span>
    </div>

    <div class="bar-chart__plot">
      <div
        class="bar-chart__gridline"
        aria-hidden="true"
        :style="{ bottom: `calc(28px + ${CHART_HEIGHT / 2}px)` }"
      ></div>

      <div
        v-for="point in points"
        :key="point.label"
        class="bar-chart__column"
        :class="{ 'is-peak': point.label === peakLabel }"
      >
        <div class="bar-chart__bar-wrap" :style="{ height: `${CHART_HEIGHT}px` }">
          <button
            type="button"
            class="bar-chart__bar"
            :style="{ height: barHeight(point.value) }"
            :aria-label="`${point.label}: ${formatCurrency(point.value)}`"
          ></button>
          <span class="bar-chart__tooltip">{{ formatCurrency(point.value) }}</span>
        </div>
        <span class="bar-chart__day">{{ point.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bar-chart {
  display: flex;
  gap: 16px;
}

.bar-chart__scale {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  padding-bottom: 28px;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
  color: var(--color-muted);
}

.bar-chart__plot {
  position: relative;
  display: flex;
  flex: 1;
  align-items: flex-end;
  gap: 14px;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--color-border);
}

.bar-chart__gridline {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-border);
}

.bar-chart__column {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.bar-chart__bar-wrap {
  position: relative;
  display: flex;
  align-items: flex-end;
}

.bar-chart__bar {
  width: 22px;
  min-height: 4px;
  border: 0;
  border-radius: 4px 4px 0 0;
  background: color-mix(in oklch, var(--brand-primary) 30%, white);
  cursor: pointer;
  transition: background 0.15s;
}

.bar-chart__bar:hover,
.bar-chart__bar:focus-visible {
  background: var(--brand-primary);
  outline: none;
}

.is-peak .bar-chart__bar {
  background: var(--brand-primary);
}

.bar-chart__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  padding: 4px 8px;
  border-radius: var(--radius-sm);
  background: var(--color-ink);
  color: var(--color-surface);
  font-size: 11px;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity 0.15s;
}

.bar-chart__bar-wrap:hover .bar-chart__tooltip,
.bar-chart__bar:focus-visible ~ .bar-chart__tooltip {
  opacity: 1;
}

.is-peak .bar-chart__tooltip {
  background: var(--brand-primary);
  opacity: 1;
}

.bar-chart__day {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
}

.is-peak .bar-chart__day {
  font-weight: 700;
  color: var(--brand-primary);
}
</style>
