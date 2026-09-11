<script setup lang="ts">
import type { OrderHistoryEntry } from '../types/orders.types'
import { statusColorVar } from '../utils/orders'

defineProps<{ history: OrderHistoryEntry[] }>()
</script>

<template>
  <ul class="timeline">
    <li v-for="(entry, index) in history" :key="index" class="tl">
      <span class="tl__dot" :style="{ background: statusColorVar(entry.to) }"></span>
      <div class="tl__body">
        <p class="tl__text">{{ entry.note }}</p>
        <span class="tl__meta">Por {{ entry.by }} • {{ entry.date }}</span>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 16px 0 0;
  padding: 0;
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

.tl__meta {
  font-size: 12px;
  color: var(--color-muted);
}
</style>
