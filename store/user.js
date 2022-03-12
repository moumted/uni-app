export default {
  namespaced : true,
  state : ()=>({
    address : JSON.parse(uni.getStorageSync('address') || '{}'),
    token : uni.getStorageSync('token') || '',
    userinfo : JSON.parse(uni.getStorageSync('userinfo') || '{}'),
    redirectInfo: null
  }),
  
  mutations : {
    updateAddress(state,address){
      state.address = address
      
      this.commit('m_user/saveAddressToStorage')
    },
    saveAddressToStorage(state){
      uni.setStorageSync('address',JSON.stringify(state.address))
    },
    updateUserInfo(state,userinfo){
      state.userinfo = userinfo
      
      this.commit('m_user/saveUserInfo')
    },
    saveUserInfo(state){
      uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
    },
    updateToken(state,token){
      state.token = token
      
      this.commit('m_user/saveToken')
    },
    saveToken(state){
      uni.setStorageSync('token',state.token)
    },
    
    // 登陆页面重定向
    // updateRedirectInfo(state,info){
    //   state.redirectInfo = info
    //   console.log(state.redirectInfo)
    // }
      updateRedirectInfo(state, info) {
        state.redirectInfo = info
        console.log(state.redirectInfo)
      }
  },
  
  getters : {
    addstr(state){
      if(!state.address.provinceName) return ''
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    },
  }
}