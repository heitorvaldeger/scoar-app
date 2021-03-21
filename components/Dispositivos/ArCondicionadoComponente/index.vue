<template>
  <v-card elevation="2" width="200">
    <v-card-title>
      {{ data['.key'] }}
      <v-chip
        v-if="data.status"
        class="mx-2"
        color="green"
        small
        text-color="white"
      >
        Online
      </v-chip>
      <v-chip
        v-if="!data.status"
        class="mx-2"
        color="red darken-4"
        small
        text-color="white"
      >
        Offline
      </v-chip>
    </v-card-title>
    <v-card-subtitle>
      C22 - Sala de Aula
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <radial-progress-bar
            :diameter="80"
            :completed-steps="completedSteps"
            :total-steps="totalSteps"
            :stroke-width="6"
            :inner-stroke-width="6"
          >
            <p class="mb-0" style="font-size: 13pt; font-weight: 700;">
              {{ data.temp }} ºC
            </p>
          </radial-progress-bar>
        </v-col>
        <v-col>
          <v-btn class="mb-1" depressed color="white">
            <v-icon color="gray">
              mdi-arrow-up-circle
            </v-icon>
          </v-btn>
          <v-btn depressed color="white">
            <v-icon color="gray">
              mdi-arrow-down-circle
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'ArCondicionadoComponente',
  components: {
    RadialProgressBar
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return ({
      completedSteps: 0,
      totalSteps: 10,
      dispositivo: {}
    })
  },
  created () {
    this.dispositivo.id = this.data['.key']
    this.dispositivo = Object.assign(this.dispositivo, this.data)
  }
}
</script>
