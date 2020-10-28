<template>
  <v-dialog v-model="visible" max-width="500px" @click:outside="visible = false">
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
    show: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    visible: {
      get () {
        return this.show
      },
      set (value) {
        if (!value) { this.$emit('close') }
      }
    }
  }
}
</script>
