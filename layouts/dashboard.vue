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
      <v-btn class="mx-2" link to="/" text>
        Home
      </v-btn>
      <v-btn class="mx-2" link to="locais" text>
        Locais
      </v-btn>
      <v-btn color="dark" link dark @click="signOut">
        Sair
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <portal-target name="modal" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
        .then(() => {
          this.$store.commit('auth/CLEAR_USER')
          this.$router.replace('/')
        })
    }
  }
}
</script>
