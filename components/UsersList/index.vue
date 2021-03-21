<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-class="text-center"
    sort-by="email"
    class="elevation-1"
    item-key=".key"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuários Cadastrados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-btn
          color="black darken-1"
          dark
          outlined
          @click="userAdd"
        >
          Novo Usuário
        </v-btn>
        <v-spacer />
        <v-btn icon class="mx-2" @click="updateList">
          <v-icon>
            mdi-reload
          </v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="remove(item.uid)">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UsersList',
  data: () => ({
    loading: false,
    headers: [
      { text: 'Nome do Usuário', value: 'displayName', align: 'center' },
      { text: 'Email do Usuário', value: 'email', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ]
  }),
  computed: {
    ...mapState({
      users: state => state.users.all
    })
  },
  created () {
    this.loading = true
    this.$store.dispatch('users/getUsers')
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    userAdd () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'UsersForm'
      })
    },
    updateList () {
      this.$store.dispatch('users/getUsers')
    },
    remove (uid) {
      const conf = confirm('Deseja realmente excluir esse usuário')
      if (conf) {
        this.$store.dispatch('users/deleteUser', uid)
          .then(() => {
            this.$notify({
              type: 'success',
              title: 'Usuário removido com sucesso',
              closeOnClick: true
            })
          })
          .catch((err) => {
            this.$notify({
              type: 'error',
              title: err.message,
              closeOnClick: true
            })
          })
      }
    }
  }
}
</script>
