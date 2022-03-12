<template>
  <view class="my-settle-container">
    
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    
    <view class="amount-box">
      合计:<text class="amount">${{checkedGoodsAmount}}</text>
    </view>
    
    <view class="btn-settle">
       结算({{checkedOut}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedOut','total','checkedGoodsAmount']),
      isFullCheck(){
        return this.total === this.checkedOut
      }
    },
    methods : {
      ...mapMutations('m_cart',['updateAllGoodsState']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.my-settle-container {
  /* 底部固定定位 */
  position: fixed;
  bottom: 0;
  left: 0;
  /* 设置宽高和背景色 */
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  
  .radio{
    display: flex;
    align-items: center;
  }
  
  .amount-box{
    .amount{
      color : #C00000;
      font-weight: bold;
    }
  }
  
  .btn-settle{
     height: 50px;
      min-width: 100px;
      background-color: #c00000;
      color: white;
      line-height: 50px;
      text-align: center;
      padding: 0 10px;
  }
}
</style>
