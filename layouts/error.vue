<template>
  <v-app dark>
    <v-main>
      <v-container class="fill-height justify-center">
        <v-card min-width="500" class="text-center py-4">
          <v-card-title class="justify-center">
            <img src="~/assets/images/ifrn-logo.png" width="240">
          </v-card-title>
          <h1 v-if="error.statusCode === 404" style="font-size: 25pt;" class="my-5 px-4">
            {{ pageNotFound }}
          </h1>

          <v-btn to="/dashboard" depressed color="#00897b" dark class="my-2">
            VOLTAR
          </v-btn>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'Erro 404: Página não encontrada',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
