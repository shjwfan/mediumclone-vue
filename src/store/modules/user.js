import api from '@/api/user'

const state = {
  user: null,
  pullingError: null,
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
  pullingError: '[user] pullingError',
  isPulling: '[user] isPulling',
}

const mutations = {
  [mutationsTypes.pullingUserStart](state) {
    state.user = null
    state.pullingError = null
    state.isPulling = true
  },
  [mutationsTypes.pullingUserSuccess](state, payload) {
    state.user = payload
    state.pullingError = null
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
  [gettersTypes.pullingError]: state => {
    return state.pullingError
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
