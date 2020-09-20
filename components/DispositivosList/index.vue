<template>
  <div class="dispositivos-list">
    <v-btn
      depressed
      height="40"
      color="success"
      @click="modal = {type:'DispositivosModal', title:'criar', status: true}"
    >
      Novo Dispositivo
    </v-btn>
    <v-row>
      <v-col cols="4">
        <dispositivos-item v-for="(dispositivos, index) in dispositivos" :key="index">
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
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="onMenuClick({...item})"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </dispositivos-item>
      </v-col>
    </v-row>
    <component :is="modal.type" v-show="modal.type" :modal="modal" @close="onCloseModal" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DispositivosItem from '~/components/DispositivosItem'
import DispositivosModal from '~/components/DispositivosModal'

export default {
  name: 'DispositivosList',
  components: {
    DispositivosItem,
    DispositivosModal
  },
  data: () => ({
    modal: {},
    items: [
      { title: 'Editar', type: 'DispositivosModal' },
      { title: 'Apagar' }
    ]
  }),
  computed: {
    ...mapState({ dispositivos: state => state.dispositivos.all })
  },
  created () {
    this.$store.dispatch('dispositivos/getDispositivos')
  },
  methods: {
    onCloseModal () {
      this.modal = {}
    },
    onMenuClick (attr) {
      this.modal = {
        ...attr,
        status: true
      }
    }
  }
}
</script>
