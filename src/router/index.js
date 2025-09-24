import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NoteView from '../views/NoteView.vue'
import LocalhomeView from '../views/LocalhomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/local', name: 'Localhome', component: LocalhomeView },
  
  { path: '/note/:id', name: 'Note', component: NoteView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
