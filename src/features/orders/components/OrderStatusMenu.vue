<script setup lang="ts">
import { ArrowRight, CheckCircle2 } from '@lucide/vue'

defineProps<{
  nextLabel: string | null
  isAdvancing: boolean
}>()

const emit = defineEmits<{ advance: [] }>()
</script>

<template>
  <div class="status-action">
    <button
      v-if="nextLabel"
      class="btn"
      type="button"
      :disabled="isAdvancing"
      @click="emit('advance')"
    >
      <ArrowRight :size="16" /><span>{{ isAdvancing ? 'A avançar...' : `Avançar para ${nextLabel}` }}</span>
    </button>
    <span v-else class="status-done">
      <CheckCircle2 :size="16" />
      Encomenda concluída
    </span>
  </div>
</template>

<style scoped>
.status-action {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
}

.btn {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover:not(:disabled) {
  background: var(--brand-primary-dark);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.status-done {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border-radius: var(--radius-sm);
  background: var(--color-success-tint);
  color: var(--color-success);
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
}
</style>
