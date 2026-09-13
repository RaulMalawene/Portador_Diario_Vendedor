import { reactive, ref } from 'vue'
import type { Product, ProductFormState } from '../types/products.types'

const EMPTY_FORM: ProductFormState = {
  name: '',
  sku: '',
  categoryId: null,
  price: '',
  stock: '',
  isActive: true,
}

export function useProductForm() {
  const isOpen = ref(false)
  const isEditing = ref(false)
  const editingId = ref<number | null>(null)
  const form = reactive<ProductFormState>({ ...EMPTY_FORM })
  const formError = ref<string | null>(null)

  function openCreate() {
    isEditing.value = false
    editingId.value = null
    formError.value = null
    Object.assign(form, EMPTY_FORM)
    isOpen.value = true
  }

  function openEdit(product: Product) {
    isEditing.value = true
    editingId.value = product.id
    formError.value = null
    Object.assign(form, {
      name: product.name,
      sku: product.sku,
      categoryId: product.category?.id ?? null,
      price: product.price,
      stock: String(product.stock),
      isActive: product.is_active,
    })
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, isEditing, editingId, form, formError, openCreate, openEdit, close }
}
