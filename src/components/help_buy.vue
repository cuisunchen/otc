<template>
  <div class="content-help">
    <div class="top">
      <div class="center">如何购买数字币?</div>
      <div class="left" @click="goBack" />
    </div>
   <div class="help_center_content_zone">
     <p>在火狐狸网上您有两种方式可以购买数字币：<br />
     一种是在OTC交易中，选择《我要购买》，直接购买；<br />
     一种是在OTC交易中，发布购买广告，您的广告将显示《我要出售》列表中，等待卖家出售。</p>
     <h4>
       第一种：在《我要购买》直接购买，选择您想要购买的价格和数量，点击“购买”，具体步骤如下：
     </h4>
     <p>1、首先，打开网站：https://m.firefoxotc.com；或者用浏览器扫描二维码，下载手机APP。</p>
     <img :src="buy1">
     <p>2、请使用手机号注册一个新账号。如果您已有账号，请直接登录。<br />
        3、登录后进入OTC交易——我要购买，选择要购买币种、价格、数量、支付方式，选择合适的广告，点击购买（以OSC为例）。</p>
     <img :src="buy2">
     <p>4、输入需要购买的金额/数量，点击“立即购买”。</p>
     <img :src="buy3">
     <p>5、下单成功后，确认付款金额和付款方式，注意：付款时请备注订单号。请在倒计时结束前，完成付款并点击“标记已付款”，否则订单在倒计时结束后将会自动取消。</p>
     <img :src="buy4">
     <p>6、标记已付款后，等待卖家放币。如果5分钟后，卖家仍未放币，您可以电话联系对方。</p>
     <img :src="buy5">
     <p>7、如果点击“标记已付款”十分钟后，卖家仍未放币，可点击“申诉”按钮。</p>
     <img :src="buy6">
     <p>根据提示联系客服介入处理，并点击确定。</p>
     <img :src="buy7">
     <p>8、卖家放币后，将显示交易完成，您可在钱包中查看到您购买的数字币。</p>
     <h4>
      第二种：在OTC交易中，发布广告，您的广告将显示《我要出售》列表中，等待卖家出售。具体步骤如下：
     </h4>
     <p>
       1、登录参考上述第一种方法的1、2步骤。<br />
       2、进入OTC交易，点击“发布广告”，选择交易类型：我要购买，依次设置信息后点击“立即发布”。
     </p>
     <img :src="buy8">
     <p>
       3、等待卖家下单<br />
       4、卖家下单后，参考上述第一种方法的5、6、7、8步骤。
     </p>
     <p class="help-hint">
       注：<br />
      ① 发布广告，要求您有一定量的币才能发布成功；<br />
      ② “最小限额”“最大限额”：指设置您购买时单笔订单的数量范围，设定合适的区间能让您的交易更有效率；<br />
      ③ 购买限额：输入您本次总共想要购买的额度，避免您被下单累计数量超过您想购买的总数量；<br />
      ④ 选择您想要的支付转账方式，可以多选。
     </p>
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
  name: "help_buy",
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
      buy1: IMG_BASE_URL + "buy1.png",
      buy2: IMG_BASE_URL + "buy2.png",
      buy3: IMG_BASE_URL + "buy3.png",
      buy4: IMG_BASE_URL + "buy4.png",
      buy5: IMG_BASE_URL + "buy5.png",
      buy6: IMG_BASE_URL + "buy6.png",
      buy7: IMG_BASE_URL + "buy7.png",
      buy8: IMG_BASE_URL + "buy8.png"
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
