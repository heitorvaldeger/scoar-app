<template>
  <v-container>
    <v-row>
      <v-col cols="auto">
        <v-card @click="() => {}">
          <v-card-title class="justify-center">
            <v-icon>mdi-air-conditioner</v-icon>
          </v-card-title>
          <v-card-subtitle>
            Ar Condicionados
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  middleware: 'auth',
  beforeCreate () {
    this.$store.dispatch('locais/getLocais')
  }
}
</script>
