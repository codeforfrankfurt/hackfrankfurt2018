<template>
  <v-layout column>
    <v-flex xs-12>
      <v-menu
        ref="dateMenu"
        lazy
        :close-on-content-click="false"
        v-model="dateMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
        :return-value.sync="date"
        >
        <v-text-field
          slot="activator"
          :label="$options.computed.formatString(type, 'date')"
          v-model="date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker
          v-model="date"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="dateMenu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.dateMenu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex xs-12>
      <v-menu
        ref="timeMenu"
        lazy
        :close-on-content-click="false"
        v-model="timeMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
        :return-value.sync="time"
      >
        <v-text-field
          slot="activator"
          :label="$options.computed.formatString(type, 'time')"
          v-model="time"
          prepend-icon="access_time"
          readonly
        ></v-text-field>
        <v-time-picker v-model="time" @change="$refs.timeMenu.save(time)"></v-time-picker>
      </v-menu>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'datetime',
  props: [
    'name', 'initialDate', 'initialTime', 'type'
  ],
  data () {
    return {
      date: this.initialDate,
      time: this.initialTime,
      dateMenu: false,
      timeMenu: false
    }
  },
  computed: {
    formatString: function (type, str) {
      return `${type} ${str}`
    }
  },
  watch: {
    date: function (newDate, oldDate) {
      this.$emit('dateChange', {'type': this.type, 'date': newDate})
    },
    time: function (newTime, oldTime) {
      this.$emit('timeChange', {'type': this.type, 'time': newTime})
    }
  }
}
</script>
