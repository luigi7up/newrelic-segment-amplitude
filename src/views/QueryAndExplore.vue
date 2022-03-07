<template>
  <!-- <div class="tabs">
    <ul>
      <li class="is-active"><a>Services (BE)</a></li>
      <li><a>Browser (FE)</a></li>
      <li><a>Network</a></li>
      <li><a>Antother thing</a></li>
    </ul>
  </div> -->
  
  <h2 class="title is-4">Query and explore your data</h2>
  <img src="@/assets/query.png">
  
  <p>
    Query...
  </p>
  
</template>

<script>



 export default {
  
    setup(){


    },
    mounted(){
      console.log('Mounted: Query Builder')
      console.log("Serving the ab test - "+localStorage.ab_test_version)
      // window.analytics.page('Visited Explore & Query')
    }
  }
</script>
