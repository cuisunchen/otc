<template>
  <div class="content-place-holder">
    <div style="background:rgba(245,245,245,1);">
      <mu-toast v-if="toast" :message="message" @close="hideToast" />
      <!--交易订单-->

      <div style="height:100%;z-index:999;">
        <div class="top-order" :class="{'buy-color': !item.is_buy}">
          <div
            class="center-order"
          >{{item.is_buy ? $t('Trade.Sell.Title'):$t('Trade.Buy.Title')}} {{crypto_currency}}</div>
          <div class="left-order" @click="goBack" />
        </div>

        <div
          :class="{'buy-color': !item.is_buy}"
          style="background:rgba(35,71,130,1);padding-bottom: 22px;"
        >
          <!-- <div class="header" v-show="index==0">{{nameFirst}}</div>
          <div class="header1" v-show="index==1">{{nameFirst}}</div>
          <div class="header2" v-show="index==2">{{nameFirst}}</div>
          <div class="header3" v-show="index==3">{{nameFirst}}</div>
          <div class="header4" v-show="index==4">{{nameFirst}}</div>
          <div class="header5" v-show="index==5">{{nameFirst}}</div>
          <div class="header6" v-show="index==6">{{nameFirst}}</div>
          <div class="header7" v-show="index==7">{{nameFirst}}</div>
          <div class="header8" v-show="index==8">{{nameFirst}}</div>

          <div v-show="false" class="vip1"></div>-->

          <div class="fs-20" style="color:#ffffff;font-weight: 600;">{{item.name}}</div>

          <div style="display:flex;margin-top:1em;padding-bottom:1em;">
            <div style="flex:1;">
              <div class="fs-12" style="font-weight: 400;color:#ffffff;">{{user_created}}</div>
              <div
                class="fs-12"
                style="font-weight: 400;color:#ffffff;margin-top:0.5em;"
              >{{$t('Text.zcsj')}}</div>
            </div>
            <div style="flex:1;">
              <div
                class="fs-12"
                style="font-weight: 400;color:#ffffff;"
              >{{item.trade_success_count}}</div>
              <div
                class="fs-12"
                style="font-weight: 400;color:#ffffff;margin-top:0.5em;"
              >{{$t('Trade.TotalMakeContract')}}</div>
            </div>
            <div style="flex:1;">
              <div
                class="fs-12"
                style="font-weight: 400;color:#ffffff;"
              >{{item.trade_success_ratio}}%</div>
              <div
                class="fs-12"
                style="font-weight: 400;color:#ffffff;margin-top:0.5em;"
              >{{$t('Text.cjl')}}</div>
            </div>
          </div>
        </div>

        <div
          class="icon_buy_input"
          style="width: 90%;
    margin: 0 auto;
    background: #ffffff;
    background:rgba(253,254,255,1);
    box-shadow:0px 2px 10px 0px rgba(0,0,0,.1);
    border-radius: 0.5em;position: relative;top: -22px;"
        >
          <!-- <div style="color:#0A2463;font-size:0.8em;">
            {{$t('Text.price')}}
            <span style="float:right">{{item.price}} {{trade_currency}}</span>
          </div>-->
          <div class="price-wrap">
            <div class="info">
              <span style="font-weight: 600;" :class="{'buy-color-text': !item.is_buy}" class="price fs-22">{{item.price}} {{trade_currency}}</span>
              <span
                class="limit fs-12"
              >{{$t('Trade.limit') + item.min_qty+'-'+item.max_qty+' '+ crypto_currency}}</span>
            </div>
            <div class="ico">
              <img :src="iconPath" />
            </div>
          </div>
          <div class="input-order" style="margin-top:1.2em">
            <!--$t('Trade.Sell.Qty') class="icon_buy_input" $t('Text.xe') + $t('Text.kcs') +-->
            <div class="captcha-zone-order" v-show="item.is_buy">
              <!-- <div
                class="captcha-zone-tip-order"
                style="font-size:0.8em"
              >{{$t('Trade.Buy.TradeCryptoLimit')}}：( {{crypto_currency}})</div>-->
              <mu-text-field
                type="number"
                v-model.trim="qty[0]"
                class="input-zone-order"
                :hintText="item.min_qty+'-'+item.max_qty+' '+ crypto_currency"
                fullWidth
                @focus="input_focus('qty')"
                :errorText="qtyError"
                @input="change_qty($event)"
              />
              <div class="div-send-code-order1" @click="onAllIn">
                <span class="fs-14" style="color: #4E586E">{{ crypto_currency }} |</span>
                <span class="fs-14" style="color:#3180D0">{{$t('Text.qb')}}</span>
              </div>
            </div>
            <div class="captcha-zone-order" v-show="item.is_buy">
              <!--$t('Trade.Sell.Amount') $t('Text.xe') + $t('Text.kgm') +-->
              <!-- <div
                class="captcha-zone-tip-order"
                style="font-size:0.8em"
              >{{$t('Text.jyze')}}：( {{trade_currency}} )</div>-->
              <mu-text-field
                type="number"
                v-model.trim="amount[0]"
                class="input-zone-order"
                :hintText="item.min_amount+'-'+item.max_amount +' '+ trade_currency"
                fullWidth
                @focus="input_focus('amount')"
                :errorText="amountError"
                @input="change_amount($event)"
              />
              <!-- <div class="div-send-code-order" >{{trade_currency }} $t('Trade.Buy.Qty') $t('Trade.Buy.Amount')
              </div>-->
              <!-- <div style="text-align: right; font-size: 0.8em;color: #6D778B;margin-top: -1em;padding-top:-1em;margin-bottom:1em" >{{$t('Text.zhye')}} {{this.user_available}} {{trade_currency}}</div> -->
              <div class="div-send-code-order1">
                <span class="fs-14" style="color: #4E586E;">{{ trade_currency }}</span>
              </div>
            </div>

            <div class="captcha-zone-order" v-show="!item.is_buy">
              <!-- <div
                class="captcha-zone-tip-order"
                style="font-size:0.8em"
              >{{$t('Trade.Buy.TradeCryptoLimit')}}：( {{crypto_currency}} )</div>-->
              <mu-text-field
                type="number"
                v-model.trim="qty[0]"
                class="input-zone-order"
                :hintText="item.min_qty+'-'+item.max_qty+' '+ crypto_currency"
                fullWidth
                @focus="input_focus('qty')"
                :errorText="qtyError"
                @input="change_qty($event)"
              />
              <div class="div-send-code-order1" @click="onAllIn1">
                <span class="fs-14" style="color: #4E586E">{{ crypto_currency }} |</span>
                <span class="fs-14" style="color:#3180D0">{{$t('Text.qb')}}</span>
              </div>
            </div>
            <div class="captcha-zone-order" v-show="!item.is_buy">
              <!-- <div
                class="captcha-zone-tip-order"
                style="font-size:0.8em"
              >{{$t('Text.jyze')}}：( {{trade_currency}} )</div>-->
              <mu-text-field
                type="number"
                v-model.trim="amount[0]"
                class="input-zone-order"
                :hintText="item.min_amount+'-'+item.max_amount+' '+ trade_currency"
                fullWidth
                @focus="input_focus('amount')"
                :errorText="amountError"
                @input="change_amount($event)"
              />
              <!-- <div class="div-send-code-order" >{{trade_currency}}
              </div>#FF0A2463-->
              <div class="div-send-code-order2" style="color:#3180D0" @click="onAllIn1">
                <span class="fs-14" style="color: #4E586E;">{{ trade_currency }}</span>
              </div>

              <!-- <div
                style="text-align: right; font-size: 0.7em;color: #6D778B;margin-top: -1em;padding-top:-1em;margin-bottom:1em"
              >{{$t('Text.balance')}} {{this.user_available}} {{trade_currency}}</div>-->
            </div>
          </div>
          <div
            v-show="!item.is_buy"
            style="text-align: right; font-size: 0.7em;color: #6D778B;margin-top: 1em;"
          >{{$t('Text.balance')}} {{this.user_available}} {{trade_currency}}</div>
          <div style="display:flex">
            <div
              style="width:2em;height:2em;border-radius: 4em;background:rgb(245, 245, 245);margin-left:-2em; "
            ></div>
            <div style="width:100%;height:2px;border-top:2px dashed #F3F5F7;margin-top:1em;"></div>
            <div
              style="width:2em;height:2em;border-radius: 4em;background:rgb(245, 245, 245);margin-right:-2em; "
            ></div>
          </div>

          <div class="fs-14" style="color:#6D778B;margin-top:1em;display:flex;">
            {{$t('Text.sxf')}}
            <div @click="goAcount" class="ii"></div>
            <div style="flex:1; text-align:right">{{parseFloat(this.user_fee_rate)*100 +" %"}}</div>
          </div>

          <div class="fs-14" v-show="!item.is_buy" style="color:#6D778B;margin-top:0.5em;">
            {{$t('Text.zjzf')}}
            <span
              :class="{'buy-color-text': !item.is_buy}"
              style="float:right;color:#234782;font-weight: 600;"
            >{{amount[0]? (parseFloat(amount[0]) + (parseFloat(amount[0])* parseFloat(this.user_fee_rate))).toFixed(2)+" USDT":"0 USDT"}}</span>
          </div>

          <div class="fs-14 lh-22" v-show="item.is_buy" style="color:#6D778B;margin-top:0.5em;">
            {{$t('Text.cssr')}}
            <div v-if="amount[0]" :class="{'buy-color-text': !item.is_buy}" style="float:right;color:#234782;font-weight: 600;">
              <span
                class="fs-20"
              >{{(parseFloat(amount[0]) - (parseFloat(amount[0])* parseFloat(this.user_fee_rate))).toFixed(2)}}</span>
              <span class="fs-14">USDT</span>
            </div>
            <div v-else :class="{'buy-color-text': !item.is_buy}" style="float:right;color:#234782;font-weight: 600;">
              <span class="fs-20">0</span>
              <span calss="fs-14">USDT</span>
            </div>
          </div>
        </div>

        <mu-raised-button
          v-show="!item.is_buy"
          :label="$t('Trade.Buy.BtnBuy')"
          @click="showPassword"
          :class="{'buy-color': !item.is_buy}"
          class="btn-order"
          fullWidth
          primary
        />
        <mu-raised-button
          v-show="item.is_buy"
          :label="$t('Trade.Sell.BtnSell')"
          @click="showPassword"
          class="btn-order"
          fullWidth
          primary
        />
      </div>
      <mu-dialog :open="isPublishTipDialog" :title="$t('Trade.Publish.AdvertisingTips')">
        <!-- <span v-html="$t('Trade.Publish.AdvertisingTips1')"></span>{{trade_fee_rate|fee}} {{$t('Trade.Publish.AdvertisingTips2')}} -->

        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
      </mu-dialog>
      <mu-dialog :open="isSignInDialog" :title="$t('Trade.Publish.AdvertisingTips5')">
        {{$t('Trade.Publish.AdvertisingTips3')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button
          slot="actions"
          primary
          @click="signIn"
          :label="$t('Trade.Publish.AdvertisingTips6')"
        />
      </mu-dialog>

      <mu-dialog :open="isEditAdDialog" :title="$t('Trade.Publish.AdvertisingTips')">
        {{$t('Trade.Publish.AdvertisingTips25')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button
          slot="actions"
          primary
          @click="ad_edit"
          :label="$t('Trade.Publish.AdvertisingTips26')"
        />
      </mu-dialog>
      <mu-dialog :open="isGoBoundPay" title="提示">
        {{$t('Trade.Publish.AdvertisingTips33')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button
          slot="actions"
          primary
          @click="go_bound"
          :label="$t('Trade.Publish.AdvertisingTips32')"
        />
      </mu-dialog>
      <mu-dialog :open="isBoundAdDialog" :title="$t('Trade.Publish.AdvertisingTips')">
        {{pay_error}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
        <mu-flat-button
          slot="actions"
          primary
          @click="pay_bound"
          :label="$t('Trade.Publish.AdvertisingTips27')"
        />
      </mu-dialog>

      <mu-dialog
        :open="isAdTradeTotalDialog"
        :title="tradeType=='false'?$t('Trade.Publish.SellLimit'):$t('Trade.Publish.BuyLimit')"
      >
        <div v-show="tradeType!='false'">{{$t('Trade.Publish.AdvertisingTips28')}}</div>
        <div v-show="tradeType=='false'">{{$t('Trade.Publish.AdvertisingTips29')}}</div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
      </mu-dialog>

      <mu-dialog :open="isAdProtectPriceDialog" :title="$t('Trade.Publish.protectPrice')">
        <div v-show="tradeType=='false'">{{$t('Trade.Publish.AdvertisingTips30')}}</div>
        <div v-show="tradeType!='false'">{{$t('Trade.Publish.AdvertisingTips31')}}</div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
      </mu-dialog>

      <!-- <mu-dialog :open="isPasswordDialog" :title="$t('User.SetMenuAssertPwd')" @click="closeDialog">
        <div >
          <mu-text-field  v-model="passwordValue"  :label="$t('User.SetMenuAssertPwd')" class="input-zone" :hintText="$t('Wallet_Detail.pwd_validate_tip')"
          type="password"  fullWidth :errorText="pwd_error" />
          <div style="text-align:right">
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
            <mu-flat-button slot="actions" primary @click="submit" :label="$t('Text.tj')"/>
          </div>
        </div>
      </mu-dialog>-->
    </div>

    <div
      style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
      class="reset-dialog"
      v-show="isPasswordDialog"
    >
      <div
        style="
        margin: 35% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
        class="reset-dialog-wrap"
      >
        <div class="fs-16" style="padding-top:1.5em;color: #242932;">{{$t('User.SetMenuAssertPwd')}}</div>
        <mu-text-field
          v-model="passwordValue"
          style="width:90%;margin:1.2em auto 0px auto;"
          :hintText="$t('Wallet_Detail.pwd_validate_tip')"
          type="password"
          fullWidth
          :errorText="pwd_error"
        />
        <div style="width: 95%;text-align: right;">
          <span
          @click="reset_sign_pwd"
          style="font-size: 1em;color: rgb(49, 128, 208);"
        >{{$t('SignIn.forgetPasswordText')}}</span>
        </div>
        <div
          style="display: flex;flex-flow: row nowrap;justify-content: space-between;width: 95%;margin: auto;"
        >
          <mu-raised-button
            :label="$t('Text.cancel')"
            @click="closeDialog"
            class="btn-toast-cancel"
            style="margin-top:1em;"
            fullWidth
            primary
          />
          <mu-raised-button
            :label="$t('Text.ok')"
            @click="submit"
            class="btn-toast-submit"
            style="margin-top:1em;"
            fullWidth
            primary
          />
        </div>
      </div>

      <!-- <img
        @click="closeDialog"
        src="../assets/image/icon_close.png"
        style="width:4em;height:4em;margin:1.5em auto 0 auto;"
      />-->
    </div>
    <!-- <mu-dialog
      dialogClass="reset-dialog"
      title="Dialog"
      width="360"
      :open.sync="isPasswordDialog"
    >
      this is simple Dialog
      <div
        style="display: flex;flex-flow: row nowrap;justify-content: space-between;
    align-items: center;"
      >
        <mu-raised-button
          v-show="item.is_buy"
          :label="$t('Trade.Sell.BtnSell')"
          @click="showPassword"
          class="btn-toast-cancel fs-18"
          fullWidth
          primary
        />
        <mu-raised-button
          v-show="item.is_buy"
          :label="$t('Trade.Sell.BtnSell')"
          @click="showPassword"
          class="btn-toast-submit fs-18"
          fullWidth
          primary
        />
      </div>
    </mu-dialog>-->
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
import { formatDate } from "../common/js/data";
import nprogress from "nprogress";
import { BASE_URL } from "../models/url.js";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "trade",
  components: { BottomNav },
  data() {
    return {
      iconPath: "",
      buyColor:
        "background: linear-gradient(90deg,rgba(0,111,233,1) 0%,rgba(0,94,228,1) 100%);",
      selected: "",
      toast: false,
      message: "你有阿拉山口的肌",
      tab: "tab1",
      offset_buy: 0,
      offset_sell: 0,
      limit: 20,
      balance: "",
      crypto_currency: this.$store.state.user.crypto_currency,
      trade_currency: "USDT",
      is_trading: false,
      loading: false,
      loading1: false,
      total_buy: 1,
      total_sell: 1,
      is_buy: false,
      open: false,
      tradeType: "false",
      publishCryptoCurrency: this.$store.state.user.crypto_currency,
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
      user_available: "",
      user_fee_rate: 0,

      index: 0,
      crypto_currency: "",
      isBuy: true,
      trade_total_usdt: 0,
      user_created: "",
      passwordValue: "",
      isPasswordDialog: false,
      pwd_error: "",
      nameFirst: "",
      min_qty_tip1: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    let symbol = to.params.symbol.toLowerCase();
    let id = to.params.id;
    let params = {
      symbol: symbol,
      ad_id: id
    };

    trade
      .preOrder(params)
      .then(result => {
        if (result.code === 0) {
          var ad = result.data.ad;
          var item = {};

          var charas = ad.name.substring(0, 1).toUpperCase();

          var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);

          var index = (index1 + 1) % 9;
          var nameFirst = charas;

          item.id = ad.id;
          item.is_buy = ad.is_buy;
          item.max_amount = ad.max_amount;
          item.max_qty = ad.max_qty;
          item.min_amount = ad.min_amount;
          item.min_qty = ad.min_qty;
          item.name = ad.name;
          item.price = ad.price;
          item.symbol = ad.symbol;
          item.trade_total_usdt = ad.trade_total_usdt;
          item.trade_success_count = ad.trade_success_count;
          item.trade_success_ratio = ad.trade_success_ratio;
          let date = new Date(parseInt(ad.user_created));
          item.user_created = formatDate(date, "yyyy-MM-dd");
          var user_created = formatDate(date, "yyyy-MM-dd");
          var trade_total_usdt = ad.trade_total_usdt;
          var user_available = result.data.user_available;
          var user_fee_rate = result.data.user_fee_rate;
          nprogress.done();
          next(vm => {
            vm.item = item;
            vm.index = index;
            vm.nameFirst = nameFirst;
            vm.user_created = user_created;
            vm.trade_total_usdt = trade_total_usdt;
            vm.user_available = user_available;
            vm.user_fee_rate = user_fee_rate;
            vm.crypto_currency = symbol.split("_")[0].toUpperCase();
          });
        }
        // console.log("symbol", symbol);
        const r = symbol.substring(0, 3);
        // console.log("result", result);
        // console.log("next", next);
        next(vm => {
          switch (r) {
          	 case "wt_":
              vm.iconPath = BASE_URL+"/static/wt.png";
              break;
            case "sbo":
              vm.iconPath = BASE_URL+"/static/sbo.png";
              break;
            case "xrp":
              vm.iconPath = BASE_URL+"/static/xrp.png";
              break;
            case "bch":
              vm.iconPath = BASE_URL+"/static/bch.png";
              break;
            case "btc":
              vm.iconPath = BASE_URL+"/static/btc.png";
              break;
            case "eos":
              vm.iconPath = BASE_URL+"/static/eos.png";
              break;
            case "eth":
              vm.iconPath = BASE_URL+"/static/eth.png";
              break;
            default:
              break;
          }
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate1(e.code, symbol.split("_")[0].toUpperCase());
      });
  },
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
    coinchange(symbol) {
      if (undefined == symbol) return "USDT";
      return symbol.split("_")[1].toUpperCase();
    },
    coinchange0(symbol) {
      if (undefined == symbol) return "USDT";
      return symbol.split("_")[0].toUpperCase();
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 1).toUpperCase();
    }
  },
  created: function() {},
  mounted() {
    this.trigger = this.$el;
    console.log(this.$route.params.symbol);
  },
  methods: {
    showPassword() {
      if (this.amount[0] == null || this.amount[0] == "") {
        this.showToast(this.$t("Publish.QtyError"));

        return;
      }
      if (
        parseFloat(this.amount[0]) > parseFloat(this.item.max_amount) ||
        parseFloat(this.amount[0]) < parseFloat(this.item.min_amount)
      ) {
        this.showToast(this.$t("Publish.QtyError"));

        return;
      }

      if (
        !this.item.is_buy &&
        parseFloat(this.amount[0]) > parseFloat(this.user_available)
      ) {
        this.showToast(this.$t("Publish.BalanceError"));

        return;
      }

      this.isPasswordDialog = true;
    },

    reset_sign_pwd() {
      this.$router.push("/modify_asserts_pwd");
    },
    onAllIn1() {
      if (parseFloat(this.user_available) <= 0) return;
      if (parseFloat(this.item.max_amount) > parseFloat(this.user_available)) {
        this.amount = [];
        var aa =
          parseFloat(this.user_available) -
          parseFloat(this.user_available) * parseFloat(this.user_fee_rate);
        this.amount.push(aa.toFixed(2));
        this.qty = [];
        var vvv = parseFloat(aa) / parseFloat(this.item.price);
        this.qty.push(vvv.toFixed(8));
      } else {
        this.amount = [];
        this.amount.push(this.item.max_amount);
        this.qty = [];
        var vvv =
          parseFloat(this.item.max_amount) / parseFloat(this.item.price);
        this.qty.push(vvv.toFixed(8));
      }
    },
    onAllIn() {
      this.amount = [];
      this.amount.push(this.item.max_amount);
      this.qty = [];
      var vvv = parseFloat(this.item.max_amount) / parseFloat(this.item.price);
      this.qty.push(vvv.toFixed(8));
    },
    buyTabChange(val) {
      this.isBuy = val;
      this.refresh();
    },
    goAcount() {
      this.$router.push("/about_center");
    },
    publish() {
      this.$router.push("/publish");
    },
    pay_bound() {
      this.isBoundAdDialog = false;
      this.$router.push("/pay");
    },
    showAdTrade() {
      this.isAdTradeTotalDialog = true;
    },
    look(item) {
      this.$router.push({
        name: "AdDetail",
        params: {
          id: item.id
        }
      });
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
      this.isPasswordDialog = false;
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

    init_ad() {
      this.margin = "";
      this.price = "";
      this.min_qty = "";
      this.max_qty = "";
      this.limit_qty = "";
      this.tradeType = "false";
      this.isAutoTaken = "true";
      this.is_market_price = "true";
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
    my_ad() {
      this.$router.push("/ads");
    },
    ////////////////////////////////
    goBack() {
      this.$router.go(-1);
    },
    preOrder(item) {
      let params = {
        symbol: this.item.symbol,
        ad_id: this.item.id
      };

      trade
        .preOrder(params)
        .then(result => {
          if (result.code === 0) {
            var ad = result.data.ad;
            var charas = ad.name.substring(0, 1).toUpperCase();
            var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);
            this.index = (index1 + 1) % 9;
            this.nameFirst = charas;
            this.item.id = ad.id;
            this.item.is_buy = ad.is_buy;

            this.item.max_amount = ad.max_amount;
            this.item.max_qty = ad.max_qty;
            this.item.min_amount = ad.min_amount;
            this.item.min_qty = ad.min_qty;
            this.item.name = ad.name;
            this.item.price = ad.price;
            this.item.symbol = ad.symbol;
            this.item.trade_total_usdt = ad.trade_total_usdt;
            let date = new Date(parseInt(ad.user_created));
            this.item.user_created = formatDate(date, "yyyy-MM-dd");
            this.user_created = formatDate(date, "yyyy-MM-dd");
            this.trade_total_usdt = ad.trade_total_usdt;

            this.user_available = result.data.user_available;
            this.user_fee_rate = result.data.user_fee_rate;
          } else {
            this.showToast(result.message);
          }
        })
        .catch(e => {
          this.showToast(e.message);
        });
    },

    placeOrder(item) {
      this.isPlaceOrder = true;
      if (
        this.$store.state.user.access_token.length > 0 &&
        this.$store.state.user.name.length > 0
      ) {
        if (!this.$store.state.user.has_payment_password) {
          this.$router.push("/set_assets_pwd");
        } else {
          if (this.$store.state.user.name == item.name) {
            this.isPlaceOrder = false;
            // this.$router.push({
            //   name: "ad_edit",
            //   params: {
            //     crypto_currency: item.crypto_currency.toLowerCase(),
            //     id: item.id
            //   }
            // });
          } else {
            this.qty[0] = "";
            this.amount[0] = "";
            this.isPlaceOrder = true;
            this.item = item;
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
            // this.balance = "";
            // this.publishCryptoCurrencyChange(this.crypto_currency);
            this.preOrder(this.item);
          }
        }
      } else {
        this.$router.push("/sign_in");
      }

      // alert( this.isPlaceOrder)
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
    },
    submit: function() {
      if (this.passwordValue.length < 6) {
        this.pwd_error = this.$t("Text.passwordHint");
        return;
      }
      this.isPasswordDialog = false;
      if (this.amount[0] == "") {
        this.amountError = " ";
        return;
      }
      if (this.qty[0] == "") {
        this.qtyError = " ";
        return;
      }
      if (this.isCommit) return;
      this.isCommit = true;

      let symbol = this.crypto_currency + "_" + this.trade_currency;
      let params = {
        symbol: symbol.toLowerCase(),
        ad_id: this.item.id,
        qty: this.qty[0],
        password: this.passwordValue,
        amount: this.amount[0]
      };

      trade
        .placeOrder(params)
        .then(result => {
          let code = parseInt(result.code);
          this.qty[0] = "";
          this.amount[0] = "";
          this.isCommit = false;
          if (code === 0) {
            let trade = result.data.trade;
            this.showToast(this.$t("Order.SuccessContent"));
            this.timer = setTimeout(() => {
              clearTimeout(this.timer);
              this.next(trade);
            }, 1000);
          } else {
            this.isCommit = false;
          }
        })
        .catch(e => {
          this.isCommit = false;
          this.showToast(e.message);
        });
    },
    next(trade) {
      // this.goBack();
      if (trade.is_buy) {
        this.$router.push({
          name: "order_buy",
          params: {
            id: trade.id,
            symbol: trade.symbol.toLowerCase()
          }
        });
      } else {
        this.$router.push({
          name: "order_sell",
          params: {
            id: trade.id,
            symbol: trade.symbol.toLowerCase()
          }
        });
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
@import "../assets/css/place_order.scss";
</style>
