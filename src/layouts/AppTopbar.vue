<script setup lang="ts">
import { Bell, LayoutGrid, Menu } from '@lucide/vue'

defineProps<{
  title: string
}>()

const emit = defineEmits<{ 'toggle-nav': [] }>()
</script>

<template>
  <header class="topbar">
    <div class="topbar__left">
      <button
        class="icon-btn topbar__menu"
        type="button"
        aria-label="Abrir menu de navegação"
        @click="emit('toggle-nav')"
      >
        <Menu :size="20" />
      </button>

      <div class="topbar__title">
        <span class="topbar__title-icon"><LayoutGrid :size="16" /></span>
        <span>{{ title }}</span>
      </div>
    </div>

    <div class="topbar__right">
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
  gap: 12px;
  height: 68px;
  padding: 0 28px;
  border-bottom: 1px solid var(--color-border);
}

.topbar__left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.icon-btn.topbar__menu {
  display: none;
}

.topbar__title {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.topbar__title span:last-child {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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

@media (max-width: 900px) {
  .topbar {
    padding: 0 16px;
  }

  .icon-btn.topbar__menu {
    display: flex;
  }
}

@media (max-width: 480px) {
  .topbar {
    height: 60px;
  }

  .topbar__title-icon {
    display: none;
  }
}
</style>
