<template>
  <view class="cart-container" v-if="cart.length !== 0">
    <my-address></my-address>
    
    <view class="cart-title">
      <!-- 左侧 -->
      <uni-icons type="shop" size="15" color="gray"></uni-icons>
      <!-- 右侧 -->
      <text class="cart-title-text">购物车</text>
    </view>

    <uni-swipe-action>
      <block v-for="(goods,index) in cart" :key="index">
        <uni-swipe-action-item :right-options="options" @click="swiperItemHandler(goods)">
          <my-goods :item="goods" :showRadio="true" @radio-change="radioChange" :showNum="true" @num-change="numberChangeHandler"></my-goods>
        </uni-swipe-action-item>
       </block>
    </uni-swipe-action>
    
    <my-settle></my-settle>

  </view>


  <view class="empty-cart" v-else>
    <text class="tip-text">购物车是空的~~</text>
  </view>
</template>

<script>
import bageMix from '@/mixins/tabbar-badge.js'
import {mapState,mapMutations} from 'vuex'
  export default {
    mixins:[bageMix],
    computed:{
      ...mapState('m_cart',['cart'])
    },
    data() {
      return {
        options:[{
            text: '删除',
            style: {
                backgroundColor: '#C00000'
            }
        }]
      }
    },
    methods : {
      ...mapMutations('m_cart',['updateGoodsState','updateGoodsCount','removeGoodsById']),
      radioChange(e){
        console.log(e)
        this.updateGoodsState(e)
      },
      numberChangeHandler(e){
        this.updateGoodsCount(e)
        // console.log('66',e)
      },
      swiperItemHandler(item){
        this.removeGoodsById(item.goods_id)
      }
    }
  }
</script>

<style lang="scss">
  .cart-container{
    padding-bottom: 50px;
  }
.cart-title{
  height:40px;
  display: flex;
  align-items: center;
  padding-left: 5px;
  border-bottom: 1px solid #efefef;
  .cart-title-text{
    font-size: 14px;
    margin-left: 10px;
  }
}

.empty-cart{
  display: flex;
  justify-content: center;
  padding-top: 150px;
  .tip-text{}
}

</style>
