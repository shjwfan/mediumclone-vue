import api from '@/api/authentication'

const state = {
  isOnSubmit: false,
  errors: null,
}

const mutationsTypes = {
  loginStart: '[authentication] loginStart',
  loginSuccess: '[authentication] loginSuccess',
  loginFailure: '[authentication] loginFailure',

  registerStart: '[authentication] registerStart',
  registerSuccess: '[authentication] registerSuccess',
  registerFailure: '[authentication] registerFailure',
}

const actionsTypes = {
  login: '[authentication] login',
  register: '[authentication] register',
}

const gettersTypes = {
  isOnSubmit: '[authentication] isOnSubmit',
  errors: '[authentication] errors',
}

const mutations = {
  [mutationsTypes.loginStart](state) {
    state.isOnSubmit = true
    state.errors = null
  },
  [mutationsTypes.loginSuccess](state) {
    state.isOnSubmit = false
    state.errors = null
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isOnSubmit = false
    state.errors = payload
  },

  [mutationsTypes.registerStart](state) {
    state.isOnSubmit = true
    state.errors = null
  },
  [mutationsTypes.registerSuccess](state) {
    state.isOnSubmit = false
    state.errors = null
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isOnSubmit = false
    state.errors = payload
  },
}

const actions = {
  [actionsTypes.login](c, credentials) {
    return new Promise((resolve, reject) => {
      c.commit(mutationsTypes.loginStart)
      api
        .login(credentials)
        .then(response => {
          const token = response.data.user.token
          c.commit(mutationsTypes.loginSuccess)

          try {
            localStorage.setItem('token', JSON.stringify(token))
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }

          resolve(token)
        })
        .catch(error => {
          const errors = error.response.data.errors
          c.commit(mutationsTypes.loginFailure, errors)

          reject(errors)
        })
    })
  },
  [actionsTypes.register](c, credentials) {
    return new Promise((resolve, reject) => {
      c.commit(mutationsTypes.registerStart)
      api
        .register(credentials)
        .then(response => {
          const token = response.data.user.token
          c.commit(mutationsTypes.registerSuccess)

          try {
            localStorage.setItem('token', JSON.stringify(token))
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }

          resolve(token)
        })
        .catch(error => {
          const errors = error.response.data.errors
          c.commit(mutationsTypes.registerFailure, errors)

          reject(errors)
        })
    })
  },
}

const getters = {
  [gettersTypes.isOnSubmit]: state => {
    return state.isOnSubmit
  },
  [gettersTypes.errors]: state => {
    return state.errors
  },
}

export {mutationsTypes, actionsTypes, gettersTypes}

export default {
  state,
  mutations,
  actions,
  getters,
}
