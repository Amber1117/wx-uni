<template>
  <view class="my-userinfo-container">
    <!-- 头像昵称区域 -->
    <view class="top-box">
      <image :src="userinfo.avatarUrl" class="avatar"></image>
      <view class="nickname">{{userinfo.nickName}}</view>
    </view>
    <!-- 面板区域 -->
    <view class="panel-list">
      <!-- 第一个面板区域 -->
      <view class="panel">
        <view class="panel-body">
          <!-- panel 的 item 项 -->
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>8</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <!-- 面板的标题 -->
        <view class="panel-title">我的订单</view>
        <!-- 面板的主体 -->
        <view class="panel-body">
          <!-- 面板主体中的 item 项 -->
          <view class="panel-item">
            <image src="/static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="/static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="arrowright" size="15"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('m_user', ['userinfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateAddress','updateToken']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title:'提示',
          content: '确认退出登录吗？'
        }).catch(err => err)
        if(succ && succ.confirm) {
          //确认退出，清空用户信息
          this.updateToken('')
          this.updateAddress({})
          this.updateUserInfo({})
        }
      }
    }
  }
</script>

<style lang="scss">
  .my-userinfo-container {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 400rpx;
      background-color: #C00000;

      .avatar {
        width: 90px;
        height: 90px;
        border: 2px solid #fff;
        border-radius: 45px;
        box-shadow: 0 1px 5px black;
      }

      .nickname {
        font-size: 14px;
        font-weight: bold;
        color: #fff;
        margin-top: 10px;
      }
    }

    .panel-list {
      padding: 0 10px;
      position: relative;
      top: -10px;

      .panel {
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 8px;

        .panel-body {
          display: flex;
          // align-items: center;
          justify-content: space-around;

          .panel-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
            padding: 8px 0;
            font-size: 13px;

            .icon {
              width: 35px;
              height: 35px;
            }
          }
        }

        .panel-title {
          line-height: 45px;
          padding-left: 10px;
          font-size: 15px;
          border-bottom: 1px solid #f4f4f4;
        }

        .panel-list-item {
          height: 45px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 15px;
          padding: 0 10px;
        }
      }
    }
  }
</style>
