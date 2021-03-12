<template>
  <v-container>
    <v-tabs
      v-model="activeTab"
      background-color="teal darken-1"
      dark
      icons-and-text
      grow
      show-arrows
      class="tab-rounded"
    >
      <v-tabs-slider />

      <v-tab
        v-for="(item) in tiposDispositivo"
        :key="item.tipo"
        :disabled="item.disabled"
        @click="changeTab(item)"
      >
        {{ item.nome }}
        <v-icon>{{ item.icone }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item
        v-for="i in qtdTiposDispositivos"
        :key="i"
      >
        <template v-if="tipoSelected === 1">
          <p>Hello World</p>
        </template>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  middleware: 'auth',
  data: () => ({
    tiposDispositivo: [
      {
        nome: 'Ar Condicionado',
        icone: 'mdi-air-conditioner',
        tipo: 1
      },
      {
        nome: 'Sensores',
        icone: 'mdi-lightbulb',
        disabled: true,
        tipo: 2
      },
      {
        nome: 'Caldeira',
        icone: 'mdi-beaker',
        disabled: true,
        tipo: 3
      }
    ],
    activeTab: 0,
    tipoSelected: 1,
    text: 'Hello'
  }),
  computed: {
    ...mapState({
      dispositivos: state => state.dispositivos.all
    }),
    qtdTiposDispositivos () {
      return this.tiposDispositivo.length
    }
  },
  beforeCreate () {
    this.$store.dispatch('locais/getLocais')
  },
  methods: {
    changeTab ({ tipo }) {
      this.$store.dispatch('dispositivos/getDispositivosByTipo', tipo)
        .then(() => {
          this.tipoSelected = tipo
        })
    }
  }
}
</script>

<style scoped>
.tab-rounded {
  border-radius: 5px;
}
</style>
