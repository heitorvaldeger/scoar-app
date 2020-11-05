<template>
  <modal-base @close="closeDialog">
    <template v-slot:header>
      <span class="headline">Atualizar Email</span>
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
                <ValidationProvider v-slot="{ errors }" name="Email Atual" rules="required">
                  <v-text-field
                    v-model="email"
                    label="Email Atual"
                    required
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Novo Email" rules="required">
                  <v-text-field
                    v-model="novo_email"
                    label="Novo Email"
                    required
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Confirmar Senha" rules="required">
                  <v-text-field
                    v-model="password"
                    type="password"
                    label="Digite sua senha"
                    hint="Para finalizar este processo é necessário informar a senha atual"
                    required
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
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
  name: 'UserUpdateEmail',
  components: {
    ModalBase
  },
  data: () => ({
    email: '',
    novo_email: '',
    password: '',
    loading: false
  }),
  methods: {
    closeDialog () {
      this.$store.commit('dialog/DIALOG_CLOSE')
      this.$refs.form.reset()
      this.email = this.novo_email = this.password = ''
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.loading = true
          this.$store.dispatch('users/updateEmail', {
            email: this.email,
            password: this.password,
            novo_email: this.novo_email
          })
            .then(() => {
              this.$notify({
                type: 'success',
                title: 'Email atualizado com sucesso',
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
