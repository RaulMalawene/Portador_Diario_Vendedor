import { computed, ref } from 'vue'
import { catalog } from '../data/catalog'
import { mockClientOrders } from '../data/clientOrders.mock'
import type { ClientCartItem, ClientOrder, RequestFeedback } from '../types/client.types'

// Versão só de design: tudo corre localmente, sem chamadas ao backend.
// TODO: quando tiveres a API, substitui o corpo de `submitOrder` e
// `loadOrders` por pedidos reais (mantendo a mesma assinatura, os
// componentes não precisam de mudar).

function makeOrderNumber(): string {
  return String(Math.floor(1000 + Math.random() * 9000))
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function useClientOrders() {
  const cart = ref<ClientCartItem[]>([])
  const orders = ref<ClientOrder[]>([...mockClientOrders])
  const isSubmitting = ref(false)
  const isLoadingOrders = ref(false)
  const lastOrderFeedback = ref<RequestFeedback | null>(null)

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  )

  function addToCart(sku: string, quantity: number) {
    const product = catalog.find((item) => item.sku === sku)
    if (!product || quantity < 1) return

    const existing = cart.value.find((item) => item.sku === sku)
    if (existing) existing.quantity += quantity
    else cart.value.push({ sku: product.sku, name: product.name, unitPrice: product.unitPrice, quantity })
  }

  function removeFromCart(sku: string) {
    cart.value = cart.value.filter((item) => item.sku !== sku)
  }

  async function submitOrder() {
    if (cart.value.length === 0) return

    isSubmitting.value = true
    lastOrderFeedback.value = null
    await wait(500)

    const order: ClientOrder = {
      id: `local-${Date.now()}`,
      number: makeOrderNumber(),
      status: 'pending',
      total: cartTotal.value,
      createdAt: new Date().toISOString(),
      items: cart.value.map((item) => ({ ...item })),
    }

    orders.value.unshift(order)
    cart.value = []
    isSubmitting.value = false
    lastOrderFeedback.value = { ok: true, message: 'Encomenda enviada com sucesso.' }
  }

  async function loadOrders() {
    isLoadingOrders.value = true
    await wait(400)
    isLoadingOrders.value = false
  }

  return {
    cart,
    cartTotal,
    orders,
    isSubmitting,
    isLoadingOrders,
    lastOrderFeedback,
    addToCart,
    removeFromCart,
    submitOrder,
    loadOrders,
  }
}
