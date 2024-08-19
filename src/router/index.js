import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AnimeDetails from '@/views/AnimeDetails.vue'
import smoothscroll from 'smoothscroll-polyfill'
import Error from '@/components/Error.vue'
import AnimeSerialsList from '@/components/AnimeSerialsList.vue'

smoothscroll.polyfill()
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/serials/:id',
      name: 'serials',
      component: AnimeDetails,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: Error
    },
    {
      path: '/all',
      name: 'all',
      component: AnimeSerialsList
    }
  ],
  scrollBehavior() {
    if (navigator.userAgent.includes('Mozilla/5.0')) {
      return {
        duration: 500,
        behavior: 'smooth',
        el: document.body
      }
    } else {
      return { x: 0, y: 0, behavior: 'smooth' }
    }
  }
})

export default router
