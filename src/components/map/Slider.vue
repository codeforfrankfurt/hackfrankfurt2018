<template>
  <v-content>
    <v-slider v-model="zoom" :step="zoom"></v-slider>
  </v-content>
</template>

<script>
export default {
  name: 'Slider',
  data () {
    return {
      zoom: 13
    }
  }
}
</script>
