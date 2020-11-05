<template>
  <modal-base @close="closeDialog">
    <template v-slot:header>
      <span class="headline">Editar Local</span>
    </template>

    <template v-slot:content>
      <v-container>
        <ValidationObserver ref="form">
          <v-form autocomplete="off" @submit.prevent="onSubmit">
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="ID" rules="required">
                  <v-text-field
                    v-model="local.id"
                    color="black"
                    label="ID do Local"
                    hint="Ex.: C22, A28"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="ID" rules="required">
                  <v-text-field
                    v-model="local.nome"
                    color="black"
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
                  color="black"
                  label="Apelidos"
                  hint="Ex.: MSI 4º Ano, Alimentos 1º Ano"
                />
              </v-col>
            </v-row>
            <v-row justify="end">
              <v-btn color="black darken-1" text @click="closeDialog">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" dark type="submit" :loading="loading">
                Save
              </v-btn>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-container>
    </template>
  </modal-base>
</template>

<script>
import ModalBase from '~/components/Globals/ModalBase.vue'

export default {
  name: 'LocaisEdit',
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
    loading: false
  }),
  mounted () {
    this.local = Object.assign({}, this.data)
    this.local.key = this.data['.key']
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
          this.$store.dispatch('locais/editLocal', this.local)
            .then(() => {
              this.$notify({
                type: 'success',
                title: 'Local editado com sucesso',
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
