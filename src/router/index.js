import {createRouter, createWebHashHistory} from 'vue-router'
import ArticlesTagsView from '@/views/ArticlesTagsView.vue'
import ArticlesView from '@/views/ArticlesView.vue'
import LoginView from '@/views/LoginView'
import RegisterView from '@/views/RegisterView'

const routes = [
  {
    path: '/tags/:tag',
    name: 'articlesTags',
    component: ArticlesTagsView,
  },
  {
    path: '/',
    name: 'articles',
    component: ArticlesView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
