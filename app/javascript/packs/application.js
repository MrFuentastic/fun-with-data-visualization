import Vue from 'vue/dist/vue.esm';
import App from '../App';
import * as VueGoogleMaps from 'vue2-google-maps';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyAPS5qSVhyfMJmwFLyh_MAI9UnwVA4Izvo",
    libraries: "places" // necessary for places input
  }
});

document.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#app',
    components: { App }
  })
})
