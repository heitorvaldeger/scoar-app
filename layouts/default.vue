<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="white"
      height="60"
    >
      <img src="~/assets/images/ifrn-logo.png" width="150">
      <v-spacer />
      <v-btn class="mx-2" link to="/" depressed>
        Home
      </v-btn>
      <v-btn class="mx-2" link to="locais" depressed>
        Locais
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Vuetify.js'
    }
  }
}
</script>
