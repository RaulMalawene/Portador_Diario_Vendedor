<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Mail, Lock } from '@lucide/vue'
import AuthLogo from './AuthLogo.vue'
import AuthTextField from './AuthTextField.vue'
import AuthSubmitButton from './AuthSubmitButton.vue'
import ForgotPasswordModal from './ForgotPasswordModal.vue'
import { useLoginForm } from '../composables/useLoginForm'

const emit = defineEmits<{ success: [] }>()

const { form, fieldErrors, loading, formError, submit } = useLoginForm()
const isForgotPasswordOpen = ref(false)

async function onSubmit() {
  const success = await submit()
  if (success) emit('success')
}
</script>

<template>
  <form class="login-form" novalidate @submit.prevent="onSubmit">
    <AuthLogo />

    <header class="login-form__header">
      <h1 class="login-form__title">Aceder à conta</h1>
      <p class="login-form__subtitle">
        Introduza as suas credenciais para gerir as suas entregas no portal do vendedor.
      </p>
    </header>

    <p v-if="formError" class="login-form__alert" role="alert">{{ formError }}</p>

    <AuthTextField
      id="login-email"
      v-model="form.email"
      label="Email corporativo"
      type="email"
      :icon="Mail"
      autocomplete="email"
      placeholder="exemplo@empresa.co.mz"
      :error="fieldErrors.email"
    />

    <AuthTextField
      id="login-password"
      v-model="form.password"
      label="Palavra-passe"
      :icon="Lock"
      autocomplete="current-password"
      placeholder="••••••••"
      revealable
      :error="fieldErrors.password"
    >
      <template #aside>
        <button type="button" class="login-form__link" @click="isForgotPasswordOpen = true">
          Esqueceu a senha?
        </button>
      </template>
    </AuthTextField>

    <label class="checkbox">
      <input v-model="form.remember" type="checkbox" />
      <span>Manter sessão iniciada</span>
    </label>

    <AuthSubmitButton label="Entrar no portal" loading-label="A entrar..." :loading="loading" />

    <div class="login-form__divider"></div>

    <p class="login-form__footer">
      Ainda não é parceiro?
      <RouterLink class="login-form__footer-link" to="/registo"
        >Registe a sua conta agora</RouterLink
      >
    </p>
  </form>

  <ForgotPasswordModal v-model="isForgotPasswordOpen" />
</template>

<style scoped>
.login-form {
  width: 100%;
  max-width: 380px;
}

.login-form__header {
  margin-bottom: 28px;
}

.login-form__title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.login-form__subtitle {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-body);
}

.login-form__alert {
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.login-form__link {
  padding: 0;
  border: 0;
  background: transparent;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: none;
  cursor: pointer;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  font-size: 14px;
  color: var(--color-body);
  cursor: pointer;
}

.checkbox input {
  width: 16px;
  height: 16px;
  accent-color: var(--brand-primary);
}

.login-form__divider {
  height: 1px;
  margin: 24px 0;
  background: var(--color-border);
}

.login-form__footer {
  margin: 0;
  text-align: center;
  font-size: 14px;
  color: var(--color-body);
}

.login-form__footer-link {
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: none;
}
</style>
