<template>
  <div class="content-sign-in">
    <div style="    background:white;padding-bottom:3em;">
      <div class="top">
        <div class="left" @click="goBack" />
        <div
          v-show="!isLogin"
          class="fs-16"
          style="color: #2E3546;line-height: 3em;"
        >{{this.$t("SignIn.SelectCountry")}}</div>
        <div v-show="isLogin" class="right" @click="toggle">{{$t('Text.'+language)}}</div>
        <div class="img-arrow"></div>
      </div>

      <div v-show="isLogin">
        <div class="title">{{this.$t("SignIn.SubmitBtn")}}</div>

        <div v-show="!validate">
          <div class="login">
            <div class="captcha-zone">
              <mu-auto-complete
                v-model.trim="account"
                class="input-zone1"
                :hintText="$t('SignIn.AccountPlaceholder')"
                fullWidth
                @focus="input_focus('account')"
                :errorText="nameError"
              />
              <div class="captcha1" @click="selectCountCode">
                <span style="color:#005EE4;" class="fs-16">{{"+"+country_code}}</span>
                <span class="gap"></span>
              </div>
            </div>

            <mu-text-field
              v-model.trim="pwd"
              class="input-zone"
              :hintText="$t('SignIn.PwdPlaceholder')"
              type="password"
              fullWidth
              @focus="input_focus('pwd')"
              :errorText="pwdError"
            />
            <div class="captcha-zone">
              <mu-auto-complete
                v-model.trim="captcha"
                class="input-zone"
                :hintText="$t('SignIn.CaptchaPlaceholder')"
                fullWidth
                @focus="input_focus('captcha')"
                :errorText="captchaError"
              ></mu-auto-complete>
              <div
                class="captcha"
                :style="{backgroundImage: 'url('+ captcha_img + ')'}"
                @click="captcha_refresh"
              >
              </div>
            </div>
            <p class="pw-forget-btn">
              <span @click="reset_sign_pwd">{{$t('SignIn.forgetPasswordText')}}</span>
              <span style="float:right" v-show="false" @click="signUp">{{$t('SignIn.Right')}}</span>
            </p>
          </div>
        </div>
        <div v-show="validate">
          <div class="login">
            <div class="input_group" v-show="validate_method == 'MOBILE'">
              <div class="captcha-zone">
                <mu-auto-complete
                  v-model.trim="code"
                  class="input-zone"
                  :hintText="$t('SignIn.MobileLabel')"
                  fullWidth
                  @focus="input_focus('code')"
                  :errorText="codeError"
                ></mu-auto-complete>
                <div class="div-send-code" @click="send_code">{{refresh_txt}}</div>
              </div>

            </div>
            <div class="input_group" v-show="validate_method == 'EMAIL'">
              <mu-auto-complete
                v-model.trim="code"
                class="input-zone"
                :hintText="$t('SignIn.EmailLabel')"
                fullWidth
                @focus="input_focus('code')"
                :errorText="codeError"
              />
            </div>
            <div class="input_group" v-show="validate_method == 'GOOGLE_AUTH'">
              <mu-auto-complete
                v-model.trim="code"
                class="input-zone"
                :hintText="$t('SignIn.GoogleLabel')"
                fullWidth
                @focus="input_focus('code')"
                :errorText="codeError"
              />
            </div>
          </div>
        </div>
        <mu-raised-button
          v-show="!validate"
          :label="$t('SignIn.SubmitBtn')"
          @click="sign_in"
          class="btn btn-default"
          fullWidth
          primary
        />

        <mu-raised-button
          v-show="validate"
          :label="$t('SignIn.ValidateBtn')"
          @click="sign_in"
          class="btn"
          fullWidth
          primary
        />

        <p v-show="!validate" class="signup-btn" style="margin-top:1.8em;font-size:1em;">
          <span style="padding-left:2em;">{{$t('SignIn.NotAccountYet')}}</span>
          <span class="signup" @click="signUp">{{$t('SignIn.Right1')}}</span>
        </p>

        <p
          style="font-size:0.75em;color:#ffffff;margin:-1em 3em 0 3.5em;padding:0 0; text-align: left;"
        >{{ this.$t("SignIn.signInTip")}}</p>
        <mu-toast v-if="toast" :message="message" @close="hideToast" />
      </div>

      <div v-show="!isLogin" style="background:#FFFFFF;padding-top:3em;">
        <div v-for="(item) in this.codeList" :key="item.value">
          <div
            class="select-country-item"
            @click="onClickCountryCode(item)"
          >{{item.name}} ({{item.value}})</div>
        </div>
      </div>
    </div>
    <PopupPicker
      ref="popupPicker"
      v-model="selectPopVal"
      :picker-data="languageList"
      :cols="1"
      :on-confirm="confirmHandler"
    ></PopupPicker>
  </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import { CAPTCHA_SIGNIN } from "../models/url";
import store from "../store";
import storage from "../models/storage";
import PopupPicker from "../common/PopupPicker";

