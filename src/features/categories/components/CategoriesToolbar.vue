<script setup lang="ts">
import { Search, ChevronDown } from '@lucide/vue'

const search = defineModel<string>('search', { default: '' })
const status = defineModel<string>('status', { default: 'all' })

const statusOptions = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'active', label: 'Activas' },
  { value: 'inactive', label: 'Inactivas' },
]
</script>

<template>
  <div class="toolbar">
    <span class="toolbar__search">
      <Search :size="18" class="toolbar__search-icon" />
      <input v-model="search" type="text" placeholder="Pesquisar categorias..." />
    </span>

    <div class="toolbar__filters">
      <label class="toolbar__filter-label" for="categories-status-filter">Filtrar por:</label>
      <div class="select">
        <select id="categories-status-filter" v-model="status">
          <option v-for="option in statusOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <ChevronDown :size="16" class="select__icon" />
      </div>
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

@media (max-width: 1100px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
