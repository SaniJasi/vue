import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import ItemView from '../views/ItemView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: CreateView
    },
    {
      path: '/todo/:articleName',
      component: ItemView
    }
  ]
})

export default router
