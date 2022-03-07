<template>

  
  <h2 class="title is-4">Add data</h2>

 <p>This is a dummy section. Submit the form and that will log the event of adding data which is one of our business goals</p>   

  <n-form ref="formRef" :model="model" :rules="rules" class="card">
    <n-form-item path="name" label="Entity Name">
      <n-input v-model:value="model.name"
       @keydown.enter.prevent 
       @input="handleNameInput" />
    </n-form-item>
    
    
    
    <!-- <n-form-item path="type" label="Entity type">
      <n-input
        v-model:value="model.type"
        type="text"/>
    </n-form-item> -->

    <n-form-item path="type" label="Entity type">
      <n-select
        v-model:value="model.type"
        placeholder="Select"
        :options="generalOptions"
      />
    </n-form-item>
    
    <n-row :gutter="[0, 24]">
      <n-col :span="24">
        <div style="display: flex; justify-content: flex-end">
          <n-button
            :disabled="model.age === null"
            round
            type="primary"
            @click="handleValidateButtonClick"
          >
            Finish adding
          </n-button>
        </div>
      </n-col>
    </n-row>
  </n-form>
  

</template>

<script>


import { defineComponent, ref, inject } from "vue";
import {useRouter} from 'vue-router'
import { useMessage } from "naive-ui";


 export default {

   
   
   setup(){ 
      
      const router = useRouter();			
      const eventsNotification = inject('eventsNotification');


      const formRef = ref(null);
      const message = useMessage();
      const modelRef = ref({
        name: null,
        type: null,
      });

      const generalOptions = ['Backend Service', 'Browser Application', 'Mobile APP', 'Host'].map(
        (v) => ({
          label: v,
          value: v
        })
      )


      let analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}


      return {
        formRef,
        generalOptions,

        model: modelRef,
        handleNameInput() {
          
          },
        handleValidateButtonClick(e) {
          e.preventDefault();

          // let analyticsProps = {pathName: router.currentRoute.value.name,  path: router.currentRoute.value.path}
          console.dir(analyticsProps)
            
          analyticsProps['entityName'] = modelRef.value.name
          analyticsProps['entityType'] = modelRef.value.type  

          window.analytics.track('User Clicked Added Data', analyticsProps)
            eventsNotification(`Event "User Clicked Added Data"`, "Track: User Clicked Added Data", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

          if(!modelRef.value.name){
            message.error("Please provide a name");

          }else if(!modelRef.value.type){ 
            message.error("Please choose the type");
          }else{
            message.success("Success. You have added your entity");
            

            window.analytics.track('User Added Data', analyticsProps)
            eventsNotification(`Event "User Added Data"`, "Track: User Added Data", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
              
          }
        }
      };

    },
    mounted(){
      console.log('Mounted: Add Data ')
      console.log("Serving the ab test - "+localStorage.ab_test_version)
      // window.analytics.page('Visited Explore & Query')
    }
  }
</script>
