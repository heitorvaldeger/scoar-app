import { firebaseAction } from 'vuexfire'

export const actions = {
  incrementTemp: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.temp++

      return dispositivo
    })
  }),
  decrementTemp: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.temp--

      return dispositivo
    })
  }),
  updateStatus: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.status = !dispositivo.status

      return dispositivo
    })
  })
}
