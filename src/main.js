import Vue from "vue";

// import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'
import Vuex from "vuex";
import VueI18n from "vue-i18n";

import MuseUI from "muse-ui";
import "muse-ui/dist/muse-ui.css";
import VueLazyload from "vue-lazyload";
import VueAwesomeSwiper from "vue-awesome-swiper";

import locales from "./assets/locales";
import store from "./store/index";
import storage from "./models/storage";
import user from "./models/user";
import "normalize.css";
// import './assets/iconfont/iconfont.css'
//http://www.jb51.net/article/119655.htm
import "swiper/dist/css/swiper.css";

import NProgress from "nprogress";
import "nprogress/nprogress.css";

import App from "./App";
import router from "./router";

import VueClipboard from "vue-clipboard2";

import promise from "es6-promise";
promise.polyfill();

Vue.use(VueClipboard);

import VueQrcode from "@xkeshi/vue-qrcode";
Vue.component("qrcode", VueQrcode);

import Croppa from "vue-croppa";
import axios from "axios";

Vue.use(Croppa);

Vue.config.productionTip = true;

Vue.prototype.axios = axios;

// Vue.use(MintUI)
/**
 * 解决Mint UI Input不支持focus的问题
 */
Vue.directive("lfcous", function(el, pra, vnode) {
  let oInput = el.querySelector("input");
  let oTextarea = el.querySelector("textarea");
  if (null !== oInput) {
    oInput.onfocus = () => {
      vnode.componentInstance.$emit("input_fcous");
    };

    oInput.onblur = () => {
      vnode.componentInstance.$emit("input_blur");
    };
  }

  if (null !== oTextarea) {
    oTextarea.onfocus = () => {
      vnode.componentInstance.$emit("input_fcous");
    };

    oTextarea.onblur = () => {
      vnode.componentInstance.$emit("input_blur");
    };
  }
});
Vue.use(MuseUI);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: '//misc.firefoxotc.com/h5/v1/static/img/img_default.gif',
  // loading: '//misc.firefoxotc.com/h5/v1/static/img/img_default.gif',
  attempt: 1
});

/* top process */
NProgress.configure({
  easing: "ease",
  speed: 1000,
  showSpinner: false,
  trickleSpeed: 500
});


/* i18n config */

let lang = "zh_cn";
if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
// if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
  lang = storage.get("lang");
}
// lang = "en"
const i18n = new VueI18n({
  locale: lang,
  messages: locales
});

Vue.prototype.$locale = {
  change(language) {
    i18n.locale = language;
  },
  current() {
    return i18n.locale;
  }
};

// /* i18n config */
// let lang = "zh_cn";
// // if(['en', 'zh_cn', 'zh_tw'].indexOf(storage.get('lang')) > -1){
// if (["zh_cn", "zh_tw"].indexOf(storage.get("lang")) > -1) {
//   lang = storage.get("lang");
// }
// const i18n = new VueI18n({
//   locale: lang,
//   messages: locales
// });

// Vue.prototype.$locale = {
//   change(language) {
//     i18n.locale = language;
//   },
//   current() {
//     return i18n.locale;
//   }
// };

import wcSwiper from "wc-swiper";
import "wc-swiper/style.css";
Vue.use(wcSwiper);

/* init */
user.init();

// import ECharts from 'vue-echarts/components/ECharts'

// // import ECharts modules manually to reduce bundle size
// import 'echarts/lib/chart/bar'
// import 'echarts/lib/component/tooltip'

// // register component to use
// Vue.component('chart', ECharts)
// // Vue.component('chart', VueECharts)

import echarts from "echarts";
Vue.prototype.$axios = axios;

Vue.prototype.$echarts = echarts;
/* eslint-disable no-new */
window.vm = new Vue({
  el: "#app",
  i18n,
  router,
  store,
  template: "<App/>",
  components: { App }
});


