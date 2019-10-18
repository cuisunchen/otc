<template>
  <div class="content">
    <div class="top">
      <!-- <div class="right"  @click="toggle">{{crypto_currency}}&nbsp;&nbsp;{{$t('Basic.'+crypto_currency)}}</div> -->
      <!-- <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="crypto_currency" icon="more_vert" >
        <mu-menu-item value="FFT" :title="$t('Menu.FFT')" />
        <mu-menu-item value="BTC" :title="$t('Menu.BTC')" />
        <mu-menu-item value="ETH" :title="$t('Menu.ETH')" />
        <mu-menu-item value="FFC" :title="$t('Menu.FFC')" />
        <mu-menu-item value="LTC" :title="$t('Menu.LTC')" />
        <mu-menu-item value="OSC" :title="$t('Menu.OSC')" />
        <mu-menu-item value="FFTS" :title="$t('Menu.FFTS')" />
        <mu-menu-item value="DNA" :title="$t('Menu.DNA')" />
        <mu-menu-item value="DGC" :title="$t('Menu.DGC')" />
        <mu-menu-item value="EGD" :title="$t('Menu.EGD')" />
        <mu-menu-item value="CBC" :title="$t('Menu.CBC')" />
        <mu-menu-item value="LBTC" :title="$t('Menu.LBTC')" />
        <mu-menu-item value="XDAG" :title="$t('Menu.XDAG')" />
      </mu-icon-menu>
      <div class="img-arrow"></div> -->

      <div class="center"> {{$t('Text.mygd') }}</div> 
      <div class="left" @click="goBack" />
    </div>
  

      
    <div v-if="tab === 'tab1'" class="bill-trade-list" >
      <div class="bill-trade-list-item" v-for="(item ) in this.trade_list" :key="item.created" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left">{{item.title}}</span></p>
          <p class="p2">{{item.content}}</p>
       </div>
      </div>
   </div>
 

    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
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
import { formatDate } from "../common/js/data";
import order from "../models/order";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
// import VueQrcode from '@xkeshi/vue-qrcode'
// Vue.component('qrcode',VueQrcode)
export default {
  name: "MyGd",
  components: {},
  data() {
    return {
      open: false,
      crypto_currency: "USDT", // this.$store.state.user.crypto_currency,
      trade_list: [],
      deposits_list: [],
      weithdraw_list: [],
      tab: "tab1",
      total: 0,
      scroller: null,
      loading: false,
      offset: 0,
      limit: 20
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    // let crypto_currency = store.state.user.crypto_currency;
    let offset = 0;
    let limit = 20;
    let total = 1;
    let params = {
      "offset":offset,
	"limit":limit
    }
    order.USER_my_feedback(params)
      .then(result => {
        nprogress.done();
        let trade_list = [];
        if (result.code === 0) {
          if (result.data.total > 0) {
            trade_list = result.data.feebacks;
            offset = offset + result.data.feebacks.length;
            total = result.data.total;
          }
        }
        next(vm => {
          vm.trade_list = trade_list;
          vm.offset = offset;
          vm.total = total;
        });
      })
      .catch(e => {
        nprogress.done();
        // HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  mounted() {
    this.scroller = this.$el;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleChange(val) {
      this.crypto_currency = val;
      this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.initData();
      this.tabChange(this.tab);
    },
    handleClose() {
      this.open = false;
    },
    initData() {
      this.trade_list = [];
      this.deposits_list = [];
      this.weithdraw_list = [];
    },
    tabChange(tab) {
      if (tab != "tab1" && this.crypto_currency == "FFT") return;
      this.offset = 0;
      this.total = 1;
      this.loading = false;
      this.tab = tab;
      this.initData();
      this.loadMore();
    },
    loadMore() {
      if ("/MyGd" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.total <= this.offset) {
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.tab == "tab1") {
           let params = {
      "offset":this.offset,
	"limit": this.limit
    }
        order.USER_my_feedback(params)
          .then(result => {
            this.loading = false;
            if (this.offset == 0) this.trade_list = [];
            if (this.tab != "tab1") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                this.trade_list = this.trade_list.concat(
                  result.data.feebacks
                );
                this.offset = this.offset + result.data.feebacks.length;
                this.total = result.data.total;
              }
            }
          })
          .catch(function() {
            this.loading = false;
          });
      }
      if (this.tab == "tab2") {
        let params = {
          "currency":"usdt",
            "offset":this.offset,
            "limit":this.limit
        }
        wallet
          .USER_otc_my_deposit(params)
          .then(result => {
            this.loading = false;
            if (this.offset == 0) this.deposits_list = [];
            if (this.tab != "tab2") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                this.deposits_list = this.deposits_list.concat(
                  result.data.list
                );
                this.offset = this.offset + result.data.list.length;
                this.total = result.data.total;
              }
            }
          })
          .catch(function() {
            this.loading = false;
          });
      }

      if (this.tab == "tab3") {
        let params = {
          "currency":"usdt",
            "offset":this.offset,
            "limit":this.limit
        }
        wallet
          .USER_wallet_my_withdrawal(params)
          .then(result => {
            this.loading = false;
            if (this.offset == 0) this.weithdraw_list = [];
            if (this.tab != "tab3") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                this.weithdraw_list = this.weithdraw_list.concat(
                  result.data.list
                );
                this.offset = this.offset + result.data.list.length;
                this.total = result.data.total;
              }
            }
          })
          .catch(function() {
            this.loading = false;
          });
      }
    }
  }
};
</script>
    // USER_otc_my_deposit(){
    //   if( parseFloat(this.czqty)<0){
    //       this.showToast(this.$t("Text.CZEDHintError"));
    //     return
    //   }
    //   let params = { 
    //     "currency":"usdt",
    //     "usdt_type":this.isOMNI == '1'?"OMNI":"ERC20", 
    //     "qty":this.czqty    
    //     }
    //    wallet
    //     .USER_otc_my_deposit(params)
    //     .then(result => {
    //        if(result.code==0){
    //          this.USER_otc_my_depositing();
    //        }
    //     })
    //     .catch(e => {
      
    //     });
    // },
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/bills.scss";
</style>
