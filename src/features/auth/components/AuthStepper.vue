<script setup lang="ts">
import type { Component } from 'vue'

defineProps<{
  steps: { label: string; icon: Component }[]
  currentStep: number
}>()
</script>

<template>
  <div class="auth-stepper">
    <template v-for="(step, index) in steps" :key="step.label">
      <div
        class="auth-stepper__step"
        :class="{ 'auth-stepper__step--active': index + 1 <= currentStep }"
      >
        <span class="auth-stepper__dot">
          <component :is="step.icon" :size="18" />
        </span>
        <span class="auth-stepper__label">{{ step.label }}</span>
      </div>
      <span
        v-if="index < steps.length - 1"
        class="auth-stepper__line"
        :class="{ 'auth-stepper__line--active': index + 1 < currentStep }"
      ></span>
    </template>
  </div>
</template>

<style scoped>
.auth-stepper {
  display: flex;
  align-items: flex-start;
  margin: 0 0 28px;
}

.auth-stepper__step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-stepper__dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--color-surface-soft);
  color: var(--color-muted);
  transition:
    background 0.15s,
    color 0.15s;
}

.auth-stepper__label {
  margin-top: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-muted);
}

.auth-stepper__step--active .auth-stepper__dot {
  background: var(--brand-primary);
  color: var(--color-surface);
}

.auth-stepper__step--active .auth-stepper__label {
  color: var(--brand-primary);
}

.auth-stepper__line {
  flex: 1;
  height: 2px;
  margin: 20px 8px 0;
  background: var(--color-border);
  transition: background 0.15s;
}

.auth-stepper__line--active {
  background: var(--brand-primary);
}
</style>
