<template>
  <div class="content-help">
    <div class="top">
      <div class="center">绑定支付方式</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>在火狐狸网支持3种支付方式：<br />
      第一种是支付宝支付；<br />
      第二种是微信支付；<br />
      第三种是银行卡支付。</p>
     <h4>
      第一种：支付宝绑定，具体步骤如下：
     </h4>
     <p>
        1、打开手机支付宝APP，在“首页”，点击“收钱”-“保存二维码到相册”即可。
       </p>
     <!-- <img src="../../static/payment_3.jpg"> -->
     <img :src="payment_3">
      <p>
        2、如何将手机图片存入电脑（如果下载手机APP，可以直接使用）？<br/>
       建议：在电脑上登录微信或QQ等通信工具，再从手机上登录相同的通信工具可以进行互传。<br/>
       例子：</p>
        <!-- <img src="../../static/payment_1.jpg"> -->
     <img :src="payment_1">
     <h4>
      第二种，微信支付绑定，具体步骤如下：
     </h4>
     <p>
       1、  打开微信，点击“+”，选择-“收付款”-“保存收款码”即可。
     </p>
    <!-- <img src="../../static/payment_2.jpg"> -->
 <img :src="payment_2">
    
     <p>
       2、  如何将手机图片存入电脑？<br/>
      建议：在电脑上登录微信或QQ等通信工具，再从手机上登录相同的通信工具可以进行互传。<br/>
      例子：<br/><br/>
     </p>
 <!-- <img src="../../static/payment_1.jpg"> -->
  <img :src="payment_1">
   </div>
  </div>
</template>

<script>
import BottomNav from '../components/BottomNav'
import store from '../store'
 import storage from '../models/storage'
import {SET_USER,CLEAN_USER} from '../store/mutation-types'
import user from "../models/user";
import {IMG_BASE_URL} from '../models/url.js'
export default {
  name: 'help_sell',
  components:{BottomNav},
  data () {
    return { 
     name:this.$store.state.user.name,
     subName:this.$store.state.user.name.substring(0,2).toUpperCase(),
     mobile:this.$store.state.user.mobile,
     isSignOutDialog:false,
     isDown:false,
     is_real_name_authentication:false,
     isRealNameDialog:false,
     payment_3:IMG_BASE_URL+"payment_3.jpg",
     payment_1:IMG_BASE_URL+"payment_1.jpg",
     payment_2:IMG_BASE_URL+"payment_2.jpg",

    }
  },
  created: function() {
    this.isDown = this.isAndroid_ios();
    this.getSecurity();
  },
  methods:{
     goBack() {
      this.$router.go(-1);
      },
   signIn(){ 
      // this.$router.push('/sign_in')
   },
    isAndroid_ios(){   //判断是否是安卓还是ios  
      var u = navigator.userAgent, app = navigator.appVersion;  
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器  
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端  
      return isAndroid==true?true:false;  
    },
   wallet(){
     this.$router.push('/wallet')
   },
   my_ad(){
     this.$router.push('/ads')
   },
   signOutShowDialog(){
     this.isSignOutDialog = true;
   },
   closeDialog(){
    this.isSignOutDialog = false;
    this.isRealNameDialog = false;
   },
   signOUt(){
     this.isSignOutDialog = false;
     storage.set('at', '')
     storage.set('hpp', '')
     storage.set('mobile', '')
     store.commit(CLEAN_USER)
     this.$router.push('/trade') 
   },
   sets(){
      this.$router.push('/set')
   },
   pay(){
     this.$router.push('/pay')
   },
   ffc(){
     this.$router.push('/agent')
    //  if(this.is_real_name_authentication){
    //       this.$router.push('/agent')
    //  }else{
    //     this.isRealNameDialog = true;
    //  }   
   },
   game(){
     this.$router.push('/game_fox_bound_add')
   },
   realname(){
    this.$router.push('/realname')
   },
   getSecurity(){
      user.getSecurity().then(result => {
         this.is_real_name_authentication = result.data.authentication.real_name_authentication.verified;
      }).catch((e) => {

      })
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/help_page.scss";  
</style>
