export default {
  namespaced: true, //开启命名空间
  state: () => ({
    // 每个商品的信息对象，都包含如下 6 个属性：
    // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  // 模块的 mutations 方法
  mutations: {
    //添加购物车
    addToCart(state, goods) {
      //判断购物车中是否已存在该商品
      const findResult = state.cart.find(item => item.goods_id === goods.goods_id)
      if (!findResult) {
        // 如果购物车中没有这件商品，则直接 push
        state.cart.push(goods)
      } else {
        // 如果购物车中有这件商品，则只更新数量即可
        findResult.goods_count++
      }
      // 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
      this.commit('m_cart/saveToStorage')
    },
    //持久化存储购物车商品数据
    saveToStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    //更新购物车商品选中状态
    updateGoodsState(state, goods) {
      //根据id搜索商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        console.log('找到了')
        // 更新对应商品的勾选状态
        findResult.goods_state = goods.goods_state
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    //更新商品数量
    updateGoodsCount(state, goods){
      //根据id搜索商品
      const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
      if (findResult) {
        // 更新对应商品的勾选状态
        findResult.goods_count = goods.goods_count
        // 持久化存储到本地
        this.commit('m_cart/saveToStorage')
      }
    },
    // 根据 Id 从购物车中删除对应的商品信息
    removeGoodsById(state, goods_id) {
      // 调用数组的 filter 方法进行过滤
      state.cart = state.cart.filter(x => x.goods_id !== goods_id)
      // 持久化存储到本地
      this.commit('m_cart/saveToStorage')
    },
    //更新购物车商品的状态例如结算全选调用
    updateAllGoodsState(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      //持久化存储
      this.commit('m_cart/saveToStorage')
    }
  },

  // 模块的 getters 属性
  getters: {
    //商品总数量
    total(state) {
      let sum = 0
      state.cart.forEach(item => {
        return sum += item.goods_count
      })
      return sum
    },
    //选中商品的数量
    checkedCount(state) {
     return state.cart.filter(x => x.goods_state).reduce((total, item) => total+=item.goods_count, 0)
    },
    //选中商品的总价格
    checkedGoodsAmount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total,item) => total += item.goods_count * item.goods_price, 0).toFixed(2)
    }
  },
}
