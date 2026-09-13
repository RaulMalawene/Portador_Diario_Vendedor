<script setup lang="ts">
import { AlertCircle } from '@lucide/vue'
import AppModal from '@/components/ui/AppModal.vue'
import type { CategoryFormState } from '../types/categories.types'

defineProps<{
  isEditing: boolean
  errorMessage?: string | null
}>()

const isOpen = defineModel<boolean>({ required: true })
const form = defineModel<CategoryFormState>('form', { required: true })

const emit = defineEmits<{ submit: [] }>()

function close() {
  isOpen.value = false
}
</script>

<template>
  <AppModal v-model="isOpen" size="md" labelled-by="category-modal-title">
    <h2 id="category-modal-title" class="category-modal__title">
      {{ isEditing ? 'Editar Categoria' : 'Nova Categoria' }}
    </h2>

    <form class="category-modal__body" novalidate @submit.prevent="emit('submit')">
      <p v-if="errorMessage" class="category-modal__error">
        <AlertCircle :size="15" /> {{ errorMessage }}
      </p>

      <label class="field">
        <span class="field__label">Nome da Categoria</span>
        <input
          v-model="form.name"
          class="input"
          type="text"
          required
          placeholder="Ex: Congelados"
        />
      </label>

      <div class="category-modal__foot">
        <button class="btn btn--ghost" type="button" @click="close">Cancelar</button>
        <button class="btn" type="submit">
          {{ isEditing ? 'Guardar Alterações' : 'Criar Categoria' }}
        </button>
      </div>
    </form>
  </AppModal>
</template>

<style scoped>
.category-modal__title {
  margin: 0 0 20px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
}

.category-modal__error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.field {
  display: block;
  margin-bottom: 18px;
}

.field__label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  outline: 0;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.category-modal__foot {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  display: inline-flex;
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

.btn--ghost {
  background: var(--color-surface);
  color: var(--color-body);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover {
  background: var(--color-surface-soft);
}
</style>
