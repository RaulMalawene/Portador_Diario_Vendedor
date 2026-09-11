<script setup lang="ts">
import { computed } from 'vue'
import { User, Mail, Phone, Building2, Hash, MapPin, CheckCircle2 } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import AuthTextField from '@/features/auth/components/AuthTextField.vue'
import { useProfileForm } from '@/features/profile/composables/useProfileForm'

const { form, justSaved, save } = useProfileForm()

const initials = computed(() =>
  form.name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join(''),
)
</script>

<template>
  <AppShell
    title="Perfil"
    :user-name="form.name"
    user-role="Fornecedor Premium"
    :user-initials="initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Perfil</h1>
        <p class="page-sub">Gerencie os dados da sua conta e da sua empresa.</p>
      </div>
    </div>

    <section class="card card--summary">
      <span class="avatar">{{ initials }}</span>
      <div class="summary__info">
        <span class="summary__name">{{ form.name || 'Sem nome' }}</span>
        <span class="summary__role">{{ form.companyName || 'Fornecedor Premium' }}</span>
      </div>
    </section>

    <form class="card card--form" novalidate @submit.prevent="save">
      <h2 class="card__title">Dados de Conta</h2>
      <div class="field-grid">
        <AuthTextField id="profile-name" v-model="form.name" label="Nome completo" :icon="User" />
        <AuthTextField
          id="profile-email"
          v-model="form.email"
          label="Email"
          type="email"
          :icon="Mail"
        />
        <AuthTextField
          id="profile-phone"
          v-model="form.phone"
          label="Contacto"
          type="tel"
          :icon="Phone"
        />
      </div>

      <h2 class="card__title card__title--spaced">Dados da Empresa</h2>
      <div class="field-grid">
        <AuthTextField
          id="profile-company"
          v-model="form.companyName"
          label="Nome da empresa"
          :icon="Building2"
        />
        <AuthTextField id="profile-tax-id" v-model="form.taxId" label="NUIT" :icon="Hash" />
        <AuthTextField
          id="profile-address"
          v-model="form.address"
          label="Endereço"
          :icon="MapPin"
        />
      </div>

      <div class="card__foot">
        <span v-if="justSaved" class="saved-note"
          ><CheckCircle2 :size="16" /> Alterações guardadas.</span
        >
        <button class="btn" type="submit">Guardar Alterações</button>
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
  margin: 0 0 16px;
  font-size: 15px;
  font-weight: 700;
  color: var(--color-ink);
}

.card__title--spaced {
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
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

.btn:hover {
  background: var(--brand-primary-dark);
}

@media (max-width: 720px) {
  .field-grid {
    grid-template-columns: 1fr;
  }
}
</style>
