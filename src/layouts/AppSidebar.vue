<script setup lang="ts">
import { useRouter, RouterLink, useRoute } from 'vue-router'
import { Package, Settings, LogOut } from '@lucide/vue'
import { navItems } from './navigation'

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
    <div class="sidebar__logo">
      <span class="logo__box"><Package :size="20" /></span>
      <span class="logo__text">Vendor Portal</span>
    </div>

    <nav class="nav">
      <component
        :is="item.to ? RouterLink : 'a'"
        v-for="item in navItems"
        :key="item.label"
        v-bind="item.to ? { to: item.to } : { href: '#' }"
        class="nav__item"
        :class="{ 'is-active': item.to === route.path }"
      >
        <component :is="item.icon" :size="20" />
        <span>{{ item.label }}</span>
      </component>
    </nav>

    <div class="sidebar__foot">
      <a href="#" class="nav__item"><Settings :size="20" /><span>Definições</span></a>
      <div class="user">
        <span class="user__avatar">{{ userInitials }}</span>
        <span class="user__info">
          <span class="user__name">{{ userName }}</span>
          <span class="user__role">{{ userRole }}</span>
        </span>
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
  gap: 10px;
  padding: 6px 8px 24px;
}

.logo__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
}

.logo__text {
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--color-ink);
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
  gap: 10px;
  margin-top: 8px;
  padding: 10px 8px;
  border-top: 1px solid var(--color-border);
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
  border: 0;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}

.user__logout:hover {
  color: var(--color-danger);
}

@media (max-width: 720px) {
  .sidebar {
    display: none;
  }
}
</style>
