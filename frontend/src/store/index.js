import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import permission from './modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    template: 0,
    examination: 0,
    quiz: 0
  },
  modules: {
    app,
    permission,
    settings,
    user
  },
  getters,
})

export default store
