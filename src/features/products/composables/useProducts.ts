import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  createProductRequest,
  deleteProductRequest,
  fetchCategoryOptionsRequest,
  fetchProductsRequest,
  updateProductRequest,
  type ProductFilters,
} from '../api/productsApi'
import type { Product, ProductCategoryOption, ProductFormState } from '../types/products.types'

type Outcome = { ok: true } | { ok: false; error: string }

export function useProducts() {
  const authStore = useAuthStore()

  const products = ref<Product[]>([])
  const categoryOptions = ref<ProductCategoryOption[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)
  const meta = ref({ total: 0, currentPage: 1, lastPage: 1 })

  async function load(filters: ProductFilters = {}) {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    loadError.value = null

    const result = await fetchProductsRequest(token, filters)
    isLoading.value = false

    if (!result.ok || !result.data) {
      loadError.value = result.error ?? 'Não foi possível carregar os produtos.'
      return
    }

    products.value = result.data.data
    meta.value = {
      total: result.data.meta.total,
      currentPage: result.data.meta.current_page,
      lastPage: result.data.meta.last_page,
    }
  }

  async function fetchAllForExport(
    filters: Omit<ProductFilters, 'page'> = {},
  ): Promise<Product[] | null> {
    const token = authStore.token
    if (!token) return null

    const all: Product[] = []
    let page = 1
    let lastPage = 1

    do {
      const result = await fetchProductsRequest(token, { ...filters, page })
      if (!result.ok || !result.data) return null

      all.push(...result.data.data)
      lastPage = result.data.meta.last_page
      page += 1
    } while (page <= lastPage && page <= 200) // limite de segurança

    return all
  }

  async function loadCategoryOptions() {
    const token = authStore.token
    if (!token) return

    const result = await fetchCategoryOptionsRequest(token)
    if (result.ok && result.data) categoryOptions.value = result.data.data
  }

  async function upsert(form: ProductFormState, editingId: number | null): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      category_id: form.categoryId,
      price: Number(form.price),
      is_active: form.isActive,
      ...(editingId === null ? { stock: Number(form.stock) } : {}),
    }

    const result = editingId
      ? await updateProductRequest(token, editingId, payload)
      : await createProductRequest(token, payload)

    if (!result.ok || !result.data) {
      return { ok: false, error: result.error ?? 'Não foi possível guardar o produto.' }
    }

    const saved = result.data.data
    const index = products.value.findIndex((product) => product.id === saved.id)
    if (index !== -1) products.value.splice(index, 1, saved)
    else products.value.unshift(saved)

    return { ok: true }
  }

  async function remove(id: number): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const result = await deleteProductRequest(token, id)
    if (!result.ok) return { ok: false, error: result.error ?? 'Não foi possível eliminar o produto.' }

    products.value = products.value.filter((product) => product.id !== id)
    return { ok: true }
  }

  async function toggleActive(product: Product): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const result = await updateProductRequest(token, product.id, { is_active: !product.is_active })
    if (!result.ok || !result.data) {
      return { ok: false, error: result.error ?? 'Não foi possível actualizar o estado.' }
    }

    const index = products.value.findIndex((item) => item.id === product.id)
    if (index !== -1) products.value.splice(index, 1, result.data.data)

    return { ok: true }
  }

  return {
    products,
    categoryOptions,
    isLoading,
    loadError,
    meta,
    load,
    loadCategoryOptions,
    fetchAllForExport,
    upsert,
    remove,
    toggleActive,
  }
}
