<template>
  <v-container>
    <v-row align="center">
      <v-col cols="7" class="pa-0">
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
      <v-col cols="3" class="pa-0">
        <dispositivos-add />
      </v-col>
      <!-- <dispositivos-list /> -->
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
// import DispositivosList from '~/components/DispositivosList'
import DispositivosAdd from '~/components/DispositivosAdd'

export default {
  components: {
    // DispositivosList,
    DispositivosAdd
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
