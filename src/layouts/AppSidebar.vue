<script setup lang="ts">
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { LogOut, X } from '@lucide/vue'
import { navItems } from './navigation'
import { useAuthStore } from '@/stores/auth'
import logoUrl from '@/assets/Logotipo.svg'

withDefaults(
  defineProps<{
    userName: string
    userRole: string
    userInitials: string
    isOpen?: boolean
  }>(),
  {
    isOpen: false,
  },
)

const emit = defineEmits<{ close: [] }>()

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

function logout() {
  authStore.logout()
  emit('close')
  router.push('/login')
}
</script>

<template>
  <div
    class="sidebar-backdrop"
    :class="{ 'is-visible': isOpen }"
    aria-hidden="true"
    @click="emit('close')"
  ></div>

  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <div class="sidebar__head">
      <RouterLink to="/home" class="sidebar__logo" aria-label="Ir para o Dashboard" @click="emit('close')">
        <img class="logo__img" :src="logoUrl" alt="Portador Diário" />
      </RouterLink>
      <button
        class="sidebar__close"
        type="button"
        aria-label="Fechar menu"
        @click="emit('close')"
      >
        <X :size="20" />
      </button>
    </div>

    <nav class="nav">
      <component
        :is="item.to ? RouterLink : 'a'"
        v-for="item in navItems"
        :key="item.label"
        v-bind="item.to ? { to: item.to } : { href: '#' }"
        class="nav__item"
        :class="{
          'is-active':
            !!item.to && (route.path === item.to || route.path.startsWith(`${item.to}/`)),
        }"
        @click="emit('close')"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
      </component>
    </nav>

    <div class="sidebar__foot">
      <div class="user">
        <RouterLink to="/perfil" class="user__link" aria-label="Ver e editar perfil" @click="emit('close')">
          <span class="user__avatar">{{ userInitials }}</span>
          <span class="user__info">
            <span class="user__name">{{ userName }}</span>
            <span class="user__role">{{ userRole }}</span>
          </span>
        </RouterLink>
        <button class="user__logout" type="button" aria-label="Terminar sessão" @click="logout">
          <LogOut :size="18" />
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.sidebar-backdrop {
  display: none;
}

.sidebar {
  display: flex;
  flex-direction: column;
  width: 248px;
  flex-shrink: 0;
  height: 100%;
  padding: 20px 16px;
  border-right: 1px solid var(--color-border);
  overflow-y: auto;
}

.sidebar__head {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
}

.sidebar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 12px 8px;
  border-radius: var(--radius-sm);
  transition: opacity 0.15s;
}

.sidebar__logo:hover {
  opacity: 0.85;
}

.sidebar__close {
  display: none;
  flex-shrink: 0;
  padding: 6px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}

.sidebar__close:hover {
  background: var(--color-surface-soft);
  color: var(--color-ink);
}

.logo__img {
  display: block;
  height: 52px;
  width: auto;
  max-width: 100%;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 14px;
  font-weight: 500;
  color: var(--color-body);
  text-decoration: none;
  transition:
    background 0.15s,
    color 0.15s;
}

.nav__item:hover {
  background: var(--color-surface-soft);
  color: var(--color-ink);
}

.nav__item.is-active {
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
  font-weight: 600;
}

.sidebar__foot {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: auto;
}

.user {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding: 6px;
  border-top: 1px solid var(--color-border);
}

.user__link {
  display: flex;
  flex: 1;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 4px;
  border-radius: var(--radius-sm);
  color: inherit;
  text-decoration: none;
  transition: background 0.15s;
}

.user__link:hover {
  background: var(--color-surface-soft);
}

.user__avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  background: var(--brand-primary-tint);
  color: var(--brand-primary);
  font-size: 13px;
  font-weight: 700;
}

.user__info {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.user__name {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.user__role {
  font-size: 12px;
  color: var(--color-muted);
}

.user__logout {
  display: flex;
  flex-shrink: 0;
  padding: 6px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
  transition: background 0.15s;
}

.user__logout:hover {
  background: var(--color-surface-soft);
  color: var(--color-danger);
}

@media (max-width: 900px) {
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    z-index: 90;
    display: block;
    background: rgba(28, 22, 32, 0.45);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
  }

  .sidebar-backdrop.is-visible {
    opacity: 1;
    pointer-events: auto;
  }

  .sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 91;
    width: min(80vw, 280px);
    box-shadow: var(--shadow-lg);
    transform: translateX(-100%);
    transition: transform 0.22s ease;
  }

  .sidebar.is-open {
    transform: translateX(0);
  }

  .sidebar__close {
    display: flex;
  }
}
</style>
