import Vue from 'vue'
import Vuex from 'vuex'
import modeleUser from '@/store/user.js'
import moduleCart from '@/store/cart.js'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    m_cart: moduleCart,
    m_user: modeleUser
  }
})
export default store