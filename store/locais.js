import { firebaseAction } from 'vuexfire'
export const state = () => ({
  all: [],
  local: {}
})

export const actions = {
  getLocais: firebaseAction(async function ({ bindFirebaseRef }) {
    const ref = this.$fire.database.ref('locais')
    await bindFirebaseRef('all', ref)
  }),
  getLocal: firebaseAction(async function ({ commit }, localKey) {
    const ref = this.$fire.database.ref(`locais/${localKey}`)
    const snap = await ref.once('value', snap => snap)
    return snap.val()
  }),
  addLocal: firebaseAction(async function (context, local) {
    const ref = this.$fire.database.ref('locais')
    await ref.push({
      ...local
    })
  }),
  editLocal: firebaseAction(async function (context, local) {
    const { key, ...rest } = local
    const ref = this.$fire.database.ref(`locais/${key}`)
    await ref.update({
      ...rest
    })
  }),
  deleteLocal: firebaseAction(async function (context, localKey) {
    const ref = this.$fire.database.ref(`locais/${localKey}`)
    await ref.remove()
  })
}
