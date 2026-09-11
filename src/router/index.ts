import { createRouter, createWebHistory } from 'vue-router'

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
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
