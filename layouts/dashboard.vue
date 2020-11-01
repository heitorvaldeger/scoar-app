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
      <v-btn class="mx-2" link to="users" text>
        Usuários
      </v-btn>
      <v-menu
        top
        close-on-click
      >
        <template v-slot:activator="{ on, attrs }">
          <v-avatar color="blue-grey darken-2" size="36" v-bind="attrs" v-on="on">
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.click"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
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
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  layout: 'dashboard',
  data () {
    return ({
      items: [
        {
          title: 'Perfil',
          icon: 'mdi-account-circle',
          click: this.profile
        },
        {
          title: 'Sair',
          icon: 'mdi-logout',
          click: this.signOut
        }
      ]
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
    },
    profile () {

    }
  }
}
</script>
