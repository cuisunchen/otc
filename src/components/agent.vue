<template>
  <div class="content-wallet-detail-agent" style="padding-top:10em;background:#fff">
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">认证商家</div>
      <div class="left" @click="goBack" />
      <div class="right" @click="bills">{{$t('Wallet_Detail.detail')}}</div>
    </div>
        <div class="wallet-common-zone-cny">
          <div class="wallet-common-bund-address-cny" >
            <p class="wallet-common-bund-address-balance-cny">{{$t('Wallet_Detail.balance')}}</p>
            <div class="wallet-common-bund-address-balance-value-cny"><span class="span-left">{{available}}</span>&nbsp;<span class="span-right">&nbsp;FFC</span></div>
             <div class="wallet-common-recharge-withdraw"><span class="span-left">收款中 / 提现中：</span>&nbsp;<span class="span-right">{{pending_deposit }}/{{pending_withdraw }}&nbsp;FFC</span></div>
            <div class="wallet-common-bund-address-balance-lock-value-cny"><span class="span-left">{{$t('Wallet_Detail.Freezing')}}</span>&nbsp;<span class="span-right">{{locked}}&nbsp;{{locked_crypto_currency}}</span></div>
        </div>
        </div>                                                
        <div class="tab-wallet-cny" >         
          <button class="button" :class="{tab1:this.tab==='tab1'}" @click="tabChange('tab1')">FFC收款</button>
          <button class="button" :class="{tab2:this.tab==='tab2'}" @click="tabChange('tab2')">FFC提现</button>
          <button class="button" :class="{tab2:this.tab==='tab3'}" @click="tabChange('tab3')">锁仓</button>
        </div>
        <div class="recharge-content" v-show="tab=='tab1'">
          <!-- <div class="recharge-content-common" >
            <div class="wallet-detail-tip-item" >
              <span style="float:left;">火狐狸平台火狐币充值流程</span>
         
            </div>
          </div> -->
          <div v-show="!isHasDeposits" class="liucheng-hint">
           <p>FFC收款说明：<br />
            1.接收到用户的购买FFC通知。<br />
            2.确认微信、支付宝或者银行卡已经收到付款，核对订单号、金额一致后，请及时点击“已确认收款”。<br>
            3.商家无法及时处理充值时，可以关闭充值通道，以免影响用户体验。</p>
          </div>
          
          <!-- <div class="recharge-content-divider"></div> -->
         
