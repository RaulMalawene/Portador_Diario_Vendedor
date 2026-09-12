<script setup lang="ts">
import { useRouter } from 'vue-router'
import ClientPortalHeader from '@/features/loja/components/ClientPortalHeader.vue'
import NewOrderPanel from '@/features/loja/components/NewOrderPanel.vue'
import ClientOrdersList from '@/features/loja/components/ClientOrdersList.vue'
import { useClientSession } from '@/features/loja/composables/useClientSession'
import { useClientOrders } from '@/features/loja/composables/useClientOrders'
import { catalog } from '@/features/loja/data/catalog'

const router = useRouter()
const { session, clearSession } = useClientSession()

const {
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
} = useClientOrders()

function handleLogout() {
  clearSession()
  router.push('/loja/login')
}
</script>

<template>
  <div class="client-orders-view">
    <ClientPortalHeader :customer-name="session?.customer.name ?? ''" @logout="handleLogout" />

    <main class="client-orders-view__body">
      <NewOrderPanel
        :catalog="catalog"
        :cart="cart"
        :cart-total="cartTotal"
        :is-submitting="isSubmitting"
        :last-order-feedback="lastOrderFeedback"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @submit="submitOrder"
      />

      <ClientOrdersList :orders="orders" :is-loading="isLoadingOrders" @refresh="loadOrders" />
    </main>
  </div>
</template>

<style scoped>
.client-orders-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-surface-soft);
}

.client-orders-view__body {
  display: grid;
  flex: 1;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  max-width: 1040px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
}

@media (max-width: 800px) {
  .client-orders-view__body {
    grid-template-columns: 1fr;
  }
}
</style>
