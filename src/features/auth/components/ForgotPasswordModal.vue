<script setup lang="ts">
import { watch } from 'vue'
import { Mail, MailCheck } from '@lucide/vue'
import AppModal from '@/components/ui/AppModal.vue'
import AuthTextField from './AuthTextField.vue'
import AuthSubmitButton from './AuthSubmitButton.vue'
import { useForgotPasswordForm } from '../composables/useForgotPasswordForm'

const isOpen = defineModel<boolean>({ required: true })

const { email, fieldErrors, loading, formError, submitted, submit, reset } = useForgotPasswordForm()

async function onSubmit() {
  await submit()
}

watch(isOpen, (open) => {
  if (!open) reset()
})
</script>

<template>
  <AppModal v-model="isOpen" labelled-by="forgot-password-title">
    <template v-if="!submitted">
      <h2 id="forgot-password-title" class="forgot-password__title">Recuperar palavra-passe</h2>
      <p class="forgot-password__subtitle">
        Indique o seu email corporativo e enviamos-lhe um link para redefinir a palavra-passe.
      </p>

      <form novalidate @submit.prevent="onSubmit">
        <p v-if="formError" class="forgot-password__alert" role="alert">{{ formError }}</p>

        <AuthTextField
          id="forgot-password-email"
          v-model="email"
          label="Email corporativo"
          type="email"
          :icon="Mail"
          autocomplete="email"
          placeholder="exemplo@empresa.co.mz"
          :error="fieldErrors.email"
        />

        <AuthSubmitButton
          label="Enviar link de recuperação"
          loading-label="A enviar..."
          :loading="loading"
        />
      </form>
    </template>

    <template v-else>
      <div class="forgot-password__success">
        <span class="forgot-password__success-icon"><MailCheck :size="28" /></span>
        <h2 id="forgot-password-title" class="forgot-password__title">Verifique o seu email</h2>
        <p class="forgot-password__subtitle">
          Enviámos um link de recuperação para <strong>{{ email }}</strong
          >. Se não encontrar a mensagem, verifique a pasta de spam.
        </p>
        <button type="button" class="forgot-password__done" @click="isOpen = false">
          Concluído
        </button>
      </div>
    </template>
  </AppModal>
</template>

<style scoped>
.forgot-password__title {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
}

.forgot-password__subtitle {
  margin: 0 0 24px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--color-body);
}

.forgot-password__alert {
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.forgot-password__success {
  text-align: center;
}

.forgot-password__success-icon {
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

.forgot-password__done {
  width: 100%;
  height: 48px;
  margin-top: 8px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.forgot-password__done:hover {
  background: var(--brand-primary-dark);
}
</style>
