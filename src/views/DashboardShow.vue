<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">Dashboard: {{ subPath }}</h2>

  <div class="section-actions is-pulled-left mb-4">
    <n-space>
      <n-button type="info" @click="handleCreateDashboardClick">New Dashboard</n-button>
    </n-space>
  </div>


  <img src="@/assets/dashboard.png">
  
  

  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>
  import { watch, ref, inject } from '@vue/runtime-core';
  import { useRoute, useRouter } from 'vue-router';
  

  export default {
    props: ['id'],
    
    setup(props){
      
      const subPath = ref("")
      // Inject the method provided in GlobalWrapper
      const eventsNotification = inject('eventsNotification');
      const router = useRouter()
      // const route = useRoute()
      
      subPath.value = router.currentRoute.value.params.id

      // Watch the route changes to pickup update on the the subpath changes
      watch(() => [router.currentRoute.name, router.currentRoute.value.params], () => {
        console.log("DashboardShow watch: "+ router.currentRoute.value.params.id)
        subPath.value = router.currentRoute.value.params.id       
      });

      const handleCreateDashboardClick = (e)=>{
        console.log("Clicked Create a New Dashboard")
        let analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: "click",
					ui_position: "dashboard_index/top",
          target: e.currentTarget.textContent,
          target_friendly: e.currentTarget.textContent,
				}
      
        console.dir(analyticsProps)
        window.analytics.track('dashboard_create_button clicked', analyticsProps)
        eventsNotification(`Event "dashboard_create_button clicked"`, "Track: dashboard_create_button clicked", "Segment.js logged an analytics.track(), event that will show up in Amplitude as dashboard_create_button clicked with these properties: "+ JSON.stringify(analyticsProps))

      }

      return {subPath, handleCreateDashboardClick}
    },
    mounted(){
      console.log("Mounted: DashboardShow")
    }
  }
</script>
