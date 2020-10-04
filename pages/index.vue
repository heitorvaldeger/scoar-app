<template>
  <v-container>
    <v-row>
      <v-col cols="8" class="pa-0">
        <v-autocomplete
          outlined
          dense
          placeholder="Filtrar por local"
        />
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
