<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <button @click="addMarkers">Load Potholes</button>
        <button @click="completedRequests">Completed Requests</button>
        <button @click="openRequests">Open Requests</button>
        <input v-if="closedSlider" type="range" @change="sliderMarkers" v-model.number="sliderCurrent" :min="sliderMin" :max="sliderMax" class="slider">
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
        markers: [],
        closedSlider: false,
        sliderMax: 0,
        sliderMin: 2000,
        sliderCurrent: 0
      }
    },

    methods: {

      markerObject(lat, long, days) {
        return {
                position: { lat: parseFloat(lat), lng: parseFloat(long) },
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  fillColor: 'blue',
                  fillOpacity: .4,
                  scale: 4.5,
                  strokeWeight: 0
                },
                timeSpan: days
              }
      },

      addMarkers() {
        if (this.masterList.length === 0) {
          this.potholes.map((ph) => {
            if (ph.status.includes("Completed")) {
              let daysTilComplete = this.completedTime(ph.creation_date, ph.completion_date)
              this.completedReq.push(this.markerObject(ph.latitude, ph.longitude, daysTilComplete))
            } else {
              this.openReq.push(this.markerObject(ph.latitude, ph.longitude))
            }
            this.masterList.push(this.markerObject(ph.latitude, ph.longitude))
          })
        }
        this.markers = this.masterList
        this.closedSlider = false
      },

      completedTime(created, completed){
        let days = (Date.parse(completed) / 86400000) - (Date.parse(created) / 86400000)
        if (this.sliderMax < days) {
          this.sliderMax = days
        }
        if (this.sliderMin > days) {
          this.sliderMin = days
        }
        return days
      },

      completedRequests() {
        this.markers = this.completedReq
        this.closedSlider = true
      },

      openRequests() {
        this.markers = this.openReq
        this.closedSlider = false
      },

      sliderMarkers() {
        let updatedMarkers = this.completedReq.filter((markerObj) => 
          markerObj.timeSpan === this.sliderCurrent
        )
        this.markers = updatedMarkers
      }
    },
    
    props: {
      potholes: Array
    }
  }

</script>