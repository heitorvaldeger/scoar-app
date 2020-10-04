import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  addDispositivo: firebaseAction(async function (context, dispositivo) {
    const ref = this.$fireDb.ref('dispositivos')
    await ref.push({
      ...dispositivo
    })
  })
}
