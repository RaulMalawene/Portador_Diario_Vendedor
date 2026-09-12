<script setup lang="ts">
import AppModal from '@/components/ui/AppModal.vue'
import type { CategoryFormState } from '../types/categories.types'

defineProps<{
  isEditing: boolean
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

      <label class="field">
        <span class="field__label">Descrição</span>
        <textarea
          v-model="form.description"
          class="textarea"
          rows="3"
          placeholder="Explique brevemente o que pertence a esta categoria..."
        ></textarea>
      </label>

      <div class="toggle-row">
        <div>
          <span class="field__label">Estado</span>
          <span class="field__hint">Categorias inactivas ficam ocultas no catálogo.</span>
        </div>
        <label class="switch">
          <input v-model="form.isActive" type="checkbox" />
          <span class="switch__track"></span>
          <span class="switch__text">{{ form.isActive ? 'Activa' : 'Inactiva' }}</span>
        </label>
      </div>

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

.field__hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-muted);
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

.textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  outline: 0;
  resize: vertical;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.textarea:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.toggle-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0 4px;
}

.switch {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.switch input {
  display: none;
}

.switch__track {
  position: relative;
  width: 42px;
  height: 24px;
  border-radius: var(--radius-full);
  background: var(--color-border);
  transition: background 0.15s;
}

.switch__track::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  transition: transform 0.15s;
}

.switch input:checked + .switch__track {
  background: var(--brand-primary);
}

.switch input:checked + .switch__track::after {
  transform: translateX(18px);
}

.switch__text {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
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
