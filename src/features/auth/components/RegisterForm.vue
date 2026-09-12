<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { User, Mail, Lock, Building2 } from '@lucide/vue'
import AuthLogo from './AuthLogo.vue'
import AuthTextField from './AuthTextField.vue'
import AuthSubmitButton from './AuthSubmitButton.vue'
import AuthStepper from './AuthStepper.vue'
import { useRegisterForm } from '../composables/useRegisterForm'

const emit = defineEmits<{ success: [] }>()

const steps = [
  { label: 'Dados de Conta', icon: User },
  { label: 'Dados da Empresa', icon: Building2 },
]

const { step, form, fieldErrors, loading, formError, goToNextStep, goToPreviousStep, submit } =
  useRegisterForm()

async function onSubmit() {
  if (step.value === 1) {
    goToNextStep()
    return
  }

  const success = await submit()
  if (success) emit('success')
}
</script>

<template>
  <form class="register-form" novalidate @submit.prevent="onSubmit">
    <AuthLogo />

    <header class="register-form__header">
      <h1 class="register-form__title">Criar nova conta</h1>
      <p class="register-form__subtitle">
        Preencha os dados abaixo para iniciar o seu processo de parceria connosco.
      </p>
    </header>

    <AuthStepper :steps="steps" :current-step="step" />

    <p v-if="formError" class="register-form__alert" role="alert">{{ formError }}</p>

    <div class="register-form__card">
      <template v-if="step === 1">
        <AuthTextField
          id="register-name"
          v-model="form.name"
          label="Nome completo"
          :icon="User"
          autocomplete="name"
          placeholder="Ex: João Maputo"
          :error="fieldErrors.name"
        />

        <AuthTextField
          id="register-email"
          v-model="form.email"
          label="Email"
          type="email"
          :icon="Mail"
          autocomplete="email"
          placeholder="exemplo@empresa.co.mz"
          :error="fieldErrors.email"
        />

        <AuthTextField
          id="register-password"
          v-model="form.password"
          label="Palavra-passe"
          :icon="Lock"
          autocomplete="new-password"
          placeholder="Crie uma senha forte"
          revealable
          hint="Mínimo de 8 caracteres, com letras e números."
          :error="fieldErrors.password"
        />

        <AuthTextField
          id="register-confirm-password"
          v-model="form.confirmPassword"
          label="Confirmar palavra-passe"
          :icon="Lock"
          autocomplete="new-password"
          placeholder="Repita a senha"
          revealable
          :error="fieldErrors.confirmPassword"
        />

        <AuthSubmitButton label="Continuar" />
      </template>

      <template v-else>
        <AuthTextField
          id="register-company-name"
          v-model="form.companyName"
          label="Nome da empresa"
          :icon="Building2"
          autocomplete="organization"
          placeholder="Ex: Comercial Maputo, Lda"
          :error="fieldErrors.companyName"
        />

        <div class="register-form__actions">
          <button type="button" class="register-form__back" @click="goToPreviousStep">
            Voltar
          </button>
          <AuthSubmitButton label="Criar conta" loading-label="A criar..." :loading="loading" />
        </div>
      </template>
    </div>

    <p class="register-form__footer">
      Já possui uma conta?
      <RouterLink class="register-form__footer-link" to="/login">Iniciar sessão</RouterLink>
    </p>

    <div class="register-form__divider"></div>

    <footer class="register-form__links">
      <a class="register-form__link" href="#">Centro de Ajuda</a>
      <a class="register-form__link" href="#">Termos de Uso</a>
      <a class="register-form__link" href="#">Privacidade</a>
    </footer>
  </form>
</template>

<style scoped>
.register-form {
  width: 100%;
  max-width: 420px;
}

.register-form__header {
  margin-bottom: 28px;
}

.register-form__title {
  margin: 0 0 8px;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.register-form__subtitle {
  margin: 0 0 28px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-body);
}

.register-form__alert {
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.register-form__card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px;
  box-shadow: var(--shadow-sm);
}

.register-form__actions {
  display: flex;
  gap: 12px;
}

.register-form__back {
  flex-shrink: 0;
  height: 48px;
  padding: 0 20px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: var(--color-surface);
  color: var(--color-body);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.15s,
    border-color 0.15s;
}

.register-form__back:hover {
  border-color: var(--color-muted);
  background: var(--color-surface-soft);
}

.register-form__footer {
  margin: 24px 0 0;
  text-align: center;
  font-size: 14px;
  color: var(--color-body);
}

.register-form__footer-link {
  font-weight: 600;
  color: var(--brand-primary);
  text-decoration: none;
}

.register-form__divider {
  height: 1px;
  margin: 24px 0;
  background: var(--color-border);
}

.register-form__links {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.register-form__link {
  font-size: 13px;
  color: var(--color-muted);
  text-decoration: none;
}
</style>
