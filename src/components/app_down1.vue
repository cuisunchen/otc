<template>
  <div class="content-app-down">
   <div class="app-logo-zone" style="padding-top:1.5em">
     <div class="app-logo-img-zone">
     </div>
     <div class="app-logo-font-zone">
       <p class="logo-name">Firefox OTC</p>
       <p class="logo-name-bottom">最新版本下载</p>
     </div>
   </div>
   <div class="btn-an-zone">
     <a class="btn-an" v-show="!isIOS"  href="https://m.firefoxotc.com/download/android">点击安装Firefox OTC</a>
    <a class="btn-an" v-show="isIOS" href="https://www.pgyer.com/Hfcr">点击安装Firefox OTC (IOS)</a> 
  <a class="btn-an" style='margin-top:1em' v-show="isExplor" href="https://m.firefoxotc.com/download/android">点击安装Firefox OTC (Android)</a> 
   </div>
   
   <p class="app-title"  >应用程序介绍</p>
   <div class="img3-zone">
     <div class="img-zone">
       <!-- <img style="padding:0px 0.25em;"  src="../assets/image/img1.png"> -->
     </div>
      <div class="img-zone">
       <!-- <img style="padding:0px 0.25em;" src="../assets/image/img2.png"> -->
     </div>
      <div style="padding:0px 0.25em;"  class="img-zone">
       <!-- <img src="../assets/image/img3.png"> -->
     </div>
   </div>
   <div v-show="isIOS">
    <p class="app-title" style="margin-top:2.5em;">IOS下载安装教程</p>
    <div class="app-logo-zone">
     <div class="step-ft-zone">
      <i class="step">1</i>
      <p class="step-ft">下載完成後，回到桌麵點擊【firefox】APP，彈出以下彈窗，點擊【<span>取消</span>】</p>
     </div>
     <div class="app-anzhuang-img">
       <!-- <img  src="../assets/image/img-min4.png"> -->
     </div>
   </div>
   <div class="app-logo-zone" style="margin-top:3em;">
     <div class="app-anzhuang-img">
       <!-- <img  src="../assets/image/img-min2.png"> -->
     </div>
     <div class="step-ft-zone" style="padding-left:1em;padding-right:0px;">
      <i class="step">2</i>
      <p class="step-ft">在設置中，找到【 <span>設置 —> 通用 —> 設備管理</span> 】並點擊相應描述文件</p>
     </div>
   </div>
    <div class="app-logo-zone" style="margin-top:3em;">
     <div class="step-ft-zone">
      <i class="step">3</i>
      <p class="step-ft">單擊相應的描述文件後彈出彈窗，點擊【<span>信任</span>】，系統允許應用程序運行</p>
     </div>
     <div class="app-anzhuang-img">
       <!-- <img  src="../assets/image/img-min3.png"> -->
     </div>
   </div>
   <div class="app-logo-zone" style="margin-top:3em;">
     <div class="app-anzhuang-img">
       <!-- <img  src="../assets/image/img-min2.png"> -->
     </div>
     <div class="step-ft-zone" style="padding-left:1em;padding-right:0px;">
      <i class="step">4</i>
      <p class="step-ft">在設置中，找到【 <span>設置 —> 通用 —> 設備管理 </span>】並點擊相應描述文件</p>
     </div>
   </div>
   <p style="margin-top:2em;">火狐狸网www.firefox.com</p>
   </div>
  </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";
import store from "../store";
export default {
  name: "app_down",
  components: {},
  data() {
    return {
      isIOS: true,
      isExplor: false
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      this.$router.push("/to_browser");
    }

    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (isAndroid) this.isIOS = false;
    if (!isAndroid && !isiOS) {
      this.isExplor = true;
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/app_down.scss";
</style>
