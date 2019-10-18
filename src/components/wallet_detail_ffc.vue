<template>
  <div class="content-wallet-detail-cny" style="padding-top:10em;background:#fff">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">火狐币</div>
      <div class="left" @click="goBack" />
      <div class="right" @click="bills">{{$t('Wallet_Detail.detail')}}</div>
    </div>
    <div class="wallet-common-zone-cny">
      <div class="wallet-common-bund-address-cny" >
        <p class="wallet-common-bund-address-balance-cny">{{$t('Wallet_Detail.balance')}}</p>
        <div class="wallet-common-bund-address-balance-value-cny"><span class="span-left">{{balance}}</span>&nbsp;<span class="span-right">&nbsp;FFC</span></div>
        <div class="wallet-common-bund-address-balance-lock-value-cny"><span class="span-left">{{$t('Wallet_Detail.Freezing')}}</span>&nbsp;<span class="span-right">{{locked}}&nbsp;FFC</span></div>
     </div>
    </div>                                                
    <div class="tab-wallet-cny">               
      <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">购买FFC</button>
      <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">出售FFC</button>
    </div>
    <div class="recharge-content" v-show="tab=='tab1'">
      <!-- <div class="recharge-content-common" >
        <div class="wallet-detail-tip-item" >
          <span style="float:left;">火狐狸平台火狐币充值流程</span>
        
        </div>
      </div> -->
      <div class="step-hint" v-show="!hasDeposit">
          <p>输入购买金额范围 500 ~ 50000 CNY,需为整数！</p>
      </div>
      <div class="step-hint" v-show="hasDeposit">
          <p>转账时请备注订单号!!!<span style="color:#ff4d2d">（切勿备注火狐狸或firefox）</span> 认证商家审核通过后您的钱包将会获得同等数量的FFC!</p>
      </div>
      <!-- <div class="recharge-content-divider"></div> -->
      <div v-show="!hasDeposit" class="recharge-content-input">
        <mu-auto-complete style="text-align: left;padding-left: 0.3em"  v-model.trim="deposit" class="input-zone" hintText="输入购买金额范围 500 ~ 50000 CNY，需为整数" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
        <mu-raised-button label="购买" style="margin-top:0.5em;" @click="showDepositDialog" class="btn" fullWidth primary/>
      </div>
      <div v-show="!hasDeposit" class="liucheng-hint">
        <p>购买FFC说明：<br />
        1.输入购买金额范围 500 ~ 50000 CNY，需为整数，并下单。<br />
         2.下单成功后，请按照提示完成支付、备注订单号<span style="color:#ff4d2d">（切勿备注火狐狸或firefox）</span>并电话联系认证商家进行审核。<br />
        3.认证商家审核通过后您的钱包将会获得同等数量的FFC。<br />
        <br />
        注意：<br />
        如果您没有及时支付，请取消购买，否则会被封号处理。</p>
      </div>
      <div v-show="hasDeposit">
        <div class="recharge-content-order">
        <p  @click="showDetail(depositItem)"><span v-html="$t('Order.OrderId1')"></span><span class="left-span blue-span">{{depositItem!=null?"F"+depositItem.id:''}}</span>&nbsp;</p>
        
        <p  @click="showDetail(depositItem)">购 买 金 额<span class="left-span red-span">{{depositItem!=null?depositItem.amount:''}}&nbsp;<span >CNY</span></span></p>
      
      <!-- <div v-show="depositItem==null ?false :depositItem.isOpen"  @click="showDetail(depositItem)"> -->
      <div  @click="showDetail(depositItem)">
       <!-- <p><span >手续费</span><span class="left-span gray-span">{{depositItem!=null?depositItem.fee:''}}&nbsp;CNY</span></p> -->
       <!-- <p><span >昵称</span><span class="left-span gray-span">{{depositItem!=null?depositItem.agent:''}}</span></p> -->  
        <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{depositItem!=null?depositItem.updated:null  | getformatDate}}</span></p>
        </div>

        </div>
          <!-- <div v-show="depositItem==null ?false :depositItem.isOpen"  > -->
        <div >
         <p class="title_pay">{{$t('Order.payMeth')}}</p> 
         <div class="pay-zone" v-show="deposit_alipay_on" @click="openPay('openAlipay')">
            <div class="pay-zone-item">
              <i class="alipay-ico"></i>
              <span>{{$t('Trade.alipay')}}</span>
              <i class="go"></i>
            </div>
         </div>
         <div  class="pay-detail-zone" v-show="isOpenAlipay" >
              <div>
              <p class="pay-detail-zone-p">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span>{{deposit_alipay_on?depositItem.alipay.name:''}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Order.alipayNumber')}}<span>{{deposit_alipay_on?depositItem.alipay.account:''}}</span></p>
               <p class="pay-detail-zone-p" @click="go_play()" v-show="isCanPay" ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD')}}</span>  </p>
              </div>
              <!-- <img  :src="deposit_alipay_on?depositItem.alipay.payment_code_url:''" style="width:80%" @click="go_play()" /> -->
                <img style="width:80%;"  :src="deposit_alipay_on?depositItem.alipay_payment_code_url_value:''" @click="go_play()" v-show="deposit_alipay_on&&!(depositItem.isAlipayQrcode)"/>
              <div  @click="go_play()">
              <qrcode style="width:80%;"   @click="go_play()" :value="deposit_alipay_on?depositItem.alipay_payment_code_url_value:''" :options="{ size: 120 }"  v-show="deposit_alipay_on&&depositItem.isAlipayQrcode"></qrcode>  
              </div>
         </div>
         <!---->
         <div class="pay-zone"  v-show="deposit_wechat_pay_on"   @click="openPay('openWechat')">
            <div class="pay-zone-item">
              <i class="wechat-ico"></i>
              <span>{{$t('Trade.wechat')}}</span>
              <i class="go"></i>
            </div>
         </div>
         <div  class="pay-detail-zone"  v-show="isOpenWechat" >
              <div>
              <p class="pay-detail-zone-p">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span>{{deposit_wechat_pay_on?depositItem.wechat_pay.name:""}}</span></p>
              <p class="pay-detail-zone-p" >{{$t('Order.wechatNumber')}}<span>{{deposit_wechat_pay_on?depositItem.wechat_pay.account:""}}</span></p>
             <p class="pay-detail-zone-p"  ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD_WX')}}</span>  </p>
              </div>
              <!-- <img  :src="deposit_wechat_pay_on?depositItem.wechat_pay.payment_code_url:''"  style="width:80%"/> -->
                <img style="width:80%"  :src="deposit_wechat_pay_on?depositItem.wechat_payment_code_url_value:''"  v-show="deposit_wechat_pay_on&&!(depositItem.isWechatQrcode)"/>
                <qrcode style="width:80%"   :value="deposit_wechat_pay_on?depositItem.wechat_payment_code_url_value:''" :options="{ size: 120 }"  v-show="deposit_wechat_pay_on&&depositItem.isWechatQrcode"></qrcode>  
            
         </div>
         <div class="pay-zone"  v-show="deposit_bankcard_on"   @click="openPay('openBank')">
            <div class="pay-zone-item">
              <i class="bank-ico"></i>
              <span>{{$t('Trade.bank')}}</span>
              <i class="go"></i>
            </div>
         </div>
         <div  class="pay-detail-zone" v-show="isOpenBank" >
               <p class="pay-detail-zone-p">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span>{{deposit_bankcard_on?depositItem.bank_card.name:''}}</span></p> 
               <p class="pay-detail-zone-p" >{{$t('Order.bankCard')}}<span>{{deposit_bankcard_on?depositItem.bank_card.card_number:''}}</span></p>
               <p class="pay-detail-zone-p" >{{$t('Order.bankName')}}<span>{{deposit_bankcard_on?$t('Bank.'+depositItem.bank_card.bank_code):''}}</span></p>
               <p class="pay-detail-zone-p" >{{$t('Order.bankBranch')}}<span>{{deposit_bankcard_on?depositItem.bank_card.branch_name:''}}</span></p>
         </div>
         <div class="step-hint">
          <p>十分钟内未处理，可电话联系认证商家进行审核或添加火狐狸QQ:3294806200。</p>
          </div>
         <p class="title_pay">联系方式</p> 
         <p class="tel">商家手机号<span >{{ depositItem | isShowPhoneNumber}}</span></p>
         <div class="step-hint">
          <p>如果您没有及时支付，请取消购买，否则会被封号处理。</p>
          </div>
         <div style="padding:1em">
            <mu-raised-button label="取消购买" @click="showCancelDepositDialog" class="btn-cancel" fullWidth primary style="margin-top:1em"/>
         </div>
        </div> 
      </div>
   </div>
<!--提现-->
   <div class="recharge-content" style="padding-bottom:0px;" v-show="tab=='tab2'">
     <!-- <div class="recharge-content-common" >
        <div class="wallet-detail-tip-item" >// depositItem!=null?depositItem.agent_mobile:''
          <span style="float:left;">火狐狸平台火狐币提现流程</span>
  
        </div>
      </div> -->
      <!-- <div class="recharge-content-divider"></div> -->
      <div class="step-hint" v-show="!hasWithdraw">
          <p>输入出售金额范围 10 ~ 50000 CNY,需为整数！</p>
      </div>
      <div v-show="!hasWithdraw" class="recharge-content-input">
        <mu-auto-complete style="text-align: left;padding-left: 0.3em"  v-model.trim="withdraw" class="input-zone" hintText="输入出售金额范围 10 ~ 50000 CNY，需为整数" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
        <mu-raised-button label="出售" style="margin-top:0.5em;" @click="withdrawDialog" class="btn" fullWidth primary/>
      </div>
      <div class="liucheng-hint" v-show="!hasWithdraw">
       <p> 出售FFC说明：<br />
        1.输入出售金额范围 10 ~ 50000 CNY并下单。<br />
        2.下单成功后，请电话联系认证商家进行付款。<br />
        3.您确认微信、支付宝或者银行卡已经收到付款后，请及时点击“已确认收款”。<br />
        <br />
        注意：<br />
        如果您下单成功后，无法联系商家或商家未在24小时内付款，可以联系客服。<br />
        出售FFC将收取0.6%的服务费用，最低3 CNY。<br /></p>
      </div>
      <div v-show="hasWithdraw">
        <div class="step-hint">
          <p>您确认微信、支付宝或者银行卡已经收到付款后，请及时点击“已确认收款”！</p>
      </div>
        <!-- <div class="total-withdraw">提现总额<span>{{balance}}&nbsp;FFC</span></div> -->
        <div class="withdraw-detail-item"  v-for="(item) in this.withdraws" :key="item.id">
          <p class="pay-detail-zone-p withdraw-order-num">订单号：<span >F{{item.id}}</span>  <span v-show="item.status=='PAID'" style="color:#fb8d8d;float:right">商家已付款</span></p>
          <p class="pay-detail-zone-p">出售金额<span class="withdraw-order-num-cny">{{item.amount}}&nbsp;FFC</span></p>
          <!-- <div v-show="item.isOpen"  @click="showDetail(item)"> -->
          <div v-show="item.isOpen"  >
          <p class="pay-detail-zone-p">手续费<span>{{item.fee}}&nbsp;FFC</span></p>
           <p class="pay-detail-zone-p">创建时间<span>{{item.created | getformatDate}}</span></p>
           <p class="pay-detail-zone-p" style="color:#fb8d8d; font-size:0.8em">*商家十分钟内未处理，请电话联系认证商家进行付款或添加火狐狸QQ:3294806200。</p>
           
          <!-- <p class="pay-detail-zone-p">昵称：<span>{{item.agent item.agent_mobile updated}}</span></p> -->
          <p class="withdraw-order-btn-zone">
              商家手机号:&nbsp;{{ item | isShowPhoneNumber }}<button @click="showSucceedWithdrawDialog(item)">确认已收款</button>
          </p>
           <!-- <p class="pay-detail-zone-p" >{{$t('Wallet_Detail.createTime')}}<span>{{item.updated | getformatDate}}</span></p> -->
           </div>
        </div>
        <div class="recharge-content-divider"></div>
      </div>
   </div>
   
  <mu-dialog :open="isDeposit" title="购买提示" >
    <div >请确认是否购买FFC</div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="go_deposit" primary label="购买"/>
  </mu-dialog>
  <mu-dialog :open="isShowCancelDepositDialog" title="取消购买提示" >
    <div >请确认是否取消购买，<span style='color:#ff4d2d'>如已付款，请勿取消购买。</span></div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="cancel_Deposit" primary label="取消购买"/>
  </mu-dialog>

  <mu-dialog :open="isWithdrawDialog" title="出售提示" >
     请确认是否出售FFC
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="agent_withdraw" label="出售"/>
  </mu-dialog>
  <mu-dialog :open="isShowSucceedWithdrawDialog" title="收款提示" >
    <mu-text-field  type="password"  style="text-align: left;padding-left: 0.3em"  v-model.trim="withdrawPassword" class="input-zone" hintText="交易密码" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
       <mu-checkbox label="我已经查实收到商家转账了。" v-model="isPayTipSure"/> 
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" primary @click="succeedWithdraw" label="确认"/>
  </mu-dialog>
  <mu-dialog :open="isPayTipDialog" title="支付提示" >
      支付时，请核对对方信息无误。
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="go_aliplay" label="去支付"/> 
  </mu-dialog>
  <mu-dialog :open="isBoundAdDialog"  :title="$t('Trade.Publish.AdvertisingTips')">
          {{pay_error}}
            <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
            <mu-flat-button slot="actions" primary @click="pay_bound" :label="$t('Trade.Publish.AdvertisingTips27')"/>
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
import { formatDate } from "../common/js/data";
import {
  SET_CRYPTO_CURRENCY,
  CLEAN_USER,
  SET_USER
} from "../store/mutation-types";
import agent from "../models/agent";
export default {
  name: "wallet_detail",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      balance: "0",
      locked: "0",
      isRechargeTipDialog: false,
      isWithdrawTipDialog: false,
      oscError: "",
      tab: "tab1",
      deposit: "",
      withdraw: "",
      isDeposit: false,
      refresh_txt: this.$t("Wallet_Detail.refresh_txt"),
      refresh_timer: [],
      activeStep: 1,
      hasDeposit: false,
      hasWithdraw: false,
      alipay_on: false,
      bankcard_on: false,
      isWithdrawDialog: false,
      depositItem: null,
      withdraws: [],
      isOpenAlipay: false,
      isOpenWechat: false,
      isOpenBank: false,
      deposit_alipay_on: false,
      deposit_wechat_pay_on: false,
      deposit_bankcard_on: false,
      isShowCancelDepositDialog: false,
      isShowSucceedWithdrawDialog: false,
      succeedWithdrawItem: "",
      withdrawPassword: "",
      timer: null,
      isCanPay: false,
      isPayTipDialog: false,
      isBoundAdDialog: false,
      pay_error: "",
      isPayTipSure: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);

    Promise.all([
      agent.agent_mine_transfer("DEPOSIT", "QUERY_PENDING", 0, 5),
      wallet.balance()
    ])
      .then(values => {
        let deposits = values[0];
        // let withdraws_result = values[1];  agent.agent_mine_transfer('WITHDRAW','QUERY_PENDING',0,5),
        let balance_result = values[1];
        let hasDeposit = false;
        let hasWithdraw = false;
        let depositItem = null;
        let withdraws = [];

        let balances = [];
        let balance = "0";
        let locked = "0";

        if (deposits.code === 0 && deposits.data.total > 0) {
          hasDeposit = true;
          depositItem = deposits.data.list[0];
          depositItem.isOpen = false;
        }
        // if(withdraws_result.code === 0 && withdraws_result.data.total > 0){
        //     hasWithdraw = true;
        //     for(let i=0;i<withdraws_result.data.list.length;i++){
        //        withdraws_result.data.list[i].isOpen= false;
        //     }
        //     withdraws = withdraws_result.data.list;
        // }

        if (balance_result.code === 0) {
          if (balance_result.data.hasOwnProperty("list")) {
            balances = balance_result.data.list;
            if (balance_result.data.hasOwnProperty("list")) {
              for (let i = 0; i < balances.length; i++) {
                if (balances[i].currency == "FFC") {
                  balance = balances[i].available;
                  locked = balances[i].locked;
                }
              }
            }
          }
        }
        next(vm => {
          vm.hasDeposit = hasDeposit;
          //  vm.hasWithdraw = hasWithdraw;
          vm.balance = balance;
          vm.locked = locked;
          vm.depositItem = depositItem;
          //  vm.withdraws = withdraws;
          // console.log("depositItem ="+depositItem)
          if (depositItem != null) {
            vm.deposit_alipay_on = depositItem.alipay_on;
            vm.deposit_wechat_pay_on = depositItem.wechat_pay_on;
            vm.deposit_bankcard_on = depositItem.bankcard_on;
            if (vm.depositItem.alipay_on) {
              vm.depositItem.alipay_payment_code_url =
                vm.depositItem.alipay.payment_code_url;
              if (
                vm.depositItem.alipay_payment_code_url.indexOf("qrcode") == 0
              ) {
                vm.depositItem.alipay_payment_code_url_value = vm.depositItem.alipay_payment_code_url.substr(
                  6,
                  vm.depositItem.alipay_payment_code_url.length
                );
                vm.depositItem.isAlipayQrcode = true;
              } else {
                vm.depositItem.alipay_payment_code_url_value =
                  vm.depositItem.alipay_payment_code_url;
                vm.depositItem.isAlipayQrcode = false;
              }
              if (
                vm.depositItem.alipay_payment_code_url_value.indexOf("http") ==
                  0 ||
                vm.depositItem.alipay_payment_code_url_value.indexOf("HTTP") ==
                  0
              ) {
              } else {
                vm.depositItem.alipay_payment_code_url_value =
                  "http:" + vm.depositItem.alipay_payment_code_url_value;
              }
            }
            if (vm.depositItem.wechat_pay_on) {
              vm.depositItem.wechat_payment_code_url =
                vm.depositItem.wechat_pay.payment_code_url;
              if (
                vm.depositItem.wechat_payment_code_url.indexOf("qrcode") == 0
              ) {
                vm.depositItem.wechat_payment_code_url_value = vm.depositItem.wechat_payment_code_url.substr(
                  6,
                  vm.depositItem.wechat_payment_code_url.length
                );
                vm.depositItem.isWechatQrcode = true;
              } else {
                vm.depositItem.wechat_payment_code_url_value =
                  vm.depositItem.wechat_payment_code_url;
                vm.depositItem.isWechatQrcode = false;
              }
              if (
                vm.depositItem.wechat_payment_code_url_value.indexOf("http") ==
                  0 ||
                vm.depositItem.wechat_payment_code_url_value.indexOf("HTTP") ==
                  0
              ) {
              } else {
                vm.depositItem.wechat_payment_code_url_value =
                  "http:" + vm.depositItem.wechat_payment_code_url_value;
              }
            }
          }
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
      if (time == undefined || time == "") return "";
      let date = new Date(parseInt(time));
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
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
    },
    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    },
    getFrontDisId(dispId) {
      if (undefined == dispId) return "";
      if (dispId.length > 4) return dispId.substring(0, 4).toUpperCase();
    },
    getLastDisId(dispId) {
      if (undefined == dispId) return "";
      if (dispId.length == 8) return dispId.substring(4, 8).toUpperCase();
    },
    isShowPhoneNumber(item) {
      if (item == undefined || item == "") return "";
      if (item.created == undefined || item.created == "") return "";
      let date = new Date(parseInt(item.created));
      var miniTime = new Date().getTime() - date.getTime();
      if (miniTime >= 10 * 60 * 1000) {
        return item.agent_mobile;
      } else {
        var date_t = new Date(date.getTime() + 10 * 60 * 1000);
        let n_date = new Date(date_t);
        return formatDate(n_date, "hh:mm") + " 后可以联系商家。";
      }
    }
  },
  created: function() {
    if (window.plus == undefined) {
      this.isCanPay = false;
    } else {
      if (this.isAndroid_ios()) this.isCanPay = true;
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    tabChange(tab) {
      this.tab = tab;
      if (tab == "tab1") {
        this.agent_mine_transfer("DEPOSIT", "QUERY_PENDING", 0, 10);
      }

      if (tab == "tab2") {
        this.agent_mine_transfer("WITHDRAW", "QUERY_PENDING", 0, 10);
      }
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
      this.isWithdrawTipDialog = false;
      this.isDeposit = false;
      this.isShowCancelDepositDialog = false;
      this.isWithdrawDialog = false;
      this.isShowSucceedWithdrawDialog = false;
      this.withdrawPassword = "";
      this.isPayTipDialog = false;
      this.isBoundAdDialog = false;
      this.isPayTipSure = false;
    },
    pay_bound() {
      this.isBoundAdDialog = false;
      this.$router.push("/pay");
    },
    showSucceedWithdrawDialog(item) {
      this.succeedWithdrawItem = item;
      this.isShowSucceedWithdrawDialog = true;
      this.isPayTipSure = false;
    },
    showCancelDepositDialog() {
      this.isShowCancelDepositDialog = true;
    },
    showDepositDialog() {
      if (!isNaN(parseInt(this.deposit))) {
        if (lib.toFixed(parseFloat(this.deposit), 2) <= 0) {
          this.showToast("请输入正确的人民币");
          return;
        }
      } else {
        this.showToast("请输入正确的人民币");
        return;
      }
      if (parseInt(this.deposit) < 500 || parseInt(this.deposit) > 50000) {
        this.showToast("购买金额范围 500 ~ 50000 CNY");
        return;
      }
      if (!/^\d+$/.test(this.deposit)) {
        this.showToast("请输入整数金额。");
        return;
      }
      this.isDeposit = true;
    },
    succeedWithdraw() {
      if (this.withdrawPassword.length < 6) {
        this.showToast("请输入交易密码");
        return;
      }
      if (!this.isPayTipSure) {
        this.showToast("请勾选，我已经查实收到商家转账了。");
        return;
      }
      this.isShowSucceedWithdrawDialog = false;
      this.isPayTipSure = false;
      agent
        .agent_succeed_withdraw(
          this.succeedWithdrawItem.id,
          this.withdrawPassword
        )
        .then(data => {
          this.isTrading = false;
          this.withdrawPassword = "";
          this.showToast("成功");
          this.hasWithdraw = true;
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.getBalance();
            this.agent_mine_transfer("WITHDRAW", "QUERY_PENDING", 0, 5);
          }, 1000);
        })
        .catch(e => {
          this.withdrawPassword = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    withdrawDialog() {
      if (!isNaN(parseInt(this.withdraw))) {
        if (parseInt(this.withdraw) < 10) {
          this.showToast("输入出售金额范围 10 ~ 50000 CNY，需为整数");
          return;
        }
        if (lib.toFixed(parseFloat(this.withdraw), 2) <= 0) {
          this.showToast("请输入正确的提现人民币");
          return;
        }
      } else {
        this.showToast("请输入正确的提现人民币");
        return;
      }
      if (!/^\d+$/.test(this.withdraw)) {
        this.showToast("请输入整数金额。");
        return;
      }
      this.isWithdrawDialog = true;
    },
    agent_withdraw() {
      this.isWithdrawDialog = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_withdraw(this.withdraw)
        .then(data => {
          this.isTrading = false;
          this.showToast("出售已提交");
          this.hasWithdraw = true;
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.getBalance();
            this.agent_mine_transfer("WITHDRAW", "QUERY_PENDING", 0, 5);
          }, 1000);
        })
        .catch(e => {
          this.isTrading = false;
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
    },
    cancel_Deposit() {
      this.isShowCancelDepositDialog = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_cancel_deposit(this.depositItem.id)
        .then(data => {
          this.isTrading = false;
          this.showToast("取消成功");
          this.hasDeposit = false;
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.getBalance();
          }, 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    go_play() {
      if (window.plus == undefined) return;
      this.isPayTipDialog = true;
    },
    go_aliplay() {
      this.isPayTipDialog = false;
      this.showToast("正在启动支付宝，请稍后...");
      pluginShowArrayArgu();
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    openPay(typePay) {
      if (typePay == "openAlipay") {
        this.isOpenAlipay = !this.isOpenAlipay;
        this.isOpenWechat = false;
        this.isOpenBank = false;
        pluginShow(this.depositItem.alipay.payment_code_url);
      } else if (typePay == "openWechat") {
        this.isOpenWechat = !this.isOpenWechat;
        this.isOpenAlipay = false;
        this.isOpenBank = false;
      } else if (typePay == "openBank") {
        this.isOpenBank = !this.isOpenBank;
        this.isOpenWechat = false;
        this.isOpenAlipay = false;
      }
    },
    getHumanDate: function(timestamp) {
      return moment(timestamp).format("YYYY/MM/DD HH:mm");
    },
    go_deposit: function() {
      this.isDeposit = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_deposit(this.deposit)
        .then(data => {
          this.isTrading = false;
          this.deposit = "";
          this.showToast("下单成功");
          this.hasDeposit = true;
          // setInterval(function(){this.getBalance()},1000)
          // setInterval(this.agent_mine_transfer('DEPOSIT','QUERY_PENDING',0,5),5000);
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.getBalance();
            this.agent_mine_transfer("DEPOSIT", "QUERY_PENDING", 0, 5);
          }, 1000);
        })
        .catch(e => {
          this.deposit = "";
          this.isTrading = false;
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
    },
    showDetail(item) {
      item.isOpen = !item.isOpen;
    },
    getBalance() {
      wallet
        .balance()
        .then(value => {
          let balance_result = value;
          if (balance_result.code === 0) {
            if (balance_result.data.hasOwnProperty("list")) {
              let balances = balance_result.data.list;
              if (balance_result.data.hasOwnProperty("list")) {
                for (let i = 0; i < balances.length; i++) {
                  if (balances[i].currency == "FFC") {
                    this.balance = balances[i].available;
                    this.locked = balances[i].locked;
                  }
                }
              }
            }
          }
        })
        .catch(e => {});
    },
    agent_mine_transfer: function(type, status, offset, limit) {
      agent
        .agent_mine_transfer(type, status, offset, limit)
        .then(data => {
          this.withdraws = [];
          if (data.code === 0 && data.data.total > 0) {
            if ("DEPOSIT" == type) {
              this.hasDeposit = true;
              this.depositItem = data.data.list[0];
              this.depositItem.isOpen = false;
              this.deposit_alipay_on = this.depositItem.alipay_on;
              this.deposit_wechat_pay_on = this.depositItem.wechat_pay_on;
              this.deposit_bankcard_on = this.depositItem.bankcard_on;
              if (this.depositItem.alipay_on) {
                this.depositItem.alipay_payment_code_url = this.depositItem.alipay.payment_code_url;
                if (
                  this.depositItem.alipay_payment_code_url.indexOf("qrcode") ==
                  0
                ) {
                  this.depositItem.alipay_payment_code_url_value = this.depositItem.alipay_payment_code_url.substr(
                    6,
                    this.depositItem.alipay_payment_code_url.length
                  );
                  this.depositItem.isAlipayQrcode = true;
                } else {
                  this.depositItem.alipay_payment_code_url_value = this.depositItem.alipay_payment_code_url;
                  this.depositItem.isAlipayQrcode = false;
                }
              }
              if (this.depositItem.wechat_pay_on) {
                this.depositItem.wechat_payment_code_url = this.depositItem.wechat_pay.payment_code_url;
                if (
                  this.depositItem.wechat_payment_code_url.indexOf("qrcode") ==
                  0
                ) {
                  this.depositItem.wechat_payment_code_url_value = this.depositItem.wechat_payment_code_url.substr(
                    6,
                    this.depositItem.wechat_payment_code_url.length
                  );
                  this.depositItem.isWechatQrcode = true;
                } else {
                  this.depositItem.wechat_payment_code_url_value = this.depositItem.wechat_payment_code_url;
                  this.depositItem.isWechatQrcode = false;
                }
              }
            } else {
              this.hasWithdraw = true;
              for (let i = 0; i < data.data.list.length; i++) {
                data.data.list[i].isOpen = true;
              }
              this.withdraws = data.data.list;
            }
          } else {
            this.hasWithdraw = false;
            this.hasDeposit = false;
            this.withdraws = [];
          }
        })
        .catch(e => {});
    },

    // agent.agent_mine_transfer = function(type,status,offset,limit)
    // uesraddress_focus: function(){
    //   this.isError = false
    //   this.uesraddress_error_notice =''
    // },
    input_focus: function(selected) {
      if (selected === "osc") {
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
    withDrawTip() {
      this.isWithdrawTipDialog = true;
    },
    bills() {
      this.$router.push("/bills_ffc");
    }

    // get_code: function () {
    //   if( this.refresh_txt!= this.$t('Wallet_Detail.refresh_txt')){
    //        this.showToast(this.refresh_txt+" "+this.$t('SignIn.sendCodeTip'));
    //       return ;
    //     }
    //     if (this.is_sending_code) {
    //       return false
    //     }
    //     wallet.getWithdrawCode().then(result => {
    //       this.time_refresh();
    //     }).catch(e => {
    //     this.code_error = HttpResultCode.validate(e.code)
    //   })

    //   },
    // time_refresh() {
    //   for (let i = 0; i <= 120; i++) {
    //     this.refresh_timer.push(window.setTimeout(() => {
    //       if (i <=119) {
    //          let count = 120-i;
    //          this.refresh_txt = count+" S"
    //       } else {
    //         this.refresh_txt = this.$t('Wallet_Detail.refresh_txt')//this.$t('SignUp.SendCode')
    //         this.clear_refresh();
    //       }
    //     }, i * 1000))
    //   }
    // },
    // clear_refresh() {
    //   for(let i = 0; i < this.refresh_timer.length; i++){
    //     clearTimeout(this.refresh_timer[i])
    //   }
    //   this.refresh_timer = []
    //   this.refresh_txt =  this.$t('Wallet_Detail.refresh_txt')//this.$t('SignUp.SendCode')
    // }
  }
  //   beforeDestroy: function () {
  //   for(let i = 0; i < this.refresh_timer.length; i++){
  //     clearTimeout(this.refresh_timer[i])
  //   }
  // }
};
</script>

<style  lang="scss"  scoped>
@import "../assets/css/wallet_detail_ffc.scss";
</style>
