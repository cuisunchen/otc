<template>
  <div class="content">
    <!-- <mu-linear-progress /> -->
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center">{{$t('Order.payMeth')}}</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="set-content-item"  @click="openAlipay" style="margin-top:1em;">
      <!-- <img src="../assets/image/icon_alipay.png" class="img_left"/> -->
      <p>{{$t('Trade.alipay')}} <span>{{has_alipay? $t('User.bounded'):$t('User.unbound')}}</span></p>  
   </div>
   <!--alipay https://github.com/zhanziyang/vue-croppa     :placeholder="'选择图片'"
        :placeholder-font-size="15"
        :placeholder-color="'#404040'"-->
     
   <div v-show="isAlipayShow">
     <div class="login-pay">
       <div class="pay-text-zone">
       <div class="pay-item"  >
              <span v-html="$t('User.userName')"></span>
             <mu-auto-complete  class="mu-text-field-input" v-model.trim="alipay_name"  hintText="支付宝名字"  fullWidth    @focus="input_focus('alipay_name')"  :errorText="alipay_name_error"/> 
      </div>
      <div class="pay-item"  >
              <span>{{$t('User.alipayNumber')}}</span> 
            <mu-auto-complete  v-model.trim="alipay_account" class="mu-text-field-input" :hintText="$t('User.alipayNumber')" fullWidth    @focus="input_focus('alipay_account')"  :errorText="alipay_account_error"/>
      </div>
      <div class="pay-item" style="border:0px;" >
              <span>{{$t('User.SetMenuAssertPwd')}}</span>
            <mu-text-field v-model.trim="alipy_pwd" class="mu-text-field-input" hintText="火狐狸交易密码" type="password" fullWidth   @focus="input_focus('alipy_pwd')"  :errorText="alipy_pwd_error"/>      
      </div>
      </div>
      <p class="pay-qr-title">{{$t('User.alipayQrNumber')}}
         <router-link  :to="{ name: 'help_bound_pay'}">
        <span><a target="_blank">{{$t('User.getAlipayQrNumber')}}</a></span>
         </router-link>
      </p>
      <div class="radio-zone">
          <mu-radio class="mu-radio" label="上传本地图片" name="groupAlipay" nativeValue="local" v-model="alipayType" /> <br/>
          <mu-radio class="mu-radio" label="图片生成二维码" name="groupAlipay" nativeValue="qr" v-model="alipayType"  /> <br/>
      </div>
      <div class="pay-qr-zone">                                    
        <div style="position:relative;" >
        <!-- <img :src="alipay_payment_code_url" v-show="alipay_payment_code_url!=''" activeRadio> -->
        <img  @click="open_Alipay" style="display:block;width:100%;height:100%;position:absolute;top:0px;left:0px;" :src="alipay_payment_code_url_value" v-show="alipay_payment_code_url!=''&&!isAlipayQrcode"> 
          <div @click="open_Alipay"  style="display:block;width:100%;height:100%;position:absolute;top:0px;left:0px;"> 
          
          <qrcode @click="open_Alipay"  :value="this.alipay_payment_code_url_value" :options="{ size: 120 }"  v-show="alipay_payment_code_url !=''&&isAlipayQrcode"></qrcode> 
          </div>
          
        </div>
        <div class="pay-qr-btn">
           <input type="file" accept="image/*"   @change="upload_alipay_img">
        </div>
         <mu-circular-progress :size="30" color="#3d9cee" v-show="isShowAlipayProgress" />
      </div>
      <p style="color:#ff4551;padding:0px 1em;margin:0px;background:#fff;">点击生成的支付二维码并扫描核对码是否正确</p>
      <div class="btn-zone">
        <mu-raised-button  :label="$t('Wallet_Detail.confirm_submit')" @click="commit_alipay_dialog" class="btn" fullWidth primary/>
      </div>
      </div>
   </div>
   <div class="set-content-item" @click="openWechat">
      <img src="../assets/image/icon_wechat.png" class="img_left" />
      <p>{{$t('Trade.wechat')}}<span>{{has_wechat_pay? $t('User.bounded'):$t('User.unbound')}}</span></p>
   </div>
   <!--wechat-->
   <div v-show="isWechatShow">
    <div class="login-pay">
      <div class="pay-text-zone">
       <div class="pay-item">
             <span >微信用户名</span><!--v-html="$t('User.userName')"-->
            <mu-auto-complete  v-model.trim="wechat_name" class="mu-text-field-input" :hintText="$t('SignIn.Name')" fullWidth    @focus="input_focus('wechat_name')"  :errorText="wechat_name_error" />
      </div>
      <div class="pay-item"  >
              <span>微信账号</span>   <!-- v-html="$t('User.wechatNumber')"-->
        <mu-auto-complete  v-model.trim="wechat_account" class="mu-text-field-input" :hintText="$t('User.wechat')"  fullWidth    @focus="input_focus('wechat_account')"  :errorText="wechat_account_error" />      
      </div>
      <div class="pay-item" style="border:0px;" >
              <span>{{$t('User.SetMenuAssertPwd')}}</span>
      <mu-text-field v-model.trim="wechat_pwd" class="mu-text-field-input" hintText="火狐狸交易密码" type="password" fullWidth   @focus="input_focus('wechat_pwd')"  :errorText="wechat_pwd_error" />
       </div>
      </div>
      <p class="pay-qr-title">{{$t('User.wechatQrNumber')}}
        <router-link  :to="{ name: 'help_bound_pay'}">
          <span><a  target="_blank">{{$t('User.getAlipayQrNumber')}}</a></span>
        </router-link>
      </p>
      <div class="radio-zone">
          <mu-radio class="mu-radio" label="上传本地图片" name="groupWechat" nativeValue="local" v-model="wechatType" /> <br/>
          <mu-radio class="mu-radio" label="图片生成二维码" name="groupWechat" nativeValue="qr" v-model="wechatType"  /> <br/>
      </div>
     <!-- v-show="false" href="https://www.firefoxotc.com/zh_tw/help/bind_payment.html"activeRadio-->
      <div class="pay-qr-zone">
        <div style="position:relative;" >
          <div @click="open_Wechat"  style="display:block;width:100%;height:100%;position:absolute;top:0px;left:0px;"> </div>
          <img  @click="open_Wechat" :src="wechat_payment_code_url_value" v-show="wechat_payment_code_url!=''&&!isWechatQrcode"> 
          <qrcode  @click="open_Wechat" :value="this.wechat_payment_code_url_value" :options="{ size: 120 }"  v-show="wechat_payment_code_url !=''&&isWechatQrcode"></qrcode>  
        </div>
        <div class="pay-qr-btn">
           <input type="file" accept="image/*"   @change="upload_wechat_img">
        </div>
         <mu-circular-progress :size="30" color="#3d9cee"  v-show="isShowWechatProgress"  />
      </div>
        <p style="color:#ff4551;padding:0px 1em;margin:0px;background:#fff;">点击生成的支付二维码并扫描核对码是否正确</p>
      <div class="btn-zone">
         <mu-raised-button  :label="$t('Wallet_Detail.confirm_submit')" @click="commit_wechat_dialog" class="btn" fullWidth primary/>
      </div>
     </div>
   </div>
   <div class="set-content-item" @click="openBank">
      <!-- <img src="../assets/image/icon_bank.png" class="img_left"/> -->
      <p>{{$t('User.bankCard')}}<span>{{has_bankcard? $t('User.bounded'):$t('User.unbound')}}</span></p>
   </div>  
   <!--bank-->
   <div v-show="isBankShow">
     <div class="login-pay">
      <div class="pay-text-zone">
       <div class="pay-item">
              <span v-html="$t('User.bankUserName')"></span>
           <mu-auto-complete  v-model.trim="bank_name" class="mu-text-field-input" :hintText="$t('User.bankUserNameHint')"  fullWidth   @focus="input_focus('bank_name')"  :errorText="bank_name_error" />
     </div>
      <div class="pay-item" @click="openmask()" >
               <span v-html="$t('User.bankOpenName')"></span> 
              <p class="pay-bank-ft">{{bank_code_value}}</p>
        <i class="more-btn"></i>
       </div>
       <div class="pay-item">
              <span>{{$t('User.openBankName')}}</span>
              <mu-auto-complete  v-model.trim="branch_name" class="mu-text-field-input" :hintText="$t('User.openBankName')" fullWidth   @focus="input_focus('branch_name')"  :errorText="branch_name_error" />
      </div>
      <div class="pay-item">
              <span>{{$t('User.bankCardNumber')}}</span>
      <mu-auto-complete  v-model.trim="card_number" class="mu-text-field-input" :hintText="$t('User.bankCardNumber')" fullWidth   @focus="input_focus('card_number')"  :errorText="card_number_error" />
      </div>
       <div class="pay-item">
              <span>{{$t('User.SetMenuAssertPwd')}}</span>
       <mu-text-field v-model.trim="pwd" class="mu-text-field-input" hintText="火狐狸交易密码" type="password" fullWidth  @focus="input_focus('pwd')"  :errorText="pwd_error" />
      </div>
      </div>
      <div class="btn-zone">
         <mu-raised-button  :label="$t('Wallet_Detail.confirm_submit')" @click="commit_bank_dialog" class="btn" fullWidth primary/>
      </div>
     </div>
   </div>
   <p class="p1">{{$t('User.payTip1')}}</p> 
  <mu-dialog :open="isBoundBankDialog" :title="$t('User.boundBankTip')" > 
     {{$t('User.boundBankContent')}} 
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="bank_submit" primary :label="$t('User.boundBank')"/>
  </mu-dialog>
  <mu-dialog :open="isBoundAlipayDialog" :title="$t('User.boundAlipayTip')" > 
     {{$t('User.boundAlipayContent')}}
     <br>{{$t('SignUp.Name')}}：{{alipay_name}}
     <br>{{$t('Order.alipayNumber')}}{{alipay_account}}
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="alipay_submit" primary :label="$t('User.boundAlipay')"/>
  </mu-dialog>
  <mu-dialog :open="isBoundWechatDialog" :title="$t('User.boundWechatTip')" > 
      {{$t('User.boundWechatContent')}}
     <br>{{$t('SignUp.Name')}}：{{wechat_name}}
     <br>{{$t('Order.wechatNumber')}}{{wechat_account}}
    <mu-flat-button slot="actions" @click="closeDialog" primary :label="$t('Order.Colse')"/>
    <mu-flat-button slot="actions" @click="wechat_submit" primary :label="$t('User.boundWechat')"/>
  </mu-dialog>
  <div class="mask" v-show="maskOpen">
    <div class="mask-zone">
      <div class="mask-top">
        <p>选择开户行<span class="right-ft" @click="closemask()">{{$t('Order.Colse')}}</span></p>
      </div>
      <div class="all_bank_list">
          <div class="bank_list" @click="hand_bank('PINGAN', $t('Bank.PINGAN'))">{{ $t('Bank.PINGAN') }}</div>
          <div class="bank_list" @click="hand_bank('BC', $t('Bank.BC'))">{{ $t('Bank.BC')}}</div>
          <div class="bank_list" @click="hand_bank('ICBC', $t('Bank.ICBC'))">{{ $t('Bank.ICBC')}}</div>
          <div class="bank_list" @click="hand_bank('ABC', $t('Bank.ABC'))">{{ $t('Bank.ABC')}}</div>
          <div class="bank_list" @click="hand_bank('CBC', $t('Bank.CBC'))">{{ $t('Bank.CBC')}}</div>
          <div class="bank_list" @click="hand_bank('CMBC', $t('Bank.CMBC'))">{{ $t('Bank.CMBC')}}</div>
          <div class="bank_list" @click="hand_bank('CEB', $t('Bank.CEB'))">{{ $t('Bank.CEB')}}</div>
          <div class="bank_list" @click="hand_bank('MSBC', $t('Bank.MSBC'))">{{ $t('Bank.MSBC')}}</div>
          <div class="bank_list" @click="hand_bank('EXIMBC', $t('Bank.EXIMBC'))">{{ $t('Bank.EXIMBC')}}</div>
          <div class="bank_list" @click="hand_bank('CITIC', $t('Bank.CITIC'))">{{ $t('Bank.CITIC')}}</div>
          <div class="bank_list" @click="hand_bank('CIB', $t('Bank.CIB'))">{{ $t('Bank.CIB')}}</div>
          <div class="bank_list" @click="hand_bank('CDB', $t('Bank.CDB'))">{{ $t('Bank.CDB')}}</div>
          <!-- <div class="bank_list" @click="hand_bank('PBC','中国人民银行')">中国人民银行</div> -->
          <div class="bank_list" @click="hand_bank('CTB', $t('Bank.CTB'))">{{ $t('Bank.CTB')}}</div>
          <div class="bank_list" @click="hand_bank('CUB', $t('Bank.CUB'))">{{ $t('Bank.CUB')}}</div>
          <div class="bank_list" @click="hand_bank('HXB', $t('Bank.HXB'))">{{ $t('Bank.HXB')}}</div>
          <div class="bank_list" @click="hand_bank('SPDB', $t('Bank.SPDB'))">{{ $t('Bank.SPDB')}}</div>
      </div>
    </div>
  </div>
  <mu-dialog :open="dialogAlipay" title="支付二维码" @close="close">
     <img style="width:100%" :src="alipay_payment_code_url_value" v-show="alipay_payment_code_url!=''&&!isAlipayQrcode"> 
     <qrcode style="width:100%"  :value="this.alipay_payment_code_url_value" :options="{ size: 120 }"  v-show="alipay_payment_code_url !=''&&isAlipayQrcode"></qrcode> 
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
  <mu-dialog :open="dialogWechat" title="支付二维码" @close="close">
     <img  style="width:100%" :src="wechat_payment_code_url_value" v-show="wechat_payment_code_url!=''&&!isWechatQrcode"> 
     <qrcode  style="width:100%" :value="this.wechat_payment_code_url_value" :options="{ size: 120 }"  v-show="wechat_payment_code_url !=''&&isWechatQrcode"></qrcode> 
    <mu-flat-button slot="actions" primary @click="close" label="确定"/>
  </mu-dialog>
  </div>

