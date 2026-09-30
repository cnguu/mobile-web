import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory =
    import.meta.env.QUASAR_SERVER ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history' ? createWebHistory
    : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  if (import.meta.hot) {
    handleHotUpdate(Router)
  }

  return Router
})
