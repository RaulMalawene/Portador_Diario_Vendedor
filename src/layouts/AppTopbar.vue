<script setup lang="ts">
import { Search, Bell, LayoutGrid } from '@lucide/vue'

defineProps<{
  title: string
}>()
</script>

<template>
  <header class="topbar">
    <div class="topbar__title">
      <span class="topbar__title-icon"><LayoutGrid :size="16" /></span>
      <span>{{ title }}</span>
    </div>

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

.topbar__title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.topbar__title-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
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
