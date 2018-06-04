<template>
  <!-- <v-content> -->
    <div id="app">
      <v-map :zoom="zoom" :center="center" ref="deviceMap">
        <v-tilelayer :url="url"></v-tilelayer>
        <v-marker v-for="marker in markers" :key="marker.id" :lat-lng="$options.computed.latLng(marker.geometry)"></v-marker>
      </v-map>
    </div>
  <!-- </v-content> -->
</template>

<script>
import L from 'leaflet'
import API from '@/api'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Map',
  props: ['startDate', 'startTime', 'endDate', 'endTime'],
  data () {
    return {
      zoom: 13,
      center: L.latLng(50.1109, 8.6821),
      // url: 'https://maps.luftdaten.info/tiles/{z}/{x}/{y}.png',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      markers: [],
      bounds: false
    }
  },
  mounted () {
    let myPromise = new Promise((resolve, reject) => {
      self.bounds = this.$refs.deviceMap.mapObject.getBounds()
      resolve('Resolved!')
    })
    myPromise.then((success) => {
      this.loadData()
    }).catch((err) => {
      console.log(err)
    })
  },
  computed: {
    latLng (geometry) {
      return L.latLng(geometry.coordinates[0], geometry.coordinates[1])
    },
    format_datetime (date, time) {
      return `${date} ${time}`
    }
  },
  methods: {
    loadData: function () {
      // let lon1 = self.bounds.getNorthWest().lng
      // let lat1 = self.bounds.getNorthWest().lat
      // let lon2 = self.bounds.getSouthEast().lng
      // let lat2 = self.bounds.getSouthEast().lat
      // let from = self.format_datetime(startDate, startTime)
      // let to = self.format_datetime(endDate, endTime)
      // let API_URL = `data/${lon1}/${lat1}/${lon2}/${lat2}/${from}/${to}`
      let API_URL = `data/fake`
      API.get(API_URL).then(response => {
        this.markers = response.data.features.slice(0, 10)
        const hotlineData = this.markers.map(marker => {
          return [
            parseFloat(marker.geometry.coordinates[0]),
            parseFloat(marker.geometry.coordinates[1]),
            marker.properties.PM10.map(0, 100, 170, 270)
          ]
        })
        const options = {
          min: 150,
          max: 350,
          palette: {
            0.0: '#008800',
            0.5: '#ffff00',
            1.0: '#ff0000'
          },
          weight: 5,
          outlineColor: '#000000',
          outlineWidth: 1
        }
        L.hotline(hotlineData, options).addTo(this.$refs.deviceMap.mapObject)

        return this.markers
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>


<style scoped>
#app {
  /* HACK */
  /* position: absolute; */
  height: 500px;
  /* width: 100% */
}

</style>
