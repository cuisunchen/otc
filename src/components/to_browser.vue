<template>
  <div class="content-to-browser">
    <br>
    <p class="p">
    <img src="../assets/image/to_browser.png" >
    </p>
    <br>
    <br>
    <br>
    <br>
    <br>
    <p class="p1">FireFox</p>
    <p class="p2">请点击右上角在<span>浏览器</span>打开该页面</p>
  </div>
</template>

<script>
import nprogress from "nprogress";
import user from "../models/user";
import validate from "../utils/validate";
import HttpResultCode from "../utils/HttpResultCode";


export default {
  name: "to_browser",
  components: {},
  data() {
    return {
   
    };
  },
  beforeRouteEnter(to, from, next) {
    nprogress.set(0.6);
    next();
    nprogress.done();
  },
  created: function() {
  
  },
  methods: {
    goBack(){
      this.$router.go(-1);
      },
  }
};
</script>

<style lang="scss" scope>
@import "../assets/css/to_browser.scss";
</style>
