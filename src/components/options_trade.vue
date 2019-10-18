<template>
  <div class="content">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>

    <div >
        <div class="top">
          <div class="center"  v-show="tab == 'tab3'"  >发布期权</div>
          <div class="center"  v-show="tab !== 'tab3'"  >期权交易</div>
            <div  class="right"  @click="toggle">帮助</div>
        </div>
        <!--中间start-->
      <div class="tab">
        <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">看涨</button>
        <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">看跌</button>
        <button class="button" :class="{tab3:this.tab==='tab3'}" @click="tabChange('tab3')">{{$t('Publish.Title')}}</button>
      </div>
   <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh"/>
      <div v-if="tab === 'tab1'" style="padding-top: 5.2em;">
        <div class="my-ad-item-list" v-for="(item) in this.buys" :key="item.id">
          <div class="my-ad-item-list-content-zone"  >
            <p class="p-title">
              <span class="span-left" style="color:#1AAC19">看涨</span>

               <button v-show="!item.is_maker"  @click="openPraiseMask(item)" >{{$t('Trade.Buy.Title')}}</button>
                <button style="background-color:#965b54"  @click="show_cancel_option(item)" v-show="item.is_maker" >{{$t('Wallet.CANCELLED')}}</button>
            </p>
            <div class="ads-datail">
                  
            <p class="p-price"><span class="span-color-80">行权价格</span><span class="span-color-40 span-buy">{{item.price}} FFC</span></p>
            <p class="p-price"><span class="span-color-80">行权数量</span><span class="span-color-40">{{item.qty}} {{item.crypto_currency}}</span></p>
            <p class="p-price"><span class="span-color-80">期权费用</span><span class="span-color-40">{{item.fee}} FFC</span></p>
            <p class="p-price"><span class="span-color-80">行权日期</span><span class="span-color-40">{{item.exercise_date | getFormatDate}}</span></p>
            </div>
        </div>
        </div>
      </div>
      <div v-if="tab === 'tab2'" style="padding-top: 5.2em;">
        <div class="my-ad-item-list" v-for="(item) in this.sells" :key="item.id">
          <div class="my-ad-item-list-content-zone"  >
            <p class="p-title">
              <span class="span-left" style="color:#ff4d2d">看跌</span>
               <button v-show="!item.is_maker" style="background-color:#ff4d2d"  @click="openPraiseMask(item)" >{{$t('Trade.Buy.Title')}}</button>
                <button style="background-color:#965b54" v-show="item.is_maker" @click="show_cancel_option(item)">{{$t('Wallet.CANCELLED')}}</button>
            </p>
            <div class="ads-datail">
                  
            <p class="p-price"><span class="span-color-80">行权价格</span><span class="span-color-40 span-sell">{{item.price}} FFC</span></p>
            <p class="p-price"><span class="span-color-80">行权数量</span><span class="span-color-40">{{item.qty}} {{item.crypto_currency}}</span></p>
            <p class="p-price"><span class="span-color-80">期权费用</span><span class="span-color-40">{{item.fee}} FFC</span></p>
            <p class="p-price"><span class="span-color-80">行权日期</span><span class="span-color-40">{{item.exercise_date | getFormatDate}}</span></p>
            </div>
        </div>
        </div>
      </div>
     
      <div v-if="tab === 'tab3'" style="background:#fff;" >
        <div class="publish-ad">
          <div class="publish-trade-tip-item">  
            <span class="span-left" @click="publishTip">期权提示</span><img src="../assets/image/icon_question.svg"  @click="publishTip">
            <span class="span-right" ></span>
          </div>
          <div class="publish-trade-type-item">
            <span>{{$t('options.options_type')}}</span>
            <div>
              <mu-radio  :class="{activeRadio:is_call=='true'}" name="anchorHorizontal"  nativeValue="true" :label="$t('options.w_p')"   v-model="is_call" />
              <mu-radio  :class="{activeRadio:is_call=='false'}" name="anchorHorizontal" nativeValue="false"  :label="$t('options.w_d')"   v-model="is_call" />
            </div>
          </div>
          <div class="publish-crypto-currency-item">
            <span>{{$t('options.options_period')}}</span>
            <mu-select-field v-model="period" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow"   v-show="is_call=='true'">
              <mu-menu-item value="1" :title="'1'+$t('options.options_day_p')"/>
              <mu-menu-item value="7" :title="'7'+$t('options.options_day_p')"/>
              <mu-menu-item value="15" :title="'15'+$t('options.options_day_p')"  />
              <mu-menu-item value="30" :title="'30'+$t('options.options_day_p')"  />
              <mu-menu-item value="90" :title="'90'+$t('options.options_day_p')"  />
              <mu-menu-item value="365" :title="'365'+$t('options.options_day_p')" />
            </mu-select-field>
            <mu-select-field v-model="period" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow"  v-show="is_call=='false'" >
      

              <mu-menu-item value="1" :title="'1'+$t('options.options_day_d')"  />
              <mu-menu-item value="7" :title="'7'+$t('options.options_day_d')"  />
              <mu-menu-item value="15" :title="'15'+$t('options.options_day_d')"  />
              <mu-menu-item value="30" :title="'30'+$t('options.options_day_d')"  />
              <mu-menu-item value="90" :title="'90'+$t('options.options_day_d')"  />
              <mu-menu-item value="365" :title="'365'+$t('options.options_day_d')"  />
            </mu-select-field>
          </div>

          <div class="hint-zone">
            <p>{{$t('Trade.Publish.balance')}}<span v-show="is_call=='true'">{{balance}} OSC</span> <span v-show="is_call=='false'">{{FFC_balance}} FFC</span> </p>
          </div>
          <div class="hint-zone1">
            <div class="publish-safe-price-currency-item1"  >
              <span v-html="$t('options.PRICE')"></span>
                  <input  @focus="input_focus('price')"  @input="check_price()"  onafterpaste="if(isNaN(value))execCommand('undo')" class="mu-text-field-input"  maxlength="7" type="number" @keydown="check_price()" :placeholder="$t('options.options_price_hint')" v-model.number="price">
                  <img src="../assets/image/icon_question.svg"  class='img-right-question1' @click="showPriceDialog" >
            </div>
            <div class="hint-zone" v-show="error_price !== ''">
              <p>{{error_price}} </p>
            </div>
          </div>
           <div class="hint-zone1">
              <div class="publish-safe-price-currency-item1" >
                <span>{{$t('options.options_fee_rating')}}</span> 
                <input  @focus="input_focus('fee_rating')"   @input="check_fee_rating()"  onafterpaste="if(isNaN(value))execCommand('undo')" class="mu-text-field-input"   maxlength="2" type="number"  @keydown="check_fee_rating()" :placeholder="$t('options.options_fee_rating_hint_short')" v-model.number="fee_rate">
              <img src="../assets/image/icon_question.svg"  class='img-right-question1' @click="showFeeRatingDialog" >
              </div>
              <div class="hint-zone" v-show="error_fee_rate != ''">
                <p>{{error_fee_rate}} </p>
              </div>
           </div>
         <div class="hint-zone1">
          <div class="publish-safe-price-currency-item1" >
            <span>{{$t('options.options_piece')}}</span> 
            <input  @focus="input_focus('piece')"  @input="check_piece()" onafterpaste="if(isNaN(value))execCommand('undo')" class="mu-text-field-input"  maxlength="10"  type="number" @keydown="check_piece()" :placeholder="$t('options.options_piece_hint_short')" v-model.number="piece">
           <img src="../assets/image/icon_question.svg"  class='img-right-question1' @click="showPieceDialog" >
          </div>
          <div class="hint-zone" v-show="error_piece !== ''">
                <p>{{error_piece}} </p>
              </div>
         </div>

          <mu-raised-button style="margin:2em 0;width:90%"  :label="$t('Trade.Publish.publish')" @click="onSubmit" class="btn" fullWidth primary/>
        </div>
      </div>
       <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore"/>
      <mu-dialog :open="isPublishTipDialog" title="发布期权提示" >
          <div  style="color:#404040;font-size:1em;">
            1、发布期权广告费：<span style="color:#0A2463">暂时免费</span><br>
            2、下单成交手续费：<span style="color:#0A2463">暂时免费</span><br>
            3、行权费：<span style="color:#0A2463">暂时免费</span> 
          </div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>
      <mu-dialog :open="isSignInDialog"  :title="$t('Trade.Publish.AdvertisingTips5')"  >
          {{$t('Trade.Publish.AdvertisingTips3')}}
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
            <mu-flat-button slot="actions" primary @click="signIn"  :label="$t('Trade.Publish.AdvertisingTips6')" />
      </mu-dialog>
   
 
      <mu-dialog :open="isGoBoundPay"  title="提示">
         {{$t('Trade.Publish.AdvertisingTips33')}}
            
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
            <mu-flat-button slot="actions" primary @click="go_bound" :label="$t('Trade.Publish.AdvertisingTips32')"/>
      </mu-dialog>
  

      <mu-dialog :open="isPriceDialog"  :title="$t('options.PRICE')">   
          行权时成交的价格。
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>

      <mu-dialog :open="isFeeRatingDialog"  :title="$t('options.options_fee_rating')">   
         {{$t('options.options_fee_rating_tip')}}
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>
      <mu-dialog :open="isPieceDialog"  :title="$t('options.options_piece')">   
        {{$t('options.options_piece_tip')}}
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      </mu-dialog>

      <mu-dialog :open="isPublishDialog"  :title="$t('options.options_publish_tip')">   
        <div style="font-size:14px;line-height:1.7" v-show="is_call=='true'">
          {{$t('options.tip_publish1')}}<br>&nbsp;&nbsp;
         {{$t("options.options_type")}}：<span style="font-size:16px;color:#24b36b">{{period}}</span>{{$t("options.options_day_p")}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#24b36b">{{price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.options_fee_rating")}}：<span style="font-size:16px;color:#24b36b">{{fee_rate}}</span>&nbsp;%<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#24b36b">{{piece}}</span>&nbsp;{{$t("options.piece")}}<br>&nbsp;&nbsp;
                {{$t("options.lock_qty")}}：<span style="font-size:16px;color:#24b36b">{{parseInt(piece)*100}}</span>&nbsp;OSC<br>&nbsp;&nbsp;
                {{$t("options.tip_publish4")}}。</div>
        <div style="font-size:14px;line-height:1.7" v-show="is_call=='false'">
                {{$t('options.tip_publish1')}}<br>&nbsp;&nbsp;
                {{$t("options.options_type")}}：<span style="font-size:16px;color:#f25c49">{{period}}</span>{{$t("options.options_day_d")}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#f25c49">{{price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.options_fee_rating")}}：<span style="font-size:16px;color:#f25c49">{{fee_rate}}</span>&nbsp;%<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#f25c49">{{piece}}</span>&nbsp;{{$t("options.piece")}}<br>&nbsp;&nbsp;
                 {{$t("options.lock_amount")}}：<span style="font-size:16px;color:#f25c49">{{parseInt(piece)*100*parseFloat(price).toFixed(4)}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.tip_publish5")}}。
                </div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
             <mu-flat-button slot="actions" primary @click="commit" :label="$t('Trade.Publish.publish')"/>
      </mu-dialog>

     <mu-dialog :open="isBuyDialog"  :title="$t('options.options_publish_tip')">   
        <div style="font-size:14px;line-height:1.7"  v-show="is_call=='true'">{{$t('options.tip_buy1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#24b36b">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
               {{$t("options.FEE1")}}：<span style="font-size:16px;color:#24b36b">{{item.fee}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#24b36b">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_buy3")}}</div>
        <div style="font-size:14px;line-height:1.7" v-show="is_call=='false'">{{$t('options.tip_buy1')}}<br>&nbsp;&nbsp;
               {{$t("options.options_price")}}：<span style="font-size:16px;color:#f25c49">{{item.price}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
               {{$t("options.FEE1")}}：<span style="font-size:16px;color:#f25c49">{{item.fee}}</span>&nbsp;FFC<br>&nbsp;&nbsp;
                {{$t("options.QTY")}}：<span style="font-size:16px;color:#f25c49">{{item.qty}}</span>&nbsp;{{item.crypto_currency}}<br>&nbsp;&nbsp;
                {{$t("options.tip_buy4")}}</div>
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
             <mu-flat-button slot="actions" primary @click="buyOptions(item)" :label="$t('Trade.Buy.Title')"/>
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
  </div>
</template>

<script>
import OptionsBottomNav from "../components/OptionsBottomNav";
import options from "../models/options";
import wallet from "../models/wallet";
import store from "../store";
import storage from "../models/storage";
import user from "../models/user";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import Clipboard from "clipboard";
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
export default {
  name: "options_trade",
  components: { OptionsBottomNav },
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
      FFC_balance: "",
      buys: [],
      sells: [],
      scroller: null,
      loading: false,
      total_buy: 1,
      total_sell: 1,

      isSignInDialog: false,
      isPublishDialog: false,
      item: "",
      error_price: "",
      error_fee_rate: "",
      error_piece: "",
      isGoBoundPay: false,
      refreshing: false,
      trigger: null,
      isBoundAdDialog: false,
      isPriceDialog: false,
      isFeeRatingDialog: false,
      isPieceDialog: false,
      isPublishTipDialog: false,
      isBuyDialog: false,
      isCancelDialog: false,
      min_qty_tip1: "",
      is_call: "true",
      price: "",
      fee_rate: "",
      piece: "",
      period: "7"
    };
  },
  beforeRouteEnter(to, from, next) {
    let limit = 20;
    options.getOptionsList("OSC", true, 0, limit).then(result => {
      let total = 0;
      let list = [];

      if (result.code === 0) {
        list = result.data.options_list;
        total = result.data.total;
      }
      next(vm => {
        vm.limit = limit;
        vm.total_buy = total;
        vm.offset_buy = list.length;
        vm.buys = list;
        vm.is_buy = true;
      });
    });
  },
  filters: {
    getFormatDate(time) {
      if (undefined == time) return "";
      // return time;
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd");
    }
  },

  created: function() {
    // this.crypto_currency = this.$store.state.user.crypto_currency;
    // this.getVersion();
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
    pay_bound() {
      this.isBoundAdDialog = false;
      this.$router.push("/pay");
    },
    showAdTrade() {
      this.isAdTradeTotalDialog = true;
    },
    showPriceDialog() {
      this.isPriceDialog = true;
    },
    showFeeRatingDialog() {
      this.isFeeRatingDialog = true;
    },
    showPieceDialog() {
      this.isPieceDialog = true;
    },
    closeDialog() {
      this.isPublishTipDialog = false;
      this.isSignInDialog = false;
      this.isPublishDialog = false;
      this.isBuyDialog = false;
      this.isCancelDialog = false;
      this.isGoBoundPay = false;
      this.isBoundAdDialog = false;
      this.isPriceDialog = false;
      this.isFeeRatingDialog = false;
      this.isPieceDialog = false;
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

    tabChange(tab) {
      if (tab === "tab1") {
        this.buys = [];
        this.sells = [];
        this.tab = tab;
        this.is_buy = false;
        this.offset_buy = 0;
        this.total_buy = 1;
        this.loadBuyMore();
      } else if (tab === "tab2") {
        this.buys = [];
        this.sells = [];
        this.tab = tab;
        this.is_buy = true;
        this.offset_sell = 0;
        this.total_sell = 1;
        this.loadSellMore();
      } else if (tab === "tab3") {
        this.error_fee_rate = "";
        this.error_price = "";
        this.error_piece = "";
        if (
          this.$store.state.user.access_token.length > 0 &&
          this.$store.state.user.name.length > 0
        ) {
          this.getBalance();
          this.tab = tab;
        } else {
          this.$router.push("/sign_in");
          return;
        }
      }
    },
    loadBuyMore() {
      if (this.tab == "tab3") {
        this.loading = false;
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.total_buy <= this.offset_buy) {
        this.loading = false;
        return;
      }
      this.loading = true;
      options
        .getOptionsList("OSC", true, this.offset_buy, this.limit)
        .then(values => {
          this.refreshing = false;
          this.loading = false;
          if (values.code === 0) {
            if (this.offset_buy == 0) {
              this.buys = [];
            }
            this.total_buy = values.data.total;
            if (this.total_buy > 0) {
              this.offset_buy =
                this.offset_buy + values.data.options_list.length;
              this.buys = this.buys.concat(values.data.options_list);
            }
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    loadSellMore() {
      if (this.tab == "tab3") {
        this.loading = false;
        return;
      }
      if (this.loading) {
        return;
      }
      if (this.total_sell <= this.offset_sell) {
        this.loading = false;
        return;
      }
      this.loading = true;

      options
        .getOptionsList("OSC", false, this.offset_sell, this.limit)
        .then(values => {
          this.refreshing = false;
          this.loading = false;
          if (values.code === 0) {
            if (this.offset_sell == 0) {
              this.sells = [];
            }
            this.total_sell = values.data.total;
            if (this.total_sell > 0) {
              this.offset_sell =
                this.offset_sell + values.data.options_list.length;
              this.sells = this.sells.concat(values.data.options_list);
            }
          }
        })
        .catch(e => {
          this.refreshing = false;
          this.loading = false;
        });
    },
    loadMore() {
      if ("/options_trade" != this.$route.path || this.tab == "tab3") {
        return;
      }
      if (this.is_buy) {
        this.loadSellMore();
      } else {
        this.loadBuyMore();
      }
    },
    getBalance() {
      wallet.balance().then(value => {
        let balance_result = value;
        if (balance_result.code === 0) {
          if (balance_result.data.hasOwnProperty("list")) {
            let balances = balance_result.data.list;
            if (balance_result.data.hasOwnProperty("list")) {
              for (let i = 0; i < balances.length; i++) {
                if (balances[i].currency == "OSC") {
                  this.balance = balances[i].available;
                }
                if (balances[i].currency == "FFC") {
                  this.FFC_balance = balances[i].available;
                }
              }
            }
          }
        }
      });
    },
    toggle() {
      this.$router.push("/options_help");
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
      if (selected === "price") {
        this.error_price = "";
      }
      if (selected === "fee_rating") {
        this.error_fee_rate = "";
      }
      if (selected === "piece") {
        this.error_piece = "";
      }
    },

    check_price() {
      if (this.price.length == 0) {
        this.error_price = this.$t("options.options_price_hint");
        return false;
      }
      if (parseFloat(this.price) <= 0) {
        this.error_price = this.$t("options.options_price_hint");
        return false;
      }
      if (!isNaN(parseInt(this.price))) {
        if (parseFloat(this.price) <= 0) {
          this.error_price = this.$t("options.options_price_hint");
          return false;
        }
        if (/^\d{1,5}(\.\d{1,4})?$/.test(this.price)) {
          let reg = /^\+?[1-9][0-9]*$/;
          if (
            parseInt(this.fee_rate) > 0 &&
            parseInt(this.fee_rate) <= 20 &&
            new RegExp(reg).test(this.price)
          ) {
            this.error_fee_rate =
              this.$t("options.options_fee_rating") +
              "值：" +
              (
                parseFloat(this.price) *
                (parseFloat(this.fee_rate) / 100.0)
              ).toFixed(4) +
              " FFC";
          }
        }
        return true;
      } else {
        this.error_price = this.$t("options.options_price_hint");
        return false;
      }
    },
    check_fee_rating() {
      if (this.fee_rate.length == 0) {
        this.error_fee_rate = this.$t("options.options_fee_rating_hint");
        return false;
      }
      let reg = /^\+?[1-9][0-9]*$/;
      if (new RegExp(reg).test(this.fee_rate) == false) {
        this.error_fee_rate = this.$t("options.options_fee_rating_hint");
        return false;
      }
      if (parseInt(this.fee_rate) <= 20 && parseInt(this.fee_rate) >= 1) {
        if (/^(?:0|[1-9][0-9]*)$/.test(this.fee_rate)) {
          if (parseFloat(this.price) > 0) {
            this.error_fee_rate =
              this.$t("options.options_fee_rating") +
              "值：" +
              (
                parseFloat(this.price) *
                (parseFloat(this.fee_rate) / 100.0)
              ).toFixed(4) +
              " FFC";
          }
        }
        return true;
      } else {
        this.error_fee_rate = this.$t("options.options_fee_rating_hint");
        return false;
      }
    },
    check_piece() {
      if (this.piece.length == 0) {
        this.error_piece = this.$t("options.options_piece_hint");
        return false;
      }
      let reg = /^\+?[1-9][0-9]*$/;
      if (new RegExp(reg).test(this.piece) == false) {
        this.error_piece = this.$t("options.options_piece_hint");
        return false;
      }
      if (parseInt(this.piece) >= 1) {
        this.error_piece = "";
        return true;
      } else {
        this.error_piece = this.$t("options.options_piece_hint");
        return false;
      }
    },

    onSubmit: function() {
      if (!this.check_price()) {
        this.showToast(this.$t("options.options_price_hint"));
        return;
      }
      if (!this.check_fee_rating()) {
        this.showToast(this.$t("options.options_fee_rating_hint"));
        return;
      }
      if (!this.check_piece()) {
        this.showToast(this.$t("options.options_piece_hint"));
        return;
      }
      this.isPublishDialog = true;
    },
    commit() {
      this.isPublishDialog = false;
      options
        .getOptionsSubmit(
          "OSC",
          this.is_call,
          this.price,
          this.fee_rate,
          this.piece,
          this.period
        )
        .then(result => {
          if (result.code === 0) {
            this.price = "";
            this.fee_rate = "";
            this.piece = "";
          }

          if (this.is_call == "true") {
            this.tabChange("tab1");
          } else {
            this.tabChange("tab2");
          }
          this.is_call = "true";
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    openPraiseMask: function(item) {
      if (
        this.$store.state.user.access_token.length > 0 &&
        this.$store.state.user.name.length > 0
      ) {
        if (!this.$store.state.user.has_payment_password) {
          this.$router.push("/set_assets_pwd");
        } else {
          this.item = item;
          this.isBuyDialog = true;
        }
      } else {
        this.$router.push("/sign_in");
      }
    },
    buyOptions(item) {
      this.isBuyDialog = false;
      options
        .getOptionsBuy(item.id, item.crypto_currency)
        .then(result => {
          setTimeout(() => {
            this.$router.push("/options_order");
          }, 1000);
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
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
          if (item.is_call) {
            this.tabChange("tab1");
          } else {
            this.tabChange("tab2");
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
@import "../assets/css/options_trade.scss";
</style>
