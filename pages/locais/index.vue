<template>
  <v-container>
    <locais-list />
  </v-container>
</template>

<script>
import LocaisList from '~/components/LocaisList'

export default {
  name: 'LocaisDashboard',
  layout: 'dashboard',
  middleware: ['auth', 'routers-private'],
  components: {
    LocaisList
  }
}
</script>
