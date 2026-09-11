<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowLeft,
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Copy,
  Check,
  PackageX,
  X,
} from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import OrderStatusStepper from '@/features/orders/components/OrderStatusStepper.vue'
import OrderStatusMenu from '@/features/orders/components/OrderStatusMenu.vue'
import OrderCustomerCard from '@/features/orders/components/OrderCustomerCard.vue'
import OrderItemsTable from '@/features/orders/components/OrderItemsTable.vue'
import OrderTimeline from '@/features/orders/components/OrderTimeline.vue'
import { useOrders } from '@/features/orders/composables/useOrders'
import type { StockConflict } from '@/features/orders/types/orders.types'
import {
  formatMoney,
  itemsCount,
  nextStatus,
  orderTotal,
  statusBadge,
  statusLabel,
} from '@/features/orders/utils/orders'

const route = useRoute()
const router = useRouter()
const { findById, advance, cancel } = useOrders()

const order = computed(() => findById(String(route.params.id)))

const stockConflict = ref<StockConflict | null>(null)
const successMessage = ref<string | null>(null)
let successTimer: ReturnType<typeof setTimeout> | undefined

const nextLabel = computed(() => {
  if (!order.value) return null
  const next = nextStatus(order.value.status)
  return next ? statusLabel(next) : null
})

const cancellable = computed(() => {
  if (!order.value) return false
  return order.value.status === 'pending' || order.value.status === 'confirmed'
})

function flashSuccess(message: string) {
  successMessage.value = message
  clearTimeout(successTimer)
  successTimer = setTimeout(() => (successMessage.value = null), 3200)
}

function handleAdvance() {
  if (!order.value) return
  stockConflict.value = null
  const result = advance(order.value.id)
  if (result.ok) {
    flashSuccess(`Estado atualizado para "${statusLabel(order.value.status)}".`)
  } else if (result.conflict.product) {
    stockConflict.value = result.conflict
  }
}

function handleCancel() {
  if (!order.value) return
  if (cancel(order.value.id)) {
    stockConflict.value = null
    flashSuccess('A encomenda foi cancelada.')
  }
}

const copied = ref(false)
async function copyNumber() {
  if (!order.value) return
  try {
    await navigator.clipboard.writeText(order.value.number)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    // clipboard unavailable — silently ignore
  }
}

function goBack() {
  router.push('/encomendas')
}
</script>

<template>
  <AppShell
    title="Encomendas"
    user-name="João Maputo"
    user-role="Fornecedor Premium"
    user-initials="JM"
  >
    <template v-if="order">
      <button class="back" type="button" @click="goBack">
        <ArrowLeft :size="16" /> Voltar para Encomendas
      </button>

      <section class="hero">
        <div class="hero__top">
          <div class="hero__title-row">
            <h1>{{ order.number }}</h1>
            <button
              class="copy-chip"
              type="button"
              aria-label="Copiar número da encomenda"
              @click="copyNumber"
            >
              <Check v-if="copied" :size="14" />
              <Copy v-else :size="14" />
            </button>
            <StatusBadge :variant="statusBadge(order.status)">{{
              statusLabel(order.status)
            }}</StatusBadge>
          </div>
          <p class="hero__sub">
            Encomenda realizada em {{ order.placedAt }} · Cliente: {{ order.customer.name }}
          </p>
        </div>

        <OrderStatusMenu
          :status="order.status"
          :next-label="nextLabel"
          :cancellable="cancellable"
          @advance="handleAdvance"
          @cancel="handleCancel"
        />
      </section>

      <div class="stat-strip">
        <div class="stat-chip">
          <span class="stat-chip__label">Itens</span>
          <span class="stat-chip__value">{{ itemsCount(order) }}</span>
        </div>
        <div class="stat-chip">
          <span class="stat-chip__label">Referências</span>
          <span class="stat-chip__value">{{ order.items.length }}</span>
        </div>
        <div class="stat-chip">
          <span class="stat-chip__label">Valor Total</span>
          <span class="stat-chip__value">{{ formatMoney(orderTotal(order.items)) }}</span>
        </div>
        <div class="stat-chip">
          <span class="stat-chip__label"><CalendarClock :size="13" /> Entrega Prevista</span>
          <span class="stat-chip__value">{{ order.expectedAt }}</span>
        </div>
      </div>

      <transition name="fade">
        <div v-if="successMessage" class="flash flash--success">
          <CheckCircle2 :size="18" />
          <span>{{ successMessage }}</span>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="stockConflict" class="flash flash--danger">
          <AlertTriangle :size="20" />
          <div class="flash__body">
            <strong>Não foi possível avançar: stock insuficiente</strong>
            <p>
              {{ stockConflict.product }} — disponível: {{ stockConflict.available }}, pedido:
              {{ stockConflict.requested }}.
            </p>
          </div>
          <button
            class="flash__close"
            type="button"
            aria-label="Dispensar aviso"
            @click="stockConflict = null"
          >
            <X :size="16" />
          </button>
        </div>
      </transition>

      <section class="card">
        <OrderStatusStepper v-if="order.status !== 'cancelled'" :status="order.status" />
        <div v-else class="cancelled-notice">
          <PackageX :size="20" />
          <span>Esta encomenda foi cancelada e não avançará no fluxo de estados.</span>
        </div>
      </section>

      <div class="grid">
        <aside class="col-side">
          <section class="card">
            <h2 class="card__title">Detalhes do Cliente</h2>
            <OrderCustomerCard :customer="order.customer" />
          </section>
        </aside>

        <div class="col-main">
          <section class="card">
            <div class="card__head">
              <div>
                <h2 class="card__title">Itens da Encomenda</h2>
                <p class="card__sub">Produtos e valores registados no momento da compra.</p>
              </div>
              <span class="pill">{{ order.items.length }} referências</span>
            </div>
            <OrderItemsTable :items="order.items" />
          </section>

          <section class="card">
            <h2 class="card__title">Histórico de Movimentação</h2>
            <p class="card__sub">Registo das mudanças de estado da encomenda.</p>
            <OrderTimeline :history="order.history" />
          </section>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="not-found">
        <PackageX :size="32" />
        <h1>Encomenda não encontrada</h1>
        <p>Não foi possível localizar a encomenda pedida. Pode ter sido removida.</p>
        <button class="btn" type="button" @click="goBack">
          <ArrowLeft :size="16" /> Voltar para Encomendas
        </button>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  color: var(--color-body);
  cursor: pointer;
}

