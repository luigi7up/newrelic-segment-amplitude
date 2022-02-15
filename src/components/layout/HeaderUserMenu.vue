
<template>

    <LoginModal v-if="isModalShown" :isModalShown="isModalShown" @closingloginmodal="handleclosing" /> 
      
    <n-dropdown
      :options="menuOptions"
      placement="bottom-start"
      trigger="click"
      size="medium"
      @select="handleSelect"
    >
      <n-button text 
        @click="handleButtonClick">
        <n-badge value="12">
          <n-avatar
            round
            size="medium"
            src="https://cdn.costumewall.com/wp-content/uploads/2018/09/prison-mike.jpg"
          />
        </n-badge>
      </n-button>
      

  </n-dropdown>

</template>

<script>

import { h, defineComponent, inject, ref } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PowerOutline as PowerIcon,
  NewspaperOutline as NewsIcon,
} from '@vicons/ionicons5'

import { useRouter } from 'vue-router'
import LoginModal from './LoginModal.vue'


const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export default defineComponent({
  components: {
    LoginModal
  },
  setup () {

    // Inject the method provided in GlobalWrapper
    const eventsNotification = inject('eventsNotification');
    const globalState = inject('globalState');
    const router = useRouter()
    const isModalShown = ref(false) 

    const handleDropdownClick = ()=>{
      console.log("Clicked Dropdown")
    }
    
    const handleButtonClick = ()=>{
      const analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
      console.log("Clicked User Avatar" )
      console.dir(analyticsProps)
      console.dir("Current user:")
      console.log(globalState.value.currentUser)
      window.analytics.track('Clicked User Avatar', analyticsProps)
      eventsNotification(`Event "Clicked User Avatar"`, "Track: Clicked User Avatar", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
    }

    const handleSelect = (key, item)=>{

      if(key=="my-profile"){
        isModalShown.value = true
      }

      const analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path, optionSelected: key}
      console.log("Selected User Menu Item" )
      console.dir(analyticsProps)
      window.analytics.track('Selected User Menu Item', analyticsProps)
      eventsNotification(`Event "Selected User Menu Item"`, "Track: Selected User Menu Item", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
    }

    const handleclosing = ()=>{
      isModalShown.value = false
    }

    const menuOptions =  [
      {
        label: 'My Profile',
        key: 'my-profile',
        icon () {
          return h(NIcon, null, {
            default: () => h(UserIcon)
          })
        },
      },{
        label: "What's new",
        key: 'whats-new',
        icon () {
          return h(NIcon, null, {
            default: () => h(NewsIcon)
          })
        },
      },{
          type: 'divider',
          key: 'd1'
        },
        {
        label: 'API keys',
        key: 'api',       
      },
      {
        label: 'Invite the team',
        key: 'invite team'
      },
      {
        label: 'Account management',
        key: 'others1',
        children: [
          {
            label: 'Account overview',
            key: 'account-overview'
          },{
            label: 'Billing and Invoices',
            key: 'billing'
          },
          {
            label: 'Data consumption',
            key: 'data'
          },
          {
            label: 'Mange the plan',
            key: 'plan',
            
            
          }
        ]
      },{
        label: 'Logout',
        key: 'logout',
        icon () {
          return h(NIcon, null, {
            default: () => h(PowerIcon)
          })
        },
      },
    ]

    return {
      handleDropdownClick,
      handleButtonClick,
      menuOptions,
      handleSelect,
      isModalShown,
      handleclosing
    }
  }
})
</script>