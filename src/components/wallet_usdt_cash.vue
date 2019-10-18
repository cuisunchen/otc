<template>
  <div class="content-wallet content-wallet-cash" style="background:#ffffff;">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">{{$t('Wallet_Detail.withdrawal')}}</div>
      <div class="left" @click="goBack" />
      <!--<div class="right" @click="gobills">{{$t('Wallet_Detail.detail')}}</div>--> 
    </div>                                             
    <!-- <div class="tab-wallet" style="margin-top:2.5em;">               
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">{{$t('Wallet_Detail.top_up')}}</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">{{$t('Wallet_Detail.withdrawal')}}</button>
    </div>  -->
    <!-- <div style=" display: flex;
                  position: fixed;
                  height: 2px;
                  margin-top:4.8em;
                  z-index:999;
                  width: 100%;">

<div style=" flex: 1;  z-index:999;">
    <div style=" 
      z-index:999;
      height: 2px;
      background: #000;
      width: 3em;
      margin: 0 auto 0 auto;" v-show="this.tab==='tab1'">
    </div>   
    </div>
  <div style=" flex: 1; z-index:999;">
    <div style=" 
      z-index:999;
      height: 2px;
      background:   #000;
      width: 3em;
      margin: 0 auto 0 auto;">
    </div>   
    </div>
    </div> -->
    <div class="wallet-content" v-show="tab=='tab1'">
      <!--common-->
      <!--绑定地址-->
     
      <!--detail  @click="rechargeTip"-->
      <div class="wallet-detail" v-show="isRechargeValue">
        <div style="background:#ffffff;padding-top:0.2em;padding-bottom:1em;">
        <div class="wallet-detail-tip-item"  v-show="isRechargeValue"  style="margin-top:1.5em;margin-left:1em;">
          <span style="float:left;color:#4E586E;font-size:1em;">{{$t('Text.firefox_rechange_address')}}</span>
         <!-- <img  src='../assets/image/icon_question.svg'  @click="rechargeTip">   -->
        </div>
        <br>
        <p class="wallet-detail-content-p2" style="padding-left:2em;" v-show="isRechargeValue"><span v-clipboard:copy="address"
              v-clipboard:success="success">{{address}}</span> <span v-clipboard:copy="address"
              v-clipboard:success="success" >&nbsp;{{$t('Text.copy')}}</span></p>

         <p   v-show="isRechargeValue" class="wallet-detail-content-p2" ><span style="color:#4E586E;font-size:1em;margin-left:1em;">{{$t('Text.czje')}}</span >
         <span v-clipboard:copy="depositeQty"
              v-clipboard:success="success" >&nbsp;{{this.depositeQty+" USDT"}}&nbsp;{{$t('Text.copy')}}</span></p>
        <qrcode  v-show="isRechargeValue" :value="this.address" :options="{ size: 120 }" :v-show="address!=''"></qrcode>
        
 <div  style="padding-left:2em;color:#ff4d2d;font-size:1em;background:#ffffff" >{{$t('Text.rechargeTip1')}}{{this.depositeQty}}{{$t('Text.rechargeTip2')}}</div>

