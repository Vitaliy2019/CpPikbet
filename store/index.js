export const state = () => ({
  drawer: true,
  sitekeyRecaptcha: '6LcQracUAAAAAPMx6OOE3H_ybYMOq24ScY2qN2r6'
})

export const mutations = {
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
