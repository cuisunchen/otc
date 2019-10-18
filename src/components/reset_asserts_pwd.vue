<template>
  <div class="content-reset-pwd">
    <div class="top">
      <div class="center">{{$t("SignIn.ResetAssertPwd")}}</div>
      <div class="left" @click="goBack"></div>
    </div>

      <!-- <p>{{mobile}}</p> -->
       <p class="p-safe-tip">{{$t('Wallet_Detail.assets_password_safe_tip')}}</p>
      <div class="login">

         <div class="captcha-zone" >
            <mu-auto-complete v-model.trim="code" class="input-zone" :hintText="$t('SignIn.CodeMobilePlaceholder')" fullWidth @focus="input_focus('code')" :errorText="code_error"></mu-auto-complete>
            <div  class="div-send-code" @click="send_code">{{refresh_txt}}</div>
        </div>
        <mu-text-field v-model.trim="pwd2" class="input-zone" :hintText="$t('SignIn.newAssertPwd')" type="password" fullWidth @focus="input_focus('pwd2')"   :errorText="pwdError2"/>
        <mu-text-field v-model.trim="pwd3" class="input-zone" :hintText="$t('SignIn.setAssertPwdAgain')" type="password" fullWidth @focus="input_focus('pwd3')"   :errorText="pwdError3"/>
        <mu-raised-button :label="$t('Wallet_Detail.confirm_submit')"  @click="commit" class="btn" fullWidth primary/>
      </div>

 
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
  </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";

export default {
  name: "reset_asserts_pwd",
  components: {},
  data() {
    return {
      selected: '',
      toast:false,
      message:'',
       
      code: '',
      code_error: '',

      pwd2: '',
      pwdError2: '',

      pwd3: '',
      pwdError3: '',

      mobile:this.$store.state.user.mobile,

      refresh_txt: this.$t('SignUp.SendCode'),
      refresh_timer: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {},
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
      if(selected === 'code'){
          this.code_error = ''
      }

      if(selected === 'pwd2'){
        this.pwdError2 = ''
      }

      if(selected === 'pwd3'){
        this.pwdError3 = ''
      }
    },
    commit(){
      if(this.code.length!=6){
        this.showToast(this.$t('SignIn.CaptchaPlaceholder'));
        return
      }
      if(this.pwd2.length<6){
        this.showToast(this.$t('SignIn.firefoxAssertPwdTip'));
        return
      }
      if(this.pwd3.length<6){
         this.showToast(this.$t('SignIn.setAssertPwdAgain'));
         return
      }
      if(this.pwd2 != this.pwd3){
           this.showToast(this.$t('SignIn.different'));
           return
      }
      user.mobileResetPaymentPwd(this.code,this.pwd2,this.pwd3).then(result => {
         this.showToast(this.$t('SignIn.ResetPasswordSuccedd'));
         user.signOut().then(result => {
              //  this.$router.push('/sign_in')
                this.$router.push("/trade");
          }).catch(e => { 
          }) 
     
      }).catch((e) => {
         this.showToast(e.message);
        })

      
    },
    send_code(){
      if(this.refresh_txt!=this.$t('SignUp.SendCode')){
          this.showToast(this.$t('SignIn.PhoneCodeSMSResponse')); 
        return;
      }
      user.getMobileResetPaymentPwdCode().then(result => {
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
              this.refresh_txt = this.$t('SignUp.SendCode')
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
        this.refresh_txt =  this.$t('SignUp.SendCode')
      }
  },
  beforeDestroy: function () {
      for(let i = 0; i < this.refresh_timer.length; i++){
        clearTimeout(this.refresh_timer[i])
      }
    }
};
</script>

<style lang="scss" scope>
@import "../assets/css/reset_asserts_pwd.scss";
</style>
