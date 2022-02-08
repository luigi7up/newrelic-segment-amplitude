<template>
  <header class="app-header-wrapper ">
    <div class="logo">
      <img src="@/assets/logo.png">
    </div>
    <HeaderUserMenu class="user-menu" />
  </header>
</template>

<script>
 
import HeaderUserMenu from './HeaderUserMenu.vue'

export default {
  components: { HeaderUserMenu  },
  name: 'Header',
  props: {
    msg: String
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
    
    margin-right: auto;

    height: 3rem;
    width: 3rem;

    img{
      width: 100%;
    }
  }   
  .user-menu{
    margin-left: auto;
    // order: 1;
  } 
</style>
