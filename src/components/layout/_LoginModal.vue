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
            Changing the name and email will log the events in Segment / Amplitude as if you really identified as another user
        </n-space>
        <n-form
            inline
            :label-width="80"
            :model="formValue"
            :rules="rules"
            :size="size"
            ref="formRef"
        >
            <n-form-item label="Name" path="user.name">
            <n-input v-model:value="formValue.user.name" placeholder="Input Name" />
            </n-form-item>
            <n-form-item label="Email" path="user.email">
            <n-input type="email" placeholder="Email" v-model:value="formValue.user.email" />
            </n-form-item>
            
            <n-form-item>
            <n-button @click="handleValidateClick">Save</n-button>
            </n-form-item>
        </n-form>

      <template #footer>Footer </template>
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
    // const router = useRouter()
    const showModal = ref(true)
    
    const handleClosing = ()=> {
        context.emit('closingloginmodal')
    }

    const formRef = ref(null)
    const message = useMessage()

    const handleValidateClick = (e)=>{

        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Invalid')
          }
        })

    } 


    return{
        modalBodyStyle: {
        width: '600px'
      },
      modalSegmented: {
        content: 'soft',
        footer: 'soft'
      },
      handleClosing,
      showModal,
      handleValidateClick,

      formRef,
      size: ref('medium'),
      formValue: ref({
        user: {
          name: '',
          email: ''
        },
        
      }),
      rules: {
        user: {
          name: {
            required: true,
            message: 'Please input your name',
            trigger: 'blur'
          },
          email: {
            required: true,
            message: 'Please input your email',
            trigger: ['input', 'blur']
          }
        },
        
      },
      
    }

  }
})

</script>
