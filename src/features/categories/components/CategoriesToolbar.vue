<script setup lang="ts">
import { Search } from '@lucide/vue'

const search = defineModel<string>('search', { default: '' })
</script>

<template>
  <div class="toolbar">
    <span class="toolbar__search">
      <Search :size="18" class="toolbar__search-icon" />
      <input v-model="search" type="text" placeholder="Pesquisar categorias..." />
    </span>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
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
</style>
