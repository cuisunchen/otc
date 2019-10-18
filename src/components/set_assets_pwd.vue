<template>
  <div class="content-set-asset-pwd1">
    <div class="top">
      <!-- <div class="center">{{$t('SignIn.setAssertPwd')}}</div> -->
      <div class="left" @click="goBack"></div>
    </div>
     <!-- <div class="banner">
      <div class="logo"></div>
   
    </div> -->
      <!-- <p class="p-safe-tip">{{$t('Wallet_Detail.assets_password_safe_tip')}}</p> -->

       <div class="title">
        {{this.$t("Text.setTradePassword")}} 
        </div>

      <div class="login">
        <mu-text-field v-model.trim="pwd1" class="input-zone" :hintText="$t('Text.xzjmmhint')" type="password" fullWidth @focus="input_focus('pwd1')"    :errorText="pwdError1"/>
        <mu-text-field v-model.trim="pwd2" class="input-zone" :hintText="$t('SignIn.setAssertPwdAgain')" type="password" fullWidth @focus="input_focus('pwd2')"     :errorText="pwdError2"/>
      
      </div>
  <mu-raised-button :label="$t('SignIn.Confirm')" @click="commit" class="btn btn-default" fullWidth primary/>
 
    <!-- <mu-toast v-if="toast" :message="message" @close="hideToast"/> -->
    <div v-if="toast" class="mu-toast" style="z-index: 20141258;">
       {{ message }}
    </div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import store from '../store'
export default {
  name: "set_assets_pwd",
  components: {},
  data() {
    return {
      selected: '',
      toast:false,
      message:'',
       
      pwd1: '',
      pwdError1: '',

      pwd2: '',
      pwdError2: '',

      pwd3: '',
      pwdError3: '',

      from:{}
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   nprogress.set(0.6);
 
  //    next(vm => {
  //         vm.from = to
  //         // vm.verified = item.authentication.real_name_authentication.verified
  //       })
  //   nprogress.done();
  // },
  created: function() {
      //  alert(JSON.stringify(this.from) )
  },
  computed: {
    captcha_img: function() {
      return CAPTCHA_SIGNIN + "?_t=" + this.timestamp;
    }
  },
  methods: {
   goBack() {
      this.$router.go(-1);
      },
    hideToast () {
      this.toast = false
      if (this.toastTimer) clearTimeout(this.toastTimer)
    },
    showToast (message) {
      this.toast=true
      this.message=message
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    set_active: function (selected) {
        this.selected = selected
      },
    input_focus: function (selected) {
      this.set_active(selected)
      if(selected === 'pwd1'){
          this.pwdError1 = ''
      }

      if(selected === 'pwd2'){
        this.pwdError2 = ''
      }

      if(selected === 'pwd3'){
        this.pwdError3 = ''
      }
    },
    commit(){
      if(this.pwd1.length!=6){
        this.showToast(this.$t('SignIn.firefoxAssertPwdTip'));
        return
      }
      if(this.pwd2.length!=6){
        this.showToast(this.$t('SignIn.setAssertPwdAgain'));
        return 
      }

      if(this.pwd1 != this.pwd2){ 
           this.showToast(this.$t('SignIn.different'));
           return
      }
      user.setPaymentPassword(this.pwd1, this.pwd2).then(result => {
            this.showToast(this.$t('SignIn.setAssertPwdSuccedd'));
              // let access_token = this.$store.state.user.access_token; 
              // let name = this.$store.state.user.name
              // let has_payment_password = true;    
              // let mobile = this.$store.state.user.mobile     
              // var u = navigator.userAgent, app = navigator.appVersion;  
              // var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
              //  if(isAndroid){
              //     saveAccount(access_token,name,has_payment_password,mobile);
              //  }
              if(result.code==0){
                // this.goBack();
                 this.$router.push("/trade");
              }else{
                 this.showToast(result.message);
              }
           
            //  this.$router.push("/set_assets_pwd");
          }).catch(e => { 
            this.showToast(e.message);
              HttpResultCode.validate(e.code);
          })
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/set_assets_pwd.scss";
</style>
