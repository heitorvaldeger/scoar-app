<template>
  <v-col cols="4">
    <dispositivos-item />
  </v-col>
</template>

<script>
import DispositivosItem from '~/components/DispositivosItem'

export default {
  name: 'DispositivosList',
  components: {
    DispositivosItem
  }
}
</script>
