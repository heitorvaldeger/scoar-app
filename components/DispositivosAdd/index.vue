<template>
  <div>
    <v-btn
      color="gray"
      dark
      @click="open"
    >
      Novo Dispositivo
    </v-btn>
    <modal-base v-show="modal" :modal="modal" :close="close">
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
                      v-model="dispositivo.localKey"
                      placeholder="Local do dispositivo"
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
                <v-btn color="black darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn dark color="blue darken-1" depressed type="submit">
                  Save
                </v-btn>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-container>
      </template>
    </modal-base>
  </div>
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
    modal: false,
    dispositivo: {},
    typeGroup: 'Ar Condicionado'
  }),
  computed: {
    ...mapState({
      locais: state => state.locais.all
    })
  },
  methods: {
    open () {
      this.modal = true
    },
    close () {
      this.modal = false
      this.$refs.form.reset()
      this.dispositivo = {}
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.$store.dispatch('dispositivos/addDispositivo', {
            ...this.dispositivo,
            nome: this.typeGroup
          })
            .then(() => {
              this.close()
            })
        })
    }
  }
}
</script>
