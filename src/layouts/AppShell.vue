<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './AppSidebar.vue'
import AppTopbar from './AppTopbar.vue'

defineProps<{
  title: string
  userName: string
  userRole: string
  userInitials: string
}>()

const route = useRoute()
const isMobileNavOpen = ref(false)

watch(
  () => route.fullPath,
  () => {
    isMobileNavOpen.value = false
  },
)
</script>

<template>
  <div class="app-shell">
    <AppSidebar
      :user-name="userName"
      :user-role="userRole"
      :user-initials="userInitials"
      :is-open="isMobileNavOpen"
      @close="isMobileNavOpen = false"
    />

    <div class="app-shell__main">
      <AppTopbar :title="title" @toggle-nav="isMobileNavOpen = !isMobileNavOpen" />

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
  overflow-x: hidden;
}

@media (max-width: 900px) {
  .app-shell__content {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .app-shell__content {
    padding: 14px;
  }
}
</style>
