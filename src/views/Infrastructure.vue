<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">Infrastructure</h2>
  <img src="@/assets/infrastructure.png">
  
  <p>
    Logs Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, laborum. Logs Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veniam, repellat quidem minima iste nobis voluptatem laudantium itaque. Sunt, eos.
  </p>
  
  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>

  import { useRoute } from 'vue-router';

  export default {
    props: ['id'],
    setup(props){
      const route = useRoute()
      return {subPath: route.params.id}
      
    },
    mounted(){
      console.log("Mounted: Infrastructure")
      // const router = useRoute()
      // console.log('Analytics: Dashboards')
      // window.analytics.page('Visited Dashboards')
      // return {subPath: router.path}
    }
  }
</script>
