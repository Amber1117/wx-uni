<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <!-- 收货地址组件 -->
    <my-address></my-address>
    <!-- 商品列表标题部分 -->
    <view class="cart-title">
      <!-- 左侧的图标 -->
      <uni-icons type="shop" size="18"></uni-icons>
      <text class="cart-title-text">
        购物车
      </text>
    </view>
    <!-- 购物车商品列表内容 -->
    <uni-swiper-action>
      <block v-for="(goods,i) in cart" :key="i">
        <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)" :auto-close="false">
          <my-goods :goods="goods" :showRadio="true" :show-num="true" @radioChange="radioChangeHandler"
            @number-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
      </block>
    </uni-swiper-action>
    <!-- 结算区域 -->
    <my-settle></my-settle>
  </view>
  <view class="empty-cart" v-else>
    <!-- <image src="/static/cart_empty@2x.png" class="empty-img"></image> -->
        <text class="tip-text">空空如也~</text>
  </view>
</template>

<script>
  // 导入自己封装的 mixin 模块
  import badgeMix from '@/mixins/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [badgeMix],
    computed: {
      ...mapState('m_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      };
    },
    methods: {
      ...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount', 'removeGoodsById']),
      radioChangeHandler(e) {
        this.updateGoodsState(e)
      },
      //商品数量发生变化
      numberChangeHandler(e) {
        this.updateGoodsCount(e)
        this.setBadge()
      },
      //删除购物车商品
      swipeActionClickHandler(goods) {
        console.log(goods)
        this.removeGoodsById(goods.goods_id)
      },
     // 点击了滑动操作按钮
     swipeActionClickHandler(goods) {
      this.removeGoodsById(goods.goods_id)
      this.setBadge()
     }
    }
  }
</script>

<style lang="scss">
  .cart-container {
    padding-bottom: 50px;
  }
  .cart-title {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 5px;
    border: 1px solid #efefef;

    .cart-title-text {
      font-zize: 14px;
      margin-left: 10px;
    }
  }
  
  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
  
    .empty-img {
      width: 90px;
      height: 90px;
    }
  
    .tip-text {
      font-size: 12px;
      color: gray;
      margin-top: 15px;
    }
  }
</style>
