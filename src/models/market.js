import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  EXCHANGE_TICKER_LIST,
  MARKET_MINE,
  MARKET_UNPUBLISH,
  MARKET_REPUBLISH,
  MARKET_DELETE,
  MARKET_GET,
  TRADE_MARKET_EDIT,
  EXCHANGE_LIMIT_ORDER,
  EXCHANGE_MARKET_ORDER,
  EXCHANGE_DEPTH,
  EXCHANGE_MY_ORDER,
  EXCHANGE_CANCEL_ORDER,
  EXCHANGE_KLINE,
  EXCHANGE_TRADES
} from "./url.js";

import { SET_USER } from "../store/mutation-types";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
  axios.defaults.timeout = 6000;
let market = {};

market.mine = function(is_buy, crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("is_buy", is_buy);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + MARKET_MINE, params, config)
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

market.get = function(id, crypto_currency) {
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
      .post(API_BASE_URL + MARKET_GET, params, config)
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

market.edit = function(
  id,
  crypto_currency,
  trade_currency,
  is_buy,
  is_market_price,
  price,
  margin,
  min_qty,
  max_qty,
  message,
  agent,
  alipay_on,
  bankcard_on,
  credit_threshold,
  wechat_pay_on,
  auto_take,
  limit_qty,
  ffc_on
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("crypto_currency", crypto_currency);
    params.append("trade_currency", trade_currency);
    params.append("is_buy", is_buy);
    params.append("is_market_price", is_market_price);
    params.append("min_qty", min_qty);
    params.append("max_qty", max_qty);
    params.append("message", message);
    params.append("price", price);
    params.append("margin", margin);
    params.append("is_agent", agent);
    params.append("credit_threshold", credit_threshold);
    params.append("alipay_on", alipay_on);
    params.append("bankcard_on", bankcard_on);
    params.append("wechat_pay_on", wechat_pay_on);
    params.append("is_auto_taken", auto_take);
    params.append("limit_qty", limit_qty);
    params.append("ffc_on", ffc_on);
    axios
      .post(API_BASE_URL + TRADE_MARKET_EDIT, params, config)
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

market.unpublish = function(id, crypto_currency) {
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
      .post(API_BASE_URL + MARKET_UNPUBLISH, params, config)
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

market.republish = function(id, crypto_currency) {
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
      .post(API_BASE_URL + MARKET_REPUBLISH, params, config)
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

market.del = function(id, crypto_currency) {
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
      .post(API_BASE_URL + MARKET_DELETE, params, config)
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

market.exchangeDepth = function(symbol, depth) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("symbol", symbol);
    params.append("depth", depth);
    axios
      .post(EXCHANGE_DEPTH, params, config)
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

market.market_order = function(symbol, quantity, is_buy, password) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("symbol", symbol);
    params.append("quantity", quantity);
    params.append("is_buy", is_buy);
    params.append("password", password);
    axios
      .post(EXCHANGE_MARKET_ORDER, params, config)
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
market.exchangeLimitOrder = function(
  symbol,
  quantity,
  is_buy,
  price,
  password
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("symbol", symbol);
    params.append("quantity", quantity);
    params.append("is_buy", is_buy);
    params.append("price", price);
    params.append("password", password);
    axios
      .post(EXCHANGE_LIMIT_ORDER, params, config)
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
market.foxExchangeMyOrder = function(symbol, status, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("symbol", symbol);
    params.append("status", status);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(EXCHANGE_MY_ORDER, params, config)
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

market.exchangeCancelOrder = function(symbol, id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("symbol", symbol);
    params.append("id", id);
    axios
      .post(EXCHANGE_CANCEL_ORDER, params, config)
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

// market.exchangeCancelOrder = function(symbol,id){
//   return new Promise((resolve,reject)=>{
//     let params = new URLSearchParams();
//     let config = {
//       headers:{
//         Authorization:'Bearer '+store.state.user.access_token
//       }
//     }
//     params.append('symbol',symbol)
//     params.append('id', id)
//     axios.post(EXCHANGE_CANCEL_ORDER,params,config).then((response)=>{
//       if(parseInt(response.data.code) === 0){

//         resolve(response.data)
//       }else{
//         notice(response.data)
//         reject(response.data)
//       }
//     }).catch((error) => {
//       if(typeof error.response.data != 'undefined' ){
//         notice(error.response.data)
//       }
//       reject(error.response.data)
//     })
//   })

// }

market.ticker_list = function(currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("currency", currency);
    axios
      .post(EXCHANGE_TICKER_LIST+"?currency="+currency, params, config)
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
        if (axios.isCancel(error)) {
          console.log("request cancelled");
        } else {
          reject(error.response.data);
        }
      });
  });
};

market.exchange_kline = function(
  symbol,
  dimension,
  since,
  limit,
  prevTradeTime
) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    // symbol=OSC_FFC&dimension=FIFTEEN_MINUTES&since=1526707799999&prevTradeTime=1526702045385
    params.append("symbol", symbol);
    params.append("dimension", dimension);
    if (since != "") params.append("since", since);
    if (limit != "") params.append("limit", limit);
    params.append("prevTradeTime", prevTradeTime);
    axios
      .post(API_BASE_URL + EXCHANGE_KLINE, params, config)
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
        if (axios.isCancel(error)) {
          console.log("request cancelled");
        } else {
          reject(error.response.data);
        }
      });
  });
};

market.trades = function(symbol) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      requestId: "TRADES"
    };
    params.append("symbol", symbol);
    params.append("limit", 60);
    params.append("since", 0);

    axios
      .post(EXCHANGE_TRADES, params, config)
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
        if (axios.isCancel(error)) {
          console.log("request cancelled");
        } else {
          reject(error.response.data);
        }
      });
  });
};
export default market;
