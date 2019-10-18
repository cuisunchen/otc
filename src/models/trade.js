import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  TRADE_MARKET_LIST,
  TRADE_MARKET_PUBLISH,
  TRADE_MARKET_PRE_ORDER,
  TRADE_MARKET_GET,
  TRADE_MARKET_PLACE_ORDER,
  TRADE_MARKET_EDIT,
  TRADE_MARKET_PUBLISH_RESTRICTION,
  TRADE_MARKET_PRUCE
} from "./url.js";

import { SET_USER } from "../store/mutation-types";

axios.defaults.headers.post["Content-Type"] ="application/json";
axios.defaults.timeout = 6000;
let trade = {};


// 11.首页的购买出售广告列表  http://18.162.45.195:9000/otc/ad_list
// {
// 	"symbol":"btc_usdt",
// 	"is_buy":false,
// 	"offset":0,
// 	"limit":10
// }

trade.adList = function(params) {
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
      .post(API_BASE_URL + TRADE_MARKET_LIST, params,config)
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

trade.publish = function(params) {
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
      .post(API_BASE_URL + TRADE_MARKET_PUBLISH, params, config)
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

trade.marketGet = function(id, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("id", id);
    axios
      .post(API_BASE_URL + TRADE_MARKET_GET, params, config)
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

trade.preOrder = function(params) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
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
      .post(API_BASE_URL + TRADE_MARKET_PRE_ORDER, params, config)
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

trade.placeOrder = function(params) {
  // console.log( " store.state.user.access_token ="+store.state.user.access_token)
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
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
      .post(API_BASE_URL + TRADE_MARKET_PLACE_ORDER, params, config)
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

trade.getPublishRestriction = function(params) {
  return new Promise((resolve, reject) => {
    let lang = "zh_cn";
    if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
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
      .post(API_BASE_URL + TRADE_MARKET_PUBLISH_RESTRICTION, params, config)
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

trade.getMarketPrice = function(crypto_currency, trade_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    axios
      .post(API_BASE_URL + TRADE_MARKET_PRUCE, params, config)
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

export default trade;
