<template>
  <span>
    <modal-base @close="closeDialog">
      <template v-slot:header>
        <span class="headline">
          {{
            !isEdit
              ? 'Novo Ar Condicionado'
              : 'Editando - ' + dispositivo.id
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
                      v-model="dispositivo.id"
                      label="ID do dispositivo"
                      hint="Ex.: AC01, AC02"
                      color="black darken-1"
                      required
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="Local" rules="required">
                    <v-autocomplete
                      v-model="dispositivo.local"
                      placeholder="Local do dispositivo"
                      color="black darken-1"
                      required
                      :item-value="(item) => item['.key']"
                      :item-text="(item) => {return `${item.id} - ${item.nome}`}"
                      :items="locais"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
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
import { mapState } from 'vuex'
import ModalBase from '~/components/Globals/ModalBase.vue'

export default {
  name: 'ArCondicionadoForm',
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
    dispositivo: {
      id: '',
      local: '',
      tipo: 1,
      status: false,
      temp: 16
    },
    isEdit: false,
    loading: false,
    idEditing: ''
  }),
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
  },
  beforeMount () {
    if (this.data) {
      this.isEdit = true
      this.dispositivo = Object.assign({}, this.data)
      this.idEditing = this.dispositivo.id = this.data['.key']
    }
  },
  methods: {
    closeDialog () {
      this.$store.commit('dialog/DIALOG_CLOSE')
      this.$refs.form.reset()
      this.dispositivo = {}
    },
    onSubmit () {
      this.$refs.form.validate()
        .then(async (success) => {
          if (!success) { return }

          const dispositivoExist =
            await this.$store.dispatch(
              'dispositivos/checkDispositivosAlreadyExists',
              this.dispositivo.id.toUpperCase()
            )

          if (dispositivoExist) {
            this.$notify({
              type: 'error',
              title: 'Este dispositivo já existe',
              closeOnClick: true
            })

            return
          }

          this.loading = true

          if (this.isEdit) {
            this.$store.dispatch('dispositivos/editDispositivo', {
              id: this.idEditing,
              ...this.dispositivo
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

          this.$store.dispatch('dispositivos/addDispositivo', {
            ...this.dispositivo
          })
            .then(() => {
              this.$notify({
                type: 'success',
                title: 'Dispositivo adicionado com sucesso',
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
