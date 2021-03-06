export const state = () => ({
  open: false,
  component: null,
  data: null
})

export const getters = {
  COMPONENT_DIALOG (state) {
    return state.component
  }
}

export const mutations = {
  DIALOG_OPEN (state, payload) {
    const { component, data } = payload
    state.component = () => import('~/components/Forms/' + component)
    state.data = data || null
    state.open = true
  },
  DIALOG_CLOSE (state) {
    state.open = false
    state.component = null
    state.data = null
  }
}
