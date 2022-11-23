<template>
  <view class="goods-list">
    <view v-for="(goods, i) in goodsLists" :key="i" @click="gotoDetail(goods)">
      <my-goods :goods="goods"></my-goods>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10,
        },
        goodsLists: [], //商品列表
        total: 0, //商品数量
        isloading: false //判断是否正在请求数据
      };
    },
    onLoad(option) {
      //将页面参数保存
      this.queryObj.query = option.query || ''
      this.queryObj.cid = option.cid || ''
      this.getGoodsList()
    },
    methods: {
      //获取商品列表
      async getGoodsList(cb) {
        this.isloading = true
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
        this.isloading = false
        cb && cb()
        if (res.meta.status !== 200) return uni.$showMsg()
        //拼接列表数组
        this.goodsLists = [...this.goodsLists, ...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    //上拉加载更多
    onReachBottom() {
      // 判断是否还有下一页数据
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      //如果上一次请求还没完成就不再发起请求
      if (this.isloading) return
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    //下拉刷新功能
    onPullDownRefresh() {
      this.queryObj.pagenum = 1
      this.total = 0
      this.goodsLists = []
      this.isloading = false
      //重新发起请求 回调函数结束下拉刷新效果
      this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
  .goods-list {}
</style>
