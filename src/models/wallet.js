import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  WALLET_BALANCE,
  WALLET_MY_DEPOSIT,
  WALLET_BILL,
  WALLET_GET_ADDRESS,
  WALLET_NEW_ADDRESS,
  WALLET_MY_WITHDRAWAL,
  WALLET_MY_WITHDRAW,
  WALLET_MY_WITHDRAW_RESTRICTION,
  WALLET_MY_WITHDRAW_WITHDRAW_CODE,
  WALLET_OSC,
  DEPOSIT_SEND_OSC,
  USER_otc_my_depositing,
  USER_otc_wallet_deposit,
  USER_otc_my_deposit,
  USER_wallet_cancel_transfer,
  USER_wallet_withdraw_restriction,
  USER_wallet_onetimecode_withdraw,
  USER_wallet_my_withdrawal,
  USER_wallet_withdraw,
  WALLET_XDAG_BIND_ADDRESS
} from "./url.js";


axios.defaults.timeout = 6000;

axios.defaults.headers.post["Content-Type"] = "application/json";

let wallet = {};

wallet.balance = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + WALLET_BALANCE, params, config)
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
wallet.USER_wallet_withdraw_restriction = function(params) {
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
      .post(API_BASE_URL + USER_wallet_withdraw_restriction, params, config)
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
wallet.USER_wallet_onetimecode_withdraw = function(params) {
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
      .post(API_BASE_URL + USER_wallet_onetimecode_withdraw, params, config)
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
wallet.USER_wallet_withdraw = function(params) {
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
      .post(API_BASE_URL + USER_wallet_withdraw, params, config)
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
wallet.USER_wallet_my_withdrawal = function(params) {
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
      .post(API_BASE_URL + USER_wallet_my_withdrawal, params, config)
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

wallet.USER_wallet_cancel_transfer = function(params) {
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
      .post(API_BASE_URL + USER_wallet_cancel_transfer, params, config)
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

wallet.USER_otc_wallet_deposit = function(params) {
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
      .post(API_BASE_URL + USER_otc_wallet_deposit, params, config)
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
wallet.USER_otc_my_deposit = function(params) {
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
      .post(API_BASE_URL + USER_otc_my_deposit, params, config)
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
wallet.USER_otc_my_depositing = function(params) {
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
      .post(API_BASE_URL + USER_otc_my_depositing, params, config)
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

wallet.bill = function(crypto_currency, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = {
      	"offset":offset,
        "limit":limit,
        "currency":crypto_currency
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
      .post(API_BASE_URL + WALLET_BILL, params, config)
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

wallet.getAddress = function(crypto_currency, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("offset", offset);
    params.append("limit", limit);
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + WALLET_GET_ADDRESS, params, config)
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

wallet.newAddress = function(crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + WALLET_NEW_ADDRESS, params, config)
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

wallet.myDeposit = function(crypto_currency, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(API_BASE_URL + WALLET_MY_DEPOSIT, params, config)
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

wallet.myWithdrawInfo = function(crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    axios
      .post(API_BASE_URL + WALLET_MY_WITHDRAW_RESTRICTION, params, config)
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

wallet.myWithdrawal = function(crypto_currency, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("crypto_currency", crypto_currency);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(API_BASE_URL + WALLET_MY_WITHDRAWAL, params, config)
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

wallet.myWithdraw = function(address, crypto_currency, password, qty, code) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("address", address);
    params.append("crypto_currency", crypto_currency);
    params.append("password", password);
    params.append("qty", qty);
    params.append("one_time_code", code);
    axios
      .post(API_BASE_URL + WALLET_MY_WITHDRAW, params, config)
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

wallet.getMyWithdrawRestriction = function(crypto_currency) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("address", address);
    params.append("crypto_currency", crypto_currency);
    params.append("password", password);
    params.append("qty", qty);
    axios
      .post(API_BASE_URL + WALLET_MY_WITHDRAW_RESTRICTION, params, config)
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

wallet.getWithdrawCode = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + WALLET_MY_WITHDRAW_WITHDRAW_CODE, params, config)
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

wallet.deposited = function(address) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + address, params, config)
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

wallet.deposit = function(key, password, address, qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token,
        "Content-Type": "application/json"
      }
    };

    var json = {};
    json.key = JSON.parse(key);
    json.password = password;
    json.address = address;
    json.qty = qty;
    axios
      .post(DEPOSIT_SEND_OSC, JSON.stringify(json), config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};

wallet.walletXdagBindAddress = function(address) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("address", address);
    axios
      .post(WALLET_XDAG_BIND_ADDRESS, params, config)
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

export default wallet;
