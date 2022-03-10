<template>
  <view>
    <view class="goods-list">
      <view v-for="(item,index) in goodsList" :key="item.cat_id" @click="gotoDetail(item)">
        <my-goods :item="item"></my-goods>
      </view> 
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        queryObj : {
          query : '',
          cid : '',
          pagenum : 1,
          pagesize : 10
        },
        goodsList : [],
        total : 0,
        defaultPic : 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading : false
      };
    },
    onLoad(options){
      console.log(options)
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      
      this.getGoodsList()
    },
    methods : {
      async getGoodsList(cb){
        this.isLoading = true
        const { data : res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
        console.log('00',res)
        if (res.meta.status !== 200) return uni.$showMsg()
        this.isLoading = false
        cb && cb()
        
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total = res.message.total
      },
      gotoDetail(item){
        console.log('0',item)
        uni.navigateTo({
          url : '/subpkg/goods_detail/goods_detail?goods_id=' + item.cat_id
        })
      }
    },
    onReachBottom(){
      if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if(this.isLoading) return 
      // 触底时让页码值加一
      this.queryObj.pagenum += 1
      this.getGoodsList()
    },
    onPullDownRefresh(){
      this.queryObj.pagenum = 1
      this.total = 0
      this.isLoading = false
      this.goodsList = []
      
      this.getGoodsList(()=>uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
.goods-list{
  .goods-item{
    display: flex;
    padding: 10px 5px;
    border-bottom: 1px solid #f0f0f0;
    .goods-item-left{
      .goods-pic{
        width: 100px;
        height: 100px;
        display: block;
      }
    }
    .goods-item-right{
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      .goods-name{
        font-size: 13px;
      }
      .goods-info-box{
        .goods-price{
          color: #C00000;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
