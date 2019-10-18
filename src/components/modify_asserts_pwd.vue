<template>
  <div class="content modify-asset-pwd">
    <!-- <mu-toast v-if="toast" :message="message" @close="hideToast"/> -->
    <div v-if="toast" class="mu-toast" style="z-index: 20141258;">
       {{ message }}
    </div>
    <div class="top">
      <div class="center fs-16">{{$t('Text.szjxmm')}}</div>
      <div class="left" @click="goBack" />
       
    </div>
    <div>
 <!--type="password"-->
    <div style="width:100%;height:10px;background:#F3F5F7;"></div>
     <div class="google-input-zone">
       <div class="google-input set-password">
            <!-- <span class="" style="font-size:0.8em;color:#2c3e50;" v-html="$t('SignIn.MobileLabel1')"></span> -->
            <mu-text-field v-model.trim="code" class="google-input-zone" :hintText="$t('SignIn.CodeMobilePlaceholder1')" fullWidth type="number" :errorText="code_error"></mu-text-field>
            <div  class="div-send-code" @click="send_code"><span style="padding-right: 1.2em;">{{refresh_txt}}</span></div>
       </div>
       <div class="google-input" style="display:flex;" >
            <!-- <span class="" style="font-size:0.8em;color:#2c3e50;">{{$t('Text.xzjmm')}}</span> -->
             <mu-text-field v-model.trim="google_code" class="google-input-zone" :hintText="$t('Text.xzjmmhint1')"  fullWidth  :type="isPassWord ? 'password': undefined" :errorText="google_bound_error"/>
             <div @click="isPassWord = !isPassWord" class="img-item">
               <img v-if="isPassWord" style="margin-top: 0.8rem;" height="26" width="26" src="../assets/image/icon_pwd_close.png" alt="" >
               <img v-else height="26" style="margin-top: 0.8rem;" width="26" src="../assets/image/icon_pwd_open.png" alt="">
              </div>
       </div>
        <div class="google-btn-zone">
          <mu-raised-button :label="$t('Wallet_Detail.confirm_submit1')" @click="commit" class="btn fs-18" fullWidth primary/>
        </div>
      </div>
    </div>
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
  name: 'google_bound',
  components:{},
  data () {
    return { 
      isPassWord:true,
      selected: '',
        toast:false,
        message:'',

     mobile:this.$store.state.user.mobile,
     account:'',
     select_key:'',
     qr_url:'',

     code:'',
     google_code:'',

     code_error :'',
     google_bound_error:'',

     refresh_txt: this.$t('SignUp.GetCode'),
     refresh_timer: [],
    }
  },
    // beforeRouteEnter (to, from, next) {
    //   nprogress.set(0.6)
    //   user.getGoogleAuthKey().then(result => {
    //     next(vm => {
    //       vm.account = result.data.account
    //       vm.select_key = result.data.secret
    //       vm.qr_url = result.data.url
    //     })
    //     nprogress.done()
    //   }).catch(e => {
    //     nprogress.done()
    //   })
    // },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
      commit(){
        if(this.code.length==0){
           this.showToast(this.$t('SignIn.MobileError'));
           return;
        }
        if(this.google_code.length!=6){
           this.showToast(this.$t('Wallet_Detail.pwd_validate_tip'));
           return;
        }
        var params = {
          "one_time_code":this.code,
   
          "password":this.google_code
        }
  
       user.userResetPaymentPassword(params).then(result => {
          // this.showToast(this.$t('SignIn.SuccessBound'));  
           this.showToast(this.$t('SignIn.setAssertPwdSuccedd'));  
          this.goBack();
        }).catch(e => {
          // this.showToast(HttpResultCode.validate(e.code));
           this.showToast(e.message);
        })
      },  
      hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    showToast (message) {
      this.toast=true
      this.message=message
      this.toastTimer = setTimeout(() => { this.toast = false },2000)
    },
    bound_help(){
      this.$router.push('/help_bound_google')
    },
    send_code: function (){
      // console.log(this.refresh_txt,this.$t('SignIn.getCode'))
       if( this.refresh_txt!= this.$t('SignIn.getCode')){
           this.showToast(this.refresh_txt+"S "+this.$t('SignIn.sendCodeTip'));
          return ; 
        }
      //  this.showToast(this.$t('Text.send_code'));

        user.userResetPaymentPasswordCode().then(result => {  
           this.showToast(this.$t('SignIn.SendCodeMobile'));
           this.time_refresh();
        }).catch((e) => {
          this.showToast(e.message);
        })
    },
    time_refresh: function () {
        for (let i = 0; i <= 120; i++) {
          this.refresh_timer.push(window.setTimeout(() => {
            if (i <=119) {
               let count = 120-i;
               this.refresh_txt = ""+count
            } else {
              this.refresh_txt = this.$t('SignIn.sendCode')
              this.clear_refresh();
            }
          }, i * 1000))
        }
      },
      clear_refresh: function () {
        for(let i = 0; i < this.refresh_timer.length; i++){
          clearTimeout(this.refresh_timer[i])
        }
        this.refresh_timer = []
        this.refresh_txt =  this.$t('SignIn.sendCode')
      }
  },
  beforeDestroy: function () {
      for(let i = 0; i < this.refresh_timer.length; i++){
        clearTimeout(this.refresh_timer[i])
      }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/google_bound.scss";  
</style>
