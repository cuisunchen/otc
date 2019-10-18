<template>
  <div class="content-set-google-bound-pwd">
    <div class="top">
      <div class="center">绑定手机号</div>
      <div class="left" @click="goBack"></div>
    </div>
     <div class="banner">
      <div class="logo"></div>
      <!-- <div class="title">FireFoxOTC</div> -->
    </div>


      <div class="login">
        <mu-text-field v-model.trim="mobile" class="input-zone" hintText="绑定手机号码" type="number" fullWidth @focus="input_focus('mobile')"    :errorText="mobile_error"/>
        <div  class="captcha-zone" >
        <mu-auto-complete v-model.trim="code" class="input-zone"  :hintText="$t('SignIn.MobileLabel')"  fullWidth @focus="input_focus('code')" :errorText="code_error"></mu-auto-complete>
        <div  class="div-send-code" @click="send_code_mobile">{{refresh_txt_mobile}}
        </div>
      </div>
       <div  class="captcha-zone" >
        <mu-auto-complete v-model.trim="email_code" class="input-zone"  hintText="邮箱验证码"  fullWidth @focus="input_focus('email_code')" :errorText="email_code_error"></mu-auto-complete>
        <div  class="div-send-code" @click="send_code_email">{{refresh_txt_email}}
        </div>
      </div> <mu-raised-button :label="$t('Wallet_Detail.confirm_submit')" @click="confirm" class="btn" fullWidth primary/>
      </div>

 
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
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
      refresh_txt_email:'获取验证码',
      refresh_txt_mobile:'获取验证码',
      code_error:'',
      code:'',
      mobile_error:'',
      mobile:'',
      country_code:'+86',
      code:'',
      email_code:'',
      email_code_error:'',
      is_sending_email_code:false,
      is_sending_code:false,
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
      if(selected === 'mobile'){
          this.mobile_error = ''
      }

      if(selected === 'code'){
        this.code_error = ''
      }

      if(selected === 'email_code_error'){
        this.email_code_error = ''
      }
    },

      check_code: function () {
        if (this.code.length != 6) {
          if(this.code.length > 0 ){
            // this.code_error = true
            this.code_error = this.$t('Validate.CodeError')
          }
          return false
        }
        return true
      },
      send_code_mobile: function () {
        if (this.is_sending_code ) {
          this.showToast('已发送验证码')
          return false
        }
         if(!validate.isPhone(this.mobile, this.country_code)){
          this.mobile_error = this.$t('SignIn.MobileError');
          return false;
       }
        user.bindMobileCode(this.mobile, this.country_code).then(result => {
          let sec = 60
          for (let i = 0; i <= 60; i++) {
            window.setTimeout(() => {
              if (sec !== 0) {
                this.refresh_txt_mobile = sec + this.$t('SignUp.SendCodeFinsh')
                this.is_sending_code = true
                sec--
              } else {
                sec = 60
                this.refresh_txt_mobile = this.$t('SignUp.SendCode')
                this.is_sending_code = false
              }
            }, i * 1000)
          }
        }).catch((e) => {
          switch (e.code){
            case 1011:
            
              this.mobile_error = this.$t('Notice.MOBILE_ALREADY_BOUND')
              break
            case 1002:
              this.mobile_error = this.$t('Notice.MOBILE_ALREADY_SIGNED_UP')
              break
            default:
              this.mobile_error = this.$t('Validate.CodeSentFail')
          }
        })
      },
      send_code_email: function () {
        if (this.is_sending_email_code) {
          return false
        }
        user.getUserBindMobileEmailCode().then(result => {
          let sec = 60
          for (let i = 0; i <= 60; i++) {
            window.setTimeout(() => {
              if (sec !== 0) {
                this.send_email_code_txt = sec + this.$t('SignUp.SendCodeFinsh')
                this.is_sending_email_code = true
                sec--
              } else {
                sec = 60
                this.send_email_code_txt = this.$t('User.Security.UserBindMobile.SendCode')
                this.is_sending_email_code = false
              }
            }, i * 1000)
          }
        }).catch((e) => {
          switch (e.code){
            default:
              this.email_code_error = this.$t('Validate.CodeSentFail')
          }
        })
      },
      confirm: function () {
         if(!validate.isPhone(this.mobile, this.country_code)){
          this.mobile_error = this.$t('SignIn.MobileError');
          return false;
       }
       if(this.code.length != 6){
          this.code_error = this.$t('Validate.CodeError');
          return false;
       }
       if(this.email_code.length != 6){
          this.email_code_error = this.$t('Validate.CodeSentFail')
          return false;
       }
          user.bindMobile(this.mobile, this.code ,this.country_code, this.email_code).then(result => {
            // this.$notify.success({
            //   title: this.$t('User.Security.Success'),
            //   message: this.$t('User.Security.SetSuccess'),
            //   duration: 1000,
            //   onClose: () =>{
            //     this.$router.push('/user/security')
            //   }
            // })

            this.showToast('绑定成功')
            this.goBack();
          }).catch(e => {
            switch (e.code){
              case 1006:

                this.code_error = this.$t('Validate.CodeError')
                break
              default:
    
                this.code_error = this.$t('Validate.CodeError')
            }
          })
      
      }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/bound_mobile.scss";
</style>
