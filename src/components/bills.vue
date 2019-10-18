<template>
  <div class="content my-bills-content no-data-bg">
    <div class="top">
      <!-- <div class="right"  @click="toggle">{{crypto_currency}}&nbsp;&nbsp;{{$t('Basic.'+crypto_currency)}}</div> -->
      <!-- 
        <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="crypto_currency" icon="more_vert" >
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

      <div class="center">USDT {{$t('Text.zdmx') }}</div> 
      <div class="left" @click="goBack" />
    </div>
  
    <!-- <div class="tab-bills">
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Text.Bill')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Wallet_Detail.rechargeBill')}}</button>
      <button class="button" :class="{tab3:this.tab==='tab3'}" @click="tabChange('tab3')">{{$t('Wallet_Detail.withdrawBill')}}</button>
    </div>  -->
    <mu-tabs :value="active2" class="m-mu-tabs" color="green" indicator-color="yellow" @change="oderTab2Change">
        <mu-tab value="tab1" class="m-mu-tab-link fs-12">{{$t('Text.Bill')}}</mu-tab>
        <mu-tab value="tab2" class="m-mu-tab-link fs-12">{{$t('Wallet_Detail.rechargeBill')}}</mu-tab>
        <mu-tab value="tab3" class="m-mu-tab-link fs-12" >{{$t('Wallet_Detail.withdrawBill')}}</mu-tab>
        <mu-tab value="tab4" class="m-mu-tab-link fs-12" >{{$t('sblock.hzjl')}}</mu-tab>
    </mu-tabs>
         <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
    <div v-if="tab === 'tab1'" class="bill-trade-list" >
       <img src="../assets/image/icon_nodata.png" style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;" v-show="isLeftShow">
          <div  style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"  v-show="isLeftShow">{{$t('Text.zwsj') }}</div>
      <div class="bill-trade-list-item" v-for="(item ) in this.trade_list" :key="item.created" >
       <div class="bill-trade-list-item-content">
          <p class="p1"><span class="span-left" style="color:#3180D0" v-show="item.qty<0">{{item.type}}</span> <span class="span-left" style="color:rgba(0, 94, 228, 1)" v-show="item.qty>0">{{item.type}}</span><span class="span-right" style="color:rgba(0, 94, 228, 1)" v-show="item.qty>0"> {{(item.qty+item.fee).toFixed(2)}}&nbsp;{{item.currency.toUpperCase()}}</span><span class="span-right" style="color:#3180D0" v-show="item.qty<0"> {{( parseFloat(item.qty) + parseFloat(item.fee)).toFixed(2) }}&nbsp;{{item.currency.toUpperCase()}}</span></p>
          <p class="p2"><span class="span-left" style="color:#A9B2C3">{{$t('Wallet_Detail.balance')}} {{item.balance.toFixed(2)}}&nbsp;{{item.currency.toUpperCase()}}</span> <span class="span-right span-time">{{item.created | getformatDate}}</span></p>
       </div>
      </div>
   </div>
  <div v-if="tab === 'tab2'" class="bill-deposits_list" >
     <img src="../assets/image/icon_nodata.png" style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;" v-show="isMiddleShow">
          <div  style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"  v-show="isMiddleShow">{{$t('Text.zwsj') }}</div>
      <div class="bill-deposits_list-item" v-for="(item) in this.deposits_list" :key="item.created" >
       <div class="bill-deposits_list-item-content">
          <p class="p1"><span class="span-left">{{item.qty}}&nbsp;{{item.currency.toUpperCase()}}</span> <span class="span-right">{{item.updated | getformatDate}}</span></p>
          <p class="p2"><span class="span-left">{{$t('Wallet.'+item.status)}}</span> <span class="span-right span-time">{{item.address}}</span></p>
       </div>
      </div>
   </div>
  <div v-if="tab === 'tab3'" class="bill-deposits_list" >
      <img src="../assets/image/icon_nodata.png" style="margin: 10em auto 0.5em auto;
                height:3em;
                width: 4.05em;" v-show="isRightShow">
          <div  style="margin: 0px auto 0.5em auto;
                font-size:1em;
                color:#A9B2C3"  v-show="isRightShow">{{$t('Text.zwsj') }}</div>
      <div class="bill-deposits_list-item" v-for="(item) in this.weithdraw_list" :key="item.updated" >
       <div class="bill-deposits_list-item-content">
          <p class="p1"><span class="span-left">{{item.qty}}&nbsp;{{item.currency.toUpperCase()}}</span> <span class="span-right">{{item.updated | getformatDate}}</span></p>
          <p class="p2"><span class="span-left">{{$t('Wallet.'+item.status)}}</span> <span class="span-right span-time">{{item.address}}</span></p>
       </div>
      </div>
  </div> 
	<div v-if="tab === 'tab4'" class="bill-deposits_list" >
		  <img src="../assets/image/icon_nodata.png" style="margin: 10em auto 0.5em auto;height:3em;width: 4.05em;" v-show="isRightShow">
		  <div  style="margin: 0px auto 0.5em auto;font-size:1em;color:#A9B2C3"  v-show="isRightShow">{{$t('Text.zwsj') }}</div>
		  <div class="bill-deposits_list-item" v-for="(item) in this.weithdraw_list" :key="item.updated" >
		   <div class="bill-deposits_list-item-content">
		      <p class="p1"><span class="span-left">{{item.qty}}&nbsp;{{item.currency.toUpperCase()}}</span> <span class="span-right">{{item.updated | getformatDate}}</span></p>
		      <p class="p2"><span class="span-left">{{$t('Wallet.'+item.status)}}</span> <span class="span-right span-time">{{item.address}}</span></p>
		   </div>
		  </div>
  </div> 
  <div style="  width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.1);
        top: 0px;z-index:999;" v-show="isProgressDialog"  @click="closeDialog" >
       <img  @click="closeDialog"  src="../assets/image/icon_progress.png"  class="progress" />   
   </div>
    <mu-infinite-scroll :scroller="scroller" :loading="loading1" @load="loadMore"/>
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
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
// import VueQrcode from '@xkeshi/vue-qrcode'
// Vue.component('qrcode',VueQrcode)
export default {
  name: "bills",
  components: {},
  data() {
    return {
      active2: 'tab1',
      open: false,
      crypto_currency: "USDT", // this.$store.state.user.crypto_currency,
      trade_list: [],
      deposits_list: [],
      weithdraw_list: [],
      transferLIst:[],
      tab: "tab1",
      total: 0,
      scroller: null,
      loading: false,
        refreshing: false,
        loading1:false,
        isLeftShow:false,
        isMiddleShow:false,
        isRightShow:false,
        isProgressDialog:false,
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
    let isLeftShow = false
    wallet
      .bill("USDT", offset, limit)
      .then(result => {
        nprogress.done();
        let trade_list = [];
        if (result.code === 0) {
          if (result.data.total > 0) {
            trade_list = result.data.bills;
            offset = offset + result.data.bills.length;
            total = result.data.total;
          }
        }
        if(trade_list.length==0)
         isLeftShow = true
        next(vm => {
          vm.trade_list = trade_list;
          vm.offset = offset;
          vm.total = total;
          vm.isLeftShow = isLeftShow
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
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
    this.trigger = this.$el;
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
      this.transferLIst = [];
    },
     refresh() {
      if (this.refreshing) return;
      this.refreshing = true;
       this.offset = 0;
      this.total = 1;
      this.loading = false;
//    this.tab = tab;
      this.isLeftShow = false
      this.isMiddleShow = false
      this.isRightShow = false
      this.initData();
      this.loadMore();
    },
    tabChange(tab) {
      this.offset = 0;
      this.total = 1;
      this.loading = false;
      this.tab = tab;
      this.initData();
      this.loadMore();
    },
    closeDialog(){
      this.isProgressDialog = false
    },
    oderTab2Change(name) {
      this.active2 = name;
      this.tabChange(name);
    },
    loadMore() {
      if ("/bills" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        this.refreshing = false
        return;
      }
      if (this.loading) {
          this.refreshing = false
        return;
      }
      if (this.total <= this.offset) {
          this.refreshing = false
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.tab == "tab1") {
        this.isProgressDialog = true
        wallet
          .bill(this.crypto_currency, this.offset, this.limit)
          .then(result => {
            this.isProgressDialog = false
              this.refreshing = false
            this.loading = false;
            if (this.offset == 0) this.trade_list = [];
            if (this.tab != "tab1") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                // this.trade_list = this.trade_list.concat(
                //   result.data.bills
                // );

              if(this.trade_list.length>0 && result.data.bills.length >0){
                var t = this.trade_list[0];
                var tt = result.data.bills[0];
                if(t.id != tt.id){
                  this.trade_list = this.trade_list.concat(result.data.bills);
                }
              }else{
                   this.trade_list = this.trade_list.concat(result.data.bills);
                }
                this.offset = this.offset + result.data.bills.length;
                this.total = result.data.total;
              }
              if(this.trade_list.length==0){
                this.isLeftShow = true
              }else{
                this.isLeftShow = false
              }
            }
          })
          .catch(function() {
            this.isProgressDialog = false
            this.loading = false;
              this.refreshing = false
          });
      }
      if (this.tab == "tab2") {
        let params = {
          "currency":"usdt",
            "offset":this.offset,
            "limit":this.limit
        }
        this.isProgressDialog = true
        wallet
          .USER_otc_my_deposit(params)
          .then(result => {
            this.isProgressDialog = false
            this.loading = false;
              this.refreshing = false
            if (this.offset == 0) this.deposits_list = [];
            if (this.tab != "tab2") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                // this.deposits_list = this.deposits_list.concat(
                //   result.data.list
                // );

            if(this.deposits_list.length>0 && result.data.list.length >0){
                var t = this.deposits_list[0];
                var tt = result.data.list[0];
                if(t.id != tt.id){
                  this.deposits_list = this.deposits_list.concat(result.data.list);
                }
              }else{
                   this.deposits_list = this.deposits_list.concat(result.data.list);
                }





                this.offset = this.offset + result.data.list.length;
                this.total = result.data.total;
              }
              if(this.deposits_list.length==0){
                this.isMiddleShow = true
              }else{
                this.isMiddleShow = false
              }
            }
          })
          .catch(function() {
            this.isProgressDialog = false
            this.loading = false;
              this.refreshing = false
          });
      }

      if (this.tab == "tab3") {
        let params = {
          "currency":"usdt",
            "offset":this.offset,
            "limit":this.limit
        }
        this.isProgressDialog = true
        wallet
          .USER_wallet_my_withdrawal(params)
          .then(result => {
            this.isProgressDialog = false
            this.loading = false;
              this.refreshing = false
            if (this.offset == 0) this.weithdraw_list = [];
            if (this.tab != "tab3") return;
            if (result.code === 0) {
              if (result.data.total > 0) {
                // this.weithdraw_list = this.weithdraw_list.concat(
                //   result.data.list
                // );

                if(this.weithdraw_list.length>0 && result.data.list.length >0){
                var t = this.weithdraw_list[0];
                var tt = result.data.list[0];
                if(t.id != tt.id){
                  this.weithdraw_list = this.weithdraw_list.concat(result.data.list);
                }
              }else{
                   this.weithdraw_list = this.weithdraw_list.concat(result.data.list);
                }


                this.offset = this.offset + result.data.list.length;
                this.total = result.data.total;
              }
              if(this.weithdraw_list.length==0){
                this.isRightShow = true
              }else{
                this.isRightShow = false
              }
            }
          })
          .catch(function() {
            this.isProgressDialog = false
            this.loading = false;
              this.refreshing = false
          });
      }
    }
  }
};
</script>
<style  lang="scss"  scoped>
@import "../assets/css/bills_usdt.scss";
</style>
<style lang="scss">
.my-bills-content {
  .mu-tab-active {
    color: rgba(0, 94, 228, 0.7) !important;
  }
  .mu-tab-link-highlight {
    background-color: rgba(0, 94, 228, 0.7);
    max-width: toRem(60) !important;
  }
  .mu-tab-link {
    max-width: toRem(60) !important;
    color: #bdbdbd
  }
  .mu-tabs{
    justify-content: flex-start;
    background-color:rgba(243,245,247,1) !important; 
  }
  .m-mu-tabs{
  margin-top: toRem(58);
  background-color: white;
  color: rgba(0, 94, 228, 1);
  border-bottom: 1px solid rgba(243, 245, 247, 1)
}
}
.no-data-bg{
  height: 100%;
  background: #fff !important;
}
</style>
