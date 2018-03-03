<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout >
        <v-container grid-list-xl>
          <v-layout row wrap>
            <v-flex xs-12>
              <Map
                :startDate="dateTimeRange.from.date"
                :startTime="dateTimeRange.from.time"
                :endDate="dateTimeRange.to.date"
                :endTime="dateTimeRange.to.time"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs-6>
              <DateTime type="Start" v-on:dateChange="updateDate" v-on:timeChange="updateTime" />
            </v-flex>
            <v-flex xs-6>
              <DateTime type="Stop" v-on:dateChange="updateDate" v-on:timeChange="updateTime"/>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import Map from '@/components/map/Map'
import DateTime from '@/components/datetime/DateTime'

export default {
  name: 'MapAll',
  data () {
    return {
      dateTimeRange: {
        'from': {
          'date': null,
          'time': null
        },
        'to': {
          'date': null,
          'time': null
        }
      },
      zoom: 13
    }
  },
  components: {
    Map,
    DateTime
  },
  methods: {
    updateDate: function (val) {
      if (val.type === 'Start') {
        this.dateTimeRange.from.date = val.date
      } else {
        this.dateTimeRange.to.date = val.date
      }
    },
    updateTime: function (val) {
      if (val.type === 'Start') {
        this.dateTimeRange.from.time = val.time
      } else {
        this.dateTimeRange.to.time = val.time
      }
    }
  }
}
</script>
