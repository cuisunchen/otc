import axios from "axios";
import storage from "./storage";
import store from "../store";
import notice from "../utils/notice";
import {
  FOX_ACTIVE,
  API_BASE_URL,
  FOX_ACTIVATE,
  FOX_MINE,
  FOX_MARKET_LIST,
  FOX_SELL,
  FOX_MATE,
  FOX_DRAW_LOTTERY,
  FOX_LOG_FEED,
  FOX_LOG_DIG,
  FOX_MINE_MATE,
  FOX_TRADE_LIST,
  WALLET_OSC,
  FOX_SEARCH_MARKET_LIST,
  FOX_MINE_DAN,
  FOX_HUA_DAN,
  FOX_FEED_DAN,
  FOX_LOG_DAN,
  EXCHANGE_LIMIT_ORDER,
  EXCHANGE_MARKET_ORDER,
  EXCHANGE_DEPTH,
  EXCHANGE_MY_ORDER,
  EXCHANGE_CANCEL_ORDER,
  FOX_BALANCE_FEED,
  WALLET_BALANCE,
  FOX_MINE_HIDE,
  FOX_HIDE_INFO,
  FOX_HIDE_LIST,
  FOX_ROB_HIDE,
  FOX_BET_HIDE,
  FOX_MINE_DRAW,
  FOX_DRAW_FOX,
  POST_FOX_ACTIVATE_FOX,
  FOX_OSC_HIDE_INFO,
  FOX_OSC_HIDE_RECORD,
  FOX_BET_OSC_HIDE,
  FOX_INJECT_OSC_HIDE,
  FOX_OSC_AUTO_HIDE_INFO,
  FOX_OSC_AUTO_HIDE_RECORD,
  BET_FOX_OSC_AUTO_HIDE,
  FOX_MINE_GOD_FOX,
  FOX_MINE_ALL,
  FOX_SUMMARY
} from "./url.js";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let game = {};
game.getBoundadd = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_ACTIVE, params, config)
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
/**
 * 我的狐狸查询
 * @param {*} sell_type  {SELL_PROPERTY,SELL_MATE} SELL_PROPERTY ,  // 出售产权 SELL_MATE  // 出售交配权
 * @param {*} order    GENERATION_ASC, // 代数 WEIGHT_ASC ,// 体重 REWARD_ASC  ,  // 收益 GENERATION_DESC  ,  // 代数 WEIGHT_DESC , // 体重REWARD_DESC ,  // 收益 PRICE_ASC ,  // 价格PRICE_DESC  ;  // 价格
 * @param {*} offset
 * @param {*} limit
 */
game.foxMine = function(sell_type, order, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("sell_type", sell_type);
    params.append("order", order);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_MINE, params, config)
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
/**
 * 市场
 * @param {*} sell_type  {SELL_PROPERTY,SELL_MATE} SELL_PROPERTY ,  // 出售产权 SELL_MATE  // 出售交配权
 * @param {*} order    GENERATION_ASC, // 代数 WEIGHT_ASC ,// 体重 REWARD_ASC  ,  // 收益 GENERATION_DESC  ,  // 代数 WEIGHT_DESC , // 体重REWARD_DESC ,  // 收益 PRICE_ASC ,  // 价格PRICE_DESC  ;  // 价格
 * @param {*} offset
 * @param {*} limit
 */
game.foxMarketList = function(sell_type, order, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("sell_type", sell_type);
    params.append("order", order);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_MARKET_LIST, params, config)
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
/**
 * 出售狐狸
 * @param {*狐狸id} id
 * @param {*出售价格} price
 */
game.foxSell = function(id, price, passwordValue) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("price", price);
    params.append("password", passwordValue);
    axios
      .post(FOX_SELL, params, config)
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
/**
 * 发布造狐广告
 * @param {*} id
 * @param {*} price
 */
game.foxsSellmate = function(id, price) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("price", price);
    axios
      .post(FOX_MATE, params, config)
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

/**
 * 抽奖查询接口
 */
game.foxDrawLottery = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_DRAW_LOTTERY, params, config)
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
/**
 * 狐狸寻宝记录接口
 * @param {*} id
 * @param {*} offset
 * @param {*} limit  = 10
 */
game.foxLogDig = function(id, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_LOG_DIG, params, config)
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
/**
 * 狐狸喂食列表
 * @param {*} id
 * @param {*} offset
 * @param {*} limit =10
 */
game.foxLogFeed = function(id, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_LOG_FEED, params, config)
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
/**
 *
 * @param {*} offset
 * @param {*} limit
 */
game.foxMineMate = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_MINE_MATE, params, config)
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
/**
 *
 * @param {*} sell_type {SELL_PROPERTY,SELL_MATE} SELL_PROPERTY ,  // 出售产权 SELL_MATE  // 出售交配权
 * @param {*} offset
 * @param {*} limit  = 10
 */
game.foxTradeList = function(sell_type, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("sell_type", sell_type);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_TRADE_LIST, params, config)
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
/**
 * @param {*取消交易接口} id  订单id
 */
game.foxCancel = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/cancel/" + id, params, config)
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
/**
 *
 * @param {*购买狐狸接口} id 购买的狐狸id
 */
game.foxBuy = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/buy/" + id, params, config)
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

