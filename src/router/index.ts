import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'allProduct',
    component: () => import('../views/product/index.vue')
  },
  {
    path: '/createProduct',
    name: 'createProduct',
    component: () => import('../views/product/add.vue')
  },
  {
    path: '/editProduct/:id',
    name: 'editProduct',
    component: () => import('../views/product/edit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
