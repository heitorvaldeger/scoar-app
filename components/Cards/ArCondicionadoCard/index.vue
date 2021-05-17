<template>
  <v-card elevation="2" width="200">
    <v-card-title>
      {{ data['.key'] }}
      <v-chip
        class="mx-2"
        :color="data.status ? 'green' : 'red darken-4'"
        small
        text-color="white"
        @click="updateStatus"
      >
        {{ data.status ? 'Online' : 'Offline' }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle>
      {{ local.id + ' | ' + local.nome }}
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col>
          <radial-progress-bar
            :animate-speed="200"
            :diameter="80"
            :completed-steps="calcProgress"
            :total-steps="totalSteps"
            :stroke-width="6"
            :inner-stroke-width="6"
            start-color="#00897b"
            stop-color="#00897b"
            inner-stroke-color="#ddd"
          >
            <p class="mb-0" style="font-size: 13pt; font-weight: 700;">
              {{ data.temp }} ºC
            </p>
          </radial-progress-bar>
        </v-col>
        <v-col>
          <v-btn class="mb-1" depressed color="white" :disabled="data.temp >= 30" @click="incrementTemp">
            <v-icon color="gray">
              mdi-plus-box
            </v-icon>
          </v-btn>
          <v-btn depressed color="white" :disabled="data.temp <= 16" @click="decrementTemp">
            <v-icon color="gray">
              mdi-minus-box
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
  name: 'ArCondicionadoCard',
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
      completedSteps: 1,
      totalSteps: 15,
      dispositivoId: '',
      local: {}
    })
  },
  computed: {
    calcProgress () {
      const progress = 15 - (30 - this.data.temp)
      return progress
    }
  },
  created () {
    this.dispositivoId = this.data['.key']

    this.$store.dispatch('locais/getLocal', this.data.local)
      .then((value) => {
        this.local = value
      })
  },
  methods: {
    incrementTemp () {
      this.$store.dispatch('dispositivos/ar-condicionado/incrementTemp', this.dispositivoId)
        .then(() => {
          this.completedSteps++
        })
    },
    decrementTemp () {
      this.$store.dispatch('dispositivos/ar-condicionado/decrementTemp', this.dispositivoId)
        .then(() => {
          this.completedSteps--
        })
    },
    updateStatus () {
      this.$store.dispatch('dispositivos/ar-condicionado/updateStatus', this.dispositivoId)
    }
  }
}
</script>
