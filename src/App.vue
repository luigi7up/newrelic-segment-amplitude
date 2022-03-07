
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
      currentUser: { name: "", email: "", user_id: "" }
    }

    // AB test setup
    if(localStorage.ab_test_name){ 
      globalState.value.ab_test_name = localStorage.ab_test_name
      globalState.value.ab_test_version = localStorage.ab_test_version
    }else{
      let num = Math.random() // returns 0 - 0.99
      let version = num < 0.5 ? "control" : "new-version"
      localStorage.ab_test_name = "add-data"
      localStorage.ab_test_version = "add-data--"+version
      globalState.value.ab_test_name = "add-data"
      globalState.value.ab_test_version = "add-data--"+version

    }
    
    

    provide('globalState', globalState)    

  },  
}


</script>



<style lang="scss">

</style>
