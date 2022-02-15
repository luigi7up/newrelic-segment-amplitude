
<template>
  
  <div class="body-wrapper">
   
    <AppHeader />            
    
    <AppNavigation />              
    
  </div>

</template>


<script>

import { useRoute } from 'vue-router';
import { h, watch } from 'vue';
import { useNotification, NAvatar } from "naive-ui";
import { provide, inject } from 'vue';

import AppHeader from '@/components/layout/AppHeader.vue'
import AppNavigation from '@/components/layout/AppNavigation.vue'


export default {
  name: 'GlobalWrapperComponent',
  components: {    
    AppHeader,
    AppNavigation,
  },
  setup() {
    const route = useRoute();
    
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

    // Watch the route changes and log those Page events
    watch(() => [globalState.value.currentUser], () => {
      console.log("Watch - globalState.value.currentUser changed")
      
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify
      // analytics.identify([userId], [traits], [options], [callback]);
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#managing-data-flow-with-the-integrations-object
      // You can pass an integrations object in the options of Alias, Group, Identify, Page, and Track methods 
      // to send data to only the selected destinations. By default, all Destinations are enabled.

      window.analytics.identify(globalState.value.currentUser.id, {
        name: globalState.value.currentUser.name,
        email:  globalState.value.currentUser.email,
        ab_test: globalState.value.currentUser.ab_tests,
      },{
          integrations: {
            "Actions Amplitude": {
              session_id: 1644915970111
            },"Amplitude": {
              session_id: 1644915970111
            }
          }
      });

      console.log("Identifying as")
      console.log(globalState.value.currentUser.id)
      console.log(globalState.value.currentUser.name)
      console.log(globalState.value.currentUser.email)
      console.log(globalState.value.currentUser.ab_tests)

      eventsNotification(`Special event "Identify"`, "This is the identify event provided by Segment that sets the userId and maps it to the anonymous id. User was identified as "+globalState.value.currentUser.id, "")

      window.analytics.track("User Logged In", {}, 
        {
          integrations: {
            "Actions Amplitude": {
              session_id: 1644915970111
            },"Amplitude": {
              session_id: 1644915970111
            }
          }
      })

      eventsNotification(`Event "User Logged In"`, "Logged in as "+globalState.value.currentUser.id, "")
      

      
    });
    
    //As the app loads identify as the user[0]
    globalState.value.currentUser = globalState.value.users[0]


    
    
    return { route, eventsNotification };

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
