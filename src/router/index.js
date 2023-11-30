import { createRouter, createWebHistory } from 'vue-router'
import Shop from '@/Pages/Shop.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/product/:productId',
      name: 'Product',
      component: () => import('../Pages/Product.vue')
    }
  ]
})

export default router
