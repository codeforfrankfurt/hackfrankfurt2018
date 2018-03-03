<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <Map/>
        <Slider/>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Map from '@/components/map/Map'
import Slider from '@/components/map/Slider'

export default {
  name: 'MapAll',
  data () {
    return {
      zoom: 13
    }
  },
  components: {
    Map,
    Slider
  }
}
</script>
