<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'

defineProps<{
  title: string
  userName: string
  userRole: string
  userInitials: string
}>()
</script>

<template>
  <div class="app-shell">
    <AppSidebar :user-name="userName" :user-role="userRole" :user-initials="userInitials" />

    <div class="app-shell__main">
      <AppTopbar :title="title" />

      <main class="app-shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background: var(--color-surface);
}

.app-shell__main {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
  height: 100%;
}

.app-shell__content {
  flex: 1;
  padding: 28px;
  overflow-y: auto;
}
</style>
