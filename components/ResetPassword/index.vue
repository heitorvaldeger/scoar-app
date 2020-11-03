<template>
  <span>
    <v-btn
      class="mb-2"
      text
      link
      small
      @click="openDialog"
    >
      Esqueceu sua senha ?
    </v-btn>
    <modal-base :show="dialog" @close="closeDialog">
      <template v-slot:header>
        <span class="headline">Esqueceu sua senha ?</span>
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
                  <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
                    <v-text-field
                      v-model="email"
                      label="Email do Usuário"
                      hint="Digite o seu email para recuperar a senha"
                      required
                      color="black"
                      type="email"
                      :error-messages="errors"
                    />
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-btn color="black darken-1" text @click="closeDialog">
                  Cancel
                </v-btn>
                <v-btn color="black darken-1" dark type="submit" :loading="loading">
                  Enviar
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
  name: 'ResetPassword',
  components: {
    ModalBase
  },
  data: () => ({
    email: '',
    dialog: false,
    loading: false
  }),
  methods: {
    openDialog () {
      this.dialog = true
    },
    closeDialog () {
      this.dialog = false
      this.$refs.form.reset()
      this.email = ''
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.loading = true
          this.$store.dispatch('auth/resetPassword', this.email)
            .then(() => {
              this.$notify({
                type: 'success',
                title: 'Email enviado com sucesso',
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
              this.loading = false
              this.closeDialog()
            })
        })
    }
  }
}
</script>
