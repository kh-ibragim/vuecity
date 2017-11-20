import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    LOGIN (state, acsesstoken) {
      state.token = acsesstoken
    },
    LOGOUT (state) {
      state.token = null
    }
  }
//   actions: {
//     LOGIN (context) {
//       context.commit('LOGIN')
//     },
//     LOGOUT (context) {
//       context.commit('LOGOUT')
//     }
//   }
})

export default store
