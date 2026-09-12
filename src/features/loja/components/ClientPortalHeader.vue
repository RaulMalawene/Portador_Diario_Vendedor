<script setup lang="ts">
import { LogOut, ShoppingBag } from '@lucide/vue'

defineProps<{ userName: string; companyName?: string | null }>()

const emit = defineEmits<{ logout: [] }>()
</script>

<template>
  <header class="portal-header">
    <div class="portal-header__brand">
      <span class="portal-header__logo"><ShoppingBag :size="20" /></span>
      <div>
        <p class="portal-header__name">Portador Diário</p>
        <p class="portal-header__tag">Área do Cliente</p>
      </div>
    </div>

    <div class="portal-header__user">
      <div class="portal-header__identity">
        <span class="portal-header__user-name">{{ userName }}</span>
        <span v-if="companyName" class="portal-header__company">{{ companyName }}</span>
      </div>
      <button class="portal-header__logout" type="button" @click="emit('logout')">
        <LogOut :size="16" /> Sair
      </button>
    </div>
  </header>
</template>

<style scoped>
.portal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);
}

.portal-header__brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.portal-header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
}

.portal-header__name {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-ink);
}

.portal-header__tag {
  margin: 0;
  font-size: 12px;
  color: var(--color-muted);
}

.portal-header__user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.portal-header__identity {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1px;
}

.portal-header__user-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-ink);
}

.portal-header__company {
  font-size: 12px;
  color: var(--color-muted);
}

.portal-header__logout {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 36px;
  padding: 0 14px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-body);
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    color 0.15s;
}

.portal-header__logout:hover {
  background: var(--color-surface-soft);
  color: var(--color-danger);
}

@media (max-width: 560px) {
  .portal-header__identity {
    display: none;
  }
}
</style>
