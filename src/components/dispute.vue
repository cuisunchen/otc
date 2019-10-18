<template>
  <div class="content">
    <!-- <mu-linear-progress /> -->
    <mu-toast v-if="toast" :message="message" @close="hideToast"/>
    <div class="top">
      <div class="center fs-16">{{$t('Text.dispute')}}</div>
      <div class="left" @click="goBack" />
    </div>
    <div class="fs-15" style="background:#F5F7FA;color:#4E586E;font-weight:500;padding-left:1.13rem;line-height:3;text-align: left">{{$t('Text.glddid') +this.id}}</div>
     <div class="publish-crypto-currency-item">
        <div class="fs-14 txt">{{$t('Text.sslx')}}</div>
        <!-- <mu-select-field v-model="title" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow" >
          <mu-menu-item   v-for="(item) in this.coinList" :key="item"   :value="item" :title="item" />
        </mu-select-field> -->
          <div class="select-list" @click="showPop()">
          <span>{{ title }}</span>
          <div class="img-arrow"></div>
        </div>
      </div>
  <div style="background:#F3F5F7;width:100%;height:0.5em;"></div>
     <div class="login-pay">
       <div class="txt">{{$t('Text.complaint')}}</div>
       <div class="pay-text-zone">
        <mu-text-field  v-model.trim="alipay_account" class="mu-text-field-input" :hintText="$t('Text.brxcg500')" fullWidth multiLine :underlineShow="false" :rows="3" :rowsMax="6"   @focus="input_focus('alipay_account')"  :errorText="alipay_account_error"/>
      </div>
      <div class="img-tips">{{$t('Text.tjcl')}}</div>
      <div class="pay-qr-zone">     
         <div class="pay-qr-btn">
           <input type="file" accept="image/*"   @change="upload_alipay_img">
        </div> 
         <mu-circular-progress :size="30" color="#3d9cee" v-show="isShowAlipayProgress" />                              
        <div style="position:relative;" >
          <img  @click="open_Alipay(alipay_payment_code_url_value)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:0px;" :src="alipay_payment_code_url_value" v-show="alipay_payment_code_url_value!=''"> 
          <img  @click="open_Alipay(alipay_payment_code_url_value1)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:33%;" :src="alipay_payment_code_url_value1" v-show="alipay_payment_code_url_value1!=''"> 
          <img  @click="open_Alipay(alipay_payment_code_url_value2)" style="display:block;width:30%;height:100%;position:absolute;top:0px;left:66%;" :src="alipay_payment_code_url_value2" v-show="alipay_payment_code_url_value2!=''"> 
        </div>
       
        
      </div>
      <!-- <div style="color:#6D778B;font-size:0.8em;padding-left:1em;text-align: left;">{{$t('Text.tjcl') }}</div> -->
      <div class="btn-zone">
        <mu-raised-button  :label="$t('Text.complaint_submit')" @click="seller_submit" class="btn fs-18" fullWidth primary/>
      </div>
      </div>
  
 
  
      <!-- <BottomNav></BottomNav> -->
         <PopupPicker
          ref="popupPicker"
          v-model="title"
          :picker-data="coinList"
          :cols="1"
          :on-confirm="confirmHandler"
        ></PopupPicker>
   
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
  <mu-dialog :open="dialogAlipay" :title="$t('Text.dispute')" @close="close">
     <img style="width:100%" :src="alipay_payment_code_url_value_current" v-show="alipay_payment_code_url_value_current!=''&&!isAlipayQrcode"> 

    <mu-flat-button slot="actions" primary @click="close" :label="$t('Text.sure')"/>
    <mu-flat-button slot="actions" primary @click="deleteUrl" :label="$t('Text.delete')"/>
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
import order from "../models/order";
import PopupPicker from "../common/PopupPicker";
// import BottomNav from "../components/BottomNav";


