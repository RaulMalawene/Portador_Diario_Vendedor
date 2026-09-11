<script setup lang="ts">
import { Search, Bell, ChevronRight } from '@lucide/vue'

defineProps<{
  crumbs: string[]
}>()
</script>

<template>
  <header class="topbar">
    <nav class="crumbs">
      <template v-for="(crumb, index) in crumbs" :key="crumb">
        <span :class="{ crumbs__current: index === crumbs.length - 1 }">{{ crumb }}</span>
        <ChevronRight v-if="index < crumbs.length - 1" :size="14" />
      </template>
    </nav>

    <div class="topbar__right">
      <span class="search">
        <Search :size="18" class="search__icon" />
        <input type="text" placeholder="Pesquisar produtos, pedidos..." />
      </span>
      <button class="icon-btn" type="button" aria-label="Notificações"><Bell :size="20" /></button>
    </div>
  </header>
</template>

<style scoped>
.topbar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  padding: 0 28px;
  border-bottom: 1px solid var(--color-border);
}

.crumbs {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: var(--color-muted);
}

.crumbs__current {
  font-weight: 500;
  color: var(--color-ink);
}

.topbar__right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 280px;
  height: 40px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
}

.search__icon {
  color: var(--color-muted);
}

.search input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
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

@media (max-width: 720px) {
  .search {
    width: 160px;
  }
}
</style>
