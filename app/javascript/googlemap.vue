<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarkers">Add</button>
      </label>
      <br/>

    </div>
    <br>
    <gmap-map
      :center="center"
      :zoom="11"
      style="width:100%;  height: 600px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="m.icon"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>


  export default {
    name: 'GoogleMap',
    data: function () {
      return {
        center: { lat: 41.870, lng: -87.649 },
        markers: []
      }
    },

    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },
      addMarkers() {
        this.potholes.map(ph => 
          this.markers.push({
            position: { lat: parseFloat(ph.latitude), lng: parseFloat(ph.longitude) },
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'blue',
              fillOpacity: .4,
              scale: 4.5,
              // strokeColor: 'white',
              strokeWeight: 0
            }
          })
        )
      }
    },
    props: {
      potholes: Array
    }
  }
</script>

