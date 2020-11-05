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
          <v-list-item @click="userUpdateEmail">
            <v-list-item-icon>
              <v-icon v-text="'mdi-account'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Atualizar Email</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
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
    <component :is="dialogName || null" :data="dialogData" />
    <notifications position="bottom center" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'Dashboard',
  computed: {
    ...mapState({
      user: state => state.auth.user,
      dialogData: state => state.dialog.data
    }),
    ...mapGetters({
      dialogName: 'dialog/COMPONENT_DIALOG'
    })
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
        .then(() => {
          this.$store.commit('auth/CLEAR_USER')
          this.$router.replace('/')
        })
    },
    userUpdateEmail () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'UserUpdateEmail'
      })
    }
  }
}
</script>
