import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getUsers: firebaseAction(async function ({ commit }) {
    const res = await this.$fire.functions.httpsCallable('getListUsers')()
    commit('SET_USERS', res.data.users)
  }),
  addUser: firebaseAction(async function ({ commit }, user) {
    const res = await this.$fire.functions.httpsCallable('createNewUser')(user)
    commit('ADD_USER', res.data)
  }),
  deleteUser: firebaseAction(async function ({ commit }, uid) {
    const res = await this.$fire.functions.httpsCallable('deleteUser')(uid)
    commit('DELETE_USER', res.data.uid)
  }),
  updateEmail: firebaseAction(async function (ctx, user) {
    const currentUser = this.$fire.auth.currentUser

    const credentials = this.$fireModule.auth.EmailAuthProvider.credential(
      user.email,
      user.password
    )
    return await currentUser.reauthenticateWithCredential(credentials)
      .then(() => {
        return currentUser.updateEmail(user.novo_email)
      })
  })
}

export const mutations = {
  SET_USERS: (state, users) => {
    state.all = users
  },
  ADD_USER: (state, user) => {
    state.all.push(user)
  },
  DELETE_USER: (state, uid) => {
    const index = state.all.findIndex(item => item.uid === uid)
    state.all.splice(index, 1)
  }
}