.back:hover {
  color: var(--brand-primary);
}

.hero {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding: 24px 28px;
  margin-bottom: 16px;
  border-radius: var(--radius-lg);
  background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-primary-dark) 100%);
  color: var(--color-surface);
  box-shadow: var(--shadow-lg);
}

.hero__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.hero__title-row h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.copy-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: var(--radius-sm);
  background: rgba(255, 255, 255, 0.12);
  color: var(--color-surface);
  cursor: pointer;
}

.copy-chip:hover {
  background: rgba(255, 255, 255, 0.22);
}

.hero__sub {
  margin: 8px 0 0;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
}

.hero :deep(.status-action .btn) {
  background: var(--color-surface);
  color: var(--brand-primary-dark);
}

.hero :deep(.status-action .btn:hover) {
  background: rgba(255, 255, 255, 0.9);
}

.hero :deep(.status-action .btn-text) {
  color: rgba(255, 255, 255, 0.75);
}

.hero :deep(.status-action .btn-text--danger) {
  color: #ffd9d3;
}

.hero :deep(.status-action .confirm-cancel) {
  color: rgba(255, 255, 255, 0.85);
}

.hero :deep(.status-done) {
  background: rgba(255, 255, 255, 0.16);
  color: var(--color-surface);
}

.stat-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-chip {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
}

.stat-chip__label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.stat-chip__value {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-variant-numeric: tabular-nums;
  color: var(--color-ink);
}

.flash {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  margin-bottom: 16px;
  border-radius: var(--radius-md);
}

.flash--success {
  align-items: center;
  background: var(--color-success-tint);
  color: var(--color-success);
  font-size: 14px;
  font-weight: 600;
}

.flash--danger {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

.flash__body strong {
  font-size: 14px;
}

.flash__body p {
  margin: 4px 0 0;
  font-size: 13px;
}

.flash__close {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: auto;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: inherit;
  cursor: pointer;
  opacity: 0.7;
}

.flash__close:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.card {
  padding: 22px;
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
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

.cancelled-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-danger);
  font-size: 14px;
  font-weight: 600;
}

.pill {
  flex-shrink: 0;
  padding: 4px 12px;
  border-radius: var(--radius-full);
  background: var(--color-surface-soft);
  color: var(--color-body);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  align-items: start;
  gap: 16px;
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  max-width: 360px;
  margin: 60px auto;
  text-align: center;
  color: var(--color-body);
}

.not-found h1 {
  margin: 4px 0 0;
  font-size: 20px;
  color: var(--color-ink);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  margin-top: 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover {
  background: var(--brand-primary-dark);
}

@media (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .hero {
    flex-direction: column;
  }

  .hero :deep(.status-action) {
    align-items: flex-start;
    width: 100%;
  }

  .hero :deep(.status-action .btn) {
    width: 100%;
    justify-content: center;
  }

  .stat-strip {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