<!-- <label><input class="mui-switch mui-switch-animbg" type="checkbox" checked> 默认选中</label> -->
          <div class="step-hint" style="margin-top:0.25em" v-show="isHasDeposits">
            <p>确认微信、支付宝或者银行卡已经收到付款,核对订单号、金额一致后，请及时点击“确认收款”</p>
          </div>
          
          <div style=" text-align: left;padding-left:1em; vertical-align: middle;height: 2.5em;padding-top:0.65em;">
            <span style="font-size:1em; line-height: 1.8;">充值通道</span>
            <span class="span-switch-colse" style="float:right;margin-right:1em;font-size:1em;"  v-show="!isOpenDeposit"  v-on:click="openDepositChannel">已关闭</span>
            <span class="span-switch-open" style="float:right;margin-right:1em;font-size:1em;" v-show="isOpenDeposit"  v-on:click="openDepositChannel">已开启</span>
            </div>
 <!-- <span style="float:right;margin-right:1em;font-size:1em;">{{isOpenDeposit?"已开启":"已关闭"}}</span>
           <input type="checkbox" class="mui-switch mui-switch-animbg" style="float:right;margin-right:0.5em;" v-on:click="openDepositChannel" v-model="isOpenDeposit" ></div>
       -->
          <div  v-for="(item) in this.deposit_list" :key="item.id">
            <div class="recharge-content-order">
            <p style="border-bottom:1px solid #eee;color:#333"  @click="showDetail(item)"><span v-html="$t('Order.OrderId1')"></span>：&nbsp;<span>F{{item.id}}</span></p>
            <p class="num-cny"  @click="showDetail(item)">收款金额<span class="left-span red-span">{{item.amount}}&nbsp;CNY</span></p>
             <!-- <div v-show="item.isOpen"  @click="showDetail(item)"> -->
              <div @click="showDetail(item)">
              <!-- <p><span >手续费</span><span class="left-span gray-span">{{item.fee}}&nbsp;CNY</span></p> -->
              <!-- <p><span >昵称</span><span class="left-span gray-span">{{item.user}}</span></p> -->
              <!-- <p><span >手机号</span><span class="left-span gray-span">{{item.user_mobile}}</span></p> -->
              <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{item.updated | getformatDate}}</span></p>
              <p class="withdraw-order-btn-zone" >
                付款用户:&nbsp;{{item.user_mobile}}<button class="button1"  @click="showAgentCancel(item)">取消充值</button><button @click="showAgentSucceedDeposit(item)">确认收款</button>
              </p>
              <!-- <div style="padding:0.5em 1em 0.6em 1em;margin-top:-1em;">
                  <mu-raised-button label="确认收款" @click="showAgentSucceedDeposit(item)" class="btn-cancel" fullWidth primary/>
              </div> -->
              </div>
          </div>
         </div>
         <div class="recharge-content-divider"></div>
        </div>
    <!--提现-->
      <div class="recharge-content" v-show="tab=='tab2'">
        <!-- <div class="recharge-content-common" >
            <div class="wallet-detail-tip-item" >
              <span style="float:left;">火狐狸平台火狐币提现流程</span>
           
            </div>
          </div> -->
           <div v-show="!isHasWithdraws" class="liucheng-hint">
           <p>FFC提现说明：<br />
            1.接收到用户的出售FFC通知。<br />
            2.请按照提示完成支付、备注订单号并电话联系用户进行审核。</p>
          </div>
          <!-- <div class="recharge-content-divider"></div> -->
          <div class="step-hint" style="margin-top:0.25em" v-show="isHasWithdraws">
            <p>请选择支付方式完成支付、备注订单号<span style="color:#ff4d2d">（切勿备注火狐狸或firefox）</span>并电话联系用户进行审核</p>
          </div>
          
          <div style=" text-align: left;padding-left:1em; vertical-align: middle;height: 2.5em;padding-top:0.65em;">
            <span style="font-size:1em; line-height: 1.8;">提现通道</span>
            <span class="span-switch-colse" style="float:right;margin-right:1em;font-size:1em;"  v-show="!isOpenwithDraw"  v-on:click="openWithdrawChannel">已关闭</span>
            <span class="span-switch-open" style="float:right;margin-right:1em;font-size:1em;" v-show="isOpenwithDraw"  v-on:click="openWithdrawChannel">已开启</span>
            </div>

   <div  v-for="(item) in this.withdraw_list" :key="item.id">
    <div class="withdraw-detail-item" >
      <div class="recharge-content-order">
        <i class="go"></i> 
        <span class="withdraw-num" v-show="item.status=='PENDING'" >{{item.amount}}&nbsp;<span >CNY</span></span>
       <span class="withdraw-num-gray"  v-show="item.status=='SUCCEEDED'||item.status=='FAILED'||item.status=='PAID'" >{{item.amount}}&nbsp;<span >CNY</span></span>
        <p  @click="showDetail(item)"><span v-html="$t('Order.OrderId1')"></span> :&nbsp;F{{item.id}}</p>
        <!-- <p  @click="showDetail(item)">转出金额<span class="left-span red-span" style="padding-right:2em;">{{item.amount}}&nbsp;<span >CNY</span></span></p> -->
         <p  @click="showDetail(item)" style="color:#ccc;">{{item.updated  | getformatDate}}</p>
       <div v-show="item.isOpen"  >
         <p><span  >手续费</span><span class="left-span gray-span">{{item.fee}}&nbsp;CNY</span></p>
         <p><span >昵称</span><span class="left-span gray-span">{{item.user}}</span></p>
         <p><span >手机号</span><span class="left-span gray-span">{{item.user_mobile}}</span></p>
         <p class="no-border"><span v-html="$t('Order.TradeTime')" ></span><span class="left-span gray-span">{{item.updated  | getformatDate}}</span></p>
       </div>
      </div>
         <div v-show="item.isOpen"  >
          <p class="title_pay">{{$t('Order.payMeth')}}</p> 
          <div class="pay-zone" v-show="item.alipay_on" @click="openPay('openAlipay',item)">
              <div class="pay-zone-item">
                <i class="alipay-ico"></i>
                <span>{{$t('Trade.alipay')}}</span>
                <i class="go"></i>
              </div>
          </div>
          <div  class="pay-detail-zone" v-show="item.isOpenAlipay"  >
                <div>
                <p class="pay-detail-zone-p" v-clipboard:copy="item.alipay_on?item.alipay.name:''"
              v-clipboard:success="success">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span  v-clipboard:copy="item.alipay_on?item.alipay.name:''"
              v-clipboard:success="success">{{item.alipay_on?item.alipay.name:''}}</span></p>
                <p class="pay-detail-zone-p"  v-clipboard:copy="item.alipay_on?item.alipay.account:''"
              v-clipboard:success="success">{{$t('Order.alipayNumber')}}<span  v-clipboard:copy="item.alipay_on?item.alipay.account:''"
              v-clipboard:success="success">{{item.alipay_on?item.alipay.account:''}}</span></p>
              <p class="pay-detail-zone-p" @click="go_play(item)" v-show="isCanPay" ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD')}}</span>  </p>
                </div>
                <!-- <img style="width:80%;margin-top:0.8em;"  :src="item.alipay_on?item.alipay.payment_code_url:''"  @click="go_play()"/> -->
              <img style="width:80%;margin-top:0.8em;"  :src="item.alipay_on?item.alipay_payment_code_url_value:''" @click="go_play(item)" v-show="item.alipay_payment_code_url !=''&&!(item.isAlipayQrcode)"/>
             <div  @click="go_play(item)">
              <qrcode style="width:80%;margin-top:0.8em;"   :value="item.alipay_payment_code_url_value" :options="{ size: 120 }"  v-show="item.alipay_payment_code_url !=''&&item.isAlipayQrcode"></qrcode>  
             </div>
          </div>
          <!---->
          <div class="pay-zone"  v-show="item.wechat_pay_on"   @click="openPay('openWechat',item)">
              <div class="pay-zone-item">
                <i class="wechat-ico"></i>
                <span>{{$t('Trade.wechat')}}</span>
                <i class="go"></i>
              </div>
          </div>
          <div  class="pay-detail-zone"  v-show="item.isOpenWechat" >
                <div>
                <p class="pay-detail-zone-p"  v-clipboard:copy="item.wechat_pay_on?item.wechat_pay.name:''"
              v-clipboard:success="success">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span 
               v-clipboard:copy="item.wechat_pay_on?item.wechat_pay.name:''"
              v-clipboard:success="success">{{item.wechat_pay_on?item.wechat_pay.name:""}}</span></p>
                <p class="pay-detail-zone-p" v-clipboard:copy="item.wechat_pay_on?item.wechat_pay.account:''"
              v-clipboard:success="success">{{$t('Order.wechatNumber')}}<span v-clipboard:copy="item.wechat_pay_on?item.wechat_pay.account:''"
              v-clipboard:success="success">{{item.wechat_pay_on?item.wechat_pay.account:""}}</span></p>
               <p class="pay-detail-zone-p"  ><span style="text-decoration: underline;color:#3d9cee">{{$t('Order.PAYMETHOD_WX')}}</span>  </p>
                </div>
                <!-- <img style="width:80%;"  :src="item.wechat_pay_on?item.wechat_pay.payment_code_url:''"/> -->
                <img style="width:80%"  :src="item.wechat_pay_on?item.wechat_payment_code_url_value:''"  v-show="item.wechat_payment_code_url !=''&&!(item.isWechatQrcode)"/>
                <qrcode style="width:80%"   :value="item.wechat_payment_code_url_value" :options="{ size: 120 }"  v-show="item.wechat_payment_code_url !=''&&item.isWechatQrcode"></qrcode>  
            
          </div>
          <div class="pay-zone"  v-show="item.bankcard_on"   @click="openPay('openBank',item)">
              <div class="pay-zone-item" >
                <i class="bank-ico"></i>
                <span>{{$t('Trade.bank')}}</span>
                <i class="go"></i>
              </div>
          </div>
          <div  class="pay-detail-zone" v-show="item.isOpenBank" >
                <p class="pay-detail-zone-p">{{$t('Order.name1')}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{$t('Order.name2')}}<span
                 v-clipboard:copy="item.bankcard_on?item.bank_card.name:''"
              v-clipboard:success="success">{{item.bankcard_on?item.bank_card.name:''}}</span></p> 
                <p class="pay-detail-zone-p" >{{$t('Order.bankCard')}}<span   v-clipboard:copy="item.bankcard_on?item.bank_card.card_number:''"
              v-clipboard:success="success">{{item.bankcard_on?item.bank_card.card_number:''}}</span></p>
                <p class="pay-detail-zone-p" >{{$t('Order.bankName')}}<span   v-clipboard:copy="item.bankcard_on?$t('Bank.'+item.bank_card.bank_code):''"
              v-clipboard:success="success">{{item.bankcard_on?$t('Bank.'+item.bank_card.bank_code):''}}</span></p>
                <p class="pay-detail-zone-p" >{{$t('Order.bankBranch')}}<span  v-clipboard:copy="item.bankcard_on?item.bank_card.branch_name:''"
              v-clipboard:success="success">{{item.bankcard_on?item.bank_card.branch_name:''}}</span></p>
          </div>
         </div>
         <p class="withdraw-order-btn-zone">
                对方手机号:&nbsp;{{item.user_mobile}}<button  @click="showPaidDialog(item)" v-show="item.status=='PENDING'" style="    border: 1px solid #ff4d2d; color: #ff4d2d;margin-left: 0.4em;margin-left:0.5em;">标记付款</button>   <button @click="showWithdrawDialog(item)" >确认提现</button>  <span style="float: right;color:#ff4d2d;margin-top: 0.2em; font-size: 0.7em;" v-show="item.status=='PAID'">已付款，勿重复提现！</span>
              </p>
         </div>
         
        </div>
        <div class="recharge-content-divider"></div>
     </div>
     <!--账户-->
     <div class="recharge-content" v-show="tab=='tab3'">
          <!-- <div class="recharge-content-common" >
            <div class="wallet-detail-tip-item" >
              <span style="float:left;">火狐狸平台商家认证流程</span>
          
            </div>
          </div> -->
          <!-- <div class="recharge-content-divider-1px"></div> -->
          <div  class="recharge-content-input" style="padding-bottom:1em">
            <mu-auto-complete style="text-align: left;padding-left: 0.3em"  v-model.trim="lock_qty" class="input-zone" hintText="输入锁定币数量" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
            <mu-raised-button label="锁币" style="margin-top:0.5em;" @click="showLockDialog" class="btn" fullWidth primary/>
          </div>
          <div class="liucheng-hint">
           <p>锁仓说明：<br />
              1.首次锁仓金额不能低于10,000 链克（OSC）。<br />
              2.追加锁仓金额不能低于10,000 链克。<br />
              3.如果需要解锁，请联系客服，将在5个工作日完成解锁。<br />
              4.完成锁仓后，可以收款总价值/2的CNY。<br />
              5.完成一笔FFC提现，将获得0.3%的金额奖励。</p>
          </div>
          <div class="recharge-content-divider" v-show="false"></div>
          <div  class="recharge-content-input" style="margin-bottom:1em" v-show="false">
            <mu-auto-complete style="text-align: left;padding-left: 0.3em"  v-model.trim="unlock_qty" class="input-zone" hintText="输入释放锁定币的数量" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
            <mu-raised-button label="释放币" style="margin-top:0.5em;" @click="showUnLockDialog" class="btn" fullWidth primary/>
          </div>
      </div>
    <mu-dialog :open="isAgentSureTip" title="认证商家提示" >
      <div >请确认是否认证商家</div>
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
       <mu-flat-button slot="actions" @click="lock" primary label="认证商家"/>
     </mu-dialog>
    <mu-dialog :open="isShowAgentSucceedDeposit" title="收款提示" >
       <mu-text-field  type="password"  style="text-align: left;padding-left: 0.3em"  v-model.trim="assertPassword" class="input-zone" hintText="交易密码" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
      <div >请确认收到款</div>
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
       <mu-flat-button slot="actions" @click="succeedDeposit" primary label="已收款"/>
     </mu-dialog>
     
     <mu-dialog :open="isAgentUnlockTip" title="退币提示" >
      <div >请确认是否释放锁定商家的币</div>
   
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
       <mu-flat-button slot="actions" @click="unlock" primary label="释放"/>
     </mu-dialog>
     <mu-dialog :open="isAgentTip" title="认证商家提示" >
      <div >申请认证商家您的账户需要2w个链克币</div>
   
      <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
     </mu-dialog>
  <mu-dialog :open="isRechargeTipDialog" :title="$t('Wallet_Detail.top_up_tip')" >
    <div >充值流程：1、在火狐狸平台填写充值单申请单，申请成功后，像火狐狸平台指定账户充值（充值时备注订单编号），充值成功后，标记已充值，客服确认收款后，您的账户有等额的人民币。</div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>
  <mu-dialog :open="isWithdrawTipDialog" :title="$t('Wallet_Detail.top_up_tip')" >
    <div >提现流程：1、在火狐狸平台填写充值单申请单，申请成功后，像火狐狸平台指定账户充值（充值时备注订单编号），充值成功后，标记已充值，客服确认收款后，您的账户有等额的人民币。</div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
  </mu-dialog>
  <mu-dialog :open="isAgentCancelDialog" title="提示" >
    <div >如果充值人员恶意下单，24小时内没有付款且无法联系，您可以取消订单。</div>
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="recharge_cancel" primary label="取消充值"/>
  </mu-dialog>

  <mu-dialog :open="isWithdrawlDialog" title="提示" >
    <div >你确认已给对方提现。</div>
    <mu-text-field  type="password"  style="text-align: left;padding-left: 0.3em"  v-model.trim="assertPassword" class="input-zone" hintText="交易密码" fullWidth @focus="input_focus('osc')" :errorText="oscError" />
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="withdraw_sure" primary label="提现"/>
  </mu-dialog>
