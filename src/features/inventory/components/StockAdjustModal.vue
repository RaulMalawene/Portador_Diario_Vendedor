<script setup lang="ts">
import { computed } from 'vue'
import { ChevronDown, ArrowDownToLine, ArrowUpFromLine, Pencil } from '@lucide/vue'
import AppModal from '@/components/ui/AppModal.vue'
import type { AdjustFormState, InventoryItem } from '../types/inventory.types'

const props = defineProps<{
  items: InventoryItem[]
}>()

const isOpen = defineModel<boolean>({ required: true })
const form = defineModel<AdjustFormState>('form', { required: true })

const emit = defineEmits<{ submit: [] }>()

function close() {
  isOpen.value = false
}

const selectedItem = computed(() => props.items.find((item) => item.sku === form.value.sku))

const currentStock = computed(() => selectedItem.value?.stock ?? 0)

const newStock = computed(() => {
  const qty = Number(form.value.quantity) || 0
  if (form.value.type === 'in') return currentStock.value + qty
  if (form.value.type === 'out') return currentStock.value - qty
  return qty
})

const isNegative = computed(() => newStock.value < 0)

const canSubmit = computed(() => !isNegative.value && Boolean(form.value.sku))
</script>

<template>
  <AppModal v-model="isOpen" size="md" labelled-by="stock-adjust-title">
    <h2 id="stock-adjust-title" class="modal__title">Ajustar Stock</h2>

    <form class="modal__body" novalidate @submit.prevent="emit('submit')">
      <label class="field">
        <span class="field__label">Produto</span>
        <div class="select select--full">
          <select v-model="form.sku" required>
            <option value="" disabled>Seleccione um produto</option>
            <option v-for="item in items" :key="item.sku" :value="item.sku">
              {{ item.name }} ({{ item.sku }})
            </option>
          </select>
          <ChevronDown :size="16" class="select__icon" />
        </div>
      </label>

      <div class="field">
        <span class="field__label">Tipo de Movimento</span>
        <div class="segment">
          <button
            type="button"
            class="segment__btn"
            :class="{ 'is-active': form.type === 'in' }"
            @click="form.type = 'in'"
          >
            <ArrowDownToLine :size="16" /> Entrada
          </button>
          <button
            type="button"
            class="segment__btn"
            :class="{ 'is-active': form.type === 'out' }"
            @click="form.type = 'out'"
          >
            <ArrowUpFromLine :size="16" /> Saída
          </button>
          <button
            type="button"
            class="segment__btn"
            :class="{ 'is-active': form.type === 'adjustment' }"
            @click="form.type = 'adjustment'"
          >
            <Pencil :size="16" /> Correcção
          </button>
        </div>
      </div>

      <label class="field">
        <span class="field__label">
          {{ form.type === 'adjustment' ? 'Novo valor de stock' : 'Quantidade' }}
        </span>
        <input
          v-model="form.quantity"
          class="input"
          type="number"
          min="0"
          required
          placeholder="0"
        />
      </label>

      <label class="field">
        <span class="field__label">Motivo (opcional)</span>
        <input
          v-model="form.note"
          class="input"
          type="text"
          placeholder="Ex: Reposição de fornecedor"
        />
      </label>

      <div v-if="selectedItem" class="preview" :class="{ 'preview--error': isNegative }">
        <div class="preview__row">
          <span>Stock actual</span>
          <strong>{{ currentStock }} un</strong>
        </div>
        <div class="preview__row">
          <span>Novo stock</span>
          <strong>{{ isNegative ? '—' : `${newStock} un` }}</strong>
        </div>
        <p v-if="isNegative" class="preview__error">
          Stock insuficiente. Disponível: {{ currentStock }}, a remover: {{ form.quantity }}.
        </p>
      </div>

      <div class="modal__foot">
        <button class="btn btn--ghost" type="button" @click="close">Cancelar</button>
        <button class="btn" type="submit" :disabled="!canSubmit">Guardar Movimento</button>
      </div>
    </form>
  </AppModal>
</template>

<style scoped>
.modal__title {
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

.segment {
  display: flex;
  gap: 10px;
}

.segment__btn {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 44px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-body);
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s,
    color 0.15s;
}

.segment__btn:hover {
  background: var(--color-surface-soft);
}

.segment__btn.is-active {
  border-color: var(--brand-primary);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
}

.preview {
  padding: 14px 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface-soft);
  margin-bottom: 4px;
}

.preview--error {
  background: var(--color-danger-tint);
}

.preview__row {
  display: flex;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 14px;
  color: var(--color-ink);
}

.preview__error {
  margin: 8px 0 0;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-danger);
}

.modal__foot {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
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

.btn:hover:not(:disabled) {
  background: var(--brand-primary-dark);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .segment {
    flex-direction: column;
  }
}
</style>