export default {
  name: "sign_in",
  components: { PopupPicker },
  data() {
    return {
      popupPicker: null,
      selectPopVal: "",
      languageList: [
        [
          {
            id: "zh_cn",
            name: "简体中文"
          },
          {
            id: "en",
            name: "English"
          }
        ]
      ],
      isShowLanguageList: false,
      selected: "",
      toast: false,
      message: "",

      account: this.$store.state.user.name,
      nameError: "",

      pwd: "",
      pwdError: "",

      captcha: "",
      captchaError: "",

      validate: false,
      validate_method: "MOBILE",
      validateTitle: this.$t("SignIn.IPChange"),

      code: "",
      codeError: "",

      timestamp: new Date().getTime(),
      first_step: true,
      send_code_txt: this.$t("SignIn.getCode"),
      open: false,
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
      refresh_timer: [],
      send_code_txt: this.$t("SignIn.getCode"),
      refresh_txt: this.$t("SignIn.getCode"),

      language: this.$locale.current()
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {
    user.signOut();
    let lang = localStorage.getItem('language_key');
    window.ddd = this;
    if (lang) {
      this.selectPopVal = lang;
      this.language = lang;
      this.$locale.change(lang);
      storage.set("lang", lang);
    } else {
      this.selectPopVal = lang;
      this.language = "zh_cn";
      storage.set("lang", "zh_cn");     
    }
  },
  computed: {
    captcha_img: function() {
      return CAPTCHA_SIGNIN + "?_t=" + this.timestamp;
    }
  },
  methods: {
    confirmHandler(data) {
      var val = data.strIds;
      this.language = val;
      storage.set("lang", val);
      this.$locale.change(this.language);
      localStorage.setItem('language_key', this.language);
      this.send_code_txt = this.$t("SignIn.getCode");
      this.codeList = [
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
      ];
    },
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
    onClickCountryCode(item) {
      this.country_code = item.value;
      this.isLogin = true;
    },
    handleChange(val) {
      console.log("val", val);
      this.language = val;
      this.$locale.change(this.language);
      storage.set("lang", this.language);
      this.send_code_txt = this.$t("SignIn.getCode");
      this.codeList = [
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
      ];
    },
    toggle() {
      // this.open = !this.open;
      this.$refs.popupPicker.showPop();
    },
    handleOpen() {
      this.open = true;
    },
    handleClose() {
      this.open = false;
    },
    toggleMenu() {
      this.$emit("toggle");
    },
    captcha_refresh: function() {
      this.send_code_txt = "";
      this.first_step = false;
      this.timestamp = new Date().getTime();
    },
    hideToast() {
      this.toast = false;
      if (this.toastTimer) clearTimeout(this.toastTimer);
    },
    isPhone(val) {
      if (/^[0-9]+$/.test(val)) {
        //这是用正则表达是检查
      } else {
        this.account = "";
      }
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
      this.set_active(selected);

      // if (selected === "account") {
      //   this.nameError = "";
      //    if(/^[0-9]+$/.test( this.account)){//这是用正则表达是检查

      // }else{
      //   this.account=""
      // }
      // }

      if (selected === "pwd") {
        this.pwdError = "";
      }

      if (selected === "captcha") {
        this.captchaError = "";
      }

      if (selected === "code") {
        this.codeError = "";
      }
    },
    send_code: function() {
      if (this.refresh_txt != this.$t("SignIn.getCode")) {
        this.showToast(this.refresh_txt + "S " + this.$t("SignIn.sendCodeTip"));
        return;
      }

      let params = {
        account: this.account,
        password: this.pwd,
        image_code: this.captcha
      };

      let thatthis = this;
      user
        .USER_onetimecode_signin(params)
        .then(function(result) {
          thatthis.showToast(thatthis.$t("SignIn.SendCodeMobile"));
          thatthis.time_refresh();
        })
        .catch(e => {
          thatthis.showToast(e.message);
          //  this.name_error = e.message
          // this.captcha_refresh()
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
    sign_in: function() {
      if (this.account.length < 2 || this.account.length > 16) {
        this.nameError = this.$t("SignIn.AccountPlaceholder");
        return;
      } else this.nameError = "";
      if (this.pwd.length == 0) {
        this.pwdError = this.$t("SignIn.PasswordPlaceholder");
        return;
      }
      if (this.captcha.length == 0) {
        this.captchaError = this.$t("SignIn.ImageCode");
        return;
      }
      if (this.validate && this.code.length == 0) {
        this.code_error = true;
        this.code_error_notice = this.showToast(
          this.$t("Wallet_Detail.code_validate_tip")
        );
        return false;
      }
      let params = {
        country_code: this.country_code,
        account: this.account,
        password: this.pwd,
        image_code: this.captcha,
        one_time_code: this.code
      };
      user
        .signIn(params)
        .then(result => {
          if (result.code === 0) {
            // this.getProfile();
            let access_token = result.data.access_token;
            let name = result.data.user.name;
            let has_payment_password = result.data.user.has_payment_password;
            let mobile = result.data.user.mobile;
            // var u = navigator.userAgent,
            //   app = navigator.appVersion;
            // var isAndroid =
            //   u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
            // if (isAndroid) {
            //   saveAccount(access_token, name, has_payment_password, mobile);
            //   isLogin = 1;
            // }

            if (has_payment_password == true) {
              this.$router.push("/trade");
            } else {
              // this.$router.push("/trade");
              this.$router.push("/set_assets_pwd");
            }
          } else {
            this.captcha_refresh();
          }
        })
        .catch(e => {
          this.captcha_refresh();
          this.showToast(e.message);
          switch (e.code) {
            case 1008:
              this.validate_method = "MOBILE";
              this.validateTitle = this.$t("SignIn.PhoneValidateSafe");
              this.validate = true;
              break;
            case 1009:
              this.validate_method = "EMAIL";
              this.validateTitle = this.$t("SignIn.EmailValidateSafe");
              this.validate = true;
              break;
            case 1007:
              this.validate_method = "GOOGLE_AUTH";
              this.validateTitle = this.$t("SignIn.GoogleValidateSafe");
              this.validate = true;
              break;
          }
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
    },
    signUp() {
      this.$router.push("/sign_up");
    },
    reset_sign_pwd() {
      this.$router.push("/sign_in_reset");
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/SignIn.scss";
</style>
