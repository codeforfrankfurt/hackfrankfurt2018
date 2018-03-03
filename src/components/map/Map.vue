<template>
  <!-- <v-content> -->
    <div id="app">
      <v-map :zoom="zoom" :center="center" ref="deviceMap">
        <v-tilelayer :url="url"></v-tilelayer>
        <!-- <v-marker v-for="sensor in sensors" :key="sensor.id" :lat-lng="$options.computed.latLng(sensor.latitude, sensor.longitude)"></v-marker> -->
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
  data () {
    return {
      zoom: 13,
      center: L.latLng(50.1109, 8.6821),
      // url: 'https://maps.luftdaten.info/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      sensors: [
        {
          'id': 1,
          'latitude': 50.1109,
          'longitude': 8.6821,
          'altitude': 233.7,
          'data': [
            {'P1': 100},
            {'P2': 200}
          ]
        }
      ],
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
    }
  },
  methods: {
    loadData: function () {
      // let lon1 = self.bounds.getNorthWest().lng
      // let lat1 = self.bounds.getNorthWest().lat
      // let lon2 = self.bounds.getSouthEast().lng
      // let lat2 = self.bounds.getSouthEast().lat
      // let from = '2018-03-03 00:01'
      // let to = '2018-03-03 23:59'
      // let API_URL = `data/${lon1}/${lat1}/${lon2}/${lat2}/${from}/${to}`
      let API_URL = `data/fake`
      API.get(API_URL).then(response => {
        this.markers = response.data.features.slice(0, 10)
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
