import { computed, ref } from 'vue'
import {
  createOrderRequest,
  fetchCustomersRequest,
  fetchOrdersRequest,
  fetchProductsRequest,
} from '../api/clientApi'
import type {
  CatalogProduct,
  ClientCartItem,
  ClientOrder,
  Customer,
  RequestFeedback,
} from '../types/client.types'

export function useClientOrders(getToken: () => string | null) {
  const customers = ref<Customer[]>([])
  const catalog = ref<CatalogProduct[]>([])
  const selectedCustomerId = ref<number | null>(null)
  const cart = ref<ClientCartItem[]>([])
  const orders = ref<ClientOrder[]>([])

  const isLoadingOptions = ref(false)
  const isSubmitting = ref(false)
  const isLoadingOrders = ref(false)
  const lastOrderFeedback = ref<RequestFeedback | null>(null)
  const optionsError = ref<string | null>(null)

  const cartTotal = computed(() =>
    cart.value.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
  )

  async function loadOptions() {
    const token = getToken()
    if (!token) return

    isLoadingOptions.value = true
    const [customersResult, productsResult] = await Promise.all([
      fetchCustomersRequest(token),
      fetchProductsRequest(token),
    ])
    isLoadingOptions.value = false

    if (customersResult.ok && customersResult.data) {
      customers.value = customersResult.data.data
      selectedCustomerId.value ??= (customers.value[0]?.id ?? null)
    } else {
      optionsError.value = customersResult.error ?? 'Não foi possível obter os clientes.'
    }

    if (productsResult.ok && productsResult.data) {
      catalog.value = productsResult.data.data
    } else {
      optionsError.value = productsResult.error ?? 'Não foi possível obter os produtos.'
    }
  }

  function addToCart(productId: number, quantity: number) {
    const product = catalog.value.find((item) => item.id === productId)
    if (!product || quantity < 1) return

    const existing = cart.value.find((item) => item.productId === productId)
    if (existing) existing.quantity += quantity
    else
      cart.value.push({
        productId: product.id,
        name: product.name,
        unitPrice: Number(product.price),
        quantity,
      })
  }

  function removeFromCart(productId: number) {
    cart.value = cart.value.filter((item) => item.productId !== productId)
  }

  async function submitOrder() {
    const token = getToken()
    if (!token || !selectedCustomerId.value || cart.value.length === 0) return

    isSubmitting.value = true
    lastOrderFeedback.value = null

    const result = await createOrderRequest(
      token,
      selectedCustomerId.value,
      cart.value.map((item) => ({ product_id: item.productId, quantity: item.quantity })),
    )
    isSubmitting.value = false

    lastOrderFeedback.value = {
      ok: result.ok,
      message: result.ok
        ? 'Encomenda enviada com sucesso.'
        : (result.error ?? 'Falha ao enviar a encomenda.'),
    }

    if (result.ok && result.data) {
      orders.value.unshift(result.data.data)
      cart.value = []
    }
  }

  async function loadOrders() {
    const token = getToken()
    if (!token) return

    isLoadingOrders.value = true
    const result = await fetchOrdersRequest(token)
    isLoadingOrders.value = false

    if (result.ok && result.data) orders.value = result.data.data
  }

  return {
    customers,
    catalog,
    selectedCustomerId,
    cart,
    cartTotal,
    orders,
    isLoadingOptions,
    isSubmitting,
    isLoadingOrders,
    lastOrderFeedback,
    optionsError,
    loadOptions,
    addToCart,
    removeFromCart,
    submitOrder,
    loadOrders,
  }
}
