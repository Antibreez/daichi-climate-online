import {createRouter, createWebHashHistory} from 'vue-router'
import Dashboard from '../views/Dashboard'
import Auth from '@/views/Auth'
// import {getItem} from '@/helpers/persistanceStorage'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/auth',
    name: 'auth',
    component: Auth,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'auth' && !getItem('userUid')) next({name: 'auth'})
//   else if (to.name === 'auth' && !!getItem('userUid')) next({name: from.name})
//   else next()
// })

export default router
