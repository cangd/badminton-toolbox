import TheWelcome from '@/components/TheWelcome.vue'
import DoublesSimulator from '@/views/DoublesSimulator.vue'
import Testinger from '@/views/Testinger.vue'
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
      component: RanglisteView
    },
    {
      path: '/simulator',
      name: 'simulator',
      component: DoublesSimulator
    },
    {
      path: '/testinger',
      name: 'testinger',
      component: Testinger
    }
  ]
})

export default router
