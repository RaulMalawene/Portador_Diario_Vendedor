<script setup lang="ts">
import { Calendar, Download } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import AppFooter from '@/layouts/AppFooter.vue'
import KpiCard from '@/features/dashboard/components/KpiCard.vue'
import SalesBarChart from '@/features/dashboard/components/SalesBarChart.vue'
import OrderStatusDonutChart from '@/features/dashboard/components/OrderStatusDonutChart.vue'
import RecentOrdersTable from '@/features/dashboard/components/RecentOrdersTable.vue'
import DeliveryProgressCard from '@/features/dashboard/components/DeliveryProgressCard.vue'
import { kpis, orders, weeklySales } from '@/features/dashboard/data/dashboard.mock'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
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
      <div class="page-actions">
        <button class="btn btn--ghost" type="button">
          <Calendar :size="16" /><span>Últimos 30 dias</span>
        </button>
        <button class="btn" type="button">
          <Download :size="16" /><span>Exportar Relatório</span>
        </button>
      </div>
    </div>

    <section class="kpis">
      <KpiCard v-for="metric in kpis" :key="metric.label" :metric="metric" />
    </section>

    <div class="grid">
      <div class="grid__main">
        <section class="card">
          <h2 class="card__title">Vendas da Semana</h2>
          <p class="card__sub">Receita diária nos últimos 7 dias.</p>
          <div class="card__chart">
            <SalesBarChart :points="weeklySales" />
          </div>
        </section>

        <section class="card">
          <DeliveryProgressCard :current="92" :target="95" />
        </section>
      </div>

      <aside class="grid__side">
        <section class="card">
          <h2 class="card__title">Estado das Encomendas</h2>
          <p class="card__sub">Distribuição das encomendas por fase actual.</p>
          <div class="card__chart">
            <OrderStatusDonutChart :orders="orders" />
          </div>
        </section>

        <section class="card">
          <RecentOrdersTable :orders="orders" />
        </section>
      </aside>
    </div>

    <AppFooter />
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

.page-actions {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
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
