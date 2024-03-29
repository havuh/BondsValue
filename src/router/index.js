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
    path: '/help',
    name: 'Help',
    component: () => import('../help/pages/UserHelp'),
  },
  {
    path: '/auth/sign-up',
    name: 'signUp',
    component: () => import('../auth/pages/SignUp'),
  },
  {
    path: '/home-bono',
    name: 'homeBono',
    meta: {
      requiresAuth: true
    },
    component: () => import('../bono/pages/HomeBono'),
  },
  {
    path: '/bono-detail/:id',
    name: 'bonoDetail',
    meta: {
      requiresAuth: true
    },
    component: () => import('../bono/pages/BonoDetail'),
  },
  {
    path: '/second-market/:id',
    name: 'secondMarket',
    meta: {
      requiresAuth: true
    },
    component: () => import('../bono/pages/SecondMarketDetail'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
