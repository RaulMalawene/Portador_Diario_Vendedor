<script setup lang="ts">
import { CheckCircle } from '@lucide/vue'
</script>

<template>
  <footer class="app-foot">
    <span>© 2026 Vendor Portal - Gestão B2B Moçambique. Todos os direitos reservados.</span>
    <span class="app-foot__links">
      <CheckCircle :size="16" class="app-foot__check" />
      <a href="#">Termos de Serviço</a>
      <a href="#">Privacidade</a>
      <a href="#">Ajuda</a>
    </span>
  </footer>
</template>

<style scoped>
.app-foot {
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

.app-foot__links {
  display: flex;
  align-items: center;
  gap: 16px;
}

.app-foot__check {
  color: var(--brand-primary);
}

.app-foot__links a {
  color: var(--color-muted);
  text-decoration: none;
}
</style>
