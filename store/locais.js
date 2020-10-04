import { firebaseAction } from 'vuexfire'
export const state = () => ({
  all: []
})

export const actions = {
  getLocais: firebaseAction(async function ({ bindFirebaseRef }) {
    const ref = this.$fireDb.ref('locais')
    await bindFirebaseRef('all', ref)
  }),
  addLocal: firebaseAction(async function (context, local) {
    const ref = this.$fireDb.ref('locais')
    await ref.push({
      ...local
    })
  }),
  editLocal: firebaseAction(async function (context, local) {
    const ref = this.$fireDb.ref(`locais/${local.key}`)
    await ref.update({
      ...local
    })
  }),
  deleteLocal: firebaseAction(async function (context, localKey) {
    const ref = this.$fireDb.ref(`locais/${localKey}`)
    await ref.remove()
  })
}