</div>
         <div style="width:100%;height:3em;"></div>
        <!-- <div  v-show="isRechargeValue" class="withdraw-input-item-zone btn-zone" :v-show="can_cancel"  style="margin-top:3em;"> -->
          <mu-raised-button   v-show="isRechargeValue"  :label="$t('Text.qxcz')" @click="cancelDeposite" class="btn"  fullWidth primary/>
        <!-- </div> -->
      
      <!-- depositeQty: "",
      usdt_type: "", -->


        <!-- <div class="wallet-detail-content">
          <p  class="wallet-detail-content-p1">{{$t('Wallet_Detail.bounded_dgc_address')}}</p>
        </div> -->
      </div>

      <!--提示-->
       <div class="wallet-content-recharge-tip">
        <!-- 1、充值前请务必先去检查广告是否下架，否则充值后没下架的广告将会显示出来哦。<br>
        2、不支持非绑定地址充值，充错将不可找回。<br>
        <span v-show="crypto_currency === 'ETH'">3、Firefox 暂不支持ETH智能合约的转入。</span>
         <mu-raised-button   label="我知道了，去充值" @click="recharge_tip" class="btn" fullWidth primary/> -->
         
       

          <div class="publish-trade-type-item">
            <span style="color:#4E586E;font-size:1em; border-bottom: 1px solid rgb(222, 219, 219);" v-html="$t('Text.coinName1')"></span>
           <!-- <div style="margin-left:2.7em;">  icon_coin_ck_n   <span  v-html="$t('Text.coinName1')"></span>
             <mu-radio :class="{activeRadio:isOMNI=='1'}"  name="anchorHorizontal1" nativeValue="1" label="OMNI"  value="1"  v-model="isOMNI"   class="mu-radio" />
             <mu-radio :class="{activeRadio:isOMNI=='2'}" name="anchorHorizontal1" nativeValue="2"  label="ERC20"  value="2"   v-model="isOMNI" />
            </div> -->
            <div style="margin-left:2em;display:flex; border-bottom: 1px solid rgb(222, 219, 219);"> 
               
                <img src="../assets/image/icon_coin_ck_p.png" style="width:1em;height:1em;margin-top:0.3em;" v-show="isOMNI=='1'" @click="onClickOMNI"> 
                <img src="../assets/image/icon_coin_ck_n.png"   v-show="isOMNI=='2'" style="width:1em;height:1em;margin-top:0.2em;" @click="onClickOMNI">  
                <div style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;" v-show="isOMNI=='1'"  @click="onClickOMNI">USDT-OMNI</div> 
                <div style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;"  v-show="isOMNI=='2'"  @click="onClickOMNI">USDT-OMNI</div> 
                
                <!-- <img src="../assets/image/icon_coin_ck_p.png" v-show="isOMNI=='2'" style="width:1em;height:1em;margin-top:0.2em;" @click="onClickERC20"> 
                <img src="../assets/image/icon_coin_ck_n.png"  style="width:1em;height:1em;margin-top:0.2em;" v-show="isOMNI=='1'" @click="onClickERC20">   
                <span style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isOMNI=='2'" @click="onClickERC20">ERC20</span> 
                <span style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isOMNI=='1'" @click="onClickERC20">ERC20</span>   -->
            </div>
          </div>
          <div style="width:100%;height:1px;background:#f4f4f4;"></div>
          <div class="publish-safe-price-currency-item" style="padding-left:1em;padding-right:1em;padding-bottom:0px">
            
            <span style="color:#4E586E;"  v-html="$t('Text.CZED')"></span>  <!--@keyup.native="check_min_qty()" :errorText="min_qty_error"-->
            <mu-text-field v-model.trim="czqty"  type="number"  :hintText="$t('Text.CZEDHint')" fullWidth    
            class="mu-text-field-input"  ></mu-text-field>
          <!-- <p class="hint-bottom-font" v-show="false">{{min_qty_tip}}</p> -->
     
          </div>
          <div style="width:100%;height:1px;background:#F3F5F7;"></div>
<div style="width:100%;height:3em;"></div>
      <!-- <div class="withdraw-input-item-zone btn-zone"> -->
         <mu-raised-button    :label="$t('Text.tj')" @click="USER_otc_wallet_deposit" class="btn1" style="margin-top:3em;"  fullWidth primary/>
        <!-- </div> -->

      </div> 
 

   </div>
