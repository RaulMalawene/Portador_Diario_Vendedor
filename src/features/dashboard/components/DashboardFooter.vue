<script setup lang="ts">
import { CheckCircle } from '@lucide/vue'
</script>

<template>
  <footer class="dashboard-foot">
    <span>© 2026 Vendor Portal - Gestão B2B Moçambique. Todos os direitos reservados.</span>
    <span class="dashboard-foot__links">
      <CheckCircle :size="16" class="dashboard-foot__check" />
      <a href="#">Termos de Serviço</a>
      <a href="#">Privacidade</a>
      <a href="#">Ajuda</a>
    </span>
  </footer>
</template>

<style scoped>
.dashboard-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  font-size: 12px;
  color: var(--color-muted);
}

.dashboard-foot__links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.dashboard-foot__check {
  color: var(--brand-primary);
}

.dashboard-foot__links a {
  color: var(--color-muted);
  text-decoration: none;
}
</style>
