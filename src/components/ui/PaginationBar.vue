<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    shown: number
    total: number
    itemsLabel?: string
    currentPage?: number
    lastPage?: number
  }>(),
  {
    itemsLabel: 'resultados',
    currentPage: 1,
    lastPage: 1,
  },
)

const emit = defineEmits<{ change: [page: number] }>()

// Janela de até 5 números de página à volta da página actual.
const pages = computed(() => {
  const start = Math.max(1, Math.min(props.currentPage - 2, props.lastPage - 4))
  const end = Math.min(props.lastPage, Math.max(props.currentPage + 2, 5))
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i)
})

function go(page: number) {
  if (page < 1 || page > props.lastPage || page === props.currentPage) return
  emit('change', page)
}
</script>

<template>
  <div class="pagination">
    <span class="pagination__info">
      A mostrar <strong>{{ shown }}</strong> de <strong>{{ total }}</strong> {{ itemsLabel }}
    </span>
    <div v-if="lastPage > 1" class="pagination__pages">
      <button
        class="page-btn"
        type="button"
        aria-label="Página anterior"
        :disabled="currentPage === 1"
        @click="go(currentPage - 1)"
      >
        <ChevronLeft :size="16" />
      </button>
      <button
        v-for="page in pages"
        :key="page"
        class="page-btn"
        :class="{ 'is-active': page === currentPage }"
        type="button"
        @click="go(page)"
      >
        {{ page }}
      </button>
      <button
        class="page-btn"
        type="button"
        aria-label="Página seguinte"
        :disabled="currentPage === lastPage"
        @click="go(currentPage + 1)"
      >
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

.page-btn:hover:not(:disabled) {
  background: var(--color-surface-soft);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-btn.is-active {
  border-color: var(--brand-primary);
  background: var(--brand-primary);
  color: var(--color-surface);
}
</style>
