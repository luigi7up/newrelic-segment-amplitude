<template>
  <n-space vertical>
    <n-layout has-sider class="navigation-and-main-wrapper">
    	<n-layout-sider
			bordered
			collapse-mode="width"
			:collapsed-width="80"
			:width="260"
			:collapsed="collapsed"
			show-trigger
					position="static"
			@collapse="collapsed = true"
			@expand="collapsed = false"
			class="app-navigation-wrapper"
		>
			
			<n-switch v-model:value="collapsed" class="menu-switch"/>
			
			<n-menu @update:value="handleUpdateValue"
			:collapsed="collapsed"
			:collapsed-width="64"
			:collapsed-icon-size="22"
			:options="menuOptions"
			v-model:value="activeKey"
			@click="handleClick"
			/>
		</n-layout-sider>
			
		<n-content class="app-main-content-wrapper">
			<breadcrumbs />	
          	<router-view/>
      </n-content>    

    </n-layout>


  </n-space>

</template>

<script>

import {useRouter} from 'vue-router'
import { defineComponent, h, resolveComponent, ref, inject } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { AlertCircleOutline, Analytics, AnalyticsOutline, 
	AppsOutline, BarChartOutline, BookOutline as BookIcon, PersonOutline as PersonIcon, 
	StarOutline, AddOutline, SearchCircleOutline,
	FootstepsOutline, WineOutline as WineIcon, HardwareChipOutline} from '@vicons/ionicons5'
import Breadcrumbs from './Breadcrumbs.vue'




function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
    label: 'Query & Explore',
    key: 'query-and-explore',
	pathName: 'QueryAndExplore',
    icon: renderIcon(SearchCircleOutline)
  },{
    label: 'System overview',
    key: 'system-overview',
		pathName: 'Home',
    icon: renderIcon(AppsOutline)
  },
	{
		label: 'Dashboards',
		icon: renderIcon(BarChartOutline),
		
		children: [
			{
				label: 'Dashboards overview',
				key: 'dashboards',
				pathName: 'DashboardsIndex',
			},
			{
				type: 'group',
				label: 'Favourited dashboards',
				key: 'favourited-dashboards',
				children: [
					{
						label: 'Overall health',
						key: 'Overall health',
						icon: renderIcon(StarOutline),
						pathName: 'DashboardShow',
						param: 'overall-health'
					},
					{
						label: 'Backend services',
						key: 'Backend services',
						icon: renderIcon(StarOutline),
						pathName: 'DashboardShow',
						param: 'backend-sevices'
					},{
						label: 'API endpoints',
						key: 'API endpoints',
						icon: renderIcon(StarOutline),
						pathName: 'DashboardShow',
						param: 'api-endpoints'
					}
				]
			},
			{
				type: 'group',
				label: 'Recently visited',
				children: [
					{
						label: 'Tier 1 services',
						key: 'Tier 1 services',
						param: 'Tier 1 services'
						// icon: renderIcon(StarOutline)
					},
					{
						label: 'Tier 2 services',
						key: 'Tier 2 services',
						param: 'Tier 2 services'
						// icon: renderIcon(StarOutline)
					},{
						label: 'Tier 3 services',
						key: 'Tier 3 services',
						param: 'Tier 3 services'
						// icon: renderIcon(StarOutline)
					}
				]
			},
			
		]
	},{
    label: 'APM',
    key: 'apm',
    icon: renderIcon(FootstepsOutline),
    children: [
        {
            label: 'APM overview',
            key: 'apm',
            pathName: 'Apm',
            // icon: renderIcon(AnalyticsOutline),
        },
        {
            type: 'group',
            label: 'Quick Jump',
            
            children: [
                {
                    label: 'Distributed tracing',
                    key: 'Distributed tracing',
                    // icon: renderIcon(StarOutline)
                },
                {
                    label: 'Transactions',
                    key: 'Transactions',
                    // icon: renderIcon(StarOutline)
                },{
                    label: 'Databases',
                    key: 'Databases',
                    // icon: renderIcon(StarOutline)
                }
            ]
        },
        
    ]
	},{
		label: 'Logs',
		key: 'logs',
		icon: renderIcon(AnalyticsOutline),
		children: [
			{
				label: 'All logs',
				key: 'logs',
				pathName: 'Logs',
				icon: renderIcon(AnalyticsOutline),
			},
			{
				type: 'group',
				label: 'Saved Logs Filters',
				key: 'favourited-logs',
				children: [
					{
						label: 'Only Backend services',
						key: 'logs-only-backend',
						icon: renderIcon(StarOutline)
					},
					{
						label: 'India cluster logs',
						key: 'logs-india',
						icon: renderIcon(StarOutline)
					},{
						label: 'AWS only',
						key: 'logs-aws-only',
						icon: renderIcon(StarOutline)
					}
				]
			},
			
		]},

	{
		label: 'Alerts',
		key: 'alerts',
		pathName: 'Alerts',
    	icon: renderIcon(AlertCircleOutline)
  },{
	  
		label: 'Infrastructure',
		key: 'infrastructure',
		pathName: 'Infrastructure',
		icon: renderIcon(HardwareChipOutline)
  },{
    label: 'More',
    key: 'more',
    icon: renderIcon(AddOutline),
		children: [
			{
				label: 'Mobile',
				key: 'Mobile'
			},
			{
				label: 'Synthetics',
				key: 'Synthetics'
			},
			{
				label: 'AWS Lambda Setup',
				key: 'AWS Lambda Setup'
			},
			{
				label: 'Key Transactions',
				key: 'Key Transactions'
			},
			{
				label: 'Kubernetes',
				key: 'Kubernetes'
			},
			{
				label: 'Lookout',
				key: 'Lookout'
			},
			{
				label: 'Manage Insights data',
				key: 'Manage Insights data'
			},
			{
				label: 'ML Model Monitoring',
				key: 'ML Model Monitoring'
			},
			{
				label: 'Network',
				key: 'Network'
			},
			{
				label: 'Serverless',
				key: 'Serverless'
			},
			{
				label: 'Service Levels',
				key: 'Service Levels'
			},
			{
				label: 'Beta',
				key: 'Beta'
			},
			{
				label: 'Service Maps',
				key: 'Service Maps'
			},
			{
				label: 'Traces',
				key: 'Traces'
			},
			{
				label: 'Workload views',
				key: 'Workload views'
			},
		]
  }
]


export default {
  components: { Breadcrumbs  },
    name: 'Sidebar',
    props: {
        msg: String
    },
    setup(){
        const router = useRouter()			
		const eventsNotification = inject('eventsNotification');
		console.log('Sidebar Setup')
    

        return {
            activeKey: ref(null),
            collapsed: ref(false),
            menuOptions,
			handleClick (a, b){

				

				
			},
            handleUpdateValue (key, item){
				const analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
				console.log("Clicked Main Menu Item" )
				console.dir(analyticsProps)
				
				window.analytics.track('Clicked Main Menu Item', analyticsProps)
				eventsNotification(`Event "Clicked Main Menu Item"`, "Track: Clicked Main Menu Item", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
							
				
				if(item.param){
					router.push({ name: item.pathName, params: { id: item.param } }) // -> /user/eduardo
				}else{
					router.push({ name: item.pathName }) // -> /user/eduardo
				}
				
								

            }
        }
    },
    mounted(){
        // console.log('Sidebar Mounted')
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
