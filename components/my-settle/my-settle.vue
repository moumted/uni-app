<template>
  <view class="my-settle-container">
    
    <label class="radio" @click="changeAllState">
      <radio color="#C00000" :checked="isFullCheck"/><text>全选</text>
    </label>
    
    <view class="amount-box">
      合计:<text class="amount">${{checkedGoodsAmount}}</text>
    </view>
    
    <view class="btn-settle" @click="settlement">
       结算({{checkedOut}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from 'vuex'
  export default {
    name:"my-settle",
    data() {
      return {
        seconds : 3,
        timer : null
      };
    },
    computed:{
      ...mapGetters('m_cart',['checkedOut','total','checkedGoodsAmount']),
      ...mapGetters('m_user',['addstr']),
      ...mapState('m_cart',['cart']),
       
      isFullCheck(){
        return this.total === this.checkedOut
      }
    },
    methods : {
      ...mapMutations('m_cart',['updateAllGoodsState']),
      ...mapMutations('m_user', ['updateRedirectInfo']),
      changeAllState(){
        this.updateAllGoodsState(!this.isFullCheck)
      },
      settlement(){
        if(!this.checkedOut) return uni.$showMsg('请选择要结算的商品!')
        
        if(!this.addstr) return uni.$showMsg('请选择收货地址')
        
        if(!this.token) return this.delayNavigate()
        
        this.payOrder()
      },
      delayNavigate(){
        this.seconds = 3
        this.showTips(this.seconds)
        
        this.timer = setInterval(()=>{
          this.seconds --
           
          if(this.seconds <= 0){
            clearInterval(this.timer)
            uni.switchTab({
              url : '/pages/my/my',
              // success:()=>{
              //   this.updateRedirectInfo({
              //     openType : 'switchTab',
              //     from : '/pages/cart/cart'                  
              //   })
              // }
               success: () => {
                        // 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
                        this.updateRedirectInfo({
                          // 跳转的方式
                          openType: 'switchTab',
                          // 从哪个页面跳转过去的
                          from: '/pages/cart/cart'
                        })
                      }
            })
            
            return
          } 
          this.showTips(this.seconds)
        },1000)
      },
      // 倒计时提示消息
      showTips(n){
        uni.showToast({
          icon:'none',
          title : '请先登录,' + n + '秒后跳转到登录界面',
          mask :true,
          duration : 1500
        })
      },
      async payOrder(){
        const orderInfo = {
          order_price : 0.01,
          consignee_addr : this.addstr,
          goods : this.cart.filter(x =>x.goods_state).map(x=>({
            goods_id : x.goods_id,
            goods_number : x.goods_number,
            goods_price : x.goods_price
          }))
        }
        
        const { data : res } = await uni.$http.post('/api/public/v1/my/orders/create',orderInfo)
        if(res.meta.status !== 200) return uni.$showMsg('创建订单失败')
        
        const orderNumber = res.message.order_number
        
        // console.log(orderNumber)
        
        const {data :res2} = await uni.$http.post('/api/public/v1/my/orders/req_unifiedorder',{order_number : orderNumber})
         
        if(res2.meta.status !== 200) return uni.$showMsg('预付订单生成失败')
        
        const payInfo = res2.message.pay
        
        const [err,succ] = await uni.requestPayment(payInfo)
        
        if(err) return uni.$showMsg('订单未支付!')
        
        const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
        
         if (res3.meta.status !== 200) return uni.$showMsg('订单未支付！')
           // 3.5 检测到订单支付完成
           uni.showToast({
             title: '支付完成！',
             icon: 'success'
           })
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
