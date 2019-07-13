export const state = () => ({
  competitions: {
    country_id: 0,
    country_name: '',
    league_id: 0,
    league_name: ''
  },
  prOperation: 'ok',
  dialogForm: false,
  prGetList: false
})

export const mutations = {
  SET_PR_GETLIST(state, sts) {
    state.prGetList = sts
  },
  RESET(state) {
    state.competitions.country_id = 0
    state.competitions.country_name = ''
    state.competitions.league_id = 0
    state.competitions.league_name = ''
  },
  SET_COMPETITIONS(state, sts) {
    state.competitions = sts
  },
  SET_PR_OPERATION(state, sts) {
    state.prOperation = sts
  },
  SET_DIALOG_FORM(state, sts) {
    state.dialogForm = sts
  }
}
export const actions = {

  setPrGetList({
    commit
  }, data) {
    commit('SET_PR_GETLIST', data)
  },
  async setCompetitions({
    commit
  }, data) {

    const {
      rc
    } = await this.$axios.$post('/api/Competitions', data)
    if (rc === 'ok') {
      commit('SET_COMPETITIONS', data)
      commit('SET_PR_OPERATION', 'ok')
    } else {
      commit('SET_PR_OPERATION', 'no')
    }
  }
}
export const getters = {
  getCompetitions(state) {
    return state.competitions
  },
  getDialogForm(state) {
    return state.dialogForm
  },
  getPrOperation(state) {
    return state.prOperation
  },
  getPrGetList(state) {
    return state.prGetList
  }
}
