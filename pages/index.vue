<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="pa-0">
        <v-autocomplete
          outlined
          dense
          placeholder="Filtrar por local"
          append-outer-icon="mdi-plus"
        >
          <template v-slot:append-outer>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-bind="attrs"
                  v-on="on"
                  v-text="'mdi-plus'"
                />
              </template>
              <span>Criar novo local</span>
            </v-tooltip>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <dispositivos-list />
    </v-row>
  </v-container>
</template>

<script>
import DispositivosList from '~/components/DispositivosList'

export default {
  components: {
    DispositivosList
  }
}
</script>
