
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
      // All .page() events will show up with the suffix "viewed" in Amplitude because of the mapping
      // setup in Segment
      window.analytics.page(route.name, {section: route.name, event_type: "view"})
      eventsNotification(`Event "${route.name} viewed"`, "Page event: "+route.name+" viewed", "Segment.js logged an analytics.page() event that will show up in Amplitude as Viewed "+route.name, "")
          
    });

    
    watch(() => [globalState.value.currentUser.user_id], () => {
      console.log("Watch - globalState.value.currentUser changed")
      
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#identify
      // analytics.identify([userId], [traits], [options], [callback]);
      // https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/#managing-data-flow-with-the-integrations-object
      // You can pass an integrations object in the options of Alias, Group, Identify, Page, and Track methods 
      // to send data to only the selected destinations. By default, all Destinations are enabled.

      let groupId;
      let groupName;
      let groupTotalUsers;
      let groupAssociatedAccounts;
      
      //Identify the user's group
      //Assign on euser group or the other depending on if the email starts with letters a-m or not
      if(/^[a-g]/.test(globalState.value.currentUser.email)){
        groupId = "org_1_id"
        groupName = "Dunder Miflin org1"
        groupTotalUsers = 32
        groupAssociatedAccounts = [111,222,333]
      }else if(/^[h-o]/.test(globalState.value.currentUser.email)){
        groupId = "org_2_id"
        groupName = "Starbucks org2"
        groupTotalUsers = 11
        groupAssociatedAccounts = [22,122,23]
      }else {
        groupId = "org_3_id"
        groupName = "Starbucks org3"
        groupTotalUsers = 11
        groupAssociatedAccounts = [20,9,1983]
      }
      
      analytics.group(groupId, {
        ORG_NAME: groupName,
        ORG_TOTAL_USERS: groupTotalUsers,
        ORG_ASSOCIATED_ACCOUNTS: groupAssociatedAccounts
      });

      console.log("Group identify as")
      eventsNotification(`Special event "Group" was fired`, "This is the group identify event provided by Segment that sets the userId and maps it to the anonymous id. User was identified as "+groupId, "")

      console.log("groupId "+groupId)
      console.log("groupName "+groupName)
      console.log("groupTotalUsers "+groupTotalUsers)
      console.log("groupAssociatedAccounts "+groupAssociatedAccounts)

      //Identify the user
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
      eventsNotification(`Special event "Identify" was fired`, "This is the identify event provided by Segment that sets the userId and maps it to the anonymous id. User was identified as "+globalState.value.currentUser.id+" and the AB TEST IS "+localStorage.ab_tests, "")

  

      window.analytics.track('user logged_in')
      eventsNotification(`Event "user logged_in"`, "Logged in as "+globalState.value.currentUser.user_id, "")

      
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
