import { onBeforeUnmount, onMounted, type Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, onOutside: () => void) {
  function handleClick(event: MouseEvent) {
    if (target.value && !target.value.contains(event.target as Node)) {
      onOutside()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClick)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', handleClick)
  })
}
