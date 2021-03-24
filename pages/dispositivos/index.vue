<template>
  <v-container>
    <dispositivos-list />
  </v-container>
</template>

<script>
import DispositivosList from '~/components/DispositivosList'

export default {
  name: 'DispositivosPage',
  layout: 'dashboard',
  middleware: 'auth',
  components: {
    DispositivosList
  },
  data () {
    return ({
      isAdmin: false
    })
  },
  beforeCreate () {
    this.$store.dispatch('locais/getLocais')
  },
  created () {
    this.isAdmin = this.$store.getters['auth/isAdmin']
  }
}
</script>
