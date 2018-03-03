<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout >
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs-12>
              <Map/>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs-12>
              <!-- <Slider/> -->
            </v-flex>
          </v-layout>
        </v-container>
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
