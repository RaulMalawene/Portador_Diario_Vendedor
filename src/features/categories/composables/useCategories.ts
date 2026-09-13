import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import {
  createCategoryRequest,
  deleteCategoryRequest,
  fetchCategoriesRequest,
  updateCategoryRequest,
  type CategoryApiItem,
} from '../api/categoriesApi'
import { guessCategoryIcon } from '../utils/categoryIcons'
import { pickCategoryTheme } from '../utils/categoryTheme'
import type { Category, CategoryFormState } from '../types/categories.types'

type Outcome = { ok: true } | { ok: false; error: string }

function toCategory(item: CategoryApiItem): Category {
  return {
    id: item.id,
    name: item.name,
    // Uma categoria acabada de criar ainda não tem produtos; ao editar,
    // mantém-se a contagem já conhecida (o backend não a devolve aqui).
    productsCount: item.products_count ?? 0,
    icon: guessCategoryIcon(item.name),
    theme: pickCategoryTheme(item.name),
  }
}

export function useCategories() {
  const authStore = useAuthStore()

  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const loadError = ref<string | null>(null)

  async function load() {
    const token = authStore.token
    if (!token) return

    isLoading.value = true
    loadError.value = null

    const result = await fetchCategoriesRequest(token)
    isLoading.value = false

    if (result.ok && result.data) {
      categories.value = result.data.data.map(toCategory)
    } else {
      loadError.value = result.error ?? 'Não foi possível carregar as categorias.'
    }
  }

  async function upsert(form: CategoryFormState, editingId: number | null): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const name = form.name.trim()
    const result = editingId
      ? await updateCategoryRequest(token, editingId, name)
      : await createCategoryRequest(token, name)

    if (!result.ok || !result.data) {
      return { ok: false, error: result.error ?? 'Não foi possível guardar a categoria.' }
    }

    const saved = toCategory(result.data.data)
    const index = categories.value.findIndex((category) => category.id === saved.id)
    if (index !== -1) {
      // A resposta de actualização não traz products_count — mantém a
      // contagem já conhecida em vez de a apagar para 0.
      saved.productsCount = categories.value[index]!.productsCount
      categories.value.splice(index, 1, saved)
    } else {
      categories.value.unshift(saved)
    }

    return { ok: true }
  }

  async function remove(id: number): Promise<Outcome> {
    const token = authStore.token
    if (!token) return { ok: false, error: 'Sessão inválida. Inicie sessão novamente.' }

    const result = await deleteCategoryRequest(token, id)
    if (!result.ok) {
      return { ok: false, error: result.error ?? 'Não foi possível eliminar a categoria.' }
    }

    categories.value = categories.value.filter((category) => category.id !== id)
    return { ok: true }
  }

  return { categories, isLoading, loadError, load, upsert, remove }
}
