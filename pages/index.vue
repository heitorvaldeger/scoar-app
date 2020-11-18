<template>
  <login />
</template>

<script>
import Login from '~/pages/login'

export default {
  components: {
    Login
  },
  middleware ({ store, redirect, route }) {
    if (route.name === 'index') {
      const user = store.state.auth.user
      if (!user) {
        return redirect('/login')
      }
      return redirect('/dashboard')
    }
  }
}
</script>
