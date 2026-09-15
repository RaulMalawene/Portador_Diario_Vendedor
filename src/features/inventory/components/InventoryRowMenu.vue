<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { MoreHorizontal, PackagePlus, History } from '@lucide/vue'

const emit = defineEmits<{ adjust: []; history: [] }>()

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const panelRef = ref<HTMLElement | null>(null)
const panelStyle = ref<Record<string, string>>({})

function updatePosition() {
  const el = rootRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  panelStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 6}px`,
    right: `${window.innerWidth - rect.right}px`,
  }
}

function close() {
  isOpen.value = false
}

function toggle() {
  if (!isOpen.value) updatePosition()
  isOpen.value = !isOpen.value
}

function handle(action: () => void) {
  action()
  close()
}

function handleOutsideClick(event: MouseEvent) {
  const target = event.target as Node
  if (rootRef.value?.contains(target)) return
  if (panelRef.value?.contains(target)) return
  close()
}

function handleScrollOrResize() {
  if (isOpen.value) close()
}

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick)
  window.addEventListener('scroll', handleScrollOrResize, true)
  window.addEventListener('resize', handleScrollOrResize)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick)
  window.removeEventListener('scroll', handleScrollOrResize, true)
  window.removeEventListener('resize', handleScrollOrResize)
})
</script>

<template>
  <div ref="rootRef" class="row-menu">
    <button class="row-menu__trigger" type="button" aria-label="Mais ações" @click="toggle">
      <MoreHorizontal :size="18" />
    </button>

    <Teleport to="body">
      <div v-if="isOpen" ref="panelRef" class="row-menu__panel" :style="panelStyle">
        <button type="button" @click="handle(() => emit('adjust'))">
          <PackagePlus :size="15" /> Ajustar stock
        </button>
        <button type="button" @click="handle(() => emit('history'))">
          <History :size="15" /> Ver histórico
        </button>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.row-menu {
  position: relative;
  display: inline-flex;
}

.row-menu__trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-body);
  cursor: pointer;
}

.row-menu__trigger:hover {
  background: var(--color-surface-soft);
}

.row-menu__panel {
  z-index: 1000;
  display: flex;
  flex-direction: column;
  min-width: 170px;
  padding: 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.row-menu__panel button {
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

.row-menu__panel button:hover {
  background: var(--color-surface-soft);
}
</style>
