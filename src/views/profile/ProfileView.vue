<script setup lang="ts">
import { onMounted } from 'vue'
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  CreditCard,
  Landmark,
  Mail,
  Phone,
  User,
} from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import AuthTextField from '@/features/auth/components/AuthTextField.vue'
import { useProfileForm } from '@/features/profile/composables/useProfileForm'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { form, bankAccountNumberMasked, isLoading, loadError, isSaving, saveError, justSaved, load, save } =
  useProfileForm()

onMounted(() => {
  load()
})
</script>

<template>
  <AppShell
    title="Perfil"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Perfil</h1>
        <p class="page-sub">Consulte os dados da sua conta e gira os dados da sua empresa.</p>
      </div>
    </div>

    <section class="card card--summary">
      <span class="avatar">{{ authStore.initials }}</span>
      <div class="summary__info">
        <span class="summary__name">{{ authStore.user?.name ?? 'Sem nome' }}</span>
        <span class="summary__role">{{ authStore.user?.email }}</span>
      </div>
    </section>

    <p v-if="loadError" class="page-error"><AlertCircle :size="15" /> {{ loadError }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar dados da empresa...</p>

    <form class="card card--form" novalidate @submit.prevent="save">
      <h2 class="card__title">Dados da Empresa</h2>
      <p class="card__sub">
        Estes dados aparecem nos documentos e comunicações enviadas aos seus clientes.
      </p>

      <p v-if="saveError" class="form-error"><AlertCircle :size="15" /> {{ saveError }}</p>

      <div class="field-grid">
        <AuthTextField
          id="profile-company-name"
          v-model="form.name"
          label="Nome da empresa"
          :icon="Building2"
        />
        <AuthTextField
          id="profile-contact-name"
          v-model="form.contactName"
          label="Nome do contacto"
          :icon="User"
        />
        <AuthTextField
          id="profile-phone"
          v-model="form.phone"
          label="Telefone"
          type="tel"
          :icon="Phone"
        />
        <AuthTextField
          id="profile-email"
          v-model="form.email"
          label="Email da empresa"
          type="email"
          :icon="Mail"
        />
        <AuthTextField
          id="profile-bank-name"
          v-model="form.bankName"
          label="Banco"
          :icon="Landmark"
        />
        <AuthTextField
          id="profile-bank-holder"
          v-model="form.bankAccountHolder"
          label="Titular da conta"
          :icon="User"
        />
        <AuthTextField
          id="profile-bank-account"
          v-model="form.bankAccountNumber"
          label="Número da conta"
          :icon="CreditCard"
          :placeholder="bankAccountNumberMasked ?? 'Sem conta registada'"
          :hint="
            bankAccountNumberMasked
              ? 'Deixe em branco para manter o número actual.'
              : undefined
          "
        />
      </div>

      <div class="card__foot">
        <span v-if="justSaved" class="saved-note">
          <CheckCircle2 :size="16" /> Alterações guardadas.
        </span>
        <button class="btn" type="submit" :disabled="isSaving">
          {{ isSaving ? 'A guardar...' : 'Guardar Alterações' }}
        </button>
      </div>
    </form>
  </AppShell>
</template>

<style scoped>
.page-head {
  margin-bottom: 22px;
}

.page-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.page-sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-body);
}

.page-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.page-loading {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-muted);
}

.form-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 18px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.card {
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.card--summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  margin-bottom: 16px;
}

.avatar {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-full);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
  font-size: 18px;
  font-weight: 700;
}

.summary__info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.summary__name {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-ink);
}

.summary__role {
  font-size: 13px;
  color: var(--color-body);
}

.card--form {
  padding: 24px;
}

.card__title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-ink);
}

.card__sub {
  margin: 0 0 20px;
  font-size: 13px;
  color: var(--color-body);
}

.field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 16px;
}

.card__foot {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
}

.saved-note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--color-success);
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover:not(:disabled) {
  background: var(--brand-primary-dark);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 720px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
