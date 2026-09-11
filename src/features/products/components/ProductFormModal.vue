<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'
import AppModal from '@/components/ui/AppModal.vue'
import { categories } from '../data/products.mock'
import type { ProductFormState } from '../types/products.types'

defineProps<{
  isEditing: boolean
}>()

const isOpen = defineModel<boolean>({ required: true })
const form = defineModel<ProductFormState>('form', { required: true })

const emit = defineEmits<{ submit: [] }>()

function close() {
  isOpen.value = false
}
</script>

<template>
  <AppModal v-model="isOpen" size="lg" labelled-by="product-modal-title">
    <h2 id="product-modal-title" class="product-modal__title">
      {{ isEditing ? 'Editar Produto' : 'Adicionar Produto' }}
    </h2>

    <form class="product-modal__body" novalidate @submit.prevent="emit('submit')">
      <label class="field">
        <span class="field__label">Nome do Produto</span>
        <input
          v-model="form.name"
          class="input"
          type="text"
          required
          placeholder="Ex: Arroz agulha Extra 5kg"
        />
      </label>

      <div class="field-grid">
        <label class="field">
          <span class="field__label">SKU</span>
          <input
            v-model="form.sku"
            class="input"
            type="text"
            required
            placeholder="Ex: MZ-AR-109"
          />
          <span class="field__hint">Deve ser único.</span>
        </label>

        <label class="field">
          <span class="field__label">Categoria</span>
          <div class="select select--full">
            <select v-model="form.category" required>
              <option value="" disabled>Seleccione</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <ChevronDown :size="16" class="select__icon" />
          </div>
        </label>
      </div>

      <div class="field-grid">
        <label class="field">
          <span class="field__label">Preço (MZN)</span>
          <div class="input-prefix">
            <span class="prefix">MT</span>
            <input
              v-model="form.price"
              type="number"
              step="0.01"
              min="0"
              required
              placeholder="0,00"
            />
          </div>
        </label>

        <label class="field">
          <span class="field__label">Stock</span>
          <input
            v-model="form.stock"
            class="input"
            type="number"
            min="0"
            required
            placeholder="0"
            :disabled="isEditing"
          />
          <span v-if="isEditing" class="field__hint">O stock altera-se no Inventário.</span>
        </label>
      </div>

      <div class="toggle-row">
        <div>
          <span class="field__label">Estado</span>
          <span class="field__hint">Produtos inactivos não aparecem para venda.</span>
        </div>
        <label class="switch">
          <input v-model="form.isActive" type="checkbox" />
          <span class="switch__track"></span>
          <span class="switch__text">{{ form.isActive ? 'Activo' : 'Inactivo' }}</span>
        </label>
      </div>

      <div class="product-modal__foot">
        <button class="btn btn--ghost" type="button" @click="close">Cancelar</button>
        <button class="btn" type="submit">
          {{ isEditing ? 'Guardar Alterações' : 'Adicionar Produto' }}
        </button>
      </div>
    </form>
  </AppModal>
</template>

<style scoped>
.product-modal__title {
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

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
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

.input:disabled {
  background: var(--color-surface-soft);
  color: var(--color-muted);
}

.select {
  position: relative;
}

.select select {
  height: 44px;
  padding: 0 36px 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  cursor: pointer;
  appearance: none;
}

.select--full select {
  width: 100%;
}

.select__icon {
  position: absolute;
  right: 12px;
  top: 50%;
  color: var(--color-muted);
  pointer-events: none;
  transform: translateY(-50%);
}

.input-prefix {
  display: flex;
  align-items: center;
  height: 44px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.input-prefix:focus-within {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.prefix {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  background: var(--color-surface-soft);
  font-size: 13px;
  color: var(--color-muted);
}

.input-prefix input {
  flex: 1;
  border: 0;
  outline: 0;
  padding: 0 12px;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
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

.product-modal__foot {
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

@media (max-width: 720px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
