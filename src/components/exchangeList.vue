<template>
<div class="content-exchange">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
<div class="top">
      <div class="center" >行情</div>
       <!-- <div  class="right"  @click="toggle">{{$t('Menu.'+currency_to_currency)}}</div>
          <mu-icon-menu class="icon-top"  @change="handleChange" :open="open" @open="handleOpen" @close="handleClose"  :value="currency_to_currency" icon="more_vert" >
           <mu-menu-item value="FFT_FFC" :title="$t('Menu.FFT_FFC')" />
            <mu-menu-item value="OSC_FFC" :title="$t('Menu.OSC_FFC')" />
             <mu-menu-item value="OSC_FFT" :title="$t('Menu.OSC_FFT')" />
              <mu-menu-item value="FFTS_FFC" :title="$t('Menu.FFTS_FFC')" />
               <mu-menu-item value="DNA_FFC" :title="$t('Menu.DNA_FFC')" />
             <mu-menu-item value="FFTS_FFT" :title="$t('Menu.FFTS_FFT')" />
             <mu-menu-item value="DNA_FFT" :title="$t('Menu.DNA_FFT')" />
             <mu-menu-item value="EGD_FFC" :title="$t('Menu.EGD_FFC')" />
             <mu-menu-item value="EGD_FFT" :title="$t('Menu.EGD_FFT')" />
            <mu-menu-item value="DGC_FFC" :title="$t('Menu.DGC_FFC')" />
            <mu-menu-item value="CBC_FFC" :title="$t('Menu.CBC_FFC')" />
            <mu-menu-item value="XDAG_FFC" :title="$t('Menu.XDAG_FFC')" />
            <mu-menu-item value="ETH_FFC" :title="$t('Menu.ETH_FFC')" />
          </mu-icon-menu>
          <div   class="img-arrow"></div> -->
 </div>
