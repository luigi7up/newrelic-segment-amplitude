<template>

  
  <h2 class="title is-4">Dashboards</h2>

  <div class="section-actions is-pulled-right mb-4">
    <n-space>
      <n-button type="info" @click="handleCreateDashboardClick">New Dashboard</n-button>
    </n-space>

  </div>


  <img src="@/assets/dashboards-all.png">
  
  <p>
    Logs Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum, laborum. Logs Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias veniam, repellat quidem minima iste nobis voluptatem laudantium itaque. Sunt, eos.
  </p>
  <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates tenetur aut repellat ab nam laborum cupiditate architecto quisquam quod maiores quibusdam error velit, eaque quidem perferendis veniam ea minus modi nihil veritatis delectus impedit, quae corporis! Commodi aut reprehenderit fugiat suscipit esse ratione, doloribus ut consequuntur illo saepe amet fuga eveniet. Debitis similique aspernatur labore, obcaecati hic officiis voluptatem fugiat id sit odio, aut pariatur, officia velit sapiente possimus iure alias in dolores doloremque expedita! Alias aliquid id corrupti molestias quidem, blanditiis quaerat voluptatem cum recusandae, ut dicta aut facilis nesciunt dignissimos, libero eos eveniet quasi architecto quibusdam nihil. Esse veniam eum harum repellendus sequi sit eligendi illo! Libero praesentium vitae tempore adipisci architecto error deserunt obcaecati excepturi quisquam voluptas? Nostrum voluptates repudiandae debitis, at, ipsum qui ex maiores ducimus, consequatur eaque amet provident autem! Adipisci saepe ex, nihil architecto, veritatis minus corrupti harum commodi nesciunt molestiae, hic itaque enim dolor ullam sunt ipsum. Esse sapiente perspiciatis eligendi cum deleniti velit quasi voluptates sunt laborum aperiam assumenda nam quae earum officiis, libero nisi rerum voluptate odit ipsa quidem sequi provident. Nulla deleniti quibusdam deserunt asperiores sint, atque incidunt itaque dolore expedita, ut corporis dignissimos harum libero, nobis architecto necessitatibus voluptatum magnam reiciendis earum! Suscipit facilis eum alias commodi maiores beatae animi dignissimos ad placeat voluptatem quisquam, amet repudiandae sint eaque dolore laborum reprehenderit voluptas distinctio repellat? Quibusdam earum blanditiis itaque assumenda natus, provident voluptas quos modi esse numquam aliquam perferendis reiciendis suscipit soluta eligendi ut non officia recusandae harum voluptate.
  </p>
  

  
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <Header />
    <Sidebar /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  
</template>

<script>

  

  import { inject } from 'vue'
  import { useRouter } from 'vue-router'

  export default {
    props: ['id'],
    setup(props){
      
      // Inject the method provided in GlobalWrapper
      const eventsNotification = inject('eventsNotification');
      const router = useRouter()

      const handleCreateDashboardClick = ()=>{
        console.log("Clicked Create a New Dashboard")
        const analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
      
        console.dir(analyticsProps)
        window.analytics.track('Clicked Create Dashboard', analyticsProps)
        eventsNotification(`Event "Clicked Create Dashboard"`, "Track: Clicked Create Dashboard", "Segment.js logged an analytics.track(), event that will show up in Amplitude as Clicked Create Dashboard with these properties: "+ JSON.stringify(analyticsProps))

      }
      return {
        handleCreateDashboardClick
      }
      
    },
    mounted(){
      console.log("Mounted: Dashboards")

    }
  }
</script>
