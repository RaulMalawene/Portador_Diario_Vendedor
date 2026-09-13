<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { AlertTriangle, PackageX } from '@lucide/vue'
import type { StockAlerts } from '../types/dashboard.types'

defineProps<{ alerts: StockAlerts }>()
</script>

<template>
  <div>
    <h2 class="alerts__title">Alertas de Stock</h2>
    <p class="alerts__sub">Produtos activos que precisam da sua atenção agora.</p>

    <div class="alerts__row">
      <AlertTriangle :size="18" class="alerts__icon is-warning" />
      <span class="alerts__label">Stock baixo</span>
      <span class="alerts__value">{{ alerts.lowStock }}</span>
    </div>

    <div class="alerts__row">
      <PackageX :size="18" class="alerts__icon is-danger" />
      <span class="alerts__label">Esgotados</span>
      <span class="alerts__value">{{ alerts.outOfStock }}</span>
    </div>

    <p v-if="alerts.lowStock === 0 && alerts.outOfStock === 0" class="alerts__empty">
      Sem alertas — todos os produtos activos têm stock saudável.
    </p>

    <RouterLink class="alerts__link" to="/inventario">Ver Inventário</RouterLink>
  </div>
</template>

<style scoped>
.alerts__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.alerts__sub {
  margin: 4px 0 18px;
  font-size: 13px;
  color: var(--color-body);
}

.alerts__row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid var(--color-surface-soft);
}

.alerts__row:last-of-type {
  border-bottom: 0;
}

.alerts__icon.is-warning {
  color: var(--color-warning);
}

.alerts__icon.is-danger {
  color: var(--color-danger);
}

.alerts__label {
  flex: 1;
  font-size: 14px;
  color: var(--color-body);
}

.alerts__value {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
}

.alerts__empty {
  margin: 12px 0 0;
  font-size: 12px;
  color: var(--color-muted);
}

.alerts__link {
  display: inline-block;
  margin-top: 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: none;
}
</style>
