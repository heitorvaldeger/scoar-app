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
        <v-toolbar-title>Locais</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-btn
          color="black darken-1"
          dark
          outlined
          @click="locaisAdd"
        >
          Novo Local
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.apelidos="{ item }">
      <v-chip v-for="(apelido, index) in item.apelidos" :key="index" class="mr-2" small>
        {{ apelido }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="locaisEdit(item)">
        <v-icon small>
          mdi-pencil
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
        component: 'LocaisForm'
      })
    },
    locaisEdit (local) {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'LocaisForm',
        data: local
      })
    }
  }
}
</script>
