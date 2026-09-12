<script setup lang="ts">
import { ref } from 'vue'
import { AlertTriangle, CheckCircle2, Plus, Send, Trash2 } from '@lucide/vue'
import { formatMoney } from '@/features/orders/utils/orders'
import type { CatalogItem } from '../data/catalog'
import type { ClientCartItem, RequestFeedback } from '../types/client.types'

const props = defineProps<{
  catalog: CatalogItem[]
  cart: ClientCartItem[]
  cartTotal: number
  isSubmitting: boolean
  lastOrderFeedback: RequestFeedback | null
}>()

const emit = defineEmits<{
  addToCart: [sku: string, quantity: number]
  removeFromCart: [sku: string]
  submit: []
}>()

const selectedSku = ref(props.catalog[0]?.sku ?? '')
const quantity = ref(1)

function handleAdd() {
  if (!selectedSku.value || quantity.value < 1) return
  emit('addToCart', selectedSku.value, quantity.value)
  quantity.value = 1
}
</script>

<template>
  <section class="order-panel">
    <h2 class="order-panel__title">Nova Encomenda</h2>

    <div class="order-panel__picker">
      <label class="field field--product">
        <span class="field__label">Produto</span>
        <select v-model="selectedSku" class="select">
          <option v-for="item in catalog" :key="item.sku" :value="item.sku">
            {{ item.name }} — {{ formatMoney(item.unitPrice) }}
          </option>
        </select>
      </label>

      <label class="field field--qty">
        <span class="field__label">Qtd.</span>
        <input v-model.number="quantity" class="input" type="number" min="1" />
      </label>

      <button class="btn btn--ghost" type="button" @click="handleAdd">
        <Plus :size="16" /> Adicionar
      </button>
    </div>

    <ul v-if="cart.length" class="cart-list">
      <li v-for="item in cart" :key="item.sku" class="cart-list__item">
        <span class="cart-list__name">{{ item.name }}</span>
        <span class="cart-list__qty">x{{ item.quantity }}</span>
        <span class="cart-list__price">{{ formatMoney(item.unitPrice * item.quantity) }}</span>
        <button
          class="cart-list__remove"
          type="button"
          aria-label="Remover"
          @click="emit('removeFromCart', item.sku)"
        >
          <Trash2 :size="14" />
        </button>
      </li>
    </ul>
    <p v-else class="order-panel__empty">O carrinho está vazio. Adicione produtos acima.</p>

    <div class="order-panel__footer">
      <span class="order-panel__total">
        Total: <strong>{{ formatMoney(cartTotal) }}</strong>
      </span>
      <button
        class="btn"
        type="button"
        :disabled="!cart.length || isSubmitting"
        @click="emit('submit')"
      >
        <Send :size="16" /> {{ isSubmitting ? 'A enviar...' : 'Enviar Encomenda' }}
      </button>
    </div>

    <p
      v-if="lastOrderFeedback"
      class="order-panel__result"
      :class="lastOrderFeedback.ok ? 'is-ok' : 'is-error'"
    >
      <component :is="lastOrderFeedback.ok ? CheckCircle2 : AlertTriangle" :size="15" />
      {{ lastOrderFeedback.message }}
      <span class="order-panel__latency">
        ({{ lastOrderFeedback.durationMs }} ms<template v-if="lastOrderFeedback.status">
          · HTTP {{ lastOrderFeedback.status }}</template
        >)
      </span>
    </p>
  </section>
</template>

<style scoped>
.order-panel {
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.order-panel__title {
  margin: 0 0 16px;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
}

.order-panel__picker {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 16px;
}

.field {
  display: block;
}

.field--product {
  flex: 1;
  min-width: 0;
}

.field--qty {
  width: 84px;
  flex-shrink: 0;
}

.field__label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.input,
.select {
  width: 100%;
  height: 42px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  outline: 0;
  background: var(--color-surface);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.input:focus,
.select:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 0 16px;
  padding: 0;
  list-style: none;
}

.cart-list__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface-soft);
}

.cart-list__name {
  overflow: hidden;
  flex: 1;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-list__qty {
  flex-shrink: 0;
  font-size: 12px;
  color: var(--color-muted);
}

.cart-list__price {
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.cart-list__remove {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: var(--radius-full);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}

.cart-list__remove:hover {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

.order-panel__empty {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-muted);
}

.order-panel__footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--color-surface-soft);
}

.order-panel__total {
  font-size: 14px;
  color: var(--color-body);
}

.order-panel__total strong {
  color: var(--color-ink);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
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
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--ghost {
  background: var(--color-surface);
  color: var(--color-body);
  border: 1px solid var(--color-border);
}

.btn--ghost:hover:not(:disabled) {
  background: var(--color-surface-soft);
}

.order-panel__result {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0 0;
  font-size: 13px;
  font-weight: 600;
}

.order-panel__result.is-ok {
  color: var(--color-success);
}

.order-panel__result.is-error {
  color: var(--color-danger);
}

.order-panel__latency {
  font-weight: 500;
  color: var(--color-muted);
}

@media (max-width: 560px) {
  .order-panel__picker {
    flex-wrap: wrap;
  }

  .field--product {
    flex-basis: 100%;
  }
}
</style>
