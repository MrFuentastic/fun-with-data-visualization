<template>
  <div id='app'>
    <google-map />
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.esm';
  import axios from 'axios';
  import VueAxios from 'vue-axios';
  import GoogleMap from './GoogleMap'

  Vue.use(VueAxios, axios)

  export default {
    data: function () {
      return {
        message: "asdfasdfasdfadsf",
        potholes: []
      }
    },
    mounted: function() {
      axios.get("https://data.cityofchicago.org/resource/_311-potholes.json")
      .then((response)  =>  {
        this.potholes = response.data
      })
    },
    components: { GoogleMap }
  }
</script>

<style scoped>
  /* p {
    font-size: 20px;
    text-align: center;
  } */

  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
