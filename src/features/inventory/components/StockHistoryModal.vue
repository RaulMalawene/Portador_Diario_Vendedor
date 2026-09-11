<script setup lang="ts">
import AppModal from '@/components/ui/AppModal.vue'
import type { InventoryItem, StockMovement } from '../types/inventory.types'
import { movementLabel } from '../utils/inventory'

defineProps<{
  item: InventoryItem | null
  movements: StockMovement[]
}>()

const isOpen = defineModel<boolean>({ required: true })
</script>

<template>
  <AppModal v-model="isOpen" size="sm" labelled-by="stock-history-title">
    <h2 id="stock-history-title" class="modal__title">Histórico de Movimentos</h2>
    <p v-if="item" class="modal__sub">{{ item.name }}</p>

    <div class="modal__body">
      <ul v-if="movements.length" class="timeline">
        <li v-for="(movement, index) in movements" :key="index" class="tl">
          <span class="tl__badge" :class="`tl__badge--${movement.type}`">
            {{ movementLabel(movement.type) }}
          </span>
          <div class="tl__body">
            <div class="tl__top">
              <span class="tl__qty" :class="movement.quantity >= 0 ? 'is-plus' : 'is-minus'">
                {{ movement.quantity > 0 ? '+' : '' }}{{ movement.quantity }} un
              </span>
              <span class="tl__after">ficou em {{ movement.stockAfter }} un</span>
            </div>
            <p class="tl__note">{{ movement.note }}</p>
            <span class="tl__date">{{ movement.date }}</span>
          </div>
        </li>
      </ul>
      <p v-else class="timeline__empty">Sem movimentos registados para este produto.</p>
    </div>
  </AppModal>
</template>

<style scoped>
.modal__title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-ink);
}

.modal__sub {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--color-body);
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.timeline__empty {
  margin: 0;
  padding: 20px 0;
  font-size: 13px;
  color: var(--color-muted);
  text-align: center;
}

.tl {
  display: flex;
  gap: 12px;
}

.tl__badge {
  flex-shrink: 0;
  height: fit-content;
  padding: 4px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  font-weight: 600;
}

.tl__badge--in {
  background: var(--color-success-tint);
  color: var(--color-success);
}

.tl__badge--out {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

.tl__badge--adjustment {
  background: var(--color-info-tint);
  color: var(--color-info);
}

.tl__body {
  flex: 1;
}

.tl__top {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.tl__qty {
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.tl__qty.is-plus {
  color: var(--color-success);
}

.tl__qty.is-minus {
  color: var(--color-danger);
}

.tl__after {
  font-size: 13px;
  color: var(--color-muted);
}

.tl__note {
  margin: 4px 0 2px;
  font-size: 13px;
  color: var(--color-body);
}

.tl__date {
  font-size: 12px;
  color: var(--color-muted);
}
</style>
