<template>
  <n-space vertical >
    <n-layout has-sider>
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
import { defineComponent, h, resolveComponent, ref } from 'vue'
import { NIcon, useMessage } from 'naive-ui'
import { AlertCircleOutline, Analytics, AnalyticsOutline, 
	AppsOutline, BarChartOutline, BookOutline as BookIcon, PersonOutline as PersonIcon, 
	StarOutline,AddOutline,
	FootstepsOutline, WineOutline as WineIcon} from '@vicons/ionicons5'
import Breadcrumbs from './Breadcrumbs.vue'




function renderIcon (icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions = [
  {
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
				pathName: 'Dashboards',
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
						pathName: 'Dashboards',
						param: 'overall-health'
					},
					{
						label: 'Backend services',
						key: 'Backend services',
						icon: renderIcon(StarOutline),
						pathName: 'Dashboards',
						param: 'backend-sevices'
					},{
						label: 'API endpoints',
						key: 'API endpoints',
						icon: renderIcon(StarOutline),
						pathName: 'Dashboards',
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
						// icon: renderIcon(StarOutline)
					},
					{
						label: 'Tier 2 services',
						key: 'Tier 2 services'
						// icon: renderIcon(StarOutline)
					},{
						label: 'Tier 3 services',
						key: 'Tier 3 services'
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
    label: 'More',
    key: 'more',
    icon: renderIcon(AddOutline),
		children: [
			{
				label: 'More 1',
    		key: 'more1',
			},{
				label: 'More 2',
    		key: 'more2',
			},{
				label: 'More 3',
    		key: 'more3',
			},{
				label: 'More 4',
    		key: 'more4',
			}
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

				console.log('Sidebar Setup')
        
        const message = useMessage()

        return {
            activeKey: ref(null),
            collapsed: ref(true),
            menuOptions,
            handleUpdateValue (key, item){
                message.info(`[onUpdate:value]: Key is ${JSON.stringify(key)}
									Item is ${JSON.stringify(item)}
									pathName is ${JSON.stringify(item.pathName)}
									params is ${JSON.stringify(item.param)}`)
									
								
								router.push({ name: item.pathName })
							
								// console.log(`Navigating to ${item.pathName} `)

            }
        }
    },
    mounted(){
        console.log('Sidebar Mounted')
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    
</style>
