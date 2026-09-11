<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'

withDefaults(
  defineProps<{
    label: string
    loadingLabel?: string
    loading?: boolean
  }>(),
  {
    loadingLabel: 'A processar...',
    loading: false,
  },
)
</script>

<template>
  <button class="auth-submit" type="submit" :disabled="loading">
    <span>{{ loading ? loadingLabel : label }}</span>
    <ArrowRight v-if="!loading" :size="18" />
  </button>
</template>

<style scoped>
.auth-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.auth-submit:hover:not(:disabled) {
  background: var(--brand-primary-dark);
}

.auth-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
