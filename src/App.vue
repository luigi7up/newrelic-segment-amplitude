
<template>
  <n-loading-bar-provider>
    <n-message-provider>
      <n-notification-provider placement="bottom-right">
        <n-dialog-provider>
          
          <GlobalWrapperComponent />

        </n-dialog-provider>
      </n-notification-provider>
    </n-message-provider>
  </n-loading-bar-provider>

</template>


<script>
// @ is an alias to /src

import GlobalWrapperComponent from '@/components/layout/GlobalWrapperComponent.vue'
import {ref, provide, watch} from 'vue'


export default {
  name: 'App',
  components: {
    GlobalWrapperComponent

  },
  setup() {
    
    const globalState = ref(null)

    globalState.value = {

      users: [
        { name: "Michael", email: "michael@theoffice.com", id: "michael123" , ab_tests: {test_remove_console: "verA", test_no_paywall: "verB"} },
        { name: "Dwigth", email: "dwight@theoffice.com", id: "dwight123", ab_tests: {test_remove_console: "verB", test_no_paywall: "verA"} },
        { name: "Andy", email: "andy@theoffice.com", id: "andy123", ab_tests: {test_remove_console: "verB", test_no_paywall: "verA"} },
        { name: "Angela", email: "angela@theoffice.com", id: "angela123", ab_tests: {test_remove_console: "verB", test_no_paywall: "verB"} },
      ],
      currentUser: null
    }

    provide('globalState', globalState)    

  },  
}


</script>



<style lang="scss">

</style>
