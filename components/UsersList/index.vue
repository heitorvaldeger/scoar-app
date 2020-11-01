<template>
  <v-data-table
    :headers="headers"
    :items="users"
    item-class="text-center"
    sort-by="email"
    class="elevation-1"
    item-key=".key"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Usuários Cadastrados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <users-add />
      </v-toolbar>
    </template>

    <template v-slot:item.active="{ item }">
      <v-chip
        :color="item.active ? 'success' : 'error'"
        dark
        small
      >
        {{ item.active ? 'Ativo' : 'Não Ativo' }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="remove(item['.key'])">
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
import UsersAdd from '~/components/UsersAdd'

export default {
  name: 'UsersList',
  components: {
    UsersAdd
  },
  data: () => ({
    headers: [
      { text: 'Nome do Usuário', value: 'nome', align: 'center' },
      { text: 'Email do Usuário', value: 'email', align: 'center' },
      { text: 'Estado da Conta', value: 'active', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ]
  }),
  computed: {
    ...mapState({
      users: state => state.users.all
    })
  },
  created () {
    this.$store.dispatch('users/getUsers')
  },
  methods: {
    remove (itemKey) {
      const conf = confirm('Deseja realmente excluir esse usuário')
      if (conf) {
        this.$store.dispatch('users/deleteUser', itemKey)
      }
    }
  }
}
</script>
