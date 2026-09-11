<script setup lang="ts">
import { useRouter } from 'vue-router'
import { LifeBuoy, Globe } from '@lucide/vue'
import LoginForm from '@/features/auth/components/LoginForm.vue'
import BrandShowcase from '@/features/auth/components/BrandShowcase.vue'

const router = useRouter()

function handleAuthenticated() {
  router.push('/home')
}
</script>

<template>
  <div class="login-view">
    <BrandShowcase />

    <main class="login-view__panel">
      <LoginForm @success="handleAuthenticated" />

      <footer class="login-view__footer">
        <span class="login-view__footer-item"><LifeBuoy :size="16" /> Suporte técnico</span>
        <span class="login-view__footer-item"><Globe :size="16" /> Moçambique (PT)</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.login-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: var(--color-surface);
}

.login-view__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-left: 1px solid var(--color-border);
}

.login-view__footer {
  position: absolute;
  bottom: 28px;
  display: flex;
  gap: 24px;
}

.login-view__footer-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .login-view {
    grid-template-columns: 1fr;
  }
}
</style>
