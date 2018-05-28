import Vue from 'vue/dist/vue.esm'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      message: "Can you say hello?",
      potholes: []
    },
    mounted: function() {
      this.axios.get("https://data.cityofchicago.org/resource/_311-potholes.json")
      .then((response)  =>  {
        this.potholes = response.data
      }).bind(this)
    }
  })
})
