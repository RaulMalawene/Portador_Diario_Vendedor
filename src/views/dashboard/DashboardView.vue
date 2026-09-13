<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { AlertCircle, Boxes, Package, ShoppingCart, Users } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import KpiCard from '@/features/dashboard/components/KpiCard.vue'
import SalesBarChart from '@/features/dashboard/components/SalesBarChart.vue'
import OrderStatusDonutChart from '@/features/dashboard/components/OrderStatusDonutChart.vue'
import RecentOrdersTable from '@/features/dashboard/components/RecentOrdersTable.vue'
import StockAlertsCard from '@/features/dashboard/components/StockAlertsCard.vue'
import { useDashboard } from '@/features/dashboard/composables/useDashboard'
import { formatCurrency } from '@/features/dashboard/utils/format'
import { useAuthStore } from '@/stores/auth'
import type { KpiMetric } from '@/features/dashboard/types/dashboard.types'

const authStore = useAuthStore()
const {
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
} = useDashboard()

const pendingCount = computed(
  () => statusSummary.value.find((item) => item.status === 'pending')?.count ?? 0,
)
const alertsCount = computed(() => stockAlerts.value.lowStock + stockAlerts.value.outOfStock)

const kpis = computed<KpiMetric[]>(() => [
  {
    label: 'Receita Total',
    value: formatCurrency(totalRevenue.value),
    icon: ShoppingCart,
    hint: `${totalOrders.value} ${totalOrders.value === 1 ? 'encomenda' : 'encomendas'} no total`,
  },
  {
    label: 'Total de Encomendas',
    value: String(totalOrders.value),
    icon: Package,
    hint: `${pendingCount.value} ${pendingCount.value === 1 ? 'pendente' : 'pendentes'}`,
  },
  {
    label: 'Produtos Activos',
    value: String(activeProducts.value),
    icon: Boxes,
    hint: alertsCount.value ? `${alertsCount.value} com alerta de stock` : 'stock saudável',
  },
  {
    label: 'Clientes Registados',
    value: String(totalCustomers.value),
    icon: Users,
  },
])

onMounted(() => {
  load()
})
</script>

<template>
  <AppShell
    title="Dashboard"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Bem-vindo, {{ authStore.user?.name }}</h1>
        <p class="page-sub">Monitorize o desempenho do seu negócio em tempo real.</p>
      </div>
    </div>

    <p v-if="error" class="page-error"><AlertCircle :size="15" /> {{ error }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar dados do dashboard...</p>

    <section class="kpis">
      <KpiCard v-for="metric in kpis" :key="metric.label" :metric="metric" />
    </section>

    <div class="grid">
      <div class="grid__main">
        <section class="card">
          <h2 class="card__title">Vendas da Semana</h2>
          <p class="card__sub">Receita diária real nos últimos 7 dias.</p>
          <div class="card__chart">
            <SalesBarChart :points="weeklySales" />
          </div>
        </section>

        <section class="card">
          <StockAlertsCard :alerts="stockAlerts" />
        </section>
      </div>

      <aside class="grid__side">
        <section class="card">
          <h2 class="card__title">Estado das Encomendas</h2>
          <p class="card__sub">Distribuição das encomendas por fase actual.</p>
          <div class="card__chart">
            <OrderStatusDonutChart :summary="statusSummary" />
          </div>
        </section>

        <section class="card">
          <RecentOrdersTable :orders="recentOrders" />
        </section>
      </aside>
    </div>

    
  </AppShell>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.page-sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-body);
}

.page-loading {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-muted);
}

.page-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.grid__main,
.grid__side {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: 22px;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.card__title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.card__sub {
  margin: 4px 0 0;
  font-size: 13px;
  color: var(--color-body);
}

.card__chart {
  margin-top: 20px;
}

@media (max-width: 1100px) {
  .kpis {
    grid-template-columns: repeat(2, 1fr);
  }

  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .kpis {
    grid-template-columns: 1fr;
  }

  .page-head {
    flex-direction: column;
  }
}
</style>
