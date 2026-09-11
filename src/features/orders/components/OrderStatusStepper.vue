<script setup lang="ts">
import { computed } from 'vue'
import { CheckCircle2, Circle, PackageCheck } from '@lucide/vue'
import { STATUS_SEQUENCE, STATUS_META } from '../utils/orders'
import type { OrderStatus } from '../types/orders.types'

const props = defineProps<{ status: OrderStatus }>()

const currentIndex = computed(() => STATUS_SEQUENCE.indexOf(props.status))

const steps = computed(() =>
  STATUS_SEQUENCE.map((step, index) => ({
    key: step,
    label: STATUS_META[step].label,
    done: index < currentIndex.value,
    active: index === currentIndex.value,
  })),
)

const progress = computed(() => {
  if (currentIndex.value <= 0) return 0
  return (currentIndex.value / (STATUS_SEQUENCE.length - 1)) * 100
})
</script>

<template>
  <div class="stepper">
    <div class="stepper__track">
      <div class="stepper__fill" :style="{ width: `${progress}%` }"></div>
    </div>
    <ol class="stepper__steps">
      <li
        v-for="step in steps"
        :key="step.key"
        class="step"
        :class="{ 'is-done': step.done, 'is-active': step.active }"
      >
        <span class="step__icon">
          <CheckCircle2 v-if="step.done" :size="20" />
          <PackageCheck v-else-if="step.active" :size="20" />
          <Circle v-else :size="20" />
        </span>
        <span class="step__label">{{ step.label }}</span>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.stepper {
  position: relative;
  padding: 6px 4px 0;
}

.stepper__track {
  position: absolute;
  top: 26px;
  left: calc(100% / 10);
  right: calc(100% / 10);
  height: 3px;
  background: var(--color-border);
  border-radius: var(--radius-full);
}

.stepper__fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: linear-gradient(90deg, var(--brand-primary), var(--brand-accent));
  transition: width 0.4s ease;
}

.stepper__steps {
  position: relative;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.step {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.step__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  color: var(--color-muted);
  transition:
    border-color 0.2s,
    color 0.2s,
    box-shadow 0.2s;
}

.step.is-done .step__icon {
  border-color: var(--brand-primary);
  color: var(--brand-primary);
  background: var(--brand-primary-tint);
}

.step.is-active .step__icon {
  border-color: var(--brand-primary);
  color: var(--color-surface);
  background: var(--brand-primary);
  box-shadow: 0 0 0 5px var(--brand-primary-tint);
  animation: pulse 2s ease-in-out infinite;
}

.step__label {
  max-width: 110px;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: var(--color-muted);
}

.step.is-done .step__label {
  color: var(--color-ink);
  font-weight: 600;
}

.step.is-active .step__label {
  color: var(--brand-primary);
  font-weight: 700;
}

@keyframes pulse {
  0%,
  100% {
    box-shadow: 0 0 0 5px var(--brand-primary-tint);
  }
  50% {
    box-shadow: 0 0 0 8px var(--brand-primary-tint);
  }
}

@media (max-width: 640px) {
  .stepper__steps {
    overflow-x: auto;
  }

  .step__label {
    font-size: 11px;
  }
}
</style>
