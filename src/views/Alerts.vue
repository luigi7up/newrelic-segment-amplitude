<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">Alerts Overview</h2>


  <div class="section-actions is-pulled-left mb-4">
    <n-space>
      <n-button type="info" @click="handleCreateAlertClick">New Alert</n-button>
    </n-space>

  </div>
  
  <img src="@/assets/alerts.png">
  
  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>
import { useRouter } from 'vue-router'  
import {inject} from 'vue'
 export default {
  
    setup(){

      // Inject the method provided in GlobalWrapper
      const eventsNotification = inject('eventsNotification');
      const router = useRouter()

      const handleCreateAlertClick = (e)=>{
        console.log("alert_create_button clicked")
        let analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: "click",
					ui_position: null,
          target: e.currentTarget.textContent,
          target_friendly: e.currentTarget.textContent,
				}
      
        console.dir(analyticsProps)
        window.analytics.track('alert_create_button clicked', analyticsProps)
        eventsNotification(`Event "alert_create_button clicked"`, "Track: alert_create_button clicked", "Segment.js logged an analytics.track(), event that will show up in Amplitude as Clicked Create Dashboard with these properties: "+ JSON.stringify(analyticsProps))

      }
      return {
        router, handleCreateAlertClick
      }
    },
    mounted(){
      console.log('Mounted: Alerts')
      // window.analytics.page('Visited Alerts')
    }
  }
</script>
