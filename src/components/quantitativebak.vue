<template>
<div class="content-exchange">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
<div class="top">
      
       <div  class="right"  @click="toggle">{{$t('Menu.'+currency_to_currency)}}</div>
          <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="currency_to_currency" icon="more_vert" >
           <!-- <mu-menu-item value="FFT_FFC" :title="$t('Menu.FFT_FFC')" /> -->
            <mu-menu-item value="OSC_FFC" :title="$t('Menu.OSC_FFC')" />
            <mu-menu-item value="DGC_FFC" :title="$t('Menu.DGC_FFC')" />
            <mu-menu-item value="XDAG_FFC" :title="$t('Menu.XDAG_FFC')" />
            <mu-menu-item value="ETH_FFC" :title="$t('Menu.ETH_FFC')" />
          </mu-icon-menu>
          <div   class="img-arrow"></div>
 </div>
<div >
  <div class="tab">
        <button class="button" :class="{tab1:this.tab==='tab1'}" @click="mainChange('tab1')">购买</button>
        <button class="button" :class="{tab2:this.tab==='tab2'}" @click="mainChange('tab2')">出售</button>
  </div>
  <div class="exchange-zone">
    <div class="exchange-head-zone" v-show="currency_to_currency=='OSC_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':OSC+' OSC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
  <div class="exchange-head-zone"  v-show="currency_to_currency=='DGC_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':DGC+' DGC'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
   <div class="exchange-head-zone"  v-show="currency_to_currency=='XDAG_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':XDAG+' XDAG'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
       <div class="exchange-head-zone"  v-show="currency_to_currency=='ETH_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':ETH+' ETH'}} </span> <span class="exchange-head-zone-span-right" @click="goWallet">充值 <i class="go"></i></span></div> 
     <div class="exchange-head-zone"  v-show="currency_to_currency=='FFT_FFC'">余额：<span class="exchange-head-zone-span-left"> {{this.tab=='tab1'?FFC+' FFC':FFT+' FFT'}} </span> <span class="exchange-head-zone-span-right"> </span></div> 
  <div class="exchange-diviler"></div>
   <div class="exchange-data-zone">
    <div class="exchange-table-zone">
      <div class="table-zoneleft">
        <!-- <div style="background: #ede7f6;"> -->
      
        <!-- <div style="background: #ede7f6;"> -->
        <table class="exchange-table">
          <tbody>
            <tr>
              <td class="ft-left">币币</td>
              <td class="td-green" style="color:#999">{{ currency_to_currency|currency_f}}</td>
              <td class="td-gray" style="color:#999">{{currency_to_currency|currency_l}}</td>
            </tr> 
            <tr  @click="select_sell(0)">
              <td class="ft-left">卖1</td>
              <td class="td-red">{{asks.length>=1?asks[0][0].toFixed(2):0}}</td>
            
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{asks.length>=1?asks[0][1]:0}}</td>
              <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{asks.length>=1?asks[0][1].toFixed(4):0}}</td>
            </tr>
            <tr  @click="select_buy(0)">
              <td class="ft-left" >买1</td>
              <td class="td-green" >{{bids.length>=1?bids[0][0].toFixed(2):0}}</td>
            
              <td class="td-gray"  v-show="currency_to_currency!='ETH_FFC'">{{bids.length>=1?bids[0][1]:0}}</td>
               <td class="td-gray"  v-show="currency_to_currency=='ETH_FFC'">{{bids.length>=1?bids[0][1].toFixed(4):0}}</td>
            </tr>
          </tbody>
        </table>

        <div class="table-zoneright">
          <br>
        <table class="exchange-table">
          <tbody>
            <tr>
              <td class="ft-left">场外</td>
              <td class="td-green" style="color:#999">{{ currency_to_currency|currency_f}}</td>
              <td class="td-gray" style="color:#999">{{currency_to_currency|currency_l}}</td>
            </tr> 
         
            <tr  @click="select_sell(0)">
              <td class="ft-left">卖1</td>
              <td class="td-red">{{buys[0].price}}</td>
              <td class="td-gray"  >{{buys[0].max_qty}}</td>
            </tr>
          </tbody>
        </table>
           </div>
      <!--  -->
      </div>
    </div>
      <!-- buy 买入-->
      <div class="exchange-input-zone" v-show="tab=='tab1'">


       
          <!-- <input  class="exchange-input-buy" placeholder="输入查询频数" v-model="buy_price"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   @input="change_buy_price($event)"> -->
          <!-- <input  class="exchange-input-buy"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  class="exchange-input-buy"  placeholder="数量（DGC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  class="exchange-input-buy"  placeholder="数量（XDAG）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  class="exchange-input-buy"  placeholder="数量（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input  class="exchange-input-buy"  placeholder="数量（ETH）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_qty"  @input="change_buy_qty($event)" >
          <input class="exchange-input-buy"  placeholder="金额（FFC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="buy_amount"  > -->
          <input  class="exchange-input-buy"  placeholder="交易密码" type="password"  v-model="passwordValue"  >
 <!-- <div style="display:flex" v-show="!isBuyMarket" ><mu-slider  :display-value='true' @change="onBuyLimetSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{buyLimtChangeValue}}</span></div>
 <div style="display:flex" v-show="isBuyMarket" ><mu-slider  :display-value='true' @change="onBuyMarketSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{buyMarketChangeValue}}</span></div> -->
          
          <!-- <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小购买20FFC。</p> -->
          <!--手续费0.15%，最小买入20FFC。-->

           <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" ></p>
          <!-- <mu-raised-button v-show="isBuyMarket" @click="buy_market" class="btn-buy" fullWidth primary>购买</mu-raised-button>
          <mu-raised-button v-show="!isBuyMarket" @click="buy_limit" class="btn-buy" fullWidth primary>购买</mu-raised-button> -->
          <!-- <p class="p-place-order" @click="placeOrder"><i>批量下单 》</i></p> -->
       </div>
       <!-- sell 出售-->
       <div class="exchange-input-zone"  v-show="tab=='tab2'">
        <div class="exchange-input-btn-zone">
          <button class="sell-left-btn"  :class="{disable:isSellMarket}"    @click="sellTabChange(false)">限价卖</button>
          <button class="sell-right-btn"  :class="{disable:!isSellMarket}"    @click="sellTabChange(true)">市价卖</button>
        </div>
          <input v-show="!isSellMarket"  class="exchange-input-sell" placeholder="价格（FFC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_price"  @input="change_sell_price($event)">
          <input  v-show="!isSellMarket&&currency_to_currency=='OSC_FFC'"  class="exchange-input-sell"  placeholder="数量（OSC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='OSC_FFC'"  class="exchange-input-sell"  placeholder="数量（OSC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='DGC_FFC'"  class="exchange-input-sell"  placeholder="数量（DGC）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='DGC_FFC'"  class="exchange-input-sell"  placeholder="数量（DGC）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='XDAG_FFC'"  class="exchange-input-sell"  placeholder="数量（XDAG）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='XDAG_FFC'"  class="exchange-input-sell"  placeholder="数量（XDAG）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='FFT_FFC'"  class="exchange-input-sell"  placeholder="数量（FFT）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='FFT_FFC'"  class="exchange-input-sell"  placeholder="数量（FFT）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  v-show="!isSellMarket&&currency_to_currency=='ETH_FFC'"  class="exchange-input-sell"  placeholder="数量（ETH）"  type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"  v-model="sell_qty"  @input="change_sell_qty($event)" >
          <input v-show="isSellMarket&&currency_to_currency=='ETH_FFC'"  class="exchange-input-sell"  placeholder="数量（ETH）" type="number"   maxlength="8"  oninput="if(value.length>8)value=value.slice(0,8)"   v-model="sell_qtys"  >
          <input  class="exchange-input-sell"  placeholder="交易密码"  type="password" v-model="passwordValue"  >
          <div style="display:flex" v-show="!isSellMarket" ><mu-slider    @change="onSellLimetSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{sellLimtChangeValue}}</span></div>
           <div style="display:flex" v-show="isSellMarket" ><mu-slider   @change="onSellMarketSliderChange" style="width:80%"></mu-slider><span style="font-size:0.7em;width:25%;text-align:right;padding-top:0.3em;">{{sellMarketChangeValue}}</span></div>
           <p v-show="currency_to_currency=='OSC_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小出售10OSC。</p>
           <p v-show="currency_to_currency=='DGC_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小出售100DGC。</p>
           <p v-show="currency_to_currency=='XDAG_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小出售10XDAG。</p>
            <p v-show="currency_to_currency=='FFT_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小出售10FFT。</p>
            <p v-show="currency_to_currency=='ETH_FFC'"  style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;">手续费0.2%，最小出售0.005ETH。</p>
            <p style="font-size:0.7em;margin:0px 0px;padding:0px 0px;color:#808080;text-align:left;" v-show="!isSellMarket" v-html="sellAmountTip"></p>
          <mu-raised-button v-show="isSellMarket" @click="sell_market" class="btn-sell" fullWidth primary>出售</mu-raised-button>
          <mu-raised-button v-show="!isSellMarket" @click="sell_limit" class="btn-sell" fullWidth primary>出售</mu-raised-button>
          <p class="p-place-order" @click="placeOrder"><i>批量下单 》</i></p>
       </div>
    </div>
    <div>
      <div class="exchange-diviler"></div>
      <div class="table-history">
        <div class="history_btn_zone">
          <button :class="{active:this.isHistory}" @click="orderedHistory()">未完成</button>
          <button :class="{active:this.isHistoryed}" @click="orderedHistoryed()">已完成</button>
          <!-- <button :class="{active:this.isLastTrade}" @click="latestTraded()" v-show="false">最新成交</button> -->
          <button :class="{active:this.isLastTrade}" @click="latestTraded()"  v-show="false">批量下单</button>
        </div>
        <table v-show="(this.isHistory)" class="history-table">
          <tbody>
            <tr>
              <td style="width:25%">时间</td>
              <td style="width:20%">类型</td>
              <td style="width:20%">价格</td>
              <td style="width:20%">数量</td>
              <td style="width:15%">操作</td>
            </tr>
              <tr v-for="(item) in this.tradingingList" :key="item.id" >
                <td class="td-time" >{{item.updated |formatDate2 }}</td>
                <td >{{$t('Order.'+item.order_type)}}</td>  
                <td >{{item.price}}</td>
                <td >{{item|getQty}}</td>
                <td  @click="showCancelOrderDialog(item.id)"><u style="color:red">撤销</u></td>
              </tr>
          </tbody>
        </table>
        <table v-show="(this.isHistoryed)" class="history-table">
          <tbody>
            <tr>
              <td >时间</td>
              <td >类型</td>
              <td >成交量</td>
              <td >金额</td>
            </tr>
            
              <tr v-for="(item) in this.tradedList" :key="item.id">
                <td class="td-time">{{item.updated |formatDate2 }}</td>
                <td >{{$t('Order.'+item.order_type)}}</td>
                <td >{{item.excuted_qty}}</td>
                <td >{{item.excuted_amount}}</td>
              </tr>
          </tbody>
        </table>
    
      </div> 
      <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
    </div>
  </div>
