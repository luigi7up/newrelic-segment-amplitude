<template>

  
  <h2 class="title is-4">Add data</h2>

 <p>This is a dummy section. Submit the form and that will log the event of adding data which is one of our business goals</p>   

  <n-form ref="formRef" :model="model" :rules="rules" class="card">
    <n-form-item path="name" label="Entity Name">
      <n-input v-model:value="model.name"
       @keydown.enter.prevent 
       @input="handleNameInput" />
    </n-form-item>

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


      let analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: null,
					ui_position: null,
				}


      return {
        formRef,
        generalOptions,
        model: modelRef,
        handleNameInput() {
          
          },
        handleValidateButtonClick(e) {
          e.preventDefault();

          console.dir(analyticsProps)
            
          analyticsProps['entity_name'] = modelRef.value.name
          analyticsProps['entity_type'] = modelRef.value.type  
          analyticsProps['target'] = e.currentTarget.textContent
          analyticsProps['target_friendly'] = e.currentTarget.textContent  

          window.analytics.track('add_data_form_button clicked', analyticsProps)
            eventsNotification(`Event "add_data_form_button clicked"`, "Track: add_data_form_button clicked", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

          if(!modelRef.value.name){
            message.error("Please provide a name");
            analyticsProps['event_type'] = "validation"
            analyticsProps.msg = "Name wasn't provided"
            window.analytics.track('add_data_validation failed', analyticsProps)
            eventsNotification(`Event "add_data_validation failed"`, "Track: add_data_validation failed", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

          }else if(!modelRef.value.type){ 
            message.error("Please choose the type");
            analyticsProps['event_type'] = "validation"
            analyticsProps.msg = "Type wasn't provided"
            window.analytics.track('add_data_validation failed', analyticsProps)
            eventsNotification(`Event "add_data_validation failed"`, "Track: add_data_validation failed", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
          }else{
            message.success("Success. You have added your entity");
            
            analyticsProps['event_type'] = "response"
            analyticsProps['msg'] = "Data successfully added"
            window.analytics.track('add_data succeded', analyticsProps)
            eventsNotification(`Event "add_data succeded"`, "Track: add_data succeded", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
              
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
