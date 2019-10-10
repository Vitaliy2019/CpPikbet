export const state = () => ({
  avatar: {
    Id: 0,
    Avatar: 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191',
    Desc: ''
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
    state.avatar.Id = 0
    state.avatar.Avatar = 'https://wpimg.wallstcn.com/577965b9-bb9e-4e02-9f0c-095b41417191'
    state.avatar.Desc = ''
  },
  SET_AVATAR(state, sts) {
    state.avatar = sts
  },
  SET_PR_OPERATION(state, sts) {
    state.prOperation = sts
  },
  SET_DIALOG_FORM(state, sts) {
    state.dialogForm = sts
  },
  SET_IMAGE_DATA(state, sts) {
    state.avatar.Avatar = sts
  }
}
export const actions = {
  async initAvatar({
    commit
  }, data) {

    const {
      avatar
    } = await this.$axios.$get(
      `/api/Avatars/${data}`
    )
    commit('SET_AVATAR', avatar)
  },
  setPrGetList({
    commit
  }, data) {
    commit('SET_PR_GETLIST', data)
  },
  async setAvatar({
    commit
  }, data) {
    const {
      rc
    } = await this.$axios.$post('/api/Avatars', data)
    if (rc === 'ok') {
      commit('SET_AVATAR', data)
      commit('SET_PR_OPERATION', 'ok')
    } else {
      commit('SET_PR_OPERATION', 'no')
    }
  },
  setImageData({
    commit
  }, data) {
    commit('SET_IMAGE_DATA', data)
  }
}
export const getters = {
  getAvatar(state) {
    return state.avatar
  },
  getDialogForm(state) {
    return state.dialogForm
  },
  getPrOperation(state) {
    return state.prOperation
  },
  getPrGetList(state) {
    return state.prGetList
  },
  getImageData(state) {
    return state.avatar.Avatar
  }
}
