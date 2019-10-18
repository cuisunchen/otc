<template>
  <div class="content">
    <div class="top">
      <div class="center" >{{$t('Tab.Tab2')}}</div>
      <div  class="right"  @click="toggle">帮助</div>
    </div>
    <!--中间start-->
  <div class="tab">
    <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Order.Trading')}}</button>
    <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Order.Traded')}}</button>
  </div>
  <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
   <div v-if="tab === 'tab1'" style="padding-top: 5.2em;">
    <div class="my-ad-item-list" v-for="(item) in this.tradings" :key="item.exercise_date">
          <div class="my-ad-item-list-content-zone"  >
            <p class="p-title">
              <span class="span-left" style="color:#ff4d2d" v-show="!item.is_call">看跌</span>
              <span class="span-left" style="color:#1AAC19" v-show="item.is_call">看涨</span>
               <span v-show="item.status === 'EXECUTED' && item.is_maker" style="color:#ff4d2d;float:right" >{{$t('options.options_go1') }}</span>
               <span v-show="item.status === 'EXECUTED' && !item.is_maker && !options_time(item)" style="color:#ff4d2d;float:right" >{{$t('options.options_go') }}</span>
               <button v-show="item.status === 'EXECUTED' && !item.is_maker && options_time(item)" style="background-color:#ff4d2d" @click="show_options(item)" >{{$t('options.options') }}</button>
               <button v-show="item.status === 'PUBLISHING' && item.is_maker" style="background-color:#965b54" @click="show_cancel_option(item)" >{{$t('Wallet.CANCELLED') }}</button>
            </p>
            <div class="ads-datail">
              <p class="p-price"><span class="span-color-80">行权价格</span><span class="span-color-40 span-sell">{{item.price}} FFC</span></p>
              <p class="p-price"><span class="span-color-80">行权数量</span><span class="span-color-40">{{item.qty}} {{item.crypto_currency}}</span></p>
              <p class="p-price"><span class="span-color-80">金额</span><span class="span-color-40">{{item.amount}} FFC</span></p>
              <p class="p-price"><span class="span-color-80">行权日期</span><span class="span-color-40">{{item.exercise_date | getformatDate}}</span></p>
            </div>
        </div>
        </div>
   </div>
   <div v-if="tab === 'tab2'" style="padding-top: 5.2em;">
    <div class="my-ad-item-list" v-for="(item) in this.tradeds" :key="item.id">
          <div class="my-ad-item-list-content-zone"  >
            <p class="p-title">
              <span class="span-left" style="color:#ff4d2d" v-show="!item.is_call">看跌</span>
              <span class="span-left" style="color:#1AAC19" v-show="item.is_call">看涨</span>
              <span  style="color:#404040;float:right" >{{$t('options.status.'+ item.status)}}</span>
            </p>
            <div class="ads-datail">
              <p class="p-price"><span class="span-color-80">行权价格</span><span class="span-color-40 span-sell">{{item.price}} FFC</span></p>
              <p class="p-price"><span class="span-color-80">行权数量</span><span class="span-color-40">{{item.qty}} {{item.crypto_currency}}</span></p>
              <p class="p-price"><span class="span-color-80">金额</span><span class="span-color-40">{{item.amount}} FFC</span></p>
              <p class="p-price"><span class="span-color-80">行权日期</span><span class="span-color-40">{{item.exercise_date | getformatDate}}</span></p>
            </div>
        </div>
        </div>
   </div>

   <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>


      <mu-dialog :open="isOptionDialog"  :title="$t('options.tip')">   
        <div style="font-size:14px;line-height:1.7" v-show="item.is_call">{{$t('options.tip_options1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#24b36b">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.OPTION_AMOUNT")}}：<span style="font-size:16px;color:#24b36b">{{item.amount}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#24b36b">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_options3")}}</div>
        <div style="font-size:14px;line-height:1.7" v-show="!item.is_call">{{$t('options.tip_options1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#f25c49">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.OPTION_AMOUNT")}}：<span style="font-size:16px;color:#f25c49">{{item.amount}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#f25c49">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_options4")}}</div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('options.cancel')"/>
             <mu-flat-button slot="actions" primary @click="options(item)" :label="$t('options.ok')"/>
      </mu-dialog>


      <mu-dialog :open="isCancelDialog"  :title="$t('options.tip')">  
        <div style="font-size:14px;line-height:1.7" v-show="item.is_call">{{$t('options.tip_cancel1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#24b36b">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#24b36b">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_buy3")}}</div>
        <div style="font-size:14px;line-height:1.7"  v-show="!item.is_call">{{$t('options.tip_cancel1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#f25c49">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#f25c49">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_buy4")}}</div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('options.cancel')"/>
             <mu-flat-button slot="actions" primary @click="cancel_option(item)" :label="$t('options.ok')"/>
      </mu-dialog>
    <!--中间end-->
    <OptionsBottomNav></OptionsBottomNav> 
  </div>
</template>

<script>
import nprogress from "nprogress";
import OptionsBottomNav from "../components/OptionsBottomNav";
import order from "../models/order";
import options from "../models/options";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "options_order",
  components: { OptionsBottomNav },
  data() {
    return {
      is_trading: true,
      tab: "tab1",
      offset_trading: 0,
      offset_traded: 0,
      limit: 20,
      tradings: [],
      tradeds: [],
      scroller: null,
      loading: false,
      total_trading: 1,
      total_traded: 1,
      refreshing: false,
      isOptionDialog: false,
      isCancelDialog: false,
      item: { price: "", fee: "", crypto_currency: "", qty: "", is_call: true },
      trigger: null
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);

    let is_trading = true;
    let limit = 20;
    let offset_trading = 0;
    let total_trading = 0;
    options
      .getOptionsMine(is_trading, 0, limit, "OSC")
      .then(values => {
        nprogress.done();
        let tradings = [];
        if (values.code === 0) {
          total_trading = values.data.total;
          if (total_trading > 0) {
            tradings = values.data.options_list;
            offset_trading = values.data.options_list.length;
          }
        }
        next(vm => {
          vm.limit = limit;
          if (values.hasOwnProperty("data")) {
            vm.total_trading = total_trading;
            if (values.data.trades != undefined)
              vm.offset_trading = offset_trading;
            vm.tradings = tradings;
          }
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      if (undefined == time) return "";
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd");
    },
    stringSplice(name) {
      if (undefined == name) return "";
      if (name.length > 10) {
        return name.substring(0, 10);
      } else {
        return name;
      }
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 2).toUpperCase();
    },
    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    }
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  created: function() {},
  methods: {
    toggle() {
      this.$router.push("/options_help");
    },
    refresh() {
      this.refreshing = true;
      this.tabChange(this.tab);
    },
    number_format(num) {
      return lib.toFixed(num, 3);
    },
    options_time(item) {
      let exercise_date = formatDate(
        new Date(parseInt(item.exercise_date)),
        "yyyy-MM-dd"
      );
      let date = formatDate(new Date(), "yyyy-MM-dd");
      if (exercise_date == date) return true;
      return false;
    },
    closeDialog() {
      this.isOptionDialog = false;
      this.isCancelDialog = false;
    },
    tabChange(tab) {
      this.tab = tab;
      this.tradeds = [];
      this.tradings = [];
      this.offset_trading = 0;
      this.offset_traded = 0;
      if (tab === "tab1") {
        this.is_trading = true;
      } else if (tab === "tab2") {
        this.is_trading = false;
      }
      this.loading = false;
      this.total_trading = 1;
      this.total_traded = 1;
      this.loadMore();
    },
    loadMore() {
      if ("/options_order" != this.$route.path) {
        return;
      }
      if (this.is_trading) {
        this.loadTradingMore();
      } else {
        this.loadTradedMore();
      }
    },
    loadTradingMore() {
      if (this.loading) {
        return;
      }
      if (this.total_trading <= this.offset_trading) {
        this.loading = false;
        return;
      }
      this.loading = true;
      options
        .getOptionsMine(this.is_trading, this.offset_trading, this.limit, "OSC")
        .then(values => {
          this.refreshing = false;
          this.loading = false;
          this.total_trading = values.data.total;
          if (this.total_trading > 0) {
            this.offset_trading =
              this.offset_trading + values.data.options_list.length;
            this.tradings = this.tradings.concat(values.data.options_list);
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    loadTradedMore() {
      if (this.loading) {
        return;
      }
      if (this.total_traded <= this.offset_traded) {
        this.loading = false;
        return;
      }
      this.loading = true;
      options
        .getOptionsMine(false, this.offset_traded, this.limit, "OSC")
        .then(values => {
          this.refreshing = false;
          this.loading = false;
          this.total_traded = values.data.total;
          if (this.total_traded > 0) {
            this.offset_traded =
              this.offset_traded + values.data.options_list.length;
            this.tradeds = this.tradeds.concat(values.data.options_list);
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    show_cancel_option(item) {
      this.item = item;
      this.isCancelDialog = true;
    },
    cancel_option: function(item) {
      this.isCancelDialog = false;
      options
        .getOptionsCancel(item.id, item.crypto_currency)
        .then(result => {
          setTimeout(() => {
            this.tabChange("tab1");
          }, 1000);
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    show_options(item) {
      this.item = item;
      this.isOptionDialog = true;
    },
    options(item) {
      this.isOptionDialog = false;
      options
        .getOptionsExercise(item.id, item.crypto_currency)
        .then(result => {
          setTimeout(() => {
            this.tabChange("tab1");
          }, 1000);
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
@import "../assets/css/options_order.scss";
</style>
