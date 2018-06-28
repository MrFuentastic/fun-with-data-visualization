<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  import Vue from 'vue/dist/vue.esm';
  import axios from 'axios';
  import VueAxios from 'vue-axios';

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
    }
  }
</script>

<style scoped>
  p {
    font-size: 20px;
    text-align: center;
  }
</style>
