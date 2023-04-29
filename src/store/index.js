import {createStore} from 'vuex'
import authentication from '@/store/modules/authentication'
import user from '@/store/modules/user'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    authentication,
    user,
  },
})
