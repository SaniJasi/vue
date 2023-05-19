import './assets/main.css'

import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import routes from 'virtual:generated-pages'
import { useTodoListStore } from './stores/useTodoListStore'
import App from './App.vue'

export const createApp = ViteSSG(App, { routes }, ({ app, router, initialState }) => {
  const pinia = createPinia()
  app.use(pinia)

  if (import.meta.env.SSR) {
    initialState.pinia = pinia.state.value
  } else {
    pinia.state.value = initialState.pinia || {}
    pinia.use(piniaPluginPersistedState)
  }

  router.beforeEach((to, from, next) => {
    const store = useTodoListStore(pinia)
    if (!store.ready) store.initialize()
    next()
  })
})
