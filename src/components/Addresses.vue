<template>
  <div class="content address">
    <div class="top">
       <div class="center fs-16">{{$t('Text.sfkdz')}}</div>
      <div class="right fs-15"  @click="toggle">{{$t('Text.gl')}}</div>
     
      <div class="left" @click="goBack" />
    </div>
    <!-- <div class="tab-bills">
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Wallet_Detail.tradeBill')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Wallet_Detail.rechargeBill')}}</button>
      <button class="button" :class="{tab3:this.tab==='tab3'}" @click="tabChange('tab3')">{{$t('Wallet_Detail.withdrawBill')}}</button>
    </div> -->
      
    <div class="bill-trade-list address-list" >
       <img src="../assets/image/icon_nodata.png" style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;" v-show="isLeftShow">
          <div  style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"  v-show="isLeftShow">{{$t('Text.zwsj') }}</div>
      <div class="bill-trade-list-item" v-for="(item,index ) in this.trade_list" :key="item.created" >
       <div class="bill-trade-list-item-content" :class="[index===0 ? 'first':'']" >
         <p class="p0"><span class="span-left fs-15">{{item.currency.toUpperCase()}}&nbsp;{{$t('Text.address')}}{{item.remark ? `-${item.remark}`:'' }}</span></p>
          <p class="p1"><span  v-clipboard:copy="item.address"
              v-clipboard:success="success"
              v-clipboard:error="error"  class="span-left fs-14">{{item.address1 }}</span></p>
          <!-- <p class="p2"><span class="span-left span-time fs-12"> {{item.remark}}</span></p> -->
       </div>
      </div>
   </div>
    <div class="add-btn">
       <mu-raised-button :label="$t('Text.tjdz')" @click="add_address" class="btn fs-18" fullWidth primary/>
    </div>
    
    <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>

      <mu-toast v-if="toast" :message="message" @close="hideToast"/>
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
import Clipboard from "clipboard";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
// import VueQrcode from '@xkeshi/vue-qrcode'
// Vue.component('qrcode',VueQrcode)
export default {
  name: "Addresses",
  components: {},
  data() {
    return {
      open: false,
      trade_t: null,
      toast: false,
      message: "",
      crypto_currency: this.$store.state.user.crypto_currency,
      trade_list: [],
      deposits_list: [],
      weithdraw_list: [],
      tab: "tab1",
      total: 0,
      scroller: null,
      loading: false,
      isLeftShow:false,
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
    var params = {
          "offset":0,
          "limit":20
        }
    user
      .USER_otc_my_receiver_address(params)
      .then(result => {
        nprogress.done();
        let trade_list = [];
        let isLeftShow = false;
        if (result.code === 0) {
          if (result.data.total > 0) {
             result.data.addresses.forEach(element => {
                if(element.address.length>20){
                   element.address1 = element.address.substring(0, 10)+"******"+ element.address.substring(element.address.length-10 , element.address.length);
                }
              });
            trade_list = result.data.addresses;
            offset = offset + result.data.addresses.length;
            total = result.data.total;
          }
        }
        if(trade_list.length==0){
          isLeftShow = true;
        }else{
          isLeftShow = false
        }
        next(vm => {
          vm.trade_list = trade_list;
          vm.offset = offset;
          vm.total = total;
          vm.isLeftShow = isLeftShow
        });
      })
      .catch(e => {
        nprogress.done();
         
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
      // this.open = !this.open;
         this.$router.push('/AddressesEd')
    },
    add_address(){
       this.$router.push('/Add_address')
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
      this.offset = 0;
      this.total = 1;
      this.loading = false;
      this.tab = tab;
      this.initData();
      this.isLeftShow = false
      this.loadMore();
    },
      hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    },
    loadMore() {
      // if ("/bills" != this.$route.path) {
      //   // console.log('this.$route.path = '+this.$route.path)
      //   return;
      // }
      // if (this.loading) {
      //   return;
      // }
      // if (this.total <= this.offset) {
      //   this.loading = false;
      //   return;
      // }
      // this.loading = true;
      // if (this.tab == "tab1") {
      //   wallet
      //     .bill(this.crypto_currency, this.offset, this.limit)
      //     .then(result => {
      //       this.loading = false;
      //       if (this.offset == 0) this.trade_list = [];
      //       if (this.tab != "tab1") return;
      //       if (result.code === 0) {
      //         if (result.data.total > 0) {
      //           this.trade_list = this.trade_list.concat(
      //             result.data.wallet_details
      //           );
      //           this.offset = this.offset + result.data.wallet_details.length;
      //           this.total = result.data.total;
      //         }
      //       }
      //     })
      //     .catch(function() {
      //       this.loading = false;
      //     });
      // }
      // if (this.tab == "tab2") {
      //   wallet
      //     .myDeposit(this.crypto_currency, this.offset, this.limit)
      //     .then(result => {
      //       this.loading = false;
      //       if (this.offset == 0) this.deposits_list = [];
      //       if (this.tab != "tab2") return;
      //       if (result.code === 0) {
      //         if (result.data.total > 0) {
      //           this.deposits_list = this.deposits_list.concat(
      //             result.data.deposits
      //           );
      //           this.offset = this.offset + result.data.deposits.length;
      //           this.total = result.data.total;
      //         }
      //       }
      //     })
      //     .catch(function() {
      //       this.loading = false;
      //     });
      // }

      // if (this.tab == "tab3") {
      //   wallet
      //     .myWithdrawal(this.crypto_currency, this.offset, this.limit)
      //     .then(result => {
      //       this.loading = false;
      //       if (this.offset == 0) this.weithdraw_list = [];
      //       if (this.tab != "tab3") return;
      //       if (result.code === 0) {
      //         if (result.data.total > 0) {
      //           this.weithdraw_list = this.weithdraw_list.concat(
      //             result.data.withdrawals
      //           );
      //           this.offset = this.offset + result.data.withdrawals.length;
      //           this.total = result.data.total;
      //         }
      //       }
      //     })
      //     .catch(function() {
      //       this.loading = false;
      //     });
      // }
    },
       
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/address.scss";
// #app{
//   background:rgba(243,245,247,1);
// }
</style>
