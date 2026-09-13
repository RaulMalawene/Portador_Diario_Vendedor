<script setup lang="ts">
import { computed } from 'vue'
import { statusColorVar, statusLabel } from '@/features/orders/utils/orders'
import type { OrderStatusSummary } from '../types/dashboard.types'

const props = defineProps<{ summary: OrderStatusSummary[] }>()

const RADIUS = 42
const STROKE = 14
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const GAP = 2

const segments = computed(() => {
  let offset = 0

  return props.summary.map((item) => {
    const length = (item.percentage / 100) * CIRCUMFERENCE
    const segment = {
      ...item,
      color: statusColorVar(item.status),
      dashArray: `${Math.max(length - GAP, 0)} ${CIRCUMFERENCE - length + GAP}`,
      dashOffset: -offset,
    }
    offset += length
    return segment
  })
})

const total = computed(() => props.summary.reduce((sum, item) => sum + item.count, 0))
</script>

<template>
  <div class="donut">
    <div class="donut__visual">
      <svg class="donut__chart" viewBox="0 0 100 100" role="img" aria-label="Encomendas por estado">
        <g transform="rotate(-90 50 50)">
          <circle
            class="donut__track"
            cx="50"
            cy="50"
            :r="RADIUS"
            :stroke-width="STROKE"
            fill="none"
          />
          <circle
            v-for="segment in segments"
            :key="segment.status"
            class="donut__segment"
            cx="50"
            cy="50"
            :r="RADIUS"
            :stroke-width="STROKE"
            fill="none"
            stroke-linecap="round"
            :stroke="segment.color"
            :stroke-dasharray="segment.dashArray"
            :stroke-dashoffset="segment.dashOffset"
          >
            <title>{{ statusLabel(segment.status) }}: {{ segment.count }} ({{ segment.percentage }}%)</title>
          </circle>
        </g>
      </svg>
      <div class="donut__center">
        <span class="donut__total">{{ total }}</span>
        <span class="donut__total-label">encomendas</span>
      </div>
    </div>

    <ul class="donut__legend">
      <li v-for="segment in segments" :key="segment.status" class="donut__legend-item">
        <span class="donut__legend-dot" :style="{ background: segment.color }"></span>
        <span class="donut__legend-label">{{ statusLabel(segment.status) }}</span>
        <span class="donut__legend-value">{{ segment.count }} · {{ segment.percentage }}%</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.donut {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.donut__visual {
  position: relative;
  width: 148px;
  height: 148px;
}

.donut__chart {
  width: 100%;
  height: 100%;
}

.donut__track {
  stroke: var(--color-surface-soft);
}

.donut__segment {
  transition: opacity 0.15s;
}

.donut__segment:hover {
  opacity: 0.8;
}

.donut__center {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.donut__total {
  font-size: 28px;
  font-weight: 700;
  color: var(--color-ink);
}

.donut__total-label {
  font-size: 11px;
  color: var(--color-muted);
}

.donut__legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  margin: 0;
  padding: 0;
  list-style: none;
}

.donut__legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
}

.donut__legend-dot {
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  border-radius: var(--radius-full);
}

.donut__legend-label {
  flex: 1;
  font-weight: 500;
  color: var(--color-body);
}

.donut__legend-value {
  color: var(--color-muted);
  font-variant-numeric: tabular-nums;
}
</style>
