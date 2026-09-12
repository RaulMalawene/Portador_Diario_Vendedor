<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, LogIn } from '@lucide/vue'
import { useClientSession } from '../composables/useClientSession'

// Versão só de design: aceita qualquer email/palavra-passe e simula um
// pequeno atraso de rede, sem chamar nenhum backend.
// TODO: quando tiveres a API, substitui o corpo de handleSubmit por um
// pedido real de login (o resto do formulário não precisa de mudar).

const emit = defineEmits<{ success: [] }>()

const { setSession } = useClientSession()

const email = ref('')
const password = ref('')
const isSubmitting = ref(false)
const errorMessage = ref('')

function customerNameFromEmail(value: string): string {
  const [handle] = value.split('@')
  if (!handle) return 'Cliente'
  return handle
    .replace(/[._-]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(' ')
}

async function handleSubmit() {
  if (!email.value || !password.value || isSubmitting.value) return

  isSubmitting.value = true
  errorMessage.value = ''

  await new Promise((resolve) => setTimeout(resolve, 500))
  isSubmitting.value = false

  setSession({
    token: 'demo-token',
    customer: {
      id: 'demo-customer',
      name: customerNameFromEmail(email.value.trim()),
      email: email.value.trim(),
    },
  })
  emit('success')
}
</script>

<template>
  <form class="client-login-form" novalidate @submit.prevent="handleSubmit">
    <label class="field">
      <span class="field__label">Email</span>
      <input
        v-model="email"
        class="input"
        type="email"
        required
        autocomplete="username"
        placeholder="cliente@exemplo.com"
      />
    </label>

    <label class="field">
      <span class="field__label">Palavra-passe</span>
      <input
        v-model="password"
        class="input"
        type="password"
        required
        autocomplete="current-password"
        placeholder="••••••••"
      />
    </label>

    <p v-if="errorMessage" class="client-login-form__error">
      <AlertCircle :size="15" /> {{ errorMessage }}
    </p>

    <button class="btn" type="submit" :disabled="isSubmitting">
      <LogIn :size="16" />
      {{ isSubmitting ? 'A entrar...' : 'Entrar' }}
    </button>
  </form>
</template>

<style scoped>
.client-login-form {
  width: 100%;
  max-width: 360px;
}

.field {
  display: block;
  margin-bottom: 18px;
}

.field__label {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  font-family: inherit;
  font-size: 14px;
  color: var(--color-ink);
  outline: 0;
  transition:
    border-color 0.15s,
    box-shadow 0.15s;
}

.input:focus {
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 3px var(--brand-primary-tint);
}

.client-login-form__error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: -4px 0 18px;
  font-size: 13px;
  color: var(--color-danger);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  height: 44px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover:not(:disabled) {
  background: var(--brand-primary-dark);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
