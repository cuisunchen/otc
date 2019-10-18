import axios from "axios";
import store from "../store";
import notice from "../utils/notice";
import {
  API_BASE_URL,
  NOTICE_CONTENT,
  NOTICE_LIST,
  FFT_SHARES_SUMMARY,
  FFT_SHARES_GET
} from "./url.js";

import { SET_USER } from "../store/mutation-types";
axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000;
axios.defaults.timeout = 6000;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

let notice1 = {};

notice1.list = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    // console.log("list = = ");
    axios
      .post(NOTICE_LIST, params, config)
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
notice1.content = function(id) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(NOTICE_CONTENT + "/" + id, params, config)
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

notice1.fft_share_summary = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };

    axios
      .post(FFT_SHARES_SUMMARY, params, config)
      .then(response => {
        console.log("fft_share_summary = response= ");
        if (parseInt(response.data.code) === 0) {
          resolve(response.data);
        } else {
          notice(response.data);
          reject(response.data);
        }
      })
      .catch(error => {
        console.log("fft_share_summary = error= ");
        if (typeof error.response.data != "undefined") {
          notice(error.response.data);
        }
        reject(error.response.data);
      });
  });
};
notice1.fft_share_get = function() {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams();
    let config = {
      headers: {
        Authorization: "Bearer " + store.state.user.access_token
      }
    };
    axios
      .post(FFT_SHARES_GET, params, config)
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
export default notice1;
