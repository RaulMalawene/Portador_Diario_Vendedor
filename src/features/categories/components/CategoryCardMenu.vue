<script setup lang="ts">
import { ref } from 'vue'
import { MoreHorizontal, Pencil, Power, PowerOff, Trash2 } from '@lucide/vue'
import { useClickOutside } from '@/composables/useClickOutside'
import type { Category } from '../types/categories.types'

defineProps<{ category: Category }>()

const emit = defineEmits<{ edit: []; toggleActive: []; remove: [] }>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

useClickOutside(rootRef, () => {
  isOpen.value = false
})

function toggle() {
  isOpen.value = !isOpen.value
}

function handle(action: () => void) {
  action()
  isOpen.value = false
}
</script>

<template>
  <div ref="rootRef" class="cat-menu">
    <button class="cat-menu__trigger" type="button" aria-label="Mais ações" @click="toggle">
      <MoreHorizontal :size="18" />
    </button>

    <div v-if="isOpen" class="cat-menu__panel">
      <button type="button" @click="handle(() => emit('edit'))">
        <Pencil :size="15" /> Editar
      </button>
      <button type="button" @click="handle(() => emit('toggleActive'))">
        <component :is="category.active ? PowerOff : Power" :size="15" />
        {{ category.active ? 'Desactivar' : 'Activar' }}
      </button>
      <button type="button" class="cat-menu__danger" @click="handle(() => emit('remove'))">
        <Trash2 :size="15" /> Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
.cat-menu {
  position: relative;
  z-index: 2;
  display: inline-flex;
}

.cat-menu__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  background: var(--color-surface);
  color: var(--color-body);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s,
    border-color 0.15s;
}

.cat-menu__trigger:hover {
  background: var(--color-surface-soft);
  color: var(--color-ink);
  border-color: var(--color-muted);
}

.cat-menu__panel {
  position: absolute;
  right: 0;
  top: 38px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  min-width: 170px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.cat-menu__panel button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  color: var(--color-ink);
  text-align: left;
  cursor: pointer;
}

.cat-menu__panel button:hover {
  background: var(--color-surface-soft);
}

.cat-menu__danger {
  color: var(--color-danger);
}

.cat-menu__danger:hover {
  background: var(--color-danger-tint);
}
</style>
