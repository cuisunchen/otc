<template>
  <div class="content delete-address">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <!-- <div v-if="toast" class="mu-toast" style="z-index: 20141258;">
       <div style="width:100%;word-wrap:break-word">{{ message }}</div>
    </div> -->
    <div class="top">
      <div class="center fs-16">{{$t('Text.scdz')}}</div>
      <div class="left" @click="goBack" />
       
    </div>
    <div>
     <div class="google-input-zone fs-14 wraper">
       <div class="google-input delete_address">
            <div class="label fs-14">{{$t('Text.addressType')}}</div>
            <mu-text-field v-model.trim="currency" class="google-input-zone"  :hintText="$t('Text.addressHint')" type="text" fullWidth    :errorText="address_error"/>
       </div>
       <div class="google-input delete_address">
            <div class="label fs-14">{{this.currency}}{{$t('Text.address')}}</div>
             <mu-text-field v-model.trim="address" class="google-input-zone" :hintText="$t('Text.addressHint')" type="text" fullWidth    :errorText="address_error"/>
       </div>
       <div class="google-input delete_address">
            <div class="label fs-14">{{$t('Text.bz')}}</div>
            <mu-text-field v-model.trim="remark" class="google-input-zone" :hintText="$t('Text.bzHint')" type="text" fullWidth    :errorText="google_bound_error"/>
       </div>

       <div class="google-input code delete_address">
            <div class="label fs-14">{{$t('SignIn.MobileLabel')}}</div>
            <mu-text-field v-model.trim="one_time_code" class="google-input-zone" :hintText="$t('SignIn.CodeMobilePlaceholder')" fullWidth type="number" :errorText="code_error"></mu-text-field>
            <div  class="div-send-code fs-14" @click="send_code"><span>{{refresh_txt}}</span></div>
       </div>
       
        <div class="google-btn-zone" style="background:#f3f5f8;">
          <mu-raised-button :label="$t('Text.scdz')" @click="commit" class="btn fs-18" fullWidth primary/>
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
  name: 'Add_addressDelete',
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
   
    coinList: [
            { name: "BTC", value: "BTC" },
            { name: "ETH", value: "ETH" },
            { name: "MYG", value: "MYG" },
            { name: "USDT", value: "USDT" }
          ],
     code:'',
     google_code:'',

     code_error :'',
     google_bound_error:'',

     refresh_txt: this.$t('SignUp.GetCode'),
     refresh_timer: [],

     address_error:"",

     currency:this.$route.params.currency.toUpperCase(),
      address:this.$route.params.address,
      remark:this.$route.params.remark,
      one_time_code:""
  
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
        // if(this.code.length==0){
        //    this.showToast(this.$t('SignIn.MobileError'));
        //    return;
        // }
        // if(this.google_code.length!=6){
        //    this.showToast(this.$t('SignIn.CodeGooglePlaceholder'));
        //    return;
        // }
        var params = {
         	"currency":this.currency.toLowerCase(),
          "address":this.address,
          "remark":this.remark,
          "one_time_code":this.one_time_code
        }
  
       user.USER_otc_delete_receiver_address(params).then(result => {
          // this.showToast(this.$t('SignIn.SuccessBound'));  
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
    bound_help(){
      this.$router.push('/help_bound_google')
    },
    send_code: function (){
      if(this.address.length<5){
           this.showToast(this.$t('Text.addressHint'));
          return;
      }
       
      	if( this.refresh_txt > 1 ){
           this.showToast(this.refresh_txt+"S "+this.$t('SignIn.sendCodeTip'));
          return ; 
        }
        var param = {
          "currency":this.currency.toLowerCase(),
          "address":this.address
        }
        user.USER_otc_mobile_code_deletereceiveraddress(param).then(result => {  
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
      },
       publishCryptoCurrencyChange(val) {
          this.currency = val;
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
  //  .delete-address{
  //    height:100%;
  //    background:rgba(243,245,247,1);
  //  }
</style>
<style lang="scss">
    // .delete-address{
    
    // }
</style>
