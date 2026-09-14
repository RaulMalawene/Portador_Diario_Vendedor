<script setup lang="ts">
import { useTypewriter } from '../composables/useTypewriter'
import enterOtpUrl from '@/assets/enter-otp.svg'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    phrases?: string[]
  }>(),
  {
    eyebrow: 'O portal do Vendedor',
    phrases: () => [
      'entregar as suas encomendas com rapidez',
      'rastrear o correio em tempo real',
      'chegar a qualquer parte de Moçambique',
      'simplificar a gestão das suas entregas',
    ],
  },
)

const { displayedText } = useTypewriter(props.phrases)
</script>

<template>
  <aside class="brand-showcase">
    <p class="brand-showcase__eyebrow">{{ eyebrow }}</p>

    <h1 class="brand-showcase__name">Portador<br />Diário</h1>

    <p class="brand-showcase__typewriter">
      <span>Feito para </span>
      <span class="brand-showcase__typed">{{ displayedText }}</span>
      <span class="brand-showcase__cursor" aria-hidden="true"></span>
    </p>

    <div class="brand-showcase__rule" aria-hidden="true"></div>

    <div class="brand-showcase__illustration">
      <img :src="enterOtpUrl" alt="" aria-hidden="true" />
    </div>
  </aside>
</template>

<style scoped>
.brand-showcase {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 56px;
  background: var(--color-surface);
}

.brand-showcase__eyebrow {
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--brand-accent-dark);
}

.brand-showcase__name {
  margin: 0 0 28px;
  font-size: clamp(40px, 5vw, 64px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--brand-primary);
}

.brand-showcase__typewriter {
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: var(--color-body);
}

.brand-showcase__typed {
  font-weight: 600;
  color: var(--brand-primary);
}

.brand-showcase__cursor {
  display: inline-block;
  width: 2px;
  height: 22px;
  margin-left: 2px;
  vertical-align: middle;
  background: var(--brand-primary);
  animation: brand-showcase-blink 1s step-end infinite;
}

.brand-showcase__rule {
  width: 64px;
  height: 4px;
  margin-top: 40px;
  border-radius: var(--radius-full);
  background: var(--brand-accent);
}

.brand-showcase__illustration {
  position: relative;
  align-self: center;
  width: min(100%, 360px);
  margin-top: 40px;
}

.brand-showcase__illustration::before {
  content: '';
  position: absolute;
  inset: 6%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--brand-primary-tint) 0%,
    var(--brand-accent-tint) 100%
  );
  z-index: 0;
}

.brand-showcase__illustration img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  height: auto;
}

@keyframes brand-showcase-blink {
  0%,
  50% {
    opacity: 1;
  }
  50.01%,
  100% {
    opacity: 0;
  }
}

@media (max-width: 900px) {
  .brand-showcase {
    display: none;
  }
}
</style>
