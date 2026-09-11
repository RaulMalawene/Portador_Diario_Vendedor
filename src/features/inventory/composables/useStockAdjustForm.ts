import { reactive, ref } from 'vue'
import type { AdjustFormState, InventoryItem } from '../types/inventory.types'

const EMPTY_FORM: AdjustFormState = { sku: '', type: 'in', quantity: '', note: '' }

export function useStockAdjustForm() {
  const isOpen = ref(false)
  const form = reactive<AdjustFormState>({ ...EMPTY_FORM })

  function open(item: InventoryItem | null = null) {
    Object.assign(form, EMPTY_FORM, { sku: item ? item.sku : '' })
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, form, open, close }
}
