<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
      color="white"
      height="60"
    >
      <img src="~/assets/images/ifrn-logo.png" width="140">

      <v-spacer />

      <v-btn
        fab
        class="mx-2"
        to="/"
        x-small
        depressed
        color="white"
      >
        <v-icon color="blue-grey darken-1">
          mdi-home
        </v-icon>
      </v-btn>
      <v-btn
        fab
        class="mx-2"
        to="locais"
        x-small
        depressed
        color="white"
      >
        <v-icon color="blue-grey darken-1">
          mdi-map-marker
        </v-icon>
      </v-btn>
      <v-btn
        fab
        class="mx-2"
        to="users"
        x-small
        depressed
        color="white"
      >
        <v-icon color="blue-grey darken-1">
          mdi-account-group
        </v-icon>
      </v-btn>
      <v-menu
        top
        close-on-click
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            v-bind="attrs"
            x-small
            depressed
            color="white"
            v-on="on"
          >
            <v-icon color="blue-grey darken-1">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>

        <v-list>
          <user-update-email />
          <v-list-item @click="signOut">
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sair</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <portal-target name="modal" />
    <notifications position="bottom center" />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
// import UserUpdateEmail from '~/components/UserUpdateEmail'

export default {
  layout: 'Dashboard',
  components: {
    // UserUpdateEmail
  },
  data () {
    return ({
      // drawer: false
    })
  },
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
