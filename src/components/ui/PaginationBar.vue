<script setup lang="ts">
import { ChevronLeft, ChevronRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    shown: number
    total: number
    itemsLabel?: string
  }>(),
  {
    itemsLabel: 'resultados',
  },
)
</script>

<template>
  <div class="pagination">
    <span class="pagination__info">
      A mostrar <strong>{{ shown }}</strong> de <strong>{{ total }}</strong> {{ itemsLabel }}
    </span>
    <div class="pagination__pages">
      <button class="page-btn" type="button" aria-label="Página anterior">
        <ChevronLeft :size="16" />
      </button>
      <button class="page-btn is-active" type="button">1</button>
      <button class="page-btn" type="button">2</button>
      <button class="page-btn" type="button">3</button>
      <button class="page-btn" type="button" aria-label="Página seguinte">
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-top: 1px solid var(--color-border);
}

.pagination__info {
  font-size: 13px;
  color: var(--color-body);
}

.pagination__pages {
  display: flex;
  gap: 6px;
}

.page-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-size: 13px;
  font-weight: 600;
  color: var(--color-body);
  cursor: pointer;
}

.page-btn:hover {
  background: var(--color-surface-soft);
}

.page-btn.is-active {
  border-color: var(--brand-primary);
  background: var(--brand-primary);
  color: var(--color-surface);
}
</style>
