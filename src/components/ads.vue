<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center" >{{$t('Publish.myAds')}}</div>
      <div class="left" @click="goBack" />
    </div>
    <!--中间start-->
  <div class="tab">
    <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Publish.AdBuy')}}</button>
    <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Publish.AdSell')}}</button>
  </div>
   <div v-if="tab === 'tab1'" >
     <div class="my-ad-item-list" v-for="(item) in this.buys" :key="item.id">
      <div class="my-ad-item-list-content-zone"  >
          <p class="p-title">
            <span class="span-left">{{item.crypto_currency}}</span><span class="pay-span" v-show="item.alipay_on">{{$t('Trade.alipay')}}</span> <span  class="pay-span wx" v-show="item.wechat_pay_on">{{$t('Trade.wechat')}}</span><span  class="pay-span bank" v-show="item.bankcard_on">{{$t('Trade.bank')}}</span>
            <span class="span-right hint-gray" v-show="item.status=='CANCELLED'">{{$t('Publish.CANCELLED')}}</span>
            <span class="span-right" v-show="item.status=='PUBLISHING'">{{$t('Publish.PUBLISHING')}}</span>
            <span class="span-right hint-red" v-show="item.status=='FORBIDDEN'">{{$t('Publish.FORBIDDEN')}}</span>
          </p>
          <div class="ads-datail">
          <!-- <p class="p-price"><span class="span-color-80">{{$t('Publish.ad')}}&nbsp;&nbsp;&nbsp;ID：</span><span class="span-color-40">{{item.id}}</span></p> -->
          <p class="p-price"><span class="span-color-80" v-html="$t('Publish.price')"></span><span class="span-color-40 span-buy">{{item.price}} {{item.trade_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Trade.Publish.BuyLimit')}}：</span><span class="span-color-40">{{item.limit_qty}} {{item.crypto_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Publish.tradeLimit')}}</span><span class="span-color-40">{{item.min_qty}} - {{item.max_qty}} {{item.crypto_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Publish.createTime')}}</span><span class="span-color-40">{{item.created | getFormatDate}}</span></p>
          </div>
         <div class="div-operation"> 
            <button class="left-button red-button" @click="deletleShowDialog(item)">{{$t('Publish.delete')}}</button> 
            <router-link :to="{name: 'ad_edit',  params: {crypto_currency:item.crypto_currency.toLowerCase(),id:item.id} }">
              <button class="center-button">{{$t('Trade.edit')}}</button>
            </router-link>
            <button class="right-button" v-show="item.status=='CANCELLED'"  @click="publishShowDialog(item)">{{$t('Publish.up')}}</button>
            <button class="right-button" v-show="item.status=='PUBLISHING'"  @click="unpublishShowDialog(item)">{{$t('Publish.down')}}</button>
         </div>
      </div>
     </div>
   </div>
   <div v-if="tab === 'tab2'" >
      <div class="my-ad-item-list" v-for="(item) in this.sells" :key="item.id">
      <div class="my-ad-item-list-content-zone"  >
          <p class="p-title">
            <span class="span-left">{{item.crypto_currency}}</span><span class="pay-span" v-show="item.alipay_on">{{$t('Trade.alipay')}}</span> <span  class="pay-span wx" v-show="item.wechat_pay_on">{{$t('Trade.wechat')}}</span><span  class="pay-span bank" v-show="item.bankcard_on">{{$t('Trade.bank')}}</span>
            <span class="span-right hint-gray" v-show="item.status=='CANCELLED'">{{$t('Publish.CANCELLED')}}</span>
            <span class="span-right" v-show="item.status=='PUBLISHING'">{{$t('Publish.PUBLISHING')}}</span>
            <span class="span-right hint-red" v-show="item.status=='FORBIDDEN'">{{$t('Publish.FORBIDDEN')}}</span>
          </p>
          <div class="ads-datail">
          <!-- <p class="p-price"><span class="span-color-80">{{$t('Publish.ad')}}&nbsp;&nbsp;&nbsp;ID：</span><span class="span-color-40">{{item.id}}</span></p> -->
          <p class="p-price"><span class="span-color-80" v-html="$t('Publish.price')"></span><span class="span-color-40 span-sell">{{item.price}} {{item.trade_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Trade.Publish.SellLimit')}}</span><span class="span-color-40">{{item.limit_qty}} {{item.crypto_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Publish.tradeLimit')}}</span><span class="span-color-40">{{item.min_qty}} - {{item.max_qty}} {{item.crypto_currency}}</span></p>
          <p class="p-price"><span class="span-color-80">{{$t('Publish.createTime')}}</span><span class="span-color-40">{{item.created | getFormatDate}}</span></p>
          </div>
         <div class="div-operation"> 
            <button class="left-button red-button" @click="deletleShowDialog(item)">{{$t('Publish.delete')}}</button>
            <router-link :to="{name: 'ad_edit',  params: {crypto_currency:item.crypto_currency.toLowerCase(),id:item.id} }">
              <button class="center-button">{{$t('Trade.edit')}}</button>
            </router-link>
            <button class="right-button" v-show="item.status=='CANCELLED'"  @click="publishShowDialog(item)">{{$t('Publish.up')}}</button>
            <button class="right-button" v-show="item.status=='PUBLISHING'"  @click="unpublishShowDialog(item)">{{$t('Publish.down')}}</button>
         </div>
      </div>
     </div>
   </div>
  <mu-dialog :open="isDeleteDialog" :title="$t('Publish.deleteTip')" >
        {{$t('Publish.sure')}} {{$t('Publish.delete')}} {{item.crypto_currency}} {{$t('Publish.ad')}}。 
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="deletle" :label="$t('Publish.delete')"/>
  </mu-dialog>
  <mu-dialog :open="isPublishDialog" :title="$t('Publish.upTip')" >
     {{$t('Publish.sure')}} {{$t('Publish.up')}} {{item.crypto_currency}} {{$t('Publish.ad')}}。
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="publish" :label="$t('Publish.up')"/>
  </mu-dialog>
  <mu-dialog :open="isUnPublishDialog" :title="$t('Publish.downTip')" >
      {{$t('Publish.sure')}} {{$t('Publish.down')}} {{item.crypto_currency}} {{$t('Publish.ad')}}。
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="unpublish" :label="$t('Publish.down')"/>
  </mu-dialog>

  </div>
</template>

<script>
import market from "../models/market";
import store from "../store";
import storage from "../models/storage";
import nprogress from "nprogress";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "ads",
  components: {},
  data() {
    return {
      selected: "",
      toast: false,
      message: "",
      tab: "tab1",
      title: "",
      crypto_currency: this.$store.state.user.crypto_currency,
      trade_currency: "CNY",
      is_buy: true,
      buys: [],
      sells: [],
      open: false,
      item: {},
      isDeleteDialog: false,
      isPublishDialog: false,
      isUnPublishDialog: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化

    let crypto_currency = "OSC";

    if (typeof to.params.currency != "undefined") {
      crypto_currency = to.params.currency.toUpperCase();
    }
    if (
      crypto_currency == "BTC" ||
      crypto_currency == "LTC" ||
      crypto_currency == "LBTC" ||
      crypto_currency == "FFT"
    ) {
      crypto_currency = "OSC";
    }

    market
      .mine(true, crypto_currency)
      .then(result => {
        let buys = [];

        if (result.code === 0) {
          buys = result.data.ads;
        }

        next(vm => {
          vm.buys = buys;
          vm.crypto_currency = crypto_currency;

          vm.total = result.data.total;
          if (vm.total > 0) vm.offset = buys.length;
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getFormatDate(time) {
      if (undefined == time) return "";
      // return time;
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  created: function() {
    this.crypto_currency = this.$store.state.user.crypto_currency;
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    closeDialog() {
      this.isDeleteDialog = false;
      this.isPublishDialog = false;
      this.isUnPublishDialog = false;
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    number_format(num) {
      return lib.toFixed(num, 3);
    },
    tabChange(tab) {
      if (tab === "tab1") {
        this.is_buy = true;
      } else if (tab === "tab2") {
        this.is_buy = false;
      }
      this.loadData();
      this.tab = tab;
    },
    loadData() {
      market
        .mine(this.is_buy, this.crypto_currency)
        .then(values => {
          if (values.code === 0) {
            this.dealData(values);
          } else {
            this.sells = [];
            this.buys = [];
          }
        })
        .catch(e => {
          this.sells = [];
          this.buys = [];
          HttpResultCode.validate(e.code);
        });
    },
    dealData(data) {
      //数据处理函数
      this.sells = [];
      this.buys = [];
      if (data.data.hasOwnProperty("ads")) {
        if (this.is_buy) {
          this.buys = this.buys.concat(data.data.ads);
        } else {
          this.sells = this.sells.concat(data.data.ads);
        }
      }
    },
    handleChange(val) {
      this.crypto_currency = val;
      if (this.crypto_currency == "BTC") {
        this.title = this.$t("Menu.BTC");
      } else if (this.crypto_currency == "ETH") {
        this.title = this.$t("Menu.ETH");
      } else if (this.crypto_currency == "LTC") {
        this.title = this.$t("Menu.LTC");
      } else if (this.crypto_currency == "OSC") {
        this.title = this.$t("Menu.OSC");
      } else if (this.crypto_currency == "DGC") {
        this.title = this.$t("Menu.DGC");
      } else if (this.crypto_currency == "LBTC") {
        this.title = this.$t("Menu.LBTC");
      } else if (this.crypto_currency == "XDAG") {
        this.title = this.$t("Menu.XDAG");
      } else if (this.crypto_currency == "CBC") {
        this.title = this.$t("Menu.CBC");
      }
      this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.offset = 0;
      this.loading = false;
      this.loadData();
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
    },
    deletleShowDialog(item) {
      this.item = item;
      this.isDeleteDialog = true;
    },
    publishShowDialog(item) {
      this.item = item;
      this.isPublishDialog = true;
    },
    unpublishShowDialog(item) {
      this.item = item;
      this.isUnPublishDialog = true;
    },
    deletle() {
      this.isDeleteDialog = false;
      market
        .del(this.item.id, this.item.crypto_currency)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            // Vue.delete(this.list, index)
            // setTimeout(this.loadData(),2000);
            setTimeout(() => {
              this.loadData();
            }, 2000);
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    publish() {
      this.isPublishDialog = false;
      market
        .republish(this.item.id, this.item.crypto_currency)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            setTimeout(() => {
              this.loadData();
            }, 2000);
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    unpublish() {
      this.isUnPublishDialog = false;
      market
        .unpublish(this.item.id, this.item.crypto_currency)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            setTimeout(() => {
              this.loadData();
            }, 2000);
          }
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/ads.scss";
</style>
