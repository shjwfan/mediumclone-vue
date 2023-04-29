import api from '@/api/articles'

const state = {
  articles: null,
  pullingErrors: null,
  isPulling: false,
}

const mutationsTypes = {
  pullingArticlesStart: '[articles] pullingArticlesStart',
  pullingArticlesSuccess: '[articles] pullingArticlesSuccess',
  pullingArticlesFailure: '[articles] pullingArticlesFailure',
}

const actionsTypes = {
  pullArticles: '[articles] pullArticles',
}

const gettersTypes = {
  articles: '[articles] articles',
  pullingErrors: '[articles] pullingErrors',
  isPulling: '[articles] isPulling',
}

const mutations = {
  [mutationsTypes.pullingArticlesStart](state) {
    state.articles = null
    state.pullingErrors = null
    state.isPulling = true
  },
  [mutationsTypes.pullingArticlesSuccess](state, payload) {
    state.articles = payload
    state.pullingErrors = null
    state.isPulling = false
  },
  [mutationsTypes.pullingArticlesFailure](state, payload) {
    state.articles = null
    state.pullingErrors = payload
    state.isPulling = false
  },
}

const actions = {
  [actionsTypes.pullArticles](c, {pullingUrl}) {
    return new Promise((resolve, reject) => {
      c.commit(mutationsTypes.pullingArticlesStart)
      api
        .pullArticles(pullingUrl)
        .then(response => {
          const articles = response.data.articles
          c.commit(mutationsTypes.pullingArticlesSuccess, articles)

          resolve(articles)
        })
        .catch(error => {
          const errors = error.response.data.errors
          c.commit(mutationsTypes.pullingArticlesFailure, errors)

          reject(errors)
        })
    })
  },
}

const getters = {
  [gettersTypes.articles]: state => {
    return state.articles
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