<!--提现-->
   <div class="withdraw-detail">
     <div >
     <!-- <p class="withdraw-hint"><span>{{feeTip}}</span></p> -->


    <div class="withdraw-input-item-zone">
      <div  class="publish-trade-type-item">
            <span  v-html="$t('Text.coinName2')" style="border-bottom: 1px solid rgb(222, 219, 219);padding-top: .5rem; padding-bottom: .6rem;"></span>
           <div style="display:flex;padding-top: 0.25rem; margin-left: -0.4rem; border-bottom: 1px solid rgb(222, 219, 219);">

             <!-- <mu-radio :class="{activeRadio:isWithdrawOMNI=='1'}"  name="anchorHorizontal" nativeValue="1" label="OMNI"  value="1"  v-model="isWithdrawOMNI"   class="mu-radio" />
             <mu-radio :class="{activeRadio:isWithdrawOMNI=='2'}" name="anchorHorizontal" nativeValue="2"  label="ERC20"  value="2"   v-model="isWithdrawOMNI" /> -->
                <img src="../assets/image/icon_coin_ck_p.png" v-show="isWithdrawOMNI=='2'" class="my-imf"  @click="onClickERC201"> 
                <img src="../assets/image/icon_coin_ck_n.png"  class="my-imf"  v-show="isWithdrawOMNI=='1'" @click="onClickERC201">   
                <span style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isWithdrawOMNI=='2'" @click="onClickERC201">USDT-ERC20</span> 
                <span style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isWithdrawOMNI=='1'" @click="onClickERC201">USDT-ERC20</span>   

								<img src="../assets/image/icon_coin_ck_p.png" class="my-imf" v-show="isWithdrawOMNI=='1'" @click="onClickOMNI1" style="margin-left: 1em;"> 
                <img src="../assets/image/icon_coin_ck_n.png"   v-show="isWithdrawOMNI=='2'" class="my-imf" @click="onClickOMNI1" style="margin-left: 1em;">  
                <span style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;"  v-show="isWithdrawOMNI=='1'"  @click="onClickOMNI1">USDT-OMNI</span> 
                <span style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;"  v-show="isWithdrawOMNI=='2'"  @click="onClickOMNI1">USDT-OMNI</span> 
            </div>
          </div>
     <div class="withdraw-input-item" style="position: relative; top: -7px;">
        <span v-html="$t('Wallet_Detail.withdraw_address')"  style="color:#4E586E;font-size:1em;" ></span>
        <mu-text-field v-model.trim="withdraw_address" class="withdraw-input"  :hintText="$t('Wallet_Detail.withdraw_address_hint')" fullWidth   :errorText="withdraw_address_error" ></mu-text-field>
        <!-- <i class="go"></i> -->
     </div>  
     <div class="m-withdraw-input-item"></div>
    </div>
     <div class="withdraw-input-item-zone">
     <div v-html="$t('Wallet_Detail.withdraw_qty')"  class="withdraw_qty"></div>
     <div class="withdraw-input-item withdraw_qty-c" style="width: 100%;font-weight:500; border:none;" >
        <div style="display: flex; align-items: center;border-bottom: 1px solid #dedbdb; width: 100%">
          <mu-text-field v-model.trim="qty"  style="flex:1" class="withdraw-input" :style="{'padding-top': '0.79em'}"  type="number"  :hintText="$t('Wallet_Detail.minimum')+min_withdrawable+' + '+fee+' ('+$t('Text.sxf')+') '+crypto_currency" fullWidth @keyup.native="check_qty()"  :errorText="qty_error" ></mu-text-field>
          <span style="padding-right:0px;width:4em;padding: 0;bottom: -10px;position: relative;justify-content: flex-end;">{{crypto_currency}}</span>
        </div>
     </div> 
     <p  class="withdraw-max-value-p">
       <span class="fs-12">{{$t('Wallet_Detail.withdraw_max_value')}}
         <span class="red-hint fs-12">{{max_withdrawable}}&nbsp;{{crypto_currency}}</span>
       </span>
     </p>
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding" v-show="false">
     <div class="withdraw-input-item">
        <span style="text-align:left;color:#4E586E;font-size:1em;" v-html="$t('Wallet_Detail.withdraw_fee')" ></span>
        <span style="flex:1;text-align:right;padding-right:0px;"> {{fee}} {{crypto_currency}}</span>
     </div> 
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding">
     <div class="withdraw-input-item" >
        <span v-html="$t('Wallet_Detail.withdraw_pwd')"  style="color:#4E586E;font-size:1em;"></span>
        <mu-text-field v-model.trim="pwd" class="withdraw-input"  type="password" :hintText="$t('Text.withdraw_pwd_hint')" fullWidth @keyup.native="check_pwd()"  :errorText="pwd_error" ></mu-text-field>
     </div> 
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='MOBILE'">
     <div class="withdraw-input-item">
        <span  v-html="$t('Wallet_Detail.withdraw_mobile')"  style="color:#4E586E;font-size:1em;"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_mobile_hint')" fullWidth  @keyup.native="check_code()"  :errorText="code_error"></mu-text-field>
         <div  class="div-send-code fs-12" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='EMAIL'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_email')"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_email_hint')" fullWidth  @keyup.native="check_code()" :errorText="code_error"></mu-text-field>
        <div  class="div-send-code fs-12" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

      <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='GOOGLE_AUTH'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_google')"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_google_hint')" fullWidth @keyup.native="check_code()" :errorText="code_error"></mu-text-field>
        <div v-show="false" class="div-send-code fs-12" @click="get_code">{{refresh_txt}}
      </div>
     </div>
     </div>
     <p class="my-action fs-12">{{$t('Text.cgmsg')}}</p>
        <div class="withdraw-input-item-zone btn-zone">
          <mu-raised-button   :label="$t('Wallet_Detail.confirm_submit')" @click="commit" class="btn" fullWidth primary/>
        </div>

   </div>

   <!--123456-->

   </div>
  <mu-dialog :open="isRechargeTipDialog" :title="$t('Wallet_Detail.top_up_tip')" >
   
     <div  v-show="crypto_currency === 'FFC'" v-html="$t('Wallet_Detail.top_up_tip_ffc')"></div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>
  <PopupDialog
      v-if="isRechargeTipDialog"
      :confirm="closeDialog"
      :confirmText="$t('Wallet_Detail.withdraw_conform')"
      :content="crypto_currency === 'FFC' ? $t('Wallet_Detail.top_up_tip_ffc'): ''"
      :title="$t('Wallet_Detail.top_up_tip')"
      :cancel="closeDialog">
    </PopupDialog>

  <PopupDialog
      v-if="isWithdrawDialog"
      :confirm="on_commit"
      :confirmText="$t('Wallet_Detail.withdraw_conform')"
      :content="$t('Wallet_Detail.withdraw_content_tip')"
      :title="$t('Wallet_Detail.withdraw_tip')"
      :cancel="closeDialog">
    </PopupDialog>
  <!-- <mu-dialog :open="isWithdrawDialog" >
    <p class="modal-tit">{{$t('Wallet_Detail.withdraw_tip')}}</p>
      <div class="modal-content" v-show="crypto_currency != 'XDAG'"> {{$t('Wallet_Detail.withdraw_content_tip')}}</div>
     
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="on_commit" :label="$t('Wallet_Detail.withdraw_conform')"/>
  </mu-dialog> -->
  <!-- <mu-dialog :open="isCancel_deposite_dialog" title="重新绑定提示" > 
     请先确保前一笔充值已到账，再进行换绑，否则前一笔无法到账，损失无法追回。
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="rebound_address" label="重新绑定"/>
  </mu-dialog> -->

  <mu-dialog :open="isCancel_Deposite_dialog" :title="$t('Text.qxcz')" > 
     {{$t('Text.qxczTip')}}
     
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="cancel_deposite" :label="$t('Text.qxcz')"/>
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
import PopupDialog from "../common/PopupDialog";
export default {
  name: "wallet_usdt",
  components: { PopupDialog },
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
      crypto_currency: "USDT",
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
      tab: "tab111",
      withdraw_address: "",
      qty: "",
      min_withdrawable: "",
      max_withdrawable: "",
      validate_method: "",
      isOMNI:'1',
      isWithdrawOMNI:'2',
      feeTip: "",
      fee: "",
      withdraw_address_error: "",
      qty_error: "",
      pwd_error: "",
      code_error: "",
      pwd: "",
      code: "",
      can_cancel:false,
      depositeQty: "",
      usdt_type: "",
     transfer_id:'',
  
           
           

 isCancel_Deposite_dialog: false,
      is_sending_code: false,
      isWithdrawDialog: false,
      refresh_txt: this.$t("Wallet_Detail.refresh_txt"),
      refresh_timer: [],
      isRechargeValue: false,
      isrebound_address_dialog: false,

      czqty :''
    };
  },
  // beforeRouteEnter(to, from, next) {
  //   nprogress.set(0.6);
  //   // 参数初始化
  //   // let crypto_currency = store.state.user.crypto_currency
  //   let crypto_currency = to.params.crypto_currency.toUpperCase();
  //   if (typeof to.params.currency != "undefined") {
  //     crypto_currency = to.params.currency.toUpperCase();
  //     store.commit(SET_CRYPTO_CURRENCY, crypto_currency);
  //   }

  //   Promise.all([
  //     wallet.getAddress(crypto_currency, 0, 1),
  //     wallet.balance(),
  //     wallet.myWithdrawInfo(crypto_currency)
  //   ])
  //     .then(values => {
  //       let address_result = values[0];
  //       let balance_result = values[1];
  //       let withdraw_restriction_result = values[2];

  //       let address = "";
  //       let bund_address = "";
  //       let address_total = 0;

  //       let balances = [];
  //       let balance = "0";
  //       let locked = "0";

  //       let feeTip = "";
  //       let fee = "";
  //       let min_withdrawable = "";
  //       let max_withdrawable = "";
  //       let validate_method = "";

  //       if (address_result.code === 0 && address_result.data.total > 0) {
  //         address = address_result.data.addresses[0].address;
  //         address_total = address_result.data.total;
  //         if (crypto_currency == "OSC") {
  //           bund_address = address_result.data.osc_bound_address;
  //         }
  //         if (crypto_currency == "DGC") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "FFC") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "XDAG") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "CBC") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "EGD") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "FFTS") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //         if (crypto_currency == "DNA") {
  //           bund_address = address_result.data.bound_address;
  //         }
  //       }

  //       if (balance_result.code === 0) {
  //         if (balance_result.data.hasOwnProperty("list")) {
  //           balances = balance_result.data.list;
  //           if (balance_result.data.hasOwnProperty("list")) {
  //             for (let i = 0; i < balances.length; i++) {
  //               if (balances[i].currency == crypto_currency) {
  //                 balance = balances[i].available;
  //                 locked = balances[i].locked;
  //               }
  //             }
  //           }
  //         }
  //       }

  //       if (withdraw_restriction_result.code === 0) {
  //         feeTip =
  //           vm.$t("Wallet_Detail.feeTip") +
  //           withdraw_restriction_result.data.fee +
  //           " " +
  //           crypto_currency;
  //         fee = withdraw_restriction_result.data.fee;
  //         min_withdrawable = withdraw_restriction_result.data.min_withdrawable;
  //         max_withdrawable = withdraw_restriction_result.data.max_withdrawable;
  //         validate_method = withdraw_restriction_result.data.validate_method;
  //       }
  //       next(vm => {
  //         vm.address = address;
  //         vm.crypto_currency = crypto_currency;
  //         vm.address_total = address_total;
  //         vm.balances = balances;
  //         vm.balance = balance;
  //         vm.locked = locked;
  //         if (
  //           (vm.crypto_currency === "OSC" ||
  //             vm.crypto_currency === "DGC" ||
  //             vm.crypto_currency === "XDAG" ||
  //             vm.crypto_currency === "EGD" ||
  //             vm.crypto_currency === "FFTS" ||
  //             vm.crypto_currency === "DNA" ||
  //             vm.crypto_currency === "FFC" ||
  //             vm.crypto_currency === "CBC") &&
  //           vm.address_total === 1
  //         ) {
  //           vm.bund_address = bund_address;
  //           vm.isShowBoundAddressView = false;
  //           vm.isShowDetailView = true;
  //           vm.withdraw_address = bund_address;
  //         }
  //         if (
  //           (vm.crypto_currency === "OSC" ||
  //             vm.crypto_currency === "DGC" ||
  //             vm.crypto_currency === "XDAG" ||
  //             vm.crypto_currency === "EGD" ||
  //             vm.crypto_currency === "FFTS" ||
  //             vm.crypto_currency === "DNA" ||
  //              vm.crypto_currency === "FFC" ||
  //             vm.crypto_currency === "CBC") &&
  //           vm.address_total != 1
  //         ) {
  //           vm.bund_address = "";
  //           vm.isShowBoundAddressView = true;
  //           vm.isShowDetailView = false;
  //         } else {
  //           vm.isShowBoundAddressView = false;
  //           vm.isShowDetailView = true;
  //         }

  //         vm.feeTip = feeTip;
  //         vm.min_withdrawable = min_withdrawable;
  //         // if(vm.crypto_currency === 'OSC'){
  //         //   vm.min_withdrawable = parseInt(min_withdrawable)+0.5;
  //         // }
  //         vm.max_withdrawable = max_withdrawable;
  //         vm.validate_method = validate_method;
  //         vm.fee = fee;
  //         vm.isShowContentView = true;
  //       });
  //       nprogress.done();
  //     })
  //     .catch(e => {
  //       nprogress.done();
  //       HttpResultCode.validate(e.code);
  //     });
  // },

    created: function() {
      this.getMyAccount();
      this.USER_otc_my_depositing();
      this.USER_wallet_withdraw_restriction();
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
     closeDialog() {
      this.isRechargeTipDialog = false;
      this.isWithdrawDialog = false;
      this.isrebound_address_dialog = false;
      this.isCancel_Deposite_dialog = false
    },
    onClickOMNI(){
      this.isOMNI = "1"
    },
    onClickERC20(){
    this.isOMNI = "2"
    },
    onClickOMNI1(){
      this.isWithdrawOMNI = "1"
    },
    onClickERC201(){
    this.isWithdrawOMNI = "2"
    },
    
    cancelDeposite(){
       this.isCancel_Deposite_dialog  = true
    },
    getMyAccount(){
       user
        .USER_otc_my_account()
        .then(result => {
          if (result.code === 0) {
            if(result.data.funds.usdt){
                this.balance = result.data.funds.usdt.available 
                this.locked = result.data.funds.usdt.locked 
                
            }
          }
        })
        .catch(e => {
      
        });
    },
    
    USER_wallet_withdraw_restriction(){
       let params = { 
         "currency":"usdt"
          }
       wallet
        .USER_wallet_withdraw_restriction(params)
        .then(result => {
          if (result.code === 0) {
           this.max_withdrawable = result.data.max_withdrawable
           this.min_withdrawable = result.data.min_withdrawable
           this.validate_method = result.data.validate_method
           this.fee = result.data.fee
          }
        })
        .catch(e => {
           this.showToast(e.message)
        });
    },
    cancel_deposite(){
       this.isCancel_Deposite_dialog = false
       let params = { 
         "currency":"usdt",
          "transfer_id":this.transfer_id
          }
       wallet
        .USER_wallet_cancel_transfer(params)
        .then(result => {
          if (result.code === 0) {
             this.isRechargeValue = false
             this.USER_otc_my_depositing();
          }else{
             this.showToast(e.message)
          }
          
        })
        .catch(e => {
           this.showToast(e.message)
        });
    },
    USER_otc_my_depositing(){
      let params = { "currency":"usdt"}
       wallet
        .USER_otc_my_depositing(params)
        .then(result => {
          if (result.code == 0) {
              this.isRechargeValue = true
              this.address = result.data.address
              this.can_cancel = result.data.can_cancel
              this.depositeQty = result.data.qty
              this.usdt_type = result.data.usdt_type
              this.transfer_id = result.data.transfer_id
          }
          if (result.code == 2518) {
              this.isRechargeValue = false
          }
  
        })
        .catch(e => {
       if (e.code == 2518) {
              this.isRechargeValue = false
          }
        });
    },


    USER_otc_wallet_deposit(){
      if( parseFloat(this.czqty)<0){
          this.showToast(this.$t("Text.CZEDHintError"));
        return
      }
      let params = { 
        "currency":"usdt",
         "usdt_type":this.isOMNI == '1'?"OMNI":"ERC20", 
        "qty":this.czqty    
        }
       wallet
        .USER_otc_wallet_deposit(params)
        .then(result => {
           if(result.code==0){
             this.USER_otc_my_depositing();
             this.czqty   = ""
           }else{
             this.showToast(e.message)
           }
        })
        .catch(e => {
          this.showToast(e.message)
        });
    },

    deposit() {
      this.$router.push("/deposit");
    },
    // recharge_tip() {
    //   this.isRechargeValue = true;
    // },

    getHumanDate: function(timestamp) {
      return moment(timestamp).format("YYYY/MM/DD HH:mm");
    },
    uesraddress_focus: function() {
      this.isError = false;
      this.uesraddress_error_notice = "";
    },

    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
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
    gobills() {
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
        // this.showToast(this.$t("Wallet_Detail.input_withdraw_address"));
        this.withdraw_address_error = "  ";
        return false;
      }
      this.withdraw_address_error = "";
      return true;
    },
    check_qty() {
      if (this.qty.length === 0) {
        // this.showToast(this.$t("Wallet_Detail.input_withdraw_qty"));
        this.qty_error = " ";
        return false;
      }
      // // this.qty = lib.toFixed(parseFloat(this.qty), 8);
      // if (parseFloat(this.qty) > parseFloat(this.max_withdrawable)) {
      //   this.showToast(
      //     this.$t("Wallet_Detail.account_none") +
      //       this.qty +
      //       this.crypto_currency
      //   );
      //   this.qty_error = " "; //this.$t('Wallet.Withdraw.QtyErrorMax')
      //   return false;
      // }
      // if (parseFloat(this.qty) < parseFloat(this.min_withdrawable)) {
      //   this.showToast(
      //     this.$t("Wallet_Detail.withdraw_number") +
      //       this.min_withdrawable +
      //       this.crypto_currency
      //   );
      //   this.qty_error = " "; //this.$t('Wallet.Withdraw.QtyErrorMin')
      //   return false;
      // }
      this.qty_error = "";
      return true;
    },
    check_pwd() {
      if (this.pwd.length === 0) {
        // this.showToast(this.$t("Wallet_Detail.pwd_validate_tip"));
        this.pwd_error = " ";
        return false;
      }
      this.pwd_error = "";
      return true;
    },
    check_code() {
      // if (this.code.length != 6) {
      //   this.showToast(this.$t("Wallet_Detail.code_validate_tip"));
      //   this.code_error = " ";
      //   return false;
      // }
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
        .USER_wallet_onetimecode_withdraw({})
        .then(result => {

              this.showToast( this.$t("SignIn.SendCodeMobile"));
          this.time_refresh();
        })
        .catch(e => {
          this.code_error = e.message
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
       let params = {
         "currency":"usdt",
          "usdt_type":this.isWithdrawOMNI=='1'?"OMNI":"ERC20", 
          "address": this.withdraw_address,
          "qty":this.qty,
          "password": this.pwd,
          "one_time_code":this.code
       }
      wallet
        .USER_wallet_withdraw(
          params
        )
        .then(result => {
          this.withdraw_address = "";
          this.pwd = "";
          this.qty = "";
          this.code = "";
          this.showToast(this.$t("Wallet_Detail.send_succedd"));
          this.$router.push("/withdraw_ok");
        })
        .catch(e => {
          this.showToast(e.message);
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
@import "../assets/css/wallet_usdt.scss";
.content-wallet-cash {
  .modal-tit{
    text-align: center;
    color:rgba(78,88,110,1);
    font-weight:500;
  }
  .modal-content{
    color:rgba(78,88,110,1);
  }
  .go {
    display: inline-block;
    width: 2em;
    height: 3em;
    background: url("../assets/image/more.png") no-repeat center;
    background-size: 100%;
    margin-right: 0.3em;
  }
  .left {
    background-image: url("../assets/image/arrow_left.png") !important;
  }
  .my-imf{
    width: toRem(20);
    height: toRem(20);
  }
  .withdraw-input-item .withdraw-input{
    padding-left: torem(10);
    font-size: toRem(13) !important
  }
  .mu-text-field-hint{
    font-weight: normal;
    color: rgba(169, 178, 195, 1) !important;
    font-size: toRem(14)
  }
  .top {
    background: #fff !important;
    .center{
       color: #000 !important
    }
    .right{
       color: #000 !important
    }
  }
  .withdraw-detail{
    padding-top: toRem(50) !important;
    .withdraw-input-item{
      height: 3rem !important;
      padding: 0 toRem(16) !important
    }
  }
  .publish-trade-type-item{
    // padding: toRem(10) !important;
    div{
      // margin-top: 4px !important
    }
  }
  .withdraw-max-value-p{
    background: #ffffff !important;
    margin-bottom: toRem(10) !important;
    padding: toRem(10) toRem(16) !important;
    span{
      color: rgba(169, 178, 195, 1) !important
    }
  }
  .withdraw_qty{
    color:#4E586E;
    font-size: toRem(14) !important;
    font-weight: 400 !important;
    text-align: left; 
    position: static; 
    background: #fff; 
    padding: toRem(10) 0 0 toRem(16);
  }
  .publish-trade-type-item span{
    font-size: toRem(14) !important;
    font-weight: 400 !important;
    margin-right: 0 !important;
    width: toRem(86);
    text-align: left;
  }
  .withdraw-input-item span{
    font-size: toRem(14) !important;
    font-weight: 400 !important;
    width: toRem(100);
    text-align: left;
  }
  .my-action{
    color:rgba(169,178,195,1);
    line-height:17px;
    text-align: center;
  }
  .m-withdraw-input-item{
    height: 0.16667rem;
    background: #f3f5f7;
  }
  .withdraw-detail .withdraw-input-item span{
    display: flex !important;
    align-items: center !important;
    padding-top: 0 !important; 
    // margin-right: 0.5em;
    // white-space: nowrap;
  }
}
</style>
<style  lang="scss">
@import "../assets/css/config/Vars";
.content-wallet-cash {
  .withdraw-input .mu-text-field-content{
    display: flex;
    align-items: center;
  }
  .withdraw_qty-c{
    .mu-text-field-content{
      position: relative;
      display: flex;
      align-items: flex-end;
      .mu-text-field-hint{
        display: flex;
        align-items: flex-end;
        bottom: 0px;
      }
       .mu-text-field-hint.show{
         bottom: toRem(-4)
       }
       .mu-text-field-input{
          bottom: toRem(-8);
          font-size: toRem(25) !important;
       }
    }
  }
  .mu-text-field-hint.show{
    font-size: toRem(14) !important;
    font-weight: normal;
  }
  .mu-text-field-input{
    // font-size: toRem(25) !important;
  }
  .mu-text-field-hint{
    color: rgba(169, 178, 195, 1) !important;
    font-size: toRem(14)
  }
  .mu-text-field-content{
    padding: 0 !important;
    height: auto !important;
    // padding-bottom: toRem(10) !important;
    // padding-top: toRem(8) !important;
  }
  .withdraw-input{
    display: flex !important;
    align-items: center !important;
  }
}
</style>
