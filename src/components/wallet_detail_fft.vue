<template>
  <div class="content" style="padding-top:10em;background:#fff">
    <div class="top">
      <div class="center">FFT</div>
      <div class="left" @click="goBack" />
      <div class="right" @click="bills">{{$t('Wallet_Detail.detail')}}</div>
    </div>
    <div class="wallet-common-zone">
      <div class="wallet-common-bund-address" >
        <p class="wallet-common-bund-address-balance">{{$t('Wallet_Detail.balance')}}</p>
        <div class="wallet-common-bund-address-balance-value"><span class="span-left">{{balance}}</span>&nbsp;<span class="span-right">&nbsp;FFT</span></div>
        <div class="wallet-common-bund-address-balance-lock-value"><span class="span-left">{{$t('Wallet_Detail.Freezing')}}</span>&nbsp;<span class="span-right">{{locked}}&nbsp;FFT</span></div>
     </div>
    </div>                                                
    <div class="tab-wallet">               
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Wallet_Detail.top_up')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Wallet_Detail.withdrawal')}}</button>
    </div>
    <div class="wallet-content" v-show="tab=='tab1'">
      <!--common-->
      <!--绑定地址-->
    

      <!--提示-->
      <div style="color:#aaa;margin-top:3em;">
        
       暂未开放
      </div>


   </div>
<!--提现-->
   <div class="withdraw-detail" v-show="tab=='tab2'">
<div style="color:#aaa;margin-top:3em;">
        
       暂未开放
      </div>
   </div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import wallet from "../models/wallet";
import store from "../store";
import storage from "../models/storage";
import user from "../models/user";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import Clipboard from "clipboard";
export default {
  name: "wallet_detail",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      balance: "",
      locked: "",
      balances: [],
      tab: "tab1"
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    // let crypto_currency = store.state.user.crypto_currency
    // let crypto_currency = to.params.crypto_currency.toUpperCase();
    // if (typeof to.params.currency != "undefined") {
    //   crypto_currency = to.params.currency.toUpperCase();
    //   store.commit(SET_CRYPTO_CURRENCY, crypto_currency);
    // }

    Promise.all([wallet.balance()])
      .then(values => {
        let balance_result = values[0];

        let balances = [];
        let balance = "0";
        let locked = "0";

        if (balance_result.code === 0) {
          if (balance_result.data.hasOwnProperty("list")) {
            balances = balance_result.data.list;
            if (balance_result.data.hasOwnProperty("list")) {
              for (let i = 0; i < balances.length; i++) {
                if (balances[i].currency == "FFT") {
                  balance = balances[i].available;
                  locked = balances[i].locked;
                }
              }
            }
          }
        }
        next(vm => {
          vm.balances = balances;
          vm.balance = balance;
          vm.locked = locked;
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  methods: {
    bills() {
      this.$router.push("/bills");
    },
    goBack() {
      this.$router.go(-1);
    },
    tabChange(tab) {
      this.tab = tab;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/wallet_detail.scss";
</style>
