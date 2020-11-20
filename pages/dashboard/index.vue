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
// import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  layout: 'dashboard',
  middleware: 'auth',
  // computed: {
  //   ...mapState({
  //     locais: state => state.locais.all
  //   })
  // },
  created () {
    // this.$store.dispatch('locais/getLocais')
  }
}
</script>
