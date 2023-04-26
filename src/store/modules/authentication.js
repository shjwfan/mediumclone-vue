import api from '@/api/authentication'

const state = {
  isOnSubmit: false,
  isPullingUser: false,
  errors: null,
  user: null,
}

const mutationsTypes = {
  loginStart: '[authentication] loginStart',
  loginSuccess: '[authentication] loginSuccess',
  loginFailure: '[authentication] loginFailure',

  registerStart: '[authentication] registerStart',
  registerSuccess: '[authentication] registerSuccess',
  registerFailure: '[authentication] registerFailure',

  pullUserStart: '[authentication] pullUserStart',
  pullUserSuccess: '[authentication] pullUserSuccess',
  pullUserFailure: '[authentication] pullUserFailure',
}

const actionsTypes = {
  login: '[authentication] login',
  register: '[authentication] register',
  pullUser: '[authentication] getUser',
}

const gettersTypes = {
  isAnonymous: '[authentication] isAnonymous',
  isPullingUser: '[authentication] isPullingUser',
  isOnSubmit: '[authentication] isOnSubmit',
  errors: '[authentication] errors',
  user: '[authentication] user',
}

const mutations = {
  [mutationsTypes.loginStart](state) {
    state.isOnSubmit = true
    state.errors = null
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isOnSubmit = false
    state.user = payload
  },
  [mutationsTypes.loginFailure](state, payload) {
    state.isOnSubmit = false
    state.errors = payload
  },

  [mutationsTypes.registerStart](state) {
    state.isOnSubmit = true
    state.errors = null
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isOnSubmit = false
    state.user = payload
  },
  [mutationsTypes.registerFailure](state, payload) {
    state.isOnSubmit = false
    state.errors = payload
  },

  [mutationsTypes.pullUserStart](state) {
    state.isPullingUser = true;
  },
  [mutationsTypes.pullUserSuccess](state, payload) {
    state.isPullingUser = false;
    state.user = payload
  },
  [mutationsTypes.pullUserFailure](state) {
    state.isPullingUser = false;
    state.user = null
  }
}

const actions = {
  [actionsTypes.login](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationsTypes.loginStart)
      api
        .login(credentials)
        .then(response => {
          const user = response.data.user
          context.commit(mutationsTypes.loginSuccess, user)

          try {
            localStorage.setItem('token', JSON.stringify(user.token))
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }

          resolve(user)
        })
        .catch(error => {
          const errors = error.response.data.errors
          context.commit(mutationsTypes.loginFailure, errors)

          reject(errors)
        })
    })
  },
  [actionsTypes.register](context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit(mutationsTypes.registerStart)
      api
        .register(credentials)
        .then(response => {
          const user = response.data.user
          context.commit(mutationsTypes.registerSuccess, user)

          try {
            localStorage.setItem('token', JSON.stringify(user.token))
          } catch (error) {
            console.log(error)
            throw new Error(error)
          }

          resolve(user)
        })
        .catch(error => {
          const errors = error.response.data.errors
          context.commit(mutationsTypes.registerFailure, errors)

          reject(errors)
        })
    })
  },
  [actionsTypes.pullUser](context) {
    return new Promise((resolve, reject) => {
      context.commit(mutationsTypes.pullUserStart)
      api
        .pullUser()
        .then(response => {
          const user = response.data.user
          context.commit(mutationsTypes.pullUserSuccess, user)

          resolve(user)
        })
        .catch(() => {
          context.commit(mutationsTypes.pullUserFailure)

          reject()
        })
    })
  },
}

const getters = {
  [gettersTypes.isAnonymous]: state => {
    return state.user === null
  },
  [gettersTypes.isOnSubmit]: state => {
    return state.isOnSubmit
  },
  [gettersTypes.isPullingUser]: state => {
    return state.isPullingUser
  },
  [gettersTypes.errors]: state => {
    return state.errors
  },
  [gettersTypes.user]: state => {
    return state.user
  },
}

export {mutationsTypes, actionsTypes, gettersTypes}

export default {
  state,
  mutations,
  actions,
  getters,
}
