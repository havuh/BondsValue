import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../home/pages/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth/sign-in',
    name: 'signIn',
    component: () => import('../auth/pages/SignIn'),
  },
  {
    path: '/auth/sign-up',
    name: 'signUp',
    component: () => import('../auth/pages/SignUp'),
  },
  {
    path: '/home-bono',
    name: 'homeBono',
    component: () => import('../bono/pages/HomeBono'),
  },
  {
    path: '/form-bono',
    name: 'formBono',
    component: () => import('../bono/pages/FormBono'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
