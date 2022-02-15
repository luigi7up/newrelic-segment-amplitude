<template>
  <header class="app-header-wrapper ">
    <router-link to="/" title="Home">
      <div class="logo">
        <img src="@/assets/logo.png">
      </div>
    </router-link>
    
    <HeaderAccountSwitcher  class="account-switcher" />

    <HeaderSearch  class="global-search" />
    
    <HeaderUserMenu class="user-menu" />

  </header>
</template>

<script>
 
import HeaderUserMenu from './HeaderUserMenu.vue'
import HeaderSearch from './HeaderSearch.vue'
import HeaderAccountSwitcher from './HeaderAccountSwitcher.vue'

export default {
  components: { HeaderUserMenu, HeaderSearch, HeaderAccountSwitcher  },
  name: 'Header',
  props: {
    msg: String
  },
  setup(){
    return {
      handleClosingLoginModal: ()=>{
        debugger;
      }  
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  header{
    display: flex;
    align-items: center;
    // justify-content: flex-start;
    //flex-wrap: wrap;
    padding: 0 2rem 0 1rem;
  }
  .logo{
    
    margin-right: 1rem;
    height: auto;
    width: 3rem;

    img{
      width: 100%;
      transition-property: width;
      transition-duration: .15s;
      &:hover{
        width: 90%;

      }

    }



    img{
      width: 100%;
    }
  }   
  .user-menu{
    margin-left: auto;
    // order: 1;
  } 
  .header-search{
        max-width: 320px;
        margin-right: auto;
    }
</style>
