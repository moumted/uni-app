<template>
  <view>
 <!--   <my-search :bgcolor="'lightblue'"></my-search> -->
    <my-search @click="gotoSearch"></my-search>
    <view class="scroll-view-container">
      <!-- 左侧 -->
      <scroll-view scroll-y="true" :style="{height :window_height + 'px' }" class="left-scroll-view">
        <block v-for="(item,index) in cateList" :key="idnex">
          <view :class="['left-scroll-view-item',index===active?'active': '']" @click="activeChange(index)">{{item.cat_name}}</view>          
        </block>
      </scroll-view>
      <!-- 右侧 -->
      <scroll-view scroll-y="true" :style="{height :window_height + 'px' }" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,index) in cateLevel2" :key="item2.cat_id"> 
          <view class="cate-lv2-title">{{item2.cat_name}}</view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,index) in item2.children" :key="item3.cat_id" @click="gotoGoodsList(item3)"> 
                <image :src="item3.cat_icon"></image>
                <text>{{item3.cat_name}}</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'

export default {
  // 将 badgeMix 混入到当前的页面中进行使用
  mixins: [badgeMix],
    data() {
      return {
        window_height : 0,
        cateList : [],
        active : 0,
        cateLevel2 : [],
        scrollTop : 0
      }
    },
    onLoad() {
      const sysInfo = uni.getSystemInfoSync()
      this.window_height = sysInfo.windowHeight -50
      
      this.getCateList()
      console.log(this.backgroundColor)
    },
    methods: {
      async getCateList(){
        const { data: res } = await uni.$http.get('/api/public/v1/categories')
        // console.log(66,res)
        if(res.meta.status != 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = res.message[0].children
      },
      activeChange(index){
        this.active = index
        this.cateLevel2 = this.cateList[index].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
      },
      gotoGoodsList(item){
        // console.log(item)
        uni.navigateTo({
          url : '/subpkg/goods_list/goods_list?cid=' + item.cat_id
        })
      },
      gotoSearch(){
        // console.log('ok')
        uni.navigateTo({
          url : '/subpkg/search/search'
        })
      }
    },

  }
</script>

<style lang="scss">

 .scroll-view-container {
   display: flex;
 
   .left-scroll-view {
     width: 120px;
 
     .left-scroll-view-item {
       line-height: 60px;
       background-color: #f7f7f7;
       text-align: center;
       font-size: 12px;
 
       // 激活项的样式
       &.active {
         background-color: #ffffff;
         position: relative;
 
         // 渲染激活项左侧的红色指示边线
         &::before {
           content: ' ';
           display: block;
           width: 3px;
           height: 30px;
           background-color: #c00000;
           position: absolute;
           left: 0;
           top: 50%;
           transform: translateY(-50%);
         }
       }
     }
   }
 }
 .cate-lv2{
   padding: 5px;
   box-sizing: border-box;
   background-color: #FFFFFF;
   border-radius: 15px;
   margin-bottom: 6px;
   display: flex;
   flex-direction: column;
  }
 .cate-lv2-title{
   font-size: 12px;
   font-weight: bold;
   text-align: center;
   padding: 15px 0;
 }
  
  .cate-lv3-list{
    display: flex;
    flex-wrap: wrap;
    .cate-lv3-item{
      width: 33.33%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      image{
        width: 60px;
        height: 60px;
      }
      text{
        font-size: 12px;
      }
    }
  }
</style>
