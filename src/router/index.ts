import { createRouter, createWebHistory } from 'vue-router'
import { hasStoredClientSession } from '@/features/loja/composables/useClientSession'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/registo',
      name: 'registo',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/dashboard/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/categories/CategoriesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/products/ProductsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('../views/inventory/InventoryView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/encomendas',
      name: 'encomendas',
      component: () => import('../views/orders/OrdersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/encomendas/:id',
      name: 'encomenda-detalhe',
      component: () => import('../views/orders/OrderDetailView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/profile/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    // Área do Cliente: telas separadas do sistema do fornecedor, usadas para
    // testar pedidos reais ao backend (login, criar encomenda, ver estado),
    // incluindo pedidos simultâneos abrindo várias abas.
    {
      path: '/cliente/login',
      name: 'cliente-login',
      component: () => import('../views/loja/ClientLoginView.vue'),
      meta: { clientGuestOnly: true },
    },
    {
      path: '/cliente/encomendas',
      name: 'cliente-encomendas',
      component: () => import('../views/loja/ClientOrdersView.vue'),
      meta: { requiresClientAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  // Área do Cliente: sessão e guarda próprias, independentes do portal do
  // fornecedor abaixo.
  if (to.meta.requiresClientAuth && !hasStoredClientSession()) {
    return { name: 'cliente-login' }
  }
  if (to.meta.clientGuestOnly && hasStoredClientSession()) {
    return { name: 'cliente-encomendas' }
  }

  if (to.meta.requiresAuth || to.meta.guestOnly) {
    const auth = useAuthStore()
    if (to.meta.requiresAuth && !auth.isAuthenticated) return { name: 'login' }
    if (to.meta.guestOnly && auth.isAuthenticated) return { name: 'home' }
  }
})

export default router
