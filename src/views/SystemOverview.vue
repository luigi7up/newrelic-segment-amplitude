<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">System overview</h2>

  <div class="section-actions is-pulled-left mb-4">
    <n-space>
      <n-button type="info" @click="handleAddDataClick">Add data</n-button>
    </n-space>
  </div>
  
  <img src="@/assets/system-overview.png">
  
  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>
  import {inject} from 'vue'
  import {useRouter} from 'vue-router'

  export default {
    name: 'SystemOverview',
    components: {

    },
    setup(){

      // Inject the method provided in GlobalWrapper
      const eventsNotification = inject('eventsNotification');
      const router = useRouter()

      const handleAddDataClick = ()=>{
        console.log("Clicked Add Data")
        const analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
      
        console.dir(analyticsProps)
        window.analytics.track('Clicked Add Data', analyticsProps)
        eventsNotification(`Event "Clicked Add Data"`, "Track: Clicked Add Data", "Segment.js logged an analytics.track(), event that will show up in Amplitude as Clicked Add Data with these properties: "+ JSON.stringify(analyticsProps))

      }
      return {
        router, handleAddDataClick
      }
    },
    mounted(){
      console.log('Analytics: SystemOverview')
      //window.analytics.page('Visited SystemOverview')
    }
  }
</script>
