export const state = () => ({
  user: null
})

export const actions = {
  async signIn (ctx, user) {
    const { email, password } = user

    return await this.$fire.auth.signInWithEmailAndPassword(email, password)
    // const usersRef = this.$fireDb.ref('users')

    // await usersRef.orderByChild('email').equalTo(email).once('value', (snaps) => {
    //   if (!snaps.val()) {
    //     return
    //   }
    //   snaps.forEach(async (snap) => {
    //     const active = snap.val().active
    //     if (active) {
    //       return await this.$fire.auth.signInWithEmailAndPassword(email, password)
    //     }

    //     return await this.$fire.auth.createUserWithEmailAndPassword(email, password)
    //       .then(() => {
    //         const userRef = this.$fireDb.ref(`users/${snap.key}`)
    //         userRef.update({
    //           active: true
    //         })
    //       })
    //   })
    // })
    // const snap = await ref.once('value', snap => snap)
    // return snap.val()
  },
  async signOut (ctx) {
    return await this.$fire.auth.signOut()
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
