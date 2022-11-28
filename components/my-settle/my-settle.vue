<template>
  <view class="my-settle-container">
    <!-- 全选区域 -->
    <label class="radio" @click="changeAllState">
      <radio value="" color="#c00000" :checked="isFullCheck" /><text>全选</text>
    </label>
    <!-- 合计区域 -->
    <view class="amount-box">
      合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
    </view>
    <!-- 结算区域 -->
    <view class="btn-settle">结算({{checkedCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-settle",
    data() {
      return {

      };
    },
    computed: {
      ...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
      //判断是否全选
      isFullCheck() {
        return this.total === this.checkedCount
      } 
    },
    methods: {
      ...mapMutations('m_cart', ['updateAllGoodsState']),
      //实现全选/全不选
      changeAllState() {
        // !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
        this.updateAllGoodsState(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
  .my-settle-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    padding-left: 5px;
    font-size: 14px;

    .radio {
      display: flex;
      align-items: center;
    }

    .amount-box {
      .amount {
        color: #c00000;
      }
    }

    .btn-settle {
      min-width: 100px;
      background-color: #c00000;
      height: 50px;
      text-align: center;
      line-height: 50px;
      color: white;
      padding: 0 10px;
    }
  }
</style>
