import { reactive, ref } from 'vue'
import type { AdjustFormState, InventoryItem } from '../types/inventory.types'

const EMPTY_FORM: AdjustFormState = { productId: null, type: 'in', quantity: '', note: '' }

export function useStockAdjustForm() {
  const isOpen = ref(false)
  const form = reactive<AdjustFormState>({ ...EMPTY_FORM })
  const formError = ref<string | null>(null)

  function open(item: InventoryItem | null = null) {
    Object.assign(form, EMPTY_FORM, { productId: item ? item.id : null })
    formError.value = null
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, form, formError, open, close }
}
