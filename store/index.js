export const strict = false
export const state = () => ({
  formThead: [],
  setDialogVisible: false,
  drawer: true,
  sitekeyRecaptcha: '6LcQracUAAAAAPMx6OOE3H_ybYMOq24ScY2qN2r6',
  //ApiKey: "6635458bbc88f9918071bd30f9f0f4901d5ec195742a2644d9f826a0dc8b2d4d",
  ApiCountries: []
})

export const mutations = {
  SET_API_COUNTRIES(state, sts) {
    state.ApiCountries = sts
  },
  /*SET_API_KEY(state, sts) {
    state.ApiKey = sts
  },*/
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

export const actions = {
  async initApiKey({
    commit
  }) {
    const data = await this.$axios.$get('/api/Api/getCountries')
    commit('SET_API_COUNTRIES', data)
  }
}

export const getters = {
  getApiCountries: state => state.ApiCountries,
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}
