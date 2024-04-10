import TheWelcome from '@/components/TheWelcome.vue'
import RanglisteSimulator from '@/views/RanglisteSimulator.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheWelcome
    },
    {
      path: '/simulator',
      name: 'simulator',
      component: RanglisteSimulator
    }
  ]
})

export default router
