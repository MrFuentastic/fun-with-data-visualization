<template>
  <div id='app'>
    <div v-if="dataLoaded">
      <google-map :potholes="potholeData"></google-map>
    </div>
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
        potholeData: [],
        dataLoaded: false
      }
    },

    mounted: function() {
      this.getPotholeData();
    },

    methods: {
      getPotholeData() {
        axios.get("https://data.cityofchicago.org/resource/_311-potholes.json")
        .then((response)  =>  {
          this.potholeData = response.data
          this.dataLoaded = true
        })
      }
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
