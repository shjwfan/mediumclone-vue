import {createStore} from 'vuex'
import articles from '@/store/modules/articles'
import authentication from '@/store/modules/authentication'
import user from '@/store/modules/user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    articles,
    authentication,
    user,
  },
})
