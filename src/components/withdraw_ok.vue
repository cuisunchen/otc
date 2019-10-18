<template>
  <div class="content-withdraw-ok">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
        <div class="top">
          <div class="center">{{$t('Text.withdraw')}} </div>
          <div class="left" @click="goBack"></div>
        </div> 
   
        <div style="width: 100%; height: 18em;margin: 0 auto;background:#ffffff;">
          <img style="width: 5em;height: 5em;margin:5em auto 1em auto; " src="../assets/image/publish_ok.png"/>
          <div style="color: #212B67;font-size: 1.2em;"> 
            {{$t('Text.txsq')}}
          </div>
          <div style="color: #212B67;font-size: 1em;"> 
            {{$t('Text.txsqxq')}}
          </div>
        
        </div>

   <div style="width:100%;height:100%;background:#F3F5F7">

      <mu-raised-button style="margin-top:2em;"  :label="$t('Text.goIndex')" @click="goBack" class="btn" fullWidth primary/>
   </div>
        
       
  




      
        <!--中间end-->
    

  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
import trade from "../models/trade";
import store from "../store";
import storage from "../models/storage";
import user from "../models/user";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import Clipboard from "clipboard";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "publish_ok",
  components: { BottomNav },
  data() {
    return {
      selected: "",
      toast: false,
      message: "",
      tab: "tab1",
      offset_buy: 0,
      offset_sell: 0,
      limit: 20,
      balance: "",
      crypto_currency: this.$store.state.user.crypto_currency,
      trade_currency: "CNY",
      is_trading: false,
      buys: [],
      sells: [],
      scroller: null,
      loading: false,
      total_buy: 1,
      total_sell: 1,
      is_buy: false,
      open: false,
      tradeType: "true",
      publishCryptoCurrency: "",
      publishTradeCurrency: "USDT",
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

      isPlaceOrder: false,
      amount: [""],
      qty: [""],
      amountError: "",
      qtyError: "",
      item: "",
      isCommit: false,
      timer: null,
      isEditAdDialog: false,
      isGoBoundPay: false,
      refreshing: false,
      trigger: null,
      isBoundAdDialog: false,
      pay_error: "",
      palceOrderTip: "",
      serviceUrl: "",
      servieMessage: "",
      isUpdateVersion: false,
      publishAdShowTip: "", //发布广告
      isAdTradeTotalDialog: false,
      isAdProtectPriceDialog: false,

      buyTab1: "",
      buyTab2: "",
      buyTab3: "",
      buyTab4: "",
      buyTab5: "",
      buyTab6: "",
      currentBuyTab: "tab1",
      isBuy: true,
      coinList: [],
      min_qty_tip1: ""
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   let crypto_currency = store.state.user.crypto_currency;
  //   let trade_currency = "CNY";
  //   let is_buy = false;
  //   let limit = 20;
  //   if (
  //     crypto_currency == "LBTC" ||
  //     crypto_currency == "BTC" ||
  //     crypto_currency == "LTC" ||
  //     crypto_currency == "FFT" ||
  //     crypto_currency == "FFTS" ||
  //     crypto_currency == "DNA" ||
  //     crypto_currency == "EGD" ||
  //     crypto_currency == "CBC"
  //   ) {
  //     crypto_currency = "XDAG";
  //     store.commit(SET_CRYPTO_CURRENCY, crypto_currency);
  //   }
  //   trade
  //     .adList(crypto_currency, trade_currency, is_buy, 0, limit)
  //     .then(values => {
  //       let buys = [];
  //       if (values.code === 0) {
  //         buys = values.data.lists;
  //       }
  //       next(vm => {
  //         vm.crypto_currency = crypto_currency;
  //         vm.trade_currency = trade_currency;
  //         vm.is_buy = is_buy;
  //         vm.limit = limit;
  //         vm.total_buy = values.data.total;
  //         vm.offset_buy = values.data.lists.length;
  //         vm.buys = buys;
  //         if (vm.buys.length > 0) {
  //           vm.item = buys[0];
  //         }
  //       });
  //     });
  // },
  filters: {
    data_to3: function(crypto_currency, val) {
      if (undefined === val) return "";
      if (
        crypto_currency == "OSC" ||
        crypto_currency == "DGC" ||
        crypto_currency == "XDAG"
      ) {
        if ((val + "").indexOf(".") > 0) {
          return parseFloat(val).toFixed(3);
        } else {
          return val;
        }
      } else {
        return val;
      }
    },
    fee: function(trade_fee_rate) {
      if (undefined === trade_fee_rate) return "";
      return parseFloat(parseFloat(trade_fee_rate * 100).toFixed(3));
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
    }
  },
  created: function() {
    // this.crypto_currency = this.$store.state.user.crypto_currency;
   
    // this.getCoins();
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  methods: {
    refresh() {
      if (this.tab == "tab3") {
        setTimeout(() => {
          this.refreshing = false;
        }, 2000);
        return;
      }
      if (this.refreshing) return;
      this.refreshing = true;
      this.tabChange(this.tab);
    },
    goBack() {
      // this.$router.go(-1);
        this.$router.push("/trade");
    },
    tabBuyChange(tab) {
      this.currentBuyTab = tab;
    },

    buyTabChange(val) {
      this.isBuy = val;
    },
    pay_bound() {
      this.isBoundAdDialog = false;
      this.$router.push("/pay");
    },
    showAdTrade() {
      this.isAdTradeTotalDialog = true;
    },
    showAdProtectPrice() {
      this.isAdProtectPriceDialog = true;
    },
    closeDialog() {
      this.isPublishTipDialog = false;
      this.isSignInDialog = false;
      this.isPublishDialog = false;
      this.isEditAdDialog = false;
      this.isGoBoundPay = false;
      this.isBoundAdDialog = false;
      this.isUpdateVersion = false;
      this.isAdTradeTotalDialog = false;
      this.isAdProtectPriceDialog = false;
    },
    success: function(e) {
      this.isUpdateVersion = false;
      //  this.showToast(this.$t('Invite.CopySuccessContent')+this.share_url)
      this.showToast(this.$t("Invite.CopySuccessContent"));
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
    ad_edit() {
      this.isEditAdDialog = false;
      this.$router.push("/ads");
    },
    tabChange(tab) {
      this.currentBuyTab = tab;
    },

    init_ad() {
      this.margin = "";
      this.price = "";
      // this.balance = 0.00
      this.min_qty = "";
      this.max_qty = "";
      this.limit_qty = "";
      this.tradeType = "false";
      this.isAutoTaken = "true";
      this.is_market_price = "true";
    },

    publishCryptoCurrencyChange(val) {
      this.publishCryptoCurrency = val;
      this.init_ad();
      let symbol = this.publishCryptoCurrency + "_" + this.publishTradeCurrency;
      let params = {
        symbol: symbol.toLowerCase()
      };
      trade
        .getPublishRestriction(params)
        .then(result => {
          this.balance = result.data.max_trade_amount;
          this.online_account_limit = result.data.online_available;
          this.trade_fee_rate = result.data.maker_fee_rate;
          this.max_qty_tip =
            this.$t("Trade.Publish.AdvertisingTips13") +
            this.online_account_limit +
            " " +
            this.publishCryptoCurrency;
          this.min_qty_tip =
            this.$t("Trade.Publish.AdvertisingTips13") +
            this.online_account_limit +
            " " +
            this.publishCryptoCurrency;
          this.publishAdShowTip =
            "大于 " +
            this.online_account_limit +
            " " +
            this.publishCryptoCurrency +
            " 才显示";

          if (this.balance < this.online_account_limit) {
            this.showToast(
              this.$t("Trade.Publish.AdvertisingTips20") +
                this.online_account_limit +
                " " +
                this.publishCryptoCurrency +
                this.$t("Trade.Publish.AdvertisingTips21")
            );

            // vm.form_error = true
            /*
              vm.$alert(vm.$t('Trade.Publish.BalanceLimitContent')+ vm.online_account_limit, vm.$t('Trade.Publish.BalanceLimitTitle'), {
                confirmButtonText: vm.$t('Trade.Publish.BalanceLimitBtn'),
                callback: action => {

                },
                type: 'error'
              });
              */
          }
        })
        .catch(e => {
          this.showToast(this.$t(e.message));
        });
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

    
    getCoins(){
       user.USER_otc_my_supported_otc_symbols()
        .then(result => {
          if (result.code === 0) {
            var dd = []
            var i = 0;
            result.data.symbols.forEach(element => {
               var d = [{name:element.split("_")[0],value:element.split("_")[0]}] 
               dd = dd.concat(d)
               if(i==0){
                 this.publishCryptoCurrency = element.split("_")[0];
                 i=2
               }
            });  
            this.coinList = dd;
             this.publishCryptoCurrencyChange(this.publishCryptoCurrency);
          }
        })
        .catch(e => {
   
        });
    },
    ////////
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
    go_bound() {
      this.isGoBoundPay = false;
      this.$router.push("/pay");
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
      //  console.log('this.margin = kais '+this.margin)
      if (selected === "margin") {
        this.margin_error = "";
      }

      if (selected === "price") {
        this.price_error = "";
      }

      if (selected === "min_qty") {
        this.min_limit_error = "";
      }

      if (selected === "max_qty") {
        this.max_limit_error = "";
      }

      if (selected === "limit_qty") {
        this.limit_qty_error = "";
      }
      if ("amount" == selected) {
        this.amountError = "";
      }
      if ("qty" == selected) {
        this.qtyError = "";
      }
    },
    check_margin() {
      if (parseFloat(this.margin) <= 30 && parseFloat(this.margin) >= -30) {
        this.autoPriceValue = (
          (parseFloat(this.margin) * 0.01 + 1) *
          parseFloat(this.normalprice)
        ).toFixed(3);
        this.margin_error = "";
      } else {
        this.autoPriceValue = this.normalprice;
        this.margin_error = " ";
      }
    },
    check_price() {
      if (!isNaN(parseInt(this.price))) {
        // this.price = lib.toFixed(parseFloat(this.price), 3)
        // if( this.publishTradeCurrency == 'CNY' && !isNaN(this.price) && parseFloat(this.price) * parseFloat(this.max_qty) >= 50000){
        //     // this.price_error = this.$t('Trade.Buy.TradeCurrencyLimit')  +"：50000 CNY"
        //     return false
        // }
        // this.price = this.price.to
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
    check_min_qty() {
      if (!isNaN(parseInt(this.min_qty))) {
        if (
          !isNaN(parseFloat(this.max_qty)) &&
          parseFloat(this.max_qty) > 0 &&
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
      // if (
      //   this.publishCryptoCurrency == "FFC" &&
      //   (this.isAlipay || this.isWeChat || this.isBank)
      // ) {
      //   return true;
      // } else if (
      //   this.publishCryptoCurrency != "FFC" &&
      //   (this.isFfcpay || this.isAlipay || this.isWeChat || this.isBank)
      // ) {
      //   return true;
      // } else {
      //   this.showToast(this.$t("Trade.Publish.AdvertisingTips7"));
      // }
      return false;
    },
    onSubmit: function() {
      // if(this.balance < this.online_account_limit){
      //        this.showToast(this.$t('Trade.Publish.AdvertisingTips20')+this.online_account_limit+" "+this.publishCryptoCurrency+this.$t('Trade.Publish.AdvertisingTips21'));
      //      return false;
      //     }

      // if (this.is_market_price == "false")
      //   if (this.margin > 30 || this.margin < -30) {
      //     this.margin_error = " ";
      //     this.showToast(this.$t("Trade.Publish.AdvertisingTips8"));
      //     return false;
      //   }
      // if (
      //   this.publishCryptoCurrency == "OSC" ||
      //   this.publishCryptoCurrency == "DGC" ||
      //   this.publishCryptoCurrency == "LBTC" ||
      //   this.publishCryptoCurrency == "XDAG"
      // ) {
      //   this.margin = "0";
      // }
      if (!this.check_price()) {
        this.showToast(this.$t("Trade.Publish.AdvertisingTips17"));
        return;
      }
      if (!this.check_min_qty()) {
        this.showToast(this.min_qty_tip);
        return;
      }

      // if (this.tradeType == "false") {
      //   var minValue = (
      //     parseFloat(this.balance) *
      //     (1 - parseFloat(this.trade_fee_rate))
      //   ).toFixed(8);
      //   if (minValue == 0.0) {
      //     this.showToast("账户余额不足");
      //     return;
      //   }
      //   if (parseFloat(this.min_qty) > minValue) {
      //     this.showToast(
      //       "最小限额需要小于 " +
      //         minValue +
      //         " " +
      //         this.publishCryptoCurrency +
      //         "，否则将不展示。"
      //     );
      //     //  return
      //   }
      // }
      if (!this.check_max_qty()) {
        this.showToast(this.max_qty_tip);
        return;
      }
      // let limit = parseFloat(this.online_account_limit) / 2;
      // if (parseFloat(this.max_qty) < limit) {
      //   this.showToast(
      //     this.$t("Trade.Publish.AdvertisingTips24") +
      //       limit +
      //       " " +
      //       this.publishCryptoCurrency
      //   );
      //   return;
      // }
      // if (this.tradeType == "false")
      //   if (parseFloat(this.balance) < parseFloat(this.limit_qty)) {
      //     this.showToast("超出可出售余额");
      //     return;
      //   }
      // if (this.check_payment_method() && this.check_limit_qty()) {
      this.isPublishDialog = true;
      // }
    },
    getVersion() {
      if (this.isIos()) {
        user
          .version()
          .then(result => {
            if (result.code == 0) {
              var version = result.data.version;
              var serviceVersion = this.toNum(version);
              var iosVarsion = this.toNum("1.0"); //this.toNum(getVersionIos());
              if (serviceVersion > iosVarsion) {
                this.serviceUrl = result.data.url;
                this.servieMessage = result.data.message;
                this.isUpdateVersion = true;
              }
            }
          })
          .catch(e => {});
      }
    },
    isIos() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS == true ? true : false;
    },
    toNum(a) {
      var a = a.toString();
      //也可以这样写 var c=a.split(/\./);
      var c = a.split(".");
      var num_place = ["", "0", "00", "000", "0000"],
        r = num_place.reverse();
      for (var i = 0; i < c.length; i++) {
        var len = c[i].length;
        c[i] = r[len] + c[i];
      }
      var res = c.join("");
      return res;
    },
    commit() {
      this.isPublishDialog = false;
      // let isMarketPrice = false;
      // if (this.is_market_price == "false") {
      //   isMarketPrice = true;
      // }

      // 10.发布委托 http://18.162.45.195:9000/otc/publish_ad （需要已经登录）
      // {
      // 	"symbol":"btc_usdt",
      // 	"price":10001.1,
      // 	"is_buy":true,
      // 	"max_qty":0.1,
      // 	"min_qty":0.001,
      // 	"limit_qty":0.2
      // }

      let symbol = this.publishCryptoCurrency + "_" + this.publishTradeCurrency;
      let params = {
        symbol: symbol.toLowerCase(),
        price: this.price,
        is_buy: this.currentBuyTab == "tab1" ? true : false,
        max_qty: this.max_qty,
        min_qty: this.min_qty,
        limit_qty: this.limit_qty
      };

      trade
        .publish(params)
        .then(result => {
          this.init_ad();
          // // this.refresh_timer.push(window.setTimeout(() => {
          // if (this.tradeType == "true") {
          //   this.tabChange("tab2");
          // } else {
          //   this.tabChange("tab1");
          // }
          // // }, 2000))
          this.showToast(this.$t("Publish.SuccessContent"));
        })
        .catch(e => {
          this.showToast(e.message);
        });
    },
    my_ad() {
      this.$router.push("/ads");
    },
    ////////////////////////////////

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
          this.min_qty_tip1 =
            "最小限额需要小于 " +
            minValue +
            " " +
            this.publishCryptoCurrency +
            "，否则将不展示。";
        }
      }
    },
    change_amount: function(e) {
      this.palceOrderTip = "";
      if (this.selected != "amount") {
        return;
      }
      this.amountError = "";
      this.qtyError = "";
      if (
        this.amount[0] === "" ||
        this.amount[0] === "0" ||
        this.amount[0] === "0."
      ) {
        this.qty[0] = "";
        this.amountError = "";
        return;
      }
      if (
        parseFloat(this.amount[0]) >= parseFloat(this.item.min_amount) &&
        parseFloat(this.amount[0]) <= parseFloat(this.item.max_amount)
      ) {
        ///^\d{1,20}(\.\d{1,2})?$/.test(this.amount) &&
        this.qty[0] =
          parseFloat(
            (parseFloat(this.amount[0]) / parseFloat(this.item.price)).toFixed(
              8
            )
          ) + "";
        // console.log(" this.qty[0] = "+ this.qty[0])
      } else {
        this.amountError = " ";
        this.qty[0] = "";
        if (parseFloat(this.amount[0]) < parseFloat(this.item.min_amount)) {
          this.palceOrderTip =
            "您的金额小于对方设置的最小金额( " +
            this.item.min_amount +
            " CNY" +
            " )";
        }
        if (parseFloat(this.amount[0]) > parseFloat(this.item.max_amount)) {
          this.palceOrderTip =
            "您的金额大于对方设置的最大金额( " +
            this.item.max_amount +
            " CNY" +
            " )";
        }
      }
      if (
        this.amount[0] === "" ||
        this.amount[0] === "0" ||
        this.amount[0] === "0."
      ) {
        this.qty[0] = "";
        this.amountError = "";
      }
    },
    change_qty: function(e) {
      this.palceOrderTip = "";
      if (this.selected != "qty") {
        return;
      }
      this.amountError = "";
      this.qtyError = "";
      if (this.qty[0] === "" || this.qty[0] === "0" || this.qty[0] === "0.") {
        this.amount[0] = "";
        this.qtyError = "";
        return;
      }
      if (
        parseFloat(this.qty[0]) >= parseFloat(this.item.min_qty) &&
        parseFloat(this.qty[0]) <= parseFloat(this.item.max_qty)
      ) {
        this.amount[0] =
          parseFloat(
            (parseFloat(this.qty[0]) * parseFloat(this.item.price)).toFixed(3)
          ) + "";
        // console.log(" this.amount[0] = "+ this.amount[0])
      } else {
        this.qtyError = " ";
        this.amount[0] = "";
        if (parseFloat(this.qty[0]) < parseFloat(this.item.min_qty)) {
          this.palceOrderTip =
            "您的数量小于对方设置的最小数量( " +
            this.item.min_qty +
            " " +
            this.item.crypto_currency +
            " )";
        }
        if (parseFloat(this.qty[0]) > parseFloat(this.item.max_qty)) {
          this.palceOrderTip =
            "您的数量大于对方设置的最大数量( " +
            this.item.max_qty +
            " " +
            this.item.crypto_currency +
            " )";
        }
      }
    }
  }
  //  beforeDestroy: function () {
  //     console.log("beforeDestroy.scroller = "+this.scroller)
  //        this.scroller = null;
  //        console.log("kjfglsdfjgthis.scroller = "+this.scroller)
  //     }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/withdraw_ok.scss";
</style>