</div>

<!--订单取消接口-->
    <mu-dialog :open="isOrderCancelDialog" title="订单取消提示" >
      <div >
        <span style="font-size:12px">请确认是否撤销订单。</span>
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary label="取消"/>
          <mu-flat-button slot="actions" primary @click="cancelOrder" label="撤销"/>
        </div>
      </div>
    </mu-dialog>

 
    <BottomNav></BottomNav> 
</div>

</template>
<script>
import BottomNav from "../components/BottomNav";
import nprogress from "nprogress";
import validate from "../utils/validate";
import moment from "../utils/moment";
import { formatDate } from "../common/js/data";
import { CAPTCHA_SIGNIN } from "../models/url";
import market from "../models/market";
import HttpResultCode from "../utils/HttpResultCode";
import wallet from "../models/wallet";
import trade from "../models/trade";
import {
  CURRENCY_TO_CURRENCY,
  CLEAN_USER,
  SET_USER,
  SET_CRYPTO_CURRENCY
} from "../store/mutation-types";
import lib from "../utils/lib";
import store from "../store";

export default {
  name: "quantitative",
  components: { BottomNav },
  data() {
    return {
      tab: "tab1",
      toast: false,
      toastTimer: "",
      message: "",
      total_trading: 1,
      total_traded: 1,
      limit: 10,
      offset_trading: 0,
      offset_traded: 0,
      bids: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      asks: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      refresh_timer: [],
      btnBuyStatus: false,
      btnSellStatus: false,
      isPrice: false,
      isQty: false,
      buy_price: "",
      buy_qty: "",
      sell_price: "",
      sell_qty: "",
      isSell: false,
      isPasswordDialog: false,
      isOrderCancelDialog: false,
      orderId: "",
      tradingingList: [],
      tradedList: [],
      passwordValue: "",
      scroller: null,
      OSC: 0,
      FFC: 0,
      DGC: 0,
      XDAG: 0,
      FFT: 0,
      ETH: 0,
      currency_to_currency: this.$store.state.user.currency_to_currency,
      isBuyMarket: false,
      isSellMarket: false,
      buy_amount: "",
      sell_qtys: "",
      scroller: null,
      loading: false,
      isTrading: false,
      open: false,
      buyAmountTip: "",
      sellAmountTip: "",
      isBuyAutoPrice: true,
      isSellAutoPrice: true,
      // ticker_timer1: null,

      osc_amount: "",
      osc_buy: "",
      osc_high: "",
      osc_low: "",
      osc_sell: "",
      osc_volume: "",
      osc_last: 1,
      osc_open: 1,
      dgc_amount: "",
      dgc_buy: "",
      dgc_high: "",
      dgc_low: "",
      dgc_sell: "",
      dgc_volume: "",
      dgc_last: 1,
      dgc_open: 1,
      xdag_amount: "",
      xdag_buy: "",
      xdag_high: "",
      xdag_low: "",
      xdag_sell: "",
      xdag_volume: "",
      xdag_last: 1,
      xdag_open: 1,

      eth_amount: "",
      eth_buy: "",
      eth_high: "",
      eth_low: "",
      eth_sell: "",
      eth_volume: "",
      eth_last: 1,
      eth_open: 1,

      sellLimtChangeValue: "0%",
      sellMarketChangeValue: "0%",
      buyMarketChangeValue: "0%",
      buyLimtChangeValue: "0%",

      isHistory: true,
      isHistoryed: false,
      isLastTrade: false,

      traded_list: [],

      entrust_price: "",
      entrust_qty: "",
      entrust_interval_price: "",
      entrust_interval_qty: "",
      entrust_time: "",
      isPlaceOrder: false,
      isStopPlaceOrder: false,

      h_order_pres: [],

      fft_amount: "",
      fft_buy: "",
      fft_high: "",
      fft_low: "",
      fft_sell: "",
      fft_volume: "",
      fft_last: 1,
      fft_open: 1,
      isBatchListDialog: false,
      buys: [{ price: 0, max_qty: 0 }],
      listRefreshTime: new Date().getTime()
    };
  },
  mounted() {
    this.scroller = this.$el;
  },
  filters: {
    currency_f(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[1];
    },
    currency_l(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[0];
    },
    formatDate2(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatDate3(time) {
      let date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    },
    getQty(item) {
      return (item.limit_qty - item.excuted_qty).toFixed(4);
    },
    formate(value) {
      return lib.toFixed(parseFloat(value), 3);
    },
    osc_filters(last, osc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == osc_open || osc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(osc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(osc_open)) /
        parseFloat(osc_open) *
        100
      ).toFixed(2);
    },
    dgc_filters(last, dgc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dgc_open || dgc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dgc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dgc_open)) /
        parseFloat(dgc_open) *
        100
      ).toFixed(2);
    },
    xdag_filters(last, xdag_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == xdag_open || xdag_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(xdag_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(xdag_open)) /
        parseFloat(xdag_open) *
        100
      ).toFixed(2);
    },
    fft_filters(last, fft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == fft_open || fft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(fft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(fft_open)) /
        parseFloat(fft_open) *
        100
      ).toFixed(2);
    },
    eth_filters(last, eth_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == eth_open || eth_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(eth_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(eth_open)) /
        parseFloat(eth_open) *
        100
      ).toFixed(2);
    }
  },
  created: function() {
    // alert("sadfas")
    // window.test.exec('123','werq','432452');
    // plus.bridge.execSync('fsdg',"sdfgsdfg","sfdgsd")
    // this.isHistory = false;
    this.getBalance();
    if (
      this.currency_to_currency == "OSC_FFC" ||
      this.currency_to_currency == "DGC_FFC" ||
      this.currency_to_currency == "XDAG_FFC" ||
      this.currency_to_currency == "FFT_FFC" ||
      this.currency_to_currency == "ETH_FFC"
    ) {
      this.crypto_currency = this.currency_to_currency.split("_")[0];
    } else {
      this.currency_to_currency = "OSC_FFC";
      this.handleChange(this.currency_to_currency);
    }
    this.orderedHistory();
    // this.getExchangeDepth();
    this.getBuyTrade();
    this.time_refresh();
  },
  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  },
  methods: {
    placeOrder() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      this.isPlaceOrder = true;
    },
    close() {
      this.isPlaceOrder = false;
    },
    placeOrderBuy() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.showToast("请输入正确的委托单价");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.showToast("请输入正确的委托数量");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.showToast("请输入正确的委托增价");
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.showToast("请输入正确的委托增量");
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.showToast("请输入正确的委托次数");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.showToast("委托次数小于50次");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.showToast("订单不足 20 FFC。");
        return;
      }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isPlaceOrder = false;

      this.isStopPlaceOrder = false;
      var l_this = this;
      this.h_order_pres = [];
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;

      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isBatchListDialog = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isBatchListDialog = true;
    },
    placeOrdersBuy() {
      this.isStopPlaceOrder = false;
      this.isBatchListDialog = false;
      var l_this = this;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderBuy(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    placeOrderSell() {
      if (this.entrust_price == "" || parseFloat(this.entrust_price) <= 0) {
        this.showToast("请输入正确的委托单价");
        return;
      }

      if (this.entrust_qty == "" || parseFloat(this.entrust_qty) <= 0) {
        this.showToast("请输入正确的委托数量");
        return;
      }

      if (
        this.entrust_interval_price == "" ||
        parseFloat(this.entrust_interval_price) == 0
      ) {
        this.showToast("请输入正确的委托增价");
        return;
      }

      if (
        this.entrust_interval_qty == "" ||
        parseFloat(this.entrust_interval_qty) == 0
      ) {
        this.showToast("请输入正确的委托增量");
        return;
      }

      if (this.entrust_time == "" || parseInt(this.entrust_time) <= 0) {
        this.showToast("请输入正确的委托次数");
        return;
      }
      if (parseInt(this.entrust_time) > 50) {
        this.showToast("委托次数小于50次");
        return;
      }
      if (parseFloat(this.entrust_price) * parseFloat(this.entrust_qty) < 20) {
        this.showToast("订单不足 20 FFC。");
        return;
      }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isPlaceOrder = false;
      // this.isTrading = true;
      this.isStopPlaceOrder = false;
      var l_this = this;
      this.h_order_pres = [];
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      for (var i = 0; i < m_entrust_time; i++) {
        if (m_entrust_price <= 0 || m_entrust_qty <= 0) {
          this.isBatchListDialog = true;
          return;
        }
        var item = {
          price: m_entrust_price.toFixed(3),
          qty: m_entrust_qty.toFixed(3),
          index: i + 1
        };
        this.h_order_pres.push(item);
        m_entrust_price = m_entrust_price + m_entrust_interval_price;
        m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
      }
      this.isBatchListDialog = true;
    },
    placeOrdersSell() {
      this.isBatchListDialog = false;
      var l_this = this;
      var m_entrust_price = parseFloat(this.entrust_price);
      var m_entrust_qty = parseFloat(this.entrust_qty);
      var m_entrust_interval_price = parseFloat(this.entrust_interval_price);
      var m_entrust_interval_qty = parseFloat(this.entrust_interval_qty);
      var m_entrust_time = parseInt(this.entrust_time);
      var m_currency_to_currency = this.currency_to_currency;
      this.entrust_price = "";
      this.entrust_qty = "";
      this.entrust_interval_price = "";
      this.entrust_interval_qty = "";
      this.entrust_time = "";
      for (var i = 0; i < m_entrust_time; i++) {
        setTimeout(() => {
          l_this.orderSell(
            m_currency_to_currency,
            m_entrust_price,
            m_entrust_qty,
            i + 1,
            m_entrust_time
          );
          m_entrust_price = m_entrust_price + m_entrust_interval_price;
          m_entrust_qty = m_entrust_qty + m_entrust_interval_qty;
        }, i * 500);
      }
    },
    orderBuy(m_currency_to_currency, price, qty, time1, time2) {
      // console.log(new Date().getTime()+"  time");
      if (price <= 0 || qty <= 0) {
        this.isStopPlaceOrder = true;
        return;
      }
      if (this.isStopPlaceOrder) return;
      market
        .exchangeLimitOrder(
          m_currency_to_currency,
          qty,
          true,
          price,
          this.passwordValue
        )
        .then(data => {
          if (time1 == time2) {
            setTimeout(this.getBalance(), 1000);
            if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
          }
        })
        .catch(e => {
          // this.isTrading = false;
          this.isStopPlaceOrder = true;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    orderSell(m_currency_to_currency, price, qty, time1, time2) {
      // console.log(new Date().getTime()+"  time");
      if (price <= 0 || qty <= 0) {
        this.isStopPlaceOrder = true;
        return;
      }
      if (this.isStopPlaceOrder) return;
      market
        .exchangeLimitOrder(
          m_currency_to_currency,
          qty,
          false,
          price,
          this.passwordValue
        )
        .then(data => {
          if (time1 == time2) {
            setTimeout(this.getBalance(), 1000);
            if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
          }
        })
        .catch(e => {
          this.passwordValue = "";
          this.isStopPlaceOrder = true;
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    onSellLimetSliderChange(val) {
      // alert(val)
      this.sellLimtChangeValue = val + " %";

      if (this.currency_to_currency == "OSC_FFC") {
        this.sell_qty = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "DGC_FFC") {
        this.sell_qty = this.DGC * val / 100;
      }
      if (this.currency_to_currency == "XDAG_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.XDAG * val / 100;
      }
      if (this.currency_to_currency == "FFT_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.FFT * val / 100;
      }
      if (this.currency_to_currency == "ETH_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qty = this.ETH * val / 100;
      }
      this.change_sell_qty(null);
    },
    onSellMarketSliderChange(val) {
      this.sellMarketChangeValue = val + " %";
      if (this.currency_to_currency == "OSC_FFC") {
        this.sell_qtys = this.OSC * val / 100;
      }
      if (this.currency_to_currency == "DGC_FFC") {
        this.sell_qtys = this.DGC * val / 100;
      }
      if (this.currency_to_currency == "XDAG_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.XDAG * val / 100;
      }
      if (this.currency_to_currency == "FFT_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.FFT * val / 100;
      }
      if (this.currency_to_currency == "ETH_FFC") {
        // console.log(this.XDAG * val)
        this.sell_qtys = this.ETH * val / 100;
      }
    },
    onBuyMarketSliderChange(val) {
      this.buyMarketChangeValue = val + " %";
      this.buy_amount = (this.FFC * val / 100).toFixed(8);
    },
    onBuyLimetSliderChange(val) {
      this.buyLimtChangeValue = val + " %";
      if (parseFloat(this.buy_price) > 0) {
        this.buy_qty = (this.FFC * val / 100 / this.buy_price).toFixed(8);
        this.change_buy_qty(null);
      }
    },
    select_sell(index) {
      if (this.asks[index] != null) {
        this.buy_price = this.asks[index][0].toFixed(3);
        this.sell_price = this.asks[index][0].toFixed(3);
      }
    },
    select_buy(index) {
      if (this.bids[index] != null) {
        this.sell_price = this.bids[index][0].toFixed(3);
        this.buy_price = this.bids[index][0].toFixed(3);
      }
    },
    showToast: function(msg) {
      this.toast = true;
      this.message = msg;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    closeDialog() {
      this.dialog = false;
      this.isPasswordDialog = false;
      this.isOrderCancelDialog = false;
      this.isBatchListDialog = false;
    },
    handleChange(val) {
      this.currency_to_currency = val;
      this.crypto_currency = this.currency_to_currency.split("_")[0];
      this.$store.commit(CURRENCY_TO_CURRENCY, this.currency_to_currency);
      this.isBuyAutoPrice = true;
      this.isSellAutoPrice = true;
      if (this.isHistory) this.orderedHistory();
      if (this.isHistoryed) this.orderedHistoryed();
      if (this.isLastTrade) this.latestTraded();
      // this.getExchangeDepth();
      // this.loadP2PBuy();
      this.getBuyTrade();
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
    mainChange(tab) {
      this.tab = tab;
      this.passwordValue = "";
    },
    buyTabChange(isBuyMarket) {
      this.isBuyMarket = isBuyMarket;
      this.buyAmountTip = "";
      this.sellAmountTip = "";
    },
    sellTabChange(isSellMarket) {
      this.isSellMarket = isSellMarket;
      this.buyAmountTip = "";
      this.sellAmountTip = "";
    },
    goWallet() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.tab == "tab1") {
        this.$router.push("/wallet_detail_ffc");
      }
      if (this.tab == "tab2") {
        if (this.currency_to_currency == "OSC_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "osc" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'OSC')
        }
        if (this.currency_to_currency == "DGC_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "dgc" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (this.currency_to_currency == "XDAG_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "xdag" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        if (this.currency_to_currency == "ETH_FFC") {
          this.$router.push({
            name: "wallet_detail",
            params: { crypto_currency: "eth" }
          });
          // this.$store.commit(SET_CRYPTO_CURRENCY,'DGC')
        }
        // this.$router.push('/wallet_detail');
      }
    },
    buy_market() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.buy_amount))) {
        this.buy_amount = lib.toFixed(parseFloat(this.buy_amount), 3);
        if (this.buy_amount <= 0) {
          this.showToast("请输入正确的购买金额");
          return;
        }
      } else {
        this.showToast("请输入正确的购买金额");
        return;
      }
      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      if (parseInt(this.buy_amount) < 20) {
        this.showToast("订单不足 20 FFC");
        return;
      }
      this.isTrading = true;
      market
        .market_order(
          this.currency_to_currency,
          this.buy_amount,
          true,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.buy_amount = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistoryed) setTimeout(this.orderedHistoryed(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    buy_limit() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.buy_price))) {
        this.buy_price = lib.toFixed(parseFloat(this.buy_price), 3);
        if (this.buy_price <= 0) {
          this.showToast("请输入正确的购买价格");
          return;
        }
      } else {
        this.showToast("请输入正确的购买价格");
        return;
      }
      if (!isNaN(parseInt(this.buy_qty))) {
        this.buy_qty = lib.toFixed(parseFloat(this.buy_qty), 8);
        if (this.buy_qty <= 0) {
          this.showToast("请输入正确的购买数量");
          return;
        }
      } else {
        this.showToast("请输入正确的购买数量");
        return;
      }

      if (parseFloat(this.buy_price) * parseFloat(this.buy_qty) < 20) {
        // var number = 20/parseFloat(this.buy_price)
        // this.showToast('最小购买  '+number+' '+this.currency_to_currency)
        this.showToast("订单不足 20 FFC。");
        return;
      }

      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }
      this.isTrading = true;
      this.sellAmountTip = "";
      this.buyAmountTip = "";
      market
        .exchangeLimitOrder(
          this.currency_to_currency,
          this.buy_qty,
          true,
          this.buy_price,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.buy_qty = "";
          this.buy_price = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    sell_market() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.sell_qtys))) {
        this.sell_qtys = lib.toFixed(parseFloat(this.sell_qtys), 8);
        if (this.sell_qtys <= 0) {
          this.showToast("请输入正确的出售数量");
          return;
        }
      } else {
        this.showToast("请输入正确的出售数量");
        return;
      }
      if (this.passwordValue === "") {
        this.showToast("请输入正确的出售数量");
        return;
      }
      // if(parseInt(this.sell_qtys)<10){
      //   this.showToast('出售数量最少 10 OSC')
      //  return
      // }
      if (this.currency_to_currency == "DGC_FFC") {
        if (parseInt(this.sell_qtys) < 100) {
          this.showToast("出售数量最少 100 DGC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFC") {
        if (parseInt(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "XDAG_FFC") {
        if (parseInt(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 XDAG");
          return;
        }
      } else if (this.currency_to_currency == "FFT_FFC") {
        if (parseInt(this.sell_qtys) < 10) {
          this.showToast("出售数量最少 10 FFT");
          return;
        }
      } else if (this.currency_to_currency == "ETH_FFC") {
        if (parseInt(this.sell_qtys) < 0.005) {
          this.showToast("出售数量最少 0.005 ETH");
          return;
        }
      }
      this.isTrading = true;
      market
        .market_order(
          this.currency_to_currency,
          this.sell_qtys,
          false,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.sell_qtys = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistoryed) setTimeout(this.orderedHistoryed(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    sell_limit() {
      if (!this.$store.state.user.access_token.length > 0) {
        this.$router.push("/sign_in");
        return;
      }
      if (this.isTrading) {
        this.showToast("请稍后");
        return;
      }
      if (!isNaN(parseInt(this.sell_price))) {
        this.sell_price = lib.toFixed(parseFloat(this.sell_price), 3);
        if (this.sell_price <= 0) {
          this.showToast("请输入正确的出售价格");
          return;
        }
      } else {
        this.showToast("请输入正确的出售价格");
        return;
      }
      if (!isNaN(parseInt(this.sell_qty))) {
        this.sell_qty = lib.toFixed(parseFloat(this.sell_qty), 3);
        if (this.sell_qty <= 0) {
          this.showToast("请输入正确的出售数量");
          return;
        }
      } else {
        this.showToast("请输入正确的出售数量");
        return;
      }
      if (this.currency_to_currency == "DGC_FFC") {
        if (parseInt(this.sell_qty) < 100) {
          this.showToast("出售数量最少 100 DGC");
          return;
        }
      } else if (this.currency_to_currency == "OSC_FFC") {
        if (parseInt(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 OSC");
          return;
        }
      } else if (this.currency_to_currency == "XDAG_FFC") {
        if (parseInt(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 XDAG");
          return;
        }
      } else if (this.currency_to_currency == "FFT_FFC") {
        if (parseInt(this.sell_qty) < 10) {
          this.showToast("出售数量最少 10 FFT");
          return;
        }
      } else if (this.currency_to_currency == "ETH_FFC") {
        if (parseInt(this.sell_qty) < 0.005) {
          this.showToast("出售数量最少 0.005 ETH");
          return;
        }
      }
      if (this.passwordValue === "") {
        this.showToast("请输入火狐狸平台交易密码");
        return;
      }

      this.isTrading = true;
      this.sellAmountTip = "";
      this.buyAmountTip = "";
      market
        .exchangeLimitOrder(
          this.currency_to_currency,
          this.sell_qty,
          false,
          this.sell_price,
          this.passwordValue
        )
        .then(data => {
          this.isTrading = false;
          this.sell_qty = "";
          this.sell_price = "";
          this.passwordValue = "";
          this.showToast("下单成功");
          setTimeout(this.getBalance(), 1000);
          if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.passwordValue = "";
          if (e.code == 1104) {
            this.showToast("账户余额不足");
          } else {
            this.showToast(HttpResultCode.validate(e.code));
          }
        });
    },
    limitTrade() {
      if (!(this.isPrice && this.isQty)) {
        this.showToast("输入不正确");
        return;
      }
      //对比自己账户数据
      this.passwordValue = "";
      this.isPasswordDialog = true;
    },
    showCancelOrderDialog(orderId) {
      this.isOrderCancelDialog = true;
      this.orderId = orderId;
    },
    cancelOrder() {
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.isOrderCancelDialog = false;
      market
        .exchangeCancelOrder(this.currency_to_currency, this.orderId)
        .then(data => {
          setTimeout(() => {
            this.orderedHistory(true);
          }, 1000);
        })
        .catch(e => {});
    },
    orderedHistory() {
      this.isHistory = true;
      this.isHistoryed = false;
      this.isLastTrade = false;
      this.offset_trading = 0;
      this.total_trading = 1;
      this.exchangeMyTradingOrder();
    },
    orderedHistoryed() {
      this.isHistory = false;
      this.isHistoryed = true;
      this.isLastTrade = false;
      this.offset_traded = 0;
      this.total_traded = 1;
      this.exchangeMyTradedOrder();
    },
    latestTraded() {
      this.isHistory = false;
      this.isHistoryed = false;
      this.isLastTrade = true;

      //最新成交
      market
        .trades(this.currency_to_currency)
        .then(data => {
          if (data.code == 0) {
            this.traded_list = data.data.trades;
          }
        })
        .catch(e => {});
    },
    loadMore() {
      if (this.isHistory) {
        this.exchangeMyTradingOrder();
      } else if (this.isHistoryed) {
        this.exchangeMyTradedOrder();
      } else if (this.isLastTrade) {
        // this.latestTraded();
      }
    },
    exchangeMyTradingOrder() {
      var t = new Date().getTime() - this.listRefreshTime;
      if (t < 1000) {
        return;
      }
      this.listRefreshTime = new Date().getTime();
      if (this.loading) {
        return;
      }
      if (this.total_trading <= this.offset_trading) {
        this.loading = false;
        return;
      }
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.loading = true;
      market
        .foxExchangeMyOrder(
          this.currency_to_currency,
          "TRADING",
          this.offset_trading,
          this.limit
        )
        .then(data => {
          this.loading = false;
          if (this.offset_trading == 0) this.tradingingList = [];
          if (data.code == 0) {
            if (data.data.total > 0) {
              this.offset_trading =
                this.offset_trading + data.data.orders.length;
              this.tradingingList = this.tradingingList.concat(
                data.data.orders
              );
              this.total_trading = data.data.total;
            }
          }
          //  this.getBalance();
        })
        .catch(e => {
          this.loading = false;
        });
    },
    exchangeMyTradedOrder() {
      var t = new Date().getTime() - this.listRefreshTime;
      if (t < 1000) {
        return;
      }
      this.listRefreshTime = new Date().getTime();
      if (this.loading) {
        return;
      }
      if (this.total_traded <= this.offset_traded) {
        this.loading = false;
        return;
      }
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      this.loading = true;
      market
        .foxExchangeMyOrder(
          this.currency_to_currency,
          "TRADED",
          this.offset_traded,
          this.limit
        )
        .then(data => {
          this.loading = false;
          if (this.offset_traded == 0) this.tradedList = [];
          if (data.code == 0) {
            if (data.data.total > 0) {
              this.offset_traded = this.offset_traded + data.data.orders.length;
              this.tradedList = this.tradedList.concat(data.data.orders);
              this.total_traded = data.data.total;
            }
          }
          //  this.getBalance();
        })
        .catch(e => {
          this.loading = false;
        });
    },
    change_buy_price: function(e) {
      if (this.buy_price.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (this.buy_qty.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
        this.buyAmountTip =
          '交易额：<span style="color:#1AAC19">' +
          parseFloat(
            (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
          ) +
          "</span> FFC";
      } else {
        this.buyAmountTip = "";
      }
    },
    change_buy_qty: function(e) {
      if (this.buy_price.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (this.buy_qty.length == 0) {
        this.buyAmountTip = "";
        return;
      }
      if (parseFloat(this.buy_price) > 0 && parseFloat(this.buy_qty) > 0) {
        this.buyAmountTip =
          '交易额：<span style="color:#1AAC19">' +
          parseFloat(
            (parseFloat(this.buy_price) * parseFloat(this.buy_qty)).toFixed(8)
          ) +
          "</span> FFC";
      } else {
        this.buyAmountTip = "";
      }
    },
    change_sell_price: function(e) {
      if (this.sell_price.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (this.sell_qty.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
        this.sellAmountTip =
          '交易额：<span style="color:#ff4d2d">' +
          parseFloat(
            (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(8)
          ) +
          "</span> FFC";
      } else {
        this.sellAmountTip = "";
      }
    },
    currency_l(currency_to_currency) {
      if (currency_to_currency == undefined) return "";
      return currency_to_currency.split("_")[0];
    },
    change_sell_qty: function(e) {
      if (this.sell_price.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (this.sell_qty.length == 0) {
        this.sellAmountTip = "";
        return;
      }
      if (parseFloat(this.sell_price) > 0 && parseFloat(this.sell_qty) > 0) {
        this.sellAmountTip =
          '交易额：<span style="color:#ff4d2d">' +
          parseFloat(
            (parseFloat(this.sell_price) * parseFloat(this.sell_qty)).toFixed(8)
          ) +
          "</span> FFC";
      } else {
        this.sellAmountTip = "";
      }
    },
    time_refresh: function() {
      this.clear_refresh();
      let sec = 10;
      for (let i = 0; i <= 10; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (sec !== 0) {
              sec--;
            } else {
              sec = 10;
              // console.log('this.$route.path = '+this.$route.path)
              if ("/quantitative" == this.$route.path) {
              } else {
                this.clear_refresh();
                return;
              }

              this.getExchangeDepth();
              this.getBalance();
              this.getTicker_list();
              this.loadP2PBuy();
              this.getBuyTrade();
              if (this.isHistory) this.orderedHistory();
              setTimeout(() => {
                this.time_refresh();
              }, 1000);
            }
          }, i * 1000)
        );
      }
    },
    clear_refresh: function() {
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
      this.refresh_timer = [];
    },
    getBuyTrade() {
      Promise.all([
        market.exchangeDepth(this.currency_to_currency, "1"),
        trade.adList(this.crypto_currency, "CNY", false, 0, 1)
      ]).then(result => {
        if (result[0].data.depths.hasOwnProperty("bids")) {
          this.bids = result[0].data.depths.bids;
          if (this.isSellAutoPrice) {
            // this.sell_price = this.bids[0][0].toFixed(3);
          }
          this.isSellAutoPrice = false;
        } else {
          this.bids = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
        }
        if (result[0].data.depths.hasOwnProperty("asks")) {
          this.asks = result[0].data.depths.asks;
          if (this.isBuyAutoPrice) {
            this.isBuyAutoPrice = false;
            // this.buy_price = this.asks[0][0].toFixed(3);
          }
        } else {
          this.asks = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
        }
        this.buys = result[1].data.lists;
        // this.buys[0].price;
        // console.log("this.bids[0] ==" + this.bids[0]);
        // console.log("this.asks[0] ==" + this.asks[0]);
        // console.log("this.buys[0].price ==" + this.buys[0].price);
        if (this.bids[0][0] > 0 && this.buys[0].price > 0) {
          var dif = Math.abs(this.bids[0][0] - this.buys[0].price);
          // console.log("this.bids[0][0]==" + this.bids[0][0]);
          // console.log("this.buys[0].price==" + this.buys[0].price);
          // console.log("dif==" + dif);
          if (this.buys[0].crypto_currency == "DGC") {
            if (this.bids[0][1] < 100) {
              return;
            }
          }
          if (
            this.buys[0].crypto_currency == "OSC" ||
            this.buys[0].crypto_currency == "XDG"
          ) {
            if (this.bids[0][1] < 10) {
              return;
            }
          }
          if (this.passwordValue == "") return;
          if (this.bids[0][0] > this.buys[0].price) {
            //场外买币搬入
            if (dif / this.bids[0][0] > 0.004) {
              //下单买入
              // var qty = this.bids[0][1];
              // if (this.bids[0][1] >= this.buys[0].max_qty) {
              //   qty = this.buys[0].max_qty;
              // }
              var qty = 100;
              console.log("开始搬砖");
              market
                .exchangeLimitOrder(
                  this.currency_to_currency,
                  qty,
                  false,
                  this.bids[0][0],
                  this.passwordValue
                )
                .then(data => {
                  setTimeout(this.getBalance(), 1000);
                  if (this.isHistory) setTimeout(this.orderedHistory(), 1000);
                })
                .catch(e => {
                  if (e.code == 1104) {
                    this.showToast("账户余额不足");
                  } else {
                    this.showToast(HttpResultCode.validate(e.code));
                  }
                });
              trade
                .placeOrder(
                  this.buys[0].id,
                  this.buys[0].crypto_currency,
                  qty,
                  qty * this.buys[0].price
                )
                .then(result => {
                  // let code = parseInt(result.code);
                  // this.qty[0] = "";
                  // this.amount[0] = "";
                  // this.isCommit = false;
                  // if (code === 0) {
                  //   let trade = result.data.trade;
                  //   this.showToast(this.$t("Order.SuccessContent"));
                  //   this.timer = setTimeout(() => {
                  //     clearTimeout(this.timer);
                  //     this.next(trade);
                  //   }, 1000);
                  // }
                })
                .catch(e => {
                  // this.showToast(HttpResultCode.validate(e.code));
                  // this.isCommit = false;
                  // switch (e.code) {
                  //   case 1004:
                  //     this.$router.push("/sign_in");
                  //     break;
                  //   case 1031:
                  //     this.isGoBoundPay = true;
                  //     break;
                  // }
                });
            }
          }
        }
      });
    },
    getExchangeDepth() {
      // market
      //   .exchangeDepth(this.currency_to_currency, "5")
      //   .then(data => {
      //     if (data.data.depths.hasOwnProperty("bids")) {
      //       this.bids = data.data.depths.bids;
      //       if (this.isSellAutoPrice) {
      //         // this.sell_price = this.bids[0][0].toFixed(3);
      //       }
      //       this.isSellAutoPrice = false;
      //     } else {
      //       this.bids = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
      //     }
      //     if (data.data.depths.hasOwnProperty("asks")) {
      //       this.asks = data.data.depths.asks;
      //       if (this.isBuyAutoPrice) {
      //         this.isBuyAutoPrice = false;
      //         // this.buy_price = this.asks[0][0].toFixed(3);
      //       }
      //     } else {
      //       this.asks = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
      //     }
      //   })
      //   .catch(e => {});
    },
    getBalance: function() {
      if (!this.$store.state.user.access_token.length > 0) {
        return;
      }
      wallet
        .balance()
        .then(data => {
          let list = data.data.list;
          for (let i = 0; i < list.length; i++) {
            if (list[i].currency === "OSC") {
              this.OSC = list[i].available;
            }
            if (list[i].currency === "FFC") {
              this.FFC = list[i].available;
            }
            if (list[i].currency === "DGC") {
              this.DGC = list[i].available;
            }
            if (list[i].currency === "XDAG") {
              this.XDAG = list[i].available;
            }
            if (list[i].currency === "FFT") {
              this.FFT = list[i].available;
            }
            if (list[i].currency === "ETH") {
              this.ETH = list[i].available;
            }
          }
        })
        .catch(e => {
          // console.log("e = "+e.code)
        });
    },
    getTicker_list() {
      if ("/quantitative" == this.$route.path || "/" == this.$route.path) {
      } else {
        // clearTimeout(this.ticker_timer1);
        return;
      }
      // clearTimeout(this.ticker_timer1);

      market
        .ticker_list("FFC")
        .then(data => {
          // this.ticker_timer1 = setTimeout(this.getTicker_list, 5000);
          let OSC_FFC = data.data.tickers.OSC_FFC;
          this.osc_amount = OSC_FFC.amount.toFixed(2);
          this.osc_buy = OSC_FFC.buy.toFixed(3);
          this.osc_high = OSC_FFC.high.toFixed(3);
          this.osc_low = OSC_FFC.low.toFixed(3);
          this.osc_sell = OSC_FFC.sell.toFixed(3);
          this.osc_volume = OSC_FFC.volume.toFixed(2);
          this.osc_last = OSC_FFC.last.toFixed(3);
          this.osc_open = OSC_FFC.open.toFixed(3);
          let DGC_FFC = data.data.tickers.DGC_FFC;
          this.dgc_amount = DGC_FFC.amount.toFixed(2);
          this.dgc_buy = DGC_FFC.buy.toFixed(3);
          this.dgc_high = DGC_FFC.high.toFixed(3);
          this.dgc_low = DGC_FFC.low.toFixed(3);
          this.dgc_sell = DGC_FFC.sell.toFixed(3);
          this.dgc_volume = DGC_FFC.volume.toFixed(2);
          this.dgc_last = DGC_FFC.last.toFixed(3);
          this.dgc_open = DGC_FFC.open.toFixed(3);
          let XDAG_FFC = data.data.tickers.XDAG_FFC;
          this.xdag_amount = XDAG_FFC.amount.toFixed(2);
          this.xdag_buy = XDAG_FFC.buy.toFixed(3);
          this.xdag_high = XDAG_FFC.high.toFixed(3);
          this.xdag_low = XDAG_FFC.low.toFixed(3);
          this.xdag_sell = XDAG_FFC.sell.toFixed(3);
          this.xdag_volume = XDAG_FFC.volume.toFixed(2);
          this.xdag_last = XDAG_FFC.last.toFixed(3);
          this.xdag_open = XDAG_FFC.open.toFixed(3);

          let FFT_FFC = data.data.tickers.FFT_FFC;
          this.fft_amount = FFT_FFC.amount.toFixed(2);
          this.fft_buy = FFT_FFC.buy.toFixed(3);
          this.fft_high = FFT_FFC.high.toFixed(3);
          this.fft_low = FFT_FFC.low.toFixed(3);
          this.fft_sell = FFT_FFC.sell.toFixed(3);
          this.fft_volume = FFT_FFC.volume.toFixed(2);
          this.fft_last = FFT_FFC.last.toFixed(3);
          this.fft_open = FFT_FFC.open.toFixed(3);
          let ETH_FFC = data.data.tickers.ETH_FFC;
          this.eth_amount = ETH_FFC.amount.toFixed(2);
          this.eth_buy = ETH_FFC.buy.toFixed(2);
          this.eth_high = ETH_FFC.high.toFixed(2);
          this.eth_low = ETH_FFC.low.toFixed(2);
          this.eth_sell = ETH_FFC.sell.toFixed(2);
          this.eth_volume = ETH_FFC.volume.toFixed(4);
          this.eth_last = ETH_FFC.last.toFixed(2);
          this.eth_open = ETH_FFC.open.toFixed(2);
        })
        .catch(e => {
          // this.ticker_timer1 = setTimeout(this.getTicker_list, 5000);
        });
    },
    loadP2PBuy() {
      // trade
      //   .adList(this.crypto_currency, "CNY", false, 0, 1)
      //   .then(values => {
      //     // this.refreshing = false;
      //     // this.loading = false;
      //     if (values.code === 0) {
      //       // if (this.offset_sell == 0) {
      //       //   this.sells = [];
      //       // }
      //       this.buys = values.data.lists;
      //       // this.total_sell = values.data.total;
      //       // if (this.total_sell > 0) {
      //       //   this.offset_sell = this.offset_sell + values.data.lists.length;
      //       //   this.sells = this.sells.concat(values.data.lists);
      //       // }
      //     }
      //   })
      //   .catch(e => {
      //     // this.refreshing = false;
      //     // this.loading = false;
      //   });
    }
  },

  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/exchange.scss";
</style>

