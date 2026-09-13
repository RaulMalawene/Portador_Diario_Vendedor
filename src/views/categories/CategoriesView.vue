<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { AlertCircle, Plus } from '@lucide/vue'
import AppShell from '@/layouts/AppShell.vue'
import AppFooter from '@/layouts/AppFooter.vue'
import CategoriesToolbar from '@/features/categories/components/CategoriesToolbar.vue'
import CategoryCard from '@/features/categories/components/CategoryCard.vue'
import CategoryFormModal from '@/features/categories/components/CategoryFormModal.vue'
import { useCategories } from '@/features/categories/composables/useCategories'
import { useCategoryForm } from '@/features/categories/composables/useCategoryForm'
import type { Category } from '@/features/categories/types/categories.types'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const { categories, isLoading, loadError, load, upsert, remove } = useCategories()
const { isOpen, isEditing, editingId, form, formError, openCreate, openEdit, close } =
  useCategoryForm()

const search = ref('')

const filteredCategories = computed(() => {
  const query = search.value.trim().toLowerCase()
  if (!query) return categories.value
  return categories.value.filter((category) => category.name.toLowerCase().includes(query))
})

function handleEdit(category: Category) {
  openEdit(category)
}

async function handleSubmit() {
  const result = await upsert(form, editingId.value)
  if (result.ok) {
    close()
    return
  }
  formError.value = result.error
}

async function handleRemove(id: number) {
  await remove(id)
}

onMounted(() => {
  load()
})
</script>

<template>
  <AppShell
    title="Categorias"
    :user-name="authStore.user?.name ?? ''"
    user-role="Fornecedor Premium"
    :user-initials="authStore.initials"
  >
    <div class="page-head">
      <div>
        <h1 class="page-title">Categorias</h1>
        <p class="page-sub">Organize o seu catálogo em categorias claras e fáceis de gerir.</p>
      </div>
      <div class="page-actions">
        <button class="btn" type="button" @click="openCreate">
          <Plus :size="16" /><span>Nova Categoria</span>
        </button>
      </div>
    </div>

    <CategoriesToolbar v-model:search="search" />

    <p v-if="loadError" class="page-error"><AlertCircle :size="15" /> {{ loadError }}</p>
    <p v-else-if="isLoading" class="page-loading">A carregar categorias...</p>

    <section v-if="filteredCategories.length" class="categories-grid">
      <CategoryCard
        v-for="category in filteredCategories"
        :key="category.id"
        :category="category"
        @edit="handleEdit(category)"
        @remove="handleRemove(category.id)"
      />
    </section>

    <div v-else-if="!isLoading" class="categories-empty">
      <p>Nenhuma categoria encontrada.</p>
    </div>

    <CategoryFormModal
      v-model="isOpen"
      v-model:form="form"
      :is-editing="isEditing"
      :error-message="formError"
      @submit="handleSubmit"
    />

    <AppFooter />
  </AppShell>
</template>

<style scoped>
.page-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 22px;
}

.page-title {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--color-ink);
}

.page-sub {
  margin: 0;
  font-size: 14px;
  color: var(--color-body);
}

.page-actions {
  display: flex;
  flex-shrink: 0;
  gap: 10px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 18px;
  border: 0;
  border-radius: var(--radius-sm);
  background: var(--brand-primary);
  color: var(--color-surface);
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s;
}

.btn:hover {
  background: var(--brand-primary-dark);
}

.page-error {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px;
  padding: 10px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
  font-size: 13px;
}

.page-loading {
  margin: 0 0 16px;
  font-size: 13px;
  color: var(--color-muted);
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.categories-empty {
  padding: 60px 20px;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-muted);
  text-align: center;
}

@media (max-width: 720px) {
  .page-head {
    flex-direction: column;
  }
}
</style>
