<template>
  <view class="my-search-container" :style="{'background-color' : bgcolor}" @click="searchBoxHandler">
    <view class="my-search-box" :style="{'border-radius' : radius + 'px'}">
     <uni-icons type="search" size="20" style="margin-top:3px"></uni-icons>
     <text class="placeholder">搜索</text>
    </view>
  </view>
</template>
 
<script>
  export default {
    name:"my-search",
    props : {
      bgcolor : {
        type : String,
        default : '#c00000'
      },
      radius : {
        type : Number,
        default : 23
      }
    },
    data() {
      return {
        
      };
    },
    methods:{
      searchBoxHandler(){
        this.$emit('click')
      }
    }
  }
</script>

<style lang="scss">
.my-search-container{
  height:45px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-box{
    height: 30px;
    background-color: #FFFFFF;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .placeholder{
      font-size: 13px;
      margin-left: 2px;
    }
  }
}
</style>