<mu-dialog :open="isPayTipDialog" title="支付提示" >
      支付时，请核对对方信息无误。
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="go_aliplay" label="去支付"/> 
  </mu-dialog>
<mu-dialog :open="isShowPaidDialog" title="提示" >
      请确认已付款。
        <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
        <mu-flat-button slot="actions" primary @click="paid_money" label="标记已付款"/> 
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
import Clipboard from "clipboard";
export default {
  name: "agent",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      available: "",
      locked: "",
      isRechargeTipDialog: false,
      isWithdrawTipDialog: false,
      crypto_currency: "OSC",
      oscError: "",
      tab: "tab1",
      recharge_amount: "",
      refresh_txt: this.$t("Wallet_Detail.refresh_txt"),
      refresh_timer: [],
      activeStep: 1,
      hasCharge: true,
      hasWithdraw: true,
      alipay_on: false,
      bankcard_on: false,
      isAgentTip: false,
      isAgentSureTip: false,
      lock_qty: "",
      isTrading: false,
      unlock_qty: "",
      isAgentUnlockTip: false,
      deposit_list: [],
      withdraw_list: [],
      succeedDepositItem: "",
      isShowAgentSucceedDeposit: false,
      locked_crypto_currency: "",
      pending_deposit: "",
      pending_withdraw: "",
      assertPassword: "",
      timer: null,
      isHasDeposits: false,
      isHasWithdraws: false,
      isAgentCancelDialog: false,
      cancelItem: {},
      isWithdrawlDialog: false,
      withdrawItem: {},
      isCanPay: false,
      isPayTipDialog: false,
      isOpenDeposit: false,
      isOpenwithDraw: false,
      isShowPaidDialog: false,
      paidItem: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    // ,agent.agent_agent_transfer('WITHDRAW','QUERY_PENDING',0,10)
    Promise.all([
      agent.agent(),
      agent.agent_agent_transfer("DEPOSIT", "QUERY_PENDING", 0, 10)
    ])
      .then(values => {
        let agent = values[0];
        let deposit_list_result = values[1];
        let withdraw_list_result = []; // values[2];

        let balances = [];
        let available = "0";
        let locked = "0";
        let locked_crypto_currency = "";
        let pending_deposit = "";
        let pending_withdraw = "";
        let isHasDeposits = false;
        let isHasWithdraws = false;
        let disable_deposit = true;
        let disable_withdrawal = true;
        if (agent.code == 0) {
          if (agent.data.hasOwnProperty("lock_list")) {
            locked = agent.data.lock_list[0].qty;
            locked_crypto_currency = agent.data.lock_list[0].currency;
          }
          available = agent.data.available;
          pending_deposit = agent.data.pending_deposit;
          pending_withdraw = agent.data.pending_withdraw;
          disable_deposit = agent.data.disable_deposit;
          disable_withdrawal = !agent.data.disable_withdrawal;
        }

        let deposit_list = [];
        if (
          deposit_list_result.code === 0 &&
          deposit_list_result.data.total > 0
        ) {
          isHasDeposits = true;
          for (let i = 0; i < deposit_list_result.data.list.length; i++) {
            deposit_list_result.data.list[i].isOpen = false;
          }
          deposit_list = deposit_list_result.data.list;
        }

        let withdraw_list = [];
        if (
          withdraw_list_result.code === 0 &&
          withdraw_list_result.data.total > 0
        ) {
          for (let i = 0; i < withdraw_list_result.data.list.length; i++) {
            var item = withdraw_list_result.data.list[i];
            item.isOpen = false;
            item.isOpenAlipay = false;
            item.isOpenWechat = false;
            item.isOpenBank = false;
            if (item.alipay_on) {
              item.alipay_payment_code_url = item.alipay.payment_code_url;
              if (item.alipay_payment_code_url.indexOf("qrcode") == 0) {
                item.alipay_payment_code_url_value = item.alipay_payment_code_url.substr(
                  6,
                  item.alipay_payment_code_url.length
                );
                item.isAlipayQrcode = true;
              } else {
                item.alipay_payment_code_url_value =
                  item.alipay_payment_code_url;
                item.isAlipayQrcode = false;
              }
              if (
                item.alipay_payment_code_url_value.indexOf("http") == 0 ||
                item.alipay_payment_code_url_value.indexOf("HTTP") == 0
              ) {
              } else {
                item.alipay_payment_code_url_value =
                  "http:" + item.alipay_payment_code_url_value;
              }
            }
            if (item.wechat_pay_on) {
              item.wechat_payment_code_url = item.wechat_pay.payment_code_url;
              if (item.wechat_payment_code_url.indexOf("qrcode") == 0) {
                item.wechat_payment_code_url_value = item.wechat_payment_code_url.substr(
                  6,
                  item.wechat_payment_code_url.length
                );
                item.isWechatQrcode = true;
              } else {
                item.wechat_payment_code_url_value =
                  item.wechat_payment_code_url;
                item.isWechatQrcode = false;
              }
              if (
                item.wechat_payment_code_url_value.indexOf("http") == 0 ||
                item.wechat_payment_code_url_value.indexOf("HTTP") == 0
              ) {
              } else {
                item.wechat_payment_code_url_value =
                  "http:" + item.wechat_payment_code_url_value;
              }
            }
            withdraw_list_result.data.list[i] = item;
          }
          isHasWithdraws = true;
          withdraw_list = withdraw_list_result.data.list;
        }

        next(vm => {
          vm.available = available;
          vm.locked = locked;
          vm.locked_crypto_currency = locked_crypto_currency;
          vm.deposit_list = deposit_list;
          vm.withdraw_list = withdraw_list;
          vm.pending_deposit = pending_deposit;
          vm.pending_withdraw = pending_withdraw;
          vm.isHasWithdraws = isHasWithdraws;
          vm.isHasDeposits = isHasDeposits;
          if (disable_deposit === true) {
            vm.isOpenDeposit = false;
          } else {
            vm.isOpenDeposit = true;
          }
          vm.isOpenwithDraw = disable_withdrawal;
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
        this.agent_agent_transfer();
        this.agent();
      }
      if (tab == "tab2") {
        this.withdraw_agent_agent_transfer();
        this.agent();
      }
    },
    go_play(item) {
      if (window.plus == undefined) return;
      this.isPayTipDialog = true;
      pluginShow(item.alipay.payment_code_url);
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
    openPay(typePay, item) {
      if (typePay == "openAlipay") {
        item.isOpenAlipay = !item.isOpenAlipay;
        item.isOpenWechat = false;
        item.isOpenBank = false;
        this.withdrawItem = item;
        pluginShow(item.alipay.payment_code_url);
      } else if (typePay == "openWechat") {
        item.isOpenWechat = !item.isOpenWechat;
        item.isOpenAlipay = false;
        item.isOpenBank = false;
      } else if (typePay == "openBank") {
        item.isOpenBank = !item.isOpenBank;
        item.isOpenWechat = false;
        item.isOpenAlipay = false;
      }
    },
    showDetail(item) {
      item.isOpen = !item.isOpen;
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
      this.isAgentTip = false;
      this.isAgentSureTip = false;
      this.isAgentUnlockTip = false;
      this.isShowAgentSucceedDeposit = false;
      this.assertPassword = "";
      this.isAgentCancelDialog = false;
      this.isWithdrawlDialog = false;
      this.isPayTipDialog = false;
      this.isShowPaidDialog = false;
    },
    showAgentCancel(item) {
      this.isAgentCancelDialog = true;
      this.cancelItem = item;
    },
    showAgentDialog() {
      this.isAgentTip = true;
    },
    showAgentSucceedDeposit(item) {
      this.succeedDepositItem = item;
      this.isShowAgentSucceedDeposit = true;
    },
    showWithdrawDialog(item) {
      this.isWithdrawlDialog = true;
      this.withdrawItem = item;
    },
    showPaidDialog(item) {
      this.paidItem = item;
      this.isShowPaidDialog = true;
    },
    paid_money() {
      this.isShowPaidDialog = false;
      agent
        .paid_money(this.paidItem.id)
        .then(data => {
          this.timer = setTimeout(() => {
            this.withdraw_agent_agent_transfer();
          }, 1000);
        })
        .catch(e => {
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    showUnLockDialog() {
      if (!isNaN(parseInt(this.unlock_qty))) {
        if (lib.toFixed(parseFloat(this.unlock_qty), 8) <= 0) {
          this.showToast("请输入正确的锁币数量值");
          return;
        }
      } else {
        this.showToast("请输入正确的锁币数量值");
        return;
      }

      this.isAgentUnlockTip = true;
    },
    showLockDialog() {
      if (!isNaN(parseInt(this.lock_qty))) {
        if (lib.toFixed(parseFloat(this.lock_qty), 8) <= 0) {
          this.showToast("请输入正确的锁币数量值");
          return;
        }
      } else {
        this.showToast("请输入正确的锁币数量值");
        return;
      }
      if (parseInt(this.lock_qty) < 10000) {
        this.showToast("锁币数量值需要10000以上。");
        return;
      }
      this.isAgentSureTip = true;
    },
    succeedDeposit() {
      if (this.assertPassword.length < 6) {
        this.showToast("请输入正确的交易密码");
        return;
      }
      this.isShowAgentSucceedDeposit = false;
      agent
        .agent_succeed_deposit(this.succeedDepositItem.id, this.assertPassword)
        .then(data => {
          this.isTrading = false;
          this.assertPassword = "";
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.agent_agent_transfer();
            this.agent();
          }, 1000);
        })
        .catch(e => {
          this.assertPassword = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    lock() {
      this.isAgentSureTip = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_lock("OSC", this.lock_qty)
        .then(data => {
          this.isTrading = false;
          this.lock_qty = "";
          this.showToast("认证成功");
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.agent();
          }, 1000);
        })
        .catch(e => {
          this.lock_qty = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    unlock() {
      this.isAgentUnlockTip = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_unlock("OSC", this.unlock_qty)
        .then(data => {
          this.isTrading = false;
          this.unlock_qty = "";
          this.showToast("释放币成功");
          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.getBalance();
          }, 1000);
        })
        .catch(e => {
          this.unlock_qty = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    agent_agent_transfer() {
      agent
        .agent_agent_transfer("DEPOSIT", "QUERY_PENDING", 0, 10)
        .then(value => {
          if (value.code === 0 && value.data.total > 0) {
            this.isHasDeposits = true;
            this.deposit_list = value.data.list;
          } else {
            this.deposit_list = [];
            this.isHasDeposits = false;
          }
        })
        .catch(e => {
          this.deposit_list = [];
        });
    },
    withdraw_sure() {
      if (this.withdrawPassword.length < 6) {
        this.showToast("请输入交易密码");
        return;
      }
      this.isWithdrawlDialog = false;
      agent
        .agent_succeed_withdraw(
          this.succeedWithdrawItem.id,
          this.withdrawPassword
        )
        .then(data => {
          this.isTrading = false;
          this.withdrawPassword = "";
          this.showToast("成功");

          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
          }, 1000);
        })
        .catch(e => {
          this.withdrawPassword = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    recharge_cancel() {
      this.isAgentCancelDialog = false;
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      agent
        .agent_cancel_deposit(this.cancelItem.id)
        .then(data => {
          this.isTrading = false;
          this.showToast("取消成功");

          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.tabChange("tab1");
          }, 1000);
        })
        .catch(e => {
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    withdraw_sure() {
      if (this.assertPassword.length < 6) {
        this.showToast("请输入交易密码");
        return;
      }
      if (this.isTrading) {
        return;
      }
      this.isTrading = true;
      this.isWithdrawlDialog = false;
      agent
        .agent_succeed_withdraw(this.withdrawItem.id, this.assertPassword)
        .then(data => {
          this.isTrading = false;
          this.assertPassword = "";
          this.showToast("成功");

          this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.tabChange("tab2");
          }, 1000);
        })
        .catch(e => {
          this.assertPassword = "";
          this.isTrading = false;
          this.showToast(HttpResultCode.validate(e.code));
        });
    },
    agent() {
      agent
        .agent()
        .then(value => {
          if (value.code == 0) {
            if (value.data.hasOwnProperty("lock_list")) {
              this.locked = value.data.lock_list[0].qty;
              this.value = value.data.lock_list[0].currency;
            }
            this.available = value.data.available;
            this.pending_deposit = value.data.pending_deposit;
            this.pending_withdraw = value.data.pending_withdraw;
            this.isOpenDeposit = !value.data.disable_deposit;
            this.isOpenwithDraw = !value.data.disable_withdrawal;
            // if (this.isOpenDeposit == "true") this.isOpenDeposit = false;
          }
        })
        .catch(e => {});
    },
    withdraw_agent_agent_transfer() {
      agent
        .agent_agent_transfer("WITHDRAW", "QUERY_PENDING", 0, 10)
        .then(value => {
          if (value.code === 0 && value.data.total > 0) {
            this.isHasWithdraws = true;
            for (let i = 0; i < value.data.list.length; i++) {
              value.data.list[i].isOpen = false;
              value.data.list[i].isOpenAlipay = false;
              value.data.list[i].isOpenWechat = false;
              value.data.list[i].isOpenBank = false;
              var item = value.data.list[i];
              item.isOpen = false;
              item.isOpenAlipay = false;
              item.isOpenWechat = false;
              item.isOpenBank = false;
              if (item.alipay_on) {
                item.alipay_payment_code_url = item.alipay.payment_code_url;
                if (item.alipay_payment_code_url.indexOf("qrcode") == 0) {
                  item.alipay_payment_code_url_value = item.alipay_payment_code_url.substr(
                    6,
                    item.alipay_payment_code_url.length
                  );
                  item.isAlipayQrcode = true;
                } else {
                  item.alipay_payment_code_url_value =
                    item.alipay_payment_code_url;
                  item.isAlipayQrcode = false;
                }
                if (
                  item.alipay_payment_code_url_value.indexOf("http") == 0 ||
                  item.alipay_payment_code_url_value.indexOf("HTTP") == 0
                ) {
                } else {
                  item.alipay_payment_code_url_value =
                    "http:" + item.alipay_payment_code_url_value;
                }
              }
              if (item.wechat_pay_on) {
                item.wechat_payment_code_url = item.wechat_pay.payment_code_url;
                if (item.wechat_payment_code_url.indexOf("qrcode") == 0) {
                  item.wechat_payment_code_url_value = item.wechat_payment_code_url.substr(
                    6,
                    item.wechat_payment_code_url.length
                  );
                  item.isWechatQrcode = true;
                } else {
                  item.wechat_payment_code_url_value =
                    item.wechat_payment_code_url;
                  item.isWechatQrcode = false;
                }
                if (
                  item.wechat_payment_code_url_value.indexOf("http") == 0 ||
                  item.wechat_payment_code_url_value.indexOf("HTTP") == 0
                ) {
                } else {
                  item.wechat_payment_code_url_value =
                    "http:" + item.wechat_payment_code_url_value;
                }
              }
              value.data.list[i] = item;
            }
            this.withdraw_list = value.data.list;
          } else {
            this.withdraw_list = [];
            this.isHasWithdraws = false;
          }
        })
        .catch(e => {
          this.withdraw_list = [];
        });
    },
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
      this.$router.push("/bills_agent");
    },
    success: function(e) {
      this.showToast(this.$t("Invite.CopySuccessContent"));
    },
    openDepositChannel() {
      var l_this = this;
      // alert("openDepositChannel =" + this.isOpenDeposit);
      if (this.isOpenDeposit) {
        agent
          .disable()
          .then(value => {
            if (value.code == 0) {
              l_this.isOpenDeposit = false;
            }
            // alert("disable =" + this.isOpenDeposit);
          })
          .catch(e => {});
      } else {
        agent
          .enable()
          .then(value => {
            if (value.code == 0) {
              l_this.isOpenDeposit = true;
            }
            // alert("enable =" + this.isOpenDeposit);
          })
          .catch(e => {});
      }
    },
    openWithdrawChannel() {
      var l_this = this;
      if (this.isOpenwithDraw) {
        agent
          .disable_withdraw()
          .then(value => {
            if (value.code == 0) {
              l_this.isOpenwithDraw = false;
            }
          })
          .catch(e => {});
      } else {
        agent
          .enable_withdraw()
          .then(value => {
            if (value.code == 0) {
              l_this.isOpenwithDraw = true;
            }
          })
          .catch(e => {});
      }
    }
  }
};
</script>

<style  lang="scss"  scoped>
@import "../assets/css/agent.scss";
</style>
