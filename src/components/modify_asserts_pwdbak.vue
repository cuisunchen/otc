<template>
  <div class="content-modify-password-assert">
    <div class="top">
      <div class="center">{{$t('SignIn.ModefyAssertPwd')}}</div> 
      <div class="left" @click="goBack"></div>
    </div>

      <p class="p-safe-tip">{{$t('Wallet_Detail.assets_password_safe_tip')}}</p>
      <div class="login">  
        <mu-text-field v-model.trim="pwd1" class="input-zone" :hintText="$t('SignIn.OldAssertPwdHint')" type="password" fullWidth @focus="input_focus('pwd1')"    :errorText="pwdError1"/>
        <mu-text-field v-model.trim="pwd2" class="input-zone" :hintText="$t('SignIn.newAssertPwdHint')" type="password" fullWidth @focus="input_focus('pwd2')"    :errorText="pwdError2"/>
        <mu-text-field v-model.trim="pwd3" class="input-zone" :hintText="$t('SignIn.newAssertPwdAgainHint')" type="password" fullWidth @focus="input_focus('pwd3')"   :errorText="pwdError3"/>
        <p class="pw-forget-btn" @click="reset" >{{$t('SignIn.ForgetAssertPwd')}}</p>
        <mu-raised-button :label="$t('Wallet_Detail.confirm_submit')" @click="commit" class="btn" fullWidth primary/>
        <mu-raised-button :label="$t('SignIn.ResetAssertPwd')" @click="reset" class="btn" fullWidth primary v-show="false"/>
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
  name: "modify_password",
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
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {},
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
      if(this.pwd1.length==0){
        this.showToast(this.$t('SignIn.OldAssertPwdHint'));
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
          //  this.showToast('确认交易密码需要和新交易密码相同');
           return
      }
      user.modifyPaymentPassword(this.pwd1,this.pwd2,this.pwd3).then(result => {
        this.showToast(this.$t('SignIn.setAssertPwdSuccedd'));  
         
         user.signOut().then(result => {
               this.$router.push('/sign_in')
          }).catch(e => { 
          }) 
     
      }).catch((e) => {
         this.showToast(e.message);
        })

      
    },
    reset(){
      this.$router.push('/reset_asserts_pwd')
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/modify_password_assert.scss";
</style>
