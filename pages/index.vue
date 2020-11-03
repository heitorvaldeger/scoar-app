<template>
  <login />
</template>

<script>
import Login from '~/pages/login'

export default {
  name: 'Home',
  middleware: 'guest',
  components: {
    Login
  }
}
</script>
