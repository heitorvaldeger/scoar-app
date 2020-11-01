import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getUsers: firebaseAction(async function ({ bindFirebaseRef }) {
    const ref = this.$fireDb.ref('users')
    await bindFirebaseRef('all', ref)
  }),
  addUser: firebaseAction(async function (context, user) {
    const ref = this.$fireDb.ref('users')
    await ref.push({
      ...user,
      active: false
    })
  }),
  editUser: firebaseAction(async function (context, payload) {
    const { key, ...user } = payload
    const ref = this.$fireDb.ref(`users/${key}`)
    await ref.update({
      ...user
    })
  }),
  deleteUser: firebaseAction(async function (context, userKey) {
    const ref = this.$fireDb.ref(`users/${userKey}`)
    await ref.remove()
  })
}
