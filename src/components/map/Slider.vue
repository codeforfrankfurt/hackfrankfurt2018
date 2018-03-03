<template>
  <v-content>
    <v-slider v-model="zoom" :step="zoom"></v-slider>
  </v-content>
</template>

<script>
import L from 'leaflet'
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Slider',
  data () {
    return {
      zoom: 13,
      center: L.latLng(50.1109, 8.6821),
      // url: 'https://maps.luftdaten.info/tiles/{z}/{x}/{y}.png',
      url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      marker: L.latLng(50.1109, 8.6821)
    }
  }
}
</script>
