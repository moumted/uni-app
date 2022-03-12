  import {mapGetters} from 'vuex'
  
  export default {
    computed:{
      ...mapGetters('m_cart',['total'])
    },
    onShow(){
      this.setBadge()
    },
    watch : {
      total(){
        this.setBadge()
      }
    },
    methods : {
      setBadge(){
        uni.setTabBarBadge({
          // index表示tabBar相对应的索引
          index : 2,
          text : this.total>0?this.total + '' : null
        })
      }
    }
  }
  