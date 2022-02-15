<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">Dashboard {{ subPath }}</h2>
  <img src="@/assets/dashboard.png">
  
  

  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>
  import { watch, ref } from '@vue/runtime-core';
  import { useRoute } from 'vue-router';
  

  export default {
    props: ['id'],
    
    setup(props){
      
      const subPath = ref("")
      const route = useRoute()

      subPath.value = route.params.id

      // Watch the route changes to pickup update on the the subpath changes
      watch(() => [route.name, route.params], () => {
        console.log("DashboardShow watch: "+ route.params.id)
        subPath.value = route.params.id       
      });
      return {subPath}
    },
    mounted(){
      console.log("Mounted: DashboardShow")
    }
  }
</script>
