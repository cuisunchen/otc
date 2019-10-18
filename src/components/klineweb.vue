<template>
    <div class="kline-border">
      <div id="kline_container" class="kline"></div>
    </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import store from "../store";
import market from "../models/market";

import Kline from "../utils/kline";
import { API_BASE_URL, EXCHANGE_KLINE } from "../models/url";

export default {
  name: "app_down",
  components: {},
  data() {
    return { kline: null };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  mounted: function() {
    this.initKline();
    // var l_this = this;
    // window.onresize = function temp() {
    //   var currentTime = new Date().getTime();
    //   var time = currentTime - l_this.freshTime;
    //   if (time > 1000) {
    //     setTimeout(() => {
    //       l_this.initKline();
    //     }, 1000);
    //   }
    //   l_this.freshTime = currentTime;
    // };
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    initKline() {
      var w = document.body.clientWidth * 0.807;
      var h = document.body.clientHeight * 0.807;
      this.kline = new Kline({
        element: "#kline_container",
        // symbol: this.exchange_from + "_" + this.exchange_to,
        symbol: "OSC_FFC",
        width: w,
        height: h,
        intervalTime: 5000,
        type: "poll", // poll/socket
        url: API_BASE_URL + EXCHANGE_KLINE,
        showTrade: false,
        subscribePath: "/",
        sendPath: "/",
        debug: false
      });
      this.kline.draw();
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/app_down.scss";
</style>
