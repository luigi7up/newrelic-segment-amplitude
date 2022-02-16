import { createRouter, createWebHistory } from 'vue-router'
import SystemOverview from '../views/SystemOverview.vue'
import Logs from '../views/Logs.vue'
import Apm from '../views/Apm.vue'
import Dashboards from '../views/Dashboards.vue'
import DashboardShow from '../views/DashboardShow.vue'
import Alerts from '../views/Alerts.vue'
import QueryAndExplore from '../views/QueryAndExplore.vue'
import Infrastructure from '../views/Infrastructure.vue'



const routes = [
  
  {
    path: '/query-and-explore',
    name: 'QueryAndExplore',
    component: QueryAndExplore
  },{
    path: '/',
    name: 'SystemOverview',
    component: SystemOverview
  },{
    path: '/apm',
    name: 'Apm',
    component: Apm
  },{
    path: '/dashboards/:id',
    name: 'DashboardShow',
    component: DashboardShow
  },{
    path: '/dashboards',
    name: 'DashboardsIndex',
    component: Dashboards,
  },{
    path: '/logs',
    name: 'Logs',
    component: Logs
  },{
    path: '/alerts',
    name: 'Alerts',
    component: Alerts
  },{
    path: '/infrastructure',
    name: 'Infrastructure',
    component: Infrastructure
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
