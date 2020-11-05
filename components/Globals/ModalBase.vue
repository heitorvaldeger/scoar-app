<template>
  <v-dialog v-model="open" max-width="500px" @click:outside="close">
    <v-card>
      <v-card-title>
        <slot name="header" />
      </v-card-title>
      <v-card-text>
        <slot name="content" />
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalBase',
  computed: {
    ...mapState({
      open: state => state.dialog.open
    })
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