<div >
  <div class="tab">
        <button class="button" :class="{tab1:this.tab==='tab1'}" @click="mainChange('tab1')">FFC</button>
        <button class="button" :class="{tab2:this.tab==='tab2'}" @click="mainChange('tab2')">FFT</button>
  </div>
  <div v-if="tab === 'tab1'" >
    <div class="order_item-list-content-zone" >
       <!-- <div v-for="(item) in this.dataFFC" :key="item" @click="goDetail(item)"> -->
        <div class="div1">
            <div class="div2">
              <div>
                <div class="div3">
                  <span class="span1">OSC/</span>
                  <span class="span2">FFC</span>
                </div>
                <div  class="div4">
                  交易量：{{osc_volume}} OSC
                </div>
              </div>
            </div>
          <div class="div5">
              <div class="div6">
                <div class="div7">{{osc_last}}</div>
                <div class="div8">¥ {{osc_amount}}</div>
              </div>
              <button  @click="goDetail('OSC_FFC')" style="background:#24b36b"  v-show=" osc_last>=osc_open">  +&nbsp;{{osc_last ,osc_open|osc_filters}}&nbsp;%</button>
              <button   @click="goDetail('OSC_FFC')" style="background:#f25c49"  v-show="osc_last<osc_open" >  {{osc_last ,osc_open|osc_filters}}&nbsp;%</button>
          </div>
        </div>

       <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">ETH/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{eth_volume}} ETH
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{eth_last}}</div>
              <div class="div8">¥ {{eth_amount}}</div>
            </div>
             <button   @click="goDetail('ETH_FFC')" style="background:#24b36b"  v-show=" eth_last>=eth_open">  +&nbsp;{{eth_last ,eth_open|eth_filters}}&nbsp;%</button>
             <button  @click="goDetail('ETH_FFC')" style="background:#f25c49"  v-show="eth_last<eth_open" >  {{eth_last ,eth_open|eth_filters}}&nbsp;%</button>
         </div>
      </div>

      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">XDAG/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{xdag_volume}} XDAG
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{xdag_last}}</div>
              <div class="div8">¥ {{xdag_amount}}</div>
            </div>
             <button  @click="goDetail('XDAG_FFC')"  style="background:#24b36b"  v-show=" xdag_last>=xdag_open">  +&nbsp;{{xdag_last ,xdag_open|xdag_filters}}&nbsp;%</button>
             <button  @click="goDetail('XDAG_FFC')" style="background:#f25c49"  v-show="xdag_last<xdag_open" >  {{xdag_last ,xdag_open|xdag_filters}}&nbsp;%</button>
         </div>
      </div>



      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">FFT/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{fft_volume}} FFT
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{fft_last}}</div>
              <div class="div8">¥ {{fft_amount}}</div>
            </div>
             <button  @click="goDetail('FFT_FFC')" style="background:#24b36b"  v-show=" fft_last>=fft_open">  +&nbsp;{{fft_last ,fft_open|fft_filters}}&nbsp;%</button>
             <button  @click="goDetail('FFT_FFC')"  style="background:#f25c49"  v-show="fft_last<fft_open" >  {{fft_last ,fft_open|fft_filters}}&nbsp;%</button>
         </div>
      </div>

      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">DGC/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{dgc_volume}} DGC
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{dgc_last}}</div>
              <div class="div8">¥ {{dgc_amount}}</div>
            </div>
             <button @click="goDetail('DGC_FFC')" style="background:#24b36b"  v-show=" dgc_last>=dgc_open">  +&nbsp;{{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</button>
             <button @click="goDetail('DGC_FFC')"  style="background:#f25c49"  v-show="dgc_last<dgc_open" >  {{dgc_last ,dgc_open|dgc_filters}}&nbsp;%</button>
         </div>
      </div>


      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">CBC/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{cbc_volume}} CBC
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{cbc_last}}</div>
              <div class="div8">¥ {{cbc_amount}}</div>
            </div>
             <button @click="goDetail('CBC_FFC')"  style="background:#24b36b"  v-show=" cbc_last>=cbc_open">  +&nbsp;{{cbc_last ,cbc_open|cbc_filters}}&nbsp;%</button>
             <button  @click="goDetail('CBC_FFC')" style="background:#f25c49"  v-show="cbc_last<cbc_open" >  {{cbc_last ,cbc_open|cbc_filters}}&nbsp;%</button>
         </div>
      </div>
       
       <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">EGD/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{egd_volume}} EGD
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{egd_last}}</div>
              <div class="div8">¥ {{egd_amount}}</div>
            </div>
             <button @click="goDetail('EGD_FFC')" style="background:#24b36b"  v-show="egd_last>=egd_open">  +&nbsp;{{egd_last,egd_open|egd_filters}}&nbsp;%</button>
             <button @click="goDetail('EGD_FFC')" style="background:#f25c49"  v-show="egd_last<egd_open" >  {{egd_last ,egd_open|egd_filters}}&nbsp;%</button>
         </div>
      </div>

      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">FFTS/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{ffts_volume}} FFTS
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{ffts_last}}</div>
              <div class="div8">¥ {{ffts_amount}}</div>
            </div>
             <button  @click="goDetail('FFTS_FFC')" style="background:#24b36b"  v-show=" ffts_last>=ffts_open">  +&nbsp;{{ffts_last ,ffts_open|ffts_filters}}&nbsp;%</button>
             <button  @click="goDetail('FFTS_FFC')" style="background:#f25c49"  v-show="ffts_last<ffts_open" >  {{ffts_last ,ffts_open|ffts_filters}}&nbsp;%</button>
         </div>
      </div>

      <div class="div1">
          <div class="div2">
            <div>
              <div class="div3">
                <span class="span1">DNA/</span>
                <span class="span2">FFC</span>
              </div>
              <div  class="div4">
                交易量：{{dna_volume}} DNA
              </div>
            </div>
          </div>
         <div class="div5">
            <div class="div6">
              <div class="div7">{{dna_last}}</div>
              <div class="div8">¥ {{dna_amount}}</div>
            </div>
             <button @click="goDetail('DNA_FFC')"  style="background:#24b36b"  v-show=" dna_last>=dna_open">  +&nbsp;{{dna_last ,dna_open|dna_filters}}&nbsp;%</button>
             <button  @click="goDetail('DNA_FFC')" style="background:#f25c49"  v-show="dna_last<dna_open" >  {{dna_last ,dna_open|dna_filters}}&nbsp;%</button>
         </div>
      </div>
       
      </div>
   </div>
   <div v-if="tab === 'tab2'" >
    <div class="order_item-list-content-zone">
       <div class="div1">
            <div class="div2">
              <div>
                <div class="div3">
                  <span class="span1">OSC/</span>
                  <span class="span2">FFT</span>
                </div>
                <div  class="div4">
                  交易量：{{oscfft_volume}} OSC
                </div>
              </div>
            </div>
          <div class="div5">
              <div class="div6">
                <div class="div7">{{oscfft_last}}</div>
                <div class="div8">¥ {{oscfft_amount}}</div>
              </div>
              <button  @click="goDetail('OSC_FFT')"  style="background:#24b36b"  v-show=" oscfft_last>=oscfft_open">  +&nbsp;{{oscfft_last ,oscfft_open|oscfft_filters}}&nbsp;%</button>
              <button  @click="goDetail('OSC_FFT')"  style="background:#f25c49"  v-show="oscfft_last<oscfft_open" >  {{oscfft_last ,oscfft_open|oscfft_filters}}&nbsp;%</button>
          </div>
        </div>

       
        <div class="div1">
            <div class="div2">
              <div>
                <div class="div3">
                  <span class="span1">FFTS/</span>
                  <span class="span2">FFT</span>
                </div>
                <div  class="div4">
                  交易量：{{fftsfft_volume}} FFTS
                </div>
              </div>
            </div>
          <div class="div5">
              <div class="div6">
                <div class="div7">{{fftsfft_last}}</div>
                <div class="div8">¥ {{fftsfft_amount}}</div>
              </div>
              <button  @click="goDetail('FFTS_FFT')" style="background:#24b36b"  v-show=" fftsfft_last>=fftsfft_open">  +&nbsp;{{fftsfft_last ,fftsfft_open|fftsfft_filters}}&nbsp;%</button>
              <button  @click="goDetail('FFTS_FFT')" style="background:#f25c49"  v-show="fftsfft_last<fftsfft_open" >  {{fftsfft_last ,fftsfft_open|fftsfft_filters}}&nbsp;%</button>
          </div>
        </div>

        <div class="div1">
            <div class="div2">
              <div>
                <div class="div3">
                  <span class="span1">DNA/</span>
                  <span class="span2">FFT</span>
                </div>
                <div  class="div4">
                  交易量：{{dnafft_volume}} DNA
                </div>
              </div>
            </div>
          <div class="div5">
              <div class="div6">
                <div class="div7">{{dnafft_last}}</div>
                <div class="div8">¥ {{dnafft_amount}}</div>
              </div>
              <button  @click="goDetail('DNA_FFT')" style="background:#24b36b"  v-show=" dnafft_last>=dnafft_open">  +&nbsp;{{dnafft_last ,dnafft_open|dnafft_filters}}&nbsp;%</button>
              <button  @click="goDetail('DNA_FFT')" style="background:#f25c49"  v-show="dnafft_last<dnafft_open" >  {{dnafft_last ,dnafft_open|dnafft_filters}}&nbsp;%</button>
          </div>
        </div>
        <div class="div1">
            <div class="div2">
              <div>
                <div class="div3">
                  <span class="span1">EGD/</span>
                  <span class="span2">FFT</span>
                </div>
                <div  class="div4">
                  交易量：{{egdfft_volume}} EGD
                </div>
              </div>
            </div>
          <div class="div5">
              <div class="div6">
                <div class="div7">{{egdfft_last}}</div>
                <div class="div8">¥ {{egdfft_amount}}</div>
              </div>
              <button  @click="goDetail('EGD_FFT')"  style="background:#24b36b"  v-show=" egdfft_last>=egdfft_open">  +&nbsp;{{egdfft_last ,egdfft_open|egdfft_filters}}&nbsp;%</button>
              <button  @click="goDetail('EGD_FFT')"  style="background:#f25c49"  v-show="egdfft_last<egdfft_open" >  {{egdfft_last ,egdfft_open|egdfft_filters}}&nbsp;%</button>
          </div>
        </div>


    </div>
   </div>

