

  

<template>


    <n-modal
      class="custom-card"
      v-model:show="showModal"
      preset="card"
      :style="modalBodyStyle"
      title="Change the current user"
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
            By changing the user Segment / Amplitude will identify all subsequent events as coming from this new user
        </n-space>
  
        <n-dropdown trigger="click" @select="handleSelect" :options="dropDownOptions">
            <n-button> Current: {{currentUser}} </n-button>
        </n-dropdown>

      <template #footer> </template>
    </n-modal>
</template>




<script>

import { h, defineComponent, inject, ref } from 'vue'
import {useMessage} from 'naive-ui'

export default defineComponent({
  emits: ["closingloginmodal"],
  setup (props, context ) {

    // Inject the method provided in GlobalWrapper
    const eventsNotification = inject('eventsNotification');
    const globalState = inject('globalState');

    const currentUser = ref(globalState.value.currentUser.name)
    
    const dropDownOptions = globalState.value.users.map((user) => { 
        return{
            label: user.name, 
            key: user.id
        }
    })

    

    // const router = useRouter()
    const showModal = ref(true)
    

    const handleSelect = (key, item)=> {

        globalState.value.users.find((element, index) => { 
            
            if(element.id == key){
                globalState.value.currentUser = globalState.value.users[index]
                currentUser.value = globalState.value.currentUser.name
                
            }
        })
        

    }

    const handleClosing = ()=> {
        context.emit('closingloginmodal')
    }

    // const formRef = ref(null)
    const message = useMessage()

    
    return{

    currentUser, 
    dropDownOptions,   
    handleClosing,
    showModal,
    handleSelect,
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
