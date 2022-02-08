import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Logs from '../views/Logs.vue'
import Apm from '../views/Apm.vue'
import Dashboards from '../views/Dashboards.vue'
import Alerts from '../views/Alerts.vue'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },{
    path: '/apm',
    name: 'Apm',
    component: Apm
  },{
    path: '/dashboards',
    name: 'Dashboards',
    component: Dashboards
  },{
    path: '/logs',
    name: 'Logs',
    component: Logs
  },{
    path: '/alerts',
    name: 'Alerts',
    component: Alerts
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
