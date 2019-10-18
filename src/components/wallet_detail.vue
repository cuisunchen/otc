<template>
  <div class="content" style="padding-top:10em;background:#fff">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">{{crypto_currency}}&nbsp;&nbsp;{{$t('Basic.'+crypto_currency)}}</div>
      <div class="left" @click="goBack" />
      <div class="right" @click="bills">{{$t('Wallet_Detail.detail')}}</div>
    </div>
    <div class="wallet-common-zone">
      <div class="wallet-common-bund-address" >
        <p class="wallet-common-bund-address-balance">{{$t('Wallet_Detail.balance')}}</p>
        <div class="wallet-common-bund-address-balance-value"><span class="span-left">{{balance}}</span>&nbsp;<span class="span-right">&nbsp;{{crypto_currency}}</span></div>
        <div class="wallet-common-bund-address-balance-lock-value"><span class="span-left">{{$t('Wallet_Detail.Freezing')}}</span>&nbsp;<span class="span-right">{{locked}}&nbsp;{{crypto_currency}}</span></div>
     </div>
    </div>                                                
    <div class="tab-wallet">               
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Wallet_Detail.top_up')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Wallet_Detail.withdrawal')}}</button>
    </div>
    <div class="wallet-content" v-show="isShowContentView&&tab=='tab1'">
      <!--common-->
      <!--绑定地址-->
      <div class="wallet-bund-address" v-show="isShowBoundAddressView&&isRechargeValue" > 
       <mu-auto-complete v-show="crypto_currency === 'OSC'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.osc_address_hint_text')" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'OSC'" :label="$t('Wallet_Detail.osc_address_bound')" style="margin-top:0.5em;" @click="commit_bund_address" class="btn" fullWidth primary/>
      <mu-auto-complete v-show="crypto_currency === 'DGC'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.dgc_address_hint_text')" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'DGC'" :label="$t('Wallet_Detail.dgc_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
      <mu-auto-complete v-show="crypto_currency === 'CBC'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.cbc_address_hint_text')" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'CBC'" :label="$t('Wallet_Detail.cbc_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
      <mu-auto-complete v-show="crypto_currency === 'EGD'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.egd_address_hint_text')" fullWidth @focus="input_focus('egd')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'EGD'" :label="$t('Wallet_Detail.egd_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
      <mu-auto-complete v-show="crypto_currency === 'FFTS'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.ffts_address_hint_text')" fullWidth @focus="input_focus('ffts')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'FFTS'" :label="$t('Wallet_Detail.ffts_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
       <mu-auto-complete v-show="crypto_currency === 'DNA'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.dna_address_hint_text')" fullWidth @focus="input_focus('dna')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'DNA'" :label="$t('Wallet_Detail.dna_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
   
   
   <mu-auto-complete v-show="crypto_currency === 'FFC'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.ffc_address_hint_text')" fullWidth @focus="input_focus('ffc')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'FFC'" :label="$t('Wallet_Detail.ffc_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_address" class="btn" fullWidth primary/>
   
   
   
   
    <mu-auto-complete v-show="crypto_currency === 'XDAG'"  v-model.trim="bund_address" class="input-zone" :hintText="$t('Wallet_Detail.xdag_address_hint_text')" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
      <mu-raised-button v-show="crypto_currency === 'XDAG'" :label="$t('Wallet_Detail.xdag_address_bound')" style="margin-top:0.5em;"  @click="commit_bund_xdag_address" class="btn" fullWidth primary/>
      <div class="recharge_notice_zone">
          <div class="recharge_notice"  v-html="NoticeOSC" v-show="crypto_currency === 'OSC'"></div>
          <div class="recharge_notice"  v-html="NoticeDGC" v-show="crypto_currency === 'DGC'"></div>
          <div class="recharge_notice"  v-html="NoticeXDAG" v-show="crypto_currency === 'XDAG'"></div>
          <div class="recharge_notice"  v-html="NoticeCBC" v-show="crypto_currency === 'CBC'"></div>
          <div class="recharge_notice"  v-html="NoticeEGD" v-show="crypto_currency === 'EGD'"></div>
          <div class="recharge_notice"  v-html="NoticeFFTS" v-show="crypto_currency === 'FFTS'"></div>
          <div class="recharge_notice"  v-html="NoticeDNA" v-show="crypto_currency === 'DNA'"></div>
          <div class="recharge_notice"  v-html="NoticeFFC" v-show="crypto_currency === 'FFC'"></div>
      </div> 
      </div>
      <!--detail-->
      <div class="wallet-detail" v-show="isShowDetailView&&isRechargeValue &&!(crypto_currency=='BTC'||crypto_currency=='LTC'||crypto_currency=='LBTC')">
        <div class="wallet-detail-tip-item"   @click="rechargeTip">
          <span style="float:left;">{{$t('Wallet_Detail.firefox_rechange_address')}}</span>
         <img  src='../assets/image/icon_question.svg'  @click="rechargeTip">  
        </div>
        <p class="wallet-detail-content-p2" v-clipboard:copy="address"
              v-clipboard:success="success" >{{address}}</p>
        <qrcode  :value="this.address" :options="{ size: 120 }" v-show="address!=''"></qrcode>
        <div class="wallet-detail-content">
          <p v-show="crypto_currency === 'DGC'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_dgc_address')}}</p>
          <p v-show="crypto_currency === 'OSC'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_osc_address')}}</p>
          <p v-show="crypto_currency === 'XDAG'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_xdag_address')}}</p>
          <p v-show="crypto_currency === 'CBC'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_cbc_address')}}</p>
          <p v-show="crypto_currency === 'EGD'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_egd_address')}}</p>
          <p v-show="crypto_currency === 'FFTS'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_ffts_address')}}</p>
          <p v-show="crypto_currency === 'DNA'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_dna_address')}}</p>
          <p v-show="crypto_currency === 'FFC'" class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_ffc_address')}}</p>
          <p v-show="crypto_currency === 'OSC'||crypto_currency === 'DGC'||crypto_currency === 'CBC'||crypto_currency === 'EGD'||crypto_currency === 'FFC'||crypto_currency === 'DNA'||crypto_currency === 'FFTS'||crypto_currency === 'XDAG'" class="wallet-detail-content-p2">{{bund_address}}</p>
          <mu-raised-button v-show="crypto_currency != 'OSC' && crypto_currency != 'DGC'&& crypto_currency != 'CBC'&& crypto_currency != 'FFC'&& crypto_currency != 'EGD'&& crypto_currency != 'FFTS'&& crypto_currency != 'DNA'&& crypto_currency != 'XDAG'" :label="$t('Wallet_Detail.new_address')" @click="new_address" class="btn" fullWidth primary/>
          <mu-raised-button v-show="crypto_currency == 'OSC' || crypto_currency == 'DGC' ||crypto_currency == 'CBC'||crypto_currency == 'FFC'||crypto_currency == 'EGD'||crypto_currency === 'DNA'||crypto_currency === 'FFTS' || crypto_currency == 'XDAG'" :label="$t('Wallet_Detail.rebound_address')" @click="rebound_address_dialog" class="btn" fullWidth primary/> 
         <a v-show="crypto_currency == 'OSC'"  @click="deposit"  style="color: #3d9cee; width: 100%;margin-top: 0.5em;display: inline-block;text-decoration:underline;text-align: right;">{{$t('Wallet_Detail.RechargeMetch')}}</a>
          <div class="recharge_notice_zone"> <!-- href="https://www.firefoxotc.com/deposit/"-->
             <div class="recharge_notice"  v-show="crypto_currency === 'OSC'">
               <p v-html="NoticeOSC"></p>
             </div>
             <div class="recharge_notice"  v-html="NoticeDGC" v-show="crypto_currency === 'DGC'"></div>
              <div class="recharge_notice"  v-html="NoticeXDAG" v-show="crypto_currency === 'XDAG'"></div>
              <div class="recharge_notice"  v-html="NoticeCBC" v-show="crypto_currency === 'CBC'"></div>
               <div class="recharge_notice"  v-html="NoticeEGD" v-show="crypto_currency === 'EGD'"></div>
               <div class="recharge_notice"  v-html="NoticeDNA" v-show="crypto_currency === 'DNA'"></div>
               <div class="recharge_notice"  v-html="NoticeFFTS" v-show="crypto_currency === 'FFTS'"></div>
               <div class="recharge_notice"  v-html="NoticeFFC" v-show="crypto_currency === 'FFC'"></div>
          </div>
        </div>
      </div>

      <!--提示-->
      <div v-show="!isRechargeValue &&!(crypto_currency=='BTC'||crypto_currency=='LTC'||crypto_currency=='LBTC')" class="wallet-content-recharge-tip">
        1、充值前请务必先去检查广告是否下架，否则充值后没下架的广告将会显示出来哦。<br>
        2、不支持非绑定地址充值，充错将不可找回。<br>
        <span v-show="crypto_currency === 'ETH'">3、Firefox 暂不支持ETH智能合约的转入。</span>
         <mu-raised-button   label="我知道了，去充值" @click="recharge_tip" class="btn" fullWidth primary/>
      </div>

<div v-show="crypto_currency=='BTC'||crypto_currency=='LTC'||crypto_currency=='LBTC'" class="wallet-content-recharge-tip">
        BTC、LTC、LBTC已下架交易、充值、提现业务。<br>
      
       
     
      </div>
   </div>
<!--提现-->
   <div class="withdraw-detail" v-show="isShowContentView&&tab=='tab2'">
     <div v-show="!(crypto_currency=='BTC'||crypto_currency=='LTC'||crypto_currency=='LBTC')" >
     <p class="withdraw-hint"><span>{{feeTip}}</span></p>


    <div class="withdraw-input-item-zone">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_address')"></span>
        <mu-auto-complete v-model.trim="withdraw_address" class="withdraw-input"  :hintText="$t('Wallet_Detail.withdraw_address_hint')" fullWidth   :errorText="withdraw_address_error" ></mu-auto-complete>
     </div>  
    </div>
     <div class="withdraw-input-item-zone">
       <p class="withdraw-max-value-p"><span>{{$t('Wallet_Detail.withdraw_max_value')}}<span class="red-hint">{{max_withdrawable}}&nbsp;{{crypto_currency}}</span></span></p>
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_qty')"></span> 
        <mu-auto-complete v-model.trim="qty" class="withdraw-input"  :hintText="$t('Wallet_Detail.minimum')+min_withdrawable+' + '+fee+' (手续费) '+crypto_currency" fullWidth @keyup.native="check_qty()"  :errorText="qty_error" ></mu-auto-complete>
        <span style="padding-right:0px;">{{crypto_currency}}</span>
     </div> 
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding" v-show="false">
     <div class="withdraw-input-item">
        <span style="text-align:left" v-html="$t('Wallet_Detail.withdraw_fee')" ></span>
        <span style="flex:1;text-align:right;padding-right:0px;"> {{fee}} {{crypto_currency}}</span>
     </div> 
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_pwd')" ></span>
        <mu-text-field v-model.trim="pwd" class="withdraw-input"  type="password" :hintText="$t('Wallet_Detail.withdraw_pwd_hint')" fullWidth @keyup.native="check_pwd()"  :errorText="pwd_error" ></mu-text-field>
     </div> 
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='MOBILE'">
     <div class="withdraw-input-item">
        <span  v-html="$t('Wallet_Detail.withdraw_mobile')"></span>
        <mu-auto-complete v-model.trim="code" class="withdraw-input" :hintText="$t('Wallet_Detail.withdraw_mobile_hint')" fullWidth  @keyup.native="check_code()"  :errorText="code_error"></mu-auto-complete>
         <div  class="div-send-code" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='EMAIL'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_email')"></span>
        <mu-auto-complete v-model.trim="code" class="withdraw-input" :hintText="$t('Wallet_Detail.withdraw_email_hint')" fullWidth  @keyup.native="check_code()" :errorText="code_error"></mu-auto-complete>
        <div  class="div-send-code" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

      <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='GOOGLE_AUTH'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_google')"></span>
        <mu-auto-complete v-model.trim="code" class="withdraw-input" :hintText="$t('Wallet_Detail.withdraw_google_hint')" fullWidth @keyup.native="check_code()" :errorText="code_error"></mu-auto-complete>
        <div v-show="false" class="div-send-code" @click="get_code">{{refresh_txt}}
      </div>
     </div>
     </div>
        <div class="withdraw-input-item-zone btn-zone">
          <mu-raised-button   :label="$t('Wallet_Detail.confirm_submit')" @click="commit" class="btn" fullWidth primary/>
        </div>

   </div>

   <!--123456-->
   <div v-show="crypto_currency=='BTC'||crypto_currency=='LTC'||crypto_currency=='LBTC'" style="color: #0A2463;
            text-align: left;
            padding: 3em 2em 1.5em 2em;">
        BTC、LTC、LBTC已下架交易、充值、提现业务。<br>
      </div>
   </div>
  <mu-dialog :open="isRechargeTipDialog" :title="$t('Wallet_Detail.top_up_tip')" >
    <div  v-show="crypto_currency === 'BTC'" v-html="$t('Wallet_Detail.top_up_tip_btc')" ></div>
    <div  v-show="crypto_currency === 'ETH'" v-html="$t('Wallet_Detail.top_up_tip_eth')"></div>
    <div  v-show="crypto_currency === 'LTC'" v-html="$t('Wallet_Detail.top_up_tip_ltc')"></div>
    <div  v-show="crypto_currency === 'OSC'" v-html="$t('Wallet_Detail.top_up_tip_osc')"></div>
    <div  v-show="crypto_currency === 'DGC'" v-html="$t('Wallet_Detail.top_up_tip_dgc')"></div>
    <div  v-show="crypto_currency === 'CBC'" v-html="$t('Wallet_Detail.top_up_tip_cbc')"></div>
    <div  v-show="crypto_currency === 'EGD'" v-html="$t('Wallet_Detail.top_up_tip_egd')"></div>
     <div  v-show="crypto_currency === 'FFTS'" v-html="$t('Wallet_Detail.top_up_tip_ffts')"></div>
      <div  v-show="crypto_currency === 'DNA'" v-html="$t('Wallet_Detail.top_up_tip_dna')"></div>
    <div  v-show="crypto_currency === 'LBTC'" v-html="$t('Wallet_Detail.top_up_tip_lbtc')"></div>
    <div  v-show="crypto_currency === 'XDAG'" v-html="$t('Wallet_Detail.top_up_tip_xdag')"></div>
     <div  v-show="crypto_currency === 'FFC'" v-html="$t('Wallet_Detail.top_up_tip_ffc')"></div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>
  <mu-dialog :open="isWithdrawDialog" :title="$t('Wallet_Detail.withdraw_tip')" >
      <div  v-show="crypto_currency != 'XDAG'"> {{$t('Wallet_Detail.withdraw_content_tip')}}</div>
      <p  v-show="crypto_currency == 'XDAG'" style='width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040'>1.{{$t('Wallet_Detail.withdraw_content_tip')}}</p>
      <p v-show="crypto_currency == 'XDAG'" style='width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040'>2.该提现为手动入账，工作处理时间为：<span style='color:#ff4d2d'>9:30-20:30</span>，非工作时间请耐心等待。</p>
      <p  v-show="crypto_currency == 'XDAG'" style='width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040'>3. 如果提现遇到问题，可加XDAG充值提现QQ群： <span style='color:#ff4d2d'>564901448，有专人处理。</span></p>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="on_commit" :label="$t('Wallet_Detail.withdraw_conform')"/>
  </mu-dialog>
  <mu-dialog :open="isrebound_address_dialog" title="重新绑定提示" > 
     请先确保前一笔充值已到账，再进行换绑，否则前一笔无法到账，损失无法追回。
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="rebound_address" label="重新绑定"/>
  </mu-dialog>
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
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import Clipboard from "clipboard";
export default {
  name: "wallet_detail",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      balance: "",
      locked: "",
      balances: [],
      isRechargeTipDialog: false,
      oscError: "",
      total: 0,
      address_total: 0,
      crypto_currency: "",
      address: "",
      bund_address: "",
      NoticeOSC: this.$t("Wallet.NoticeOSC"),
      NoticeDGC: this.$t("Wallet.NoticeDGC"),
      NoticeEGD: this.$t("Wallet.NoticeEGD"),
      NoticeFFTS: this.$t("Wallet.NoticeFFTS"),
      NoticeDNA: this.$t("Wallet.NoticeDNA"),
      NoticeXDAG: this.$t("Wallet.NoticeXDAG"),
      NoticeCBC: this.$t("Wallet.NoticeCBC"),
      NoticeFFC: this.$t("Wallet.NoticeFFC"),
      isShowBoundAddressView: false,
      isShowContentView: false,
      isShowDetailView: false,
      tab: "tab1",
      withdraw_address: "",
      qty: "",
      min_withdrawable: "",
      max_withdrawable: "",
      validate_method: "",

      feeTip: "",
      fee: "",
      withdraw_address_error: "",
      qty_error: "",
      pwd_error: "",
      code_error: "",
      pwd: "",
      code: "",

      is_sending_code: false,
      isWithdrawDialog: false,
      refresh_txt: this.$t("Wallet_Detail.refresh_txt"),
      refresh_timer: [],
      isRechargeValue: false,
      isrebound_address_dialog: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    // let crypto_currency = store.state.user.crypto_currency
    let crypto_currency = to.params.crypto_currency.toUpperCase();
    if (typeof to.params.currency != "undefined") {
      crypto_currency = to.params.currency.toUpperCase();
      store.commit(SET_CRYPTO_CURRENCY, crypto_currency);
    }

    Promise.all([
      wallet.getAddress(crypto_currency, 0, 1),
      wallet.balance(),
      wallet.myWithdrawInfo(crypto_currency)
    ])
      .then(values => {
        let address_result = values[0];
        let balance_result = values[1];
        let withdraw_restriction_result = values[2];

        let address = "";
        let bund_address = "";
        let address_total = 0;

        let balances = [];
        let balance = "0";
        let locked = "0";

        let feeTip = "";
        let fee = "";
        let min_withdrawable = "";
        let max_withdrawable = "";
        let validate_method = "";

        if (address_result.code === 0 && address_result.data.total > 0) {
          address = address_result.data.addresses[0].address;
          address_total = address_result.data.total;
          if (crypto_currency == "OSC") {
            bund_address = address_result.data.osc_bound_address;
          }
          if (crypto_currency == "DGC") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "FFC") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "XDAG") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "CBC") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "EGD") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "FFTS") {
            bund_address = address_result.data.bound_address;
          }
          if (crypto_currency == "DNA") {
            bund_address = address_result.data.bound_address;
          }
        }

        if (balance_result.code === 0) {
          if (balance_result.data.hasOwnProperty("list")) {
            balances = balance_result.data.list;
            if (balance_result.data.hasOwnProperty("list")) {
              for (let i = 0; i < balances.length; i++) {
                if (balances[i].currency == crypto_currency) {
                  balance = balances[i].available;
                  locked = balances[i].locked;
                }
              }
            }
          }
        }

        if (withdraw_restriction_result.code === 0) {
          feeTip =
            vm.$t("Wallet_Detail.feeTip") +
            withdraw_restriction_result.data.fee +
            " " +
            crypto_currency;
          fee = withdraw_restriction_result.data.fee;
          min_withdrawable = withdraw_restriction_result.data.min_withdrawable;
          max_withdrawable = withdraw_restriction_result.data.max_withdrawable;
          validate_method = withdraw_restriction_result.data.validate_method;
        }
        next(vm => {
          vm.address = address;
          vm.crypto_currency = crypto_currency;
          vm.address_total = address_total;
          vm.balances = balances;
          vm.balance = balance;
          vm.locked = locked;
          if (
            (vm.crypto_currency === "OSC" ||
              vm.crypto_currency === "DGC" ||
              vm.crypto_currency === "XDAG" ||
              vm.crypto_currency === "EGD" ||
              vm.crypto_currency === "FFTS" ||
              vm.crypto_currency === "DNA" ||
              vm.crypto_currency === "FFC" ||
              vm.crypto_currency === "CBC") &&
            vm.address_total === 1
          ) {
            vm.bund_address = bund_address;
            vm.isShowBoundAddressView = false;
            vm.isShowDetailView = true;
            vm.withdraw_address = bund_address;
          }
          if (
            (vm.crypto_currency === "OSC" ||
              vm.crypto_currency === "DGC" ||
              vm.crypto_currency === "XDAG" ||
              vm.crypto_currency === "EGD" ||
              vm.crypto_currency === "FFTS" ||
              vm.crypto_currency === "DNA" ||
               vm.crypto_currency === "FFC" ||
              vm.crypto_currency === "CBC") &&
            vm.address_total != 1
          ) {
            vm.bund_address = "";
            vm.isShowBoundAddressView = true;
            vm.isShowDetailView = false;
          } else {
            vm.isShowBoundAddressView = false;
            vm.isShowDetailView = true;
          }

          vm.feeTip = feeTip;
          vm.min_withdrawable = min_withdrawable;
          // if(vm.crypto_currency === 'OSC'){
          //   vm.min_withdrawable = parseInt(min_withdrawable)+0.5;
          // }
          vm.max_withdrawable = max_withdrawable;
          vm.validate_method = validate_method;
          vm.fee = fee;
          vm.isShowContentView = true;
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tabChange(tab) {
      this.tab = tab;
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    deposit() {
      this.$router.push("/deposit");
    },
    recharge_tip() {
      this.isRechargeValue = true;
    },
    closeDialog() {
      this.isRechargeTipDialog = false;
      this.isWithdrawDialog = false;
      this.isrebound_address_dialog = false;
    },
    getHumanDate: function(timestamp) {
      return moment(timestamp).format("YYYY/MM/DD HH:mm");
    },
    uesraddress_focus: function() {
      this.isError = false;
      this.uesraddress_error_notice = "";
    },
    commit_bund_address: function() {
      if (this.bund_address.length == 0) {
        this.oscError = this.$t("Wallet_Detail.input_bound_address");
        return;
      }
      let address_url = "";
      if (this.crypto_currency === "OSC") {
        address_url = "/wallet/osc/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "XDAG") {
        address_url = "/wallet/xdag/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "DGC") {
        address_url = "/wallet/dgc/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "CBC") {
        address_url = "/wallet/cbc/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "EGD") {
        address_url = "/wallet/egd/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "FFC") {
        address_url = "/wallet/ffc/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "FFTS") {
        address_url = "/wallet/ffts/" + this.bund_address + "/bind";
      }
      if (this.crypto_currency === "DNA") {
        address_url = "/wallet/dna/" + this.bund_address + "/bind";
      }
      wallet
        .deposited(address_url)
        .then(result => {
          // this.bund_address = '';
          this.isShowBoundAddressView = false;
          this.isShowDetailView = true;
        })
        .catch(e => {
          this.oscError = HttpResultCode.validate(e.code);
        });
    },
    commit_bund_xdag_address: function() {
      if (this.bund_address.length == 0) {
        this.oscError = this.$t("Wallet_Detail.input_bound_address");
        return;
      }
      wallet
        .walletXdagBindAddress(this.bund_address)
        .then(result => {
          // this.bund_address = '';
          this.isShowBoundAddressView = false;
          this.isShowDetailView = true;
          this.get_address();
        })
        .catch(e => {
          this.oscError = HttpResultCode.validate(e.code);
        });
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    get_address: function() {
      wallet
        .getAddress(this.crypto_currency, 0, 1)
        .then(result => {
          if (result.code != 0) return;
          this.address_total = result.data.total;
          this.bund_address = "";
          if (this.crypto_currency === "OSC" && this.address_total === 1) {
            this.bund_address = result.data.osc_bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "DGC" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "CBC" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "XDAG" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "EGD" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "FFC" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "FFTS" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (this.crypto_currency === "DNA" && this.address_total === 1) {
            this.bund_address = result.data.bound_address;
            this.withdraw_address = this.bund_address;
          }
          if (
            (this.crypto_currency == "OSC" ||
              this.crypto_currency == "DGC" ||
              this.crypto_currency == "XDAG" ||
              this.crypto_currency == "EGD" ||
              this.crypto_currency == "FFTS" ||
               this.crypto_currency == "FFC" ||
              this.crypto_currency == "DNA" ||
              this.crypto_currency == "CBC") &&
            this.address_total != 1
          ) {
            this.bund_address = "";
            this.isShowBoundAddressView = true;
            this.isShowDetailView = false;
          } else {
            this.isShowBoundAddressView = false;
            this.isShowDetailView = true;
          }
          this.address = result.data.addresses[0].address;
        })
        .catch(e => {
          console.log(e);
        });
    },
    new_address: function() {
      wallet
        .newAddress(this.crypto_currency)
        .then(result => {
          if (result.code === 0) {
            this.address = result.data.address;
          } else {
            this.address = "";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    rebound_address() {
      this.isrebound_address_dialog = false;
      this.isShowBoundAddressView = true;
      this.isShowDetailView = false;
    },
    rebound_address_dialog() {
      this.isrebound_address_dialog = true;
    },
    address_history: function(crypto_currency) {
      wallet
        .getAddress(crypto_currency, 0, 100)
        .then(result => {
          if (result.code === 0) {
            this.history_data = [];
            for (let i = 0; i < result.data.addresses.length; i++) {
              let address = {
                address: result.data.addresses[i].address,
                date: this.getHumanDate(result.data.addresses[i].created)
              };
              this.history_data.push(address);
            }
            this.dialog_visible = true;
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    input_focus: function(selected) {
      if (selected === "osc") {
        this.oscError = "";
      }
      if (selected === "egd") {
        this.oscError = "";
      }
      if (selected === "ffts") {
        this.oscError = "";
      }
      if (selected === "dna") {
        this.oscError = "";
      }
      if (selected == "withdraw_address") {
        this.withdraw_address_error = "";
      }
      if (selected == "qty") {
        this.qty_error = "";
      }
      if (selected == "pwd") {
        this.pwd_error = "";
      }
      if (selected == "code") {
        this.code_error = "";
      }
    },
    rechargeTip() {
      this.isRechargeTipDialog = true;
    },
    bills() {
      this.$router.push("/bills");
    },
    commit() {
      if (
        this.check_withdraw_address() &&
        this.check_qty() &&
        this.check_pwd() &&
        this.check_code()
      )
        this.isWithdrawDialog = true;
    },
    check_withdraw_address() {
      if (this.withdraw_address.length === 0) {
        this.showToast(this.$t("Wallet_Detail.input_withdraw_address"));
        this.withdraw_address_error = "  ";
        return false;
      }
      this.withdraw_address_error = "";
      return true;
    },
    check_qty() {
      if (this.qty.length === 0) {
        this.showToast(this.$t("Wallet_Detail.input_withdraw_qty"));
        this.qty_error = " ";
        return false;
      }
      // this.qty = lib.toFixed(parseFloat(this.qty), 8);
      if (parseFloat(this.qty) > parseFloat(this.max_withdrawable)) {
        this.showToast(
          this.$t("Wallet_Detail.account_none") +
            this.qty +
            this.crypto_currency
        );
        this.qty_error = " "; //this.$t('Wallet.Withdraw.QtyErrorMax')
        return false;
      }
      if (parseFloat(this.qty) < parseFloat(this.min_withdrawable)) {
        this.showToast(
          this.$t("Wallet_Detail.withdraw_number") +
            this.min_withdrawable +
            this.crypto_currency
        );
        this.qty_error = " "; //this.$t('Wallet.Withdraw.QtyErrorMin')
        return false;
      }
      this.qty_error = "";
      return true;
    },
    check_pwd() {
      if (this.pwd.length === 0) {
        this.showToast(this.$t("Wallet_Detail.pwd_validate_tip"));
        this.pwd_error = " ";
        return false;
      }
      this.pwd_error = "";
      return true;
    },
    check_code() {
      if (this.code.length != 6) {
        this.showToast(this.$t("Wallet_Detail.code_validate_tip"));
        this.code_error = " ";
        return false;
      }
      this.code_error = "";
      return true;
    },
    get_code: function() {
      if (this.refresh_txt != this.$t("Wallet_Detail.refresh_txt")) {
        this.showToast(this.refresh_txt + " " + this.$t("SignIn.sendCodeTip"));
        return;
      }
      if (this.is_sending_code) {
        return false;
      }
      wallet
        .getWithdrawCode()
        .then(result => {
          this.time_refresh();
        })
        .catch(e => {
          this.code_error = HttpResultCode.validate(e.code);
        });
    },
    time_refresh() {
      for (let i = 0; i <= 120; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (i <= 119) {
              let count = 120 - i;
              this.refresh_txt = count + " S";
            } else {
              this.refresh_txt = this.$t("Wallet_Detail.refresh_txt"); //this.$t('SignUp.SendCode')
              this.clear_refresh();
            }
          }, i * 1000)
        );
      }
    },
    clear_refresh() {
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
      this.refresh_timer = [];
      this.refresh_txt = this.$t("Wallet_Detail.refresh_txt"); //this.$t('SignUp.SendCode')
    },
    on_commit() {
      this.isWithdrawDialog = false;
      wallet
        .myWithdraw(
          this.withdraw_address,
          this.crypto_currency,
          this.pwd,
          this.qty,
          this.code
        )
        .then(result => {
          this.withdraw_address = "";
          this.pwd = "";
          this.qty = "";
          this.code = "";
          this.showToast(this.$t("Wallet_Detail.send_succedd"));
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    }
  },
  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/wallet_detail.scss";
</style>
