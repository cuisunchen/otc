<template>
  <div class="content-wallet content-wallet-recharge" style="background:#ffffff;">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <!--<div class="center"  style="color: #000">{{$t('Text.mine_tab1')}}</div>-->
      <div class="center"  style="color: #000">{{$t('Wallet_Detail.top_up')}}</div>
      <div class="left" @click="goBack" />
      <!--<div class="right" @click="gobills" style="color: #000">{{$t('Wallet_Detail.detail')}}</div>--> 
    </div>
    <div class="wallet-content">
      <div class="wallet-detail" v-show="isRechargeValue">
        <div style="background:#ffffff;padding-top:0.2em;padding-bottom:1em;">
        <div class="top-msg"  v-show="isRechargeValue">
          <img src="../assets/image/icon-sccuss.png" alt="" srcset="">
          <p class="p1">{{ $t('Text.rechange_submit') }}</p>
          <p>{{ $t('Text.rechange_submit_msg') }}</p>
        </div>
        <div class="wallet-detail-tip-item"  v-show="isRechargeValue"  style="margin-top:1.5em;margin-left:1em;">
          <span style="float:left;color:rgba(78,88,110,1);font-weight:500;">{{$t('Text.firefox_rechange_address')}}</span>
        </div>
        <br>
        <div class="wallet-detail-content-p2" v-show="isRechargeValue">
          <span v-clipboard:copy="address" v-clipboard:success="success" class="span-left fs-12">{{address}}</span> 
          <span v-clipboard:copy="address" v-clipboard:success="success" class="span-right">&nbsp;{{$t('Text.copy')}}</span>
        </div>
        <div class="wallet-detail-tip-item"  v-show="isRechargeValue"  style="margin-top:1.5em;margin-left:1em;">
          <span style="float:left;color:rgba(78,88,110,1);font-weight:500;">{{$t('Text.czje')}}</span>
        </div>
        <br>
         <div v-show="isRechargeValue" class="wallet-detail-content-p2" >
           <span style="color:rgba(78,88,110,1);font-size:1em;" class="span-left fs-14">{{this.depositeQty+" USDT"}}</span >
           <span v-clipboard:copy="depositeQty" v-clipboard:success="success" class="span-right">{{$t('Text.copy')}}</span>
         </div>
        <qrcode  v-show="isRechargeValue" :value="this.address" :options="{ size: 120 }" :v-show="address!=''"></qrcode>
        
 <div  style="padding-left:2em;color:rgba(227, 30, 30, 1);background:#ffffff" >{{$t('Text.rechargeTip1')}}{{this.depositeQty}}{{$t('Text.rechargeTip2')}}</div>

</div>
         <div style="width:100%;height:3em;"></div>
          <mu-raised-button   v-show="isRechargeValue"  :label="$t('Text.qxcz')" @click="cancelDeposite" class="btn"  fullWidth primary/>
      </div>
      <!--提示-->
       <div v-show="!isRechargeValue" class="wallet-content-recharge-tip">
          <div v-show="!isRechargeValue" class="publish-trade-type-item">
            <span style="color:#4E586E;font-size:1em;" v-html="$t('Text.coinName1')"></span>
            <div style="margin-left:2em;display:flex; margin-top: 5px"> 
               
                <img src="../assets/image/icon_coin_ck_p.png" v-show="isOMNI=='2'" class="my-imf" @click="onClickERC20"> 
                <img src="../assets/image/icon_coin_ck_n.png"  class="my-imf" v-show="isOMNI=='1'" @click="onClickERC20">   
                <span style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isOMNI=='2'" @click="onClickERC20">USDT-ERC20</span> 
                <span style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.4em 0.2em;" v-show="isOMNI=='1'" @click="onClickERC20">USDT-ERC20</span>  

								<!--<img src="../assets/image/icon_coin_ck_p.png" class="my-imf"  v-show="isOMNI=='1'" @click="onClickOMNI"> 
                <img src="../assets/image/icon_coin_ck_n.png" class="my-imf"   v-show="isOMNI=='2'" @click="onClickOMNI">  
                <span style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;" v-show="isOMNI=='1'"  @click="onClickOMNI">USDT-OMNI</span> 
                <span style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em;"  v-show="isOMNI=='2'"  @click="onClickOMNI">USDT-OMNI</span> -->
            </div>
          </div>
          <!--<div v-show="!isRechargeValue" style="width:100%;height:1px;background:#f4f4f4;"></div>
          <p class="textCzed" v-show="!isRechargeValue"  v-html="$t('Text.CZED')"></p>
          <div v-show="!isRechargeValue" class="publish-safe-price-currency-item" style="padding-left:1em;padding-right:1em;">
            <mu-text-field v-model.trim="czqty"  type="number"  :hintText="$t('Text.CZEDHint')" fullWidth class="mu-text-field-input"></mu-text-field> 
            <i style="line-height: 34px;">USDT</i>
          </div>
          <div style="width:100%;height:1px;background:#F3F5F7;"></div>
         <mu-raised-button    v-show="!isRechargeValue" :label="$t('Text.tj')" @click="USER_otc_wallet_deposit" class="btn1" style="margin-top:2rem;"  fullWidth primary/>-->
       	<!--充值变更-->
       <div>
         	<div style="text-align: center;padding: 50px 0;">
         		<qrcode  :value="deposit_addressData.address" :options="{ size: 150 }" style="margin-top:0.5em;border:10px solid #F3F5F7;"></qrcode>
          </div>
          <div style="margin: 0 10px;">
          	<div>{{$t('Text.cbdzs')}}：</div>
          	<div style="margin-top: 10px;">{{deposit_addressData.address}}</div>
          </div>
          <mu-raised-button v-clipboard:copy="deposit_addressData.address" v-clipboard:success="success" :label="$t('Text.fzdzs')" class="btn1" style="margin-top:2rem;"  fullWidth primary/>
        </div>
        <div style="padding: 15px;line-height: 25px;font-size: 12px;">{{$t('Text.czwxts')}}</div>
      </div> 
 

   </div>
