export const state = () => ({
  countrie: {
    country_id: 0,
    country_name: '',
    Visible: false
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
    state.countrie.country_id = 0
    state.countrie.country_name = ''
    state.countrie.Visible = ''
  },
  SET_COUNTRIE(state, sts) {
    state.countrie = sts
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
  }
}
export const getters = {
  getKaper(state) {
    return state.countrie
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
