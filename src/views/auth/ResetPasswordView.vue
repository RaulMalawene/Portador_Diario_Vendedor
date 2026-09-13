<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LifeBuoy, Globe } from '@lucide/vue'
import ResetPasswordForm from '@/features/auth/components/ResetPasswordForm.vue'
import BrandShowcase from '@/features/auth/components/BrandShowcase.vue'

const route = useRoute()

const token = computed(() => String(route.query.token ?? ''))
const email = computed(() => String(route.query.email ?? ''))
</script>

<template>
  <div class="reset-password-view">
    <BrandShowcase />

    <main class="reset-password-view__panel">
      <ResetPasswordForm :token="token" :email="email" />

      <footer class="reset-password-view__footer">
        <span class="reset-password-view__footer-item"><LifeBuoy :size="16" /> Suporte técnico</span>
        <span class="reset-password-view__footer-item"><Globe :size="16" /> Moçambique (PT)</span>
      </footer>
    </main>
  </div>
</template>

<style scoped>
.reset-password-view {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  background: var(--color-surface);
}

.reset-password-view__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-left: 1px solid var(--color-border);
}

.reset-password-view__footer {
  position: absolute;
  bottom: 28px;
  display: flex;
  gap: 24px;
}

.reset-password-view__footer-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-muted);
}

@media (max-width: 900px) {
  .reset-password-view {
    grid-template-columns: 1fr;
  }
}
</style>