<!--提现-->
   <div class="withdraw-detail" v-show="tab=='tab2'">
     <div >
    <div class="withdraw-input-item-zone">
      <div  class="publish-trade-type-item">
            <span  v-html="$t('Text.coinName2')"></span>
           <div style="display:flex;">

                <img src="../assets/image/icon_coin_ck_p.png" style="width:1em;height:1em;margin-top:0.3em;" v-show="isWithdrawOMNI=='1'" @click="onClickOMNI1"> 
                <img src="../assets/image/icon_coin_ck_n.png"   v-show="isWithdrawOMNI=='2'" style="width:1em;height:1em;margin-top:0.3em;" @click="onClickOMNI1">  
                <div  style="color:#4E586E;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em; text-align: left"  v-show="isWithdrawOMNI=='1'"  @click="onClickOMNI1">USDT-OMNI</div> 
                <div style="color:#A9B2C3;font-size:0.85em;padding:0.2em 0.3em 0.6em 0.2em; text-align: left"  v-show="isWithdrawOMNI=='2'"  @click="onClickOMNI1">USDT-OMNI</div> 
            </div>
          </div>
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_address')"  style="color:#4E586E;font-size:1em;" ></span>
        <mu-text-field v-model.trim="withdraw_address" class="withdraw-input"  :hintText="$t('Wallet_Detail.withdraw_address_hint')" fullWidth   :errorText="withdraw_address_error" ></mu-text-field>
     </div>  
    </div>
     <div class="withdraw-input-item-zone">
       <p  class="withdraw-max-value-p"><span >{{$t('Wallet_Detail.withdraw_max_value')}}<span class="red-hint">{{max_withdrawable}}&nbsp;{{crypto_currency}}</span></span></p>
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_qty')"  style="color:#4E586E;font-size:1em;"></span> 
        <mu-text-field v-model.trim="qty" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.minimum')+min_withdrawable+' + '+fee+' ('+$t('Text.sxf')+') '+crypto_currency" fullWidth @keyup.native="check_qty()"  :errorText="qty_error" ></mu-text-field>
        <span style="padding-right:0px;">{{crypto_currency}}</span>
     </div> 
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding" v-show="false">
     <div class="withdraw-input-item">
        <span style="text-align:left;color:#4E586E;font-size:1em;" v-html="$t('Wallet_Detail.withdraw_fee')" ></span>
        <span style="flex:1;text-align:right;padding-right:0px;"> {{fee}} {{crypto_currency}}</span>
     </div> 
     </div>
     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_pwd')"  style="color:#4E586E;font-size:1em;"></span>
        <mu-text-field v-model.trim="pwd" class="withdraw-input"  type="password" :hintText="$t('Text.withdraw_pwd_hint')" fullWidth @keyup.native="check_pwd()"  :errorText="pwd_error" ></mu-text-field>
     </div> 
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='MOBILE'">
     <div class="withdraw-input-item">
        <span  v-html="$t('Wallet_Detail.withdraw_mobile')"  style="color:#4E586E;font-size:1em;"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_mobile_hint')" fullWidth  @keyup.native="check_code()"  :errorText="code_error"></mu-text-field>
         <div  class="div-send-code" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

     <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='EMAIL'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_email')"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_email_hint')" fullWidth  @keyup.native="check_code()" :errorText="code_error"></mu-text-field>
        <div  class="div-send-code" @click="get_code">{{refresh_txt}}
      </div> 
     </div>
     </div>

      <div class="withdraw-input-item-zone withdraw-input-item-zone-nopadding"  v-show="validate_method=='GOOGLE_AUTH'">
     <div class="withdraw-input-item">
        <span v-html="$t('Wallet_Detail.withdraw_google')"></span>
        <mu-text-field v-model.trim="code" class="withdraw-input"  type="number"  :hintText="$t('Wallet_Detail.withdraw_google_hint')" fullWidth @keyup.native="check_code()" :errorText="code_error"></mu-text-field>
        <div v-show="false" class="div-send-code" @click="get_code">{{refresh_txt}}
      </div>
     </div>
     </div>
     <div style="width:100%;height:3em;"></div>
        <div class="withdraw-input-item-zone btn-zone">
          <mu-raised-button   :label="$t('Wallet_Detail.confirm_submit')" @click="commit" class="btn" fullWidth primary/>
        </div>

   </div>
   </div>
  <PopupDialog
      v-if="isRechargeTipDialog"
      :confirm="closeDialog"
      :confirmText="$t('Order.Colse')"
      :content="crypto_currency === 'FFC' ? $t('Wallet_Detail.top_up_tip_ffc'): ''"
      :title="$t('Wallet_Detail.top_up_tip')"
      :cancel="closeDialog">
    </PopupDialog>
  <PopupDialog
      v-if="isWithdrawDialog"
      :confirm="cancel_deposite"
      :confirmText="$t('Wallet_Detail.withdraw_conform')"
      :content="crypto_currency != 'XDAG'?$t('Wallet_Detail.withdraw_content_tip'): '' "
      :title="$t('Wallet_Detail.withdraw_tip')"
      :cancel="closeDialog">
    </PopupDialog>

  <PopupDialog
      v-if="isCancel_Deposite_dialog"
      :confirm="cancel_deposite"
      :content="$t('Text.qxczTip')"
      :title="$t('Text.qxcz')"
      :cancel="closeDialog">
    </PopupDialog>

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
import {
  API_BASE_URL,
} from "../models/url.js";




