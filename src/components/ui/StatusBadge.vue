<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'success' | 'info' | 'warning' | 'danger' | 'teal' | 'neutral'
  }>(),
  {
    variant: 'neutral',
  },
)
</script>

<template>
  <span class="status-badge" :class="`status-badge--${variant}`"><slot /></span>
</template>

<style scoped>
.status-badge {
  display: inline-flex;
  flex-shrink: 0;
  padding: 3px 12px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.status-badge--success {
  background: var(--color-success-tint);
  color: var(--color-success);
}

.status-badge--info {
  background: var(--color-info-tint);
  color: var(--color-info);
}

.status-badge--warning {
  background: var(--color-warning-tint);
  color: var(--color-warning);
}

.status-badge--danger {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

.status-badge--teal {
  background: var(--color-teal-tint);
  color: var(--color-teal);
}

.status-badge--neutral {
  background: var(--color-surface-soft);
  color: var(--color-body);
}
</style>
