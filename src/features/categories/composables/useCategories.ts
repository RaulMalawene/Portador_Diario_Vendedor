import { ref } from 'vue'
import type { Category, CategoryFormState } from '../types/categories.types'
import { categories as initialCategories } from '../data/categories.mock'
import { guessCategoryIcon } from '../utils/categoryIcons'
import { pickCategoryTheme } from '../utils/categoryTheme'

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function makeId(name: string): string {
  const slug = slugify(name)
  return `${slug || 'categoria'}-${Date.now().toString(36)}`
}

export function useCategories() {
  const categories = ref<Category[]>([...initialCategories])

  function upsert(form: CategoryFormState, editingId: string | null) {
    const existing = editingId
      ? categories.value.find((category) => category.id === editingId)
      : undefined

    const name = form.name.trim()

    const entry: Category = {
      id: existing?.id ?? makeId(name),
      name,
      description: form.description.trim(),
      // O ícone e a cor deixaram de ser escolhidos manualmente: são
      // atribuídos automaticamente a partir do nome (e mantidos ao editar).
      icon: existing?.icon ?? guessCategoryIcon(name),
      theme: existing?.theme ?? pickCategoryTheme(name),
      productsCount: existing?.productsCount ?? 0,
      active: form.isActive,
    }

    if (existing) {
      const index = categories.value.indexOf(existing)
      categories.value.splice(index, 1, entry)
    } else {
      categories.value.unshift(entry)
    }
  }

  function remove(id: string) {
    categories.value = categories.value.filter((category) => category.id !== id)
  }

  function toggleActive(id: string) {
    const category = categories.value.find((item) => item.id === id)
    if (category) category.active = !category.active
  }

  return { categories, upsert, remove, toggleActive }
}
