<template>
  <v-data-table
    :headers="headers"
    :items="dispositivos"
    sort-by="calories"
    class="elevation-1"
    item-key=".key"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Dispositivos</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        />
        <v-menu
          offset-y
        >
          <template v-slot:activator="{ attrs, on }">
            <v-btn
              color="black darken-1"
              class="white--text ma-5"
              v-bind="attrs"
              v-on="on"
            >
              Registrar Dispositivo
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="item in tiposDispositivosList"
              :key="item.tipo"
              link
              :disabled="item.disabled"
              @click="dispositivoAdd(item.component)"
            >
              <v-list-item-title v-text="item.tipo" />
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar>
    </template>

    <template v-slot:item.tipo="{ item }">
      {{ getTipoDispositivo(item.tipo) }}
    </template>

    <template v-slot:item.status="{ item }">
      <v-chip :color="item.status ? 'green' : 'red darken-4'" dark>
        {{ item.status ? 'Online' : 'Offline' }}
      </v-chip>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-btn icon @click="dispositivosEdit(item)">
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
  name: 'DispositivosList',
  data: () => ({
    loading: false,
    headers: [
      {
        text: 'ID',
        align: 'center',
        sortable: false,
        value: '.key'
      },
      { text: 'Tipo', value: 'tipo', align: 'center' },
      { text: 'Status', value: 'status', align: 'center' },
      { text: 'Actions', value: 'actions', sortable: false, align: 'center' }
    ],
    tiposDispositivosList: [
      { id: 1, tipo: 'Ar Condicionado', component: 'ArCondicionadoForm' },
      { id: 2, tipo: 'Sensor', disabled: true },
      { id: 3, tipo: 'Caldeira', disabled: true }
    ]
  }),
  computed: {
    ...mapState({
      dispositivos: state => state.dispositivos.all
    })
  },
  created () {
    this.loading = true
    this.$store.dispatch('dispositivos/getDispositivos')
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    getTipoDispositivo (tipo) {
      const tipos = [
        { tipo: 1, nome: 'Ar Condicionado' },
        { tipo: 2, nome: 'Sensor' },
        { tipo: 3, nome: 'Caldeira' }
      ]

      const item = tipos.find(item => item.tipo === tipo)

      return item.nome
    },
    dispositivoAdd (component) {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component
      })
    },
    dispositivosEdit (dispositivo) {
      const component =
        this.tiposDispositivosList.find(item => item.id === dispositivo.tipo).component

      this.$store.commit('dialog/DIALOG_OPEN', {
        component,
        data: dispositivo
      })
    },
    remove (dispositivoKey) {
      this.$store.dispatch('dispositivos/deleteDispositivo', dispositivoKey)
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
