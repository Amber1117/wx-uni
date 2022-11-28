<template>
  <view class="goods-item">
    <!-- 左侧图片 -->
    <view class="goods-item-left">
      <radio v-if="showRadio" :checked="goods.goods_state" color="#c00000" @click="radioClickHandler"></radio>
      <image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
    </view>
    <!-- 右侧标题与价格 -->
    <view class="goods-item-right">
      <!-- 标题 -->
      <view class="goods-name">{{goods.goods_name}}</view>
      <!-- 价格 -->
      <view class="goods-info-box">
        <view class="goods-price">￥{{goods.goods_price | tofixed}}</view>
        <!-- 商品数量 -->
        <uni-number-box v-if="showNum" :min="1" :value="goods.goods_count" @change="numChangeHandler"
></uni-number-box>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "my-goods",
    props: {
      goods: {
        type: Object,
        default: {}
      },
      showRadio: {
        type: Boolean,
        default: false
      },
      showNum: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png' //默认图片
      };
    },
    filters: {
      tofixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      //商品选中状态改变
      radioClickHandler() {
        this.$emit('radio-change', {
          // 商品的 Id
          goods_id: this.goods.goods_id,
          // 商品最新的勾选状态
          goods_state: !this.goods.goods_state
        })
      },
      //商品数量发生改变
      numChangeHandler(val) {
        this.$emit('number-change', {
          goods_id: this.goods.goods_id,
          goods_count: +val
        })
      }
    }
  }
</script>

<style lang="scss">
  .goods-item {
    // 让 goods-item 项占满整个屏幕的宽度
    width: 750rpx;
    // 设置盒模型为 border-box
    box-sizing: border-box;
    display: flex;
    padding: 10px 5px;
    border: 1px solid #f0f0f0;

    .goods-item-left {
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-pic {
        width: 100px;
        height: 100px;
        display: block;
      }
    }

    .goods-item-right {
      display: flex;
      flex: 1;
      flex-direction: column;
      justify-content: space-between;

      .goods-name {
        font-size: 13px;
      }

      .goods-info-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .goods-price {
          font-size: 16px;
          color: #c00000;
        }
      }
    }
  }
</style>