</template>

<script>
import nprogress from "nprogress";
import store from "../store";
import storage from "../models/storage";
import { SET_USER } from "../store/mutation-types";
import user from "../models/user";
import upload from "../utils/upload";
import HttpResultCode from "../utils/HttpResultCode";

export default {
  name: "pay",
  components: {},
  data() {
    return {
      toast: false,
      message: "",
      has_alipay: false,
      has_wechat_pay: false,
      has_bankcard: false,
      item: {},
      isAlipayShow: false,
      isWechatShow: false,
      isBankShow: false,
      pwd: "",
      alipay_name: "",
      alipay_account: "",
      alipay_payment_code_url: "",
      alipay_payment_code_url_value: "",
      wechat_name: "",
      wechat_account: "",
      wechat_payment_code_url: "",
      wechat_payment_code_url_value: "",
      bank_name: "",
      bank_code: "PINGAN",
      bank_code_value: this.$t("Bank.PINGAN"),
      branch_name: "",
      card_number: "",
      bank_name_error: "",
      pwd_error: "",
      branch_name_error: "",
      card_number_error: "",
      isBoundBankDialog: false,
      alipy_pwd: "",
      alipy_pwd_error: "",
      alipay_name_error: "",
      alipay_account_error: "",
      isBoundAlipayDialog: false,
      isBoundWechatDialog: false,
      alipay_uploading: false, //是否上传支付宝图片
      wechat_uploading: false,
      alipay_payment_img: {},
      wechat_pwd: "",
      wechat_pwd_error: "",
      wechat_name_error: "",
      wechat_account_error: "",
      maskOpen: false,
      isAlipayQrcode: false,
      isWechatQrcode: false,
      isShowAlipayProgress: false,
      isShowWechatProgress: false,
      dialogAlipay: false,
      dialogWechat: false,
      date_t: null,
      alipayType: "local",
      wechatType: "local"
    };
  },

  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    user
      .getSecurity()
      .then(result => {
        nprogress.done();
        let item = result.data;
        next(vm => {
          vm.item = item;
          vm.has_alipay = item.authentication.has_alipay;
          vm.has_wechat_pay = item.authentication.has_wechat_pay;
          vm.has_bankcard = item.authentication.has_bankcard;

          if (vm.has_alipay) {
            vm.alipay_name = item.authentication.alipay.name;
            vm.alipay_account = item.authentication.alipay.account;
            vm.alipay_payment_code_url =
              item.authentication.alipay.payment_code_url;
            if (vm.alipay_payment_code_url.indexOf("qrcode") == 0) {
              vm.alipay_payment_code_url_value = vm.alipay_payment_code_url.substr(
                6,
                vm.alipay_payment_code_url.length
              );
              vm.isAlipayQrcode = true;
            } else {
              vm.alipay_payment_code_url_value = vm.alipay_payment_code_url;
              vm.isAlipayQrcode = false;
            }
            if (
              vm.alipay_payment_code_url_value.indexOf("http") == 0 ||
              vm.alipay_payment_code_url_value.indexOf("HTTP") == 0
            ) {
            } else {
              vm.alipay_payment_code_url_value =
                "http:" + vm.alipay_payment_code_url_value;
            }
          }
          if (vm.has_wechat_pay) {
            vm.wechat_name = item.authentication.wechat_pay.name;
            vm.wechat_account = item.authentication.wechat_pay.account;
            vm.wechat_payment_code_url =
              item.authentication.wechat_pay.payment_code_url;
            if (vm.wechat_payment_code_url.indexOf("qrcode") == 0) {
              vm.wechat_payment_code_url_value = vm.wechat_payment_code_url.substr(
                6,
                vm.wechat_payment_code_url.length
              );
              vm.isWechatQrcode = true;
            } else {
              vm.wechat_payment_code_url_value = vm.wechat_payment_code_url;
              vm.isWechatQrcode = false;
            }
            if (
              vm.wechat_payment_code_url_value.indexOf("http") == 0 ||
              vm.wechat_payment_code_url_value.indexOf("HTTP") == 0
            ) {
            } else {
              vm.wechat_payment_code_url_value =
                "http:" + vm.wechat_payment_code_url_value;
            }
          }
          if (vm.has_bankcard) {
            vm.bank_name = item.authentication.bank_card.name;
            vm.bank_code = item.authentication.bank_card.bank_code;
            vm.bank_code_value = vm.$t("Bank." + vm.bank_code);
            vm.card_number = item.authentication.bank_card.card_number;
            vm.branch_name = item.authentication.bank_card.branch_name;
          }
        });
      })
      .catch(e => {
        nprogress.done();
        HttpResultCode.validate(e.code);
      });
  },
  methods: {
    open_Alipay() {
      if (this.alipay_payment_code_url_value != "") this.dialogAlipay = true;
    },
    open_Wechat() {
      if (this.wechat_payment_code_url_value != "") this.dialogWechat = true;
    },
    close() {
      this.dialogAlipay = false;
      this.dialogWechat = false;
    },
    openmask() {
      this.maskOpen = true;
    },
    closemask() {
      this.maskOpen = false;
    },
    goBack() {
      this.$router.go(-1);
    },
    isShowQrcode(address) {
      if (address == undefined) {
        return false;
      }
      if (address != "" && address.indexOf("qrcode") == 0) {
        return true;
      }
      return false;
    },
    getAddress(address) {
      if (address.indexOf("qrcode") != 0) {
        return address;
      } else {
      }
    },
    openAlipay() {
      this.isAlipayShow = !this.isAlipayShow;
      this.isWechatShow = false;
      this.isBankShow = false;
    },
    openWechat() {
      this.isWechatShow = !this.isWechatShow;
      this.isAlipayShow = false;
      this.isBankShow = false;
    },
    openBank() {
      this.isBankShow = !this.isBankShow;
      this.isAlipayShow = false;
      this.isWechatShow = false;
    },
    hand_bank(key, value) {
      this.maskOpen = false;
      this.bank_code_value = value;
      this.bank_code = key;
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
    commit_alipay_dialog() {
      if (this.alipay_name.length < 1 || this.alipay_name.length > 52) {
        this.showToast(this.$t("User.AlipayTip4"));
        this.alipay_name_error = " ";
        return;
      }
      if (this.alipay_account.length < 1 || this.alipay_account.length > 52) {
        this.showToast(this.$t("User.AlipayTip5"));
        this.alipay_account_error = " ";
        return;
      }
      if (this.alipy_pwd.length < 1 || this.alipy_pwd.length > 52) {
        this.alipy_pwd_error = " ";
        this.showToast(this.$t("User.AlipayTip6"));
        return;
      }
      if (this.alipay_payment_code_url.length == 0) {
        this.showToast(this.$t("User.AlipayTip1"));
        return;
      }

      this.isBoundAlipayDialog = true;
    },
    commit_wechat_dialog() {
      if (this.wechat_name.length < 1 || this.wechat_name.length > 52) {
        this.showToast(this.$t("User.WechatTip4"));
        this.wechat_name_error = " ";
        return;
      }
      if (this.wechat_account.length < 1 || this.wechat_account.length > 52) {
        this.showToast(this.$t("User.WechatTip5"));
        this.wechat_account_error = " ";
        return;
      }
      if (this.wechat_pwd.length < 1 || this.wechat_pwd.length > 52) {
        this.showToast(this.$t("User.AlipayTip6"));
        this.wechat_pwd_error = " ";
        return;
      }
      if (this.wechat_payment_code_url.length == 0) {
        this.showToast(this.$t("User.WechatTip1"));
        return;
      }
      this.isBoundWechatDialog = true;
    },
    commit_bank_dialog() {
      if (this.bank_name.length < 1 || this.bank_name.length > 52) {
        this.showToast(this.$t("User.bankUserNameHintTip"));
        this.bank_name_error = "  ";
        return;
      }
      if (this.branch_name.length < 4 || this.branch_name.length > 64) {
        this.showToast(this.$t("User.openBankNameHint"));
        this.branch_name_error = " ";
        return;
      }

      if (this.card_number.length < 4 || this.card_number.length > 20) {
        this.showToast(this.$t("User.bankCardNumberHint"));
        this.card_number_error = "  ";
        return;
      }

      if (this.pwd.length == 0) {
        this.showToast(this.$t("User.AlipayTip6"));
        this.pwd_error = " ";
        return;
      }
      this.isBoundBankDialog = true;
    },

    input_focus(select) {
      if (select == "bank_name") {
        this.bank_name_error = "";
      }
      if (select == "branch_name") {
        this.branch_name_error = "";
      }
      if (select == "card_number") {
        this.card_number_error = "";
      }
      if (select == "pwd") {
        this.pwd_error = "";
      }
      if (select == "alipy_pwd") {
        this.alipy_pwd_error = "";
      }
      if (select == "alipay_name") {
        this.alipay_name_error = "";
      }
      if (select == "alipay_account") {
        this.alipay_account_error = "";
      }
      if (select == "wechat_pwd") {
        this.wechat_pwd_error = "";
      }
      if (select == "wechat_name") {
        this.wechat_name_error = "";
      }
      if (select == "wechat_account") {
        this.wechat_account_error = "";
      }
    },
    closeDialog() {
      this.isBoundBankDialog = false;
      this.isBoundAlipayDialog = false;
      this.isBoundWechatDialog = false;
    },
    bank_submit: function() {
      this.isBoundBankDialog = false;
      if (this.bank_name.length < 1 || this.bank_name.length > 16) {
        this.showToast(this.$t("User.bankUserNameHintTip"));
        this.bank_name_error = "  ";
        return;
      }
      if (this.branch_name.length < 4 || this.branch_name.length > 64) {
        this.showToast(this.$t("User.openBankNameHint"));
        this.branch_name_error = " ";
        return;
      }

      if (this.card_number.length < 4 || this.card_number.length > 20) {
        this.showToast(this.$t("User.bankCardNumberHint"));
        this.card_number_error = "  ";
        return;
      }

      if (this.pwd.length == 0) {
        this.showToast(this.$t("User.AlipayTip6"));
        this.pwd_error = " ";
        return;
      }
      // console.log('jhkldsfkfghjksdfghld jildsfhglkjsdhfgljsdh ')
      user
        .bindBank(
          this.bank_code,
          this.pwd,
          this.card_number,
          this.branch_name,
          this.bank_name
        )
        .then(data => {
          this.showToast(this.$t("User.bankTip1"));
          this.isBankShow = false;
          this.has_bankcard = true;
          this.pwd = "";
        })
        .catch(e => {
          this.pwd = "";
          switch (e.code) {
            case 1023:
              this.showToast(this.$t("User.AlipayTip6"));
              this.pwd_error = "  ";
              break;
            default:
              this.showToast(HttpResultCode.validate(e.code));
          }
          // this.showToast( HttpResultCode.validate(e.code))
        });
    },
    // upload_alipay_img: function (e) {
    //     this.alipay_uploading = true

    //     if(e.target.files.length === 0 ){
    //       this.alipay_uploading = false
    //       return false
    //     }
    //     let file = e.target.files[0]
    //     if(!upload.verify(file.name)){
    //       this.alipay_uploading = false
    //       return false
    //     }

    //     let reader = new FileReader()
    //     reader.readAsDataURL(file)
    //     reader.onload = (reader_result) => {
    //       let file_data = reader_result.target.result
    //       this.upload_img(file, 'ALIPAY_CODE').then(data => {
    //         this.alipay_uploading = false
    //         this.alipay_payment_code_url = data.url
    //         this.alipay_payment_img = file_data
    //         e.target.value = ''
    //       }).catch((e) => {
    //         this.showToast( "图片上传失败，请重试。")
    //         this.alipay_uploading = false
    //         e.target.value = ''
    //       })
    //     }
    //   },
    upload_alipay_img: function(e) {
      if (this.isShowWechatProgress) {
        this.showToast("正在处理微信支付图片，请稍后...");
        return;
      }
      if (this.isShowAlipayProgress) {
        this.showToast("正在处理，请稍后...");
        return;
      }
      this.alipay_uploading = true;

      if (e.target.files.length === 0) {
        this.alipay_uploading = false;
        return false;
      }
      let file = e.target.files[0];
      if (!upload.verify(file.name)) {
        this.alipay_uploading = false;
        return false;
      }
      if (this.alipayType == "local") {
        this.isAlipayQrcode = false;
        this.upload_alipay_img_local(file);
      } else {
        this.isAlipayQrcode = true;
        this.upload_alipay_img_qr(file);
      }
    },
    upload_alipay_img_local: function(file) {
      this.isShowAlipayProgress = true;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = reader_result => {
        let file_data = reader_result.target.result;
        this.upload_img(file, "ALIPAY_CODE")
          .then(data => {
            //  console.log('data = '+data)
            data = JSON.parse(data);
            data = data.data;
            this.isShowAlipayProgress = false;
            this.alipay_uploading = false;
            this.alipay_payment_code_url = data.url;
            this.alipay_payment_img = file_data;
            this.alipay_payment_code_url_value = this.alipay_payment_code_url;
            this.isWechatQrcode = false;
            //   e.target.value = ''
          })
          .catch(e => {
            this.isShowAlipayProgress = false;
            this.showToast("图片上传失败，请重试。");
            this.alipay_uploading = false;
            // e.target.value = ''
          });
      };
    },
    upload_alipay_img_qr: function(file) {
      var o = [];
      var reader = new FileReader();
      var let_this = this;
      this.isShowAlipayProgress = true;
      url_pay = "";
      this.update_date();
      reader.onload = (function(theFile) {
        return function(e) {
          qrcode.decode(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    },
    upload_img: function(file, type) {
      return new Promise((resolve, reject) => {
        upload
          .uploadImg(file, type)
          .then(data => {
            resolve(data);
          })
          .catch(e => {
            //  console.log('432`1');
            this.showToast("图片上传失败，请重试。");
            reject();
          });
      });
    },
    upload_wechat_img: function(e) {
      if (this.isShowAlipayProgress) {
        this.showToast("正在处理支付宝图片，请稍后...");
        return;
      }
      if (this.isShowWechatProgress) {
        this.showToast("正在处理，请稍后...");
        return;
      }
      this.wechat_uploading = true;
      if (e.target.files.length === 0) {
        this.wechat_uploading = false;

        return false;
      }
      let file = e.target.files[0];
      if (!upload.verify(file.name)) {
        this.wechat_uploading = false;
        return false;
      }
      if (this.wechatType == "local") {
        this.isWechatQrcode = false;
        this.upload_wechat_img_local(file);
      } else {
        this.isWechatQrcode = true;
        this.upload_wechat_img_qr(file);
      }
    },
    upload_wechat_img_qr: function(file) {
      var o = [];
      var reader = new FileReader();
      var let_this = this;
      this.isShowWechatProgress = true;
      url_pay = "";
      this.update_date();
      reader.onload = (function(theFile) {
        return function(e) {
          qrcode.decode(e.target.result);
        };
      })(file);
      reader.readAsDataURL(file);
    },
    update_date: function() {
      if (url_pay != "") {
        clearTimeout(this.date_t);
        if (url_pay.indexOf("http") == -1 && url_pay.indexOf("HTTP") == -1) {
          //  this.isAlipayQrcode = true
          this.isShowAlipayProgress = false;
          // this.isWechatQrcode = true
          this.isShowWechatProgress = false;
          this.showToast("请联系客服，或按正常流程截取支付图片。");
          return;
        }
        if (this.isShowAlipayProgress) {
          this.alipay_payment_code_url = "qrcode" + url_pay;
          this.alipay_payment_code_url_value = url_pay;
          this.isAlipayQrcode = true;
          this.isShowAlipayProgress = false;
        }
        if (this.isShowWechatProgress) {
          this.wechat_payment_code_url = "qrcode" + url_pay;
          this.wechat_payment_code_url_value = url_pay;
          this.isWechatQrcode = true;
          this.isShowWechatProgress = false;
        }
        return;
      }
      this.date_t = setTimeout(() => {
        this.update_date();
      }, 1000);
    },

    upload_wechat_img_local: function(file) {
      let reader = new FileReader();
      this.isShowWechatProgress = true;
      reader.readAsDataURL(file);
      reader.onload = reader_result => {
        //  this.isShowWechatProgress = false
        let file_data = reader_result.target.result;
        this.upload_img(file, "WECHAT_CODE")
          .then(data => {
            // console.log('data = '+data)
            data = JSON.parse(data);
            data = data.data;
            this.isShowWechatProgress = false;
            this.wechat_uploading = false;
            this.wechat_payment_code_url = data.url;
            this.wechat_payment_code_url_value = this.wechat_payment_code_url;
            // this.alipay_payment_img = file_data
            //    e.target.value = ''
          })
          .catch(e => {
            this.isShowWechatProgress = false;
            this.showToast("图片上传失败，请重试。");
            this.wechat_uploading = false;
            //    e.target.value = ''
          });
      };
    },
    alipay_submit() {
      this.isBoundAlipayDialog = false;
      if (this.alipay_payment_code_url.length == 0) {
        this.showToast(this.$t("User.Tip1"));
        return;
      }
      if (this.alipay_name.length < 1 || this.alipay_name.length > 52) {
        this.showToast(this.$t("User.AlipayTip4"));
        this.alipay_name_error = " ";
        return;
      }
      if (this.alipay_account.length < 1 || this.alipay_account.length > 52) {
        this.showToast(this.$t("User.AlipayTip5"));
        this.alipay_account_error = " ";
        return;
      }
      if (this.alipy_pwd.length < 1 || this.alipy_pwd.length > 52) {
        this.showToast(this.$t("User.AlipayTip6"));
        this.alipy_pwd_error = " ";
        return;
      }
      user
        .bindAlipay(
          this.alipay_name,
          this.alipay_payment_code_url,
          this.alipay_account,
          this.alipy_pwd
        )
        .then(data => {
          this.showToast(this.$t("User.AlipayTip2"));
          this.isAlipayShow = false;
          this.has_alipay = true;
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.alipy_pwd_error = "  ";
              this.showToast(this.$t("User.AlipayTip6"));
              break;
            default:
              this.showToast(HttpResultCode.validate(e.code));
          }
          // this.showToast( HttpResultCode.validate(e.code))
        });
    },
    wechat_submit() {
      this.isBoundWechatDialog = false;
      if (this.wechat_name.length < 1 || this.wechat_name.length > 52) {
        this.showToast(this.$t("User.WechatTip4"));
        this.wechat_name_error = " ";
        return;
      }
      if (this.wechat_account.length < 1 || this.wechat_account.length > 52) {
        this.showToast(this.$t("User.WechatTip5"));
        this.wechat_account_error = " ";
        return;
      }
      if (this.wechat_pwd.length < 1 || this.wechat_pwd.length > 52) {
        this.showToast(this.$t("User.AlipayTip6"));
        this.wechat_pwd_error = " ";
        return;
      }
      if (this.wechat_payment_code_url.length == 0) {
        this.showToast(this.$t("User.WechatTip1"));
        return;
      }
      user
        .bindWx(
          this.wechat_name,
          this.wechat_payment_code_url,
          this.wechat_account,
          this.wechat_pwd
        )
        .then(data => {
          this.showToast(this.$t("User.WechatTip2"));
          this.isWechatShow = false;
          this.has_wechat_pay = true;
        })
        .catch(e => {
          switch (e.code) {
            case 1023:
              this.wechat_pwd_error = "  ";
              this.showToast(this.$t("User.AlipayTip6"));
              break;
            default:
              this.showToast(HttpResultCode.validate(e.code));
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/pay.scss";
</style>
