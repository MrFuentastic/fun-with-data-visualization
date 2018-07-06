<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarkers">Load Potholes</button>
        <button @click="completedRequests">Completed Requests</button>
        <button @click="openRequests">Open Requests</button>
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
        masterList: [],
        completedReq: [],
        openReq: [],
        markers: []
      }
    },

    methods: {
      // receives a place object via the autocomplete component
      setPlace(place) {
        this.currentPlace = place;
      },

      markerObject(lat, long) {
        return {
                position: { lat: parseFloat(lat), lng: parseFloat(long) },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: 'blue',
                  fillOpacity: .4,
                  scale: 4.5,
                  strokeWeight: 0
                }
              }
      },

      addMarkers() {
        if (this.masterList.length == 0) {
          this.potholes.map((ph) => {
            if (ph.status.includes("Completed")) {
              this.completedReq.push(this.markerObject(ph.latitude, ph.longitude))
            } else {
              this.openReq.push(this.markerObject(ph.latitude, ph.longitude))
            }
            this.masterList.push(this.markerObject(ph.latitude, ph.longitude))
          })
        }
        this.markers = this.masterList
      },

      completedRequests() {
        this.markers = this.completedReq
      },

      openRequests() {
        this.markers = this.openReq
      }
    },

    props: {
      potholes: Array
    }
  }

</script>

