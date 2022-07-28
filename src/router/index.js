import { createRouter, createWebHistory } from 'vue-router'
import SystemOverview from '../views/SystemOverview.vue'
import Logs from '../views/Logs.vue'
import Apm from '../views/Apm.vue'
import Dashboards from '../views/Dashboards.vue'
import DashboardShow from '../views/DashboardShow.vue'
import Alerts from '../views/Alerts.vue'
import QueryAndExplore from '../views/QueryAndExplore.vue'
import Infrastructure from '../views/Infrastructure.vue'
import AddData from '../views/AddData.vue'



const routes = [
  
  {
    path: '/query-and-explore',
    name: 'query_and_explore',
    component: QueryAndExplore
  },{
    path: '/',
    name: 'system_overview_index',
    component: SystemOverview
  },{
    path: '/apm',
    name: 'apm_index',
    component: Apm
  },{
    path: '/dashboards/:id',
    name: 'dashboard/dashboard',
    component: DashboardShow
  },{
    path: '/dashboards',
    name: 'dashboards_index',
    component: Dashboards,
  },{
    path: '/logs',
    name: 'logs',
    component: Logs
  },{
    path: '/alerts',
    name: 'alerts_index',
    component: Alerts
  },{
    path: '/infrastructure',
    name: 'infrastructure_index',
    component: Infrastructure
  },{
    path: '/add-data',
    name: 'add_data_index',
    component: AddData
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
