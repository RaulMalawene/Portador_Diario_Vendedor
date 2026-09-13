import { reactive, ref } from 'vue'
import type { Category, CategoryFormState } from '../types/categories.types'

const EMPTY_FORM: CategoryFormState = { name: '' }

export function useCategoryForm() {
  const isOpen = ref(false)
  const isEditing = ref(false)
  const editingId = ref<number | null>(null)
  const form = reactive<CategoryFormState>({ ...EMPTY_FORM })
  const formError = ref<string | null>(null)

  function openCreate() {
    isEditing.value = false
    editingId.value = null
    formError.value = null
    Object.assign(form, EMPTY_FORM)
    isOpen.value = true
  }

  function openEdit(category: Category) {
    isEditing.value = true
    editingId.value = category.id
    formError.value = null
    Object.assign(form, { name: category.name })
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, isEditing, editingId, form, formError, openCreate, openEdit, close }
}
