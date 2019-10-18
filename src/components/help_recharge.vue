<template>
  <div class="content-help">
    <div class="top">
      <div class="center">如何充值?</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>充值BTC/LTC/ETH与OSC/DGC略有不同，以下分开讲解。</p>
     <h4>
       一、如何充值BTC/LTC/ETH，充值前请仔细阅读充值须知，再进行充值。
     </h4>
     <p>1、登录火狐狸账号后，点击用户中心  钱包  选择需要充值的币种；<br />
        2、首次进入点击“新建地址”，会出现充值地址；</p>
     <img :src="recharge1">
     <p>3、去您对应币种的钱包中发起转账，转账到充值地址，等待网络确认后即可完成充值；<br />
        4、在用户中心-钱包中可查看到充入的数量。</p>
     <h4>
      二、如何充值OSC/DGC，以OSC为例，充值前请仔细阅读充值须知，再进行充值。
     </h4>
     <p>
       1、打开您的链克口袋，复制您链克口袋地址；
       2、登录火狐狸账号后，点击用户中心  钱包  选择OSCOSC，粘贴您的链克钱包地址；
     </p>
     <img :src="recharge2">
     <p>
      3、点击“绑定链克地址”，出现火狐狸充值地址，复制火狐狸充值地址；
     </p>
     <img :src="recharge3">
     <p>4、打开您的链克口袋，从第一步绑定的链克口袋地址中，发起转账，粘贴火狐狸充值地址；输入金额后，点击“转账”即可完成充值；<br />
        5、预计5分钟后，可在用户中心-钱包中可查询到账情况；<br />
        6、如果您下次想更换成您其他链克口袋地址进行充值，您须在充值前先“重绑地址”；<br />
        7、另外，火狐狸网还给大家提供了链克无需翻墙充值工具，仅限火狐狸用户免费试用。</p>
      <img :src="recharge4">
      <p>点开无需翻墙的充值方式，按提示进行操作，即可快速充值到账。</p>
      <img :src="recharge5">
   </div>
  </div>
</template>

<script>
import BottomNav from "../components/BottomNav";
import store from "../store";
import storage from "../models/storage";
import { SET_USER, CLEAN_USER } from "../store/mutation-types";
import user from "../models/user";
import { IMG_BASE_URL } from "../models/url.js";
export default {
  name: "help_recharge",
  components: { BottomNav },
  data() {
    return {
      name: this.$store.state.user.name,
      subName: this.$store.state.user.name.substring(0, 2).toUpperCase(),
      mobile: this.$store.state.user.mobile,
      isSignOutDialog: false,
      isDown: false,
      is_real_name_authentication: false,
      isRealNameDialog: false,
      recharge1: IMG_BASE_URL + "recharge1.png",
      recharge2: IMG_BASE_URL + "recharge2.png",
      recharge3: IMG_BASE_URL + "recharge3.png",
      recharge4: IMG_BASE_URL + "recharge4.png",
      recharge5: IMG_BASE_URL + "recharge5.png"
    };
  },
  created: function() {
    this.isDown = this.isAndroid_ios();
    this.getSecurity();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    signIn() {
      // this.$router.push('/sign_in')
    },
    isAndroid_ios() {
      //判断是否是安卓还是ios
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //android终端或者uc浏览器
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      return isAndroid == true ? true : false;
    },
    wallet() {
      this.$router.push("/wallet");
    },
    my_ad() {
      this.$router.push("/ads");
    },
    signOutShowDialog() {
      this.isSignOutDialog = true;
    },
    closeDialog() {
      this.isSignOutDialog = false;
      this.isRealNameDialog = false;
    },
    signOUt() {
      this.isSignOutDialog = false;
      storage.set("at", "");
      storage.set("hpp", "");
      storage.set("mobile", "");
      store.commit(CLEAN_USER);
      this.$router.push("/trade");
    },
    sets() {
      this.$router.push("/set");
    },
    pay() {
      this.$router.push("/pay");
    },
    ffc() {
      this.$router.push("/agent");
      //  if(this.is_real_name_authentication){
      //       this.$router.push('/agent')
      //  }else{
      //     this.isRealNameDialog = true;
      //  }
    },
    game() {
      this.$router.push("/game_fox_bound_add");
    },
    realname() {
      this.$router.push("/realname");
    },
    getSecurity() {
      user
        .getSecurity()
        .then(result => {
          this.is_real_name_authentication =
            result.data.authentication.real_name_authentication.verified;
        })
        .catch(e => {});
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
@import "../assets/css/help_page.scss";
</style>
