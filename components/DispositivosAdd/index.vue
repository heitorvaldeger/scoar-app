<template>
  <span>
    <modal-base @close="closeDialog">
      <template v-slot:header>
        <span class="headline">Novo Dispositivo</span>
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
                  <v-radio-group v-model="typeGroup">
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
  name: 'DispositivosAdd',
  components: {
    ModalBase
  },
  data: () => ({
    dispositivo: {},
    typeGroup: 'Ar Condicionado',
    loading: false
  }),
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
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
            await this.$store.dispatch('dispositivos/checkDispositivosAlreadyExists', this.dispositivo.id.toUpperCase())

          if (dispositivoExist) {
            this.$notify({
              type: 'error',
              title: 'Este dispositivo já existe',
              closeOnClick: true
            })

            return
          }

          this.$store.dispatch('dispositivos/addDispositivo', {
            ...this.dispositivo,
            tipo: this.typeGroup
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
