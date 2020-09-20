<template>
  <div class="text-center">
    <v-dialog
      v-model="modal.status"
      width="500"
      @click:outside="close"
    >
      <v-card>
        <v-card-title class="headline lighten-2 text-capitalize font-weight-light">
          {{ modal.title }} dispositivo
        </v-card-title>

        <v-card-text>
          <ValidationObserver ref="observer" v-slot="{ reset }">
            <v-form @reset.prevent="reset">
              <v-container>
                <ValidationProvider v-slot="{ errors }" name="ID" rules="required">
                  <v-text-field
                    v-model="model.id"
                    placeholder="ID do dispositivo"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
                  <v-text-field
                    v-model="model.nome"
                    placeholder="Nome do dispositivo"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" name="Local" rules="required">
                  <v-autocomplete
                    v-model="model.local"
                    placeholder="Local do dispositivo"
                    required
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-container>
            </v-form>
          </ValidationObserver>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="close"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            depressed
            @click="submit"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'DispositivosModal',
  props: {
    modal: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    model: {}
  }),
  created () {
    if (this.modal.data) {
      this.model = Object.assign({}, this.modal.data)
    }
  },
  methods: {
    submit () {
      ''
    },
    close () {
      this.$refs.observer.reset()
      this.$emit('close')
    }
  }
}
</script>