export default {
  name: "dispute",
  components: {
    PopupPicker
  },
  data() {
    return {
      toast: false,
      id:this.$route.params.id,
      symbol: this.$route.params.symbol, 
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
      alipay_payment_code_url_value_current: "",
      alipay_payment_code_url_value: "",
      alipay_payment_code_url_value1:"",
      alipay_payment_code_url_value2:"",
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
      title:this.$t("Text.dzzjbz"),
      // title:'',
      coinList: [[{id:this.$t("Text.dzzjbz"),name:this.$t("Text.dzzjbz")}]],
      wechatType: "local"
    };
  },

  // beforeRouteEnter(to, from, next) {
  //   nprogress.set(0.6);
  //   // 参数初始化
  //   user
  //     .getSecurity()
  //     .then(result => {
  //       nprogress.done();
  //       let item = result.data;
  //       next(vm => {
  //         vm.item = item;
  //         vm.has_alipay = item.authentication.has_alipay;
  //         vm.has_wechat_pay = item.authentication.has_wechat_pay;
  //         vm.has_bankcard = item.authentication.has_bankcard;

  //         if (vm.has_alipay) {
  //           vm.alipay_name = item.authentication.alipay.name;
  //           vm.alipay_account = item.authentication.alipay.account;
  //           vm.alipay_payment_code_url =
  //             item.authentication.alipay.payment_code_url;
  //           if (vm.alipay_payment_code_url.indexOf("qrcode") == 0) {
  //             vm.alipay_payment_code_url_value = vm.alipay_payment_code_url.substr(
  //               6,
  //               vm.alipay_payment_code_url.length
  //             );
  //             vm.isAlipayQrcode = true;
  //           } else {
  //             vm.alipay_payment_code_url_value = vm.alipay_payment_code_url;
  //             vm.isAlipayQrcode = false;
  //           }
  //           if (
  //             vm.alipay_payment_code_url_value.indexOf("http") == 0 ||
  //             vm.alipay_payment_code_url_value.indexOf("HTTP") == 0
  //           ) {
  //           } else {
  //             vm.alipay_payment_code_url_value =
  //               "http:" + vm.alipay_payment_code_url_value;
  //           }
  //         }
  //         if (vm.has_wechat_pay) {
  //           vm.wechat_name = item.authentication.wechat_pay.name;
  //           vm.wechat_account = item.authentication.wechat_pay.account;
  //           vm.wechat_payment_code_url =
  //             item.authentication.wechat_pay.payment_code_url;
  //           if (vm.wechat_payment_code_url.indexOf("qrcode") == 0) {
  //             vm.wechat_payment_code_url_value = vm.wechat_payment_code_url.substr(
  //               6,
  //               vm.wechat_payment_code_url.length
  //             );
  //             vm.isWechatQrcode = true;
  //           } else {
  //             vm.wechat_payment_code_url_value = vm.wechat_payment_code_url;
  //             vm.isWechatQrcode = false;
  //           }
  //           if (
  //             vm.wechat_payment_code_url_value.indexOf("http") == 0 ||
  //             vm.wechat_payment_code_url_value.indexOf("HTTP") == 0
  //           ) {
  //           } else {
  //             vm.wechat_payment_code_url_value =
  //               "http:" + vm.wechat_payment_code_url_value;
  //           }
  //         }
  //         if (vm.has_bankcard) {
  //           vm.bank_name = item.authentication.bank_card.name;
  //           vm.bank_code = item.authentication.bank_card.bank_code;
  //           vm.bank_code_value = vm.$t("Bank." + vm.bank_code);
  //           vm.card_number = item.authentication.bank_card.card_number;
  //           vm.branch_name = item.authentication.bank_card.branch_name;
  //         }
  //       });
  //     })
  //     .catch(e => {
  //       nprogress.done();
  //       HttpResultCode.validate(e.code);
  //     });
  // },
  created() {
    // this.$nextTick(()=>{
    //   this.coinList = [this.$t("Text.dzzjbz")];
    // })
    // this.coinList = [this.$t("Text.dzzjbz")];
    this.load_trade();
  },
  methods: {
    load_trade: function() {
         let params = {
            "symbol":this.symbol.toLowerCase(),
	          "tid":this.id
          }

    order
      .USER_otc_get_trade(params)
        .then(result => {
           this.disputeJSON  =  result.data.dispute;
           if(this.disputeJSON!=null){
              this.alipay_account = this.disputeJSON.seller_content
              this.alipay_payment_code_url_value = this.disputeJSON.pic1
              this.alipay_payment_code_url_value1 = this.disputeJSON.pic2
              this.alipay_payment_code_url_value2 = this.disputeJSON.pic3
           }

            //  this.dialogAlipay = true;
          this.process_trade(trade);
        })
        .catch(function() {
          // TODO 异常处理
        });
    },
    open_Alipay(currentUrl) {
      if (currentUrl != "") {
        this.alipay_payment_code_url_value_current = currentUrl

           this.dialogAlipay = true;
      }
   
    },
    open_Wechat() {
      if (this.wechat_payment_code_url_value != "") this.dialogWechat = true;
    },
    confirmHandler(data) {
      console.log(data.str)
      this.title = data.str
    },
     showPop() {
      this.$refs.popupPicker.showPop();
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
    deleteUrl(){
       this.dialogAlipay = false;
        if( this.alipay_payment_code_url_value_current==this.alipay_payment_code_url_value){
          this.alipay_payment_code_url_value = ""
        }
        if( this.alipay_payment_code_url_value_current==this.alipay_payment_code_url_value1){
          this.alipay_payment_code_url_value1 = ""
        }
        if( this.alipay_payment_code_url_value_current==this.alipay_payment_code_url_value2){
          this.alipay_payment_code_url_value2 = ""
        }
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
    

    seller_submit(){
       if(this.alipay_account==''){
       this.showToast(this.$t("Text.brxcg500Tip"));
         
         return
       }
        
       let params = {
         "tid":this.id,
        "content":this.title+this.alipay_account,
        "pic1":this.alipay_payment_code_url_value,
        "pic2":this.alipay_payment_code_url_value1,
        "pic3":this.alipay_payment_code_url_value2
       }

       order.USER_OTC_dispute_seller_submit(params)
        .then(result => {
          if (result.code === 0) {
              this.$router.go(-1);
          }
        })
        .catch(e => {
   
        });
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
         
          this.showToast( e.message)
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
        this.upload_img(file, this.id)
          .then(data => {
            data = JSON.parse(data);
            data = data.data;
            this.isShowAlipayProgress = false;
            this.alipay_uploading = false;
            this.alipay_payment_code_url = data.url;
            this.alipay_payment_img = file_data;
            if(this.alipay_payment_code_url_value==''){
                this.alipay_payment_code_url_value =data.url;
                return
            }
            if(this.alipay_payment_code_url_value1==''){
                this.alipay_payment_code_url_value1 = data.url;
                 return
            }
            if(this.alipay_payment_code_url_value2==''){
                this.alipay_payment_code_url_value2 = data.url;
                 return
            }
          })
          .catch(e => {
            // alert(JSON.stringify(e))
            this.isShowAlipayProgress = false;
            this.showToast("图片上传失败，请重试。");
            this.alipay_uploading = false;
            // e.target.value = ''
          });
      };
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
  
  
    // update_date: function() {
    //   if (url_pay != "") {
    //     clearTimeout(this.date_t);
    //     if (url_pay.indexOf("http") == -1 && url_pay.indexOf("HTTP") == -1) {
    //       //  this.isAlipayQrcode = true
    //       this.isShowAlipayProgress = false;
    //       // this.isWechatQrcode = true
    //       this.isShowWechatProgress = false;
    //       this.showToast("请联系客服，或按正常流程截取支付图片。");
    //       return;
    //     }
    //     if (this.isShowAlipayProgress) {
    //       this.alipay_payment_code_url = "qrcode" + url_pay;
    //       this.alipay_payment_code_url_value = url_pay;
    //       this.isAlipayQrcode = true;
    //       this.isShowAlipayProgress = false;
    //     }
    //     if (this.isShowWechatProgress) {
    //       this.wechat_payment_code_url = "qrcode" + url_pay;
    //       this.wechat_payment_code_url_value = url_pay;
    //       this.isWechatQrcode = true;
    //       this.isShowWechatProgress = false;
    //     }
    //     return;
    //   }
    //   this.date_t = setTimeout(() => {
    //     this.update_date();
    //   }, 1000);
    // },

  
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
         
          this.showToast(e.message)
        });
    },

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/pay.scss";
</style>
