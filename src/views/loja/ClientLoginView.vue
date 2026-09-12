<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Globe } from '@lucide/vue'
import BrandShowcase from '@/features/auth/components/BrandShowcase.vue'
import ClientLoginForm from '@/features/loja/components/ClientLoginForm.vue'
import { API_BASE_URL } from '@/features/loja/api/httpClient'

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

      <footer class="client-login-view__footer">
        <span class="client-login-view__footer-item">
          <Globe :size="16" /> A ligar a: {{ API_BASE_URL }}
        </span>
      </footer>
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

.client-login-view__footer {
  position: absolute;
  bottom: 28px;
}

.client-login-view__footer-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .client-login-view {
    grid-template-columns: 1fr;
  }
}
</style>
