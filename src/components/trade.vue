<template>
  <div class="content-trade-home" style="height: 100%;">
    <mu-toast v-if="toast" :message="message" @close="hideToast" />

    <!-- <div class="popu_circle" @click="publish" v-show="!isPlaceOrder">{{$t('Text.wt')}}</div> -->
    <!-- <div v-show="isPlaceOrder">
   <div style="background:#0A2463;height:100%;z-index:999;padding-bottom:20em;">
    <div class="top-order">
      <div class="center-order">{{item.is_buy ? $t('Trade.Sell.Title'):$t('Trade.Buy.Title')}} {{crypto_currency}}</div>
      <div class="left-order" @click="goBack" />
    </div>

       <div style="width: 90%;
    margin: 2em auto 0.3em auto;
    background: #ffffff;
    border-radius: 0.5em;">
        
         <div class="header" v-show="index==0" >{{nameFirst}}</div>
         <div class="header1" v-show="index==1" >{{nameFirst}}</div>
         <div class="header2" v-show="index==2" >{{nameFirst}}</div>
         <div class="header3" v-show="index==3" >{{nameFirst}}</div>
         <div class="header4" v-show="index==4" >{{nameFirst}}</div>
         <div class="header5" v-show="index==5" >{{nameFirst}}</div>
         <div class="header6" v-show="index==6" >{{nameFirst}}</div>
         <div class="header7" v-show="index==7" >{{nameFirst}}</div>
         <div class="header8" v-show="index==8" >{{nameFirst}}</div>

           <div v-show="false" class="vip1"></div>

         <div style="font-size:1.2em;color:#212B67;padding-top:2em;font-weight: 600;">{{item.name}}</div>


         <div style="display:flex;margin-top:1em;padding-bottom:1em;">
            <div style="flex:1;">
               <div style="color:#6D778B;font-size:0.8em;">{{user_created}}</div>
               <div style="color:#6D778B;font-size:0.75em;margin-top:0.5em;">{{$t('Text.zcsj')}}</div>
            </div>
            <div style="flex:1;">
                <div style="color:#6D778B;font-size:0.8em;">{{item.trade_success_count}}</div>
               <div style="color:#6D778B;font-size:0.75em;margin-top:0.5em;">{{$t('Trade.TotalMakeContract')}}</div>
            </div>
            <div style="flex:1;">
                <div style="color:#6D778B;font-size:0.8em;">{{item.trade_success_ratio}}%</div>
                <div style="color:#6D778B;font-size:0.75em;margin-top:0.5em;">{{$t('Text.cjl')}}</div>
            </div>
         </div>

       </div>



