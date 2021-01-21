<template>
  <v-container>
    <v-row align="center" class="my-2">
      <v-toolbar flat color="white">
        <v-toolbar-title>Dispositivos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-btn
          v-if="isAdmin"
          color="gray"
          dark
          @click="dispositivoAdd"
        >
          Novo Dispositivo
        </v-btn>
      </v-toolbar>
    </v-row>
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
  },
  methods: {
    dispositivoAdd () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'DispositivosAdd'
      })
    }
  }
}
</script>
