<template>
  <view>
    <view class="search-box">      
      <uni-search-bar @input="input" :radius="100" :cancelButton="none"></uni-search-bar>
    </view>
    
    <view class="sugg-list" v-if="searchResult.length !== 0">
      <view class="sugg-item" v-for="(item,index) in searchResult" :key="index" @click="gotoDetail(item)">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <uni-icons type="arrowright" size="16"></uni-icons>
      </view>
    </view>
    
    <view class="history-box" v-else>
      <view class="history-title">
        <text>搜索历史</text>
        <uni-icons type="trash" size="16" @click="clean"></uni-icons>
      </view> 
     <view class="history-list">
        <uni-tag :text="item" v-for="(item,index) in histories" :key="index" style="margin-right:10px" @click="gotoDoodsList(item)"></uni-tag>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer : null,
        kw : '',
        searchResult : [],
        historyList : []
      };
    },
    onLoad(){
      this.historyList = JSON.parse(uni.getStorageSync("kw") || '[]')
    },
    methods : {
      input(e){
        clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
          // console.log(e)
          this.kw = e
          this.getSearchList()
          if(!e) this.searchResult = []
        },500)       
      },
      async getSearchList(){
        if(this.kw === 0){
          this.searchResult = []
          return 
        }
        const { data : res } = await uni.$http.get('/api/public/v1/goods/qsearch' , { query : this.kw})
        if(res.meta.status != 200) return uni.$showMsg()
        this.searchResult = res.message
        this.saveSearchList()
      },
      gotoDetail(item){
        uni.navigateTo({
          url : '/subpkg/goods_detail/goods_detail?goods_id' + item.goods_id
        })
      },
      saveSearchList(){
        // this.historyList.push(this.kw)
        const set = new Set(this.historyList)
        set.delete(this.kw)
        set.add(this.kw)
        
        this.historyList = Array.from(set)
        
        uni.setStorageSync("kw",JSON.stringify(this.historyList))        
      },
      clean(){
        this.historyList = [],
        uni.setStorageSync('kw','[]')
      },
      gotoDoodsList(item){
        // console.log(item)
        uni.navigateTo({
          url : '/subpkg/goods_list/goods_list?query=' + item
        })
      }
    },
    computed:{
      histories(){
        return [...this.historyList].reverse()
      }
    }
  }
</script>

<style lang="scss">
.search-box{
  position: sticky;
  top:0;
  z-index: 999;
}
.sugg-list{
  padding: 0 5px;
  .sugg-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    padding: 13px 0;
    .goods-name{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-bottom: 1px solid #efefef;
    }
  }
}
.history-box{
  padding: 0 5px;
  .history-title{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 15px;
    border-bottom: 1px solid #efefef;
    .history-list{
      display: flex;
      flex-wrap: wrap;
      .uni-tag{
        margin-top: 5px;
        margin-right: 5px;
      }
    }
  }
}
</style>
