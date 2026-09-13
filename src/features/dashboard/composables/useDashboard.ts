import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { STATUS_SEQUENCE } from '@/features/orders/utils/orders'
import type { OrderStatus } from '@/features/orders/types/orders.types'
import { fetchAllOrders } from '@/features/orders/api/ordersApi'
import { fetchCustomerCount, fetchProductCount } from '../api/dashboardApi'
import type {
  DashboardOrder,
  OrderStatusSummary,
  SalesPoint,
  StockAlerts,
} from '../types/dashboard.types'

const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const DAY_MS = 24 * 60 * 60 * 1000

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

export function useDashboard() {
  const authStore = useAuthStore()

  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const totalRevenue = ref(0)
  const totalOrders = ref(0)
  const activeProducts = ref(0)
  const totalCustomers = ref(0)
  const statusSummary = ref<OrderStatusSummary[]>([])
  const weeklySales = ref<SalesPoint[]>([])
  const recentOrders = ref<DashboardOrder[]>([])
  const stockAlerts = ref<StockAlerts>({ lowStock: 0, outOfStock: 0 })

  async function load() {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    error.value = null

    const [ordersResult, activeResult, lowStockResult, outOfStockResult, customersResult] =
      await Promise.all([
        fetchAllOrders(token),
        fetchProductCount(token, 'active'),
        fetchProductCount(token, 'low_stock'),
        fetchProductCount(token, 'out_of_stock'),
        fetchCustomerCount(token),
      ])

    isLoading.value = false

    const orders = ordersResult.orders
    totalOrders.value = orders.length
    totalRevenue.value = orders.reduce((sum, order) => sum + Number(order.total), 0)
    activeProducts.value = activeResult.count
    totalCustomers.value = customersResult.count
    stockAlerts.value = { lowStock: lowStockResult.count, outOfStock: outOfStockResult.count }

    if (!ordersResult.ok) {
      error.value = 'Não foi possível carregar todas as encomendas — os números podem estar incompletos.'
    } else if (!activeResult.ok || !lowStockResult.ok || !outOfStockResult.ok) {
      error.value = 'Não foi possível carregar os dados de produtos.'
    } else if (!customersResult.ok) {
      error.value = 'Não foi possível carregar o número de clientes.'
    }

    statusSummary.value = STATUS_SEQUENCE.map((status) => {
      const count = orders.filter((order) => order.status === status).length
      return {
        status,
        count,
        percentage: orders.length ? Math.round((count / orders.length) * 100) : 0,
      }
    })

    const today = startOfDay(new Date())
    weeklySales.value = Array.from({ length: 7 }, (_, index) => {
      const dayStart = today - (6 - index) * DAY_MS
      const total = orders
        .filter((order) => startOfDay(new Date(order.placed_at)) === dayStart)
        .reduce((sum, order) => sum + Number(order.total), 0)
      return { label: WEEKDAY_LABELS[new Date(dayStart).getDay()]!, value: total }
    })

    recentOrders.value = orders.slice(0, 8).map((order) => ({
      id: order.id,
      number: order.number,
      status: order.status as OrderStatus,
      statusLabel: order.status_label,
      total: order.total,
      placedAt: order.placed_at,
      customerName: order.customer?.name ?? '—',
    }))
  }

  return {
    isLoading,
    error,
    totalRevenue,
    totalOrders,
    activeProducts,
    totalCustomers,
    statusSummary,
    weeklySales,
    recentOrders,
    stockAlerts,
    load,
  }
}
