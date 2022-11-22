<template>
  <view>
    <view class="search-box">
      <!-- 使用 uni-ui 提供的搜索组件 -->
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <!-- 搜索建议部分 -->
    <view class="sugg-list" v-if="searchResults.length !== 0">
      <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
        <view class="goods-name">{{item.goods_name}}</view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    <!-- 搜索历史部分 -->
    <view class="history-box" v-else>
      <!-- 标题区域 -->
      <view class="histoy-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
      </view>
      <!-- 内容区域 -->
      <view class="history-list">
        <uni-tag v-for="(item,i) in historys" :key="i" :text="item" @click="gotoGoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null, //定时器
        kw: '', //搜索关键词
        searchResults: [], //搜索列表
        historyList: ['a', 'app', 'apple'] //搜索历史
      };
    },
    onLoad() {
      this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
    },
    computed: {
      historys() {
        // 注意：由于数组是引用类型，所以不要直接基于原数组调用 reverse 方法，以免修改原数组中元素的顺序
        // 而是应该新建一个内存无关的数组，再进行 reverse 反转
        return [...this.historyList].reverse()
      }
    },
    methods: {
      //搜索处理
      input(e) {
        //防抖处理
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.kw = e
          // 根据关键词，查询搜索建议列表
          this.getSearchList()
        }, 1000)
      },
      //根据关键词发起搜索建议
      async getSearchList() {
        if (this.kw.length === 0) {
          this.searchResults = []
          return
        }
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/goods/qsearch', {
          query: this.kw
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        this.searchResults = res.message

        //保存搜索历史记录
        this.saveSearchHistory()
      },
      //点击搜索建议
      gotoDetail(goods_id) {
        uni.navigateTo({
          // 指定详情页面的 URL 地址，并传递 goods_id 参数
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
        })
      },
      //保存搜索历史记录
      saveSearchHistory() {
        this.historyList.push(this.kw)
        // 数组去重并将最新搜索的值放在第一位
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        this.historyList = Array.from(set)
        //将 historyList 保存到本地
        uni.setStorageSync('kw',JSON.stringify(this.historyList))
      },
      //搜索历史清除
      cleanHistory() {
        this.historyList = [];
        //清空本地存储
        uni.setStorageSync('kw','[]')
      },
      //点击搜索历史跳转商品列表页
      gotoGoodsList(kw) {
        uni.navigateTo({
          url: '/subpkg/goods_list/goods_list?query=' + kw
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0;
    z-index: 999;
  }

  .sugg-list {
    padding: 0 5px;

    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

  .history-box {
    padding: 0 5px;
    background-color: white;

    .histoy-title {
      display: flex;
      justify-content: space-between;
      height: 40px;
      align-items: center;
      border-bottom: 1px solid #efefef;
      font-size: 13px;
    }

    .history-list {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 0;

      .uni-tag {
        margin-top: 5px;
        margin-right: 5px;
        background-color: #efefef;
        color: black;
      }
    }
  }
</style>
