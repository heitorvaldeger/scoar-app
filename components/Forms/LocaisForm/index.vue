<template>
  <span>
    <modal-base @close="closeDialog">
      <template v-slot:header>
        <span class="headline">
          {{
            !isEdit
              ? 'Novo local'
              : 'Editando - ' + idText
          }}
        </span>
      </template>

      <template v-slot:content>
        <v-container>
          <ValidationObserver ref="form">
            <v-form
              autocomplete="off"
              @submit.prevent="onSubmit"
            >
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="ID" rules="required">
                    <v-text-field
                      v-model="local.id"
                      label="ID do local"
                      hint="Ex.: C22, C23, A21"
                      color="black darken-1"
                      required
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
                    <v-text-field
                      v-model="local.nome"
                      color="dark"
                      label="Nome do Local"
                      hint="Ex.: Lab de Informática, Lab de Eletrônica"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-sheet
                  outlined
                  width="100%"
                  class="my-5"
                >
                  <v-col cols="12">
                    <v-chip
                      v-for="(apelido, index) in local.apelidos"
                      :key="index"
                      close
                      small
                      class="mr-2"
                      @click:close="deleteApelido(index)"
                    >
                      {{ apelido }}
                    </v-chip>
                    <v-text-field
                      v-model="apelidoText"
                      color="dark"
                      label="Apelidos"
                      hint="Ex.: MSI 4º Ano, Alimentos 1º Ano"
                      append-icon="mdi-plus-circle"
                      @click:append="addApelido"
                    />
                  </v-col>
                </v-sheet>
              </v-row>
              <v-row justify="end">
                <v-btn color="black darken-1" text @click="closeDialog">
                  Cancel
                </v-btn>
                <v-btn dark color="blue darken-1" type="submit" :loading="loading">
                  Save
                </v-btn>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-container>
      </template>
    </modal-base>
  </span>
</template>

<script>
import ModalBase from '~/components/Globals/ModalBase.vue'

export default {
  name: 'LocaisForm',
  components: {
    ModalBase
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    local: {
      id: '',
      nome: '',
      apelidos: []
    },
    localKey: '',
    loading: false,
    idText: '',
    apelidoText: ''
  }),
  computed: {
    isEdit () {
      return !!this.data
    }
  },
  beforeMount () {
    if (this.data) {
      this.local = { ...this.local, ...this.data }
      this.idText = this.data.id
      this.localKey = this.data['.key']
    }
  },
  methods: {
    closeDialog () {
      this.$store.commit('dialog/DIALOG_CLOSE')
      this.$refs.form.reset()
      this.local = {}
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.loading = true
          if (this.isEdit) {
            this.editLocal()
            return
          }

          this.addLocal()
        })
    },
    addLocal () {
      this.$store.dispatch('locais/addLocal', this.local)
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Local adicionado com sucesso',
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
        .finally(() => {
          this.closeDialog()
          this.loading = false
        })
    },
    addApelido () {
      if (this.apelidoText.trim()) {
        this.local.apelidos.push(this.apelidoText)
        this.apelidoText = ''
      }
    },
    editLocal () {
      this.$store.dispatch('locais/editLocal', {
        key: this.localKey,
        ...this.local
      })
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Dispositivo editado com sucesso',
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
        .finally(() => {
          this.closeDialog()
          this.loading = false
        })
    },
    deleteApelido (index) {
      this.local.apelidos.splice(index, 1)
    }
  }
}
</script>
