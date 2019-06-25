export const strict = false
export const state = () => ({
  formThead: [],
  setDialogVisible: false,
  drawer: true,
  sitekeyRecaptcha: '6LcQracUAAAAAPMx6OOE3H_ybYMOq24ScY2qN2r6'
})

export const mutations = {
  SET_FORMTHEAD(state, sts) {
    state.formThead = sts
  },
  SET_DIALOGVISIBLE: (state, sts) => {
    state.setDialogVisible = sts
  },
  toggleDrawer(state) {
    state.drawer = !state.drawer
  },
  drawer(state, val) {
    state.drawer = val
  }

}

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}
