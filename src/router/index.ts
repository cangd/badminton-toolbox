import TheWelcome from '@/components/TheWelcome.vue'
import { createRouter, createWebHistory } from 'vue-router'
import RanglisteView from '../views/RanglisteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheWelcome
    },
    {
      path: '/rangliste',
      name: 'rangliste',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: RanglisteView
    }
  ]
})

export default router