</div>


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
import {
  CURRENCY_TO_CURRENCY,
  CLEAN_USER,
  SET_USER,
  SET_CRYPTO_CURRENCY
} from "../store/mutation-types";
import lib from "../utils/lib";
import store from "../store";

export default {
  name: "exchange",
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
      refresh_timer: null,
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
      EGD: 0,
      DGC: 0,
      CBC: 0,
      XDAG: 0,
      FFT: 0,
      ETH: 0,
      FFTS:0,
      DNA:0,
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
      osc_last: "",
      osc_open: 1,

      oscfft_amount: "",
      oscfft_buy: "",
      oscfft_high: "",
      oscfft_low: "",
      oscfft_sell: "",
      oscfft_volume: "",
      oscfft_last: "",
      oscfft_open: 1,

      ffts_amount: "",
      ffts_buy: "",
      ffts_high: "",
      ffts_low: "",
      ffts_sell: "",
      ffts_volume: "",
      ffts_last: "",
      ffts_open: 1,

      fftsfft_amount: "",
      fftsfft_buy: "",
      fftsfft_high: "",
      fftsfft_low: "",
      fftsfft_sell: "",
      fftsfft_volume: "",
      fftsfft_last: "",
      fftsfft_open: 1,

      dna_amount: "",
      dna_buy: "",
      dna_high: "",
      dna_low: "",
      dna_sell: "",
      dna_volume: "",
      dna_last: "",
      dna_open: 1,

      dnafft_amount: "",
      dnafft_buy: "",
      dnafft_high: "",
      dnafft_low: "",
      dnafft_sell: "",
      dnafft_volume: "",
      dnafft_last: "",
      dnafft_open: 1,


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
      xdag_last: "",
      xdag_open: 1,

      eth_amount: "",
      eth_buy: "",
      eth_high: "",
      eth_low: "",
      eth_sell: "",
      eth_volume: "",
      eth_last: "",
      eth_open: 1,

      cbc_amount: "",
      cbc_buy: "",
      cbc_high: "",
      cbc_low: "",
      cbc_sell: "",
      cbc_volume: "",
      cbc_last: "",
      cbc_open: 1,

      egdfft_amount: "",
      egdfft_buy: "",
      egdfft_high: "",
      egdfft_low: "",
      egdfft_sell: "",
      egdfft_volume: "",
      egdfft_last: "",
      egdfft_open: 1,

      egd_amount: "",
      egd_buy: "",
      egd_high: "",
      egd_low: "",
      egd_sell: "",
      egd_volume: "",
      egd_last: "",
      egd_open: 1,

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
      fft_last: "",
      fft_open: 1,
      isBatchListDialog: false,
      listRefreshTime: new Date().getTime(),
      listRefreshTime1: new Date().getTime(),

      dataFFC:[],
      dataFFT:[],
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
    oscfft_filters(last, oscfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == oscfft_open || oscfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(oscfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(oscfft_open)) /
        parseFloat(oscfft_open) *
        100
      ).toFixed(2);
    },
    ffts_filters(last, ffts_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == ffts_open || ffts_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(ffts_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(ffts_open)) /
        parseFloat(ffts_open) *
        100
      ).toFixed(2);
    },
    fftsfft_filters(last, fftsfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == fftsfft_open || fftsfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(fftsfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(fftsfft_open)) /
        parseFloat(fftsfft_open) *
        100
      ).toFixed(2);
    },

    dna_filters(last, dna_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dna_open || dna_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dna_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dna_open)) /
        parseFloat(dna_open) *
        100
      ).toFixed(2);
    },
    dnafft_filters(last, dnafft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == dnafft_open || dnafft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(dnafft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(dnafft_open)) /
        parseFloat(dnafft_open) *
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
    cbc_filters(last, cbc_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == cbc_open || cbc_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(cbc_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(cbc_open)) /
        parseFloat(cbc_open) *
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
    },
    egd_filters(last, egd_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == egd_open || egd_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(egd_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(egd_open)) /
        parseFloat(egd_open) *
        100
      ).toFixed(2);
    },
    egdfft_filters(last, egdfft_open) {
      if (undefined == last || last == "") return "0";
      if (undefined == egdfft_open || egdfft_open == "") return "0";
      if (parseFloat(last) <= 0) return "0";
      if (parseFloat(egdfft_open) <= 0) return "0";
      return (
        (parseFloat(last) - parseFloat(egdfft_open)) /
        parseFloat(egdfft_open) *
        100
      ).toFixed(2);
    }
  },
  created: function() {
   this.getTicker_list();
  },
  methods: {
    goDetail(currency_to_currency){
      this.$store.commit(CURRENCY_TO_CURRENCY, currency_to_currency);
       this.$router.push("/exchange");
     },
    close() {
      this.isPlaceOrder = false;
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
      this.$store.commit(CURRENCY_TO_CURRENCY, this.currency_to_currency);
      this.isBuyAutoPrice = true;
      this.isSellAutoPrice = true;
      if (this.isHistory) this.orderedHistory();
      if (this.isHistoryed) this.orderedHistoryed();
      if (this.isLastTrade) this.latestTraded();
      this.getExchangeDepth();
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
      this.getTicker_list();
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
   
    getTicker_list() {
      var currentTab = 'FFC'; 
       if(this.tab=='tab2'){
          currentTab = 'FFT'
       }
      market
        .ticker_list(currentTab)
        .then(data => {
          // this.ticker_timer1 = setTimeout(this.getTicker_list, 5000);

          if(currentTab=='FFT'){
            //  this.dataFFT =data.data.tickers;

              let OSC_FFT = data.data.tickers.OSC_FFT;
              this.oscfft_amount = OSC_FFT.amount.toFixed(2);
              this.oscfft_buy = OSC_FFT.buy.toFixed(4);
              this.oscfft_high = OSC_FFT.high.toFixed(4);
              this.oscfft_low = OSC_FFT.low.toFixed(4);
              this.oscfft_sell = OSC_FFT.sell.toFixed(4);
              this.oscfft_volume = OSC_FFT.volume.toFixed(2);
              this.oscfft_last = OSC_FFT.last.toFixed(4);
              this.oscfft_open = OSC_FFT.open.toFixed(4);

              let EGD_FFT = data.data.tickers.EGD_FFT;
              this.egdfft_amount = EGD_FFT.amount.toFixed(2);
              this.egdfft_buy = EGD_FFT.buy.toFixed(4);
              this.egdfft_high = EGD_FFT.high.toFixed(4);
              this.egdfft_low = EGD_FFT.low.toFixed(4);
              this.egdfft_sell = EGD_FFT.sell.toFixed(4);
              this.egdfft_volume = EGD_FFT.volume.toFixed(2);
              this.egdfft_last = EGD_FFT.last.toFixed(4);
              this.egdfft_open = EGD_FFT.open.toFixed(4);

              let FFTS_FFT = data.data.tickers.FFTS_FFT;
              this.fftsfft_amount = FFTS_FFT.amount.toFixed(2);
              this.fftsfft_buy = FFTS_FFT.buy.toFixed(4);
              this.fftsfft_high = FFTS_FFT.high.toFixed(4);
              this.fftsfft_low = FFTS_FFT.low.toFixed(4);
              this.fftsfft_sell = FFTS_FFT.sell.toFixed(4);
              this.fftsfft_volume = FFTS_FFT.volume.toFixed(2);
              this.fftsfft_last = FFTS_FFT.last.toFixed(4);
              this.fftsfft_open = FFTS_FFT.open.toFixed(4);

              let DNA_FFT = data.data.tickers.DNA_FFT;
              this.dnafft_amount = DNA_FFT.amount.toFixed(2);
              this.dnafft_buy = DNA_FFT.buy.toFixed(4);
              this.dnafft_high = DNA_FFT.high.toFixed(4);
              this.dnafft_low = DNA_FFT.low.toFixed(4);
              this.dnafft_sell = DNA_FFT.sell.toFixed(4);
              this.dnafft_volume = DNA_FFT.volume.toFixed(2);
              this.dnafft_last = DNA_FFT.last.toFixed(4);
              this.dnafft_open = DNA_FFT.open.toFixed(4);

             
          }else{
            this.dataFFC =data.data.tickers;
          }


          let OSC_FFC = data.data.tickers.OSC_FFC;
          this.osc_amount = OSC_FFC.amount.toFixed(2);
          this.osc_buy = OSC_FFC.buy.toFixed(3);
          this.osc_high = OSC_FFC.high.toFixed(3);
          this.osc_low = OSC_FFC.low.toFixed(3);
          this.osc_sell = OSC_FFC.sell.toFixed(3);
          this.osc_volume = OSC_FFC.volume.toFixed(2);
          this.osc_last = OSC_FFC.last.toFixed(3);
          this.osc_open = OSC_FFC.open.toFixed(3);

         

          let EGD_FFC = data.data.tickers.EGD_FFC;
          this.egd_amount = EGD_FFC.amount.toFixed(2);
          this.egd_buy = EGD_FFC.buy.toFixed(3);
          this.egd_high = EGD_FFC.high.toFixed(3);
          this.egd_low = EGD_FFC.low.toFixed(3);
          this.egd_sell = EGD_FFC.sell.toFixed(3);
          this.egd_volume = EGD_FFC.volume.toFixed(2);
          this.egd_last = EGD_FFC.last.toFixed(3);
          this.egd_open = EGD_FFC.open.toFixed(3);

          

          let FFTS_FFC = data.data.tickers.FFTS_FFC;
          this.ffts_amount = FFTS_FFC.amount.toFixed(2);
          this.ffts_buy = FFTS_FFC.buy.toFixed(3);
          this.ffts_high = FFTS_FFC.high.toFixed(3);
          this.ffts_low = FFTS_FFC.low.toFixed(3);
          this.ffts_sell = FFTS_FFC.sell.toFixed(3);
          this.ffts_volume = FFTS_FFC.volume.toFixed(2);
          this.ffts_last = FFTS_FFC.last.toFixed(4);
          this.ffts_open = FFTS_FFC.open.toFixed(3);

          





          let DNA_FFC = data.data.tickers.DNA_FFC;
          this.dna_amount = DNA_FFC.amount.toFixed(2);
          this.dna_buy = DNA_FFC.buy.toFixed(3);
          this.dna_high = DNA_FFC.high.toFixed(3);
          this.dna_low = DNA_FFC.low.toFixed(3);
          this.dna_sell = DNA_FFC.sell.toFixed(3);
          this.dna_volume = DNA_FFC.volume.toFixed(2);
          this.dna_last = DNA_FFC.last.toFixed(4);
          this.dna_open = DNA_FFC.open.toFixed(3);

          



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

          let CBC_FFC = data.data.tickers.CBC_FFC;
          this.cbc_amount = CBC_FFC.amount.toFixed(2);
          this.cbc_buy = CBC_FFC.buy.toFixed(3);
          this.cbc_high = CBC_FFC.high.toFixed(3);
          this.cbc_low = CBC_FFC.low.toFixed(3);
          this.cbc_sell = CBC_FFC.sell.toFixed(3);
          this.cbc_volume = CBC_FFC.volume.toFixed(2);
          this.cbc_last = CBC_FFC.last.toFixed(3);
          this.cbc_open = CBC_FFC.open.toFixed(3);
        })
        .catch(e => {});
    }
  },

  beforeDestroy: function() {
    if (this.refresh_timer != null) {
      window.clearInterval(this.refresh_timer);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/exchangeList.scss";
</style>

