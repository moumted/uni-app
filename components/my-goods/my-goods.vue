<template>
  <view>
    <view class="goods-item">
      <!-- 左侧 -->
      <view class="goods-item-left">
        <image :src="item.goods_small_logo || defaultPic" class="goods-pic" mode=""></image>
      </view>
      <!-- 右侧 -->
      <view class="goods-item-right">
        <view class="goods-name">
          {{item.goods_name}}
        </view>
        <view class="goods-info-box">
          <view class="goods-price">
            ￥{{item.goods_price | tofixed}}
          </view>
        </view>            
      </view>
    </view>  
  </view>
</template>

<script>
  export default {
    name:"my-goods",
    filters:{
      tofixed(num){
        return Number(num).toFixed(2)
      }
    },
    props : {
      item : {
        type : Object,
        default : {}
      }
    },
    data() {
      return {
         defaultPic : 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
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
