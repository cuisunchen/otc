<template>
  <div class="content-help">
    <div class="top">
      <div class="center">如何提现?</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>1、登录火狐狸账号后，点击用户中心  钱包  选择需要提现的币种。<br />
      2、点击“提现”，输入您要提现到账的地址、数量、交易密码及手机验证码，确认提交。<br />
      3、扣除提现手续费后，满足最少提现数量即可发起提现。
     </p>
     <img :src="withdraw1">
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
  name: 'help_withdraw',
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
     withdraw1:IMG_BASE_URL+"withdraw1.png",
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
