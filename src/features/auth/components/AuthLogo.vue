<script setup lang="ts">
import logoUrl from '@/assets/Logotipo.svg'
</script>

<template>
  <img class="auth-logo" :src="logoUrl" alt="Portador Diário" />
</template>

<style scoped>
.auth-logo {
  display: block;
  height: 64px;
  width: auto;
  margin: 0 auto 40px;
}
</style>
