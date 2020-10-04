<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="pa-0">
        <v-autocomplete
          item-value="id"
          :item-text="(item) => {return `${item.id} - ${item.nome}`}"
          :items="locais"
          hide-no-data
          hide-selected
          outlined
          placeholder="Filtrar por local"
          clearable
        />
      </v-col>
    </v-row>
    <v-row>
      <dispositivos-list />
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import DispositivosList from '~/components/DispositivosList'

export default {
  components: {
    DispositivosList
  },
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
  },
  created () {
    this.$store.dispatch('locais/getLocais')
  }
}
</script>
