import Vue from 'vue'
import Router from 'vue-router'
import MapAll from '@/components/map/MapAll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MapAll',
      component: MapAll
    }
  ]
})
