<script setup lang="ts">
import { Package2 } from '@lucide/vue'
import CategoryCardMenu from './CategoryCardMenu.vue'
import { categoryIcons } from '../utils/categoryIcons'
import type { Category } from '../types/categories.types'

defineProps<{ category: Category }>()

defineEmits<{ edit: []; remove: [] }>()
</script>

<template>
  <article class="cat-card" :class="`cat-card--${category.theme}`">
    <span class="cat-card__decor" aria-hidden="true">
      <span class="cat-card__glow"></span>
    </span>

    <header class="cat-card__head">
      <span class="cat-card__icon">
        <component :is="categoryIcons[category.icon]" :size="24" />
      </span>
      <CategoryCardMenu @edit="$emit('edit')" @remove="$emit('remove')" />
    </header>

    <div class="cat-card__body">
      <h3 class="cat-card__name">{{ category.name }}</h3>
    </div>

    <footer class="cat-card__foot">
      <span class="cat-card__count">
        <Package2 :size="14" />
        {{ category.productsCount }} {{ category.productsCount === 1 ? 'produto' : 'produtos' }}
      </span>
    </footer>
  </article>
</template>

<style scoped>
.cat-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    border-color 0.18s ease;
}

.cat-card:hover {
  border-color: var(--cat-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-3px);
}

.cat-card__decor {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.cat-card__decor::before {
  content: '';
  position: absolute;
  inset: 0 0 auto 0;
  height: 4px;
  background: var(--cat-color);
}

.cat-card__glow {
  position: absolute;
  top: -36px;
  right: -36px;
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: var(--cat-tint);
  opacity: 0.6;
}

.cat-card--primary {
  --cat-tint: var(--brand-primary-tint);
  --cat-color: var(--brand-primary);
}

.cat-card--accent {
  --cat-tint: var(--brand-accent-tint);
  --cat-color: var(--brand-accent-dark);
}

.cat-card--success {
  --cat-tint: var(--color-success-tint);
  --cat-color: var(--color-success);
}

.cat-card--info {
  --cat-tint: var(--color-info-tint);
  --cat-color: var(--color-info);
}

.cat-card--warning {
  --cat-tint: var(--color-warning-tint);
  --cat-color: var(--color-warning);
}

.cat-card--danger {
  --cat-tint: var(--color-danger-tint);
  --cat-color: var(--color-danger);
}

.cat-card--teal {
  --cat-tint: var(--color-teal-tint);
  --cat-color: var(--color-teal);
}

.cat-card__head {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.cat-card__icon {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-md);
  background: var(--cat-tint);
  color: var(--cat-color);
}

.cat-card__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
}

.cat-card__name {
  margin: 0;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cat-card__foot {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--color-surface-soft);
}

.cat-card__count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--cat-color);
}
</style>
