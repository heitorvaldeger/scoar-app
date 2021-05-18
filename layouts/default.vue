<template>
  <v-app dark>
    <v-main>
      <v-container fluid class="fill-height justify-center">
        <nuxt />
      </v-container>
    </v-main>
    <notifications position="bottom center" />
    <component :is="dialogName || null" :data="dialogData" />
  </v-app>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  data () {
    return {
      title: 'Vuetify.js'
    }
  },
  computed: {
    ...mapState({
      dialogData: state => state.dialog.data
    }),
    ...mapGetters({
      dialogName: 'dialog/COMPONENT_DIALOG'
    })
  }
}
</script>
