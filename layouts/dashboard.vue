<template>
  <v-app dark>
    <v-app-bar
      app
      color="white"
      height="60"
    >
      <img src="~/assets/images/ifrn-logo.png" width="140">

      <v-spacer />
      <v-menu
        top
        close-on-click
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            fab
            v-bind="attrs"
            depressed
            small
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

    <v-bottom-navigation
      color="teal"
      grow
      fixed
    >
      <v-btn to="/dashboard">
        <span>Dashboard</span>
        <v-icon>
          mdi-view-dashboard
        </v-icon>
      </v-btn>

      <v-btn v-if="isAdmin" to="dispositivos">
        <span>Dispositivos</span>
        <v-icon>
          mdi-devices
        </v-icon>
      </v-btn>

      <v-btn v-if="isAdmin" to="locais">
        <span>Locais</span>
        <v-icon>
          mdi-map-marker
        </v-icon>
      </v-btn>

      <v-btn v-if="isAdmin" to="users">
        <span>Usuários</span>
        <v-icon>
          mdi-account-group
        </v-icon>
      </v-btn>
    </v-bottom-navigation>

    <component :is="dialogName || null" :data="dialogData" />
    <notifications position="bottom center" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  layout: 'Dashboard',
  data () {
    return ({
      isAdmin: false
    })
  },
  computed: {
    ...mapState({
      dialogData: state => state.dialog.data
    }),
    ...mapGetters({
      dialogName: 'dialog/COMPONENT_DIALOG'
    })
  },
  created () {
    this.isAdmin = this.$store.getters['auth/isAdmin']
  },
  methods: {
    signOut () {
      this.$store.dispatch('auth/signOut')
        .then(() => {
          this.$router.replace('/login')
        })
    },
    userUpdateEmail () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'UserUpdateEmailForm'
      })
    }
  }
}
</script>

<style>
  .v-item-group.v-bottom-navigation .v-btn.v-size--default {
    height: inherit;
  }
</style>
