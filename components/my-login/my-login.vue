<template>
  <view class="login-container">
    <!-- 登录图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserInfo()">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed: {
    ...mapState('m_user',['redirectInfo'])
    },
    methods: {
      ...mapMutations('m_user', ['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserInfo() {
        if (uni.getUserProfile) {
          uni.getUserProfile({
            desc: '开发测试',
            success: (res) => {
              console.log(res)
              //将用户的基本信息存储到 vuex 中
              this.updateUserInfo(res.userInfo)
              // 获取登录成功后的 Token 字符串
              this.getToken(res)
            },
            fail: (err) => {
              uni.showMsg('您取消了登录授权')
            }
          })
        }
      },
      // 调用登录接口，换取永久的 token
      getToken(info) {
        uni.login({
          provider: 'weixin', //使用微信登录
          success: async (loginRes) => {
            const query = {
              code: loginRes.code,
              encryptedData: info.encryptedData,
              iv: info.iv,
              rawData: info.rawData,
              signature: info.signature
            }
            let {
              data: loginResult
            } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
            //因为appid的问题所以并不能请求到有效的token,只能先用假token 
            loginResult = {
              "message": {
                "user_id": 23,
                "user_email_code": null,
                "is_active": null,
                "user_sex": "男",
                "user_qq": "",
                "user_tel": "",
                "user_xueli": "本科",
                "user_hobby": "",
                "user_introduce": null,
                "create_time": 1562221487,
                "update_time": 1562221487,
                "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
              },
              "meta": {
                "msg": "登录成功",
                "status": 200
              }
            }
            if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！') 
            this.updateToken(loginResult.message.token)
            //登录成功后跳转回之前的页面
            this.navigateBack()
          },
          fail: function(err) {
            console.log('err', err)
            uni.$showMsg('登录失败！')
          }
        });
      },
      navigateBack() {
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
          //是跳转到 登录页面的
          uni.switchTab({
            url: this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 750rpx;
    background-color: #f8f8f8;
    overflow: hidden;

    button {
      width: 90%;
      border-radius: 25px;
      margin: 15px 0;
      background-color: #c00000;
    }

    .tips-text {
      font-size: 12px;
      color: gray;
    }

    &::after {
      position: absolute;
      bottom: 0;
      left: 0;
      content: '';
      height: 40px;
      width: 100%;
      background-color: white;
      border-radius: 50%;
      transform: translateY(50%);
    }
  }
</style>
