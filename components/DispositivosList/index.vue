<template>
  <span>
    <v-btn
      v-if="isAdmin"
      color="gray"
      dark
      @click="dispositivoAdd"
    >
      Novo Dispositivo
    </v-btn>
    <v-row>
      <v-col v-for="(item, index) in dispositivos" :key="index" cols="auto">
        <dispositivos-item :item="item">
          <template v-if="isAdmin" v-slot:menu>
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
                <v-list-item @click="dispositivosEdit(item)">
                  <v-list-item-title>
                    Editar
                  </v-list-item-title>
                </v-list-item>
                <v-list-item @click="remove(item['.key'])">
                  <v-list-item-title>Apagar</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </dispositivos-item>
      </v-col>
    </v-row>
  </span>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DispositivosList',
  data () {
    return ({
      isAdmin: false
    })
  },
  computed: {
    ...mapState({
      dispositivos: state => state.dispositivos.all
    })
  },
  created () {
    this.isAdmin = this.$store.getters['auth/isAdmin']
    this.$store.dispatch('dispositivos/getDispositivos')
  },
  methods: {
    dispositivoAdd () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'DispositivosAdd'
      })
    },
    dispositivosEdit (item) {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'DispositivosEdit',
        data: item
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
