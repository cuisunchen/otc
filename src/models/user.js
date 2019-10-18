import axios from "axios";
import storage from "./storage";
import store from "../store";
import {
  API_BASE_URL,
  USER_onetimecode_signin,
  USER_CHECK_NAME,
  USER_MOBILE_SIGN_UP,
  USER_MOBILE_SIGN_UP_CODE,
  USER_EMAIL_SIGN_UP_CODE,
  USER_EMAIL_SIGN_UP,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_INFO,
  USER_SECURITY,
  USER_SET_PAYMENT_PASSWORD,
  USER_MODIFY_PAYMENT_PASSWORD,
  USER_MODIFY_PASSWORD,
  USER_BIND_EMAIL_CODE,
  USER_BIND_EMAIL,
  USER_BIND_MOBILE_CODE,
  USER_BIND_MOBILE,
  USER_GOOGLE_AUTH_KEY,
  USER_BIND_GOOGLE_AUTH,
  USER_UNBIND_GOOGLE_AUTH,
  USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE,
  USER_MOBILE_RESET_SIGN_IN_PASSWORD,
  USER_EMAIL_RESET_SIGN_IN_PASSWORD,
  USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE,
  USER_INVITE_REWARD_SUMMARY,
  USER_INVITE_REWARD_DETAIL,
  USER_MOBILE_RESET_PAYMENT_PASSWORD,
  USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE,
  USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE,
  USER_EMAIL_RESET_PAYMENT_PASSWORD,
  USER_BIND_GOOGLE_AUTH_CODE,
  USER_BIND_EMAIL_MOBILE_CODE,
  USER_BIND_MOBILE_EMAIL_CODE,
  USER_S3_INFO,
  USER_PAYMENT_BIND_ALIPAY,
  USER_PAYMENT_BIND_WECHAT,
  USER_PAYMENT_BIND_BANK,
  INDEX_BANNER_LIST,
  WALLET_ANDROID_VERSION,
  USER_PROFILE,
  USER_MOBILE_SIGNUP,
  USER_onetimecode_resetpaymentpassword,
  USER_user_resetpaymentpassword,
  USER_ADD_ADDRESS,
  USER_otc_mobile_code_addreceiveraddress,
  USER_otc_my_receiver_address,
  USER_otc_mobile_code_deletereceiveraddress,
  USER_otc_delete_receiver_address,
  USER_otc_supported_currencies,
  USER_otc_my_account,
  USER_otc_my_supported_otc_symbols,
  USER_OTC_AWS_UPLOAD_DISPUTE,
  USER_ABOUT_US
} from "./url.js";
import notice from "../utils/notice";

import {
  SET_USER,
  CLEAN_USER,
  SET_INVITE_REFERRAL_CODE,
  SET_PAYMENT_PASSWORD_STATUS,
  SET_USER_NAME,
  SET_CRYPTO_CURRENCY,
  CURRENCY_TO_CURRENCY
} from "../store/mutation-types";

axios.defaults.headers.post["Content-Type"] ="application/json";
axios.defaults.timeout = 6000;
let user = {};

user.init = function() {
  let access_token = storage.get("at");
  let name = storage.get("name");
  let mobile = storage.get("mobile");
  let has_payment_password = storage.get("hpp");
  let referral_code = storage.get("rf");
  let crypto_currency = storage.get("ccy");
  let options = storage.get("options");
  let currency_to_currency = storage.get("ctc");

  access_token = access_token == null ? "" : access_token;
  name = name == null ? "" : name;
  mobile = mobile == null ? "" : mobile;
  crypto_currency = crypto_currency == null ? "SBO" : crypto_currency;
  currency_to_currency =
    currency_to_currency == null ? "SBO_USDT" : currency_to_currency;
  store.commit(SET_USER, {
    name: name,
    access_token: access_token,
    has_payment_password:
      has_payment_password === null
        ? true
        : has_payment_password === true || has_payment_password === "true"
          ? true
          : false,
    mobile: mobile
  });
  store.commit(SET_CRYPTO_CURRENCY, crypto_currency);
  store.commit(CURRENCY_TO_CURRENCY, currency_to_currency);
  if (referral_code != null) {
    store.commit(SET_INVITE_REFERRAL_CODE, referral_code);
  }

  /**
   * 其他页面退出重新登录后触发
   */
  window.onstorage = () => {
    let access_token = storage.get("at");
    let name = storage.get("name");
    let mobile = storage.get("mobile");
    let has_payment_password = storage.get("hpp");
    let referral_code = storage.get("rf");
    access_token = access_token == null ? "" : access_token;
    name = name == null ? "" : name;
    mobile = mobile == null ? "" : mobile;

    store.commit(SET_USER, {
      name: name,
      access_token: access_token,
      has_payment_password:
        has_payment_password === null
          ? true
          : has_payment_password === true || has_payment_password === "true"
            ? true
            : false,
      mobile: mobile
    });
    if (referral_code != null) {
      store.commit(SET_INVITE_REFERRAL_CODE, referral_code);
    }
  };
};


