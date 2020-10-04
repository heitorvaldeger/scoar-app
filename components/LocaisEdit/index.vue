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
          <ValidationObserver ref="form">
            <v-form autocomplete="off" @submit.prevent="onSubmit">
              <v-row>
                <v-col cols="12">
                  <ValidationProvider v-slot="{ errors }" name="ID" rules="required">
                    <v-text-field
                      v-model="local.id"
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
                    label="Apelidos"
                    hint="Ex.: MSI 4º Ano, Alimentos 1º Ano"
                  />
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn color="black darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text type="submit">
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
  name: 'LocaisEdit',
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
    local: {}
  }),
  mounted () {
    this.local = Object.assign({}, this.item)
    this.local.key = this.item['.key']
  },
  methods: {
    open () {
      this.modal = true
    },
    close () {
      this.modal = false
      this.$refs.form.reset()
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.$store.dispatch('locais/editLocal', this.local)
            .then(() => {
              this.close()
            })
        })
    }
  }
}
</script>
