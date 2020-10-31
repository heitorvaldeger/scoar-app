export const state = () => ({
  user: null
})

export const actions = {
  async signIn (ctx, user) {
    const { email, password } = user

    return await this.$fireAuth.signInWithEmailAndPassword(email, password)
  },
  async signOut (ctx) {
    return await this.$fireAuth.signOut()
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
      isAdmin: claims.custom_claim
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
