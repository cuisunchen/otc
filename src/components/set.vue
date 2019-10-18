<template>
  <div class="content-set" style="background:#F3F5F7">
    <div class="top">
      <div class="center">{{$t('User.SafeCenter')}}</div>
      <div class="left" @click="goBack" />
    </div>
   <!-- <div class="set-head-item">
      <div class="set-head-item-left">
        <p class="p1">{{$t('User.SafeCenterTip')}}</p>
        <p class="p2">{{$t('User.SafeCenterContentTip')}}</p>
      </div>
      <div class="set-head-item-right-1" style="color:#FF6000" v-show="!has_payment_password&&!enabled&&!verified">{{$t('User.Safe')}}</div>
      <div class="set-head-item-right-2" style="color:#F1C101" v-show="has_payment_password || enabled ||verified">{{$t('User.ordinary')}}</div>
      <div class="set-head-item-right-3" style="color:#3CAC00" v-show="has_payment_password && enabled && verified">{{$t('User.Safe')}}</div>
      
   </div> $t('User.SignInOrSignUp') -->
    <div class="share_btn_zone_user">
        <div class="share_btn_zone">
           <div  class="share_btn" @click="modify_password"> 
              <!-- <i class="pw"></i> -->
              <div>{{$t('User.SetMenuLoginPwd')}}</div>
              <div class="status">
                  <span>{{$t('User.modify')}}</span>
                  <i class="go"></i>
              </div>
            </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="asserts_pwd">
              <!-- <i class="pw pw2"></i> -->
              <div>{{$t('User.SetMenuAssertPwd')}}</div>
              <div class="status">
                <span>{{item.has_payment_password ? $t('User.modify') : $t('User.notSet') }}</span>
                <i class="go"></i>
              </div>
        
          </div>
          </div>
          <!-- <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="bound_mobile">
              <i class="tel"></i>
              <span>{{$t('User.SetMenuMobile')}}</span>
              <i class="go"></i>
          </div>
          </div> -->
          <!-- <div style="  width: 100%;
        height: 0.6em;
        background: #F3F5F7;"></div> -->
      
          <!-- <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="realname">
              <i class="trueid"></i>
              <span>{{$t('User.SetMenuRealName')}}</span>
             <i style=" font-size: 0.8em;
    vertical-align: middle;
    width: 15em;
    padding-top: 1.1em;"> 仅限银行卡支付</i><i class="go"></i>
          </div>
          </div> -->
   </div>
    <div class="share_btn_zone_user">
      <div class="share_btn_zone">
            <div class="share_btn" @click="google" >
                <!-- <i class="gool"></i> -->
                <div>{{$t('User.SetMenuGoogle')}}</div>
                <div class="status">
                  <span>{{item.has_google_auth ? $t('User.mofify') : $t('User.unbound')}}</span>
                  <i class="go"></i> 
                </div>
            </div>
            </div>
    </div>

     <!-- <mu-raised-button :label="$t('Text.tcdl')" @click="loginOut" class="btn" style="margin-top:3em;" fullWidth primary/> -->
    
  </div>
</template>

<script>
import nprogress from "nprogress";
import store from '../store'
 import storage from '../models/storage'
import {SET_USER} from '../store/mutation-types'
import user from "../models/user";
import HttpResultCode from "../utils/HttpResultCode";
export default {
  name: 'set',
  components:{},
  data () {
    return { 
      has_payment_password:false,
      enabled:false,
      verified:false,
      has_mobile:false,
      item:{},
    }
  },
 beforeRouteEnter (to, from, next) {
      nprogress.set(0.6)
      // 参数初始化
             user
        .userProfile()
        .then(result => {
           nprogress.done()
          if (result.code === 0) {
                  let item={};
         item = result.data;
        //  alert(JSON.stringify(item))
        next(vm => {
          vm.item = item
          vm.has_payment_password = item.has_payment_password
          vm.enabled =  item.has_google_auth
          vm.has_mobile = item.has_mobile
          // vm.verified = item.authentication.real_name_authentication.verified
        })
//           country_code: 86
// created: 1565095183714
// email: null
// has_email: false
// has_google_auth: false
// has_mobile: true
// has_payment_password: true
// mobile: "156****7797"
// name: "ffff"
// referral_code: "B0w2fDd8N3w1"
// status: "NORMAL"
// trade_success_ratio: 0
// trade_total_usdt: 0
          }
        })
        .catch(e => {
           nprogress.done()
            
        });

      // user.getSecurity().then(result => {
      //   nprogress.done()
      //   let item={};
      //    item = result.data;
      //   next(vm => {
      //     vm.item = item
      //     vm.has_payment_password = item.authentication.has_payment_password
      //     vm.enabled =  item.authentication.google_auth.enabled
      //     vm.has_mobile = item.authentication.has_mobile
      //     vm.verified = item.authentication.real_name_authentication.verified
      //   })
      // }).catch((e) => {
      //    nprogress.done()
      //    HttpResultCode.validate(e.code)   
      // })
    },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
      // loginOut(){
      //   this.$router.push('/sign_in')
      // },
    modify_password(){ 
       this.$router.push('/modify_password')
    },
    asserts_pwd(){
      if(this.has_payment_password){
         this.$router.push('/modify_asserts_pwd')
      }else{
        this.$router.push('/set_assets_pwd')
      }
    },
    realname(){
      this.$router.push('/realname')
    },
    google(){
      //  this.$router.push('/google_unbound')
      //  return
      if(!this.enabled){
         this.$router.push('/google_bound')
      }else{
         this.$router.push('/google_unbound')
      }
    },
    bound_mobile(){
      if(!this.has_mobile){
         this.$router.push('/bound_mobile')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/set.scss";  
</style>
