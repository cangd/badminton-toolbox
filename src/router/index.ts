import TheWelcome from '@/components/TheWelcome.vue'
import DoublesSimulator from '@/components/simulator/DoublesSimulator.vue'
import RanglisteSimulator from '@/views/RanglisteSimulator.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import RanglisteView from '../views/RanglisteView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheWelcome
    },
    {
      path: '/rangliste',
      name: 'rangliste',
      component: RanglisteSimulator
    }
  ]
})

export default router
