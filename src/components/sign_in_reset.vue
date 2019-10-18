<template>
  <div class="content-sign-in-reset">
    <div>
      <div class="top">
        <div class="left" @click="goBack" />
        <div v-show="!isLogin"
          class="fs-16"
          style="color: #2E3546;line-height: 3em;">
          {{this.$t("SignIn.SelectCountry")}}</div>
      </div>
      <!-- <div class="banner">
      <div class="logo"></div>
      </div>-->
      <div v-show="isLogin">
        <div class="title">{{this.$t("SignIn.forgetPassword")}}</div>

        <div>
          <div class="login">
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
              :hintText="$t('SignIn.newPassword')"
              type="password"
              fullWidth
              @focus="input_focus('pwd')"
              :errorText="pwd_error"
            />
            <mu-text-field
              v-show="isNext"
              v-model.trim="pwd_again"
              class="input-zone"
              :hintText="$t('SignIn.againPassword')"
              type="password"
              fullWidth
              @focus="input_focus('pwd_again')"
              :errorText="pwd_again_error"
            />
          </div>
        </div>

        <mu-raised-button
          style="margin-top:3em;"
          v-show="!isNext"
          :label="$t('SignIn.sendCode')"
          @click="send_code"
          class="btn btn-default"
          fullWidth
          primary
        />
        <mu-raised-button
          style="margin-top:3em;"
          v-show="isNext"
          :label="$t('Wallet_Detail.confirm_submit')"
          @click="mobile_reset_pwd"
          class="btn btn-default"
          fullWidth
          primary
        />
        <mu-toast v-if="toast" :message="message" @close="hideToast" />
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
  name: "sign_in_reset",
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

      code_ok: false,

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

      pwd_again: "",
      pwd_again_error: "",

      isNext: false,
      send_code_txt: this.$t("SignUp.getCode"),

      refresh_txt: this.$t("SignIn.getCode"),
      refresh_timer: []
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {},
  methods: {
    goBack() {
    	alert(1)
      if (this.isLogin) {
        this.$router.go(-1);
      } else {
        this.isLogin = true;
      }
    },
    selectCountCode() {
      this.isLogin = false;
    },
    onClickCountryCode(item) {
      this.country_code = item.value;
      this.isLogin = true;
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
    set_active: function(selected) {
      this.selected = selected;
    },
    input_focus: function(selected) {
      if (selected === "mobile") {
        this.mobile_error = "";
      }

      if (selected === "code") {
        this.code_error = "";
      }

      if (selected === "pwd") {
        this.pwd_error = "";
      }
      if (selected === "pwd_again") {
        this.pwd_again_error = "";
      }
    },
    send_code: function() {
      if (this.refresh_txt != this.$t("SignIn.getCode")) {
        this.showToast(this.refresh_txt + this.$t("SignIn.sendCodeTip"));
        return;
      }
      if (!validate.isPhone(this.mobile, this.country_code)) {
        // this.mobile_error =this.$t('SignIn.MobileError');
        this.showToast(this.refresh_txt + this.$t("SignIn.MobileError"));
        return;
      }

      user
        .getMobileResetCode(this.mobile, this.country_code)
        .then(result => {
          this.showToast(this.$t("SignIn.SendCodeMobile"));
          this.time_refresh();
          this.isNext = true;
        })
        .catch(e => {
          this.showToast(e.message);
        });
    },
    mobile_reset_pwd: function() {
      if (this.mobile.length == 0) {
        this.mobile_error = " ";
        return;
      }
      if (this.code.length == 0) {
        this.code_error = " ";
        return;
      }
      if (this.pwd.length < 6 || this.pwd.length > 14) {
        this.pwd_error = " ";
        this.showToast(this.$t("SignIn.newPasswordLenght"));
        return;
      }
      if (this.pwd_again.length < 6 || this.pwd_again.length > 14) {
        this.pwd_again_error = " ";
        this.showToast(this.$t("SignIn.againPasswordError"));
        return;
      }
      if (this.pwd_again != this.pwd) {
        this.pwd_error = " ";
        this.pwd_again_error = " ";
        this.showToast(this.$t("SignIn.different"));
        return;
      }
      var params = {
        country_code: this.country_code,
        mobile: this.mobile,
        one_time_code: this.code,
        password: this.pwd
      };
      user
        .mobileResetPwd(params)
        .then(result => {
          // this.$router.push('/sign_in')
          this.$router.go(-1);
          this.showToast(this.$t("SignIn.ResetPasswordSuccedd"));
        })
        .catch(e => {
          this.showToast(e.message);
          // switch (e.code) {
          //   case 1006:
          //     this.code_error = this.$t('SignIn.passwordError')
          //     break
          //     default:
          //     this.showToast(HttpResultCode.validate(e.code));
          // }
        });
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
@import "../assets/css/sign_in_reset.scss";
</style>