<div class="icon_buy_input" style="width: 90%;
    margin: 0.4em auto 1em auto;
    background: #ffffff;
    border-radius: 0.5em;">

 <div style="color:#0A2463;font-size:0.8em;">{{$t('Text.price')}} <span style="float:right">{{item.price}} {{trade_currency}}</span></div>
  <div class="input-order" style="margin-top:1.2em">
           
    <div class="captcha-zone-order" v-show="item.is_buy"  >
        <div class="captcha-zone-tip-order" style="font-size:0.8em">{{$t('Trade.Buy.TradeCryptoLimit')}}：( {{crypto_currency}})</div>
        <mu-text-field  v-model.trim="qty[0]" class="input-zone-order" :hintText="item.min_qty+'-'+item.max_qty+' '+ crypto_currency" fullWidth @focus="input_focus('qty')" :errorText="qtyError" 
        @input="change_qty($event)"/>  
        <div class="div-send-code-order1" style="color:#3180D0"  @click="onAllIn">{{$t('Text.qb')}}
        </div>
    </div>
    <div class="captcha-zone-order" v-show="item.is_buy"  >
        <div class="captcha-zone-tip-order" style="font-size:0.8em">{{$t('Text.jyze')}}：( {{trade_currency}} )</div>
        <mu-text-field  v-model.trim="amount[0]" class="input-zone-order" :hintText="item.min_amount+'-'+item.max_amount +' '+ trade_currency" fullWidth @focus="input_focus('amount')" :errorText="amountError" 
        @input="change_amount($event)"/>
       
        <div class="div-send-code-order1" style="color:#3180D0"  @click="onAllIn">{{$t('Text.qb')}}
        </div>
    </div>
      
    <div class="captcha-zone-order" v-show="!item.is_buy">
        <div class="captcha-zone-tip-order" style="font-size:0.8em">{{$t('Trade.Buy.TradeCryptoLimit')}}：( {{crypto_currency}} )</div>
        <mu-text-field  v-model.trim="qty[0]" class="input-zone-order" :hintText="item.min_qty+'-'+item.max_qty+' '+ crypto_currency" fullWidth @focus="input_focus('qty')" :errorText="qtyError" 
        @input="change_qty($event)"/>
         <div class="div-send-code-order1" style="color:#3180D0" @click="onAllIn1">{{$t('Text.qb')}} 
        </div>  
        
 
    </div>
    <div class="captcha-zone-order" v-show="!item.is_buy">
        <div class="captcha-zone-tip-order" style="font-size:0.8em">{{$t('Text.jyze')}}：( {{trade_currency}} )</div>
        <mu-text-field  v-model.trim="amount[0]" class="input-zone-order" :hintText="item.min_amount+'-'+item.max_amount+' '+ trade_currency" fullWidth @focus="input_focus('amount')" :errorText="amountError" 
        @input="change_amount($event)"/>

      <div class="div-send-code-order1" style="color:#3180D0"  @click="onAllIn1">{{$t('Text.qb')}}
        </div>
        
        <div style="text-align: right; font-size: 0.7em;color: #6D778B;margin-top: -1em;padding-top:-1em;margin-bottom:1em" >{{$t('Text.balance')}} {{this.user_available}} {{trade_currency}}</div>
    </div>

  </div>
   <div style="display:flex">
      <div style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-left:-2em; "></div>  
      <div style="width:100%;height:2px;border-top:1px dashed #212B67;margin-top:1em;"></div>
       <div style="width:2em;height:2em;border-radius: 4em;background:#212B67;margin-right:-2em; "></div>  
      
    </div>


  <div style="color:#0A2463;margin-top:1em;display:flex;font-size:0.8em">{{$t('Text.sxf')}} <div @click="goAcount" class="ii"></div>  <div style="flex:1; text-align:right">{{parseFloat(this.user_fee_rate)*100 +" %"}}</div></div>

  <div  v-show="!item.is_buy" style="color:#0A2463;margin-top:0.5em;font-size:0.8em">{{$t('Text.zjzf')}} <span style="float:right;color:ff4d2d;font-weight: 600;">{{amount[0]? (parseFloat(amount[0]) + (parseFloat(amount[0])* parseFloat(this.user_fee_rate)))+" USDT":"0 USDT"}}</span></div>

  <div  v-show="item.is_buy" style="color:#0A2463;margin-top:0.5em;font-size:0.8em">{{$t('Text.cssr')}} <span style="float:right;color:ff4d2d;font-weight: 600;">{{amount[0]? (parseFloat(amount[0]) - (parseFloat(amount[0])* parseFloat(this.user_fee_rate)))+" USDT":"0 USDT"}}</span></div>

  
