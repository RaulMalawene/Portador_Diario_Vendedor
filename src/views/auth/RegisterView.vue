<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LifeBuoy, Globe } from '@lucide/vue'
import RegisterForm from '@/features/auth/components/RegisterForm.vue'
import BrandShowcase from '@/features/auth/components/BrandShowcase.vue'

const router = useRouter()

const phrases = [
  'ganhar visibilidade em todo o país',
  'entregar com uma rede de confiança',
  'simplificar o registo da sua empresa',
  'começar a vender em poucos minutos',
]

function handleRegistered() {
  router.push('/home')
}
</script>

<template>
  <div class="register-view">
    <BrandShowcase eyebrow="Junte-se à rede de fornecedores" :phrases="phrases" />

    <main class="register-view__panel">
      <RegisterForm @success="handleRegistered" />

      <footer class="register-view__footer">
        <span class="register-view__footer-item"><LifeBuoy :size="16" /> Suporte técnico</span>
        <span class="register-view__footer-item"><Globe :size="16" /> Moçambique (PT)</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.register-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: var(--color-surface);
}

.register-view__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 56px 40px;
  border-left: 1px solid var(--color-border);
}

.register-view__footer {
  position: absolute;
  bottom: 28px;
  display: flex;
  gap: 24px;
}

.register-view__footer-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .register-view {
    grid-template-columns: 1fr;
  }
}
</style>
