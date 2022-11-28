<template>
  <view class="box-border">
    <!-- 选择收货地址盒子 -->
    <view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
      <button size="mini" type="primary" @click="chooseAddress">请选择收获地址+</button>
    </view>
    <!-- 收获地址信息的盒子 -->
    <view class="address-info-box" v-else @click="chooseAddress">
      <view class="row1">
        <view class="row1-left">
          收货人: {{address.userName}}
        </view>
        <view class="row2-right">
          <view class="phone">电话：<text>{{address.telNumber}}</text></view>
          <uni-icons type="arrowright" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2-left">
          收货地址:
        </view>
        <view class="row2-right">{{addstr}}</view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState, mapMutations, mapGetters} from 'vuex'
  export default {
    name: "my-address",
    data() {
      return {
        
      };
    },
    methods: {
      ...mapMutations('m_user', ['updateAddress','saveAddressToStorage']),
      async chooseAddress() {
        // 1. 调用小程序提供的 chooseAddress() 方法，即可使用选择收货地址的功能
        //返回值是一个数组：第 1 项为错误对象；第 2 项为成功之后的收货地址对象
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        console.log('succ', succ, err)
        // 2. 用户成功的选择了收货地址
        if (err === null && succ.errMsg === 'chooseAddress:ok') {
          // 为 data 里面的收货地址对象赋值
          this.updateAddress(succ)
        }
      }
    },
    computed: {
      ...mapState('m_user', ['address']),
      ...mapGetters('m_user', ['addstr'])
    }
  }
</script>

<style lang="scss">
  .box-border {
    position: relative;

    .address-choose-box {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 90px;
    }

    .address-info-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 12px;
      height: 90px;
      padding: 0 5px;

      .row1 {
        display: flex;
        justify-content: space-between;

        .row1-left {}

        .row2-right {
          display: flex;
          align-items: center;
        }
      }

      .row2 {
        display: flex;
        align-items: center;
        margin-top: 10px;

        .row2-left {
          white-space: nowrap;
        }

        .row2-right {}
      }
    }
  }

  .box-border:before {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 2px;
    background: repeating-linear-gradient(-45deg, #ff6c6c, #ff6c6c 20%, transparent 0, transparent 25%, #1989fa 0, #1989fa 45%, transparent 0, transparent 50%);
    background-size: 80px;
    content: "";
  }
</style>
