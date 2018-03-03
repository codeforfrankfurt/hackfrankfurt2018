<template>
  <!-- <v-content> -->
    <div id="app">
      <v-map :zoom="zoom" :center="center">
        <v-tilelayer :url="url"></v-tilelayer>
        <v-marker v-for="sensor in sensors" :key="sensor.id" :lat-lng="$options.computed.latLng(sensor.latitude, sensor.longitude)"></v-marker>
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
  data () {
    return {
      zoom: 13,
      center: L.latLng(50.1109, 8.6821),
      // url: 'https://maps.luftdaten.info/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: L.latLng(50.1109, 8.6821),
      sensors: [
        {
          'id': 1,
          'latitude': 48.777,
          'longitude': 9.235,
          'altitude': 233.7,
          'data': [
            {'P1': 100},
            {'P2': 200}
          ]
        }
      ]
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    latLng (lat, lng) {
      return L.latLng(lat, lng)
    }
  },
  methods: {
    loadData: function () {
      let lon1 = 50
      let lat1 = 8
      let lon2 = 51
      let lat2 = 9
      let from = '2018-03-03 00:01'
      let to = '2018-03-03 23:59'
      API.get(`data/${lon1}/${lat1}/${lon2}/${lat2}/${from}/${to}`).then(response => {
        console.log(response)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>


<style scoped>
#app {
  position: absolute;
  height: 100%;
  width: 100%;
}

</style>
