<template>
  <modal-base @close="closeDialog">
    <template v-slot:header>
      <span class="headline">Novo Usuário</span>
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
                <ValidationProvider v-slot="{ errors }" name="Nome" rules="required">
                  <v-text-field
                    v-model="user.displayName"
                    label="Nome do usuário"
                    required
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Email do Usuário" rules="required">
                  <v-text-field
                    v-model="user.email"
                    label="Email do Usuário"
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <ValidationProvider v-slot="{ errors }" name="Matrícula do Usuário" rules="required">
                  <v-text-field
                    v-model="user.matricula"
                    label="Matrícula do Usuário"
                    hint="A matrícula do usuário será sua senha no sistema"
                    color="black"
                    :error-messages="errors"
                  />
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="user.admin"
                  label="Administrador"
                />
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
  name: 'UsersForm',
  components: {
    ModalBase
  },
  data: () => ({
    user: {},
    loading: false
  }),
  methods: {
    closeDialog () {
      this.$store.commit('dialog/DIALOG_CLOSE')
      this.$refs.form.reset()
      this.user = {}
    },
    onSubmit () {
      this.$refs.form.validate()
        .then((success) => {
          if (!success) { return }

          this.loading = true
          this.$store.dispatch('users/addUser', this.user)
            .then(() => {
              this.$notify({
                type: 'success',
                title: 'Usuário criado com sucesso',
                closeOnClick: true
              })
            })
            .catch((err) => {
              this.$notify({
                type: 'error',
                title: err.response.data.message,
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
