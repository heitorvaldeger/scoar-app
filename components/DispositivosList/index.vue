<template>
  <div>
    <dispositivos-add />
    <v-row>
      <v-col v-for="(dispositivo, index) in dispositivos" :key="index" cols="auto">
        <dispositivos-item :item="dispositivo">
          <template v-slot:menu>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title>Editar</v-list-item-title>
                </v-list-item>
                <v-list-item @click="remove(dispositivo['.key'])">
                  <v-list-item-title>Apagar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </dispositivos-item>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DispositivosList',
  computed: {
    ...mapState({
      dispositivos: state => state.dispositivos.all
    })
  },
  created () {
    this.$store.dispatch('dispositivos/getDispositivos')
  },
  methods: {
    remove (dispositivoKey) {
      this.$store.dispatch('dispositivos/deleteDispositivo', dispositivoKey)
    }
  }
}
</script>
