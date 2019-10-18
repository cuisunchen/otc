<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      
      <div class="center" >{{title}}</div>
      <div class="left" @click="goBack" />
    </div>
    <!--中间start-->
    <div class="publish-ad">
      <div class="publish-trade-tip-item">
         <span class="span-left" @click="publishTip">{{$t('Trade.Publish.ad_set')}}</span><img  src='../assets/image/icon_question.svg'  @click="publishTip">
         <span class="span-right" @click="my_ad">{{$t('Trade.Publish.ads')}}</span>
      </div>
      <div class="publish-trade-type-item">
        <span>{{$t('Trade.Publish.tradeType')}}</span>
        <div>
          <mu-radio  name="anchorHorizontal"  nativeValue="false" :label="$t('Trade.Filter.Sell')"  value="false"  v-model="tradeType"   class="mu-radio" />
          <mu-radio  name="anchorHorizontal" nativeValue="true"  :label="$t('Trade.Filter.Buy')"   value="true" v-model="tradeType" />
        </div>
      </div>
      <!-- <div class="publish-trade-price-currency-item" v-show="is_market_price=='false'" >
              <span>数字货币</span>
              <div>{{publishCryptoCurrency}} {{$t('Basic.'+publishCryptoCurrency)}}</div> 
      </div> -->
      <div class="publish-trade-currency-item">
        <span>{{$t('Trade.Publish.Digital_currency')}}</span>
        <mu-select-field v-model="publishTradeCurrency" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow" >
          <mu-menu-item value="CNY" title="CNY 人民币"/>
          <mu-menu-item value="USD" title="USD 美元"/>
          <mu-menu-item value="KRW" title="KRW 韩元"/>
          <mu-menu-item value="JPY" title="JPY 日元"/>
        </mu-select-field>
      </div>
       <div class="hint-zone">
        <p>{{$t('Trade.Publish.balance')}}{{balance}} {{publishCryptoCurrency}} <span v-show="balance<online_account_limit" style="float:right">{{publishAdShowTip}}</span></p>
      </div>
      <div class="hint-zone">
       <div v-show="publishCryptoCurrency!='OSC' && publishCryptoCurrency!='DGC'&& publishCryptoCurrency!='CBC'&& publishCryptoCurrency!='LBTC'&& publishCryptoCurrency!='XDAG'&& publishCryptoCurrency!='FFC'" >
            <div class="publish-trade-price-type-item" >
              <span>{{$t('Trade.Publish.Pricing_way')}}</span>
              <div>
                <mu-radio :class="{activeRadio:is_market_price=='false'}"  name="anchorAutoChangePrice" nativeValue="false" :label="$t('Trade.Publish.AutomaticPrice')"   value="false"  v-model="is_market_price"   class="mu-radio" />
                <mu-radio :class="{activeRadio:is_market_price=='true'}" name="anchorAutoChangePrice" nativeValue="true" :label="$t('Trade.Publish.FixedPrice')"  value="true"   v-model="is_market_price" />
              </div>
            </div>
            <div class="publish-trade-price-currency-item" v-show="is_market_price=='false'" >
              <span>{{$t('Trade.Publish.tradePrice')}}</span>
              <div>{{autoPriceValue}} {{publishTradeCurrency}}</div>
            </div>
            <div class="publish-safe-price-currency-item"  v-show="is_market_price=='false'" >
              <span v-html="$t('Trade.Publish.marginPrice')"></span>
              <mu-auto-complete v-model.trim="margin"  :hintText="$t('Trade.Publish.marginPriceHint')"  fullWidth @focus="input_focus('margin')" @keyup.native="check_margin()"  :errorText="margin_error" class="mu-text-field-input"></mu-auto-complete>
            </div>
       </div>
      </div>

      <div class="publish-safe-price-currency-item1" v-show="tradeType=='true'">
       <span>{{is_market_price=='false'?$t('Trade.Publish.protectPrice'):$t('Trade.Publish.tradePrice')}}</span>
        <mu-auto-complete v-model.trim="price"   :hintText="is_market_price=='false'? $t('Trade.Publish.protectPriceHint1'):$t('Trade.Publish.protectPriceHint1_1')" fullWidth @focus="input_focus('price')" @keyup.native="check_price()" :errorText="price_error" class="mu-text-field-input"></mu-auto-complete>
        <img src="../assets/image/icon_question.svg"  class='img-right-question1' @click="showAdProtectPrice" v-show="is_market_price=='false'">
      </div>
      <div class="publish-safe-price-currency-item1" v-show="tradeType=='false'">
        <span>{{is_market_price=='false'?$t('Trade.Publish.protectPrice'):$t('Trade.Publish.tradePrice')}}</span>
        <mu-auto-complete v-model.trim="price"  :hintText="is_market_price=='false'? $t('Trade.Publish.protectPriceHint2'): $t('Trade.Publish.protectPriceHint2_2')"  fullWidth @focus="input_focus('price')" @keyup.native="check_price()" :errorText="price_error" class="mu-text-field-input"></mu-auto-complete>
        <img src="../assets/image/icon_question.svg"  class='img-right-question1' @click="showAdProtectPrice"  v-show="is_market_price=='false'">
      </div>
      <div class="hint-zone-big">
       <div class="publish-safe-price-currency-item">
        <span>{{$t('Trade.Publish.minimumLimit')}}</span>
        <mu-auto-complete v-model.trim="min_qty" :hintText="$t('Trade.Publish.minimumLimitHint')" fullWidth @focus="input_focus('min_qty')"  
         :errorText="min_qty_error" class="mu-text-field-input"      @input="change_ad_qty($event)"></mu-auto-complete>
      <p class="hint-bottom-font">{{min_qty_tip1}}</p>
      </div>
      <div class="publish-safe-price-currency-item">
        <span>{{$t('Trade.Publish.maximumLimit')}}</span>
        <mu-auto-complete v-model.trim="max_qty"   :hintText="$t('Trade.Publish.maximumLimitHint')" fullWidth @focus="input_focus('max_qty')"   :errorText="max_qty_error" class="mu-text-field-input"></mu-auto-complete>
      <p class="hint-bottom-font" v-show="false">{{max_qty_tip}}</p>
      </div>
      
      <div class="publish-safe-price-currency-item"  v-show="tradeType == 'true'">
        <span>{{$t('Trade.Publish.BuyLimit')}}</span>
        <mu-auto-complete v-model.trim="limit_qty"  :hintText="$t('Trade.Publish.BuyLimitHint')" fullWidth @focus="input_focus('limit_qty')"  :errorText="limit_qty_error" class="mu-text-field-input"></mu-auto-complete>
      <p class="hint-bottom-font" v-show="false">{{limit_qty_buy_tip}}</p>
          <img src="../assets/image/icon_question.svg"  class='img-right-question'  @click="showAdTrade">
      </div>
      <div class="publish-safe-price-currency-item"  v-show="tradeType == 'false'">
        <span>{{$t('Trade.Publish.SellLimit')}}</span>
        <mu-auto-complete v-model.trim="limit_qty"  :hintText="$t('Trade.Publish.SellLimitHint')" fullWidth @focus="input_focus('limit_qty')"   :errorText="limit_qty_error" class="mu-text-field-input"></mu-auto-complete>
      <p class="hint-bottom-font" v-show="false">{{limit_qty_sell_tip}}</p> 
          <img src="../assets/image/icon_question.svg"  class='img-right-question' @click="showAdTrade">
      </div>
      </div>

      <!-- <p class="publish-item-p" v-show="false">{{isAutoTaken=='true'?'自动接单，对方拍下时将立马启动交易':'手动接单，需要您在订单中确认接单才会启动交易'}}</p> -->
      <!-- <p v-show="isAutoTaken=='true'" class="publish-item-p"></p> -->
     
      <!-- <div class="publish-auto-taken-item"  v-show="false">
        <span>接单设置</span>
        <div>
          <mu-radio  name="anchorAutoTaken"  nativeValue="false" label="手动接单" value="false"  v-model="isAutoTaken"   class="mu-radio" />
          <mu-radio  name="anchorAutoTaken" nativeValue="true" label="自动接单"  value="true"   v-model="isAutoTaken" />
        </div>
      </div> -->

      <div class="publish-pay-item">
         <p>{{$t('Trade.Publish.transferringMeth')}}</p>
        <div>
              <!-- <img src="../assets/image/ffc_icon.png" @click="ffcpay"  v-show="publishCryptoCurrency!='FFC'"> -->
                <i :class="{img_n:!isFfcpay, img_p:isFfcpay}"  @click="ffcpay"   v-show="publishCryptoCurrency!='FFC'"></i>

            <!-- <img src="../assets/image/icon_alipay.png" @click="alipay"> -->
            <i :class="{img_n:!isAlipay, img_p:isAlipay}"  @click="alipay" ></i>

            <!-- <img src="../assets/image/icon_wechat.png"> -->
            <i :class="{img_n:!isWeChat, img_p:isWeChat}"  @click="wechat" ></i>
            
            <!-- <img src="../assets/image/icon_bank.png"> -->
            <i :class="{img_n:!isBank, img_p:isBank}"  @click="bank" ></i>

        </div>
         <mu-raised-button  :label="$t('Trade.Publish.publish')"  @click="onSubmit" class="btn" fullWidth primary/>
         <p style="text-align: left; font-size: 1em; color: #404040; margin-bottom: 0px;padding-bottom: 0.3em;padding-top: 0.2em;margin-top:1.5em;">{{$t('Trade.Publish.AdvertisingTips36')}}</p>
            <div style="text-align: left; font-size: 0.8em; color: #808080;"  v-show="tradeType=='false'"  v-html=" $t('Trade.Publish.AdvertisingTips34')">
        
            </div>
            <div style="text-align: left; font-size: 0.8em; color: #808080;"  v-show="tradeType=='true'" v-html=" $t('Trade.Publish.AdvertisingTips35')">
            </div>
      </div>
    </div>
   <mu-dialog :open="isPublishTipDialog" :title="$t('Trade.Publish.AdvertisingTips')" >
       <div  style="color:#404040;font-size:1em;">
            1、<span style="color:#0A2463">{{publishCryptoCurrency}}</span> 广告费：<span style="color:#0A2463">免费</span><br>
            2、<span style="color:#0A2463">{{publishCryptoCurrency}}</span> 成交手续费：<span style="color:#0A2463">{{trade_fee_rate|fee}}%</span><br>
            3、账户余额最少需要有 <span style="color:#0A2463">{{online_account_limit}}  {{publishCryptoCurrency}} </span>，不足将自动下架<br>
            <span v-show="tradeType=='true'" style="color:#0A2463">4、取消订单将自动下架广告  </span>    
            <span v-show="tradeType=='false'" style="color:#0A2463">4、最小数量 小于账户余额-成交手续费，可发布成功但不显示</span> <br>    
            5、累计购买或出售数量达到后，。
          </div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>
  <mu-dialog :open="isSignInDialog"  :title="$t('Trade.Publish.AdvertisingTips5')"  >
      {{$t('Trade.Publish.AdvertisingTips3')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="signIn"  :label="$t('Trade.Publish.AdvertisingTips6')" />
  </mu-dialog>
  <mu-dialog :open="isPublishDialog"  :title="$t('Trade.Publish.AdvertisingTips')">
      <!-- {{$t('Trade.Publish.AdvertisingTips4')}} -->
         <div v-show="tradeType=='true'" style="color:#404040;font-size:1em;">
          请确认是否以 <span style="color:#0A2463">{{price}}</span> {{publishTradeCurrency}} 的单价<span style="color:#0A2463">购买 {{limit_qty}} {{publishCryptoCurrency}}</span>
          </div>
          <div v-show="tradeType=='false'" style="color:#404040;font-size:1em;">
          请确认是否以 <span style="color:#0A2463">{{price}}</span> {{publishTradeCurrency}} 的单价<span style="color:#0A2463">出售 {{limit_qty}} {{publishCryptoCurrency}}</span>
          </div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="commit" :label="$t('Trade.Publish.publish')"/>
  </mu-dialog>
  <mu-dialog :open="isBoundAdDialog"  :title="$t('Trade.Publish.AdvertisingTips')">
          {{pay_error}}
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
            <mu-flat-button slot="actions" primary @click="pay_bound" :label="$t('Trade.Publish.AdvertisingTips27')"/>
  </mu-dialog>
  <mu-dialog :open="isAdTradeTotalDialog"  :title="tradeType=='false'?$t('Trade.Publish.SellLimit'):$t('Trade.Publish.BuyLimit')">   
            <div v-show="tradeType!='false'">{{$t('Trade.Publish.AdvertisingTips28')}}</div>
            <div v-show="tradeType=='false'">{{$t('Trade.Publish.AdvertisingTips29')}}</div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>

      <mu-dialog :open="isAdProtectPriceDialog"  :title="$t('Trade.Publish.protectPrice')">   
            <div v-show="tradeType=='false'">{{$t('Trade.Publish.AdvertisingTips30')}}</div>
            <div v-show="tradeType!='false'">{{$t('Trade.Publish.AdvertisingTips31')}}</div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>
  </div>
</template>

<script>
import nprogress from "nprogress";
import trade from "../models/trade";
import store from "../store";
import storage from "../models/storage";
import market from "../models/market";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "ad_edit",
  components: {},
  data() {
    return {
      selected: "",
      toast: false,
      message: "",
      title: "",
      balance: "",
      is_trading: false,
      open: false,
      tradeType: "false",
      id: this.$route.params.id,
      publishCryptoCurrency: this.$route.params.crypto_currency.toUpperCase(),
      publishTradeCurrency: "CNY",
      isFfcpay: true,
      isAlipay: false,
      isWeChat: false,
      isBank: false,
      isAutoTaken: "true",
      is_market_price: "true",
      isPublishTipDialog: false,
      isSignInDialog: false,
      isPublishDialog: false,
      autoPriceValue: "",
      trade_fee_rate: "",
      online_account_limit: "",
      normalprice: "",
      margin_error: "",
      price_error: "",
      min_qty_error: "",
      max_qty_error: "",
      limit_qty_error: "",
      margin: "",
      price: "",
      min_qty: "",
      max_qty: "",
      limit_qty: "",
      max_qty_tip: "", //发布广告账户最少需要 {{online_account_limit}} {{publishCryptoCurrency}}
      min_qty_tip: "",
      limit_qty_buy_tip: this.$t("Trade.Publish.AdvertisingTips18"),
      limit_qty_sell_tip: this.$t("Trade.Publish.AdvertisingTips19"),
      isBoundAdDialog: false,
      pay_error: "",
      publishAdShowTip: "", //发布广告
      isAdTradeTotalDialog: false,
      isAdProtectPriceDialog: false,
      min_qty_tip1: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    let id = parseInt(to.params.id);
    let crypto_currency = to.params.crypto_currency.toUpperCase();
    Promise.all([
      trade.getPublishRestriction(crypto_currency),
      market.get(id, crypto_currency)
    ])
      .then(values => {
        next(vm => {
          let online_account_limit = values[0].data.online_account_limit;
          vm.balance = values[0].data.balance;
          vm.online_account_limit = online_account_limit;
          vm.trade_fee_rate = values[0].data.trade_fee_rate;
          vm.publishAdShowTip =
            "大于 " +
            vm.online_account_limit +
            " " +
            crypto_currency +
            " 才显示广告";
          // vm.form.crypto_currency = crypto_currency
          vm.isAlipay = values[0].data.alipay_on;
          vm.isWeChat = values[0].data.wechat_pay_on;
          vm.isBank = values[0].data.bankcard_on;
          let ad = values[1].data.ad;
          vm.id = ad.id;
          vm.tradeType = ad.is_buy + "";
          vm.is_market_price = !ad.is_market_price + "";
          vm.max_qty = ad.max_qty + "";
          vm.limit_qty = ad.limit_qty + "";
          vm.min_qty = ad.min_qty + "";
          vm.price = ad.price + "";
          // vm.autoPriceValue = ad.magprice
          if (ad.is_market_price) {
            vm.margin = ad.margin + "";
          } else {
            vm.max_qty_tip =
              ad.trade_currency + " " + (vm.price * ad.max_qty).toFixed(3);
            vm.min_qty_tip =
              ad.trade_currency + " " + (vm.price * ad.min_qty).toFixed(3);
          }

          if (ad.is_buy) {
            vm.title =
              vm.$t("Trade.Publish.AdvertisingTips22") + crypto_currency;
          } else {
            vm.title =
              vm.$t("Trade.Publish.AdvertisingTips23") + crypto_currency;
          }
          vm.publishTradeCurrency = ad.trade_currency;
          vm.publishCryptoCurrency = crypto_currency;
          vm.isAlipay = ad.alipay_on;
          vm.isWeChat = ad.wechat_pay_on;
          vm.isBank = ad.bankcard_on;
          vm.isAutoTaken = ad.is_auto_taken + "";
          if (
            crypto_currency == "BTC" ||
            crypto_currency == "ETH" ||
            crypto_currency == "LTC"
          )
            trade
              .getMarketPrice(crypto_currency, ad.trade_currency)
              .then(result => {
                vm.normalprice = result.data.price;
                vm.autoPriceValue = result.data.price;
                if (ad.is_market_price) {
                  vm.autoPriceValue = (
                    (vm.margin * 0.01 + 1) *
                    vm.normalprice
                  ).toFixed(3);
                  vm.max_qty_tip =
                    ad.trade_currency +
                    " " +
                    (vm.autoPriceValue * ad.max_qty).toFixed(3);
                  vm.min_qty_tip =
                    ad.trade_currency +
                    " " +
                    (vm.autoPriceValue * ad.min_qty).toFixed(3);
                }
              });
          nprogress.done();
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    fee: function(trade_fee_rate) {
      if (undefined === trade_fee_rate) return "";
      return parseFloat(parseFloat(trade_fee_rate * 100).toFixed(3));
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    my_ad() {
      this.$router.push("/ads");
    },
    closeDialog() {
      this.isPublishTipDialog = false;
      this.isSignInDialog = false;
      this.isPublishDialog = false;
      this.isBoundAdDialog = false;
      this.isAdTradeTotalDialog = false;
      this.isAdProtectPriceDialog = false;
    },
    showAdTrade() {
      this.isAdTradeTotalDialog = true;
    },
    showAdProtectPrice() {
      this.isAdProtectPriceDialog = true;
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
    pay_bound() {
      this.isBoundAdDialog = false;
      this.$router.push("/pay");
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
    ffcpay() {
      this.isFfcpay = !this.isFfcpay;
    },
    alipay() {
      this.isAlipay = !this.isAlipay;
    },
    wechat() {
      this.isWeChat = !this.isWeChat;
    },
    bank() {
      this.isBank = !this.isBank;
    },
    publishTip() {
      this.isPublishTipDialog = true;
    },
    signIn() {
      this.$router.push("/sign_in");
      this.isSignInDialog = false;
    },
    set_active: function(selected) {
      this.selected = selected;
    },
    input_focus: function(selected) {
      this.set_active(selected);
      if (selected === "margin") {
        this.margin_error = "";
      }

      if (selected === "price") {
        this.price_error = "";
      }

      if (selected === "min_limit") {
        this.min_limit_error = "";
      }

      if (selected === "max_limit") {
        this.max_limit_error = "";
      }

      if (selected === "limit_qty") {
        this.limit_qty_error = "";
      }
    },
    check_margin() {
      if (this.margin <= 30 && this.margin >= -30) {
        this.autoPriceValue = (
          (this.margin * 0.01 + 1) *
          this.normalprice
        ).toFixed(3);
        this.margin_error = "";
      } else {
        this.autoPriceValue = this.normalprice;
        this.margin_error = " ";
      }
    },
    check_price() {
      // console.log('this.price = '+this.price)
      if (!isNaN(parseInt(this.price))) {
        // this.price = lib.toFixed(parseFloat(this.price), 3)
        // if( this.publishTradeCurrency == 'CNY' && !isNaN(this.price) && parseFloat(this.price) * parseFloat(this.max_qty) >= 50000){
        //     // this.price_error = this.$t('Trade.Buy.TradeCurrencyLimit')  +"：50000 CNY"
        //     return false
        // }
        if (parseFloat(this.price) <= 0) {
          this.price_error = "  "; //this.$t('Trade.Publish.AdvertisingTips17')
          return false;
        }
        return true;
      } else {
        this.price_error = "  "; // this.$t('Trade.Publish.AdvertisingTips17')
        return false;
      }
    },
    change_ad_qty: function(e) {
      this.min_qty_tip1 = "";
      if (this.tradeType == "false") {
        var minValue = (
          parseFloat(this.balance) *
          (1 - parseFloat(this.trade_fee_rate))
        ).toFixed(8);
        if (minValue == 0.0) {
          this.min_qty_tip1 =
            "账户余额为 " +
            minValue +
            " " +
            this.publishCryptoCurrency +
            "，请先充值。";
          return;
        }
        if (parseFloat(this.min_qty) > minValue) {
          // this.showToast();
          this.min_qty_tip1 =
            "最小限额需要小于 " +
            minValue +
            " " +
            this.publishCryptoCurrency +
            "，否则将不展示。";
        }
      }
    },
    check_min_qty() {
      if (!isNaN(parseInt(this.min_qty))) {
        if (
          !isNaN(parseFloat(this.max_qty)) &&
          this.max_qty > 0 &&
          parseFloat(this.min_qty) > parseFloat(this.max_qty)
        ) {
          // this.min_qty_tip = ' '
          this.min_qty_tip = this.$t("Trade.Publish.AdvertisingTips15");
          // this.showToast(this.$t('Trade.Publish.AdvertisingTips15'));
          return false;
        }
        // if(parseFloat(this.online_account_limit)>parseFloat(this.min_qty) ){
        //   this.min_qty_tip = this.$t('Trade.Publish.AdvertisingTips14')+ this.online_account_limit+' '+this.publishCryptoCurrency
        //   // this.showToast(this.$t('Trade.Publish.AdvertisingTips14')+ this.online_account_limit+' '+this.publishCryptoCurrency);
        //   return false
        // }
        if (this.is_market_price == "true") {
          //固定价格
          if (this.price > 0 && this.min_qty > 0) {
            this.min_qty_tip =
              this.publishTradeCurrency +
              " " +
              (this.price * this.min_qty).toFixed(3);
            return true;
          } else {
            // this.min_qty_tip = this.$t('Trade.Publish.AdvertisingTips14')+ this.online_account_limit +' '+ this.publishCryptoCurrency;
            // this.showToast(this.min_qty_tip );
            this.min_qty_tip = this.$t("Trade.Publish.minimumLimitError");
            return false;
          }
        } else {
          if (this.autoPriceValue > 0 && this.min_qty > 0) {
            this.min_qty_tip =
              this.publishTradeCurrency +
              " " +
              (this.autoPriceValue * this.min_qty).toFixed(3);
            return true;
          } else {
            // this.min_qty_tip =this.$t('Trade.Publish.AdvertisingTips14')+ this.online_account_limit +' '+ this.publishCryptoCurrency;
            // this.showToast(this.min_qty_tip );
            this.min_qty_tip = this.$t("Trade.Publish.minimumLimitError");
            return false;
          }
        }
      }
      this.min_qty_tip = this.$t("Trade.Publish.minimumLimitHint");
      return false;
    },
    check_max_qty() {
      if (!isNaN(parseInt(this.max_qty))) {
        if (this.is_market_price == "true") {
          //固定价格
          if (parseFloat(this.price) > 0 && parseFloat(this.max_qty) > 0) {
            this.max_qty_tip =
              this.publishTradeCurrency +
              " " +
              (this.price * this.max_qty).toFixed(3);
            return true;
          } else {
            this.max_qty_tip = this.$t("Trade.Publish.maximumLimitError");
            // this.showToast(this.max_qty_tip );
            return false;
          }
        } else {
          if (this.autoPriceValue > 0 && this.max_qty > 0) {
            this.max_qty_tip =
              this.publishTradeCurrency +
              " " +
              (this.autoPriceValue * this.max_qty).toFixed(3);
            return true;
          } else {
            this.max_qty_tip = this.$t("Trade.Publish.maximumLimitError");
            // this.showToast(this.max_qty_tip );
            return false;
          }
        }
      } else {
        this.max_qty_tip = this.$t("Trade.Publish.maximumLimitHint");
        return false;
      }
    },
    check_limit_qty() {
      if (!isNaN(parseInt(this.limit_qty))) {
        if (parseFloat(this.limit_qty) < parseFloat(this.max_qty)) {
          this.limit_qty_error = " ";
          if (this.tradeType == "true") {
            this.showToast(this.$t("Trade.Publish.AdvertisingTips11"));
          } else {
            this.showToast(this.$t("Trade.Publish.AdvertisingTips12"));
          }
          return false;
        }
        if (parseFloat(this.limit_qty) > 0) {
          this.limit_qty_error = "";
          return true;
        } else {
          if (this.tradeType == "true") {
            this.showToast(this.$t("Trade.Publish.AdvertisingTips10"));
          } else {
            this.showToast(this.$t("Trade.Publish.AdvertisingTips9"));
          }
          this.limit_qty_error = " ";
          return false;
        }
      } else {
        if (this.tradeType == "true") {
          this.showToast(this.$t("Trade.Publish.AdvertisingTips10"));
        } else {
          this.showToast(this.$t("Trade.Publish.AdvertisingTips9"));
        }
        this.limit_qty_error = " ";
        return false;
      }
    },
    check_payment_method() {
      if (
        this.publishCryptoCurrency == "FFC" &&
        (this.isAlipay || this.isWeChat || this.isBank)
      ) {
        return true;
      } else if (
        this.publishCryptoCurrency != "FFC" &&
        (this.isFfcpay || this.isAlipay || this.isWeChat || this.isBank)
      ) {
        return true;
      } else {
        this.showToast(this.$t("Trade.Publish.AdvertisingTips7"));
      }
      return false;
    },
    onSubmit: function() {
      if (this.is_market_price == "false")
        if (this.margin > 30 || this.margin < -30) {
          this.margin_error = " ";
          this.showToast(this.$t("Trade.Publish.AdvertisingTips8"));
          return false;
        }
      if (
        this.publishCryptoCurrency == "OSC" ||
        this.publishCryptoCurrency == "DGC" ||
        this.publishCryptoCurrency == "LBTC" ||
        this.publishCryptoCurrency == "XDAG" ||
        this.publishCryptoCurrency == "CBC" ||
        this.publishCryptoCurrency == "FFC"
      ) {
        this.margin = "0";
      }
      if (!this.check_price()) {
        this.showToast(this.$t("Trade.Publish.AdvertisingTips17"));
        return;
      }
      if (!this.check_min_qty()) {
        this.showToast(this.min_qty_tip);
        return;
      }
      if (this.tradeType == "false") {
        var minValue = (
          parseFloat(this.balance) *
          (1 - parseFloat(this.trade_fee_rate))
        ).toFixed(8);
        if (parseFloat(this.min_qty) > minValue) {
          this.showToast(
            "最小限额需要小于 " +
              minValue +
              " " +
              this.publishCryptoCurrency +
              "，否则将不展示。"
          );
          // return
        }
      }
      if (!this.check_max_qty()) {
        this.showToast(this.max_qty_tip);
        return;
      }
      let limit = parseFloat(this.online_account_limit) / 2;
      if (parseFloat(this.max_qty) < limit) {
        this.showToast(
          this.$t("Trade.Publish.AdvertisingTips24") +
            limit +
            " " +
            this.publishCryptoCurrency
        );
        return;
      }
      if (this.tradeType == "false")
        if (parseFloat(this.balance) < parseFloat(this.limit_qty)) {
          this.showToast("超出可出售余额");
          return;
        }
      if (this.check_payment_method() && this.check_limit_qty()) {
        this.isPublishDialog = true;
      }
    },
    commit() {
      this.isPublishDialog = false;
      let isMarketPrice = false;
      if (this.is_market_price == "false") {
        isMarketPrice = true;
      }
      if (
        this.publishCryptoCurrency == "OSC" ||
        this.publishCryptoCurrency == "DGC" ||
        this.publishCryptoCurrency == "XDAG" ||
        this.publishCryptoCurrency == "CBC" ||
        this.publishCryptoCurrency == "FFC"
      ) {
        this.min_qty = parseFloat(this.min_qty).toFixed(3);
        this.max_qty = parseFloat(this.max_qty).toFixed(3);
      }
      market
        .edit(
          this.id,
          this.publishCryptoCurrency,
          this.publishTradeCurrency,
          this.tradeType,
          isMarketPrice,
          this.price,
          this.margin,
          this.min_qty,
          this.max_qty,
          "",
          false,
          this.isAlipay,
          this.isBank,
          "90",
          this.isWeChat,
          this.isAutoTaken,
          this.limit_qty,
          this.isFfcpay
        )
        .then(result => {
          this.showToast(this.$t("Publish.SuccessContent"));
          setTimeout(() => {
            this.$router.go(-1);
          }, 2000);
        })
        .catch(e => {
          if (e.code == 1028) {
            this.pay_error = "银行卡未绑定,前去绑定。";
            this.isBoundAdDialog = true;
            return;
          } else if (e.code == 1029) {
            this.pay_error = "支付宝未绑定,前去绑定。";
            this.isBoundAdDialog = true;
            return;
          } else if (e.code == 1030) {
            this.pay_error = "微信支付未绑定,前去绑定。";
            this.isBoundAdDialog = true;
            return;
          } else if (e.code == 1031) {
            this.pay_error = "请绑定支付方式,前去绑定。";
            this.isBoundAdDialog = true;
            return;
          }
          this.showToast(HttpResultCode.validate(e.code));
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/ad_edit.scss";
</style>
