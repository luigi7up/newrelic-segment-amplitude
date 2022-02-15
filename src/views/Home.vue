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

   <img src="@/assets/system-overview.png">
  
  
  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import Header from '@/components/Header.vue'
// import Sidebar from '@/components/Sidebar.vue'

  export default {
    name: 'Home',
    components: {

    },
    setup(){},
    mounted(){
      console.log('Analytics: Home')
      //window.analytics.page('Visited Home')
    }
  }
</script>
