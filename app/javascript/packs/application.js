import Vue from 'vue/dist/vue.esm'
import axios from 'axios'

document.addEventListener('DOMContentLoaded', () => {
  const app = new Vue({
    el: '#app',
    data: {
      message: "Can you say hello?",
      potholes: []
    },
    mounted: function() {
      // $.get("https://data.cityofchicago.org/resource/_311-potholes.json").success(
      //   function(response) {
      //     console.log(this);
          // response.forEach(function(lead) {
          //   lead.showEvents = false;
          // });
          // this.potholes = response;
          // this.leads = _.orderBy(this.leads, ["most_recent_event"], ["desc"]);
        // }.bind(this)
      // );
      this.loading = true;
      axios.get("https://data.cityofchicago.org/resource/_311-potholes.json")
      .then((response)  =>  {
        this.loading = false;
        this.potholes = response.data.value;
        console.log(this.potholes);
      }, (error)  =>  {
        this.loading = false;
      })
    }
  })
})
