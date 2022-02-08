


<template>
  <n-dropdown :options="options"
    placement="bottom-start"
    trigger="click"
    size="medium">

    <n-button text>
      <n-badge value="999+">
    

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
import { h, defineComponent } from 'vue'
import { NIcon } from 'naive-ui'
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon
} from '@vicons/ionicons5'

const renderIcon = (icon) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

export default defineComponent({
  setup () {
    return {
      options: [
        {
          label: 'Profile',
          key: 'profile',
          icon: renderIcon(UserIcon)
        },
        {
          label: 'Edit Profile',
          key: 'editProfile',
          icon: renderIcon(EditIcon)
        },
        {
          label: 'Logout',
          key: 'logout',
          icon: renderIcon(LogoutIcon)
        }
      ]
    }
  }
})
</script>