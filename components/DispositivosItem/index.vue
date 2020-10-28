<template>
  <v-card class="rounded-lg" elevation="1" min-width="350">
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="auto">
          {{ item.id }} - {{ item.tipo }}
        </v-col>
        <v-col cols="auto" class="ml-auto">
          <slot name="menu" />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <p class="mb-0">
        {{ showLocal }}
      </p>
      <span>{{ item.status ? 'Online' : 'Offline' }}</span>
      <v-icon
        :color="item.status ? 'success' : 'pink'"
        @click="setStatus"
        v-text="item.status ? 'mdi-check-circle' : 'mdi-close-circle-outline'"
      />
    </v-card-subtitle>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="auto" class="text-center">
          <radial-progress-bar
            :animate-speed="200"
            :diameter="100"
            :total-steps="15"
            :completed-steps="calcProgress"
            :stroke-width="5"
            :inner-stroke-width="5"
            inner-stroke-color="#ddd"
            start-color="#333"
            stop-color="#333"
            class="text-h5"
          >
            {{ item.temp }}&deg;C
          </radial-progress-bar>
          <v-btn icon :disabled="item.temp <= 16" @click="decrement">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon :disabled="item.temp >= 30" @click="increment">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import RadialProgressBar from 'vue-radial-progress'

export default {
  name: 'DispositivosItem',
  components: {
    RadialProgressBar
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    local: null
  }),
  computed: {
    calcProgress () {
      const progress = 15 - (30 - this.item.temp)
      return progress
    },
    showLocal () {
      if (this.local) {
        return `${this.local.id} - ${this.local.nome}`
      }
      return ''
    }
  },
  created () {
    this.getLocal()
  },
  methods: {
    getLocal () {
      this.$store.dispatch('locais/getLocal', this.item.local)
        .then((value) => {
          this.local = value
        })
    },
    increment () {
      this.$store.dispatch('dispositivos/incrementTemp', this.item['.key'])
        .then(() => {
          this.completedSteps++
        })
    },
    decrement () {
      this.$store.dispatch('dispositivos/decrementTemp', this.item['.key'])
        .then(() => {
          this.completedSteps--
        })
    },
    setStatus () {
      this.$store.dispatch('dispositivos/setStatus', this.item['.key'])
    }
  }
}
</script>
