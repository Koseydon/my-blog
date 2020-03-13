<template>
  <v-app>
    <div></div>
    <navbar/>
    <v-content class="mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import navbar from './components/navbar';

  export default {
    name: 'App',

    components: {
      navbar
    },

    watch: {
      '$route'(to) {
        document.title = to.meta.title || 'Your Website'
      }
    },

    data: () => ({
      //
    }),
  };
</script>

<style>
  
  #app {
    background-color: #f4f8fb;
    background-image: url(http://waos.ovh/content/backgrounds/waos-catalina/15.jpg);
    background-size:     100% 500px;
    background-repeat:   no-repeat;
    background-position: center top;
  }

</style>