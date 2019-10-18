import storage from "../../models/storage";
import {
  SET_USER,
  CLEAN_USER,
  SET_INVITE_REFERRAL_CODE,
  SET_PAYMENT_PASSWORD_STATUS,
  SET_USER_NAME,
  SET_CRYPTO_CURRENCY,
  SET_USER_MOBILE,
  CURRENCY_TO_CURRENCY,
  SET_OPTIONS
} from "../mutation-types";

export default {
  state: {
    name: "",
    mobile: "",
    access_token: "",
    invite_referral_code: "",
    crypto_currency: "SBO",
    options: "WEEK_RAISE",
    currency_to_currency: "SBO_USDT",
    has_payment_password: false
  },
  getters: {
    name: state => {
      return state.name;
    },
    mobile: state => {
      return state.mobile;
    },
    access_token: state => {
      return state.access_token;
    },
    invite_referral_code: state => {
      return state.invite_referral_code;
    }
  },
  mutations: {
    [SET_USER](state, user) {
      state.name = user.name;
      state.access_token = user.access_token;
      state.has_payment_password = user.has_payment_password;
      state.mobile = user.mobile;
    },
    [SET_USER_NAME](state, name) {
      state.name = name;
    },
    [SET_USER_MOBILE](state, mobile) {
      state.mobile = mobile;
    },
    [CLEAN_USER](state) {
      state.name = "";
      state.mobile = "";
      state.access_token = "";
      state.has_payment_password = "";
    },
    [SET_CRYPTO_CURRENCY](state, crypto_currency) {
      /**
       * 这种情况不能监控storage回调，否则会死循环
       */
      storage.set("ccy", crypto_currency);
      state.crypto_currency = crypto_currency;
    },
    [CURRENCY_TO_CURRENCY](state, currency_to_currency) {
      storage.set("ctc", currency_to_currency);
      state.currency_to_currency = currency_to_currency;
    },
    [SET_OPTIONS](state, options) {
      storage.set("options", options);
      state.options = options;
    },
    [SET_INVITE_REFERRAL_CODE](state, invite_referral_code) {
      state.invite_referral_code = invite_referral_code;
    },
    [SET_PAYMENT_PASSWORD_STATUS](state, has_payment_password) {
      state.has_payment_password = has_payment_password;
    }
  }
};