export default {
  name: "wallet_usdt",
  components: {PopupDialog},
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
      isOMNI:'2',
      isWithdrawOMNI:'1',
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
      czqty :'',
      deposit_addressData:''//充值地址
    };
  },
    created: function() {
    	this.getWALLET_deposit_address();//获取充值地址
      this.getMyAccount();
      this.USER_otc_my_depositing();
      this.USER_wallet_withdraw_restriction();
  },
  watch:{
  	isOMNI:function(){
  		this.getWALLET_deposit_address();//获取充值地址
  	}
  },
  methods: {
  	//获取充值地址
  	getWALLET_deposit_address:function(){
  		this.axios({
		  	method: 'post',
	  		timeout: 30000,
				url: API_BASE_URL + '/wallet/deposit_address',
				headers: {
	        Authorization: "Bearer " + store.state.user.access_token
	      },
				data: {currency:'usdt',usdt_type:this.isOMNI == '1'?"OMNI":"ERC20"}
			}).then((response) => {
				if(response.data.code === 0){
					this.deposit_addressData = response.data.data;
				}else{
					this.showToast(response.data.message)
				}
	  	}).catch((error) => {
	  		this.showToast(this.$t('Text.qqyc'))
	  	});
  	},
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
.content-wallet-recharge {
  .left {
    background-image: url("../assets/image/arrow_left.png") !important;
    background-size: cover;
  }
  .my-imf{
    width: toRem(20);
    height: toRem(20);
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
  .publish-trade-type-item{
    padding: toRem(10) !important
    div{
      margin-top: 4px !important
    }
  }
  .textCzed{
    margin-top: toRem(10);
    background: #fff;
    padding: toRem(10)  toRem(16) !important
  }
  .top-msg{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img{
      margin: toRem(10) 0;
      margin-top: toRem(30);
    }
    .p1{
        font-size: toRem(18);
        font-weight: bold;
        margin-bottom: toRem(10);
        color: rgba(0,94,228,1)
      }
  }
  .mu-text-field-input{
    font-size: toRem(14) !important;
    border-bottom: 1px solid #f3f5f7 !important
  }
  i{
      font-style: normal;
      padding-right: toRem(10);
      font-size: toRem(18);
      border-bottom: 1px solid #f3f5f7 !important;
      display: flex;
      align-items: flex-end;
  }
  .wallet-content .wallet-content-recharge-tip .publish-safe-price-currency-item{
    padding: 0;
    padding-bottom: 15px;
  }
}
.wallet-detail-content-p2{
    display: flex;
    height: toRem(50);
    padding: 0 toRem(10);
    span{
      display: flex;
      align-items: center;
    }
    .span-left{
      flex: 1;
      text-indent: 1em;
      background: #f0f0f0 !important;
      font-family:PingFangSC;
      font-weight:500;
    }
    .span-right{
      width: toRem(50);
      background:rgba(0,94,228,1);
      justify-content: center;
      color: #ffffff;
    }
  }
  p{
    margin: 0;
    padding: 0
  }
</style>
<style lang="scss">
@import "../assets/css/config/Vars";
.content-wallet-recharge {
  .mu-text-field-content{
    display: flex;
    align-items: flex-end;
  }
  .mu-text-field-hint.show{
    font-size: toRem(14) !important;
  }
  .mu-text-field-input{
    font-size: toRem(25) !important;
  }
}
</style>
