<template>
  <span>
    <modal-base @close="closeDialog">
      <template v-slot:header>
        <span class="headline">
          {{
            !isEdit
              ? 'Novo local'
              : 'Editando - ' + local.id
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
                <v-col cols="12">
                  <v-text-field
                    v-model="local.apelidos"
                    color="dark"
                    label="Apelidos"
                    hint="Ex.: MSI 4º Ano, Alimentos 1º Ano"
                  />
                </v-col>
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
    local: {},
    localKey: '',
    isEdit: false,
    loading: false
  }),
  beforeMount () {
    if (this.data) {
      this.isEdit = true
      this.local = Object.assign({}, this.data)
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
            return
          }

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
        })
    }
  }
}
</script>
