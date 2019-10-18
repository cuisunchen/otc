<template>
  <div class="content">
    <div class="top">
      <div class="center">{{$t('Trade.Buy.Title')}}  {{crypto_currency|titleDeal}}</div>
      <div class="left" @click="goBack"></div>
    </div>
    <!-- content -->
    <div class="buy-order-item-tip">
      <p v-html="$t('Order.OrderBuyTip')">
       
      </p>
    </div>
     <div class="buy-order-item-title">
      <p >{{$t('Order.OrderBuy')}}&nbsp;<span>{{title_content}}</span></p>
    </div>
    <div class="buy-order-item-info">
     <div class="buy-order-item-info-content">
          <div class="buy-order-item-info-content-head" >{{trade.is_buy?trade.seller_name :trade.buyer_name | namechange}}</div>
          <div v-show="trade.is_online" class="buy-order-item-info-content-online"  ></div>
           <div class="buy-order-item-info-content-center" >
              <h4>
                {{trade.is_buy?trade.seller_name :trade.buyer_name }}
              </h4>
              <!-- <p>{{$t('Trade.Table.credit_ratio')}}<span class="left_space">{{trade.seller_credit_ratio}}%&nbsp;||&nbsp; {{$t('Trade.Table.positive_count')}}&nbsp;&nbsp;{{trade.seller_positive_count}} </span>
              </p> -->
            <p v-show="trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.seller_created | getformatDate}} </span></p>
            <p v-show="!trade.is_buy">{{$t('Text.zcsj')}}<span class="left_space">&nbsp;{{trade.buyer_created | getformatDate}} </span></p>
          </div>
      </div>
      <div  class="buy-order-item-title" style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding-top:0.4em;" >
      <p >{{$t('Text.ljcj')}}&nbsp;<span>{{trade.seller_trade_total_usdt + " "}}{{crypto_currency | pricechange1}}</span></p>
    </div>
    <!-- <div class="buy-order-item-title" style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding-top:0.4em;" v-show="!(trade.hasOwnProperty('seller_mobile'))">
      <p >{{$t('Order.SellerMobile')}}&nbsp;<span>{{$t('Order.SellerMobilePayTip')}}</span></p>
    </div> -->
    </div>
    
    <div class="buy-order-item-info">
      <div class="buy-order-item-info-content-order">
        <p><span v-html="$t('Order.OrderId1')" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"
              v-clipboard:error="error"></span><span class="left-span blue-span" v-clipboard:copy="disp_last_id"
              v-clipboard:success="success"
              v-clipboard:error="error"><span style="color:#ccc;" >{{trade.disp_id|getFrontDisId}}</span>{{trade.disp_id|getLastDisId}}</span>&nbsp;</p>
        <p>{{$t('Order.OrderAmount1')}}<span class="left-span red-span">{{trade.amount}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradePrice')" ></span><span class="left-span  red-span">{{trade.price}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p><span v-html="$t('Order.TradeQty')" ></span><span class="left-span">{{trade.qty}}&nbsp;<span >{{crypto_currency | pricechange2}}</span></span></p>
        <p  v-show="trade.status !== 'RELEASED'" ><span v-html="$t('Order.TradeFee')"></span><span class="left-span">{{trade.buyer_fee}}&nbsp;<span >{{crypto_currency | pricechange1}}</span></span></p>
        <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{trade.created | getformatDate}}</span></p>
        
     </div>
    </div>
    <!-- <p class="title_pay">{{$t('Order.payMeth')}}</p> -->
      <p class="title_pay">{{$t('Text.mfsbdz')}}</p>
    
          <!-- <div class="share_btn_zone">
           <div v-show="alipay_on" class="share_btn" @click="open('alipay')">
              <i class="alipay-ico"></i>
              <span>{{$t('Trade.alipay')}}</span>
              <i class="go"></i>
            </div>
          </div>
            <div v-show="alipay_pay" class="pay-detail-zone" >
              <div>
              <p class="pay-detail-zone-p" v-clipboard:copy="alipay_on?trade.alipay.name:''"
              v-clipboard:success="success"
              v-clipboard:error="error">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span v-clipboard:copy="alipay_on?trade.alipay.name:''"
              v-clipboard:success="success"
              v-clipboard:error="error">{{alipay_on?trade.alipay.name:''}}</span></p>
              <p class="pay-detail-zone-p"  v-clipboard:copy="alipay_on?trade.alipay.account:''"
              v-clipboard:success="success"
              v-clipboard:error="error" >{{$t('Order.alipayNumber')}}<span  v-clipboard:copy="alipay_on?trade.alipay.account:''"
              v-clipboard:success="success"
              v-clipboard:error="error">{{alipay_on?trade.alipay.account:''}}</span></p>
              <p class="pay-detail-zone-p" @click="go_play()" v-show="isCanPay&&(trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PB_DISPUTED'||trade.status=='PS_DISPUTED')" ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD')}}</span>  </p>
              </div>
              <img style="width:80%"  :src="alipay_on?alipay_payment_code_url_value:''" @click="go_play()" v-show="alipay_payment_code_url !=''&&!isAlipayQrcode"/>
             <div  @click="go_play()">
              <qrcode style="width:80%"   :value="this.alipay_payment_code_url_value" :options="{ size: 120 }"  v-show="alipay_payment_code_url !=''&&isAlipayQrcode"></qrcode>  
             </div>
            </div>
            <div class="share_btn_zone">
            <div v-show="wechat_pay_on" class="share_btn bottom_border" @click="open('wechat')">
              <i class="wx-ico"></i>
              <span>{{$t('Trade.wechat')}}</span>
              <i class="go"></i>
            </div>
            </div>
            <div v-show="wechat_pay" class="pay-detail-zone" >
              <div>
              <p class="pay-detail-zone-p"  v-clipboard:copy="wechat_pay_on?trade.wechat_pay.name:''"
              v-clipboard:success="success"
              v-clipboard:error="error" >{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span  v-clipboard:copy="wechat_pay_on?trade.wechat_pay.name:''"
              v-clipboard:success="success"
              v-clipboard:error="error" >{{wechat_pay_on?trade.wechat_pay.name:''}}</span></p>
              <p class="pay-detail-zone-p"  v-clipboard:copy="wechat_pay_on?trade.wechat_pay.account:''"
              v-clipboard:success="success"
              v-clipboard:error="error" >{{$t('Order.wechatNumber')}}<span  v-clipboard:copy="wechat_pay_on?trade.wechat_pay.account:''"
              v-clipboard:success="success"
              v-clipboard:error="error" >{{wechat_pay_on?trade.wechat_pay.account:''}}</span></p>
              <p class="pay-detail-zone-p" v-show="(trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PB_DISPUTED'||trade.status=='PS_DISPUTED')" ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD_WX')}}</span>  </p>
              </div>
              <img style="width:80%"  :src="wechat_pay_on?wechat_payment_code_url_value:''"  v-show="wechat_payment_code_url !=''&&!isWechatQrcode"/>
              <qrcode style="width:80%"   :value="this.wechat_payment_code_url_value" :options="{ size: 120 }"  v-show="wechat_payment_code_url !=''&&isWechatQrcode"></qrcode>  
            </div>
          <div class="share_btn_zone">
            <div v-show="bankcard_on" class="share_btn bottom_border" @click="open('bank')">
              <i class="bank-ico"></i>
              <span>{{$t('Trade.bank')}}</span>
              <i class="go"></i>
            </div>
        </div>
         <div v-show="bank_pay" class="pay-detail-zone" >
              <div>
               <p class="pay-detail-zone-p">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span v-clipboard:copy="bankcard_on?trade.bank_card.name:''"
              v-clipboard:success="success"
              v-clipboard:error="error">{{bankcard_on?trade.bank_card.name:''}}</span></p> 
               <p class="pay-detail-zone-p" >{{$t('Order.bankCard')}}<span v-clipboard:copy="bankcard_on?trade.bank_card.card_number:''"
              v-clipboard:success="success">{{bankcard_on?trade.bank_card.card_number:''}}</span></p>
               <p class="pay-detail-zone-p" >{{$t('Order.bankName')}}<span v-clipboard:copy="bankcard_on?trade.bank_card.bank_code:''"
              v-clipboard:success="success">{{bankcard_on?$t('Bank.'+trade.bank_card.bank_code):''}}</span></p>
               <p class="pay-detail-zone-p" >{{$t('Order.bankBranch')}}<span v-clipboard:copy="bankcard_on?trade.bank_card.branch_name:''"
              v-clipboard:success="success">{{bankcard_on?trade.bank_card.branch_name:''}}</span></p>
              </div>
     </div> -->
     <div  class="share_btn_zone" >
            <div class="share_btn bottom_border">
              <!-- <i class="bank-ico"></i> -->
              <span v-clipboard:copy="buyer_addresses[0]"
              v-clipboard:success="success"
              v-clipboard:error="error">{{buyer_addresses[0]}}</span>
              <!-- <i class="go"></i> -->
            </div>
     </div>
        <qrcode  :value="buyer_addresses[0]" :options="{ size: 120 }" v-show="buyer_addresses[0]!=''" style="margin-top:0.5em;"></qrcode>

        <p class="title_pay"  v-show="isDispute">{{$t('Text.disputeBtn')}}</p>

     <div class="login-pay" v-show="isDispute">
      
          <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF" >{{seller_content}}</div>
         
          <div  style="padding:0px;border-top:1px solid #eee;border-bottom:1px solid #eee;padding:0.5em  0.5em;background:#FFFFFF">{{$t('Text.sssj')+":"}}{{seller_updated|getformatDate}}</div>
         
          <div class="pay-qr-zone" >                                    
            <div style="position:relative;" >
            <img  @click="open_Alipay(alipay_payment_code_url_value)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:0px;" :src="alipay_payment_code_url_value" v-show="alipay_payment_code_url_value!=''"> 
            <img  @click="open_Alipay(alipay_payment_code_url_value1)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:33%;" :src="alipay_payment_code_url_value1" v-show="alipay_payment_code_url_value1!=''"> 
            <img  @click="open_Alipay(alipay_payment_code_url_value2)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:66%;" :src="alipay_payment_code_url_value2" v-show="alipay_payment_code_url_value2!=''"> 
            
            </div>
           </div>
            <div style="border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#eee" v-show="buyer_comment!=null&&buyer_comment!==''">{{$t('Text.mjly')}}</div>
             <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="buyer_comment!=null&&buyer_comment!==''" >{{buyer_comment}}</div>
            <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="buyer_updated!=null&&buyer_updated!==''" >{{buyer_updated|getformatDate}}</div>
 
        <div style="border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#eee" v-show="ob_comment!=null&&ob_comment!==''">{{$t('Text.zcyj')}}</div>
             <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="ob_comment!=null&&ob_comment!==''" >{{ob_comment}}</div>
            <div style="padding:0px;border-top:1px solid #eee;border-bottom:0px;padding:0.5em  0.5em;background:#FFFFFF;color:#333333" v-show="ob_updated!=null&&ob_updated!==''" >{{ob_updated|getformatDate}}</div>
      </div>


      <div class="hint-bottom-zone">
      <p class="hint-titile"><mu-icon class="hint_ico" value="report_problem" color="#f25c49" :size="1.5"/>{{$t('Order.tradeTip')}}</p>
       <p v-html="$t('Order.OrderTip1')">
        
       </p>
       <p class="hint-titile"><mu-icon class="hint_ico" value="report_problem" color="#f25c49" :size="1.5"/>{{$t('Order.tradeIssue')}}</p>
       <p  v-html="$t('Order.OrderTip2')">
       </p>
    </div>

    <div class="sell-order-item-bottom" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'">
     <button  @click="releaseShowDialog" class="sell-order-item-bottom-main" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'" >{{$t('Order.realse')}}</button>
     <button  @click="disputedShowDialog" v-show="trade.status=='PAID'||trade.status=='TAKEN'" :class="{orange_red:isDealTime,c1:!isDealTime}">{{$t('Order.complaint')}}</button>
     <button  @click="disputedTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&!isDispute" >{{$t('Order.complainting')}}</button>
       <button  @click="disputedFkTipShowDialog" class="sell-order-item-bottom-disputed" v-show="(trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED')&&isDispute" >{{$t('Text.ssfk')}}</button>
    </div>

  <!-- <div class="buy-order-item-bottom" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'">
     <button  @click="paidShowDialog" class="buy-order-item-bottom-main" v-show="trade.status=='TAKEN'" >{{$t('Order.PaidTitle')}}</button>
     <button  @click="cancelOrderShowDialog"  class="buy-order-item-bottom-cancel" v-show="trade.status=='TAKEN'||trade.status=='PAID'||trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'"  >{{$t('Order.orderCancel')}}</button> 
     <button  @click="disputedShowDialog" v-show="trade.status=='PAID'" :class="{main:isDealTime,c1:!isDealTime}">{{$t('Order.complaint')}}</button>
     <button  @click="disputedTipShowDialog" class="buy-order-item-bottom-disputed" v-show="trade.status=='PS_DISPUTED'||trade.status=='PB_DISPUTED'" >{{$t('Order.complainting')}}</button>
  </div> -->
 <!--end-->
  <!-- <mu-dialog :open="isCancelOrderDialog" :title="$t('Order.WarmPrompt')" > 
       <div v-html="$t('Order.OrderTip3')"></div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="cancelOrder" :label="$t('Order.orderCancel')"/>
  </mu-dialog>
  <mu-dialog :open="isPaidDialog" :title="$t('Order.WarmPrompt')" >
        <div v-html="$t('Order.PaidContent')"></div>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="paid" :label="$t('Order.PaidTitle')"/>
  </mu-dialog>

  <mu-dialog :open="isDisputedTipDialog" :title="$t('Order.WarmPrompt')" >
      {{$t('Order.AppealHint')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>

  <mu-dialog :open="isDisputedDialog" :title="$t('Order.WarmPrompt')" >
      {{$t('Order.AppealHint')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')"/> 
  </mu-dialog>

    <mu-dialog :open="isPayTipDialog" :title="$t('Order.WECHAT_PAY_TYPE_TIP')" >
     
      <p   style='width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040'>{{$t('Order.WECHAT_PAY_TYPE')}} </p>
 <p   style='width: 100%;text-align: left;margin: 0 0 ;font-size: 0.7em;color:#404040'>请立刻转账后，点击标记已付款<span style='color:#ff4d2d'> {{title_content}} </span></p>
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="go_aliplay"  :label="$t('Order.goPay')"/> 
  </mu-dialog> -->
  <mu-dialog :open="isDisputedTipDialog" :title="$t('Order.WarmPrompt')" >
      {{$t('Order.AppealHint')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
         <!-- <mu-flat-button slot="actions" primary @click="goDisputed" :label="$t('Text.disputeBtn')"/> -->
  </mu-dialog>
   <mu-dialog :open="isReleaseDialog" :title="$t('Order.WarmPrompt')" > 
      <mu-checkbox label="我已经查实收到转账了" v-model="isPayed"/> 
      <div v-html="$t('Order.realseTip')"></div>        
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
      <mu-flat-button slot="actions" primary @click="releaseDialog" :label="$t('User.SetMenuAssertPwd')"/>
  </mu-dialog>

    <mu-dialog :open="isPasswordDialog" :title="$t('User.SetMenuAssertPwd')" @click="closeDialog">
      <div >
        <mu-text-field  v-model="passwordValue"  :label="$t('User.SetMenuAssertPwd')" class="input-zone" :hintText="$t('Wallet_Detail.pwd_validate_tip')"
         type="password"  fullWidth :errorText="pwd_error" />
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
          <mu-flat-button slot="actions" primary @click="release" :label="$t('Order.realse')"/>
        </div>
      </div>
    </mu-dialog>
    <mu-dialog :open="isDisputedFkTipDialog" :title="$t('Text.ssfk')" @click="closeDialog">
      <div >
        <mu-text-field  v-model="fkyj"  :label="$t('Text.ssfk')" class="input-zone" :hintText="$t('Text.ssfkhint')"
      type="text"  fullWidth :errorText="pwd_error" />
        <div style="text-align:right">
          <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
          <mu-flat-button slot="actions" primary @click="feadback" :label="$t('Text.tjss')"/>
        </div>
      </div>
    </mu-dialog> 
    <mu-dialog :open="isDisputedDialog" :title="$t('Order.WarmPrompt')" > 
      {{$t('Order.AppealHint')}}
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="disputed" :label="$t('Order.complaint')"/>
  </mu-dialog>
  <mu-dialog :open="dialogAlipay" :title="$t('Text.dispute')" @close="closeDialog">
     <img style="width:100%" :src="alipay_payment_code_url_value_current" > 

    <mu-flat-button slot="actions" primary @click="closeDialog" :label="$t('Text.sure')"/>
  </mu-dialog>
  <mu-toast v-if="toast" :message="message" @close="hideToast"/>
</div>
</template>
<script>
import nprogress from "nprogress";
import order from "../models/order";
import lib from "../utils/lib";
import HttpResultCode from "../utils/HttpResultCode";
import { formatDate } from "../common/js/data";
import moment from "../utils/moment";
import Clipboard from "clipboard";
export default {
  name: "order_buy",
  components: {},
  data() {
    return {
      id: this.$route.params.id,
      crypto_currency: this.$route.params.symbol.toUpperCase(),
      title_content: "",
      trade: {},
      alipay_on: false,
      wechat_pay_on: false,
      bankcard_on: false,
      isDealTime: false,
      // isCancelOrderDialog: false, //订单取消
      // isPaidDialog: false,
      // isDisputedTipDialog: false,
      // isDisputedDialog: false,
        isReleaseDialog: false,
      isPasswordDialog: false,
      isDisputedTipDialog: false,
      isDisputedDialog: false,
      trade_t: null,
      toast: false,
      message: "",
      alipay_pay: "",
      wechat_pay: "",
      bank_pay: "",
      disp_last_id: "",
      isCanPay: false,
      isPayTipDialog: false,
      isAlipayQrcode: false,
      isWechatQrcode: false,
      wechat_payment_code_url: "",
      wechat_payment_code_url_value: "",
      alipay_payment_code_url: "",
      buyer_addresses:[""],
      pwd_error:'',
      passwordValue:'',
      disputeJSON:null,
      alipay_payment_code_url_value:"", 
      alipay_payment_code_url_value1:"", 
      alipay_payment_code_url_value2:"", 
      alipay_payment_code_url_value_current:"",
      dialogAlipay:false,
      isDisputedFkTipDialog:false,
      buyer_comment:"",
      buyer_updated:"",
      ob_comment:"",
      ob_updated:"",
      seller_content:"",
      seller_updated:"",
      isDispute:false,
      isPayed: false,
        fkyj:"",
      seller_updated:"",
    
      alipay_payment_code_url_value: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化

    let id = to.params.id;
    let crypto_currency = to.params.symbol.toLowerCase();
     let params = {
            "symbol":crypto_currency,
	          "tid":id
          }

    order
      .USER_otc_get_trade(params)
      .then(result => {
        let trade = {};
        let buyer_addresses = []
        let dispute = {}
        if (result.code === 0) {
          trade = result.data.trade;
          buyer_addresses = result.data.buyer_addresses;
          dispute = result.data.dispute;
        }
        if(buyer_addresses==null||buyer_addresses.length==0){
          buyer_addresses = [""]
        }
        next(vm => {
          vm.trade = trade;
           vm.disputeJSON = dispute;
          vm.buyer_addresses = buyer_addresses;
          if (vm.trade.disp_id.length == 8)
            vm.disp_last_id = vm.trade.disp_id.substring(4, 8).toUpperCase();
          if(dispute!=null){
               vm.isDispute = true
              vm.buyer_comment = dispute.buyer_comment
              vm.buyer_updated = dispute.buyer_updated
              vm.ob_comment = dispute.ob_comment
              vm.ob_updated = dispute.ob_updated
              vm.seller_content = dispute.seller_content
              vm.seller_updated = dispute.seller_updated
              vm.alipay_payment_code_url_value = dispute.pic1
              vm.alipay_payment_code_url_value1 = dispute.pic2
              vm.alipay_payment_code_url_value2 = dispute.pic3
           }




          if (vm.trade.status == "TAKEN" || vm.trade.status == "PENDING") {
               vm.update_date();
          } else {
            if (vm.trade.status == "PAID") {
              if (vm.trade.deadline > new Date().getTime()) {
                vm.isDealTime = false;
              } else {
                vm.isDealTime = true;
              }
            }
            if (
              vm.trade.status == "PS_DISPUTED" ||
              vm.trade.status == "PB_DISPUTED"
            ) {
              vm.title_content = vm.$t("Order.DISPUTED_HINT");
            } else {
              vm.title_content = vm.$t("Order." + vm.trade.status);
            }
          }

          // if (vm.trade.alipay_on) {
          //   vm.alipay_on = true;
          //   vm.alipay_payment_code_url = trade.alipay.payment_code_url;
          //   if (vm.alipay_payment_code_url.indexOf("qrcode") == 0) {
          //     vm.alipay_payment_code_url_value = vm.alipay_payment_code_url.substr(
          //       6,
          //       vm.alipay_payment_code_url.length
          //     );
          //     vm.isAlipayQrcode = true;
          //   } else {
          //     vm.alipay_payment_code_url_value = vm.alipay_payment_code_url;
          //     vm.isAlipayQrcode = false;
          //   }
          //   if (
          //     vm.alipay_payment_code_url_value.indexOf("http") == 0 ||
          //     vm.alipay_payment_code_url_value.indexOf("HTTP") == 0
          //   ) {
          //   } else {
          //     vm.alipay_payment_code_url_value =
          //       "http:" + vm.alipay_payment_code_url_value;
          //   }
          // }
          // if (vm.trade.wechat_pay_on) {
          //   vm.wechat_pay_on = true;
          //   vm.wechat_payment_code_url = trade.wechat_pay.payment_code_url;
          //   if (vm.wechat_payment_code_url.indexOf("qrcode") == 0) {
          //     vm.wechat_payment_code_url_value = vm.wechat_payment_code_url.substr(
          //       6,
          //       vm.wechat_payment_code_url.length
          //     );
          //     vm.isWechatQrcode = true;
          //   } else {
          //     vm.wechat_payment_code_url_value = vm.wechat_payment_code_url;
          //     vm.isWechatQrcode = false;
          //   }
          //   if (
          //     vm.wechat_payment_code_url_value.indexOf("http") == 0 ||
          //     vm.wechat_payment_code_url_value.indexOf("HTTP") == 0
          //   ) {
          //   } else {
          //     vm.wechat_payment_code_url_value =
          //       "http:" + vm.wechat_payment_code_url_value;
          //   }
          // }
          // if (vm.trade.bankcard_on) {
          //   vm.bankcard_on = true;
          // }

          if (
            vm.trade.status == "NOT_TAKEN" ||
            vm.trade.status == "BUYER_WON" ||
            vm.trade.status == "SELLER_WON" ||
            vm.trade.status == "TB_CANCELLED" ||
            vm.trade.status == "OVERTIME" ||
            vm.trade.status == "PB_CANCELLED" ||
            vm.trade.status == "RELEASED"
          ) {
          } else {
            vm.update_trade();
          }
        });
        nprogress.done();
      })
      .catch(e => {
        nprogress.done();
        // HttpResultCode.validate(e.code);
      });
  },
  filters: {
    getformatDate(time) {
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
    titleDeal(coinname){
       return coinname.replace('_', '/')
    },
    namechange(name) {
      if (undefined == name) return "";
      return name.substring(0, 1).toUpperCase();
    },
    getOrderStateType(status) {
      if (undefined == status) return "";
      return HttpResultCode.orderStatusType(status);
    },
    getFrontDisId(dispId) {
      if (undefined == dispId) return "";
      // if (dispId.length > 4) return dispId.substring(0, 4).toUpperCase();
      return dispId
    },
    getLastDisId(dispId) {
      if (undefined == dispId) return "";
      return "";
      // return dispId
      // if (dispId.length == 8) return dispId.substring(4, 8).toUpperCase();
    },
    pricechange1(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[1];
    },
    pricechange2(coin) {
      if (undefined == coin) return "";
      return coin.split("_")[0].toUpperCase();
    },
  },
  created: function() {
    // if (window.plus == undefined) {
    //   this.isCanPay = false;
    // } else {
    //   if (this.isAndroid_ios()) this.isCanPay = true;
    // }
  },
  methods: {
     open_Alipay(currentUrl) {
      if (currentUrl != "") {
        this.alipay_payment_code_url_value_current = currentUrl

           this.dialogAlipay = true;
      }
   
    },
    // ffc() {
    //   this.$router.push("/bills_ffc");
    // },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    open(pay) {
      if (pay == "alipay") {
        this.wechat_pay = false;
        this.bank_pay = false;

        // pluginShowArrayArgu();
        if (this.alipay_pay == true) {
          this.alipay_pay = false;
        } else {
          this.alipay_pay = true;
        }
        if (
          this.trade.status == "TAKEN" ||
          this.trade.status == "PAID" ||
          this.trade.status == "PB_DISPUTED" ||
          this.trade.status == "PS_DISPUTED"
        ) {
          // if (this.isAndroid_ios())
          //   pluginShow(this.trade.alipay.payment_code_url);
        }
      }
      if (pay == "wechat") {
        this.alipay_pay = false;
        this.bank_pay = false;
        if (this.wechat_pay == true) {
          this.wechat_pay = false;
        } else {
          this.wechat_pay = true;
        }
      }
      if (pay == "bank") {
        this.alipay_pay = false;
        this.wechat_pay = false;
        if (this.bank_pay == true) {
          this.bank_pay = false;
        } else {
          this.bank_pay = true;
        }
      }
    },
    tel() {
      if (this.isAndroid_ios()) {
        var Intent = plus.android.importClass("android.content.Intent");
        var Uri = plus.android.importClass("android.net.Uri");
        var main = plus.android.runtimeMainActivity();
        // 创建Intent
        var uri = Uri.parse("tel:" + this.trade.seller_mobile);
        var call = new Intent("android.intent.action.CALL", uri);
        main.startActivity(call);
      }
    },
    goDisputed(){
       this.isDisputedTipDialog = false
       this.$router.push({
          name: "dispute",
          params: {
            id: this.trade.id
          }
        });
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    showToast(message) {
      this.toast = true;
      this.message = message;
      this.toastTimer = setTimeout(() => {
        this.toast = false;
      }, 2000);
    },
    // closeDialog() {
    //   this.isCancelOrderDialog = false;
    //   this.isPaidDialog = false;
    //   this.isDisputedTipDialog = false;
    //   this.isDisputedDialog = false;
    //   this.isPayTipDialog = false;
    // },
    // cancelOrderShowDialog() {
    //   this.isCancelOrderDialog = true;
    // },
    // paidShowDialog() {
    //   this.isPaidDialog = true;
    // },
    // disputedTipShowDialog() {
    //   this.isDisputedTipDialog = true;
    // },
    // disputedShowDialog() {
    //   if (this.isDealTime) {
    //     this.isDisputedDialog = true;
    //   } else {
    //     let str = this.getformatDate1(this.trade.deadline);
    //     this.showToast(str + this.$t("Order.AppealTime"));
    //     this.initData();
    //   }
    // },
   closeDialog() {
      this.isReleaseDialog = false;
      this.isDisputedTipDialog = false;
      this.isDisputedDialog = false;
      this.isPasswordDialog = false;
      this.dialogAlipay = false;
      this.isDisputedFkTipDialog = false;
    },
    releaseShowDialog() {
      this.isReleaseDialog = true;
      this.isPayed = false;
    },
    releaseDialog() {
      if (!this.isPayed) {
        this.showToast("请确认我已收到款。");
        return;
      }
      this.passwordValue = "";
      this.isPasswordDialog = true;
      this.isReleaseDialog = false;
      this.isPayed = false;
    },
    disputedFkTipShowDialog(){
     this.isDisputedFkTipDialog = true;
    },
    disputedTipShowDialog() {
      this.isDisputedTipDialog = true;
    },
    disputedShowDialog() {
      if (this.isDealTime) {
        this.isDisputedDialog = true;
      } else {
        let str = this.getformatDate1(this.trade.deadline);
        this.showToast(str + " 后才能发起申诉");
        this.initData();
      }
    },
    go_play() {
      if (
        this.trade.status == "TAKEN" ||
        this.trade.status == "PAID" ||
        this.trade.status == "PB_DISPUTED" ||
        this.trade.status == "PS_DISPUTED"
      ) {
        if (window.plus == undefined) return;
        if (this.isAndroid_ios()) this.isPayTipDialog = true;
      } else if (this.trade.status == "OVERTIME") {
        this.showToast("订单已经超时取消！请重新下单。");
      } else {
        this.showToast("订单支付已过期。");
      }
    },
    go_aliplay() {
      this.isPayTipDialog = false;
      // this.showToast("正在启动支付宝，请稍后...")
      pluginShowArrayArgu();
    },
    getformatDate1(time) {
      let date = new Date(parseInt(time));
      return formatDate(date, "hh:mm");
    },
    goBack() {
      clearTimeout(this.date_t);
      this.$router.go(-1);
    },
    number_format(num) {
      return lib.toFixed(num, 3);
    },
    update_date: function() {
      let m = moment(this.trade.deadline);
      let letf_msecond = parseInt(m.unix() - m.current());
      if (letf_msecond > 0) {
        this.date = m.toDate(letf_msecond);
        if (this.trade.status == "PENDING") {
          this.title_content =
            this.$t("Order.PENDING") +
            "（" +
            this.$t("Order.LeftTime") +
            " " +
            this.date +
            "）";
        } else {
          this.title_content = this.$t("Order.LeftTime") + " " + this.date;
        }
        this.date_t = setTimeout(() => {
          this.update_date();
        }, 1000);
      } else {
        this.initData();
        //window.location.reload()
      }
    },
    update_trade: function() {
      this.trade_t = setInterval(() => {
        this.load_trade();
      }, 10000);
    },
    initData: function() {
      this.date_t = setTimeout(() => {
        this.load_trade();
      }, 1000);
    },
feadback(){
  this.isDisputedFkTipDialog = false
  
  let params = {
            "comment":this.fkyj,
	          "tid":this.trade.id
          }

    order.USER_OTC_dispute_buyer_comment(params)
        .then(result => {
             if(result.code==0){
  this.showToast( this.$t("Text.sscg")  );
             }else{
  this.showToast( result.message  );
             }
           
        })
        .catch(function() {
        
        });
},
     
    load_trade: function() {
         let params = {
            "symbol":this.trade.symbol.toLowerCase(),
	          "tid":this.trade.id
          }

    order
      .USER_otc_get_trade(params)
        .then(result => {
          let trade = result.data.trade;
            this.buyer_addresses = result.data.buyer_addresses;
          this.process_trade(trade);
           this.disputeJSON  =  result.data.dispute;
           if(this.disputeJSON!=null){
              this.isDispute = true
              this.buyer_comment = this.disputeJSON.buyer_comment
              this.buyer_updated = this.disputeJSON.buyer_updated
              this.ob_comment = this.disputeJSON.ob_comment
              this.ob_updated = this.disputeJSON.ob_updated
              this.seller_content = this.disputeJSON.seller_content
              this.seller_updated = this.disputeJSON.seller_updated
              this.alipay_payment_code_url_value = this.disputeJSON.pic1
              this.alipay_payment_code_url_value1 = this.disputeJSON.pic2
              this.alipay_payment_code_url_value2 = this.disputeJSON.pic3
           }
        })
        .catch(function() {
          // TODO 异常处理
        });
    },
    process_trade: function(trade) {
      // if (trade.alipay_on) {
      //   this.alipay_on = true;
      // }
      // if (trade.wechat_pay_on) {
      //   this.wechat_pay_on = true;
      // }
      // if (trade.bankcard_on) {
      //   this.bankcard_on = true;
      // }
      if (this.trade.status == "PENDING" || trade.status == "TAKEN") {
        clearTimeout(this.date_t);
        this.trade = trade;
        this.update_date();
      } else {
        this.trade = trade;
        clearTimeout(this.date_t);
        if (trade.status == "PAID") {
          if (trade.deadline > new Date().getTime()) {
            this.isDealTime = false;
          } else {
            this.isDealTime = true;
          }
        }
        if (
          trade.status == "PS_DISPUTED" ||
          trade.status == "PB_DISPUTED"
        ) {
          this.title_content = this.$t("Order.DISPUTED_HINT");
        } else {
          this.title_content = this.$t("Order." + trade.status);
        }
        if (
          this.trade.status == "NOT_TAKEN" ||
          this.trade.status == "BUYER_WON" ||
          this.trade.status == "SELLER_WON" ||
          this.trade.status == "TB_CANCELLED" ||
          this.trade.status == "OVERTIME" ||
          this.trade.status == "PB_CANCELLED" ||
          this.trade.status == "RELEASED"
        ) {
          //订单结束，去掉定时器
          clearInterval(this.trade_t);
        }
      }
    },
    // cancelOrder() {
    //   this.isCancelOrderDialog = false;
    //   order
    //     .cancel(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         // this.showToast('订单取消成功')
    //         this.initData();
    //       }
    //     })
    //     .then(() => {
    //       this.initData();
    //     });
    // },
    // paid() {
    //   this.isPaidDialog = false;
    //   order
    //     .paid(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         // this.showToast('标记已付款成功')
    //         this.initData();
    //       }
    //     })
    //     .then(() => {
    //       this.initData();
    //     });
    // },
    // disputed() {
    //   this.isDisputedDialog = false;
    //   order
    //     .dispute(this.trade.id, this.trade.crypto_currency)
    //     .then(result => {
    //       let code = parseInt(result.code);
    //       if (code === 0) {
    //         this.showToast(this.$t("Order.AppealHint"));
    //         this.initData();
    //       }
    //     })
    //     .then(e => {
    //       this.initData();
    //     });
    // },

     process_trade: function(trade) {
      // if (trade.alipay_on) {
      //   this.alipay_on = true;
      // }
      // if (trade.wechat_pay_on) {
      //   this.wechat_pay_on = true;
      // }
      // if (trade.bankcard_on) {
      //   this.bankcard_on = true;
      // }
      if (this.trade.status == "PENDING" || trade.status == "TAKEN") {
        clearTimeout(this.date_t);
        this.trade = trade;
        this.update_date();
      } else {
        this.trade = trade;
        clearTimeout(this.date_t);
        if (trade.status == "PAID") {
          if (trade.deadline > new Date().getTime()) {
            this.isDealTime = false;
          } else {
            this.isDealTime = true;
          }
        }
        if (
          trade.status == "PS_DISPUTED" ||
          trade.status == "PB_DISPUTED"
        ) {
          this.title_content = this.$t("Order.DISPUTED_HINT");
        } else {
          this.title_content = this.$t("Order." + trade.status);
        }
        if (
          this.trade.status == "NOT_TAKEN" ||
          this.trade.status == "BUYER_WON" ||
          this.trade.status == "SELLER_WON" ||
          this.trade.status == "TB_CANCELLED" ||
          this.trade.status == "OVERTIME" ||
          this.trade.status == "PB_CANCELLED" ||
          this.trade.status == "RELEASED"
        ) {
          //订单结束，去掉定时器

          if (this.trade_t != null) clearInterval(this.trade_t);
        }
      }
    },
    release: function() {
      if (this.passwordValue.length == 0) {
        this.pwd_error = "请输入交易密码";
        return false;
      } //this.id, this.crypto_currency, this.passwordValue
      this.isPasswordDialog = false;
      var params = {
        "symbol":this.crypto_currency.toLowerCase(),
        "password":this.passwordValue,
      	"tid":this.trade.id
      }
      order
        .release(params)
        .then(result => {
          this.passwordValue = "";
          let code = parseInt(result.code);
          if (code === 0) {
            this.showToast("已放币");
            if (this.trade_t != null) clearInterval(this.trade_t);
            this.initData();
          }
        })
        .catch(e => {
          this.passwordValue = "";
          this.showToast(e.message);
          this.initData();
        });
    },
    disputed() {
      this.isDisputedDialog = false;
      var params = {
        "symbol":this.crypto_currency.toLowerCase(),
      	"tid":this.trade.id
      }
      order
        .dispute(params)
        .then(result => {
          let code = parseInt(result.code);
          if (code === 0) {
            this.showToast("申诉已提交,请联系客服！");
            this.initData();
          }
        })
        .then(e => {
           this.showToast(e.message);
          this.initData();
        });
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    error: function(e) {
      this.showToast(this.$t("Invite.CopyErrorContent"));
    }
  },
  beforeDestroy: function() {
    clearInterval(this.trade_t);
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss"  scoped>
@import "../assets/css/order_buy.scss";
</style>
