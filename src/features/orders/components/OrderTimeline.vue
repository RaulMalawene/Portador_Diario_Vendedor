<script setup lang="ts">
import type { OrderHistoryEntry } from '../types/orders.types'
import { statusColorVar } from '../utils/orders'

defineProps<{ history: OrderHistoryEntry[] }>()

function formatDate(value: string): string {
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-PT')
}
</script>

<template>
  <ul v-if="history.length" class="timeline">
    <li v-for="(entry, index) in history" :key="index" class="tl">
      <span class="tl__dot" :style="{ background: statusColorVar(entry.to) }"></span>
      <div class="tl__body">
        <p class="tl__text">{{ entry.toLabel }}</p>
        <p v-if="entry.note" class="tl__note">{{ entry.note }}</p>
        <span class="tl__meta">{{ formatDate(entry.date) }}</span>
      </div>
    </li>
  </ul>
  <p v-else class="timeline__empty">Sem histórico registado.</p>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
}

.timeline__empty {
  margin: 16px 0 0;
  font-size: 13px;
  color: var(--color-muted);
}

.tl {
  position: relative;
  display: flex;
  gap: 14px;
  padding-bottom: 18px;
}

.tl:not(:last-child)::before {
  content: '';
  position: absolute;
  top: 16px;
  bottom: 0;
  left: 5px;
  width: 2px;
  background: var(--color-border);
}

.tl__dot {
  z-index: 1;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  margin-top: 3px;
  border-radius: var(--radius-full);
  box-shadow: 0 0 0 3px var(--color-surface);
}

.tl__text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-ink);
}

.tl__note {
  margin: 2px 0 0;
  font-size: 13px;
  color: var(--color-body);
}

.tl__meta {
  font-size: 12px;
  color: var(--color-muted);
}
</style>
