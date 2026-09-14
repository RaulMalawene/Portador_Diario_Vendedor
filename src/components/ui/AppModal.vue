<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { X } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    labelledBy: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    size: 'sm',
  },
)

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>()

function close() {
  emit('update:modelValue', false)
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (isOpen) => {
    document.documentElement.classList.toggle('has-modal-open', isOpen)
  },
)

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.documentElement.classList.remove('has-modal-open')
})
</script>

<template>
  <Teleport to="body">
    <Transition name="app-modal">
      <div v-if="modelValue" class="app-modal" @mousedown.self="close">
        <div
          class="app-modal__card"
          :class="`app-modal__card--${size}`"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="labelledBy"
        >
          <button type="button" class="app-modal__close" aria-label="Fechar" @click="close">
            <X :size="18" />
          </button>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.app-modal {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(28, 22, 32, 0.45);
  backdrop-filter: blur(2px);
}

.app-modal__card {
  position: relative;
  width: 100%;
  min-width: 0;
  max-height: calc(100vh - 48px);
  padding: 32px;
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);
  overflow-x: auto;
  overflow-y: auto;
}

.app-modal__card--sm {
  max-width: 420px;
}

.app-modal__card--md {
  max-width: 480px;
}

.app-modal__card--lg {
  max-width: 560px;
}

.app-modal__close {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  padding: 6px;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: background 0.15s;
}

.app-modal__close:hover {
  background: var(--color-surface-soft);
}

.app-modal-enter-active,
.app-modal-leave-active {
  transition: opacity 0.18s ease;
}

.app-modal-enter-from,
.app-modal-leave-to {
  opacity: 0;
}

.app-modal-enter-active .app-modal__card,
.app-modal-leave-active .app-modal__card {
  transition: transform 0.18s ease;
}

.app-modal-enter-from .app-modal__card,
.app-modal-leave-to .app-modal__card {
  transform: scale(0.96) translateY(4px);
}

@media (max-width: 480px) {
  .app-modal {
    padding: 12px;
  }

  .app-modal__card {
    max-height: calc(100vh - 24px);
    padding: 22px 18px;
  }
}
</style>
