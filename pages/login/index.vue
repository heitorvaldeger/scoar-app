<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <v-card>
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
              </v-form>
            </ValidationObserver>
          </v-card-text>
          <v-card-actions>
            <v-row>
              <v-col class="text-center">
                <v-btn
                  dark
                  color="dark darken-1"
                  depressed
                  type="submit"
                  @click="login"
                >
                  Entrar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

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
    }
  },
  methods: {
    login () {
      this.loading = true
      this.$store.dispatch('auth/signIn', this.user)
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
