<template>
  <v-data-table
    :headers="headers"
    :items="locais"
    sort-by="calories"
    class="elevation-1"
    item-key=".key"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Locais Cadastrados</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-spacer />
        <v-btn
          color="black darken-1"
          dark
          class="mb-2"
          @click="locaisAdd"
        >
          Novo Item
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="locaisEdit(item)">
        <v-icon small>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn icon @click="remove(item['.key'])">
        <v-icon small>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LocaisList',
  data: () => ({
    loading: false,
    headers: [
      {
        text: 'ID',
        align: 'center',
        sortable: false,
        value: 'id'
      },
      { text: 'Nome', value: 'nome' },
      { text: 'Apelidos', value: 'apelidos' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ]
  }),
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
  },
  created () {
    this.loading = true
    this.$store.dispatch('locais/getLocais')
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    locaisAdd () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'LocaisAdd'
      })
    },
    locaisEdit (local) {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'LocaisEdit',
        data: local
      })
    },
    remove (itemKey) {
      this.$store.dispatch('locais/deleteLocal', itemKey)
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Objeto removido com sucesso',
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
</script>
