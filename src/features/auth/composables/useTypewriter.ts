import { onBeforeUnmount, onMounted, ref } from 'vue'

interface TypewriterOptions {
  typingSpeedMs?: number
  deletingSpeedMs?: number
  pauseMs?: number
}

export function useTypewriter(words: string[], options: TypewriterOptions = {}) {
  const { typingSpeedMs = 60, deletingSpeedMs = 32, pauseMs = 1600 } = options

  const displayedText = ref('')

  let wordIndex = 0
  let charIndex = 0
  let deleting = false
  let timeoutId: ReturnType<typeof setTimeout>

  function tick() {
    const currentWord = words[wordIndex] ?? ''

    if (deleting) {
      charIndex -= 1
    } else {
      charIndex += 1
    }

    displayedText.value = currentWord.slice(0, charIndex)

    if (!deleting && charIndex === currentWord.length) {
      deleting = true
      timeoutId = setTimeout(tick, pauseMs)
      return
    }

    if (deleting && charIndex === 0) {
      deleting = false
      wordIndex = (wordIndex + 1) % words.length
    }

    timeoutId = setTimeout(tick, deleting ? deletingSpeedMs : typingSpeedMs)
  }

  onMounted(() => {
    timeoutId = setTimeout(tick, typingSpeedMs)
  })

  onBeforeUnmount(() => {
    clearTimeout(timeoutId)
  })

  return { displayedText }
}
