<template>
  <v-container>
    <v-row justify="center">
      <v-col v-for="(item, index) in devicesTypes" :key="index" class="card-header-devices">
        <v-card outlined :disabled="!!item.disabled" @click="() => {}">
          <v-card-title class="justify-center">
            <v-icon>{{ item.icon }}</v-icon>
          </v-card-title>
          <v-card-subtitle class="text-center">
            {{ item.name }}
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'DashboardPage',
  layout: 'dashboard',
  middleware: 'auth',
  data: () => ({
    devicesTypes: [
      { name: 'Ar Condicionado', icon: 'mdi-air-conditioner' },
      { name: 'Luzes', icon: 'mdi-lightbulb', disabled: true },
      { name: 'Caldeira', icon: 'mdi-beaker', disabled: true }
    ]
  }),
  beforeCreate () {
    this.$store.dispatch('locais/getLocais')
  }
}
</script>

<style scoped>
.card-header-devices {
  min-width: auto;
}
</style>
