<template>
  <view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+ item.goods_id ">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 导航区域 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navClickHandler(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层区域 -->
    <view clss="floor-list">
      <view v-for="(floor, i) in floorList" :key="i" class="floor-item">
        <!-- 楼层标题 -->
        <image :src="floor.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 图片左侧部分 -->
          <navigator class="floor-img-left" :url="floor.product_list[0].url">
            <image :src="floor.product_list[0].image_src" :style="{width:floor.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
          </navigator>
          <!-- 图片右侧部分 -->
          <view class="floor-img-right">
            <navigator v-for="(item, i2) in floor.product_list" v-if="i2 !== 0" :key="i2" :url="item.url">
               <image :src="item.image_src" :style="{width:item.image_width + 'rpx'}" mode="widthFix"></image>
             </navigator>
          </view>        
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        swiperList: [],  //轮播图数据
        navList: [],  //导航数据
        floorList: []   //楼层数据
      };
    },
    onLoad() {
      this.getSwiperList(),
      this.getNavList(),
      this.getFoolList()
    },
    methods: {
      //获取轮播图数据
      async getSwiperList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/swiperdata');
       if(res.meta.status !== 200) {
         return uni.$showMsg('数据请求失败!')
       }
       this.swiperList = res.message
      },
      //获取导航数据
      async getNavList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/catitems');
       if(res.meta.status !== 200) {
         return uni.$showMsg('数据请求失败!')
       }
       this.navList = res.message
      },
      navClickHandler(item) {
        // 判断点击的是哪个 nav
        if(item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      //获取楼层数据
      async getFoolList() {
        const {data: res} = await uni.$http.get('/api/public/v1/home/floordata')
        if(res.meta.status !== 200) return uni.$showMsg('数据请求失败!')
        //对图片的跳转地址进行改造
        res.message.forEach(floor => {
          floor.product_list.forEach(item => {
            item.url = '/subpkg/goods_list/goods_list?' + item.navigator_url.split('?')[1]
          })
        })
        
        this.floorList = res.message
      }
    }
  }
</script>

<style lang="scss">
swiper {
  height: 330rpx;
  .swiper-item, image {
    width: 100%;
    height: 100%;
  }
}
.nav-list {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0;
    image {
      width: 128rpx;
      height: 128rpx;
    }
}
.floor-title {
  width: 100%;
  height: 60rpx;
}
.floor-img-box {
  display: flex;
  padding-left: 10rpx;
  .floor-img-right {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}
</style>
