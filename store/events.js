export const state = () => ({
  events: {
    match_id: 0,
    country_id: 0,
    country_name: "",
    league_id: 0,
    league_name: '',
    match_date: new Date(),
    match_status: '',
    match_time: null,
    match_hometeam_id: 0,
    match_hometeam_name: '',
    match_hometeam_score: 0,
    match_awayteam_name: '',
    match_awayteam_id: 0,
    match_awayteam_score: 0,
    match_hometeam_halftime_score: 0,
    match_awayteam_halftime_score: 0,
    match_hometeam_extra_score: 0,
    match_awayteam_extra_score: 0,
    match_hometeam_penalty_score: 0,
    match_awayteam_penalty_score: 0,
    match_hometeam_system: '',
    match_awayteam_system: '',
    match_live: 0
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
    state.events.match_id = 0
    state.events.country_id = 0
    state.events.country_name = ""
    state.events.league_id = 0
    state.events.league_name = ''
    state.events.match_date = new Date()
    state.events.match_status = ''
    state.events.match_time = null
    state.events.match_hometeam_id = 0
    state.events.match_hometeam_name = ''
    state.events.match_hometeam_score = 0
    state.events.match_awayteam_name = ''
    state.events.match_awayteam_id = 0
    state.events.match_awayteam_score = 0
    state.events.match_hometeam_halftime_score = 0
    state.events.match_awayteam_halftime_score = 0
    state.events.match_hometeam_extra_score = 0
    state.events.match_awayteam_extra_score = 0
    state.events.match_hometeam_penalty_score = 0
    state.events.match_awayteam_penalty_score = 0
    state.events.match_hometeam_system = ''
    state.events.match_awayteam_system = ''
    state.events.match_live = 0
  },
  SET_EVENTS(state, sts) {
    state.events = sts
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
  async setEvents({
    commit
  }, data) {

    const {
      rc
    } = await this.$axios.$post('/api/Events', data)
    if (rc === 'ok') {
      commit('SET_EVENTS', data)
      commit('SET_PR_OPERATION', 'ok')
    } else {
      commit('SET_PR_OPERATION', 'no')
    }
  }
}
export const getters = {
  getEvents(state) {
    return state.events
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
