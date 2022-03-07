
<template>
  
  <div class="body-wrapper">
   
    <AppHeader />

     <LoginModal v-if="isModalShown" :isModalShown="isModalShown" @closingloginmodal="handleclosing" />             
    
    <AppNavigation />              
    
  </div>

</template>


<script>

import { useRoute } from 'vue-router';
import { h, watch, ref } from 'vue';
import { useNotification, NAvatar } from "naive-ui";
import { provide, inject } from 'vue';

import AppHeader from '@/components/layout/AppHeader.vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'
import LoginModal from '@/components/layout/LoginModal.vue'

export default {
  name: 'GlobalWrapperComponent',
  components: {    
    AppHeader,
    AppNavigation,
    LoginModal  
  },
  setup() {
    const route = useRoute();
    const isModalShown = ref(false) 

    if(!localStorage.user_name || !localStorage.user_email || !localStorage.user_id ){
      isModalShown.value = true
    }

    console.debug(`current route name on component setup init: ${route.name}`);

  
    // Define a global method that can be injected
    const notification = useNotification();
    const eventsNotification = (eventName, eventDescription, payload)=> {                 
        notification.create({
            title: eventName,
            description: eventDescription,
            content: payload,
            duration: 8000,
            placement: "bottom-right",
            avatar: () => h(NAvatar, {
                size: "small",
                round: true,
                src: "https://media.glassdoor.com/sqll/909045/segment-squarelogo-1563291350562.png"
            })
            
        });
    } // global function
    
    provide('eventsNotification', eventsNotification)  
    
    const globalState = inject('globalState');
    
    // Watch the route changes and log those Page events
    watch(() => [route.name, route.params], () => {
     
      console.log('Route Name Changed: '+route.name)
      console.log('Route Params:' )
      console.dir(route.params)
      //All .page() events will show up with the name prefixed with "Viewed" in Amplitude
      // analytics.page([category], [name], [properties], [options], [callback]);
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#page
      window.analytics.page(route.name)
      eventsNotification(`Event "Viewed ${route.name}"`, "Page event: Viewed "+route.name, "Segment.js logged an analytics.page() event that will show up in Amplitude as Viewed "+route.name, "")
          
    });

    
    watch(() => [globalState.value.currentUser.user_id], () => {
      console.log("Watch - globalState.value.currentUser changed")
      
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify
      // analytics.identify([userId], [traits], [options], [callback]);
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#managing-data-flow-with-the-integrations-object
      // You can pass an integrations object in the options of Alias, Group, Identify, Page, and Track methods 
      // to send data to only the selected destinations. By default, all Destinations are enabled.

      window.analytics.identify(globalState.value.currentUser.user_id, {
        name: globalState.value.currentUser.name,
        email:  globalState.value.currentUser.email,
        ab_test_name: localStorage.ab_test_name,
        ab_test_version: localStorage.ab_test_version

      });

      console.log("Identifying as")
      console.log(globalState.value.currentUser.user_id)
      console.log(globalState.value.currentUser.name)
      console.log(globalState.value.currentUser.email)
      console.log("AB test is "+localStorage.ab_test_name)
      console.log("AB test version is "+localStorage.ab_test_version)

      window.analytics.track('User Successfully Logged In')

      eventsNotification(`Special event "Identify" was fired`, "This is the identify event provided by Segment that sets the userId and maps it to the anonymous id. User was identified as "+globalState.value.currentUser.id+" and the AB TEST IS "+localStorage.ab_tests, "")
      eventsNotification(`Event "User Logged In"`, "Logged in as "+globalState.value.currentUser.user_id, "")
      
    });
    
    return { route, eventsNotification, isModalShown };

  },
}








</script>



<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
