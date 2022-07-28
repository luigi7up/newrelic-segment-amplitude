

  
<template>

    <n-modal
      class="custom-card"
      v-model:show="showModal"
      preset="card"
      :style="modalBodyStyle"
      title="Login"
      :bordered="false"
      size="huge"
     :on-after-leave="handleClosing"
      :modalSegmented="{
        content: 'soft',
        footer: 'soft'
      }"
    >
      
      <template #header-extra>
      </template>
        <n-space class="mb-4">
            This is a fake login that we need to identify all events in Segment / Amplitude Identify
        </n-space>
  




        <n-form ref="formRef" :model="modelRef" :rules="rules" class="cardd">
          
          <n-form-item path="name" label="Name">
            <n-input v-model:value="modelRef.name"
            @keydown.enter.prevent />
          </n-form-item>


          <n-form-item path="email" label="Email">
            <n-input v-model:value="modelRef.email"
            @keydown.enter.prevent />
          </n-form-item>
          
          <n-row :gutter="[0, 24]">
            <n-col :span="24">
              <div style="display: flex; justify-content: flex-end">
                <n-button
                  :disabled="modelRef.age === null"
                  round
                  type="primary"
                  @click="handleValidateButtonClick"
                >
                  Login
                </n-button>
              </div>
            </n-col>
          </n-row>
        </n-form>



        

      <template #footer> </template>
    </n-modal>
</template>




<script>

import { h, defineComponent, ref, inject } from 'vue'
import {useRouter} from 'vue-router'
import {useMessage} from 'naive-ui'

export default defineComponent({
  emits: ["closingloginmodal"],
  setup (props, context ) {

    // Inject the method provided in GlobalWrapper    
    const router = useRouter()
    const eventsNotification = inject('eventsNotification');

    const globalState = inject('globalState');
    
    const formRef = ref(null);
    const modelRef = ref({
      name: null,
      email: null,
    });


    const showModal = ref(true)
    
    
    const handleValidateButtonClick = (e)=> {


      e.preventDefault();

      //TODO remove the path: and use Segment mapping context.page.path to add it to all events!
      let analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: "click",
					ui_position: null,
					target: e.currentTarget.textContent,
					target_friendly: e.currentTarget.textContent,
				}

      window.analytics.track('login/login_button clicked', analyticsProps)
        eventsNotification(`Event "login/login_button clicked"`, "Track: login/login_button clicked", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

      analyticsProps = {
					section: router.currentRoute.value.name,  
					path: router.currentRoute.value.path,
					event_type: "validate",
          msg: "",
					ui_position: null,
          target: null,
					target_friendly: null,
					
				}
      if(!modelRef.value.name){
        message.error("Please provide a name");
        analyticsProps.msg = "Name wasn't provided"
        window.analytics.track('login_validation failed', analyticsProps)
        eventsNotification(`Event "login_validation failed"`, "Track: login_validation failed", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))

      }else if(!modelRef.value.email){ 
        message.error("Please introduce your email");
        analyticsProps.msg = "Email wasn't provided"
         window.analytics.track('login_validation failed', analyticsProps)
        eventsNotification(`Event "login_validation failed"`, "Track: login_validation failed", "Segment.js logged an analytics.track() with these properties: "+ JSON.stringify(analyticsProps))
      }else{

        message.success("Success. You have Logged in");
        
        globalState.value.currentUser.name = modelRef.value.name
        globalState.value.currentUser.email = modelRef.value.email
        globalState.value.currentUser.user_id = "__"+modelRef.value.email.substr(0,8)+"__"

        localStorage.user_name = globalState.value.currentUser.name 
        localStorage.user_email = globalState.value.currentUser.email 
        localStorage.user_id = globalState.value.currentUser.user_id

        showModal.value = false   
    
      }

    }

    const handleClosing = ()=> {
      context.emit('closingloginmodal')
    }

    // const formRef = ref(null)
    const message = useMessage()

    
    return{ 
      formRef,
      modelRef,
      handleValidateButtonClick,
      handleClosing,
      showModal,
      modalBodyStyle: {
        width: '600px'
      },
      modalSegmented: {
        content: 'soft',
        footer: 'soft'
      },
      
    }

  }
})

</script>
