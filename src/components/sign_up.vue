<template>
  <div class="content-sign-up">
    <mu-toast v-if="toast" :message="message" @close="hideToast" />
    <div style="    background:white;">
      <div class="top">
        <!-- <div class="center" v-show="!isLogin">{{"+"+country_code}}</div> -->
        <!-- <div class="right" @click="signIn"> 

          {{$t('SignIn.Title')}} 

        </div>-->
        <div v-show="!isLogin"
          class="fs-16"
          style="color: #2E3546;line-height: 3em;">
          {{this.$t("SignIn.SelectCountry")}}</div>
        <div class="left" @click="goBack" />
      </div>
      <!-- <div class="banner">
      <div class="logo"></div>
   
      </div>-->
      <div v-show="isLogin">
        <div class="title">{{this.$t("SignIn.Right1")}}</div>

        <div class="login">
          <mu-auto-complete
            v-model.trim="name"
            class="input-zone"
            :hintText="$t('SignUp.UserNameHint')"
            fullWidth
            @focus="input_focus('name')"
            :errorText="name_error"
          />
          <div class="captcha-zone">
            <mu-auto-complete
              v-model.trim="mobile"
              class="input-zone1"
              :hintText="$t('SignIn.AccountPlaceholder')"
              fullWidth
              @focus="input_focus('mobile')"
              :errorText="mobile_error"
            />
            <div class="captcha1" @click="selectCountCode">
              <span class="fs-16" style="color:#005EE4;">{{"+"+country_code}}</span>
              <span class="gap"></span>
              <!-- +86 -->
              <!-- <mu-select-field v-model="country_code" :labelFocusClass="['label-foucs']" class="mu-dropDown-menu-text-overflow"  @change="handleChange">
              <mu-menu-item   v-for="(item) in this.codeList" :key="item.name"   :value="item.value" :title="item.name" />
              </mu-select-field>-->
            </div>
          </div>
          <!-- <mu-auto-complete  v-model.trim="mobile" class="input-zone" :hintText="$t('SignIn.Mobile')" fullWidth @focus="input_focus('mobile')" :errorText="mobile_error" /> -->
          <div class="captcha-zone">
            <mu-auto-complete
              v-model.trim="captcha"
              class="input-zone"
              :hintText="$t('SignIn.TypeImageCodePlaceholder')"
              fullWidth
              @focus="input_focus('captcha')"
              :errorText="captcha_error"
            ></mu-auto-complete>
            <div
              class="captcha"
              :style="{backgroundImage: 'url('+ captcha_img + ')'}"
              @click="captcha_refresh"
            >
              <!-- <button class="captcha-btn" v-show="first_step"   @click="captcha_refresh">{{send_code_txt}}</button> -->
            </div>
          </div>

          <div v-show="isNext" class="captcha-zone">
            <mu-auto-complete
              v-model.trim="code"
              class="input-zone"
              :hintText="$t('SignIn.CodeMobilePlaceholder')"
              fullWidth
              @focus="input_focus('code')"
              :errorText="code_error"
            ></mu-auto-complete>
            <div class="div-send-code" @click="send_code">{{refresh_txt}}</div>
          </div>
          <mu-text-field
            v-show="isNext"
            v-model.trim="pwd"
            class="input-zone"
            :hintText="$t('SignUp.PasswordHint')"
            type="password"
            fullWidth
            @focus="input_focus('pwd')"
            :errorText="pwd_error"
          />
          <div v-show="isNext" class="captcha-zone">
            <mu-auto-complete
              v-model.trim="referral_code"
              class="input-zone"
              :hintText="$t('Text.yqmbt')"
              fullWidth
              @focus="input_focus('referral_code')"
              :errorText="referral_code_error"
            ></mu-auto-complete>
          </div>

          <!-- <p v-show="isNext"  class="p-tip">建议密码不要设置和其他平台密码相同。</p>  -->
          <!-- <div v-show="isNext" class="clause">
        <img src="../assets/image/icon_check_p.png" style=" width: 1em;height: 1em;"/>
        {{$t('SignUp.SignClauseLabel')}}<a target="_blank" :href="'/'+ $locale.current() + '/agreement.html'">{{$t('SignUp.SignClause')}}</a>
          </div>-->

          <!-- <div  @click="downApp"><a  class="a-down" v-show="isDown" href="https://m.firefoxotc.com/download/android">APP下载</a>
          <a  class="a-down" v-show="isISO" href="https://www.pgyer.com/Hfcr">APP下载</a></div>-->
        </div>

        <mu-raised-button
          v-show="!isNext"
          :label="$t('SignIn.sendCode')"
          @click="send_code"
          class="btn btn-default"
          fullWidth
          primary
        />
        <mu-raised-button
          v-show="isNext"
          :label="$t('SignIn.Right')"
          @click="sign_up"
          class="btn btn-default"
          fullWidth
          primary
        />

        <!-- <mu-toast v-if="toast" :message="message" @close="hideToast"/> -->
        <a class="go_index" @click="goIndex">
          <span style="color:#6D778B">{{$t('Text.yyzh') }}</span>
          {{$t('SignIn.Title') }}
        </a>

        <!-- <a class="go_index1">
          
        </a> -->
        <div class="fs-12 terms-wrap">
          <span style="color:#6D778B">{{$t('SignUp.TermsHint') }}</span>
          <span style="color:#005EE4;"
            @click="goToTerms()">{{$t('SignUp.TermsAndPolicy') }}</span>
          </div>
        <a class="go_index2" @click="goIndex"></a>
      </div>

      <div v-show="!isLogin" style="background:#FFFFFF;">
        <div v-for="(item) in this.codeList" :key="item.value">
          <div class="select-country-item"
            @click="onClickCountryCode(item)"
          >{{item.name}} ({{'+'+item.value}})</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";

