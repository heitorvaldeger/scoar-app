export const state = () => ({
  user: null
})

export const getters = {
  isAdmin (state) {
    if (!state.user) { return }
    return !!state.user.isAdmin
  }
}

export const actions = {
  async signIn (ctx, user) {
    const { email, password } = user

    return await this.$fire.auth.signInWithEmailAndPassword(email, password)
  },
  async signOut (ctx) {
    return await this.$fire.auth.signOut()
  },
  async resetPassword (ctx, email) {
    return await this.$fire.auth.sendPasswordResetEmail(email)
  },
  async onAuthStateChangedAction ({ commit }, { authUser, claims }) {
    if (!authUser) {
      await commit('CLEAR_USER')

      return
    }
    const { uid, email, emailVerified, displayName, idToken } = authUser
    commit('SET_USER', {
      uid,
      email,
      emailVerified,
      displayName,
      idToken,
      isAdmin: claims.admin
    })
  }
}

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
  },
  CLEAR_USER: (state) => {
    state.user = null
  }
}
