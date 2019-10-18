<template>
  <div class="content" style="background:#FFFFFF">
    <div class="top">
      <div class="center">{{$t('Text.persent')}}</div>
      <div class="left" @click="goBack" />
    </div>

    <!-- <div style="width:100%;height:0.8em;background:#F3F5F7"></div> -->
    <div class="share_btn_zone_user">
      <div class="share_btn_zone">
        <div class="share_btn bottom_border">
          <!-- <i class="gool"></i> -->
          <span>{{$t('Text.language')}}</span>

          <span
            style="float:right;text-align: right;color:#4E586E;font-size:1em;"
            @click="toggle"
          >{{$t('Text.'+language)}}</span>
          <i class="go"></i>
        </div>
      </div>
      <div class="share_btn_zone">
        <div class="share_btn bottom_border">
          <!-- <i class="pw"></i> -->
          <span>{{$t('Text.nick')}}</span>
          <span style="float:right;text-align: right;color:#4E586E;font-size:1em;">{{name}}</span>
          <i class="go"></i>
        </div>
      </div>
      <div class="share_btn_zone">
        <div class="share_btn bottom_border">
          <!-- <i class="pw pw2"></i> -->
          <span>{{$t('Text.phone')}}</span>
          <span style="float:right;text-align: right;color:#4E586E;font-size:1em;">{{mobile}}</span>
          <i class="go"></i>
        </div>
      </div>
      <div class="share_btn_zone">
        <div class="share_btn bottom_border">
          <!-- <i class="gool"></i> -->
          <span>{{$t('Text.level')}}</span>
          <span
            style="float:right;text-align: right;color:#4E586E;font-size:1em;margin-right:0.5em;"
          >{{level}}</span>
          <!-- <i class="go"></i> -->
        </div>
      </div>
    </div>

    <mu-raised-button
      :label="$t('Text.tcdl')"
      @click="loginOut"
      class="btn btn-default"
      style="margin-top:3em;"
      fullWidth
      primary
    />
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
import store from "../store";
import storage from "../models/storage";
import { SET_USER } from "../store/mutation-types";
import user from "../models/user";
import HttpResultCode from "../utils/HttpResultCode";
import PopupPicker from "../common/PopupPicker";
export default {
  name: "person",
  components: { PopupPicker },
  data() {
    return {
      name: '',
      selectPopVal: '',
      has_payment_password: false,
      enabled: false,
      verified: false,
      has_mobile: false,
      mobile: "",
      level: "",
      item: {},
      language: '',
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
      ]
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    // 参数初始化
    user
      .userProfile()
      .then(result => {
        nprogress.done();
        if (result.code === 0) {
          let item = {};
          item = result.data;
          //  alert(JSON.stringify(item))
          next(vm => {
            vm.item = item;
            vm.has_payment_password = item.has_payment_password;
            vm.enabled = item.has_google_auth;
            vm.mobile = item.mobile;
            vm.level = "LV" + item.level;
            vm.name = item.name;

            // vm.verified = item.authentication.real_name_authentication.verified
          });
          //           country_code: 86
          // created: 1565095183714
          // email: null
          // has_email: false
          // has_google_auth: false
          // has_mobile: true
          // has_payment_password: true
          // mobile: "156****7797"
          // name: "ffff"
          // referral_code: "B0w2fDd8N3w1"
          // status: "NORMAL"
          // trade_success_ratio: 0
          // trade_total_usdt: 0
        }
      })
      .catch(e => {
        nprogress.done();
      });

    // user.getSecurity().then(result => {
    //   nprogress.done()
    //   let item={};
    //    item = result.data;
    //   next(vm => {
    //     vm.item = item
    //     vm.has_payment_password = item.authentication.has_payment_password
    //     vm.enabled =  item.authentication.google_auth.enabled
    //     vm.has_mobile = item.authentication.has_mobile
    //     vm.verified = item.authentication.real_name_authentication.verified
    //   })
    // }).catch((e) => {
    //    nprogress.done()
    //    HttpResultCode.validate(e.code)
    // })
  },
  created() {
    window.ccc= this;
    let lang = localStorage.getItem('language_key');
    if (lang) {
      this.selectPopVal = lang;
      this.language = lang;
      storage.set("lang", lang);
    } else {
      this.selectPopVal = lang;
      this.language = "zh_cn";
      storage.set("lang", "zh_cn");
    }
  },
  methods: {
    toggle() {
    // this.open = !this.open;
    this.$refs.popupPicker.showPop();
  },
  confirmHandler(data) {
    var val = data.strIds;
    this.language = val;
    this.$locale.change(this.language);
    localStorage.setItem('language_key', this.language);
    storage.set("lang", val);
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
      this.$router.go(-1);
    },
    loginOut() {
      this.$router.push("/sign_in");
    },
    modify_password() {
      this.$router.push("/modify_password");
    },
    asserts_pwd() {
      if (this.has_payment_password) {
        this.$router.push("/modify_asserts_pwd");
      } else {
        this.$router.push("/set_assets_pwd");
      }
    },
    realname() {
      this.$router.push("/realname");
    },
    google() {
      if (!this.enabled) {
        this.$router.push("/google_bound");
      } else {
        this.$router.push("/google_unbound");
      }
    },
    bound_mobile() {
      if (!this.has_mobile) {
        this.$router.push("/bound_mobile");
      }
    },
    onLanguage() {
      if (this.language == "English") {
        this.language = "中文";
        this.$locale.change("zh_cn");
        storage.set("lang", "zh_cn");
      } else {
        this.language = "English";

        this.$locale.change("en");
        storage.set("lang", "en");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/person.scss";
</style>
