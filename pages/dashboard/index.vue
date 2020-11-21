<template>
  <v-container>
    <v-row align="center">
      <v-col>
        <h2>Dashboard</h2>
        <v-divider />
      </v-col>
    </v-row>
    <dispositivos-list />
  </v-container>
</template>

<script>

export default {
  name: 'Dashboard',
  layout: 'dashboard',
  middleware: 'auth',
  beforeCreate () {
    this.$store.dispatch('locais/getLocais')
  }
}
</script>