/**
 * 造狐接口
 * @param {*} sellId  出售狐狸id
 * @param {*} buyId   购买狐狸id
 */
game.foxMate = function(sellId, buyId) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/mate/" + sellId + "/" + buyId, params, config)
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

/**
 *
 * @param {*寻宝接口} id   狐狸id
 *
 */
game.foxDig = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/dig/" + id, params, config)
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
//获取狐狸详情
game.foxDetail = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/detail/" + id, params, config)
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

//拍下广告后标记已转账
game.foxMarkPaid = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/mark_paid/" + id, params, config)
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

game.foxSearchMarketList = function(sell_type, generation, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("sell_type", sell_type);
    params.append("order", "GENERATION_FIXED");
    params.append("generation", generation);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_SEARCH_MARKET_LIST, params, config)
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

//化丹接口
//查询我的可以化丹的列表
game.foxMineDan = function(order, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("order", order);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_MINE_DAN, params, config)
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

game.foxHuaDan = function(ids) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("ids", ids);
    axios
      .post(FOX_HUA_DAN, params, config)
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

game.foxFeedDan = function(id, qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("qty", qty);
    axios
      .post(FOX_FEED_DAN, params, config)
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

game.foxDanLog = function(id, offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("offset", offset);
    params.append("limit", limit);
    axios
      .post(FOX_LOG_DAN, params, config)
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

game.exchangeDepth = function(symbol, depth) {
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

game.exchangeLimitOrder = function(symbol, quantity, is_buy, price, password) {
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
game.foxExchangeMyOrder = function(symbol, status, offset, limit) {
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

game.exchangeCancelOrder = function(symbol, id) {
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

game.exchangeCancelOrder = function(symbol, id) {
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

game.foxBalanceFeed = function(id, qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("qty", qty);
    params.append("id", id);
    axios
      .post(FOX_BALANCE_FEED, params, config)
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
game.foxBalanceBuy = function(id, price) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("id", id);
    params.append("price", price);
    axios
      .post(API_BASE_URL + "/fox/balance_buy", params, config)
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

game.foxBalanceMate = function(sellId, buyId, price) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("sell_id", sellId);
    params.append("buy_id", buyId);
    params.append("price", price);
    axios
      .post(API_BASE_URL + "/fox/balance_mate", params, config)
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

game.balance = function() {
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
//查询寻狐详情
game.foxHideInfo = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_HIDE_INFO, params, config)
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

game.foxMineHide = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("offset", offset);
    params.append("limit", limit);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_MINE_HIDE, params, config)
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

game.foxRobHide = function(fire_fox_id, dan_qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("fire_fox_id", fire_fox_id);
    params.append("dan_qty", dan_qty);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };

    axios
      .post(FOX_ROB_HIDE, params, config)
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

game.foxBetHide = function(hide_id, fire_fox_id, generation, dan_qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("hide_id", hide_id);
    params.append("generation", generation);
    params.append("fire_fox_id", fire_fox_id);
    params.append("dan_qty", dan_qty);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };

    axios
      .post(FOX_BET_HIDE, params, config)
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
game.foxHideList = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("offset", offset);
    params.append("limit", limit);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_HIDE_LIST, params, config)
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

game.foxMineDraw = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("offset", offset);
    params.append("limit", limit);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_MINE_DRAW, params, config)
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
game.draw_fox = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_DRAW_FOX, params, config)
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
game.activate_fox = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(POST_FOX_ACTIVATE_FOX, params, config)
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

game.osc_hide_info = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_OSC_HIDE_INFO, params, config)
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

game.osc_hide_record = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_OSC_HIDE_RECORD + "/" + id, params, config)
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
game.bet_osc_hide = function(hide_id, fire_fox_id, generation, osc_qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("hide_id", hide_id);
    params.append("fire_fox_id", fire_fox_id);
    params.append("generation", generation);
    params.append("osc_qty", osc_qty);
    axios
      .post(FOX_BET_OSC_HIDE, params, config)
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

game.inject_osc_hide = function(hide_id, osc_qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("hide_id", hide_id);
    params.append("osc_qty", osc_qty);
    axios
      .post(FOX_INJECT_OSC_HIDE, params, config)
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

game.osc_auto_hide_record = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_OSC_AUTO_HIDE_RECORD + "/" + id, params, config)
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

game.bet_osc_auto_hide = function(hide_id, fire_fox_id, generation, osc_qty) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    params.append("hide_id", hide_id);
    params.append("fire_fox_id", fire_fox_id);
    params.append("generation", generation);
    params.append("osc_qty", osc_qty);
    axios
      .post(BET_FOX_OSC_AUTO_HIDE, params, config)
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

game.osc_auto_hide_info = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_OSC_AUTO_HIDE_INFO, params, config)
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

game.foxMineGodFox = function(offset, limit) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    params.append("offset", offset);
    params.append("limit", limit);
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_MINE_GOD_FOX, params, config)
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

// POST    /fox/merge_god_fox/*id
// POST    /fox/merge_full_fox/*id
game.mergeGodFox = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/merge_god_fox/" + id, params, config)
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
game.mergeFullFox = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(API_BASE_URL + "/fox/merge_full_fox/" + id, params, config)
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

game.foxMineAll = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();

    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_MINE_ALL, params, config)
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

game.summary = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();

    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FOX_SUMMARY, params, config)
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
export default game;
