import { computed, ref } from 'vue'
import { createOrderRequest, fetchOrdersRequest } from '../api/clientApi'
import { catalog } from '../data/catalog'
import type { ClientCartItem, ClientOrder, RequestFeedback } from '../types/client.types'

export function useClientOrders(getToken: () => string | null) {
  const cart = ref<ClientCartItem[]>([])
  const orders = ref<ClientOrder[]>([])
  const isSubmitting = ref(false)
  const isLoadingOrders = ref(false)
  const lastOrderFeedback = ref<RequestFeedback | null>(null)
  const ordersError = ref<string | null>(null)

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
    const token = getToken()
    if (!token || cart.value.length === 0) return

    isSubmitting.value = true
    const result = await createOrderRequest(token, cart.value)
    isSubmitting.value = false

    lastOrderFeedback.value = {
      ok: result.ok,
      status: result.status,
      durationMs: result.durationMs,
      message: result.ok
        ? 'Encomenda enviada com sucesso.'
        : (result.error ?? 'Falha ao enviar a encomenda.'),
    }

    if (result.ok && result.data) {
      orders.value.unshift(result.data)
      cart.value = []
    }
  }

  async function loadOrders() {
    const token = getToken()
    if (!token) return

    isLoadingOrders.value = true
    const result = await fetchOrdersRequest(token)
    isLoadingOrders.value = false

    if (result.ok && result.data) {
      orders.value = result.data.orders
      ordersError.value = null
    } else {
      ordersError.value = result.error ?? 'Não foi possível obter as encomendas.'
    }
  }

  return {
    cart,
    cartTotal,
    orders,
    isSubmitting,
    isLoadingOrders,
    lastOrderFeedback,
    ordersError,
    addToCart,
    removeFromCart,
    submitOrder,
    loadOrders,
  }
}