</div>

  <mu-raised-button v-show="!item.is_buy" :label="$t('Trade.Buy.BtnBuy')" @click="showPassword" class="btn-order"  fullWidth primary/>
  <mu-raised-button v-show="item.is_buy" :label="$t('Trade.Sell.BtnSell')" @click="showPassword" class="btn-order"  fullWidth primary/>

        </div>
    </div>-->
    <!--list  diviler-->
    <div class="top">
      <div class="tab1">
        <button
          class="button"
          :class="{buy:isBuy}"
          @click="tabTypeChange(1)"
        >{{$t('Trade.Table.Buy')}}</button>
        <button
          class="button"
          :class="{buy:!isBuy}"
          @click="tabTypeChange(2)"
        >{{$t('Trade.Table.Sell')}}</button>
        <div class="select-list" @click="showPop()">
          <span>{{ crypto_currency }}/USDT</span>
          <div class="img-arrow"></div>
        </div>
      </div>
    </div>
    <!--中间start-->

     <mu-refresh-control :refreshing="refreshing" :trigger="trigger" @refresh="refresh" @load="load" /> 

    <div class="list-wrap" style="-webkit-overflow-scrolling : touch;height: 100%;overflow: scroll;">
      <div class="publish-bg">
        <div class="publish-first">{{$t('Trade.hint1')}}</div>
        <div class="publish-second">{{$t('Trade.hint2')}}</div>
        <div class="publish-btn" @click="publish" v-show="!isPlaceOrder">{{$t('Trade.hint3')}}</div>
      </div>
      <div class="item-list-content-zone1">
        <img
          src="../assets/image/icon_nodata.png"
          style="margin: 5rem auto 0.5rem auto;
                height:3em;
                width: 4.05em;"
          v-show="isLeftShow"
        />
        <div
          style="margin: 0px auto 0.5em auto;padding-bottom: 5rem;
                font-size:1em;
                color:#A9B2C3"
          v-show="isLeftShow"
        >{{$t('Text.zwsj') }}</div>
        <div class="item-list-content-big" v-for="(item) in list" :key="item.created">
          <div class="item-list-content-big-content">
            <div class="item-first-line">
              <div class="first-line-left">
                <div class="first-word">{{item.nameFirst}}</div>
                <div class="item-name">{{item.name | stringSplice}}</div>
                <div class="item-vip"></div>
              </div>
              <div
                class="first-line-right"
              >{{$t('Trade.Transaction') }}{{item.trade_success_count}} | {{$t('Trade.TurnoverRate') }}{{ parseInt(item.trade_success_ratio) }}%</div>
            </div>
            <div class="item-second-line">
              <div class="second-line-left">
                <div class="item-coin">{{item.price.toFixed(2)}}</div>
                <div class="item-unit">USDT/{{item.symbol| coinchange0}}</div>
              </div>
              <div class="second-line-right"></div>
            </div>
            <div class="item-third-line">
              <div class="third-line-left">
                <div class="third-left-wrap">
                  <div class="item-sub-title">{{$t('Text.abalance')}}：</div>
                  <div>{{item.crypto_currency,item.limit_qty| data_to3}} {{item.symbol| coinchange0}}</div>
                </div>
                <div class="third-left-wrap">
                  <div class="item-sub-title">{{$t('Trade.limit')}}：</div>
                  <div>{{item.crypto_currency,item.min_qty| data_to3}}-{{item.crypto_currency,item.max_qty| data_to3}} {{item.symbol| coinchange0}}</div>
                </div>
              </div>
              <div class="third-line-right">
                <button
                  v-show="$store.state.user.name.toUpperCase() == item.name.toUpperCase() && isBuy"
                  @click="look(item)"
                >{{$t('Text.look')}}</button>
                <button
                  v-show="$store.state.user.name.toUpperCase() == item.name.toUpperCase() && !isBuy"
                  @click="look(item)"
                  class="sell"
                >{{$t('Text.look')}}</button>

                <button
                  v-show="$store.state.user.name.toUpperCase() !== item.name.toUpperCase() && isBuy"
                  @click="placeOrder(item)"
                >{{$t('Trade.Table.Buy')}} {{item.crypto_currency}}</button>
                <button
                  class="sell"
                  v-show="$store.state.user.name.toUpperCase() !== item.name.toUpperCase() && !isBuy"
                  @click="placeOrder(item)"
                >{{$t('Trade.Table.Sell')}} {{item.crypto_currency}}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <mu-infinite-scroll :scroller="scroller" :loading="loading1" @load="loadMore" />
    <mu-dialog :open="isPublishTipDialog" :title="$t('Trade.Publish.AdvertisingTips')">
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

    <mu-dialog :open="isPasswordDialog" :title="$t('User.SetMenuAssertPwd')" @click="closeDialog">
      <div>
        <mu-text-field
          v-model="passwordValue"
          :label="$t('User.SetMenuAssertPwd')"
          class="input-zone"
          :hintText="$t('Wallet_Detail.pwd_validate_tip')"
          type="password"
          fullWidth
          :errorText="pwd_error"
        />
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')" />
          <mu-flat-button slot="actions" primary @click="submit" :label="$t('Text.tj')" />
        </div>
      </div>
    </mu-dialog>

    <div
      style="  width: 100%;
        height: 100%;
        position: fixed;
        background-color: rgba(0,0,0,0.1);
        top: 0px;z-index:999;"
      v-show="isProgressDialog"
      @click="closeDialog"
    >
      <img @click="closeDialog" src="../assets/image/icon_progress.png" class="progress" />
    </div>

    <!--中间end-->
    <BottomNav></BottomNav>
    <PopupPicker
      ref="popupPicker"
      v-model="selectPopVal"
      :picker-data="symbolList"
      :cols="1"
      :on-confirm="confirmHandler"
    ></PopupPicker>
    <div
      v-if="false"
      style="  width: 100%;
        height: 100%;
        position: fixed;
        top: 0px;z-index:999;"
      class="reset-dialog"
    >
      <div
        style="
        margin: 50% auto 0 auto;
        background: #ffffff;
        border-radius: 0.3em;"
        class="reset-dialog-wrap"
      >
        <div class="fs-16" style="padding-top:1.5em;color: #242932;">{{$t('User.SetMenuAssertPwd')}}</div>
        <div
          @click="reset_sign_pwd"
          style="width:90%;margin:0 auto 0 auto;text-align: right;font-size:1em;color:#3180D0;"
        >{{$t('SignIn.forgetPasswordText')}}</div>
        <div style="display: flex;flex-flow: row nowrap;justify-content: space-between;">
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
    </div>
    <PopupDialog
      v-if="isShowSetAddress"
      :confirm="goToSetAddress"
      :confirmText="goToSetText"
      :title="SetAddressInfo"
      :cancel="closeSetAddressDialog"
    ></PopupDialog>
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
import PopupPicker from "../common/PopupPicker";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import PopupDialog from "../common/PopupDialog";
export default {
  name: "trade",
  components: { BottomNav, PopupPicker, PopupDialog },
  data() {
    return {
      isFirstLoading: true,
      popupPicker: null,
      selected: "",
      toast: false,
      message: "",
      tab: "tab1",
      offset_buy: 0,
      offset_sell: 0,
      limit: 20,
      balance: "",
      crypto_currency: this.$store.state.user.crypto_currency,
      trade_currency: "USDT",
      is_trading: false,
      buys: [],
      sells: [],
      scroller: null,
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
      isProgressDialog: false,
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
      buyTab1: "",
      buyTab2: "",
      buyTab3: "",
      buyTab4: "",
      buyTab5: "",
      buyTab6: "",
      index: 0,
      crypto_currency: "SBO",
      isBuy: true,
      trade_total_usdt: 0,
      user_created: "",
      passwordValue: "",
      isPasswordDialog: false,
      pwd_error: "",
      nameFirst: "",
      isLeftShow: false,
      isRightShow: false,
      min_qty_tip1: "",
      symbolList: [],
      selectSymbol: "",
      list: [],
      isFirstLoad: false,
      selectPopVal: "",
      currentAddressState: false,
      isGetAddressState: false,
      isShowSetAddress: false, // 显示设置收款地址弹窗
      SetAddressInfo: ""
    };
  },
  //   beforeRouteEnter(to, from, next) {
  //     let crypto_currency = store.state.user.crypto_currency;
  //     if (!crypto_currency) crypto_currency = "BTC";
  //     let trade_currency = "USDT";
  //     let is_buy = false;
  //     let limit = 20;
  //     let isLeftShow = false
  //     // let symbol = crypto_currency + "_" + trade_currency;
  //     let params = {
  //       symbol: "", //symbol.toLowerCase(),
  //       is_buy: is_buy,
  //       offset: 0,
  //       limit: limit
  //     };
  //     let buyTab1 = ""
  //      let buyTab2 = ""
  //       let buyTab3 = ""
  //        let buyTab4 = ""
  //         let buyTab5 = ""
  //          let buyTab6 = ""
  //     trade.adList(params).then(values => {
  //       let buys = [];
  //       if (values.code === 0) {
  //         buys = values.data.lists;
  //       }
  //       if(buys.length==0)
  //          isLeftShow = true
  //       buys.forEach(element => {
  //         var charas = element.name.substring(0,1).toUpperCase()
  //                var index1 =  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(charas)
  //                element.index =  (index1 + 1)%9;
  //                element.nameFirst = charas
  //       });
  //       for(var i=0;i<values.data.symbols.length;i++){
  //                var element =  values.data.symbols[i]

  //                if(i==0){
  //                  buyTab1 =  element.split("_")[0].toUpperCase();
  //                  crypto_currency = buyTab1
  //                }
  //               if(i==1){
  //                  buyTab2 =  element.split("_")[0].toUpperCase();
  //                }
  //               if(i==2){
  //                  buyTab3 =  element.split("_")[0].toUpperCase();
  //                }
  //               if(i==3){
  //                  buyTab4 =  element.split("_")[0].toUpperCase();
  //                }
  //               if(i==4){
  //                  buyTab5 =  element.split("_")[0].toUpperCase();
  //                }
  //                if(i==5){
  //                  buyTab6 =  element.split("_")[0].toUpperCase();
  //                }
  //             }
  //       next(vm => {
  //         vm.crypto_currency = crypto_currency;
  //         vm.trade_currency = trade_currency;
  //         vm.is_buy = is_buy;
  //         vm.limit = limit;
  //         vm.total_buy = values.data.total;
  //         vm.offset_buy = values.data.lists.length;
  //        vm.isLeftShow = isLeftShow;

  //    vm.buyTab4 = buyTab4
  //     vm.buyTab5 = buyTab5
  //      vm.buyTab6 = buyTab6
  //       vm.buyTab3 = buyTab3
  //      vm.buyTab2 = buyTab2
  //  vm.buyTab1 = buyTab1
  // //  buys = [{name:"FGY",nameFirst:"F",created:12356456,min_qty:1,symbol:"BTC_USDT",min_amount:123,max_amount:35,trade_success_ratio:34,trade_success_count:766,price:345}]
  //         vm.buys = buys;
  //         if (vm.buys.length > 0) {
  //           vm.item = buys[0];
  //         }
  //       });
  //     });
  //   },
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
      if (undefined == symbol) return "";
      return symbol.split("_")[0].toUpperCase();
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 1).toUpperCase();
    }
  },
  created: function() {
    window.aaa = this;
    this.getAddressState();
    this.loadBuyMore();
  },
  mounted() {
    this.scroller = this.$el;
    this.trigger = this.$el;
  },
  computed: {
    goToSetText() {
      return this.$t('Trade.GoToSet');
    }
  },
  watch: {
    isLeftShow() {
      if (this.isLeftShow) {
        document.getElementById('app').style.background = "white";
        document.querySelector('.content-trade-home').style.background = "white";
      } else {
        document.getElementById('app').style.background = "#f7f7f7";
        document.querySelector('.content-trade-home').style.background = "#f7f7f7";
      }
    }
  },
  methods: {
		load:function(){
			alert(1111)
		},
		goToSetAddress() {
      this.isShowSetAddress = false;
      this.$router.push("/Add_address");
    },
    closeSetAddressDialog() {
      this.isShowSetAddress = false;
    },
    // 获取地址状态
    getAddressState(callback) {
      let symbol = this.crypto_currency + "_" + this.trade_currency;
      let params = {
        symbol: symbol.toLowerCase()
      };
      this.isGetAddressState = false;
      trade.getPublishRestriction(params).then(result => {
        if (result.data) {
          this.isGetAddressState = true;
          callback && callback(result.data.has_receiver_address);
          this.currentAddressState = result.data.has_receiver_address;
        }
      }).catch(e => {
        if (this.isFirstLoading) {
          this.isFirstLoading = false;
          return;
        }
        HttpResultCode.validate(e.code);
      });
    },
    refresh() {
      // if (this.refreshing) return;
      // this.refreshing = true;
      this.buys = [];
      this.list = [];
      this.sells = [];
      this.offset_buy = 0;
      this.total_buy = 1;
      this.offset_sell = 0;
      this.total_sell = 1;
      this.isLeftShow = false;
      this.isRightShow = false;
      if (this.isBuy) {
        this.loadBuyMore();
      } else {
        this.loadSellMore();
      }
      this.getAddressState();
    },
    showPassword() {
      this.isPasswordDialog = true;
    },
    tabBuyChange(tabIndex) {
      if (
        this.loading &&
        this["buyTab" + tabIndex].toUpperCase() != this.crypto_currency
      ) {
        // 当是loading的时候，且不是当前列刷新，loading设置为false
        this.loading = false;
      }
      if (tabIndex == 1) {
        this.crypto_currency = this.buyTab1.toUpperCase();
      } else if (tabIndex == 2) {
        this.crypto_currency = this.buyTab2.toUpperCase();
      } else if (tabIndex == 3) {
        this.crypto_currency = this.buyTab3.toUpperCase();
      } else if (tabIndex == 4) {
        this.crypto_currency = this.buyTab4.toUpperCase();
      } else if (tabIndex == 5) {
        this.crypto_currency = this.buyTab5.toUpperCase();
      } else if (tabIndex == 6) {
        this.crypto_currency = this.buyTab6.toUpperCase();
      }
      this.refresh();
    },
    tabTypeChange(tabIndex) {
      this.loading = false;
      if (tabIndex == 1) {
        this.isBuy = true;
      } else if (tabIndex == 2) {
        this.isBuy = false;
      }
      this.refresh();
    },
    onAllIn1() {
      if (parseFloat(this.user_available) <= 0) return;
      if (parseFloat(this.item.max_amount) > parseFloat(this.user_available)) {
        this.amount = [];
        var aa =
          parseFloat(this.user_available) -
          parseFloat(this.user_available) * parseFloat(this.user_fee_rate);
        this.amount.push(aa);
        this.qty = [];
        var vvv = parseFloat(aa) / parseFloat(this.item.price);
        this.qty.push(vvv);
      } else {
        this.amount = [];
        this.amount.push(this.item.max_amount);
        this.qty = [];
        var vvv =
          parseFloat(this.item.max_amount) / parseFloat(this.item.price);
        this.qty.push(vvv);
      }
    },
    onAllIn() {
      this.amount = [];
      this.amount.push(this.item.max_amount);
      this.qty = [];
      var vvv = parseFloat(this.item.max_amount) / parseFloat(this.item.price);
      this.qty.push(vvv);
    },
    buyTabChange(val) {
      this.isBuy = val;
      this.refresh();
    },
    goAcount() {
      this.$router.push("/about_center");
    },
    publish() {
      let logic = () => {
        if (this.currentAddressState) {
          this.$router.push("/publish");
        } else {
          this.SetAddressInfo =
            this.$t("Trade.PleaseSet") +
            this.crypto_currency +
            this.$t("Trade.AddressAccount");
          this.isShowSetAddress = true;
        }
      };
      if (this.isGetAddressState) {
        logic();
      } else {
        this.getAddressState(() => {
          logic();
        });
      }
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
      this.isProgressDialog = false;
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
    confirmHandler(data) {
      this.crypto_currency = data.str.toUpperCase();
      this.refresh();
    },
    showPop() {
      this.$refs.popupPicker.showPop();
    },
    loadBuyMore() {
      if (this.loading) {
        return;
      }

      if (this.total_buy <= this.offset_buy) {
        this.loading = false;
        this.refreshing = false;
        return;
      }
      this.loading = true;
      let symbol = this.crypto_currency + "_" + this.trade_currency;
      let params = {
        symbol: symbol.toLowerCase(),
        is_buy: false,
        offset: this.offset_buy,
        limit: this.limit
      };
      const current_crypto_currency = this.crypto_currency;
      if (this.offset_buy == 0) this.isProgressDialog = true;
      trade
        .adList(params)
        .then(values => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
          if (current_crypto_currency != this.crypto_currency) {
            // 丢弃不是当前列的数据
            return false;
          }
          if (values.code === 0) {
            if (this.offset_buy == 0) {
              this.buys = [];
              this.list = [];
            }

            this.initTab();
            if (values.data.symbols) {
              this.symbolList = [];
              var list = [];
              values.data.symbols.forEach((item, index) => {
                list.push({
                  symbol: item,
                  id: "0" + index + "",
                  name: item.split("_")[0].toUpperCase()
                });
              });
              if (!this.isFirstLoad) {
                this.isFirstLoad = true;
                this.selectPopVal = this.crypto_currency;
              }
              // 因为picker数据结构必须包裹一层
              this.symbolList.push(list);
            }
            for (var i = 0; i < values.data.symbols.length; i++) {
              var element = values.data.symbols[i];
              if (i == 0) {
                this.buyTab1 = element.split("_")[0].toUpperCase();
              }
              if (i == 1) {
                this.buyTab2 = element.split("_")[0].toUpperCase();
              }
              if (i == 2) {
                this.buyTab3 = element.split("_")[0].toUpperCase();
              }
              if (i == 3) {
                this.buyTab4 = element.split("_")[0].toUpperCase();
              }
              if (i == 4) {
                this.buyTab5 = element.split("_")[0].toUpperCase();
              }
              if (i == 5) {
                this.buyTab6 = element.split("_")[0].toUpperCase();
              }
            }
            this.total_buy = values.data.total;
            if (this.total_buy > 0) {
              this.offset_buy = this.offset_buy + values.data.lists.length;
              values.data.lists.forEach(element => {
                var charas = element.name.substring(0, 1).toUpperCase();
                var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);
                element.index = (index1 + 1) % 9;
                element.nameFirst = charas;
              });
              // this.buys = this.buys.concat(values.data.lists);
              this.list = this.list.concat(values.data.lists);
            }
            if (this.list.length == 0) {
              this.isLeftShow = true;
            } else {
              this.isLeftShow = false;
            }
          }
        })
        .catch(e => {
          console.error(e);
          this.refreshing = false;
          this.loading = false;
          this.isProgressDialog = false;
        });
    },
    loadSellMore() {
      if (this.loading) {
        return;
      }
      if (this.total_sell <= this.offset_sell) {
        this.loading = false;
        this.refreshing = false;
        return;
      }
      this.loading = true;
      let symbol = this.crypto_currency + "_" + this.trade_currency;
      let params = {
        symbol: symbol.toLowerCase(),
        is_buy: true,
        offset: this.offset_sell,
        limit: this.limit
      };
      const current_crypto_currency = this.crypto_currency;
      if (this.offset_sell == 0) this.isProgressDialog = true;
      trade
        .adList(params)
        .then(values => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
          if (current_crypto_currency != this.crypto_currency) {
            // 丢弃不是当前列的数据
            return false;
          }
          if (values.code === 0) {
            if (this.offset_sell == 0) {
              this.sells = [];
            }

            this.initTab();
            if (values.data.symbols) {
              this.symbolList = [];
              var list = [];
              values.data.symbols.forEach((item, index) => {
                list.push({
                  symbol: item,
                  id: "0" + index + "",
                  name: item.split("_")[0].toUpperCase()
                });
              });
              // 因为picker数据结构必须包裹一层
              this.symbolList.push(list);
            }
            for (var i = 0; i < values.data.symbols.length; i++) {
              var element = values.data.symbols[i];
              if (i == 0) {
                this.buyTab1 = element.split("_")[0].toUpperCase();
              }
              if (i == 1) {
                this.buyTab2 = element.split("_")[0].toUpperCase();
              }
              if (i == 2) {
                this.buyTab3 = element.split("_")[0].toUpperCase();
              }
              if (i == 3) {
                this.buyTab4 = element.split("_")[0].toUpperCase();
              }
              if (i == 4) {
                this.buyTab5 = element.split("_")[0].toUpperCase();
              }
              if (i == 5) {
                this.buyTab6 = element.split("_")[0].toUpperCase();
              }
            }
            this.total_sell = values.data.total;
            if (this.total_sell > 0) {
              this.offset_sell = this.offset_sell + values.data.lists.length;
              values.data.lists.forEach(element => {
                var charas = element.name.substring(0, 1).toUpperCase();
                var index1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charas);
                element.index = (index1 + 1) % 9;
                element.nameFirst = charas;
              });
              // this.sells = this.sells.concat(values.data.lists);
              this.list = this.list.concat(values.data.lists);
            }
            // if (this.sells.length == 0) {
            //   this.isRightShow = true;
            // } else {
            //   this.isRightShow = false;
            // }
            if (this.list.length == 0) {
              this.isLeftShow = true;
            } else {
              this.isLeftShow = false;
            }
          }
        })
        .catch(e => {
          this.isProgressDialog = false;
          this.refreshing = false;
          this.loading = false;
        });
    },
    initTab() {
      this.buyTab1 = "";
      this.buyTab2 = "";
      this.buyTab3 = "";
      this.buyTab4 = "";
      this.buyTab5 = "";
      this.buyTab6 = "";
    },
    handleChange(val) {
      this.crypto_currency = val;
      this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      this.offset_buy = 0;
      this.offset_sell = 0;
      this.loading = false;
      if (this.tab == "tab1") {
        this.is_buy = false;
      }
      if (this.tab == "tab2") {
        this.is_buy = true;
      }
      this.buys = [];
      this.sells = [];
      this.loadMore();
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
    loadMore() {
      // console.log("this.crypto_currency  = " + this.crypto_currency);
      if ("/trade" != this.$route.path) {
        // console.log('this.$route.path = '+this.$route.path)
        return;
      }
      // console.log(
      //   this.is_buy + "this.crypto_currency 22 = " + this.crypto_currency
      // );
      if (this.is_buy) {
        this.loadSellMore();
      } else {
        this.loadBuyMore();
      }
    },
    // publishCryptoCurrencyChange(val) {
    //   this.publishCryptoCurrency = val;
    //   this.init_ad();
    //   if (
    //     this.publishCryptoCurrency == "BTC" ||
    //     this.publishCryptoCurrency == "LTC" ||
    //     this.publishCryptoCurrency == "ETH"
    //   )
    //     trade
    //       .getMarketPrice(this.publishCryptoCurrency, this.publishTradeCurrency)
    //       .then(result => {
    //         // vm.form.margin=m
    //         this.autoPriceValue = result.data.price;
    //         this.normalprice = result.data.price;
    //         // vm.form.magprice=((m*0.01+1)*vm.form.normalprice).toFixed(3)
    //       });
    //   trade
    //     .getPublishRestriction(this.publishCryptoCurrency)
    //     .then(result => {
    //       this.balance = result.data.balance;
    //       this.online_account_limit = result.data.online_account_limit;
    //       this.trade_fee_rate = result.data.trade_fee_rate;
    //       this.max_qty_tip =
    //         this.$t("Trade.Publish.AdvertisingTips13") +
    //         this.online_account_limit +
    //         " " +
    //         this.publishCryptoCurrency;
    //       this.min_qty_tip =
    //         this.$t("Trade.Publish.AdvertisingTips13") +
    //         this.online_account_limit +
    //         " " +
    //         this.publishCryptoCurrency;
    //       this.publishAdShowTip =
    //         "大于 " +
    //         this.online_account_limit +
    //         " " +
    //         this.publishCryptoCurrency +
    //         " 才显示广告";
    //       this.isAlipay = result.data.alipay_on;
    //       this.isWeChat = result.data.wechat_pay_on;
    //       this.isBank = result.data.bankcard_on;
    //       if (this.balance < this.online_account_limit && !this.isPlaceOrder) {
    //         this.showToast(
    //           this.$t("Trade.Publish.AdvertisingTips20") +
    //             this.online_account_limit +
    //             " " +
    //             result.data.crypto_currency +
    //             this.$t("Trade.Publish.AdvertisingTips21")
    //         );

    //         // vm.form_error = true
    //         /*
    //           vm.$alert(vm.$t('Trade.Publish.BalanceLimitContent')+ vm.online_account_limit, vm.$t('Trade.Publish.BalanceLimitTitle'), {
    //             confirmButtonText: vm.$t('Trade.Publish.BalanceLimitBtn'),
    //             callback: action => {

    //             },
    //             type: 'error'
    //           });
    //           */
    //       }
    //     })
    //     .catch(e => {
    //       HttpResultCode.validate(e.code);
    //     });
    // },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
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
      this.isPlaceOrder = false;
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
      this.$router.push({
        name: "place_order",
        params: {
          symbol: item.symbol.toLowerCase(),
          id: item.id
        }
      });
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
            symbol: trade.symbol.toLowerCase(),
            v:new Date().getTime()
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
<style lang="scss">
@import "../assets/css/trade.scss";
</style>