import { CAPTCHA_SIGNUP } from "../models/url";

export default {
  name: "sign_up",
  components: {},
  data() {
    return {
      selected: "",
      toast: false,
      message: "",
      isDisabled: false,
      is_sending_code: false,
      // country_code_options: COUNTRY_CODE,

      first_step: true,

      captcha_ok: true,
      step_one: true,

      code_ok: false,

      name: "",
      name_error: "",

      country_code: "86",
      codeList: [
        { name: this.$t("Text.c86"), value: "86" },
        { name: this.$t("Text.c81"), value: "81" },
        { name: this.$t("Text.c852"), value: "852" },
        { name: this.$t("Text.c886"), value: "886" },
        { name: this.$t("Text.c82"), value: "82" },
        { name: this.$t("Text.c7"), value: "7" },
        { name: this.$t("Text.c380"), value: "380" },
        { name: this.$t("Text.c375"), value: "375" },
        { name: this.$t("Text.c963"), value: "963" },
        { name: this.$t("Text.c971"), value: "971" },
        { name: this.$t("Text.c98"), value: "98" },
        { name: this.$t("Text.c90"), value: "90" },
        { name: this.$t("Text.c972"), value: "972" },
        { name: this.$t("Text.c66"), value: "66" },
        { name: this.$t("Text.c91"), value: "91" },
        { name: this.$t("Text.c855"), value: "855" },
        { name: this.$t("Text.c84"), value: "84" },
        { name: this.$t("Text.c95"), value: "95" },
        { name: this.$t("Text.c55"), value: "55" },
        { name: this.$t("Text.c54"), value: "54" },
        { name: this.$t("Text.c53"), value: "53" },
        { name: this.$t("Text.c52"), value: "52" },
        { name: this.$t("Text.c57"), value: "57" },
        { name: this.$t("Text.c385"), value: "385" },
        { name: this.$t("Text.c351"), value: "351" },
        { name: this.$t("Text.c49"), value: "49" },
        { name: this.$t("Text.c33"), value: "33" },
        { name: this.$t("Text.c39"), value: "39" },
        { name: this.$t("Text.c31"), value: "31" },
        { name: this.$t("Text.c34"), value: "34" },
        { name: this.$t("Text.c46"), value: "46" },
        { name: this.$t("Text.c41"), value: "41" },
        { name: this.$t("Text.c48"), value: "48" },
        { name: this.$t("Text.c30"), value: "30" },
        { name: this.$t("Text.c43"), value: "43" },
        { name: this.$t("Text.c65"), value: "65" },
        { name: this.$t("Text.c60"), value: "60" },
        { name: this.$t("Text.c62"), value: "62" },
        { name: this.$t("Text.c92"), value: "92" },
        { name: this.$t("Text.c44"), value: "44" },
        { name: this.$t("Text.c1"), value: "1" },
        { name: this.$t("Text.c61"), value: "61" }
      ],
      isLogin: true,

      mobile: "",
      mobile_error: "",

      code: "",
      code_error: "",

      pwd: "",
      pwd_error: "",

      captcha: "",
      captcha_error: "",

      isNext: false,
      referral_code: "",
      timestamp: new Date().getTime(),
      first_step: true,
      send_code_txt: this.$t("SignIn.getCode"),
      refresh_txt: this.$t("SignIn.getCode"),
      refresh_timer: [],
      isDown: false,
      isISO: false,
      referral_code_error: "",
      open: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {
    // this.isDown = this.isAndroid_ios();
    // this.isISO = this.isIos();
    var url = window.location.href;
    if (url.indexOf("?") != -1) {
      url = url.split("?")[1];
      if (url.indexOf("=") != -1) {
        url = url.split("=")[1];
        while (url.indexOf("%3D") != -1) {
          url = url.replace("%3D", "=");
        }
        if (url.indexOf("&nsukey") != -1) {
          url = url.split("&nsuke")[0];
        }
        this.referral_code = url;
        // this.invitationCode = this.invitationCode.substring(0, 8);
      }
    }
  },
  computed: {
    captcha_img: function() {
      return CAPTCHA_SIGNUP + "?_t=" + this.timestamp;
    }
  },
  methods: {
    goBack() {
      if (this.isLogin) {
        this.$router.go(-1);
      } else {
        this.isLogin = true;
      }
    },
    selectCountCode() {
      this.isLogin = false;
    },
    toggleMenu() {
      this.$emit("toggle");
    },
    captcha_refresh: function() {
      this.send_code_txt = "";
      this.first_step = false;
      this.timestamp = new Date().getTime();
    },
    onClickCountryCode(item) {
      this.country_code = item.value;
      this.isLogin = true;
    },
    handleChange(val) {
      // this.crypto_currency = val;
      // this.$store.commit(SET_CRYPTO_CURRENCY, this.crypto_currency);
      // this.offset_buy = 0;
      // this.offset_sell = 0;
      // this.loading = false;
      // if (this.tab == "tab1") {
      //   this.is_buy = false;
      // }
      // if (this.tab == "tab2") {
      //   this.is_buy = true;
      // }
      // this.buys = [];
      // this.sells = [];
      // this.loadMore();
    },
    toggle() {
      this.open = !this.open;
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
    },
    goToTerms() {
      this.$router.push("/terms_and_privacy");
    },
    goIndex() {
      this.$router.push("/sign_in");
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
    set_active: function(selected) {
      this.selected = selected;
    },
    input_focus: function(selected) {
      if (selected === "name") {
        this.name_error = "";
      }

      if (selected === "mobile") {
        this.mobile_error = "";
      }

      if (selected === "captcha") {
        this.captcha_error = "";
      }

      if (selected === "code") {
        this.code_error = "";
      }

      if (selected === "pwd") {
        this.pwd_error = "";
      }
      if (selected === "referral_code") {
        this.referral_code_error = "";
      }
    },
    send_code: function() {
      if (this.refresh_txt != this.$t("SignIn.getCode")) {
        this.showToast(this.refresh_txt + "S " + this.$t("SignIn.sendCodeTip"));
        return;
      }
      if (this.name.length < 4 || this.name.length > 14) {
        this.name_error = this.$t("SignIn.NamePlaceholder");
        return;
      }
      if (!isNaN(parseInt(this.name.substring(0, 1)))) {
        this.name_error = this.$t("SignIn.NameError");
        return;
      }

      if (!validate.isPhone(this.mobile, this.country_code)) {
        this.mobile_error = this.$t("SignIn.MobileError");
        return;
      }

      if (this.captcha.toString().length == 0) {
        this.captcha_error = this.$t("SignIn.ImageCodePlaceholder");
        return;
      }

      // if (this.referral_code === "") {
      //   this.referral_code_error = "";
      // }

      var l_this = this;
      user
        .checkName(this.name)
        .then(function(result) {
          // console.log("asjkdfhkashd");
          l_this.signxx();
        })
        .catch(e => {
          this.name_error = e.message;
          this.captcha_refresh();
          // switch (e.code) {

          // case 2:
          //   this.name_error = this.$t("SignIn.UserNameError");
          //   break;
          // case 1022:
          //   this.name_error = HttpResultCode.validate(e.code); //this.$t('SignIn.UserNameRegistered');
          // default:
          //   this.showToast(HttpResultCode.validate(e.code));
          // }
        });
    },
    signxx: function() {
      let param = {
        country_code: this.country_code,
        mobile: this.mobile,
        image_code: this.captcha
      };

      user
        // .mobileSignUp(param)
        .mobileSignUpCode(param)
        .then(result => {
          this.showToast(this.$t("SignIn.SendCodeMobile"));
          this.time_refresh();
          this.isNext = true;
        })
        .catch(e => {
          this.showToast(e.message);
          this.captcha_refresh();
          // this.captcha_error = e.message;

          // switch (e.code) {
          //   case 1002:
          //     this.captcha_refresh();
          //     this.mobile_error = HttpResultCode.validate(e.code); //this.$t('SignIn.UserNameRegistered');
          //     break;
          //   case 1302:
          //     this.captcha_error = this.$t("SignIn.ImageCodePlaceholder");
          //     this.captcha_refresh();
          //     break;
          //   case 1303:
          //     this.showToast(this.$t("SignIn.PhoneCodeSMSResponse"));
          //     this.captcha_refresh();
          //     break;
          //   default:
          //     this.showToast(HttpResultCode.validate(e.code));
          //     this.captcha_refresh();
          // }
        });
    },
    sign_up: function() {
      if (this.code.length == 0) {
        this.showToast(this.$t("Wallet_Detail.code_validate_tip"));
        return;
      }
      let param = {
        name: this.name,
        country_code: this.country_code,
        mobile: this.mobile,
        one_time_code: this.code,
        password: this.pwd,
        referral_code: this.referral_code
      };
      user
        .mobileSignUp(param)
        .then(result => {
          this.showToast(this.$t("SignIn.SignUpSuccedd"));

          // this.$router.push("/trade");
          this.$router.push("/set_assets_pwd");
        })
        .catch(e => {
          this.showToast(e.message);
          this.captcha_refresh();
        });
    },
    downApp() {
      var ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.$router.push("/app_down");
      }
    },
    time_refresh: function() {
      for (let i = 0; i <= 120; i++) {
        this.refresh_timer.push(
          window.setTimeout(() => {
            if (i <= 119) {
              let count = 120 - i;
              this.refresh_txt = "" + count;
            } else {
              this.refresh_txt = this.$t("SignIn.getCode");
              this.clear_refresh();
            }
          }, i * 1000)
        );
      }
    },
    clear_refresh: function() {
      for (let i = 0; i < this.refresh_timer.length; i++) {
        clearTimeout(this.refresh_timer[i]);
      }
      this.refresh_timer = [];
      this.refresh_txt = this.$t("SignIn.getCode");
    },
    signIn() {
      this.$router.push("/sign_in");
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    isIos() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isiOS;
    }
  },
  beforeDestroy: function() {
    for (let i = 0; i < this.refresh_timer.length; i++) {
      clearTimeout(this.refresh_timer[i]);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/SignUp.scss";
</style>
