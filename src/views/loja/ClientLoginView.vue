<script setup lang="ts">
import { useRouter } from 'vue-router'
import BrandShowcase from '@/features/auth/components/BrandShowcase.vue'
import ClientLoginForm from '@/features/loja/components/ClientLoginForm.vue'

const router = useRouter()

function handleAuthenticated() {
  router.push('/loja/encomendas')
}
</script>

<template>
  <div class="client-login-view">
    <BrandShowcase
      eyebrow="Área do Cliente"
      :phrases="[
        'acompanhar as suas encomendas',
        'fazer novos pedidos em segundos',
        'saber sempre o estado da entrega',
      ]"
    />

    <main class="client-login-view__panel">
      <h1 class="client-login-view__title">Entrar</h1>
      <p class="client-login-view__subtitle">Aceda para fazer encomendas e ver o seu estado.</p>

      <ClientLoginForm @success="handleAuthenticated" />
    </main>
  </div>
</template>

<style scoped>
.client-login-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: var(--color-surface);
}

.client-login-view__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-left: 1px solid var(--color-border);
}

.client-login-view__title {
  margin: 0 0 6px;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-ink);
}

.client-login-view__subtitle {
  margin: 0 0 28px;
  font-size: 14px;
  color: var(--color-body);
}

@media (max-width: 900px) {
  .client-login-view {
    grid-template-columns: 1fr;
  }
}
</style>
