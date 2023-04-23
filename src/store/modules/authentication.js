import api from '@/api/authentication'

const state = {
  isOnSubmit: false,
  errors: null,
  user: null,
}

const mutations = {
  registerStart(state) {
    state.isOnSubmit = true
    state.errors = null
  },
  registerSuccess(state, payload) {
    state.isOnSubmit = false
    state.user = payload
  },
  registerFailure(state, payload) {
    state.isOnSubmit = false
    state.errors = payload
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit('registerStart')
      api
        .register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user)
          resolve(response.data.user)
        })
        .catch(error => {
          context.commit('registerFailure', error.response.data.errors)
          reject(error.response.data.errors)
        })
    })
  },
}

export default {
  state,
  mutations,
  actions,
}
