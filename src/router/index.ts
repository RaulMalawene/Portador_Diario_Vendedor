import { createRouter, createWebHistory } from 'vue-router'
import { hasStoredClientSession } from '@/features/loja/composables/useClientSession'

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
    },
    {
      path: '/registo',
      name: 'registo',
      component: () => import('../views/auth/RegisterView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/dashboard/DashboardView.vue'),
    },
    {
      path: '/categorias',
      name: 'categorias',
      component: () => import('../views/categories/CategoriesView.vue'),
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/products/ProductsView.vue'),
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: () => import('../views/inventory/InventoryView.vue'),
    },
    {
      path: '/encomendas',
      name: 'encomendas',
      component: () => import('../views/orders/OrdersView.vue'),
    },
    {
      path: '/encomendas/:id',
      name: 'encomenda-detalhe',
      component: () => import('../views/orders/OrderDetailView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/profile/ProfileView.vue'),
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
      path: '/loja/login',
      name: 'loja-login',
      component: () => import('../views/loja/ClientLoginView.vue'),
      meta: { clientGuestOnly: true },
    },
    {
      path: '/loja/encomendas',
      name: 'loja-encomendas',
      component: () => import('../views/loja/ClientOrdersView.vue'),
      meta: { requiresClientAuth: true },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.requiresClientAuth && !hasStoredClientSession()) {
    return { name: 'loja-login' }
  }
  if (to.meta.clientGuestOnly && hasStoredClientSession()) {
    return { name: 'loja-encomendas' }
  }
})

export default router
