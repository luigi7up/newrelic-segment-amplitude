<template>
  <n-dropdown trigger="hover" @select="handleSelect" :options="options">
    <n-button icon-placement="right"  class= "mr-4">
      {{currentAccount}}
      
      <template #icon>
        <n-icon>
          <chevron-down-outline-icon />
        </n-icon>
      </template>

    </n-button>
  </n-dropdown>
</template>

<script>
import { defineComponent, ref, inject } from 'vue'
import { useMessage } from 'naive-ui'
import { useRouter } from 'vue-router'

import { ChevronDownOutline as ChevronDownOutlineIcon } from '@vicons/ionicons5'

export default defineComponent({


  name: 'HeaderAccountSwitcher',
  components: {    
    ChevronDownOutlineIcon,
  },


  setup () {
    const message = useMessage()
    const currentAccount = ref('IBM Main (988181)')

    // Inject the method provided in GlobalWrapper
    const eventsNotification = inject('eventsNotification');

    const router = useRouter()

    return {
      options: [
        {
          label: 'IBM Main (988181)',
          key: 'IBM Main (988181)',
          disabled: true
        },
        {
          label: 'IBM EU (122381)',
          key: 'IBM EU (122381)',
          disabled: false
        },{
          label: 'IBM Staging (138131)',
          key: 'IBM Staging (138131)',
          disabled: false
        },{
          label: 'IBM ASIA (148151)',
          key: 'IBM ASIA (148151)',
          disabled: false
        },{
          label: 'IBM US (188191)',
          key: 'IBM US (188191)',
          disabled: false
        }
      ],
      currentAccount,
      handleSelect (key, item) {
        message.info(`You switched to the account ${key}`)   
        currentAccount.value = key   

        const analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: "click",
					ui_position: "sidebar/main_menu",
					target: item.key,
					target_friendly: item.label
				}
        
        console.dir(analyticsProps)
        
        window.analytics.track('account changed', analyticsProps)
        eventsNotification(`account changed`, "Track: account changed", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

      }
    }
  }
})
</script>