<template>
  <modal-base @close="closeDialog">
    <template v-slot:header>
      <span class="headline">Editar Dispositivo</span>
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
                <v-radio-group v-model="dispositivo.tipo">
                  <template v-slot:label>
                    <div>Tipo de Dispositivo</div>
                  </template>
                  <v-radio
                    color="black darken-1"
                    class="mt-5"
                    label="Ar Condicionado"
                    value="Ar Condicionado"
                  />
                </v-radio-group>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="dispositivoKey"
                  color="black darken-1"
                  disabled
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Local" rules="required">
                  <v-autocomplete
                    v-model="dispositivo.local"
                    placeholder="Local do dispositivo"
                    required
                    color="black darken-1"
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
</template>

<script>
import { mapState } from 'vuex'
import ModalBase from '~/components/Globals/ModalBase.vue'

export default {
  name: 'DispositivosEdit',
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
    dispositivo: {},
    dispositivoKey: '',
    loading: false
  }),
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
  },
  beforeMount () {
    this.dispositivo = Object.assign({}, this.data)
    this.dispositivoKey = this.data['.key']
  },
  methods: {
    closeDialog () {
      this.$store.commit('dialog/DIALOG_CLOSE')
      this.dispositivo = {}
      this.dispositivoKey = ''
      this.$refs.form.reset()
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.loading = true
          this.$store.dispatch('dispositivos/editDispositivo', {
            ...this.dispositivo,
            key: this.dispositivoKey
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
        })
    }
  }
}
</script>
