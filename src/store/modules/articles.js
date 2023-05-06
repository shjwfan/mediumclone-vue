import api from '@/api/articles'

const state = {
  articles: null,
  articlesCount: 0,
  pullingError: null,
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
  articlesCount: '[articles] articlesCount',
  pullingError: '[articles] pullingError',
  isPulling: '[articles] isPulling',
}

const mutations = {
  [mutationsTypes.pullingArticlesStart](state) {
    state.articles = null
    state.articlesCount = 0
    state.pullingError = null
    state.isPulling = true
  },
  [mutationsTypes.pullingArticlesSuccess](state, payload) {
    state.articles = payload.articles
    state.articlesCount = payload.articlesCount
    state.pullingError = null
    state.isPulling = false
  },
  [mutationsTypes.pullingArticlesFailure](state, payload) {
    state.articles = null
    state.articlesCount = 0
    state.pullingError = payload
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
          const articlesCount = response.data.articlesCount
          c.commit(mutationsTypes.pullingArticlesSuccess, {
            articles,
            articlesCount,
          })

          resolve({articles, articlesCount})
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
  [gettersTypes.articlesCount]: state => {
    return state.articlesCount
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
