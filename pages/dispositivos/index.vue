<template>
  <v-container>
    <dispositivos-list />
  </v-container>
</template>

<script>

export default {
  name: 'DispositivosPage',
  layout: 'dashboard',
  middleware: 'auth',
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
