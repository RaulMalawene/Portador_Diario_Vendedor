<script setup lang="ts">
import { ref } from 'vue'
import { ArrowRight, CheckCircle2, XCircle } from '@lucide/vue'

const props = defineProps<{
  status: string
  nextLabel: string | null
  cancellable: boolean
}>()

const emit = defineEmits<{ advance: []; cancel: [] }>()

const confirmingCancel = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

function startCancel() {
  confirmingCancel.value = true
  clearTimeout(resetTimer)
  resetTimer = setTimeout(() => (confirmingCancel.value = false), 5000)
}

function confirmCancel() {
  clearTimeout(resetTimer)
  confirmingCancel.value = false
  emit('cancel')
}

function abortCancel() {
  clearTimeout(resetTimer)
  confirmingCancel.value = false
}
</script>

<template>
  <div class="status-action">
    <button v-if="props.nextLabel" class="btn" type="button" @click="emit('advance')">
      <ArrowRight :size="16" /><span>Avançar para {{ props.nextLabel }}</span>
    </button>
    <span v-else class="status-done" :class="{ 'is-cancelled': props.status === 'cancelled' }">
      <CheckCircle2 v-if="props.status !== 'cancelled'" :size="16" />
      <XCircle v-else :size="16" />
      {{ props.status === 'cancelled' ? 'Encomenda cancelada' : 'Encomenda concluída' }}
    </span>

    <template v-if="props.cancellable">
      <button
        v-if="!confirmingCancel"
        class="btn-text btn-text--danger"
        type="button"
        @click="startCancel"
      >
        Cancelar encomenda
      </button>
      <span v-else class="confirm-cancel">
        Tem a certeza?
        <button class="btn-text btn-text--danger" type="button" @click="confirmCancel">
          Sim, cancelar
        </button>
        <button class="btn-text" type="button" @click="abortCancel">Voltar</button>
      </span>
    </template>
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

.btn:hover {
  background: var(--brand-primary-dark);
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

.status-done.is-cancelled {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

.btn-text {
  border: 0;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
}

.btn-text:hover {
  color: var(--color-ink);
  text-decoration: underline;
}

.btn-text--danger {
  color: var(--color-danger);
}

.btn-text--danger:hover {
  color: var(--color-danger);
}

.confirm-cancel {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-body);
}
</style>
