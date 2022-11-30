export default {
  namespaced: true, //开启命名空间
  //数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}'),
    token: uni.getStorageSync('token') || '',
    // 用户的基本信息
    userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: null // 重定向的 object 对象 { openType, from }
  }),
  mutations: {
    //更新收获地址
    updateAddress(state, address) {
      state.address = address,
        this.commit('m_user/saveAddressToStorage')
    },
    //持久化存储收获地址
    saveAddressToStorage(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    //保存用户信息
    updateUserInfo(state, userinfo) {
      state.userinfo = userinfo
      this.commit('m_user/saveUserInfoToStorage')
    },
    //持久化存储用户信息
    saveUserInfoToStorage(state) {
      uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
    },
    //更新token
    updateToken(state, token) {
      state.token = token
      this.commit('m_user/saveTokenToStorage')
    },
    //持久化存储token
    saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
    // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
      console.log(info)
    }
  },
  getters: {
    addstr(state) {
      if (!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}
