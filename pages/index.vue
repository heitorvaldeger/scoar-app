<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="py-0">
        <v-autocomplete
          outlined
          dense
          placeholder="Filtrar por local"
          append-outer-icon="mdi-plus"
        >
          <template v-slot:append-outer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  @click="addLocal"
                  v-on="on"
                  v-text="'mdi-plus'"
                />
              </template>
              <span>Criar novo local</span>
            </v-tooltip>
          </template>
        </v-autocomplete>
      </v-col>
      <v-col cols="4" class="py-0">
        <v-btn depressed height="40" color="success" @click="dispositivosModal = true">
          Novo Dispositivo
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <dispositivos-list />
    </v-row>

    <dispositivos-modal :modal="dispositivosModal" @close="onCloseDispositivosModal" />
  </v-container>
</template>

<script>
import DispositivosList from '~/components/DispositivosList'
import DispositivosModal from '~/components/DispositivosModal'

export default {
  components: {
    DispositivosList,
    DispositivosModal
  },
  data: () => ({
    dispositivosModal: false
  }),
  methods: {
    onCloseDispositivosModal () {
      this.dispositivosModal = false
    }
  }
}
</script>
