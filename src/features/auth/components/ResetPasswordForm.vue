<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Lock, CheckCircle2 } from '@lucide/vue'
import AuthLogo from './AuthLogo.vue'
import AuthTextField from './AuthTextField.vue'
import AuthSubmitButton from './AuthSubmitButton.vue'
import { useResetPasswordForm } from '../composables/useResetPasswordForm'

const props = defineProps<{
  token: string
  email: string
}>()

const { password, confirmPassword, fieldErrors, loading, formError, succeeded, submit } =
  useResetPasswordForm(props.token, props.email)

async function onSubmit() {
  await submit()
}
</script>

<template>
  <div class="reset-password-form">
    <AuthLogo />

    <template v-if="!succeeded">
      <header class="reset-password-form__header">
        <h1 class="reset-password-form__title">Repor palavra-passe</h1>
        <p class="reset-password-form__subtitle">
          Defina uma nova palavra-passe para a sua conta.
        </p>
      </header>

      <form class="reset-password-form__card" novalidate @submit.prevent="onSubmit">
        <p v-if="formError" class="reset-password-form__alert" role="alert">{{ formError }}</p>

        <AuthTextField
          id="reset-password-password"
          v-model="password"
          label="Nova palavra-passe"
          :icon="Lock"
          autocomplete="new-password"
          placeholder="Crie uma senha forte"
          revealable
          hint="Mínimo de 8 caracteres, com letras e números."
          :error="fieldErrors.password"
        />

        <AuthTextField
          id="reset-password-confirm"
          v-model="confirmPassword"
          label="Confirmar palavra-passe"
          :icon="Lock"
          autocomplete="new-password"
          placeholder="Repita a senha"
          revealable
          :error="fieldErrors.confirmPassword"
        />

        <AuthSubmitButton label="Repor palavra-passe" loading-label="A repor..." :loading="loading" />
      </form>
    </template>

    <template v-else>
      <div class="reset-password-form__success">
        <span class="reset-password-form__success-icon"><CheckCircle2 :size="28" /></span>
        <h1 class="reset-password-form__title">Palavra-passe reposta</h1>
        <p class="reset-password-form__subtitle">
          A sua palavra-passe foi alterada com sucesso. Já pode iniciar sessão.
        </p>
        <RouterLink class="reset-password-form__cta" to="/login">Iniciar sessão</RouterLink>
      </div>
    </template>
  </div>
</template>

<style scoped>
.reset-password-form {
  width: 100%;
  max-width: 420px;
}

.reset-password-form__header {
  margin-bottom: 28px;
}

.reset-password-form__title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.reset-password-form__subtitle {
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-body);
}

.reset-password-form__alert {
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.reset-password-form__card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.reset-password-form__success {
  text-align: center;
}

.reset-password-form__success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  border-radius: var(--radius-full);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
}

.reset-password-form__cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  width: 100%;
  margin-top: 8px;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.15s;
}

.reset-password-form__cta:hover {
  background: var(--brand-primary-dark);
}
</style>
