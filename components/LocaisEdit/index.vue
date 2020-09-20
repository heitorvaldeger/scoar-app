<template>
  <span>
    <v-btn small depressed outlined @click="open">
      Editar
    </v-btn>
    <modal-base v-if="modal" :modal="modal" :close="close">
      <template v-slot:header>
        <span class="headline">Editar Local</span>
      </template>

      <template v-slot:content>
        <v-container>
          <v-form autocomplete="off">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="model.id"
                  label="ID do Local"
                  hint="Ex.: C22, A28"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="model.nome"
                  label="Nome do Local"
                  hint="Ex.: Lab de Informática, Lab de Eletrônica"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="model.apelido"
                  label="Apelidos"
                  hint="Ex.: MSI 4º Ano, Alimentos 1º Ano"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </template>

      <template v-slot:actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue darken-1" text @click="save">
          Save
        </v-btn>
      </template>
    </modal-base>
  </span>
</template>

<script>
import ModalBase from '~/components/Globals/ModalBase.vue'

export default {
  name: 'LocaisAdd',
  components: {
    ModalBase
  },
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    modal: false,
    model: {}
  }),
  created () {
    this.model = Object.assign({}, this.item)
  },
  methods: {
    open () {
      this.modal = true
    },
    close () {
      this.modal = false
    },
    save () {

    }
  }
}
</script>
