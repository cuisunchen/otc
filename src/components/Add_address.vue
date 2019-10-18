<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center fs-16">{{$t('Text.Add_address')}}</div>
      <div class="left" @click="goBack" />
       
    </div>
    <div>
    <!-- <div class="" style="border-bottom: 1px solid #eeeeee;">
          <span style="color:#4E586E;font-size:1em;">{{$t('Text.coinName')}}</span>
          <mu-select-field v-model="currency" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow"  @change="publishCryptoCurrencyChange">
            <mu-menu-item   v-for="(item) in this.coinList" :key="item.name"   :value="item.value" :title="item.name" />
          </mu-select-field>
    </div> -->
    <div style="width:100%;height:0.4em;background:#F3F5F7;"></div>
      <div class="publish-crypto-currency-item">
        <span class="fs-14">{{$t('Text.addressType')}}</span>
        <mu-select-field v-model="currency" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow"  @change="publishCryptoCurrencyChange">
          <mu-menu-item   v-for="(item) in this.coinList" :key="item.name"   :value="item.value" :title="item.name" />
        </mu-select-field>
      </div>

  <!-- <div style="width:100%;height:0.4em;background:#F3F5F7;"></div> -->


     <div class="google-input-zone add_address">
       <div class="google-input">
            <div class="label fs-14" >{{currency}}{{$t('Text.address1')}}</div>
             <mu-text-field v-model.trim="address" class="google-input-zone" :hintText="$t('Text.addressHint')" type="text" fullWidth    :errorText="address_error"/>
       </div>
       <div class="google-input">
            <div class="label fs-14" v-html="$t('Text.bz1')"></div>
             <mu-text-field v-model.trim="remark" class="google-input-zone" :hintText="$t('Text.bzHint')" type="text" fullWidth    :errorText="google_bound_error"/>
       </div>

       <div class="google-input">
            <div class="label">{{$t('SignIn.MobileLabel')}}</div>
            <mu-text-field v-model.trim="one_time_code" class="google-input-zone" :hintText="$t('SignIn.CodeMobilePlaceholder')" fullWidth type="number" :errorText="code_error"></mu-text-field>
            <div  class="div-send-code fs-14" @click="send_code"><span>{{refresh_txt}}</span></div>
       </div>
       
        <div class="google-btn-zone">
          <mu-raised-button :label="$t('Wallet_Detail.save')" @click="commit" class="btn fs-18" fullWidth primary/>
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
  name: 'Add_address',
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
        {name:"USDT",value:"USDT"}
          ],
     code:'',
     google_code:'',

     code_error :'',
     google_bound_error:'',

     refresh_txt: this.$t('SignUp.SendCode'),
     refresh_timer: [],

     address_error:"",

     currency:'USDT',
      address:"",
      remark:"",
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
  created: function() {
    this.getCoin();
  },
  methods:{
    goBack() {
      this.$router.go(-1);
      },
      commit(){
        var params = {
         	"currency":this.currency.toLowerCase(),
          "address":this.address,
          "remark":this.remark,
          "one_time_code":this.one_time_code
        }
  
       user.userAddAddress(params).then(result => {
          // this.showToast(this.$t('SignIn.SuccessBound'));  
          this.goBack();
        }).catch(e => {
          this.showToast(e.message);
        })
      },  
      getCoin(){
       user.USER_otc_supported_currencies().then(result => {
          // this.showToast(this.$t('SignIn.SuccessBound'));  
           if (result.code === 0) {
             let da = []  
             result.data.currencies.forEach(element => {
                var ddd = [{name:element.toUpperCase(),value:element.toUpperCase()}]
                da = da.concat(ddd)
             });
            this.coinList = da; 
        }
    
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
       
      if( this.refresh_txt!= this.$t('SignUp.SendCode')){
           this.showToast(this.refresh_txt+"S "+this.$t('SignIn.sendCodeTip'));
          return ; 
        }
        var param = {
          "currency":this.currency.toLowerCase(),
          "address":this.address
        }
        user.userOtc_mobile_code_addreceiveraddress(param).then(result => {  
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
   @import "../assets/css/add_address.scss";  
</style>
