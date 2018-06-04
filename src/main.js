import Vue from 'vue'
import App from './App'
import router from './router'

// vuetify-related
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

// leaflet-related
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-hotline'

/* eslint-disable no-extend-native */
Number.prototype.map = function (inMin, inMax, outMin, outMax) {
  return (this - inMin) * (outMax - outMin) / (inMax - inMin) + outMin
}

Vue.use(Vuetify)

Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
