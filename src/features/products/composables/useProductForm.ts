import { reactive, ref } from 'vue'
import type { Product, ProductFormState } from '../types/products.types'

const EMPTY_FORM: ProductFormState = {
  name: '',
  sku: '',
  category: '',
  price: '',
  stock: '',
  isActive: true,
}

export function useProductForm() {
  const isOpen = ref(false)
  const isEditing = ref(false)
  const editingSku = ref<string | null>(null)
  const form = reactive<ProductFormState>({ ...EMPTY_FORM })

  function openCreate() {
    isEditing.value = false
    editingSku.value = null
    Object.assign(form, EMPTY_FORM)
    isOpen.value = true
  }

  function openEdit(product: Product) {
    isEditing.value = true
    editingSku.value = product.sku
    Object.assign(form, {
      name: product.name,
      sku: product.sku,
      category: product.categoria,
      price: product.preco.replace(',', '.'),
      stock: String(product.stock),
      isActive: product.active,
    })
    isOpen.value = true
  }

  function close() {
    isOpen.value = false
  }

  return { isOpen, isEditing, editingSku, form, openCreate, openEdit, close }
}
