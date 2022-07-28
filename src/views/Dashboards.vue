<template>

  
  <h2 class="title is-4">Dashboards</h2>

  <div class="section-actions is-pulled-left mb-4">
    <n-space>
      <n-button type="info" @click="handleCreateDashboardClick">New Dashboard</n-button>
    </n-space>
  </div>


  <img src="@/assets/dashboards-all.png">
  
  <p>
    Our dashboards are so cool Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit aperiam assumenda vero culpa repellendus ipsam ullam veritatis explicabo inventore libero, officia rerum exercitationem est ipsa reiciendis necessitatibus quidem, accusantium nostrum nisi a suscipit natus voluptatibus. A beatae esse quisquam corporis cumque eligendi cupiditate, laborum doloribus vero non iste distinctio magnam quasi incidunt alias asperiores aliquid cum quos aliquam molestiae suscipit provident? Quam quisquam labore suscipit minima quod distinctio aspernatur officia aliquam nobis voluptates. Nulla alias nostrum laboriosam quaerat, voluptates neque quod, deserunt optio eos accusantium nemo. Nesciunt dolorum, enim eligendi soluta nostrum sint officiis quidem laboriosam, omnis, sit perspiciatis. Delectus? 
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
      return {
        handleCreateDashboardClick
      }
      
    },
    mounted(){
      console.log("Mounted: Dashboards")

    }
  }
</script>
