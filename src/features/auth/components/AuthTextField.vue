<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { Eye, EyeOff } from '@lucide/vue'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    icon: Component
    type?: string
    placeholder?: string
    autocomplete?: string
    error?: string
    hint?: string
    revealable?: boolean
  }>(),
  {
    type: 'text',
    placeholder: undefined,
    autocomplete: undefined,
    error: undefined,
    hint: undefined,
    revealable: false,
  },
)

const modelValue = defineModel<string>({ required: true })

const revealed = ref(false)

const inputType = computed(() => {
  if (!props.revealable) return props.type
  return revealed.value ? 'text' : 'password'
})
</script>

<template>
  <div class="auth-field">
    <div class="auth-field__row">
      <label class="auth-field__label" :for="id">{{ label }}</label>
      <slot name="aside" />
    </div>

    <div class="auth-field__control" :class="{ 'auth-field__control--invalid': error }">
      <component :is="icon" class="auth-field__icon" :size="18" />
      <input
        :id="id"
        v-model="modelValue"
        :type="inputType"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
      />
      <button
        v-if="revealable"
        type="button"
        class="auth-field__toggle"
        :aria-label="revealed ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'"
        @click="revealed = !revealed"
      >
        <component :is="revealed ? EyeOff : Eye" :size="18" />
      </button>
    </div>

    <span v-if="error" class="auth-field__error">{{ error }}</span>
    <p v-else-if="hint" class="auth-field__hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.auth-field {
  margin-bottom: 18px;
}

.auth-field__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.auth-field__label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.auth-field__control {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 46px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.auth-field__control:focus-within {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.auth-field__control--invalid {
  border-color: var(--color-danger);
}

.auth-field__control--invalid:focus-within {
  box-shadow: 0 0 0 3px var(--color-danger-tint);
}

.auth-field__icon {
  flex-shrink: 0;
  color: var(--color-muted);
}

.auth-field__control input {
  flex: 1;
  min-width: 0;
  border: 0;
  outline: 0;
  background: transparent;
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
}

.auth-field__toggle {
  display: flex;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}

.auth-field__error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--color-danger);
}

.auth-field__hint {
  margin: 6px 0 0;
  font-size: 12px;
  color: var(--color-muted);
}
</style>
