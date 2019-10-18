import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  ORDER_MINE,
  ORDER_PAID,
  ORDER_CANCEL,
  ORDER_GET,
  ORDER_RELEASE,
  ORDER_DISPUTE,
  TRADE_MARKET_MY_ADS,
  USER_otc_my_trade,
  USER_otc_get_trade,
  USER_OTC_AWS_UPLOAD_DISPUTE,
  USER_OTC_dispute_seller_submit,
  USER_OTC_dispute_buyer_comment,
  USER_feedback,
  USER_my_feedback,
  USER_otc_ad_detail,
  TRADE_OTC_UNPUBLISH_AD
} from "./url.js";

axios.defaults.headers.post["Content-Type"] = "application/json";
// "application/x-www-form-urlencoded";
axios.defaults.timeout = 6000;
let order = {};

order.list = function (is_trading, offset, limit, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("is_trading", is_trading);
    params.append("offset", offset);
    params.append("limit", limit);
    params.append("crypto_currency", crypto_currency);

    axios
      .post(API_BASE_URL + ORDER_MINE, params, config)
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


order.USER_otc_ad_detail = function (params) {
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
      .post(API_BASE_URL + USER_otc_ad_detail, params, config)
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



order.USER_OTC_dispute_seller_submit = function (params) {
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
      .post(API_BASE_URL + USER_OTC_dispute_seller_submit, params, config)
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

order.USER_my_feedback = function (params) {
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
      .post(API_BASE_URL + USER_my_feedback, params, config)
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
order.USER_feedback = function (params) {
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
      .post(API_BASE_URL + USER_feedback, params, config)
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

order.USER_OTC_dispute_buyer_comment = function (params) {
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
      .post(API_BASE_URL + USER_OTC_dispute_buyer_comment, params, config)
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

order.USER_OTC_AWS_UPLOAD_DISPUTE = function (params) {
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

order.USER_otc_get_trade = function (params) {
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
      .post(API_BASE_URL + USER_otc_get_trade, params, config)
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

order.USER_otc_my_trade = function (params) {
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
      .post(API_BASE_URL + USER_otc_my_trade, params, config)
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
order.CancelAd = function (params) {
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
      .post(API_BASE_URL + TRADE_OTC_UNPUBLISH_AD, params, config)
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
order.ads = function (params) {
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
      .post(API_BASE_URL + TRADE_MARKET_MY_ADS, params, config)
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
order.paid = function  (params) {
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
      .post(API_BASE_URL + ORDER_PAID, params, config)
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

order.cancel = function (params) {
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
      .post(API_BASE_URL + ORDER_CANCEL, params, config)
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

order.get = function (id, crypto_currency) {
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
      .post(API_BASE_URL + ORDER_GET, params, config)
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

order.release = function (params) {
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
      .post(API_BASE_URL + ORDER_RELEASE, params, config)
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

order.dispute = function  (params) {
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
      .post(API_BASE_URL + ORDER_DISPUTE, params, config)
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

export default order;
