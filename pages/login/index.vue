<template>
  <v-container fluid class="fill-height justify-center">
    <v-card min-width="300">
      <v-card-title class="justify-center">
        <img src="~/assets/images/ifrn-logo.png" width="200">
      </v-card-title>
      <v-card-subtitle class="ma-auto text-center">
        <v-divider />
        <h2 class="mt-5">
          Login
        </h2>
      </v-card-subtitle>
      <v-card-text>
        <ValidationObserver ref="form">
          <v-form
            autocomplete="off"
            @submit.prevent="login"
          >
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Email" rules="required">
                  <v-text-field
                    v-model="user.email"
                    label="Email"
                    type="email"
                    required
                    :error-messages="errors"
                    color="dark"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Senha" rules="required">
                  <v-text-field
                    v-model="user.password"
                    label="Senha"
                    required
                    :error-messages="errors"
                    color="dark"
                    type="password"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-center" cols="12">
                <v-btn
                  class="mb-2 btn-password"
                  text
                  link
                  small
                  @click="resetPassword"
                >
                  Esqueceu sua senha ou deseja atualizar?
                </v-btn>
              </v-col>
              <v-col class="text-center" cols="12">
                <v-btn
                  dark
                  color="dark darken-1"
                  depressed
                  type="submit"
                  :loading="loading"
                >
                  Entrar
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

const errorsLoginFirebase = [
  {
    code: 'auth/invalid-email',
    message: 'Endereço de email inválido'
  },
  {
    code: 'auth/user-not-found',
    message: 'Email ou senha incorretos'
  },
  {
    code: 'auth/wrong-password',
    message: 'Email ou senha incorretos'
  }
]

export default {
  name: 'Login',
  middleware: 'guest',
  data: () => ({
    user: {},
    loading: false
  }),
  computed: {
    ...mapState({
      authUser: state => state.auth.user
    })
  },
  watch: {
    authUser (val) {
      if (val) {
        this.$router.push('dashboard')
      }
      this.loading = false
    }
  },
  methods: {
    resetPassword () {
      this.$store.commit('dialog/DIALOG_OPEN', {
        component: 'ResetPassword'
      })
    },
    login () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) {
            return
          }

          this.loading = true
          this.$store.dispatch('auth/signIn', this.user)
            .catch((err) => {
              const error = errorsLoginFirebase.find(item => item.code === err.code)

              this.$notify({
                type: 'error',
                title: error.message,
                closeOnClick: true
              })
              this.loading = false
            })
        })
    }
  }
}
</script>
