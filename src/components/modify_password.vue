<template>
  <div class="content-modify-password">
    <div class="top">
      <div class="center fs-16">{{$t('SignIn.modifyLoginPassword')}}</div>
      <div class="left" @click="goBack"></div>
    </div>
    <div style="width:100%;height:0.66rem;background:#F3F5F7;"></div>
    <div class="login">  
      <mu-text-field v-model.trim="pwd1" class="input-zone" :hintText="$t('SignIn.OldPwdHint')"  type="password" fullWidth @focus="input_focus('pwd1')"   :errorText="pwdError1"/>
      <mu-text-field v-model.trim="pwd2" class="input-zone" :hintText="$t('SignIn.newPwdHint')"  type="password" fullWidth @focus="input_focus('pwd2')"     :errorText="pwdError2"/>
      <mu-text-field v-model.trim="pwd3" class="input-zone" :hintText="$t('SignIn.againPassword')" type="password" fullWidth @focus="input_focus('pwd3')"   :errorText="pwdError3"/>
      <mu-raised-button :label="$t('Wallet_Detail.confirm_submit')" @click="commit" class="btn fs-18" fullWidth primary/>
    </div>

 
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
        this.showToast(this.$t('SignIn.OldPwdHint'));
        return
      }
      if(this.pwd2.length<6){
        this.showToast(this.$t('SignIn.firefoxPwdTip'));
        return
      }
      if(this.pwd3.length<6){
         this.showToast(this.$t('SignIn.againPassword')); 
         return
      }
      if(this.pwd2 != this.pwd3){
         this.showToast(this.$t('SignIn.different'));  
           return
      }
    //  if(this.pwd1 == this.pwd3){
    //        this.showToast('新密码不能和原密码相同');
    //        return
    //   }
      user.modifyPassword(this.pwd1,this.pwd2,this.pwd3).then(result => {
        this.showToast(this.$t('SignIn.setAssertPwdSuccedd'));  
          // this.$router.push('/sign_in')
          this.goBack();
      }).catch((e) => {
         this.showToast(e.message);
        })

      
    },
    // pwd1(){
    //   if(validate.isPwd(this.pwd1)){
    //     this.pwdError1 = ''
    //     return true
    //   }else{
    //     this.pwdError1 = ' '
    //     return false
    //   }
    // },
    // pwd2(){
    //   if(validate.isPwd(this.pwd2)){
    //     this.pwdError2 = ''
    //     return true
    //   }else{
    //     this.pwdError2 = ' '
    //     return false
    //   }
    // },
    // pwd3(){
    //   if(validate.isPwd(this.pwd3)){
    //     this.pwdError3 = ''
    //     return true
    //   }else{
    //     this.pwdError3 = ' '
    //     return false
    //   }
    // }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/modify_password.scss";
</style>
