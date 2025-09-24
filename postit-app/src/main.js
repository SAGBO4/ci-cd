import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import HomeView from './views/HomeView.vue'
import NoteView from './views/NoteView.vue'
import './assets/styles.css'
import LocalhomeView from './views/LocalhomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/local', name: 'homelocal', component: LocalhomeView },

  { path: '/note/:id', name: 'note', component: NoteView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')