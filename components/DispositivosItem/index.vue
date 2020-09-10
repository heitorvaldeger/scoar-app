<template>
  <v-card outlined min-width="350">
    <v-card-title>
      <v-row>
        <v-col cols="auto">
          A01 - Ar Condicionado
          <v-subheader class="pa-0">
            <v-icon size="20">
              mdi-map-marker
            </v-icon>
            C22 - Sala de Aula
          </v-subheader>
        </v-col>
        <v-col cols="auto" class="ml-auto">
          <v-btn icon>
            <v-icon>
              mdi-menu
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-subtitle>
      <v-chip color="success">
        Online
      </v-chip>
    </v-card-subtitle>
    <v-card-text>
      <v-row align="center">
        <v-col class="display-2 text-center">
          23&deg;C
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-slider
            step="14"
            append-icon="mdi-plus"
            prepend-icon="mdi-minus"
            ticks="always"
            tick-size="3"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'DispositivosItem'
}
</script>
