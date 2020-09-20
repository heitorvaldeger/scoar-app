<template>
  <v-card outlined min-width="350">
    <v-card-title class="pb-0">
      <v-row>
        <v-col cols="auto">
          A01 - Ar Condicionado
          <v-subheader class="pa-0">
            C22 - Sala de Aula
          </v-subheader>
        </v-col>
        <v-col cols="auto" class="ml-auto">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                v-bind="attrs"
                color="success"
                v-on="on"
                v-text="'mdi-circle'"
              />
            </template>
            <span>Online</span>
          </v-tooltip>
          <slot name="menu" />
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col cols="auto" class="text-center">
          <radial-progress-bar
            :animate-speed="200"
            :diameter="100"
            :total-steps="14"
            :completed-steps="completedSteps"
            :stroke-width="5"
            :inner-stroke-width="5"
            inner-stroke-color="#ddd"
            start-color="#333"
            stop-color="#333"
            class="text-h5"
          >
            23&deg;C
          </radial-progress-bar>
          <v-btn icon @click="completedSteps -= 1">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn icon @click="completedSteps += 1">
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
  data: () => ({
    completedSteps: 1
  })
}
</script>
