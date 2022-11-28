export default {
  namespaced: true,  //开启命名空间
  //数据
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || '{}')
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
    }
  },
  getters: {
    addstr(state) {
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
  }
}