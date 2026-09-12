<script setup lang="ts">
import { ref, watch } from 'vue'
import { AlertTriangle, CheckCircle2, Plus, Send, Trash2 } from '@lucide/vue'
import { formatMoney } from '@/features/orders/utils/orders'
import type { CatalogProduct, ClientCartItem, Customer, RequestFeedback } from '../types/client.types'

const props = defineProps<{
  customers: Customer[]
  catalog: CatalogProduct[]
  cart: ClientCartItem[]
  cartTotal: number
  isLoadingOptions: boolean
  isSubmitting: boolean
  lastOrderFeedback: RequestFeedback | null
}>()

const emit = defineEmits<{
  addToCart: [productId: number, quantity: number]
  removeFromCart: [productId: number]
  submit: []
}>()

const selectedCustomerId = defineModel<number | null>('selectedCustomerId', { required: true })

const selectedProductId = ref<number | null>(props.catalog[0]?.id ?? null)
const quantity = ref(1)

// O catálogo chega de forma assíncrona (pedido à API); assim que estiver
// disponível, selecciona o primeiro produto por defeito.
watch(
  () => props.catalog,
  (list) => {
    if (selectedProductId.value === null && list.length > 0) {
      selectedProductId.value = list[0]!.id
    }
  },
  { immediate: true },
)

function handleAdd() {
  if (!selectedProductId.value || quantity.value < 1) return
  emit('addToCart', selectedProductId.value, quantity.value)
  quantity.value = 1
}

function stockLabel(product: CatalogProduct): string {
  if (product.stock_status === 'out_of_stock') return 'esgotado'
  if (product.stock_status === 'low_stock') return `${product.stock} em stock (baixo)`
  return `${product.stock} em stock`
}
</script>

<template>
  <section class="order-panel">
    <h2 class="order-panel__title">Nova Encomenda</h2>

    <label class="field">
      <span class="field__label">Cliente</span>
      <select v-model="selectedCustomerId" class="select" :disabled="isLoadingOptions">
        <option :value="null" disabled>Seleccione um cliente</option>
        <option v-for="customer in customers" :key="customer.id" :value="customer.id">
          {{ customer.name }}
        </option>
      </select>
    </label>

    <div class="order-panel__picker">
      <label class="field field--product">
        <span class="field__label">Produto</span>
        <select v-model="selectedProductId" class="select" :disabled="isLoadingOptions">
          <option v-for="item in catalog" :key="item.id" :value="item.id">
            {{ item.name }} — {{ formatMoney(Number(item.price)) }} ({{ stockLabel(item) }})
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
      <li v-for="item in cart" :key="item.productId" class="cart-list__item">
        <span class="cart-list__name">{{ item.name }}</span>
        <span class="cart-list__qty">x{{ item.quantity }}</span>
        <span class="cart-list__price">{{ formatMoney(item.unitPrice * item.quantity) }}</span>
        <button
          class="cart-list__remove"
          type="button"
          aria-label="Remover"
          @click="emit('removeFromCart', item.productId)"
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
        :disabled="!cart.length || !selectedCustomerId || isSubmitting"
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
  margin-bottom: 16px;
}

.order-panel__picker .field {
  margin-bottom: 0;
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

@media (max-width: 560px) {
  .order-panel__picker {
    flex-wrap: wrap;
  }

  .field--product {
    flex-basis: 100%;
  }
}
</style>
