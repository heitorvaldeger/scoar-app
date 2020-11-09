<template>
  <v-container>
    <users-list />
  </v-container>
</template>

<script>
import UsersList from '~/components/UsersList'

export default {
  name: 'UsersDashboard',
  layout: 'dashboard',
  middleware: ['auth', 'routers-private'],
  components: {
    UsersList
  }
}
</script>
