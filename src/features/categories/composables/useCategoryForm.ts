import { reactive, ref } from 'vue'
import type { Category, CategoryFormState } from '../types/categories.types'

const EMPTY_FORM: CategoryFormState = {
  name: '',
  description: '',
  isActive: true,
}

export function useCategoryForm() {
  const isOpen = ref(false)
  const isEditing = ref(false)
  const editingId = ref<string | null>(null)
  const form = reactive<CategoryFormState>({ ...EMPTY_FORM })

  function openCreate() {
    isEditing.value = false
    editingId.value = null
    Object.assign(form, EMPTY_FORM)
    isOpen.value = true
  }

  function openEdit(category: Category) {
    isEditing.value = true
    editingId.value = category.id
    Object.assign(form, {
      name: category.name,
      description: category.description,
      isActive: category.active,
    })
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, isEditing, editingId, form, openCreate, openEdit, close }
}
