export const state = () => ({
  odds: {
    id: 0,
    matchName: '',
    Match_id: 0,
    Odd_bookmakers: '',
    Odd_date: null,
    Odd_1: 0,
    Odd_x: 0,
    Odd_2: 0,
    Odd_1x: 0,
    Odd_12: 0,
    Odd_x2: 0,
    Ah_4_5_1: 0,
    Ah_4_5_2: 0,
    Ah_4_1: '',
    Ah_4_2: 0,
    Ah_3_5_1: 0,
    Ah_3_5_2: 0,
    Ah_3_1: 0,
    Ah_3_2: 0,
    Ah_2_5_1: 0,
    Ah_2_5_2: 0,
    Ah_2_1: 0,
    Ah_2_2: 0,
    Ah_1_5_1: 0,
    Ah_1_5_2: 0,
    Ah_1_1: 0,
    Ah_1_2: 0,
    Ah_p4_5_1: 0,
    Ah_p4_5_2: 0,
    Ah_p4_1: '',
    Ah_p4_2: 0,
    Ah_p3_5_1: 0,
    Ah_p3_5_2: 0,
    Ah_p3_1: 0,
    Ah_p3_2: 0,
    Ah_p2_5_1: 0,
    Ah_p2_5_2: 0,
    Ah_p2_1: 0,
    Ah_p2_2: 0,
    Ah_p1_5_1: 0,
    Ah_p1_5_2: 0,
    Ah_p1_1: 0,
    Ah_p1_2: 0,
    Ah0_1: 0,
    Ah0_2: 0,
    O_0_5: '',
    U_0_5: 0,
    O_1: 0,
    U_1: 0,
    O_1_5: 0,
    U_1_5: 0,
    O_2: 0,
    U_2: 0,
    O_2_5: 0,
    u_2_5: 0,
    O_3: 0,
    U_3: 0,
    O_3_5: 0,
    U_3_5: 0,
    O_4_5: 0,
    U_4_5: 0,
    O_5_5: 0,
    U_5_5: 0,
    Bts_yes: 0,
    Bts_no: 0
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
    state.odds.id = 0
    state.odds.matchName = ''
    state.odds.Match_id = 0
    state.odds.Odd_bookmakers = ''
    state.odds.Odd_date = null
    state.odds.Odd_1 = 0
    state.odds.Odd_x = 0
    state.odds.Odd_2 = 0
    state.odds.Odd_1x = 0
    state.odds.Odd_12 = 0
    state.odds.Odd_x2 = 0
    state.odds.Ah_4_5_1 = 0
    state.odds.Ah_4_5_2 = 0
    state.odds.Ah_4_1 = ''
    state.odds.Ah_4_2 = 0
    state.odds.Ah_3_5_1 = 0
    state.odds.Ah_3_5_2 = 0
    state.odds.Ah_3_1 = 0
    state.odds.Ah_3_2 = 0
    state.odds.Ah_2_5_1 = 0
    state.odds.Ah_2_5_2 = 0
    state.odds.Ah_2_1 = 0
    state.odds.Ah_2_2 = 0
    state.odds.Ah_1_5_1 = 0
    state.odds.Ah_1_5_2 = 0
    state.odds.Ah_1_1 = 0
    state.odds.Ah_1_2 = 0
    state.odds.Ah_p4_5_1 = 0
    state.odds.Ah_p4_5_2 = 0
    state.odds.Ah_p4_1 = ''
    state.odds.Ah_p4_2 = 0
    state.odds.Ah_p3_5_1 = 0
    state.odds.Ah_p3_5_2 = 0
    state.odds.Ah_p3_1 = 0
    state.odds.Ah_p3_2 = 0
    state.odds.Ah_p2_5_1 = 0
    state.odds.Ah_p2_5_2 = 0
    state.odds.Ah_p2_1 = 0
    state.odds.Ah_p2_2 = 0
    state.odds.Ah_p1_5_1 = 0
    state.odds.Ah_p1_5_2 = 0
    state.odds.Ah_p1_1 = 0
    state.odds.Ah_p1_2 = 0
    state.odds.Ah0_1 = 0
    state.odds.Ah0_2 = 0
    state.odds.O_0_5 = ''
    state.odds.state.odds.U_0_5 = 0
    state.odds.O_1 = 0
    state.odds.U_1 = 0
    state.odds.O_1_5 = 0
    state.odds.U_1_5 = 0
    state.odds.O_2 = 0
    state.odds.U_2 = 0
    state.odds.O_2_5 = 0
    state.odds.U_2_5 = 0
    state.odds.O_3 = 0
    state.odds.U_3 = 0
    state.odds.O_3_5 = 0
    state.odds.U_3_5 = 0
    state.odds.O_4_5 = 0
    state.odds.U_4_5 = 0
    state.odds.O_5_5 = 0
    state.odds.U_5_5 = 0
    state.odds.Bts_yes = 0
    state.odds.Bts_no = 0
  },
  SET_ODDS(state, sts) {
    state.odds = sts
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
  async setOdds({
    commit
  }, data) {

    const {
      rc
    } = await this.$axios.$post('/api/Odds', data)
    if (rc === 'ok') {
      commit('SET_ODDS', data)
      commit('SET_PR_OPERATION', 'ok')
    } else {
      commit('SET_PR_OPERATION', 'no')
    }
  }
}
export const getters = {
  getOdds(state) {
    return state.odds
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
