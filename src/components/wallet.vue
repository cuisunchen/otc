<template>
  <div class="content">
    <div class="top">
      <div class="center">{{$t("Wallet.Title")}}</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="wallet_btn_zone">
      <div class="div-content-empty"></div>
      <div class="share_btn_zone">
          <div class="share_btn"   @click="ffc()">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.FFC")}}</span><span class="span-right">{{FFC}}</span>
              <i class="go"></i>
          </div>
      </div>
      <div class="div-content-down-empty"></div>
      <div class="share_btn_zone">
           <div  class="share_btn" @click="wallet('BTC')">
              <!-- <i class="wallet"></i> -->
              <span>{{$t("Wallet.BTC")}}</span> <span class="span-right">{{BTC}}</span>
              <i class="go"></i>
            </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('ETH')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.ETH")}}</span><span class="span-right">{{ETH}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
           <div class="share_btn bottom_border" @click="wallet('LTC')">
              <!-- <i class="wx-ico"></i> -->
              <span>{{$t("Wallet.LTC")}}</span><span class="span-right">{{LTC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('OSC')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.OSC")}}</span><span class="span-right">{{OSC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('FFTS')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.FFTS")}}</span><span class="span-right">{{FFTS}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('FFC')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.FFC")}}</span><span class="span-right">{{FFC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('DNA')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.DNA")}}</span><span class="span-right">{{DNA}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('DGC')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.DGC")}}</span><span class="span-right">{{DGC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('EGD')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.EGD")}}</span><span class="span-right">{{EGD}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('CBC')">
              <!-- <i class="guanggao"></i> -->
              <span>{{$t("Wallet.CBC")}}</span><span class="span-right">{{CBC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('LBTC')">
              <!-- <i class="anquan"></i> -->
              <span>{{$t("Wallet.LBTC")}}</span><span class="span-right">{{LBTC}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="wallet('XDAG')">
              <!-- <i class="anquan"></i> -->
              <span>{{$t("Wallet.XDAG")}}</span><span class="span-right">{{XDAG}}</span>
              <i class="go"></i>
          </div>
          </div>
          <div class="share_btn_zone">
          <div class="share_btn bottom_border" @click="fft()">
              <!-- <i class="anquan"></i> -->
              <span>{{$t("Wallet.FFT")}}</span><span class="span-right">{{FFT}}</span>
              <i class="go"></i>
          </div>
          </div>
      </div>
   </div>
</template>

<script>
import nprogress from "nprogress";
import wallet from "../models/wallet";
import store from "../store";
import storage from "../models/storage";
import { SET_CRYPTO_CURRENCY, SET_USER } from "../store/mutation-types";
import user from "../models/user";
// import {,CLEAN_USER,SET_USER} from '../store/mutation-types'
export default {
  name: "wallet",
  components: {},
  data() {
    return {
      name: this.$store.state.user.name,
      subName: this.$store.state.user.name.substring(0, 2).toUpperCase(),
      mobile: this.$store.state.user.mobile,
      isSignOutDialog: false,
      BTC: "0",
      ETH: "0",
      LTC: "0",
      OSC: "0",
      DGC: "0",
      EGD: "0",
      FFTS: "0",
      DNA: "0",
      CBC: "0",
      LBTC: "0",
      FFC: "0",
      FFT: "0",
      XDAG: "0"
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    wallet
      .balance()
      .then(value => {
        let balance_result = value;
        next(vm => {
          if (balance_result.code === 0) {
            if (balance_result.data.hasOwnProperty("list")) {
              let balances = balance_result.data.list;
              if (balance_result.data.hasOwnProperty("list")) {
                for (let i = 0; i < balances.length; i++) {
                  if (balances[i].currency == "BTC") {
                    vm.BTC = balances[i].available;
                  }
                  if (balances[i].currency == "ETH") {
                    vm.ETH = balances[i].available;
                  }
                  if (balances[i].currency == "LTC") {
                    vm.LTC = balances[i].available;
                  }
                  if (balances[i].currency == "OSC") {
                    vm.OSC = balances[i].available;
                  }
                  if (balances[i].currency == "DGC") {
                    vm.DGC = balances[i].available;
                  }
                  if (balances[i].currency == "EGD") {
                    vm.EGD = balances[i].available;
                  }
                  if (balances[i].currency == "FFTS") {
                    vm.FFTS = balances[i].available;
                  }
                  if (balances[i].currency == "DNA") {
                    vm.DNA = balances[i].available;
                  }
                  if (balances[i].currency == "CBC") {
                    vm.CBC = balances[i].available;
                  }
                  if (balances[i].currency == "LBTC") {
                    vm.LBTC = balances[i].available;
                  }
                  if (balances[i].currency == "FFC") {
                    vm.FFC = balances[i].available;
                  }
                  if (balances[i].currency == "XDAG") {
                    vm.XDAG = balances[i].available;
                  }
                  if (balances[i].currency == "FFT") {
                    vm.FFT = balances[i].available;
                  }
                }
              }
            }
          }
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    wallet(crypto) {
      //  this.$router.push('/wallet_detail')
      this.$store.commit(SET_CRYPTO_CURRENCY, crypto);
      this.$router.push({
        name: "wallet_detail",
        params: { crypto_currency: crypto.toLowerCase() }
      });
    },
    ffc() {
      this.$router.push("/wallet_detail_ffc");
    },
    fft() {
      this.$router.push("/wallet_detail_fft");
      this.$store.commit(SET_CRYPTO_CURRENCY, "FFT");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/wallet.scss";
</style>