user.USER_otc_my_supported_otc_symbols = function() {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_my_supported_otc_symbols, {},config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};


user.USER_otc_my_account = function() {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_my_account, {},config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};


user.USER_onetimecode_signin = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_onetimecode_signin, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};





user.USER_otc_supported_currencies = function() {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_supported_currencies, {},config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.USER_otc_delete_receiver_address = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_delete_receiver_address, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.USER_otc_my_receiver_address = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_my_receiver_address, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};


user.USER_otc_mobile_code_deletereceiveraddress = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_mobile_code_deletereceiveraddress, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.userOtc_mobile_code_addreceiveraddress = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_otc_mobile_code_addreceiveraddress, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.userAddAddress = function(params) {
  return new Promise((resolve, reject) => {

    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_ADD_ADDRESS, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.userProfile = function() {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("name", name);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    let params = {}
    axios
      .post(API_BASE_URL + USER_PROFILE, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.userResetPaymentPasswordCode = function() {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("name", name);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_onetimecode_resetpaymentpassword, {},config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.userResetPaymentPassword = function(params) {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("name", name);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) 
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_user_resetpaymentpassword, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};




user.aboutAs = function() {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("name", name);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
  
    let params = {}
    axios
      .post(API_BASE_URL + USER_ABOUT_US, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};
user.checkName = function(name) {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("name", name);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
  
    let params = {"name":name}
    axios
      .post(API_BASE_URL + USER_CHECK_NAME, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.mobileSignUp = function(params) {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("country_code", countryCode);
    // params.append("mobile", mobile);
    // params.append("name", name);
    // params.append("one_time_code", code);
    // params.append("password", password);
    // params.append("referral_code", store.state.user.invite_referral_code);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_MOBILE_SIGNUP, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          let access_token = response.data.data.access_token;

          //           country_code: 86
          // created: 1565095183714
          // email: null
          // has_email: false
          // has_google_auth: false
          // has_mobile: true
          // has_payment_password: false
          // mobile: "156****7797"
          // name: "ffff"
          // referral_code: "B0w2fDd8N3w1"
          // status: "NORMAL"
          // trade_success_ratio: 0
          // trade_total_usdt: 0
          
                    let name = response.data.data.user.name;
                    let has_payment_password =
                      response.data.data.user.has_payment_password;
                    let mobile = response.data.data.user.mobile;
                    storage.set("at", access_token);
                    storage.set("name", name);
                    storage.set("hpp", has_payment_password);
                    storage.set("mobile", mobile);
                    store.commit(SET_USER, {
                      name: name,
                      access_token: access_token,
                      has_payment_password:
                        has_payment_password === true || has_payment_password === "true"
                          ? true
                          : false,
                      mobile: mobile
                    });
          
                    resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.mobileSignUpCode = function(param) {
  return new Promise((resolve, reject) => {
    // let params = new URLSearchParams();
    // params.append("mobile", mobile);
    // params.append("country_code", countryCode);
    // params.append("image_code", image_code);
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_MOBILE_SIGN_UP_CODE, param,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.emailSignUpCode = function(email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("email", email);
    axios
      .post(API_BASE_URL + USER_EMAIL_SIGN_UP_CODE, params)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.emailSignUp = function(email, name, code, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("email", email);
    params.append("name", name);
    params.append("one_time_code", code);
    params.append("password", password);
    params.append("referral_code", store.state.user.invite_referral_code);
    axios
      .post(API_BASE_URL + USER_EMAIL_SIGN_UP, params)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          storage.set("name", name);
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.signIn = function(params) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_SIGN_IN, params,config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          let access_token = response.data.data.access_token;

//           country_code: 86
// created: 1565095183714
// email: null
// has_email: false
// has_google_auth: false
// has_mobile: true
// has_payment_password: false
// mobile: "156****7797"
// name: "ffff"
// referral_code: "B0w2fDd8N3w1"
// status: "NORMAL"
// trade_success_ratio: 0
// trade_total_usdt: 0

          let name = response.data.data.user.name;
          let has_payment_password =
            response.data.data.user.has_payment_password;
          let mobile = response.data.data.user.mobile;
          storage.set("at", access_token);
          storage.set("name", name);
          storage.set("hpp", has_payment_password);
          storage.set("mobile", mobile);
          store.commit(SET_USER, {
            name: name,
            access_token: access_token,
            has_payment_password:
              has_payment_password === true || has_payment_password === "true"
                ? true
                : false,
            mobile: mobile
          });

          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.signOut = function() {
  storage.set("at", "");
  storage.set("hpp", "");
  storage.set("mobile", "");
  store.commit(CLEAN_USER);
  // return new Promise((resolve, reject) => {
  //   let params = new URLSearchParams();
  //   let config = {
  //     headers: {
  //       Authorization: "Bearer " + store.state.user.access_token
  //     }
  //   };
  //   axios
  //     .post(API_BASE_URL + USER_SIGN_OUT, params, config)
  //     .then(response => {
  //       storage.set("at", "");
  //       storage.set("hpp", "");
  //       storage.set("mobile", "");
  //       store.commit(CLEAN_USER);
  //       resolve(response.data);
  //     })
  //     .catch(error => {
  //       storage.set("at", "");
  //       storage.set("hpp", "");
  //       storage.set("mobile", "");
  //       store.commit(CLEAN_USER);
  //       reject(error.response.data);
  //     });
  // });
};

user.getInfo = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };

    axios
      .post(API_BASE_URL + USER_INFO, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        // reject(error.response.data);
        if (axios.isCancel(error)) {
          console.log("request cancelled");
        } else {
          reject(error.response.data);
        }
      });
  });
};

user.getSecurity = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_SECURITY, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.setPaymentPassword = function(pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = {"password":pwd} //new URLSearchParams();
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    // params.append("password", pwd);
    // params.append("confirm_password", repeat_pwd);
    axios
      .post(API_BASE_URL + USER_SET_PAYMENT_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
          store.commit(SET_PAYMENT_PASSWORD_STATUS, {
            has_payment_password: true
          });
          storage.set("hpp", true);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.modifyPaymentPassword = function(old_pwd, new_pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("password", new_pwd);
    params.append("confirm_password", repeat_pwd);
    params.append("old_password", old_pwd);
    axios
      .post(API_BASE_URL + USER_MODIFY_PAYMENT_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.modifyPassword = function(old_pwd, new_pwd, repeat_pwd) {
  return new Promise((resolve, reject) => {
    let params = {"old_password":old_pwd,"new_password":new_pwd} //new URLSearchParams();
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_MODIFY_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.bindEmailCode = function(email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("email", email);
    axios
      .post(API_BASE_URL + USER_BIND_EMAIL_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.bindEmail = function(email, one_time_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("email", email);
    params.append("one_time_code", one_time_code);
    axios
      .post(API_BASE_URL + USER_BIND_EMAIL, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.bindMobileCode = function(mobile, country_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("mobile", mobile);
    params.append("country_code", country_code);
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.bindMobile = function(mobile, one_time_code, country_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("mobile", mobile);
    params.append("country_code", country_code);
    params.append("one_time_code", one_time_code);
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getGoogleAuthKey = function() {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_GOOGLE_AUTH_KEY, {}, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.bindGoogleAuth = function(params) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_BIND_GOOGLE_AUTH, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.unbindGoogleAuth = function(totp_password) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_UNBIND_GOOGLE_AUTH, {"totp_password": totp_password}, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.getBindGoogleCode = function() {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
    // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_BIND_GOOGLE_AUTH_CODE, {}, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.getUserBindEmailMobileCode = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_BIND_EMAIL_MOBILE_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.getUserBindMobileEmailCode = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE_EMAIL_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.getMobileResetCode = function(mobile, country_code) {
  return new Promise((resolve, reject) => {
    let params = {
      "country_code":country_code,
	"mobile":mobile
    };
    let lang = "zh_cn";
    if (['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(
        API_BASE_URL + USER_MOBILE_RESET_SIGN_IN_PASSWORD_CODE,
        params,
        config
      )
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.mobileResetPwd = function(
  params
) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if (['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_MOBILE_RESET_SIGN_IN_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getEmailResetCode = function(email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("email", email);
    axios
      .post(
        API_BASE_URL + USER_EMAIL_RESET_SIGN_IN_PASSWORD_CODE,
        params,
        config
      )
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.emailResetPwd = function(
  email,
  one_time_code,
  password,
  confirm_password
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("email", email);
    params.append("one_time_code", one_time_code);
    params.append("password", password);
    params.append("confirm_password", confirm_password);
    axios
      .post(API_BASE_URL + USER_EMAIL_RESET_SIGN_IN_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getEmailResetPaymentPwdCode = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(
        API_BASE_URL + USER_EMAIL_RESET_PAYMENT_PASSWORD_CODE,
        params,
        config
      )
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.emailResetPaymentPwd = function(
  one_time_code,
  password,
  confirm_password
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("one_time_code", one_time_code);
    params.append("password", password);
    params.append("confirm_password", confirm_password);
    axios
      .post(API_BASE_URL + USER_EMAIL_RESET_PAYMENT_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getMobileResetPaymentPwdCode = function(email) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(
        API_BASE_URL + USER_MOBILE_RESET_PAYMENT_PASSWORD_CODE,
        params,
        config
      )
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.mobileResetPaymentPwd = function(
  one_time_code,
  password,
  confirm_password
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("one_time_code", one_time_code);
    params.append("password", password);
    params.append("confirm_password", confirm_password);
    axios
      .post(API_BASE_URL + USER_MOBILE_RESET_PAYMENT_PASSWORD, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getInviteRewardSummary = function() {
  return new Promise((resolve, reject) => {
    let params = {

} //new URLSearchParams();
  let lang = "zh_cn";
  if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
  // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
    lang = storage.get("lang");
  }
  lang = lang.replace('_', '-');
  
  let config = {
    headers: {
      "Accept-Language": lang,
      Authorization: "Bearer " + store.state.user.access_token
    }
  };
    axios
      .post(API_BASE_URL + USER_INVITE_REWARD_SUMMARY, {}, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getInviteRewardDetail = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = {
      "offset":offset,
      "limit":limit
    } //new URLSearchParams();
      let lang = "zh_cn";
      if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
      // if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
        lang = storage.get("lang");
      }
      lang = lang.replace('_', '-');
      
      let config = {
        headers: {
          "Accept-Language": lang,
          Authorization: "Bearer " + store.state.user.access_token
        }
      };
    axios
      .post(API_BASE_URL + USER_INVITE_REWARD_DETAIL, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data.code);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data.code);
        }
        reject(error.response.data);
      });
  });
};

user.getUploadInfo = function(params) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if (['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1) {
      lang = storage.get("lang");
    }
    lang = lang.replace('_', '-');
    let config = {
      headers: {
        "Accept-Language": lang,
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_OTC_AWS_UPLOAD_DISPUTE+params, {}, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.bindAlipay = function(name, payment_code_url, account, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("name", name);
    params.append("payment_code_url", payment_code_url);
    params.append("account", account);
    params.append("password", password);
    axios
      .post(API_BASE_URL + USER_PAYMENT_BIND_ALIPAY, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.bindWx = function(name, payment_code_url, account, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("name", name);
    params.append("payment_code_url", payment_code_url);
    params.append("account", account);
    params.append("password", password);
    axios
      .post(API_BASE_URL + USER_PAYMENT_BIND_WECHAT, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};
user.banner_list = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(INDEX_BANNER_LIST, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};
user.bindBank = function(bank_code, password, card_number, branch_name, name) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("bank_code", bank_code);
    params.append("password", password);
    params.append("card_number", card_number);
    params.append("branch_name", branch_name);
    params.append("name", name);
    axios
      .post(API_BASE_URL + USER_PAYMENT_BIND_BANK, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};
user.version = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(WALLET_ANDROID_VERSION, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.bindMobileCode = function(mobile, country_code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("mobile", mobile);
    params.append("country_code", country_code);
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.bindMobile = function(
  mobile,
  mobile_one_time_code,
  country_code,
  email_one_time_code
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("mobile", mobile);
    params.append("country_code", country_code);
    params.append("mobile_one_time_code", mobile_one_time_code);
    params.append("email_one_time_code", email_one_time_code);
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

user.getUserBindMobileEmailCode = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + USER_BIND_MOBILE_EMAIL_CODE, params, config)
      .then(response => {
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

export default user;
