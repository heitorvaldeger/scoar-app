<template>
  <v-data-table
    :headers="headers"
    :items="locais"
    sort-by="calories"
    class="elevation-1"
    item-key=".key"
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
        <locais-add />
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <locais-edit :item="item" />
      <v-btn small depressed outlined color="error" @click="remove(item['.key'])">
        Apagar
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
import LocaisAdd from '~/components/LocaisAdd'
import LocaisEdit from '~/components/LocaisEdit'

export default {
  name: 'LocaisList',
  components: {
    LocaisAdd,
    LocaisEdit
  },
  data: () => ({
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
    this.$store.dispatch('locais/getLocais')
  },
  methods: {
    remove (itemKey) {
      this.$store.dispatch('locais/deleteLocal', itemKey)
    }
  }
}
</script>
