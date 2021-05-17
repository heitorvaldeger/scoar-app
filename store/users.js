import { firebaseAction } from 'vuexfire'

export const state = () => ({
  all: []
})

export const actions = {
  getUsers: firebaseAction(async function ({ commit }) {
    const response = await this.$axios.get('users')

    commit('SET_USERS', response.data.users)
  }),
  addUser: firebaseAction(function ({ commit }, user) {
    return this.$axios.post('users', user)
      .then((response) => {
        commit('ADD_USER', response.data.user)
      })
  }),
  deleteUser: firebaseAction(async function ({ commit }, uid) {
    const response = await this.$axios.delete(`users/${uid}`)
    commit('DELETE_USER', response.data.uid)
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
