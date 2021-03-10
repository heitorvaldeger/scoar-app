import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getDispositivos: firebaseAction(function ({ bindFirebaseRef }) {
    const ref = this.$fire.database.ref('dispositivos')
    return bindFirebaseRef('all', ref)
  }),
  addDispositivo: firebaseAction(function (context, dispositivo) {
    const { id, ...rest } = dispositivo

    const ref = this.$fire.database.ref(`dispositivos/${id}`)
    return ref.set({
      status: false,
      temp: 16,
      ...rest
    })
  }),
  editDispositivo: firebaseAction(async function (content, dispositivo) {
    const { key, ...rest } = dispositivo
    const ref = this.$fire.database.ref(`dispositivos/${key}`)

    await ref.update({
      ...rest
    })
  }),
  deleteDispositivo: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    await ref.remove()
  }),
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
  setStatus: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    return await ref.transaction(function (dispositivo) {
      dispositivo.status = !dispositivo.status

      return dispositivo
    })
  }),
  async checkDispositivosAlreadyExists (context, dispositivoKey) {
    const result = await this.$fire.database.ref(`/dispositivos/${dispositivoKey}`).once('value')
    return result.val()
  }
}
