<script setup lang="ts">
import { Search, ChevronDown, SlidersHorizontal } from '@lucide/vue'

const search = defineModel<string>('search', { default: '' })
const status = defineModel<string>('status', { default: 'all' })

const statusOptions = [
  { value: 'all', label: 'Todos os Estados' },
  { value: 'pending', label: 'Pendente' },
  { value: 'confirmed', label: 'Confirmada' },
  { value: 'processing', label: 'Em processamento' },
  { value: 'shipped', label: 'Enviada' },
  { value: 'delivered', label: 'Entregue' },
]
</script>

<template>
  <div class="toolbar">
    <span class="toolbar__search">
      <Search :size="18" class="toolbar__search-icon" />
      <input
        v-model="search"
        type="text"
        placeholder="Pesquisar por cliente ou nº de encomenda..."
      />
    </span>

    <div class="toolbar__filters">
      <label class="toolbar__filter-label" for="orders-status-filter">Filtrar por:</label>
      <div class="select">
        <select id="orders-status-filter" v-model="status">
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <ChevronDown :size="16" class="select__icon" />
      </div>
      <button class="icon-btn" type="button" aria-label="Mais filtros">
        <SlidersHorizontal :size="18" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.toolbar__search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
  max-width: 640px;
}

.toolbar__search-icon {
  color: var(--color-muted);
  flex-shrink: 0;
}

.toolbar__search input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
}

.toolbar__filters {
  display: flex;
  align-items: center;
  gap: 10px;
}

.toolbar__filter-label {
  font-size: 13px;
  color: var(--color-body);
}

.select {
  position: relative;
}

.select select {
  height: 40px;
  padding: 0 36px 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  cursor: pointer;
  appearance: none;
}

.select__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  color: var(--color-muted);
  pointer-events: none;
  transform: translateY(-50%);
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-body);
  cursor: pointer;
}

.icon-btn:hover {
  background: var(--color-surface-soft);
}

@media (max-width: 1100px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
