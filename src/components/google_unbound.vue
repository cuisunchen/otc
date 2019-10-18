<template>
  <div class="content unbound">
    <!-- <mu-toast v-if="toast" :message="message" @close="hideToast"/> -->
    <div v-if="toast" class="mu-toast" style="z-index: 20141258;">
       {{ message }}
    </div>
    <div class="top">
      <div class="center fs-16">{{$t('SignIn.GoogleUnBound')}}</div>        
      <div class="left" @click="goBack" />
    </div>
    <div>
  
    <div style="width:100%;height:0.66rem;background:#F3F5F7;"></div>
     <div class="login">
        <mu-text-field v-model.trim="google_code" class="input-zone" :hintText="$t('SignIn.GoogleLabel')" type="number" fullWidth    :errorText="google_bound_error"/>
      </div>
      <div>
        <mu-raised-button :label="$t('Wallet_Detail.cancel_bound')" @click="openDialog" class="btn fs-18" fullWidth primary/>
      </div>
    </div>
      <!-- <mu-dialog :open="unbound_comfirm" :title="$t('Text.unbound_comfirm_text')" @close="close_dialog">
        {{$t('Text.unbound_comfirm_text')}}
    <mu-flat-button slot="actions" @click="close_dialog" primary :label="$t('Text.close')"/>
    <mu-flat-button slot="actions" primary @click="commit" :label="$t('Text.bound_confirm')"/>
  </mu-dialog> -->
     <div
      style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
        class="reset-dialog"
        v-show="unbound_comfirm"
    >
      <div
        style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
        class="reset-dialog-wrap"
      >
        <div class="dialog-title fs-18" style="margin-top:1.37rem">{{$t('Text.unbound_comfirm_text')}}</div>
        <div class="dialog-text fs-15" style=" margin-top:1.47rem;">{{ $t('Text.unbound_tips') }}</div>
        <div>Telegram：123456789</div>
      
        <div class="btn fs-18" style="display: flex;justify-content: space-between; margin-top:3rem;">
          <mu-raised-button
          :label="$t('Text.close')"
          @click="close_dialog"
          class="btn-toast-cancel"
          style="margin-top:1em;"
          primary
        />
        <mu-raised-button
          :label="$t('Text.bound_confirm')"
          @click="commit"
          class="btn-toast-submit"
          style="margin-top:1em;"
          primary
        />
        </div>
      </div>

      <!-- <img
        @click="closeDialog"
        src="../assets/image/icon_close.png"
        style="width:4em;height:4em;margin:1.5em auto 0 auto;"
      /> -->
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
  name: 'google_unbound',
  components:{},
  data () {
    return { 
      unbound_comfirm: false,
      selected: '',
      toast:false,
      message:'',

      google_code:'',
      google_bound_error:'',

    }
  },
    beforeRouteEnter (to, from, next) {
      nprogress.set(0.6);
      next();
      nprogress.done();
    },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
      commit(){
        this.unbound_comfirm = false
        if(this.google_code.length!=6){
           this.showToast(this.$t('SignIn.CodeGooglePlaceholder'));
            return;
        }
        user.unbindGoogleAuth(this.google_code).then(result => {
          this.showToast(this.$t('SignIn.SuccessUnBound'));
          this.goBack(); 
        }).catch(e => {
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
    openDialog(){
      this.unbound_comfirm = true
    },
    close_dialog(){
      this.unbound_comfirm = false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
   @import "../assets/css/google_unbound.scss";  
   .unbound /deep/{
    .mu-dialog-actions span:nth-child(1){
      background: #fff;
      color:rgba(0,94,228,1);
    }
  }
</style>
