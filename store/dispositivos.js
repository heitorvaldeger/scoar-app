import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getDispositivos: firebaseAction(function ({ bindFirebaseRef }) {
    const ref = this.$fireDb.ref('dispositivos')
    return bindFirebaseRef('all', ref)
  }),
  addDispositivo: firebaseAction(function (context, dispositivo) {
    const { id, nome, localKey } = dispositivo
    const ref = this.$fireDb.ref('dispositivos')
    return ref.push().set({
      id,
      nome,
      status: false,
      temp: 16,
      local: localKey
    })
  }),
  deleteDispositivo: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fireDb.ref(`dispositivos/${dispositivoKey}`)
    await ref.remove()
  }),
  incrementTemp: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fireDb.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.temp++

      return dispositivo
    })
  }),
  decrementTemp: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fireDb.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.temp--

      return dispositivo
    })
  }),
  setStatus: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fireDb.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.status = !dispositivo.status

      return dispositivo
    })
  })
}
