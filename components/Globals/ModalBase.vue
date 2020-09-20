<template>
  <v-dialog v-show="modal" v-model="modal" max-width="500px" @click:outside="close">
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
export default {
  name: 'ModalBase',
  props: {
    modal: {
      type: Boolean,
      defauly: false
    },
    close: {
      type: Function,
      default: null
    }
  }
}
</script>
