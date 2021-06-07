import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getDispositivos: firebaseAction(
    function ({ bindFirebaseRef }) {
      const ref = this.$fire.database.ref('dispositivos')
      return bindFirebaseRef('all', ref)
    }
  ),
  getDispositivosByTipo: firebaseAction(
    function ({ bindFirebaseRef }, dispositivoTipo) {
      const ref = this.$fire.database.ref('dispositivos')
      return bindFirebaseRef('all', ref.orderByChild('tipo').equalTo(dispositivoTipo))
    }
  ),
  addDispositivo: firebaseAction(function (context, dispositivo) {
    const { id, ...rest } = dispositivo

    const ref = this.$fire.database.ref(`dispositivos/${id}`)
    return ref.set({
      ...rest
    })
  }),
  editDispositivo: firebaseAction(async function (content, dispositivo) {
    const { id, ...rest } = dispositivo
    const ref = this.$fire.database.ref(`dispositivos/${id}`)

    await ref.update({
      ...rest
    })
  }),
  deleteDispositivo: firebaseAction(async function (context, dispositivoKey) {
    const ref = this.$fire.database.ref(`dispositivos/${dispositivoKey}`)
    await ref.remove()
  })
}
