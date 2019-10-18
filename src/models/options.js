import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  OPTIONS_MINE,
  OPTIONS_SUBMIT,
  OPTIONS_CANCEL,
  OPTIONS_BUY,
  OPTIONS_EXERCISE,
  OPTIONS_LIST
} from "./url.js";

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
let options = {};
options.getOptionsSubmit = function(
  crypto_currency,
  is_call,
  price,
  fee_rate,
  piece,
  period
) {
  // 进行中或已结束 偏移 数量
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("is_call", is_call);
    params.append("price", price);
    params.append("fee_rate", fee_rate);
    params.append("piece", piece);
    params.append("period", period);
    axios
      .post(OPTIONS_SUBMIT, params, config)
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

options.getOptionsMine = function(is_trading, offset, limit, crypto_currency) {
  // 进行中或已结束 偏移 数量
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
      .post(OPTIONS_MINE, params, config)
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

options.getOptionsCancel = function(id, crypto_currency) {
  // 进行中或已结束 偏移 数量
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(OPTIONS_CANCEL, params, config)
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

options.getOptionsBuy = function(id, crypto_currency) {
  // 进行中或已结束 偏移 数量
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(OPTIONS_BUY, params, config)
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
options.getOptionsExercise = function(id, crypto_currency) {
  // 进行中或已结束 偏移 数量
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(OPTIONS_EXERCISE, params, config)
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

options.getOptionsList = function(crypto_currency, is_call, offset, limit) {
  // 进行中或已结束 偏移 数量
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("is_call", is_call);
    params.append("offset", offset);
    params.append("limit", limit);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(OPTIONS_LIST, params, config)
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

// POST    /options/list  :
// Common.Currency crypto_currency;      // 数字货币
// Boolean is_call;
// Integer offset;             // 偏移
// Integer limit;              // 数量
export default options;
