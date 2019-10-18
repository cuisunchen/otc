<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <!-- <div v-if="toast" class="mu-toast" style="z-index: 20141258;">
       {{ message }}
    </div> -->
    <div class="top">
      <div class="center fs-16">{{$t('User.GoogleBound')}}</div>
      <div class="left" @click="goBack" />
       <div class="right" @click="bound_help">{{$t('Text.help') }}</div>
    </div>
    <div>
      <div  class="google-hint-zone">
        <span>{{$t('User.GoogleBoundTip')}}</span>
      </div>
      <!-- <p class="p2">
      <span>{{$t('User.AccountName')}}</span>
     </p>
     <p class="user-google">{{account}}</p> -->
      <div class="qrcode-zone" style="padding-bottom:1.5em;">
         <p class="p3 fs-16" style="  text-align: center;color:#4E586E">
         <span >{{$t('User.AccountName')}} {{account}}</span>
        </p>

        <qrcode  :value="this.qr_url" :options="{ size: 150 }" style="margin-top:0.5em;border:10px solid #F3F5F7;"></qrcode>
        <p class="p3 fs-14" style="  text-align: center;color:#4E586E">
         <span v-clipboard:copy="select_key"
              v-clipboard:success="success"
              v-clipboard:error="error"> {{$t('User.ScretKey')}} {{select_key}}</span>
              <!-- <span style="margin-left:1em;"  v-clipboard:copy="select_key"
              v-clipboard:success="success"
              v-clipboard:error="error">{{$t('Text.copy')}}</span> -->
        </p>
      </div>
     <!-- <p class="p4">{{mobile}}</p> -->

     <div class="google-input-zone">
       <div class="google-input" style="border-top: 1px solid #F3F5F7;">
            <!-- <span class=""  style="font-size:0.8em;color:#2c3e50;" v-html="$t('SignIn.MobileLabel2')"></span> -->
            <mu-text-field v-model.trim="code" class="google-input-zone" :hintText="$t('SignIn.CodeMobilePlaceholder')" fullWidth type="number" :errorText="code_error"></mu-text-field>
            <div  class="div-send-code" @click="send_code"><span>{{refresh_txt}}</span></div>
       </div>
       <div class="google-input">
            <!-- <span class="">{{$t('SignIn.GoogleLabel')}}</span> -->
             <mu-text-field v-model.trim="google_code" class="google-input-zone" :hintText="$t('SignIn.CodeGooglePlaceholder')" type="number" fullWidth    :errorText="google_bound_error"/>
       </div>
        <div class="google-btn-zone">
          <mu-raised-button :label="$t('Wallet_Detail.confirm_submit2')" @click="commit" class="btn fs-18" fullWidth primary/>
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
import Clipboard from "clipboard";
import HttpResultCode from "../utils/HttpResultCode";
export default {
  name: 'google_bound',
  components:{},
  data () {
    return { 
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
    beforeRouteEnter (to, from, next) {
      nprogress.set(0.6)
      user.getGoogleAuthKey().then(result => {
        next(vm => {
          vm.account = result.data.account
          vm.select_key = result.data.secret
          vm.qr_url = result.data.url
        })
        nprogress.done()
      }).catch(e => {
        nprogress.done()
      })
    },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
      success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    },
      commit(){
        if(this.code.length!=6){
           this.showToast(this.$t('SignIn.MobileError'));
           return;
        }
        if(this.google_code.length!=6){
           this.showToast(this.$t('SignIn.CodeGooglePlaceholder'));
           return;
        }
        var params = {
          "one_time_code":this.code,
          "secret":this.select_key,
          "totp_password":this.google_code
        }
  
       user.bindGoogleAuth(params).then(result => {
          this.showToast(this.$t('SignIn.SuccessBound'));  
          this.goBack();
        }).catch(e => {
          HttpResultCode.validate(e.code)
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
      this.toastTimer = setTimeout(() => { this.toast = false }, 2000)
    },
    bound_help(){
      this.$router.push('/help_bound_google')
    },
    send_code: function (){
      if( typeof(this.refresh_txt) == 'number'){
           this.showToast(this.refresh_txt+"S "+this.$t('SignIn.sendCodeTip'));
          return ; 
        }
        user.getBindGoogleCode().then(result => {  
           this.showToast(this.$t('SignIn.SendCodeMobile'));
           this.time_refresh();
        }).catch((e) => {
          HttpResultCode.validate(e.code)
          this.showToast(e.message);
        })
    },
    time_refresh: function () {
        for (let i = 0; i <= 120; i++) {
          this.refresh_timer.push(window.setTimeout(() => {
            if (i <=119) {
               let count = 120-i;
               this.refresh_txt = count
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/google_bound.scss";  
</style>
