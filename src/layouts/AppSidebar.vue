<script setup lang="ts">
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { LogOut } from '@lucide/vue'
import { navItems } from './navigation'
import logoUrl from '@/assets/Logotipo.svg'

defineProps<{
  userName: string
  userRole: string
  userInitials: string
}>()

const router = useRouter()
const route = useRoute()

function logout() {
  router.push('/login')
}
</script>

<template>
  <aside class="sidebar">
    <RouterLink to="/home" class="sidebar__logo" aria-label="Ir para o Dashboard">
      <img class="logo__img" :src="logoUrl" alt="Portador Diário" />
    </RouterLink>

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
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
      </component>
    </nav>

    <div class="sidebar__foot">
      <div class="user">
        <RouterLink to="/perfil" class="user__link" aria-label="Ver e editar perfil">
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

.sidebar__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 8px 24px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition: opacity 0.15s;
}

.sidebar__logo:hover {
  opacity: 0.85;
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

@media (max-width: 720px) {
  .sidebar {
    display: none;
  }
}
</style>
