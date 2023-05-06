import api from '@/api/tags'

const state = {
  tags: null,
  pullingError: null,
  isPulling: false,
}

const mutationsTypes = {
  pullingTagsStart: '[tags] pullingTagsStart',
  pullingTagsSuccess: '[tags] pullingTagsSuccess',
  pullingTagsFailure: '[tags] pullingTagsFailure',
}

const actionsTypes = {
  pullTags: '[tags] pullTags',
}

const gettersTypes = {
  tags: '[tags] tags',
  pullingError: '[tags] pullingError',
  isPulling: '[tags] isPulling',
}

const mutations = {
  [mutationsTypes.pullingTagsStart](state) {
    state.tags = null
    state.pullingError = null
    state.isPulling = true
  },
  [mutationsTypes.pullingTagsSuccess](state, payload) {
    state.tags = payload
    state.pullingError = null
    state.isPulling = false
  },
  [mutationsTypes.pullingTagsFailure](state, payload) {
    state.tags = null
    state.pullingError = payload
    state.isPulling = false
  },
}

const actions = {
  [actionsTypes.pullTags](c) {
    return new Promise((resolve, reject) => {
      c.commit(mutationsTypes.pullingTagsStart)
      api
        .pullTags()
        .then(response => {
          const tags = response.data.tags
          c.commit(mutationsTypes.pullingTagsSuccess, tags)

          resolve(tags)
        })
        .catch(error => {
          const errors = error.response.data.errors
          c.commit(mutationsTypes.pullingTagsFailure, errors)

          reject(errors)
        })
    })
  },
}

const getters = {
  [gettersTypes.tags]: state => {
    return state.tags
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
