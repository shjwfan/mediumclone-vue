import api from '@/api/user'

const state = {
  user: null,
  pullingErrors: null,
  isPulling: false,
}

const mutationsTypes = {
  pullingUserStart: '[user] pullingUserStart',
  pullingUserSuccess: '[user] pullingUserSuccess',
  pullingUserFailure: '[user] pullingUserFailure',
}

const actionsTypes = {
  pullUser: '[user] pullUser',
}

const gettersTypes = {
  user: '[user] user',
  pullingErrors: '[user] pullingErrors',
  isPulling: '[user] isPulling',
}

const mutations = {
  [mutationsTypes.pullingUserStart](state) {
    state.user = null
    state.pullingErrors = null
    state.isPulling = true
  },
  [mutationsTypes.pullingUserSuccess](state, payload) {
    state.user = payload
    state.pullingErrors = null
    state.isPulling = false
  },
  [mutationsTypes.pullingUserFailure](state, payload) {
    state.user = null
    state.pullingError = payload
    state.isPulling = false
  },
}

const actions = {
  [actionsTypes.pullUser](c) {
    return new Promise((resolve, reject) => {
      c.commit(mutationsTypes.pullingUserStart)
      api
        .pullUser()
        .then(response => {
          const user = response.data.user
          c.commit(mutationsTypes.pullingUserSuccess, user)

          resolve(user)
        })
        .catch(error => {
          const errors = error.response.data.errors
          c.commit(mutationsTypes.pullingUserFailure, errors)

          reject(errors)
        })
    })
  },
}

const getters = {
  [gettersTypes.user]: state => {
    return state.user
  },
  [gettersTypes.pullingErrors]: state => {
    return state.pullingErrors
  },
  [gettersTypes.isPulling]: state => {
    return state.isPulling
  },
}

export {mutationsTypes, actionsTypes, gettersTypes}

export default {
  state,
  mutations,
  actions,
  getters,
}
